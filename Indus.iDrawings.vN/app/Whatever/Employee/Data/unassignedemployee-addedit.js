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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var administration_service_1 = require('../../../models/administration/administration.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var UnassignedEmployeeAddEditComponent = (function () {
    function UnassignedEmployeeAddEditComponent(employeeService, _validateService, _notificationService, administrationService, generFun) {
        this.employeeService = employeeService;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this.administrationService = administrationService;
        this.generFun = generFun;
        this.biggestlevel = 0;
        this.submitSuccess = new core_1.EventEmitter();
        this.isSiteAdmin = false;
    }
    UnassignedEmployeeAddEditComponent.prototype.ngOnInit = function () {
        //alert(this.showview);
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
    };
    UnassignedEmployeeAddEditComponent.prototype.Add = function (event) {
        var contextObj = this;
        if (event["filedata"] != undefined)
            this.employeeService.submitUnassignedEmployeeAdd(JSON.stringify(this.editFileDetails(event["fieldobject"], event["filedata"])), event["filedata"]).subscribe(function (resultData) {
                contextObj.success = resultData["Data"];
                if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid file", 2);
                }
                else if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                }
            });
        else
            this.employeeService.submitUnassignedEmployeeAdd(event["fieldobject"], undefined).subscribe(function (resultData) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                }
            });
    };
    UnassignedEmployeeAddEditComponent.prototype.Update = function (event) {
        var contextObj = this;
        if (event["filedata"] != undefined)
            this.employeeService.submitUnassignedEmployeeEdit(JSON.stringify(this.editFileDetails(event["fieldobject"], event["filedata"])), this.selectedId, event["filedata"]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                // if (contextObj.success["Data"] != "")
                if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid file", 2);
                }
                else if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                }
            });
        else
            this.employeeService.submitUnassignedEmployeeEdit(event["fieldobject"], this.selectedId, undefined).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                // if (contextObj.success["Data"] != "")
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                }
            });
    };
    UnassignedEmployeeAddEditComponent.prototype.editFileDetails = function (fieldobject, filedata) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 877) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    };
    UnassignedEmployeeAddEditComponent.prototype.SubmitEvent = function (event) {
        var temp = JSON.parse(event["fieldobject"]);
        var org = temp.find(function (item) { return item.ReportFieldId === 875; });
        switch (this.biggestlevel) {
            case 0:
                org.Value = "-1";
            case 1:
                var l1 = temp.find(function (item) { return item.ReportFieldId === 290; });
                org.Value = l1.Value;
                break;
            case 2:
                var l2 = temp.find(function (item) { return item.ReportFieldId === 292; });
                org.Value = l2.Value;
                break;
            case 3:
                var l3 = temp.find(function (item) { return item.ReportFieldId === 294; });
                org.Value = l3.Value;
                break;
            case 4:
                var l4 = temp.find(function (item) { return item.ReportFieldId === 296; });
                org.Value = l4.Value;
                break;
            case 5:
                var l5 = temp.find(function (item) { return item.ReportFieldId === 298; });
                org.Value = l5.Value;
                break;
        }
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 7876)
                var dateofbirth = new Date(temp[i]["Value"]);
            if (temp[i]["ReportFieldId"] == 7877)
                var dateofhire = new Date(temp[i]["Value"]);
            if (temp[i]["ReportFieldId"] == 7811)
                var dateofrelieving = new Date(temp[i]["Value"]);
        }
        var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.FieldId === 678;
        });
        event["fieldobject"] = JSON.stringify(temp);
        if (this.addEdit == "add") {
            if ((dateofbirth != null) && (dateofhire != null) && (dateofbirth >= dateofhire))
                this._notificationService.ShowToaster("Date of Hire must be greater than Date of Birth", 2);
            else if (relievinginfo) {
                if (relievinginfo.IsVisible == true) {
                    if ((dateofrelieving != null) && (dateofhire != null) && (dateofrelieving < dateofhire))
                        this._notificationService.ShowToaster("Date of Relieving  must be greater than Date of Hire", 2);
                    else
                        this.Add(event);
                }
                else
                    this.Add(event);
            }
            else {
                this.Add(event);
            }
        }
        else if (this.addEdit == "edit") {
            if ((dateofbirth != null) && (dateofhire != null) && (dateofbirth >= dateofhire))
                this._notificationService.ShowToaster("Date of Hire must be greater than Date of Birth", 2);
            else if (relievinginfo) {
                if (relievinginfo.IsVisible == true) {
                    if ((dateofrelieving != null) && (dateofhire != null) && (dateofrelieving < dateofhire))
                        this._notificationService.ShowToaster("Date of Relieving  must be greater than Date of Hire", 2);
                    else
                        this.Update(event);
                }
                else
                    this.Update(event);
            }
            else {
                this.Update(event);
            }
        }
    };
    UnassignedEmployeeAddEditComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var emailObj = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.ReportFieldId === 4814;
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            contextObj.SubmitEvent(event);
        }
        else {
            this.administrationService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {
                if (result["Data"]) {
                    contextObj.SubmitEvent(event);
                }
                else {
                    contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                }
            });
        }
    };
    UnassignedEmployeeAddEditComponent.prototype.ngOnChanges = function (changes) {
        // debugger
        var contextObj = this;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            this.employeeService.loadunassignedEmployeeAddEdit(this.selectedId[0], this.addEdit).subscribe(function (resultData) {
                contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 453) {
                        contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "1";
                        contextObj.fieldDetailsSpaceEdit[i]["IsEnabled"] = true;
                        contextObj.fieldDetailsSpaceEdit[i]["ReadOnlyMode"] = true;
                    }
                    else if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 676) {
                        if (contextObj.isSiteAdmin)
                            contextObj.fieldDetailsSpaceEdit[i].IsMandatory = true;
                        contextObj.fieldDetailsSpaceEdit[i].IsEnabled = true;
                    }
                }
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            this.employeeService.loadunassignedEmployeeAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 453) {
                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues.splice(1, 2);
                        if (contextObj.fieldDetailsSpaceEdit[i].FieldValue != "1") {
                            var relievinginfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                                return item.FieldId === 678;
                            });
                            relievinginfo.IsMandatory = true;
                            relievinginfo.IsEnabled = true;
                            relievinginfo.IsVisible = true;
                        }
                    }
                    else if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 449) {
                        var newlookup = contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues.filter(function (item) {
                            return item.Id != contextObj.selectedId;
                        });
                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues = newlookup;
                    }
                    else if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 676) {
                        // console.log(contextObj.EmployeeData);
                        if (contextObj.EmployeeData["Assigned?"] == "Yes")
                            contextObj.fieldDetailsSpaceEdit[i].IsEnabled = false;
                        else {
                            if (contextObj.isSiteAdmin)
                                contextObj.fieldDetailsSpaceEdit[i].IsMandatory = true;
                            contextObj.fieldDetailsSpaceEdit[i].IsEnabled = true;
                        }
                    }
                }
            });
        }
    };
    UnassignedEmployeeAddEditComponent.prototype.getCusSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 189:
                        contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
    };
    UnassignedEmployeeAddEditComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var statusid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var statusFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.FieldId === 678;
        });
        if ((statusid != "-1") && (statusFieldId == 453)) {
            console.log("relievinginfo", relievinginfo.FieldValue);
            relievinginfo.IsLocallyValidated = false;
            if (statusid != "1") {
                relievinginfo.IsMandatory = true;
                relievinginfo.IsEnabled = true;
                relievinginfo.IsVisible = true;
                relievinginfo.HasValidationError = true;
                if (relievinginfo.FieldValue && relievinginfo.FieldValue != "") {
                    console.log("hasval");
                    relievinginfo.HasValidationError = false;
                }
                if (document.getElementById("678")) {
                    var el = document.getElementById("678");
                    el.focus();
                    contextObj._validateService.initiateValidation(relievinginfo, contextObj, true, el);
                }
            }
            else {
                relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
                relievinginfo.HasValidationError = false;
            }
        }
        else if (statusFieldId == 395) {
            if (statusid > -1) {
                this.biggestlevel = 1;
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: statusid.toString() });
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l2 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 292; });
                    if (resultData["Data"]["LookupValues"] != "") {
                        l2.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                    else {
                        l2.LookupDetails.LookupValues = null;
                    }
                    l2["FieldValue"] = "-1";
                    var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294; });
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";
                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                });
            }
            else {
                this.biggestlevel = 0;
                var l2 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 292; });
                if (l2) {
                    l2.LookupDetails.LookupValues = null;
                    l2["FieldValue"] = "-1";
                }
                var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294; });
                if (l3) {
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";
                }
                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }
                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 399) {
            if (statusid > -1) {
                this.biggestlevel = 2;
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: statusid.toString() });
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294; });
                    if (resultData["Data"]["LookupValues"] != "") {
                        l3.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                    else {
                        l3.LookupDetails.LookupValues = null;
                    }
                    l3["FieldValue"] = "-1";
                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                });
            }
            else {
                this.biggestlevel = 1;
                var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294; });
                if (l3) {
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";
                }
                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }
                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 400) {
            if (statusid > -1) {
                this.biggestlevel = 3;
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: statusid.toString() });
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                    if (resultData["Data"]["LookupValues"] != "") {
                        l4.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                    else {
                        l4.LookupDetails.LookupValues = null;
                    }
                    l4["FieldValue"] = "-1";
                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                });
            }
            else {
                this.biggestlevel = 2;
                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296; });
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }
                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 487) {
            if (statusid > -1) {
                this.biggestlevel = 4;
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: statusid.toString() });
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                    if (resultData["Data"]["LookupValues"] != "") {
                        l5.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                    else {
                        l5.LookupDetails.LookupValues = null;
                    }
                    l5["FieldValue"] = "-1";
                });
            }
            else {
                this.biggestlevel = 3;
                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298; });
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 489) {
            if (statusid > -1)
                this.biggestlevel = 5;
            else
                this.biggestlevel = 4;
        }
        else {
            if (relievinginfo) {
                relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UnassignedEmployeeAddEditComponent.prototype, "submitSuccess", void 0);
    UnassignedEmployeeAddEditComponent = __decorate([
        core_1.Component({
            selector: 'unassignedemployee-addedit',
            templateUrl: 'app/Views/Employee/Data/unassignedEmployee-AddEdit.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'addEdit', 'EmployeeData', 'showview']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, validation_service_1.ValidateService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], UnassignedEmployeeAddEditComponent);
    return UnassignedEmployeeAddEditComponent;
}());
exports.UnassignedEmployeeAddEditComponent = UnassignedEmployeeAddEditComponent;
//# sourceMappingURL=unassignedemployee-addedit.js.map