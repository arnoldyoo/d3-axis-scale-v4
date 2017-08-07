import { ChartConfigInterface, ChartAxisParamInterface } from './chart-config.interface';
import { ChartAxis } from './chart-axis';
import { ChartScale } from './chart-scale';

export class ChartCore {
  scales: any = {};
  axis: any = {};
  config: any;
  _dataProvider: Array<any>;
  domain: Array<Array<any>> = [];
  scaleFields: Array<string>;
  target: any;
  axisGroupElement: any;
  seriesGroupElement: any;
  margin: any;
  width: number;
  height: number;

  constructor(chartConfig: ChartConfigInterface) {
    if (chartConfig) {
      this.config = chartConfig;
      this.target = chartConfig.info.target;
      this.margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
      this.width = this.config.info.width - (this.margin.left + this.margin.right),
      this.height = this.config.info.height - (this.margin.top + this.margin.bottom),
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
  }

  _createScale() {
    this.scaleFields = this.config.axis.map((a: any) => {
      const temp = {
        type: a['type'],
        field: a['field'],
        position: a['position']
      }
      return temp;
    })
    this.scaleFields.map((info: any) => {
      // numeric의 경우 field 타입이 object이면 loop돌아 field의 max/min을 찾아내야함
      const data = this.dataProvider.map((d: any) => {
        return d[info.field];
      });
      this.scales[info.field] = new ChartScale(data, info.type, info.position, this.width, this.height);
    });

  }

  _createAxis() {
    this.axisGroupElement = this.target.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,0)');
    this.config.axis.map((axis: any) => {
      const data = this.dataProvider.map((d: any) => {
        return d[axis.field];
      })
      const axisConfig: ChartAxisParamInterface = {
        field: axis.field,
        type: axis.type,
        scale: this.scales[axis.field].scale,
        position: axis.position,
        data: data,
        width: this.width,
        height: this.height,
        target: this.axisGroupElement,
        margin: this.margin
      }
      this.axis[axis.field] = new ChartAxis(axisConfig);
    })
  }

  _createSeries() {

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
};
