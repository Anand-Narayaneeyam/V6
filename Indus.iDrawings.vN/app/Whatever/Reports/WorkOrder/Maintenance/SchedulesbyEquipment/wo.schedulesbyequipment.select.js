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
var common_service_1 = require('../../../../../Models/reports/common.service');
var notify_component_1 = require('../../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var wo_schedulesbyequipment_component_1 = require('./wo.schedulesbyequipment.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOSchedulesbyEquipmentReportSelect = (function () {
    function WOSchedulesbyEquipmentReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.ddlEquipmentCategory = undefined;
        this.ddlEquipmentClass = undefined;
        this.ddlEquipmentNo = undefined;
        this.EquipmentCategoryId = 0;
        this.EquipmentClassId = 0;
        this.EquipmentNoId = 0;
        this.EquipmentCategoryName = "";
        this.EquipmentClassName = "";
        this.EquipmentName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSchedulesbyEquipmentReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / General / Schedules by Equipment";
        var contextObj = this;
        this.commonreportservice.getFieldsforSchedulesbyEquipmentReport().subscribe(function (result) {
            contextObj.ddlEquipmentCategory = result.Data[0];
            contextObj.ddlEquipmentCategory.FieldValue = "-1";
            contextObj.ddlEquipmentClass = result.Data[1];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlEquipmentNo = result.Data[2];
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    };
    WOSchedulesbyEquipmentReportSelect.prototype.onChangeEquipmentCategory = function (event) {
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.EquipmentCategoryName = "";
        if (this.EquipmentCategoryId != -1) {
            var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentCategoryName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentClassLookupforCategorySchedulesbyEquipment(contextObj.EquipmentCategoryId, 1535).subscribe(function (result) {
            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        this.EquipmentClassId = -1;
        this.EquipmentNoId = -1;
    };
    WOSchedulesbyEquipmentReportSelect.prototype.onChangeEquipmentClass = function (event) {
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.EquipmentClassName = "";
        if (this.EquipmentClassId != -1) {
            var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentClassName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentLookupforClassSchedulesbyEquipment(contextObj.EquipmentClassId, 1536).subscribe(function (result) {
            contextObj.ddlEquipmentNo.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        if (this.EquipmentClassId == 0) {
            contextObj.ddlEquipmentNo.IsMandatory = false;
            this.EquipmentNoId = 0;
        }
        else {
            contextObj.ddlEquipmentNo.IsMandatory = true;
            this.EquipmentNoId = -1;
        }
    };
    WOSchedulesbyEquipmentReportSelect.prototype.onChangeEquipmentNo = function (event) {
        this.EquipmentNoId = event;
        if (this.EquipmentNoId != -1) {
            var lookUp = this.ddlEquipmentNo.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentName = lookUp.Value;
        }
    };
    WOSchedulesbyEquipmentReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.EquipmentCategoryId == undefined || this.EquipmentCategoryName == "" || this.EquipmentClassId == undefined || this.EquipmentClassName == "" || this.EquipmentNoId == -1) {
            this.isNextClicked = false;
        }
        else {
            this.isnext = 1;
            var contexObj = this;
            setTimeout(function () {
                contexObj.isNextClicked = true;
            }, 50);
            setTimeout(function () {
                contexObj.selectedTab = 1;
            }, 100);
        }
    };
    WOSchedulesbyEquipmentReportSelect.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.isnext != undefined) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isnext = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    WOSchedulesbyEquipmentReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-schedulesbyequipment-report',
            templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyEquipment/wo.schedulesbyequipment.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_schedulesbyequipment_component_1.WOSchedulesbyEquipmentReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSchedulesbyEquipmentReportSelect);
    return WOSchedulesbyEquipmentReportSelect;
}());
exports.WOSchedulesbyEquipmentReportSelect = WOSchedulesbyEquipmentReportSelect;
//# sourceMappingURL=wo.schedulesbyequipment.select.js.map