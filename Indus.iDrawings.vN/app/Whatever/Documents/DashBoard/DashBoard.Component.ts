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
import { DocumentService } from '../../../Models/Documents/documents.service';
import {CommonService} from '../../../Models/Common/common.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {DocumentListComponent} from '../../../whatever/documents/documents/documentlist.component';


@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent, SplitViewComponent, DocumentListComponent],
    providers: [DocumentService, CommonService],
    templateUrl: "./app/Views/Documents/DashBoard/DashBoard.Component.html"
})

export class documentDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;
    changeHapndOrgOccupancy: boolean = false;
    pagePath = "Documents / Dashboard";
    OrgLvel1Name = 'Category';
    BldngFloorLabel = 'File Type';
    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';
    fieldObject: IField;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    DrawingCategoryCountMap: any;
    sourceLength: any;
    calculatedWidth: number;
    calculatedHeight: number = 100;
    totalItems: number = 0;
    refreshgrid;
    isDocCatSubscribed: boolean = false;
    mySearchObject: any[] = [];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    searchObjct: boolean;
    innerwidth: number = 0;                       
    SearchId: any;

    constructor(private DS: DocumentService, private commonService: CommonService) {

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

        contextObj.DS.GetDashboardDocumentFeildId().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });

        contextObj.getCustomerSubscribedFields(contextObj);       
        if(contextObj.isDocCatSubscribed = true)
            contextObj.LoadOrgDocumentCategoryCharts();        
        contextObj.DocumentBasedOnFileType();
        contextObj.GetUploadedDocumentList();

        //contextObj.LoadSpaceStandardOccupancyChart("0", "0");

        var reportfieldIdArray = new Array<ReportFieldArray>();
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: "7",
        });
     
        contextObj.DS.docDashboardMySearchList(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            contextObj.mySearchObject = JSON.parse(resultData["FieldBinderData"]);
            contextObj.innerwidth = window.innerWidth * .59;
        });

    }

    documentDashBoardSearchEvent(field: any) {
        debugger
        this.searchObjct = true;
        this.SearchId = field.Id;
        this.splitviewInput.showSecondaryView = true;
    }


   // onchangeddlsearchNames
    //contextObj.commonService.ddlSavedSearches



    LoadOrgDocumentCategoryCharts() {
        var contextObjOrgDocumentCategory = this;
        this.DS.getOrgCategoryforDashBoard().subscribe(function (resultData) {          
          //  console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgDocumentCategory.PieChart1Data = { data: [], chartWidth: contextObjOrgDocumentCategory.calculatedWidth, chartHeight: contextObjOrgDocumentCategory.calculatedHeight, legendPosition: "top" }

            for (let item of OrgOccupancyArr) {
                contextObjOrgDocumentCategory.PieChart1Data.data.push({
                    key: item["Document Category"], y: item["No. of Documents"]
                });
            }
        });
    }

    DocumentBasedOnFileType() {
        var contextObjOrgFileType = this;
        this.DS.getDocumentFileTypeDashBoard().subscribe(function (resultData) {          
           // console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgFileType.PieChart2Data = { data: [], chartWidth: contextObjOrgFileType.calculatedWidth, chartHeight: contextObjOrgFileType.calculatedHeight, legendPosition: "top" }

            for (let item of OrgOccupancyArr) {
                contextObjOrgFileType.PieChart2Data.data.push({
                    key: item["File Type"], y: item["No. of Documents"]
                });
            }
        });
    }

    GetUploadedDocumentList() {
        var contextObj = this;
        contextObj.DS.GetDashboardDocument(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {           
        contextObj.itemsSource = JSON.parse(result);
        });
    }

    private getCustomerSubscribedFields(contextObj) {     
        contextObj.isDocCatSubscribed = false;    
        contextObj.DS.getSubscribedOptionalFields("957",1).subscribe(function (result) {                 
            //if (contextObj.getData.checkForUnhandledErrors(result)) {           
                contextObj.isDocCatSubscribed = result;      
            //}
        });
    }

    //contextObj.commonService.CheckDeletePermisionForArchivedSearch(contextObj.searchId).subscribe(function (result) {
    //    if (result == 1) {
    //        contextObj.showSlide = true;
    //        contextObj.isSaveAsClicked = false;
    //    } else {
    //        contextObj._notificationService.ShowToaster("You do not have the privilege to delete the selected search name", 2);
    //    }
    //});
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}