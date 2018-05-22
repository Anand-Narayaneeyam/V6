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
var realproperty_service_1 = require('../../../models/realproperty/realproperty.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var RealPropertyDashBoard = (function () {
    function RealPropertyDashBoard(RPS) {
        this.RPS = RPS;
        this.pagePath = "Real Property / Dashboard";
        //ddlSite: IField;
        // ddlBuilding: IField;
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.calculatedHeight = 100;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    }
    //this.nvD3.chart.update()
    RealPropertyDashBoard.prototype.ngOnInit = function () {
        //debugger
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2.10;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadLeaseExpirationSqFtForDashboard();
        contextObj.LoadLeaseRentableAreaForDashboard();
        contextObj.LoadLeasedBuildingOccupancyForDashboard();
    };
    RealPropertyDashBoard.prototype.LoadSubscribedFeatureForAreaUnit = function () {
        var contextObjAreaUnit = this;
        this.RPS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                contextObjAreaUnit.AreaUnit = 'Sq. Mt.';
            }
        });
    };
    RealPropertyDashBoard.prototype.LoadLeaseExpirationSqFtForDashboard = function () {
        var contextObjLeaseExpirationSqFt = this;
        this.RPS.GetLeaseExpirationSqFtForDashboard().subscribe(function (resultData) {
            var LeaseExpirationSqFtArr = JSON.parse(resultData);
            // contextObjLeaseExpirationSqFt.Barchart1Data = { data: [], chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", rotateLabels: 0 };
            var userCount = 0;
            var BarChartDataLeaseExpirationSqFt = [];
            var Area = [];
            for (var _i = 0, LeaseExpirationSqFtArr_1 = LeaseExpirationSqFtArr; _i < LeaseExpirationSqFtArr_1.length; _i++) {
                var item = LeaseExpirationSqFtArr_1[_i];
                Area.push({
                    label: item["Year"], value: item["Area"]
                });
            }
            BarChartDataLeaseExpirationSqFt.push({ key: "Area", values: Area });
            contextObjLeaseExpirationSqFt.Barchart1Data = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    RealPropertyDashBoard.prototype.LoadLeaseRentableAreaForDashboard = function () {
        var contextObjLeaseRentableArea = this;
        this.RPS.GetLeaseRentableAreaForDashboard().subscribe(function (resultData) {
            var ObjLeaseRentableAreaArr = JSON.parse(resultData);
            contextObjLeaseRentableArea.PieChart1Data = { data: [], chartWidth: contextObjLeaseRentableArea.calculatedWidth, chartHeight: contextObjLeaseRentableArea.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, ObjLeaseRentableAreaArr_1 = ObjLeaseRentableAreaArr; _i < ObjLeaseRentableAreaArr_1.length; _i++) {
                var item = ObjLeaseRentableAreaArr_1[_i];
                //if (item["Area"] == "0.00") {
                //}
                //else {
                contextObjLeaseRentableArea.PieChart1Data.data.push({
                    key: item["LeaseIdentifier"], y: item["Area"]
                });
            }
        });
    };
    RealPropertyDashBoard.prototype.LoadLeasedBuildingOccupancyForDashboard = function () {
        var contextObjLeasedBuildingOccupancy = this;
        this.RPS.GetLeasedBuildingOccupancyForDashboard().subscribe(function (resultData) {
            debugger;
            var LeasedBuildingOccupancyArr = JSON.parse(resultData);
            // contextObjLeasedBuildingOccupancy.Barchart2Data = { data: [], chartWidth: contextObjLeasedBuildingOccupancy.calculatedWidth, chartHeight: contextObjLeasedBuildingOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", rotateLabels: 0 };
            var userCount = 0;
            var BarChartDataLeaseExpirationSqFt = [];
            var Area = [];
            for (var _i = 0, LeasedBuildingOccupancyArr_1 = LeasedBuildingOccupancyArr; _i < LeasedBuildingOccupancyArr_1.length; _i++) {
                var item = LeasedBuildingOccupancyArr_1[_i];
                //contextObjLeaseExpirationSqFt.Barchart1Data.data.push({
                //    label: item["Year"], value: item["Area"]
                //});
                Area.push({
                    label: item["BuildingName"], value: item["Area"]
                });
            }
            BarChartDataLeaseExpirationSqFt.push({ key: "Area", values: Area });
            contextObjLeasedBuildingOccupancy.Barchart2Data = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeasedBuildingOccupancy.calculatedWidth, chartHeight: contextObjLeasedBuildingOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    RealPropertyDashBoard.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.RPS.GetCriticalLeaseDatesFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            var area = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 5737; });
            area.FieldLabel = "Area (" + contextObj.AreaUnit + ")";
            contextObj.dataLoad();
        });
    };
    RealPropertyDashBoard.prototype.dataLoad = function () {
        var contextObjDataLoad = this;
        // debugger
        contextObjDataLoad.RPS.GetCriticalLeaseDatesData("", contextObjDataLoad.inputItems.sortDir).subscribe(function (result) {
            //contextObj.totalItems = result["Data"].DataCount;
            debugger;
            contextObjDataLoad.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            for (var count = 0; count < contextObjDataLoad.itemsSource.length; count++) {
                switch (contextObjDataLoad.itemsSource[count]["RemainingDays"]) {
                    case 30:
                        var color = 'red';
                        break;
                    case 60:
                        var color = 'blue';
                        break;
                    case 180:
                        var color = 'green';
                        break;
                    default: break;
                }
                if (contextObjDataLoad.itemsSource[count]["RemainingDays"] > 0) {
                    contextObjDataLoad.itemsSource[count]["Lease Identifier"] = "<div style='color:" + color + "'>" + contextObjDataLoad.itemsSource[count]["Lease Identifier"] + "</div>";
                    contextObjDataLoad.itemsSource[count]["Date"] = "<div style='color:" + color + "'>" + contextObjDataLoad.itemsSource[count]["Date"] + "</div>";
                    contextObjDataLoad.itemsSource[count]["Description"] = "<div style='color:" + color + "'>" + contextObjDataLoad.itemsSource[count]["Description"] + "</div>";
                    contextObjDataLoad.itemsSource[count]["Area (Sq. Ft.)"] = "<div style='color:" + color + "'>" + contextObjDataLoad.itemsSource[count]["Area (Sq. Ft.)"] + "</div>";
                }
            }
        });
    };
    RealPropertyDashBoard.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    RealPropertyDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [realproperty_service_1.RealPropertyService],
            templateUrl: "./app/Views/RealProperty/DashBoard/realpropertydashboard.component.html"
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService])
    ], RealPropertyDashBoard);
    return RealPropertyDashBoard;
}());
exports.RealPropertyDashBoard = RealPropertyDashBoard;
//# sourceMappingURL=realpropertydashboard.component.js.map