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
var BarChart = (function () {
    function BarChart() {
        this.sourceData = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "X Axis", chartYaxisLabel: "Y Axis", rotateLabels: 0 };
    }
    // @ViewChild(nvD3)
    // nvD3: nvD3;
    BarChart.prototype.ngOnInit = function () {
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
        };
        this.data = this.sourceData.data;
    };
    BarChart.prototype.ngOnChanges = function (changes) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    };
    BarChart = __decorate([
        core_1.Component({
            selector: 'barchart',
            inputs: ["sourceData", "isSourceChanged"],
            directives: [ng2_nvd3_1.nvD3],
            template: " <nvd3 *ngIf=\"options != undefined && data != undefined\" [options]=\"options\" [data]=\"data\"></nvd3>"
        }), 
        __metadata('design:paramtypes', [])
    ], BarChart);
    return BarChart;
}());
exports.BarChart = BarChart;
//# sourceMappingURL=barchart.component.js.map