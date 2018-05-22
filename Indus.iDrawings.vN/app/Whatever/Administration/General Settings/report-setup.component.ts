import { Component, OnInit, ElementRef, AfterViewChecked, ViewChild, Renderer} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { NgForm} from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

import { ImageUploadComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/imageuploadcomponent.component';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { TextAreaComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { LabelComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component';
import { ButtonComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component';

@Component({
    selector: 'report-setup',
    templateUrl: './app/Views/Administration/General Settings/report-setup.component.html',
    directives: [FieldComponent, Notification, SlideComponent, CustomCheckBoxComponent, CustomCheckBoxComponent, ButtonComponent, ImageUploadComponent,LabelComponent,CustomRadioComponent, DropDownListComponent, TextAreaComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, ValidateService]
})

export class ReportSetupComponent implements OnInit, AfterViewChecked {
    public fieldDetailsReportSetup: IField[];
    public errorMessage: string;
    public validationData;
    public reportFieldArray: any;
    public fileObj: IFileDetails;

    fileName: string = "";
    blnTxtTop: boolean = false;
    blnTxtBottom: boolean = false;
    blnIsImageUpload: boolean = false;
    blnShowWaterMarkImage: boolean = false;
    blnWaterMarkText: boolean = false;
    blnWaterMarkImage: boolean = false;
    blnIsWaterMarkImageSelected: boolean = false;
    blnddlEnableFontSize: boolean = false;
    blnFileDataExists: boolean = false;
    strFileName: string = "";
    strFileData: string = "";
    btnName: string = "Save Changes";
    success = "";
    dataKey: string = "";
    strAllowedExtensions: string[];
    rptHeader = 313
    blnIsFocused: boolean = false;
    @ViewChild('input') input: ElementRef;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions, private el: ElementRef, private _validateService: ValidateService, private _renderer: Renderer) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }

    ngOnInit() {
        var contextObj = this;
        contextObj.strAllowedExtensions = [".jpeg", "jpg",".gif"];

        var blnIsImageUpload: boolean = false;
        this.administrationService.getReportSetupFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.fieldDetailsReportSetup = resultData["Data"];
                if (contextObj.fieldDetailsReportSetup != undefined) {
                    for (var i = 0; i < contextObj.fieldDetailsReportSetup.length; i++) {
                        if (contextObj.fieldDetailsReportSetup[i].FieldId == 313) {
                            if ((contextObj.fieldDetailsReportSetup[i].FieldValue == "") || (contextObj.fieldDetailsReportSetup[i].FieldValue == null)) {
                                contextObj.blnTxtTop = false;
                            }
                            else {
                                contextObj.blnTxtTop = true;
                            }
                        }
                        if ((contextObj.fieldDetailsReportSetup[i].FieldId == 314) || (contextObj.fieldDetailsReportSetup[i].FieldId == 315)) {
                            if (contextObj.blnTxtTop == false) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            else {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                            }
                        }
                        if (contextObj.fieldDetailsReportSetup[i].FieldId == 316) {
                            if ((contextObj.fieldDetailsReportSetup[i].FieldValue == "") || (contextObj.fieldDetailsReportSetup[i].FieldValue == null)) {
                                contextObj.blnTxtBottom = false;
                            }
                            else {
                                contextObj.blnTxtBottom = true;
                            }
                        }
                        if ((contextObj.fieldDetailsReportSetup[i].FieldId == 317) || (contextObj.fieldDetailsReportSetup[i].FieldId == 318)) {
                            if (contextObj.blnTxtBottom == false) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            else {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                            }
                        }
                        if (contextObj.fieldDetailsReportSetup[i].FieldId == 319) { /*Condition for disabling-enabling Radiobuttons*/ 
                            if ((contextObj.fieldDetailsReportSetup[i].FieldValue == "True") || (contextObj.fieldDetailsReportSetup[i].FieldValue == "1")) {
                                contextObj.blnShowWaterMarkImage = true;
                            }
                            else {
                                contextObj.blnShowWaterMarkImage = false;
                            }
                        }
                        if (contextObj.blnShowWaterMarkImage == true) {/*Condition for enabling children under checkbox*/
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 372) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                                if ((contextObj.fieldDetailsReportSetup[i].FieldValue == "True") || (contextObj.fieldDetailsReportSetup[i].FieldValue == "1")) {
                                    contextObj.blnWaterMarkImage = true;
                                    contextObj.fieldDetailsReportSetup[i].FieldValue = "1";
                                }
                                else {
                                    contextObj.blnWaterMarkImage = false;
                                    contextObj.fieldDetailsReportSetup[i].FieldValue = "2";
                                }
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 357) {
                                if (contextObj.blnWaterMarkImage == true) {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                                }
                                else {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                                }
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 358) {
                                if (contextObj.blnWaterMarkImage == true) {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                                    contextObj.blnddlEnableFontSize = false;
                                }
                                else {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                                    if (contextObj.fieldDetailsReportSetup[i].FieldValue != null) {
                                        contextObj.blnddlEnableFontSize = true;
                                    }
                                }
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 359) {
                                if (contextObj.blnddlEnableFontSize == false) {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                                }
                                else {
                                    contextObj.fieldDetailsReportSetup[i].IsEnabled = true;
                                    contextObj.fieldDetailsReportSetup[i].FieldValue = "32";
                                }
                            }
                        }
                        else if (contextObj.blnShowWaterMarkImage == false) { /*Condition for disabling children under checkbox*/
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 372) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 357) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 358) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            if (contextObj.fieldDetailsReportSetup[i].FieldId == 359) {
                                contextObj.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                        }
                        if (contextObj.fieldDetailsReportSetup[i].FieldId == 357) {
                            if (contextObj.fieldDetailsReportSetup[i].FileData != "" || contextObj.fieldDetailsReportSetup[i].FileData != "" || contextObj.fieldDetailsReportSetup[i].FileData != undefined) {
                                contextObj.blnFileDataExists = true;
                                contextObj.strFileName = contextObj.fieldDetailsReportSetup[i].FieldValue;
                                contextObj.strFileData = contextObj.fieldDetailsReportSetup[i].FileData;
                            }
                            else {
                                contextObj.blnFileDataExists = false;
                            }
                        }  
                    }
                }
            }
        });
    }

    ngAfterViewChecked() {
        var getIFieldHeader: IField;
        var getIFieldFooter: IField;
        var blnHasValidationError: boolean = false;
        if (this.fieldDetailsReportSetup != undefined) {
            getIFieldHeader = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 313; });
            if (getIFieldHeader != undefined) {
                var headerBoldIfield: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 314; });
                var headerItalicIfield: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 315; });
                if (getIFieldHeader.HasValidationError == true) {
                    headerBoldIfield.IsEnabled = false;
                    headerItalicIfield.IsEnabled = false;
                }
                else {
                    if (getIFieldHeader.FieldValue.length != 0) {
                        headerBoldIfield.IsEnabled = true;
                        headerItalicIfield.IsEnabled = true;
                    }
                    else {
                        headerBoldIfield.IsEnabled = false;
                        headerItalicIfield.IsEnabled = false;
                        var chkHeaderBold = <HTMLInputElement>document.getElementById("314");
                        if (chkHeaderBold != undefined) {
                            chkHeaderBold.checked = false;
                        }
                        var chkHeaderItalic = <HTMLInputElement>document.getElementById("315");
                        if (chkHeaderItalic != undefined) {
                            chkHeaderItalic.checked = false;
                        }
                    }
                }
              
            }
            getIFieldFooter = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 316; });
            if (getIFieldFooter != undefined) {
                var footerBoldIfield: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 317; });
                var footerItalicIfield: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 318; });
                if (getIFieldFooter.HasValidationError == true) {
                    footerBoldIfield.IsEnabled = false;
                    footerItalicIfield.IsEnabled = false;
                }
                else {
                    if (getIFieldFooter.FieldValue.length != 0) {
                        footerBoldIfield.IsEnabled = true;
                        footerItalicIfield.IsEnabled = true;
                    }
                    else {
                        footerBoldIfield.IsEnabled = false;
                        footerItalicIfield.IsEnabled = false;
                        var chkFooterBold = <HTMLInputElement>document.getElementById("317");
                        if (chkFooterBold != undefined) {
                            chkFooterBold.checked = false;
                        }
                        var chkFooterItalic = <HTMLInputElement>document.getElementById("318");
                        if (chkFooterItalic != undefined) {
                            chkFooterItalic.checked = false;
                        }
                    }
                }
            }
            if (this.blnIsFocused != true) {
                var input = null;
                var idtoFocus;
                idtoFocus = 313;
                input = document.getElementById(idtoFocus.toString());
                if (input != undefined) {
                    this._renderer.invokeElementMethod(input, 'focus');
                    this.blnIsFocused = true;
                }
            }
        }
    }

    getKeyUpData(event) {
        if (event.event != null || event.event != undefined) {
            var ddlFontSizeIField: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 359; });
            for (var i = 0; i < event.fieldObject.length; i++) {
                if (event.fieldObject[i].FieldId == 358) {
                    if (ddlFontSizeIField != undefined) {
                        if ((event.event.length > 0) && (event.fieldObject[i].IsEnabled == true) ) {
                            ddlFontSizeIField.IsEnabled = true;
                        }
                        else {
                            ddlFontSizeIField.IsEnabled = false;
                        }
                    }
                }
            }
        }
    }

    editFileDetails(fieldobject: any, filedata: any) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 133) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    } 
    editFieldDetails(fieldobject: any) {
        var jsonobject = JSON.parse(fieldobject);
        return jsonobject;
    } 

    onSubmitData(event, file?:any) {
        var contextObj = this;
        var blnImageSelected: boolean = false;
        if (event != undefined) {
            var tempData = JSON.parse(event);
            for (var i = 0; i < tempData.length; i++) {
                if (tempData[i].ReportFieldId == 363) {
                    if (tempData[i].Value == "1") {
                        blnImageSelected = true;
                    }
                    else {
                        blnImageSelected = false;
                    }
                }
            }
        }
        if (blnImageSelected == true) {  /*WaterMark Image*/ 
            if (file != undefined) {
                if (file.length > 0) {
                    this.editFileDetails(event, file);
                    if (this.fileName.length > 100) {
                        contextObj.notificationService.ShowToaster("Maximum length of 100 characters reached for file name", 5);
                    }
                    else {
                        this.administrationService.postUpdateReportSetupFields(JSON.stringify(this.editFileDetails(event, file)), file, "").subscribe(function (resultData) {
                            contextObj.success = resultData["Data"].Message;
                            if (contextObj.success == "Success") {
                                contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                            }
                            else if (contextObj.success == "Invalid File") {
                                contextObj.notificationService.ShowToaster("Select a valid image", 2);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                            }
                        });
                    }
                }
            }
            else {
                if (contextObj.blnFileDataExists == true) {
                    var fObject = new Array<IFileDetails>();
                    var fileDataObj: any;
                    fObject.push({
                        ReportFieldId: 133,
                        FileName: contextObj.strFileName,
                        FileData: contextObj.strFileData,
                        FileSize : 10000
                    });
                    fileDataObj = 
                    this.administrationService.postUpdateReportSetupFields(JSON.stringify(this.editFieldDetails(event)), JSON.stringify(fObject[0]), "").subscribe(function (resultData) {
                        contextObj.success = resultData["Data"].Message;
                        if (contextObj.success == "Success") {
                            contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                        }
                        else if (contextObj.success == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid image", 2);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                        }
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Select an Image", 2);
                }
            }
        }
        else { /*WaterMark Text*/ 
            var fieldObj = JSON.parse(event);
            for (let i = 0; i < fieldObj.length; i++) {
                if (fieldObj[i].ReportFieldId == 133) {
                    fieldObj[i].Value = "";
                }
                if (fieldObj[i].ReportFieldId == 363) {
                    if (fieldObj[i].Value == "1") {
                        fieldObj[i].Value = "1"
                    }
                    else if (fieldObj[i].Value == "2") {
                        fieldObj[i].Value = "0"
                    }
                }
                if (fieldObj[i].ReportFieldId == 372) {
                    if (fieldObj[i].Value == "False" || fieldObj[i].Value == "false") {
                        fieldObj[i].Value = "2"
                    }
                    else {
                        fieldObj[i].Value = "1"
                    }
                }
            }
            this.administrationService.postUpdateReportSetupFieldsWithoutImage(JSON.stringify(fieldObj)).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Report Setup updated", 3);
                    }
                }
            });
        }
    }

    emitKeyUp(event: any) {
        if (event != null || event != undefined) {
            var ddlFontSizeIField: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 359; });
            for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                if (this.fieldDetailsReportSetup[i].FieldId == 358) {
                    if (ddlFontSizeIField != undefined) {
                        if ((event.length > 0) && (this.fieldDetailsReportSetup[i].IsEnabled == true)) {
                            ddlFontSizeIField.IsEnabled = true;
                        }
                        else {
                            ddlFontSizeIField.IsEnabled = false;
                        }
                    }
                }
            }
        }
    }

    txtBoxChanges(value: any) {
        var blnEnableddl: boolean = false;
        if (value.txtBoxData.target.id == "313") {
            if (value.txtBoxData.target.value.length == 0) {
                this.blnTxtTop = false;
            }
            else {
                this.blnTxtTop = true;
            }
            for (let i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                if ((this.fieldDetailsReportSetup[i].FieldId == 314) || (this.fieldDetailsReportSetup[i].FieldId == 315)) {
                    if (this.blnTxtTop == false) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                    else {
                        this.fieldDetailsReportSetup[i].IsEnabled = true;
                    }
                }
            }
        }
        if (value.txtBoxData.target.id == "316") {
            if (value.txtBoxData.target.value.length == 0) {
                this.blnTxtBottom = false;
            }
            else {
                this.blnTxtBottom = true;
            }
            for (let i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                if ((this.fieldDetailsReportSetup[i].FieldId == 317) || (this.fieldDetailsReportSetup[i].FieldId == 318)) {
                    if (this.blnTxtBottom == false) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                    else {
                        this.fieldDetailsReportSetup[i].IsEnabled = true;
                    }
                }
            }
        }
        if (value.fieldObject.FieldId == 358) {
            if (value.fieldObject.FieldValue != "") {
                blnEnableddl = true;
            }
            else {
                blnEnableddl = false;
            }
            for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                if (this.fieldDetailsReportSetup[i].FieldId == 359) {
                    if (blnEnableddl == true) {
                        this.fieldDetailsReportSetup[i].IsEnabled = true;
                        this.fieldDetailsReportSetup[i].FieldValue = "32";
                    }
                    else {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                }
            }
        }
    }

    chkBoxChange(event: any) {
        var blnEnableImageUpload: boolean = false;
        var blnEnableddl: boolean = false;
        if (event.fieldId == 319) {
            if (event.IsChecked == true) {
                for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                    if (this.fieldDetailsReportSetup[i].FieldId == 372) {
                        this.fieldDetailsReportSetup[i].IsEnabled = true;
                        if (this.fieldDetailsReportSetup[i].FieldValue == "1") {
                            blnEnableImageUpload = true;
                        }
                        else {
                            blnEnableImageUpload = false;
                        }
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 357) {
                        if (blnEnableImageUpload == true) {
                            this.fieldDetailsReportSetup[i].IsEnabled = true;
                        }
                        else {
                            this.fieldDetailsReportSetup[i].IsEnabled = false;
                        }
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 358) {
                        if (blnEnableImageUpload == true) {
                            this.fieldDetailsReportSetup[i].IsEnabled = false;
                            blnEnableddl = false;
                            var showImageObj: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 372; });
                            showImageObj.FieldValue = showImageObj.LookupDetails.LookupValues[0].Id.toString();
                        }
                        else {
                            this.fieldDetailsReportSetup[i].IsEnabled = true;
                            if (this.fieldDetailsReportSetup[i].FieldValue != "") {
                                blnEnableddl = true;
                                var showImageObj: IField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 372; });
                                showImageObj.FieldValue = showImageObj.LookupDetails.LookupValues[1].Id.toString();
                            }
                        }
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 359) {
                        if (blnEnableddl == true) {
                            this.fieldDetailsReportSetup[i].IsEnabled = true;
                            this.fieldDetailsReportSetup[i].FieldValue = "32";
                        }
                        else {
                            this.fieldDetailsReportSetup[i].IsEnabled = false;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                    if (this.fieldDetailsReportSetup[i].FieldId == 372) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 357) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 358) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                    if (this.fieldDetailsReportSetup[i].FieldId == 359) {
                        this.fieldDetailsReportSetup[i].IsEnabled = false;
                    }
                }
            }
        }
    }

    rbtnChange(event: any) {
        var blnEnableddl: boolean = false;
        for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
            if (this.fieldDetailsReportSetup[i].FieldId == 372) {
                if (this.fieldDetailsReportSetup[i].IsEnabled == true) {
                    if (event.fieldobject.FieldValue == "1") {
                        for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                            if (this.fieldDetailsReportSetup[i].FieldId == 357) {
                                this.fieldDetailsReportSetup[i].IsEnabled = true;
                            }
                            if (this.fieldDetailsReportSetup[i].FieldId == 358) {
                                this.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            if (this.fieldDetailsReportSetup[i].FieldId == 359) {
                                this.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                        }
                    }
                    else if (event.fieldobject.FieldValue == "2") {
                        for (var i = 0; i < this.fieldDetailsReportSetup.length; i++) {
                            if (this.fieldDetailsReportSetup[i].FieldId == 357) {
                                this.fieldDetailsReportSetup[i].IsEnabled = false;
                            }
                            if (this.fieldDetailsReportSetup[i].FieldId == 358) {
                                this.fieldDetailsReportSetup[i].IsEnabled = true;
                                if (this.fieldDetailsReportSetup[i].FieldValue != "") {
                                    blnEnableddl = true;
                                }
                            }
                            if (this.fieldDetailsReportSetup[i].FieldId == 359) {
                                if (blnEnableddl == true) {
                                    this.fieldDetailsReportSetup[i].IsEnabled = true;
                                    this.fieldDetailsReportSetup[i].FieldValue = "32";
                                }
                                else {
                                    this.fieldDetailsReportSetup[i].IsEnabled = false;
                                }
                            }
                        }
                    }
                    var element = <HTMLElement>document.getElementById("357");
                    if (element != undefined) {
                        element.focus();
                    }
                }
            }
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

    onSubmit(form: NgForm, value: string) {

        var checkForErrors = function (fieldObject: IField) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsReportSetup.find(checkForErrors)) {
            return;
        }
        var obj: GeneralFunctions = new GeneralFunctions();
        var retObj;
        if (this.fileObj != null) {
            retObj = obj.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": this.fieldDetailsReportSetup, "filedata": this.fileObj });
            this.reportFieldArray = retObj["fieldobject"];
        }
        else {
            this.reportFieldArray = obj.getFieldValuesAsReportFieldArray(this.fieldDetailsReportSetup);
        }
        var isValid = true;
        if (isValid == true) {
            if (retObj != undefined) {
                this.onSubmitData(this.reportFieldArray, retObj["filedata"]);
            } else {
                this.onSubmitData(this.reportFieldArray);
            }
        }
        else {
        }

    }

    getImageData(event: any)
    {
        this.fileObj = event;
    }


}

export interface IFileDetails {
    ReportFieldId: number,
    FileName: string,
    FileSize: number,
    FileData: string
}

export interface ReportFieldArray {
    ReportFieldId: number;
    FieldValue: string;
}
