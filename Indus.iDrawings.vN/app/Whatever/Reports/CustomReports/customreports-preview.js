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
var reportviewercomponent_1 = require('../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var common_service_1 = require('../../../Models/reports/common.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var CustomReportViewerComponent = (function () {
    function CustomReportViewerComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [], CustomReportFields: [] };
        this.reportTitle = "";
        this.moduleId = 0;
        this.isPreview = false;
        this.Orientation = 0; /*0 - portrait, 1- landscape */
        this.forPreview = 0;
        this.reportId = 0;
        this.needPrefix = "False";
        this.dataForCustomReport = undefined;
        this.moduleName = "";
    }
    CustomReportViewerComponent.prototype.ngOnInit = function () {
        if (this.isPreview == true) {
            this.forPreview = 1;
            var reportData = JSON.parse(this.fieldData);
            this.reportTitle = reportData[1].Value;
            if (reportData[2].Value == "35") {
                this.Orientation = 0;
            }
            else if (reportData[2].Value == "36") {
                this.Orientation = 1;
            }
            this.dataForCustomReport = "";
            this.LoadReportData();
        }
        else {
            this.forPreview = 0;
            this.getData();
        }
    };
    CustomReportViewerComponent.prototype.getData = function () {
        var contextObj = this;
        contextObj.commonreportservice.getDetailsforCustomReport(50897, contextObj.reportId).subscribe(function (resultData) {
            contextObj.dataForCustomReport = JSON.parse(resultData["Data"]);
            contextObj.moduleId = contextObj.dataForCustomReport[0]["ModuleId"];
            contextObj.needPrefix = contextObj.dataForCustomReport[0]["NeedPrefixForField"];
            contextObj.reportTitle = contextObj.dataForCustomReport[0]["Heading"];
            if (contextObj.dataForCustomReport.length == 1) {
                contextObj.LoadReportData();
            }
        });
    };
    CustomReportViewerComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = this.moduleId;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = 0;
        this.ReportData.CustomReportFields = this.customReportFields;
        this.ReportData.CustomReportFilterQuery = "";
        if (this.filterQuery != "" && this.filterQuery != undefined) {
            this.ReportData.ListCustomReportFilterFieldIdValues = JSON.parse(this.filterQuery);
        }
        if (this.forPreview == 0) {
            switch (this.moduleId) {
                case 2:
                    this.moduleName = "Projects";
                    break;
                case 3:
                    this.moduleName = "Space";
                    break;
                case 5:
                    this.moduleName = "Employees";
                    break;
                case 7:
                    this.moduleName = "Assets";
                    break;
                case 9:
                    this.moduleName = "Work Order";
                    break;
                case 30:
                    this.moduleName = "Real Property";
                    break;
                case 8:
                    this.moduleName = "Furniture";
                    break;
                case 12:
                    this.moduleName = "CAI";
                    break;
                default: this.moduleName = "Custom Reports";
            }
            this.pagePath = "Reports / " + this.moduleName + " / Custom Reports - " + this.reportTitle;
        }
        else {
            switch (this.moduleId) {
                case 2:
                    this.pagePath = "Settings / Projects / General Settings";
                    break;
                case 3:
                    this.pagePath = "Settings / Space / General Settings";
                    break;
                case 5:
                    this.pagePath = "Settings / Employees / General Settings";
                    break;
                case 7:
                    this.pagePath = "Settings / Assets / General Settings";
                    break;
                case 9:
                    this.pagePath = "Settings / Work Order / PM Settings";
                    break;
                case 30:
                    this.pagePath = "Settings / Real Property / GeneralSettings";
                    break;
                case 8:
                    this.pagePath = "Settings / Furniture / GeneralSettings";
                    break;
                case 12:
                    this.pagePath = "Settings / CAI / GeneralSettings";
                    break;
            }
        }
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 154,
            Value: this.Orientation.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3356,
            Value: this.forPreview.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 147,
            Value: this.reportId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 500044,
            Value: this.needPrefix.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    CustomReportViewerComponent = __decorate([
        core_1.Component({
            selector: 'custom-reportviewer',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer *ngIf =\"dataForCustomReport != undefined\" [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['moduleId', 'fieldData', 'customReportFields', 'isPreview', 'reportId', 'filterQuery']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], CustomReportViewerComponent);
    return CustomReportViewerComponent;
}());
exports.CustomReportViewerComponent = CustomReportViewerComponent;
//# sourceMappingURL=customreports-preview.js.map