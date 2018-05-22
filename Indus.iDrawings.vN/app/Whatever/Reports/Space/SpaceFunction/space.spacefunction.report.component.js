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
var SpaceSpaceFunctionsComponent = (function () {
    function SpaceSpaceFunctionsComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.pagePath = "Reports / Space / Space Functions ";
        this.ExportFileNameCustomized = "";
    }
    SpaceSpaceFunctionsComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.getSpaceFunctionCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                contexObj.ExportFileNameCustomized = resultData.Data;
                if (contexObj.ExportFileNameCustomized != "") {
                    contexObj.pagePath = "Reports / Space / " + contexObj.ExportFileNameCustomized;
                }
            }
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        });
    };
    SpaceSpaceFunctionsComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 97;
        this.ReportData.ExportFileName = this.ExportFileNameCustomized;
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
    };
    SpaceSpaceFunctionsComponent = __decorate([
        core_1.Component({
            selector: 'spaceSpaceFunctionsComponent-report',
            template: "\n    <page *ngIf=\"ExportFileNameCustomized != undefined\" [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], SpaceSpaceFunctionsComponent);
    return SpaceSpaceFunctionsComponent;
}());
exports.SpaceSpaceFunctionsComponent = SpaceSpaceFunctionsComponent;
//# sourceMappingURL=space.spacefunction.report.component.js.map