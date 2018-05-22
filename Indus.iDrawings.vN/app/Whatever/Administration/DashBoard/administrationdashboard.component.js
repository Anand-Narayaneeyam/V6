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
var administration_service_1 = require('../../../models/administration/administration.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var AdministrationDashBoard = (function () {
    function AdministrationDashBoard(AS) {
        this.AS = AS;
        this.pagePath = "Administration / Dashboard";
        //ddlSite: IField;
        // ddlBuilding: IField;
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.calculatedHeight = 100;
        this.calculatedHeightPercent = 100;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    }
    //this.nvD3.chart.update()
    AdministrationDashBoard.prototype.ngOnInit = function () {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        // contextObj.calculatedHeightPercent = (contextObj.calculatedHeight / $(".pageContent").height()) * 100;
        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadUserCountForDashBoard();
        contextObj.LoadSpaceBarChartDetailsForDashboard();
        contextObj.LoadDrawingDistributionForDashBoard();
    };
    AdministrationDashBoard.prototype.LoadUserCountForDashBoard = function () {
        var contextObjGUserCount = this;
        this.AS.GetUserCountForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var UserCountArr = JSON.parse(resultData);
            contextObjGUserCount.PieChart1Data = { data: [], chartWidth: contextObjGUserCount.calculatedWidth, chartHeight: contextObjGUserCount.calculatedHeight, legendPosition: "top" };
            var userCount = 0;
            for (var _i = 0, UserCountArr_1 = UserCountArr; _i < UserCountArr_1.length; _i++) {
                var item = UserCountArr_1[_i];
                userCount = userCount + parseInt(item["UserCount"]);
                contextObjGUserCount.PieChart1Data.data.push({
                    key: item["Name"], y: item["UserCount"]
                });
            }
            contextObjGUserCount.UserCount = userCount.toString();
        });
    };
    AdministrationDashBoard.prototype.LoadSubscribedFeatureForAreaUnit = function () {
        var contextObjAreaUnit = this;
        this.AS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjAreaUnit.AreaUnit = 'Sq.Mt.';
            }
        });
    };
    AdministrationDashBoard.prototype.LoadDrawingDistributionForDashBoard = function () {
        var contextObjDwgDistribution = this;
        this.AS.GetDrawingDistributionForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var dwgCountArr = JSON.parse(resultData);
            contextObjDwgDistribution.PieChart2Data = { data: [], chartWidth: contextObjDwgDistribution.calculatedWidth, chartHeight: contextObjDwgDistribution.calculatedHeight, legendPosition: "top" };
            var dwgCount = 0;
            for (var _i = 0, dwgCountArr_1 = dwgCountArr; _i < dwgCountArr_1.length; _i++) {
                var item = dwgCountArr_1[_i];
                dwgCount = dwgCount + parseInt(item["Counts"]);
                contextObjDwgDistribution.PieChart2Data.data.push({
                    key: item["Category"], y: item["Counts"]
                });
            }
            contextObjDwgDistribution.DwgCount = dwgCount.toString();
        });
    };
    AdministrationDashBoard.prototype.LoadSpaceBarChartDetailsForDashboard = function () {
        var contextObjSpaceBarChartDetails = this;
        this.AS.GetSpaceBarChartDetailsForDashboard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng = [];
            var Usable = [];
            var Common = [];
            var Chargeable = [];
            //contextObj.data = [];        
            for (var _i = 0, BldngOccupancyArr_1 = BldngOccupancyArr; _i < BldngOccupancyArr_1.length; _i++) {
                var item = BldngOccupancyArr_1[_i];
                Usable.push({
                    label: item["Building"], value: item["Usable"]
                });
                Common.push({
                    label: item["Building"], value: item["Common"]
                });
                Chargeable.push({
                    label: item["Building"], value: item["Chargeable"]
                });
            }
            MultiBarChartDataBldng.push({ key: "Usable", values: Usable }, { key: "Common", values: Common }, { key: "Chargeable", values: Chargeable });
            contextObjSpaceBarChartDetails.Barchart1Data = { data: MultiBarChartDataBldng, chartWidth: contextObjSpaceBarChartDetails.calculatedWidth, chartHeight: contextObjSpaceBarChartDetails.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    AdministrationDashBoard.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.AS.GetExpiredUserFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    AdministrationDashBoard.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.AS.GetExpiredUserData(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            for (var count = 0; count < contextObj.itemsSource.length; count++) {
                switch (contextObj.itemsSource[count]["RemainingDays"]) {
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
                if (contextObj.itemsSource[count]["RemainingDays"] > 0) {
                    contextObj.itemsSource[count]["User Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["User Name"] + "</div>";
                    contextObj.itemsSource[count]["Login Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["Login Name"] + "</div>";
                    contextObj.itemsSource[count]["User Role"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["User Role"] + "</div>";
                    contextObj.itemsSource[count]["Account Expiry Date"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["Account Expiry Date"] + "</div>";
                }
            }
        });
    };
    AdministrationDashBoard.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    };
    AdministrationDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [administration_service_1.AdministrationService],
            templateUrl: "./app/Views/Administration/DashBoard/administrationdashboard.component.html"
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], AdministrationDashBoard);
    return AdministrationDashBoard;
}());
exports.AdministrationDashBoard = AdministrationDashBoard;
//# sourceMappingURL=administrationdashboard.component.js.map