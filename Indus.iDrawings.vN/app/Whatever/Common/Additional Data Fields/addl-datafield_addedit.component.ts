﻿import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'addldatafield-addEdit',
    templateUrl: 'app/Views/Common/Additional Data Fields/addl-datafield_addedit.html',
    directives: [FieldComponent],
    providers: [AdministrationService, NotificationService, ValidateService],
    inputs: ['selectedId', 'addEdit', 'CategoryId']
})

export class AdditionalDataFieldomponentAddEdit implements OnInit {
    success: any;
    public fieldDetailsAddEdit: IField[];
    btnName: string = "Add";
    dataKey: string = "Id";
    selectedId: number;
    addEdit: string;
    CategoryId: string;
    @Output() submitSuccess = new EventEmitter();
    hasFieldValue: boolean = false;
    isinUse: boolean = false;
    blnErrorFocused: boolean;


    constructor(private administrationService: AdministrationService, private _renderer: Renderer, private el: ElementRef, private _validateService: ValidateService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
    }
    loadControl(eventValue: any, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") // Date 2 or datetime 7
        {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                //if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed" || this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 361 || contextObj.fieldDetailsAddEdit[i].FieldId == 363) {
                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 361) {
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                        contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                        contextObj.fieldDetailsAddEdit[i].HasValidationError = false;
                    }
                    else {
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "0";
                        setTimeout(function () {
                            if (<HTMLInputElement>document.getElementById("363")) {
                                var chkTotalizable = <HTMLInputElement>document.getElementById("363");
                                chkTotalizable.checked = false;
                            }
                        }, 100);
                    }
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                }

                //this.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.fieldDetailsAddEdit[i].FieldId == 364)
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                else {
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                }

                //if (this.fieldDetailsAddEdit[i].FieldId == 361) {
                //    this.fieldDetailsAddEdit[i].IsMandatory = false;
                //    this.fieldDetailsAddEdit[i].HasValidationError = false;
                //}
            }
        }
        else if (eventValue == "3" || eventValue == "4") { //integer 3 or numeric 4
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed") {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 361) {
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    if (eventValue=="3")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "9";
                    else
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "14";
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                    contextObj.fieldDetailsAddEdit[i].HasValidationError = false;
                }


                //this.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.fieldDetailsAddEdit[i].FieldId == 364)
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                else {
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                }


                //if (this.fieldDetailsAddEdit[i].FieldId == 361) {
                //    this.fieldDetailsAddEdit[i].IsMandatory = false;
                //    this.fieldDetailsAddEdit[i].HasValidationError = false;
                //}
            }
        }
        else if (eventValue == "6") { //multi 6
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable" || this.fieldDetailsAddEdit[i].FieldLabel== "Validated" ) {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 363 || contextObj.fieldDetailsAddEdit[i].FieldId == 364) {
                    //if (this.addEdit != "edit" && this.hasFieldValue != true) {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].FieldValue = "0";
                    setTimeout(function () {
                        if (<HTMLInputElement>document.getElementById("363")) {
                            var chkTotalizable = <HTMLInputElement>document.getElementById("363");
                            chkTotalizable.checked = false;
                        }
                        if (<HTMLInputElement>document.getElementById("364")) {
                            var chkValidated = <HTMLInputElement>document.getElementById("364");
                            chkValidated.checked = false;
                        }
                    }, 100);
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    //}
                }
                else {
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                }
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 361) {
                    // var element = <HTMLElement>document.getElementById("361");
                    if (action == "changecall")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    contextObj.fieldDetailsAddEdit[i].IsLocallyValidated = false;                    
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    contextObj.fieldDetailsAddEdit[i].RangeFrom = "101";
                    contextObj.fieldDetailsAddEdit[i].RangeTo = "4000";
                    if (<HTMLElement>document.getElementById("361")) {
                        var el = <HTMLElement>document.getElementById("361");
                        var fldObj = contextObj.fieldDetailsAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }

                }
            }
        }
        else if (eventValue == "5") { //text 5
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 363) {
                    contextObj.fieldDetailsAddEdit[i].FieldValue = "0";
                    setTimeout(function () {
                        if (<HTMLInputElement>document.getElementById("363")) {
                            var chkTotalizable = <HTMLInputElement>document.getElementById("363");
                            chkTotalizable.checked = false;
                        }
                    }, 100);
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                }
                else {
                    if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.fieldDetailsAddEdit[i].FieldId != 364) {
                        contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                        contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    }
                    else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.fieldDetailsAddEdit[i].FieldId == 364) {
                        contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                        contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    }
                }
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 361) {
                    //var element = <HTMLElement>document.getElementById("361");   
                    if (action == "changecall")
                        contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                    contextObj.fieldDetailsAddEdit[i].IsLocallyValidated = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    contextObj.fieldDetailsAddEdit[i].RangeFrom = "1";
                    contextObj.fieldDetailsAddEdit[i].RangeTo = "100";
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    if (<HTMLElement>document.getElementById("361")) {
                        var el = <HTMLElement>document.getElementById("361");
                        //var contextObj = this;
                        var fldObj = contextObj.fieldDetailsAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                        
                    }

                }
            }
        }
        
        if (this.CategoryId == "5") {
            var isMutivalued = this.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 2367 })
            var validated = this.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 364 })
            if (validated.FieldValue == "True" && validated.IsEnabled == true)
                isMutivalued.IsEnabled = true;
            else
                isMutivalued.IsEnabled = false;
        }
    }
    fieldChange(event) {
        var contextObj = this;
        for (var i = 0; i < this.fieldDetailsAddEdit.length; i++) {
            if (this.addEdit != "edit" && this.hasFieldValue != true) {
                if (this.fieldDetailsAddEdit[i].FieldId == 361)
                    this.fieldDetailsAddEdit[i].FieldValue = "";
                else if ((this.fieldDetailsAddEdit[i].FieldId == 362 || this.fieldDetailsAddEdit[i].FieldId == 363 || this.fieldDetailsAddEdit[i].FieldId == 364))
                    this.fieldDetailsAddEdit[i].FieldValue = "0";
            }
        }
        //setTimeout(function () {
            contextObj.loadControl(event.ddlRelationShipEvent.ChildFieldObject.FieldValue, contextObj,"changecall");    
       // }, 100);  
    }

    onSubmitData(event) {
        var temp = JSON.parse(event["fieldobject"]);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 24) {
                temp[i]["Value"] = this.CategoryId;
                break;
            }
        }
        event["fieldobject"] = JSON.stringify(temp);
        //check for static field
        var value = temp.find(function (item) { return item.ReportFieldId === 25 })
        var uppervalue = value.Value.toUpperCase()
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
            "PROJECT CATEGORY", "PURCHASED DATE"]

        if (this.CategoryId == "7")
            fields.push("PREFIX");

        var index = fields.indexOf(uppervalue);
        if (index > -1)
            this.notificationService.ShowToaster(value.Value + " is a static field", 2);

        else {
            function findEntity(entity) {
                return entity.ReportFieldId === 3057;
            }
            var contextObj = this;
            if (contextObj.addEdit == "add") {
                var temp = JSON.parse(event["fieldobject"]);
                var isValidated = false;
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 32)
                        if (temp[i]["Value"] == "")
                            temp[i]["Value"] = 0;

                    if (this.CategoryId == "5") {
                        if (temp[i]["ReportFieldId"] == 27 && (temp[i]["Value"] == "true" || temp[i]["Value"] == "True" || temp[i]["Value"] == "1")) {
                            isValidated = true;
                        }

                        if (temp[i]["ReportFieldId"] == 3057 && isValidated == true) {

                            if (temp[i]["Value"] == "69")
                                temp[i]["Value"] = 0;
                            else
                                temp[i]["Value"] = 1;
                        }
                    }
                    else if (temp[i]["ReportFieldId"] == 3057) {
                        var removeArr = [3057];
                        temp = temp.filter(function (item) {
                            return removeArr.indexOf(item.ReportFieldId) == -1;
                        })
                    }
                }
                event["fieldobject"] = JSON.stringify(temp);
                contextObj.administrationService.addAddlDataField(event["fieldobject"]).subscribe(function (resultData) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Additional Data Field added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("Failed to add Data Field", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj.notificationService.ShowToaster("Additional Data Field already exists", 5);
                        }
                    }
                });
            } else if (contextObj.addEdit == "edit") {
                var temp = JSON.parse(event["fieldobject"]);
                if (this.CategoryId == "5") {
                    var isValidated = false;

                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i]["ReportFieldId"] == 27 && (temp[i]["Value"] == "true" || temp[i]["Value"] == "True" || temp[i]["Value"] == "1")) {
                            isValidated = true;
                        }

                        if (temp[i]["ReportFieldId"] == 3057 && isValidated == true) {

                            if (temp[i]["Value"] == "69")
                                temp[i]["Value"] = 0;
                            else
                                temp[i]["Value"] = 1;
                        }
                    }
                }
                else
                {
                    temp.splice(temp.findIndex(findEntity), 1);
                }
                event["fieldobject"] = JSON.stringify(temp);
                var fieldobjMax = new Array<ReportFieldArray>();
                var fieldtype = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 26 })
                fieldobjMax.push({
                    ReportFieldId: 1902,
                    Value: this.selectedId.toString()
                },
                {
                    ReportFieldId: 26,
                    Value: fieldtype.FieldValue
                    })

                this.administrationService.getMaxCharUsed(fieldobjMax).subscribe(function (item) {
                    var maxLengthEntered = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 361 })
                    if (JSON.parse(item.Data.FieldBinderData)[0].MaxLength > maxLengthEntered.FieldValue) {
                        contextObj.notificationService.ShowToaster("Additional Data Field Value greater than the Max Characters Allowed already exists ", 5)
                    }
                    else {

                        contextObj.administrationService.updateAddlDataField(event["fieldobject"], contextObj.selectedId).subscribe(function (resultData) {
                            contextObj.success = (resultData["Data"]);
                            if (contextObj.success["StatusId"] == 1) {
                                contextObj.notificationService.ShowToaster("Additional Data Field updated", 3);
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });

                            }
                            else if (contextObj.success["StatusId"] == 0)
                                contextObj.notificationService.ShowToaster("Failed to update Data Field", 5);
                            else if (contextObj.success["StatusId"] == 3) {
                                if (contextObj.success["ServerId"] == -1) {
                                    contextObj.notificationService.ShowToaster("Additional Data Field already exists", 5);
                                }
                            }
                        });

                    }
                })
            }

        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {

            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, this.CategoryId).
                subscribe(function (resultData) {
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                    var fieldtype = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 26 })
                    var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
                    fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                    for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                        if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 350) {
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        }
                        if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 363) {
                            contextObj.fieldDetailsAddEdit[i]["ReadOnlyMode"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                        }
                        if (contextObj.CategoryId == "5") {
                            if (contextObj.fieldDetailsAddEdit[i].FieldId == 2367) {
                                var tmp = contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[1];
                                contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[1] = contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[0];
                                contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[0] = tmp;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            }
                        }    
                    }
                })
        }
        else if (changes["selectedId"] && changes["CategoryId"] && changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            var fieldobj = new Array<ReportFieldArray>();
            var contextObj = this;
            fieldobj.push({
                ReportFieldId: 24,
                Value: this.CategoryId
            })
            this.btnName = "Save Changes"
            this.administrationService.loadAddlDataFieldAddEdit(this.selectedId, this.addEdit, fieldobj).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];

                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 350) {
                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        //break;
                    }
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 352) {

                        var newlookup = contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = newlookup;

                        //code to validate and filter the field type to be inserted
                        var fieldobj1 = new Array<ReportFieldArray>();
                        fieldobj1.push({
                            ReportFieldId: 16,
                            Value: contextObj.CategoryId
                        })
                        contextObj.administrationService.AdditionalDataFieldHaveLookUp(contextObj.selectedId[0]).subscribe(function (returnData) {
                            if (returnData["Data"] == 1) {
                                contextObj.hasFieldValue = true;
                            }
                            contextObj.administrationService.CheckisinUse(fieldobj1, contextObj.selectedId[0]).subscribe(function (returnCheck) {
                                if (returnCheck["Data"] == 1)
                                    contextObj.isinUse = true;

                                if (contextObj.hasFieldValue == true) {
                                    var validated = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 27 })
                                    var multivalued = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 3057 })
                                    validated.FieldValue = "1";
                                    validated.IsEnabled = false;
                                    multivalued.IsEnabled = false;
                                    contextObj.filterFieldtypeValidation(contextObj.fieldDetailsAddEdit[i]);
                                }
                                else {
                                    if (contextObj.isinUse == true) {
                                        var validated = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 27 })
                                        var multivalued = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 3057 })
                                        validated.FieldValue = "0";
                                        validated.IsEnabled = false;
                                        multivalued.IsEnabled = false;
                                        contextObj.filterFieldtypeInUse(contextObj.fieldDetailsAddEdit[i])
                                    }
                                }
                            })
                        })
                        contextObj.loadControl(contextObj.fieldDetailsAddEdit[i].FieldValue, contextObj,"editcall");
                    }
                    if (contextObj.CategoryId == "5") {
                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2367) {
                            var tmp = contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[1];
                            contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[1] = contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[0];
                            contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues[0] = tmp;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                        }
                    }    
                }
            })
        }
    }

    filterFieldtypeValidation(fieldtype) {
        switch (fieldtype["FieldValue"]) {
            case "5":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 6 && item.Id != 7) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;

            case "4":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 6 && item.Id != 7) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "3":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "2":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 4 && item.Id != 6) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "7":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 6) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "6":
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 5 && item.Id != 7) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                break;

        }
    }
    filterFieldtypeInUse(fieldType) {
        switch (fieldType["FieldValue"]) {
            case "5":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 7) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "6":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4 && item.Id != 5 && item.Id != 7) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "4":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 7) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "3":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "2":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 4 && item.Id != 7) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;
            case "7":
                var newlookup = fieldType["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 3 && item.Id != 4) })
                fieldType["LookupDetails"]["LookupValues"] = newlookup;
                break;

        }
    }

    initiateValidation(fieldObject: IField, contextObj, isValueChanged) {
        if (<HTMLElement>document.getElementById("361")) {
            var el = <HTMLElement>document.getElementById("361");
            var message = contextObj._validateService.validate(fieldObject);
            if (message.length > 0) {
                fieldObject.HasValidationError = true;
            } else {
                fieldObject.HasValidationError = false;
            }
            var attribute = el.getAttribute('class')

            if (fieldObject.NotificationType == null)
                fieldObject.NotificationType = "inline";
            switch (fieldObject.NotificationType) {
                case 'inline':
                    {
                        var span;
                        if (!el.hasAttribute('class')) {
                            el.setAttribute('class', '')
                        }
                        if (el.nextElementSibling != null) {
                            span = el.nextElementSibling;
                            span.innerHTML = "";
                            span.innerHTML = message;
                            span.style.color = "red";
                            span.style.display = "block"
                            span.style.width = "100%"
                            span.style["overflow-x"] = "hidden"
                            span.style["word-wrap"] = "break-word"
                            span.style["font-size"] = "small"
                            if (message == "") {
                                if (el.getAttribute('class').search('ng-invalid') >= 0)
                                    el.setAttribute('class', el.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                                el.style.borderColor = null;
                            }
                            else {
                                if ((el.getAttribute('class').search('ng-invalid') < 0) && (el.getAttribute('class').search('ng-valid') < 0))
                                    el.setAttribute('class', attribute + ' ng-invalid')
                                else
                                    contextObj.el.nativeElement.setAttribute('class', el.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                                el.style.borderColor = "red";
                            }
                        }
                        else {
                            span = document.createElement('span');
                            span.innerHTML = message;
                            el.parentNode.insertBefore(span, contextObj.el.nativeElement.nextSibling);
                            span.style.color = "red";
                            span.style.display = "block"
                            span.style.width = "100%"
                            span.style["overflow-x"] = "hidden"
                            span.style["word-wrap"] = "break-word"
                            span.style["font-size"] = "small"
                            el.style.borderColor = "red";
                            if (message == "") {
                                if (el.getAttribute('class').search('ng-invalid') >= 0)
                                    el.setAttribute('class', el.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                                el.style.borderColor = null;
                            }
                            else {
                                if ((el.getAttribute('class').search('ng-invalid') < 0) && (el.getAttribute('class').search('ng-valid') < 0))
                                    el.setAttribute('class', attribute + ' ng-invalid')
                                else
                                    contextObj.el.nativeElement.setAttribute('class', el.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                            }
                        }
                        //if (this.blnErrorFocused != true) {
                        //    var input = document.getElementById(fieldObject.FieldId.toString());
                        //    if (input != undefined) {
                        //        this._renderer.invokeElementMethod(input, 'focus', []);
                        //        this.blnErrorFocused = true;
                        //    }
                        //}
                        break;
                    }
            }
            fieldObject.IsLocallyValidated = true;
        }
    }

    onChkChange(event) {
        if (this.CategoryId == "5") {
            var isMutivalued = this.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 2367 })
            if (event["chkBoxObject"]["fieldId"] == 364 && event["chkBoxObject"]["IsChecked"] == true) {
                isMutivalued.IsEnabled = true;
                if (isMutivalued.FieldValue == null)
                    isMutivalued.FieldValue = "68";
            }
            if (event["chkBoxObject"]["fieldId"] == 364 && event["chkBoxObject"]["IsChecked"] == false) {
                isMutivalued.FieldValue = null;
                isMutivalued.IsEnabled = false;
            }
        }
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}