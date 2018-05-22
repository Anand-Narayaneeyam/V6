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
var AssignLocationComponent = (function () {
    function AssignLocationComponent(employeeService, notificationService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.drawingId = 0;
        this.submitSuccess = new core_1.EventEmitter();
    }
    AssignLocationComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "edit":
                this.postSubmitUpdateLocation(contextObj, event["fieldobject"]);
                break;
            case "assign":
                this.postSubmitAssignLocation(contextObj, event["fieldobject"]);
                break;
        }
    };
    //private expiryActivationDateChange(event) {
    //    debugger
    //    var dateChangeField = event["dateChangeObject"]["FieldObject"];
    //    var dateRequestedFieldObj = this.fieldDetailsAssign.filter(function (item) { return item.ReportFieldId == 897; })
    //    var dateToCompleteFieldObj = this.fieldDetailsAssign.filter(function (item) { return item.ReportFieldId == 898; })
    //    var dateRequested = new Date(dateRequestedFieldObj[0].FieldValue);
    //    var dateToComplete = new Date(dateToCompleteFieldObj[0].FieldValue);
    //    var selectedDate = new Date(dateChangeField["FieldValue"]);
    //    if (selectedDate < dateRequested) {
    //        this.setFormInvalid(889);
    //        this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
    //    }
    //    else if (selectedDate > dateToComplete) {
    //        this.setFormInvalid(889);
    //        this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
    //    }
    //}
    //private setFormInvalid(rptFieldId) {
    //    this.fieldDetailsAssign.find(function (item) {
    //        if (item.ReportFieldId == rptFieldId) {
    //            item.HasValidationError = true;
    //            return true;
    //        } else
    //            return false;
    //    });
    //}
    AssignLocationComponent.prototype.postSubmitAssignLocation = function (contextObj, pageDetails) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        var dateToPerform;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 884) {
                arr[i].Value = contextObj.selectedIds[0];
            }
            else if (arr[i].ReportFieldId == 889) {
                dateToPerform = new Date(arr[i].Value);
            }
            else if (arr[i].ReportFieldId == 523) {
                this.drawingId = arr[i].Value;
            }
        }
        for (var i = 1; i < contextObj.selectedIds.length; i++) {
            arr.push({ ReportFieldId: 884, Value: contextObj.selectedIds[i] });
        }
        arr.push({ ReportFieldId: 3059, Value: this.drawingId });
        if (dateToPerform != null && dateToPerform != "") {
            if (dateToPerform < new Date(this.dateRequested)) {
                this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
                return;
            }
            else if (dateToPerform > new Date(this.dateToComplete)) {
                this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
                return;
            }
        }
        this.employeeService.postSubmitAssignLocation(JSON.stringify(arr)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Move Details failed", 5);
                    contextObj.submitSuccess.emit({ status: "Failure", returnData: contextObj.success.Data });
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Move Details updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
            }
        });
    };
    AssignLocationComponent.prototype.postSubmitUpdateLocation = function (contextObj, pageDetails) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        this.drawingId = this.stackplanDetailsRowData["ScheduledDrawingId"];
        var dateToPerform;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 889) {
                dateToPerform = new Date(arr[i].Value);
            }
        }
        arr.push({ ReportFieldId: 3059, Value: this.drawingId });
        if (dateToPerform != null && dateToPerform != "") {
            if (dateToPerform < new Date(this.dateRequested)) {
                this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
                return;
            }
            else if (dateToPerform > new Date(this.dateToComplete)) {
                this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
                return;
            }
        }
        this.employeeService.postSubmitUpdateLocation(JSON.stringify(arr), contextObj.selectedIds[0]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Move Details failed", 5);
                    contextObj.submitSuccess.emit({ status: "Failure", returnData: contextObj.success.Data });
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Move Details updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
            }
        });
    };
    AssignLocationComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var fieldValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var fieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var arr = new Array();
        arr.push({ ReportFieldId: 5090, Value: "0" });
        if (fieldLabel == "Floor") {
            this.drawingId = fieldValue;
            arr.push({
                ReportFieldId: 3059,
                Value: fieldValue
            });
        }
        this.employeeService.loadAssignLocationLookups(fieldValue, fieldId, arr).subscribe(function (resultData) {
            var ddlbuildings = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 473; });
            var ddlfloors = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 523; });
            var ddlroomno = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 888; });
            if (resultData["Data"]) {
                if (resultData["Data"]["LookupValues"] != "") {
                    if (fieldLabel == "Site") {
                        ddlbuildings.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        ddlbuildings.FieldValue = "-1";
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                    }
                    else if (fieldLabel == "Building") {
                        ddlfloors.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                    }
                    else if (fieldLabel == "Floor") {
                        ddlroomno.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        ddlroomno.FieldValue = "-1";
                    }
                }
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AssignLocationComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignLocationComponent.prototype, "submitSuccess", void 0);
    AssignLocationComponent = __decorate([
        core_1.Component({
            selector: 'assign-location',
            templateUrl: 'app/Views/Employee/Tools/SpacePlanning/assign-location.html',
            directives: [fieldGeneration_component_1.FieldComponent],
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService],
            inputs: ['selectedIds', 'action', 'fieldDetailsAssign', 'btnName', 'stackplanDetailsRowData', 'dateRequested', 'dateToComplete']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], AssignLocationComponent);
    return AssignLocationComponent;
}());
exports.AssignLocationComponent = AssignLocationComponent;
//# sourceMappingURL=assign-location.js.map