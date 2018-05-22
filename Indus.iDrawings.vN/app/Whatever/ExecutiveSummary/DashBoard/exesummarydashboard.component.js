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
//import {GaugeChart, IGaugeChart } from '../../../Framework/Whatever/Charts/gaugechart.component';
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var multibarchart_component_1 = require('../../../Framework/Whatever/Charts/multibarchart.component');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var administration_service_1 = require('../../../models/administration/administration.service');
var space_service_1 = require('../../../models/space/space.service');
var employee_services_1 = require('../../../models/employee/employee.services');
var objects_service_1 = require('../../../models/objects/objects.service');
var documents_service_1 = require('../../../models/documents/documents.service');
var workorder_service_1 = require('../../../models/workorder/workorder.service');
var realproperty_service_1 = require('../../../models/realproperty/realproperty.service');
var ng2_dnd_1 = require('../../../FrameWork/ExternalLibraries/dnd/ng2-dnd');
var executivesummary_service_1 = require('../../../Models/ExecutiveSummary/executivesummary.service');
//import  '../../../FrameWork/ExternalLibraries/Gridster/gridster'; 
//import  '../../../FrameWork/ExternalLibraries/Gridster/jquery.gridster.css'; 
//import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
//import  '../../../FrameWork/ExternalLibraries/Gridster/jquery.gridster'; 
//import { HTTP_PROVIDERS} from '@angular/http';
var ExeSummaryDashBoard = (function () {
    // inputItemsSpace: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    function ExeSummaryDashBoard(AS, SpS, executiveSummaryService, ES, ObjS, DS, WOS, RPS) {
        this.AS = AS;
        this.SpS = SpS;
        this.executiveSummaryService = executiveSummaryService;
        this.ES = ES;
        this.ObjS = ObjS;
        this.DS = DS;
        this.WOS = WOS;
        this.RPS = RPS;
        this.changeHapndOrgOccupancy = false;
        this.changeHapndSpaceStd = false;
        this.changeHapndBldngOccupancy = false;
        this.pagePath = "Executive Summary / Dashboard";
        //ddlSite: IField;
        // ddlBuilding: IField;
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.Division = 'Division';
        this.OrgLvel1Name = 'Division';
        this.BldngFloorLabel = 'Building';
        this.calculatedHeight = 100;
        this.calculatedHeightPercent = 100;
        this.Area = '';
        this.listWidgets = [];
        this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealthy drink!', 'Water'];
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    }
    ExeSummaryDashBoard.prototype.ngOnInit = function () {
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
        contextObj.ES.GetOrganizationalStructure().subscribe(function (resultDataOrgLvl) {
            contextObj.OrgLvel1Name = resultDataOrgLvl.LookupValues[0].Value;
        });
        contextObj.ObjS.GetOrganizationalStructure().subscribe(function (resultDataOrgLvl) {
            contextObj.Division = resultDataOrgLvl.LookupValues[0].Value;
        });
        var contextObj = this;
        this.executiveSummaryService.GetWidgetFields().subscribe(function (result) {
            contextObj.fieldObjectWidgets = (result["Data"]);
            contextObj.LoadSubscribedFeatureForAreaUnit();
            //contextObj.LoadUserCountForDashBoard();
            //contextObj.LoadSpaceBarChartDetailsForDashboard();
            //contextObj.LoadDrawingDistributionForDashBoard();
            contextObj.LoadDashboardWidgets();
        });
    };
    ExeSummaryDashBoard.prototype.LoadDashboardWidgets = function () {
        var contextObj = this;
        contextObj.executiveSummaryService.GetAllWidgets(contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            //debugger;
            contextObj.itemsSourceWidgets = JSON.parse(result["Data"].FieldBinderData).filter(function (widget) { return widget.IsSelected === 1; });
            for (var i = 0; i < contextObj.itemsSourceWidgets.length; i++) {
                switch (contextObj.itemsSourceWidgets[i].Id) {
                    case 1:
                        // debugger;
                        contextObj.LoadUserCountForDashBoard();
                        break;
                    case 2:
                        contextObj.LoadSpaceBarChartDetailsForDashboard(); // LoadDrawingDistributionForDashBoard();
                        break;
                    case 3:
                        contextObj.LoadDrawingDistributionForDashBoard();
                        break;
                    case 4:
                        contextObj.AS.GetExpiredUserFields().subscribe(function (result) {
                            contextObj.fieldObjectAdmin = (result["Data"]);
                            contextObj.griddataLoad(4);
                        });
                        break;
                    case 5:
                        contextObj.LoadGrossAreaDistributionbyCategory();
                        break;
                    case 6:
                        contextObj.LoadSpaceBarChartDetailsForSpaceDashboard();
                        break;
                    case 7:
                        contextObj.LoadOrganizationalDistributionChart();
                        break;
                    case 8:
                        contextObj.SpS.GetDashboardOrgDistributionColumns().subscribe(function (result) {
                            contextObj.fieldObjectSpace = (result["Data"]);
                            contextObj.griddataLoad(8);
                        });
                        break;
                    case 9:
                        contextObj.LoadOrgDocumentCategoryCharts();
                        break;
                    case 10:
                        contextObj.LoadDocumentBasedOnFileType();
                        break;
                    case 11:
                        contextObj.DS.GetDashboardDocumentFeildId().subscribe(function (resultData) {
                            contextObj.fieldObjectDoc = resultData["Data"];
                            contextObj.griddataLoad(11);
                        });
                        break;
                    case 12:
                        contextObj.LoadOrgOccupancyPieChart(0, 0);
                        break;
                    case 13:
                        contextObj.LoadBldngOccupancyChart(0, 0);
                        break;
                    case 14:
                        contextObj.LoadSpaceStandardOccupancyChart(0, 0);
                        break;
                    case 15:
                        contextObj.LoadOrgOccupancyBarChart(0, 0);
                        break;
                    case 16:
                        contextObj.LoadObjectClassListForChartDashboard(1);
                        break;
                    case 17:
                        contextObj.LoadObjectDistByOrgUnitForDashboard(1);
                        break;
                    case 18:
                        contextObj.ObjS.GetObjectClassListFields(1).subscribe(function (result) {
                            contextObj.fieldObject1Asset = (result["Data"]);
                            contextObj.fieldObject1Asset[3].FieldLabel = "Total No. of Assets";
                            //    break;
                            //case 2:
                            //    contextObj.fieldObject1Asset[3].FieldLabel = "Total No. of Furniture";
                            //    break;
                            contextObj.griddataLoad(18);
                        });
                        break;
                    case 19:
                        contextObj.ObjS.GetObjectClassListByFloorFields(1).subscribe(function (result) {
                            contextObj.fieldObject2Asset = (result["Data"]);
                            contextObj.fieldObject2Asset[3].FieldLabel = "Asset Class";
                            contextObj.fieldObject2Asset[4].FieldLabel = "No. of Assets";
                            //    break;
                            //case 2:
                            //    contextObj.fieldObject2[3].FieldLabel = "Furniture Class";
                            //    contextObj.fieldObject2[4].FieldLabel = "No. of Furniture";
                            //    break;
                            // }
                            contextObj.griddataLoad(19);
                        });
                        break;
                    case 20:
                        contextObj.LoadObjectClassListForChartDashboard(2);
                        break;
                    case 21:
                        contextObj.LoadObjectDistByOrgUnitForDashboard(2);
                        break;
                    case 22:
                        contextObj.ObjS.GetObjectClassListFields(2).subscribe(function (result) {
                            contextObj.fieldObject1Furniture = (result["Data"]);
                            contextObj.fieldObject1Furniture[3].FieldLabel = "Total No. of Furniture";
                            contextObj.griddataLoad(22);
                        });
                        break;
                    case 23:
                        contextObj.ObjS.GetObjectClassListByFloorFields(1).subscribe(function (result) {
                            contextObj.fieldObject2Furniture = (result["Data"]);
                            contextObj.fieldObject2Furniture[3].FieldLabel = "Furniture Class";
                            contextObj.fieldObject2Furniture[4].FieldLabel = "No. of Furniture";
                            contextObj.griddataLoad(23);
                        });
                        break;
                    case 24:
                        contextObj.LoadPMWOStatusForDashBoard();
                        break;
                    case 25:
                        contextObj.LoadOpenedPMWOAgingForDashBoard();
                        break;
                    case 26:
                        contextObj.LoadNonPMWOStatusForDashBoard();
                        break;
                    case 27:
                        contextObj.LoadOpenedRequestAndNonPMWOAgingForDashBoard();
                        break;
                    case 28:
                        contextObj.LoadLeaseExpirationSqFtForDashboard();
                        break;
                    case 29:
                        contextObj.LoadLeaseRentableAreaForDashboard();
                        break;
                    case 30:
                        contextObj.LoadLeasedBuildingOccupancyForDashboard();
                        break;
                    case 31:
                        contextObj.RPS.GetCriticalLeaseDatesFields().subscribe(function (result) {
                            contextObj.fieldObjectRPM = (result["Data"]);
                            var area = contextObj.fieldObjectRPM.find(function (item) { return item.ReportFieldId === 5737; });
                            area.FieldLabel = "Area (" + contextObj.AreaUnit + ")";
                            contextObj.griddataLoad(31);
                        });
                        break;
                }
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadUserCountForDashBoard = function () {
        var contextObjGUserCount = this;
        this.AS.GetUserCountForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var UserCountArr = JSON.parse(resultData);
            contextObjGUserCount.PieChart1DataAdmin = { data: [], chartWidth: contextObjGUserCount.calculatedWidth, chartHeight: contextObjGUserCount.calculatedHeight, legendPosition: "top" };
            var userCount = 0;
            for (var _i = 0, UserCountArr_1 = UserCountArr; _i < UserCountArr_1.length; _i++) {
                var item = UserCountArr_1[_i];
                userCount = userCount + parseInt(item["UserCount"]);
                contextObjGUserCount.PieChart1DataAdmin.data.push({
                    key: item["Name"], y: item["UserCount"]
                });
            }
            contextObjGUserCount.UserCount = userCount.toString();
            contextObjGUserCount.listWidgets.push(contextObjGUserCount.PieChart1DataAdmin);
        });
    };
    ExeSummaryDashBoard.prototype.LoadSubscribedFeatureForAreaUnit = function () {
        var contextObjAreaUnit = this;
        this.AS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjAreaUnit.AreaUnit = 'Sq.Mt.';
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadDrawingDistributionForDashBoard = function () {
        var contextObjDwgDistribution = this;
        this.AS.GetDrawingDistributionForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var dwgCountArr = JSON.parse(resultData);
            contextObjDwgDistribution.PieChart2DataAdmin = { data: [], chartWidth: contextObjDwgDistribution.calculatedWidth, chartHeight: contextObjDwgDistribution.calculatedHeight, legendPosition: "top" };
            var dwgCount = 0;
            for (var _i = 0, dwgCountArr_1 = dwgCountArr; _i < dwgCountArr_1.length; _i++) {
                var item = dwgCountArr_1[_i];
                dwgCount = dwgCount + parseInt(item["Counts"]);
                contextObjDwgDistribution.PieChart2DataAdmin.data.push({
                    key: item["Category"], y: item["Counts"]
                });
            }
            contextObjDwgDistribution.DwgCount = dwgCount.toString();
            contextObjDwgDistribution.listWidgets.push(contextObjDwgDistribution.PieChart2DataAdmin);
        });
    };
    ExeSummaryDashBoard.prototype.LoadSpaceBarChartDetailsForDashboard = function () {
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
            contextObjSpaceBarChartDetails.Barchart1DataAdmin = { data: MultiBarChartDataBldng, chartWidth: contextObjSpaceBarChartDetails.calculatedWidth, chartHeight: contextObjSpaceBarChartDetails.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            contextObjSpaceBarChartDetails.listWidgets.push(contextObjSpaceBarChartDetails.Barchart1DataAdmin);
        });
    };
    //Document Charts
    ExeSummaryDashBoard.prototype.LoadOrgDocumentCategoryCharts = function () {
        var contextObjOrgDocumentCategory = this;
        this.DS.getOrgCategoryforDashBoard().subscribe(function (resultData) {
            // debugger
            //  console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgDocumentCategory.PieChart1DataDoc = { data: [], chartWidth: contextObjOrgDocumentCategory.calculatedWidth, chartHeight: contextObjOrgDocumentCategory.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_1 = OrgOccupancyArr; _i < OrgOccupancyArr_1.length; _i++) {
                var item = OrgOccupancyArr_1[_i];
                contextObjOrgDocumentCategory.PieChart1DataDoc.data.push({
                    key: item["Document Category"], y: item["No. of Documents"]
                });
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadDocumentBasedOnFileType = function () {
        var contextObjOrgFileType = this;
        this.DS.getDocumentFileTypeDashBoard().subscribe(function (resultData) {
            // debugger
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgFileType.PieChart2DataDoc = { data: [], chartWidth: contextObjOrgFileType.calculatedWidth, chartHeight: contextObjOrgFileType.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_2 = OrgOccupancyArr; _i < OrgOccupancyArr_2.length; _i++) {
                var item = OrgOccupancyArr_2[_i];
                contextObjOrgFileType.PieChart2DataDoc.data.push({
                    key: item["File Type"], y: item["No. of Documents"]
                });
            }
        });
    };
    //Employee Charts
    ExeSummaryDashBoard.prototype.LoadOrgOccupancyBarChart = function (siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //for (let item of OrgOccupancyArr) {
            //    contextObjOrgOccupancy.PieChart1Data.data.push({
            //        key: item["Organization Unit"], y: item["Occupied"]
            //    });
            //    OccupiedSeats.push({
            //        label: item["Organization Unit"], value: item["Occupied"]
            //    });
            //    FreeSeats.push({
            //        label: item["Organization Unit"], value: item["Vacant"]
            //    });
            //}
            MultiBarChartDataDivision.push({ key: "Occupied", values: OccupiedSeats }, { key: "Vacant", values: FreeSeats });
            contextObjOrgOccupancy.Barchart2DataEmp = { data: MultiBarChartDataDivision, chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: true };
            contextObjOrgOccupancy.changeHapndOrgOccupancy = !contextObjOrgOccupancy.changeHapndOrgOccupancy;
            // contextObjOrgOccupancy.nvD3.chart.update();
        });
    };
    ExeSummaryDashBoard.prototype.LoadOrgOccupancyPieChart = function (siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            contextObjOrgOccupancy.PieChart1DataEmp = { data: [], chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_3 = OrgOccupancyArr; _i < OrgOccupancyArr_3.length; _i++) {
                var item = OrgOccupancyArr_3[_i];
                contextObjOrgOccupancy.PieChart1DataEmp.data.push({
                    key: item["Organization Unit"], y: item["Occupied"]
                });
                OccupiedSeats.push({
                    label: item["Organization Unit"], value: item["Occupied"]
                });
                FreeSeats.push({
                    label: item["Organization Unit"], value: item["Vacant"]
                });
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadBldngOccupancyChart = function (siteId, buildingId) {
        var contextObjBldngOccupancy = this;
        this.ES.getBuildingOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //contextObj.data = [];        
            for (var _i = 0, BldngOccupancyArr_2 = BldngOccupancyArr; _i < BldngOccupancyArr_2.length; _i++) {
                var item = BldngOccupancyArr_2[_i];
                OccupiedSeats.push({
                    label: item["BuildingName"], value: item["Occupied"]
                });
                FreeSeats.push({
                    label: item["BuildingName"], value: item["Vacant"]
                });
            }
            //  contextObjBldngOccupancy.Barchart1Data = undefined;
            MultiBarChartDataBldng.push({ key: "Occupied", values: OccupiedSeats }, { key: "Vacant", values: FreeSeats });
            contextObjBldngOccupancy.Barchart1DataEmp = { data: MultiBarChartDataBldng, chartWidth: contextObjBldngOccupancy.calculatedWidth, chartHeight: contextObjBldngOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            contextObjBldngOccupancy.changeHapndBldngOccupancy = !contextObjBldngOccupancy.changeHapndBldngOccupancy;
        });
    };
    ExeSummaryDashBoard.prototype.LoadSpaceStandardOccupancyChart = function (siteId, buildingId) {
        var contextObjSpStdOccupancy = this;
        this.ES.getSpaceStandardOccupancy(siteId, buildingId).subscribe(function (resultData) {
            //debugger;
            console.log(JSON.parse(resultData));
            var SpStdArr = JSON.parse(resultData);
            //contextObj.data = [];
            //  contextObjSpStdOccupancy.PieChart2Data = undefined;
            contextObjSpStdOccupancy.PieChart2DataEmp = { data: [], chartWidth: contextObjSpStdOccupancy.calculatedWidth, chartHeight: contextObjSpStdOccupancy.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, SpStdArr_1 = SpStdArr; _i < SpStdArr_1.length; _i++) {
                var item = SpStdArr_1[_i];
                contextObjSpStdOccupancy.PieChart2DataEmp.data.push({
                    key: item["SpaceStandardName"], y: item["Occupied"]
                });
            }
            contextObjSpStdOccupancy.changeHapndSpaceStd = !contextObjSpStdOccupancy.changeHapndSpaceStd;
            // contextObjSpStdOccupancy.nvD3.chart.update();
        });
    };
    ExeSummaryDashBoard.prototype.LoadObjectClassListForChartDashboard = function (ObjectCategoryId) {
        var contextObjClassListForChart = this;
        this.ObjS.GetObjectClassListForChartDashboard(ObjectCategoryId).subscribe(function (resultData) {
            var NoofObjectsArr = JSON.parse(resultData);
            // debugger;
            // ObjectCategoryId == 1 ? contextObjClassListForChart.PieChart1DataAsset : contextObjClassListForChart.PieChart1DataFurniture =
            if (ObjectCategoryId == 1) {
                contextObjClassListForChart.PieChart1DataAsset = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" };
            }
            else {
                contextObjClassListForChart.PieChart1DataFurniture = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" };
                ;
            }
            for (var _i = 0, NoofObjectsArr_1 = NoofObjectsArr; _i < NoofObjectsArr_1.length; _i++) {
                var item = NoofObjectsArr_1[_i];
                if (ObjectCategoryId == 1) {
                    contextObjClassListForChart.PieChart1DataAsset.data.push({
                        key: item["Classes"], y: item["No. of Objects"]
                    });
                }
                else {
                    contextObjClassListForChart.PieChart1DataFurniture.data.push({
                        key: item["Classes"], y: item["No. of Objects"]
                    });
                }
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadObjectDistByOrgUnitForDashboard = function (ObjectCategoryId) {
        var contextObjectDistByOrgUnit = this;
        this.ObjS.GetObjectDistByOrgUnitForDashboard(ObjectCategoryId).subscribe(function (resultData) {
            var DistByOrgUnit = JSON.parse(resultData);
            //debugger;
            if (ObjectCategoryId == 1) {
                contextObjectDistByOrgUnit.PieChart2DataAsset = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" };
            }
            else {
                contextObjectDistByOrgUnit.PieChart2DataFurniture = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" };
            }
            for (var _i = 0, DistByOrgUnit_1 = DistByOrgUnit; _i < DistByOrgUnit_1.length; _i++) {
                var item = DistByOrgUnit_1[_i];
                if (ObjectCategoryId == 1) {
                    contextObjectDistByOrgUnit.PieChart2DataAsset.data.push({
                        key: item["OrgUnit"], y: item["NoofObjects"]
                    });
                }
                else {
                    contextObjectDistByOrgUnit.PieChart2DataFurniture.data.push({
                        key: item["OrgUnit"], y: item["NoofObjects"]
                    });
                }
            }
        });
    };
    ExeSummaryDashBoard.prototype.ngAfterViewInit = function () {
        //var contextObj = this;
        //this.AS.GetExpiredUserFields().subscribe(function (result) {
        //    contextObj.fieldObjectAdmin = (result["Data"]);
        //    contextObj.dataLoad();
        //});
        //this.SpS.GetDashboardOrgDistributionColumns().subscribe(function (result) {
        //    //debugger
        //    contextObj.fieldObjectSpace = (result["Data"]);
        //    contextObj.dataLoad();
        //});
    };
    ExeSummaryDashBoard.prototype.griddataLoad = function (widgetId) {
        var contextObj = this;
        switch (widgetId) {
            case 4:
                contextObj.AS.GetExpiredUserData(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
                    contextObj.itemsSourceAdmin = JSON.parse(result["Data"].FieldBinderData);
                    for (var count = 0; count < contextObj.itemsSourceAdmin.length; count++) {
                        switch (contextObj.itemsSourceAdmin[count]["RemainingDays"]) {
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
                        if (contextObj.itemsSourceAdmin[count]["RemainingDays"] > 0) {
                            contextObj.itemsSourceAdmin[count]["User Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceAdmin[count]["User Name"] + "</div>";
                            contextObj.itemsSourceAdmin[count]["Login Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceAdmin[count]["Login Name"] + "</div>";
                            contextObj.itemsSourceAdmin[count]["User Role"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceAdmin[count]["User Role"] + "</div>";
                            contextObj.itemsSourceAdmin[count]["Account Expiry Date"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceAdmin[count]["Account Expiry Date"] + "</div>";
                        }
                    }
                    //contextObj.listWidgets.push(contextObj.itemsSourceAdmin);
                });
                break;
            case 8:
                contextObj.SpS.GetDashboardOrgDistributionData("", contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.itemsSourceSpace = JSON.parse(result["Data"].FieldBinderData);
                });
                break;
            case 11:
                contextObj.DS.GetDashboardDocument(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
                    // debugger;
                    contextObj.itemsSourceDoc = JSON.parse(result);
                });
                break;
            case 18:
                this.ObjS.GetObjectClassList(1, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    // debugger;
                    contextObj.itemsSource1Asset = JSON.parse(result["Data"].FieldBinderData);
                });
                break;
            case 19:
                this.ObjS.GetObjectClassListByFloor(1, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    // debugger;
                    contextObj.itemsSource2Asset = JSON.parse(result["Data"].FieldBinderData);
                });
                break;
            case 22:
                this.ObjS.GetObjectClassList(2, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.itemsSource1Furniture = JSON.parse(result["Data"].FieldBinderData);
                });
                break;
            case 23:
                this.ObjS.GetObjectClassListByFloor(2, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.itemsSource2Furniture = JSON.parse(result["Data"].FieldBinderData);
                });
                break;
            case 31:
                contextObj.RPS.GetCriticalLeaseDatesData("", contextObj.inputItems.sortDir).subscribe(function (result) {
                    //contextObj.totalItems = result["Data"].DataCount;
                    // debugger
                    contextObj.itemsSourceRPM = JSON.parse(result["Data"].FieldBinderData);
                    for (var count = 0; count < contextObj.itemsSourceRPM.length; count++) {
                        switch (contextObj.itemsSourceRPM[count]["RemainingDays"]) {
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
                        if (contextObj.itemsSourceRPM[count]["RemainingDays"] > 0) {
                            contextObj.itemsSourceRPM[count]["Lease Identifier"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceRPM[count]["Lease Identifier"] + "</div>";
                            contextObj.itemsSourceRPM[count]["Date"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceRPM[count]["Date"] + "</div>";
                            contextObj.itemsSourceRPM[count]["Description"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceRPM[count]["Description"] + "</div>";
                            contextObj.itemsSourceRPM[count]["Area (Sq. Ft.)"] = "<div style='color:" + color + "'>" + contextObj.itemsSourceRPM[count]["Area (Sq. Ft.)"] + "</div>";
                        }
                    }
                });
                break;
        }
    };
    ExeSummaryDashBoard.prototype.onSort = function (objGrid, widgetId) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.griddataLoad(widgetId);
    };
    ExeSummaryDashBoard.prototype.LoadGrossAreaDistributionbyCategory = function () {
        var contextObjGrossAreaDist = this;
        this.SpS.GetGrossAreaDistributionbyCategoryForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData["Data"]));
            var GrossAreaDistArr = JSON.parse(resultData);
            contextObjGrossAreaDist.PieChart1DataSpace = { data: [], chartWidth: contextObjGrossAreaDist.calculatedWidth, chartHeight: contextObjGrossAreaDist.calculatedHeight, legendPosition: "top" };
            var totalArea = 0;
            for (var _i = 0, GrossAreaDistArr_1 = GrossAreaDistArr; _i < GrossAreaDistArr_1.length; _i++) {
                var item = GrossAreaDistArr_1[_i];
                for (var _a = 0, _b = Object.keys(item); _a < _b.length; _a++) {
                    var key = _b[_a];
                    totalArea = totalArea + parseFloat(item[key]);
                    contextObjGrossAreaDist.PieChart1DataSpace.data.push({
                        key: key, y: item[key]
                    });
                }
            }
            contextObjGrossAreaDist.Area = totalArea.toFixed(2);
        });
    };
    ExeSummaryDashBoard.prototype.LoadSpaceBarChartDetailsForSpaceDashboard = function () {
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
            for (var _i = 0, BldngOccupancyArr_3 = BldngOccupancyArr; _i < BldngOccupancyArr_3.length; _i++) {
                var item = BldngOccupancyArr_3[_i];
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
            contextObjSpaceBarChartDetails.Barchart1DataSpace = { data: MultiBarChartDataBldng, chartWidth: contextObjSpaceBarChartDetails.calculatedWidth, chartHeight: contextObjSpaceBarChartDetails.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    ExeSummaryDashBoard.prototype.LoadOrganizationalDistributionChart = function () {
        var contextObjOrgDist = this;
        this.SpS.GetOrgDistributionChartDetailsForDashboard().subscribe(function (resultData) {
            //debugger;
            // console.log(JSON.parse(resultData));
            var OrgDistArr = JSON.parse(resultData);
            var totalArea = 0;
            contextObjOrgDist.PieChart2DataSpace = { data: [], chartWidth: contextObjOrgDist.calculatedWidth, chartHeight: contextObjOrgDist.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgDistArr_1 = OrgDistArr; _i < OrgDistArr_1.length; _i++) {
                var item = OrgDistArr_1[_i];
                totalArea = totalArea + parseFloat(item["UsableArea"]);
                contextObjOrgDist.PieChart2DataSpace.data.push({
                    key: item["Cost Center"], y: item["UsableArea"]
                });
            }
            contextObjOrgDist.Area = totalArea.toFixed(2);
        });
    };
    //Workorder Charts
    ExeSummaryDashBoard.prototype.LoadOpenedRequestAndNonPMWOAgingForDashBoard = function () {
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
            contextObjOpenedRequestAndNonPMWOAging.Barchart2DataWO = { data: MultiBarChartDataOpenedRequestAndNonPMWOAging, chartWidth: contextObjOpenedRequestAndNonPMWOAging.calculatedWidth, chartHeight: contextObjOpenedRequestAndNonPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    ExeSummaryDashBoard.prototype.LoadOpenedPMWOAgingForDashBoard = function () {
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
            contextObjOpenedPMWOAging.Barchart1DataWO = { data: MultiBarChartDataOpenedpenedPMWOAging, chartWidth: contextObjOpenedPMWOAging.calculatedWidth, chartHeight: contextObjOpenedPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    ExeSummaryDashBoard.prototype.LoadNonPMWOStatusForDashBoard = function () {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetNonPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart2DataWO = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, NonPMWOStatusArr_1 = NonPMWOStatusArr; _i < NonPMWOStatusArr_1.length; _i++) {
                var item = NonPMWOStatusArr_1[_i];
                contextObjNonPMWOStatus.PieChart2DataWO.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadPMWOStatusForDashBoard = function () {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart1DataWO = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, NonPMWOStatusArr_2 = NonPMWOStatusArr; _i < NonPMWOStatusArr_2.length; _i++) {
                var item = NonPMWOStatusArr_2[_i];
                contextObjNonPMWOStatus.PieChart1DataWO.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    };
    // Real Property Dashboard
    ExeSummaryDashBoard.prototype.LoadLeaseExpirationSqFtForDashboard = function () {
        var contextObjLeaseExpirationSqFt = this;
        this.RPS.GetLeaseExpirationSqFtForDashboard().subscribe(function (resultData) {
            var LeaseExpirationSqFtArr = JSON.parse(resultData);
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
            contextObjLeaseExpirationSqFt.Barchart1DataRPM = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    ExeSummaryDashBoard.prototype.LoadLeaseRentableAreaForDashboard = function () {
        var contextObjLeaseRentableArea = this;
        this.RPS.GetLeaseRentableAreaForDashboard().subscribe(function (resultData) {
            // debugger;
            var ObjLeaseRentableAreaArr = JSON.parse(resultData);
            contextObjLeaseRentableArea.PieChart1DataRPM = { data: [], chartWidth: contextObjLeaseRentableArea.calculatedWidth, chartHeight: contextObjLeaseRentableArea.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, ObjLeaseRentableAreaArr_1 = ObjLeaseRentableAreaArr; _i < ObjLeaseRentableAreaArr_1.length; _i++) {
                var item = ObjLeaseRentableAreaArr_1[_i];
                contextObjLeaseRentableArea.PieChart1DataRPM.data.push({
                    key: item["LeaseIdentifier"], y: item["Area"]
                });
            }
        });
    };
    ExeSummaryDashBoard.prototype.LoadLeasedBuildingOccupancyForDashboard = function () {
        var contextObjLeasedBuildingOccupancy = this;
        this.RPS.GetLeasedBuildingOccupancyForDashboard().subscribe(function (resultData) {
            // debugger;
            var LeasedBuildingOccupancyArr = JSON.parse(resultData);
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
            contextObjLeasedBuildingOccupancy.Barchart2DataRPM = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeasedBuildingOccupancy.calculatedWidth, chartHeight: contextObjLeasedBuildingOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
        });
    };
    ExeSummaryDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent, ng2_dnd_1.DND_DIRECTIVES],
            providers: [administration_service_1.AdministrationService, executivesummary_service_1.ExecutiveSummaryService, space_service_1.SpaceService, employee_services_1.EmployeeService, objects_service_1.ObjectsService, documents_service_1.DocumentService, workorder_service_1.WorkOrdereService, realproperty_service_1.RealPropertyService, ng2_dnd_1.DND_PROVIDERS],
            templateUrl: "./app/Views/ExecutiveSummary/DashBoard/exesummarydashboard.component.html"
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, space_service_1.SpaceService, executivesummary_service_1.ExecutiveSummaryService, employee_services_1.EmployeeService, objects_service_1.ObjectsService, documents_service_1.DocumentService, workorder_service_1.WorkOrdereService, realproperty_service_1.RealPropertyService])
    ], ExeSummaryDashBoard);
    return ExeSummaryDashBoard;
}());
exports.ExeSummaryDashBoard = ExeSummaryDashBoard;
//# sourceMappingURL=exesummarydashboard.component.js.map