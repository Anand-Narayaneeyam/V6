import {Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
declare let d3: any;
import {nvD3} from 'ng2-nvd3'


@Component({
    selector: 'piechart',
    inputs: ["sourceData","isSourceChanged"],
    directives: [nvD3],
    template: ` <nvd3 *ngIf="options != undefined && data != undefined" [options]="options" [data]="data"></nvd3>`

})

export class PieChart implements OnInit {
    options;
    data;
    isSourceChanged: boolean;
    sourceData: IPieChart = { data: undefined, chartWidth: 400, chartHeight: 400, legendPosition: "top" };

    ngOnInit() {
        this.options = {
            chart: {
                type: 'pieChart',
                title: 'Pie Chart',
                height: this.sourceData.chartHeight,
                width: this.sourceData.chartWidth,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                showLabels: false,
                showTooltipPercent: true,
                duration: 1500,
                labelThreshold: 0.01,
                cornerRadius: 10,
                legendPosition: this.sourceData.legendPosition,
               // useInteractiveGuideline: true,
                valueFormat: function (d) {
                    return d3.format(',.f')(d);
                },
                labelSunbeamLayout: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 20
                    }
                }
            }
        }
        this.data = this.sourceData.data;
    }
    //ngAfterViewInit() {
    //    // this.nvD3 - directive instance
    //    // for example, to update the chart
    //    debugger
    //    this.nvD3.chart.update()
    //}

    ngOnChanges(changes: SimpleChanges) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    }

}

export interface IPieChart {
    data: any[];
    chartWidth: number;
    chartHeight: number;
    legendPosition;
}