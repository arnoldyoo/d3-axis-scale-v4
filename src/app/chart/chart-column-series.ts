import { ChartSeriesParamInterface } from 'app/chart/chart-config.interface';
import * as transition from 'd3-transition';

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
      const t = this._getTransition(this.displayStandard + index, 800);
      rectElement
                .transition(t)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.w)
                .attr('height', this.h);
    }

    _createItem(value: any, index: number) {
      const min: number = this.scaleY.domain()[0];
      return this.target.datum(value)
                        .append('rect')
                        .attr('class', this.displayStandard + index)
                        .attr('y', this.scaleY(min))
                        .attr('height', 0)
                        .attr('value', value)
                        .attr('fill', 'red');
    }

    _getTransition(name: string = '', duration: number = 1000): any {
      return transition.transition(name)
                       .duration(duration);
    }
}
