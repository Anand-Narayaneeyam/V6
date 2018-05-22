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
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var common_service_1 = require('../../../../Models/Common/common.service');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var EmployeesAssignedEmployeesComponent = (function () {
    function EmployeesAssignedEmployeesComponent(commonService, notificationService) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Customize Report";
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsMobile = window["IsMobile"];
    }
    EmployeesAssignedEmployeesComponent.prototype.ngOnInit = function () {
        this.pagePath = "Reports / Employees / Assigned Employees";
        this.LoadReportData(0);
    };
    EmployeesAssignedEmployeesComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportSubTitle = "";
        switch (this.reportBy) {
            case 1:
                this.ReportData.ReportTitle = "Assigned Employees by Site ";
                this.ReportData.ExportFileName = "Assigned Employees by Site ";
                this.ReportData.ReportCategoryId = 47;
                this.reportBy = 2;
                break;
            case 2:
                this.ReportData.ReportTitle = "Assigned Employees by Building";
                this.ReportData.ExportFileName = "Assigned Employees by Building";
                this.ReportData.ReportCategoryId = 45;
                this.reportBy = 3;
                break;
            case 3:
                this.ReportData.ReportTitle = "Assigned Employees by Floor ";
                this.ReportData.ExportFileName = "Assigned Employees by Floor ";
                this.ReportData.ReportCategoryId = 48;
                this.reportBy = 4;
                break;
            case 14:
                this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 49;
                this.reportBy = 5;
                break;
            case 15:
                this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 50;
                this.reportBy = 5;
                break;
            case 16:
                this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 51;
                this.reportBy = 5;
                break;
            case 17:
                this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 52;
                this.reportBy = 5;
                break;
            case 18:
                this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 53;
                this.reportBy = 5;
                break;
            default:
                this.ReportData.ReportTitle = "Assigned Employees by Floor";
                this.ReportData.ExportFileName = "Assigned Employees by Floor";
                this.ReportData.ReportCategoryId = 48;
                this.reportBy = 4;
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
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    EmployeesAssignedEmployeesComponent.prototype.customizeClick = function (event) {
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"]; //filter(function (item) { return item.FieldId != 1625 });
        });
        var listParams = new Array();
        listParams.push({ ReportFieldId: 353, Value: this.ReportData.ModuleId }, { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId }, { ReportFieldId: 3792, Value: this.needModulePrefix }, { ReportFieldId: 1243, Value: this.isFromCorrectionProject }, { ReportFieldId: 66, Value: "" });
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    EmployeesAssignedEmployeesComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    EmployeesAssignedEmployeesComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    EmployeesAssignedEmployeesComponent = __decorate([
        core_1.Component({
            selector: 'employees-AssignedEmployeesReport',
            templateUrl: './app/Views/Reports/Employee/AssignedEmployees/employees.assignedemployees.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonService, notify_service_1.NotificationService],
            inputs: ['Ids', 'reportBy', 'orgName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService])
    ], EmployeesAssignedEmployeesComponent);
    return EmployeesAssignedEmployeesComponent;
}());
exports.EmployeesAssignedEmployeesComponent = EmployeesAssignedEmployeesComponent;
//# sourceMappingURL=employees.assignedemployees.report.component.js.map