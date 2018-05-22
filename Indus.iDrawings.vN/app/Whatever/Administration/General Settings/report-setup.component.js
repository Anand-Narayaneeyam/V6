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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var imageuploadcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/imageuploadcomponent.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var textareacomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var labelcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component');
var buttoncomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component');
var ReportSetupComponent = (function () {
    function ReportSetupComponent(administrationService, notificationService, getData, el, _validateService, _renderer) {
        var _this = this;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.el = el;
        this._validateService = _validateService;
        this._renderer = _renderer;
        this.fileName = "";
        this.blnTxtTop = false;
        this.blnTxtBottom = false;
        this.blnIsImageUpload = false;
        this.blnShowWaterMarkImage = false;
        this.blnWaterMarkText = false;
        this.blnWaterMarkImage = false;
        this.blnIsWaterMarkImageSelected = false;
        this.blnddlEnableFontSize = false;
        this.blnFileDataExists = false;
        this.strFileName = "";
        this.strFileData = "";
        this.btnName = "Save Changes";
        this.success = "";
        this.dataKey = "";
        this.rptHeader = 313;
        this.blnIsFocused = false;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    ReportSetupComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.strAllowedExtensions = [".jpeg", "jpg", ".gif"];
        var blnIsImageUpload = false;
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
                        if (contextObj.fieldDetailsReportSetup[i].FieldId == 319) {
                            if ((contextObj.fieldDetailsReportSetup[i].FieldValue == "True") || (contextObj.fieldDetailsReportSetup[i].FieldValue == "1")) {
                                contextObj.blnShowWaterMarkImage = true;
                            }
                            else {
                                contextObj.blnShowWaterMarkImage = false;
                            }
                        }
                        if (contextObj.blnShowWaterMarkImage == true) {
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
                        else if (contextObj.blnShowWaterMarkImage == false) {
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
    };
    ReportSetupComponent.prototype.ngAfterViewChecked = function () {
        var getIFieldHeader;
        var getIFieldFooter;
        var blnHasValidationError = false;
        if (this.fieldDetailsReportSetup != undefined) {
            getIFieldHeader = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 313; });
            if (getIFieldHeader != undefined) {
                var headerBoldIfield = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 314; });
                var headerItalicIfield = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 315; });
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
                        var chkHeaderBold = document.getElementById("314");
                        if (chkHeaderBold != undefined) {
                            chkHeaderBold.checked = false;
                        }
                        var chkHeaderItalic = document.getElementById("315");
                        if (chkHeaderItalic != undefined) {
                            chkHeaderItalic.checked = false;
                        }
                    }
                }
            }
            getIFieldFooter = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 316; });
            if (getIFieldFooter != undefined) {
                var footerBoldIfield = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 317; });
                var footerItalicIfield = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 318; });
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
                        var chkFooterBold = document.getElementById("317");
                        if (chkFooterBold != undefined) {
                            chkFooterBold.checked = false;
                        }
                        var chkFooterItalic = document.getElementById("318");
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
    };
    ReportSetupComponent.prototype.getKeyUpData = function (event) {
        if (event.event != null || event.event != undefined) {
            var ddlFontSizeIField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 359; });
            for (var i = 0; i < event.fieldObject.length; i++) {
                if (event.fieldObject[i].FieldId == 358) {
                    if (ddlFontSizeIField != undefined) {
                        if ((event.event.length > 0) && (event.fieldObject[i].IsEnabled == true)) {
                            ddlFontSizeIField.IsEnabled = true;
                        }
                        else {
                            ddlFontSizeIField.IsEnabled = false;
                        }
                    }
                }
            }
        }
    };
    ReportSetupComponent.prototype.editFileDetails = function (fieldobject, filedata) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 133) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    };
    ReportSetupComponent.prototype.editFieldDetails = function (fieldobject) {
        var jsonobject = JSON.parse(fieldobject);
        return jsonobject;
    };
    ReportSetupComponent.prototype.onSubmitData = function (event, file) {
        var contextObj = this;
        var blnImageSelected = false;
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
        if (blnImageSelected == true) {
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
                    var fObject = new Array();
                    var fileDataObj;
                    fObject.push({
                        ReportFieldId: 133,
                        FileName: contextObj.strFileName,
                        FileData: contextObj.strFileData,
                        FileSize: 10000
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
        else {
            var fieldObj = JSON.parse(event);
            for (var i_1 = 0; i_1 < fieldObj.length; i_1++) {
                if (fieldObj[i_1].ReportFieldId == 133) {
                    fieldObj[i_1].Value = "";
                }
                if (fieldObj[i_1].ReportFieldId == 363) {
                    if (fieldObj[i_1].Value == "1") {
                        fieldObj[i_1].Value = "1";
                    }
                    else if (fieldObj[i_1].Value == "2") {
                        fieldObj[i_1].Value = "0";
                    }
                }
                if (fieldObj[i_1].ReportFieldId == 372) {
                    if (fieldObj[i_1].Value == "False" || fieldObj[i_1].Value == "false") {
                        fieldObj[i_1].Value = "2";
                    }
                    else {
                        fieldObj[i_1].Value = "1";
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
    };
    ReportSetupComponent.prototype.emitKeyUp = function (event) {
        if (event != null || event != undefined) {
            var ddlFontSizeIField = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 359; });
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
    };
    ReportSetupComponent.prototype.txtBoxChanges = function (value) {
        var blnEnableddl = false;
        if (value.txtBoxData.target.id == "313") {
            if (value.txtBoxData.target.value.length == 0) {
                this.blnTxtTop = false;
            }
            else {
                this.blnTxtTop = true;
            }
            for (var i_2 = 0; i_2 < this.fieldDetailsReportSetup.length; i_2++) {
                if ((this.fieldDetailsReportSetup[i_2].FieldId == 314) || (this.fieldDetailsReportSetup[i_2].FieldId == 315)) {
                    if (this.blnTxtTop == false) {
                        this.fieldDetailsReportSetup[i_2].IsEnabled = false;
                    }
                    else {
                        this.fieldDetailsReportSetup[i_2].IsEnabled = true;
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
            for (var i_3 = 0; i_3 < this.fieldDetailsReportSetup.length; i_3++) {
                if ((this.fieldDetailsReportSetup[i_3].FieldId == 317) || (this.fieldDetailsReportSetup[i_3].FieldId == 318)) {
                    if (this.blnTxtBottom == false) {
                        this.fieldDetailsReportSetup[i_3].IsEnabled = false;
                    }
                    else {
                        this.fieldDetailsReportSetup[i_3].IsEnabled = true;
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
    };
    ReportSetupComponent.prototype.chkBoxChange = function (event) {
        var blnEnableImageUpload = false;
        var blnEnableddl = false;
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
                            var showImageObj = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 372; });
                            showImageObj.FieldValue = showImageObj.LookupDetails.LookupValues[0].Id.toString();
                        }
                        else {
                            this.fieldDetailsReportSetup[i].IsEnabled = true;
                            if (this.fieldDetailsReportSetup[i].FieldValue != "") {
                                blnEnableddl = true;
                                var showImageObj = this.fieldDetailsReportSetup.find(function (el) { return el.FieldId === 372; });
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
    };
    ReportSetupComponent.prototype.rbtnChange = function (event) {
        var blnEnableddl = false;
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
                    var element = document.getElementById("357");
                    if (element != undefined) {
                        element.focus();
                    }
                }
            }
        }
    };
    ReportSetupComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    ReportSetupComponent.prototype.onSubmit = function (form, value) {
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsReportSetup.find(checkForErrors)) {
            return;
        }
        var obj = new General_1.GeneralFunctions();
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
            }
            else {
                this.onSubmitData(this.reportFieldArray);
            }
        }
        else {
        }
    };
    ReportSetupComponent.prototype.getImageData = function (event) {
        this.fileObj = event;
    };
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], ReportSetupComponent.prototype, "input", void 0);
    ReportSetupComponent = __decorate([
        core_1.Component({
            selector: 'report-setup',
            templateUrl: './app/Views/Administration/General Settings/report-setup.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, buttoncomponent_component_1.ButtonComponent, imageuploadcomponent_component_1.ImageUploadComponent, labelcomponent_component_1.LabelComponent, radiocomponent_component_1.CustomRadioComponent, dropdownlistcomponent_component_1.DropDownListComponent, textareacomponent_component_1.TextAreaComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, core_1.ElementRef, validation_service_1.ValidateService, core_1.Renderer])
    ], ReportSetupComponent);
    return ReportSetupComponent;
}());
exports.ReportSetupComponent = ReportSetupComponent;
//# sourceMappingURL=report-setup.component.js.map