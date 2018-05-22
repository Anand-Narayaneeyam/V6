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
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var component_details_report_1 = require('./component.details.report');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var ComponentDetailsSelect = (function () {
    function ComponentDetailsSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.ListboxData = undefined;
        this.onSubmitClick = new core_1.EventEmitter();
        this.objectCategoryId = 10;
        this.drawingIds = "";
        this.dataOption = 1;
        this.classListOption = 1;
        this.objectComponentCategory = 0;
        this.isNextClicked = false;
        this.selectedTab = 0;
        this.iscard = true;
    }
    ComponentDetailsSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Mechanical / Component Details";
        var contextObj = this;
        this.commonreportservice.getAssetClassSelectionFieldsList(1).subscribe(function (result) {
            var data = result.Data[0];
            data.FieldLabel = "";
            contextObj.ListboxData = data;
            contextObj.commonreportservice.getAssetClassLookups(contextObj.objectCategoryId, contextObj.drawingIds, contextObj.dataOption, contextObj.classListOption, contextObj.objectComponentCategory).subscribe(function (resultData) {
                contextObj.ListboxData.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                if (contextObj.ListboxData.LookupDetails.LookupValues == undefined) {
                    contextObj.enableMenu = [];
                }
            });
        });
    };
    ComponentDetailsSelect.prototype.getListBoxData = function (event) {
        if (event.fieldObject.MultiFieldValues != undefined) {
            if (event.fieldObject.MultiFieldValues.length == 0) {
                this.enableMenu = [];
            }
            else {
                this.enableMenu = [0];
            }
        }
    };
    ComponentDetailsSelect.prototype.onSubMenuChange = function (event) {
        this.isNextClicked = false;
        var selectedClassIds = '';
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select a Component Type", 2);
        }
        else {
            for (var count = 0; count < this.ListboxData.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.ListboxData.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            this.selectedIds = selectedClassIds;
            var contexObj = this;
            setTimeout(function () {
                contexObj.isNextClicked = true;
            }, 50);
            setTimeout(function () {
                contexObj.selectedTab = 1;
            }, 100);
        }
    };
    ComponentDetailsSelect.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ComponentDetailsSelect.prototype, "onSubmitClick", void 0);
    ComponentDetailsSelect = __decorate([
        core_1.Component({
            selector: 'componentdetails-selector',
            templateUrl: './app/Views/Reports/Mechanical/ComponentDetails/component.details.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, component_details_report_1.ComponentDetailsComponent, listboxcomponent_component_1.ListBoxComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], ComponentDetailsSelect);
    return ComponentDetailsSelect;
}());
exports.ComponentDetailsSelect = ComponentDetailsSelect;
//# sourceMappingURL=component.details.select.js.map