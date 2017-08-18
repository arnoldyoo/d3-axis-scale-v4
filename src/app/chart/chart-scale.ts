import { ScaleParamInterface } from './chart-config.interface';
import {scaleLinear, scaleTime, scaleBand} from 'd3-scale';
import {max, min} from 'd3-array';

export class ChartScale {
  config: ScaleParamInterface;
  scale: any;
  range: Array<number> = [];
  domain: Array<any> = [];

  constructor(config: ScaleParamInterface) {
    this.config = config;
    this._setRange();
    this._generateScale();
  }

  _generateScale() {
    if (this.config.type === 'numeric') {
      // this.domain.push(0);
      this.domain.push(min(this.config.data));
      const maxData = max(this.config.data);
      this.domain.push(maxData + (+maxData * 0.1));
      this.scale = scaleLinear()
                              .domain(this.domain)
                              .range(this.range)
                              .nice();

    } else if (this.config.type === 'category') {
      this.scale = scaleBand()
                            .domain(this.config.data)
                            .range([this.range[0], this.range[1]])
                            .padding(.2);

    } else {
      const startDay: Date = this.config.data[0];
      const endDayIndex: number = this.config.data.length - 1;
      const endDay: Date = this.config.data[endDayIndex];
      this.scale = scaleTime()
                            .domain([startDay, endDay])
                            .range(this.range);
    }
  }

  _setRange() {
    if (this.config.position.includes('x')) {
        this.range.push(0);
        this.range.push(this.config.width);
    } else {
        this.range.push(this.config.height);
        this.range.push(0);
    }
  }

};
