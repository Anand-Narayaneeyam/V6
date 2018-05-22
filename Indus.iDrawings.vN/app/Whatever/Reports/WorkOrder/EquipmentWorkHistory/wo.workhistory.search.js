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
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var wo_workhistory_report_component_1 = require('./wo.workhistory.report.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var WorkHistorySearchReportComponent = (function () {
    function WorkHistorySearchReportComponent(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.equipmentCategoryId = 0;
        this.equipmentClassId = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isNextClicked = false;
        this.selectedTab = 0;
        this.iscard = true;
    }
    WorkHistorySearchReportComponent.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / General / Equipment Work History";
        var contextObj = this;
        contextObj.commonreportservice.getEquipmentColumn(contextObj.equipmentCategoryId).subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData.Data.FieldBinderList[0];
            contextObj.ddlEquipmentType = resultData.Data.FieldBinderList[1];
            var updatedData = new Array();
            resultData["Data"]["FieldBinderList"].splice(0, 2);
            updatedData = updatedData.concat(resultData["Data"]["FieldBinderList"]);
            contextObj.fieldObject = updatedData;
            if (resultData.Data.FieldBinderList[0].LookupDetails.LookupValues != null) {
                if (resultData.Data.FieldBinderList[0].LookupDetails.LookupValues.length == 0) {
                    contextObj.notificationService.ShowToaster("No Equipment Catogories exist", 2);
                }
            }
        });
        this.alignContent = "horizontal";
    };
    WorkHistorySearchReportComponent.prototype.onChangeEquipmentCategory = function (event) {
        this.equipmentCategoryId = event;
        this.ddlEquipmentType.FieldValue = "-1";
        var contextObj = this;
        contextObj.commonreportservice.getEquipmentColumn(contextObj.equipmentCategoryId).subscribe(function (resultData) {
            var updatedData = new Array();
            resultData["Data"]["FieldBinderList"].splice(0, 2);
            updatedData = updatedData.concat(resultData["Data"]["FieldBinderList"]);
            contextObj.fieldObject = updatedData;
        });
        if (event == -1) {
            contextObj.ddlEquipmentType.LookupDetails.LookupValues = [];
            contextObj.ddlEquipmentType.FieldValue = "-1";
        }
        contextObj.commonreportservice.getEquipmentType(contextObj.equipmentCategoryId, 1535).subscribe(function (resultData) {
            if (resultData.Data.LookupValues.length != 0) {
                contextObj.ddlEquipmentType.LookupDetails.LookupValues = resultData.Data["LookupValues"];
            }
            else {
                if (event != -1) {
                    contextObj.ddlEquipmentType.LookupDetails.LookupValues = [];
                    contextObj.ddlEquipmentType.FieldValue = "-1";
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                }
            }
        });
        contextObj.itemsSource = [];
    };
    WorkHistorySearchReportComponent.prototype.onChangeEquipmentType = function (event) {
        this.equipmentClassId = event;
        this.PageLOad();
    };
    WorkHistorySearchReportComponent.prototype.onSubMenuChange = function (event) {
        this.isNextClicked = false;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            return;
        }
        else {
            event = this.inputItems.selectedIds;
            var newselectedIds = '';
            for (var count = 0; count < event.length; count++) {
                newselectedIds = newselectedIds + event[count] + ',';
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds = newselectedIds;
            var contexObj = this;
            setTimeout(function () {
                contexObj.isNextClicked = true;
            }, 50);
            setTimeout(function () {
                contexObj.selectedTab = 1;
            }, 100);
        }
    };
    WorkHistorySearchReportComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    WorkHistorySearchReportComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.PageLOad();
    };
    ;
    WorkHistorySearchReportComponent.prototype.PageLOad = function () {
        var contextObj = this;
        contextObj.commonreportservice.getGridData(contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            if (resultData["Data"].FieldBinderData != "[]") {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                if (contextObj.equipmentClassId != -1) {
                    contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                }
            }
        });
    };
    WorkHistorySearchReportComponent = __decorate([
        core_1.Component({
            selector: 'workhistory-selector',
            templateUrl: './app/Views/Reports/WorkOrder/EquipmentWorkHistory/wo.workhistory.search.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [dropdownlistcomponent_component_1.DropDownListComponent, grid_component_1.GridComponent, wo_workhistory_report_component_1.WOWorkHistoryReportComponent, paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WorkHistorySearchReportComponent);
    return WorkHistorySearchReportComponent;
}());
exports.WorkHistorySearchReportComponent = WorkHistorySearchReportComponent;
//# sourceMappingURL=wo.workhistory.search.js.map