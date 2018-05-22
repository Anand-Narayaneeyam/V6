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
var wo_proceduresandsteps_component_1 = require('./wo.proceduresandsteps.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOProcedureStepsReportSelect = (function () {
    function WOProcedureStepsReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.ddlEquipmentCategory = undefined;
        this.ddlEquipmentClass = undefined;
        this.ddlProcedure = undefined;
        this.EquipmentCategoryId = 0;
        this.EquipmentClassId = 0;
        this.ProcedureId = 0;
        this.EquipmentCategoryName = "";
        this.EquipmentClassName = "";
        this.ProcedureName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOProcedureStepsReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / General / Procedures and Steps";
        var contextObj = this;
        this.commonreportservice.getFieldsforProceduresandStepsReport().subscribe(function (result) {
            contextObj.ddlEquipmentCategory = result.Data[0];
            contextObj.ddlEquipmentCategory.FieldValue = "-1";
            contextObj.ddlEquipmentClass = result.Data[1];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlProcedure = result.Data[2];
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    };
    WOProcedureStepsReportSelect.prototype.onChangeEquipmentCategory = function (event) {
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlProcedure.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.EquipmentCategoryName = "";
        if (this.EquipmentCategoryId != -1) {
            var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentCategoryName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentClassLookupforCategory(contextObj.EquipmentCategoryId, 1535).subscribe(function (result) {
            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        this.EquipmentClassId = -1;
        this.ProcedureId = -1;
    };
    WOProcedureStepsReportSelect.prototype.onChangeEquipmentClass = function (event) {
        this.ddlProcedure.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.EquipmentClassName = "";
        if (this.EquipmentClassId != -1) {
            var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentClassName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadProcedureLookupforClassorCategory(contextObj.EquipmentClassId, contextObj.EquipmentCategoryId, 1536).subscribe(function (result) {
            contextObj.ddlProcedure.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        this.ProcedureId = -1;
    };
    WOProcedureStepsReportSelect.prototype.onChangeProcedure = function (event) {
        this.ProcedureId = event;
        if (this.ProcedureId != -1) {
            var lookUp = this.ddlProcedure.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.ProcedureName = lookUp.Value;
        }
    };
    WOProcedureStepsReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.EquipmentCategoryId == undefined || this.EquipmentCategoryName == "" || this.EquipmentClassId == undefined || this.EquipmentClassName == "" || this.ProcedureId == -1 || this.ProcedureName == "") {
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
    WOProcedureStepsReportSelect.prototype.getSelectedTab = function (event) {
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
    WOProcedureStepsReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-proceduresandsteps-report',
            templateUrl: './app/Views/Reports/WorkOrder/Maintenance/ProceduresandSteps/wo.proceduresandsteps.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_proceduresandsteps_component_1.WOProcedureStepsReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOProcedureStepsReportSelect);
    return WOProcedureStepsReportSelect;
}());
exports.WOProcedureStepsReportSelect = WOProcedureStepsReportSelect;
//# sourceMappingURL=wo.proceduresandsteps.select.js.map