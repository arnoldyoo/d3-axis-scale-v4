export interface ChartConfigInterface {
  info: ChartInfoConfigInterface;
  data: Array<any>;
  axis?: Array<ChartAxisConfigInterface>;
  series?: Array<ChartSeriesConfigInterface>;

}

export interface ChartInfoConfigInterface {
  width: number;
  height: number;
  target: any;
}

export interface ChartAxisConfigInterface {
  field: string | Array<string>;
  type: string;
  position: string;
  displayStandard?: string;
}

export interface ChartSeriesConfigInterface {
  fieldX: string;
  fieldY: string;
  type: string;
}

export interface ChartAxisParamInterface extends ChartAxisConfigInterface {
  width: number;
  height: number;
  margin: any;
  data: Array<any>;
  scale: any;
  target: any;
}
