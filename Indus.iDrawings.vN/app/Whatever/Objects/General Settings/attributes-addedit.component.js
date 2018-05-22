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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var AttributescomponentAddEdit = (function () {
    function AttributescomponentAddEdit(objectsService, _notificationService, _renderer, el, _validateService) {
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this._renderer = _renderer;
        this.el = el;
        this._validateService = _validateService;
        this.moduleId = 0;
        this.btnName = "Add";
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
    }
    AttributescomponentAddEdit.prototype.ngOnInit = function () {
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
    };
    AttributescomponentAddEdit.prototype.loadControl = function (eventValue, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                //if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed" || this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1146 || contextObj.AttributesAddEdit[i].FieldId == 1157) {
                    if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                        contextObj.AttributesAddEdit[i].FieldValue = "";
                        contextObj.AttributesAddEdit[i].IsMandatory = false;
                        contextObj.AttributesAddEdit[i].HasValidationError = false;
                    }
                    else
                        contextObj.AttributesAddEdit[i].FieldValue = "0";
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.AttributesAddEdit[i].FieldId == 1156)
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                else
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "3" || eventValue == "4") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].FieldValue = "";
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = false;
                    contextObj.AttributesAddEdit[i].HasValidationError = false;
                }
                else if (contextObj.AttributesAddEdit[i].FieldId == 1157 || contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.AttributesAddEdit[i].FieldId == 1156)
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                else
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "6") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable" || this.fieldDetailsAddEdit[i].FieldLabel== "Validated" ) {
                if (contextObj.AttributesAddEdit[i].FieldId == 1157 || contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    //if (this.addEdit != "edit" && this.hasFieldValue != true) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].FieldValue = "0";
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.AttributesAddEdit[i].FieldValue = "";
                    contextObj.AttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = true;
                    contextObj.AttributesAddEdit[i].RangeFrom = "101";
                    contextObj.AttributesAddEdit[i].RangeTo = "4000";
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.AttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "5") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1157) {
                    contextObj.AttributesAddEdit[i].FieldValue = "0";
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId != 1156) {
                        contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.AttributesAddEdit[i].IsEnabled = true;
                    }
                    else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId == 1156) {
                        contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.AttributesAddEdit[i].IsEnabled = true;
                    }
                }
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.AttributesAddEdit[i].FieldValue = "";
                    contextObj.AttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = true;
                    contextObj.AttributesAddEdit[i].RangeFrom = "1";
                    contextObj.AttributesAddEdit[i].RangeTo = "100";
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.AttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "-1") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                contextObj.AttributesAddEdit[i].IsEnabled = true;
                contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
            }
        }
        this.AttributesAddEdit = contextObj.AttributesAddEdit;
    };
    AttributescomponentAddEdit.prototype.fieldChange = function (event) {
        var contextObj = this;
        for (var i = 0; i < this.AttributesAddEdit.length; i++) {
            if (this.action != "edit" && this.hasFieldValue != true) {
                if (this.AttributesAddEdit[i].FieldId == 1146)
                    this.AttributesAddEdit[i].FieldValue = "";
                else if ((this.AttributesAddEdit[i].FieldId == 1155 || this.AttributesAddEdit[i].FieldId == 1157 || this.AttributesAddEdit[i].FieldId == 1156))
                    this.AttributesAddEdit[i].FieldValue = "0";
            }
        }
        contextObj.loadControl(event.ddlRelationShipEvent.ChildFieldObject.FieldValue, contextObj, "changecall");
    };
    AttributescomponentAddEdit.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var tempdata1 = new Array();
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                if (contextObj.AttributesAddEdit[2].FieldValue == "5" || contextObj.AttributesAddEdit[2].FieldValue == "6") {
                    if (contextObj.AttributesAddEdit[5].FieldValue == "True" || contextObj.AttributesAddEdit[5].FieldValue == "1") {
                        contextObj.objectsService.getAttributeValuesList(this.objectCategoryId, this.selectedId, 0, "[Attribute Value]", "ASC", "").subscribe(function (resultData) {
                            contextObj.tempdata = JSON.parse(resultData["Data"].FieldBinderData);
                            var tempid = 0;
                            for (var i = 0; i < contextObj.tempdata.length; i++) {
                                var tempattrvalue = contextObj.tempdata[i]["Attribute Value"];
                                if (tempattrvalue.toString().length > parseInt(contextObj.AttributesAddEdit[3].FieldValue)) {
                                    tempid = 1;
                                }
                            }
                            if (tempid == 0)
                                contextObj.postSubmit(contextObj, event["fieldobject"], 2);
                            else
                                contextObj._notificationService.ShowToaster("Common Attribute Field Value greater than the Max Characters Allowed already exists", 5);
                        });
                    }
                    else {
                        contextObj.objectsService.getObjectSpaceData(1, 0, 0, contextObj.objectCategoryId, 1, 1, '', '', '', false, 0, true, 1, 0, '', "ASC", '').subscribe(function (result) {
                            tempdata1 = JSON.parse(result.FieldBinderData);
                            var tempid1 = 0;
                            for (var j = 0; j < tempdata1.length; j++) {
                                if (tempdata1[j][contextObj.AttributesAddEdit[1].FieldValue] != null || tempdata1[j][contextObj.AttributesAddEdit[1].FieldValue] != undefined)
                                    if (tempdata1[j][contextObj.AttributesAddEdit[1].FieldValue].length > parseInt(contextObj.AttributesAddEdit[3].FieldValue)) {
                                        tempid1 = 1;
                                        j = tempdata1.length;
                                    }
                            }
                            if (tempid1 == 0)
                                contextObj.postSubmit(contextObj, event["fieldobject"], 2);
                            else
                                contextObj._notificationService.ShowToaster("Common Attribute Field Value greater than the Max Characters Allowed already exists", 5);
                        });
                    }
                }
                else
                    this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    AttributescomponentAddEdit.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        //check for static field
        var value = arr.find(function (item) { return item.ReportFieldId === 69; });
        var uppervalue = value.Value.toUpperCase();
        var fields = ["ASSET NO", "PREFIX", "STATUS", "ASSET CLASS NAME", "SITE", "ATTACHMENTS", "GROSS AREA",
            "BUILDING", "FLOOR", "FLOORNAME", "SPACE CATEGORY", "SPACE FUNCTION", "SEATING CAPACITY",
            "DIVISION 1", "DIVISION 1 (SHORT)", "SPACE STANDARD", "DEPARTMENT", "DEPARTMENT (SHORT)", "OBJECTID", "ID", "OFFICE",
            "OFFICE (SHORT)", "ROOM NO", "SPACE KEY", "BARCODE", "PERIMETER"];
        var index = fields.indexOf(uppervalue);
        if (index > -1)
            this._notificationService.ShowToaster(value.Value + " is a static field", 2);
        else {
            if (contextObj.AttributesAddEdit[2].FieldValue == 2) {
                arr[3].Value = "30";
            }
            else if (contextObj.AttributesAddEdit[2].FieldValue == 3) {
                arr[3].Value = "9";
            }
            else if (contextObj.AttributesAddEdit[2].FieldValue == 4) {
                //contextObj.AttributesAddEdit[3].FieldValue = 14;
                arr[3].Value = "14";
            }
            else if (contextObj.AttributesAddEdit[2].FieldValue == 7) {
                //contextObj.AttributesAddEdit[3].FieldValue = 55;
                arr[3].Value = "55";
            }
            if (contextObj.AttributesAddEdit[4].FieldValue == "true")
                arr[4].Value = "1";
            if (contextObj.AttributesAddEdit[5].FieldValue == "true")
                arr[5].Value = "1";
            if (contextObj.AttributesAddEdit[6].FieldValue == "true")
                arr[6].Value = "1";
            if (contextObj.AttributesAddEdit[4].FieldValue == 0)
                contextObj.AttributesAddEdit[4].FieldValue = "false";
            if (contextObj.AttributesAddEdit[5].FieldValue == 0)
                contextObj.AttributesAddEdit[5].FieldValue = "false";
            if (contextObj.AttributesAddEdit[6].FieldValue == 0)
                contextObj.AttributesAddEdit[6].FieldValue = "false";
            var Maxlength = parseInt(arr[3].Value);
            arr.push({ ReportFieldId: 74, Value: "0" });
            arr.push({ ReportFieldId: 3058, Value: "1" });
            arr.push({ ReportFieldId: 67, Value: this.objectCategoryId.toString() });
            arr.push({ ReportFieldId: 271, Value: this.moduleId.toString() });
            contextObj.objectsService.postSubmitAttributes(contextObj, JSON.stringify(arr), this.selectedId, target, this.objectCategoryId, Maxlength).subscribe(function (resultData) {
                //contextObj.success = resultData["Data"];            
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Common Attribute added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Common Attribute updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        //if (resultData["Data"].ServerId == -1 || resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Attribute already exists", 5);
                        contextObj.AttributesAddEdit[3].FieldValue = "";
                        //}
                        break;
                }
            });
        }
    };
    //onSubmitData(event) {
    //    var contextObj = this;
    //    switch (this.action) {
    //        case "add":
    //            this.postSubmit(contextObj, event["fieldobject"], 1);
    //            break;
    //        case "edit":
    //            this.postSubmit(contextObj, event["fieldobject"], 2);
    //            break;
    //    }
    //}
    //onSubmitData(event) {
    //    var temp = JSON.parse(event["fieldobject"]);
    //    for (let i = 0; i < temp.length; i++) {
    //        if (temp[i]["ReportFieldId"] == 24) {
    //            temp[i]["Value"] = this.CategoryId;
    //            break;
    //        }
    //    }
    //    event["fieldobject"] = JSON.stringify(temp);
    //    //check for static field
    //    var value = temp.find(function (item) { return item.ReportFieldId === 25 })
    //    var uppervalue = value.Value.toUpperCase()
    //    var fields = ["SITENAME", "STATUS", "SITECODE", "DESCRIPTION", "SITE", "CODE", "SITE STATUS", "BUILDING COUNT", "ATTACHMENTS", "GROSS AREA", "NET AREA",
    //        "BUILDINGNAME", "BUILDINGCODE", "ADDRESS1", "ADDRESS2", "BUILDING", "FLOOR COUNT", "FLOORNAME", "OBJECT NO", "RESOURCE", "RESOURCES",
    //        "RESOURCE COUNT", "RESOURCE TYPE", "SPACE STANDARD", "CAI SPACE DRIVER", "SPACE STANDARD", "OBJECTID", "ASSET", "FURNITURE", "TELECOM", "OBJECT",
    //        "DOCUMENTID", "PERMITTEDFILEID", "DOCUMENT NUMBER", "SUBJECT", "AUTHOR", "DOCUMENT DATE", "LAST MODIFIED DATE", "STATUSID", "DOCUMENT STATUS",
    //        "DOCUMENTCATEGORYID", "DOCUMENT CATEGORY", "INTENDEDUSERCATEGORYID", "LATEST REVISION NO", "FILE NAME", "FILE SIZE (KB)", "ADDEDUSERID",
    //        "UPLOADED BY", "UPLOADED DATE", "HASEDITPRIVILEGES",
    //        "ID", "PROJECTID", "NAME", "PROJECT NAME", "PROJECT TYPE", "PROJECT NUMBER", "STARTDATE", "PROJECT START DATE", "ENDDATE", "PROJECT END DATE",
    //        "MANAGERID", "PROJECT MANAGER", "STATUSID", "REMINDER START DATE", "REPEATINTERVAL", "REMINDER INTERVAL", "HASEDITPRIVILEGES", "EMPLOYEEID",
    //        "SPACE KEY", "SPACE CATEGORY", "SPACE FUNCTION", "ROOM NO.", "ROOM NO", "SPACEID", "FLOOR", "AREA TYPE", "GROSS AREA", "NET AREA", "COST CATEGORY",
    //        "RATE CODE", "RATE", "PERIMETER", "GROSS AREA COST", "SITEID", "BUILDINGID", "FLOORID", "SPACECATEGORYID", "SPACEFUNCTIONID", "COSTCATEGORYID",
    //        "BOMAHANDLE", "CARPETHANDLE", "ORGUNITID", "FIRST NAME", "MIDDLE NAME", "LAST NAME", "EMPLOYEE CODE", "EMPLOYEE NAME", "EMAIL", "ASSIGNED?",
    //        "TITLE", "GRADE", "SUFFIX", "SUPERVISOR", "SPACE ASSIGNED DATE", "PHOTO", "FIRSTNAME", "MIDDLENAME", "LASTNAME", "ID", "DRAWINGID", "BARCODE",
    //        "MOVE REQUESTED BY", "DATE TO COMPLETE", "PROJECTMANAGERFIRSTNAME", "PROJECTMANAGERID",
    //        "LEASE TYPE", "LEASE IDENTIFIER", "LEASE EXPIRY DATE", "LANDLORD", "TENANT", "CAN BE RENEWED", "CAN BE SUBLEASED", "COMMENCEMENT DATE", "DOCUMENTS",
    //        "EXECUTION DATE", "EXPIRY DATE", "COMMENCEMENT DATE", "LEASE CATEGORY", "LEASE PROPERTY TYPE", "LEASE RENEWAL COUNT", "PARENT LEASE NAME",
    //        "RENT COMMENCEMENT DATE", "STATUS", "PURPOSE",
    //        "SITE NAME", "SITE CODE", "SITE AREA", "BUILDING NAME", "BUILDING CODE", "FLOOR NAME", "BUILDING AREA", "COMMON AREA", "VERTICAL AREA",
    //        "COST", "DATE OF CONSTRUCTION", "ESTIMATED USEFUL LIFE", "SALVAGE VALUE", "FLOOR AREA", "DATE OF HIRE", "DATE OF BIRTH", "GENDER",
    //        "DATE OF RELIEVING", "PHONE 1", "PHONE 2", "BUILDING CONDITION", "OWNERSHIP TYPE", "DATE OF PURCHASE", "LATITUDE", "LONGITUDE", "EMAIL",
    //        "PROJECT CATEGORY"]
    //    var index = fields.indexOf(uppervalue);
    //    if (index > -1)
    //        this.notificationService.ShowToaster(value.Value + " is a static field", 2);
    //    else {
    //        if (this.addEdit == "add") {
    //            var contextObj = this;
    //            var temp = JSON.parse(event["fieldobject"]);
    //            for (let i = 0; i < temp.length; i++) {
    //                if (temp[i]["ReportFieldId"] == 32)
    //                    if (temp[i]["Value"] == "")
    //                        temp[i]["Value"] = 0;
    //            }
    //            event["fieldobject"] = JSON.stringify(temp);
    //            this.objectsService.postSubmitObjectClass(JSON.stringify(arr), this.selectedId, target, this.objectCategoryId).subscribe(function (resultData) {
    //                contextObj.success = resultData["Data"];
    //                if (contextObj.success["StatusId"] == 1) {
    //                    contextObj.notificationService.ShowToaster("Data Field details added", 3);
    //                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
    //                }
    //                else if (contextObj.success["StatusId"] == 0)
    //                    contextObj.notificationService.ShowToaster("Failed to add Data Field", 5);
    //                else if (contextObj.success["StatusId"] == 3) {
    //                    if (contextObj.success["ServerId"] == -1) {
    //                        contextObj.notificationService.ShowToaster("Data Field already exists", 5);
    //                    }
    //                }
    //            });
    //        }
    //        else if (this.addEdit == "edit") {
    //            var contextObj = this;
    //            this.objectsService.postSubmitAttributes(event["fieldobject"], this.selectedId).subscribe(function (resultData) {
    //                contextObj.success = (resultData["Data"]);
    //                if (contextObj.success["StatusId"] == 1) {
    //                    contextObj.notificationService.ShowToaster("Data Field details updated", 3);
    //                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
    //                }
    //                else if (contextObj.success["StatusId"] == 0)
    //                    contextObj.notificationService.ShowToaster("Failed to update Data Field", 5);
    //                else if (contextObj.success["StatusId"] == 3) {
    //                    if (contextObj.success["ServerId"] == -1) {
    //                        contextObj.notificationService.ShowToaster("Data Field already exists", 5);
    //                    }
    //                }
    //            });
    //        }
    //    }
    //}
    //ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    //    if (changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
    //        this.btnName = "Save";
    //        var contextObj = this;
    //        this.objectsService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, this.CategoryId).
    //            subscribe(function (resultData) {
    //                contextObj.AttributesAddEdit = resultData["Data"];
    //                var fieldtype = contextObj.AttributesAddEdit.find(function (item) { return item.ReportFieldId === 26 })
    //                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
    //                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
    //                for (let i = 0; i < contextObj.AttributesAddEdit.length; i++) {
    //                    if (contextObj.AttributesAddEdit[i]["FieldId"] == 350) {
    //                        contextObj.AttributesAddEdit[i]["IsVisible"] = false;
    //                        contextObj.AttributesAddEdit[i]["IsMandatory"] = false;
    //                    }
    //                    if (contextObj.AttributesAddEdit[i]["FieldId"] == 363) {
    //                        contextObj.AttributesAddEdit[i]["ReadOnlyMode"] = true;
    //                        contextObj.AttributesAddEdit[i]["IsEnabled"] = false;
    //                    }
    //                    // break;
    //                    // }                 
    //                }
    //            })
    //    }
    //    else if (changes["selectedId"] && changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
    //        var fieldobj = new Array<ReportFieldArray>();
    //        var contextObj = this;
    //        fieldobj.push({
    //            ReportFieldId: 24,
    //            Value: this.CategoryId
    //        })
    //        this.btnName = "Save Changes"
    //        this.objectsService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, fieldobj).subscribe(function (resultData) {
    //            contextObj.AttributesAddEdit = resultData["Data"];
    //            for (let i = 0; i < contextObj.AttributesAddEdit.length; i++) {
    //                if (contextObj.AttributesAddEdit[i]["FieldId"] == 350) {
    //                    contextObj.AttributesAddEdit[i]["IsVisible"] = false;
    //                    contextObj.AttributesAddEdit[i]["IsMandatory"] = false;
    //                    //break;
    //                }
    //                if (contextObj.AttributesAddEdit[i]["FieldId"] == 352) {
    //                    var newlookup = contextObj.AttributesAddEdit[i]["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
    //                    contextObj.AttributesAddEdit[i]["LookupDetails"]["LookupValues"] = newlookup;
    //                    //code to validate and filter the field type to be inserted
    //                    var fieldobj1 = new Array<ReportFieldArray>();
    //                    fieldobj1.push({
    //                        ReportFieldId: 16,
    //                        Value: contextObj.CategoryId
    //                    })
    //                    contextObj.objectsService.AdditionalDataFieldHaveLookUp(contextObj.selectedId[0]).subscribe(function (returnData) {
    //                        if (returnData["Data"] == 1) {
    //                            contextObj.hasFieldValue = true;
    //                        }
    //                        contextObj.objectsService.CheckisinUse(fieldobj1, contextObj.selectedId[0]).subscribe(function (returnCheck) {
    //                            if (returnCheck["Data"] == 1)
    //                                contextObj.isinUse = true;
    //                            if (contextObj.hasFieldValue == true) {
    //                                var validated = contextObj.AttributesAddEdit.find(function (item) { return item.ReportFieldId === 27 })
    //                                //var fieldtype = this.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 26 })
    //                                validated.FieldValue = "1";
    //                                validated.IsEnabled = false;
    //                                contextObj.filterFieldtypeValidation(contextObj.AttributesAddEdit[i]);
    //                            }
    //                            else {
    //                                if (contextObj.isinUse == true) {
    //                                    var validated = contextObj.AttributesAddEdit.find(function (item) { return item.ReportFieldId === 27 })
    //                                    //var fieldtype = this.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 26 })
    //                                    validated.FieldValue = "0";
    //                                    validated.IsEnabled = false;
    //                                    contextObj.filterFieldtypeInUse(contextObj.AttributesAddEdit[i])
    //                                }
    //                            }
    //                        })
    //                    })
    //                    contextObj.loadControl(contextObj.AttributesAddEdit[i].FieldValue);
    //                }
    //            }
    //        })
    //    }
    //}
    AttributescomponentAddEdit.prototype.filterFieldtypeValidation = function (fieldtype) {
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
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7 && item.Id != 6); });
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
    AttributescomponentAddEdit.prototype.filterFieldtypeInUse = function (fieldType) {
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
        core_1.Input(), 
        __metadata('design:type', String)
    ], AttributescomponentAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AttributescomponentAddEdit.prototype, "submitSuccess", void 0);
    AttributescomponentAddEdit = __decorate([
        core_1.Component({
            selector: 'attributes-addedit',
            templateUrl: 'app/Views/Objects/General Settings/attributes-addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ['objectCategoryId', 'selectedId', 'action', 'AttributesAddEdit', 'btnName', 'messages', 'moduleId']
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService, core_1.Renderer, core_1.ElementRef, validation_service_1.ValidateService])
    ], AttributescomponentAddEdit);
    return AttributescomponentAddEdit;
}());
exports.AttributescomponentAddEdit = AttributescomponentAddEdit;
//# sourceMappingURL=attributes-addedit.component.js.map