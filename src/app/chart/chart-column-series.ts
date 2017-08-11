import { ChartSeriesConfigInterface } from './chart-config.interface';
import { ChartSeriesParamInterface } from 'app/chart/chart-config.interface';
import * as transition from 'd3-transition';

export class ChartColumnSeries {
    config: ChartSeriesParamInterface;
    data: Array<any> | any;
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(config: ChartSeriesParamInterface) {
        this.config = config;
        // create series container
        this._createSeriesContainer(this.config.target);
        this._dataSetting();
    }

    _createSeriesContainer(parentTarget: any) {
      this.config.target = parentTarget.append('g').attr('class', `${this.config.displayStandard}`);
    }

    _dataSetting() {
      this.config.dataProvider.map((data: any, i: number) => {
        this._positionSetting(data, i);
      })
    }

    _positionSetting(data: any, index: number) {
      if (this.config.scaleX) {
        this.x = this.config.scaleX(data[this.config.fieldX]);
        this.w = this.config.scaleX.bandwidth();
      }
      if (this.config.scaleY) {
        this.y = this.config.scaleY(data[this.config.fieldY]);
        this.h = this.config.scaleY.range()[0] - this.y;
      }
      this._createSeries(data[this.config.fieldY], index);
    }

    _createSeries(value: any, index: number) {
      let rectElement: any = this.config.target.select(`.${this.config.displayStandard + index}`);
      if (!rectElement._groups[0][0]) {
        rectElement = this._createItem(value, index);
      } else {
        rectElement.datum(value);
      }
      const t = this._getTransition(this.config.displayStandard + index, 800);
      rectElement
                .transition(t)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.w)
                .attr('height', this.h);
    }

    _createItem(value: any, index: number) {
      const min: number = this.config.scaleY.domain()[0];
      return this.config.target.datum(value)
                        .append('rect')
                        .attr('class', this.config.displayStandard + index)
                        .attr('y', this.config.scaleY(min))
                        .attr('height', 0)
                        .attr('value', value)
                        .attr('fill', 'red');
    }

    _getTransition(name: string = '', duration: number = 1000): any {
      return transition.transition(name)
                       .duration(duration);
    }
}
