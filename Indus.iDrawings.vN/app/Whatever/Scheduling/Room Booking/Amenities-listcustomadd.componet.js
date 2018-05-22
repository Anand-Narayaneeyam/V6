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
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var AmenitiesCustomadd = (function () {
    function AmenitiesCustomadd(SchedulingService, notificationService, generFun, _validateService) {
        this.SchedulingService = SchedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._validateService = _validateService;
        this.Count = [];
        this.IsNeedToSubmit = true;
        this.IsNeedToCallCreation = true;
        this.arrayList = new Array();
        this.arrayList1 = new Array();
        this.Required = new Array();
        this.Optional = new Array();
        this.Amnietyvalueforinsert = "";
        this.OriginalAmnietyvalueforinsert = "";
        this.submitSuccess = new core_1.EventEmitter();
    }
    AmenitiesCustomadd.prototype.ngOnInit = function () {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.IsNeedToCallCreation = true;
        Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(1, Contextobj.SpaceId, Contextobj.SelectedFloorId, 0).subscribe(function (data) {
            Contextobj.AmnietySource = JSON.parse(data.Data["FieldBinderData"]);
            Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(1, Contextobj.SpaceId, 0, 0).subscribe(function (tempdata) {
                Contextobj.tempAmnietySource = JSON.parse(tempdata.Data["FieldBinderData"]);
                //if (Contextobj.AmnietySource.length == 0)
                //    Contextobj.AmnietySource = Contextobj.tempAmnietySource;
                var count = 0;
                var count1 = 1;
                if (Contextobj.Amenietydata.length > 0)
                    count = Contextobj.Amenietydata.length;
                else if (Contextobj.AmnietySource.length > 0)
                    count = Contextobj.AmnietySource.length;
                Contextobj.Count.push({
                    Id: 0
                });
                if (Contextobj.Amenietydata != undefined && Contextobj.Amenietydata.length > 0) {
                    for (var i = 0; i < Contextobj.Amenietydata.length; i++) {
                        if (Contextobj.Amenietydata[i].FieldId == 0) {
                            var fieldvalue = Contextobj.Amenietydata[i].InsertValue.split("µ")[0];
                            var Totalcount = Contextobj.Amenietydata[i].InsertValue.split("µ")[1];
                            var Ischecked = Contextobj.Amenietydata[i].InsertValue.split("µ")[2];
                        }
                        else {
                            //var fieldvalue = Contextobj.AmnietySource.find(function (item) { return item.Id === Contextobj.Amenietydata[i].FieldId })
                            var fieldvalue = Contextobj.Amenietydata[i].Value.split("(")[0];
                            var Totalcount = Contextobj.Amenietydata[i].InsertOriginalValue.split("µ")[1];
                            var Ischecked = Contextobj.Amenietydata[i].InsertOriginalValue.split("µ")[2];
                        }
                        var FieldID = Contextobj.Amenietydata[i].FieldId;
                        Contextobj.arrayList.push({
                            FormFieldId: 1,
                            FieldId: FieldID,
                            ReportFieldId: 1,
                            FieldLabel: "Amenity",
                            DataEntryControlId: 1,
                            GenericDataTypeId: 6,
                            Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                            Format: { FormatString: null, RegularExpression: null, Id: null },
                            FieldValue: fieldvalue,
                            LookupDetails: { LookupValues: null, PopupComponent: null },
                            IsMandatory: false,
                            MaxLength: 100,
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
                        Contextobj.arrayList1.push({
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
                    if (Contextobj.AmnietySource != undefined && Contextobj.AmnietySource.length > 0) {
                        var _loop_1 = function(i) {
                            fieldvalue = Contextobj.Amenietydata.find(function (item) { return item.FieldId === Contextobj.AmnietySource[i].Id; });
                            if (fieldvalue == undefined) {
                                Contextobj.arrayList.push({
                                    FormFieldId: i,
                                    FieldId: Contextobj.AmnietySource[i].Id,
                                    ReportFieldId: i,
                                    FieldLabel: "Amenity",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 6,
                                    Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                                    Format: { FormatString: null, RegularExpression: null, Id: null },
                                    FieldValue: Contextobj.AmnietySource[i].Value,
                                    IsMandatory: false,
                                    MaxLength: 100,
                                    LookupDetails: { LookupValues: null, PopupComponent: null },
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
                                Contextobj.arrayList1.push({
                                    FormFieldId: i,
                                    FieldId: i,
                                    ReportFieldId: i,
                                    FieldLabel: "Count",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 5,
                                    Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                                    Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                                    FieldValue: "",
                                    IsMandatory: false,
                                    LookupDetails: { LookupValues: null, PopupComponent: null },
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
                        for (var i = 0; i < Contextobj.AmnietySource.length; i++) {
                            _loop_1(i);
                        }
                    }
                }
                else if (Contextobj.AmnietySource != undefined && Contextobj.AmnietySource.length > 0) {
                    for (var i = 0; i < Contextobj.AmnietySource.length; i++) {
                        Contextobj.arrayList.push({
                            FormFieldId: i,
                            FieldId: Contextobj.AmnietySource[i].Id,
                            ReportFieldId: i,
                            FieldLabel: "Amenity",
                            DataEntryControlId: 1,
                            GenericDataTypeId: 6,
                            Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                            Format: { FormatString: null, RegularExpression: null, Id: null },
                            FieldValue: Contextobj.AmnietySource[i].Value,
                            IsMandatory: false,
                            MaxLength: 100,
                            LookupDetails: { LookupValues: null, PopupComponent: null },
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
                        Contextobj.arrayList1.push({
                            FormFieldId: i,
                            FieldId: i,
                            ReportFieldId: i,
                            FieldLabel: "Count",
                            DataEntryControlId: 1,
                            GenericDataTypeId: 5,
                            Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                            Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                            FieldValue: "",
                            IsMandatory: false,
                            LookupDetails: { LookupValues: null, PopupComponent: null },
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
                    Contextobj.arrayList.push({
                        FormFieldId: 1,
                        FieldId: 0,
                        ReportFieldId: 1,
                        FieldLabel: "Amenity",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: "",
                        IsMandatory: false,
                        MaxLength: 100,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
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
                    Contextobj.arrayList1.push({
                        FormFieldId: 2,
                        FieldId: 2,
                        ReportFieldId: 2,
                        FieldLabel: "Count",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                        Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                        FieldValue: "",
                        IsMandatory: false,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
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
                    Contextobj.Required.push({
                        FormFieldId: 3,
                        FieldId: 1,
                        ReportFieldId: 1,
                        FieldLabel: "Required",
                        DataEntryControlId: 6,
                        GenericDataTypeId: 1,
                        Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\s\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: "",
                        IsMandatory: false,
                        IsVisible: true,
                        ReadOnlyMode: false,
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
                    Contextobj.Optional.push({
                        FormFieldId: 4,
                        FieldId: 2,
                        ReportFieldId: 2,
                        FieldLabel: "Optional",
                        DataEntryControlId: 6,
                        GenericDataTypeId: 1,
                        Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\s\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: "",
                        IsMandatory: false,
                        MaxLength: 3,
                        IsVisible: true,
                        IsEnabled: true,
                        IsValidated: false,
                        ReadOnlyMode: false,
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
                    Contextobj.length = count;
                }
                //}
                //if (Contextobj.Amenietydata != undefined) {
                //    for (let i = 0; i < Contextobj.Amenietydata.length; i++) {
                //        var fieldvalue = Contextobj.Amenietydata[i].InsertValue.split("µ")[0];
                //        var Totalcount = Contextobj.Amenietydata[i].InsertValue.split("µ")[1];
                //        var Ischecked = Contextobj.Amenietydata[i].InsertValue.split("µ")[2];
                //        Contextobj.arrayList.push({
                //            FormFieldId: 1,
                //            FieldId: i,
                //            ReportFieldId: 0,
                //            FieldLabel: "",
                //            DataEntryControlId: 1,
                //            GenericDataTypeId: 6,
                //            Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&*()+=\\s\\:.,/?[\\]_-]+$" },
                //            FieldValue: "",
                //            IsMandatory: false,
                //            IsVisible: true,
                //            IsEnabled: true,
                //            IsValidated: false,
                //            isContentHtml: "",
                //            Precision: 0,
                //            Scale: 0,
                //            Height: 25,
                //            IsSigned: false,
                //            RangeFrom: null,
                //            RangeTo: null,
                //            HelpText: "",
                //            IsGrouped: false,
                //            HasChild: false,
                //            ParentId: 0,
                //            IsSubField: false,
                //        });
                //        Contextobj.arrayList1.push({
                //            FormFieldId: 2,
                //            FieldId: i,
                //            ReportFieldId: 1,
                //            FieldLabel: "",
                //            DataEntryControlId: 1,
                //            GenericDataTypeId: 6,
                //            Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                //            FieldValue: "",
                //            IsMandatory: false,
                //            IsVisible: true,
                //            IsEnabled: true,
                //            IsValidated: false,
                //            isContentHtml: "",
                //            Precision: 0,
                //            Scale: 0,
                //            Height: 25,
                //            IsSigned: false,
                //            RangeFrom: null,
                //            RangeTo: null,
                //            HelpText: "",
                //            IsGrouped: false,
                //            HasChild: false,
                //            ParentId: 0,
                //            IsSubField: false,
                //        });
                //        Contextobj.arrayList[i].FieldValue = "Hi";
                //    }
                //}
                Contextobj.length = count;
            });
        });
        //Contextobj.aftercreation();                
    };
    AmenitiesCustomadd.prototype.ngAfterViewChecked = function () {
        var Contextobj = this;
        if (Contextobj.arrayList1.length > 0 && Contextobj.Amenietydata.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    };
    AmenitiesCustomadd.prototype.onAmenityAdd = function (event, Amenitytable) {
        var Contextobj = this;
        var count;
        var count1 = 1;
        //if (Contextobj.Amenietydata.length > 0)
        //    count = Contextobj.Amenietydata.length;
        //else if (Contextobj.AmnietySource.length > 0)
        //    count = Contextobj.AmnietySource.length;
        //else
        //    count = 0;
        if (Contextobj.arrayList.length > 0 && Contextobj.arrayList[Contextobj.arrayList.length - 1].FieldValue != "") {
            Contextobj.Count.push({
                Id: Contextobj.length++
            });
            Contextobj.arrayList.push({
                FormFieldId: Contextobj.length,
                FieldId: 0,
                ReportFieldId: Contextobj.length,
                FieldLabel: "Amenity",
                DataEntryControlId: 1,
                GenericDataTypeId: 6,
                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                Format: { FormatString: null, RegularExpression: null, Id: null },
                FieldValue: "",
                LookupDetails: { LookupValues: null, PopupComponent: null },
                IsMandatory: false,
                MaxLength: 100,
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
            Contextobj.arrayList1.push({
                FormFieldId: count1++,
                FieldId: count1++,
                ReportFieldId: count1++,
                FieldLabel: "Count",
                LookupDetails: { LookupValues: null, PopupComponent: null },
                DataEntryControlId: 1,
                GenericDataTypeId: 5,
                Whitelist: { Id: 5, FormatString: "", RegularExpression: "^[0-9]+$" },
                Format: { FormatString: "Integer", RegularExpression: "^[0-9,]+$", Id: 7 },
                FieldValue: "",
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
    AmenitiesCustomadd.prototype.OnsubmitValue = function (event, Amenitytable) {
        var Contextobj = this;
        Contextobj.length = Contextobj.arrayList.length;
        Contextobj.IsNeedToSubmit = true;
        var validationno = 0;
        var arrayList2 = new Array();
        var Tesxtvalue = new Array();
        var Amenitytxtbox = "txtAmenity";
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        var txtCount = "txtCount";
        var chekboxname;
        var Required;
        var tempvalues;
        var temporiginalvalues = "";
        var temparrayvalue;
        for (var i = 0; i < Contextobj.length; i++) {
            var Amenitydetails = document.getElementById(Amenitytxtbox + i.toString());
            if (Contextobj.arrayList[i].FieldId != undefined && Contextobj.arrayList[i].FieldId > 0) {
                var AmenityIdvalue = Contextobj.arrayList[i].FieldId;
                var Amenitytextvalue = Contextobj.arrayList[i].FieldValue;
            }
            else {
                if (Contextobj.arrayList[i].FieldValue != "")
                    var AmenityIdvalue = Contextobj.arrayList[i].FieldId;
                var Amenitytextvalue = Contextobj.arrayList[i].FieldValue;
            }
            var chkRequireddetails = document.getElementById(chkRequired + i.toString());
            var chkRequiredvalue = chkRequireddetails.checked;
            var chkOptionaldetails = document.getElementById(chkOptional + i.toString());
            var chkOptionalvalue = chkOptionaldetails.checked;
            var txtCountdetails = document.getElementById(txtCount + i.toString());
            if (Contextobj.arrayList1[i].FieldValue != "")
                var txtCountvalue = Contextobj.arrayList1[i].FieldValue;
            if (Contextobj.arrayList[i].HasValidationError == false && Contextobj.arrayList1[i].HasValidationError == false) {
                if (Amenitytextvalue == "" || chkRequiredvalue == false && chkOptionalvalue == false) {
                    if (Amenitytextvalue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 1;
                    }
                    if (Contextobj.arrayList[i].FieldId == 0) {
                        if (chkRequiredvalue == false && chkOptionalvalue == false) {
                            Contextobj.IsNeedToSubmit = false;
                            validationno = 2;
                        }
                    }
                    if (Amenitytextvalue == "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                        validationno = 0;
                        Contextobj.IsNeedToSubmit = true;
                        if (Contextobj.arrayList[i].FieldId > 0) {
                            if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                Contextobj.IsNeedToSubmit = false;
                                validationno = 2;
                            }
                        }
                    }
                    else {
                        if (Amenitytextvalue != "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                            validationno = 0;
                            Contextobj.IsNeedToSubmit = true;
                            if (Contextobj.arrayList[i].FieldId == 0) {
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
                    if ((chkRequiredvalue == true || chkOptionalvalue == true) && Contextobj.arrayList1[i].FieldValue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 3;
                    }
                    if (validationno == 0) {
                        if (AmenityIdvalue != undefined && AmenityIdvalue > 0) {
                            temporiginalvalues = AmenityIdvalue + "µ" + txtCountvalue + "µ" + Required + "µ§";
                            tempvalues = "";
                        }
                        else {
                            tempvalues = Amenitytextvalue + "µ" + txtCountvalue + "µ" + Required + "µ§";
                            temporiginalvalues = "";
                        }
                        temparrayvalue = Amenitytextvalue + " (Count-" + txtCountvalue + ", " + chekboxname + ")";
                        arrayList2.push({
                            Id: i,
                            Value: temparrayvalue,
                            InsertValue: tempvalues,
                            InsertOriginalValue: temporiginalvalues,
                            FieldId: AmenityIdvalue
                        });
                        Tesxtvalue.push({
                            Value: Amenitytextvalue
                        });
                        if (AmenityIdvalue != undefined && AmenityIdvalue > 0)
                            Contextobj.OriginalAmnietyvalueforinsert = Contextobj.OriginalAmnietyvalueforinsert + temporiginalvalues;
                        else
                            Contextobj.Amnietyvalueforinsert = Contextobj.Amnietyvalueforinsert + tempvalues;
                    }
                }
                if (validationno == 0) {
                    if (arrayList2.length > 0)
                        Contextobj.IsNeedToSubmit = true;
                    else if (i == (Contextobj.length - 1) && arrayList2.length == 0) {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 2;
                    }
                }
            }
            else
                Contextobj.IsNeedToSubmit = false;
        }
        if (Contextobj.IsNeedToSubmit == true) {
            var InsertValues = [];
            var uniquesData = [];
            var temamnitydata = [];
            temamnitydata = Tesxtvalue;
            var index;
            for (var j = 0; j < temamnitydata.length; j++) {
                index = InsertValues.indexOf(temamnitydata[j].Value);
                if (index == -1) {
                    InsertValues.push(temamnitydata[j].Value);
                    uniquesData.push(temamnitydata[j]);
                }
                else {
                    uniquesData[index].DIFF += temamnitydata[j].DIFF;
                    var temptxtvalue = temamnitydata[j].Value.split("(")[0].trim();
                }
            }
            temamnitydata = uniquesData;
            if (arrayList2.length == temamnitydata.length)
                Contextobj.submitSuccess.emit({ "Amenityvalue": Contextobj.Amnietyvalueforinsert, "arrayList": arrayList2, "OriginalAmnietyvalue": Contextobj.OriginalAmnietyvalueforinsert });
            else
                Contextobj.notificationService.ShowToaster("Amenity Item(" + temptxtvalue + ") already exists", 2);
        }
        else if (Contextobj.IsNeedToSubmit == false) {
            if (validationno == 1) {
                Contextobj.notificationService.ShowToaster("Enter an Amenity Item", 2);
                validationno = 0;
            }
            else if (validationno == 2) {
                Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
                validationno = 0;
            }
            else if (validationno == 3) {
                Contextobj.notificationService.ShowToaster("Enter a Value for Count", 2);
                validationno = 0;
            }
        }
    };
    AmenitiesCustomadd.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    AmenitiesCustomadd.prototype.txtBoxChange = function (event) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
        /* event.fieldObject.IsLocallyValidated = false;
         this.initiateValidation(event.fieldObject);       */
        //}
    };
    AmenitiesCustomadd.prototype.aftercreation = function () {
        var Contextobj = this;
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        for (var i = 0; i < Contextobj.Amenietydata.length; i++) {
            if (Contextobj.Amenietydata[i].FieldId == 0) {
                var fieldvalue = Contextobj.Amenietydata[i].InsertValue.split("µ")[0];
                var Totalcount = Contextobj.Amenietydata[i].InsertValue.split("µ")[1];
                var Ischecked = Contextobj.Amenietydata[i].InsertValue.split("µ")[2];
            }
            else {
                Contextobj.arrayList[i].IsEnabled = false;
                var fieldvalue = Contextobj.Amenietydata[i].InsertOriginalValue.split("µ")[0];
                var Totalcount = Contextobj.Amenietydata[i].InsertOriginalValue.split("µ")[1];
                var Ischecked = Contextobj.Amenietydata[i].InsertOriginalValue.split("µ")[2];
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
    AmenitiesCustomadd.prototype.rbnclick = function (event, tr) {
        var contextObj = this;
        var id = parseInt(tr.id);
        for (var i = 0; i < contextObj.arrayList1.length; i++) {
            contextObj.arrayList1[id].IsEnabled = true;
            contextObj.arrayList1[id].FieldValue = "1";
        }
    };
    AmenitiesCustomadd.prototype.chkRequiredclick = function (event) {
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
        for (var i = 0; i < contextObj.arrayList1.length; i++) {
            if (Ischecked == true) {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = true;
                contextObj.arrayList1[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = false;
                contextObj.arrayList1[parseInt(Id)].FieldValue = "";
            }
        }
    };
    AmenitiesCustomadd.prototype.chkOptionalclick = function (event) {
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
        for (var i = 0; i < contextObj.arrayList1.length; i++) {
            if (Ischecked == true) {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = true;
                contextObj.arrayList1[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = false;
                contextObj.arrayList1[parseInt(Id)].FieldValue = "";
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AmenitiesCustomadd.prototype, "Amenietydata", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AmenitiesCustomadd.prototype, "SpaceId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AmenitiesCustomadd.prototype, "SelectedFloorId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AmenitiesCustomadd.prototype, "submitSuccess", void 0);
    AmenitiesCustomadd = __decorate([
        core_1.Component({
            selector: 'Amenities-listforCustomadd',
            templateUrl: './app/Views/Scheduling/Room Booking/Amenities-listcustomadd.componet.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent, checkboxcomponent_component_1.CustomCheckBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], AmenitiesCustomadd);
    return AmenitiesCustomadd;
}());
exports.AmenitiesCustomadd = AmenitiesCustomadd;
//# sourceMappingURL=Amenities-listcustomadd.componet.js.map