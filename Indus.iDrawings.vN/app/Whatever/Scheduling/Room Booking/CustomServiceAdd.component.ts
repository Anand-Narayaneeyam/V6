import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, AfterViewChecked, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {StringTextBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DynamicListComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'CustomServiceAdd',
    templateUrl: './app/Views/Scheduling/Room Booking/CustomServiceAdd.component.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions, ValidateService],
})

export class ServicesCustomadd implements AfterViewChecked,OnInit {
    Count: Count[] = [];
    length: number
    IsNeedToSubmit: boolean = true;
    IsNeedToCallCreation: boolean = true;
    tableRowCount: number;
    fieldObject: IField[];
    ServiceSource: any[];
    ServiceList = new Array<IField>();
    Servicevalueforinsert: string = "";
    OriginalServicevalueforinsert: string = "";
    Servicevalueforshow: string;
    @Input() Servicedata: any[];    
    @Output() submitSuccess = new EventEmitter();
    constructor(private SchedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private _validateService: ValidateService) { }
    ngOnInit() {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.IsNeedToCallCreation = true;
        Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(2, 0, 0, 0).subscribe(function (data) {
            Contextobj.ServiceSource = JSON.parse(data.Data["FieldBinderData"]);
            var count = 0
            var count1 = 1;
            if (Contextobj.Servicedata.length > 0)
                count = Contextobj.Servicedata.length;
            else if (Contextobj.ServiceSource.length > 0)
                count = Contextobj.ServiceSource.length;
            Contextobj.Count.push({
                Id: 0
            })
            if (Contextobj.Servicedata != undefined && Contextobj.Servicedata.length > 0) {
                for (let i = 0; i < Contextobj.Servicedata.length; i++) {
                    if (Contextobj.Servicedata[i].FieldId == 0) {
                        var fieldvalue = Contextobj.Servicedata[i].InsertValue.split("µ")[0];
                        var Totalcount = Contextobj.Servicedata[i].InsertValue.split("µ")[2];
                        var Ischecked = Contextobj.Servicedata[i].InsertValue.split("µ")[1];
                    }
                    else {
                        //var fieldvalue = Contextobj.AmnietySource.find(function (item) { return item.Id === Contextobj.Amenietydata[i].FieldId })
                        var fieldvalue = Contextobj.Servicedata[i].Value.split("(")[0];
                        var Totalcount = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[2];
                        var Ischecked = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[1];
                    }
                    var FieldID = Contextobj.Servicedata[i].FieldId;
                    Contextobj.ServiceList.push({
                        FormFieldId: 1,
                        FieldId: FieldID,
                        ReportFieldId: 1,
                        FieldLabel: "Service",
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

                }
                if (Contextobj.ServiceSource != undefined) {
                    for (let i = 0; i < Contextobj.ServiceSource.length; i++) {
                        var fieldvalue = Contextobj.Servicedata.find(function (item) { return item.FieldId === Contextobj.ServiceSource[i].Id });
                        if (fieldvalue == undefined) {
                            Contextobj.ServiceList.push({
                                FormFieldId: i,
                                FieldId: Contextobj.ServiceSource[i].Id,
                                ReportFieldId: i,
                                FieldLabel: "Service",
                                DataEntryControlId: 1,
                                GenericDataTypeId: 6,
                                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                                Format: { FormatString: null, RegularExpression: null, Id: null },
                                FieldValue: Contextobj.ServiceSource[i].Value,
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
                        }
                    }
                }
            }
            else if (Contextobj.ServiceSource != undefined) {
                for (let i = 0; i < Contextobj.ServiceSource.length; i++) {
                    Contextobj.ServiceList.push({
                        FormFieldId: i,
                        FieldId: Contextobj.ServiceSource[i].Id,
                        ReportFieldId: i,
                        FieldLabel: "Service",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: Contextobj.ServiceSource[i].Value,
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
                }
                Contextobj.length = count;
            }
            else {

                Contextobj.ServiceList.push({
                    FormFieldId: 1,
                    FieldId: 0,
                    ReportFieldId: 1,
                    FieldLabel: "Service",
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
                Contextobj.length = count;
            }           
            Contextobj.length = count;
        });
        //Contextobj.aftercreation();                
    }
    ngAfterViewChecked() {
        var Contextobj = this;
        if (Contextobj.ServiceList.length > 0 && Contextobj.Servicedata.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    }
    onServiceAdd(event: any, Amenitytable) {
        var Contextobj = this;
        var count;
        var count1 = 1;
        //if (Contextobj.Amenietydata.length > 0)
        //    count = Contextobj.Amenietydata.length;
        //else if (Contextobj.AmnietySource.length > 0)
        //    count = Contextobj.AmnietySource.length;
        //else
        //    count = 0;
        if (Contextobj.ServiceList.length > 0 && Contextobj.ServiceList[Contextobj.ServiceList.length - 1].FieldValue != "") {
            Contextobj.Count.push({
                Id: Contextobj.length++
            })
            Contextobj.ServiceList.push({
                FormFieldId: Contextobj.length,
                FieldId: 0,
                ReportFieldId: Contextobj.length,
                FieldLabel: "Service",
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
            Contextobj.length = Contextobj.length;
        }
    }
    OnsubmitValue(event: any, Amenitytable) {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.length = Contextobj.ServiceList.length;
        var validationno = 0;
        var arrayList2 = new Array<ReportFieldArray>();
        var Servicetxtbox = "txtService";
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        var txtCountvalue = "1";
        var chekboxname;
        var Required;
        var tempvalues;
        var temporiginalvalues = "";
        var temparrayvalue;
        for (let i = 0; i < Contextobj.length; i++) {
            var Servicedetails = <HTMLInputElement>document.getElementById(Servicetxtbox + i.toString())
            if (Contextobj.ServiceList[i].FieldId != undefined && Contextobj.ServiceList[i].FieldId > 0) {
                var ServiceIdvalue = Contextobj.ServiceList[i].FieldId;
                var Servicetextvalue = Contextobj.ServiceList[i].FieldValue;
            }
            else {
                if (Contextobj.ServiceList[i].FieldValue != "")
                    var ServiceIdvalue = Contextobj.ServiceList[i].FieldId;
                var Servicetextvalue = Contextobj.ServiceList[i].FieldValue;
            }
            var chkRequireddetails = <HTMLInputElement>document.getElementById(chkRequired + i.toString())
            var chkRequiredvalue = chkRequireddetails.checked;
            var chkOptionaldetails = <HTMLInputElement>document.getElementById(chkOptional + i.toString())
            var chkOptionalvalue = chkOptionaldetails.checked;                       
            if (Contextobj.ServiceList[i].HasValidationError == false) {
                if (Servicetextvalue == "" || chkRequiredvalue == false && chkOptionalvalue == false) {
                    if (Servicetextvalue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 1;
                        //Contextobj.notificationService.ShowToaster("Enter an Amenity Item", 2);
                    }
                    if (Contextobj.ServiceList[i].FieldId == 0) {
                        if (chkRequiredvalue == false && chkOptionalvalue == false) {
                            Contextobj.IsNeedToSubmit = false;
                            validationno = 2;
                            //Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
                        }
                    }
                    if (Servicetextvalue == "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                        validationno = 0;
                        Contextobj.IsNeedToSubmit = true;
                        if (Contextobj.ServiceList[i].FieldId > 0) {
                            if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                Contextobj.IsNeedToSubmit = false;
                                validationno = 2;
                                //Contextobj.notificationService.ShowToaster("Select an Amenity", 2);
                            }
                        }
                    }
                    else {
                        if (Servicetextvalue != "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                            validationno = 0;
                            Contextobj.IsNeedToSubmit = true;
                            if (Contextobj.ServiceList[i].FieldId > 0) {
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
                    if (ServiceIdvalue != undefined && ServiceIdvalue > 0) {
                        temporiginalvalues = ServiceIdvalue + "µ" + Required + "µ" + txtCountvalue + "µ§";
                        tempvalues = "";
                    }
                    else {
                        tempvalues = Servicetextvalue + "µ" + Required + "µ" + txtCountvalue + "µ§";
                        temporiginalvalues = "";
                    }
                    temparrayvalue = Servicetextvalue + " (" + chekboxname + ")";
                    arrayList2.push({
                        Id: i,
                        Value: temparrayvalue,
                        InsertValue: tempvalues,
                        InsertOriginalValue: temporiginalvalues,
                        FieldId: ServiceIdvalue
                    });
                    if (ServiceIdvalue != undefined && ServiceIdvalue > 0)
                        Contextobj.OriginalServicevalueforinsert = Contextobj.OriginalServicevalueforinsert + temporiginalvalues;
                    else
                        Contextobj.Servicevalueforinsert = Contextobj.Servicevalueforinsert + tempvalues;
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
            var tempServicedata = [];
            tempServicedata = arrayList2;
            var index;
            for (var j = 0; j < tempServicedata.length; j++) {
                index = InsertValues.indexOf(tempServicedata[j].Value);
                if (index == -1) {
                    InsertValues.push(tempServicedata[j].Value);
                    uniquesData.push(tempServicedata[j]);
                } else {
                    uniquesData[index].DIFF += tempServicedata[j].DIFF;
                    var temptxtvalue = tempServicedata[j].Value.split("(")[0].trim();
                }
            }
            tempServicedata = uniquesData;
            if (arrayList2.length == tempServicedata.length)
                Contextobj.submitSuccess.emit({ "Servicevalue": Contextobj.Servicevalueforinsert, "arrayList": arrayList2, "OriginalServicevalue": Contextobj.OriginalServicevalueforinsert });
            else
                Contextobj.notificationService.ShowToaster("Service Item(" + temptxtvalue + ")already exists", 2);
        }
        else if (Contextobj.IsNeedToSubmit == false) {
            if (validationno == 1) {
                Contextobj.notificationService.ShowToaster("Enter a Service Item", 2);
                validationno = 0;
            }
            else if (validationno == 2) {
                Contextobj.notificationService.ShowToaster("Select a Service", 2);
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
        for (let i = 0; i < Contextobj.Servicedata.length; i++) {
            if (Contextobj.Servicedata[i].FieldId == 0) {
                var fieldvalue = Contextobj.Servicedata[i].InsertValue.split("µ")[0];
                var Totalcount = Contextobj.Servicedata[i].InsertValue.split("µ")[2];
                var Ischecked = Contextobj.Servicedata[i].InsertValue.split("µ")[1];
            }
            else {       
                Contextobj.ServiceList[i].IsEnabled = false;        
                var fieldvalue = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[0];
                var Totalcount = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[2];
                var Ischecked = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[1];
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
