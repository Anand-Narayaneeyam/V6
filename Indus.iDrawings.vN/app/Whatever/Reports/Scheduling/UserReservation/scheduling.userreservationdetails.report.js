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
var SchedulingReportUserReservationDetails = (function () {
    function SchedulingReportUserReservationDetails(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.fromDate = "";
        this.toDate = "";
        this.SiteId = 0;
        this.BuildingId = 0;
        this.FloorId = 0;
        this.StatusId = "";
    }
    SchedulingReportUserReservationDetails.prototype.ngOnInit = function () {
        this.LoadReportData();
        this.pagePath = "Reports / Scheduling / User Reservation Details";
    };
    SchedulingReportUserReservationDetails.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 14;
        this.ReportData.ReportCategoryId = 427;
        this.ReportData.ExportFileName = "User Reservation Details";
        this.ReportData.ReportTitle = "User Reservation Details";
        this.ReportData.ReportSubTitle = "Date Period: " + this.fromDate + " to " + this.toDate;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.fromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.toDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7275,
            Value: this.SiteId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7276,
            Value: this.BuildingId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7277,
            Value: this.FloorId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 6716,
            Value: this.StatusId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    SchedulingReportUserReservationDetails = __decorate([
        core_1.Component({
            selector: 'SchedulingReport-UserReservationDetails',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n        <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData> Loading ...</reportviewer>\n        </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['fromDate', 'toDate', 'SiteId', 'BuildingId', 'FloorId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], SchedulingReportUserReservationDetails);
    return SchedulingReportUserReservationDetails;
}());
exports.SchedulingReportUserReservationDetails = SchedulingReportUserReservationDetails;
//# sourceMappingURL=scheduling.userreservationdetails.report.js.map