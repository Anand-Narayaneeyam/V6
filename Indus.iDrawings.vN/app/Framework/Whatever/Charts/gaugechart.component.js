var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_nvd3_1 = require('ng2-nvd3');
var Highcharts = require('../../../../Scripts/highcharts.js');
exports.Highcharts = Highcharts;
require('../../../../Scripts/highcharts-more.js')(Highcharts);
var GaugeChart = (function () {
    function GaugeChart() {
        this.sourceData = { value: undefined, plotBands: undefined, chartMinWidth: 310, chartMaxWidth: 400, chartHeight: 400, min: 0, max: 200 };
    }
    GaugeChart.prototype.ngOnInit = function () {
    };
    GaugeChart.prototype.ngAfterViewInit = function () {
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
                    }, {}, {
                        backgroundColor: '#DDD',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },
            // the value axis
            yAxis: {
                min: this.sourceData.min,
                max: this.sourceData.max,
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
                plotBands: this.sourceData.plotBands,
            },
            series: [{
                    name: 'Speed',
                    data: this.sourceData.value,
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
                    var point = chart.series[0].points[0], newVal, inc = Math.round((Math.random() - 0.5) * 20);
                    newVal = point.y + inc;
                    if (newVal < 0 || newVal > 200) {
                        newVal = point.y - inc;
                    }
                    point.update(newVal);
                }, 3000);
            }
        });
    };
    GaugeChart.prototype.ngOnChanges = function (changes) {
    };
    GaugeChart = __decorate([
        core_1.Component({
            selector: 'gaugechart',
            inputs: ["sourceData", "isSourceChanged"],
            directives: [ng2_nvd3_1.nvD3],
            template: "<div *ngIf=\"sourceData != undefined\" id=\"container\" style=\"min-width: {{sourceData.chartMinWidth}}px; max-width: {{sourceData.chartMaxWidth}}px; height: {{chartHeight}}px; margin: 0 auto\"></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeChart);
    return GaugeChart;
}());
exports.GaugeChart = GaugeChart;
//# sourceMappingURL=gaugechart.component.js.map