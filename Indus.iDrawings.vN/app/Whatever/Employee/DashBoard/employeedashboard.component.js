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
var employee_services_1 = require('../../../models/employee/employee.services');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var EmployeeDashBoard = (function () {
    function EmployeeDashBoard(ES) {
        this.ES = ES;
        this.changeHapndOrgOccupancy = false;
        this.changeHapndSpaceStd = false;
        this.changeHapndBldngOccupancy = false;
        //changeHapnd: boolean = false;
        this.pagePath = "Employees / Dashboard";
        this.alignContent = "horizontal";
        this.OrgLvel1Name = 'Division';
        this.BldngFloorLabel = 'Building';
        this.calculatedHeight = 100;
    }
    //this.nvD3.chart.update()
    EmployeeDashBoard.prototype.ngOnInit = function () {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.ES.GetOrganizationalStructure().subscribe(function (resultDataOrgLvl) {
            // debugger
            contextObj.OrgLvel1Name = resultDataOrgLvl.LookupValues[0].Value;
        });
        contextObj.ES.ddlLoadSite().subscribe(function (resultDataSite) {
            //debugger
            contextObj.ddlSite = resultDataSite.Data[0];
            contextObj.ddlSite.FieldValue = "0";
            contextObj.ddlBuilding = resultDataSite.Data[1];
            if (window["IsMobile"] == true) {
                contextObj.alignContent = "vertical";
                contextObj.ddlSite.Width = "100";
                contextObj.ddlBuilding.Width = "100";
            }
            contextObj.ddlBuilding.LookupDetails.LookupValues = [{ Id: 0, Value: "--All Buildings--" }];
            contextObj.ddlBuilding.FieldValue = "0";
        });
        contextObj.LoadOrgOccupancyCharts("0", "0");
        contextObj.LoadBldngOccupancyChart("0", "0");
        contextObj.LoadSpaceStandardOccupancyChart("0", "0");
    };
    EmployeeDashBoard.prototype.onChangeddlSite = function (siteId) {
        //debugger
        var contextObj = this;
        //var building: IField = contextObj.fieldDetailsAdd.find(function (item) {
        //    return item.FieldId === 1303
        //});
        contextObj.ddlBuilding.FieldValue = "0";
        contextObj.BldngFloorLabel = "Building";
        contextObj.ES.loadBuilding(siteId, 1302).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                contextObj.ddlBuilding.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (contextObj.ddlBuilding.LookupDetails.LookupValues.length == 1) {
                    contextObj.ddlBuilding.FieldValue = contextObj.ddlBuilding.LookupDetails.LookupValues[0].Id.toString();
                }
                contextObj.LoadOrgOccupancyCharts(siteId, "0");
                contextObj.LoadBldngOccupancyChart(siteId, "0");
                contextObj.LoadSpaceStandardOccupancyChart(siteId, "0");
            }
        });
    };
    EmployeeDashBoard.prototype.onChangeddlBuilding = function (buildingId) {
        // debugger
        var contextObj = this;
        //var building: IField = contextObj.fieldDetailsAdd.find(function (item) {
        //    return item.FieldId === 1303
        //});
        var bldngsiteId = contextObj.ddlSite.FieldValue;
        if (buildingId.length > 0) {
            if (parseInt(buildingId) > 0) {
                contextObj.BldngFloorLabel = "Floor";
            }
            else {
                contextObj.BldngFloorLabel = "Building";
            }
            contextObj.LoadOrgOccupancyCharts(bldngsiteId, buildingId);
            contextObj.LoadBldngOccupancyChart(bldngsiteId, buildingId);
            contextObj.LoadSpaceStandardOccupancyChart(bldngsiteId, buildingId);
        }
    };
    EmployeeDashBoard.prototype.LoadOrgOccupancyCharts = function (siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //contextObj.data = [];
            // contextObjOrgOccupancy.Barchart2Data = undefined;
            // contextObjOrgOccupancy.PieChart1Data = undefined;
            contextObjOrgOccupancy.PieChart1Data = { data: [], chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_1 = OrgOccupancyArr; _i < OrgOccupancyArr_1.length; _i++) {
                var item = OrgOccupancyArr_1[_i];
                contextObjOrgOccupancy.PieChart1Data.data.push({
                    key: item["Organization Unit"], y: item["Occupied"]
                });
                OccupiedSeats.push({
                    label: item["Organization Unit"], value: item["Occupied"]
                });
                FreeSeats.push({
                    label: item["Organization Unit"], value: item["Vacant"]
                });
            }
            MultiBarChartDataDivision.push({ key: "Occupied", values: OccupiedSeats }, { key: "Vacant", values: FreeSeats });
            contextObjOrgOccupancy.Barchart2Data = { data: MultiBarChartDataDivision, chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: true };
            contextObjOrgOccupancy.changeHapndOrgOccupancy = !contextObjOrgOccupancy.changeHapndOrgOccupancy;
            // contextObjOrgOccupancy.nvD3.chart.update();
        });
    };
    EmployeeDashBoard.prototype.LoadBldngOccupancyChart = function (siteId, buildingId) {
        var contextObjBldngOccupancy = this;
        this.ES.getBuildingOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //contextObj.data = [];        
            for (var _i = 0, BldngOccupancyArr_1 = BldngOccupancyArr; _i < BldngOccupancyArr_1.length; _i++) {
                var item = BldngOccupancyArr_1[_i];
                OccupiedSeats.push({
                    label: item["BuildingName"], value: item["Occupied"]
                });
                FreeSeats.push({
                    label: item["BuildingName"], value: item["Vacant"]
                });
            }
            //  contextObjBldngOccupancy.Barchart1Data = undefined;
            MultiBarChartDataBldng.push({ key: "Occupied", values: OccupiedSeats }, { key: "Vacant", values: FreeSeats });
            contextObjBldngOccupancy.Barchart1Data = { data: MultiBarChartDataBldng, chartWidth: contextObjBldngOccupancy.calculatedWidth, chartHeight: contextObjBldngOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            contextObjBldngOccupancy.changeHapndBldngOccupancy = !contextObjBldngOccupancy.changeHapndBldngOccupancy;
        });
    };
    EmployeeDashBoard.prototype.LoadSpaceStandardOccupancyChart = function (siteId, buildingId) {
        var contextObjSpStdOccupancy = this;
        this.ES.getSpaceStandardOccupancy(siteId, buildingId).subscribe(function (resultData) {
            //debugger;
            console.log(JSON.parse(resultData));
            var SpStdArr = JSON.parse(resultData);
            //contextObj.data = [];
            //  contextObjSpStdOccupancy.PieChart2Data = undefined;
            contextObjSpStdOccupancy.PieChart2Data = { data: [], chartWidth: contextObjSpStdOccupancy.calculatedWidth, chartHeight: contextObjSpStdOccupancy.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, SpStdArr_1 = SpStdArr; _i < SpStdArr_1.length; _i++) {
                var item = SpStdArr_1[_i];
                contextObjSpStdOccupancy.PieChart2Data.data.push({
                    key: item["SpaceStandardName"], y: item["Occupied"]
                });
            }
            contextObjSpStdOccupancy.changeHapndSpaceStd = !contextObjSpStdOccupancy.changeHapndSpaceStd;
            // contextObjSpStdOccupancy.nvD3.chart.update();
        });
    };
    EmployeeDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent],
            providers: [employee_services_1.EmployeeService],
            templateUrl: "./app/Views/Employee/DashBoard/employeedashboard.component.html"
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService])
    ], EmployeeDashBoard);
    return EmployeeDashBoard;
}());
exports.EmployeeDashBoard = EmployeeDashBoard;
//# sourceMappingURL=employeedashboard.component.js.map