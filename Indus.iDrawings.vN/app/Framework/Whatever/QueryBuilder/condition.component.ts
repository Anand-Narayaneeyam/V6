import { Component, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {ICondition} from '../../Models/Interface/ICondition';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import {CommonService} from '../../../Models/Common/common.service'
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import {IField} from '../../Models/Interface/IField';
import {IGroup} from '../../Models/Interface/IGroup';
import { DateComponent } from '../dynamiccontrols/dynamicfields/datecomponent.component';
import { TextAreaComponent } from '../dynamiccontrols/dynamicfields/textareacomponent.component';
import { LabelComponent} from '../dynamiccontrols/dynamicfields/labelcomponent.component';
import { DateTimeComponent } from '../dynamiccontrols/dynamicfields/datetimecomponent.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
@Component({
    selector: 'qbcondition',
    templateUrl: 'app/Framework/Views/QueryBuilder/condition.component.html',
    directives: [LabelComponent, DropDownListComponent, StringTextBoxComponent, DateComponent, TextAreaComponent, DateTimeComponent],
    providers: [ValidateService, AdministrationService, NotificationService],

})
export class ConditionComponent {
    @Input() conditionFields: ICondition;
    @Input() groupFields: IGroup;

    fieldValueType = 6;
    public validationData;
    fieldValueVisible: boolean = true;
    datetimeRegularExpression = "";
    datetimeformatstring = "";
    dateRegularExpression = "";
    stringRegularExp = "";
    dateformatstring = "";
    @Output() eliminateParentGroup = new EventEmitter();
    constructor(private _validateService: ValidateService, private administrationService: AdministrationService, private notificationService: NotificationService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }
    ngOnInit() {

        var contextObj = this;
        console.log("ConditionComponent", contextObj.conditionFields);
        if (contextObj.conditionFields.ConditionFieldObj.FieldValue == "4" || contextObj.conditionFields.ConditionFieldObj.FieldValue == "5")
            contextObj.fieldValueVisible = false;
        console.log("ConditionComponent-groupFields", contextObj.groupFields);
        contextObj.getdateRegularex();
        contextObj.getdatetimeRegularex();
        contextObj.getStringRegularex();
    }
    conditionLookUp = [
        { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
        { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },// Sp: "Ѫє" },
        { Id: 3, Value: "Contains", Exp: 'LIKE', Sp: "Ñ" },
        { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
        { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" }

    ];

    conditionLookUpInt = [
        { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
        { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },// Sp: "Ѫє" },      
        { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
        { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },
        { Id: 6, Value: "Less than", Exp: '<', Sp: "é" },
        { Id: 7, Value: "Greater than", Exp: '>', Sp: "ü" }


    ];
    removeCondition(datasrc) {
        debugger
        var contextObj = this;

        if (contextObj.groupFields.SubGroups.length > 0) {

            contextObj.notificationService.ShowToaster("Child group exists", 5);
        }
        else {
            var index = contextObj.groupFields.Conditions.findIndex(function (el) { return el['ConditionId'] == datasrc.ConditionId });
            contextObj.groupFields.Conditions.splice(index, 1);

        }

    }
    ddlChangeOperator(event, object) {

        // this.groupFields.Conditions = this.groupFields.Conditions.slice();
    }
    getdateRegularex() {
        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(7).subscribe(function (resultData) {
            contextObj.dateRegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
            contextObj.dateformatstring = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
        });
    }
    getdatetimeRegularex() {
        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(8).subscribe(function (resultData) {
            contextObj.datetimeRegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
            contextObj.datetimeformatstring = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
        });
    }
    getStringRegularex() {

        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(3).subscribe(function (resultData) {
            contextObj.stringRegularExp = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
         
        });
    }
    ddlChangeFldName(event, conditionObj) {
        debugger
        var contextObj = this;

        for (var i = 0; i < contextObj.groupFields.Conditions.length; i++) {
            if (contextObj.groupFields.Conditions[i].FldNameFieldObj.FieldValue == event.ChildFieldObject.FieldValue) {
                var item = contextObj.groupFields.Conditions[i].FldNameFieldObj.LookupDetails.LookupValues.find(function (item) {
                    if (item.Id.toString() == contextObj.groupFields.Conditions[i].FldNameFieldObj.FieldValue && conditionObj.ConditionId == contextObj.groupFields.Conditions[i].ConditionId) {
                        var test = item.Type.toString();

                        contextObj.groupFields.Conditions[i].FldValueFieldObj.GenericDataTypeId = item.Type;
                        contextObj.groupFields.Conditions[i].FldValueFieldObj.FieldValue = "";
                        contextObj.groupFields.Conditions[i].FldValueFieldObj.IsLocallyValidated = false;
                        switch (item.Type) {
                            case 1://type:boolean->control textbox//type:ddl->control textbox
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 5;
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                break;
                            case 2://type:date->control datepicker
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 2;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 7;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z ]+$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = contextObj.dateformatstring;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistExpression"] = "^[0-9a-zA-Z ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistId"] = 7;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.Id = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.RegularExpression = contextObj.dateRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString = "dd MMM yyyy";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                
                                break;
                            case 3://type:datetime->control datetimepicker
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 8;      
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["DataFormat"]= "dd MMM yyyy hh:mm a/pm";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.RegularExpression = contextObj.datetimeRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString = "d MMM yyyy hh:mm a/pm";//contextObj.datetimeformatstring;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 8;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.Id = 2;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z-: ]+$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = "dd-mmm-yyyy HH:mm:ss";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistExpression"] = "^[0-9a-zA-Z-: ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistId"] = 8;
                                //contextObj.groupFields.Conditions[i].FldValueFieldObj["DataFormat"] = contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["DataExpression"] = contextObj.datetimeRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 25;
                             
                                break;
                            case 4://type:float->control textbox

                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 19;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9]*(\.[0-9]+)?$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;


                                break;
                            case 5://type:int->control textbox

                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 5;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 14;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9]+$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 6://type:string->control textbox                            
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 100;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = contextObj.stringRegularExp;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 3;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 7://type:currency->control textbox                             
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 5;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9.]+$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 8://type:datetimeseconds->control textbox
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 8;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z-: ]+$"
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;

                        }
                        return true;
                    }
                });

                //this.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId =

            }
        }
    }

    ddlChangeCondition(event, object, fieldObject) {

        var value = event.ChildFieldObject.FieldValue;

        if (value == 4 || value == 5) {
            this.fieldValueVisible = false;
            object.IsMandatory = false;
            fieldObject.FieldValue = "";
        }
        else {
            this.fieldValueVisible = true;
            object.IsMandatory = true;
        }
    }
    public showComponent(isVisible) {
        if (isVisible) {
            return "block";
        } else {
            return "none";
        }
    }
   
}