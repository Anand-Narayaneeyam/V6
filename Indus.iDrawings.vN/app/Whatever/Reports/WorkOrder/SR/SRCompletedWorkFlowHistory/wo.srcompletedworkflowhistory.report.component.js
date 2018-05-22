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
var reportviewercomponent_1 = require('../../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var WOSRCompletedWorkFlowHistoryReportComponent = (function () {
    function WOSRCompletedWorkFlowHistoryReportComponent() {
    }
    WOSRCompletedWorkFlowHistoryReportComponent.prototype.ngOnInit = function () {
        this.ReportData = new WOSRCompletedWorkFlowHistoryReportComponent();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        if (this.workflowEntityCategoryId == 1) {
            this.ReportData.ReportCategoryId = 158;
        }
        else {
            this.ReportData.ReportCategoryId = 298;
        }
        this.ReportData.ExportFileName = "Completed Workflow History Report";
        this.ReportData.ReportTitle = "Completed Workflow History Details";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7611,
            Value: this.workflowEntityCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5861,
            Value: this.selectedworkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1438,
            Value: this.selectedIds.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5863,
            Value: this.currentWorkFlowActionPointId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 67,
            Value: "5"
        });
        arrRptFieldIds.push({
            ReportFieldId: 3382,
            Value: "0"
        });
        arrRptFieldIds.push({
            ReportFieldId: 3884,
            Value: "3"
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Completed Workflow History";
    };
    WOSRCompletedWorkFlowHistoryReportComponent = __decorate([
        core_1.Component({
            selector: 'woSRCompletedWorkFlowHistoryComponent-report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            inputs: ['selectedIds', 'selectedworkTypeId', 'workflowEntityCategoryId', 'currentWorkFlowActionPointId']
        }), 
        __metadata('design:paramtypes', [])
    ], WOSRCompletedWorkFlowHistoryReportComponent);
    return WOSRCompletedWorkFlowHistoryReportComponent;
}());
exports.WOSRCompletedWorkFlowHistoryReportComponent = WOSRCompletedWorkFlowHistoryReportComponent;
//# sourceMappingURL=wo.srcompletedworkflowhistory.report.component.js.map