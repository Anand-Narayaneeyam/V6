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
var common_service_1 = require('../../../../../Models/reports/common.service');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var WOSchedulesbyEquipmentReportComponent = (function () {
    function WOSchedulesbyEquipmentReportComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.EquipmentCategoryId = 0;
        this.EquipmentClassId = 0;
        this.EquipmentNoId = 0;
        this.reportCatId = 152;
    }
    WOSchedulesbyEquipmentReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / General / Schedules by Equipment";
        contextObj.LoadReportData();
    };
    WOSchedulesbyEquipmentReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 152;
        this.ReportData.ExportFileName = "Schedules by Equipment Details";
        this.ReportData.ReportTitle = "Schedules by Equipment Details";
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
            ReportFieldId: 4491,
            Value: this.EquipmentCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 647,
            Value: this.EquipmentClassId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 6377,
            Value: this.EquipmentNoId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOSchedulesbyEquipmentReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-schedulesbyequipment-report',
            templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyEquipment/wo.schedulesbyequipment.report.component.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['EquipmentCategoryId', 'EquipmentClassId', 'EquipmentNoId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], WOSchedulesbyEquipmentReportComponent);
    return WOSchedulesbyEquipmentReportComponent;
}());
exports.WOSchedulesbyEquipmentReportComponent = WOSchedulesbyEquipmentReportComponent;
//# sourceMappingURL=wo.schedulesbyequipment.component.js.map