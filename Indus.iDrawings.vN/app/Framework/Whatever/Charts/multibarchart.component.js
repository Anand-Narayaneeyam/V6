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
var MultiBarChart = (function () {
    function MultiBarChart() {
        this.sourceData = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: true };
    }
    MultiBarChart.prototype.ngOnInit = function () {
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
                },
                yAxis: {
                    axisLabel: this.sourceData.chartYaxisLabel,
                    axisLabelDistance: -20,
                    tickFormat: function (d) {
                        return d3.format(',.f')(d);
                    }
                }
            }
        };
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
    };
    MultiBarChart.prototype.ngOnChanges = function (changes) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    };
    MultiBarChart = __decorate([
        core_1.Component({
            selector: 'multibarchart',
            inputs: ["sourceData", "isSourceChanged"],
            directives: [ng2_nvd3_1.nvD3],
            template: " <nvd3 *ngIf=\"options != undefined && data != undefined\" [options]=\"options\" [data]=\"data\"></nvd3>"
        }), 
        __metadata('design:paramtypes', [])
    ], MultiBarChart);
    return MultiBarChart;
}());
exports.MultiBarChart = MultiBarChart;
//# sourceMappingURL=multibarchart.component.js.map