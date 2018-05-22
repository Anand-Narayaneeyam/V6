
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {AdministrationService} from '../../../models/administration/administration.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [AdministrationService],
    templateUrl: "./app/Views/Administration/DashBoard/administrationdashboard.component.html"


})

export class AdministrationDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;

    pagePath = "Administration / Dashboard";
    //ddlSite: IField;
    // ddlBuilding: IField;
    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';
    //BldngFloorLabel = 'Building';
    fieldObject: IField;
    itemsSource: any[];
    calculatedWidth: number;
    calculatedHeight: number = 100;
    calculatedHeightPercent: number = 100;

    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };

    constructor(private AS: AdministrationService) {

    }

    //this.nvD3.chart.update()
    ngOnInit() {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else
        {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
       // contextObj.calculatedHeightPercent = (contextObj.calculatedHeight / $(".pageContent").height()) * 100;

        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadUserCountForDashBoard();
        contextObj.LoadSpaceBarChartDetailsForDashboard();
        contextObj.LoadDrawingDistributionForDashBoard();

    }
    LoadUserCountForDashBoard() {
        var contextObjGUserCount = this;
        this.AS.GetUserCountForDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData["Data"]));
            var UserCountArr = JSON.parse(resultData);

            contextObjGUserCount.PieChart1Data = { data: [], chartWidth: contextObjGUserCount.calculatedWidth, chartHeight: contextObjGUserCount.calculatedHeight, legendPosition: "top" }
            var userCount = 0;
            for (let item of UserCountArr) {
                userCount = userCount + parseInt(item["UserCount"]);
                contextObjGUserCount.PieChart1Data.data.push({
                    key: item["Name"], y: item["UserCount"]
                });
            }
            contextObjGUserCount.UserCount = userCount.toString();
        });
    }

    LoadSubscribedFeatureForAreaUnit() {
       var contextObjAreaUnit= this;
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

            contextObjDwgDistribution.PieChart2Data = { data: [], chartWidth: contextObjDwgDistribution.calculatedWidth, chartHeight: contextObjDwgDistribution.calculatedHeight, legendPosition: "top" }
            var dwgCount = 0;
            for (let item of dwgCountArr) {
                dwgCount = dwgCount + parseInt(item["Counts"]);
                contextObjDwgDistribution.PieChart2Data.data.push({
                    key: item["Category"], y: item["Counts"]
                });
            }
            contextObjDwgDistribution.DwgCount = dwgCount.toString();
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
            contextObjSpaceBarChartDetails.Barchart1Data = { data: MultiBarChartDataBldng, chartWidth: contextObjSpaceBarChartDetails.calculatedWidth, chartHeight: contextObjSpaceBarChartDetails.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };

        });
    }


    ngAfterViewInit() {
        var contextObj = this;
        this.AS.GetExpiredUserFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    }

    public dataLoad() {
        var contextObj = this;
        contextObj.AS.GetExpiredUserData(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            for (let count = 0; count < contextObj.itemsSource.length; count++)
            {
                switch (contextObj.itemsSource[count]["RemainingDays"]){
                    case 30: var color = 'red'; break;
                    case 60: var color = 'blue'; break;
                    case 180: var color = 'green'; break;
                    default:  break;
                }
                if (contextObj.itemsSource[count]["RemainingDays"] > 0) {
                    contextObj.itemsSource[count]["User Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["User Name"] + "</div>";
                    contextObj.itemsSource[count]["Login Name"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["Login Name"] + "</div>";
                    contextObj.itemsSource[count]["User Role"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["User Role"] + "</div>";
                    contextObj.itemsSource[count]["Account Expiry Date"] = "<div style='color:" + color + "'>" + contextObj.itemsSource[count]["Account Expiry Date"] + "</div>";
                }
            }
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    }

}