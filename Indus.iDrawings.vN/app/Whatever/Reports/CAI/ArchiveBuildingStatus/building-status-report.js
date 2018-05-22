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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var ArchiveBuildingStatusReport = (function () {
    function ArchiveBuildingStatusReport() {
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.showArchive = false;
        this.archiveName = "";
        this.createOn = "";
    }
    ArchiveBuildingStatusReport.prototype.ngOnInit = function () {
        this.ReportData = new ArchiveBuildingStatusReport();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 21;
        this.ReportData.ReportsTypeId = 3;
        this.ReportData.ExportFileName = "Building Status on " + this.createOn;
        this.ReportData.ReportTitle = "Building Status on " + this.createOn;
        this.ReportData.ReportSubTitle = "Archive Name: " + this.archiveName;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1521,
            Value: this.Ids.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3356,
            Value: "3"
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Archives / Building Status";
    };
    ArchiveBuildingStatusReport = __decorate([
        core_1.Component({
            selector: 'archive-buildingStatus-report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent],
            inputs: ['Ids', 'archiveName', 'createOn']
        }), 
        __metadata('design:paramtypes', [])
    ], ArchiveBuildingStatusReport);
    return ArchiveBuildingStatusReport;
}());
exports.ArchiveBuildingStatusReport = ArchiveBuildingStatusReport;
//# sourceMappingURL=building-status-report.js.map