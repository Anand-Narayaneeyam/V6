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
var scheduling_service_1 = require('../../../models/Scheduling/scheduling.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var dashboardscheduler_component_1 = require('../../../Framework/Whatever/Scheduler/dashboardscheduler.component');
var SchedulingDashBoard = (function () {
    function SchedulingDashBoard(SS) {
        this.SS = SS;
        this.pagePath = "Scheduling / Dashboard";
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.calculatedHeight = 100;
        this.ischanged = false;
        this.schedulerArrObj = new Array();
        this.Dateforcalender = "";
        this.totalItems1 = 0;
        this.totalItems2 = 0;
        this.roomday = [];
        this.seatday = [];
    }
    SchedulingDashBoard.prototype.ngOnInit = function () {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.ddlPeriod = {
            FormFieldId: 0,
            FieldId: 0,
            ReportFieldId: 0,
            FieldLabel: "",
            DataEntryControlId: 4,
            GenericDataTypeId: 6,
            Whitelist: { Id: 3, FormatString: null, RegularExpression: null },
            IsValidated: true,
            IsMandatory: false,
            IsVisible: true,
            IsEnabled: true,
            isContentHtml: null,
            Precision: 0,
            Scale: 1,
            Height: 30,
            Width: "120",
            IsSigned: false,
            RangeFrom: null,
            RangeTo: null,
            HelpText: null,
            IsGrouped: false,
            HasChild: false,
            ParentId: 0,
            IsSubField: false,
            LookupDetails: { LookupValues: [], PopupComponent: null },
        };
        contextObj.ddlPeriod.FieldValue = "2";
        contextObj.ddlPeriod.LookupDetails.LookupValues = [{ Id: 1, Value: "Today" }, { Id: 2, Value: "This Week" }, { Id: 3, Value: "This Month" }];
        contextObj.LoadSchedulingDashBoard(2);
    };
    SchedulingDashBoard.prototype.onChangeddlPeriod = function (period) {
        switch (period) {
            case "1":
                period = 1;
                break;
            case "2":
                period = 2;
                break;
            case "3":
                period = 3;
                break;
        }
        this.LoadSchedulingDashBoard(period);
    };
    SchedulingDashBoard.prototype.LoadSchedulingDashBoard = function (period) {
        var contextObj = this;
        debugger;
        this.SS.getRoomUsageForDashboard(period, false, null, null).subscribe(function (resultData) {
            debugger;
            var roomusage = JSON.parse(resultData.Table1);
            var MultiBarChartDataRoomUsage = [];
            var Usage = [];
            for (var _i = 0, roomusage_1 = roomusage; _i < roomusage_1.length; _i++) {
                var item = roomusage_1[_i];
                Usage.push({
                    label: item["Room No."], value: item["Duration"]
                });
            }
            MultiBarChartDataRoomUsage.push({ key: "Room No.", values: Usage });
            contextObj.Barchart1Data = { data: MultiBarChartDataRoomUsage, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            var seatusage = JSON.parse(resultData.Table2);
            var MultiBarChartDataSeatUsage = [];
            var Usage = [];
            for (var _a = 0, seatusage_1 = seatusage; _a < seatusage_1.length; _a++) {
                var item = seatusage_1[_a];
                Usage.push({
                    label: item["Seat No."], value: item["Duration"]
                });
            }
            MultiBarChartDataSeatUsage.push({ key: "Seat No.", values: Usage });
            contextObj.Barchart2Data = { data: MultiBarChartDataSeatUsage, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            contextObj.ischanged = !contextObj.ischanged;
        });
        this.SS.getRoomReservationCalendarForDashboard(period, 0, null, null).subscribe(function (resultData) {
            debugger;
            var table1 = JSON.parse(resultData);
            contextObj.totalItems1 = table1.length;
            contextObj.roomday = [];
            for (var _i = 0, table1_1 = table1; _i < table1_1.length; _i++) {
                var day = table1_1[_i];
                contextObj.roomday.push(day.Day);
            }
        });
        //this.SS.getSeatReservationCalendarForDashboard(period, 0, null, null).subscribe(function (resultData) {
        //    debugger
        //    var table2 = JSON.parse(resultData);
        //    contextObj.totalItems2 = table2.length;
        //    contextObj.seatday = [];
        //    for (let day of table2) {
        //        contextObj.seatday.push(day.Day);
        //    }
        //});
    };
    SchedulingDashBoard.prototype.LoadDrawingCategoryCount = function (event) {
        var contextObj = this;
        //this.ABS.GetDrawingCategoriesCountforDashboard(event).subscribe(function (resultData) {
        //    var Arr = JSON.parse(resultData);
        //    var PieChartData = { data: [], chartWidth: 520, chartHeight: 300, legendPosition: "top" };
        //    for (let item of Arr) {
        //        PieChartData.data.push({
        //            key: item["Category"], y: item["No.OfDrawings"]
        //        });
        //    }
        //    contextObj.DrawingCategoryCountMap[event] = PieChartData;
        //});
    };
    SchedulingDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent, dropdownlistcomponent_component_1.DropDownListComponent, dashboardscheduler_component_1.DashboardSchedulerComponent],
            providers: [scheduling_service_1.SchedulingService],
            templateUrl: "./app/Views/Scheduling/DashBoard/schedulingdashboard.component.html"
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService])
    ], SchedulingDashBoard);
    return SchedulingDashBoard;
}());
exports.SchedulingDashBoard = SchedulingDashBoard;
//# sourceMappingURL=schedulingdashboard.component.js.map