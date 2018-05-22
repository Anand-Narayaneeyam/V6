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
var LineChart = (function () {
    function LineChart() {
        this.sourceData = { data: undefined, chartWidth: 400, chartHeight: 400, chartXaxisLabel: "X Axis", chartYaxisLabel: "Y Axis" };
    }
    // @ViewChild(nvD3)
    // nvD3: nvD3;
    LineChart.prototype.ngOnInit = function () {
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
        };
        this.data = this.sourceData.data;
    };
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
    LineChart.prototype.ngOnChanges = function (changes) {
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    };
    LineChart = __decorate([
        core_1.Component({
            selector: 'linechart',
            inputs: ["sourceData", "isSourceChanged"],
            directives: [ng2_nvd3_1.nvD3],
            template: " <nvd3 *ngIf=\"options != undefined && data != undefined\" [options]=\"options\" [data]=\"data\"></nvd3>"
        }), 
        __metadata('design:paramtypes', [])
    ], LineChart);
    return LineChart;
}());
exports.LineChart = LineChart;
//# sourceMappingURL=linechart.component.js.map