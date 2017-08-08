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
        console.log(data[this.fieldY]);
        this.y = this.scaleY(data[this.fieldY]);
        this.h = this.scaleY.range()[0] - this.y;
      }
      console.log(`index ${index} position ${this.x} / ${this.w} / ${this.y} / ${this.h}`);
    }
}
