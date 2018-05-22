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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var WorkOrderAdditionalDataFieldomponentAddEdit = (function () {
    function WorkOrderAdditionalDataFieldomponentAddEdit(administrationService, notificationService, _validateService, workOrdereService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.workOrdereService = workOrdereService;
        this.btnName = "Add";
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
    }
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.ngOnInit = function () {
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
        console.log(this.selectedId);
        console.log(this.addEdit);
        console.log(this.CategoryId);
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.loadControl = function (eventValue, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1223) {
                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 1223) {
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                        contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                        contextObj.fieldDetailsAddEdit[i].HasValidationError = false;
                    }
                    else {
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "0";
                    }
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.fieldDetailsAddEdit[i].FieldId == 1238)
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                else {
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                }
            }
        }
        else if (eventValue == "3" || eventValue == "4") {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1223) {
                    if (eventValue == "3")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "9";
                    else
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "14";
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                    contextObj.fieldDetailsAddEdit[i].HasValidationError = false;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.fieldDetailsAddEdit[i].FieldId == 1238)
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                else {
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                }
            }
        }
        else if (eventValue == "6") {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1238) {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].FieldValue = "0";
                    setTimeout(function () {
                        if (document.getElementById("1238")) {
                            var chkValidated = document.getElementById("1238");
                            chkValidated.checked = false;
                        }
                    }, 100);
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                }
                else {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                }
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1223) {
                    debugger;
                    if (action == "changecall")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    //if (contextObj.addEdit == "edit")
                    //    contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    contextObj.fieldDetailsAddEdit[i].IsLocallyValidated = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    contextObj.fieldDetailsAddEdit[i].RangeFrom = "101";
                    contextObj.fieldDetailsAddEdit[i].RangeTo = "4000";
                    if (document.getElementById("1223")) {
                        var el = document.getElementById("1223");
                        var fldObj = contextObj.fieldDetailsAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "5") {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.fieldDetailsAddEdit[i].FieldId != 1238) {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                }
                else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.fieldDetailsAddEdit[i].FieldId == 1238) {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                }
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1223) {
                    debugger;
                    if (action == "changecall")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    //if (contextObj.addEdit == "edit")
                    //    contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    contextObj.fieldDetailsAddEdit[i].IsLocallyValidated = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    contextObj.fieldDetailsAddEdit[i].RangeFrom = "1";
                    contextObj.fieldDetailsAddEdit[i].RangeTo = "100";
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1223")) {
                        var el = document.getElementById("1223");
                        var fldObj = contextObj.fieldDetailsAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.fieldChange = function (event) {
        for (var i = 0; i < this.fieldDetailsAddEdit.length; i++) {
            if (this.addEdit != "edit" && this.hasFieldValue != true) {
                if (this.fieldDetailsAddEdit[i].FieldId == 1223)
                    this.fieldDetailsAddEdit[i].FieldValue = "";
                else if ((this.fieldDetailsAddEdit[i].FieldId == 1236 || this.fieldDetailsAddEdit[i].FieldId == 1238))
                    this.fieldDetailsAddEdit[i].FieldValue = "0";
            }
        }
        this.loadControl(event.ddlRelationShipEvent.ChildFieldObject.FieldValue, this, "editcall");
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.onSubmitData = function (event) {
        var temp = JSON.parse(event["fieldobject"]);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 5873) {
                temp[i]["Value"] = this.CategoryId;
                break;
            }
            else if (temp[i]["ReportFieldId"] == 66 && temp[i]["Value"] == null) {
                temp[i]["Value"] = "0";
                break;
            }
        }
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 5871,
            Value: this.CategoryId
        });
        fieldobj.push({
            ReportFieldId: 67,
            Value: "5"
        });
        fieldobj.push({
            ReportFieldId: 73,
            Value: "false"
        });
        temp[temp.length] = fieldobj[0];
        temp[temp.length] = fieldobj[1];
        temp[temp.length] = fieldobj[2];
        event["fieldobject"] = JSON.stringify(temp);
        var value = temp.find(function (item) { return item.ReportFieldId === 69; });
        var uppervalue = value.Value.toUpperCase();
        var fields = ["SITENAME", "STATUS", "SITECODE", "DESCRIPTION", "SITE", "CODE", "SITE STATUS", "BUILDING COUNT", "ATTACHMENTS", "GROSS AREA", "NET AREA",
            "BUILDINGNAME", "BUILDINGCODE", "ADDRESS1", "ADDRESS2", "BUILDING", "FLOOR COUNT", "FLOORNAME", "OBJECT NO", "RESOURCE", "RESOURCES",
            "RESOURCE COUNT", "RESOURCE TYPE", "SPACE STANDARD", "CAI SPACE DRIVER", "SPACE STANDARD", "OBJECTID", "ASSET", "FURNITURE", "TELECOM", "OBJECT",
            "DOCUMENTID", "PERMITTEDFILEID", "DOCUMENT NUMBER", "SUBJECT", "AUTHOR", "DOCUMENT DATE", "LAST MODIFIED DATE", "STATUSID", "DOCUMENT STATUS",
            "DOCUMENTCATEGORYID", "DOCUMENT CATEGORY", "INTENDEDUSERCATEGORYID", "LATEST REVISION NO", "FILE NAME", "FILE SIZE (KB)", "ADDEDUSERID",
            "UPLOADED BY", "UPLOADED DATE", "HASEDITPRIVILEGES",
            "ID", "PROJECTID", "NAME", "PROJECT NAME", "PROJECT TYPE", "PROJECT NUMBER", "STARTDATE", "PROJECT START DATE", "ENDDATE", "PROJECT END DATE",
            "MANAGERID", "PROJECT MANAGER", "STATUSID", "REMINDER START DATE", "REPEATINTERVAL", "REMINDER INTERVAL", "HASEDITPRIVILEGES", "EMPLOYEEID",
            "SPACE KEY", "SPACE CATEGORY", "SPACE FUNCTION", "ROOM NO.", "ROOM NO", "SPACEID", "FLOOR", "AREA TYPE", "GROSS AREA", "NET AREA", "COST CATEGORY",
            "RATE CODE", "RATE", "PERIMETER", "GROSS AREA COST", "SITEID", "BUILDINGID", "FLOORID", "SPACECATEGORYID", "SPACEFUNCTIONID", "COSTCATEGORYID",
            "BOMAHANDLE", "CARPETHANDLE", "ORGUNITID", "FIRST NAME", "MIDDLE NAME", "LAST NAME", "EMPLOYEE CODE", "EMPLOYEE NAME", "EMAIL", "ASSIGNED?",
            "TITLE", "GRADE", "SUFFIX", "SUPERVISOR", "SPACE ASSIGNED DATE", "PHOTO", "FIRSTNAME", "MIDDLENAME", "LASTNAME", "ID", "DRAWINGID", "BARCODE",
            "MOVE REQUESTED BY", "DATE TO COMPLETE", "PROJECTMANAGERFIRSTNAME", "PROJECTMANAGERID",
            "LEASE TYPE", "LEASE IDENTIFIER", "LEASE EXPIRY DATE", "LANDLORD", "TENANT", "CAN BE RENEWED", "CAN BE SUBLEASED", "COMMENCEMENT DATE", "DOCUMENTS",
            "EXECUTION DATE", "EXPIRY DATE", "COMMENCEMENT DATE", "LEASE CATEGORY", "LEASE PROPERTY TYPE", "LEASE RENEWAL COUNT", "PARENT LEASE NAME",
            "RENT COMMENCEMENT DATE", "STATUS", "PURPOSE",
            "SITE NAME", "SITE CODE", "SITE AREA", "BUILDING NAME", "BUILDING CODE", "FLOOR NAME", "BUILDING AREA", "COMMON AREA", "VERTICAL AREA",
            "COST", "DATE OF CONSTRUCTION", "ESTIMATED USEFUL LIFE", "SALVAGE VALUE", "FLOOR AREA", "DATE OF HIRE", "DATE OF BIRTH", "GENDER",
            "DATE OF RELIEVING", "PHONE 1", "PHONE 2", "BUILDING CONDITION", "OWNERSHIP TYPE", "DATE OF PURCHASE", "LATITUDE", "LONGITUDE", "EMAIL",
            "PROJECT CATEGORY"];
        var index = fields.indexOf(uppervalue);
        if (index > -1)
            this.notificationService.ShowToaster(value.Value + " is a static field", 2);
        else {
            if (this.addEdit == "add") {
                var contextObj = this;
                var temp = JSON.parse(event["fieldobject"]);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 2631)
                        if (temp[i]["Value"] == "")
                            temp[i]["Value"] = 0;
                }
                event["fieldobject"] = JSON.stringify(temp);
                this.workOrdereService.addAddlDataField(event["fieldobject"]).subscribe(function (resultData) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Additional Data Field added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("Failed to add Additional Data Field", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj.notificationService.ShowToaster("Additional Data Field already exists", 5);
                        }
                    }
                });
            }
            else if (this.addEdit == "edit") {
                var contextObj = this;
                var fieldobjMax = new Array();
                var fieldtype = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 70; });
                fieldobjMax.push({
                    ReportFieldId: 66,
                    Value: contextObj.selectedId[0].toString()
                }, {
                    ReportFieldId: 70,
                    Value: fieldtype.FieldValue
                });
                this.workOrdereService.getMaxCharUsed(fieldobjMax).subscribe(function (item) {
                    var maxLengthEntered = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1223; });
                    if (item.Data > 0)
                        var length = item.Data;
                    else
                        length = -1;
                    if (length > Number(maxLengthEntered.FieldValue)) {
                        contextObj.notificationService.ShowToaster("Additional Data Field Value greater than the Max Characters Allowed already exists ", 5);
                    }
                    else {
                        var temp = JSON.parse(event["fieldobject"]);
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i]["ReportFieldId"] == 2631)
                                if (temp[i]["Value"] == "")
                                    temp[i]["Value"] = 0;
                        }
                        contextObj.workOrdereService.updateAddlDataField(event["fieldobject"], contextObj.selectedId).subscribe(function (resultData) {
                            contextObj.success = (resultData["Data"]);
                            if (contextObj.success["StatusId"] == 1) {
                                contextObj.notificationService.ShowToaster("Additional Data Field updated", 3);
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                            }
                            else if (contextObj.success["StatusId"] == 0)
                                contextObj.notificationService.ShowToaster("Failed to update Additional Data Field", 5);
                            else if (contextObj.success["StatusId"] == 3) {
                                if (contextObj.success["ServerId"] == -1) {
                                    contextObj.notificationService.ShowToaster("Additional Data Field already exists", 5);
                                }
                            }
                        });
                    }
                });
            }
        }
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.ngOnChanges = function (changes) {
        if (changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.workOrdereService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, this.CategoryId).
                subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var fieldtype = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 70; });
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1219) {
                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                    }
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1237) {
                    }
                }
            });
        }
        else if (changes["selectedId"] && changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            var fieldobj = new Array();
            var contextObj = this;
            fieldobj.push({
                ReportFieldId: 5871,
                Value: this.CategoryId
            });
            fieldobj.push({
                ReportFieldId: 67,
                Value: "5"
            });
            this.btnName = "Save Changes";
            this.workOrdereService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, fieldobj).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var _loop_1 = function(i) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1219) {
                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                    }
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1222) {
                        newlookup = contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = newlookup;
                        fieldobj1 = new Array();
                        fieldobj1.push({
                            ReportFieldId: 16,
                            Value: contextObj.CategoryId
                        });
                        contextObj.workOrdereService.AdditionalDataFieldHaveLookUp(contextObj.selectedId[0]).subscribe(function (returnData) {
                            if (returnData["Data"] == 1) {
                                contextObj.hasFieldValue = true;
                            }
                            contextObj.workOrdereService.CheckisinUse(fieldobj1, contextObj.selectedId[0]).subscribe(function (returnCheck) {
                                if (returnCheck["Data"] == 1)
                                    contextObj.isinUse = true;
                                if (contextObj.hasFieldValue == true) {
                                    var validated = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 71; });
                                    validated.FieldValue = "1";
                                    validated.IsEnabled = false;
                                    contextObj.filterFieldtypeValidation(contextObj.fieldDetailsAddEdit[i]);
                                }
                                else {
                                    if (contextObj.isinUse == true) {
                                        var validated = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 71; });
                                        validated.FieldValue = "0";
                                        validated.IsEnabled = false;
                                        contextObj.filterFieldtypeInUse(contextObj.fieldDetailsAddEdit[i]);
                                    }
                                }
                            });
                        });
                        contextObj.loadControl(contextObj.fieldDetailsAddEdit[i].FieldValue, contextObj, "editcall");
                    }
                };
                var newlookup, fieldobj1;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_1(i);
                }
            });
        }
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.filterFieldtypeValidation = function (fieldtype) {
        switch (fieldtype["FieldValue"]) {
            case "5":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 6 && item.Id != 7); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "4":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 6 && item.Id != 7); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "3":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "2":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 4 && item.Id != 6); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "7":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 6); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "6":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 5 && item.Id != 7); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
        }
    };
    WorkOrderAdditionalDataFieldomponentAddEdit.prototype.filterFieldtypeInUse = function (fieldType) {
        switch (fieldType["FieldValue"]) {
            case "5":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 7); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "6":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 5 && item.Id != 7); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "4":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 7); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "3":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "2":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 4 && item.Id != 7); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "7":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4); });
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkOrderAdditionalDataFieldomponentAddEdit.prototype, "submitSuccess", void 0);
    WorkOrderAdditionalDataFieldomponentAddEdit = __decorate([
        core_1.Component({
            selector: 'work-order-addldatafield-addEdit',
            templateUrl: './app/Views/WorkOrder/Additional Data Fields/addl-datafield_addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, validation_service_1.ValidateService],
            inputs: ['selectedId', 'addEdit', 'CategoryId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService, workorder_service_1.WorkOrdereService])
    ], WorkOrderAdditionalDataFieldomponentAddEdit);
    return WorkOrderAdditionalDataFieldomponentAddEdit;
}());
exports.WorkOrderAdditionalDataFieldomponentAddEdit = WorkOrderAdditionalDataFieldomponentAddEdit;
//# sourceMappingURL=addl-datafield_addedit.component.js.map