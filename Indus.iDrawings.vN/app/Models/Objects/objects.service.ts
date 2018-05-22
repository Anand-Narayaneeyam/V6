import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ObjectsService extends HttpHelpers {

    private fieldsList = 'Object/GetListAppFormFields';
    private objectClassesList = 'Object/GetObjectClasses';
    private attributesList = 'Object/GetAttributes';
    // private classattributelist = 'Object/GetAllClassAttributes';
    private attributesAdd = 'Object/InsertAttribute';
    private attributesDelete = 'Object/DeleteAttribute';
    private attributesEdit = 'Object/FieldEditContent';
    private ObjectDataEdit = 'Object/EditObjectsWithSpaceDetails';
    private ObjectDelink = 'Object/UpdateObjectSpaceData';
    private InsertObject = 'Object/InsertObject';
    private UpdateObject = 'Object/UpdateObject';
    private addDataUrlCommon = 'Common/GetAddAppFormFields';
    private addDataUrl = 'Object/GetAddAppFormFields';
    private editDataUrl = 'Object/GetEditAppFormFields';
    private submitAddUrl = 'Object/InsertAppFormData';
    private submitEditUrl = 'Object/UpdateAppFormData';
    private CustomsubmitEditUrl = 'Object/CustomUpdateFieldBinderData';
    private deleteUrl = 'Common/DeleteAppFormData';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
    private getWhitelistUrl = 'Common/GetWhiteListDetails'
    private getFieldFormatListUrl = 'Common/GetFieldFormatDetails'
    private dbObjectLookUpUrl = 'Common/GetMultiDatabyDBObject';
    private CheckAttributeIdIsInUseForAssets = 'Object/CheckAttributeIdIsInUseForAssets';
    private GetObjectClassInUse = 'Object/GetObjectClassInUse';
    private CheckDeficiencyIsinUseurl = 'Object/CheckDeficiencyIsinUse';
    private CheckDeficiencyCategoryIsinUseurl = 'Object/CheckDeficiencyCategoryIsinUse';
    //private listAssetDisplaySettings = 'ObjectController/GetObjectClassesLookup';
    
    private getDeficiencyCategoryListData = 'Object/GetDeficiencyCategoryList';
    private ListDataForTreeViewUrl = 'Drawing/GetAllDrawingsForModuleDrawingManagement';

    private ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetails';
    private ListObjectDataUrl = 'Object/GetObjectsDetails'
    private objectDataListForClassSelectionUrl = 'Object/GetObjectsSpaceDetailsForClassLookup';
    private GetObjectClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private AdvanceSearchLookUpUrl = 'Object/GetAdvancedSerachLookups';
    private getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
    private checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    private CheckAssetExistsinOtherModules = 'Object/CheckAssetExistsinOtherModules';
    private GetTotalize = 'Object/GetObjectToolTipForSelected';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';
    private getObjectClassPrefixUrl = 'Object/GetObjectClassPrefix';
    private CheckRelationshipRuleInUseUrl = 'Object/CheckRelationshipRuleInUse';
    private GetAssociationforselectedConnectionTypeUrl = 'Object/GetAssociationforselectedConnectionType';
    private GetTypeConnectivity = 'Object/GetAssociationTypeForConnectivity';
    private GetAssociationConnectivity = 'Object/GetAssociationTypeConnectivity';
    private GetblinkConnectivity = 'Object/GetObjectAssociationToHatch';
    private GetConnectAnotherDrawimg = 'Object/GetObjectAssociationToAnotherDrawing';

    private GetSelectConnectivity = 'Object/InsertDeleteObjectAssociation';
    private GetRemoveConnectivity = 'Object/GetObjectAssociationToModify';
    private GetObjectAssociationDetails = 'Object/GetObjectAssociationDetails';
    private GetUserAccessibleDrawingForObjectConnectivity = 'Object/GetUserAccessibleDrawingForObjectConnectivity';
    private GetUserAccessibleDrawingForObjectCategoryFloorConnection = 'Object/GetUserAccessibleDrawingForObjectCategoryFloorConnection';

    
    


    
    private assetClassListFormId = 158;
    private assetDrawinglistFormId = 164;
    private removeConnectivitylistFormId = 542;
 
    private assetClassAddEditFormId = 162;

    private objectDataListFormId = 207;
    public objectDataAddEditFormId = 222;
    private objectClassSelectionFormId = 210;
    private assetClassDisplaySettingsFormId = 218;

    private attributelistFormId = 203;
    private attributeAddEditFormId = 205;
    private attributeValuelistFormId = 220;
    private classattributelistFormId = 236;
    private classattributeAddEditFormId = 246;
    private keywordSearchFormid = 269;
    private AdvanceSearchFormid = 273;
    private objectSpaceForSearchFormId = 608;
    private customerFeatures = 'Common/GetSubscribedFeatures';
    private checkObjectBarcodeExists = 'Object/GetObjectBarcodeExists';
    private updateMultipleObjectDataUrl = 'Object/UpdateMultipleObjectData';

    //Dashbaord
    private getOrganizationalStructureforLookups = 'Report/GetOrganizationalStructureforLookups';
    private objectClassListForChartDashboard = 'Object/GetObjectClassListForChartDashboard';
    private objectDistByOrgUnitForDashboard = 'Object/GetObjectDistByOrgUnitForDashboard';

    private WarrantyListFormId = 347;
    private warrantyAlertFormId = 355;
    private iDrawingsUsersforAlertFormId = 357;
    private contactsforAlertFormId = 356;
    private connectivityRelationshipsFormId = 506;
    private relationshipAddEditFormId = 507;    
    private connectivityRulesFormId = 512;
    private connectivityRulesAddEditFormId = 515;
    private objectClassList = 381;
    private getDashboardObjectClassList = 'Object/GetObjectClassListForDashboard';
    private objectClassListByFloor = 382;
    private ConnectComponentFormId = 526;
    private ShowConnectComponentFormId = 555;
    private RemoveComponentFormId = 542;
    private ObjectSymbolformId = 569;
    private getDashboardObjectClassListByFloor = 'Object/GetObjectClassListByFloorForDashboard';
    constructor(private http: Http) {
        super(http);
    }

    getFieldsList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]}" }, this.fieldsList);
    }

    getObjectClassesList(index: any, column: any, direction: any, objectCategoryId: any) {

        return this.postaction({ Input: "{ FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: '', DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.objectClassesList);
    }

    loadObjectClassAddEdit(selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    postSubmitObjectClass(pageDetails, selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.assetClassAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postDeleteObjectClass(selectedId: any, objectCategoryId: any, moduleId?: any) {
        var ModuleValue: string = "";

        if (moduleId > 0) {
            ModuleValue = ",{\"ReportFieldId\":271, \"Value\":" + moduleId + "}"
        }
        return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "}" + ModuleValue+"], Id:" + selectedId + "}" }, this.deleteUrl)
    }

    InlineInsertUpdateObjectClass(pageDetails: string, selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    CheckIsEntityReferenceFound(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:103,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }

    getAssetsDrawingsFields() {
        return this.postaction({ Input: "{ FormId: " + this.assetDrawinglistFormId + " }" }, this.listFieldObjUrl);
    }


    getObjectDrawingListData(formId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":3063,\"Value\":\"" + objectCategoryId + "\"}]}" }, this.listDataListUrl);
    }

    getObjectDrawingListDataSort(FormId, objectCategoryId: number, index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063,\"Value\":\"" + objectCategoryId + "\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    }

    getAttributesFieldList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + "}" }, this.listFieldObjUrl);
    }

    getAttributesList(index: any, column: any, direction: any, objectCategoryId: any) {
        return this.postaction({ Input: "{ FormId:" + this.attributelistFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.attributesList);
    }

    loadAttributesAddEdit(selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " }" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",Id:" + selectedId + ",ParentFormId:" + this.attributelistFormId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.attributesEdit);
        }
    }

    postSubmitAttributes(contextObj, pageDetails, selectedId: number, target: number, objectCategoryId: any, Maxlength: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}", Id: 0, ObjectCategoryId: objectCategoryId.toString(), Name: contextObj.AttributesAddEdit[1].FieldValue, DataEntryTypeId: contextObj.AttributesAddEdit[2].FieldValue, IsValidated: contextObj.AttributesAddEdit[5].FieldValue, IsMandatory: contextObj.AttributesAddEdit[4].FieldValue, IsTotalizable: contextObj.AttributesAddEdit[6].FieldValue, MaxLength: Maxlength, AddedBy: "3", ObjectClassId: "0", Selection: "1", NeedAlert: "false", AlertAdvancePeriod: "0", RepeatInterval: "0", AlertMessage: '', NeedCommonAttribute: "true" }, this.attributesAdd);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.CustomsubmitEditUrl);
        }
    }

    postDeleteAttributes(selectedId: any, objectCategoryId: any, moduleId?: any) {
        var ReportFieldValue: string = "";

        if (moduleId > 0)
        {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
         
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + ReportFieldValue + ", Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "false" }, this.attributesDelete);
    }

    //deficiency 

    getDeficiencyFieldList() {
        return this.postaction({ Input: "{FormId:446}" }, this.listFieldObjUrl);
    }


    getDeficiencyList(index: any, column: any, direction: any, objectCategoryId: any) {
        return this.postaction({ Input: "{ FormId:446 , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
    }

    getDeficiencyFieldAddEdit(selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:449,ListLookupReportFieldIdValues:[{ \"FieldId\":2400,\"ReportFieldId\": 4493, \"Value\":" + objectCategoryId + "}]}" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:449,Id:" + selectedId + ",BaseEntityId: 1, ListLookupReportFieldIdValues:[{ \"FieldId\":2400,\"ReportFieldId\": 4493, \"Value\":" + objectCategoryId + "}]}" }, this.editDataUrl);
        }
    }

    getDeficiencyFieldAddEditFieldChange(selectedId: number) {
        return this.postaction({ Input: "{ FormId:446,ListLookupReportFieldIdValues:[{ \"FieldId\":2366,\"ReportFieldId\": 12362, \"Value\":" + selectedId + " }]}" }, this.addDataUrlCommon);
    }

    postSubmitDeficiency(pageDetails, target, selectedId: any) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId: 449,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitAddUrl);
        else
            return this.postaction({ Input: "{ FormId: 449,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}", }, this.submitEditUrl);
    }

    IsDeficiencyInuse(Id) {
        return this.postaction({ Input: "{FormId:446,Id:" + Id + "}" }, this.CheckDeficiencyIsinUseurl);
    }

    postDeleteDeficiency(selectedId: any, objectCategoryId: any, moduleId?: any) {
        

        var ReportFieldValue: string = "";

        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }

        return this.postaction({ Input: "{FormId:446 " + ReportFieldValue + " , Id:" + selectedId + "}" }, this.deleteUrl);
    }

    //deficiency category

    getDeficiencyCategoryFieldList(objCategoryId?:any) {
        return this.postaction({ Input: "{FormId:440, BaseEntityId:"+objCategoryId+"}" }, this.fieldsList);
    }

    getDeficiencyCategoryFieldAddEdit(selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:443, BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2365,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + "}]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:443,Id:" + selectedId + ",BaseEntityId: " + objectCategoryId+", ListLookupReportFieldIdValues:[{ \"FieldId\":2365,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + "}]}" }, this.editDataUrl);
        }
    }

    getDeficiencyCategoryFieldAddEditFieldChange(selectedId: number) {
        return this.postaction({ Input: "{ FormId:443,ListLookupReportFieldIdValues:[{ \"FieldId\":2366,\"ReportFieldId\": 12362, \"Value\":" + selectedId + " }]}" }, this.addDataUrlCommon);
    }

    getDeficiencyClassLookups(objectCategoryId: any, dataOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:0}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: "", DataOption: dataOption.toString(), ClassListOption: "1", ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
    }

    getDeficiencyCategoryList(index: any, column: any, direction: any, objectCategoryId: any) {
        if (objectCategoryId == 0) {
            return this.postaction({ Input: "{ FormId:440 , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl); 
        }
        else {
            return this.postaction({ Input: "{ FormId:440 , BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.getDeficiencyCategoryListData);
        }
    }

    postSubmitDeficiencyCategories(pageDetails, target, selectedId: any,objCategoryId:any) {
        if (target == 1)
             return this.postaction({ Input: "{ FormId: 443,ListReportFieldIdValues:" + pageDetails + ",BaseEntityId:" + objCategoryId + "}", }, this.submitAddUrl);
         else
             return this.postaction({ Input: "{ FormId: 443,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + ",BaseEntityId:" + objCategoryId + "}", }, this.submitEditUrl);
    }

    IsDeficiencyCategoriesInuse(Id) {
        return this.postaction({ Input: "{FormId:440,Id:" + Id + "}" }, this.CheckDeficiencyCategoryIsinUseurl);
    }

    postDeleteDeficiencyCategories(selectedId: any, objectCategoryId: any, moduleId?: any) {

        var ReportFieldValue: string = "";

        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:440 " + ReportFieldValue +" , Id:" + selectedId + "}" }, this.deleteUrl);
    }




    getObjectDataFieldsList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }
    getObjectDataFieldsListforclass(objectCategoryId: any, ClassId: any) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + ClassId + "}" }, this.fieldsList);
    }

    getObjectData(objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing:'false'}, this.ListObjectDataUrl);
    }

    getObjectSpaceData(PageTarget: number, IsKeywordSearch: number, IsAdvancedSearch: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, isExport?: any, isBuildingDrawing?: any) {
     if (isBuildingDrawing == undefined || isBuildingDrawing == null || isBuildingDrawing.toString() == "0")
            isBuildingDrawing = false;
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing:isBuildingDrawing }, this.ListObjectSpaceDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing  }, this.ListObjectSpaceDataUrl);
        } else if (isExport == true)
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing   }, this.ListObjectSpaceDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing}, this.ListObjectSpaceDataUrl);
    }

    getObjectDataListForClassSelection(PageTarget: number, IsKeywordSearch: number, IsAdvancedSearch: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, isExport?: any, isBuildingDrawing?: boolean) {
        if (isBuildingDrawing == undefined || isBuildingDrawing == null)
            isBuildingDrawing = false;
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isBuildingDrawing.toString() }, this.objectDataListForClassSelectionUrl);
    }

    getObjectSpaceDataExport(PageTarget: number, IsKeywordSearch: number, IsAdvancedSearch: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, fieldObjects: any, fileName, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, isExport?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return { Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
            else
                return { Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
        } else if (isExport == true)
            return { Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
        else
            return { Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
    }
    getObjectClassSelectionFieldsList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getObjectClassSelectionLookups(objectCategoryId: any, drawingIds: string, dataOption: any, classListOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
    }

    getObjectClassDisplaySettings(objectCategoryId: any, drawingIds: string, dataOption: any, classListOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
        // return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.listAssetDisplaySettings);
    }

    deleteObject(selectedId: any, objectCategoryId: any, ModuleId?: any) {
        var ModuleValue: string = "";

        if (ModuleId)
        {
            ModuleValue = ",{\"ReportFieldId\":271, \"Value\":" + ModuleId + "}"
        }

        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "},{\"ReportFieldId\":656, \"Value\":" + selectedId + "}" + ModuleValue +"], Id:" + selectedId + "}" }, this.deleteUrl)
    }


    getObjectDataAddEditFieldsList(objectCategoryId: any, selectedId: number, target: string) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.addDataUrl);
        }
        //else { //6029
        //    return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + ",ParentFormId:" + this.objectDataListFormId + ",Id:" + selectedId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType }, this.ObjectDataEdit);
        //}
    }
    getObjectDataAddEditFieldsListforclass(objectCategoryId: any, Classid: number, target: string) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + Classid + "}" }, this.addDataUrl);
        }
    }

    getObjectDataEditFieldsList(objectCategoryId: any, selectedId: number, target: string, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any,isbuildingDrawing?:boolean) {
        return this.postaction({
            Input: "{ FormId:" + this.objectDataAddEditFormId + ",ParentFormId:" + this.objectDataListFormId + ",Id:" + selectedId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + parseInt(objectClassIds) + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isbuildingDrawing.toString()
        }, this.ObjectDataEdit);
    }

    submitAddUpdateObjects(strRptFields: string, selectedId: number, target: string, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, isbuildingDrawing?: boolean) {
        if (target == "add") {
            return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.objectDataListFormId + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing:isbuildingDrawing.toString() }, this.InsertObject);
        } else {
            return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.objectDataListFormId + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isbuildingDrawing.toString() }, this.UpdateObject);
        }

    }

    getdropdownFields() {
        return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + "}" }, this.listFieldObjUrl);
    }
    getAttributeValuesFieldList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getAttributeValuesList(objectCategoryId: any, selectedId: any, index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{ FormId:" + this.attributeValuelistFormId + ",Id:" + 0 + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "', ListReportFieldIdValues: [{ \"ReportFieldId\": 64, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    }
    postAddAttributeValues(pageDetails, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditAttributeValues(pageDetails, selectId, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteAttributeValues(id, objectCategoryId: any, moduleId?: any) {
        var ReportFieldValue: string = "";

        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + ReportFieldValue +" ,Id:" + id + "}" }, this.deleteUrl);
    }
    getWhitelistDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl)
    }
    getFieldFormatDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl)
    }
    getClassAttributesFieldList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.classattributelistFormId + ",BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getClassAttributesList(objectCategoryId: any, index: number, column: any, direction: any, SelectedClassId: any, filter?: any) {
        //return this.postaction({ Input: "{ FormId:" + this.classattributelistFormId + ",Id:" + 0 + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}", ObjectClassId: 0, SelectedClassId: SelectedClassId }, this.classattributelist);
        return this.postaction({ Input: "{ FormId:" + this.classattributelistFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: SelectedClassId.toString(), NeedCommonAttribute: "false" }, this.attributesList);

    }
    loadClassAttributesAddEdit(selectedId: number, target: number, objectCategoryId: any, ClassId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " }" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",Id:" + selectedId + ",ParentFormId:" + this.attributelistFormId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.attributesEdit);
        }
    }

    postSubmitClassAttributes(contextObj, pageDetails, selectedId: number, target: number, objectCategoryId: any, ClassId: any, Maxlength: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}", Id: "0", ObjectCategoryId: objectCategoryId.toString(), Name: contextObj.ClassAttributesAddEdit[1].FieldValue, DataEntryTypeId: contextObj.ClassAttributesAddEdit[2].FieldValue, IsValidated: contextObj.ClassAttributesAddEdit[5].FieldValue, IsMandatory: contextObj.ClassAttributesAddEdit[4].FieldValue, IsTotalizable: contextObj.ClassAttributesAddEdit[6].FieldValue, MaxLength: Maxlength, AddedBy: "3", ObjectClassId: ClassId.toString(), Selection: "1", NeedAlert: "false", AlertAdvancePeriod: "0", RepeatInterval: "0", AlertMessage: '', NeedCommonAttribute: "false" }, this.attributesAdd);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.CustomsubmitEditUrl);
        }
    }
    postDeleteClassAttributes(selectedId: any, objectCategoryId: any, ClassId: any, moduleId?: any) {
        var ReportFieldValue: string = "";

        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:" + this.classattributelistFormId+ ReportFieldValue + ", Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.attributesDelete);
    }
    DelinkObjectSpaceData(pageDetails, selectedId: number, target: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, isbuildingDrawing?: boolean) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectedId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, IsbuildingDrawing: isbuildingDrawing.toString() }, this.ObjectDelink);
    }
    RotateObjectSave(pageDetails, selectedId: number, target: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, isbuildingDrawing?: boolean) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectedId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, IsbuildingDrawing: isbuildingDrawing.toString() }, this.ObjectDelink);
    }
    getObjectDataKeywordField(objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.keywordSearchFormid + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + " }]}" }, this.keywordLookUpUrl);
    }
    getAdvnceSearchLookup(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.AdvanceSearchFormid + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + " }]}" }, this.AdvanceSearchLookUpUrl)
    }
    getObjectSpaceDataforadvanceserach(PageTarget: number, IsKeywordSearch: number, IsAdvancedSearch: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any) {
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType }, this.ListObjectSpaceDataUrl);
    }
    getAssignedFloorlist(dbObjectId: number, ObjectcategoryId: number) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":" + ObjectcategoryId + " }]}" }, this.dbObjectLookUpUrl);
    }
    IsAttributeInuse(Id) {
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + ",Id:" + Id + "}" }, this.CheckAttributeIdIsInUseForAssets);
    }

    IsObjectClassInUse(Id) {
        return this.postaction({ Input: "{FormId:" + this.assetClassAddEditFormId + ",Id:" + Id + "}" }, this.GetObjectClassInUse);
    }
    getUserEditableOrgUnits(drawingId: number) {
        return this.postaction({ Input: "{ FormId: 0, ListReportFieldIdValues: [{ \"ReportFieldId\":781, \"Value\":" + drawingId + " }]}" }, this.getUserEditableOrgUnitsUrl);
    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkEditPrivilageExistUrl);
    }
    IsObjectInuse(selectedId: any, ObjectcategoryId: number) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":658, \"Value\":" + ObjectcategoryId + "},{\"ReportFieldId\":656, \"Value\":" + selectedId + "}]}" }, this.CheckAssetExistsinOtherModules);
    }

    getTotalize(spaceIds) {
        return this.postaction({ Input: "{ FormId: 0, ListReportFieldIdValues:" + spaceIds + "}" }, this.GetTotalize);
    }

    getCustomerSubscribedFeaturesBarcode(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    }

    checkBarcodeExists(barcode) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4303 , \"Value\":\"" + barcode + "\" }]}" }, this.checkObjectBarcodeExists);
    }

    //Warranty Begin
    getWarrantyField() {
        return this.postaction({ Input: "{ FormId: " + this.WarrantyListFormId + " }" }, this.listFieldObjUrl);
    }
    getWarrantyData(selectedId: number, index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + ",Id:0, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "', ListReportFieldIdValues: [{ \"ReportFieldId\": 12220, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    }
    loadWarrantyAddEdit(selectedId: number, target: number, objectId?: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + ",ParentFormId:" + this.WarrantyListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12220, \"Value\":" + objectId + "}]}" }, this.editDataUrl);
        }
    }
    AddUpdateWarranty(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.WarrantyListFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.WarrantyListFormId + "}" }, this.submitEditUrl);
        }

    }
    deleteWarranty(selectedId: any, objectId: any) {
        return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12220, \"Value\":" + objectId + "}]}" }, this.deleteUrl)
    }
    //Warranty End
    //Warranty Alert Begin
    getEmailRecipientField(pageDetails: any) {

        return this.postaction({ Input: "{ FormId: " + this.warrantyAlertFormId + ",ListLookupReportFieldIdValues:" + pageDetails + "}" }, this.listFieldObjUrl);
    }
    getIdrawingsUsersFields() {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersforAlertFormId + "}" }, this.listFieldObjUrl);
    }

    getIdrawingsUserstData(objectId: any, pageIndex: number, sortCol: string, sortDir: string) {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersforAlertFormId + ",Id:" + objectId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    getContactsListFields() {
        return this.postaction({ Input: "{FormId:" + this.contactsforAlertFormId + "}" }, this.listFieldObjUrl);
    }

    getContactsListtData(objectId: any, pageIndex: number, sortCol: string, sortDir: string) {
        return this.postaction({ Input: "{FormId:" + this.contactsforAlertFormId + ",Id:" + objectId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    updateWarrantyAlert(strRptFields: any) {
        return this.postaction({ Input: "{FormId:" + this.warrantyAlertFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:0}" }, this.submitEditUrl);
    }
    //Warranty Alert End

    getIsModuleAdmin(moduleId: number) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    }

    getObjectClassPrefix(objectid, classid) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":656 , \"Value\":\"" + objectid + "\" },{\"ReportFieldId\":657 , \"Value\":\"" + classid + "\" }]}" }, this.getObjectClassPrefixUrl);

    }

    updateMultipleobjectData(strReportFieldIdValues: string, reportField: number, newValue: any) {
        return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleObjectDataUrl);
    }

    GetObjectClassListForChartDashboard(objectCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.objectClassListForChartDashboard);
    }

    GetObjectDistByOrgUnitForDashboard(objectCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.objectDistByOrgUnitForDashboard);
    }

    GetOrganizationalStructure() {
        return this.postaction({ Input: "{}" }, this.getOrganizationalStructureforLookups);
    }

    GetObjectClassListFields(objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassList + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.fieldsList);
    }

    GetObjectClassList(objectCategoryId, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.objectClassList + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }],SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);//this.getDashboardObjectClassList);
    }
    GetObjectClassListByFloorFields(objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassListByFloor + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" },{\"ReportFieldId\":571, \"Value\":\"0\" }]}" }, this.fieldsList);//this.getDashboardObjectClassListByFloor);
    }

    GetObjectClassListByFloor(objectCategoryId, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.objectClassListByFloor + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" },{\"ReportFieldId\":571, \"Value\":\"0\" }],SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);//this.getDashboardObjectClassListByFloor);
    }

    getConnectivityList(objectCategoryId) {

        return this.postaction({ Input: "{FormId:" + this.connectivityRelationshipsFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getConnectivityRelationshipsList(index: any, column: any, direction: any, objectCategoryId: any) {
        
        return this.postaction({ Input: "{ FormId:" + this.connectivityRelationshipsFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4456, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
        
    }
    
    loadRelationshipFieldsAddEdit(selectedId: number, target: number,objectCategoryId:any)
    {
        if (target == 1){
            return this.postaction({ Input: "{ FormId: " + this.relationshipAddEditFormId + "}" }, this.addDataUrl);
        }
        else{            
            return this.postaction({ Input: "{ FormId: " + this.relationshipAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRelationshipsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4456, \"Value\":" + objectCategoryId + "}] }" }, this.editDataUrl);
        }
    }

    AddRelationships(strRptFields: string, selectedId: number, target: number)
    {
        if (target == 1)//add
        {
            return this.postaction({ Input: "{FormId:" + this.relationshipAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.connectivityRelationshipsFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.relationshipAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRelationshipsFormId + "}" }, this.submitEditUrl);
        }
    }
    DeleteRelationship(selectedId: any, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRelationshipsFormId+", Id:" + selectedId + "}" }, this.deleteUrl);
    }


    getConnectivityRulesListFields(objectCategoryId) {

        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getConnectivityRulesList(index: any, column: any, direction: any, objectCategoryId: any) {

        return this.postaction({ Input: "{ FormId:" + this.connectivityRulesFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);

    }


    loadConectivityRulesFieldsAddEditForRelationship(selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) { //Add
            return this.postaction({ Input: "{ FormId: " + this.connectivityRulesAddEditFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":2606,\"ReportFieldId\": 4456, \"Value\":" + objectCategoryId + "}]}"  }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.connectivityRulesAddEditFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":2606,\"ReportFieldId\": 4456, \"Value\":" + objectCategoryId + "}]" + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRulesFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + "}]  }" }, this.editDataUrl);
        }
    }

    getLookupsForFirstSecondComponentType(objectCategoryId: any, dataOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:0}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: "", DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.GetObjectClassSelectionLookupUrl);
    }

    AddConnectivityRules(strRptFields: string, selectedId: number, target: number) {
        debugger
        if (target == 1)//add
        {
            debugger
            return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.connectivityRulesFormId + "}" }, this.submitAddUrl);
        } 
            else {
            return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRulesFormId + "}" }, this.submitEditUrl);
        }
    }

    DeleteConnectivityRule(selectedId: any, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    }


    CheckRelationshipRuleInUse(selectedId: any) {

        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + ",Id:" + selectedId + "}" }, this.CheckRelationshipRuleInUseUrl);

    }

    GetAssociationforselectedConnection(selectedId: number, strRptFields: string) {

        

        return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + strRptFields+" }" }, this.GetAssociationforselectedConnectionTypeUrl);

    }

    GetAssociationTypeForConnectivity(ObjectId:any) {
        return this.postaction({ Input: "{FormId:" + this.ConnectComponentFormId + ",Id:" + ObjectId+ "}" }, this.GetTypeConnectivity);
    } 

    getComponentConectivity(classId: string) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2663,\"ReportFieldId\": 4481, \"Value\":" + classId + " }]}" }, this.listFieldObjUrl);   
    }

    GetAssociationTypeConnectivity(strRptFields: string) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetAssociationConnectivity);
    }
    GetObjectAssociationToHatch(strRptFields: string) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetblinkConnectivity);
    }
    GetAccessibleDrawingForObjectConnectivity(formId, objectCategoryId) {
        return this.postaction({ Input: "{ FormId: " + formId + ",ListReportFieldIdValues:[{\"ReportFieldId\":526,\"Value\":\"" + objectCategoryId + "\"}]}"}, this.GetUserAccessibleDrawingForObjectConnectivity);
    }

    //getObjectDrawingListData(formId, objectCategoryId) {
    //    return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":526,\"Value\":\"" + objectCategoryId + "\"}]}" }, this.listDataListUrl);
    //}

    //GetAccessibleDrawingForObjectConnectivity(strRptFields: string) {
    //    return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetUserAccessibleDrawingForObjectConnectivity);
    //}

    
    GetConnectToAnotherDrawing(strRptFields: string) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetConnectAnotherDrawimg);
    }

    SelectConnectivity(IsInsert: number, PrimaryObjectId: any, SecondaryObjectId: any, AssociationId: any, CircuitNo1: any, CircuitNo2: any, CircuitNo3: any, IsPrimaryObjectPanel: any, IsInverse: any) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + "}" ,IsInsert:  IsInsert ,PrimaryObjectId: PrimaryObjectId , SecondaryObjectId: SecondaryObjectId , AssociationId: AssociationId,CircuitNo1: 0, CircuitNo2: 0,CircuitNo3: 0, IsPrimaryObjectPanel: 0,IsInverse: 0 }, this.GetSelectConnectivity);
    } 
    RemoveConnectivity(objectCategoryId: any, DrawingId: any, isBuildingDrawing: any, secondaryClassId: any, AssociationId: any, IsInverse: any, ObjectId: any) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + "}", ObjectCategoryId: objectCategoryId, DrawingId: DrawingId, isBuildingDrawing: isBuildingDrawing, secondaryClassId: secondaryClassId, AssociationId: AssociationId, IsInverse: 0, ObjectId: ObjectId }, this.GetRemoveConnectivity);
    } 
    getRemoveConnectivity() {
        return this.postaction({ Input: "{ FormId: " + this.removeConnectivitylistFormId + "}" }, this.listFieldObjUrl);
    }
    RemoveConnectivityFromGrid(IsInsert: number, PrimaryObjectId: any, SecondaryObjectId: any, AssociationId: any, CircuitNo1: any, CircuitNo2: any, CircuitNo3: any, IsPrimaryObjectPanel: any, IsInverse: any) {
        return this.postaction({ Input: "{ FormId: " + this.RemoveComponentFormId + "}", IsInsert: IsInsert, PrimaryObjectId: PrimaryObjectId, SecondaryObjectId: SecondaryObjectId, AssociationId: AssociationId, CircuitNo1: 0, CircuitNo2: 0, CircuitNo3: 0, IsPrimaryObjectPanel: 0, IsInverse: 0 }, this.GetSelectConnectivity);
    } 
    getShowConectivityField() {
        return this.postaction({ Input: "{ FormId: " + this.ShowConnectComponentFormId + " }" }, this.listFieldObjUrl);
    }

    getShowConectivityTreeView(strRptFields: string) {
        return this.postaction({ Input: "{ FormId: " + this.ShowConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetObjectAssociationDetails);
    }

    addObjectSymbol(strRptFields: string){
        return this.postaction({ Input: "{ FormId: " + this.ObjectSymbolformId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.submitAddUrl);
    }

    getObjectSymbolDropdownData(strRptFields: string){
        return this.postaction({ Input: "{FormId:" + this.ObjectSymbolformId + ",ListLookupReportFieldIdValues:" + strRptFields + "}" }, this.listFieldObjUrl);        
    }

    getObjectSymbolDetailsData(strRptFields: string){
        return this.postaction({ Input: "{ FormId: " + this.ObjectSymbolformId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.listDataListUrl);        
    }

    deleteSymbolData(selectedId: number){
        return this.postaction({ Input: "{FormId: " + this.ObjectSymbolformId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    }

    getObjectSymbolData(strRptFields: string){
        return this.postaction({ Input: "{FormId:" + this.ObjectSymbolformId + ",ListLookupReportFieldIdValues:" + strRptFields + "}" }, this.listFieldObjUrl);        
    }

    getSecondDrawingList(strRptFields: string) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetUserAccessibleDrawingForObjectCategoryFloorConnection);
    }
    SpaceForSearchfields() {
        return this.postaction({ Input: "{ FormId: " + this.objectSpaceForSearchFormId + " }" }, this.listFieldObjUrl);
    }
}