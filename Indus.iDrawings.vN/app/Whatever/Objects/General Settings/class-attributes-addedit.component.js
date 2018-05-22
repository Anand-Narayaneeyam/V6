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
var ClassAttributescomponentAddEdit = (function () {
    function ClassAttributescomponentAddEdit(objectsService, _notificationService, _renderer, el, _validateService) {
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this._renderer = _renderer;
        this.el = el;
        this._validateService = _validateService;
        this.classname = "Class";
        this.moduleId = 0;
        this.btnName = "Add";
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
    }
    ClassAttributescomponentAddEdit.prototype.ngOnInit = function () {
        switch (this.objectCategoryId) {
            case 1:
            case 2:
                this.classname = "Class";
                break;
            case 3:
                this.classname = "Object Class";
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                this.classname = "Component Type";
                break;
            case 20:
                this.classname = "Equipment Type";
                break;
        }
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
    };
    ClassAttributescomponentAddEdit.prototype.loadControl = function (eventValue, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                //if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed" || this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146 || contextObj.ClassAttributesAddEdit[i].FieldId == 1157) {
                    if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                        contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                        contextObj.ClassAttributesAddEdit[i].IsMandatory = false;
                        contextObj.ClassAttributesAddEdit[i].HasValidationError = false;
                    }
                    else
                        this.ClassAttributesAddEdit[i].FieldValue = "0";
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.ClassAttributesAddEdit[i].FieldId == 1156)
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                else
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "3" || eventValue == "4") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = false;
                    contextObj.ClassAttributesAddEdit[i].HasValidationError = false;
                }
                else if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157 || contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.ClassAttributesAddEdit[i].FieldId == 1156)
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                else
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "6") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable" || this.fieldDetailsAddEdit[i].FieldLabel== "Validated" ) {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157 || contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    //if (this.addEdit != "edit" && this.hasFieldValue != true) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "0";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                    contextObj.ClassAttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = true;
                    contextObj.ClassAttributesAddEdit[i].RangeFrom = "101";
                    contextObj.ClassAttributesAddEdit[i].RangeTo = "4000";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = contextObj;
                        var fldObj = contextObj.ClassAttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "5") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157) {
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "0";
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId != 1156) {
                        contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    }
                    else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                        contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    }
                }
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                    contextObj.ClassAttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = true;
                    contextObj.ClassAttributesAddEdit[i].RangeFrom = "1";
                    contextObj.ClassAttributesAddEdit[i].RangeTo = "100";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.ClassAttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "-1") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
            }
        }
        this.ClassAttributesAddEdit = contextObj.ClassAttributesAddEdit;
    };
    ClassAttributescomponentAddEdit.prototype.fieldChange = function (event) {
        var contextObj = this;
        for (var i = 0; i < this.ClassAttributesAddEdit.length; i++) {
            if (this.action != "edit" && this.hasFieldValue != true) {
                if (this.ClassAttributesAddEdit[i].FieldId == 1146)
                    this.ClassAttributesAddEdit[i].FieldValue = "";
                else if ((this.ClassAttributesAddEdit[i].FieldId == 1155 || this.ClassAttributesAddEdit[i].FieldId == 1157 || this.ClassAttributesAddEdit[i].FieldId == 1156))
                    this.ClassAttributesAddEdit[i].FieldValue = "0";
            }
        }
        contextObj.loadControl(event.ddlRelationShipEvent.ChildFieldObject.FieldValue, contextObj, "changecall");
    };
    ClassAttributescomponentAddEdit.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var tempdata1 = new Array();
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                if (contextObj.ClassAttributesAddEdit[2].FieldValue == "5" || contextObj.ClassAttributesAddEdit[2].FieldValue == "6") {
                    if (contextObj.ClassAttributesAddEdit[5].FieldValue == "True" || contextObj.ClassAttributesAddEdit[5].FieldValue == "1") {
                        contextObj.objectsService.getAttributeValuesList(this.objectCategoryId, this.selectedId, 0, "[Attribute Value]", "ASC", "").subscribe(function (resultData) {
                            contextObj.tempdata = JSON.parse(resultData["Data"].FieldBinderData);
                            var tempid = 0;
                            for (var i = 0; i < contextObj.tempdata.length; i++) {
                                var tempattrvalue = contextObj.tempdata[i]["Attribute Value"];
                                if (tempattrvalue.toString().length > parseInt(contextObj.ClassAttributesAddEdit[3].FieldValue)) {
                                    tempid = 1;
                                }
                            }
                            if (tempid == 0)
                                contextObj.postSubmit(contextObj, event["fieldobject"], 2);
                            else
                                contextObj._notificationService.ShowToaster(contextObj.classname + " Attribute Field Value greater than the Max Characters Allowed already exists", 5);
                        });
                    }
                    else {
                        contextObj.objectsService.getObjectSpaceData(1, 0, 0, contextObj.objectCategoryId, 1, 2, contextObj.ClassId, '', '', false, 0, true, 1, 0, '', "ASC", '').subscribe(function (result) {
                            tempdata1 = JSON.parse(result.FieldBinderData);
                            var tempid1 = 0;
                            for (var j = 0; j < tempdata1.length; j++) {
                                if (tempdata1[j][contextObj.ClassAttributesAddEdit[1].FieldValue] != null || tempdata1[j][contextObj.ClassAttributesAddEdit[1].FieldValue] != undefined)
                                    if (tempdata1[j][contextObj.ClassAttributesAddEdit[1].FieldValue].length > parseInt(contextObj.ClassAttributesAddEdit[3].FieldValue)) {
                                        tempid1 = 1;
                                        j = tempdata1.length;
                                    }
                            }
                            if (tempid1 == 0)
                                contextObj.postSubmit(contextObj, event["fieldobject"], 2);
                            else
                                contextObj._notificationService.ShowToaster(contextObj.classname + " Attribute Field Value greater than the Max Characters Allowed already exists", 5);
                        });
                    }
                }
                else
                    contextObj.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    ClassAttributescomponentAddEdit.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        var value = arr.find(function (item) { return item.ReportFieldId === 69; });
        var uppervalue = value.Value.toUpperCase();
        var fields = ["ASSET NO", "PREFIX", "STATUS", "ASSET CLASS NAME", "FURNITURE NO", "FURNITURE CLASS NAME", "COMPONENT TYPE NAME", "COMPONENT NO", "SITE", "ATTACHMENTS", "GROSS AREA",
            "BUILDING", "FLOOR", "FLOORNAME", "SPACE CATEGORY", "SPACE FUNCTION", "SEATING CAPACITY",
            "DIVISION 1", "DIVISION 1 (SHORT)", "SPACE STANDARD", "DEPARTMENT", "DEPARTMENT (SHORT)", "OBJECTID", "ID", "OFFICE",
            "OFFICE (SHORT)", "ROOM NO", "SPACE KEY", "BARCODE"];
        var index = fields.indexOf(uppervalue);
        if (index > -1)
            this._notificationService.ShowToaster(value.Value + " is a static field", 2);
        else {
            if (contextObj.ClassAttributesAddEdit[2].FieldValue == 2) {
                arr[3].Value = "30";
            }
            else if (contextObj.ClassAttributesAddEdit[2].FieldValue == 3) {
                arr[3].Value = "9";
            }
            else if (contextObj.ClassAttributesAddEdit[2].FieldValue == 4) {
                //contextObj.ClassAttributesAddEdit[3].FieldValue = 14;
                arr[3].Value = "14";
            }
            else if (contextObj.ClassAttributesAddEdit[2].FieldValue == 7) {
                //contextObj.ClassAttributesAddEdit[3].FieldValue = 55;
                arr[3].Value = "55";
            }
            if (contextObj.ClassAttributesAddEdit[4].FieldValue == "true")
                arr[4].Value = "1";
            if (contextObj.ClassAttributesAddEdit[5].FieldValue == "true")
                arr[5].Value = "1";
            if (contextObj.ClassAttributesAddEdit[6].FieldValue == "true")
                arr[6].Value = "1";
            if (contextObj.ClassAttributesAddEdit[4].FieldValue == 0)
                contextObj.ClassAttributesAddEdit[4].FieldValue = "false";
            if (contextObj.ClassAttributesAddEdit[5].FieldValue == 0)
                contextObj.ClassAttributesAddEdit[5].FieldValue = "false";
            if (contextObj.ClassAttributesAddEdit[6].FieldValue == 0)
                contextObj.ClassAttributesAddEdit[6].FieldValue = "false";
            var Maxlength = parseInt(arr[3].Value);
            arr.push({ ReportFieldId: 74, Value: "0" });
            arr.push({ ReportFieldId: 3058, Value: "1" });
            arr.push({ ReportFieldId: 67, Value: this.objectCategoryId.toString() });
            arr.push({ ReportFieldId: 271, Value: this.moduleId.toString() });
            if (target == 1)
                this.selectedId = 0;
            contextObj.objectsService.postSubmitClassAttributes(contextObj, JSON.stringify(arr), this.selectedId, target, this.objectCategoryId, this.ClassId, Maxlength).subscribe(function (resultData) {
                //contextObj.success = resultData["Data"];            
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster(contextObj.classname + " Attribute added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster(contextObj.classname + " Attribute updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        //if (resultData["Data"].ServerId == -1 || resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Attribute already exists", 5);
                        contextObj.ClassAttributesAddEdit[3].FieldValue = "";
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
    ClassAttributescomponentAddEdit.prototype.filterFieldtypeValidation = function (fieldtype) {
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
    ClassAttributescomponentAddEdit.prototype.filterFieldtypeInUse = function (fieldType) {
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
    ], ClassAttributescomponentAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ClassAttributescomponentAddEdit.prototype, "submitSuccess", void 0);
    ClassAttributescomponentAddEdit = __decorate([
        core_1.Component({
            selector: 'classattributes-addedit',
            templateUrl: 'app/Views/Objects/General Settings/class-attributes-addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ['objectCategoryId', 'selectedId', 'action', 'ClassAttributesAddEdit', 'btnName', 'ClassId', 'moduleId']
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService, core_1.Renderer, core_1.ElementRef, validation_service_1.ValidateService])
    ], ClassAttributescomponentAddEdit);
    return ClassAttributescomponentAddEdit;
}());
exports.ClassAttributescomponentAddEdit = ClassAttributescomponentAddEdit;
//# sourceMappingURL=class-attributes-addedit.component.js.map