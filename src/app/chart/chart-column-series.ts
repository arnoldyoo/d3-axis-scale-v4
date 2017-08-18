import { ChartSeriesConfigInterface } from './chart-config.interface';
import { ChartSeriesParamInterface } from 'app/chart/chart-config.interface';
import * as transition from 'd3-transition';
import { select } from 'd3-selection';

export class ChartColumnSeries {
    config: ChartSeriesParamInterface;
    data: Array<any> | any;
    x: number;
    y: number;
    w: number;
    h: number;
    target: any;

    constructor(config: ChartSeriesParamInterface) {
        this.config = config;
        // create series container
        this._createSeriesContainer(this.config.target);
        this._dataSetting();
    }

    _createSeriesContainer(parentTarget: any) {
      this.target = parentTarget.append('g').attr('class', `${this.config.displayStandard}`);
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
        const min: number = this.config.scaleY.domain()[0];
        const max: number = this.config.scaleY.domain()[1];
        const value: number = data[this.config.fieldY];
        if (min < 0) {
          if (value < 0) {
              this.y = this.config.scaleY(0);
              this.h = this.config.scaleY(value + max);
          } else {
              this.y = this.config.scaleY(value);
              const compare: number = this.config.scaleY(value + min);
              this.h = this.config.scaleY.range()[0] - compare;
          }
        } else {
          this.y = this.config.scaleY(value);
          this.h = this.config.scaleY.range()[0] - this.y;
        }
      }
      this._createSeries(data[this.config.fieldY], index);
    }

    _createSeries(value: any, index: number) {
      let rectElement: any = this.target.select(`.${this.config.displayStandard + index}`);
      if (!rectElement._groups[0][0]) {
        rectElement = this._createItem(value, index);
      } else {
        rectElement.datum(value);
      }
      const t = this._getTransition(this.config.displayStandard + index, 800);
      rectElement
                // .transition(t)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.w)
                .attr('height', this.h);

      if (this.config.textLabel.show) {
        const labelInfo = {
          x: this.x,
          y: this.y,
          width: this.w,
          height: this.h,
          value: value
        }
        this._createTextLabel(this.config.textLabel.orient, labelInfo, rectElement);
      }

    }

    _createItem(value: any, index: number) {
      const min: number = this.config.scaleY.domain()[0];
      return this.target.datum(value)
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

    _createTextLabel(orient: string, labelInfo: any, seriesElement) {
      const targetWidth: number = labelInfo.width;
      const targetHeight: number = labelInfo.height;
      const targetX: number = labelInfo.x;
      const targetY: number = labelInfo.y;
      const value: any = labelInfo.value;

      let textLabel: any = this.target.select(`.${seriesElement.attr('class')}label`);

      if (!textLabel._groups[0][0]) {
        textLabel = this.target.append('text')
                                .text(value)
                                .attr('fill', 'black')
                                .attr('class', `${seriesElement.attr('class')}label`);
      }
      const labelWidth: number = textLabel._groups[0][0].getBoundingClientRect().width;
      // console.log(textLabel.node().getBoundingClientRect().width);

      if (orient === 'top') {
        const x: number = targetX + (targetWidth / 2) - (labelWidth / 2);
        const y: number =  targetY - 3;
        textLabel.attr('x', x);
        textLabel.attr('y', y);
      } else if (orient === 'right') {
        textLabel.attr({
            x: targetWidth + 3,
            y: targetY + (targetHeight / 2),
            dy: '.35em'
        });
      }
    }
}
