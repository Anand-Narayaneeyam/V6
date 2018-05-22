import {Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
declare let d3: any;
import {nvD3} from 'ng2-nvd3';

var Highcharts = require('../../../../Scripts/highcharts.js');
require('../../../../Scripts/highcharts-more.js')(Highcharts);
export { Highcharts };


@Component({
    selector: 'gaugechart',
    inputs: ["sourceData", "isSourceChanged"],
    directives: [nvD3],
    template: `<div *ngIf="sourceData != undefined" id="container" style="min-width: {{sourceData.chartMinWidth}}px; max-width: {{sourceData.chartMaxWidth}}px; height: {{chartHeight}}px; margin: 0 auto"></div>`
})

export class GaugeChart implements OnInit, AfterViewInit {
    options;
    data;
    plotBands;
    isSourceChanged: boolean;
    highChrt: any;

    sourceData: IAngularGaugeChart = { value: undefined, plotBands: undefined, chartMinWidth: 310, chartMaxWidth: 400, chartHeight: 400, min: 0, max: 200 };
    ngOnInit() {

    } 
    ngAfterViewInit(){
        debugger;
        this.sourceData.plotBands = [{
                        from: 0,
                        to: 60,
                        color: '#55BF3B' // green
                        }, {
                            from: 60,
                            to: 140,
                            color: '#DDDF0D' // yellow
                        }, {
                            from: 140,
                            to: 200,
                            color: '#DF5353' // red
                        }];
        this.sourceData.value = [80];

        Highcharts.chart('container', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },

            title: {
                text: 'Speedometer'
            },

            pane: {           
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    }, 
                    borderWidth: 0, 
                    outerRadius: '109%'
                }, {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: this.sourceData.min,  // Configurable
                max: this.sourceData.max,  // Configurable
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'km/h'
                },
                plotBands: this.sourceData.plotBands,   // Configurable

            },
            series: [{
                name: 'Speed',
                data: this.sourceData.value,    // Configurable
                tooltip: {
                    valueSuffix: ' km/h'
                }
            },
                {
                    showInLegend: true,
                    name: "Acceptable",
                    color: '#55BF3B' // green   
                }, {
                    showInLegend: true,
                    name: "Marginal",
                    color: '#DDDF0D' // yellow  
                }, {
                    showInLegend: true,
                    name: "Unaccepatable",
                    color: '#DF5353' // red  
                }]
        }, function (chart) {
            if (!chart.renderer.forExport) {
                setInterval(function () {
                    var point = chart.series[0].points[0],
                        newVal,
                        inc = Math.round((Math.random() - 0.5) * 20);

                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }

                    point.update(newVal);

                }, 3000);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {

    }

}

export interface IGaugeChart {
    data: any[];
    chartWidth: number;
    chartHeight: number;
    legendPosition;
}

export interface IAngularGaugeChart {
    value: any[];
    plotBands: any[];
    chartMinWidth: number;
    chartMaxWidth: number;
    chartHeight: number;
    min: number;
    max: number;
}