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
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var floorselection_report_component_1 = require('../../Common/ReportFloorSelection/floorselection.report.component');
var component_listbyfloor_report_1 = require('./component.listbyfloor.report');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var ComponentListByFloorSelect = (function () {
    function ComponentListByFloorSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.next = undefined;
        this.isInitialised = false;
        this.selectedCriteria = 3;
        this.ReportCategoryId = 107;
        this.isNextClicked = false;
        this.selectedTab = 0;
        this.objectCategoryId = 8;
    }
    ComponentListByFloorSelect.prototype.ngOnInit = function () {
        this.pagePath = "Reports / Electrical / Component List by Floor";
    };
    ComponentListByFloorSelect.prototype.submit = function (value) {
        this.isNextClicked = false;
        this.next = value;
        var contexObj = this;
        setTimeout(function () {
            contexObj.isNextClicked = true;
        }, 100);
        setTimeout(function () {
            contexObj.selectedTab = 1;
        }, 200);
    };
    ComponentListByFloorSelect.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
        }
        else if (event[0] == 1) {
            this.selectedTab = 1;
        }
    };
    ComponentListByFloorSelect = __decorate([
        core_1.Component({
            selector: 'componentlistbyfloor-selector',
            templateUrl: './app/Views/Reports/Electrical/ComponentListByFloor/component.listbyfloor.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, floorselection_report_component_1.FloorSelectionReportComponent, component_listbyfloor_report_1.ComponentListByFloorComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], ComponentListByFloorSelect);
    return ComponentListByFloorSelect;
}());
exports.ComponentListByFloorSelect = ComponentListByFloorSelect;
//# sourceMappingURL=component.listbyfloor.select.js.map