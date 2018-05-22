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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var ReviewMoveExecutionComponent = (function () {
    function ReviewMoveExecutionComponent(employeeService, notificationService, _validateService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.linkClick = new core_1.EventEmitter();
        this.submitClick = new core_1.EventEmitter();
        this.dataKey = "RequestId";
        this.workFlowActionPointId = 0;
        this.outComeId = 0;
        this.entityCategoryId = 20;
        this.outcomeTypeId = 0;
        this.allowSubmit = true;
        this.btnName = "Save";
    }
    ReviewMoveExecutionComponent.prototype.ngOnInit = function () {
    };
    ReviewMoveExecutionComponent.prototype.ngAfterViewInit = function () {
    };
    ReviewMoveExecutionComponent.prototype.onSubmitData = function (event) {
        debugger;
        if (this.allowSubmit) {
            var contextObj = this;
            var fieldObject = JSON.parse(event["fieldobject"]);
            if (!contextObj.isTimeSpentValid()) {
                return;
            }
            fieldObject = JSON.stringify(contextObj.updateFieldObject(fieldObject));
            this.submitClick.emit({
                fieldObject: fieldObject,
                action: contextObj.action,
            });
            this.allowSubmit = false;
        }
    };
    ReviewMoveExecutionComponent.prototype.isTimeSpentValid = function () {
        var timeSpentField = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 7521;
        });
        if (timeSpentField.IsVisible && parseFloat(timeSpentField.FieldValue) <= 0.00) {
            this.notificationService.ShowToaster('Time spent (Hours) must be greater than zero', 2);
            return false;
        }
        return true;
    };
    ReviewMoveExecutionComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        var contextObj = this;
        var actionPoint;
        var prvComments;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 12254:
                    actionPoint = item;
                    break;
                case 6561:
                    item.Value = contextObj.entityCategoryId;
                    break;
                case 1478:
                    prvComments = item;
                    break;
            }
        });
        /******** deletes the action point and previous comments item*********/
        var index = fieldObjectArray.indexOf(actionPoint);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        index = fieldObjectArray.indexOf(prvComments);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        /***********************************************************************/
        var actionPointField = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {
            for (var _i = 0, _a = actionPointField.MultiFieldValues; _i < _a.length; _i++) {
                var item = _a[_i];
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }
        var statusId = 0;
        if (contextObj.outcomeTypeId == 16)
            statusId = 28;
        else if (contextObj.outcomeTypeId == 30)
            statusId = 29;
        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId; });
        fieldObjectArray.push({
            ReportFieldId: 12291,
            Value: statusId
        }, {
            ReportFieldId: 12258,
            Value: contextObj.outcomeTypeId
        }, {
            ReportFieldId: 5988,
            Value: selectedOutCome ? selectedOutCome.Value : ""
        }, {
            ReportFieldId: 5827,
            Value: contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"]
        });
        return fieldObjectArray;
    };
    ReviewMoveExecutionComponent.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        switch (event.FieldId) {
            case 1255:
                var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1488;
                });
                var reviewComments = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 5978;
                });
                if (event.FieldValue == "-1") {
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    actionUser.HasValidationError = false;
                    contextObj.initiateValidation(actionUser);
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                    contextObj.outcomeTypeId = 0;
                    reviewComments.FieldValue = "";
                    contextObj.initiateValidation(reviewComments);
                    return;
                }
                var workType = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1870;
                });
                contextObj.outComeId = parseInt(event.FieldValue);
                contextObj.getActionPointUserLookupValues(workType.FieldValue);
                var outComeDetails = contextObj.outComeData.find(function (item) {
                    return item.Id === parseInt(event.FieldValue);
                });
                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                break;
        }
    };
    ReviewMoveExecutionComponent.prototype.getActionPointUserLookupValues = function (workTypeId) {
        var contextObj = this;
        contextObj.employeeService.getActionPointUserLookupValues(contextObj.outComeId, parseInt(workTypeId), 5, contextObj.entityCategoryId).subscribe(function (resultData) {
            var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                return item.FieldId === 1488;
            });
            if (resultData["FieldBinderData"] != "[]") {
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
                actionUser.FieldLabel = "Next Action Point User(s)";
            }
            else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                contextObj.initiateValidation(actionUser);
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    };
    ReviewMoveExecutionComponent.prototype.onLinkClick = function () {
        this.linkClick.emit(null);
    };
    ReviewMoveExecutionComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewMoveExecutionComponent.prototype, "linkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewMoveExecutionComponent.prototype, "submitClick", void 0);
    ReviewMoveExecutionComponent = __decorate([
        core_1.Component({
            selector: 'review-MoveExecution',
            templateUrl: 'app/Views/Employee/Move Execution Requests/reviewMoveExecution-Request.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent],
            inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'outComeData', 'employeeData'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], ReviewMoveExecutionComponent);
    return ReviewMoveExecutionComponent;
}());
exports.ReviewMoveExecutionComponent = ReviewMoveExecutionComponent;
//# sourceMappingURL=reviewMoveExecution-Request.component.js.map