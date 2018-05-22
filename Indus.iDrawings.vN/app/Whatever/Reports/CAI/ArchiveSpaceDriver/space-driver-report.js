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
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var ArchiveSpaceDriverReportComponent = (function () {
    function ArchiveSpaceDriverReportComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddlspacegrossareareport = undefined;
        this.ReportType = 0;
        this.IsFloorbool = false;
        this.IsFloor = 0;
        this.disableButton = false;
        this.archiveName = "";
        this.createOn = "";
    }
    ArchiveSpaceDriverReportComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "86";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        //  contexObj.alignContent = "horizontal";
        //  this.pagePath = "Reports / CAI / CAI Space Driver";
        contexObj.LoadReportData();
    };
    ArchiveSpaceDriverReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 35;
        this.ReportData.ExportFileName = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportTitle = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportSubTitle = "Archive Name: " + this.archiveName + "          Created On: " + this.createOn;
        if (this.IsFloorbool == false) {
            this.IsFloor = 0;
        }
        else if (this.IsFloorbool == true) {
            this.IsFloor = 1;
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
            ReportFieldId: 1609,
            Value: this.Ids.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4307,
            Value: this.IsFloor.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1986,
            Value: this.ReportType.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    ArchiveSpaceDriverReportComponent.prototype.onChangeType = function (event) {
        switch (event) {
            case "86":
                this.ReportType = "0";
                break;
            case "87":
                this.ReportType = "1";
                break;
            default:
                this.ReportType = "0";
                break;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        if (this.IsFloorbool == false && this.ReportType == "1")
            this.disableButton = true;
        else
            this.disableButton = false;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    ArchiveSpaceDriverReportComponent.prototype.onSubmit = function (event) {
        this.IsFloorbool = !this.IsFloorbool;
        var tempDdl = (document.getElementById("2738"));
        if (this.IsFloorbool == true) {
            tempDdl.style.backgroundColor = "lightgray";
            tempDdl.disabled = true;
        }
        else if (this.IsFloorbool == false) {
            tempDdl.style.backgroundColor = "white";
            tempDdl.disabled = false;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    ArchiveSpaceDriverReportComponent = __decorate([
        core_1.Component({
            selector: 'archiveSpaceDriver-report',
            templateUrl: './app/Views/Reports/CAI/ArchiveSpaceDriver/space-driver-report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['Ids', 'reportBy', 'archiveName', 'createOn']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], ArchiveSpaceDriverReportComponent);
    return ArchiveSpaceDriverReportComponent;
}());
exports.ArchiveSpaceDriverReportComponent = ArchiveSpaceDriverReportComponent;
//# sourceMappingURL=space-driver-report.js.map