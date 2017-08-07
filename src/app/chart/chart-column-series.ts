import { ChartSeriesParamInterface } from "app/chart/chart-config.interface";

export class ChartColumnSeries {
    target: any;
    scaleX: any;
    scaleY: any;
    fieldX: string;
    fieldY: string;
    width: number;
    height: number;
    data: Array<any>;
    displayStandard: string;
    constructor(config: ChartSeriesParamInterface) {
        // config setting
        this.target = config.target;
        this.scaleX = config.scaleX;
        this.scaleY = config.scaleY;
        this.fieldX = config.fieldX;
        this.fieldY = config.fieldY;
        this.width = config.width;
        this.height = config.height;
        this.data = config.data;
        this.displayStandard = config.displayStandard;
        
        // create series container
        // data setting
            // position setting
            // create item
            // loop ...
    }
}