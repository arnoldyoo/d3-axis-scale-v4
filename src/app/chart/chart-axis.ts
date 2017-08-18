import { ChartAxisConfigInterface, ChartAxisParamInterface } from './chart-config.interface';
import {axisLeft, axisRight, axisBottom, axisTop} from 'd3-axis';
import { min } from 'd3-array';
import { select } from 'd3-selection';

export class ChartAxis {
  config: ChartAxisParamInterface;
  axe: any;
  target: any;
  _zero: any;

  constructor(config: ChartAxisParamInterface) {
    if (config) {
      this.config = config;
      this._createAxisContainer(this.config.target);
      this._createAxis();
      this._makeAxisLabel();
      if (this.config.type === 'numeric') {
        this._makeZeroLine();
      }
    }
  }

  _createAxisContainer(parentTarget: any) {
    this.target = parentTarget
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
    this.target.attr('transform', `translate(${px}, ${py})`);
  }

  _makeAxisLabel() {
    this.target.call(this.axe);
  }

  _makeZeroLine() {
    const minValue = +min(this.config.data);
    if (minValue < 0) {
      if (!this._zero) {
        const rootSvg: any = select(this.config.target._groups[0][0].nearestViewportElement);
        this._zero = rootSvg.append('g').attr('class', 'zero');
        this._zero.append('line');
      }
      this._zero.attr('transform', `translate(${this.config.margin.left}, ${this.config.scale(0) + this.config.margin.top})`);
      const median = this._zero.select('line');
      if (this.config.position.includes('y')) {
        this._zero.attr('transform', `translate(${this.config.margin.left}, ${this.config.scale(0) + this.config.margin.top})`);
        median.attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.config.width)
            .attr('y2', 0)
            .attr('stroke-width', 1)
            .attr('stroke', 'lightgrey');
      } else {
        this._zero.attr('transform', `translate(${this.config.scale(0) + this.config.margin.left}, ${this.config.margin.top})`);
        median.attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', this.config.height)
            .attr('stroke-width', 1)
            .attr('stroke', 'lightgrey');
      }
    }
  }
}
