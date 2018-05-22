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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var ClientAddEditComponent = (function () {
    function ClientAddEditComponent(realpropertyservice, _notificationService, administrationService) {
        this.realpropertyservice = realpropertyservice;
        this._notificationService = _notificationService;
        this.administrationService = administrationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.moduleId = "";
    }
    ClientAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ClientAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var tempData = JSON.parse(strsubmitField);
        tempData.find(function (el) {
            if (el.ReportFieldId == 8350 && el.Value == "-1")
                el.Value = null;
        });
        tempData.push({
            ReportFieldId: 271,
            Value: this.moduleId
        });
        contextObj.administrationService.AddUpdateClient(JSON.stringify(tempData), this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Client details added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Client details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Client already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -5) {
                        contextObj._notificationService.ShowToaster("Email Domain not added in iDrawings", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ClientAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClientAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ClientAddEditComponent.prototype, "submitSuccess", void 0);
    ClientAddEditComponent = __decorate([
        core_1.Component({
            selector: 'client-add-edit',
            templateUrl: 'app/Views/Administration/General Settings/client-addedit-component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, administration_service_1.AdministrationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'moduleId'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], ClientAddEditComponent);
    return ClientAddEditComponent;
}());
exports.ClientAddEditComponent = ClientAddEditComponent;
//# sourceMappingURL=client-addedit-component.js.map