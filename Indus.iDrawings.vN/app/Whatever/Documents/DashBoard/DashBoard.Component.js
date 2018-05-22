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
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var common_service_1 = require('../../../Models/Common/common.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var documentlist_component_1 = require('../../../whatever/documents/documents/documentlist.component');
var documentDashBoard = (function () {
    function documentDashBoard(DS, commonService) {
        this.DS = DS;
        this.commonService = commonService;
        this.changeHapndOrgOccupancy = false;
        this.pagePath = "Documents / Dashboard";
        this.OrgLvel1Name = 'Category';
        this.BldngFloorLabel = 'File Type';
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.calculatedHeight = 100;
        this.totalItems = 0;
        this.isDocCatSubscribed = false;
        this.mySearchObject = [];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.innerwidth = 0;
    }
    documentDashBoard.prototype.ngOnInit = function () {
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
        if (contextObj.isDocCatSubscribed = true)
            contextObj.LoadOrgDocumentCategoryCharts();
        contextObj.DocumentBasedOnFileType();
        contextObj.GetUploadedDocumentList();
        //contextObj.LoadSpaceStandardOccupancyChart("0", "0");
        var reportfieldIdArray = new Array();
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: "7",
        });
        contextObj.DS.docDashboardMySearchList(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            contextObj.mySearchObject = JSON.parse(resultData["FieldBinderData"]);
            contextObj.innerwidth = window.innerWidth * .59;
        });
    };
    documentDashBoard.prototype.documentDashBoardSearchEvent = function (field) {
        debugger;
        this.searchObjct = true;
        this.SearchId = field.Id;
        this.splitviewInput.showSecondaryView = true;
    };
    // onchangeddlsearchNames
    //contextObj.commonService.ddlSavedSearches
    documentDashBoard.prototype.LoadOrgDocumentCategoryCharts = function () {
        var contextObjOrgDocumentCategory = this;
        this.DS.getOrgCategoryforDashBoard().subscribe(function (resultData) {
            //  console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgDocumentCategory.PieChart1Data = { data: [], chartWidth: contextObjOrgDocumentCategory.calculatedWidth, chartHeight: contextObjOrgDocumentCategory.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_1 = OrgOccupancyArr; _i < OrgOccupancyArr_1.length; _i++) {
                var item = OrgOccupancyArr_1[_i];
                contextObjOrgDocumentCategory.PieChart1Data.data.push({
                    key: item["Document Category"], y: item["No. of Documents"]
                });
            }
        });
    };
    documentDashBoard.prototype.DocumentBasedOnFileType = function () {
        var contextObjOrgFileType = this;
        this.DS.getDocumentFileTypeDashBoard().subscribe(function (resultData) {
            // console.log(JSON.parse(resultData));
            var OrgOccupancyArr = JSON.parse(resultData);
            contextObjOrgFileType.PieChart2Data = { data: [], chartWidth: contextObjOrgFileType.calculatedWidth, chartHeight: contextObjOrgFileType.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, OrgOccupancyArr_2 = OrgOccupancyArr; _i < OrgOccupancyArr_2.length; _i++) {
                var item = OrgOccupancyArr_2[_i];
                contextObjOrgFileType.PieChart2Data.data.push({
                    key: item["File Type"], y: item["No. of Documents"]
                });
            }
        });
    };
    documentDashBoard.prototype.GetUploadedDocumentList = function () {
        var contextObj = this;
        contextObj.DS.GetDashboardDocument(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result);
        });
    };
    documentDashBoard.prototype.getCustomerSubscribedFields = function (contextObj) {
        contextObj.isDocCatSubscribed = false;
        contextObj.DS.getSubscribedOptionalFields("957", 1).subscribe(function (result) {
            //if (contextObj.getData.checkForUnhandledErrors(result)) {           
            contextObj.isDocCatSubscribed = result;
            //}
        });
    };
    documentDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, documentlist_component_1.DocumentListComponent],
            providers: [documents_service_1.DocumentService, common_service_1.CommonService],
            templateUrl: "./app/Views/Documents/DashBoard/DashBoard.Component.html"
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, common_service_1.CommonService])
    ], documentDashBoard);
    return documentDashBoard;
}());
exports.documentDashBoard = documentDashBoard;
//# sourceMappingURL=DashBoard.Component.js.map