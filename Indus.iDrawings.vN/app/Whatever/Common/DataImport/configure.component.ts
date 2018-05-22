
import {Component, OnInit, Output, SimpleChange, OnChanges, ViewEncapsulation, DoCheck, KeyValueDiffers, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import {NgControl} from '@angular/common';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { LabelComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'configure-import',
    templateUrl: 'app/Views/Common/DataImport/configure.component.html',
    styleUrls: ['app/Views/Common/DataImport/dataimport.css'],
    providers: [AdministrationService, NotificationService, ConfirmationService, GeneralFunctions],
    inputs: [],
    encapsulation: ViewEncapsulation.None,
    directives: [Notification, ConfirmationComponent, SlideComponent, FieldComponent, DropDownListComponent,CustomCheckBoxComponent,LabelComponent]

})
export class ConfigureComponent {
    @Input() excelColumns;
    @Input() importColumns;
    @Input() moduleId;
    @Input() drawingCategory;
    @Input() importcategoryId;
    @Output() reload = new EventEmitter();
    @Output() cancel = new EventEmitter();
    fieldObject: IField[];
    gridHeight:any;
    itemSourceFieldObject = [];
    blnAutoNumber: boolean = false;

    templateId: any;
    private onchangecount = 0;

    constructor(private sanitizer: DomSanitizationService,private administrationService: AdministrationService, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions) {

    }

    ngOnInit() {
        var contextObj = this;
        this.gridHeight = window.innerHeight-250;
        contextObj.administrationService.loadConfigureFieldObjects().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"]
            contextObj.fieldObject[0].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "70";
            contextObj.fieldObject[1].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "250";
            contextObj.fieldObject[2].IsHiddenLabel = true;
            contextObj.fieldObject[0].Width = "250";
            var lookupValues = new Array<ReportArrayForLookUp>();
            contextObj.importColumns.filter(function (el) {
                lookupValues.push({
                    Id: el["ReportFieldID"],
                    Value: el["ColumnAlias"]
                });
                return true
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
    }

    loadSource(contextObj) {
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

    }

    ngDoCheck() {
        this.gridHeight = window.innerHeight - 250;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        //if ((changes["fieldObject"] || changes["excelColumns"]) && this.onchangecount == 0) {
        //    this.loadSource(this);
        //}
    }

    ddlRelationChange(value)
    {
    }

    onSelectAll(value,evnt)
    {
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
            return true
        });
    }

    onchkboxclick(value)
    {
        this.chkSelectAll();
    }

    chkSelectAll() {
        debugger
        var chkStatus = true;
        this.itemSourceFieldObject.find(function (el) {
            if (el[0].FieldValue == "false" || el[0].FieldValue == false) {
                chkStatus = false;
                return true
            }
        });
        this.fieldObject[0].FieldValue = chkStatus.toString();
    }

    popupClick(value)
    {
    }

    onSave()
    {
        debugger
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
    }

    onCancel()
    {
        this.cancel.emit({
        });
    }

    getColumnwidth(fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if ((fieldobj.DataEntryControlId == 1 || fieldobj.DataEntryControlId == 4) && fieldobj.FieldLabel != "Width")
                width = 260;
            else
                if (fieldobj.DataEntryControlId == 6)
                    width = 70;
                else
                    width = 75;
        }
        return width;
    }

    getColumnwidth1(fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if ((fieldobj.DataEntryControlId == 1 || fieldobj.DataEntryControlId == 4) && fieldobj.FieldLabel != "Width")
                width = 250;
            else
                if (fieldobj.DataEntryControlId == 6)
                    width = 70;
                else
                    width = 75;
        }
        return width;
    }
    userValidation() {
        var firstName = false;
        var lastName = false;
        var email = false;
        var loginName = false;
        var accountActivationDate = false;
        var accountExpiryDate = false;
        var userRole = false;
        var errorMsg = "";
        var reportIds = [];
        var submitValues = new Array<ReportFieldIdValues>();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true
        });
        this.importColumns.filter(function (el) {
            debugger           //Site;Building;Floor;Room No;"
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
            return true
        });

        if (firstName != true)
            errorMsg = "First Name"

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
                    contextObj.reload.emit({
                    });
                });

            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }

    }
    spaceValidation()
    {
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
        var submitValues = new Array<ReportFieldIdValues>();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true )&& el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true
        });
        this.importColumns.filter(function (el) {             //Site;Building;Floor;Room No;"
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
                    varspstd = true
            }
            else if (el["ColumnAlias"] == "Seating Capacity") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    varsc = true
            }
            else if (el["ColumnAlias"] == "Space Assignment Type") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    VarSPAssnmntType = true
            }
            return true
        });
        if (siteStatus != true)
            errorMsg ="Site"

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
            else
            {
                var contextObj = this;
                this.administrationService.InsertImportTemplateFields(submitValues, this.templateId).subscribe(function (resultData1) {
                    contextObj.templateId = resultData1["Data"];
                    contextObj.reload.emit({                       
                    });
                });
                            
            }          
        }
        else
        {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }     
    }

    employeeValidation() {
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
        var submitValues = new Array<ReportFieldIdValues>();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "First Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    frstName = true
            }
            else if (el["ColumnAlias"] == "Last Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    lastName = true
            }
            else if (el["ColumnAlias"] == "Code") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    strcode = true
            }           //Site;Building;Floor;Room No;"
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
            return true
        });
        if (strcode != true)
            errorMsg = "Employee Code"

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
                    contextObj.reload.emit({
                    });
                });

            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }
    }

    objectValidation()
    {
        debugger
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
        var submitValues = new Array<ReportFieldIdValues>();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true
        });
        this.importColumns.filter(function (el) {             //Site;Building;Floor;Room No;"
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
            return true
        });

        //this.administrationService.getCustomerSubscribedFeatures("72").subscribe(function (resultData1) {
        //    debugger;
        //    blnAutoNumber = resultData1["IsSubscribed"];
        //});
        debugger;
        if (contextObj.blnAutoNumber == true)
        {
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
                    errorMsg = assetType+" Class Number";
                }
                if (prefixStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType+" Class Number Prefix";
                    else
                        errorMsg = errorMsg + assetType+",  Class Number Prefix";
                }
                if (nameStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType+" Class Name";
                    else
                        errorMsg = errorMsg + assetType+",  Class Name";
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
        else
        {
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
                    errorMsg = assetType+" Class Number";
                }
                if (prefixStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType+"  Class Number Prefix";
                    else
                        errorMsg = errorMsg + assetType+",  Class Number Prefix";
                }
                if (nameStatus == false) {
                    if (errorMsg.length == 0)
                        errorMsg = assetType +" Class Name";
                    else
                        errorMsg = errorMsg + assetType+",  Class Name";
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
                    contextObj.reload.emit({
                    });
                });
            }
        }
        else {
            this._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
        }     
    }

    documentValidation() {
        var documentNo = false;
        var fileName = false;
        var errorMsg = "";
        var reportIds = [];
        var isAutoNoEnabled = false;
        var isDocNoEnabled = false;
        var contextObj = this;
        var submitValues = new Array<ReportFieldIdValues>();
        this.itemSourceFieldObject.filter(function (el) {
            if ((el[0].FieldValue == "true" || el[0].FieldValue == true) && el[2].FieldValue != "-1") {
                submitValues.push({
                    ReportFieldId: el[2].FieldValue,
                    Value: el[1].FieldValue
                });
                reportIds.push(el[2].FieldValue.toString());
            }
            return true
        });
        this.importColumns.filter(function (el) {
            if (el["ColumnAlias"] == "Document Number") {
                documentNo = true;
            }
            else if(el["ColumnAlias"] == "File Name") {
                if (reportIds.indexOf(el["ReportFieldID"].toString()) > -1)
                    fileName = true;
            }
          
            return true
        });

        this.administrationService.getCustomerSubscribedFeatures("58,60").subscribe(function (resultData) {
            var customerFeatureobj = resultData["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
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
                    errorMsg = "Document Number"
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
                        contextObj.reload.emit({
                        });
                    });
                }
            }
            else {
                contextObj._notificationService.ShowToaster("Mandatory fields " + errorMsg + " missing", 2);
            }
        });
    }

    duplicate(reportIds: any)
    {
        var duplcateMsg = "";
        var dplreportFldIds = [];
        for (var i = 0; i < reportIds.length; i++) {
            var status = 0;
            reportIds.filter(function (el) {
                if (el == reportIds[i])
                {
                    status = status + 1;
                }
                return true
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
            return true
        });         
        return duplcateMsg;
    }
}

export interface ReportArrayForLookUp {
    Id: number;
    Value: any;
}

export interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

export interface excelMappingTable {
    ExcelColumns: any;
    iDrawingsColumns: any;
    ReportFieldId: any;
    PositionNo: any;
}
