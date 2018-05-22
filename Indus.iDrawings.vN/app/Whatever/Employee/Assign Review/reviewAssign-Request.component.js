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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var ReviewAssignRequestComponent = (function () {
    function ReviewAssignRequestComponent(employeeService, notificationService, _validateService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.linkClick = new core_1.EventEmitter();
        this.submitClick = new core_1.EventEmitter();
        this.dataKey = "RequestId";
        this.workFlowActionPointId = 0;
        this.outComeId = 0;
        this.entityCategoryId = 11;
        this.outcomeTypeId = 0;
        this.allowSubmit = true;
        this.btnName = "Save";
        this.employeeDetailsinputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: '', sortCol: '' };
    }
    ReviewAssignRequestComponent.prototype.ngOnInit = function () {
    };
    ReviewAssignRequestComponent.prototype.ngAfterViewInit = function () {
    };
    ReviewAssignRequestComponent.prototype.onSubmitData = function (event) {
        debugger;
        if (this.allowSubmit) {
            var contextObj = this;
            var fieldObject = JSON.parse(event["fieldobject"]);
            fieldObject = JSON.stringify(contextObj.updateFieldObject(fieldObject));
            this.submitClick.emit({
                fieldObject: fieldObject,
                action: contextObj.action,
                employeeDetails: contextObj.getEmployeeDetails()
            });
            this.allowSubmit = false;
        }
    };
    ReviewAssignRequestComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        var contextObj = this;
        var actionPoint;
        var prvComments;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 12254:
                    actionPoint = item;
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
        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId; });
        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId; });
        var statusId = 0;
        if (contextObj.outcomeTypeId == 9)
            statusId = 17;
        else if (contextObj.outcomeTypeId == 14)
            statusId = 27;
        fieldObjectArray.push({
            ReportFieldId: 7457,
            Value: statusId
        }, {
            ReportFieldId: 5988,
            Value: selectedOutCome ? selectedOutCome.Value : ""
        }, {
            ReportFieldId: 5827,
            Value: contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"]
        }, {
            ReportFieldId: 6561,
            Value: contextObj.entityCategoryId
        }, {
            ReportFieldId: 5859,
            Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
        });
        return fieldObjectArray;
    };
    ReviewAssignRequestComponent.prototype.getEmployeeDetails = function () {
        var employeeDetails = [];
        if (this.outcomeTypeId == 14) {
            if (this.employeeitemsSource && this.employeeitemsSource.length > 0) {
                for (var _i = 0, _a = this.employeeitemsSource; _i < _a.length; _i++) {
                    var employee = _a[_i];
                    employeeDetails.push({
                        EmployeeId: employee["EmployeeId"],
                        TargetSpaceId: employee["TargetSpaceId"],
                        TargetDrawingId: employee["TargetDrawingId"],
                        TargetXPosition: employee["TargetXPosition"],
                        TargetYPosition: employee["TargetYPosition"],
                    });
                }
            }
        }
        return employeeDetails.length > 0 ? JSON.stringify(employeeDetails) : "";
    };
    ReviewAssignRequestComponent.prototype.onDropDownChange = function (event) {
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
    ReviewAssignRequestComponent.prototype.getActionPointUserLookupValues = function (workTypeId) {
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
    ReviewAssignRequestComponent.prototype.onLinkClick = function () {
        this.linkClick.emit(null);
    };
    ReviewAssignRequestComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ReviewAssignRequestComponent.prototype.onEmployeeDetailsSort = function () {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewAssignRequestComponent.prototype, "linkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewAssignRequestComponent.prototype, "submitClick", void 0);
    ReviewAssignRequestComponent = __decorate([
        core_1.Component({
            selector: 'review-AssignRequest',
            templateUrl: 'app/Views/Employee/Assign Review/reviewAssign-Request.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent],
            inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'outComeData', 'employeeitemsSource', 'employeeDetailsfieldObject'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], ReviewAssignRequestComponent);
    return ReviewAssignRequestComponent;
}());
exports.ReviewAssignRequestComponent = ReviewAssignRequestComponent;
//# sourceMappingURL=reviewAssign-Request.component.js.map