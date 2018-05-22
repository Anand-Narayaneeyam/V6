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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var RelationshipAddEdit = (function () {
    function RelationshipAddEdit(objService, _notificationService) {
        this.objService = objService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.validationArray = [];
        this.isNamesNAN = true;
        this.submitSuccess = new core_1.EventEmitter();
    }
    RelationshipAddEdit.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    RelationshipAddEdit.prototype.postSubmit = function (strsubmitField, target) {
        debugger;
        var contextObj = this;
        var strSubValidation = JSON.parse(strsubmitField);
        var findValue = "";
        var valStatus1 = false;
        var valStatus2 = false;
        if (strSubValidation.find(function (item) { return item.ReportFieldId == "4458"; })) {
            findValue = strSubValidation.find(function (item) { return item.ReportFieldId == "4458"; });
            var validationStatus = contextObj.textBoxValidation(findValue);
            if (validationStatus == false) {
                this._notificationService.ShowToaster("Enter a non numeric value for Relationship", 5);
                valStatus1 = false;
            }
            else {
                valStatus1 = true;
            }
        }
        if (strSubValidation.find(function (item) { return item.ReportFieldId == "4459"; })) {
            findValue = strSubValidation.find(function (item) { return item.ReportFieldId == "4459"; });
            var validationStatus = contextObj.textBoxValidation(findValue);
            if (validationStatus == false) {
                this._notificationService.ShowToaster("Enter a non numeric value for Reverse Relationship", 5);
                valStatus2 = false;
            }
            else {
                valStatus2 = true;
            }
        }
        if (valStatus1 == true && valStatus2 == true) {
            var tempObj = {
                ReportFieldId: 4456,
                Value: contextObj.objCategoryId
            };
            var arrayField = JSON.parse(strsubmitField);
            arrayField = arrayField.concat(tempObj);
            strsubmitField = JSON.stringify(arrayField);
            debugger;
            contextObj.objService.AddRelationships(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                debugger;
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Connection Relationship added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Connection Relationship updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Relationship already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Reverse Relationship already exists", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
    };
    RelationshipAddEdit.prototype.textBoxValidation = function (value) {
        debugger;
        if (!isNaN(Number(value.Value))) {
            this.isNamesNAN = false;
            return false;
        }
        else {
            this.isNamesNAN = true;
            return true;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RelationshipAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RelationshipAddEdit.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelationshipAddEdit.prototype, "submitSuccess", void 0);
    RelationshipAddEdit = __decorate([
        core_1.Component({
            selector: 'relationship-add-edit',
            templateUrl: './app/Views/Objects/Connectivity/relationship-add-edit.component.html',
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'objCategoryId'],
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService])
    ], RelationshipAddEdit);
    return RelationshipAddEdit;
}());
exports.RelationshipAddEdit = RelationshipAddEdit;
//# sourceMappingURL=relationship-add-edit.component.js.map