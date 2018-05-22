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
var ObjectsService = (function (_super) {
    __extends(ObjectsService, _super);
    function ObjectsService(http) {
        _super.call(this, http);
        this.http = http;
        this.fieldsList = 'Object/GetListAppFormFields';
        this.objectClassesList = 'Object/GetObjectClasses';
        this.attributesList = 'Object/GetAttributes';
        // private classattributelist = 'Object/GetAllClassAttributes';
        this.attributesAdd = 'Object/InsertAttribute';
        this.attributesDelete = 'Object/DeleteAttribute';
        this.attributesEdit = 'Object/FieldEditContent';
        this.ObjectDataEdit = 'Object/EditObjectsWithSpaceDetails';
        this.ObjectDelink = 'Object/UpdateObjectSpaceData';
        this.InsertObject = 'Object/InsertObject';
        this.UpdateObject = 'Object/UpdateObject';
        this.addDataUrlCommon = 'Common/GetAddAppFormFields';
        this.addDataUrl = 'Object/GetAddAppFormFields';
        this.editDataUrl = 'Object/GetEditAppFormFields';
        this.submitAddUrl = 'Object/InsertAppFormData';
        this.submitEditUrl = 'Object/UpdateAppFormData';
        this.CustomsubmitEditUrl = 'Object/CustomUpdateFieldBinderData';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
        this.getWhitelistUrl = 'Common/GetWhiteListDetails';
        this.getFieldFormatListUrl = 'Common/GetFieldFormatDetails';
        this.dbObjectLookUpUrl = 'Common/GetMultiDatabyDBObject';
        this.CheckAttributeIdIsInUseForAssets = 'Object/CheckAttributeIdIsInUseForAssets';
        this.GetObjectClassInUse = 'Object/GetObjectClassInUse';
        this.CheckDeficiencyIsinUseurl = 'Object/CheckDeficiencyIsinUse';
        this.CheckDeficiencyCategoryIsinUseurl = 'Object/CheckDeficiencyCategoryIsinUse';
        //private listAssetDisplaySettings = 'ObjectController/GetObjectClassesLookup';
        this.getDeficiencyCategoryListData = 'Object/GetDeficiencyCategoryList';
        this.ListDataForTreeViewUrl = 'Drawing/GetAllDrawingsForModuleDrawingManagement';
        this.ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetails';
        this.ListObjectDataUrl = 'Object/GetObjectsDetails';
        this.objectDataListForClassSelectionUrl = 'Object/GetObjectsSpaceDetailsForClassLookup';
        this.GetObjectClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.AdvanceSearchLookUpUrl = 'Object/GetAdvancedSerachLookups';
        this.getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
        this.checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        this.CheckAssetExistsinOtherModules = 'Object/CheckAssetExistsinOtherModules';
        this.GetTotalize = 'Object/GetObjectToolTipForSelected';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this.getObjectClassPrefixUrl = 'Object/GetObjectClassPrefix';
        this.CheckRelationshipRuleInUseUrl = 'Object/CheckRelationshipRuleInUse';
        this.GetAssociationforselectedConnectionTypeUrl = 'Object/GetAssociationforselectedConnectionType';
        this.GetTypeConnectivity = 'Object/GetAssociationTypeForConnectivity';
        this.GetAssociationConnectivity = 'Object/GetAssociationTypeConnectivity';
        this.GetblinkConnectivity = 'Object/GetObjectAssociationToHatch';
        this.GetConnectAnotherDrawimg = 'Object/GetObjectAssociationToAnotherDrawing';
        this.GetSelectConnectivity = 'Object/InsertDeleteObjectAssociation';
        this.GetRemoveConnectivity = 'Object/GetObjectAssociationToModify';
        this.GetObjectAssociationDetails = 'Object/GetObjectAssociationDetails';
        this.GetUserAccessibleDrawingForObjectConnectivity = 'Object/GetUserAccessibleDrawingForObjectConnectivity';
        this.GetUserAccessibleDrawingForObjectCategoryFloorConnection = 'Object/GetUserAccessibleDrawingForObjectCategoryFloorConnection';
        this.assetClassListFormId = 158;
        this.assetDrawinglistFormId = 164;
        this.removeConnectivitylistFormId = 542;
        this.assetClassAddEditFormId = 162;
        this.objectDataListFormId = 207;
        this.objectDataAddEditFormId = 222;
        this.objectClassSelectionFormId = 210;
        this.assetClassDisplaySettingsFormId = 218;
        this.attributelistFormId = 203;
        this.attributeAddEditFormId = 205;
        this.attributeValuelistFormId = 220;
        this.classattributelistFormId = 236;
        this.classattributeAddEditFormId = 246;
        this.keywordSearchFormid = 269;
        this.AdvanceSearchFormid = 273;
        this.objectSpaceForSearchFormId = 608;
        this.customerFeatures = 'Common/GetSubscribedFeatures';
        this.checkObjectBarcodeExists = 'Object/GetObjectBarcodeExists';
        this.updateMultipleObjectDataUrl = 'Object/UpdateMultipleObjectData';
        //Dashbaord
        this.getOrganizationalStructureforLookups = 'Report/GetOrganizationalStructureforLookups';
        this.objectClassListForChartDashboard = 'Object/GetObjectClassListForChartDashboard';
        this.objectDistByOrgUnitForDashboard = 'Object/GetObjectDistByOrgUnitForDashboard';
        this.WarrantyListFormId = 347;
        this.warrantyAlertFormId = 355;
        this.iDrawingsUsersforAlertFormId = 357;
        this.contactsforAlertFormId = 356;
        this.connectivityRelationshipsFormId = 506;
        this.relationshipAddEditFormId = 507;
        this.connectivityRulesFormId = 512;
        this.connectivityRulesAddEditFormId = 515;
        this.objectClassList = 381;
        this.getDashboardObjectClassList = 'Object/GetObjectClassListForDashboard';
        this.objectClassListByFloor = 382;
        this.ConnectComponentFormId = 526;
        this.ShowConnectComponentFormId = 555;
        this.RemoveComponentFormId = 542;
        this.ObjectSymbolformId = 569;
        this.getDashboardObjectClassListByFloor = 'Object/GetObjectClassListByFloorForDashboard';
    }
    ObjectsService.prototype.getFieldsList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]}" }, this.fieldsList);
    };
    ObjectsService.prototype.getObjectClassesList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: '', DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.objectClassesList);
    };
    ObjectsService.prototype.loadObjectClassAddEdit = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,IsNoCommonAttributeNeeded:" + 1 + " ,BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":838,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + " },{ \"FieldId\":842,\"ReportFieldId\": 672, \"Value\":" + objectCategoryId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.postSubmitObjectClass = function (pageDetails, selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.assetClassAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    ObjectsService.prototype.postDeleteObjectClass = function (selectedId, objectCategoryId, moduleId) {
        var ModuleValue = "";
        if (moduleId > 0) {
            ModuleValue = ",{\"ReportFieldId\":271, \"Value\":" + moduleId + "}";
        }
        return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "}" + ModuleValue + "], Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.InlineInsertUpdateObjectClass = function (pageDetails, selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.assetClassListFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    ObjectsService.prototype.CheckIsEntityReferenceFound = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:103,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    ObjectsService.prototype.getAssetsDrawingsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.assetDrawinglistFormId + " }" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getObjectDrawingListData = function (formId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":3063,\"Value\":\"" + objectCategoryId + "\"}]}" }, this.listDataListUrl);
    };
    ObjectsService.prototype.getObjectDrawingListDataSort = function (FormId, objectCategoryId, index, column, direction, filter, value, IsKeyword, IsAdvance) {
        //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063,\"Value\":\"" + objectCategoryId + "\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    };
    ObjectsService.prototype.getAttributesFieldList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getAttributesList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.attributelistFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.attributesList);
    };
    ObjectsService.prototype.loadAttributesAddEdit = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " }" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",Id:" + selectedId + ",ParentFormId:" + this.attributelistFormId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.attributesEdit);
        }
    };
    ObjectsService.prototype.postSubmitAttributes = function (contextObj, pageDetails, selectedId, target, objectCategoryId, Maxlength) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}", Id: 0, ObjectCategoryId: objectCategoryId.toString(), Name: contextObj.AttributesAddEdit[1].FieldValue, DataEntryTypeId: contextObj.AttributesAddEdit[2].FieldValue, IsValidated: contextObj.AttributesAddEdit[5].FieldValue, IsMandatory: contextObj.AttributesAddEdit[4].FieldValue, IsTotalizable: contextObj.AttributesAddEdit[6].FieldValue, MaxLength: Maxlength, AddedBy: "3", ObjectClassId: "0", Selection: "1", NeedAlert: "false", AlertAdvancePeriod: "0", RepeatInterval: "0", AlertMessage: '', NeedCommonAttribute: "true" }, this.attributesAdd);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.attributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "true" }, this.CustomsubmitEditUrl);
        }
    };
    ObjectsService.prototype.postDeleteAttributes = function (selectedId, objectCategoryId, moduleId) {
        var ReportFieldValue = "";
        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + ReportFieldValue + ", Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: "0", NeedCommonAttribute: "false" }, this.attributesDelete);
    };
    //deficiency 
    ObjectsService.prototype.getDeficiencyFieldList = function () {
        return this.postaction({ Input: "{FormId:446}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getDeficiencyList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:446 , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
    };
    ObjectsService.prototype.getDeficiencyFieldAddEdit = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:449,ListLookupReportFieldIdValues:[{ \"FieldId\":2400,\"ReportFieldId\": 4493, \"Value\":" + objectCategoryId + "}]}" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:449,Id:" + selectedId + ",BaseEntityId: 1, ListLookupReportFieldIdValues:[{ \"FieldId\":2400,\"ReportFieldId\": 4493, \"Value\":" + objectCategoryId + "}]}" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.getDeficiencyFieldAddEditFieldChange = function (selectedId) {
        return this.postaction({ Input: "{ FormId:446,ListLookupReportFieldIdValues:[{ \"FieldId\":2366,\"ReportFieldId\": 12362, \"Value\":" + selectedId + " }]}" }, this.addDataUrlCommon);
    };
    ObjectsService.prototype.postSubmitDeficiency = function (pageDetails, target, selectedId) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId: 449,ListReportFieldIdValues:" + pageDetails + "}", }, this.submitAddUrl);
        else
            return this.postaction({ Input: "{ FormId: 449,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + "}", }, this.submitEditUrl);
    };
    ObjectsService.prototype.IsDeficiencyInuse = function (Id) {
        return this.postaction({ Input: "{FormId:446,Id:" + Id + "}" }, this.CheckDeficiencyIsinUseurl);
    };
    ObjectsService.prototype.postDeleteDeficiency = function (selectedId, objectCategoryId, moduleId) {
        var ReportFieldValue = "";
        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:446 " + ReportFieldValue + " , Id:" + selectedId + "}" }, this.deleteUrl);
    };
    //deficiency category
    ObjectsService.prototype.getDeficiencyCategoryFieldList = function (objCategoryId) {
        return this.postaction({ Input: "{FormId:440, BaseEntityId:" + objCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getDeficiencyCategoryFieldAddEdit = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:443, BaseEntityId:" + objectCategoryId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2365,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + "}]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:443,Id:" + selectedId + ",BaseEntityId: " + objectCategoryId + ", ListLookupReportFieldIdValues:[{ \"FieldId\":2365,\"ReportFieldId\": 4491, \"Value\":" + objectCategoryId + "}]}" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.getDeficiencyCategoryFieldAddEditFieldChange = function (selectedId) {
        return this.postaction({ Input: "{ FormId:443,ListLookupReportFieldIdValues:[{ \"FieldId\":2366,\"ReportFieldId\": 12362, \"Value\":" + selectedId + " }]}" }, this.addDataUrlCommon);
    };
    ObjectsService.prototype.getDeficiencyClassLookups = function (objectCategoryId, dataOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:0}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: "", DataOption: dataOption.toString(), ClassListOption: "1", ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
    };
    ObjectsService.prototype.getDeficiencyCategoryList = function (index, column, direction, objectCategoryId) {
        if (objectCategoryId == 0) {
            return this.postaction({ Input: "{ FormId:440 , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:440 , BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4493, \"Value\":" + objectCategoryId + "}] }" }, this.getDeficiencyCategoryListData);
        }
    };
    ObjectsService.prototype.postSubmitDeficiencyCategories = function (pageDetails, target, selectedId, objCategoryId) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId: 443,ListReportFieldIdValues:" + pageDetails + ",BaseEntityId:" + objCategoryId + "}", }, this.submitAddUrl);
        else
            return this.postaction({ Input: "{ FormId: 443,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectedId + ",BaseEntityId:" + objCategoryId + "}", }, this.submitEditUrl);
    };
    ObjectsService.prototype.IsDeficiencyCategoriesInuse = function (Id) {
        return this.postaction({ Input: "{FormId:440,Id:" + Id + "}" }, this.CheckDeficiencyCategoryIsinUseurl);
    };
    ObjectsService.prototype.postDeleteDeficiencyCategories = function (selectedId, objectCategoryId, moduleId) {
        var ReportFieldValue = "";
        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:440 " + ReportFieldValue + " , Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.getObjectDataFieldsList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getObjectDataFieldsListforclass = function (objectCategoryId, ClassId) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + ClassId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getObjectData = function (objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: 'false' }, this.ListObjectDataUrl);
    };
    ObjectsService.prototype.getObjectSpaceData = function (PageTarget, IsKeywordSearch, IsAdvancedSearch, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, pageIndex, sortCol, sortDir, filter, isExport, isBuildingDrawing) {
        if (isBuildingDrawing == undefined || isBuildingDrawing == null || isBuildingDrawing.toString() == "0")
            isBuildingDrawing = false;
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing }, this.ListObjectSpaceDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing }, this.ListObjectSpaceDataUrl);
        }
        else if (isExport == true)
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing }, this.ListObjectSpaceDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), isBuildingDrawing: isBuildingDrawing }, this.ListObjectSpaceDataUrl);
    };
    ObjectsService.prototype.getObjectDataListForClassSelection = function (PageTarget, IsKeywordSearch, IsAdvancedSearch, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, pageIndex, sortCol, sortDir, filter, isExport, isBuildingDrawing) {
        if (isBuildingDrawing == undefined || isBuildingDrawing == null)
            isBuildingDrawing = false;
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isBuildingDrawing.toString() }, this.objectDataListForClassSelectionUrl);
    };
    ObjectsService.prototype.getObjectSpaceDataExport = function (PageTarget, IsKeywordSearch, IsAdvancedSearch, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, fieldObjects, fileName, pageIndex, sortCol, sortDir, filter, isExport) {
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
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return { Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
            else
                return { Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
        }
        else if (isExport == true)
            return { Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
        else
            return { Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), fileName: fileName, fields: filterArray };
    };
    ObjectsService.prototype.getObjectClassSelectionFieldsList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getObjectClassSelectionLookups = function (objectCategoryId, drawingIds, dataOption, classListOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
    };
    ObjectsService.prototype.getObjectClassDisplaySettings = function (objectCategoryId, drawingIds, dataOption, classListOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetObjectClassSelectionLookupUrl);
        // return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.listAssetDisplaySettings);
    };
    ObjectsService.prototype.deleteObject = function (selectedId, objectCategoryId, ModuleId) {
        var ModuleValue = "";
        if (ModuleId) {
            ModuleValue = ",{\"ReportFieldId\":271, \"Value\":" + ModuleId + "}";
        }
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "},{\"ReportFieldId\":656, \"Value\":" + selectedId + "}" + ModuleValue + "], Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.getObjectDataAddEditFieldsList = function (objectCategoryId, selectedId, target) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.addDataUrl);
        }
        //else { //6029
        //    return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + ",ParentFormId:" + this.objectDataListFormId + ",Id:" + selectedId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType }, this.ObjectDataEdit);
        //}
    };
    ObjectsService.prototype.getObjectDataAddEditFieldsListforclass = function (objectCategoryId, Classid, target) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + Classid + "}" }, this.addDataUrl);
        }
    };
    ObjectsService.prototype.getObjectDataEditFieldsList = function (objectCategoryId, selectedId, target, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, isbuildingDrawing) {
        return this.postaction({
            Input: "{ FormId:" + this.objectDataAddEditFormId + ",ParentFormId:" + this.objectDataListFormId + ",Id:" + selectedId + " ,BaseEntityId:" + objectCategoryId + " ,ObjectClassId:" + parseInt(objectClassIds) + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isbuildingDrawing.toString()
        }, this.ObjectDataEdit);
    };
    ObjectsService.prototype.submitAddUpdateObjects = function (strRptFields, selectedId, target, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, isbuildingDrawing) {
        if (target == "add") {
            return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.objectDataListFormId + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isbuildingDrawing.toString() }, this.InsertObject);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.objectDataListFormId + "}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: isbuildingDrawing.toString() }, this.UpdateObject);
        }
    };
    ObjectsService.prototype.getdropdownFields = function () {
        return this.postaction({ Input: "{FormId:" + this.assetClassDisplaySettingsFormId + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getAttributeValuesFieldList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getAttributeValuesList = function (objectCategoryId, selectedId, index, column, direction, filter) {
        return this.postaction({ Input: "{ FormId:" + this.attributeValuelistFormId + ",Id:" + 0 + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "', ListReportFieldIdValues: [{ \"ReportFieldId\": 64, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    };
    ObjectsService.prototype.postAddAttributeValues = function (pageDetails, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    ObjectsService.prototype.postEditAttributeValues = function (pageDetails, selectId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    ObjectsService.prototype.postDeleteAttributeValues = function (id, objectCategoryId, moduleId) {
        var ReportFieldValue = "";
        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:" + this.attributeValuelistFormId + ReportFieldValue + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.getWhitelistDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl);
    };
    ObjectsService.prototype.getFieldFormatDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl);
    };
    ObjectsService.prototype.getClassAttributesFieldList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.classattributelistFormId + ",BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getClassAttributesList = function (objectCategoryId, index, column, direction, SelectedClassId, filter) {
        //return this.postaction({ Input: "{ FormId:" + this.classattributelistFormId + ",Id:" + 0 + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}", ObjectClassId: 0, SelectedClassId: SelectedClassId }, this.classattributelist);
        return this.postaction({ Input: "{ FormId:" + this.classattributelistFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: SelectedClassId.toString(), NeedCommonAttribute: "false" }, this.attributesList);
    };
    ObjectsService.prototype.loadClassAttributesAddEdit = function (selectedId, target, objectCategoryId, ClassId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " }" }, this.addDataUrlCommon);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",Id:" + selectedId + ",ParentFormId:" + this.attributelistFormId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.attributesEdit);
        }
    };
    ObjectsService.prototype.postSubmitClassAttributes = function (contextObj, pageDetails, selectedId, target, objectCategoryId, ClassId, Maxlength) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}", Id: "0", ObjectCategoryId: objectCategoryId.toString(), Name: contextObj.ClassAttributesAddEdit[1].FieldValue, DataEntryTypeId: contextObj.ClassAttributesAddEdit[2].FieldValue, IsValidated: contextObj.ClassAttributesAddEdit[5].FieldValue, IsMandatory: contextObj.ClassAttributesAddEdit[4].FieldValue, IsTotalizable: contextObj.ClassAttributesAddEdit[6].FieldValue, MaxLength: Maxlength, AddedBy: "3", ObjectClassId: ClassId.toString(), Selection: "1", NeedAlert: "false", AlertAdvancePeriod: "0", RepeatInterval: "0", AlertMessage: '', NeedCommonAttribute: "false" }, this.attributesAdd);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.classattributeAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.CustomsubmitEditUrl);
        }
    };
    ObjectsService.prototype.postDeleteClassAttributes = function (selectedId, objectCategoryId, ClassId, moduleId) {
        var ReportFieldValue = "";
        if (moduleId > 0) {
            ReportFieldValue = ", ListReportFieldIdValues:[{\"ReportFieldId\":271, \"Value\":" + moduleId + "}]";
        }
        return this.postaction({ Input: "{FormId:" + this.classattributelistFormId + ReportFieldValue + ", Id:" + selectedId + "}", ObjectCategoryId: objectCategoryId.toString(), ObjectClassId: ClassId.toString(), NeedCommonAttribute: "false" }, this.attributesDelete);
    };
    ObjectsService.prototype.DelinkObjectSpaceData = function (pageDetails, selectedId, target, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, isbuildingDrawing) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectedId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, IsbuildingDrawing: isbuildingDrawing.toString() }, this.ObjectDelink);
    };
    ObjectsService.prototype.RotateObjectSave = function (pageDetails, selectedId, target, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, isbuildingDrawing) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:" + pageDetails + ", Id:" + selectedId + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: selectedId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, IsbuildingDrawing: isbuildingDrawing.toString() }, this.ObjectDelink);
    };
    ObjectsService.prototype.getObjectDataKeywordField = function (objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.keywordSearchFormid + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + " }]}" }, this.keywordLookUpUrl);
    };
    ObjectsService.prototype.getAdvnceSearchLookup = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.AdvanceSearchFormid + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + " }]}" }, this.AdvanceSearchLookUpUrl);
    };
    ObjectsService.prototype.getObjectSpaceDataforadvanceserach = function (PageTarget, IsKeywordSearch, IsAdvancedSearch, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + "}", ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType }, this.ListObjectSpaceDataUrl);
    };
    ObjectsService.prototype.getAssignedFloorlist = function (dbObjectId, ObjectcategoryId) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":" + ObjectcategoryId + " }]}" }, this.dbObjectLookUpUrl);
    };
    ObjectsService.prototype.IsAttributeInuse = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.attributelistFormId + ",Id:" + Id + "}" }, this.CheckAttributeIdIsInUseForAssets);
    };
    ObjectsService.prototype.IsObjectClassInUse = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.assetClassAddEditFormId + ",Id:" + Id + "}" }, this.GetObjectClassInUse);
    };
    ObjectsService.prototype.getUserEditableOrgUnits = function (drawingId) {
        return this.postaction({ Input: "{ FormId: 0, ListReportFieldIdValues: [{ \"ReportFieldId\":781, \"Value\":" + drawingId + " }]}" }, this.getUserEditableOrgUnitsUrl);
    };
    ObjectsService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkEditPrivilageExistUrl);
    };
    ObjectsService.prototype.IsObjectInuse = function (selectedId, ObjectcategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectDataListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":658, \"Value\":" + ObjectcategoryId + "},{\"ReportFieldId\":656, \"Value\":" + selectedId + "}]}" }, this.CheckAssetExistsinOtherModules);
    };
    ObjectsService.prototype.getTotalize = function (spaceIds) {
        return this.postaction({ Input: "{ FormId: 0, ListReportFieldIdValues:" + spaceIds + "}" }, this.GetTotalize);
    };
    ObjectsService.prototype.getCustomerSubscribedFeaturesBarcode = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    ObjectsService.prototype.checkBarcodeExists = function (barcode) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4303 , \"Value\":\"" + barcode + "\" }]}" }, this.checkObjectBarcodeExists);
    };
    //Warranty Begin
    ObjectsService.prototype.getWarrantyField = function () {
        return this.postaction({ Input: "{ FormId: " + this.WarrantyListFormId + " }" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getWarrantyData = function (selectedId, index, column, direction, filter) {
        return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + ",Id:0, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "', ListReportFieldIdValues: [{ \"ReportFieldId\": 12220, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    };
    ObjectsService.prototype.loadWarrantyAddEdit = function (selectedId, target, objectId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.WarrantyListFormId + ",ParentFormId:" + this.WarrantyListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12220, \"Value\":" + objectId + "}]}" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.AddUpdateWarranty = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.WarrantyListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.WarrantyListFormId + "}" }, this.submitEditUrl);
        }
    };
    ObjectsService.prototype.deleteWarranty = function (selectedId, objectId) {
        return this.postaction({ Input: "{FormId:" + this.WarrantyListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12220, \"Value\":" + objectId + "}]}" }, this.deleteUrl);
    };
    //Warranty End
    //Warranty Alert Begin
    ObjectsService.prototype.getEmailRecipientField = function (pageDetails) {
        return this.postaction({ Input: "{ FormId: " + this.warrantyAlertFormId + ",ListLookupReportFieldIdValues:" + pageDetails + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getIdrawingsUsersFields = function () {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersforAlertFormId + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getIdrawingsUserstData = function (objectId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersforAlertFormId + ",Id:" + objectId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    ObjectsService.prototype.getContactsListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.contactsforAlertFormId + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getContactsListtData = function (objectId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.contactsforAlertFormId + ",Id:" + objectId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    ObjectsService.prototype.updateWarrantyAlert = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.warrantyAlertFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:0}" }, this.submitEditUrl);
    };
    //Warranty Alert End
    ObjectsService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    };
    ObjectsService.prototype.getObjectClassPrefix = function (objectid, classid) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":656 , \"Value\":\"" + objectid + "\" },{\"ReportFieldId\":657 , \"Value\":\"" + classid + "\" }]}" }, this.getObjectClassPrefixUrl);
    };
    ObjectsService.prototype.updateMultipleobjectData = function (strReportFieldIdValues, reportField, newValue) {
        return this.postaction({ Input: "{FormId:" + this.objectDataAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleObjectDataUrl);
    };
    ObjectsService.prototype.GetObjectClassListForChartDashboard = function (objectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.objectClassListForChartDashboard);
    };
    ObjectsService.prototype.GetObjectDistByOrgUnitForDashboard = function (objectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.objectDistByOrgUnitForDashboard);
    };
    ObjectsService.prototype.GetOrganizationalStructure = function () {
        return this.postaction({ Input: "{}" }, this.getOrganizationalStructureforLookups);
    };
    ObjectsService.prototype.GetObjectClassListFields = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassList + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }]}" }, this.fieldsList);
    };
    ObjectsService.prototype.GetObjectClassList = function (objectCategoryId, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.objectClassList + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" }],SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl); //this.getDashboardObjectClassList);
    };
    ObjectsService.prototype.GetObjectClassListByFloorFields = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassListByFloor + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" },{\"ReportFieldId\":571, \"Value\":\"0\" }]}" }, this.fieldsList); //this.getDashboardObjectClassListByFloor);
    };
    ObjectsService.prototype.GetObjectClassListByFloor = function (objectCategoryId, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.objectClassListByFloor + ",ListReportFieldIdValues:[{\"ReportFieldId\":3063, \"Value\":\"" + objectCategoryId + "\" },{\"ReportFieldId\":571, \"Value\":\"0\" }],SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl); //this.getDashboardObjectClassListByFloor);
    };
    ObjectsService.prototype.getConnectivityList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRelationshipsFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getConnectivityRelationshipsList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.connectivityRelationshipsFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4456, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
    };
    ObjectsService.prototype.loadRelationshipFieldsAddEdit = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.relationshipAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.relationshipAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRelationshipsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4456, \"Value\":" + objectCategoryId + "}] }" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.AddRelationships = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.relationshipAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.connectivityRelationshipsFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.relationshipAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRelationshipsFormId + "}" }, this.submitEditUrl);
        }
    };
    ObjectsService.prototype.DeleteRelationship = function (selectedId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRelationshipsFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.getConnectivityRulesListFields = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    ObjectsService.prototype.getConnectivityRulesList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.connectivityRulesFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + "}] }" }, this.listDataListUrl);
    };
    ObjectsService.prototype.loadConectivityRulesFieldsAddEditForRelationship = function (selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.connectivityRulesAddEditFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":2606,\"ReportFieldId\": 4456, \"Value\":" + objectCategoryId + "}]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.connectivityRulesAddEditFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":2606,\"ReportFieldId\": 4456, \"Value\":" + objectCategoryId + "}]" + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRulesFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":649, \"Value\":" + objectCategoryId + "}]  }" }, this.editDataUrl);
        }
    };
    ObjectsService.prototype.getLookupsForFirstSecondComponentType = function (objectCategoryId, dataOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:0}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: "", DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.GetObjectClassSelectionLookupUrl);
    };
    ObjectsService.prototype.AddConnectivityRules = function (strRptFields, selectedId, target) {
        debugger;
        if (target == 1) {
            debugger;
            return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.connectivityRulesFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.connectivityRulesFormId + "}" }, this.submitEditUrl);
        }
    };
    ObjectsService.prototype.DeleteConnectivityRule = function (selectedId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.CheckRelationshipRuleInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRulesFormId + ",Id:" + selectedId + "}" }, this.CheckRelationshipRuleInUseUrl);
    };
    ObjectsService.prototype.GetAssociationforselectedConnection = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.connectivityRulesAddEditFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetAssociationforselectedConnectionTypeUrl);
    };
    ObjectsService.prototype.GetAssociationTypeForConnectivity = function (ObjectId) {
        return this.postaction({ Input: "{FormId:" + this.ConnectComponentFormId + ",Id:" + ObjectId + "}" }, this.GetTypeConnectivity);
    };
    ObjectsService.prototype.getComponentConectivity = function (classId) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2663,\"ReportFieldId\": 4481, \"Value\":" + classId + " }]}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.GetAssociationTypeConnectivity = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetAssociationConnectivity);
    };
    ObjectsService.prototype.GetObjectAssociationToHatch = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetblinkConnectivity);
    };
    ObjectsService.prototype.GetAccessibleDrawingForObjectConnectivity = function (formId, objectCategoryId) {
        return this.postaction({ Input: "{ FormId: " + formId + ",ListReportFieldIdValues:[{\"ReportFieldId\":526,\"Value\":\"" + objectCategoryId + "\"}]}" }, this.GetUserAccessibleDrawingForObjectConnectivity);
    };
    //getObjectDrawingListData(formId, objectCategoryId) {
    //    return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":526,\"Value\":\"" + objectCategoryId + "\"}]}" }, this.listDataListUrl);
    //}
    //GetAccessibleDrawingForObjectConnectivity(strRptFields: string) {
    //    return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetUserAccessibleDrawingForObjectConnectivity);
    //}
    ObjectsService.prototype.GetConnectToAnotherDrawing = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetConnectAnotherDrawimg);
    };
    ObjectsService.prototype.SelectConnectivity = function (IsInsert, PrimaryObjectId, SecondaryObjectId, AssociationId, CircuitNo1, CircuitNo2, CircuitNo3, IsPrimaryObjectPanel, IsInverse) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + "}", IsInsert: IsInsert, PrimaryObjectId: PrimaryObjectId, SecondaryObjectId: SecondaryObjectId, AssociationId: AssociationId, CircuitNo1: 0, CircuitNo2: 0, CircuitNo3: 0, IsPrimaryObjectPanel: 0, IsInverse: 0 }, this.GetSelectConnectivity);
    };
    ObjectsService.prototype.RemoveConnectivity = function (objectCategoryId, DrawingId, isBuildingDrawing, secondaryClassId, AssociationId, IsInverse, ObjectId) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + "}", ObjectCategoryId: objectCategoryId, DrawingId: DrawingId, isBuildingDrawing: isBuildingDrawing, secondaryClassId: secondaryClassId, AssociationId: AssociationId, IsInverse: 0, ObjectId: ObjectId }, this.GetRemoveConnectivity);
    };
    ObjectsService.prototype.getRemoveConnectivity = function () {
        return this.postaction({ Input: "{ FormId: " + this.removeConnectivitylistFormId + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.RemoveConnectivityFromGrid = function (IsInsert, PrimaryObjectId, SecondaryObjectId, AssociationId, CircuitNo1, CircuitNo2, CircuitNo3, IsPrimaryObjectPanel, IsInverse) {
        return this.postaction({ Input: "{ FormId: " + this.RemoveComponentFormId + "}", IsInsert: IsInsert, PrimaryObjectId: PrimaryObjectId, SecondaryObjectId: SecondaryObjectId, AssociationId: AssociationId, CircuitNo1: 0, CircuitNo2: 0, CircuitNo3: 0, IsPrimaryObjectPanel: 0, IsInverse: 0 }, this.GetSelectConnectivity);
    };
    ObjectsService.prototype.getShowConectivityField = function () {
        return this.postaction({ Input: "{ FormId: " + this.ShowConnectComponentFormId + " }" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getShowConectivityTreeView = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ShowConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetObjectAssociationDetails);
    };
    ObjectsService.prototype.addObjectSymbol = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ObjectSymbolformId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.submitAddUrl);
    };
    ObjectsService.prototype.getObjectSymbolDropdownData = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.ObjectSymbolformId + ",ListLookupReportFieldIdValues:" + strRptFields + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getObjectSymbolDetailsData = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ObjectSymbolformId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.listDataListUrl);
    };
    ObjectsService.prototype.deleteSymbolData = function (selectedId) {
        return this.postaction({ Input: "{FormId: " + this.ObjectSymbolformId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ObjectsService.prototype.getObjectSymbolData = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.ObjectSymbolformId + ",ListLookupReportFieldIdValues:" + strRptFields + "}" }, this.listFieldObjUrl);
    };
    ObjectsService.prototype.getSecondDrawingList = function (strRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.ConnectComponentFormId + ",ListReportFieldIdValues:" + strRptFields + " }" }, this.GetUserAccessibleDrawingForObjectCategoryFloorConnection);
    };
    ObjectsService.prototype.SpaceForSearchfields = function () {
        return this.postaction({ Input: "{ FormId: " + this.objectSpaceForSearchFormId + " }" }, this.listFieldObjUrl);
    };
    ObjectsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ObjectsService);
    return ObjectsService;
}(HttpHelpers_1.HttpHelpers));
exports.ObjectsService = ObjectsService;
//# sourceMappingURL=objects.service.js.map