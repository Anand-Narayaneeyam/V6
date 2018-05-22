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
var FileUploadComponent = (function () {
    function FileUploadComponent(notificationService, administrationService, generFun) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.generFun = generFun;
        this.reportField = new Array();
        this.strFileExtensions = new Array();
        this.strAllowedExtensions = new Array();
        this.strAllowedExtensionsWithoutInp = new Array();
        this.validateMessageForGrid = new core_1.EventEmitter();
        this.fileData = new core_1.EventEmitter();
        this.contextObj = this;
        this.strFileName = "";
    }
    FileUploadComponent.prototype.ngOnInit = function () {
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
    };
    FileUploadComponent.prototype.validateMessage = function (event) {
        this.validateMessageForGrid.emit(event);
    };
    FileUploadComponent.prototype.onclick = function (event) {
        event.target.value = "";
    };
    FileUploadComponent.prototype.onclickSelect = function (event) {
        document.getElementById((this.fieldObject.FieldId).toString()).click();
    };
    FileUploadComponent.prototype.onKeyPressEvent = function (Keyevent, target) {
        var key = Keyevent.keyCode || Keyevent.which;
        switch (target) {
            case 1:
                if (key == 13 || key == 32) {
                    this.onclickSelect(Keyevent);
                }
                break;
        }
    };
    FileUploadComponent.prototype.onChange = function (event) {
        if (document.getElementById("contentDiv").children[0].innerHTML == "span") {
            document.getElementById("contentDiv").children[0].remove();
        }
        var files = event.target.files;
        var blnAllowUpload = false;
        var strFileName = files[0].name;
        var reader, file;
        var objContext = this.contextObj;
        var ftype;
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
                        for (var i = 0; i < files.length; i++) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FileUploadComponent.prototype, "commonFileExtensions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "validateMessageForGrid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "fileData", void 0);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'FileUploadComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/fileuploadcomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=fileuploadcomponent.component.js.map