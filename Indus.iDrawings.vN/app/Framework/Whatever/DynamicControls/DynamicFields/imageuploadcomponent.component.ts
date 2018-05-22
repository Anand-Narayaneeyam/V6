import {Component, Input, Output, EventEmitter,OnInit,SimpleChange} from '@angular/core';
import {IField} from '../../../Models/Interface/IField';
import {Validation} from '../../Validation/validate.directive';
import { Notification} from '../../../Whatever/Notification/notify.component';
import { NotificationService } from '../../../Models/Notification/notify.service';
import { AdministrationService } from '../../../../models/administration/administration.service';
import { GeneralFunctions} from '../../../../Models/Common/General';


@Component({
    selector: 'ImageComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/imageupload.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation],
    providers: [NotificationService, AdministrationService, GeneralFunctions]
})

export class ImageUploadComponent implements OnInit{
    public fieldObject: IField;
    reportField = new Array<ReportFieldArray>();
    strFileExtensions = new Array<FileExtensionData>();
    strAllowedExtensions = new Array<FilExt>();
    strAllowedExtensionsWithoutInp = new Array<FilExt>();
    strAllowedImageTypes: string[];
    @Input() validationData;
    @Input() fileExtensions: string[]; /*input for fetching allowed file extensions*/ 
    @Output() validateMessageForGrid = new EventEmitter();
    @Output() imageData = new EventEmitter<IFileDetails>();
    @Output() fileObjectDetails = new EventEmitter();
    contextObj = this;
    strImageSrc: string = "";
    strFileName: string = "";

    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private getData: GeneralFunctions) {
    }

    ngOnInit() {
        this.setFileData();
    }

    setFileData() {
        var objContext = this;
        objContext.strImageSrc = "";
        objContext.strFileName = "";
        objContext.strAllowedImageTypes = [".gif", ".jpg", ".jpeg", ".tiff", ".tif", ".bmp"];
        if (objContext.fieldObject.FieldValue != null) {
            objContext.strFileName = objContext.fieldObject.FieldValue;
            var fileExtension = objContext.fieldObject.FieldValue.split(".")[1];
            switch (fileExtension) {
                case "jpg":
                    objContext.strImageSrc = "data:image/jpg;base64," + objContext.fieldObject.FileData;
                    break;
                case "jpeg":
                    objContext.strImageSrc = "data:image/jpg;base64," + objContext.fieldObject.FileData;
                    break;
                case "png":
                    objContext.strImageSrc = "data:image/png;base64," + objContext.fieldObject.FileData;
                    break;
                case "gif":
                    objContext.strImageSrc = "data:image/gif;base64," + objContext.fieldObject.FileData;
                    break;
                case "tiff":
                    objContext.strImageSrc = "data:image/tiff;base64," + objContext.fieldObject.FileData;
                    break;
                case "tif":
                    objContext.strImageSrc = "data:image/tif;base64," + objContext.fieldObject.FileData;
                    break;
                case "bmp":
                    objContext.strImageSrc = "data:image/bmp;base64," + objContext.fieldObject.FileData;
                    break;
                default:
                    objContext.strImageSrc = "data:image/jpg;base64," + objContext.fieldObject.FileData;
                    break;
            }
        }
        if (this.fileExtensions != undefined) {
            this.reportField.push({
                ReportFieldId: 331,
                Value: ""
            });
            this.administrationService.getCustomerPermittedFiles(JSON.stringify(this.reportField)).subscribe(function (result) {
                if (objContext.getData.checkForUnhandledErrors(result)) {
                    objContext.strAllowedExtensions = JSON.parse(result["Data"].FieldBinderData);
                    if (objContext.strAllowedExtensions != undefined) {
                        for (var i = 0; i < objContext.strAllowedExtensions.length; i++) {
                            if (objContext.strAllowedImageTypes.includes(objContext.strAllowedExtensions[i].Extension1)) {
                                if (objContext.fileExtensions.includes(objContext.strAllowedExtensions[i].Extension1)) {
                                    objContext.strFileExtensions.push({
                                        strFileExtension: objContext.strAllowedExtensions[i].Extension1
                                    });
                                }
                            }
                            if (objContext.strAllowedImageTypes.includes(objContext.strAllowedExtensions[i].Extension2)) {
                                if (objContext.fileExtensions.includes(objContext.strAllowedExtensions[i].Extension2)) {
                                    objContext.strFileExtensions.push({
                                        strFileExtension: objContext.strAllowedExtensions[i].Extension2
                                    });
                                }
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
                if (objContext.getData.checkForUnhandledErrors(result)) {
                objContext.strAllowedExtensions = JSON.parse(result["Data"].FieldBinderData);
                    if (objContext.strAllowedExtensions != undefined) {
                        for (var i = 0; i < objContext.strAllowedExtensions.length; i++) {
                            if (objContext.strAllowedImageTypes.includes(objContext.strAllowedExtensions[i].Extension1)) {
                                if (objContext.strAllowedExtensions[i].Extension1 != "") {
                                    objContext.strFileExtensions.push({
                                        strFileExtension: objContext.strAllowedExtensions[i].Extension1
                                    });
                                }
                            }
                            if (objContext.strAllowedImageTypes.includes(objContext.strAllowedExtensions[i].Extension2)) {
                                if (objContext.strAllowedExtensions[i].Extension2 != "") {
                                    objContext.strFileExtensions.push({
                                        strFileExtension: objContext.strAllowedExtensions[i].Extension2
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    onclick(event) { /*to clear filename*/ 
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

    validateMessage(event) {
        this.validateMessageForGrid.emit(event);
    }

    handleFileSelect(evt) {
        var objContext = this.contextObj;
        
        var spanElement = document.getElementById("imageSpan");
        if (spanElement) {
            spanElement.remove();
        }
        if (document.getElementById("contentDiv").children[0].innerHTML == "span") {
            document.getElementById("contentDiv").children[0].remove();
        }
        var files = evt.target.files;
        if (files != null || files != undefined) {
            var blnAllowUpload: boolean = false;
            var fileType: string = evt.target.files[0].type;
            if (objContext.fileExtensions != undefined) {
                if (fileType.includes("/") == true) {
                    var ftype = "." + fileType.split("/")[1];
                    for (var j = 0; j < objContext.strFileExtensions.length; j++) {
                        if (objContext.strFileExtensions[j].strFileExtension == ftype) {
                            blnAllowUpload = true;
                        }
                    }
                }
            }
            else {
                if (fileType.includes("/") == true) {
                    var ftype = "." + fileType.split("/")[1];
                    for (var j = 0; j < objContext.strFileExtensions.length; j++) {
                        if (objContext.strFileExtensions[j].strFileExtension == ftype) {
                            blnAllowUpload = true;
                        }
                    }
                }
            }
            var strFileName = files[0].name;
            if (/(--)/.test(strFileName)) {
                blnAllowUpload = false;
            }
            if (blnAllowUpload == true) {
                if (strFileName.length < 100) {
                    if (/^[a-zA-Z0-9!@#$%&()+=\s\:.,?{\}_-]+$/.test(strFileName)) {
                        this.strImageSrc = null;
                        for (var i = 0, f; f = files[i]; i++) {
                            if (f.type.match('image.*')) {
                                var reader = new FileReader();
                                reader.onload = (function (theFile) {
                                    return function (e) {
                                        var span = document.createElement('span');
                                        span.id = "imageSpan";
                                        span.innerHTML =
                                            [
                                                '<img style="height: 200px; border: 1px solid transparent; margin: 5px" src="',
                                                e.target.result,
                                                '" title="',
                                                '"/>'
                                            ].join('');
                                        document.getElementById('list').insertBefore(span, null);
                                    };
                                })(f);
                                reader.readAsDataURL(f);
                                var fileReader = new FileReader();
                                fileReader.onload = (function (theFile) {
                                    return function (e) {
                                        var binaryString = btoa(e.target.result);
                                        objContext.fieldObject.FieldValue = "";
                                        objContext.imageData.emit({
                                            ReportFieldId: objContext.fieldObject.ReportFieldId,
                                            FileName: theFile.name,
                                            FileData: binaryString,
                                            FileSize: theFile.size
                                        });
                                        objContext.strFileName = theFile.name;
                                        objContext.fieldObject.FieldValue = theFile.name;
                                    };
                                })(f);
                                fileReader.readAsBinaryString(f);
                            }
                            else {
                                this.notificationService.ShowToaster("Select a valid image", 2);
                            }
                        }
                    }
                    else {
                        /*this.notificationService.ShowToaster("Special characters are not allowed in " + this.fieldObject.FieldLabel, 2);*/
                        this.notificationService.ShowToaster("Special characters are not allowed in File name", 2); 
                    }
                }
                else {
                    /*this.notificationService.ShowToaster("Maximum length of 100 characters reached in the " + this.fieldObject.FieldLabel, 2); Bug Id : 71751*/
                    this.notificationService.ShowToaster("Maximum length of 100 characters reached for File name", 2); /*Bug Id: 69908 */
                }
            }
            else {
                this.notificationService.ShowToaster("Select a valid image", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Select an image", 2);
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
