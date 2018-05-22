
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {RealPropertyService} from '../../../models/realproperty/realproperty.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [RealPropertyService],
    templateUrl: "./app/Views/RealProperty/DashBoard/realpropertydashboard.component.html"


})
export class RealPropertyDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    pagePath = "Real Property / Dashboard";
    //ddlSite: IField;
    // ddlBuilding: IField;
    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';
    //BldngFloorLabel = 'Building';
    fieldObject: IField[];
    itemsSource: any[];
    calculatedWidth: number;
    calculatedHeight: number = 100;

    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };

    constructor(private RPS: RealPropertyService) {

    }
    //this.nvD3.chart.update()
    ngOnInit() {
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

    }

    LoadSubscribedFeatureForAreaUnit() {
        var contextObjAreaUnit = this;
        this.RPS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
               contextObjAreaUnit.AreaUnit = 'Sq. Mt.';
            }
        });
    }

    LoadLeaseExpirationSqFtForDashboard() {
        var contextObjLeaseExpirationSqFt = this;
        this.RPS.GetLeaseExpirationSqFtForDashboard().subscribe(function (resultData) {
            var LeaseExpirationSqFtArr = JSON.parse(resultData);

           // contextObjLeaseExpirationSqFt.Barchart1Data = { data: [], chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", rotateLabels: 0 };
            var userCount = 0;
            var BarChartDataLeaseExpirationSqFt: IMultiBarChartData[] = [];
            var Area = [];

            for (let item of LeaseExpirationSqFtArr) {
                Area.push({
                    label: item["Year"], value: item["Area"]

                });
            }
            BarChartDataLeaseExpirationSqFt.push({ key: "Area", values: Area });
            contextObjLeaseExpirationSqFt.Barchart1Data = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeaseExpirationSqFt.calculatedWidth, chartHeight: contextObjLeaseExpirationSqFt.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false};

        });
    }

    LoadLeaseRentableAreaForDashboard() {
        var contextObjLeaseRentableArea = this;
        this.RPS.GetLeaseRentableAreaForDashboard().subscribe(function (resultData) {
            var ObjLeaseRentableAreaArr = JSON.parse(resultData);

            contextObjLeaseRentableArea.PieChart1Data = { data: [], chartWidth: contextObjLeaseRentableArea.calculatedWidth, chartHeight: contextObjLeaseRentableArea.calculatedHeight, legendPosition: "top" }
            for (let item of ObjLeaseRentableAreaArr) {
                //if (item["Area"] == "0.00") {
                //}
                //else {
                    contextObjLeaseRentableArea.PieChart1Data.data.push({
                        key: item["LeaseIdentifier"], y: item["Area"]
                    });
                //}
            }     
        });
    }

    LoadLeasedBuildingOccupancyForDashboard() {
        var contextObjLeasedBuildingOccupancy = this;
        this.RPS.GetLeasedBuildingOccupancyForDashboard().subscribe(function (resultData) {
             debugger;
             var LeasedBuildingOccupancyArr = JSON.parse(resultData);

           // contextObjLeasedBuildingOccupancy.Barchart2Data = { data: [], chartWidth: contextObjLeasedBuildingOccupancy.calculatedWidth, chartHeight: contextObjLeasedBuildingOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", rotateLabels: 0 };
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
            contextObjLeasedBuildingOccupancy.Barchart2Data = { data: BarChartDataLeaseExpirationSqFt, chartWidth: contextObjLeasedBuildingOccupancy.calculatedWidth, chartHeight: contextObjLeasedBuildingOccupancy.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false};

        });
    }

   

    ngAfterViewInit() {
        var contextObj = this;
        this.RPS.GetCriticalLeaseDatesFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            var area = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 5737 });
            area.FieldLabel = "Area (" + contextObj.AreaUnit + ")";
            contextObj.dataLoad();
        });
    }

    public dataLoad() {
        var contextObjDataLoad = this;
        // debugger
        contextObjDataLoad.RPS.GetCriticalLeaseDatesData("", contextObjDataLoad.inputItems.sortDir).subscribe(function (result) {
            //contextObj.totalItems = result["Data"].DataCount;
             debugger
             contextObjDataLoad.itemsSource = JSON.parse(result["Data"].FieldBinderData);
             for (let count = 0; count < contextObjDataLoad.itemsSource.length; count++) {
                 switch (contextObjDataLoad.itemsSource[count]["RemainingDays"]) {
                     case 30: var color = 'red'; break;
                     case 60: var color = 'blue'; break;
                     case 180: var color = 'green'; break;
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
    }

    public onSort(objGrid: any) {
        this.dataLoad();
    }


 
}