import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import {StringTextBoxComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import {NumberFormatListComponent } from './numberformatlist.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import {CommonService} from '../../../Models/Common/common.service'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
@Component({
    selector: 'NumberFormat',
    templateUrl: './app/Views/Common/Number Format/NumberFormat.component.html',
    directives: [FieldComponent, DropDownListComponent, StringTextBoxComponent, NumberFormatListComponent, CustomCheckBoxComponent, CustomRadioComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, CommonService, NotificationService, ValidateService],
    inputs: ['NumberFormatCategoryId','target','ModuleId']
})

export class NumberFormat implements OnInit {

    fieldObject: IField[];
    btnName: string;
    ListData: any[] = [];
    Details: any[];
    IsAdd: boolean = true;
    enableButton: boolean = true;
    imgAdd = "Content/list_adD.png";
    imgEdit = "Content/Icons/data_editN.png";
    imgDelete = "Content/Icons/data_deleteN.png";
    imgCancel = "Content/Layout/button_cancel.png";
    SelectedIndex: number;
    isrefresh: boolean = true;
    NumberFormatNameDetails: any;
    NumberFormatCategoryId: number = 0;
    ModuleId: number = -1;
    target: number = 0;
    iscombination: boolean = true;
    isload: boolean = true;
    issequence: boolean = false;
    isupdate: boolean = true;
    public validationData;
    constructor(private _validateService: ValidateService, private commonservice: CommonService, private _notificationService: NotificationService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }
    FormatCondition: IField;
    FieldName: IField;
    Constant: IField;
    Separator: IField;
    Category: IField;
    Prefix: IField;
    StartNumber: IField;
    ResetEveryYear: IField;
    slidemsg: string;
    showSlide: boolean = false;
    stringNumberFormat: string="";
    stringNumberFormatName: string = "";
    position = "top-right";
    roomlabel: string = "Room";
    seatlabel: string = "Seat";
    ngOnInit() {        
        var contextObj = this;
        if (contextObj.ModuleId <= 0 || contextObj.ModuleId==14)
        {           
            contextObj.commonservice.getCustomerSubscribedFeatures("275,274").subscribe(function (resultData) {
                var Subscribeddetails: any = resultData["Data"];
                for (let i = 0; i < Subscribeddetails.length; i++) {
                    if (Subscribeddetails[i]["IsSubscribed"] == 1 || Subscribeddetails[i]["IsSubscribed"] == true) {
                        switch (Subscribeddetails[i]["Id"]) {
                            case 275:
                                contextObj.roomlabel = Subscribeddetails[i].Value;
                                break;
                            case 274:
                                contextObj.seatlabel = Subscribeddetails[i].Value;
                                break;                    

                        }
                    }
                }               
            });
        }

        contextObj.commonservice.getNumberformatfields(contextObj.ModuleId).subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];           
            contextObj.FormatCondition = contextObj.fieldObject[0];
            contextObj.FieldName = contextObj.fieldObject[1];
            contextObj.Constant = contextObj.fieldObject[2];
            contextObj.Separator = contextObj.fieldObject[3];
            contextObj.Category = contextObj.fieldObject[4];
            contextObj.Prefix = contextObj.fieldObject[5];
            contextObj.StartNumber = contextObj.fieldObject[6];
            contextObj.ResetEveryYear = contextObj.fieldObject[7];
            contextObj.FieldName.FieldValue = "-1";
            contextObj.FieldName.IsHiddenLabel = true;
            contextObj.Constant.IsHiddenLabel = true;
            contextObj.Separator.IsHiddenLabel = true;            
                     
            if (contextObj.NumberFormatCategoryId==14)
                contextObj.Category.IsVisible = false;
            else
                contextObj.Category.IsVisible = true;

            var rdlookupvalue: any[] = [];
            rdlookupvalue.push({ Id: 1, IsDisabled: false, Value: "Combination of Fields" });
            rdlookupvalue.push({ Id: 2, IsDisabled: false, Value: "Constant" });
            if (contextObj.Prefix) {
                contextObj.Prefix.LookupDetails.LookupValues = rdlookupvalue;
                contextObj.Prefix.FieldValue = "1";
            }
            if (contextObj.NumberFormatCategoryId>0)
                contextObj.dataload(contextObj.NumberFormatCategoryId);
                  
        });              
    }
    setinitialnumberformatnamefield(Value: boolean)
    {
        var contextObj = this;
        contextObj.Prefix.IsVisible = Value;
        contextObj.StartNumber.IsVisible = Value;
        contextObj.ResetEveryYear.IsVisible = Value;
        contextObj.issequence = Value;   
        
    }
    dataload(NumberFormatCategoryId)
    {        
        var contextObj = this;
        contextObj.target = 1;   
        
        contextObj.commonservice.getNumberFormatDetails(NumberFormatCategoryId).subscribe(function (resultData) {
            contextObj.NumberFormatNameDetails = JSON.parse(resultData["FieldBinderData"]);

            if (contextObj.NumberFormatNameDetails && contextObj.NumberFormatNameDetails.length > 0)
            {
                contextObj.StartNumber.FieldValue = contextObj.NumberFormatNameDetails[0]["StartNumber"].toString();
                contextObj.ResetEveryYear.FieldValue = contextObj.NumberFormatNameDetails[0]["NeedYearlyReset"].toString();
            }
            else
            {
                contextObj.StartNumber.FieldValue = "1";
                contextObj.ResetEveryYear.FieldValue = "false";
            }
        });

        contextObj.iscombination = true;   
        contextObj.isupdate = true;
        contextObj.FormatCondition.IsMandatory = false;
        contextObj.FormatCondition.HasValidationError = false;
        contextObj.SelectedIndex = undefined;
        if (contextObj.Prefix)             
            contextObj.Prefix.FieldValue = "1";
        
        switch (NumberFormatCategoryId)
        {            
            case 1:
                contextObj.FormatCondition.IsMandatory = true;
                contextObj.setinitialnumberformatnamefield(true);     
                contextObj.commonservice.CheckNumberFormat(NumberFormatCategoryId).subscribe(function (resultData) {
                    if (resultData["Data"] == true) {
                        contextObj.isupdate = false;
                        contextObj.Prefix.IsEnabled = false;
                        contextObj.StartNumber.IsEnabled = false;
                        contextObj.ResetEveryYear.IsEnabled = false;
                    }
                    else
                    {
                        contextObj.isupdate = true;
                        contextObj.Prefix.IsEnabled = true;
                        contextObj.StartNumber.IsEnabled = true;
                        contextObj.ResetEveryYear.IsEnabled = true;
                    }                   
                    contextObj.commonservice.GetNumberFormatColumnLookupValues(51297, '').subscribe(function (resultData) {
                        contextObj.FieldName.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    });
                    contextObj.getNumberFormatFieldValues(NumberFormatCategoryId, contextObj.target);
                });
                   
                    break;
            case 2:
                contextObj.FormatCondition.IsMandatory = true;
                contextObj.setinitialnumberformatnamefield(true);                         
                contextObj.commonservice.CheckNumberFormat(NumberFormatCategoryId).subscribe(function (resultData) {
                    if (resultData["Data"] == true)
                    {
                        contextObj.isupdate = false;
                        contextObj.Prefix.IsEnabled = false;
                        contextObj.StartNumber.IsEnabled = false;
                        contextObj.ResetEveryYear.IsEnabled = false;
                    }
                    else
                    {
                        contextObj.isupdate = true;
                        contextObj.Prefix.IsEnabled = true;
                        contextObj.StartNumber.IsEnabled = true;
                        contextObj.ResetEveryYear.IsEnabled = true;
                    }
                    contextObj.commonservice.GetNumberFormatColumnLookupValues(51298, '').subscribe(function (resultData) {
                            contextObj.FieldName.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    });
                    contextObj.getNumberFormatFieldValues(NumberFormatCategoryId, contextObj.target);
                });
                    break;
            case 14:
                contextObj.setinitialnumberformatnamefield(false);
                contextObj.commonservice.GetNumberFormatColumnLookupValues(51109, '').subscribe(function (resultData) {
                    contextObj.FieldName.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                });
                contextObj.target = 7;                
                contextObj.getNumberFormatFieldValues(NumberFormatCategoryId, contextObj.target);
                break;
            case 19:
            case 20:
            case 21: contextObj.setinitialnumberformatnamefield(false);                                       
                     contextObj.iscombination = false;
                     contextObj.getNumberFormatFieldValues(NumberFormatCategoryId, contextObj.target);
                     break;
            default: break;
        }         
        
    }

    getNumberFormatFieldValues(NumberFormatCategoryId, target) 
    {
        var contextObj = this;
        contextObj.commonservice.getNumberFormatItemDetails(NumberFormatCategoryId, contextObj.target).subscribe(function (resultData) {
            var resultdetails: any[] = JSON.parse(resultData["FieldBinderData"]);
            var length: Number;
            contextObj.ListData = [];
            length = resultdetails.length;
            for (let i = 0; i < length; i++) {
                contextObj.ListData.push({ ConstantValue: resultdetails[i]["ConstantValue"], IsColumn: resultdetails[i]["IsColumn"], IsSeparatorRequired: resultdetails[i]["IsSeparatorRequired"], PositionNo: resultdetails[i]["PositionNo"], ReportFieldId: resultdetails[i]["ReportFieldId"], ReportFieldName: resultdetails[i]["ReportFieldName"], Separator: resultdetails[i]["Separator"] })
            }
            contextObj.updatefieldlookup();
            if (length == 0) {
                contextObj.enableButton = false;
            }
            else {
                contextObj.enableButton = true;
            }
            contextObj.isrefresh = !contextObj.isrefresh;
        });
        contextObj.removingvalidation();
        if (contextObj.isupdate)
            contextObj.initialfieldchanges();  
    }

    removingvalidation()
    {
        var fieldnamefocus = document.getElementById(this.FieldName.FieldId.toString()),
            constantfocus = document.getElementById(this.Constant.FieldId.toString()),
            separatorfocus = document.getElementById(this.Separator.FieldId.toString());
        var span;

        if (this.FieldName.HasValidationError && fieldnamefocus) {
            span = fieldnamefocus.nextElementSibling;
            if (span)
            {
                span.innerHTML = "";
                if (fieldnamefocus.getAttribute('class').search('ng-invalid') >= 0) {
                    fieldnamefocus.setAttribute('class', fieldnamefocus.getAttribute('class').replace('ng-invalid', 'ng-valid'));
                }
                fieldnamefocus.style.borderColor = "darkgray";
            }   
            this.FieldName.HasValidationError = false;    
        }

        if (this.Constant.HasValidationError && constantfocus)
        {
            span = constantfocus.nextElementSibling;
            if (span) {
                span.innerHTML = "";
                if (constantfocus.getAttribute('class').search('ng-invalid') >= 0) {
                    constantfocus.setAttribute('class', constantfocus.getAttribute('class').replace('ng-invalid', 'ng-valid'));
                }
                constantfocus.style.borderColor = "darkgray";
            }
            this.Constant.HasValidationError = false;
        }

        if (this.Separator.HasValidationError && separatorfocus) {
            span = separatorfocus.nextElementSibling;
            span.innerHTML = "";     
            if (span) {
                if (separatorfocus.getAttribute('class').search('ng-invalid') >= 0) {
                    separatorfocus.setAttribute('class', separatorfocus.getAttribute('class').replace('ng-invalid', 'ng-valid'));
                }
                separatorfocus.style.borderColor = "darkgray";
            }   
            this.Separator.HasValidationError = false;
        }
    }

    updatefieldlookup() {
        var contextObj = this;
        var length: Number;
        var value: string;
        length = contextObj.ListData.length;
        var lookupvalue: any[] = [];
        for (let i = 0; i < length; i++) {
            value = '';
            if (contextObj.ListData[i]["ReportFieldName"])
                value = value + contextObj.ListData[i]["ReportFieldName"];
            if (contextObj.ListData[i]["ConstantValue"])
                value = value + contextObj.ListData[i]["ConstantValue"];
            if (contextObj.ListData[i]["Separator"])
                value = value + contextObj.ListData[i]["Separator"];
            lookupvalue.push({ Id: i, IsDisabled: true, Value: value });
        }
        if (lookupvalue)
            contextObj.FormatCondition["LookupDetails"]["LookupValues"] = lookupvalue;
    }

    getDynamicListEdit(Event) {
        var contextObj = this;
        var value: string;
        var FieldName: any = document.getElementById("FieldFormat");
        var ConstantName: any = document.getElementById("ConstantFormat");
        var SeparatorName: any = document.getElementById("SeparatorFormat");
        if (Event["SelectedId"] && Event["SelectedId"].length > 0)
            contextObj.SelectedIndex = Event["SelectedId"].split("li")[0];
        else
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        if (contextObj.SelectedIndex && contextObj.ListData[contextObj.SelectedIndex]) {
            contextObj.initialfieldchanges();
            if (contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == 1 || contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == true) {
                var dropdownid: number;
                contextObj.FieldName.FieldValue = "-1"
                contextObj.FieldName["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Value == contextObj.ListData[contextObj.SelectedIndex]["ReportFieldName"]) {
                        dropdownid = item.Id;
                        return true;
                    }
                });
                if (dropdownid) {
                    contextObj.FieldName.FieldValue = dropdownid.toString();
                }
                contextObj.FieldName.IsEnabled = true;
                contextObj.Constant.IsEnabled = false;
                contextObj.FieldName.IsLocallyValidated = false;
                contextObj.Constant.IsLocallyValidated = true;
                if (!contextObj.iscombination)
                {
                    contextObj.iscombination = true;
                    if (contextObj.Prefix)
                        contextObj.Prefix.FieldValue = "1";
                }
            } else {
                contextObj.Constant.FieldValue = contextObj.ListData[contextObj.SelectedIndex]["ConstantValue"];
                contextObj.FieldName.IsEnabled = false;
                contextObj.Constant.IsEnabled = true;
                contextObj.FieldName.IsLocallyValidated = true;
                contextObj.Constant.IsLocallyValidated = false;
            }
            if (FieldName)
                FieldName.checked = contextObj.FieldName.IsEnabled;
            if (ConstantName)
                ConstantName.checked = contextObj.Constant.IsEnabled;
            if (SeparatorName)
                SeparatorName.checked = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.Separator.FieldValue = contextObj.ListData[contextObj.SelectedIndex]["Separator"];
            contextObj.Separator.IsEnabled = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.Separator.IsLocallyValidated = !contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.IsAdd = false;
        }
    }
    getDynamicListRemove(Event) {
        var contextObj = this;
        var length: Number;
        var index;
        if (Event["SelectedId"] && Event["SelectedId"].length > 0) {
            index = Event["SelectedId"].split("li")[0];
            if (index && index >= 0) {
                contextObj.ListData.splice(index, 1);
                length = contextObj.ListData.length;
                for (let i = index; i < length; i++) {
                    contextObj.ListData[i]["PositionNo"] = i;
                }
                contextObj.updatefieldlookup();
                if (contextObj.ListData.length == 0) {
                    contextObj.enableButton = false;                    
                }
                contextObj.isrefresh = !contextObj.isrefresh;
                contextObj.initialfieldchanges();
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        }
    }

    ChangeList(Event, action) {
        var contextObj = this;
        var length: number = 0;
        var ReportFieldName: string = "";
        var ReportFieldId: number;
        length = contextObj.ListData.length;
        var iscolumnval: boolean = contextObj.FieldName.IsEnabled,
            isseparatorval: boolean = contextObj.Separator.IsEnabled;
        var isChange: boolean = false,
            isSeparatorChange: boolean = false;
        if (iscolumnval) {
            if (contextObj.FieldName.FieldValue != "-1" && contextObj.FieldName.FieldValue) {
                contextObj.FieldName["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Id == Number(contextObj.FieldName.FieldValue)) {
                        ReportFieldId = item.Id;
                        ReportFieldName = item.Value;
                        isChange = true;
                        return true;
                    }
                });
            }
        } else {
            if (contextObj.Constant.FieldValue && contextObj.Constant.FieldValue.length > 0 && !contextObj.Constant.HasValidationError)
                isChange = true;
        }
        if (isseparatorval) {
            if (contextObj.Separator.FieldValue && contextObj.Separator.FieldValue.length > 0 && !contextObj.Separator.HasValidationError)
                isSeparatorChange = true;
            else
                isSeparatorChange = false;
        } else {
            isSeparatorChange = true;
        }
        if (isChange && isSeparatorChange) {
            if (action == 1) {
                contextObj.ListData.push({ ConstantValue: contextObj.Constant.FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.Separator.FieldValue });
                contextObj.enableButton = true;
            } else {
                var updatedlist: any = { ConstantValue: contextObj.Constant.FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.Separator.FieldValue };
                if (contextObj.SelectedIndex) {
                    contextObj.ListData[contextObj.SelectedIndex] = updatedlist;
                }
            }
            contextObj.updatefieldlookup();
            contextObj.isrefresh = !contextObj.isrefresh;
            contextObj.initialfieldchanges();
        }
    }

    getDynamicListFieldValues() {
        return this.FormatCondition;
    }

    initialfieldchanges() {
        this.IsAdd = true;
        this.FieldName.FieldValue = "-1"
        this.Constant.FieldValue = null;
        this.Separator.FieldValue = null;
        
        var FieldName: any = document.getElementById("FieldFormat");
        var ConstantName: any = document.getElementById("ConstantFormat");
        var SeparatorName: any = document.getElementById("SeparatorFormat");
      
        var fieldfocus;
        if (this.iscombination)
        {
            this.FieldName.IsEnabled = true;
            this.Constant.IsEnabled = false;              
            fieldfocus = document.getElementById(this.FieldName.FieldId.toString());
        }
        else
        {
            this.FieldName.IsEnabled = false;
            this.Constant.IsEnabled = true;                                  
            fieldfocus = document.getElementById(this.Constant.FieldId.toString());
        }

        this.Separator.IsEnabled = false;
        if (FieldName)
            FieldName.checked = this.FieldName.IsEnabled;
        if (ConstantName)
            ConstantName.checked = this.Constant.IsEnabled;
        if (SeparatorName)
            SeparatorName.checked = this.Separator.IsEnabled;
        this.FieldName.IsLocallyValidated = !this.FieldName.IsEnabled;
        this.Constant.IsLocallyValidated = !this.Constant.IsEnabled;
        this.Separator.IsLocallyValidated = !this.Separator.IsEnabled;

        if (fieldfocus) {
            fieldfocus.focus();
            setTimeout(function () {
                fieldfocus.blur();
            }, 100);
        }
    }

    updateNumberFormat(Event) {
        var NumberFormatDetails: NumberFormatInput[] = [];
        var contextObj: any = this;
        var length: Number;
        length = contextObj.ListData.length;
        var ReportFieldId: number = 0;
        var strRptFields: string = "";
        var lstValues: ReportFieldValues[] = [],
            lstReportFieldIds: ReportFieldValues[] = [];;
            if (contextObj.StartNumber && !contextObj.StartNumber.HasValidationError && contextObj.FormatCondition && !contextObj.FormatCondition.HasValidationError) {
                lstValues.push({ ReportFieldId: 5202, Value: contextObj.NumberFormatCategoryId.toString() });/*Number Format Category*/
                switch (contextObj.NumberFormatCategoryId) {
                    case 1: lstValues.push({ ReportFieldId: 5201, Value: "Request Number" });
                        lstValues.push({ ReportFieldId: 5208, Value: (!contextObj.iscombination).toString() }); /* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "1" });   /* IsSequenceNumeric */
                        break;
                    case 2: lstValues.push({ ReportFieldId: 5201, Value: "Work Order Number" });
                        lstValues.push({ ReportFieldId: 5208, Value: (!contextObj.iscombination).toString() }); /* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "1" });   /* IsSequenceNumeric */
                        break;
                    case 14: lstValues.push({ ReportFieldId: 5201, Value: "Document Download Format" });
                        lstValues.push({ ReportFieldId: 5208, Value: "0" }); /* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "0" });   /* IsSequenceNumeric */
                        break;
                    case 19:
                        lstValues.push({ ReportFieldId: 5201, Value: "Room Reservation Number" });
                        lstValues.push({ ReportFieldId: 5208, Value: "1" });/* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "1" });     /* IsSequenceNumeric */
                        break;
                    case 20:
                        lstValues.push({ ReportFieldId: 5201, Value: "Seat Reservation Number" });
                        lstValues.push({ ReportFieldId: 5208, Value: "1" });/* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "1" }); /* IsSequenceNumeric */
                        break;
                    case 21:
                        lstValues.push({ ReportFieldId: 5201, Value: "Equipment Reservation Number" });
                        lstValues.push({ ReportFieldId: 5208, Value: "1" });/* IsConstantPrefix */
                        lstValues.push({ ReportFieldId: 5205, Value: "1" }); /* IsSequenceNumeric */
                        break;
                    default: break;
                }
                lstValues.push({ ReportFieldId: 5393, Value: "0" },  /*IsSequenceNumberEmbedded */
                    { ReportFieldId: 5204, Value: "0" }, /* IsPermanent */
                    { ReportFieldId: 5206, Value: "0" }, /* IsSqNoRandomGenerated */
                    { ReportFieldId: 5207, Value: "0" }, /* SqNoMaxLength */
                    { ReportFieldId: 5394, Value: contextObj.ResetEveryYear.FieldValue }, /* NeedYearlyReset */
                    { ReportFieldId: 5209, Value: contextObj.StartNumber.FieldValue }, /* StartNumber */
                    { ReportFieldId: 5395, Value: "" }, /* EndNumber */
                    { ReportFieldId: 5396, Value: "" }, /* YearResetOn */
                    { ReportFieldId: 271, Value: contextObj.ModuleId } /* ModuleId */
                );

                for (let i = 0; i < length; i++) {
                    ReportFieldId = contextObj.ListData[i]["ReportFieldId"];
                    if (!ReportFieldId) {
                        ReportFieldId = 0;
                    }
                    NumberFormatDetails.push({
                        ConstantValue: contextObj.ListData[i]["ConstantValue"],
                        IsColumn: contextObj.ListData[i]["IsColumn"],
                        IsSeparatorRequired: contextObj.ListData[i]["IsSeparatorRequired"],
                        PositionNo: contextObj.ListData[i]["PositionNo"],
                        ReportFieldId: ReportFieldId,
                        Separator: contextObj.ListData[i]["Separator"]
                    });
                    if (contextObj.NumberFormatCategoryId == 14 && ReportFieldId > 0) {
                        lstReportFieldIds.push({ ReportFieldId: 350, Value: ReportFieldId.toString() }); /* ReportFieldids */
                    }
                }

                contextObj.stringNumberFormat = JSON.stringify(NumberFormatDetails),
                    contextObj.stringNumberFormatName = JSON.stringify(lstValues);
                var strReportFieldIds: string = "";
                if (lstReportFieldIds && lstReportFieldIds.length > 0) {
                    strReportFieldIds = JSON.stringify(lstReportFieldIds)
                }

                contextObj.commonservice.CheckDuplicateFieldValues(contextObj.NumberFormatCategoryId, strReportFieldIds).subscribe(function (resultData) {                    
                    var duplicatecount = resultData["Data"];
                    if (duplicatecount > 1) {
                        contextObj.slidemsg = "Selected Fields may create duplicate download file names. Are you sure you want to proceed?";
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                    else {
                        contextObj.UpdateNumberFormatFieldValues(contextObj.stringNumberFormat, contextObj.NumberFormatCategoryId, contextObj.stringNumberFormatName);
                    }

                });
            }
    }
    UpdateNumberFormatFieldValues(stringNumberFormat, NumberFormatCategoryId, stringNumberFormatName)
    {
        var contextObj: any = this;
        contextObj.commonservice.UpdateNumberFormatDetails(stringNumberFormat, NumberFormatCategoryId, stringNumberFormatName).subscribe(function (resultData) {
            if (resultData["StatusId"] == 1) {
                switch (contextObj.NumberFormatCategoryId) {
                    case 1: contextObj._notificationService.ShowToaster("Work Request Number Prefix updated", 3)
                        break;
                    case 2: contextObj._notificationService.ShowToaster("PM Work Order Number Prefix updated", 3)
                        break;
                    case 14: contextObj._notificationService.ShowToaster("Document Download Format updated", 3)
                        break;
                    case 19: contextObj._notificationService.ShowToaster(contextObj.roomlabel+" Reservation Number Prefix updated", 3)
                        break;
                    case 20: contextObj._notificationService.ShowToaster(contextObj.seatlabel+" Reservation Number Prefix updated", 3)
                        break;
                    case 21: contextObj._notificationService.ShowToaster("Equipment Reservation Number Prefix updated", 3)
                        break;
                };
                contextObj.stringNumberFormat = "";
                contextObj.stringNumberFormatName = "";
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }
    okupdate()
    {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        contextObj.UpdateNumberFormatFieldValues(contextObj.stringNumberFormat, contextObj.NumberFormatCategoryId, contextObj.stringNumberFormatName);
        contextObj.stringNumberFormat = "";
        contextObj.stringNumberFormatName = "";
    }

    cancelClick()
    {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;        
        contextObj.stringNumberFormat = "";
        contextObj.stringNumberFormatName = "";
    }
    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }

    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    showRadioComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "inline-flex";
        }
    }

    OnFieldClick(Fieldevent, Action) {
        if (Action == "FieldName") {
            this.FieldName.IsEnabled = true;
            this.FieldName.IsLocallyValidated = false;
            this.Constant.IsEnabled = false;
            this.Constant.FieldValue = null;
            this.Constant.IsLocallyValidated = true;
        } else if (Action == "ConstantValue") {
            this.FieldName.IsEnabled = false;
            this.FieldName.FieldValue = "-1";
            this.FieldName.IsLocallyValidated = true;
            this.Constant.IsEnabled = true;
            this.Constant.IsLocallyValidated = false;
        } else if (Action == "Separator") {
            var separatorelement = Fieldevent.target || Fieldevent.srcElement;
            this.Separator.IsEnabled = separatorelement.checked;
            this.Separator.IsLocallyValidated = !separatorelement.checked;
            this.Separator.FieldValue = null;
        }

    }
    onChangeDataFieldCategory(event) {
        var ddlfield: IField = event["ChildFieldObject"];
        var contextObj: any = this;
        if (ddlfield && ddlfield.FieldId == 3023)
        {
            if (!ddlfield.FieldValue || ddlfield.FieldValue == '-1')
            {
                contextObj.NumberFormatCategoryId = 0;   
            }
            else
            {               
                contextObj.NumberFormatCategoryId = Number(ddlfield.FieldValue);
                contextObj.dataload(contextObj.NumberFormatCategoryId);
            }
        }
    }
    rbtnChange(event)
    {
        var rdfield: IField = event["fieldobject"];
        if (rdfield && rdfield.FieldValue == "2") 
            this.iscombination = false;        
        else
            this.iscombination = true;
        this.initialfieldchanges();
    }
    chkBoxChange(event: any)
    {
        var contextObj: any = this;
        if (this.ResetEveryYear && this.ResetEveryYear.FieldId == event["fieldId"])
            this.ResetEveryYear.FieldValue = event["IsChecked"].toString();
    }
}
export interface NumberFormatInput {
    ConstantValue: string;
    IsColumn: boolean;
    IsSeparatorRequired: boolean;
    PositionNo: number;
    ReportFieldId: number;
    Separator: string;
}

export interface ReportFieldValues {
    ReportFieldId: number;
    Value: string;
}