
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {EmployeeService} from '../../../models/employee/employee.services';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, DropDownListComponent, PageComponent, DashboardComponent, WidgetComponent],
    providers: [EmployeeService],
    templateUrl: "./app/Views/Employee/DashBoard/employeedashboard.component.html"   
})
export class EmployeeDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    changeHapndOrgOccupancy: boolean = false;
    changeHapndSpaceStd: boolean = false;
    changeHapndBldngOccupancy: boolean = false;
    //changeHapnd: boolean = false;
    pagePath = "Employees / Dashboard";
    ddlSite: IField;
    ddlBuilding: IField;
    alignContent = "horizontal";
    OrgLvel1Name = 'Division';
    BldngFloorLabel = 'Building';
    calculatedWidth: number;
    calculatedHeight: number = 100;
    constructor(private ES: EmployeeService) {

    }
    //this.nvD3.chart.update()
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

    }
    onChangeddlSite(siteId) {
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
    }

    onChangeddlBuilding(buildingId) {
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

    }

    LoadOrgOccupancyCharts(siteId, buildingId) {
        var contextObjOrgOccupancy = this;
        this.ES.getOrgOccupancyforDashBoard(siteId, buildingId).subscribe(function (resultData) {
           // debugger;
            console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            var MultiBarChartDataDivision: IMultiBarChartData[] = [];
            var OccupiedSeats = [];
            var FreeSeats = [];
            //contextObj.data = [];
            // contextObjOrgOccupancy.Barchart2Data = undefined;
            // contextObjOrgOccupancy.PieChart1Data = undefined;

            contextObjOrgOccupancy.PieChart1Data = { data: [], chartWidth: contextObjOrgOccupancy.calculatedWidth, chartHeight: contextObjOrgOccupancy.calculatedHeight, legendPosition: "top" }

            for (let item of OrgOccupancyArr) {
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
            contextObjBldngOccupancy.Barchart1Data = { data: MultiBarChartDataBldng, chartWidth: contextObjBldngOccupancy.calculatedWidth, chartHeight: contextObjBldngOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
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
            contextObjSpStdOccupancy.PieChart2Data = { data: [], chartWidth: contextObjSpStdOccupancy.calculatedWidth, chartHeight: contextObjSpStdOccupancy.calculatedHeight, legendPosition: "top" }
            for (let item of SpStdArr) {
                contextObjSpStdOccupancy.PieChart2Data.data.push({
                    key: item["SpaceStandardName"], y: item["Occupied"]
                });
            }
            contextObjSpStdOccupancy.changeHapndSpaceStd = !contextObjSpStdOccupancy.changeHapndSpaceStd;
            // contextObjSpStdOccupancy.nvD3.chart.update();
        });
    }
}