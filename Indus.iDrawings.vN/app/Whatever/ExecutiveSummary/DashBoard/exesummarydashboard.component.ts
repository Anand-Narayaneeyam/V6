
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
//import {GaugeChart, IGaugeChart } from '../../../Framework/Whatever/Charts/gaugechart.component';

import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';

import {AdministrationService} from '../../../models/administration/administration.service';
import {SpaceService} from '../../../models/space/space.service';
import {EmployeeService} from '../../../models/employee/employee.services';
import {ObjectsService} from '../../../models/objects/objects.service';
import {DocumentService} from '../../../models/documents/documents.service';
import {WorkOrdereService} from '../../../models/workorder/workorder.service';
import {RealPropertyService} from '../../../models/realproperty/realproperty.service';


import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../FrameWork/ExternalLibraries/dnd/ng2-dnd';
import {ExecutiveSummaryService} from '../../../Models/ExecutiveSummary/executivesummary.service';
//import  '../../../FrameWork/ExternalLibraries/Gridster/gridster'; 
//import  '../../../FrameWork/ExternalLibraries/Gridster/jquery.gridster.css'; 

//import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
//import  '../../../FrameWork/ExternalLibraries/Gridster/jquery.gridster'; 
//import { HTTP_PROVIDERS} from '@angular/http';


@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent, DND_DIRECTIVES], //, GaugeChart],
    providers: [AdministrationService, ExecutiveSummaryService, SpaceService, EmployeeService, ObjectsService, DocumentService, WorkOrdereService, RealPropertyService, DND_PROVIDERS],
    templateUrl: "./app/Views/ExecutiveSummary/DashBoard/exesummarydashboard.component.html"
})
export class ExeSummaryDashBoard implements OnInit {
    fieldObjectWidgets: IField;
    Barchart1DataAdmin: IMultiBarChart;
   // Barchart2DataAdmin: IMultiBarChart;
    PieChart1DataAdmin: IPieChart;
    PieChart2DataAdmin: IPieChart;

    PieChart1DataDoc: IPieChart;
    PieChart2DataDoc: IPieChart;
    PieChart1DataEmp: IPieChart;
    PieChart2DataEmp: IPieChart;
    PieChart1DataAsset: IPieChart;
    PieChart2DataAsset: IPieChart;
    PieChart1DataFurniture: IPieChart;
    PieChart2DataFurniture: IPieChart;
    PieChart1DataWO: IPieChart;
    PieChart2DataWO: IPieChart;
    PieChart1DataRPM: IPieChart;

    PieChart1Data: IPieChart;

    itemsSourceWidgets: any[];

    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    Barchart1DataEmp: IMultiBarChart;
    Barchart2DataEmp: IMultiBarChart;
    Barchart1DataWO: IMultiBarChart;
    Barchart2DataWO: IMultiBarChart;
    Barchart1DataRPM: IMultiBarChart;
    Barchart2DataRPM: IMultiBarChart;

    Barchart1DataSpace: IMultiBarChart;
   // Barchart2DataSpace: IMultiBarChart;
    PieChart1DataSpace: IPieChart;
    PieChart2DataSpace: IPieChart;
    changeHapndOrgOccupancy: boolean = false;
    changeHapndSpaceStd: boolean = false;
    changeHapndBldngOccupancy: boolean = false;

    pagePath = "Executive Summary / Dashboard";
    //ddlSite: IField;
    // ddlBuilding: IField;
    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';
    Division = 'Division';
    OrgLvel1Name = 'Division';
    BldngFloorLabel = 'Building';

    fieldObjectAdmin: IField;
    fieldObject1Asset: IField;
    fieldObject2Asset: IField;
    fieldObject1Furniture: IField;
    fieldObject2Furniture: IField;
    fieldObjectRPM: IField[];
    fieldObjectDoc: IField;
    itemsSourceAdmin: any[];
    calculatedWidth: number;
    calculatedHeight: number = 100;
    calculatedHeightPercent: number = 100;

    Area = '';

    fieldObjectSpace: IField;
    itemsSourceSpace: any[];
    itemsSourceDoc: any[];
    itemsSourceRPM: any[];
    itemsSource1Asset: any[];
    itemsSource2Asset: any[];
    itemsSource1Furniture: any[];
    itemsSource2Furniture: any[];
    listWidgets: any[] = [];
    listOne: any[] = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealthy drink!', 'Water'];


    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
   // inputItemsSpace: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };

    constructor(private AS: AdministrationService, private SpS: SpaceService, private executiveSummaryService: ExecutiveSummaryService, private ES: EmployeeService, private ObjS: ObjectsService, private DS: DocumentService, private WOS: WorkOrdereService, private RPS: RealPropertyService ) {

    }


    ngOnInit() {
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



    }

    LoadDashboardWidgets() {
        var contextObj = this;
        contextObj.executiveSummaryService.GetAllWidgets(contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
             //debugger;
            contextObj.itemsSourceWidgets = JSON.parse(result["Data"].FieldBinderData).filter(
                widget => widget.IsSelected === 1);  
            for (let i = 0; i < contextObj.itemsSourceWidgets.length; i++) {
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
                        contextObj.LoadOrgOccupancyPieChart(0,0);
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
                            var area = contextObj.fieldObjectRPM.find(function (item) { return item.ReportFieldId === 5737 });
                            area.FieldLabel = "Area (" + contextObj.AreaUnit + ")";
                            contextObj.griddataLoad(31);
                        });
                        break;

                }
            }
        });

    }

    LoadUserCountForDashBoard() {
        var contextObjGUserCount = this;
        this.AS.GetUserCountForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var UserCountArr = JSON.parse(resultData);

            contextObjGUserCount.PieChart1DataAdmin = { data: [], chartWidth: contextObjGUserCount.calculatedWidth, chartHeight: contextObjGUserCount.calculatedHeight, legendPosition: "top" }
            var userCount = 0;
            for (let item of UserCountArr) {
                userCount = userCount + parseInt(item["UserCount"]);
                contextObjGUserCount.PieChart1DataAdmin.data.push({
                    key: item["Name"], y: item["UserCount"]
                });
            }
            contextObjGUserCount.UserCount = userCount.toString();
            contextObjGUserCount.listWidgets.push(contextObjGUserCount.PieChart1DataAdmin);
        });
    }

    LoadSubscribedFeatureForAreaUnit() {
        var contextObjAreaUnit = this;
        this.AS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjAreaUnit.AreaUnit = 'Sq.Mt.';
            }
        });
    }

    LoadDrawingDistributionForDashBoard() {
        var contextObjDwgDistribution = this;
        this.AS.GetDrawingDistributionForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var dwgCountArr = JSON.parse(resultData);

            contextObjDwgDistribution.PieChart2DataAdmin = { data: [], chartWidth: contextObjDwgDistribution.calculatedWidth, chartHeight: contextObjDwgDistribution.calculatedHeight, legendPosition: "top" }
            var dwgCount = 0;
            for (let item of dwgCountArr) {
                dwgCount = dwgCount + parseInt(item["Counts"]);
                contextObjDwgDistribution.PieChart2DataAdmin.data.push({
                    key: item["Category"], y: item["Counts"]
                });
            }
            contextObjDwgDistribution.DwgCount = dwgCount.toString();
            contextObjDwgDistribution.listWidgets.push(contextObjDwgDistribution.PieChart2DataAdmin);
        });
    }


    LoadSpaceBarChartDetailsForDashboard() {
        var contextObjSpaceBarChartDetails = this;
        this.AS.GetSpaceBarChartDetailsForDashboard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng: IMultiBarChartData[] = [];
            var Usable = [];
            var Common = [];
            var Chargeable = [];
            //contextObj.data = [];        
            for (let item of BldngOccupancyArr) {
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
    }

    //Document Charts
    LoadOrgDocumentCategoryCharts() {
        var contextObjOrgDocumentCategory = this;
        this.DS.getOrgCategoryforDashBoard().subscribe(function (resultData) {
           // debugger
            //  console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgDocumentCategory.PieChart1DataDoc = { data: [], chartWidth: contextObjOrgDocumentCategory.calculatedWidth, chartHeight: contextObjOrgDocumentCategory.calculatedHeight, legendPosition: "top" }

            for (let item of OrgOccupancyArr) {
                contextObjOrgDocumentCategory.PieChart1DataDoc.data.push({
                    key: item["Document Category"], y: item["No. of Documents"]
                });
            }
        });
    }

    LoadDocumentBasedOnFileType() {
        var contextObjOrgFileType = this;
        this.DS.getDocumentFileTypeDashBoard().subscribe(function (resultData) {
           // debugger
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgFileType.PieChart2DataDoc = { data: [], chartWidth: contextObjOrgFileType.calculatedWidth, chartHeight: contextObjOrgFileType.calculatedHeight, legendPosition: "top" }

            for (let item of OrgOccupancyArr) {
                contextObjOrgFileType.PieChart2DataDoc.data.push({
                    key: item["File Type"], y: item["No. of Documents"]
                });
            }
        });
    }

    //Employee Charts
    LoadOrgOccupancyBarChart(siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision: IMultiBarChartData[] = [];
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
    }

    LoadOrgOccupancyPieChart(siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision: IMultiBarChartData[] = [];
            var OccupiedSeats = [];
            var FreeSeats = [];

            contextObjOrgOccupancy.PieChart1DataEmp = { data: [], chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, legendPosition: "top" }
            for (let item of OrgOccupancyArr) {
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
    }


    LoadBldngOccupancyChart(siteId, buildingId) {
        var contextObjBldngOccupancy = this;
        this.ES.getBuildingOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng: IMultiBarChartData[] = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //contextObj.data = [];        
            for (let item of BldngOccupancyArr) {
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
    }

    LoadSpaceStandardOccupancyChart(siteId, buildingId) {
        var contextObjSpStdOccupancy = this;
        this.ES.getSpaceStandardOccupancy(siteId, buildingId).subscribe(function (resultData) {
            //debugger;
            console.log(JSON.parse(resultData));
            var SpStdArr = JSON.parse(resultData);
            //contextObj.data = [];
            //  contextObjSpStdOccupancy.PieChart2Data = undefined;
            contextObjSpStdOccupancy.PieChart2DataEmp = { data: [], chartWidth: contextObjSpStdOccupancy.calculatedWidth, chartHeight: contextObjSpStdOccupancy.calculatedHeight, legendPosition: "top" }
            for (let item of SpStdArr) {
                contextObjSpStdOccupancy.PieChart2DataEmp.data.push({
                    key: item["SpaceStandardName"], y: item["Occupied"]
                });
            }
            contextObjSpStdOccupancy.changeHapndSpaceStd = !contextObjSpStdOccupancy.changeHapndSpaceStd;
            // contextObjSpStdOccupancy.nvD3.chart.update();
        });
    }


    LoadObjectClassListForChartDashboard(ObjectCategoryId: number) {
        var contextObjClassListForChart = this;
        this.ObjS.GetObjectClassListForChartDashboard(ObjectCategoryId).subscribe(function (resultData) {
            var NoofObjectsArr = JSON.parse(resultData);
           // debugger;
           // ObjectCategoryId == 1 ? contextObjClassListForChart.PieChart1DataAsset : contextObjClassListForChart.PieChart1DataFurniture =
            if(ObjectCategoryId == 1) {
                contextObjClassListForChart.PieChart1DataAsset = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" };
            }
            else {
                contextObjClassListForChart.PieChart1DataFurniture = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" };;
            }
            for (let item of NoofObjectsArr) {
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
    }

    LoadObjectDistByOrgUnitForDashboard(ObjectCategoryId: number) {
        var contextObjectDistByOrgUnit = this;
        this.ObjS.GetObjectDistByOrgUnitForDashboard(ObjectCategoryId).subscribe(function (resultData) {
            var DistByOrgUnit = JSON.parse(resultData);
            //debugger;
            if (ObjectCategoryId == 1) {
                contextObjectDistByOrgUnit.PieChart2DataAsset = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" };
            }
            else {
                contextObjectDistByOrgUnit.PieChart2DataFurniture  = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" };
            }
            for (let item of DistByOrgUnit) {
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
    }



    ngAfterViewInit() {
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

    }

    public griddataLoad(widgetId: number) {
        var contextObj = this;
      
        switch (widgetId) {
            case 4:
                contextObj.AS.GetExpiredUserData(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
                    contextObj.itemsSourceAdmin = JSON.parse(result["Data"].FieldBinderData);
                    for (let count = 0; count < contextObj.itemsSourceAdmin.length; count++) {
                        switch (contextObj.itemsSourceAdmin[count]["RemainingDays"]) {
                            case 30: var color = 'red'; break;
                            case 60: var color = 'blue'; break;
                            case 180: var color = 'green'; break;
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
                    for (let count = 0; count < contextObj.itemsSourceRPM.length; count++) {
                        switch (contextObj.itemsSourceRPM[count]["RemainingDays"]) {
                            case 30: var color = 'red'; break;
                            case 60: var color = 'blue'; break;
                            case 180: var color = 'green'; break;
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

    }

    public onSort(objGrid: any, widgetId: number) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.griddataLoad(widgetId);
    }


    LoadGrossAreaDistributionbyCategory() {
        var contextObjGrossAreaDist = this;
        this.SpS.GetGrossAreaDistributionbyCategoryForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData["Data"]));
            var GrossAreaDistArr = JSON.parse(resultData);

            contextObjGrossAreaDist.PieChart1DataSpace = { data: [], chartWidth: contextObjGrossAreaDist.calculatedWidth, chartHeight: contextObjGrossAreaDist.calculatedHeight, legendPosition: "top" }
            var totalArea = 0;
            for (let item of GrossAreaDistArr) {
                for (let key of Object.keys(item)) {
                    totalArea = totalArea + parseFloat(item[key]);
                    contextObjGrossAreaDist.PieChart1DataSpace.data.push({
                        key: key, y: item[key]
                    });
                }
            }
            contextObjGrossAreaDist.Area = totalArea.toFixed(2);
        });
    }

    LoadSpaceBarChartDetailsForSpaceDashboard() {
        var contextObjSpaceBarChartDetails = this;
        this.SpS.GetSpaceBarChartDetailsForDashboard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var BldngOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataBldng: IMultiBarChartData[] = [];
            var Usable = [];
            var Common = [];
            var Chargeable = [];
            //contextObj.data = [];        
            for (let item of BldngOccupancyArr) {
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
    }

    LoadOrganizationalDistributionChart() {
        var contextObjOrgDist = this;
        this.SpS.GetOrgDistributionChartDetailsForDashboard().subscribe(function (resultData) {
            //debugger;
            // console.log(JSON.parse(resultData));
            var OrgDistArr = JSON.parse(resultData);
            var totalArea = 0;
            contextObjOrgDist.PieChart2DataSpace = { data: [], chartWidth: contextObjOrgDist.calculatedWidth, chartHeight: contextObjOrgDist.calculatedHeight, legendPosition: "top" };
            for (let item of OrgDistArr) {
                totalArea = totalArea + parseFloat(item["UsableArea"]);
                contextObjOrgDist.PieChart2DataSpace.data.push({
                    key: item["Cost Center"], y: item["UsableArea"]
                });
            }
            contextObjOrgDist.Area = totalArea.toFixed(2);
        });
    }


    //Workorder Charts
    LoadOpenedRequestAndNonPMWOAgingForDashBoard() {
        var contextObjOpenedRequestAndNonPMWOAging = this;
        this.WOS.GetOpenedRequestAndNonPMWOAgingForDashBoard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OpenedRequestAndNonPMWOAgingArr = JSON.parse(resultData);
            var MultiBarChartDataOpenedRequestAndNonPMWOAging: IMultiBarChartData[] = [];
            var Legend1 = [];
            var Legend2 = [];
            var Legend3 = [];
            var Legend4 = [];
            //contextObj.data = [];        
            for (let item of OpenedRequestAndNonPMWOAgingArr) {
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
    }

    LoadOpenedPMWOAgingForDashBoard() {
        var contextObjOpenedPMWOAging = this;
        this.WOS.GetOpenedPMWOAgingForDashBoard().subscribe(function (resultData) {
            // debugger;
            console.log(JSON.parse(resultData));
            var OpenedpenedPMWOAgingArr = JSON.parse(resultData);
            var MultiBarChartDataOpenedpenedPMWOAging: IMultiBarChartData[] = [];
            var Legend1 = [];
            var Legend2 = [];
            var Legend3 = [];
            var Legend4 = [];
            //contextObj.data = [];        
            for (let item of OpenedpenedPMWOAgingArr) {
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
    }


    LoadNonPMWOStatusForDashBoard() {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetNonPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart2DataWO = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (let item of NonPMWOStatusArr) {
                contextObjNonPMWOStatus.PieChart2DataWO.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    }


    LoadPMWOStatusForDashBoard() {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetPMWOStatusForDashBoard().subscribe(function (resultData) {
            // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart1DataWO = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (let item of NonPMWOStatusArr) {
                contextObjNonPMWOStatus.PieChart1DataWO.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    }



    // Real Property Dashboard
    LoadLeaseExpirationSqFtForDashboard() {
        var contextObjLeaseExpirationSqFt = this;
        this.RPS.GetLeaseExpirationSqFtForDashboard().subscribe(function (resultData) {
            var LeaseExpirationSqFtArr = JSON.parse(resultData);
           
            var userCount = 0;
            var BarChartDataLeaseExpirationSqFt: IMultiBarChartData[] = [];
            var Area = [];

            for (let item of LeaseExpirationSqFtArr) {
                Area.push({
                    label: item["Year"], value: item["Area"]

                });
            }
            BarChartDataLeaseExpirationSqFt.push({ key: "Area", values: Area });
            contextObjLeaseExpirationSqFt.Barchart1DataRPM = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };

        });
    }

    LoadLeaseRentableAreaForDashboard() {
        var contextObjLeaseRentableArea = this;
        this.RPS.GetLeaseRentableAreaForDashboard().subscribe(function (resultData) {
           // debugger;
            var ObjLeaseRentableAreaArr = JSON.parse(resultData);

            contextObjLeaseRentableArea.PieChart1DataRPM = { data: [], chartWidth: contextObjLeaseRentableArea.calculatedWidth, chartHeight: contextObjLeaseRentableArea.calculatedHeight, legendPosition: "top" }
            for (let item of ObjLeaseRentableAreaArr) {
                contextObjLeaseRentableArea.PieChart1DataRPM.data.push({
                    key: item["LeaseIdentifier"], y: item["Area"]
                });
            }
        });
    }

    LoadLeasedBuildingOccupancyForDashboard() {
        var contextObjLeasedBuildingOccupancy = this;
        this.RPS.GetLeasedBuildingOccupancyForDashboard().subscribe(function (resultData) {
           // debugger;
            var LeasedBuildingOccupancyArr = JSON.parse(resultData);      
            var userCount = 0;
            var BarChartDataLeaseExpirationSqFt: IMultiBarChartData[] = [];
            var Area = [];

            for (let item of LeasedBuildingOccupancyArr) {
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
    }
}