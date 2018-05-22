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
var AdminModuleDrawingsComponent = (function () {
    function AdminModuleDrawingsComponent() {
    }
    AdminModuleDrawingsComponent.prototype.ngOnInit = function () {
        this.ReportData = new AdminModuleDrawingsComponent();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 0;
        this.ReportData.ReportCategoryId = 274;
        this.ReportData.ExportFileName = "Drawings by Module";
        this.ReportData.ReportTitle = "Drawings by Module";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Administration / Drawings by Module";
    };
    AdminModuleDrawingsComponent = __decorate([
        core_1.Component({
            selector: 'report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModuleDrawingsComponent);
    return AdminModuleDrawingsComponent;
}());
exports.AdminModuleDrawingsComponent = AdminModuleDrawingsComponent;
//# sourceMappingURL=admin.module_drawings.report.component.js.map