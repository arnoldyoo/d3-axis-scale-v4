import { ChartSeriesParamInterface } from 'app/chart/chart-config.interface';
import { line, curveMonotoneX } from 'd3-shape';

export class ChartLineSeries {
    config: ChartSeriesParamInterface;
    target: any;
    lineShape: any;
    constructor(config: ChartSeriesParamInterface) {
        this.config = config;
        this._createSeriesContainer(this.config.target);
        this._dataSetting();
    }

    _createSeriesContainer(parentTarget: any) {
        this.target = parentTarget.append('g').attr('class', `${this.config.displayStandard}`);
    }

    _dataSetting() {
        if(this.config.dataProvider) {
            const index: number = 0;
            this._positionSetting(index);
        }
    }
    
    _positionSetting(index: number) {
        this.lineShape = line().x((d: any) => {
            let returnX: number = 0;;
            if (this.config.scaleX.bandwidth) {
                returnX = this.config.scaleX.bandwidth() / 2 + this.config.scaleX(d[this.config.fieldX]);
            } else {
                returnX = this.config.scaleX(d[this.config.fieldX]);
            }
            return returnX;
        }).y((d: any) => {
            return this.config.scaleY(d[this.config.fieldY]);
        }).curve(curveMonotoneX)

        this._createSeries(index);
    }

    _createSeries(index: number) {
        let lineElement: any = this.target.select(`.${this.config.displayStandard + index}`);

        if (!lineElement._groups[0][0]) {
            lineElement = this._createItem(index);
        } else {
            lineElement.datum(this.config.dataProvider);
        }
        lineElement.attr('d', this.lineShape);
    }

    _createItem(index: number) {
        return this.target.datum(this.config.dataProvider)
                            .append('path')
                            .attr('class', this.config.displayStandard + index)
                            .style('fill', 'none')
                            .style('stroke-width', 2)
                            .style('stroke', 'black');
    }

}