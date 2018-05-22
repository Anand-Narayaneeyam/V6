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
var common_service_1 = require('../../../../Models/reports/common.service');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var SelectOrgUnitReportComponent = (function () {
    function SelectOrgUnitReportComponent(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.ListboxData = undefined;
        this.onSubmitClick = new core_1.EventEmitter();
        this.LevelNameCustomized = "";
        this.iscard = true;
        this.pagePath = "";
    }
    SelectOrgUnitReportComponent.prototype.ngOnInit = function () {
        switch (this.ReportCategoryId) {
            case 100:
                this.pagePath = "Reports / Employees / Detailed Occupancy";
                break;
            case 101:
                this.pagePath = "Reports / Employees / Under Occupied Spaces";
                break;
            case 102:
                this.pagePath = "Reports / Employees / Over Occupied Spaces";
                break;
            case 103:
                this.pagePath = "Reports / Employees / Nominally Occupied ";
                break;
            default:
                this.pagePath = " ";
                break;
        }
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        var contexObj = this;
        contexObj.commonreportservice.getOrganizationalUnitField().subscribe(function (resultData) {
            var data = resultData.Data[0];
            data.FieldLabel = "";
            contexObj.ListboxData = data;
            if (contexObj.ListboxData == undefined) {
                contexObj.enableMenu = [];
            }
        });
        contexObj.commonreportservice.getOrgLevelCustomizedName().subscribe(function (result) {
            if (result.Data != undefined) {
                var LevelNames = JSON.parse(result.Data);
                contexObj.LevelNameCustomized = LevelNames[0].L1Caption;
            }
        });
    };
    SelectOrgUnitReportComponent.prototype.getListBoxData = function (event) {
        if (event.fieldObject.MultiFieldValues != undefined) {
            if (event.fieldObject.MultiFieldValues.length == 0) {
                this.enableMenu = [];
            }
            else {
                this.enableMenu = [0];
            }
        }
    };
    SelectOrgUnitReportComponent.prototype.onSubMenuChange = function (event) {
        if (this.ListboxData.MultiFieldValues == null) {
            this.notificationService.ShowToaster("Select " + this.LevelNameCustomized + "(s)", 2);
        }
        else {
            this.onSubmitClick.emit(this.ListboxData.MultiFieldValues);
            this.ListboxData.MultiFieldValues = null;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectOrgUnitReportComponent.prototype, "onSubmitClick", void 0);
    SelectOrgUnitReportComponent = __decorate([
        core_1.Component({
            selector: 'select-orgunit-report',
            templateUrl: './app/Views/Reports/Common/SelectOrgUnitForReport/select.orgunit.report.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [listboxcomponent_component_1.ListBoxComponent, notify_component_1.Notification, page_component_1.PageComponent, submenu_component_1.SubMenu],
            inputs: ['ReportCategoryId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], SelectOrgUnitReportComponent);
    return SelectOrgUnitReportComponent;
}());
exports.SelectOrgUnitReportComponent = SelectOrgUnitReportComponent;
//# sourceMappingURL=select.orgunit.report.component.js.map