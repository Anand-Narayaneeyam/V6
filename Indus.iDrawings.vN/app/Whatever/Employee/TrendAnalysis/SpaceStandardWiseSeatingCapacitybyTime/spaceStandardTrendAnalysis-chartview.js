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
var linechart_component_1 = require('../../../../Framework/Whatever/Charts/linechart.component');
var SpaceStandardTrendAnalysisChartview = (function () {
    function SpaceStandardTrendAnalysisChartview() {
        this.chartData = "";
    }
    SpaceStandardTrendAnalysisChartview.prototype.ngOnInit = function () {
        var contextObj = this;
        if (/msie|Trident/.test(navigator.userAgent)) {
            contextObj.calculatedWidth = $(".pageContent").width() / 1.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 1.35;
        }
        else {
            contextObj.calculatedWidth = 0;
            contextObj.calculatedHeight = 0;
        }
        this.LoadSpaceStandardChartForTrendAnalysis();
    };
    SpaceStandardTrendAnalysisChartview.prototype.LoadSpaceStandardChartForTrendAnalysis = function () {
        var contextObj = this;
        var seatingCapacitySpaceStandardData = JSON.parse(this.chartData.Data.Table1);
        var seatingCapacityTotalData = JSON.parse(this.chartData.Data.Table2);
        var lineChartSeatingCapacityData = [];
        var SpaceStandardData = [];
        var TotalData = [];
        var orgName = "";
        var minYear = 0;
        var maxYear = 2100;
        var dataLength = 0;
        dataLength = seatingCapacityTotalData.length - 1;
        minYear = seatingCapacityTotalData[0]["Year"] - 1;
        maxYear = seatingCapacityTotalData[dataLength]["Year"] + 1;
        for (var _i = 0, seatingCapacitySpaceStandardData_1 = seatingCapacitySpaceStandardData; _i < seatingCapacitySpaceStandardData_1.length; _i++) {
            var item = seatingCapacitySpaceStandardData_1[_i];
            var keys = Object.keys(item);
            var remove = keys.find(function (item1) {
                return item1 === "Name";
            });
            var index = keys.indexOf(remove);
            if (index > -1)
                keys.splice(index, 1);
            remove = keys.find(function (item1) {
                return item1 === "Id";
            });
            index = keys.indexOf(remove);
            if (index > -1)
                keys.splice(index, 1);
            SpaceStandardData = [];
            SpaceStandardData.push({
                label: minYear, value: null
            });
            for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                var key1 = keys_1[_a];
                SpaceStandardData.push({
                    label: key1, value: item[parseInt(key1)]
                });
            }
            SpaceStandardData.push({
                label: maxYear, value: null
            });
            lineChartSeatingCapacityData.push({ key: item.Name, values: SpaceStandardData });
        }
        TotalData.push({
            label: minYear, value: null
        });
        for (var _b = 0, seatingCapacityTotalData_1 = seatingCapacityTotalData; _b < seatingCapacityTotalData_1.length; _b++) {
            var item = seatingCapacityTotalData_1[_b];
            TotalData.push({
                label: item["Year"], value: item["TotalSeats"]
            });
        }
        TotalData.push({
            label: maxYear, value: null
        });
        lineChartSeatingCapacityData.push({ key: "Total Seats", values: TotalData });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "Seating Capacity" };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceStandardTrendAnalysisChartview.prototype, "chartData", void 0);
    SpaceStandardTrendAnalysisChartview = __decorate([
        core_1.Component({
            selector: 'spaceStandardTrendAnalysis-chartview',
            templateUrl: './app/Views/Employee/TrendAnalysis/SpaceStandardWiseSeatingCapacitybyTime/spaceStandardTrendAnalysis-chartview.html',
            providers: [],
            directives: [linechart_component_1.LineChart]
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceStandardTrendAnalysisChartview);
    return SpaceStandardTrendAnalysisChartview;
}());
exports.SpaceStandardTrendAnalysisChartview = SpaceStandardTrendAnalysisChartview;
//# sourceMappingURL=spaceStandardTrendAnalysis-chartview.js.map