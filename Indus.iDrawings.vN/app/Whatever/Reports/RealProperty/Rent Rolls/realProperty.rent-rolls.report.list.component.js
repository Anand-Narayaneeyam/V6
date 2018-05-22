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
var realPropertyRentRollsReportList = (function () {
    function realPropertyRentRollsReportList() {
        this.FromRpDate = "";
        this.ToRpDate = "";
    }
    realPropertyRentRollsReportList.prototype.ngOnInit = function () {
        this.ReportData = new realPropertyRentRollsReportList();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 30;
        this.ReportData.ReportCategoryId = 389;
        this.ReportData.ExportFileName = "Rent Rolls";
        this.ReportData.ReportTitle = "Rent Rolls";
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
            ReportFieldId: 5768,
            Value: "0"
        });
        arrRptFieldIds.push({
            ReportFieldId: 5694,
            Value: '0'
        });
        if (this.FromRpDate != null || this.FromRpDate != undefined) {
            arrRptFieldIds.push({
                ReportFieldId: 900197,
                Value: this.FromRpDate.toString()
            });
        }
        if (this.ToRpDate != null || this.ToRpDate != undefined) {
            arrRptFieldIds.push({
                ReportFieldId: 900198,
                Value: this.ToRpDate.toString()
            });
        }
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Real Property / Rent Rolls";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], realPropertyRentRollsReportList.prototype, "FromRpDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], realPropertyRentRollsReportList.prototype, "ToRpDate", void 0);
    realPropertyRentRollsReportList = __decorate([
        core_1.Component({
            selector: 'realProperty-rentRolls-report-list',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], realPropertyRentRollsReportList);
    return realPropertyRentRollsReportList;
}());
exports.realPropertyRentRollsReportList = realPropertyRentRollsReportList;
//# sourceMappingURL=realProperty.rent-rolls.report.list.component.js.map