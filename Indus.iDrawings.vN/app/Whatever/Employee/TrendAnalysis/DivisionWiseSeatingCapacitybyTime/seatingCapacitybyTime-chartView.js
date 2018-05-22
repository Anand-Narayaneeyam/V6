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
var employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView = (function () {
    function employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView() {
        this.FromRpDate = "";
        this.ToRpDate = "";
        this.chartData = "";
    }
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype.ngOnInit = function () {
        var contextObj = this;
        if (/msie|Trident/.test(navigator.userAgent)) {
            contextObj.calculatedWidth = $(".pageContent").width() / 1.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 1.35;
        }
        else {
            contextObj.calculatedWidth = 0;
            contextObj.calculatedHeight = 0;
        }
        //this.pagePath = "Employees / Trend Analysis / Division wise Seating Capacity by Time";
        this.LoadSeatingCapacitydataDetailsForDashboard();
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype.LoadSeatingCapacitydataDetailsForDashboard = function () {
        var contextObj = this;
        var seatingCapacityData = JSON.parse(this.chartData.Data.Table1);
        var orgName = JSON.parse(this.chartData.Data.Table2)[0].Column1;
        var lineChartSeatingCapacityData = [];
        var orgSeats = [];
        var totalSeats = [];
        var length;
        length = ((seatingCapacityData.length) - 1);
        //orgSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        orgSeats.push({
            label: seatingCapacityData[0].Year - 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        totalSeats.push({
            label: seatingCapacityData[0].Year - 1,
            value: null
        });
        //contextObj.data = [];        
        for (var _i = 0, seatingCapacityData_1 = seatingCapacityData; _i < seatingCapacityData_1.length; _i++) {
            var item = seatingCapacityData_1[_i];
            orgSeats.push({
                label: item["Year"], value: item["OrgSeats"]
            });
            totalSeats.push({
                label: item["Year"], value: item["TotalSeats"]
            });
        }
        //orgSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        orgSeats.push({
            label: seatingCapacityData[length].Year + 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        totalSeats.push({
            label: seatingCapacityData[length].Year + 1,
            value: null
        });
        //orgSeats.push({
        //    label: 2018,
        //    value: 0
        //});
        //totalSeats.push({
        //    label: 2018,
        //    value: null
        //});
        lineChartSeatingCapacityData.push({ key: orgName, values: orgSeats, color: '#FF0000' }, { key: "Total Seats", values: totalSeats, color: '#008000' });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "Seating Capacity" };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype, "FromRpDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype, "ToRpDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype, "chartData", void 0);
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView = __decorate([
        core_1.Component({
            selector: 'employee-TrendAnalysis-DivisionWiseSeatingCapacitybyTimeChartView',
            templateUrl: './app/Views/Employee/TrendAnalysis/DivisionWiseSeatingCapacitybyTime/seatingCapacitybyTime-chartView.html',
            providers: [],
            directives: [linechart_component_1.LineChart]
        }), 
        __metadata('design:paramtypes', [])
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView);
    return employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView;
}());
exports.employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView = employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView;
//# sourceMappingURL=seatingCapacitybyTime-chartView.js.map