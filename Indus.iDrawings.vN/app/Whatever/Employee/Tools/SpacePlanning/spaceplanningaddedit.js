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
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var SpacePlanningAddEditComponent = (function () {
    function SpacePlanningAddEditComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.submitSuccess = new core_1.EventEmitter();
        this.isSubmit = true;
    }
    SpacePlanningAddEditComponent.prototype.ngOnInit = function () {
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
    };
    SpacePlanningAddEditComponent.prototype.onSubmitData = function (event) {
        if (this.isSubmit == true) {
            var contextObj = this;
            if (this.addEdit == "add") {
                var temp = JSON.parse(event["fieldobject"]);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 899)
                        temp[i]["Value"] = "1";
                    else if (temp[i]["ReportFieldId"] == 5085)
                        temp[i]["Value"] = "1";
                    else if (temp[i]["ReportFieldId"] == 893)
                        temp[i]["Value"] = "0";
                }
                // event["fieldobject"] = JSON.stringify(temp);
                this.employeeService.submitAddSpacePlanningProject(JSON.stringify(temp)).subscribe(function (resultData) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Space Planning Project added", 3);
                        contextObj.submitSuccess.emit({ success: "success", returnData: resultData["Data"].Data });
                    }
                    else if (contextObj.success["StatusId"] == 0) {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == 0) {
                            contextObj._notificationService.ShowToaster("Project Name already exists", 5);
                        }
                    }
                });
            }
            else if (this.addEdit == "edit") {
                var temp = JSON.parse(event["fieldobject"]);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 899)
                        temp[i]["Value"] = "1";
                    else if (temp[i]["ReportFieldId"] == 5085)
                        temp[i]["Value"] = "1";
                }
                // event["fieldobject"] = JSON.stringify(temp);
                this.employeeService.submitEditSpacePlanningProject(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Space Planning Project updated", 3);
                        contextObj.submitSuccess.emit({ success: "success", returnData: resultData["Data"].Data });
                    }
                    else if (contextObj.success["StatusId"] == 0) {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == 0) {
                            contextObj._notificationService.ShowToaster("Project Name already exists", 5);
                        }
                    }
                });
            }
        }
    };
    SpacePlanningAddEditComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            this.employeeService.loadSpacePlanningAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId === 759) {
                        item.IsVisible = false;
                        return true;
                    }
                    else
                        return false;
                });
                contextObj.fieldDetailsSpacePlanning = resultData["Data"];
                //status.IsVisible = false;
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            this.employeeService.loadSpacePlanningAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId === 759) {
                        item.IsVisible = false;
                        return true;
                    }
                    else
                        return false;
                });
                contextObj.fieldDetailsSpacePlanning = resultData["Data"];
            });
        }
    };
    SpacePlanningAddEditComponent.prototype.requestedDateChange = function (event) {
        //757 -- Date Requested
        //758 --- Date to complete
        var dateChangeField = event["dateChangeObject"].FieldObject;
        var reqDateFieldObj = this.fieldDetailsSpacePlanning.filter(function (item) { return item.FieldId === 757; });
        var completeDateFieldObj = this.fieldDetailsSpacePlanning.filter(function (item) { return item.FieldId === 758; });
        var reqDate = new Date(reqDateFieldObj[0].FieldValue);
        var completeDate = new Date(completeDateFieldObj[0].FieldValue);
        var selectedDate = new Date(dateChangeField["FieldValue"]);
        if ((dateChangeField["FieldId"] == 757) && (selectedDate > new Date())) {
            this.setFormInvalid([757], true);
            this._notificationService.ShowToaster("'Date Requested' cannot be a future date", 5);
        }
        else if ((selectedDate < reqDate || reqDate > new Date()) && (dateChangeField["FieldId"] == 758) && reqDate > new Date()) {
            this.setFormInvalid([758], true);
            if (reqDate > new Date())
                this._notificationService.ShowToaster("'Date Requested' cannot be a future date", 5);
            else
                this._notificationService.ShowToaster("'Date to Complete' should be on or after 'Date Requested'", 5);
        }
        else
            this.setFormInvalid([758, 757], false);
    };
    SpacePlanningAddEditComponent.prototype.setFormInvalid = function (fieldId, errorStatus) {
        var count = fieldId.length;
        this.isSubmit = !errorStatus;
        this.fieldDetailsSpacePlanning.find(function (item) {
            if (fieldId.indexOf(item.FieldId) > -1) {
                item.HasValidationError = errorStatus;
                item.IsLocallyValidated = errorStatus;
                count--;
            }
            if (count == 0)
                return true;
            else
                return false;
        });
    };
    SpacePlanningAddEditComponent.prototype.checkDateFieldValidation = function (fielddObj) {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpacePlanningAddEditComponent.prototype, "submitSuccess", void 0);
    SpacePlanningAddEditComponent = __decorate([
        core_1.Component({
            selector: 'spacePlanning-addedit',
            templateUrl: 'app/Views/Employee/Tools/SpacePlanning/spacePlanningAddEdit.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['addEdit', 'selectedId']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], SpacePlanningAddEditComponent);
    return SpacePlanningAddEditComponent;
}());
exports.SpacePlanningAddEditComponent = SpacePlanningAddEditComponent;
//# sourceMappingURL=spaceplanningaddedit.js.map