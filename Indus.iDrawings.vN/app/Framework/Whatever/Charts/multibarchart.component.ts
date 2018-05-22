import {Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
declare let d3: any;
import {nvD3} from 'ng2-nvd3'


@Component({
    selector: 'multibarchart',
    inputs: ["sourceData", "isSourceChanged"],
    directives: [nvD3],
    template: ` <nvd3 *ngIf="options != undefined && data != undefined" [options]="options" [data]="data"></nvd3>`

})

export class MultiBarChart implements OnInit {
    options;
    data;
    isSourceChanged: boolean;
    sourceData: IMultiBarChart = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: true };

    ngOnInit() {
        this.options = {
            chart: {
                type: 'multiBarChart',
                height: this.sourceData.chartHeight,
                width: this.sourceData.chartWidth,
                margin: {
                    top: 25,
                    right: 20,
                    bottom: 125,
                    left: 65
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                clipEdge: true,
                staggerLabels: false,
               // groupSpacing: 0.2,
                showControls: false,
                useInteractiveGuideline: false,
                duration: 1500,
                rotateLabels: 45,
                wrapLabels: this.sourceData.wrapLabels,
                stacked: this.sourceData.IsStackedChart,
                reduceXTicks: false,                              
                xAxis: {
                    axisLabel: this.sourceData.chartXaxisLabel,
                    showMaxMin: false,
                    //tickFormat: function (d) {
                    //    return d3.format(',.4f')(d);
                    //}

                },
                yAxis: {
                    axisLabel: this.sourceData.chartYaxisLabel,
                    axisLabelDistance: -20,
                    tickFormat: function (d) {
                        return d3.format(',.f')(d);
                    }
                }
            }
        }
        this.data = this.sourceData.data;
        //debugger;
        //this.data = [
        //    {
        //        key: "Series1",
        //        color: "#d62728",
        //        values: [
        //            {
        //                "label": "Group A",
        //                "value": 10.8746444827653
        //            },
        //            {
        //                "label": "Group B",
        //                "value": -8.0961543492239
        //            },
        //            {
        //                "label": "Group C",
        //                "value": -0.57072943117674
        //            },
        //            {
        //                "label": "Group D",
        //                "value": -2.4174010336624
        //            }
        //        ]
        //    },
        //    {
        //        key: "Series2",
        //        color: "#1f77b4",
        //        values: [
        //            {
        //                "label": "Group A",
        //                "value": 25.307646510375
        //            },
        //            {
        //                "label": "Group B",
        //                "value": 16.756779544553
        //            },
        //            {
        //                "label": "Group C",
        //                "value": 18.451534877007
        //            },
        //            {
        //                "label": "Group D",
        //                "value": 8.6142352811805
        //            }
        //        ]
        //    }
        //];
    }

    ngOnChanges(changes: SimpleChanges) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    }

}

export interface IMultiBarChart {
    data: IMultiBarChartData[];
    chartWidth: number;
    chartHeight: number;
    chartXaxisLabel;
    chartYaxisLabel;
    IsStackedChart: boolean;
    wrapLabels: boolean;
  //  rotateLabels?: number;

}
export interface IMultiBarChartData {
    key: string;
    color?: string;
    values: any[];
}