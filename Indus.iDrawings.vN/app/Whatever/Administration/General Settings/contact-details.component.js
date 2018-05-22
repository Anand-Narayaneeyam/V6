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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var http_1 = require('@angular/http');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var ContactDetailsComponent = (function () {
    function ContactDetailsComponent(administrationService, notificationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.success = "";
        this.btnName = "Save Changes";
        this.fileName = "";
    }
    ContactDetailsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.strAllowedExtensions = [".jpeg", ".jpg", ".bmp", ".gif"];
        this.administrationService.getContactDetailsFields().subscribe(function (resultData1) {
            if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                if (resultData1["Data"] == "[]") {
                    resultData1["Data"] = null;
                }
                var filterData = resultData1["Data"].filter(function (el) {
                    if (el.ReportFieldId == 107)
                        return true;
                    else
                        return false;
                });
                contextObj.contactDetailsLogoFields = resultData1["Data"].filter(function (el) {
                    if (el.ReportFieldId == 106) {
                        if (filterData[0].FieldValue == null) {
                            el.FieldValue = "-1";
                        }
                        else {
                        }
                    }
                    if (el.ReportFieldId == 107 && filterData[0].FieldValue == null) {
                        el.IsEnable = false;
                    }
                    return true;
                });
                contextObj.contactDetailsLogoFields = resultData1["Data"];
            }
        });
    };
    ContactDetailsComponent.prototype.fieldChange = function (value) {
    };
    ContactDetailsComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var status = false;
        var test = this.getData.getFieldValuesAsReportFieldArray(this.contactDetailsLogoFields);
        var emailObj = this.contactDetailsLogoFields.find(function (item) {
            return item.ReportFieldId === 104;
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            status = true;
        }
        else {
            this.administrationService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {
                if (contextObj.getData.checkForUnhandledErrors(result)) {
                    if (result["Data"]) {
                        status = true;
                        if (event["filedata"] != undefined && status == true) {
                            if (event["filedata"].length > 0) {
                                contextObj.editFileDetails(event["fieldobject"], event["filedata"]);
                                if (contextObj.fileName.length > 100) {
                                    contextObj.notificationService.ShowToaster("Maximum length of 100 characters reached for file name", 5);
                                }
                                else {
                                    contextObj.administrationService.postSubmitContactDetailsFields(JSON.stringify(contextObj.editFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], "").subscribe(function (resultData) {
                                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                                            contextObj.success = resultData["Data"].Message;
                                            if (contextObj.success == "Success") {
                                                contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                                            }
                                            else if (contextObj.success == "Invalid File") {
                                                contextObj.notificationService.ShowToaster("Select a valid image", 2);
                                            }
                                            else {
                                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            contextObj.administrationService.postSubmitContactDetailsFields(JSON.stringify(contextObj.editFileDetails(event["fieldobject"], "")), event["filedata"], "").subscribe(function (resultData) {
                                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                                    contextObj.success = resultData["Data"].Message;
                                    if (contextObj.success == "Success") {
                                        contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                                    }
                                    else if (contextObj.success == "Invalid File") {
                                        contextObj.notificationService.ShowToaster("Select a valid image", 2);
                                    }
                                    else {
                                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    }
                                }
                            });
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Enter a valid Email address", 5);
                    }
                }
            });
        }
        if (event["filedata"] != undefined && status == true) {
            if (event["filedata"].length > 0) {
                this.editFileDetails(event["fieldobject"], event["filedata"]);
                if (this.fileName.length > 100) {
                    contextObj.notificationService.ShowToaster("Maximum length of 100 characters reached for file name", 5);
                }
                else {
                    this.administrationService.postSubmitContactDetailsFields(JSON.stringify(this.editFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], "").subscribe(function (resultData) {
                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                            contextObj.success = resultData["Data"].Message;
                            if (contextObj.success == "Success") {
                                contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                            }
                            else if (contextObj.success == "Invalid File") {
                                contextObj.notificationService.ShowToaster("Select a valid image", 2);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        }
                    });
                }
            }
        }
    };
    ContactDetailsComponent.prototype.editFileDetails = function (fieldobject, filedata) {
        var jsonobject = JSON.parse(fieldobject);
        if (filedata != "") {
            var fileobject = JSON.parse(filedata);
        }
        if (jsonobject && filedata != "") {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 107) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    };
    ContactDetailsComponent = __decorate([
        core_1.Component({
            selector: 'contact-details',
            templateUrl: './app/Views/Administration/General Settings/contact-details.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ContactDetailsComponent);
    return ContactDetailsComponent;
}());
exports.ContactDetailsComponent = ContactDetailsComponent;
//# sourceMappingURL=contact-details.component.js.map