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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var labelcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component');
var platform_browser_1 = require('@angular/platform-browser');
var ConfigureComponent = (function () {
    function ConfigureComponent(sanitizer, administrationService, _notificationService, confirmationService, generFun) {
        this.sanitizer = sanitizer;
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.generFun = generFun;
        this.reload = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this.itemSourceFieldObject = [];
        this.blnAutoNumber = false;
        this.onchangecount = 0;
    }
    ConfigureComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.gridHeight = window.innerHeight - 250;
        contextObj.administrationService.loadConfigureFieldObjects().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObject[0].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "70";
            contextObj.fieldObject[1].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "250";
            contextObj.fieldObject[2].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "250";
            var lookupValues = new Array();
            contextObj.importColumns.filter(function (el) {
                lookupValues.push({
                    Id: el["ReportFieldID"],
                    Value: el["ColumnAlias"]
                });
                return true;
            });
            contextObj.fieldObject[2].LookupDetails.LookupValues = lookupValues;
            contextObj.loadSource(contextObj);
        });
        contextObj.administrationService.GetImportTepmlate(contextObj.importcategoryId, contextObj.moduleId, "Default").subscribe(function (resultData1) {
            contextObj.templateId = resultData1["Data"];
            console.log(contextObj.templateId, "template");
        });
        contextObj.administrationService.getCustomerSubscribedFeatures("72").subscribe(function (resultData1) {
            debugger;
            contextObj.blnAutoNumber = resultData1["Data"][0]["IsSubscribed"];
        });
    };
    ConfigureComponent.prototype.loadSource = function (contextObj) {
        var selectAllChk = true;
        var itemSrc = contextObj.excelColumns;
        if (contextObj.fieldObject && contextObj.excelColumns) {
            var fldObjectwthoutRef = contextObj.fieldObject;
            for (var i = 0; i < itemSrc.length; i++) {
                fldObjectwthoutRef = JSON.parse(JSON.stringify(fldObjectwthoutRef));
                if (itemSrc[i]["ReportFieldId"] != undefined)
                    fldObjectwthoutRef[0].FieldValue = true;
                else {
                    fldObjectwthoutRef[0].FieldValue = false;
                    selectAllChk = false;
                }
                fldObjectwthoutRef[0].Width = 70;
                fldObjectwthoutRef[2].Width = 250;
                fldObjectwthoutRef[1].Width = 250;
                fldObjectwthoutRef[1].FieldValue = itemSrc[i]["ExcelColumns"];
                if (itemSrc[i]["ReportFieldId"] != undefined)
                    fldObjectwthoutRef[2].FieldValue = itemSrc[i]["ReportFieldId"];
                else
                    fldObjectwthoutRef[2].FieldValue = "-1";
                contextObj.itemSourceFieldObject[i] = fldObjectwthoutRef;
            }
            contextObj.fieldObject[0].FieldValue = selectAllChk;
        }
    };
    ConfigureComponent.prototype.ngDoCheck = function () {
        this.gridHeight = window.innerHeight - 250;
    };
    ConfigureComponent.prototype.ngOnChanges = function (changes) {
        //if ((changes["fieldObject"] || changes["excelColumns"]) && this.onchangecount == 0) {
        //    this.loadSource(this);
        //}
    };
    ConfigureComponent.prototype.ddlRelationChange = function (value) {
    };
    ConfigureComponent.prototype.onSelectAll = function (value, evnt) {
        debugger;
        console.log(this.fieldObject[0].FieldValue);
        var contextObj = this;
        if (this.fieldObject[0].FieldValue.toString() == "false")
            this.fieldObject[0].FieldValue = "true";
        else
            this.fieldObject[0].FieldValue = "false";
        this.itemSourceFieldObject.filter(function (el) {
            if (contextObj.fieldObject[0].FieldValue == "true")
                el[0].FieldValue = true;
            else
                el[0].FieldValue = false;
            return true;
        });
    };
    ConfigureComponent.prototype.onchkboxclick = function (value) {
        this.chkSelectAll();
    };
    ConfigureComponent.prototype.chkSelectAll = function () {
        debugger;
        var chkStatus = true;
        this.itemSourceFieldObject.find(function (el) {
            if (el[0].FieldValue == "false" || el[0].FieldValue == false) {
                chkStatus = false;
                return true;
            }
        });
        this.fieldObject[0].FieldValue = chkStatus.toString();
    };
    ConfigureComponent.prototype.popupClick = function (value) {
    };
    ConfigureComponent.prototype.onSave = function () {
        debugger;
        if (this.moduleId == 3 && this.importcategoryId != 21) {
            this.spaceValidation();
        }
        if (this.moduleId == 4 && this.importcategoryId != 21) {
            this.documentValidation();
        }
        if (this.moduleId == 5 && this.importcategoryId != 21) {
            this.employeeValidation();
        }
        if (this.moduleId == 7 && this.importcategoryId != 21) {
            this.objectValidation();
        }
        if (this.moduleId == 7 || this.moduleId == 8 || this.moduleId == 5 || this.moduleId == 6 || this.moduleId == 17 || this.moduleId == 18 || this.moduleId == 25 || this.moduleId == 26) {
            this.objectValidation();
        }
        if (this.importcategoryId == 21) {
            this.userValidation();
        }
    };
    ConfigureComponent.prototype.onCancel = function () {
        this.cancel.emit({});
    };
    ConfigureComponent.prototype.getColumnwidth = function (fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if ((fieldobj.DataEntryControlId == 1 || fieldobj.DataEntryControlId == 4) && fieldobj.FieldLabel != "Width")
                width = 260;
            else if (fieldobj.DataEntryControlId == 6)
                width = 70;
            else
                width = 75;
        }
        return width;
    };
    ConfigureComponent.prototype.getColumnwidth1 = function (fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if ((fieldobj.DataEntryControlId == 1 || fieldobj.DataEntryControlId == 4) && fieldobj.FieldLabel != "Width")
                width = 250;
            else if (fieldobj.DataEntryControlId == 6)
                width = 70;
            else
                width = 75;
        }
        return width;
    };
    ConfigureComponent.prototype.userValidation = function () {
        var firstName = false;
        var lastName = false;
        var email = false;
        var loginName = false;
        var accountActivationDate = false;
        var accountExpiryDate = false;
        var userRole = false;
        var errorMsg = "";
        var reportIds = [];
        var submitValues = new Array();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true;
        });
        this.importColumns.filter(function (el) {
            debugger; //Site;Building;Floor;Room No;"
            if (el["ColumnAlias"] == "First Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    firstName = true;
            }
            else if (el["ColumnAlias"] == "Last Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    lastName = true;
            }
            else if (el["ColumnAlias"] == "Email") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    email = true;
            }
            //else if (el["ColumnAlias"] == "Login Name") {
            //    if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
            //        loginName = true;
            //}
            //else if (el["ColumnAlias"] == "Account Activation Date") {
            //    if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
            //        accountActivationDate = true;
            //}
            //else if (el["ColumnAlias"] == "Account Expiry Date") {
            //    if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
            //        accountExpiryDate = true;
            //}
            //else if (el["ColumnAlias"] == "User Role") {
            //    if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
            //        userRole = true;
            //}
            return true;
        });
        if (firstName != true)
            errorMsg = "First Name";
        if (lastName != true) {
            if (errorMsg.length == 0)
                errorMsg = "Last Name";
            else
                errorMsg = errorMsg + ", Last Name";
        }
        if (email != true) {
            if (errorMsg.length == 0)
                errorMsg = "Email";
            else
                errorMsg = errorMsg + ", Email";
        }
        //if (loginName != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Login Name";
        //    else
        //        errorMsg = errorMsg + ", Login Name";
        //}
        //if (accountActivationDate != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Account Activation Date";
        //    else
        //        errorMsg = errorMsg + ", Account Activation Date";
        //}
        //if (accountExpiryDate != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "Account Expiry Date";
        //    else
        //        errorMsg = errorMsg + ", Account Expiry Date";
        //}
        //if (userRole != true) {
        //    if (errorMsg.length == 0)
        //        errorMsg = "User Role";
        //    else
        //        errorMsg = errorMsg + ", User Role";
        //}
        if (errorMsg.length == 0) {
            errorMsg = this.duplicate(reportIds);
            if (errorMsg.length > 0) {
                this._notificationService.ShowToaster(errorMsg + " selected more than once ", 2);
            }
            else {
                var contextObj = this;
                this.administrationService.InsertImportTemplateFields(submitValues, this.templateId).subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                    contextObj.reload.emit({});
                });
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ConfigureComponent.prototype.spaceValidation = function () {
        var siteStatus = false;
        var bldngStatus = false;
        var floorStatus = false;
        var spkRmnStatus = false;
        var varspstd = false;
        var varsc = false;
        var VarSPAssnmntType = false;
        var reportIds = [];
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var submitValues = new Array();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true;
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "Site") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    siteStatus = true;
            }
            else if (el["ColumnAlias"] == "Building") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    bldngStatus = true;
            }
            else if (el["ColumnAlias"] == "Floor") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    floorStatus = true;
            }
            else if (el["ColumnAlias"] == "Space Key" || el["ColumnAlias"] == "Room No" || el["ColumnAlias"] == "BOMA Handle") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    spkRmnStatus = true;
            }
            else if (el["ColumnAlias"] == "Space Standard") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    varspstd = true;
            }
            else if (el["ColumnAlias"] == "Seating Capacity") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    varsc = true;
            }
            else if (el["ColumnAlias"] == "Space Assignment Type") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    VarSPAssnmntType = true;
            }
            return true;
        });
        if (siteStatus != true)
            errorMsg = "Site";
        if (bldngStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Building";
            else
                errorMsg = errorMsg + ", Building";
        }
        if (floorStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Floor";
            else
                errorMsg = errorMsg + ", Floor";
        }
        if (spkRmnStatus != true) {
            if (errorMsg.length == 0)
                errorMsg = "Space Key/Room No/Space Handle";
            else
                errorMsg = errorMsg + ", Space Key/Room No/Space Handle";
        }
        if (VarSPAssnmntType == true) {
            if (varsc == false) {
                if (errorMsg.length == 0)
                    errorMsg = "Seating Capacity";
                else
                    errorMsg = errorMsg + ", Seating Capacity";
            }
        }
        if (varsc == true) {
            if (VarSPAssnmntType == false) {
                if (errorMsg.length == 0)
                    errorMsg = "Space Assignment Type";
                else
                    errorMsg = errorMsg + ", Space Assignment Type";
            }
        }
        if (errorMsg.length == 0) {
            errorMsg = this.duplicate(reportIds);
            if (errorMsg.length > 0) {
                this._notificationService.ShowToaster(errorMsg + " selected more than once ", 2);
            }
            else {
                var contextObj = this;
                this.administrationService.InsertImportTemplateFields(submitValues, this.templateId).subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                    contextObj.reload.emit({});
                });
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ConfigureComponent.prototype.employeeValidation = function () {
        var siteStatus = false;
        var bldngStatus = false;
        var floorStatus = false;
        var spkRmnStatus = false;
        var frstName = false;
        var lastName = false;
        var strcode = false;
        var reportIds = [];
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var submitValues = new Array();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true;
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "First Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    frstName = true;
            }
            else if (el["ColumnAlias"] == "Last Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    lastName = true;
            }
            else if (el["ColumnAlias"] == "Code") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    strcode = true;
            } //Site;Building;Floor;Room No;"
            else if (el["ColumnAlias"] == "Site") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    siteStatus = true;
            }
            else if (el["ColumnAlias"] == "Building") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    bldngStatus = true;
            }
            else if (el["ColumnAlias"] == "Floor") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    floorStatus = true;
            }
            else if (el["ColumnAlias"] == "Space Key" || el["ColumnAlias"] == "Room No" || el["ColumnAlias"] == "BOMA Handle") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    spkRmnStatus = true;
            }
            return true;
        });
        if (strcode != true)
            errorMsg = "Employee Code";
        if (frstName != true) {
            if (errorMsg.length == 0)
                errorMsg = "First Name";
            else
                errorMsg = errorMsg + ", First Name";
        }
        if (lastName != true) {
            if (errorMsg.length == 0)
                errorMsg = "Last Name";
            else
                errorMsg = errorMsg + ", Last Name";
        }
        if (siteStatus == true || bldngStatus == true || floorStatus == true || spkRmnStatus == true) {
            if (siteStatus != true)
                if (errorMsg.length == 0)
                    errorMsg = "Site";
                else
                    errorMsg = errorMsg + ", Site";
            if (bldngStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Building";
                else
                    errorMsg = errorMsg + ", Building";
            }
            if (floorStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Floor";
                else
                    errorMsg = errorMsg + ", Floor";
            }
            if (spkRmnStatus != true) {
                if (errorMsg.length == 0)
                    errorMsg = "Space Key/Room No/Space Handle";
                else
                    errorMsg = errorMsg + ", Space Key/Room No/Space Handle";
            }
        }
        if (errorMsg.length == 0) {
            errorMsg = this.duplicate(reportIds);
            if (errorMsg.length > 0) {
                this._notificationService.ShowToaster(errorMsg + " selected more than once ", 2);
            }
            else {
                var contextObj = this;
                this.administrationService.InsertImportTemplateFields(submitValues, this.templateId).subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                    contextObj.reload.emit({});
                });
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ConfigureComponent.prototype.objectValidation = function () {
        debugger;
        var contextObj = this;
        var siteStatus = false;
        var bldngStatus = false;
        var floorStatus = false;
        var spkRmnStatus = false;
        var tagStatus = false;
        var prefixStatus = false;
        var nameStatus = false;
        var blockRefHdle = false;
        var reportIds = [];
        var errorMsg = "";
        var spaceExcelMappingDetails = "";
        var submitValues = new Array();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true;
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "Site") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    siteStatus = true;
            }
            else if (el["ColumnAlias"] == "Building") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    bldngStatus = true;
            }
            else if (el["ColumnAlias"] == "Floor") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    floorStatus = true;
            }
            else if (el["ColumnAlias"] == "Space Key" || el["ColumnAlias"] == "Room No" || el["ColumnAlias"] == "BOMA Handle") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    spkRmnStatus = true;
            }
            else if (el["ColumnAlias"] == "Tag Number") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    tagStatus = true;
            }
            else if (el["ColumnAlias"] == "No Prefix") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    prefixStatus = true;
            }
            else if (el["ColumnAlias"] == "Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    nameStatus = true;
            }
            else if (el["ColumnAlias"] == "Block Ref Handle") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    blockRefHdle = true;
            }
            return true;
        });
        //this.administrationService.getCustomerSubscribedFeatures("72").subscribe(function (resultData1) {
        //    debugger;
        //    blnAutoNumber = resultData1["IsSubscribed"];
        //});
        debugger;
        if (contextObj.blnAutoNumber == true) {
            tagStatus = true;
        }
        if (this.drawingCategory != "1") {
            var assetType = "";
            if (contextObj.importcategoryId == 6) {
                assetType = "Asset";
            }
            if (contextObj.importcategoryId == 7) {
                assetType = "Furniture";
            }
            if ((tagStatus && prefixStatus && nameStatus) == false) {
                if (tagStatus == false) {
                    errorMsg = assetType + " Class Number";
                }
                if (prefixStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType + " Class Number Prefix";
                    else
                        errorMsg = errorMsg + assetType + ",  Class Number Prefix";
                }
                if (nameStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType + " Class Name";
                    else
                        errorMsg = errorMsg + assetType + ",  Class Name";
                }
            }
            if (blockRefHdle == true) {
                if ((siteStatus && bldngStatus && floorStatus) == false && contextObj.importcategoryId != 8) {
                    if (siteStatus != true)
                        if (errorMsg.length == 0)
                            errorMsg = "Site";
                        else
                            errorMsg = errorMsg + ", Site";
                    if (bldngStatus != true) {
                        if (errorMsg.length == 0)
                            errorMsg = "Building";
                        else
                            errorMsg = errorMsg + ", Building";
                    }
                    if (floorStatus != true) {
                        if (errorMsg.length == 0)
                            errorMsg = "Floor";
                        else
                            errorMsg = errorMsg + ", Floor";
                    }
                }
            }
        }
        else {
            var assetType = "";
            if (contextObj.importcategoryId == 6) {
                assetType = "Asset";
            }
            if (contextObj.importcategoryId == 7) {
                assetType = "Furniture";
            }
            if (contextObj.importcategoryId == 8) {
                assetType = "Electrical";
            }
            if ((tagStatus && prefixStatus && nameStatus) == false) {
                if (tagStatus == false) {
                    errorMsg = assetType + " Class Number";
                }
                if (prefixStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType + "  Class Number Prefix";
                    else
                        errorMsg = errorMsg + assetType + ",  Class Number Prefix";
                }
                if (nameStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType + " Class Name";
                    else
                        errorMsg = errorMsg + assetType + ",  Class Name";
                }
            }
            if ((siteStatus && bldngStatus && floorStatus && spkRmnStatus) == false && contextObj.importcategoryId != 8) {
                if (siteStatus != true)
                    if (errorMsg.length == 0)
                        errorMsg = "Site";
                    else
                        errorMsg = errorMsg + ", Site";
                if (bldngStatus != true) {
                    if (errorMsg.length == 0)
                        errorMsg = "Building";
                    else
                        errorMsg = errorMsg + ", Building";
                }
                if (floorStatus != true) {
                    if (errorMsg.length == 0)
                        errorMsg = "Floor";
                    else
                        errorMsg = errorMsg + ", Floor";
                }
                if (spkRmnStatus != true && contextObj.importcategoryId != 8) {
                    if (errorMsg.length == 0)
                        errorMsg = "Space Key/Room No/Space Handle";
                    else
                        errorMsg = errorMsg + ", Space Key/Room No/Space Handle";
                }
            }
        }
        if (errorMsg.length == 0) {
            errorMsg = this.duplicate(reportIds);
            if (errorMsg.length > 0) {
                this._notificationService.ShowToaster(errorMsg + " selected more than once ", 2);
            }
            else {
                var contextObj = this;
                this.administrationService.InsertImportTemplateFields(submitValues, this.templateId).subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                    contextObj.reload.emit({});
                });
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    };
    ConfigureComponent.prototype.documentValidation = function () {
        var documentNo = false;
        var fileName = false;
        var errorMsg = "";
        var reportIds = [];
        var isAutoNoEnabled = false;
        var isDocNoEnabled = false;
        var contextObj = this;
        var submitValues = new Array();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true;
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "Document Number") {
                documentNo = true;
            }
            else if (el["ColumnAlias"] == "File Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    fileName = true;
            }
            return true;
        });
        this.administrationService.getCustomerSubscribedFeatures("58,60").subscribe(function (resultData) {
            var customerFeatureobj = resultData["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 58:
                        isAutoNoEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 60:
                        isDocNoEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
            if (!documentNo) {
                if (isDocNoEnabled && !isAutoNoEnabled)
                    errorMsg = "Document Number";
            }
            if (fileName != true) {
                if (errorMsg.length == 0)
                    errorMsg = "File Name";
                else
                    errorMsg = errorMsg + ", File Name";
            }
            if (errorMsg.length == 0) {
                errorMsg = contextObj.duplicate(reportIds);
                if (errorMsg.length > 0) {
                    contextObj._notificationService.ShowToaster(errorMsg + " selected more than once ", 2);
                }
                else {
                    contextObj.administrationService.InsertImportTemplateFields(submitValues, contextObj.templateId).subscribe(function (resultData1) {
                        contextObj.templateId = resultData1["Data"];
                        contextObj.reload.emit({});
                    });
                }
            }
            else {
                contextObj._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
            }
        });
    };
    ConfigureComponent.prototype.duplicate = function (reportIds) {
        var duplcateMsg = "";
        var dplreportFldIds = [];
        for (var i = 0; i < reportIds.length; i++) {
            var status = 0;
            reportIds.filter(function (el) {
                if (el == reportIds[i]) {
                    status = status + 1;
                }
                return true;
            });
            if (status != 1) {
                if (dplreportFldIds.indexOf(reportIds[i]) < 0) {
                    dplreportFldIds.push(reportIds[i]);
                }
            }
        }
        this.fieldObject[2].LookupDetails.LookupValues.filter(function (el) {
            if (dplreportFldIds.indexOf(el["Id"].toString()) > -1) {
                if (duplcateMsg == "")
                    duplcateMsg = el["Value"];
                else
                    duplcateMsg = duplcateMsg + " ," + el["Value"];
            }
            return true;
        });
        return duplcateMsg;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "excelColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "importColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "drawingCategory", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "importcategoryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "reload", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConfigureComponent.prototype, "cancel", void 0);
    ConfigureComponent = __decorate([
        core_1.Component({
            selector: 'configure-import',
            templateUrl: 'app/Views/Common/DataImport/configure.component.html',
            styleUrls: ['app/Views/Common/DataImport/dataimport.css'],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
            inputs: [],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [notify_component_1.Notification, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, labelcomponent_component_1.LabelComponent]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], ConfigureComponent);
    return ConfigureComponent;
}());
exports.ConfigureComponent = ConfigureComponent;
//# sourceMappingURL=configure.component.js.map