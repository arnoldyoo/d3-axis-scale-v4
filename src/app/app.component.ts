import { ChartConfigInterface } from './chart/chart-config.interface';
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

    const config: ChartConfigInterface = {
      info: {
        width: this.width,
        height: this.height,
        target: this.svgTarget
      },
      data: undefined,
      axis: [
        {
          field: 'category', // for data mapping
          type: 'category', // for axis type (linear, time, ordinal etc ...)
          position: 'xb',  // for axis position
          displayStandard: 'category' // for display asix
        },
        {
          field: 'numeric1',
          type: 'numeric',
          position: 'yl',
          displayStandard: 'numeric1'
        },
        {
          field: 'numeric2',
          type: 'numeric',
          position: 'yr',
          displayStandard: 'numeric2'
        },
        {
          field: 'datetime',
          type: 'datetime',
          position: 'xt',
          displayStandard: 'datetime'
        }
      ],
      series: [
        {
          fieldX: 'category',
          fieldY: 'numeric1',
          type: 'column',
          displayStandard: 'numeric1' // for display field mapping. this case series show chart using numeric1 value
        }
      ]
    }
    this.chartCore = new ChartCore(config);
  }
}
