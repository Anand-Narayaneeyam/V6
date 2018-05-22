import {Component, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
declare let d3: any;
import {nvD3} from 'ng2-nvd3'


@Component({
    selector: 'barchart',
    inputs: ["sourceData", "isSourceChanged"],
    directives: [nvD3],
    template: ` <nvd3 *ngIf="options != undefined && data != undefined" [options]="options" [data]="data"></nvd3>`
               
})

export class BarChart implements OnInit {
    options;
    data;
    isSourceChanged: boolean;
    sourceData: IBarChart = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "X Axis", chartYaxisLabel: "Y Axis", rotateLabels: 0 };
   // @ViewChild(nvD3)
   // nvD3: nvD3;

    ngOnInit() {
        this.options = {
            chart: {
                type: 'discreteBarChart',
                height: this.sourceData.chartHeight,
                width: this.sourceData.chartWidth,
                margin: {
                    top: 25,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showValues: true,
                showLegend: true,
                rotateLabels: this.sourceData.rotateLabels,
                valueFormat: function (d) {
                   // return d3.format(',.4f')(d);
                },
                duration: 1500,
                xAxis: {
                    axisLabel: this.sourceData.chartXaxisLabel
                },
                yAxis: {
                    axisLabel: this.sourceData.chartYaxisLabel,
                    axisLabelDistance: -10
                }
            }
        }
        this.data = this.sourceData.data;
    }

    ngOnChanges(changes: SimpleChanges) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    }

}

//export interface IBarChart {
//    data;
//    chartWidth: number;
//    chartHeight: number;
//    chartXaxisLabel;
//    chartYaxisLabel;
//    rotateLabels: number;
//}

export interface IBarChart {
    data: IBarChartData[];
    chartWidth: number;
    chartHeight: number;
    chartXaxisLabel;
    chartYaxisLabel;
    rotateLabels: number;

}
export interface IBarChartData {
    key: string;
    color?: string;
    values: any[];
}