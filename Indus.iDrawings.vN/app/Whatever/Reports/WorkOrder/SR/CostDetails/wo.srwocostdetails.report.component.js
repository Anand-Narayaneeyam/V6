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
var WOSRCostDetailsReportComponent = (function () {
    function WOSRCostDetailsReportComponent() {
    }
    WOSRCostDetailsReportComponent.prototype.ngOnInit = function () {
        this.ReportData = new WOSRCostDetailsReportComponent();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 161;
        this.ReportData.ExportFileName = "SR Work Order Cost Details Report";
        this.ReportData.ReportTitle = "SR Work Order Cost Details Report";
        this.ReportData.ReportSubTitle = "Request Number: " + this.RequestNo + "   Description: " + this.Description;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4177,
            Value: this.WorkOrderId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Cost Details";
    };
    WOSRCostDetailsReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-srwocostdetails-report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            inputs: ['WorkOrderId', 'RequestNo', 'Description']
        }), 
        __metadata('design:paramtypes', [])
    ], WOSRCostDetailsReportComponent);
    return WOSRCostDetailsReportComponent;
}());
exports.WOSRCostDetailsReportComponent = WOSRCostDetailsReportComponent;
//# sourceMappingURL=wo.srwocostdetails.report.component.js.map