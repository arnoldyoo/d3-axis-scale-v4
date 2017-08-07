import { ChartCore } from './chart/chart-core';
import { select } from 'd3-selection';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  svgTarget: any;
  width: number;
  height: number;
  chartCore: ChartCore;
  @ViewChild('svgContainer') svgContariner: ElementRef;

  ngOnInit() {
    this.width = this.svgContariner.nativeElement.offsetWidth;
    this.height = this.svgContariner.nativeElement.offsetHeight;
    this.svgTarget = select('svg').attr('width', this.width).attr('height', this.height);

    const config = {
      info: {
        width: this.width,
        height: this.height,
        target: this.svgTarget
      },
      data: undefined,
      axis: [
        {
          field: 'category',
          type: 'category',
          position: 'xb'
        },
        {
          field: 'numeric1',
          type: 'numeric',
          position: 'yl'
        },
        {
          field: 'numeric2',
          type: 'numeric',
          position: 'yr'
        },
        {
          field: 'datetime',
          type: 'datetime',
          position: 'xt'
        }
      ]
    }
    this.chartCore = new ChartCore(config);
  }
}
