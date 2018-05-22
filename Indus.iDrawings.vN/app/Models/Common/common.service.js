var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var CommonService = (function (_super) {
    __extends(CommonService, _super);
    function CommonService(http) {
        _super.call(this, http);
        this.http = http;
        this.GetSavedSearchesURL = 'Common/GetSavedSearches';
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.QueryBuilderSeachUrl = 'Common/GetQueryBuilderSeachResult';
        this.QueryBuilderSearchResultsForObjectsUrl = 'Common/GetQueryBuilderSearchResultsForObjects';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.GetSpaceTypeDatasetURL = 'Common/GetSpaceTypeDataset';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.getSessionValues = 'Common/GetSessionValues';
        this.getaddEditCustomRpt = 'Common/GetCustomReportData';
        this.saveCustomRpt = 'Common/SaveCustomReport';
        this.previewCustomRpt = 'Common/SaveCustomReportPreview';
        this.queryFieldNamesLookup = 'Common/PopulateQueryBuilderFieldList';
        this.queryFieldValuesLookup = 'Common/GetQueryBuilderLookupValues';
        this.listFieldObjMultipleEditUrl = 'Common/GetApplicationFormFieldsForMultipleEdit';
        this.listDetailsForMultipleEditUrl = 'Common/GetApplicationFormFieldDetails';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.getColorPrefernceDataUrl = 'Common/GetColorPreferenceSettings';
        this.upadateColorPrefernceDataUrl = 'Common/UpdateColorPreferenceSettings';
        this.customRptListFrmId = 299;
        this.customRptAddEditFrmId = 300;
        this.saveCustomReportFormId = 303;
        this.queryBuilderFormId = 312;
        this.multipleEditFormId = 380;
        this.InsertQueryBuilderSeachURL = 'Common/InsertQueryBuilderSeachCondition';
        this.InsertQueryBuilderSearchNameURL = 'Common/InsertQueryBuilderSearchName';
        this.GetArchivedSearchesURL = 'Documents/GetArchivedSearches';
        this.getCustomRPTConditions = 'Common/GetCustomRptQueryCondition';
        this.scheduleReportAddEditFormId = 523;
        this.emailRecipientsForScheduleReportFormId = 532;
        this.GetUsersByCategoryForScheduledReportURL = 'Common/GetUsersByCategoryForScheduledReport';
        this.InsertScheduledReportURL = 'Common/InsertUpdateScheduledReport';
        this.DeleteSavedSearches = 'Documents/DeleteSavedSearches';
        this.checkHasScheduledReportURL = 'Common/CheckHasScheduledReport';
        this.CheckDeletePermisionForArchivedSearchURL = 'Common/CheckDeletePermisionForArchivedSearch';
        this.accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
        this.ReplaceFieldLabelURL = 'Object/ReplaceFieldLabel';
        this.getCustomizeReport = 'Common/GetCustomizeReportData';
        this.applySaveCustomizationforReport = 'Common/ApplySaveCustomizationReport';
        this.getDefaultCustomizeReport = 'Common/GetDefaultCustomizeReportData';
        this.checkUserDefaultSettingsExists = 'Common/CheckUserDefaultSettingsExists';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.NumberFormatItemDetailsUrl = 'Common/GetNumberFormatItemDetails';
        this.InsertUpdateNumberFormatUrl = 'Common/InsertUpdateNumberFormat';
        this.NumberFormatFormId = 491;
        this.NumberFormatDetailsUrl = 'Common/GetNumberFormatDetails';
        this.CheckNumberFormatUrl = 'Common/CheckNumberFormatInUse';
        this.CheckDuplicateFieldValuesUrl = 'Common/CheckDuplicateFieldValues';
        this.customerFeatures = 'Common/GetSubscribedFeatures';
    }
    CommonService.prototype.getListFields = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    };
    CommonService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    /*******custom report*********/
    CommonService.prototype.getCustomReportData = function (moduleId, pageIndex, sortCol, sortDir) {
        var rptFieldValues = "[{\"ReportFieldId\":149,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":3356,\"Value\":\"1\"}]";
        var param = "{ FormId: " + this.customRptListFrmId + ",ListReportFieldIdValues:" + rptFieldValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    CommonService.prototype.getCustomReportListColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.customRptListFrmId + " }" }, this.listFieldObjUrl);
    };
    CommonService.prototype.loadCustomRptAddEditCol = function () {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + " }" }, this.listFieldObjUrl);
    };
    CommonService.prototype.loadCustomRptAddEditData = function (selectedId, target, listParams, objCatgId) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId }, this.getaddEditCustomRpt);
    };
    CommonService.prototype.loadSaveCustomReport = function (moduleId, selectedId) {
        var rptlookupFieldValues = "[{\"FieldId\":1611,\"ReportFieldId\":12097,\"Value\":\"2275\"}]";
        if (selectedId > 0) {
            var rptFieldValues = "[{\"ReportFieldId\":147,\"Value\":\"" + selectedId + "\"},{\"ReportFieldId\":149,\"Value\":\"" + moduleId + "\"}]";
            return this.postaction({
                Input: "{ FormId:" + this.saveCustomReportFormId + ",ParentFormId:" + this.customRptListFrmId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + ",Id:" + selectedId + ",ListReportFieldIdValues:" + rptFieldValues + "}"
            }, this.editDataUrl);
        }
        else {
            /*for Orientation radiobuttonlist*/
            return this.postaction({
                Input: "{ FormId:" + this.saveCustomReportFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}"
            }, this.addDataUrl);
        }
    };
    CommonService.prototype.SaveCustomReport = function (rptId, moduleId, listRptField, reportFields, isSaveAs, queryCondition) {
        var parentRPTId = isSaveAs == true ? rptId : 0;
        rptId = isSaveAs == true ? 0 : rptId;
        return this.postaction({ Input: "{ FormId:" + this.saveCustomReportFormId + ",ReportId:" + rptId + ",ListReportFieldIdValues:" + listRptField + ",ReportFields:" + reportFields + ",Modules:" + moduleId + ",ListRptFieldIdValuesforRptCondition:" + queryCondition + "}", isSaveAs: isSaveAs, parentRPTId: parentRPTId }, this.saveCustomRpt);
    };
    CommonService.prototype.PreviewCustomReport = function (rptId, moduleId, listRptField, reportFields, queryCondition) {
        return this.postaction({ Input: "{ FormId:" + this.saveCustomReportFormId + ",ReportId:" + rptId + ",ListReportFieldIdValues:" + listRptField + ",ReportFields:" + reportFields + ",Modules:" + moduleId + ",ListRptFieldIdValuesforRptCondition:" + queryCondition + "}" }, this.previewCustomRpt);
    };
    //AddUpdateCustomReport(strRptFields: string, selectedId: number, target: number) {
    //    if (target == 1)
    //    {
    //        return this.postaction({ Input: "{FormId:" + this.customRptAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.customRptListFrmId + "}" }, this.submitAddUrl);
    //    } else {
    //        return this.postaction({ Input: "{FormId:" + this.customRptAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.customRptListFrmId + "}" }, this.submitEditUrl);
    //    }
    //}
    CommonService.prototype.deleteCustomReport = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.customRptListFrmId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    /***********************************/
    /****************Query Space Type********************/
    CommonService.prototype.SubmitQuerySpaceType = function (reportfields) {
        debugger;
        if (reportfields)
            return this.postaction({ Input: "{FormId:583 ,ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.submitAddUrl);
    };
    CommonService.prototype.UpdateQuerySpaceType = function (Id, reportfields) {
        debugger;
        if (reportfields)
            return this.postaction({ Input: "{FormId:583 ,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.submitEditUrl);
    };
    /***********************************/
    /**********QueryBuilder*************/
    CommonService.prototype.loadQueryBuilderFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.queryBuilderFormId + " }" }, this.listFieldObjUrl);
    };
    CommonService.prototype.loadQueryFldNamesLookUp = function (queryCategoryId, reportfields) {
        if (reportfields)
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + ",ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.queryFieldNamesLookup);
        else if (queryCategoryId == -1)
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldNamesLookup);
        else
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldNamesLookup);
    };
    CommonService.prototype.loadQueryFieldValuesLookUp = function (queryCategoryId) {
        return this.postaction({ Input: "{ BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldValuesLookup);
    };
    /***********************************/
    /* MultipleEdit Field Details  */
    CommonService.prototype.getMultipleEditFormFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.multipleEditFormId + " }" }, this.listFieldObjUrl);
    };
    CommonService.prototype.getFieldsForMultipleEdit = function (formId, strReportFieldIdValues) {
        if (strReportFieldIdValues) {
            return this.postaction({ input: "{Id:" + formId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}" }, this.listFieldObjMultipleEditUrl);
        }
        else {
            return this.postaction({ input: "{Id:" + formId + " }" }, this.listFieldObjMultipleEditUrl);
        }
    };
    CommonService.prototype.getFieldDetailsForMultipleEdit = function (formFieldId, formId, objectCategoryId, strReportFieldIds, strLookUpReportFieldIds) {
        if (strLookUpReportFieldIds == null) {
            return this.postaction({ input: "{FormId:" + formId + ",Id:" + formFieldId + ",ObjectCategoryId:" + objectCategoryId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDetailsForMultipleEditUrl);
        }
        else {
            return this.postaction({ input: "{FormId:" + formId + ",Id:" + formFieldId + ",ObjectCategoryId:" + objectCategoryId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ListLookupReportFieldIdValues:" + strLookUpReportFieldIds + "}" }, this.listDetailsForMultipleEditUrl);
        }
    };
    CommonService.prototype.loadOrganizationalUnit = function (Id, parentId, formId, levelId) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + Id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + levelId + "\"},{\"ReportFieldId\":288,\"Value\":\"" + Id + "\"}]}" }, this.lookupUrl);
    };
    /* Color Prefernce */
    CommonService.prototype.getColorPreferenceFields = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    };
    CommonService.prototype.getColorPreferenceData = function (formId, ModuleId, isMySetting) {
        return this.postaction({ Input: "{ FormId:" + formId + "}", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    ;
    CommonService.prototype.getColorPreferenceDataForObjects = function (formId, ModuleId, rptField, isMySetting) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + rptField + " }", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    ;
    CommonService.prototype.updateColorPreferenceData = function (formId, ModuleId, pageDetails, isMySettings) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + pageDetails + "}", moduleId: ModuleId, isMySettings: isMySettings }, this.upadateColorPrefernceDataUrl);
    };
    CommonService.prototype.updateColorPreferenceDataForObjects = function (formId, ModuleId, pageDetails, isMySettings) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + pageDetails + "}", moduleId: ModuleId, isMySettings: isMySettings }, this.upadateColorPrefernceDataUrl);
    };
    /**********New QueryBuilder*************/
    CommonService.prototype.QueryBuilderSeachResult = function (FormId, value, QueryCategoryId, drawingId, pageIndex, sortDir, sortCol) {
        return this.postaction({ Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", drawingId: drawingId }, this.QueryBuilderSeachUrl);
    };
    CommonService.prototype.QueryBuilderSeachResultExport = function (FormId, value, QueryCategoryId, drawingId, fieldObjects, fileName, pageIndex, sortDir, sortCol) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", drawingId: drawingId, fileName: fileName, fields: filterArray };
    };
    CommonService.prototype.QueryBuilderSearchResultsForObjects = function (FormId, value, QueryCategoryId, drawingIds, ObjectCategory, StatusId, Attributes, ObjectClassIds, pageIndex, sortDir, sortCol) {
        return this.postaction({ Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", DrawingIds: drawingIds, ObjectCategory: ObjectCategory, StatusId: StatusId, Attributes: Attributes, ObjectClassIds: ObjectClassIds }, this.QueryBuilderSearchResultsForObjectsUrl);
    };
    CommonService.prototype.QueryBuilderSearchResultsForObjectsExport = function (FormId, value, QueryCategoryId, drawingIds, fieldObjects, fileName, ObjectCategory, StatusId, Attributes, ObjectClassIds, pageIndex, sortDir, sortCol) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", DrawingIds: drawingIds, ObjectCategory: ObjectCategory, StatusId: StatusId, Attributes: Attributes, ObjectClassIds: ObjectClassIds, fileName: fileName, fields: filterArray };
    };
    CommonService.prototype.loadAddEdit = function (selectedId, FormId, field, target) {
        debugger;
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + FormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + FormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    CommonService.prototype.SaveQueryBuilder = function (searchNameId, queryCategoryId, listRptField) {
        if (queryCategoryId != "-1")
            //let rptFieldValues = "[{\"ReportFieldId\":2144,\"Value\":\"" + searchName + "\"},{\"ReportFieldId\":6438,\"Value\":\"" + isSaveAs + "\"}]"; 
            return this.postaction({ Input: "{ FormId:525,ListReportFieldIdValues:" + listRptField + ", Id: " + searchNameId + "}", queryCategoryId: queryCategoryId }, this.InsertQueryBuilderSeachURL);
        else
            return this.postaction({ Input: "{ FormId:583,ListReportFieldIdValues:" + listRptField + ", Id: " + Number(searchNameId) + "}", queryCategoryId: queryCategoryId }, this.InsertQueryBuilderSeachURL);
    };
    CommonService.prototype.SaveQueryBuilderSearchName = function (value) {
        // searchNameId = isSaveAs == true ? 0 : searchNameId;
        //  let rptFieldValues = "[{\"ReportFieldId\":2144,\"Value\":\"" + searchName + "\"},{\"ReportFieldId\":6438,\"Value\":\"" + isSaveAs + "\"}]"; 
        return this.postaction({ Input: "{ FormId:525,ListReportFieldIdValues:" + JSON.stringify(value) + "}" }, this.InsertQueryBuilderSearchNameURL);
    };
    CommonService.prototype.loadLookup = function (Id, parentId, formId, value) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + Id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + value + "}" }, this.lookupUrl);
    };
    CommonService.prototype.ddlSavedSearches = function (strRptFields) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetSavedSearchesURL);
    };
    CommonService.prototype.GetArchivedSearches = function (strRptFields) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetArchivedSearchesURL);
    };
    CommonService.prototype.GetSpaceTypeDataset = function (Id) {
        return this.postaction({ Input: "{FormId:487,Id:" + Id + " }" }, this.GetSpaceTypeDatasetURL);
    };
    CommonService.prototype.loadScheduleReportAddEditFields = function (isEditOption, rprtId) {
        if (isEditOption == 1) {
            var rptlookupFieldValues = "[{\"FieldId\":2643,\"ReportFieldId\":12097,\"Value\":\"4074\"},{\"FieldId\":2648,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2666,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2642,\"ReportFieldId\":5472,\"Value\":\"20\"}]";
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
        }
        else if (isEditOption == 2) {
            debugger;
            var rptlookupFieldValues = "[{\"FieldId\":2643,\"ReportFieldId\":12097,\"Value\":\"4074\"},{\"FieldId\":2648,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2666,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2642,\"ReportFieldId\":5472,\"Value\":\"20\"},{\"FieldId\":2647,\"ReportFieldId\":7365,\"Value\":" + rprtId + "}]";
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
        }
    };
    CommonService.prototype.loadEmailRecipientsFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}" }, this.addDataUrl);
    };
    CommonService.prototype.loadEmailRecipientsList = function (ddlFVal, reportId) {
        if (reportId == 0) {
            return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: ddlFVal, InternalUserGroupId: 0, ReportId: 0 }, this.GetUsersByCategoryForScheduledReportURL);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: ddlFVal, InternalUserGroupId: 0, ReportId: reportId }, this.GetUsersByCategoryForScheduledReportURL);
        }
    };
    CommonService.prototype.InsertScheduledReport = function (listRptField, reportData, emailReciepient, target, reportId, allReportData) {
        if (reportId == 0) {
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListReportFieldIdValues:" + listRptField + "}", IsAdd: 1, ScheduleReportInput: "{ lstScheduleRptParams:" + reportData + ",ListEmailReciepients:" + emailReciepient + "}", AllReportData: allReportData }, this.InsertScheduledReportURL);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListReportFieldIdValues:" + listRptField + ",Id:" + reportId + "}", IsAdd: 0, ScheduleReportInput: "{ lstScheduleRptParams:" + reportData + ",ListEmailReciepients:" + emailReciepient + "}", AllReportData: allReportData }, this.InsertScheduledReportURL);
        }
    };
    CommonService.prototype.CheckHasScheduledReport = function (reportCatId, IsCustReport) {
        if (IsCustReport == 0) {
            return this.postaction({ ReportCategoryId: reportCatId, IsCustomReport: IsCustReport }, this.checkHasScheduledReportURL);
        }
    };
    CommonService.prototype.QueryBuilderSearchDelete = function (id) {
        return this.postaction({ Input: "{FormId:488,Id: " + id + "}" }, this.DeleteSavedSearches);
    };
    CommonService.prototype.CheckDeletePermisionForArchivedSearch = function (id) {
        return this.postaction({ Input: "{FormId:488,Id: " + id + "}" }, this.CheckDeletePermisionForArchivedSearchURL);
    };
    CommonService.prototype.getAllEmailIdsForScheduledReport = function (rprtId, recType) {
        return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: recType, InternalUserGroupId: 0, ReportId: rprtId }, this.GetUsersByCategoryForScheduledReportURL);
    };
    CommonService.prototype.ReplaceFieldLabel = function (replaceText, ObjectCategoryId) {
        return this.postaction({ text: replaceText, ObjectCategoryId: ObjectCategoryId }, this.ReplaceFieldLabelURL);
    };
    CommonService.prototype.getAccessibleModuleForUser = function () {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    };
    CommonService.prototype.loadCustomizeReportData = function (listParams, objCatgId, isDefault) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId }, this.getCustomizeReport);
    };
    CommonService.prototype.loadDefaultCustomizeReport = function (listParams, objCatgId, isDefault) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId, IsDefault: isDefault }, this.getDefaultCustomizeReport);
    };
    CommonService.prototype.getDefaultDrawingLayerColms = function () {
        return this.postaction({ Input: "{FormId: 562}" }, this.listFieldObjUrl);
    };
    CommonService.prototype.getDefaultDrawingLayerListData = function (pagedeatils, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: 562,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pagedeatils + "}" }, this.listDataListUrl);
    };
    CommonService.prototype.AddDefaultDrawingLayer = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 562,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 562}" }, this.submitAddUrl);
    };
    CommonService.prototype.UpdateDefaultDrawingLayer = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId: 562 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 562}" }, this.submitEditUrl);
    };
    CommonService.prototype.deleteDefaultDrawingLayer = function (strRptFields, seleId) {
        return this.postaction({ Input: "{FormId: 562 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 562,Id:" + seleId + "}" }, this.deleteUrl);
    };
    CommonService.prototype.getCustomReportCondition = function (strRptFields) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.getCustomRPTConditions);
    };
    CommonService.prototype.ApplySaveCustomizationReport = function (reportFields, strReportCatId, blnIsLandscape, blnIsSlNoReqd, blnIsDefault) {
        return this.postaction({ Input: "{ ReportFields:" + reportFields + "}", reportCategoryId: strReportCatId, IsLandscape: blnIsLandscape, IsSlNoReqd: blnIsSlNoReqd, IsDefault: blnIsDefault }, this.applySaveCustomizationforReport);
    };
    CommonService.prototype.rbtnLoadOrientation = function () {
        return this.postaction({ Input: "{ FormId:570,ListLookupReportFieldIdValues:[{ \"FieldId\":2945,\"ReportFieldId\": 12097, \"Value\":\"4498\" }]}" }, this.listFieldObjUrl);
    };
    CommonService.prototype.isUserDefaultSettingsExists = function (ReportCatId) {
        return this.postaction({ Input: "{}", reportCategoryId: ReportCatId }, this.checkUserDefaultSettingsExists);
    };
    CommonService.prototype.getNumberformatfields = function (Moduleid) {
        var lookupreportfieldvalue = "";
        lookupreportfieldvalue = ",ListLookupReportFieldIdValues:[{\"FieldId\":3023,\"ReportFieldId\": 271, \"Value\":\"" + Moduleid + " \" }]";
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + lookupreportfieldvalue + "}" }, this.editDataUrl);
    };
    CommonService.prototype.getNumberFormatItemDetails = function (CategoryId, target) {
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + "}", NumberFormatCategoryId: CategoryId, Target: target }, this.NumberFormatItemDetailsUrl);
    };
    CommonService.prototype.UpdateNumberFormatDetails = function (NumberFormatInput, CategoryId, strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}", NumberFormatInput: NumberFormatInput, NumberFormatCategoryId: CategoryId }, this.InsertUpdateNumberFormatUrl);
    };
    CommonService.prototype.GetNumberFormatColumnLookupValues = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.NumberFormatFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    CommonService.prototype.getNumberFormatDetails = function (CategoryId) {
        var reportfieldvalue = "";
        var rptFieldValues = "";
        if (CategoryId >= 0)
            reportfieldvalue = ",ListReportFieldIdValues:[{\"ReportFieldId\":5202,\"Value\":\"" + CategoryId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + reportfieldvalue + "}" }, this.NumberFormatDetailsUrl);
    };
    CommonService.prototype.CheckNumberFormat = function (CategoryId) {
        return this.postaction({ Input: "{Id:" + CategoryId + "}" }, this.CheckNumberFormatUrl);
    };
    CommonService.prototype.CheckDuplicateFieldValues = function (CategoryId, strReportFieldIds) {
        return this.postaction({ Input: "{" + (strReportFieldIds == '' ? '' : "ListReportFieldIdValues:" + strReportFieldIds) + "}", Category: CategoryId }, this.CheckDuplicateFieldValuesUrl);
    };
    CommonService.prototype.getCustomerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    CommonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommonService);
    return CommonService;
}(HttpHelpers_1.HttpHelpers));
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map