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
var common_service_1 = require('../../../Models/Common/common.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var customreports_preview_1 = require('../../Reports/CustomReports/customreports-preview');
var fieldorder_component_1 = require('../Field Order/fieldorder.component');
var querybuildersearch_component_1 = require('../../../framework/whatever/querybuilder/querybuildersearch.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var CustomReportAddEdit = (function () {
    function CustomReportAddEdit(commonService, notificationService, validateService) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.reportCategoryId = 0;
        this.sourceFieldObj = [];
        this.numericdataIndex = [];
        this.pageTitle = "";
        this.onchangecount = 0;
        this.btnSave = "Save";
        this.isPreviewsave = false;
        this.isSaveAsClick = false;
        this.showFieldOrder = false;
        this.showSaveWindow = false;
        this.showFilter = false;
        this.secondTarget = 0;
        this.pageTarget = 0;
        this.tempRptHead = "";
        this.actionForQueryVuilder = "";
        this.queryCategryId = 0;
        this.objectCategoryId = undefined;
        this.retSaveCustomRpt = new core_1.EventEmitter();
        this.applyCustomRptClick = new core_1.EventEmitter();
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.queryCondition = "[]";
        this.customRPTQueryObj = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.rbtnOrientation = undefined;
        this.chkbxSerialNo = undefined;
        this.blnFlag = false;
        this.IsUserDefaultSettingsExists = 0;
    }
    CustomReportAddEdit.prototype.ngOnChanges = function (changes) {
        if ((changes["fieldObject"] || changes["itemSource"]) && this.onchangecount == 0) {
            this.loadSource();
            this.onchangecount = 0;
        }
    };
    CustomReportAddEdit.prototype.ngOnInit = function () {
        var contextObj = this;
        if (contextObj.pageTarget == 2) {
            contextObj.reportCategoryId = contextObj.listFieldDetails.find(function (el) { return el.ReportFieldId.toString() == 346; }).Value;
            contextObj.moduleId = contextObj.listFieldDetails.find(function (el) { return el.ReportFieldId.toString() == 353; }).Value;
            contextObj.selectedId = contextObj.reportCategoryId; // for customization width column enabling in edit mode
            contextObj.commonService.isUserDefaultSettingsExists(contextObj.reportCategoryId).subscribe(function (resultData) {
                contextObj.IsUserDefaultSettingsExists = resultData.Data;
            });
        }
    };
    CustomReportAddEdit.prototype.loadSource = function () {
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
                if (this.fieldObject[j].ReportFieldId == 352)
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
                    }
                    else {
                        fieldarr[4].IsEnabled = false;
                        if (type == 'Integer' || type == 'Float') {
                            fieldarr[7].IsEnabled = false;
                        }
                        if (itemSrc[i]["Sub Heading"] == "True")
                            fieldarr[5].IsEnabled = true;
                        else
                            fieldarr[5].IsEnabled = false;
                    }
                }
                this.sourceFieldObj[i] = fieldarr;
                if (type == 'Integer' || type == 'Float') {
                    this.numericdataIndex.push(i);
                }
            }
            this.enableSubTotalChk();
            this.onchangecount++;
        }
    };
    CustomReportAddEdit.prototype.getColumnwidth = function (fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if (fieldobj.DataEntryControlId == 1 && fieldobj.FieldLabel != "Width")
                width = 250;
            else if (fieldobj.DataEntryControlId == 6)
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
    };
    CustomReportAddEdit.prototype.rbtnChange = function (event) {
    };
    CustomReportAddEdit.prototype.SlNochecked = function (event) {
        this.chkbxSerialNo.FieldValue = event.IsChecked;
    };
    CustomReportAddEdit.prototype.chkBoxChange = function (event, rowFieldObj, rowindex, ReportFieldType) {
        var maxPositionNo = 0;
        var maxGroupIndex = 0;
        switch (event.fieldId) {
            case 1623:
                if (event.IsChecked) {
                    var maxPositionNo = Number(Math.max.apply(Math, this.itemSource.map(function (a) { return a["PositionNo"]; })));
                    rowFieldObj[3].FieldValue = (!event.IsChecked).toString();
                    this.itemSource[rowindex]["GroupIndex"] = 0;
                    this.itemSource[rowindex]["PositionNo"] = maxPositionNo + 1;
                }
                else {
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
            case 1624:
                if (event.IsChecked) {
                    var maxGroupIndex = Number(Math.max.apply(Math, this.itemSource.map(function (a) { return a["GroupIndex"]; })));
                    rowFieldObj[2].FieldValue = (!event.IsChecked).toString();
                    this.itemSource[rowindex]["PositionNo"] = 0;
                    this.itemSource[rowindex]["GroupIndex"] = maxGroupIndex + 1;
                    this.enableSubTotalChk();
                    rowFieldObj[5].FieldValue = this.itemSource[rowindex]["Width"];
                }
                else {
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
    };
    CustomReportAddEdit.prototype.btnActionClick = function (eventTarget) {
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
    };
    CustomReportAddEdit.prototype.btnActionKeypress = function (Keyevent, eventTarget) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            this.btnActionClick(eventTarget);
        }
    };
    CustomReportAddEdit.prototype.saveCustomRptclick = function (target) {
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
                    var arr = [154, 150, 151];
                    var cnt = arr.length;
                    result["Data"].find(function (item) {
                        switch (item.ReportFieldId) {
                            case 154:
                                if (context.selectedId == 0) {
                                    item.FieldValue = "35"; /*Portrait rdbtn default selection on add*/
                                }
                                else {
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
                                if (context.selectedId == 0 && context.tempRptHead != "") {
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
            }
            else
                context.notificationService.ShowToaster("Select at least one Report Field", 2);
        }
    };
    CustomReportAddEdit.prototype.saveASRptclick = function () {
        if (this.isValidationError().length == 0) {
            this.isSaveAsClick = true;
            this.saveCustomRptclick(1);
        }
    };
    CustomReportAddEdit.prototype.previewclick = function () {
        if (this.isValidationError().length == 0) {
            this.saveCustomRptclick(2);
        }
    };
    CustomReportAddEdit.prototype.fldOrderclick = function () {
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
        }
        else {
            context.notificationService.ShowToaster("Select at least one field", 2);
        }
    };
    CustomReportAddEdit.prototype.filterClick = function () {
        var context = this;
        context.customRPTQueryObj = [];
        context.getQueryBuilderCategoryId();
        context.pageTitle = "Filter";
        context.showFilter = true;
        context.splitviewInput.secondaryArea = 30;
        context.customRPTQueryObj.push({ "action": context.selectedId > 0 ? "Edit" : "Add", "selectedRptId": context.selectedId });
        context.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    CustomReportAddEdit.prototype.getQueryBuilderCategoryId = function () {
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 2:
                contextObj.queryCategryId = 4;
                break;
            case 3:
                contextObj.commonService.getAccessibleModuleForUser().subscribe(function (resultData) {
                    var enableEmpandSched = [];
                    enableEmpandSched = resultData["Data"].filter(function (item) {
                        return item.ModuleId == 5;
                    });
                    if (enableEmpandSched.length > 0) {
                        contextObj.queryCategryId = 35;
                    }
                    else
                        contextObj.queryCategryId = 2;
                });
                break;
            case 5:
                contextObj.queryCategryId = 12;
                break;
            case 4:
                contextObj.queryCategryId = 7;
                break;
            case 6:
                contextObj.queryCategryId = 11;
                contextObj.objectCategoryId = 3;
                break;
            case 7:
                contextObj.queryCategryId = 9;
                contextObj.objectCategoryId = 1;
                break;
            case 8:
                contextObj.queryCategryId = 10;
                contextObj.objectCategoryId = 2;
                break;
            case 17:
                contextObj.queryCategryId = 20;
                contextObj.objectCategoryId = 8;
                break;
            case 18:
                contextObj.queryCategryId = 21;
                contextObj.objectCategoryId = 9;
                break;
            case 25:
                contextObj.queryCategryId = 23;
                contextObj.objectCategoryId = 10;
                break;
            case 26:
                contextObj.queryCategryId = 24;
                contextObj.objectCategoryId = 11;
                break;
            case 27:
                contextObj.queryCategryId = 25;
                contextObj.objectCategoryId = 12;
                break;
            case 30:
                contextObj.queryCategryId = 30;
                break;
        }
    };
    /*any  "report column" /"Sub heading" checkbox  checked,passing the fieldobject index of the column */
    CustomReportAddEdit.prototype.IsAnyRptorSubHeadColumnChecked = function (fieldIndex) {
        var isColChecked = false;
        this.sourceFieldObj.find(function (item) {
            if (item[fieldIndex].FieldValue.toString().toLowerCase() == "true") {
                isColChecked = true;
                return true;
            }
            else
                return false;
        });
        return isColChecked;
    };
    CustomReportAddEdit.prototype.enableSubTotalChk = function () {
        var srcObj = this.sourceFieldObj;
        if (this.selectedId > 0) {
            if (this.IsAnyRptorSubHeadColumnChecked(3)) {
                for (var i = 0; i < srcObj.length; i++) {
                    if ((srcObj[i][2].FieldValue.toString().toLowerCase() == "true") && (this.numericdataIndex.indexOf(i) > -1))
                        srcObj[i][6].IsEnabled = true;
                }
            }
        }
        else {
            for (var i = 0; i < srcObj.length; i++) {
                if ((srcObj[i][2].FieldValue.toString().toLowerCase() == "true") && (this.numericdataIndex.indexOf(i) > -1))
                    srcObj[i][6].IsEnabled = true;
            }
        }
    };
    CustomReportAddEdit.prototype.DisableSubTotalChk = function () {
        if (!this.IsAnyRptorSubHeadColumnChecked(3)) {
            var indexarray = this.numericdataIndex;
            for (var j = 0; j < indexarray.length; j++) {
                this.sourceFieldObj[indexarray[j]][6].IsEnabled = false;
                this.sourceFieldObj[indexarray[j]][6].FieldValue = "false";
            }
        }
    };
    CustomReportAddEdit.prototype.txtBoxChange = function (event) {
        var curFieldObj = event["txtChangeObject"]["fieldObject"];
        var context = this;
        /*set the "report heading" txt value same as "report name"*/
        if (curFieldObj.ReportFieldId == 150) {
            this.fieldDtlsSave.find(function (item) {
                if (item.ReportFieldId == 151) {
                    item.FieldValue = curFieldObj.FieldValue;
                    var el = document.getElementById("1610");
                    if (el != null && el != undefined) {
                        setTimeout(function () {
                            context.validateService.initiateValidation(item, context, true, el);
                        }, 100);
                    }
                    return true;
                }
                else
                    return false;
            });
        }
        if (curFieldObj.ReportFieldId == 151 && this.isPreviewsave == true) {
            this.tempRptHead = curFieldObj.FieldValue;
        }
    };
    CustomReportAddEdit.prototype.isValidationError = function () {
        var errordata = [];
        errordata = this.sourceFieldObj.filter(function (item) { return (item[4].HasValidationError == true || item[5].HasValidationError == true); });
        return errordata;
    };
    CustomReportAddEdit.prototype.sortArrayByKey = function (prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            }
            else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        };
    };
    CustomReportAddEdit.prototype.onSaveCustomRptDetails = function (event) {
        var context = this;
        var fieldObj = JSON.parse(event.fieldobject);
        fieldObj.find(function (item) {
            if (item.ReportFieldId == 154) {
                item.Value = item.Value == "36" ? "1" : "0";
                return true;
            }
            else
                return false;
        });
        event.fieldobject = JSON.stringify(fieldObj);
        this.dataToReport = event.fieldobject;
        var tmpRptFields = [];
        /*Report Column or Sub Heading checked row data filtering */
        for (var i = 0; i < this.sourceFieldObj.length; i++) {
            if (this.sourceFieldObj[i][2].FieldValue.toString().toLowerCase() == "true" || this.sourceFieldObj[i][3].FieldValue.toString().toLowerCase() == "true") {
                var customRptfieldsobj = new Array();
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
                }
                else
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        }
        else {
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
                        }
                        else {
                            context.notificationService.ShowToaster("Report saved", 3);
                            action = "add";
                        }
                        context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.retSaveCustomRpt.emit({ "returnData": result["Data"].Data[0], "actionName": action });
                }
            });
        }
    };
    CustomReportAddEdit.prototype.retFieldOrderUpdate = function (event) {
        for (var i = 0; i < this.itemSource.length; i++) {
            var fldId = this.itemSource[i]["ReportFieldId"];
            if (event["rptFieldSrcIds"].indexOf(fldId) > -1) {
                this.itemSource[i]["PositionNo"] = event["rptFieldSrcIds"].indexOf(fldId) + 1;
            }
            else if (event["subHdrFldSrcIds"].indexOf(fldId) > -1) {
                this.itemSource[i]["GroupIndex"] = event["subHdrFldSrcIds"].indexOf(fldId) + 1;
            }
        }
        console.log("itemsrcafter", this.itemSource);
        this.notificationService.ShowToaster("Field Order updated", 3);
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    CustomReportAddEdit.prototype.getHtmlChkBxField = function (fieldId, IsChecked, rowindex) {
        var fieldId = fieldId + "_" + rowindex;
        if (document.getElementById(fieldId))
            document.getElementById(fieldId).getElementsByTagName("INPUT")[0].checked = false;
    };
    CustomReportAddEdit.prototype.generateQueryOut = function (event) {
        this.queryCondition = event.query;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
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
    CustomReportAddEdit.prototype.loadDefault = function (IsSystemDefault) {
        var contextObj = this;
        if (!IsSystemDefault) {
            if (contextObj.IsUserDefaultSettingsExists == 0) {
                contextObj.notificationService.ShowToaster("No User default setting exists", 2);
            }
            else {
                contextObj.getDefaultSettings(IsSystemDefault);
            }
        }
        else {
            contextObj.getDefaultSettings(IsSystemDefault);
        }
    };
    CustomReportAddEdit.prototype.getDefaultSettings = function (IsSystemDefault) {
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 6:
                contextObj.objectCategoryId = 3;
                break;
            case 7:
                contextObj.objectCategoryId = 1;
                break;
            case 8:
                contextObj.objectCategoryId = 2;
                break;
            case 17:
                contextObj.objectCategoryId = 8;
                break;
            case 18:
                contextObj.objectCategoryId = 9;
                break;
            case 24:
                contextObj.objectCategoryId = 20;
                break;
            case 25:
                contextObj.objectCategoryId = 10;
                break;
            case 26:
                contextObj.objectCategoryId = 11;
                break;
            case 27:
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
    };
    CustomReportAddEdit.prototype.applyOnClick = function (SetMyDefault) {
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
                        var customRptfieldsobj = new Array();
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
                        context.applyCustomRptClick.emit({});
                    }
                });
            }
            else {
                context.notificationService.ShowToaster("Select at least one Report Field", 2);
            }
        }
    };
    CustomReportAddEdit.prototype.ngAfterViewChecked = function () {
        if (this.splitviewInput.showSecondaryView == false) {
            this.secondTarget = 0;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CustomReportAddEdit.prototype, "retSaveCustomRpt", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CustomReportAddEdit.prototype, "applyCustomRptClick", void 0);
    CustomReportAddEdit = __decorate([
        core_1.Component({
            selector: 'customrpt-addedit',
            templateUrl: 'app/Views/Common/custom Reports/customreport-addedit.component.html',
            directives: [stringtextbox_component_1.StringTextBoxComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, customreports_preview_1.CustomReportViewerComponent, fieldorder_component_1.CustomFieldOrderComponent, querybuildersearch_component_1.QueryBuilderComponent, radiocomponent_component_1.CustomRadioComponent],
            providers: [notify_service_1.NotificationService, common_service_1.CommonService, validation_service_1.ValidateService],
            encapsulation: core_1.ViewEncapsulation.None,
            inputs: ['selectedId', 'fieldObject', 'itemSource', 'pageTarget', 'moduleId', 'listFieldDetails', 'showMyDef', 'showSetMyDef'],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], CustomReportAddEdit);
    return CustomReportAddEdit;
}());
exports.CustomReportAddEdit = CustomReportAddEdit;
//# sourceMappingURL=customreport-addedit.component.js.map