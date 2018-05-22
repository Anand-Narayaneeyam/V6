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
var SpaceGrossAreaReportComponent = (function () {
    function SpaceGrossAreaReportComponent() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    }
    SpaceGrossAreaReportComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.pagePath = "Reports / Space / Gross Area Report";
        contexObj.LoadReportData();
    };
    SpaceGrossAreaReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 226;
        this.ReportData.ExportFileName = "Gross Area Report";
        this.ReportData.ReportSubTitle = "";
        switch (this.reportBy) {
            case 1:
                this.ReportData.ReportTitle = "Gross Area Report by Site ";
                this.ReportData.ExportFileName = "Gross Area Report by Site ";
                break;
            case 2:
                this.ReportData.ReportTitle = "Gross Area Report by Building";
                this.ReportData.ExportFileName = "Gross Area Report by Building";
                break;
            case 3:
                this.ReportData.ReportTitle = "Gross Area Report by Floor ";
                this.ReportData.ExportFileName = "Gross Area Report by Floor ";
                break;
            default:
                this.ReportData.ReportTitle = "Gross Area Report by Floor";
                this.ReportData.ExportFileName = "Gross Area Report by Floor";
                break;
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
            ReportFieldId: 3356,
            Value: this.reportBy.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3650,
            Value: this.Ids.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    SpaceGrossAreaReportComponent = __decorate([
        core_1.Component({
            selector: 'spaceGrossAreaReport-Component',
            template: "\n            <page  [pagetitle]=\"pagePath\">\n                <content>\n                    <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n                    <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n                    </div>\n                </content>\n            </page>\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            inputs: ['Ids', 'reportBy']
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceGrossAreaReportComponent);
    return SpaceGrossAreaReportComponent;
}());
exports.SpaceGrossAreaReportComponent = SpaceGrossAreaReportComponent;
//# sourceMappingURL=space.grossareareport.report.component.js.map