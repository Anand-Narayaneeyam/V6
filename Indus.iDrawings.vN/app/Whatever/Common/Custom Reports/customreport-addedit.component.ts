

import {Component, Output, EventEmitter, Input, OnChanges, SimpleChange, AfterViewChecked, ViewEncapsulation, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {CommonService} from '../../../Models/Common/common.service'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {CustomReportViewerComponent} from '../../Reports/CustomReports/customreports-preview';
import {CustomFieldOrderComponent} from '../Field Order/fieldorder.component';
import {QueryBuilderComponent} from '../../../framework/whatever/querybuilder/querybuildersearch.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';

@Component({
    selector: 'customrpt-addedit',
    templateUrl: 'app/Views/Common/custom Reports/customreport-addedit.component.html',
    directives: [StringTextBoxComponent, CustomCheckBoxComponent, SplitViewComponent, FieldComponent, CustomReportViewerComponent, CustomFieldOrderComponent, QueryBuilderComponent, CustomRadioComponent],
    providers: [NotificationService, CommonService, ValidateService],
    encapsulation: ViewEncapsulation.None,
    inputs: ['selectedId', 'fieldObject', 'itemSource', 'pageTarget', 'moduleId', 'listFieldDetails', 'showMyDef', 'showSetMyDef'],
})

export class CustomReportAddEdit implements AfterViewChecked, OnInit {
    fieldObject: IField[];
    selectedId: number;
    moduleId: number;
    reportCategoryId: number = 0;
    listFieldDetails: any[];
    itemSource: any[];
    fieldDtlsSave: IField[];
    sourceFieldObj = [];
    private numericdataIndex = [];
    private pageTitle: string = "";
    private onchangecount = 0;
    private btnSave = "Save";
    private isPreviewsave: boolean = false;
    private isSaveAsClick: boolean = false;
    private showFieldOrder: boolean = false;
    private showSaveWindow: boolean = false;
    private showFilter: boolean = false;
    secondTarget: number = 0;
    pageTarget: number = 0;
    dataToReport: any;
    reportFieldsToReport: any;
    reportFieldSrc: any;
    subhdrFieldSrc: any;
    tempRptHead: string = "";
    actionForQueryVuilder: string = "";
    queryCategryId: number = 0;
    objectCategoryId: number = undefined;
    @Output() retSaveCustomRpt = new EventEmitter();
    @Output() applyCustomRptClick = new EventEmitter();
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    queryCondition: string = "[]";
    customRPTQueryObj = new Array<customRptObj>();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    rbtnOrientation: IField = undefined;
    chkbxSerialNo: IField = undefined;
    blnFlag: boolean = false;
    IsUserDefaultSettingsExists: number = 0;

    constructor(private commonService: CommonService, private notificationService: NotificationService, private validateService: ValidateService) {

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if ((changes["fieldObject"] || changes["itemSource"]) && this.onchangecount == 0) {
            this.loadSource();
            this.onchangecount = 0;
        }
    }

    ngOnInit() {
        var contextObj = this;    
        if (contextObj.pageTarget == 2) {             
            contextObj.reportCategoryId = contextObj.listFieldDetails.find(function (el) { return el.ReportFieldId.toString() == 346 }).Value;
            contextObj.moduleId = contextObj.listFieldDetails.find(function (el) { return el.ReportFieldId.toString() == 353 }).Value;
            contextObj.selectedId = contextObj.reportCategoryId; // for customization width column enabling in edit mode


            contextObj.commonService.isUserDefaultSettingsExists(contextObj.reportCategoryId).subscribe(function (resultData) {
                contextObj.IsUserDefaultSettingsExists = resultData.Data;
            });            
        }
    }

    loadSource() {
        var itemSrc = this.itemSource;
        this.selectedId = this.selectedId == undefined ? 0 : this.selectedId;

        if (this.fieldObject && this.itemSource) {  

            if (this.pageTarget == 2) {
                var contextObj = this;
                contextObj.commonService.rbtnLoadOrientation().subscribe(function (resultData) {
                    contextObj.rbtnOrientation = resultData.Data[0];
                    contextObj.chkbxSerialNo = resultData.Data[1];
                    if (contextObj.itemSource[0]["IsLandscapeOriented"] == "1")
                        contextObj.rbtnOrientation.FieldValue = "93";
                    else
                        contextObj.rbtnOrientation.FieldValue = "92";

                    if (contextObj.itemSource[0]["IsSlNoRequired"] == "1")
                        contextObj.chkbxSerialNo.FieldValue = "true";
                    else
                        contextObj.chkbxSerialNo.FieldValue = "false";
                });
            }

            for (var j = 0; j < this.fieldObject.length; j++) {
                this.fieldObject[j].Width = this.getColumnwidth(this.fieldObject[j]).toString();
                this.fieldObject[j].IsHiddenLabel = true;
                if (this.fieldObject[j].ReportFieldId == 352)/*first col*/
                    this.fieldObject[j].ReadOnlyMode = true;
                if (j == 4 && this.pageTarget == 2) {
                    this.fieldObject[j].IsVisible = false;
                    this.fieldObject[j].Width = "0";
                }
            }
            var fieldarr = this.fieldObject;
            for (var i = 0; i < itemSrc.length; i++) {
                fieldarr = JSON.parse(JSON.stringify(fieldarr));
                fieldarr[0].FieldValue = itemSrc[i]["ReportFieldId"];
                fieldarr[1].FieldValue = itemSrc[i]["Data Fields"];
                fieldarr[2].FieldValue = itemSrc[i]["Report Columns"];
                fieldarr[3].FieldValue = itemSrc[i]["Sub Heading"];
                if (this.pageTarget != 2) {
                    fieldarr[4].FieldValue = itemSrc[i]["Column Heading"];
                }
                fieldarr[5].FieldValue = itemSrc[i]["Width"];
                fieldarr[6].FieldValue = itemSrc[i]["Show Subtotal"];
                fieldarr[7].FieldValue = itemSrc[i]["Show Grand Total"];
                var type = itemSrc[i]["TypeName"];
                if (this.selectedId > 0) {

                    if (itemSrc[i]["Report Columns"] == "True") {
                        fieldarr[5].IsEnabled = true;
                        fieldarr[4].IsEnabled = true;
                        if (type == 'Integer' || type == 'Float') {
                            fieldarr[7].IsEnabled = true;
                        }
                    } else {
                        fieldarr[4].IsEnabled = false;
                        if (type == 'Integer' || type == 'Float') {
                            fieldarr[7].IsEnabled = false;
                        }
                        if (itemSrc[i]["Sub Heading"] == "True")
                            fieldarr[5].IsEnabled = true;
                        else
                            fieldarr[5].IsEnabled = false;
                    }
                    //if (itemSrc[i]["Show Subtotal"] == "True")
                    //    fieldarr[6].IsEnabled = true;
                    //else
                    //    fieldarr[6].IsEnabled = false;
                    //if (itemSrc[i]["Show Grand Total"] == "True")
                    //    fieldarr[7].IsEnabled = true;
                    //else
                    //    fieldarr[7].IsEnabled = false;
                }                
                this.sourceFieldObj[i] = fieldarr;
              
                if (type == 'Integer' || type == 'Float') {
                    this.numericdataIndex.push(i);
                }
            }
            this.enableSubTotalChk();
        
            this.onchangecount++;
        }
    }

    getColumnwidth(fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if (fieldobj.DataEntryControlId == 1 && fieldobj.FieldLabel != "Width")
                width = 250;
            else
                if (fieldobj.DataEntryControlId == 6)
                    width = 90;
                else
                    width = 75;
            if (this.pageTarget == 2) {
                switch (fieldobj.FieldLabel) {
                    case "Data Fields":
                        width = 430;
                        break;
                    case "Report Columns":
                        width = 110;
                        break;
                    case "Show Subtotal":
                        width = 100;
                        break;
                    case "Show Grand Total":
                        width = 120;
                        break;
                    default:
                        break;
                }
            }
        }
        return width;
    }

    rbtnChange(event) {

    }

    SlNochecked(event) {
        this.chkbxSerialNo.FieldValue = event.IsChecked;
    }

    chkBoxChange(event, rowFieldObj, rowindex, ReportFieldType) {
        var maxPositionNo = 0;
        var maxGroupIndex = 0;
        switch (event.fieldId) {
            case 1623: /*Report Columns*/
                if (event.IsChecked) {
                    var maxPositionNo = Number(Math.max.apply(Math, this.itemSource.map(function (a) { return a["PositionNo"]; })));
                    rowFieldObj[3].FieldValue = (!event.IsChecked).toString();
                    this.itemSource[rowindex]["GroupIndex"] = 0;
                    this.itemSource[rowindex]["PositionNo"] = maxPositionNo + 1;
                } else {
                    if (this.pageTarget != 2) {
                        rowFieldObj[4].FieldValue = this.itemSource[rowindex]["Column Heading"];
                    }
                    rowFieldObj[5].FieldValue = this.itemSource[rowindex]["Width"];
                    rowFieldObj[6].FieldValue = "false";
                    rowFieldObj[7].FieldValue = "false";

                }
                /*this.getHtmlChkBxField("1624", event.IsChecked, rowindex);*/
                rowFieldObj[4].IsEnabled = event.IsChecked;
                rowFieldObj[5].IsEnabled = event.IsChecked;
                rowFieldObj[7].IsEnabled = event.IsChecked;
                if ((ReportFieldType == 'Integer' || ReportFieldType == 'Float') && (this.IsAnyRptorSubHeadColumnChecked(3)))
                    rowFieldObj[6].IsEnabled = event.IsChecked;
                break;
            case 1624: /*Sub heading*/
                if (event.IsChecked) {
                    var maxGroupIndex = Number(Math.max.apply(Math, this.itemSource.map(function (a) { return a["GroupIndex"]; })));
                    rowFieldObj[2].FieldValue = (!event.IsChecked).toString();
                    this.itemSource[rowindex]["PositionNo"] = 0;
                    this.itemSource[rowindex]["GroupIndex"] = maxGroupIndex + 1;
                    this.enableSubTotalChk();
                    rowFieldObj[5].FieldValue = this.itemSource[rowindex]["Width"];

                } else {
                    if (this.pageTarget != 2) {
                        rowFieldObj[4].FieldValue = this.itemSource[rowindex]["Column Heading"];
                    }
                    this.DisableSubTotalChk();
                }
                /*this.getHtmlChkBxField("1623", event.IsChecked, rowindex); */
                rowFieldObj[4].IsEnabled = event.IsChecked;
                rowFieldObj[5].IsEnabled = false;
                rowFieldObj[6].FieldValue = "false";
                rowFieldObj[6].IsEnabled = false;
                rowFieldObj[7].FieldValue = "false";
                rowFieldObj[7].IsEnabled = false;
                break;

        }
    }
    btnActionClick(eventTarget) {
        this.showSaveWindow = false;
        this.showFieldOrder = false;
        this.isSaveAsClick = false;
        this.isPreviewsave = false;
        this.showFilter = false;    
        switch (eventTarget) {
            case 1:
                this.filterClick();
                break;
            case 2:
                this.fldOrderclick();
                break;
            case 3:
                this.previewclick();
                break;
            case 4:             
                this.saveASRptclick();
                break;
            case 5:               
                this.saveCustomRptclick(1);
                break;
            case 6:
                this.applyOnClick(false);
                break;
            case 7:
                this.loadDefault(false);
                break;
            case 8:
                this.applyOnClick(true);
                break;
            case 9:
                this.loadDefault(true);
                break;
       

        }
    }

    btnActionKeypress(Keyevent, eventTarget) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            this.btnActionClick(eventTarget);
        }
    }

    saveCustomRptclick(target) {
        var context = this;
        this.showSaveWindow = true;
        if (context.isValidationError().length == 0) {

            if (target == 2) {
                this.pageTitle = "Report Preview";
                this.isPreviewsave = true;
            }
            else {
                this.pageTitle = "Save Custom Report";
                this.isPreviewsave = false;
            }

            var chkRptColumn = this.IsAnyRptorSubHeadColumnChecked(2);
            if (chkRptColumn) {
                this.commonService.loadSaveCustomReport(context.moduleId, context.selectedId).subscribe(function (result) {
                    var arr = [154, 150,151];
                    var cnt = arr.length;
            
                    result["Data"].find(function (item) {
                        switch (item.ReportFieldId) {
                            case 154:
                                if (context.selectedId == 0) {
                                    item.FieldValue = "35"; /*Portrait rdbtn default selection on add*/
                                } else {
                                    if (item.FieldValue == "True")
                                        item.FieldValue = "36";
                                    else
                                        item.FieldValue = "35";
                                }

                                cnt--;
                                break;
                            case 150:
                                if (target == 2) {
                                    item.IsVisible = false;
                                    item.IsMandatory = false;
                                }
                                cnt--;
                                break;
                            case 151:
                                if (context.selectedId == 0 && context.tempRptHead!="") {
                                    item.FieldValue = context.tempRptHead;
                                }
                                cnt--;
                                break;
                        }
                        if (cnt == 0)
                            return true;
                        else
                            return false;
                    });
                    context.fieldDtlsSave = result["Data"];
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                });
            } else
                context.notificationService.ShowToaster("Select at least one Report Field", 2);
        }
    }
    saveASRptclick() {

        if (this.isValidationError().length == 0) {
            this.isSaveAsClick = true;
            this.saveCustomRptclick(1);
        }
    }
    previewclick() {
        if (this.isValidationError().length == 0) {
            this.saveCustomRptclick(2);
        }
    }
    fldOrderclick() {      
        var context = this;
        context.reportFieldSrc = [];
        context.subhdrFieldSrc = [];
        var srcObj = this.sourceFieldObj;
        for (var i = 0; i < srcObj.length; i++) {
            if (srcObj[i][2].FieldValue.toString().toLowerCase() == "true")
                context.reportFieldSrc.push({ "Id": srcObj[i][0].FieldValue, "ColmnName": srcObj[i][1].FieldValue, "PositionNo": context.itemSource[i]["PositionNo"] });
            if (srcObj[i][3].FieldValue.toString().toLowerCase() == "true")
                context.subhdrFieldSrc.push({ "Id": srcObj[i][0].FieldValue, "ColmnName": srcObj[i][1].FieldValue, "PositionNo": context.itemSource[i]["GroupIndex"] });
        }
      
        if (context.reportFieldSrc.length > 0)
            context.reportFieldSrc.sort(context.sortArrayByKey("PositionNo"));
        if (context.subhdrFieldSrc.length > 0)
            context.subhdrFieldSrc.sort(context.sortArrayByKey("PositionNo"));
        if (context.reportFieldSrc.length > 0 || context.subhdrFieldSrc.length > 0) {
            context.pageTitle = "Field Order";
            context.showFieldOrder = true;
            context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
        } else {
            context.notificationService.ShowToaster("Select at least one field", 2);
        }
      
    }
    filterClick() {
        var context = this;
        context.customRPTQueryObj = [];
        context.getQueryBuilderCategoryId();
        context.pageTitle = "Filter";
        context.showFilter = true;
        context.splitviewInput.secondaryArea = 30;
        context.customRPTQueryObj.push({ "action": context.selectedId > 0 ? "Edit" : "Add", "selectedRptId": context.selectedId });
       
        context.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    private  getQueryBuilderCategoryId() {  
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 2: //Projects
                contextObj.queryCategryId =4;
                break;
            case 3://space
                contextObj.commonService.getAccessibleModuleForUser().subscribe(function (resultData) {
                    var enableEmpandSched = [];
                    enableEmpandSched = resultData["Data"].filter(function (item) {
                        return item.ModuleId == 5;
                    });
                    if (enableEmpandSched.length > 0) {
                        contextObj.queryCategryId = 35;
                    } else
                        contextObj.queryCategryId = 2;                  
                });
                break;
            case 5://Employee
                contextObj.queryCategryId = 12;        
                break;      
            case 4://Document
                contextObj.queryCategryId = 7;
                break;          
            case 6://Telecom
                contextObj.queryCategryId = 11;
                contextObj.objectCategoryId = 3;
                break;
            case 7://Asset
                contextObj.queryCategryId = 9;
                contextObj.objectCategoryId = 1;
                break;
            case 8://furniture
                contextObj.queryCategryId = 10;
                contextObj.objectCategoryId = 2;
                break;
            case 17://electrical
                contextObj.queryCategryId = 20;
                contextObj.objectCategoryId = 8;
                break;
            case 18://fire and safety
                contextObj.queryCategryId = 21;
                contextObj.objectCategoryId =9;
                break;
        
            case 25://Mechanical
                contextObj.queryCategryId = 23;
                contextObj.objectCategoryId = 10;
                break;
            case 26://Plumbing
                contextObj.queryCategryId = 24;
                contextObj.objectCategoryId = 11;
                break;
            case 27://medical gas
                contextObj.queryCategryId = 25;
                contextObj.objectCategoryId = 12;
                break;
            case 30://RPM
                contextObj.queryCategryId = 30;
                break;
         

        }     
    }
    /*any  "report column" /"Sub heading" checkbox  checked,passing the fieldobject index of the column */
    IsAnyRptorSubHeadColumnChecked(fieldIndex) {
        var isColChecked = false;
        this.sourceFieldObj.find(function (item) {
            if (item[fieldIndex].FieldValue.toString().toLowerCase() == "true") {
                isColChecked = true;
                return true;
            } else
                return false;
        });
        return isColChecked;
    }

    enableSubTotalChk() {
       
        var srcObj = this.sourceFieldObj;
        if (this.selectedId > 0) {
            if (this.IsAnyRptorSubHeadColumnChecked(3)) {
                for (var i = 0; i < srcObj.length; i++) {
                    if ((srcObj[i][2].FieldValue.toString().toLowerCase() == "true") && (this.numericdataIndex.indexOf(i) > -1))
                        srcObj[i][6].IsEnabled = true;
                }
            }
        } else {
            for (var i = 0; i < srcObj.length; i++) {
                if ((srcObj[i][2].FieldValue.toString().toLowerCase() == "true") && (this.numericdataIndex.indexOf(i) > -1))
                    srcObj[i][6].IsEnabled = true;
            }
        }
    }

    DisableSubTotalChk() {
        if (!this.IsAnyRptorSubHeadColumnChecked(3)) {
            var indexarray = this.numericdataIndex;
            for (var j = 0; j < indexarray.length; j++) {
                this.sourceFieldObj[indexarray[j]][6].IsEnabled = false;
                this.sourceFieldObj[indexarray[j]][6].FieldValue = "false";
            }
        }
    }

    txtBoxChange(event) {
        var curFieldObj = event["txtChangeObject"]["fieldObject"];
        var context = this;
        /*set the "report heading" txt value same as "report name"*/
        if (curFieldObj.ReportFieldId == 150 ) {
          this.fieldDtlsSave.find(function (item) {
                if (item.ReportFieldId == 151) {
                    item.FieldValue = curFieldObj.FieldValue;              
                    var el = <HTMLElement>document.getElementById("1610");
                    if (el != null && el != undefined) {
                        setTimeout(function () {
                            context.validateService.initiateValidation(item, context, true, el);
                        }, 100);
                    }              
                    return true;
                }
                else
                    return false;
            })
        }
       
        if (curFieldObj.ReportFieldId == 151 && this.isPreviewsave == true) {
            this.tempRptHead = curFieldObj.FieldValue;
        }
    }
    isValidationError() {
        var errordata = [];
        errordata = this.sourceFieldObj.filter(function (item) { return (item[4].HasValidationError == true || item[5].HasValidationError == true) })
        return errordata;
    }
    sortArrayByKey(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
    onSaveCustomRptDetails(event) {
        var context = this;
        var fieldObj = JSON.parse(event.fieldobject);
        fieldObj.find(function (item) {
            if (item.ReportFieldId == 154) {
                item.Value = item.Value == "36" ? "1" : "0";
                return true;
            } else
                return false;
        });
        event.fieldobject = JSON.stringify(fieldObj);
        this.dataToReport = event.fieldobject;
        var tmpRptFields = [];
        /*Report Column or Sub Heading checked row data filtering */
        for (var i = 0; i < this.sourceFieldObj.length; i++) {
            if (this.sourceFieldObj[i][2].FieldValue.toString().toLowerCase() == "true" || this.sourceFieldObj[i][3].FieldValue.toString().toLowerCase() == "true") {
                var customRptfieldsobj = new Array<CustomReportFields>();
                customRptfieldsobj.push({
                    Id: this.itemSource[i]["ReportFieldId"],
                    Name: this.itemSource[i]["Column Name"],
                    AliasName: this.sourceFieldObj[i][4].FieldValue,
                    Type: this.itemSource[i]["GenericDataTypeId"],
                    PositionNo: this.itemSource[i]["PositionNo"],
                    Width: this.sourceFieldObj[i][5].FieldValue,
                    GroupIndex: this.itemSource[i]["GroupIndex"],
                    IsGroupingColumn: this.sourceFieldObj[i][3].FieldValue,
                    NeedSubTotal: this.sourceFieldObj[i][6].FieldValue,
                    NeedGrandTotal: this.sourceFieldObj[i][7].FieldValue
                    
                });
                tmpRptFields.push(customRptfieldsobj[0]);
            }
        }
        this.reportFieldsToReport = tmpRptFields;
        context.queryCondition = context.queryCondition == "" ? "[]" : context.queryCondition;
        if (context.isPreviewsave) {
            this.commonService.PreviewCustomReport(this.selectedId, this.moduleId, event.fieldobject, JSON.stringify(tmpRptFields), this.queryCondition).subscribe(function (result) {
                if (result["Data"].StatusId == 1) {
                   
                    context.queryCondition = context.queryCondition == "[]" ? "" : context.queryCondition;
                   // alert(context.queryCondition);
                    context.secondTarget = 1;
                   
                    //call reportviewer to show the preview 
                } else
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        } else {
          
            this.commonService.SaveCustomReport(this.selectedId, this.moduleId, event.fieldobject, JSON.stringify(tmpRptFields), this.isSaveAsClick, this.queryCondition).subscribe(function (result) {
                switch (result["Data"].StatusId) {
                    case 3:
                        if (result["Data"].ServerId == -1)
                            context.notificationService.ShowToaster("Report Name already exists", 5);
                        else if (result["Data"].ServerId == -2)
                            context.notificationService.ShowToaster("Custom Report with this name already created by another User", 5);
                        break;
                    case 1:
                        var action = "";
                        if (context.selectedId > 0 && context.isSaveAsClick != true) {
                            context.notificationService.ShowToaster("Custom Report details updated", 3);
                            action = "edit";
                        } else {
                            context.notificationService.ShowToaster("Report saved", 3);
                            action = "add"
                        }
                        context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.retSaveCustomRpt.emit({ "returnData": result["Data"].Data[0], "actionName": action });
                }
            });
        }


    }

    retFieldOrderUpdate(event) {     
        for (var i = 0; i < this.itemSource.length; i++) {
            var fldId = this.itemSource[i]["ReportFieldId"];
            if (event["rptFieldSrcIds"].indexOf(fldId) > -1) {
                this.itemSource[i]["PositionNo"] = event["rptFieldSrcIds"].indexOf(fldId) + 1;

            } else if (event["subHdrFldSrcIds"].indexOf(fldId) > -1) {
                this.itemSource[i]["GroupIndex"] = event["subHdrFldSrcIds"].indexOf(fldId) + 1;
            }
        } 
        console.log("itemsrcafter", this.itemSource);                   
        this.notificationService.ShowToaster("Field Order updated", 3);
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    getHtmlChkBxField(fieldId: string, IsChecked, rowindex) {
        var fieldId = fieldId + "_" + rowindex;
        if (document.getElementById(fieldId))
        (<HTMLInputElement>document.getElementById(fieldId).getElementsByTagName("INPUT")[0]).checked = false;         
    }

    generateQueryOut(event) {
      
        this.queryCondition = event.query;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    //getdbFieldNames(label) {
    //    var retLabel = label;
    //    switch (label) {
    //        case "Alias Name":
    //            retLabel = "Data Fields";
    //            break;
    //        case "IsReportField":
    //            retLabel = "Report Columns";
    //            break;
    //        case "IsGroupField":
    //            retLabel = "Sub Heading";
    //            break;
    //        case "heading":
    //            retLabel = "Column Heading";
    //            break;
    //        case "IsSubTotalRequired":
    //            retLabel = "Show Subtotal";
    //            break;
    //        case "IsGrandTotalRequired":
    //            retLabel = "Show Grand Total";
    //            break;
           
               
    //    }
    //    return retLabel;
    //}
    loadDefault(IsSystemDefault) {
        var contextObj = this;
        if (!IsSystemDefault) {
            if (contextObj.IsUserDefaultSettingsExists == 0) {
                contextObj.notificationService.ShowToaster("No User default setting exists", 2);
            } else {
                contextObj.getDefaultSettings(IsSystemDefault)
            }
        } else {
            contextObj.getDefaultSettings(IsSystemDefault)
        }
    }

    getDefaultSettings(IsSystemDefault) {
        var contextObj = this;

        switch (contextObj.moduleId) {
            case 6://Telecom
                contextObj.objectCategoryId = 3;
                break;
            case 7://Asset
                contextObj.objectCategoryId = 1;
                break;
            case 8://furniture
                contextObj.objectCategoryId = 2;
                break;
            case 17://electrical
                contextObj.objectCategoryId = 8;
                break;
            case 18://fire and safety
                contextObj.objectCategoryId = 9;
                break;
            case 24://security assets
                contextObj.objectCategoryId = 20;
                break;
            case 25://Mechanical
                contextObj.objectCategoryId = 10;
                break;
            case 26://Plumbing
                contextObj.objectCategoryId = 11;
                break;
            case 27://medical gas
                contextObj.objectCategoryId = 12;
                break;
            default:
                contextObj.objectCategoryId = 0;
                break;
        }   

        contextObj.commonService.loadDefaultCustomizeReport(JSON.stringify(contextObj.listFieldDetails), contextObj.objectCategoryId, IsSystemDefault).subscribe(function (result) {
            contextObj.itemSource = JSON.parse(result);

            if (contextObj.itemSource[0]["IsLandscapeOriented"] == "1")
                contextObj.rbtnOrientation.FieldValue = "93";
            else
                contextObj.rbtnOrientation.FieldValue = "92";

            if (contextObj.itemSource[0]["IsSlNoRequired"] == "1")
                contextObj.chkbxSerialNo.FieldValue = "true";
            else
                contextObj.chkbxSerialNo.FieldValue = "false";

            contextObj.loadSource();
        });
    }

    applyOnClick(SetMyDefault) {
        if (this.isValidationError().length == 0) {
            var chkRptColumn = this.IsAnyRptorSubHeadColumnChecked(2);
            if (chkRptColumn) {
                var context = this;
                var reportCatId = context.reportCategoryId.toString();
                var IsLandscape = false;
                var IsSlNoReqd = false;
                var tmpRptFields = [];
                /*Report Column or Sub Heading checked row data filtering */
                for (var i = 0; i < this.sourceFieldObj.length; i++) {
                    if (this.sourceFieldObj[i][2].FieldValue.toString().toLowerCase() == "true" || this.sourceFieldObj[i][3].FieldValue.toString().toLowerCase() == "true") {
                        var customRptfieldsobj = new Array<CustomReportFields>();
                        customRptfieldsobj.push({
                            Id: this.itemSource[i]["ReportFieldId"],
                            Name: this.itemSource[i]["Column Name"],
                            AliasName: this.itemSource[i]["Column Name"],
                            Type: this.itemSource[i]["GenericDataTypeId"],
                            PositionNo: this.itemSource[i]["PositionNo"],
                            Width: this.sourceFieldObj[i][5].FieldValue,
                            GroupIndex: this.itemSource[i]["GroupIndex"],
                            IsGroupingColumn: this.sourceFieldObj[i][3].FieldValue,
                            NeedSubTotal: this.sourceFieldObj[i][6].FieldValue,
                            NeedGrandTotal: this.sourceFieldObj[i][7].FieldValue

                        });
                        tmpRptFields.push(customRptfieldsobj[0]);
                    }
                }
                context.reportFieldsToReport = tmpRptFields;

                if (context.rbtnOrientation.FieldValue == "93")
                    IsLandscape = true;
                else
                    IsLandscape = false;

                if (context.chkbxSerialNo.FieldValue)
                    IsSlNoReqd = true;
                else
                    IsSlNoReqd = false;

                context.commonService.ApplySaveCustomizationReport(JSON.stringify(tmpRptFields), reportCatId, IsLandscape, IsSlNoReqd, SetMyDefault).subscribe(function (result) {

                    if (result["Data"].StatusId == 1) {
                        if (SetMyDefault) {
                            context.notificationService.ShowToaster("Report settings saved", 2);
                        }

                        context.applyCustomRptClick.emit({
                        });
                    }
                });

            } else {
                context.notificationService.ShowToaster("Select at least one Report Field", 2);
            }
        
        }
    }

    ngAfterViewChecked() {
        if (this.splitviewInput.showSecondaryView == false) {
            this.secondTarget =0;                   
         
        }
    }
}

export interface CustomReportFields {
    Id: number;
    Name: string;
    AliasName: string;
    Type: number;
    PositionNo:number;
    Width:number;    
    GroupIndex: number;   
    IsGroupingColumn: boolean;    
    NeedSubTotal: boolean;    
    NeedGrandTotal: boolean;   
     
}
export interface customRptObj {
    action: string;
    selectedRptId: number;
}


