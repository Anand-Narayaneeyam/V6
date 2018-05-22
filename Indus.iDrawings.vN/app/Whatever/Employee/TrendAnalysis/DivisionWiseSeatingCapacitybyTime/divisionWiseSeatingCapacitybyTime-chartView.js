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
var reportviewercomponent_1 = require('../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var linechart_component_1 = require('../../../../Framework/Whatever/Charts/linechart.component');
var dashboard_component_1 = require('../../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../../Framework/Whatever/Dashboard/widget.component');
var administration_service_1 = require('../../../../models/administration/administration.service');
var employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView = (function () {
    function employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView() {
        this.FromRpDate = "";
        this.ToRpDate = "";
        this.chartData = "";
    }
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype.ngOnInit = function () {
        this.pagePath = "Employees / Show Trend / Division wise Seating Capacity by Time";
        this.LoadSeatingCapacitydataDetailsForDashboard();
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView.prototype.LoadSeatingCapacitydataDetailsForDashboard = function () {
        var contextObj = this;
        var seatingCapacityData = JSON.parse(this.chartData.Data.Table1);
        var orgName = JSON.parse(this.chartData.Data.Table2)[0].Column1;
        var lineChartSeatingCapacityData = [];
        var orgSeats = [];
        var totalSeats = [];
        //orgSeats.push({
        //    ladel: 2015,
        //    value: ""
        //});
        //totalSeats.push({
        //    ladel: 2015,
        //    value: ""
        //});
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
        //    ladel: 2018,
        //    value: ""
        //});
        //totalSeats.push({
        //    ladel: 2018,
        //    value: ""
        //});
        lineChartSeatingCapacityData.push({ key: orgName, values: orgSeats }, { key: "TotalSeats", values: totalSeats });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: 800, chartHeight: 650, chartXaxisLabel: "Year", chartYaxisLabel: "Seating Capacity" };
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
            templateUrl: './app/Views/Employee/TrendAnalysis/DivisionWiseSeatingCapacitybyTime/divisionWiseSeatingCapacitybyTime-chartView.html',
            providers: [administration_service_1.AdministrationService],
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, linechart_component_1.LineChart, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView);
    return employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView;
}());
exports.employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView = employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView;
//# sourceMappingURL=divisionWiseSeatingCapacitybyTime-chartView.js.map