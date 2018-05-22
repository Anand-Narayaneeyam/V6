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
var employeeTrendAnalysisRateofHiringbyTimeChartView = (function () {
    function employeeTrendAnalysisRateofHiringbyTimeChartView() {
        this.FromRpDate = "";
        this.ToRpDate = "";
        this.chartData = "";
    }
    employeeTrendAnalysisRateofHiringbyTimeChartView.prototype.ngOnInit = function () {
        var contextObj = this;
        if (/msie|Trident/.test(navigator.userAgent)) {
            contextObj.calculatedWidth = $(".pageContent").width() / 1.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 1.35;
        }
        else {
            contextObj.calculatedWidth = 0;
            contextObj.calculatedHeight = 0;
        }
        this.LoadRateofHiringbyTimeDataDetailsForDashboard();
    };
    employeeTrendAnalysisRateofHiringbyTimeChartView.prototype.LoadRateofHiringbyTimeDataDetailsForDashboard = function () {
        var contextObj = this;
        var seatingCapacityData = JSON.parse(this.chartData.Data.Table1);
        var orgName = JSON.parse(this.chartData.Data.Table2)[0].OrgUnitName;
        var lineChartSeatingCapacityData = [];
        var orgEmployee = [];
        var totalEmployee = [];
        var length;
        length = ((seatingCapacityData.length) - 1);
        debugger;
        orgEmployee.push({
            label: seatingCapacityData[0].Period - 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        totalEmployee.push({
            label: seatingCapacityData[0].Period - 1,
            value: null
        });
        for (var _i = 0, seatingCapacityData_1 = seatingCapacityData; _i < seatingCapacityData_1.length; _i++) {
            var item = seatingCapacityData_1[_i];
            orgEmployee.push({
                label: item["Period"], value: item["TotalOrgEmployees"]
            });
            totalEmployee.push({
                label: item["Period"], value: item["TotalEmployees"]
            });
        }
        orgEmployee.push({
            label: seatingCapacityData[length].Period + 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        totalEmployee.push({
            label: seatingCapacityData[length].Period + 1,
            value: null
        });
        lineChartSeatingCapacityData.push({ key: orgName, values: orgEmployee, color: '#FF0000' }, { key: "Total Employees", values: totalEmployee, color: '#008000' });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "No. of Employees" };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], employeeTrendAnalysisRateofHiringbyTimeChartView.prototype, "FromRpDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], employeeTrendAnalysisRateofHiringbyTimeChartView.prototype, "ToRpDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], employeeTrendAnalysisRateofHiringbyTimeChartView.prototype, "chartData", void 0);
    employeeTrendAnalysisRateofHiringbyTimeChartView = __decorate([
        core_1.Component({
            selector: 'employee-TrendAnalysis-RateofHiringbyTimeChartView',
            templateUrl: './app/Views/Employee/TrendAnalysis/RateofHiringbyTime/rateofHiringbyTime-chartView.html',
            providers: [],
            directives: [linechart_component_1.LineChart]
        }), 
        __metadata('design:paramtypes', [])
    ], employeeTrendAnalysisRateofHiringbyTimeChartView);
    return employeeTrendAnalysisRateofHiringbyTimeChartView;
}());
exports.employeeTrendAnalysisRateofHiringbyTimeChartView = employeeTrendAnalysisRateofHiringbyTimeChartView;
//# sourceMappingURL=rateofHiringbyTime-chartView.js.map