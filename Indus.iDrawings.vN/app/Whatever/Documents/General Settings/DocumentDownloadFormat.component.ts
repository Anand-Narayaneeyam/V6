import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DocumentService } from '../../../Models/Documents/documents.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import {StringTextBoxComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component';
import {DynamicDownloadFormatListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dynamicdownloadformatlist.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
@Component({
    selector: 'DocumentDownloadFormat',
    templateUrl: './app/Views/Documents/General Settings/DocumentDownloadFormat.component.html',
    directives: [FieldComponent, DropDownListComponent, StringTextBoxComponent, DynamicDownloadFormatListComponent],
    providers: [HTTP_PROVIDERS, DocumentService, NotificationService, ValidateService]
})

export class DocumentDownloadFormat implements OnInit {

    fieldObject: IField[]; 
    btnName: string;
    ListData: any[]=[];
    Details: any[];
    IsAdd: boolean = true;
    enableButton: boolean = true;
    imgAdd = "Content/list_adD.png";
    imgEdit = "Content/Icons/data_editN.png";
    imgDelete = "Content/Icons/data_deleteN.png";
    imgCancel = "Content/Layout/button_cancel.png";
    SelectedIndex: number;
    isrefresh: boolean = true;
    public validationData;
    constructor(private _validateService: ValidateService,private DocumentService: DocumentService, private _notificationService: NotificationService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }


    ngOnInit() {
        var contextObj = this;
        contextObj.DocumentService.getdocumentdownloadformatfields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObject[1].FieldValue = "-1";
            contextObj.fieldObject[1].IsHiddenLabel = true;            
            contextObj.fieldObject[2].IsHiddenLabel = true;           
            contextObj.fieldObject[3].IsHiddenLabel = true;
            contextObj.fieldObject[1].IsLocallyValidated = false;
            contextObj.fieldObject[2].IsLocallyValidated = true;
            contextObj.fieldObject[3].IsLocallyValidated = true;
        });
        contextObj.DocumentService.getNumberFormatItemDetails().subscribe(function (resultData) {  
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
                contextObj.isrefresh = !contextObj.isrefresh;
            }           
        });
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
            contextObj.fieldObject[0]["LookupDetails"]["LookupValues"] = lookupvalue;
    }
   
    getDynamicListEdit(Event) {        
        var contextObj = this;                 
        var value: string;        
        var FieldName: any = document.getElementById("FieldFormat");
        var ConstantName: any = document.getElementById("ConstantFormat");
        var SeparatorName: any = document.getElementById("SeparatorFormat");        
        if (Event["SelectedId"] && Event["SelectedId"].length>0)
            contextObj.SelectedIndex = Event["SelectedId"].split("li")[0];
        else
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        if (contextObj.ListData[contextObj.SelectedIndex]) { 
            contextObj.cancelList(Event);           
            if (contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == 1 || contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == true) {
                var dropdownid: number;
                contextObj.fieldObject[1].FieldValue = "-1"
                contextObj.fieldObject[1]["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Value == contextObj.ListData[contextObj.SelectedIndex]["ReportFieldName"]) {
                        dropdownid = item.Id;
                        return true;
                    }
                });
                if (dropdownid) {
                    contextObj.fieldObject[1].FieldValue = dropdownid.toString();
                }
                contextObj.fieldObject[1].IsEnabled = true;
                contextObj.fieldObject[2].IsEnabled = false;
                contextObj.fieldObject[1].IsLocallyValidated = false;
                contextObj.fieldObject[2].IsLocallyValidated = true;
            } else {
                contextObj.fieldObject[2].FieldValue = contextObj.ListData[contextObj.SelectedIndex]["ConstantValue"];
                contextObj.fieldObject[1].IsEnabled = false;
                contextObj.fieldObject[2].IsEnabled = true;
                contextObj.fieldObject[1].IsLocallyValidated = true;
                contextObj.fieldObject[2].IsLocallyValidated = false;
            }
            if (FieldName)
                FieldName.checked = contextObj.fieldObject[1].IsEnabled;
            if (ConstantName)
                ConstantName.checked = contextObj.fieldObject[2].IsEnabled;
            if (SeparatorName)
                SeparatorName.checked = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.fieldObject[3].FieldValue = contextObj.ListData[contextObj.SelectedIndex]["Separator"];
            contextObj.fieldObject[3].IsEnabled = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.fieldObject[3].IsLocallyValidated = !contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
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
                if (contextObj.ListData.length==0){
                    contextObj.enableButton = false;
                    contextObj.isrefresh = !contextObj.isrefresh;
                }
                contextObj.cancelList(Event);
            }
        }
        else 
        {
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        }
    }

    ChangeList(Event,target) {        
        var contextObj = this;
        var length: number = 0;
        var ReportFieldName: string = "";
        var ReportFieldId: number;
        length = contextObj.ListData.length;
        var iscolumnval: boolean = contextObj.fieldObject[1].IsEnabled,
            isseparatorval: boolean = contextObj.fieldObject[3].IsEnabled;
        var isChange: boolean = false,
            isSeparatorChange: boolean = false;
        if (iscolumnval) {
            if (contextObj.fieldObject[1].FieldValue != "-1" && contextObj.fieldObject[1].FieldValue) {
                contextObj.fieldObject[1]["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Id == Number(contextObj.fieldObject[1].FieldValue)) {
                        ReportFieldId = item.Id;
                        ReportFieldName = item.Value;
                        isChange = true;
                        return true;
                    }
                });
            }
        } else {
                if (contextObj.fieldObject[2].FieldValue && contextObj.fieldObject[2].FieldValue.length > 0 && !contextObj.fieldObject[2].HasValidationError)
                isChange = true;
        }
        if (isseparatorval) {
            if (contextObj.fieldObject[3].FieldValue && contextObj.fieldObject[3].FieldValue.length > 0 && !contextObj.fieldObject[3].HasValidationError)
                isSeparatorChange = true;
            else
                isSeparatorChange = false;
        } else {
            isSeparatorChange = true;
        }
        if (isChange && isSeparatorChange) {
            if (target==1) {
                contextObj.ListData.push({ ConstantValue: contextObj.fieldObject[2].FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.fieldObject[3].FieldValue });
                contextObj.enableButton = true;                
            } else {
                var updatedlist: any = { ConstantValue: contextObj.fieldObject[2].FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.fieldObject[3].FieldValue };
                if (contextObj.SelectedIndex) {
                    contextObj.ListData[contextObj.SelectedIndex] = updatedlist;                    
                }
            }
            contextObj.updatefieldlookup();
            contextObj.isrefresh = !contextObj.isrefresh;
            contextObj.cancelList(Event);
        }
    }   

    getDynamicListFieldValues() {
        return this.fieldObject[0];
    }

    cancelList(Event) {
        this.IsAdd = true;
        this.fieldObject[1].FieldValue = "-1"
        this.fieldObject[1].IsEnabled = true;
        this.fieldObject[2].FieldValue = null;
        this.fieldObject[2].IsEnabled = false;
        this.fieldObject[3].FieldValue = null;
        this.fieldObject[3].IsEnabled = false;
        var FieldName: any = document.getElementById("FieldFormat");
        var ConstantName: any = document.getElementById("ConstantFormat");
        var SeparatorName: any = document.getElementById("SeparatorFormat");
        if (FieldName)
            FieldName.checked = true;
        if (ConstantName)
            ConstantName.checked = false;
        if (SeparatorName)
            SeparatorName.checked = false;
        this.fieldObject[1].IsLocallyValidated = false;
        this.fieldObject[2].IsLocallyValidated = true;
        this.fieldObject[3].IsLocallyValidated = true;
        var fieldfocus = document.getElementById(this.fieldObject[1].FieldId.toString());
        if (fieldfocus) {
            fieldfocus.focus();
            setTimeout(function () {
                fieldfocus.blur();
            },100);
        }
    }

    updateNumberFormat(Event) {
        var NumberFormatDetails: NumberFormatInput[] = [];
        var contextObj: any = this;
        var length: Number;
        length = contextObj.ListData.length;
        var ReportFieldId: number = 0;
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
                Separator: contextObj.ListData[i]["Separator"] });
        }
        var stringNumberFormat: string = JSON.stringify(NumberFormatDetails);
        contextObj.DocumentService.UpdateNumberFormatDetails(stringNumberFormat).subscribe(function (resultData) {            
            if (resultData["StatusId"] == 1) {
              contextObj._notificationService.ShowToaster("Document Download Format updated", 3);                    
            }
            else {
                 contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });        
    }
    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    OnFieldClick(Fieldevent, Action) {
        if (Action == "FieldName") {
            this.fieldObject[1].IsEnabled = true;
            this.fieldObject[1].IsLocallyValidated = false;
            this.fieldObject[2].IsEnabled = false;
            this.fieldObject[2].FieldValue = null;
            this.fieldObject[2].IsLocallyValidated = true;
        } else if (Action == "ConstantValue") {
            this.fieldObject[1].IsEnabled = false;
            this.fieldObject[1].FieldValue = "-1";
            this.fieldObject[1].IsLocallyValidated = true;
            this.fieldObject[2].IsEnabled = true;
            this.fieldObject[2].IsLocallyValidated = false;
        } else if (Action == "Separator") {
            var separatorelement = Fieldevent.target || Fieldevent.srcElement;
            this.fieldObject[3].IsEnabled = separatorelement.checked;
            this.fieldObject[3].IsLocallyValidated = !separatorelement.checked;
            this.fieldObject[3].FieldValue = null;
        }

    }   
    onChangeDataFieldCategory(FieldId) {
    }
}
 export interface NumberFormatInput {
     ConstantValue: string;
     IsColumn: boolean;
     IsSeparatorRequired: boolean;
     PositionNo : number;
     ReportFieldId  : number;
     Separator : string;
 }