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
var UserModulesAccessComponent = (function () {
    function UserModulesAccessComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.isModuleAccess = new core_1.EventEmitter();
    }
    UserModulesAccessComponent.prototype.ngAfterViewInit = function () {
        this.loadMOduleAccess();
    };
    UserModulesAccessComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["selectedIds"] && changes["selectedIds"]["currentValue"][0] && changes["selectedIds"]["currentValue"][0] != changes["selectedIds"]["previousValue"][0])
            this.loadMOduleAccess();
    };
    UserModulesAccessComponent.prototype.loadMOduleAccess = function () {
        if (this.selectedIds != undefined) {
            var contextObj = this;
            this.administrationService.getUserModuleAccess(contextObj.selectedIds).subscribe(function (result) {
                contextObj.accessModulesList = result["Data"];
                var isModuleAccess = false;
                var lookupdetLgth = result["Data"][0].LookupDetails.LookupValues.length;
                result["Data"][0].LookupDetails.LookupValues.find(function (item) {
                    lookupdetLgth--;
                    if (item.IsChecked == 1)
                        isModuleAccess = true;
                    if (item.Id == "1")
                        item.Value = "As Builts";
                    if (lookupdetLgth < 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                contextObj.isModuleAccess.emit({ isModuleAccess: isModuleAccess });
            });
        }
    };
    UserModulesAccessComponent.prototype.onChangeCheckBx = function (event) {
        debugger;
        var context = this;
        var currentCheckId = event.chkevent.target.value;
        var checkedStatus = event.chkevent.target.checked;
        var selectedModuleIds = event.fieldObject.MultiFieldValues;
        if (checkedStatus) {
            var asBuiltmoduleIds = ["3", "5", "6", "7", "8", "10", "11", "12", "17", "18", "25", "26", "27", "24"];
            var spaceModIds = ["12", "5", "11", "10"];
            //if (this.userRoleId != 4) {
            //    asBuiltmoduleIds.push("14");
            //    spaceModIds.push("14");
            //}
            //Asbuilts 
            if (asBuiltmoduleIds.indexOf(currentCheckId) > -1) {
                if (selectedModuleIds.indexOf("1") == -1) {
                    event.chkevent.target.checked = false;
                    selectedModuleIds.pop();
                    context.notificationService.ShowToaster("Selection is possible only when As Builts module is allotted to user", 5);
                }
                else {
                    //space
                    if (spaceModIds.indexOf(currentCheckId) > -1) {
                        if (selectedModuleIds.indexOf("3") == -1) {
                            event.chkevent.target.checked = false;
                            selectedModuleIds.pop();
                            context.notificationService.ShowToaster("Selection is possible only when Space module is allotted to user", 5);
                        }
                    }
                }
            }
            else if (currentCheckId == "29") {
                if (selectedModuleIds.indexOf("9") == -1) {
                    event.chkevent.target.checked = false;
                    selectedModuleIds.pop();
                    context.notificationService.ShowToaster("Selection is possible only when Work Order module is allotted to user", 5);
                }
            }
        }
        else {
            var remArray = [];
            switch (currentCheckId) {
                case "1":
                    remArray = ["3", "5", "6", "7", "8", "10", "11", "12", "17", "18", "25", "26", "27"];
                    event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; });
                    break;
                case "3":
                    remArray = ["5", "12", "10", "11"];
                    event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; });
                    break;
                case "9":
                    remArray = ["29"];
                    event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; });
                    break;
            }
        }
    };
    UserModulesAccessComponent.prototype.updateModulesAccessData = function () {
        var contextObj = this;
        this.administrationService.updateUserModuleAccess(contextObj.selectedIds, contextObj.accessModulesList[0].MultiFieldValues).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var isModuleAccess = false;
                if (contextObj.accessModulesList[0].MultiFieldValues.length > 0) {
                    isModuleAccess = true;
                }
                contextObj.isModuleAccess.emit({ isModuleAccess: isModuleAccess });
                contextObj.notificationService.ShowToaster("Modules accessible to the selected User has been updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UserModulesAccessComponent.prototype, "selectedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserModulesAccessComponent.prototype, "userRoleId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserModulesAccessComponent.prototype, "isModuleAccess", void 0);
    UserModulesAccessComponent = __decorate([
        core_1.Component({
            selector: 'user-modules-access',
            templateUrl: './app/Views/Administration/Users/usermodulesaccess.component.html',
            directives: [notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], UserModulesAccessComponent);
    return UserModulesAccessComponent;
}());
exports.UserModulesAccessComponent = UserModulesAccessComponent;
//# sourceMappingURL=usermodulesaccess.component.js.map