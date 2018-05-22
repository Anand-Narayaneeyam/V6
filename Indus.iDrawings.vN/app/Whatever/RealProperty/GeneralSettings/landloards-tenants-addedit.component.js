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
var LandlordsTenantsAddEditComponent = (function () {
    function LandlordsTenantsAddEditComponent(realpropertyservice, _notificationService) {
        this.realpropertyservice = realpropertyservice;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.categorytype = 0;
        this.categoryname = "Landlord ";
    }
    LandlordsTenantsAddEditComponent.prototype.ngOnInit = function () {
        if (this.categorytype == 1) {
            //For showing messages
            this.categoryname = "Landlord";
        }
        else {
            this.categoryname = "Tenant";
        }
    };
    LandlordsTenantsAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(this.updateclientcategory(event["fieldobject"]), 1);
                break;
            case "edit":
                this.postSubmit(this.updateclientcategory(event["fieldobject"]), 2);
                break;
        }
    };
    LandlordsTenantsAddEditComponent.prototype.updateclientcategory = function (fieldobject) {
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    };
    LandlordsTenantsAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        debugger;
        var contextObj = this;
        var tempData = JSON.parse(strsubmitField);
        tempData.push({
            ReportFieldId: 271,
            Value: 30
        });
        contextObj.realpropertyservice.AddUpdateClients(JSON.stringify(tempData), this.selectedId, target, this.categorytype).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname + " added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname + " details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: contextObj.updateFieldLabel(resultData["Data"].Data) });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname + " already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -5) {
                        contextObj._notificationService.ShowToaster("Email Domain not added in iDrawings", 5);
                    }
                    break;
            }
        });
    };
    LandlordsTenantsAddEditComponent.prototype.updateFieldLabel = function (fieldObject) {
        var obj = JSON.parse(fieldObject)[0];
        if (this.categorytype == 1) {
            obj['Landlord Name'] = obj.Name;
        }
        else {
            obj['Tenant Name'] = obj.Name;
        }
        delete (obj.Name);
        return JSON.stringify([obj]);
    };
    LandlordsTenantsAddEditComponent.prototype.findData = function (fieldObjectArray) {
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6140) {
                item.Value = contextObject.categorytype;
            }
        });
        return fieldObjectArray;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LandlordsTenantsAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], LandlordsTenantsAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LandlordsTenantsAddEditComponent.prototype, "submitSuccess", void 0);
    LandlordsTenantsAddEditComponent = __decorate([
        core_1.Component({
            selector: 'landloards-tenants-addedit',
            templateUrl: 'app/Views/RealProperty/GeneralSettings/landloards-tenants-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'categorytype'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], LandlordsTenantsAddEditComponent);
    return LandlordsTenantsAddEditComponent;
}());
exports.LandlordsTenantsAddEditComponent = LandlordsTenantsAddEditComponent;
//# sourceMappingURL=landloards-tenants-addedit.component.js.map