import { ChartAxisConfigInterface, ChartAxisParamInterface } from './chart-config.interface';
import {axisLeft, axisRight, axisBottom, axisTop} from 'd3-axis';

export class ChartAxis {
  config: ChartAxisParamInterface;
  axe: any;

  constructor(config: ChartAxisParamInterface) {
    if (config) {
      this.config = config;
      this._createAxisContainer(this.config.target);
      this._createAxis();
      this._makeAxisLabel();
    }
  }

  _createAxisContainer(parentTarget: any) {
    this.config.target = parentTarget
                                    .append('g')
                                    .attr('class', `${this.config.displayStandard} ${this.config.position}`);
  }

  _createAxis() {
    let px = 0;
    let py = 0;
    if (this.config.position.includes('b')) {
      this.axe = axisBottom(this.config.scale);
      px = this.config.margin.left;
      py = this.config.height + this.config.margin.top;
    } else if (this.config.position.includes('t')) {
      this.axe = axisTop(this.config.scale);
      px = this.config.margin.left;
      py = this.config.margin.top;
    } else if (this.config.position.includes('r')) {
      this.axe = axisRight(this.config.scale);
      px = this.config.margin.left + this.config.width;
      py = this.config.margin.top;
    } else if (this.config.position.includes('l')) {
      this.axe = axisLeft(this.config.scale);
      px = this.config.margin.left;
      py = this.config.margin.top;
    }
    this.config.target.attr('transform', `translate(${px}, ${py})`);
  }

  _makeAxisLabel() {
    this.config.target.call(this.axe);
  }
}
