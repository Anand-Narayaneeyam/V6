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
var WOProcedureStepsReportComponent = (function () {
    function WOProcedureStepsReportComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.EquipmentCategoryId = 0;
        this.EquipmentClassId = 0;
        this.ProcedureId = 0;
        this.reportCatId = 159;
    }
    WOProcedureStepsReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / General / Procedures and Steps";
        contextObj.LoadReportData();
    };
    WOProcedureStepsReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 159;
        this.ReportData.ExportFileName = "Procedures and Steps Details";
        this.ReportData.ReportTitle = "Procedures and Steps Details";
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
            ReportFieldId: 1334,
            Value: this.ProcedureId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOProcedureStepsReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-proceduresandsteps-report',
            templateUrl: './app/Views/Reports/WorkOrder/Maintenance/ProceduresandSteps/wo.proceduresandsteps.report.component.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['EquipmentCategoryId', 'EquipmentClassId', 'ProcedureId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], WOProcedureStepsReportComponent);
    return WOProcedureStepsReportComponent;
}());
exports.WOProcedureStepsReportComponent = WOProcedureStepsReportComponent;
//# sourceMappingURL=wo.proceduresandsteps.component.js.map