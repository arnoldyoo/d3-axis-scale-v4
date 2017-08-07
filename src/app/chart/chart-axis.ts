import {axisLeft, axisRight, axisBottom, axisTop} from 'd3-axis';

export class ChartAxis {
  type: string;
  field: string;
  position: string;
  data: Array<any>;
  width: number;
  height: number;
  target: any;
  margin: any;
  axe: any;
  scale: any;
  constructor(config: any) {
    if (config) {
      this.type = config.type;
      this.field = config.field;
      this.position = config.position;
      this.data = config.data;
      this.width = config.width;
      this.height = config.height;
      this.margin = config.margin;
      this.scale = config.scale;

      this._createAxisContainer(config.target);
      this._setAxisPosition();
      this._makeAxisLabel();
    }

  }

  _createAxisContainer(parentTarget: any) {
    this.target = parentTarget.append('g').attr('class', `${this.field} ${this.position}`);
    this._createAxis();
  }
  _setAxisPosition() {
    let px = 0;
    let py = 0;

    if (this.position.includes('b')) {
      px = this.margin.left;
      py = this.height + this.margin.top;
    } else if (this.position.includes('t')) {
      px = this.margin.left;
      py = this.margin.top;
    } else if (this.position.includes('r')) {
      px = this.margin.left + this.width;
      py = this.margin.top;
    } else if (this.position.includes('l')) {
      px = this.margin.left;
      py = this.margin.top;
    } else {
      px = this.margin.left;
      py = this.margin.top;
    }
    this.target.attr('transform', `translate(${px}, ${py})`);
  }

  _createAxis() {
    if (this.position.includes('b')) {
      this.axe = axisBottom(this.scale);
    } else if (this.position.includes('t')) {
      this.axe = axisTop(this.scale);
    } else if (this.position.includes('r')) {
      this.axe = axisRight(this.scale);
    } else if (this.position.includes('l')) {
      this.axe = axisLeft(this.scale);
    }
  }

  _makeAxisLabel() {
    this.target.call(this.axe);
  }
}
