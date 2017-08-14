import { ChartColumnSeries } from './chart-column-series';
import {
  ChartConfigInterface,
  ChartAxisParamInterface,
  ChartAxisConfigInterface,
  ChartSeriesConfigInterface,
  ChartSeriesParamInterface,
  ScaleParamInterface
} from './chart-config.interface';
import { ChartAxis } from './chart-axis';
import { ChartScale } from './chart-scale';
import { select } from 'd3-selection';

export class ChartCore {
  scales: any = {};
  axis: Array<any> = [];
  series: Array<any> = [];
  config: ChartConfigInterface;
  _dataProvider: Array<any>;
  scaleFields: Array<any>;
  target: any;
  axisGroupElement: any;
  seriesGroupElement: any;
  margin: any;
  width: number;
  height: number;

  constructor(chartConfig: ChartConfigInterface) {
    if (chartConfig) {
      this.config = chartConfig;
      this._createRootSvg(this.config.info.selector);
      // this.target = chartConfig.info.target;
      this.margin = chartConfig.info.margin;
      this._setRootContainerSize();
      this.dataProvider = chartConfig.data;
    }
  }

  get dataProvider() {
    return this._dataProvider;
  }

  set dataProvider(value: Array<any>) {
    if (!value) {
      this._dataProvider = this._setDefaultData();
    } else {
      this._dataProvider = value;
    }
    this._createScale();
    this._createAxis();
    this._createSeries();
  }

  _createRootSvg(selector: string) {
    this.target = select('svg').attr('width', this.config.info.width).attr('height', this.config.info.height);
  }

  _createScale() {
    this.scaleFields = this.config.axis.map((a: any) => {
      const temp = {
        type: a['type'],
        field: a['field'],
        position: a['position'],
        displayStandard: a['displayStandard']
      }
      return temp;
    })
    this.scaleFields.map((info: any) => {
      const data = this.dataProvider.map((d: any) => {
        // info.type이 numeric의 경우 field 타입이 object이면 loop돌아 field의 max/min을 찾아내야함
        return d[info.field];
      });
      const scaleConfig: ScaleParamInterface = {
        data: data,
        type: info.type,
        position: info.position,
        width: this.width,
        height: this.height
      }
      this.scales[info.displayStandard] = new ChartScale(scaleConfig);
    });
  }

  _createAxis() {
    this._createAxisGroupContainer();
    this.config.axis.map((axis: ChartAxisConfigInterface) => {
      const data = this.dataProvider.map((d: any) => {
        return d[axis.displayStandard];
      })
      const axisConfig: ChartAxisParamInterface = {
        field: axis.field,
        type: axis.type,
        scale: this.scales[axis.displayStandard].scale,
        position: axis.position,
        data: data,
        width: this.width,
        height: this.height,
        target: this.axisGroupElement,
        margin: this.margin,
        displayStandard: axis.displayStandard
      }
      this.axis.push(new ChartAxis(axisConfig));
    })
  }

  _createAxisGroupContainer() {
    this.axisGroupElement = this.target.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,0)');
  }

  _createSeries() {
    this._createSeriesGroupContainer();
    this.config.series.map((series: ChartSeriesConfigInterface) => {
      const seriesConfig: ChartSeriesParamInterface = {
        width: this.width,
        height: this.height,
        scaleX: this.scales[series.fieldX].scale,
        scaleY: this.scales[series.fieldY].scale,
        target: this.seriesGroupElement,
        dataProvider: this.dataProvider,
        displayStandard: series.displayStandard,
        fieldX: series.fieldX,
        fieldY: series.fieldY,
        type: series.type
      }
      let seriesTemp: any;
      if (series.type === 'column') {
        seriesTemp = new ChartColumnSeries(seriesConfig);
      } else {

      }
      this.series.push(seriesTemp);
    })
  }

  _createSeriesGroupContainer() {
    this.seriesGroupElement = this.target.append('g')
          .attr('class', 'series')
          .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  _setDefaultData(): Array<any> {
    const testData: Array<any> = [];
    for (let i = 0; i < 20; i++) {
        testData.push(
          {
            category: 'A' + i,
            datetime: new Date(2017, 0, i).getTime(),
            numeric1: Math.round( Math.random() * 110  ),
            numeric2: Math.round( Math.random() * 120  ),
          });
    }
    return testData;
  }

  _setRootContainerSize() {
    this.width = this.config.info.width - (this.margin.left + this.margin.right);
    this.height = this.config.info.height - (this.margin.top + this.margin.bottom);
  }


};
