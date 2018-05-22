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
var reportviewercomponent_1 = require('../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var UserListComponent = (function () {
    function UserListComponent() {
    }
    //get ModuleId(): number {
    //    return this._ModuleId;
    //}
    //set ModuleId(moduelid: number) {
    //    this._ModuleId = moduelid;
    //}
    //get ReportCategoryId(): number {
    //    return this._ReportCategoryId;
    //}
    //set ReportCategoryId(reportcategory: number) {
    //    this._ReportCategoryId = reportcategory;
    //}
    //  get ExportFileNamed(): string {
    //      return this._ExportFileName;
    //}
    //set ExportFileName(exportfilename: string) {
    //    this._ExportFileName = exportfilename;
    //}
    UserListComponent.prototype.ngOnInit = function () {
        this.adminReportData = new UserListComponent();
        var arrRptFieldIds = new Array();
        this.adminReportData.ModuleId = 0; //this.MId;
        this.adminReportData.ReportCategoryId = 3; //this.RCId;
        this.adminReportData.ExportFileName = "SiteList"; //this.FileName
        this.adminReportData.ReportTitle = "Technicians";
        this.adminReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.adminReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.adminReportData.ReportCategoryId.toString()
        });
        this.adminReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Administration / Reports";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserListComponent.prototype, "MId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserListComponent.prototype, "RCId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserListComponent.prototype, "FileName", void 0);
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'report',
            template: "\n    <div style=\"width:100%;height:100%\" *ngIf=\"adminReportData != undefined\">\n    <reportviewer [reportData]=adminReportData > Loading ...</reportviewer>\n    </div>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=userlist.report.component.js.map