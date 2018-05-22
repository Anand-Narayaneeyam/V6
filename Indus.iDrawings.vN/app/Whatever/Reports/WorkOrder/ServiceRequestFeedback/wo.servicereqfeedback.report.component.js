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
var reportviewercomponent_1 = require('../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var WOSRFeedbackReportComponent = (function () {
    function WOSRFeedbackReportComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.WorkTypeId = 67;
        this.Title = "";
    }
    WOSRFeedbackReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / General / Service Request Feedback";
        contextObj.LoadReportData();
    };
    WOSRFeedbackReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 385;
        this.ReportData.ExportFileName = "Service Request Feedback";
        this.ReportData.ReportTitle = "Service Request Feedback";
        this.ReportData.ReportSubTitle = this.Title;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOSRFeedbackReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-srfeedback-report',
            template: "\n        <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n        <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n        </div>\n    ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['FromDate', 'ToDate', 'WorkTypeId', 'Title']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], WOSRFeedbackReportComponent);
    return WOSRFeedbackReportComponent;
}());
exports.WOSRFeedbackReportComponent = WOSRFeedbackReportComponent;
//# sourceMappingURL=wo.servicereqfeedback.report.component.js.map