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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var UserGroupAddEditComponent = (function () {
    function UserGroupAddEditComponent(administrationService, _notificationService) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    UserGroupAddEditComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
            if (result == 1) {
                var site = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8340;
                });
                site.IsMandatory = true;
            }
        });
    };
    UserGroupAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    UserGroupAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var fielddata = JSON.parse(strsubmitField);
        fielddata.push({
            ReportFieldId: 2831,
            Value: "0"
        });
        fielddata.push({
            ReportFieldId: 6235,
            Value: "1"
        });
        strsubmitField = JSON.stringify(fielddata);
        contextObj.administrationService.AddUpdateUserGroup(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("User Group added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("User Group updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("User Group already exists", 5);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserGroupAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UserGroupAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserGroupAddEditComponent.prototype, "submitSuccess", void 0);
    UserGroupAddEditComponent = __decorate([
        core_1.Component({
            selector: 'usergroup-add-edit',
            templateUrl: 'app/Views/Administration/User Groups/user-groups-add-edit.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], UserGroupAddEditComponent);
    return UserGroupAddEditComponent;
}());
exports.UserGroupAddEditComponent = UserGroupAddEditComponent;
//# sourceMappingURL=user-groups-add-edit.component.js.map