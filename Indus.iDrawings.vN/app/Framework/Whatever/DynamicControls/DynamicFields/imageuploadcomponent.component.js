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
var validate_directive_1 = require('../../Validation/validate.directive');
var notify_service_1 = require('../../../Models/Notification/notify.service');
var administration_service_1 = require('../../../../models/administration/administration.service');
var General_1 = require('../../../../Models/Common/General');
var ImageUploadComponent = (function () {
    function ImageUploadComponent(notificationService, administrationService, getData) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.getData = getData;
        this.reportField = new Array();
        this.strFileExtensions = new Array();
        this.strAllowedExtensions = new Array();
        this.strAllowedExtensionsWithoutInp = new Array();
        this.validateMessageForGrid = new core_1.EventEmitter();
        this.imageData = new core_1.EventEmitter();
        this.fileObjectDetails = new core_1.EventEmitter();
        this.contextObj = this;
        this.strImageSrc = "";
        this.strFileName = "";
    }
    ImageUploadComponent.prototype.ngOnInit = function () {
        this.setFileData();
    };
    ImageUploadComponent.prototype.setFileData = function () {
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
    };
    ImageUploadComponent.prototype.onclick = function (event) {
        event.target.value = "";
    };
    ImageUploadComponent.prototype.onclickSelect = function (event) {
        document.getElementById((this.fieldObject.FieldId).toString()).click();
    };
    ImageUploadComponent.prototype.onKeyPressEvent = function (Keyevent, target) {
        var key = Keyevent.keyCode || Keyevent.which;
        switch (target) {
            case 1:
                if (key == 13 || key == 32) {
                    this.onclickSelect(Keyevent);
                }
                break;
        }
    };
    ImageUploadComponent.prototype.validateMessage = function (event) {
        this.validateMessageForGrid.emit(event);
    };
    ImageUploadComponent.prototype.handleFileSelect = function (evt) {
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
            var blnAllowUpload = false;
            var fileType = evt.target.files[0].type;
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ImageUploadComponent.prototype, "fileExtensions", void 0);
    __decorate([
        /*input for fetching allowed file extensions*/ core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "validateMessageForGrid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "fileObjectDetails", void 0);
    ImageUploadComponent = __decorate([
        core_1.Component({
            selector: 'ImageComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/imageupload.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());
exports.ImageUploadComponent = ImageUploadComponent;
//# sourceMappingURL=imageuploadcomponent.component.js.map