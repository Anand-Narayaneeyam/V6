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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var ModuleAdminSettingsComponent = (function () {
    function ModuleAdminSettingsComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.defaultChkbxIsChecked = true;
    }
    ModuleAdminSettingsComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        debugger;
        contextObj.administrationService.getModuleAdminSettings(contextObj.selectedIds).subscribe(function (resultData) {
            contextObj.modulesList = resultData["Data"];
        });
        //this.administrationService.getUserDrawingAccessModuleddl(contextObj.selectedIds).subscribe(function (rst) {
        //    var remModlArray = [2, 4, 13, 30, 9, 29];
        //    debugger
        //    //rst["Data"][0].LookupDetails.LookupValues  = rst["Data"][0].LookupDetails.LookupValues.filter(function (item) { return (item.IsChecked == 1 && remModlArray.indexOf(item.Id) == -1) });
        //    contextObj.modulesList = rst["Data"]; //module ddl
        //    rst["Data"][0].LookupDetails.LookupValues.find(function (item) {
        //        if (item.Id == 1 && item.IsChecked == 1) {
        //            item.Value = "As Builts";
        //            return true;
        //        } else
        //            return false;
        //    });
        //    rst["Data"][0].FieldValue = rst["Data"][0].FieldValue == null ? -1 : rst["Data"][0].FieldValue;
        //    console.log("module",contextObj.modulesList[0]);
        //});
    };
    ModuleAdminSettingsComponent.prototype.updateModuleAdminSettings = function () {
        var contextObj = this;
        var count = 0;
        var updateArray = [];
        debugger;
        var i = 0;
        contextObj.modulesList[0].LookupDetails.LookupValues.filter(function (item) {
            var checked = false;
            for (i = 0; i < contextObj.modulesList[0].MultiFieldValues.length; i++) {
                if (item.Id.toString() == contextObj.modulesList[0].MultiFieldValues[i]) {
                    updateArray.push({
                        ModuleId: item.Id,
                        IsCkecked: 1,
                        UserId: contextObj.selectedIds[0]
                    });
                    checked = true;
                }
            }
            if (checked == false) {
                updateArray.push({
                    ModuleId: item.Id,
                    IsCkecked: 0,
                    UserId: contextObj.selectedIds[0]
                });
            }
            count++;
            if (count == contextObj.modulesList[0].LookupDetails.LookupValues.length)
                return true;
            else
                return false;
        });
        this.administrationService.updateModuleAdminSettings(contextObj.selectedIds, updateArray).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Module Administrator Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Action Failure", 5);
        });
    };
    ModuleAdminSettingsComponent.prototype.SelectAllOnClick = function (event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    };
    ModuleAdminSettingsComponent.prototype.getDefaultChkBoxChecked = function (array) {
        var isDefaultLayer;
        //var nNumLayers = 4;
        //if (this.isSpace)
        //    nNumLayers = 4;
        //else
        //    nNumLayers = 2;
        //if (array.length > nNumLayers) {
        //    this.defaultChkbxIsChecked = false;
        //    return;
        //}
        //for (var i = 0; i < nNumLayers; i++) {
        //    isDefaultLayer = array.some(function (el) { return el == i });
        //    if (isDefaultLayer != true) {
        //        this.defaultChkbxIsChecked = false;
        //        break;
        //    }
        //    if (isDefaultLayer)
        //        this.defaultChkbxIsChecked = true;
        //}
    };
    ModuleAdminSettingsComponent.prototype.singleOnClick = function (event) {
        // //debugger
        var isDefaultLayer;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    };
    ModuleAdminSettingsComponent.prototype.selectAll = function (event, fieldObj) {
        var contextObj = this;
        if (event.target.checked == true) {
            //    this.layerList[0].MultiFieldValues.splice(0, this.layerList[0].MultiFieldValues.length);
            this.IsSelectAllChecked = false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ModuleAdminSettingsComponent.prototype, "selectedIds", void 0);
    ModuleAdminSettingsComponent = __decorate([
        core_1.Component({
            selector: 'module-admin-settings',
            templateUrl: './app/Views/Administration/Users/moduleadminsettings.component.html',
            directives: [notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], ModuleAdminSettingsComponent);
    return ModuleAdminSettingsComponent;
}());
exports.ModuleAdminSettingsComponent = ModuleAdminSettingsComponent;
//# sourceMappingURL=moduleadminsettings.component.js.map