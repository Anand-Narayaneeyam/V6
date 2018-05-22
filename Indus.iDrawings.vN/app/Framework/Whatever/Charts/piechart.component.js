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
var PieChart = (function () {
    function PieChart() {
        this.sourceData = { data: undefined, chartWidth: 400, chartHeight: 400, legendPosition: "top" };
    }
    PieChart.prototype.ngOnInit = function () {
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
        };
        this.data = this.sourceData.data;
    };
    //ngAfterViewInit() {
    //    // this.nvD3 - directive instance
    //    // for example, to update the chart
    //    debugger
    //    this.nvD3.chart.update()
    //}
    PieChart.prototype.ngOnChanges = function (changes) {
        //debugger;
        if (changes && changes["isSourceChanged"] && changes["isSourceChanged"]["currentValue"] != changes["isSourceChanged"]["previousValue"]) {
            this.data = JSON.parse(JSON.stringify(this.sourceData.data));
        }
    };
    PieChart = __decorate([
        core_1.Component({
            selector: 'piechart',
            inputs: ["sourceData", "isSourceChanged"],
            directives: [ng2_nvd3_1.nvD3],
            template: " <nvd3 *ngIf=\"options != undefined && data != undefined\" [options]=\"options\" [data]=\"data\"></nvd3>"
        }), 
        __metadata('design:paramtypes', [])
    ], PieChart);
    return PieChart;
}());
exports.PieChart = PieChart;
//# sourceMappingURL=piechart.component.js.map