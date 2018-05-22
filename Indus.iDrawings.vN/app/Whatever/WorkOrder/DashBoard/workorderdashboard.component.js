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
var piechart_component_1 = require('../../../Framework/Whatever/Charts/piechart.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var multibarchart_component_1 = require('../../../Framework/Whatever/Charts/multibarchart.component');
var workorder_service_1 = require('../../../models/workorder/workorder.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var WorkOrderDashBoard = (function () {
    function WorkOrderDashBoard(WOS) {
        this.WOS = WOS;
        //changeHapnd: boolean = false;
        this.pagePath = "Work Order / Dashboard";
        //ddlSite: IField;
        // ddlBuilding: IField;
        this.alignContent = "horizontal";
        this.calculatedHeight = 100;
    }
    WorkOrderDashBoard.prototype.ngOnInit = function () {
        // debugger
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.LoadNonPMWOStatusForDashBoard();
        contextObj.LoadOpenedRequestAndNonPMWOAgingForDashBoard();
        contextObj.LoadPMWOStatusForDashBoard();
        contextObj.LoadOpenedPMWOAgingForDashBoard();
    };
    WorkOrderDashBoard.prototype.LoadOpenedRequestAndNonPMWOAgingForDashBoard = function () {
        var contextObjOpenedRequestAndNonPMWOAging = this;
        this.WOS.GetOpenedRequestAndNonPMWOAgingForDashBoard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OpenedRequestAndNonPMWOAgingArr = JSON.parse(resultData);
            var MultiBarChartDataOpenedRequestAndNonPMWOAging = [];
            var Legend1 = [];
            var Legend2 = [];
            var Legend3 = [];
            var Legend4 = [];
            //contextObj.data = [];        
            for (var _i = 0, OpenedRequestAndNonPMWOAgingArr_1 = OpenedRequestAndNonPMWOAgingArr; _i < OpenedRequestAndNonPMWOAgingArr_1.length; _i++) {
                var item = OpenedRequestAndNonPMWOAgingArr_1[_i];
                Legend1.push({
                    label: item["Items"], value: item["0 to 30 days"]
                });
                Legend2.push({
                    label: item["Items"], value: item["31 to 60 days"]
                });
                Legend3.push({
                    label: item["Items"], value: item["61 to 90 days"]
                });
                Legend4.push({
                    label: item["Items"], value: item[">90 days"]
                });
            }
            MultiBarChartDataOpenedRequestAndNonPMWOAging.push({ key: "0 to 30 days", values: Legend1 }, { key: "31 to 60 days", values: Legend2 }, { key: "61 to 90 days", values: Legend3 }, { key: ">90 days", values: Legend4 });
            contextObjOpenedRequestAndNonPMWOAging.Barchart2Data = { data: MultiBarChartDataOpenedRequestAndNonPMWOAging, chartWidth: contextObjOpenedRequestAndNonPMWOAging.calculatedWidth, chartHeight: contextObjOpenedRequestAndNonPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    WorkOrderDashBoard.prototype.LoadOpenedPMWOAgingForDashBoard = function () {
        var contextObjOpenedPMWOAging = this;
        this.WOS.GetOpenedPMWOAgingForDashBoard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OpenedpenedPMWOAgingArr = JSON.parse(resultData);
            var MultiBarChartDataOpenedpenedPMWOAging = [];
            var Legend1 = [];
            var Legend2 = [];
            var Legend3 = [];
            var Legend4 = [];
            //contextObj.data = [];        
            for (var _i = 0, OpenedpenedPMWOAgingArr_1 = OpenedpenedPMWOAgingArr; _i < OpenedpenedPMWOAgingArr_1.length; _i++) {
                var item = OpenedpenedPMWOAgingArr_1[_i];
                Legend1.push({
                    label: item["Items"], value: item["0 to 30 days"]
                });
                Legend2.push({
                    label: item["Items"], value: item["31 to 60 days"]
                });
                Legend3.push({
                    label: item["Items"], value: item["61 to 90 days"]
                });
                Legend4.push({
                    label: item["Items"], value: item[">90 days"]
                });
            }
            MultiBarChartDataOpenedpenedPMWOAging.push({ key: "0 to 30 days", values: Legend1 }, { key: "31 to 60 days", values: Legend2 }, { key: "61 to 90 days", values: Legend3 }, { key: ">90 days", values: Legend4 });
            contextObjOpenedPMWOAging.Barchart1Data = { data: MultiBarChartDataOpenedpenedPMWOAging, chartWidth: contextObjOpenedPMWOAging.calculatedWidth, chartHeight: contextObjOpenedPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    WorkOrderDashBoard.prototype.LoadNonPMWOStatusForDashBoard = function () {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetNonPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart2Data = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, NonPMWOStatusArr_1 = NonPMWOStatusArr; _i < NonPMWOStatusArr_1.length; _i++) {
                var item = NonPMWOStatusArr_1[_i];
                contextObjNonPMWOStatus.PieChart2Data.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    };
    WorkOrderDashBoard.prototype.LoadPMWOStatusForDashBoard = function () {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart1Data = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, NonPMWOStatusArr_2 = NonPMWOStatusArr; _i < NonPMWOStatusArr_2.length; _i++) {
                var item = NonPMWOStatusArr_2[_i];
                contextObjNonPMWOStatus.PieChart1Data.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    };
    WorkOrderDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [workorder_service_1.WorkOrdereService],
            templateUrl: "./app/Views/WorkOrder/DashBoard/workorderdashboard.component.html"
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService])
    ], WorkOrderDashBoard);
    return WorkOrderDashBoard;
}());
exports.WorkOrderDashBoard = WorkOrderDashBoard;
//# sourceMappingURL=workorderdashboard.component.js.map