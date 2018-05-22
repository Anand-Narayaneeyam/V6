import {Component, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
declare let d3: any;
import {nvD3} from 'ng2-nvd3'


@Component({
    selector: 'linechart',
    inputs: ["sourceData", "isSourceChanged"],
    directives: [nvD3],
    template: ` <nvd3 *ngIf="options != undefined && data != undefined" [options]="options" [data]="data"></nvd3>`

})

export class LineChart implements OnInit {
    options;
    data;
    isSourceChanged: boolean;
    sourceData: ILineChart = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "X Axis", chartYaxisLabel: "Y Axis" };
    // @ViewChild(nvD3)
    // nvD3: nvD3;

    ngOnInit() {
        this.options = {
            chart: {
               //forceX: ([0]),
                forceY: ([0]),
                //yRange: ([0,5]),
                type: 'lineChart',
                useInteractiveGuideline: true,
                showXAxis: true,
                height: this.sourceData.chartHeight,
                width: this.sourceData.chartWidth,
                duration: 1500,
                showLegend: true,
                showValues: true,
                interpolate: "linear",
                //margin: {
                //    top: 20,
                //    right: 20,
                //    bottom: 40,
                //    left: 75
                //},
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
               // forcePoint: ([5]),
               // xScale: d3.time.scale(),
                xAxis: {
                    axisLabel: this.sourceData.chartXaxisLabel,
                    //ticks: d3.time.months,
                    //tickFormat: (d) => {
                    //    return d3.time.format('%b')(new Date(d));
                    //}
                    tickFormat: function (d) {
                        return d3.format('f')(d);
                    },
                    //forcePoint: function (d) { return d.value; }
                },
                yAxis: {
                    axisLabel: this.sourceData.chartYaxisLabel,
                    //axisLabel: 'Gross volume',
                    //tickFormat: (d) => {
                    //    if (d == null) {
                    //        return 0;
                    //    }
                    //    return d3.format('.02f')(d);
                    tickFormat: function (d) {
                        return d3.format('f')(d);
                    },
                    //forcePoint: function (d) { return d.value; },
                    //tickValues: function (d) {
                    //    debugger;
                    //    var values = [];
                    //    values = [1, 10, 50, 100];
                    //    return values;
                    //},
                    //ticks: [10, 20, 30],
                    //tickValues:[10, 20, 30],
                    axisLabelDistance: -10
                },
            }

        }
             this.data = this.sourceData.data;
        }

        //this.data = [
        //    {
        //        key: "Cumulative Return",
        //        values: [
        //            {
        //                "label": "A",
        //                "value": -29.765957771107
        //            },
        //            {
        //                "label": "B",
        //                "value": 0
        //            },
        //            {
        //                "label": "C",
        //                "value": 32.807804682612
        //            },
        //        ]
        //    }
        //];

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    }
}
export interface ILineChart {
    data: ILineChartData[];
    chartWidth: number;
    chartHeight: number;
    chartXaxisLabel;
    chartYaxisLabel;

}
export interface ILineChartData {
    key: string;
    color?: string;
    values: any[];
}