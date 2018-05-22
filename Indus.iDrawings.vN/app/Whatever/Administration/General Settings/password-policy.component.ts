import { Component, OnInit, ElementRef, ViewChild, Renderer,AfterViewChecked } from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';


import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { ButtonComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component';



@Component({
    selector: 'password-policy',
    templateUrl: './app/Views/Administration/General Settings/password-policy.component.html',
    directives: [FieldComponent, Notification, SlideComponent, StringTextBoxComponent, DropDownListComponent, CustomRadioComponent, CustomCheckBoxComponent, ButtonComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, ValidateService]
})

export class PasswordPolicyComponent implements OnInit, AfterViewChecked{

    public fieldDetailsPasswordPolicy: IField[];
    public errorMessage: string;
    btnName: string = "Save Changes";
    position = "top-left";
    horizontal = "horizontal";
    public validationData;
    menuwidth;
    showSlide = false;
    public reportFieldArray: any;
    @ViewChild('input') input: ElementRef;
    blnIsFocused: boolean = false;

    constructor(private administrationService: AdministrationService, private el: ElementRef, private _validateService: ValidateService, private notificationService: NotificationService, private generFun: GeneralFunctions, private _renderer: Renderer)
    {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }


    ngOnInit() {
        var contextObj = this;    
        this.administrationService.getpasswordPolicyFields().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldDetailsPasswordPolicy = resultData["Data"];
                contextObj.fieldDetailsPasswordPolicy[6].LookupDetails.LookupValues = [
                    {
                        "Id": 1,
                        "Value": "Password Never Expires",
                    },
                    {
                        "Id": 2,
                        "Value": "Expire after",
                    }
                ];
                contextObj.fieldDetailsPasswordPolicy[13].LookupDetails.LookupValues = [
                    {
                        "Id": 3,
                        "Value": "Account Never Locked",
                    },
                    {
                        "Id": 4,
                        "Value": "Locked after",
                    }
                ];
                for (let i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
                    if (i == 0 || (i >= 7 && i <= 12) || i == 14 )
                    {
                        contextObj.fieldDetailsPasswordPolicy[i].Width = "50";
                    }
                    if (i == 6) {
                        if (contextObj.fieldDetailsPasswordPolicy[6].FieldValue == "True" || contextObj.fieldDetailsPasswordPolicy[6].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[6].FieldValue == "")
                            contextObj.fieldDetailsPasswordPolicy[6].FieldValue = "1";
                        else {
                            contextObj.fieldDetailsPasswordPolicy[6].FieldValue = "2";
                            contextObj.fieldDetailsPasswordPolicy[6].IsMandatory = true;
                        }
                        contextObj.RbnChange(contextObj.fieldDetailsPasswordPolicy[6].FieldLabel, contextObj)
                    }
                    else if (i == 13) {
                        if (contextObj.fieldDetailsPasswordPolicy[13].FieldValue == "False" || contextObj.fieldDetailsPasswordPolicy[13].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[13].FieldValue == "")
                            contextObj.fieldDetailsPasswordPolicy[13].FieldValue = "3";
                        else {
                            contextObj.fieldDetailsPasswordPolicy[13].FieldValue = "4";
                            contextObj.fieldDetailsPasswordPolicy[6].IsMandatory = true;
                        }
                        contextObj.RbnChange(contextObj.fieldDetailsPasswordPolicy[13].FieldLabel, contextObj)
                    }
                    else if (i == 0) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Minimum 8 Characters)";
                    }
                    else if (i == 8) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Hours)";
                    }
                    else if (i == 9) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Maximum 20)";
                    }
                    else if (i == 12 || i == 11) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Minutes)";
                    }
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldId == 184 && (contextObj.fieldDetailsPasswordPolicy[i].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[i].FieldValue == ""))
                    {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldValue = "8";
                    }
                }
                contextObj.fieldDetailsPasswordPolicy[14].FieldLabel = "Days";
                contextObj.checkboxEnable(contextObj.fieldDetailsPasswordPolicy[1].FieldValue, contextObj)
                contextObj.fieldDetailsPasswordPolicy;
            } 
        });                
    }

    ngAfterViewChecked() {
        if (this.blnIsFocused != true) {
            var input = null;
            var idtoFocus;
            idtoFocus = 184;
            input = document.getElementById(idtoFocus.toString());
            if (input != undefined) {
                this._renderer.invokeElementMethod(input, 'focus');
                this.blnIsFocused = true;
            }
        }
    }
    onSubmitData(event: any) {
        var contextObj = this;
        var message = "";
        debugger;
        var data=JSON.parse(event);
        for (let i = 0; i < data.length; i++) {
            if (data[i].ReportFieldId == 321)
            {
                if (data[i].Value == "2") {
                    data[i].Value = "0";
                }
                else
                {
                    data[i+1].Value = "";
                }
            }

            if (data[i].ReportFieldId == 325) {
                if (data[i].Value == "") {
                    if (data[i+1].Value != "") {
                        message = "Enter Maximum number of consecutive failed attempts before the account gets locked";
                    }
                    if (data[i+2].Value != "") {
                        message = "Enter Maximum number of consecutive failed attempts before the account gets locked";
                    }
                }
                else {
                    if (data[i + 1].Value == "") {
                        message = "Enter Time interval for counting failed attempts to lock the account";
                    }
                    if (data[i + 2].Value == "") {
                        message = "Enter Account locked out period";
                    }
                }
            }

            if (data[i].ReportFieldId == 6315) {
                if (data[i].Value == "3") {
                    data[i].Value = "0";
                    data[i + 1].Value = "";
                }
                else {
                    data[i].Value = "1";
                }
            }
            if (data[i].ReportFieldId == 316) {
                if (data[i].FieldValue == "False" || data[i].FieldValue == "false") {
                    data[i + 1].FieldValue = "False";
                    data[i + 2].FieldValue = "False";
                }
            }
        }
        if (message == "") {
            data = JSON.stringify(data);
            this.administrationService.updatePasswordPolicy(data).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) { 
                    if (resultData["Data"].Message == "Success")
                        contextObj.notificationService.ShowToaster("Password Policy updated", 3);
                    else
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
                }
            });
        }
        else
        {
            contextObj.notificationService.ShowToaster(message, 5);
        }
    }

    menuClick(value: any)
    {
        this.showSlide = !this.showSlide;
    }
    closeSlideDialog(value:any)
    {
        this.showSlide = value.value;
    }

    RbnChange(value: any, contextObj: any) {

        if (value == "Password expiry") {
            for (let i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                if (contextObj.fieldDetailsPasswordPolicy[i].ReportFieldId == 321) {
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldValue != 1) {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                    }
                    else {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                    }
                }
            }
        }
        if (value == "Inactive Account Locking") {

            for (let i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
                if (contextObj.fieldDetailsPasswordPolicy[i].ReportFieldId == 6315) {
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldValue == 4) {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                    }
                    else {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                    }
                }
            }
        }
    }

    checkboxEnable(value: any, contextObj: any)
    {
        if (value == true || value=="True") {
            contextObj.fieldDetailsPasswordPolicy[2].IsEnabled = true;
            contextObj.fieldDetailsPasswordPolicy[3].IsEnabled = true;
        }
        else {
            contextObj.fieldDetailsPasswordPolicy[2].IsEnabled = false;
            contextObj.fieldDetailsPasswordPolicy[3].IsEnabled = false;
            contextObj.fieldDetailsPasswordPolicy[2].FieldValue = false;
            contextObj.fieldDetailsPasswordPolicy[3].FieldValue = false;
        }

    }


    emitKeyUp(value:any)
    {

    }

    txtBoxChanges(value: any)
    {

    }

    chkBoxChange(value: any) {
        debugger;
        var contextObj = this;
        for (let i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
            if (contextObj.fieldDetailsPasswordPolicy[i].FieldId == value.fieldId) {
                contextObj.fieldDetailsPasswordPolicy[i].FieldValue = value.IsChecked;
            }
        }
        if (value.fieldId == 185) {
            this.checkboxEnable(value.IsChecked, contextObj);
        }
    }

    rbtnChange(value: any) {
        debugger;
        if (value.fieldobject.FieldLabel == "Password expiry") {
            for (let i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                if (this.fieldDetailsPasswordPolicy[i].ReportFieldId == 321) {
                    if (value.fieldobject.FieldValue != 1) {
                        this.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        this.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                        this.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                    }
                    else {
                        this.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        this.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                        this.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                    }
                    var contextObj = this;
                    var el = <HTMLElement>document.getElementById("196");
                    setTimeout(function () {
                        contextObj._validateService.initiateValidation(contextObj.fieldDetailsPasswordPolicy[i + 1], contextObj, true, el);
                    }, 100);
                }
            }
        }
        if (value.fieldobject.FieldLabel == "Inactive Account Locking") {
            for (let i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                if (this.fieldDetailsPasswordPolicy[i].ReportFieldId == 6315) {
                    if (value.fieldobject.FieldValue == 4) {
                        this.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        this.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                        this.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                    }
                    else {
                        this.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        this.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                        this.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                    }
                    var el = <HTMLElement>document.getElementById("199");
                    var contextObj = this;
                    setTimeout(function () {
                        contextObj._validateService.initiateValidation(contextObj.fieldDetailsPasswordPolicy[i + 1], contextObj, true, el);
                    }, 100);
                }
            }
        }
    }

    onSubmit(form: NgForm, value: string) {
        var checkForErrors = function (fieldObject: IField) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsPasswordPolicy.find(checkForErrors)) {
            return;
        }
        var retObj;
        this.reportFieldArray = this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsPasswordPolicy);
        debugger;
        var isValid = true;
        if (isValid == true) {
            this.onSubmitData(this.reportFieldArray);
        }
        else {
        }
    }

    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    
}

export interface ReportFieldArray {
    ReportFieldId: number;
    FieldValue: string;
}