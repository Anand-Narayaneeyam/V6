import { Injectable } from '@angular/core';
import { IField } from '../../Framework/Models/Interface/IField'
import { Http, Response } from '@angular/http';
import { HttpHelpers } from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CommonService extends HttpHelpers {
    private GetSavedSearchesURL = 'Common/GetSavedSearches';
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private QueryBuilderSeachUrl = 'Common/GetQueryBuilderSeachResult';
    private QueryBuilderSearchResultsForObjectsUrl = 'Common/GetQueryBuilderSearchResultsForObjects';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private GetSpaceTypeDatasetURL = 'Common/GetSpaceTypeDataset';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private deleteUrl = 'Common/DeleteAppFormData';
    private getSessionValues = 'Common/GetSessionValues';
    private getaddEditCustomRpt = 'Common/GetCustomReportData';
    private saveCustomRpt = 'Common/SaveCustomReport';
    private previewCustomRpt = 'Common/SaveCustomReportPreview';
    private queryFieldNamesLookup = 'Common/PopulateQueryBuilderFieldList';
    private queryFieldValuesLookup = 'Common/GetQueryBuilderLookupValues';
    private listFieldObjMultipleEditUrl = 'Common/GetApplicationFormFieldsForMultipleEdit';
    private listDetailsForMultipleEditUrl = 'Common/GetApplicationFormFieldDetails';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private getColorPrefernceDataUrl = 'Common/GetColorPreferenceSettings';
    private upadateColorPrefernceDataUrl = 'Common/UpdateColorPreferenceSettings';
    private customRptListFrmId = 299;
    private customRptAddEditFrmId = 300;
    private saveCustomReportFormId = 303;
    private queryBuilderFormId = 312;
    private multipleEditFormId = 380;
    private InsertQueryBuilderSeachURL = 'Common/InsertQueryBuilderSeachCondition';
    private InsertQueryBuilderSearchNameURL = 'Common/InsertQueryBuilderSearchName';
    private GetArchivedSearchesURL = 'Documents/GetArchivedSearches';
    private getCustomRPTConditions = 'Common/GetCustomRptQueryCondition';
    private scheduleReportAddEditFormId = 523;
    private emailRecipientsForScheduleReportFormId = 532;
    private GetUsersByCategoryForScheduledReportURL = 'Common/GetUsersByCategoryForScheduledReport';
    private InsertScheduledReportURL = 'Common/InsertUpdateScheduledReport';
    private DeleteSavedSearches = 'Documents/DeleteSavedSearches';
    private checkHasScheduledReportURL = 'Common/CheckHasScheduledReport';
    private CheckDeletePermisionForArchivedSearchURL = 'Common/CheckDeletePermisionForArchivedSearch';
    private accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
    private ReplaceFieldLabelURL = 'Object/ReplaceFieldLabel';
    private getCustomizeReport = 'Common/GetCustomizeReportData';
    private applySaveCustomizationforReport = 'Common/ApplySaveCustomizationReport';
    private getDefaultCustomizeReport = 'Common/GetDefaultCustomizeReportData';   
    private checkUserDefaultSettingsExists = 'Common/CheckUserDefaultSettingsExists';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
    private NumberFormatItemDetailsUrl = 'Common/GetNumberFormatItemDetails';
    private InsertUpdateNumberFormatUrl = 'Common/InsertUpdateNumberFormat';
    private NumberFormatFormId = 491;
    private NumberFormatDetailsUrl = 'Common/GetNumberFormatDetails';
    private CheckNumberFormatUrl = 'Common/CheckNumberFormatInUse';
    private CheckDuplicateFieldValuesUrl = 'Common/CheckDuplicateFieldValues';
    private customerFeatures = 'Common/GetSubscribedFeatures';

    constructor(private http: Http) {
        super(http);
    }
    getListFields(formId: string) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    }
    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }

    /*******custom report*********/

    getCustomReportData(moduleId: number, pageIndex?: number, sortCol?: string, sortDir?: string) {
        let rptFieldValues = "[{\"ReportFieldId\":149,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":3356,\"Value\":\"1\"}]";
        var param = "{ FormId: " + this.customRptListFrmId + ",ListReportFieldIdValues:" + rptFieldValues + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        return this.postaction({ Input: param }, this.listDataListUrl);
    }
    getCustomReportListColumns() {
        return this.postaction({ Input: "{ FormId:" + this.customRptListFrmId + " }" }, this.listFieldObjUrl);
    }
    loadCustomRptAddEditCol() {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + " }" }, this.listFieldObjUrl);

    }
    loadCustomRptAddEditData(selectedId: number, target: number, listParams: string, objCatgId: number) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId }, this.getaddEditCustomRpt);
    }
    loadSaveCustomReport(moduleId: number, selectedId: number) {


        let rptlookupFieldValues = "[{\"FieldId\":1611,\"ReportFieldId\":12097,\"Value\":\"2275\"}]";
        if (selectedId > 0) {
            let rptFieldValues = "[{\"ReportFieldId\":147,\"Value\":\"" + selectedId + "\"},{\"ReportFieldId\":149,\"Value\":\"" + moduleId + "\"}]";
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
    }

    SaveCustomReport(rptId: number, moduleId: number, listRptField: string, reportFields: string, isSaveAs: boolean, queryCondition: string) {

        var parentRPTId = isSaveAs == true ? rptId: 0;
        rptId = isSaveAs == true ? 0 : rptId;
        return this.postaction({ Input: "{ FormId:" + this.saveCustomReportFormId + ",ReportId:" + rptId + ",ListReportFieldIdValues:" + listRptField + ",ReportFields:" + reportFields + ",Modules:" + moduleId + ",ListRptFieldIdValuesforRptCondition:" + queryCondition + "}", isSaveAs: isSaveAs, parentRPTId: parentRPTId}, this.saveCustomRpt);
    }
    PreviewCustomReport(rptId: number, moduleId: number, listRptField: string, reportFields: string, queryCondition: string) {
        return this.postaction({ Input: "{ FormId:" + this.saveCustomReportFormId + ",ReportId:" + rptId + ",ListReportFieldIdValues:" + listRptField + ",ReportFields:" + reportFields + ",Modules:" + moduleId + ",ListRptFieldIdValuesforRptCondition:" + queryCondition+ "}" }, this.previewCustomRpt);
    }
    //AddUpdateCustomReport(strRptFields: string, selectedId: number, target: number) {
    //    if (target == 1)
    //    {
    //        return this.postaction({ Input: "{FormId:" + this.customRptAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.customRptListFrmId + "}" }, this.submitAddUrl);
    //    } else {
    //        return this.postaction({ Input: "{FormId:" + this.customRptAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.customRptListFrmId + "}" }, this.submitEditUrl);
    //    }

    //}
    deleteCustomReport(selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.customRptListFrmId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }


    /***********************************/



    /****************Query Space Type********************/

    SubmitQuerySpaceType(reportfields?: any) {
        debugger
        if (reportfields)
            return this.postaction({ Input: "{FormId:583 ,ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.submitAddUrl);
    }

    UpdateQuerySpaceType(Id: any,reportfields?: any) {
        debugger
        if (reportfields)
            return this.postaction({ Input: "{FormId:583 ,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.submitEditUrl);
    }


      /***********************************/

    /**********QueryBuilder*************/
    loadQueryBuilderFields() {
        return this.postaction({ Input: "{ FormId:" + this.queryBuilderFormId + " }" }, this.listFieldObjUrl);
    }

    loadQueryFldNamesLookUp(queryCategoryId: any, reportfields?:any) {
        if (reportfields)
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + ",ListReportFieldIdValues:" + JSON.stringify(reportfields) + "}" }, this.queryFieldNamesLookup);
        else if (queryCategoryId == -1)
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldNamesLookup);
        else
            return this.postaction({ Input: "{BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldNamesLookup);
    }
    loadQueryFieldValuesLookUp(queryCategoryId: number) {
        return this.postaction({ Input: "{ BaseEntityId:" + queryCategoryId + " }" }, this.queryFieldValuesLookup);
    }
    /***********************************/

    /* MultipleEdit Field Details  */

    getMultipleEditFormFields() {
        return this.postaction({ Input: "{ FormId:" + this.multipleEditFormId + " }" }, this.listFieldObjUrl);
    }

    getFieldsForMultipleEdit(formId: number, strReportFieldIdValues?: string) {
        if (strReportFieldIdValues) {
            return this.postaction({ input: "{Id:" + formId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}" }, this.listFieldObjMultipleEditUrl);
        } else {
            return this.postaction({ input: "{Id:" + formId + " }" }, this.listFieldObjMultipleEditUrl);
        }
    }

    getFieldDetailsForMultipleEdit(formFieldId: number, formId: number, objectCategoryId: number, strReportFieldIds: string, strLookUpReportFieldIds: any) {
        if (strLookUpReportFieldIds == null) {
            return this.postaction({ input: "{FormId:" + formId + ",Id:" + formFieldId + ",ObjectCategoryId:" + objectCategoryId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDetailsForMultipleEditUrl);
        } else {
            return this.postaction({ input: "{FormId:" + formId + ",Id:" + formFieldId + ",ObjectCategoryId:" + objectCategoryId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ListLookupReportFieldIdValues:" + strLookUpReportFieldIds + "}" }, this.listDetailsForMultipleEditUrl);
        }
    }

    loadOrganizationalUnit(Id: string, parentId: number, formId: number, levelId: number) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + Id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + levelId + "\"},{\"ReportFieldId\":288,\"Value\":\"" + Id + "\"}]}" }, this.lookupUrl);
    }
    /* Color Prefernce */
    getColorPreferenceFields(formId: string) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    }
    getColorPreferenceData(formId: string, ModuleId: string, isMySetting: boolean) {
        return this.postaction({ Input: "{ FormId:" + formId + "}", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    getColorPreferenceDataForObjects(formId: string, ModuleId: string, rptField: any, isMySetting: boolean) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + rptField+" }", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    updateColorPreferenceData(formId: string, ModuleId: string, pageDetails: any, isMySettings: boolean) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + pageDetails + "}", moduleId: ModuleId, isMySettings: isMySettings }, this.upadateColorPrefernceDataUrl);
    }
    updateColorPreferenceDataForObjects(formId: string, ModuleId: string, pageDetails: any, isMySettings: boolean) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + pageDetails + "}", moduleId: ModuleId, isMySettings: isMySettings }, this.upadateColorPrefernceDataUrl);
    }
    /**********New QueryBuilder*************/
    QueryBuilderSeachResult(FormId, value: any, QueryCategoryId, drawingId: any, pageIndex?: number, sortDir?: string, sortCol?: string) {

        return this.postaction({ Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", drawingId: drawingId }, this.QueryBuilderSeachUrl);
    }
    QueryBuilderSeachResultExport(FormId, value: any, QueryCategoryId, drawingId: any,fieldObjects: any, fileName,pageIndex?: number, sortDir?: string, sortCol?: string) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", drawingId: drawingId ,fileName: fileName, fields: filterArray};
    }

    QueryBuilderSearchResultsForObjects(FormId, value: any, QueryCategoryId:any, drawingIds: string, ObjectCategory: any, StatusId: any, Attributes: any, ObjectClassIds: string, pageIndex?: number, sortDir?: string, sortCol?: string) {

        return this.postaction({ Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", DrawingIds: drawingIds, ObjectCategory: ObjectCategory, StatusId: StatusId, Attributes: Attributes, ObjectClassIds: ObjectClassIds }, this.QueryBuilderSearchResultsForObjectsUrl);
    }

    QueryBuilderSearchResultsForObjectsExport(FormId, value: any, QueryCategoryId: any, drawingIds: any, fieldObjects: any, fileName, ObjectCategory: any, StatusId: any, Attributes: any, ObjectClassIds: string, pageIndex?: number, sortDir?: string, sortCol?: string) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + FormId + ",ListReportFieldIdValues:" + value + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + QueryCategoryId + "}", DrawingIds: drawingIds, ObjectCategory: ObjectCategory, StatusId: StatusId, Attributes: Attributes, ObjectClassIds: ObjectClassIds, fileName: fileName, fields: filterArray };
    }

    loadAddEdit(selectedId: number, FormId, field: any, target) {
        debugger
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + FormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + FormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    SaveQueryBuilder(searchNameId: any, queryCategoryId: string, listRptField: any) {
        if (queryCategoryId !="-1")
        //let rptFieldValues = "[{\"ReportFieldId\":2144,\"Value\":\"" + searchName + "\"},{\"ReportFieldId\":6438,\"Value\":\"" + isSaveAs + "\"}]"; 
            return this.postaction({ Input: "{ FormId:525,ListReportFieldIdValues:" + listRptField + ", Id: " + searchNameId + "}", queryCategoryId: queryCategoryId }, this.InsertQueryBuilderSeachURL);
        else
            return this.postaction({ Input: "{ FormId:583,ListReportFieldIdValues:" + listRptField + ", Id: " + Number(searchNameId) + "}", queryCategoryId: queryCategoryId }, this.InsertQueryBuilderSeachURL);
    }
    SaveQueryBuilderSearchName(value: any) {
        // searchNameId = isSaveAs == true ? 0 : searchNameId;
        //  let rptFieldValues = "[{\"ReportFieldId\":2144,\"Value\":\"" + searchName + "\"},{\"ReportFieldId\":6438,\"Value\":\"" + isSaveAs + "\"}]"; 
        return this.postaction({ Input: "{ FormId:525,ListReportFieldIdValues:" + JSON.stringify(value) + "}" }, this.InsertQueryBuilderSearchNameURL);
    }
    loadLookup(Id: string, parentId: number, formId: number, value: any) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + Id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + value + "}" }, this.lookupUrl);
    }
    ddlSavedSearches(strRptFields: string) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetSavedSearchesURL);
    }
    GetArchivedSearches(strRptFields: string) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetArchivedSearchesURL);
    }

    GetSpaceTypeDataset(Id: string) {
        return this.postaction({ Input: "{FormId:487,Id:" + Id +" }" }, this.GetSpaceTypeDatasetURL);
    }

   
    loadScheduleReportAddEditFields(isEditOption: number, rprtId: number) {

        if (isEditOption == 1) {
            let rptlookupFieldValues = "[{\"FieldId\":2643,\"ReportFieldId\":12097,\"Value\":\"4074\"},{\"FieldId\":2648,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2666,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2642,\"ReportFieldId\":5472,\"Value\":\"20\"}]";
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
        } else if (isEditOption == 2) {
            debugger
            let rptlookupFieldValues = "[{\"FieldId\":2643,\"ReportFieldId\":12097,\"Value\":\"4074\"},{\"FieldId\":2648,\"ReportFieldId\":12097,\"Value\":\"4089\"},{\"FieldId\":2666,\"ReportFieldId\":12097,\"Value\":\"4102\"},{\"FieldId\":2642,\"ReportFieldId\":5472,\"Value\":\"20\"},{\"FieldId\":2647,\"ReportFieldId\":7365,\"Value\":" + rprtId + "}]";
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
        }

    }

    loadEmailRecipientsFields() {

        return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}" }, this.addDataUrl);

    }

    loadEmailRecipientsList(ddlFVal: number, reportId: number) {

        if (reportId == 0) {
            return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: ddlFVal, InternalUserGroupId: 0, ReportId: 0 }, this.GetUsersByCategoryForScheduledReportURL);
        }
        else {
            
            return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: ddlFVal, InternalUserGroupId: 0, ReportId: reportId }, this.GetUsersByCategoryForScheduledReportURL);
        }

    }


    InsertScheduledReport(listRptField: string, reportData: string, emailReciepient: string, target: number, reportId: number,allReportData:string)
    {        
        if (reportId == 0) //Add
        { 
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListReportFieldIdValues:" + listRptField + "}", IsAdd: 1, ScheduleReportInput: "{ lstScheduleRptParams:" + reportData + ",ListEmailReciepients:" + emailReciepient + "}", AllReportData: allReportData }, this.InsertScheduledReportURL);
        }
        else //Edit
        {                     
            return this.postaction({ Input: "{ FormId:" + this.scheduleReportAddEditFormId + ",ListReportFieldIdValues:" + listRptField + ",Id:" + reportId + "}", IsAdd: 0, ScheduleReportInput: "{ lstScheduleRptParams:" + reportData + ",ListEmailReciepients:" + emailReciepient + "}", AllReportData: allReportData  }, this.InsertScheduledReportURL);
        }
    }

    CheckHasScheduledReport(reportCatId: number, IsCustReport: number)
    {
        if (IsCustReport == 0)
        {   
            return this.postaction({ ReportCategoryId: reportCatId, IsCustomReport: IsCustReport }, this.checkHasScheduledReportURL);
        }
    }
    QueryBuilderSearchDelete(id) {
        return this.postaction({ Input: "{FormId:488,Id: " + id + "}" }, this.DeleteSavedSearches);
    }
    CheckDeletePermisionForArchivedSearch(id) {
        return this.postaction({ Input: "{FormId:488,Id: " + id + "}" }, this.CheckDeletePermisionForArchivedSearchURL);
    }

    getAllEmailIdsForScheduledReport(rprtId: number, recType: number) {

        return this.postaction({ Input: "{ FormId:" + this.emailRecipientsForScheduleReportFormId + "}", RecipientType: recType, InternalUserGroupId: 0, ReportId: rprtId }, this.GetUsersByCategoryForScheduledReportURL);
    }
    ReplaceFieldLabel(replaceText: string, ObjectCategoryId: string) {

        return this.postaction({ text: replaceText, ObjectCategoryId: ObjectCategoryId }, this.ReplaceFieldLabelURL);
    }
    getAccessibleModuleForUser() {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    }

    loadCustomizeReportData(listParams: string, objCatgId: number, isDefault: boolean) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId }, this.getCustomizeReport);
    }
    loadDefaultCustomizeReport(listParams: string, objCatgId: number, isDefault: boolean) {
        return this.postaction({ Input: "{ FormId:" + this.customRptAddEditFrmId + ",ListReportFieldIdValues:" + listParams + "}", ObjectCategoryId: objCatgId, IsDefault: isDefault }, this.getDefaultCustomizeReport);
    }    
    getDefaultDrawingLayerColms() {
        return this.postaction({ Input: "{FormId: 562}" }, this.listFieldObjUrl);
    }
    getDefaultDrawingLayerListData(pagedeatils: string, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: 562,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pagedeatils + "}" }, this.listDataListUrl);
    }
    AddDefaultDrawingLayer(strRptFields: string, selectedId: number) {
        return this.postaction({ Input: "{FormId: 562,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 562}" }, this.submitAddUrl);
    }
    UpdateDefaultDrawingLayer(strRptFields: string, selectedId: number) {
        return this.postaction({ Input: "{FormId: 562 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 562}" }, this.submitEditUrl);
    }
    deleteDefaultDrawingLayer(strRptFields: string, seleId: number) {
        return this.postaction({ Input: "{FormId: 562 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId: 562,Id:" + seleId + "}" }, this.deleteUrl);
    }
    getCustomReportCondition(strRptFields: string) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.getCustomRPTConditions);
    }

    ApplySaveCustomizationReport(reportFields: string, strReportCatId: string, blnIsLandscape: boolean, blnIsSlNoReqd: boolean, blnIsDefault: boolean) {
        return this.postaction({ Input: "{ ReportFields:" + reportFields + "}", reportCategoryId: strReportCatId, IsLandscape: blnIsLandscape, IsSlNoReqd: blnIsSlNoReqd, IsDefault: blnIsDefault }, this.applySaveCustomizationforReport);
    }

    rbtnLoadOrientation() {
        return this.postaction({ Input: "{ FormId:570,ListLookupReportFieldIdValues:[{ \"FieldId\":2945,\"ReportFieldId\": 12097, \"Value\":\"4498\" }]}" }, this.listFieldObjUrl);
    }

    isUserDefaultSettingsExists(ReportCatId: number) {
        return this.postaction({ Input: "{}", reportCategoryId: ReportCatId }, this.checkUserDefaultSettingsExists);
    }
    getNumberformatfields(Moduleid) {
        var lookupreportfieldvalue: string = "";        
        lookupreportfieldvalue = ",ListLookupReportFieldIdValues:[{\"FieldId\":3023,\"ReportFieldId\": 271, \"Value\":\"" + Moduleid+" \" }]";
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + lookupreportfieldvalue + "}" }, this.editDataUrl);
    }
    getNumberFormatItemDetails(CategoryId: number, target: number) {
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + "}", NumberFormatCategoryId: CategoryId, Target: target }, this.NumberFormatItemDetailsUrl);
    }
    UpdateNumberFormatDetails(NumberFormatInput: any, CategoryId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}", NumberFormatInput: NumberFormatInput, NumberFormatCategoryId: CategoryId }, this.InsertUpdateNumberFormatUrl);
    } 

    GetNumberFormatColumnLookupValues(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.NumberFormatFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    getNumberFormatDetails(CategoryId: number) {
        var reportfieldvalue: string = "";
        let rptFieldValues = "";
        if (CategoryId >= 0)
            reportfieldvalue = ",ListReportFieldIdValues:[{\"ReportFieldId\":5202,\"Value\":\"" + CategoryId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.NumberFormatFormId + reportfieldvalue + "}" }, this.NumberFormatDetailsUrl);
    }

    CheckNumberFormat(CategoryId: number) {
        return this.postaction({ Input: "{Id:" + CategoryId + "}" }, this.CheckNumberFormatUrl)
    }

    CheckDuplicateFieldValues(CategoryId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{" + (strReportFieldIds == '' ? '' : "ListReportFieldIdValues:" + strReportFieldIds) + "}", Category: CategoryId }, this.CheckDuplicateFieldValuesUrl)
    }    

    getCustomerSubscribedFeatures(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    }
}
