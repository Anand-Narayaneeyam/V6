
import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {WorkOrdereService} from '../../../models/workorder/workorder.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';



@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [WorkOrdereService],
    templateUrl: "./app/Views/WorkOrder/DashBoard/workorderdashboard.component.html"


})
export class WorkOrderDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    //changeHapnd: boolean = false;
    pagePath = "Work Order / Dashboard";
    //ddlSite: IField;
    // ddlBuilding: IField;
    alignContent = "horizontal";
    fieldObject: IField;
    calculatedWidth: number;
    calculatedHeight: number = 100;

    constructor(private WOS: WorkOrdereService) {

    }
    ngOnInit() {
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

        contextObj.LoadNonPMWOStatusForDashBoard();
        contextObj.LoadOpenedRequestAndNonPMWOAgingForDashBoard();
        contextObj.LoadPMWOStatusForDashBoard();
        contextObj.LoadOpenedPMWOAgingForDashBoard();

    }


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
            contextObjOpenedRequestAndNonPMWOAging.Barchart2Data = { data: MultiBarChartDataOpenedRequestAndNonPMWOAging, chartWidth: contextObjOpenedRequestAndNonPMWOAging.calculatedWidth, chartHeight: contextObjOpenedRequestAndNonPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };

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
            contextObjOpenedPMWOAging.Barchart1Data = { data: MultiBarChartDataOpenedpenedPMWOAging, chartWidth: contextObjOpenedPMWOAging.calculatedWidth, chartHeight: contextObjOpenedPMWOAging.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };

        });
    }


    LoadNonPMWOStatusForDashBoard() {
        var contextObjNonPMWOStatus = this;
        this.WOS.GetNonPMWOStatusForDashBoard().subscribe(function (resultData) {
           // debugger;
            // console.log(JSON.parse(resultData));
            var NonPMWOStatusArr = JSON.parse(resultData);
            contextObjNonPMWOStatus.PieChart2Data = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (let item of NonPMWOStatusArr) {
                contextObjNonPMWOStatus.PieChart2Data.data.push({
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
            contextObjNonPMWOStatus.PieChart1Data = { data: [], chartWidth: contextObjNonPMWOStatus.calculatedWidth, chartHeight: contextObjNonPMWOStatus.calculatedHeight, legendPosition: "top" };
            for (let item of NonPMWOStatusArr) {
                contextObjNonPMWOStatus.PieChart1Data.data.push({
                    key: item["Status"], y: item["Count"]
                });
            }
        });
    }


}