import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IField} from '../../../Models/Interface/IField';
import {Validation} from '../../Validation/validate.directive';
import { Notification} from '../../../Whatever/Notification/notify.component';
import { NotificationService } from '../../../Models/Notification/notify.service';
import { AdministrationService } from '../../../../models/administration/administration.service';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'FileUploadComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/fileuploadcomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation],
    providers: [NotificationService, AdministrationService, GeneralFunctions]
})

export class FileUploadComponent {
    public fieldObject: IField;
    reportField = new Array<ReportFieldArray>();
    strFileExtensions = new Array<FileExtensionData>();
    strAllowedExtensions = new Array<FilExt>();
    strAllowedExtensionsWithoutInp = new Array<FilExt>();
    @Input() validationData;
    @Input() commonFileExtensions: string[];
    @Output() validateMessageForGrid = new EventEmitter();
    @Output() fileData = new EventEmitter<IFileDetails>();
    contextObj = this;
    strFileName: string = "";

    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var objContext = this;
        objContext.strFileName = "";
        if (objContext.fieldObject.FieldValue != null) {
            objContext.strFileName = objContext.fieldObject.FieldValue;
        }
        if (this.commonFileExtensions != undefined) {
            this.reportField.push({
                ReportFieldId: 331,
                Value: ""
            });
            this.administrationService.getCustomerPermittedFiles(JSON.stringify(this.reportField)).subscribe(function (result) {
                if (objContext.generFun.checkForUnhandledErrors(result)) {
                    objContext.strAllowedExtensions = JSON.parse(result["Data"].FieldBinderData);
                    if (objContext.strAllowedExtensions != undefined) {
                        for (var i = 0; i < objContext.strAllowedExtensions.length; i++) {
                            if (objContext.commonFileExtensions.includes(objContext.strAllowedExtensions[i].Extension1)) {
                                objContext.strFileExtensions.push({
                                    strFileExtension: objContext.strAllowedExtensions[i].Extension1
                                });
                            }
                            if (objContext.commonFileExtensions.includes(objContext.strAllowedExtensions[i].Extension2)) {
                                objContext.strFileExtensions.push({
                                    strFileExtension: objContext.strAllowedExtensions[i].Extension2
                                });
                            }
                        }
                    }
                }
            });
        }
        else {
            this.reportField.push({
                ReportFieldId: 331,
                Value: ""
            });
            this.administrationService.getCustomerPermittedFiles(JSON.stringify(this.reportField)).subscribe(function (result) {
                if (objContext.generFun.checkForUnhandledErrors(result)) {
                    objContext.strAllowedExtensions = JSON.parse(result["Data"].FieldBinderData);
                    if (objContext.strAllowedExtensions != undefined) {
                        for (var i = 0; i < objContext.strAllowedExtensions.length; i++) {
                            if (objContext.strAllowedExtensions[i].Extension1 != "") {
                                objContext.strFileExtensions.push({
                                    strFileExtension: objContext.strAllowedExtensions[i].Extension1
                                });
                            }
                            if (objContext.strAllowedExtensions[i].Extension2 != "") {
                                objContext.strFileExtensions.push({
                                    strFileExtension: objContext.strAllowedExtensions[i].Extension2
                                });
                            }
                        }
                    }
                }
            });
        }
    }

    validateMessage(event) {
        this.validateMessageForGrid.emit(event);
    }

    onclick(event) { /* to clear filename*/
        event.target.value = "";
    }

    onclickSelect(event) {
        document.getElementById((this.fieldObject.FieldId).toString()).click();
    }
    onKeyPressEvent(Keyevent, target) {
        var key = Keyevent.keyCode || Keyevent.which;
        switch (target) {
            case 1:
                if (key == 13 || key == 32) {
                    this.onclickSelect(Keyevent);
                }
                break;
        }
    }

    onChange(event) {
        if (document.getElementById("contentDiv").children[0].innerHTML == "span") {
            document.getElementById("contentDiv").children[0].remove();
        }
        var files = event.target.files;
        var blnAllowUpload: boolean = false;
        
        var strFileName = files[0].name;
        var reader, file;
        var objContext = this.contextObj;
        var ftype: any;
        if (strFileName.split(".").length > 2) {
            for (var m = 0; m < strFileName.split(".").length; m++) {
                if (m == strFileName.split(".").length - 1) {
                    ftype = strFileName.split(".")[m];
                }
            }
        }
        else {
            ftype = strFileName.split(".")[1];
        }
        ftype = "." + ftype;
        if (files != null || files != undefined) {
            if (objContext.commonFileExtensions != undefined) {
                for (var j = 0; j < objContext.strFileExtensions.length; j++) {
                    if (objContext.strFileExtensions[j].strFileExtension.toUpperCase() == ftype.toUpperCase()) {
                        blnAllowUpload = true;
                    }
                }
            }
            else {
                for (var j = 0; j < objContext.strFileExtensions.length; j++) {
                    if (objContext.strFileExtensions[j].strFileExtension.toUpperCase() == ftype.toUpperCase()) {
                        blnAllowUpload = true;
                    }
                }
                if (ftype.toUpperCase() == ".IFC" || ftype.toUpperCase() == ".RVT")
                    blnAllowUpload = true;
            }
            if (/(--)/.test(strFileName)) {
                blnAllowUpload = false;
            }
            if (blnAllowUpload == true) {
                if (strFileName.length < 100) {
                    if (/^[a-zA-Z0-9!@#$%&()+=\s\:.,?{\}_-]+$/.test(strFileName)) {
                        for (let i = 0; i < files.length; i++) {
                            file = files[i];
                            reader = new FileReader();
                            reader.readAsDataURL(file);      
                            reader.onload = function (e) {
                               /* var binaryString = btoa(e.target.result);*/
                                //console.log(reader.result);
                                //var binaryString = "";
                                //var bytes = new Uint8Array(e.target.result);
                                //var length = bytes.byteLength;

                                //for (var i = 0; i < length; i++) {
                                //    binaryString += String.fromCharCode(bytes[i]);
                                //}
                                //binaryString = btoa(binaryString);
                                ///*att.Body = (new sforce.Base64Binary(binary)).toString();*/
                                //objContext.fieldObject.FieldValue = "";
                                objContext.fileData.emit({
                                    ReportFieldId: objContext.fieldObject.ReportFieldId,
                                    FileName: file.name,
                                    FileData: reader.result.split("base64,")[1],
                                    FileSize: file.size
                                });
                                objContext.strFileName = file.name;
                                objContext.fieldObject.FieldValue = file.name;
                           };
                           // reader.readAsArrayBuffer(file);                                                     
                        }
                    }
                    else {
                       /*this.notificationService.ShowToaster("Special characters are not allowed in " + this.fieldObject.FieldLabel, 2);*/
                        this.notificationService.ShowToaster("Special characters are not allowed in File name", 2);
                    }
                }
                else {
                   /*this.notificationService.ShowToaster("Maximum length of 100 characters reached in the " + this.fieldObject.FieldLabel, 2);Bug Id : 71751*/
                    this.notificationService.ShowToaster("Maximum length of 100 characters reached for File name", 2);
                }
            }
            else {
                this.notificationService.ShowToaster("You do not have privilege to add this type of File", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Select a file", 2);
        }
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
    Value: string;
}

export interface FilExt {
    Description: string,
    Extension1: string,
    Extension2: string
}

export interface FileExtensionData {
    strFileExtension: string;
}

