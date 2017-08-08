import { ChartSeriesParamInterface } from 'app/chart/chart-config.interface';

export class ChartColumnSeries {
    target: any;
    scaleX: any;
    scaleY: any;
    fieldX: string;
    fieldY: string;
    width: number;
    height: number;
    data: Array<any> | any;
    dataProvider: Array<any> | any;
    displayStandard: string;
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(config: ChartSeriesParamInterface) {
        // config setting
        this.scaleX = config.scaleX;
        this.scaleY = config.scaleY;
        this.fieldX = config.fieldX;
        this.fieldY = config.fieldY;
        this.width = config.width;
        this.height = config.height;
        this.dataProvider = config.dataProvider;
        this.displayStandard = config.displayStandard;
        // create series container
        this._createSeriesContainer(config.target);
        // data setting
            // position setting
            // create item
            // loop ...
        this._dataSetting();
    }
    _createSeriesContainer(parentTarget: any) {
      this.target = parentTarget.append('g').attr('class', `${this.displayStandard}`);
    }
    _dataSetting() {
      this.dataProvider.map((data: any, i: number) => {
        // this.itemData = d;
        // this.index = i;
        this._positionSetting(data, i);
        // this._createSeries();
      })
    }
    _positionSetting(data: any, index: number) {
      if (this.scaleX) {
        this.x = this.scaleX(data[this.fieldX]);
        this.w = this.scaleX.bandwidth();
      }
      if (this.scaleY) {
        this.y = this.scaleY(data[this.fieldY]);
        this.h = this.scaleY.range()[0] - this.y;
      }
      this._createSeries(data[this.fieldY], index);
    }

    _createSeries(value: any, index: number) {
      let rectElement: any = this.target.select(`.${this.displayStandard + index}`);
      if (!rectElement._groups[0][0]) {
        rectElement = this._createItem(value, index);
      } else {
        rectElement.datum(value);
      }
      rectElement
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.w)
                .attr('height', this.h);
    }

    _createItem(value: any, index: number) {
      console.log(index);
      const rectElement: any = this.target.datum(value)
                                        .append('rect')
                                        .attr('class', this.displayStandard + index)
                                        .attr('value', value)
                                        .attr('fill', 'red');

      return rectElement;
    }
}
