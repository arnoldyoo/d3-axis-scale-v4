import {scaleLinear, scaleOrdinal, scaleTime, scaleBand} from 'd3-scale';
import {max, min} from 'd3-array';

export class ChartScale {
  type: string;
  width: number;
  height: number;
  scale: any;
  range: Array<number> = [];
  data: Array<any>;
  domain: Array<any> = [];
  position: string;

  constructor(data: Array<any>, type: string, position: string, width: number, height: number) {
    this.type = type;
    this.data = data;
    this.width = width;
    this.height = height;
    this.position = position;
    this._setRange();
    this._generateScale();
  }

  _generateScale() {
    // console.log('range : ', this.range);
    // console.log('scale width : ', this.width);
    // console.log('scale height : ', this.height);
    if (this.type === 'numeric') {
      this.domain.push(min(this.data));
      const maxData = max(this.data);
      this.domain.push(maxData + (maxData * 0.1));
      this.scale = scaleLinear()
                              .domain(this.domain)
                              .range(this.range);

    } else if (this.type === 'category') {
      this.scale = scaleBand()
                            .domain(this.data)
                            .range([this.range[0], this.range[1]])
                            .padding(.2);
    } else {
      const startDay: Date = this.data[0];
      const endDayIndex: number = this.data.length - 1;
      const endDay: Date = this.data[endDayIndex];
      this.scale = scaleTime()
                            .domain([startDay, endDay])
                            .range(this.range)
    }
  }

  _setRange() {
    if (this.position.includes('x')) {
        this.range.push(0);
        this.range.push(this.width);
    } else {
        this.range.push(this.height);
        this.range.push(0);
    }
  }

};