import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, AfterViewChecked, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {StringTextBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DynamicListComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';

@Component({
    selector: 'Amenities-listforCustomadd',
    templateUrl: './app/Views/Scheduling/Room Booking/Amenities-listcustomadd.componet.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, StringTextBoxComponent, CustomCheckBoxComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions, ValidateService],    
})

export class AmenitiesCustomadd implements AfterViewChecked, OnInit {
    Count: Count[] = [];
    length: number
    IsNeedToSubmit: boolean = true;
    IsNeedToCallCreation: boolean = true;
    tableRowCount: number;
    fieldObject: IField[];   
    AmnietySource: any[];
    tempAmnietySource: any[];
    arrayList = new Array<IField>();
    arrayList1 = new Array<IField>();
    Required = new Array<IField>();
    Optional = new Array<IField>();
    Amnietyvalueforinsert: string = "";
    OriginalAmnietyvalueforinsert: string = "";
    Amnietyvalueforshow: string;
    @Input() Amenietydata: any[];
    @Input() SpaceId: number;
    @Input() SelectedFloorId: number;
    @Output() submitSuccess = new EventEmitter();
    constructor(private SchedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private _validateService: ValidateService) { }
    ngOnInit() {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true; 
        Contextobj.IsNeedToCallCreation = true; 
        Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(1, Contextobj.SpaceId, Contextobj.SelectedFloorId, 0).subscribe(function (data) {
            Contextobj.AmnietySource = JSON.parse(data.Data["FieldBinderData"]);           
            Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(1, Contextobj.SpaceId, 0, 0).subscribe(function (tempdata) {
                Contextobj.tempAmnietySource = JSON.parse(tempdata.Data["FieldBinderData"]);
                //if (Contextobj.AmnietySource.length == 0)
                //    Contextobj.AmnietySource = Contextobj.tempAmnietySource;
            var count = 0
            var count1 = 1;
            if (Contextobj.Amenietydata.length > 0)
                count = Contextobj.Amenietydata.length;
            else if (Contextobj.AmnietySource.length > 0)
                count = Contextobj.AmnietySource.length;
        Contextobj.Count.push({
            Id: 0
        })
            if (Contextobj.Amenietydata != undefined && Contextobj.Amenietydata.length > 0) {
                for (let i = 0; i < Contextobj.Amenietydata.length; i++) {
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
                if (Contextobj.AmnietySource != undefined && Contextobj.AmnietySource.length>0) {
                    for (let i = 0; i < Contextobj.AmnietySource.length; i++) {
                        var fieldvalue = Contextobj.Amenietydata.find(function (item) { return item.FieldId === Contextobj.AmnietySource[i].Id });
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
                    }
                }
            }
            else if (Contextobj.AmnietySource != undefined && Contextobj.AmnietySource.length > 0) {
                for (let i = 0; i < Contextobj.AmnietySource.length; i++) {
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
    }
    ngAfterViewChecked() {
        var Contextobj = this;
        if (Contextobj.arrayList1.length > 0 && Contextobj.Amenietydata.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    }
    onAmenityAdd(event: any, Amenitytable) {
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
            })
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
    }
    OnsubmitValue(event: any, Amenitytable) {
        var Contextobj = this;
        Contextobj.length = Contextobj.arrayList.length;
        Contextobj.IsNeedToSubmit = true;
        var validationno = 0;
        var arrayList2 = new Array<ReportFieldArray>(); 
        var Tesxtvalue = new Array<Textvalue>(); 
        var Amenitytxtbox = "txtAmenity";
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        var txtCount = "txtCount";
        var chekboxname;
        var Required;
        var tempvalues;
        var temporiginalvalues = "";
        var temparrayvalue;
        for (let i = 0; i < Contextobj.length; i++) {
            var Amenitydetails = <HTMLInputElement>document.getElementById(Amenitytxtbox + i.toString())
            if (Contextobj.arrayList[i].FieldId != undefined && Contextobj.arrayList[i].FieldId > 0) {
                var AmenityIdvalue = Contextobj.arrayList[i].FieldId;
                var Amenitytextvalue = Contextobj.arrayList[i].FieldValue;
            }
            else {
                if (Contextobj.arrayList[i].FieldValue != "")
                    var AmenityIdvalue = Contextobj.arrayList[i].FieldId;
                var Amenitytextvalue = Contextobj.arrayList[i].FieldValue;
            }        
            var chkRequireddetails = <HTMLInputElement>document.getElementById(chkRequired + i.toString())
            var chkRequiredvalue = chkRequireddetails.checked;
            var chkOptionaldetails = <HTMLInputElement>document.getElementById(chkOptional + i.toString())
            var chkOptionalvalue = chkOptionaldetails.checked;
            var txtCountdetails = <HTMLInputElement>document.getElementById(txtCount + i.toString())
            if (Contextobj.arrayList1[i].FieldValue != "")
                var txtCountvalue = Contextobj.arrayList1[i].FieldValue;
            if (Contextobj.arrayList[i].HasValidationError == false && Contextobj.arrayList1[i].HasValidationError == false) {
                if (Amenitytextvalue == "" || chkRequiredvalue == false && chkOptionalvalue == false) {
                    if (Amenitytextvalue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 1;
                        //Contextobj.notificationService.ShowToaster("Enter an Amenity Item", 2);
                    }
                    if (Contextobj.arrayList[i].FieldId == 0) {
                    if (chkRequiredvalue == false && chkOptionalvalue == false) {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 2;
                        //Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
                    }
                    }
                    if (Amenitytextvalue == "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                        validationno = 0;
                        Contextobj.IsNeedToSubmit = true;
                        if (Contextobj.arrayList[i].FieldId > 0) {
                            if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                Contextobj.IsNeedToSubmit = false;
                                validationno = 2;
                                //Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
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
                                    //Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
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
                        temparrayvalue = Amenitytextvalue + " (Count-" + txtCountvalue + ", " + chekboxname + ")"
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
            for (var j= 0; j < temamnitydata.length; j++) {
                index = InsertValues.indexOf(temamnitydata[j].Value);
                if (index == -1) {
                    InsertValues.push(temamnitydata[j].Value);
                    uniquesData.push(temamnitydata[j]);
                } else {
                    uniquesData[index].DIFF += temamnitydata[j].DIFF;
                    var temptxtvalue = temamnitydata[j].Value.split("(")[0].trim();
                }
            }
            temamnitydata = uniquesData;
            if (arrayList2.length == temamnitydata.length)
                Contextobj.submitSuccess.emit({ "Amenityvalue": Contextobj.Amnietyvalueforinsert, "arrayList": arrayList2, "OriginalAmnietyvalue": Contextobj.OriginalAmnietyvalueforinsert });
            else
                Contextobj.notificationService.ShowToaster("Amenity Item(" + temptxtvalue+ ") already exists", 2);
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
    }
    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }
    txtBoxChange(event: any) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
       /* event.fieldObject.IsLocallyValidated = false;
        this.initiateValidation(event.fieldObject);       */
        //}

    }
    public aftercreation() {
        var Contextobj = this;
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        for (let i = 0; i < Contextobj.Amenietydata.length; i++) {
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
            var chkRequireddetails = <HTMLInputElement>document.getElementById(chkRequired + i.toString());
            var chkOptionaldetails = <HTMLInputElement>document.getElementById(chkOptional + i.toString());
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
    }
    rbnclick(event: any, tr) {
        var contextObj = this;
        var id = parseInt(tr.id);
        for (let i = 0; i < contextObj.arrayList1.length; i++) {
            contextObj.arrayList1[id].IsEnabled = true
            contextObj.arrayList1[id].FieldValue = "1";
        }
    }
    chkRequiredclick(event: any) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var ChkOptionalId = tempid.replace("chkRequired", "chkOptional");
        var ChkOptional = <HTMLInputElement>document.getElementById(ChkOptionalId);
        if (Ischecked == true)
            ChkOptional.disabled = true;
        else
            ChkOptional.disabled = false;
        var Id = event["target"].id.split("d")[1];
        for (let i = 0; i < contextObj.arrayList1.length; i++) {
            if (Ischecked == true) {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = true
                contextObj.arrayList1[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = false
                contextObj.arrayList1[parseInt(Id)].FieldValue = "";
            }
        }
    }
    chkOptionalclick(event: any) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var chkRequiredId = tempid.replace("chkOptional", "chkRequired");
        var chkRequired = <HTMLInputElement>document.getElementById(chkRequiredId);
        if (Ischecked == true)
            chkRequired.disabled = true;
        else
            chkRequired.disabled = false;
        var Id = event["target"].id.split("l")[1];
        for (let i = 0; i < contextObj.arrayList1.length; i++) {
            if (Ischecked == true) {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = true
                contextObj.arrayList1[parseInt(Id)].FieldValue = "1";
            }
            else {
                contextObj.arrayList1[parseInt(Id)].IsEnabled = false;
                contextObj.arrayList1[parseInt(Id)].FieldValue = "";
            }
        }
    }



}
export interface Count {
    Id: number;   
}
export interface ReportFieldArray {
    Id: number;
    Value: string;
    InsertValue: string;
    InsertOriginalValue: string;
    FieldId: number;
}
export interface Textvalue {   
    Value: string;   
}