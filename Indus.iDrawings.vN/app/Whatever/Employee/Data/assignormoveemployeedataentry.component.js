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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var employeemoverequest_component_1 = require('../../employee/request/employeemoverequest.component');
var selectResourcesForEmployeeMove_1 = require('../../Employee/data/selectResourcesForEmployeeMove');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var AssignOrMoveEmpDataEntry = (function () {
    function AssignOrMoveEmpDataEntry(empsevices, notificationservice, _validateService) {
        this.empsevices = empsevices;
        this.notificationservice = notificationservice;
        this._validateService = _validateService;
        this.submitSuccess = new core_1.EventEmitter();
        this.formId = 607;
        this.btnName = "Assign";
        this.ApprovalForEmpMoveInDrawing = false;
        this.ApprovalForEmpAssignInDrawing = false;
        this.isResoureFeatureEnabled = false;
        this.position = "top-right";
        this.showSlide = false;
        this.showSlideResource = false;
        this.splitviewObj = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.pageTitle = "";
        this.SpaceDetailsForRequest = [];
        this.employeeMoveDataInputList = [];
        this.drawingId = 0;
        this.empDialogMessages = { "key": 0, "message": "" };
        this.selectedSpaceId = 0;
        this.showEmployeeMoveRequestFromAssign = false; // If this is false, then aproval process for Employee move , otherwise assign
        this.showSecondaryViewTarget = 0;
        this.isSubmitClicked = false;
        this.conflictCheckAssignOrMoveBeforeSubmit = function (resCallback) {
            var contextObj = this;
            var returnCode;
            var seatingCapacity;
            var returnData;
            var isSubmit = false;
            this.empsevices.checkSpaceEmployeeOccupancy(this.selectedSpaceId, this.selectedEmployeeData).subscribe(function (resultData) {
                returnData = JSON.parse(resultData["Data"].FieldBinderData)[0];
                seatingCapacity = returnData['SeatingCapacity'];
                returnCode = returnData['Return'];
                switch (returnCode) {
                    case -1:
                        contextObj.notificationServices.ShowToaster("You do not have access permission for this space.Select another Space", 5);
                        break;
                    case 3:
                        contextObj.empDialogMessages = { key: 4, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                        contextObj.showSlide = true;
                        break;
                    case 2:
                        contextObj.notificationservice.ShowToaster("Assignable Seating Capacity of the selected Space is zero. Employee(s) cannot be placed in this Space.Select another space", 5);
                        break;
                    case 4:
                        contextObj.empDialogMessages = { key: 5, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                        contextObj.showSlide = true;
                        break;
                    case 1:
                        isSubmit = true;
                        break;
                }
                resCallback(isSubmit);
            });
        };
        this.getDrawingDetails = function (resCallback) {
            var contextObj = this;
            this.empsevices.getDrawingDetails(this.drawingId, false).subscribe(function (resultData) {
                resCallback(resultData["Data"][0].SiteName + " / " + resultData["Data"][0].BuildingName + " / " + resultData["Data"][0].FloorName);
            });
        };
        var contetObj = this;
        this.empsevices.customerSubscribedFeatures("190,192,195").subscribe(function (customerSettingsData) {
            contetObj.ApprovalForEmpMoveInDrawing = customerSettingsData.Data[0]["IsSubscribed"];
            contetObj.ApprovalForEmpAssignInDrawing = customerSettingsData.Data[1]["IsSubscribed"];
            contetObj.isResoureFeatureEnabled = customerSettingsData.Data[2]["IsSubscribed"];
        });
    }
    AssignOrMoveEmpDataEntry.prototype.ngOnInit = function () {
        var contextObj = this;
        var fieldObj = new Array();
        fieldObj.push({ FieldId: 221, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 222, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 223, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 1569, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 1569, ReportFieldId: 3059, Value: "0" });
        this.empsevices.getAssignOrMoveEmpFields(this.formId, fieldObj).subscribe(function (resultData) {
            contextObj.fieldObject = resultData['Data'];
        });
        if (this.action == "Move Employee")
            this.btnName = "Move";
    };
    AssignOrMoveEmpDataEntry.prototype.onSubmitData = function (event) {
        var contextObj = this;
        contextObj.conflictCheckAssignOrMoveBeforeSubmit(function (isSubmit) {
            contextObj.isSubmitClicked = isSubmit;
            if (contextObj.isSubmitClicked)
                contextObj.submitAfterConflictCheck();
        });
    };
    AssignOrMoveEmpDataEntry.prototype.submitAfterConflictCheck = function () {
        if (this.action == "Assign Employee") {
            if (this.ApprovalForEmpAssignInDrawing) {
                this.empDialogMessages = { key: 1, message: "Do you want to assign employee(s) through the Approval Process?" };
                this.showSlide = true;
            }
            else {
                this.assignOrMoveSubmit();
            }
        }
        else if (this.action == "Move Employee") {
            if (this.isResoureFeatureEnabled) {
                this.checkResourceExists();
            }
            else {
                this.moveThroughApprovalOrNot();
            }
        }
    };
    AssignOrMoveEmpDataEntry.prototype.moveThroughApprovalOrNot = function () {
        if (this.ApprovalForEmpMoveInDrawing) {
            this.empDialogMessages = { key: 3, message: "Do you want to execute this move through the Approval Process?" };
            this.showSlide = true;
        }
        else {
            this.assignOrMoveSubmit();
        }
    };
    AssignOrMoveEmpDataEntry.prototype.checkResourceExists = function () {
        var contextObj = this;
        this.empsevices.checkResourceExistForEmployees(this.selectedEmployeeData).subscribe(function (isHasResource) {
            if (isHasResource) {
                contextObj.empDialogMessages = { key: 2, message: "Do you want to move the resources?" };
                contextObj.showSlideResource = true;
            }
            else {
                contextObj.moveThroughApprovalOrNot();
            }
        });
    };
    AssignOrMoveEmpDataEntry.prototype.assignOrMoveSubmit = function () {
        var contextObj = this;
        this.showSlide = false;
        this.moveMultipleEmployeeWithOutApproval(this.selectedEmployeeData, function (updatedEmpdata) {
            if (contextObj.action == "Assign Employee")
                contextObj.notificationservice.ShowToaster("Employee(s) assigned", 3);
            else {
                contextObj.resourceMove();
                contextObj.notificationservice.ShowToaster("Employee(s) Moved", 3);
            }
            contextObj.submitSuccess.emit(updatedEmpdata);
        });
    };
    AssignOrMoveEmpDataEntry.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var fieldValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var fieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        if (fieldId != 1569) {
            var ddlbuildings = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 473; });
            var ddlfloors = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 523; });
            var ddlroomno = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 888; });
            if (fieldValue != "-1") {
                var arr = new Array();
                arr.push({ ReportFieldId: 5090, Value: "0" });
                if (fieldLabel == "Floor") {
                    arr.push({
                        ReportFieldId: 3059,
                        Value: fieldValue
                    });
                }
                this.empsevices.loadAssignOrMoveEmpLookups(this.formId, fieldValue, fieldId, arr).subscribe(function (resultData) {
                    if (resultData["Data"]) {
                        if (fieldLabel == "Site") {
                            ddlbuildings.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                            ddlbuildings.FieldValue = "-1";
                            ddlfloors.FieldValue = "-1";
                            ddlroomno.FieldValue = "-1";
                            contextObj.setValidation(ddlbuildings);
                            contextObj.setValidation(ddlfloors);
                            contextObj.setValidation(ddlroomno);
                            ddlroomno.LookupDetails.LookupValues = [];
                            ddlfloors.LookupDetails.LookupValues = [];
                        }
                        else if (fieldLabel == "Building") {
                            ddlfloors.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                            ddlfloors.FieldValue = "-1";
                            ddlroomno.FieldValue = "-1";
                            contextObj.setValidation(ddlfloors);
                            contextObj.setValidation(ddlroomno);
                            ddlroomno.LookupDetails.LookupValues = [];
                        }
                        else if (fieldLabel == "Floor") {
                            contextObj.drawingId = fieldValue;
                            ddlroomno.LookupDetails.LookupValues = [];
                            ddlroomno.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                            ddlroomno.FieldValue = "-1";
                            contextObj.setValidation(ddlroomno);
                        }
                    }
                });
            }
            else {
                switch (fieldId) {
                    case 221:
                        ddlbuildings.LookupDetails.LookupValues = [];
                        ddlfloors.LookupDetails.LookupValues = [];
                        ddlroomno.LookupDetails.LookupValues = [];
                        ddlbuildings.FieldValue = "-1";
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                        contextObj.setValidation(ddlbuildings);
                        contextObj.setValidation(ddlfloors);
                        contextObj.setValidation(ddlroomno);
                        break;
                    case 222:
                        ddlfloors.LookupDetails.LookupValues = [];
                        ddlroomno.LookupDetails.LookupValues = [];
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                        contextObj.setValidation(ddlfloors);
                        contextObj.setValidation(ddlroomno);
                        break;
                    case 223:
                        ddlroomno.FieldValue = "-1";
                        ddlroomno.LookupDetails.LookupValues = [];
                        contextObj.setValidation(ddlroomno);
                        break;
                }
            }
        }
        else {
            this.selectedSpaceId = fieldValue; //contextObj.getspaceId(fieldValue);
        }
    };
    AssignOrMoveEmpDataEntry.prototype.setValidation = function (item) {
        var contextObj = this;
        var el = document.getElementById(item.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(item, contextObj, true, el);
            }, 100);
        }
    };
    AssignOrMoveEmpDataEntry.prototype.getspaceId = function (selectedValue) {
        var LookupValues = this.fieldObject.find(function (item) { return item.ReportFieldId == 888; }).LookupDetails.LookupValues;
        return LookupValues.find(function (el) { return el.Value == selectedValue; }).Id;
    };
    AssignOrMoveEmpDataEntry.prototype.moveresourceListforapprovalprocess = function (event) {
        this.ObjectDetailsForRequest = event["Resourcedata"];
        this.splitviewObj.showSecondaryView = false;
        this.moveThroughApprovalOrNot();
    };
    AssignOrMoveEmpDataEntry.prototype.sumbitSuccessSentForApprovalFromMove = function (event) {
        this.splitviewObj.showSecondaryView = false;
        this.submitSuccess.emit("");
    };
    AssignOrMoveEmpDataEntry.prototype.okConfirm = function (messageKey) {
        this.showSlide = false;
        var contextObj = this;
        switch (messageKey) {
            case 1:
                this.pageTitle = "Assign Request";
                this.showEmployeeMoveRequestFromAssign = true;
                this.getDrawingDetails(function (dwgdetails) {
                    contextObj.showSecondaryViewTarget = 1;
                    contextObj.getSpaceDetailsForRequest();
                    contextObj.dwgDetails = dwgdetails;
                    contextObj.splitviewObj.showSecondaryView = true;
                });
                break;
            case 3:
                this.pageTitle = "Move Request";
                this.getDrawingDetails(function (dwgdetails) {
                    contextObj.showSecondaryViewTarget = 1;
                    contextObj.getSpaceDetailsForRequest();
                    contextObj.dwgDetails = dwgdetails;
                    contextObj.splitviewObj.showSecondaryView = true;
                });
                break;
            case 4:
            case 5:
                this.isSubmitClicked = true;
                this.submitAfterConflictCheck();
                break;
        }
    };
    AssignOrMoveEmpDataEntry.prototype.onSplitViewClose = function () {
        console.log("testsplitview close");
        this.showSecondaryViewTarget = -1;
        //if (this.isSubmitClicked && this.showSecondaryViewTarget==1)
        //    this.assignOrMoveSubmit();
    };
    AssignOrMoveEmpDataEntry.prototype.cancelClick = function (messageKey) {
        this.cancelOrCloseClick(messageKey);
    };
    AssignOrMoveEmpDataEntry.prototype.closeClick = function (event, messageKey) {
        if (event.change == false) {
            this.cancelOrCloseClick(messageKey);
        }
    };
    AssignOrMoveEmpDataEntry.prototype.cancelOrCloseClick = function (messageKey) {
        if (this.isSubmitClicked && this.showSlide && (messageKey == 3 || messageKey == 1)) {
            this.showSlide = false;
            this.assignOrMoveSubmit();
        }
        if (this.showSlide == true)
            this.showSlide = false;
    };
    AssignOrMoveEmpDataEntry.prototype.cancelResourceClick = function (isChange, messageKey) {
        debugger;
        if (isChange == false && messageKey == 2 && this.showSlideResource) {
            this.showSlideResource = false;
            this.moveThroughApprovalOrNot();
        }
    };
    AssignOrMoveEmpDataEntry.prototype.okResourceConfirm = function () {
        this.showSlideResource = false;
        this.showSecondaryViewTarget = 2;
        this.splitviewObj.showSecondaryView = true;
    };
    AssignOrMoveEmpDataEntry.prototype.getSpaceDetailsForRequest = function () {
        var empItem;
        for (var i = 0; i < this.selectedEmployeeData.length; i++) {
            empItem = this.selectedEmployeeData[i];
            this.SpaceDetailsForRequest.push({ drawingId: this.drawingId, employeeId: empItem["Id"], spaceId: this.selectedSpaceId, xPosition: 0, yPosition: 0 });
        }
    };
    AssignOrMoveEmpDataEntry.prototype.moveMultipleEmployeeWithOutApproval = function (moveEmpDetails, resCallback) {
        this.employeeMoveDataInputList = [];
        var empItem;
        var index;
        var contextObj = this;
        for (var i = 0; i < moveEmpDetails.length; i++) {
            empItem = moveEmpDetails[i];
            this.employeeMoveDataInputList.push({ DrawingId: this.drawingId, EmployeeId: empItem['Id'], SpaceId: this.selectedSpaceId, XPosition: 0, YPosition: 0 });
        }
        this.empsevices.insertMultipleSpaceAllotmentDetails(this.employeeMoveDataInputList).subscribe(function (resultData) {
            var updatedEmpData = JSON.parse(resultData['Data']);
            resCallback(updatedEmpData);
        });
    };
    AssignOrMoveEmpDataEntry.prototype.resourceMove = function () {
        var contextObj = this;
        if (contextObj.ObjectDetailsForRequest != undefined && contextObj.ObjectDetailsForRequest.length > 0) {
            contextObj.empsevices.submitmoveresourcedataNew(JSON.stringify(contextObj.ObjectDetailsForRequest), 0).subscribe(function (resultData) {
                if (resultData["Data"].StatusId >= 0) {
                    contextObj.notificationservice.ShowToaster("Resource for move updated", 3);
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AssignOrMoveEmpDataEntry.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignOrMoveEmpDataEntry.prototype, "selectedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignOrMoveEmpDataEntry.prototype, "selectedEmployeeData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignOrMoveEmpDataEntry.prototype, "submitSuccess", void 0);
    AssignOrMoveEmpDataEntry = __decorate([
        core_1.Component({
            selector: 'assignormove-emp-dataentry',
            templateUrl: 'app/Views/Employee/Data/assignormoveemployeedataentry.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, employeemoverequest_component_1.EmployeeMoveRequest, selectResourcesForEmployeeMove_1.SelectReocourceForEmployeeMove],
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], AssignOrMoveEmpDataEntry);
    return AssignOrMoveEmpDataEntry;
}());
exports.AssignOrMoveEmpDataEntry = AssignOrMoveEmpDataEntry;
//# sourceMappingURL=assignormoveemployeedataentry.component.js.map