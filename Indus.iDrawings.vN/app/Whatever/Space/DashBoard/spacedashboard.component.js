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
var space_service_1 = require('../../../models/space/space.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var SpaceDashBoard = (function () {
    function SpaceDashBoard(SpS) {
        this.SpS = SpS;
        this.changeHapndOrgOccupancy = false;
        this.changeHapndSpaceStd = false;
        this.changeHapndBldngOccupancy = false;
        //changeHapnd: boolean = false;
        this.pagePath = "Space / Dashboard";
        //ddlSite: IField;
        // ddlBuilding: IField;
        this.alignContent = "horizontal";
        this.GrossArea = '';
        this.OrgArea = '';
        this.AreaUnit = 'Sq. Ft.';
        this.BldngFloorLabel = 'Building';
        this.calculatedHeight = 100;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    }
    //this.nvD3.chart.update()
    SpaceDashBoard.prototype.ngOnInit = function () {
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
        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadGrossAreaDistributionbyCategory();
        contextObj.LoadSpaceBarChartDetailsForDashboard();
        contextObj.LoadOrganizationalDistributionChart();
    };
    SpaceDashBoard.prototype.LoadSubscribedFeatureForAreaUnit = function () {
        var contextObjSubFeat = this;
        this.SpS.checkSubscribedFeature("32").subscribe(function (resultData) {
            // debugger
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjSubFeat.AreaUnit = 'Sq.Mt.';
            }
        });
    };
    SpaceDashBoard.prototype.LoadGrossAreaDistributionbyCategory = function () {
        var contextObjGrossAreaDist = this;
        this.SpS.GetGrossAreaDistributionbyCategoryForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData["Data"]));
            var GrossAreaDistArr = JSON.parse(resultData);
            contextObjGrossAreaDist.PieChart1Data = { data: [], chartWidth: contextObjGrossAreaDist.calculatedWidth, chartHeight: contextObjGrossAreaDist.calculatedHeight, legendPosition: "top" };
            var totalArea = 0;
            for (var _i = 0, GrossAreaDistArr_1 = GrossAreaDistArr; _i < GrossAreaDistArr_1.length; _i++) {
                var item = GrossAreaDistArr_1[_i];
                for (var _a = 0, _b = Object.keys(item); _a < _b.length; _a++) {
                    var key = _b[_a];
                    totalArea = totalArea + parseFloat(item[key]);
                    contextObjGrossAreaDist.PieChart1Data.data.push({
                        key: key, y: item[key]
                    });
                }
            }
            if (isNaN(totalArea)) {
                totalArea = 0;
            }
            contextObjGrossAreaDist.GrossArea = totalArea.toFixed(2);
        });
    };
    SpaceDashBoard.prototype.LoadSpaceBarChartDetailsForDashboard = function () {
        var contextObjSpaceBarChartDetails = this;
        this.SpS.GetSpaceBarChartDetailsForDashboard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
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
    SpaceDashBoard.prototype.LoadOrganizationalDistributionChart = function () {
        var contextObjOrgDist = this;
        this.SpS.GetOrgDistributionChartDetailsForDashboard().subscribe(function (resultData) {
            //debugger;
            // console.log(JSON.parse(resultData));
            var OrgDistArr = JSON.parse(resultData);
            var totalArea = 0;
            contextObjOrgDist.PieChart2Data = { data: [], chartWidth: contextObjOrgDist.calculatedWidth, chartHeight: contextObjOrgDist.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgDistArr_1 = OrgDistArr; _i < OrgDistArr_1.length; _i++) {
                var item = OrgDistArr_1[_i];
                totalArea = totalArea + parseFloat(item["UsableArea"]);
                contextObjOrgDist.PieChart2Data.data.push({
                    key: item["Cost Center"], y: item["UsableArea"]
                });
            }
            if (isNaN(totalArea)) {
                totalArea = 0;
            }
            contextObjOrgDist.OrgArea = totalArea.toFixed(2);
        });
    };
    SpaceDashBoard.prototype.ngAfterViewInit = function () {
        // debugger
        var contextObjOrgDistribution = this;
        this.SpS.GetDashboardOrgDistributionColumns().subscribe(function (result) {
            //debugger
            contextObjOrgDistribution.fieldObject = (result["Data"]);
            contextObjOrgDistribution.dataLoad();
        });
    };
    SpaceDashBoard.prototype.dataLoad = function () {
        var contextObjDataLoad = this;
        // debugger
        contextObjDataLoad.SpS.GetDashboardOrgDistributionData("", contextObjDataLoad.inputItems.sortDir).subscribe(function (result) {
            //contextObj.totalItems = result["Data"].DataCount;
            // debugger
            contextObjDataLoad.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        });
    };
    SpaceDashBoard.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    SpaceDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [space_service_1.SpaceService],
            templateUrl: "./app/Views/Space/DashBoard/spacedashboard.component.html"
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService])
    ], SpaceDashBoard);
    return SpaceDashBoard;
}());
exports.SpaceDashBoard = SpaceDashBoard;
//# sourceMappingURL=spacedashboard.component.js.map