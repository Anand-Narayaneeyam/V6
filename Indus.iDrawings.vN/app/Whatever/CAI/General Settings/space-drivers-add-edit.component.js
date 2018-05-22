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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var space_service_1 = require('../../../Models/Space/space.service');
var General_1 = require('../../../Models/Common/General');
var SpaceDriversAddEdit = (function () {
    function SpaceDriversAddEdit(spaceService, _notificationService) {
        this.spaceService = spaceService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.isNamesNAN = true;
        this.submitSuccess = new core_1.EventEmitter();
    }
    SpaceDriversAddEdit.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    SpaceDriversAddEdit.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        contextObj.spaceService.AddEditSpaceDrivers(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("CAI Space Driver added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("CAI Space Driver updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("CAI Space Driver already exists", 5);
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
    ], SpaceDriversAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SpaceDriversAddEdit.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDriversAddEdit.prototype, "submitSuccess", void 0);
    SpaceDriversAddEdit = __decorate([
        core_1.Component({
            selector: 'space-drivers-addedit',
            templateUrl: './app/Views/CAI/General Settings/space-drivers-add-edit.component.html',
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService, http_1.HTTP_PROVIDERS, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService])
    ], SpaceDriversAddEdit);
    return SpaceDriversAddEdit;
}());
exports.SpaceDriversAddEdit = SpaceDriversAddEdit;
//# sourceMappingURL=space-drivers-add-edit.component.js.map