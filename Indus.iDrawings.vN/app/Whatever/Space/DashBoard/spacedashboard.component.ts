
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {SpaceService} from '../../../models/space/space.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [SpaceService],
    templateUrl: "./app/Views/Space/DashBoard/spacedashboard.component.html"


})
export class SpaceDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    changeHapndOrgOccupancy: boolean = false;
    changeHapndSpaceStd: boolean = false;
    changeHapndBldngOccupancy: boolean = false;
    //changeHapnd: boolean = false;
    pagePath = "Space / Dashboard";
    //ddlSite: IField;
   // ddlBuilding: IField;
    alignContent = "horizontal";
    GrossArea = '';
    OrgArea = '';
    AreaUnit = 'Sq. Ft.';
    BldngFloorLabel = 'Building';
    fieldObject: IField;
    itemsSource: any[];
    calculatedWidth: number;
    calculatedHeight: number = 100;
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };

    constructor(private SpS: SpaceService) {

    }
    //this.nvD3.chart.update()
    ngOnInit() {
       // debugger
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else
        {
            contextObj.calculatedWidth = $(".pageContent").width() ;
            contextObj.calculatedHeight = $(".pageContent").height();
        }

        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadGrossAreaDistributionbyCategory();
        contextObj.LoadSpaceBarChartDetailsForDashboard();
        contextObj.LoadOrganizationalDistributionChart();

    }

    LoadSubscribedFeatureForAreaUnit() {
        var contextObjSubFeat = this;
        this.SpS.checkSubscribedFeature("32").subscribe(function (resultData) {
           // debugger
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjSubFeat.AreaUnit = 'Sq.Mt.';
            }
        });
    }

    LoadGrossAreaDistributionbyCategory() {
        var contextObjGrossAreaDist = this;
        this.SpS.GetGrossAreaDistributionbyCategoryForDashBoard().subscribe(function (resultData) {
           // debugger;
           // console.log(JSON.parse(resultData["Data"]));
            var GrossAreaDistArr = JSON.parse(resultData);

            contextObjGrossAreaDist.PieChart1Data = { data: [], chartWidth: contextObjGrossAreaDist.calculatedWidth, chartHeight: contextObjGrossAreaDist.calculatedHeight, legendPosition: "top" }
            var totalArea = 0;
            for (let item of GrossAreaDistArr) {
                for (let key of Object.keys(item)) {
                    totalArea = totalArea + parseFloat(item[key]);
                    contextObjGrossAreaDist.PieChart1Data.data.push({
                        key: key, y: item[key]
                    });
                }
            }
            if (isNaN(totalArea)){
                totalArea = 0;
            }
            contextObjGrossAreaDist.GrossArea = totalArea.toFixed(2);
        });
    }

    LoadSpaceBarChartDetailsForDashboard() {
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
            contextObjSpaceBarChartDetails.Barchart1Data = { data: MultiBarChartDataBldng, chartWidth: contextObjSpaceBarChartDetails.calculatedWidth, chartHeight: contextObjSpaceBarChartDetails.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };

        });
    }

    LoadOrganizationalDistributionChart() {
        var contextObjOrgDist = this;
        this.SpS.GetOrgDistributionChartDetailsForDashboard().subscribe(function (resultData) { 
            //debugger;
            // console.log(JSON.parse(resultData));
            var OrgDistArr = JSON.parse(resultData);
            var totalArea = 0;
            contextObjOrgDist.PieChart2Data = { data: [], chartWidth: contextObjOrgDist.calculatedWidth, chartHeight: contextObjOrgDist.calculatedHeight, legendPosition: "top" };
            for (let item of OrgDistArr) {
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
    }

    ngAfterViewInit() {
       // debugger
        var contextObjOrgDistribution = this;
        this.SpS.GetDashboardOrgDistributionColumns().subscribe(function (result) {
            //debugger
            contextObjOrgDistribution.fieldObject = (result["Data"]);
            contextObjOrgDistribution.dataLoad();
        });
    }

    public dataLoad() {
        var contextObjDataLoad = this;
       // debugger
        contextObjDataLoad.SpS.GetDashboardOrgDistributionData("", contextObjDataLoad.inputItems.sortDir).subscribe(function (result) {
            //contextObj.totalItems = result["Data"].DataCount;
           // debugger
            contextObjDataLoad.itemsSource = JSON.parse(result["Data"].FieldBinderData);

        });
    }

    public onSort(objGrid: any) {
        this.dataLoad();
    }


}