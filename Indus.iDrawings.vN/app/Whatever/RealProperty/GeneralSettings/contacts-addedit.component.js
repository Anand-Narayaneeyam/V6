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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var ContactAddEditComponent = (function () {
    function ContactAddEditComponent(realpropertyservice, _notificationService) {
        this.realpropertyservice = realpropertyservice;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.moduleId = "";
    }
    ContactAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ContactAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var tempData = JSON.parse(strsubmitField);
        tempData.find(function (el) {
            if (el.ReportFieldId == 8352 && el.Value == "-1")
                el.Value = null;
        });
        tempData.push({
            ReportFieldId: 271,
            Value: this.moduleId
        });
        contextObj.realpropertyservice.AddUpdateContacts(JSON.stringify(tempData), this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Contact details added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Contact details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Contact already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Enter a Valid Email address", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContactAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ContactAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContactAddEditComponent.prototype, "submitSuccess", void 0);
    ContactAddEditComponent = __decorate([
        core_1.Component({
            selector: 'contacts-add-edit',
            templateUrl: 'app/Views/RealProperty/GeneralSettings/contacts-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'moduleId'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], ContactAddEditComponent);
    return ContactAddEditComponent;
}());
exports.ContactAddEditComponent = ContactAddEditComponent;
//# sourceMappingURL=contacts-addedit.component.js.map