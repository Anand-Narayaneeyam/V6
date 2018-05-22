import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {AsbuiltService} from '../../../models/Asbuilts/asbuilt.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [AsbuiltService],
    templateUrl: "./app/Views/Asbuilts/DashBoard/asbuiltsdashboard.component.html"


})
export class AsbuiltsDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    imgData: string = "";
    pagePath = "As Builts / Dashboard";
    
    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';
    
    fieldObject: IField;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    DrawingCategoryCountMap: any;
    BuildingImageMap: any[] = [];
    sourceLength: any;
    calculatedWidth: number;
    calculatedHeight: number = 100;
    constructor(private ABS: AsbuiltService) {

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
        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadAsbuiltsDashBoard();     
    }
    LoadAsbuiltsDashBoard() {
        var contextObj = this;
        this.ABS.GetDetailsForDashBoard().subscribe(function (resultData) {
            debugger;                 
            var temparr = JSON.parse(resultData).slice(0, 200);
            contextObj.DrawingCategoryCountMap = {};
            contextObj.BuildingImageMap = [];
            contextObj.itemsSource = temparr;
            contextObj.sourceLength = contextObj.itemsSource.length;
            for (let item of temparr) {
                contextObj.LoadDrawingCategoryCount(item["BuildingId"]);
                contextObj.LoadBuildingImage(item["BuildingId"], item["Photo"]);
            }

        });
    }

    LoadSubscribedFeatureForAreaUnit() {
        var contextObjAreaUnit = this;
        this.ABS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjAreaUnit.AreaUnit = 'Sq.Mt.';
            }
        });
    }

    LoadDrawingCategoryCount(event) {
        var contextObj = this;
        this.ABS.GetDrawingCategoriesCountforDashboard(event).subscribe(function (resultData) {
            var Arr = JSON.parse(resultData);
            var PieChartData = { data: [], chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight - 100, legendPosition: "top" };
            for (let item of Arr) {
                PieChartData.data.push({
                    key: item["Category"], y: item["No.OfDrawings"]
                });
            }
            contextObj.DrawingCategoryCountMap[event] = PieChartData;         
        });
    }


    LoadBuildingImage(bldngId, bldngPhoto) {
        var contextObj = this;
        if (bldngPhoto != null) {
            var fileExtension = bldngPhoto.replace(/^.*\./, '');
            contextObj.ABS.DownloadBuildingImage(bldngId, bldngPhoto).subscribe(function (resultData) {
                if (resultData._body != "Data is Null") {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    if (fileExtension.toUpperCase() == "JPG" || fileExtension.toUpperCase() == "JPEG") {
                        contextObj.imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                    else if (fileExtension == "png") {
                        contextObj.imgData = "data:image/png;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                    else if (fileExtension == "bmp") {;
                        contextObj.imgData = "data:image/bmp;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                }
                else {
                    contextObj.imgData = undefined;
                }
                contextObj.BuildingImageMap[bldngId] = contextObj.imgData;
            });
        }
        else {
            contextObj.BuildingImageMap[bldngId] = undefined;
        }
    }

    base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}