import { ChartAxisConfigInterface, ChartAxisParamInterface } from './chart-config.interface';
import {axisLeft, axisRight, axisBottom, axisTop} from 'd3-axis';

export class ChartAxis {
  type: string;
  field: string | Array<string>;
  position: string;
  data: Array<any>;
  width: number;
  height: number;
  target: any;
  margin: any;
  axe: any;
  scale: any;
  displayStandard: string;
  constructor(config: ChartAxisParamInterface) {
    if (config) {
      this.type = config.type;
      this.field = config.field;
      this.displayStandard = config.displayStandard;
      this.position = config.position;
      this.data = config.data;
      this.width = config.width;
      this.height = config.height;
      this.margin = config.margin;
      this.scale = config.scale;

      this._createAxisContainer(config.target);
      this._createAxis();
      this._makeAxisLabel();
    }
  }

  _createAxisContainer(parentTarget: any) {
    this.target = parentTarget.append('g').attr('class', `${this.displayStandard} ${this.position}`);
  }

  _createAxis() {
    let px = 0;
    let py = 0;
    if (this.position.includes('b')) {
      this.axe = axisBottom(this.scale);
      px = this.margin.left;
      py = this.height + this.margin.top;
    } else if (this.position.includes('t')) {
      this.axe = axisTop(this.scale);
      px = this.margin.left;
      py = this.margin.top;
    } else if (this.position.includes('r')) {
      this.axe = axisRight(this.scale);
      px = this.margin.left + this.width;
      py = this.margin.top;
    } else if (this.position.includes('l')) {
      this.axe = axisLeft(this.scale);
      px = this.margin.left;
      py = this.margin.top;
    }
    this.target.attr('transform', `translate(${px}, ${py})`);
  }

  _makeAxisLabel() {
    this.target.call(this.axe);
  }
}
