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
var http_1 = require('@angular/http');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var stringtextbox_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dynamiclist_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var CateringCustomadd = (function () {
    function CateringCustomadd(SchedulingService, notificationService, generFun, _validateService) {
        this.SchedulingService = SchedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._validateService = _validateService;
        this.Count = [];
        this.IsNeedToSubmit = true;
        this.IsNeedToCallCreation = true;
        this.CateringList = new Array();
        this.CateringCountList = new Array();
        this.Required = new Array();
        this.Optional = new Array();
        this.Cateringvalueforinsert = "";
        this.OriginalCateringvalueforinsert = "";
        this.submitSuccess = new core_1.EventEmitter();
    }
    CateringCustomadd.prototype.ngOnInit = function () {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.IsNeedToCallCreation = true;
        Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(3, 0, 0, 0).subscribe(function (data) {
            Contextobj.CateringSource = JSON.parse(data.Data["FieldBinderData"]);
            var count = 0;
            var count1 = 1;
            if (Contextobj.Cateringdata.length > 0)
                count = Contextobj.Cateringdata.length;
            else if (Contextobj.CateringSource.length > 0)
                count = Contextobj.CateringSource.length;
            Contextobj.Count.push({
                Id: 0
            });
            if (Contextobj.Cateringdata != undefined && Contextobj.Cateringdata.length > 0) {
                for (var i = 0; i < Contextobj.Cateringdata.length; i++) {
                    if (Contextobj.Cateringdata[i].FieldId == 0) {
                        var fieldvalue = Contextobj.Cateringdata[i].InsertValue.split("µ")[0];
                        var Totalcount = Contextobj.Cateringdata[i].InsertValue.split("µ")[1];
                        var Ischecked = Contextobj.Cateringdata[i].InsertValue.split("µ")[2];
                    }
                    else {
                        //var fieldvalue = Contextobj.AmnietySource.find(function (item) { return item.Id === Contextobj.Amenietydata[i].FieldId })
                        var fieldvalue = Contextobj.Cateringdata[i].Value.split("(")[0];
                        var Totalcount = Contextobj.Cateringdata[i].InsertOriginalValue.split("µ")[1];
                        var Ischecked = Contextobj.Cateringdata[i].InsertOriginalValue.split("µ")[2];
                    }
                    var FieldID = Contextobj.Cateringdata[i].FieldId;
                    Contextobj.CateringList.push({
                        FormFieldId: 1,
                        FieldId: FieldID,
                        ReportFieldId: 1,
                        FieldLabel: "Catering Item",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: fieldvalue,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        IsVisible: true,
                        IsEnabled: true,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                    });
                    Contextobj.CateringCountList.push({
                        FormFieldId: 2,
                        FieldId: i,
                        ReportFieldId: i,
                        FieldLabel: "Count",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                        Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                        FieldValue: Totalcount,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        MaxLength: 3,
                        IsVisible: true,
                        IsEnabled: true,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                        Width: "70",
                    });
                }
                if (Contextobj.CateringSource != undefined) {
                    var _loop_1 = function(i) {
                        fieldvalue = Contextobj.Cateringdata.find(function (item) { return item.FieldId === Contextobj.CateringSource[i].Id; });
                        if (fieldvalue == undefined) {
                            Contextobj.CateringList.push({
                                FormFieldId: i,
                                FieldId: Contextobj.CateringSource[i].Id,
                                ReportFieldId: i,
                                FieldLabel: "Catering Item",
                                DataEntryControlId: 1,
                                GenericDataTypeId: 6,
                                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                                Format: { FormatString: null, RegularExpression: null, Id: null },
                                FieldValue: Contextobj.CateringSource[i].Value,
                                LookupDetails: { LookupValues: null, PopupComponent: null },
                                IsMandatory: false,
                                IsVisible: true,
                                IsEnabled: false,
                                IsValidated: false,
                                isContentHtml: "",
                                Precision: 0,
                                Scale: 0,
                                Height: 25,
                                IsSigned: false,
                                RangeFrom: null,
                                RangeTo: null,
                                HelpText: "",
                                IsGrouped: false,
                                HasChild: false,
                                ParentId: 0,
                                IsSubField: false,
                            });
                            Contextobj.CateringCountList.push({
                                FormFieldId: i,
                                FieldId: i,
                                ReportFieldId: i,
                                FieldLabel: "Count",
                                DataEntryControlId: 1,
                                GenericDataTypeId: 5,
                                Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                                Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                                FieldValue: "",
                                LookupDetails: { LookupValues: null, PopupComponent: null },
                                IsMandatory: false,
                                MaxLength: 3,
                                IsVisible: true,
                                IsEnabled: false,
                                IsValidated: false,
                                isContentHtml: "",
                                Precision: 0,
                                Scale: 0,
                                Height: 25,
                                Width: "70",
                                IsSigned: false,
                                RangeFrom: null,
                                RangeTo: null,
                                HelpText: "",
                                IsGrouped: false,
                                HasChild: false,
                                ParentId: 0,
                                IsSubField: false,
                            });
                        }
                    };
                    var fieldvalue;
                    for (var i = 0; i < Contextobj.CateringSource.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            else if (Contextobj.CateringSource != undefined) {
                for (var i = 0; i < Contextobj.CateringSource.length; i++) {
                    Contextobj.CateringList.push({
                        FormFieldId: i,
                        FieldId: Contextobj.CateringSource[i].Id,
                        ReportFieldId: i,
                        FieldLabel: "Catering Item",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: Contextobj.CateringSource[i].Value,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        IsVisible: true,
                        IsEnabled: false,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                    });
                    Contextobj.CateringCountList.push({
                        FormFieldId: i,
                        FieldId: i,
                        ReportFieldId: i,
                        FieldLabel: "Count",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 5,
                        Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                        Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                        FieldValue: "",
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        MaxLength: 3,
                        IsVisible: true,
                        IsEnabled: false,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                        Width: "70",
                    });
                }
                Contextobj.length = count;
            }
            else {
                Contextobj.CateringList.push({
                    FormFieldId: 1,
                    FieldId: 0,
                    ReportFieldId: 1,
                    FieldLabel: "Catering Item",
                    DataEntryControlId: 1,
                    GenericDataTypeId: 6,
                    Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                    Format: { FormatString: null, RegularExpression: null, Id: null },
                    FieldValue: "",
                    LookupDetails: { LookupValues: null, PopupComponent: null },
                    IsMandatory: false,
                    IsVisible: true,
                    IsEnabled: true,
                    IsValidated: false,
                    isContentHtml: "",
                    Precision: 0,
                    Scale: 0,
                    Height: 25,
                    IsSigned: false,
                    RangeFrom: null,
                    RangeTo: null,
                    HelpText: "",
                    IsGrouped: false,
                    HasChild: false,
                    ParentId: 0,
                    IsSubField: false,
                });
                Contextobj.CateringCountList.push({
                    FormFieldId: 2,
                    FieldId: 2,
                    ReportFieldId: 2,
                    FieldLabel: "Count",
                    DataEntryControlId: 1,
                    GenericDataTypeId: 6,
                    Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                    Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                    FieldValue: "",
                    LookupDetails: { LookupValues: null, PopupComponent: null },
                    IsMandatory: false,
                    MaxLength: 3,
                    IsVisible: true,
                    IsEnabled: false,
                    IsValidated: false,
                    isContentHtml: "",
                    Precision: 0,
                    Scale: 0,
                    Height: 25,
                    IsSigned: false,
                    RangeFrom: null,
                    RangeTo: null,
                    HelpText: "",
                    IsGrouped: false,
                    HasChild: false,
                    ParentId: 0,
                    IsSubField: false,
                    Width: "70",
                });
                Contextobj.length = count;
            }
            Contextobj.length = count;
        });
        //Contextobj.aftercreation();                
    };
    CateringCustomadd.prototype.ngAfterViewChecked = function () {
        var Contextobj = this;
        if (Contextobj.CateringCountList.length > 0 && Contextobj.Cateringdata.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    };
    CateringCustomadd.prototype.onCateringAdd = function (event, Amenitytable) {
        var Contextobj = this;
        var count;
        var count1 = 1;
        //if (Contextobj.Amenietydata.length > 0)
        //    count = Contextobj.Amenietydata.length;
        //else if (Contextobj.AmnietySource.length > 0)
        //    count = Contextobj.AmnietySource.length;
        //else
        //    count = 0;
        if (Contextobj.CateringList.length > 0 && Contextobj.CateringList[Contextobj.CateringList.length - 1].FieldValue != "") {
            Contextobj.Count.push({
                Id: Contextobj.length++
            });
            Contextobj.CateringList.push({
                FormFieldId: Contextobj.length,
                FieldId: 0,
                ReportFieldId: Contextobj.length,
                FieldLabel: "Catering Item",
                DataEntryControlId: 1,
                GenericDataTypeId: 6,
                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                Format: { FormatString: null, RegularExpression: null, Id: null },
                FieldValue: "",
                LookupDetails: { LookupValues: null, PopupComponent: null },
                IsMandatory: false,
                IsVisible: true,
                IsEnabled: true,
                IsValidated: false,
                isContentHtml: "",
                Precision: 0,
                Scale: 0,
                Height: 25,
                IsSigned: false,
                RangeFrom: null,
                RangeTo: null,
                HelpText: "",
                IsGrouped: false,
                HasChild: false,
                ParentId: 0,
                IsSubField: false,
            });
            Contextobj.CateringCountList.push({
                FormFieldId: count1++,
                FieldId: count1++,
                ReportFieldId: count1++,
                FieldLabel: "",
                DataEntryControlId: 1,
                GenericDataTypeId: 5,
                Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                FieldValue: "",
                LookupDetails: { LookupValues: null, PopupComponent: null },
                IsMandatory: false,
                MaxLength: 3,
                IsVisible: true,
                IsEnabled: false,
                IsValidated: false,
                isContentHtml: "",
                Precision: 0,
                Scale: 0,
                Height: 25,
                IsSigned: false,
                RangeFrom: null,
                RangeTo: null,
                HelpText: "",
                IsGrouped: false,
                HasChild: false,
                ParentId: 0,
                IsSubField: false,
                Width: "70",
            });
            Contextobj.length = Contextobj.length;
        }
    };
    CateringCustomadd.prototype.OnsubmitValue = function (event, Catering) {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.length = Contextobj.CateringList.length;
        var validationno = 0;
        var arrayList2 = new Array();
        var Cateringtxtbox = "txtCatering";
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        var txtCount = "txtCount";
        var chekboxname;
        var Required;
        var tempvalues;
        var temporiginalvalues = "";
        var temparrayvalue;
        for (var i = 0; i < Contextobj.length; i++) {
            var Cateringdetails = document.getElementById(Cateringtxtbox + i.toString());
            if (Contextobj.CateringList[i].FieldId != undefined && Contextobj.CateringList[i].FieldId > 0) {
                var CateringIdvalue = Contextobj.CateringList[i].FieldId;
                var Cateringtextvalue = Contextobj.CateringList[i].FieldValue;
            }
            else {
                if (Contextobj.CateringList[i].FieldValue != "")
                    var CateringIdvalue = Contextobj.CateringList[i].FieldId;
                var Cateringtextvalue = Contextobj.CateringList[i].FieldValue;
            }
            var chkRequireddetails = document.getElementById(chkRequired + i.toString());
            var chkRequiredvalue = chkRequireddetails.checked;
            var chkOptionaldetails = document.getElementById(chkOptional + i.toString());
            var chkOptionalvalue = chkOptionaldetails.checked;
            var txtCountdetails = document.getElementById(txtCount + i.toString());
            if (Contextobj.CateringCountList[i].FieldValue != "")
                var txtCountvalue = Contextobj.CateringCountList[i].FieldValue;
            if (Contextobj.CateringList[i].HasValidationError == false && Contextobj.CateringCountList[i].HasValidationError == false) {
                if (Cateringtextvalue == "" || chkRequiredvalue == false && chkOptionalvalue == false) {
                    if (Cateringtextvalue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 1;
                    }
                    if (Contextobj.CateringList[i].FieldId == 0) {
                        if (chkRequiredvalue == false && chkOptionalvalue == false) {
                            Contextobj.IsNeedToSubmit = false;
                            validationno = 2;
                        }
                    }
                    if (Cateringtextvalue == "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                        validationno = 0;
                        Contextobj.IsNeedToSubmit = true;
                        if (Contextobj.CateringList[i].FieldId > 0) {
                            if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                Contextobj.IsNeedToSubmit = false;
                                validationno = 2;
                            }
                        }
                    }
                    else {
                        if (Cateringtextvalue != "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                            validationno = 0;
                            Contextobj.IsNeedToSubmit = true;
                            if (Contextobj.CateringList[i].FieldId > 0) {
                                if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                    Contextobj.IsNeedToSubmit = false;
                                    validationno = 2;
                                }
                            }
                        }
                    }
                }
                else {
                    if (chkRequiredvalue == true && chkOptionalvalue == false) {
                        Required = "true";
                        chekboxname = "Required";
                    }
                    else {
                        Required = "false";
                        chekboxname = "Optional";
                    }
                    if ((chkRequiredvalue == true || chkOptionalvalue == true) && Contextobj.CateringCountList[i].FieldValue == "")
                        txtCountvalue = "1";
                    if (CateringIdvalue != undefined && CateringIdvalue > 0) {
                        temporiginalvalues = CateringIdvalue + "µ" + txtCountvalue + "µ" + Required + "µ§";
                        tempvalues = "";
                    }
                    else {
                        tempvalues = Cateringtextvalue + "µ" + txtCountvalue + "µ" + Required + "µ§";
                        temporiginalvalues = "";
                    }
                    temparrayvalue = Cateringtextvalue + " (Count-" + txtCountvalue + ", " + chekboxname + ")";
                    arrayList2.push({
                        Id: i,
                        Value: temparrayvalue,
                        InsertValue: tempvalues,
                        InsertOriginalValue: temporiginalvalues,
                        FieldId: CateringIdvalue
                    });
                    if (CateringIdvalue != undefined && CateringIdvalue > 0)
                        Contextobj.OriginalCateringvalueforinsert = Contextobj.OriginalCateringvalueforinsert + temporiginalvalues;
                    else
                        Contextobj.Cateringvalueforinsert = Contextobj.Cateringvalueforinsert + tempvalues;
                }
                if (arrayList2.length > 0)
                    Contextobj.IsNeedToSubmit = true;
                else if (i == (Contextobj.length - 1) && arrayList2.length == 0) {
                    Contextobj.IsNeedToSubmit = false;
                    validationno = 2;
                }
            }
            else
                Contextobj.IsNeedToSubmit = false;
        }
        if (Contextobj.IsNeedToSubmit == true) {
            var InsertValues = [];
            var uniquesData = [];
            var tempcateringdata = [];
            tempcateringdata = arrayList2;
            var index;
            for (var j = 0; j < tempcateringdata.length; j++) {
                index = InsertValues.indexOf(tempcateringdata[j].Value);
                if (index == -1) {
                    InsertValues.push(tempcateringdata[j].Value);
                    uniquesData.push(tempcateringdata[j]);
                }
                else {
                    uniquesData[index].DIFF += tempcateringdata[j].DIFF;
                    var temptxtvalue = tempcateringdata[j].Value.split("(")[0].trim();
                }
            }
            tempcateringdata = uniquesData;
            if (arrayList2.length == tempcateringdata.length)
                Contextobj.submitSuccess.emit({ "Cateringvalue": Contextobj.Cateringvalueforinsert, "arrayList": arrayList2, "OriginalCateringvalue": Contextobj.OriginalCateringvalueforinsert });
            else
                Contextobj.notificationService.ShowToaster("Catering Item(" + temptxtvalue + ")already exists", 2);
        }
        else if (Contextobj.IsNeedToSubmit == false) {
            if (validationno == 1) {
                Contextobj.notificationService.ShowToaster("Enter a Catering Item", 2);
                validationno = 0;
            }
            else if (validationno == 2) {
                Contextobj.notificationService.ShowToaster("Select a Catering", 2);
                validationno = 0;
            }
        }
    };
    CateringCustomadd.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    CateringCustomadd.prototype.txtBoxChange = function (event) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
        /* event.fieldObject.IsLocallyValidated = false;
         this.initiateValidation(event.fieldObject);       */
        //}
    };
    CateringCustomadd.prototype.aftercreation = function () {
        var Contextobj = this;
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        for (var i = 0; i < Contextobj.Cateringdata.length; i++) {
            if (Contextobj.Cateringdata[i].FieldId == 0) {
                var fieldvalue = Contextobj.Cateringdata[i].InsertValue.split("µ")[0];
                var Totalcount = Contextobj.Cateringdata[i].InsertValue.split("µ")[1];
                var Ischecked = Contextobj.Cateringdata[i].InsertValue.split("µ")[2];
            }
            else {
                Contextobj.CateringList[i].IsEnabled = false;
                var fieldvalue = Contextobj.Cateringdata[i].InsertOriginalValue.split("µ")[0];
                var Totalcount = Contextobj.Cateringdata[i].InsertOriginalValue.split("µ")[1];
                var Ischecked = Contextobj.Cateringdata[i].InsertOriginalValue.split("µ")[2];
            }
            var chkRequireddetails = document.getElementById(chkRequired + i.toString());
            var chkOptionaldetails = document.getElementById(chkOptional + i.toString());
            if (Ischecked == "true") {
                chkRequireddetails.checked = true;
                chkOptionaldetails.disabled = true;
            }
            else {
                chkOptionaldetails.checked = true;
                chkRequireddetails.disabled = true;
            }
        }
        Contextobj.IsNeedToCallCreation = false;
    };
    CateringCustomadd.prototype.rbnclick = function (event, tr) {
        var contextObj = this;
        var id = parseInt(tr.id);
        for (var i = 0; i < contextObj.CateringCountList.length; i++) {
            contextObj.CateringCountList[id].IsEnabled = true;
            contextObj.CateringCountList[id].FieldValue = "1";
        }
    };
    CateringCustomadd.prototype.chkRequiredclick = function (event) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var ChkOptionalId = tempid.replace("chkRequired", "chkOptional");
        var ChkOptional = document.getElementById(ChkOptionalId);
        if (Ischecked == true)
            ChkOptional.disabled = true;
        else
            ChkOptional.disabled = false;
        var Id = event["target"].id.split("d")[1];
        for (var i = 0; i < contextObj.CateringCountList.length; i++) {
            if (Ischecked == true) {
                contextObj.CateringCountList[parseInt(Id)].IsEnabled = true;
                contextObj.CateringCountList[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.CateringCountList[parseInt(Id)].IsEnabled = false;
                contextObj.CateringCountList[parseInt(Id)].FieldValue = "";
            }
        }
    };
    CateringCustomadd.prototype.chkOptionalclick = function (event) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var chkRequiredId = tempid.replace("chkOptional", "chkRequired");
        var chkRequired = document.getElementById(chkRequiredId);
        if (Ischecked == true)
            chkRequired.disabled = true;
        else
            chkRequired.disabled = false;
        var Id = event["target"].id.split("l")[1];
        for (var i = 0; i < contextObj.CateringCountList.length; i++) {
            if (Ischecked == true) {
                contextObj.CateringCountList[parseInt(Id)].IsEnabled = true;
                contextObj.CateringCountList[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.CateringCountList[parseInt(Id)].IsEnabled = false;
                contextObj.CateringCountList[parseInt(Id)].FieldValue = "";
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CateringCustomadd.prototype, "Cateringdata", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CateringCustomadd.prototype, "submitSuccess", void 0);
    CateringCustomadd = __decorate([
        core_1.Component({
            selector: 'Catering-listCustomadd',
            templateUrl: './app/Views/Scheduling/Room Booking/Catering-listCustomadd.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], CateringCustomadd);
    return CateringCustomadd;
}());
exports.CateringCustomadd = CateringCustomadd;
//# sourceMappingURL=Catering-listCustomadd.component.js.map