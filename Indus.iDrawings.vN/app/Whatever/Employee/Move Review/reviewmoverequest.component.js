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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var reviewempmoveresourcelist_component_1 = require('./reviewempmoveresourcelist.component');
var employeeworkflowhistory_component_1 = require('./employeeworkflowhistory.component');
var ReviewMoveRequestComponent = (function () {
    function ReviewMoveRequestComponent(employeeService, notificationService, _validateService, genFun) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.genFun = genFun;
        this.linkClick = new core_1.EventEmitter();
        this.submitClick = new core_1.EventEmitter();
        this.tabclose = new core_1.EventEmitter();
        this.dataKey = "MoveId";
        this.workFlowActionPointId = 0;
        this.outComeId = 0;
        this.entityCategoryId = 9;
        this.outcomeTypeId = 0;
        this.allowSubmit = true;
        this.btnName = "Save";
        this.employeeDetailsinputItems = { dataKey: "EmployeeId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: '', sortCol: '' };
        this.showSlide = false;
        this.slidewidth = 250;
        this.slideMsg = "";
        this.pageTitle = "";
        this.secondaryViewTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    }
    ReviewMoveRequestComponent.prototype.ngOnInit = function () {
    };
    ReviewMoveRequestComponent.prototype.ngAfterViewInit = function () {
    };
    ReviewMoveRequestComponent.prototype.onSubmitData = function (event) {
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
    ReviewMoveRequestComponent.prototype.updateFieldObject = function (fieldObjectArray) {
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
        debugger;
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
    ReviewMoveRequestComponent.prototype.getEmployeeDetails = function () {
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
    ReviewMoveRequestComponent.prototype.onDropDownChange = function (event) {
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
                debugger;
                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                break;
        }
    };
    ReviewMoveRequestComponent.prototype.getActionPointUserLookupValues = function (workTypeId) {
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
    ReviewMoveRequestComponent.prototype.onLinkClick = function () {
        this.linkClick.emit(null);
    };
    ReviewMoveRequestComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ReviewMoveRequestComponent.prototype.onEmployeeDetailsSort = function () {
    };
    ReviewMoveRequestComponent.prototype.onHyperLinkClick = function (event) {
        var contextObj = this;
        var colName = event["colName"];
        var selRowdata = event["selRowData"];
        contextObj.secondaryViewTarget = 1;
        switch (colName) {
            case "Resource Count":
                if (event["selRowData"]["Resource Count"] == 0) {
                    contextObj.notificationService.ShowToaster("No Resources exist", 3);
                }
                else {
                    contextObj.pageTitle = "Resources";
                    contextObj.splitviewInput.showSecondaryView = true;
                }
                break;
            case "Delete Employee":
                if (contextObj.employeeitemsSource.length == 1) {
                    contextObj.slideMsg = "Removing the Employee will cancel the request. Are you sure you want to remove the selected Employee?";
                }
                else {
                    contextObj.slideMsg = "Are you sure you want to remove the selected Employee?";
                }
                contextObj.showSlide = true;
                break;
        }
    };
    ReviewMoveRequestComponent.prototype.YesSlideClick = function (value) {
        var context = this;
        context.employeeService.DeleteEmpMoveDetails(context.employeeDetailsinputItems.selectedIds[0], context.inputItems.rowData["MoveId"]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var retUpdatedSrc = context.genFun.updateDataSource(context.employeeitemsSource, "delete", '', context.employeeDetailsinputItems.selectedIds, context.employeeDetailsinputItems.dataKey, context.employeeitemsSource.length);
                context.employeeitemsSource = retUpdatedSrc["itemSrc"];
                if (retUpdatedSrc["itemCount"] == 0)
                    context.tabclose.emit({});
                context.showSlide = false;
                context.notificationService.ShowToaster("Employee removed", 3);
            }
        });
    };
    ReviewMoveRequestComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ReviewMoveRequestComponent.prototype.onHistoryBtnClick = function (event) {
        this.secondaryViewTarget = 2;
        this.pageTitle = "Request History";
        this.splitviewInput.showSecondaryView = true;
    };
    ReviewMoveRequestComponent.prototype.resoureDeleteEmit = function (event) {
        this.employeeDetailsinputItems.rowData["Resource Count"] = event["ResourceCount"];
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewMoveRequestComponent.prototype, "linkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewMoveRequestComponent.prototype, "submitClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewMoveRequestComponent.prototype, "tabclose", void 0);
    ReviewMoveRequestComponent = __decorate([
        core_1.Component({
            selector: 'review-MoveRequest',
            templateUrl: 'app/Views/Employee/Move Review/reviewMoveRequest.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, slide_component_1.SlideComponent, reviewempmoveresourcelist_component_1.ReviewEmpMoveResourceListComponent, employeeworkflowhistory_component_1.EmpWorkFlowHistory],
            inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'outComeData', 'employeeitemsSource', 'employeeDetailsfieldObject'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions])
    ], ReviewMoveRequestComponent);
    return ReviewMoveRequestComponent;
}());
exports.ReviewMoveRequestComponent = ReviewMoveRequestComponent;
//# sourceMappingURL=reviewmoverequest.component.js.map