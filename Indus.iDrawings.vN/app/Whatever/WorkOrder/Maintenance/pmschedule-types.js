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
var http_1 = require('@angular/http');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var pmschedules_list_component_1 = require('./pmschedules-list.component');
var PMScheduleTypesComponent = (function () {
    //equipmentClassName: any;
    //equipmentCategoryName: any;
    //equipmentClassIdfor: any;
    //pmId: any;
    function PMScheduleTypesComponent(workOrdereService, AdministrationService, notificationService) {
        this.workOrdereService = workOrdereService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.pmSchedulesTab = false;
        this.pmProcedureTab = false;
        this.selectedTab = 0;
        //isSiteAdmin: boolean = false;
        this.isSubscribed = false;
    }
    PMScheduleTypesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.btnName = "Next";
        //this.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
        //    contextObj.isSiteAdmin = result == 1 ? true : false;
        //    contextObj.loadDynamicFieldDetails();
        //});
        contextObj.AdministrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
            contextObj.loadDynamicFieldDetails();
        });
    };
    PMScheduleTypesComponent.prototype.loadDynamicFieldDetails = function () {
        var contextObj = this;
        this.workOrdereService.pmScheduleTypesFields().subscribe(function (resultData) {
            contextObj.fieldDetailsPMScheduleTypes = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetailsPMScheduleTypes.length; i++) {
                if (contextObj.fieldDetailsPMScheduleTypes[i].FieldId == 1321) {
                    if (contextObj.isSubscribed)
                        contextObj.fieldDetailsPMScheduleTypes[i]["IsMandatory"] = true;
                }
                else if (contextObj.fieldDetailsPMScheduleTypes[i].FieldId == 1325) {
                    contextObj.fieldDetailsPMScheduleTypes[i]["FieldLabel"] = "";
                    contextObj.fieldDetailsPMScheduleTypes[i]["FieldValue"] = "1";
                }
            }
            this.scheduleTypes = contextObj.fieldDetailsPMScheduleTypes.find(function (el) { return el.ReportFieldId === 5570; });
            if (this.scheduleTypes.FieldValue == "1") {
                contextObj.isGeneral = true;
            }
        });
    };
    PMScheduleTypesComponent.prototype.loadTabContent = function () {
        var contextObj = this;
        this.localselection = 1;
        contextObj.pmSchedulesTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    };
    PMScheduleTypesComponent.prototype.onNextClick = function (event) {
        if (this.isRoutes == true && (this.routeId == -1 || this.routeId == undefined)) {
            this.notificationService.ShowToaster("Select a Route", 2);
        }
        else {
            this.loadTabContent();
        }
    };
    PMScheduleTypesComponent.prototype.getSelectedTab = function (event) {
        switch (event[0]) {
            case 0:
                this.siteId = -1;
                this.equipmentCategoryId = -1;
                this.equipmentClassId = -1;
                this.routeId = -1;
                this.pmSchedulesTab = false;
                this.isGeneral = true;
                this.isRoutes = false;
                this.loadDynamicFieldDetails();
                break;
        }
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    PMScheduleTypesComponent.prototype.onTabClose = function (event) {
        switch (event[0]) {
            case 0:
                this.pmSchedulesTab = false;
                this.equipmentCategoryId = -1;
                this.equipmentClassId = -1;
                this.routeId = -1;
                this.isGeneral = true;
                this.isRoutes = false;
                this.loadDynamicFieldDetails();
                break;
            case 1:
                this.pmProcedureTab = false;
                break;
        }
        this.selectedTab = event[0];
    };
    PMScheduleTypesComponent.prototype.scheduleTypesChange = function (event) {
        var contextObj = this;
        var equipmentCategory = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1322;
        });
        var equipmentClass = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1323;
        });
        var route = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1324;
        });
        if (event["rbtnObject"]["fieldobject"]["FieldValue"] == "1") {
            this.isGeneral = true;
            equipmentCategory.IsEnabled = true;
            equipmentCategory.IsVisible = true;
            equipmentClass.IsEnabled = false;
            equipmentClass.IsVisible = true;
            route.IsEnabled = false;
            route.IsVisible = true;
            route.FieldValue = "-1";
            this.isRoutes = false;
        }
        else if (event["rbtnObject"]["fieldobject"]["FieldValue"] == "2") {
            this.isRoutes = true;
            equipmentCategory.IsEnabled = false;
            equipmentCategory.IsVisible = true;
            equipmentCategory.FieldValue = "-1";
            equipmentClass.IsEnabled = false;
            equipmentClass.IsVisible = true;
            equipmentClass.FieldValue = "-1";
            route.IsEnabled = true;
            route.IsVisible = true;
            this.isGeneral = false;
        }
    };
    PMScheduleTypesComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var lookUpDetails = event["ddlRelationShipEvent"]["ChildFieldObject"]["LookupDetails"]["LookupValues"];
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var ddlEquipmentCategory = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1322;
        });
        var ddlEquipmentClass = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1323;
        });
        if (this.isGeneral == true) {
            if (fieldLabel == "Site") {
                this.siteId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var siteFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                for (var i = 0; i < lookUpDetails.length; i++) {
                    var id = lookUpDetails[i].Id;
                    if (id == this.siteId) {
                        this.siteName = lookUpDetails[i].Value;
                        break;
                    }
                }
                if (this.siteId > -1 && siteFieldId == 1321) {
                    this.workOrdereService.loadEquipmentCategory(this.siteId, siteFieldId).subscribe(function (resultData) {
                        if (resultData["Data"] != null && resultData["Data"]["LookupValues"] != "") {
                            ddlEquipmentCategory.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        }
                    });
                }
                else {
                    ddlEquipmentCategory.FieldValue = "-1";
                    ddlEquipmentClass.IsEnabled = false;
                    ddlEquipmentClass.IsVisible = true;
                    ddlEquipmentClass.FieldValue = "-1";
                }
            }
            else if (fieldLabel == "Equipment Category") {
                this.equipmentCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentCategoryFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                if (this.equipmentCategoryId > -1 && equipmentCategoryFieldId == 1322) {
                    ddlEquipmentClass.IsEnabled = true;
                    ddlEquipmentClass.IsVisible = true;
                    this.workOrdereService.loadEquipmentClass(this.siteId, equipmentCategoryFieldId, this.equipmentCategoryId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            ddlEquipmentClass.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        }
                    });
                }
                else {
                    ddlEquipmentClass.IsEnabled = false;
                    ddlEquipmentClass.IsVisible = true;
                    ddlEquipmentClass.FieldValue = "-1";
                }
            }
            else if (fieldLabel == "Equipment Class") {
                this.equipmentClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            }
        }
        else if (this.isRoutes == true) {
            this.routeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            for (var i = 0; i < lookUpDetails.length; i++) {
                var id = lookUpDetails[i].Id;
                if (id == this.routeId) {
                    this.routeName = lookUpDetails[i].Value;
                    break;
                }
            }
        }
    };
    PMScheduleTypesComponent = __decorate([
        core_1.Component({
            selector: 'pmschedule-types',
            templateUrl: './app/Views/WorkOrder/Maintenance/pmschedule-types.html',
            directives: [notify_component_1.Notification, fieldGeneration_component_1.FieldComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, pmschedules_list_component_1.PMSchedulesListComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], PMScheduleTypesComponent);
    return PMScheduleTypesComponent;
}());
exports.PMScheduleTypesComponent = PMScheduleTypesComponent;
//# sourceMappingURL=pmschedule-types.js.map