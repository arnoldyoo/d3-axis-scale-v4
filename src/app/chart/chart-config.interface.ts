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

export interface ScaleParamInterface {
  data: Array<any> | any;
  type: string;
  position: string;
  width: number;
  height: number;
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
  displayStandard?: string;
}

export interface ChartAxisParamInterface extends ChartAxisConfigInterface {
  width: number;
  height: number;
  margin: any;
  dataProvider?: Array<any> | any;
  data?: Array<any> | any;
  scale: any;
  target: any;
}

export interface ChartSeriesParamInterface extends ChartSeriesConfigInterface {
  scaleX: any;
  scaleY: any;
  target: any;
  dataProvider?: Array<any> | any;
  data?: Array<any> | any;
  width: number;
  height: number;
}

