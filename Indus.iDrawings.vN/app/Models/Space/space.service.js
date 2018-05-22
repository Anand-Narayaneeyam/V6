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
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var SpaceService = (function (_super) {
    __extends(SpaceService, _super);
    function SpaceService(http) {
        _super.call(this, http);
        this.http = http;
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
        this.CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
        this.ListDataForTreeViewUrl = 'Drawing/GetAllDrawingsForModuleDrawingManagement';
        this.ListDataForTreeViewObjectUrl = ' Drawing/GetModuleDrawingsForDrawingManagement';
        this.submitDistributionSettingsUrl = 'SpaceDrawing/UpdateDistributionMapSettings';
        this.DistributionMapSettingListUrl = 'SpaceDrawing/GetDistributionMapSettings';
        this.ListAllocatedDrawingsUrl = 'Drawing/GetAllocatedDrawings';
        this.updateDrawingManagementUrl = 'Drawing/UpdateDrawingManagement';
        this.UserPrivilegesofPagejUrl = 'Common/GetUserPrivilegesofPage';
        this.insertUpdateSpaceData = "SpaceDrawing/InsertUpdateSpaceData";
        this.UpdateDrawingLockAsUnlockedURL = "SpaceDrawing/UpdateDrawingLockAsUnlocked";
        this.userDwgAccess = "User/GetDrawingAccessDetails";
        this.updateUserDwgAccess = "User/AllocateDrawingsForUser";
        this.UpdateLockStatusOfDrawing = 'Drawing/UpdateLockStatusOfDrawing';
        this.checkSpaceForDrawingUrl = 'spaceDrawing/CheckSpaceForDrawing';
        this._checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        this.getDistributionMapSettingsBasedOnDrawingsUrl = 'SpaceDrawing/GetDistributionMapSettingsBasedOnDrawings';
        this.InsertUserSessionDistributionMapSettings = 'Drawing/InsertUserSessionDistributionMapSettings';
        this.UpdateArchivedSpaceDriverDefaultColorsUrl = 'Space/UpdateArchivedSpaceDriverDefaultColors';
        this.isStrlOrgnUrl = 'Common/CheckOrgUnitStructureExists';
        this.GetReservationsForSpaceIdsURL = 'Space/GetReservationsForSpaceIds';
        //spacedata
        //spacedata
        this.floorSelectionFrmId = 118;
        this.spaceDataListFrmId = 103;
        this.spaceAddEditFrmId = 104;
        this.assignDeassignSpaceStdFrmId = 132;
        this.spaceDisplaySettingsFrmId = 150;
        this.getSpaceDataUrl = 'Space/GetAllSpaceDetails';
        this.assignSpaceStdUrl = "Space/AssignSpaceStandard";
        this.assignMultipleSpaceStdUrl = 'Space/AssignMultipleSpaceStd';
        this.deassignSpaceStdUrl = "Space/DeAssignSpaceStandard";
        this.deassignMultipleSpaceStdUrl = 'Space/DeassignMultipleSpaceStd';
        this.spaceTotalizeUrl = "Space/GetTotalizeData";
        this.spaceStdDescriptn = "Space/GetSpaceStandardDetails";
        this.updateSpaceData = "Space/UpdateSpaceDetails";
        this.searchSpaceData = "Space/GetSearchForSpace";
        this.getSpaceDataForDrawing = 'Space/GetAllSpaceDetails';
        this.AssignHotellingSeatToSpaceURL = 'Space/AssignHotellingSeatToSpace';
        this.AssignHotellingSeatToMultipleSpaceUrl = 'Space/AssignHotellingSeatToMultipleSpace';
        this.AssignSpecialRoomSeatToSpaceURL = 'Space/AssignSpecialRoomSeatToSpace';
        this.AssignSpecialRoomSeatToMultipleSpaceURL = 'Space/AssignSpecialRoomSeatToMultipleSpace';
        this.GetXRefedArchitecturalDrawingIdUrl = 'SpaceDrawing/GetXRefedArchitecturalDrawingId';
        this.GetReservationsForMultipleSpaceIdsURL = 'Space/GetReservationsForMultipleSpaceIds';
        //end space data
        //Space Resource
        this.spaceResourceListFormId = 151;
        this.newSpaceResourceListFormId = 155;
        this.SpaceDriversListFormId = 510;
        this.CAISpaceAddEditFormId = 511;
        this.resourceTypeLookUpGetUrl = 'Employee/GetResourceTypeLookupValues';
        this.newSpaceResourceGetUrl = 'Space/GetSpaceResourceforAllocation';
        this.insertSpaceResourcesSubmitUrl = 'Space/InsertResourcesToSpace';
        this.deleteSpaceResourcesSubmitUrl = 'Space/DeleteSpaceResources';
        this.resourceTypesFields = 'MockData/Data/resource-types_fieldDetails.json';
        this.resourceTypesData = 'MockData/Data/resource-typesData.json';
        this.resourceTypesSubmit = 'MockData/Data/resource-types_fieldDetails.json';
        this.spaceResourcesFieldList = 'MockData/Data/space-resources_FieldList.json';
        this.spaceResourcesFields = 'MockData/Data/space-resources_List.json';
        this.ddlResourceType = 'MockData/Data/ddl-resource-type.json';
        this._SpaceStdFieldsDataUrl = 'MockData/Space/spacestdfields.json';
        this._submitURL = 'MockData/Submit/pagesubmit-mockdata.json';
        this._NewspaceStdDataUrl = 'MockData/Space/spacestd_mockdataCopy.json';
        this._SpaceStdDataUrl = 'MockData/Space/spacestd_mockdata.json';
        this._SpaceStdPagingDataUrl = 'MockData/Space/spacestd_mockdata1.json';
        this._spaceDrawingmenuData = 'MockData/FieldObjects/spaceDrawing_menuData.json';
        //space data related data
        this.spaceDataMenuUrl = 'MockData/Menu/space_submenu.json';
        this._floorSelectionFields = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
        this._floorSelectionData = 'MockData/Data/user-drawing-floor-access.json';
        this._spaceDataGridFields = 'MockData/FieldObjects/spacedataGridColumnList.json';
        this._spaceDataGridData = 'MockData/Data/spacedataGridData.json';
        this._spaceDataGridEdit = 'MockData/FieldObjects/spaceDataAddEdit.json';
        //unlockdrawinglist
        this._unlockdrawingfieldlist = 'MockData/FieldObjects/unlockdrawingfieldobject.json';
        this._unlockdrawinglist = 'MockData/Data/unlock_drawing_list.json';
        this.checkOrphanSpacesUrl = 'Space/CheckOrphanSpaceDetails';
        this.relinkSpaceOrphanRecordsUrl = 'SpaceDrawing/RelinkSpaceOrphanRecords';
        this.deleteSpaceOrphanRecordsUrl = 'SpaceDrawing/DeleteSpaceOrphanRecords';
        //private spaceFunctionsFields = 'MockData/Data/space-functions_Fields.json';
        //private spaceFunctionsData = 'MockData/Data/space-functions_Data.json';
        this._spaceMandatoryLayer = 'MockData/space/mandatorylayer-mockdata.json';
        this._spaceMandatoryLayerFields = 'MockData/space/mandatorylayerfields-mockdata.json';
        this._spaceDefaultLayer = 'MockData/space/customer_defaultLayers.json';
        this._customerSettings = 'MockData/space/customer_Settings.json';
        //Delete Space data
        this.unlockedDrawingsUrl = 'Drawing/GetUnlockedDrawings';
        this.deleteSpaceDataUrl = 'Space/DeleteSpaceData';
        this.insertSpacesharingurl = 'Space/InsertMultipleOrgUnitAssignment';
        this.deleteSpacesharingurl = 'Space/DeleteMultipleOrgUnitAssignment';
        this.listSpaceSnapshotsFormId = 301;
        this.getDatesOfSnapShots = 'Space/GetDatesOfSnapShots';
        this.SpaceFunctionCustomizedName = 'Space/getSpaceFunctionCustomizedName';
        this.GetUnlockedDrawingsForFloorSelection = 'Drawing/GetUnlockedDrawingsForFloorSelection';
        this.GetAmenitiesListForAssgnSpaceStdUrl = 'Space/GetAmenityData';
        this.GetOrganizationalLevel1UnitsAndCostCatgoryUrl = 'Space/GetOrganizationalLevel1UnitsAndCostCatgory';
        this.GetCostCategoryRateUrl = 'Space/GetCostCategoryRate';
        this.SetAreaOptions = 'Space/SetAreaOptions';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.AddOrgUnitCostAssignmentUrl = 'Space/AddOrgUnitCostAssignment';
        this.updateMultipleSpaceDataUrl = 'Space/UpdateMultipleSpaceData';
        //Archive Drawings
        this.GetArchiveDrawingDetailsUrl = 'Space/GetArchiveDrawingDetails';
        //Space DashBoard
        this.getGrossAreaDistributionbyCategoryForDashBoard = 'Space/GetGrossAreaDistributionbyCategoryForDashBoard';
        this.getSpaceBarChartDetailsForDashboard = 'Space/GetSpaceBarChartDetailsForDashboard';
        this.getOrgDistributionChartDetailsForDashboard = 'Space/GetOrgDistributionChartDetailsForDashboard';
        this.checkEditPrivilageExistForMultipleSpaceUrl = 'Space/CheckEditPrivilageExistForMultipleSpace';
        this.dashboardOrgDistributionFormId = 370;
        this.CostCategoriesFormId = 342;
        this.CostCategoryRatesFrmId = 350;
        this.SetDisvisonRatesFrmId = 358;
        this.spaceFunctionListFrmId = 416;
        this.getCAIDistributionMapSettingsURL = 'Space/GetCAIDistributionMapSettings';
        this.submitCAIDistributionSettingsUrl = 'Space/UpdateCAIDistributionMapSettings';
        console.log("SpaceService", this.http);
    }
    ;
    SpaceService.prototype.submitSpaceStandard = function (pageDetails) {
        return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    SpaceService.prototype.updateSpaceStandard = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    SpaceService.prototype.getSpaceStandard = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:105,Id:0, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.loadSpaceStandardAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:105}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:105,ParentFormId:105,Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    SpaceService.prototype.AddUpdateSpaceStandard = function (pageDetails, selectId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
        }
    };
    SpaceService.prototype.getSpaceStandardFields = function () {
        return this.postaction({ Input: "{FormId:105}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceStandardPagingData = function () {
        return this.getaction(this._SpaceStdPagingDataUrl);
    };
    SpaceService.prototype.postSpaceStandardDelete = function (id) {
        return this.postaction({ Input: "{FormId:105 ,Id:" + id + "}" }, this.deleteUrl);
    };
    SpaceService.prototype.getResourceTypesFields = function () {
        return this.getaction(this.resourceTypesFields);
    };
    SpaceService.prototype.getResourceTypes = function () {
        return this.getaction(this.resourceTypesData);
    };
    SpaceService.prototype.postResourceTypesyDelete = function (id) {
        // return this.getaction<Observable<any>>(this.resourceTypesFields);
    };
    SpaceService.prototype.getSpaceResourcesFieldList = function () {
        return this.getaction(this.spaceResourcesFieldList);
    };
    SpaceService.prototype.getSpaceResourcesList = function () {
        return this.getaction(this.spaceResourcesFields);
    };
    SpaceService.prototype.getspaceDrawingMenuData = function () {
        return this.getaction(this._spaceDrawingmenuData);
    };
    SpaceService.prototype.addSpaceResources = function (userDetails) {
        console.log('Space Resources added ');
    };
    SpaceService.prototype.updateSpaceResources = function (fieldData) {
        console.log('Space Resources updated');
    };
    SpaceService.prototype.deleteSpaceResources = function (selectedID) {
        console.log(selectedID, "Space Resources Deleted");
    };
    SpaceService.prototype.getDdlResourceType = function () {
        return this.getaction(this.ddlResourceType);
    };
    //Space Data related
    //*******************
    SpaceService.prototype.getSpaceDataMenu = function () {
        return this.postgetaction(null, this.spaceDataMenuUrl);
    };
    SpaceService.prototype.getFloorSelectionField = function () {
        return this.postaction({ Input: "{ FormId:" + this.floorSelectionFrmId + " }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getFloorSelectionData = function (moduleId) {
        var accessCode = Math.pow(2, moduleId);
        var rptFieldValues = "[{\"ReportFieldId\":508,\"Value\":\"" + accessCode.toString() + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.floorSelectionFrmId + ",ListReportFieldIdValues:" + rptFieldValues + " }" }, this.GetUnlockedDrawingsForFloorSelection);
    };
    SpaceService.prototype.getFloorSelectionKeyWordLookUp = function () {
        return ["Aberdeen", "Arlington", "Hawaii Towers", "Miami Towers", "Brown Building", "Columbus Building", "Hamilton Building"];
    };
    SpaceService.prototype.floorSelectionPaging = function (index) { };
    SpaceService.prototype.getSpaceGridDataKeyWordLookUp = function (moduleId, DrawingIds) {
        var rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{FormId:115,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SpaceService.prototype.getSpaceDataKeywordField = function () {
        return this.postaction({ Input: "{ FormId:107}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getAdvnceSearchLookup = function (moduleId, DrawingIds) {
        var rptFieldValues = "";
        if (DrawingIds == "[0]")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{FormId:116,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl);
    };
    SpaceService.prototype.getSpaceKeywordField = function (moduleId, DrawingIds) {
        var rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{ FormId:115,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SpaceService.prototype.SpaceKeywordSeach = function (keyworsearch, index, direction, column, DrawingIds) {
        var rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"3\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"3\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{ FormId:103,ParentFormId:116,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.searchSpaceData);
    };
    SpaceService.prototype.SpaceAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:103,ParentFormId:116,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.searchSpaceData);
    };
    SpaceService.prototype.loadSpaceDataAddEdit = function (selectedSpaceData, action) {
        if (action == "add") {
            //code for loading add fields
            return this.getaction(this._spaceDataGridEdit);
        }
        else if (action == "edit") {
            //code for loading edit fields
            return this.getaction(this._spaceDataGridEdit);
        }
    };
    SpaceService.prototype.submitSpaceGridData = function (fieldObject) { };
    SpaceService.prototype.updateSpaceGridData = function (fieldObject) { };
    SpaceService.prototype.spacedataGridPaging = function (index) { };
    SpaceService.prototype.getSpaceGridField = function (moduleId) {
        var moduleId = ((moduleId == undefined) || (moduleId == 3)) ? 0 : moduleId;
        var rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + " }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceGridData = function (moduleId, index, direction, column, keyworsearch, value, IsKeyword, IsAdvance, DrawingIds, pageTarget, isExport, id) {
        var rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        if (column != undefined && id == undefined) {
            var param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        }
        else if (id != undefined) {
            keyworsearch = "";
            value = "[]";
            IsKeyword = 0;
            IsAdvance = 0;
            index = 0;
            var param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + " , Id :" + id + "}";
        }
        else {
            var param = "";
            if (isExport == true)
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + " ,IsExport:1}";
            else
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        }
        if (pageTarget == 3) {
            return this.postaction({ Input: param }, this.getSpaceDataUrl);
        }
        else
            return this.postaction({ Input: param }, this.listDataListUrl);
    };
    SpaceService.prototype.getSpaceGridDataExport = function (moduleId, fieldObjects, fileName, index, direction, column, keyworsearch, value, IsKeyword, IsAdvance, DrawingIds, pageTarget, isExport) {
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
        var rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        if (column != undefined) {
            var param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        }
        else {
            var param = "";
            if (isExport == true)
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + " ,IsExport:1}";
            else
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        }
        if (pageTarget == 3) {
            return { Input: param, fileName: fileName, fields: filterArray };
        }
        else
            return { Input: param, fileName: fileName, fields: filterArray };
    };
    SpaceService.prototype.loadSpaceAddEdit = function (selectedId, target) {
        var lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.spaceAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.spaceAddEditFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
        }
    };
    SpaceService.prototype.loadSpaceOrganizationalUnit = function (id, parentid, fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    SpaceService.prototype.AddUpdateSpaceData = function (strRptFields, selectedId, target, drwgIds) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.spaceDataListFrmId + "}" }, this.updateSpaceData);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + "}", "DrawingIds": drwgIds.toString() }, this.updateSpaceData);
        }
    };
    //InsertRptFieldForList(dataObj: string,drawingIds) {
    //    let rptfieldArray = JSON.parse(dataObj);
    //    rptfieldArray.push({ ReportFieldId: 271, Value: 3 }, { ReportFieldId: 781, Value: drawingIds });
    //    return JSON.stringify(rptfieldArray);
    //}
    SpaceService.prototype.InlineAddUpdateSpaceData = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SpaceService.prototype.loadAssignDeAssignSpacesStd = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    SpaceService.prototype.loadMultipleAssignStd = function () {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + "}" }, this.addDataUrl);
    };
    SpaceService.prototype.getAmenitiesListForAssgnSpaceStd = function (pageDetails) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.GetAmenitiesListForAssgnSpaceStdUrl);
    };
    SpaceService.prototype.assignSpaceStdwithAmenity = function (fieldObj, selectedId, strAmenities, drawingIds) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "aminitees": strAmenities, "DrawingIds": drawingIds }, this.assignSpaceStdUrl);
    };
    SpaceService.prototype.assignMultipleSpaceStdwithAmenity = function (fieldObj, selectedIds, strAmenities, drawingIds) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "aminitees": strAmenities, "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds }, this.assignMultipleSpaceStdUrl);
    };
    SpaceService.prototype.assignSpaceStd = function (fieldObj, selectedId, drawingIds) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "DrawingIds": drawingIds }, this.assignSpaceStdUrl);
    };
    SpaceService.prototype.assignMultipleSpaceStd = function (fieldObj, selectedIds, drawingIds, seatspacearray) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds, SeatSpaceArray: JSON.stringify(seatspacearray) }, this.assignMultipleSpaceStdUrl);
    };
    SpaceService.prototype.deAssignSpaceStd = function (selectedId, drawingIds) {
        var rptFieldValues = "[{\"ReportFieldId\":790,\"Value\":\"0\"}]";
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + "}", "DrawingIds": drawingIds }, this.deassignSpaceStdUrl);
    };
    SpaceService.prototype.deAssignMultipleSpaceStd = function (selectedIds, drawingIds) {
        var rptFieldValues = "[{\"ReportFieldId\":790,\"Value\":\"0\"}]";
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + "}", "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds }, this.deassignMultipleSpaceStdUrl);
    };
    SpaceService.prototype.getTotalizeSpace = function (selectedIds) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.spaceTotalizeUrl);
    };
    SpaceService.prototype.getSpaceStandardDescrpn = function (spaceStdId) {
        return this.postaction({ Input: "{Id:" + spaceStdId + "}" }, this.spaceStdDescriptn);
    };
    //getColumnsforDisplaySettings() {
    //    return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"1\"}]}" }, this._displaySetingsDataUrl);
    //}
    //postUpdateSpaceDataDisplaySettings(pageDetails) {
    //    return this.postaction({
    //        ApplnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"1\"}]}",
    //        DisplaySettingsInput: pageDetails}, this._updateDisplaySetingsDataUrl);
    //}
    //end space data
    //UnlockDrawing
    SpaceService.prototype.getUnlockDrawingFieldList = function () {
        return this.postgetaction(null, this._unlockdrawingfieldlist);
    };
    SpaceService.prototype.getUnlockDrawingList = function () {
        return this.postgetaction(null, this._unlockdrawinglist);
    };
    SpaceService.prototype.getUnlockDrawingLookUp = function () {
        return ["Frahmingam", "CBOC", "Aberdeen", "Hawaii Towers"];
    };
    SpaceService.prototype.unlockDrawingPaging = function (index) { };
    SpaceService.prototype.getMandaoryLayerFields = function () {
        return this.getaction(this._spaceMandatoryLayerFields);
    };
    SpaceService.prototype.getMandaoryLayer = function () {
        return this.getaction(this._spaceMandatoryLayer);
    };
    SpaceService.prototype.getDefaultLayers = function () {
        return this.getaction(this._spaceDefaultLayer);
    };
    SpaceService.prototype.getCustomerSettings = function () {
        return this.getaction(this._customerSettings);
    };
    SpaceService.prototype.deleteSpaceData = function (selectedID) {
        console.log(selectedID, "Space data Deleted");
    };
    SpaceService.prototype.getdeleteSpaceSelectionField = function () {
        return this.getaction(this._floorSelectionFields);
    };
    SpaceService.prototype.getdeleteSpaceSelectionData = function () {
        return this.getaction(this._floorSelectionData);
    };
    SpaceService.prototype.deleteSpacePaging = function (index) { };
    SpaceService.prototype.CheckIsEntityReferenceFound = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:103,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    //******** Drawing Management *******///
    SpaceService.prototype.getDrawingMangamentData = function (orgId, selectedUserId) {
        if (selectedUserId > 0) {
            return this.postaction({ "selectedUserId": selectedUserId.toString(), "ModuleId": orgId[0].Value }, this.userDwgAccess);
        }
        else {
            //if (orgId[0].Value !=7)
            return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}" }, this.ListDataForTreeViewUrl);
        }
    };
    //getDrawingMangamentDataObject(orgId?: any, selectedUserId?: number) {
    //    if (selectedUserId > 0) {
    //        return this.postaction({ "selectedUserId": selectedUserId.toString(), "ModuleId": orgId[0].Value }, this.userDwgAccess);
    //    } else {
    //        return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}" }, this.ListDataForTreeViewObjectUrl);
    //    }
    //}
    SpaceService.prototype.getFieldObject = function () {
        return this.postaction({ Input: "{FormId:145}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getAllocatedDrawings = function (ModuleId) {
        return this.postaction({ Input: "{FormId:145}", ModuleId: ModuleId.toString() }, this.ListAllocatedDrawingsUrl);
    };
    SpaceService.prototype.updateDrawingsManagement = function (value, ModuleId) {
        return this.postaction({ applnInput: "{FormId:145,ListReportFieldIdValues:" + value.ReportFieldIdValues + "}", ModuleId: ModuleId.toString() }, this.updateDrawingManagementUrl);
    };
    SpaceService.prototype.updateDrawingAccessForUser = function (value, moduleId, userId) {
        return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:" + value.ReportFieldIdValues + ",Id:" + userId + "}", ModuleId: moduleId }, this.updateUserDwgAccess);
    };
    //*********** Distribution Map Settings***********//
    SpaceService.prototype.getCAIDistributionMapSettings = function (formId, ModuleId, isMySetting) {
        return this.postaction({ Input: "{FormId:147}", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getCAIDistributionMapSettingsURL);
    };
    ;
    SpaceService.prototype.updateCAIDistributionMapSettingsData = function (pageDetails, target, isBounding) {
        return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + "}", target: target.toString(), isbounding: isBounding.toString() }, this.submitCAIDistributionSettingsUrl);
    };
    SpaceService.prototype.getDistributionMapSettingsFields = function () {
        return this.postaction({ Input: "{FormId:147}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getDistributionMapSettingsData = function (orgId, orgValue, target, FieldName) {
        return this.postaction({ Input: "{FormId:147,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}", OrgUnitId: orgValue.toString(), Target: target.toString(), selectedFieldName: FieldName }, this.DistributionMapSettingListUrl);
    };
    SpaceService.prototype.updateDistributionMapSettingsData = function (pageDetails, target, isBounding, PageTarget, valueofDropDown, id) {
        if (PageTarget == 4)
            return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + ",Id:" + id + " }", target: target.toString(), isbounding: isBounding.toString(), PageTarget: PageTarget.toString(), dropDownValue: valueofDropDown }, this.submitDistributionSettingsUrl);
        else
            return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + "}", target: target.toString(), isbounding: isBounding.toString(), PageTarget: PageTarget.toString(), dropDownValue: valueofDropDown }, this.submitDistributionSettingsUrl);
    };
    SpaceService.prototype.getSpaceResourceColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + " }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceResourceData = function (index, column, direction, selectedId) {
        var id;
        if (selectedId["currentValue"])
            id = selectedId["currentValue"];
        else
            id = selectedId;
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + id + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.sortSpaceResource = function (index, column, direction, selectedId) {
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.postResourcesDelete = function (selectedResourceIds, spaceId) {
        return this.postaction({ Input: "{ FormId:" + this.spaceResourceListFormId + ",ListReportFieldIdValues:" + selectedResourceIds + ", Id:" + spaceId + "}" }, this.deleteSpaceResourcesSubmitUrl);
    };
    SpaceService.prototype.getSpaceNewResourceColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.newSpaceResourceListFormId + " }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.postSubmitActionSpaceRsource = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newSpaceResourceListFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.insertSpaceResourcesSubmitUrl);
    };
    SpaceService.prototype.getResourceType = function (objectCategoryId, dataOption) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",DataOption:" + dataOption + " }" }, this.resourceTypeLookUpGetUrl);
    };
    SpaceService.prototype.getSpaceNewResourceData = function (index, column, direction, resourceTypeId, spaceId) {
        return this.postaction({ Input: "{ FormId: " + this.newSpaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: "16", DataOption: "1", AttributeOption: "2", ObjectClassIds: resourceTypeId.toString(), DrawingIds: '', SearchCondition: '', IsOrphan: "0", ObjectId: "0", IsDataBasedOnUserAccess: "1", ObjectComponentType: "1", SpaceId: spaceId.toString() }, this.newSpaceResourceGetUrl);
    };
    SpaceService.prototype.getUserPrivilegesofPage = function (pageId, previlages) {
        return this.postaction({ Input: "{ FormId:147 }", PageId: pageId, Privileges: previlages }, this.UserPrivilegesofPagejUrl);
    };
    SpaceService.prototype.SaveSpaceData = function (spacedata) {
        return this.postaction({
            input: spacedata
        }, this.insertUpdateSpaceData);
    };
    SpaceService.prototype.UpdateDrawingLockAsUnlocked = function (drawingId, ModuleId) {
        return this.postaction({ input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":507,\"Value\":\"" + drawingId + "\"},{ \"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.UpdateDrawingLockAsUnlockedURL);
    };
    SpaceService.prototype.UpdateDrawingUnLockAslocked = function (drawingId, ModuleId) {
        return this.postaction({ input: "{Id:" + drawingId + " ,ListReportFieldIdValues: [{ \"ReportFieldId\":507,\"Value\":\"" + drawingId + "\"},{ \"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"},{ \"ReportFieldId\":278,\"Value\":\"" + ModuleId.toString() + "\"}]}" }, this.UpdateLockStatusOfDrawing);
    };
    SpaceService.prototype.DeleteSpaceData = function (drawingId, ModuleId) {
        return this.postaction({ input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":522,\"Value\":\"" + drawingId + "\"}]}" }, this.deleteSpaceDataUrl);
    };
    SpaceService.prototype.getSpaceFloorDrawingsData = function (formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    };
    // Space data grid in drawing
    SpaceService.prototype.getAllSpaceDetails = function (moduleId, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this.getSpaceDataForDrawing);
    };
    SpaceService.prototype.unlockedDrawings = function (ModuleId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.unlockedDrawingsUrl);
    };
    SpaceService.prototype.sortSpaceUnlockedData = function (direction, column, moduleId) {
        return this.postaction({ input: "{SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.unlockedDrawingsUrl);
    };
    SpaceService.prototype.GetArchiveDrawingDetails = function (archiveId, pageIndex, sortDir, sortCol) {
        return this.postaction({ Input: "{SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":1540,\"Value\":\"" + archiveId + "\"}]}" }, this.GetArchiveDrawingDetailsUrl);
    };
    SpaceService.prototype.checkSpaceForDrawing = function (selectedIds) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.checkSpaceForDrawingUrl);
    };
    SpaceService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    SpaceService.prototype.getSnapshotsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + "}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSnapshotsData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.getSnapshotsAdd = function (SnapshotDate) {
        return this.postaction({ Input: "{ FormId:" + this.listSpaceSnapshotsFormId + ",ParentFormId:" + this.listSpaceSnapshotsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":771,\"Value\":\"" + SnapshotDate + "\"}]}" }, this.submitAddUrl);
    };
    SpaceService.prototype.getSnapshotsdelete = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + ",ParentFormId:" + this.listSpaceSnapshotsFormId + ",Id:" + Id + "}" }, this.deleteUrl);
    };
    SpaceService.prototype.getSnapshotsDates = function () {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + "}" }, this.getDatesOfSnapShots);
    };
    SpaceService.prototype.trendAnalysisDateSelector = function () {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceFunctionCustomizedName = function () {
        return this.postaction({}, this.SpaceFunctionCustomizedName);
    };
    SpaceService.prototype.getDistributionMapSettingsonDrawingsFields = function () {
        return this.postaction({ Input: "{FormId:325}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getDistributionMapSettingsnDrawingsData = function (orgId, orgValue, target, FieldName) {
        if (target == "-4")
            orgValue = 0;
        return this.postaction({ Input: "{FormId:325,ListReportFieldIdValues:" + JSON.stringify(orgId) + "}", OrgUnitId: orgValue.toString(), Target: target.toString(), selectedFieldName: FieldName }, this.getDistributionMapSettingsBasedOnDrawingsUrl);
    };
    SpaceService.prototype.insertDistributionMaponDrawing = function (DBObjectColumnId, DrawingId, ItemId, HatchpatternId, Hatchangle, HatchScale, ColorId) {
        return this.postaction({ Input: "{FormId:325}", distInput: "{DBObjectColumnId:" + DBObjectColumnId + ", DrawingId:" + DrawingId + ", ItemId:" + ItemId + ", HatchpatternId:" + HatchpatternId + ", Hatchangle:" + Hatchangle + ", HatchScale:" + HatchScale + ", ColorId:" + ColorId + "}" }, this.InsertUserSessionDistributionMapSettings);
    };
    SpaceService.prototype.UpdateArchivedSpaceDriverDefaultColors = function (listEntityReptIdValues, drawingId, archiveId) {
        return this.postaction({ applnInput: "{ListEntityReportFieldIdValues:" + listEntityReptIdValues + "}", DrawingId: drawingId, ArchiveId: archiveId }, this.UpdateArchivedSpaceDriverDefaultColorsUrl);
    };
    SpaceService.prototype.deleteDistributionMaponDrawing = function () {
        return this.postaction({ Input: "{FormId:325,Id:0}" }, this.deleteUrl);
    };
    SpaceService.prototype.getCostCategories = function () {
        return this.postaction({ Input: "{ FormId:342}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getCostCategoriesData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.CostCategoriesFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.AddCostCategories = function () {
        return this.postaction({ Input: "{ FormId:342}" }, this.addDataUrl);
    };
    SpaceService.prototype.EditCostCategories = function (selectedId) {
        return this.postaction({ Input: "{ FormId:342, Id: " + selectedId + "}" }, this.editDataUrl);
    };
    SpaceService.prototype.DeleteCostCategories = function (selectedId) {
        return this.postaction({ Input: "{FormId:342,Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SpaceService.prototype.AddUpdateResources = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:342 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoriesFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({
                Input: "{FormId:342 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.CostCategoriesFormId + "}"
            }, this.submitEditUrl);
        }
    };
    /*Cost Category Rates begin*/
    SpaceService.prototype.getCostCategoryRtsColumns = function () {
        return this.postaction({ Input: "{FormId:350}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getCostCategoryRtsData = function (pageIndex, sortCol, sortDir, rptFieldValues) {
        return this.postaction({ Input: "{FormId:" + this.CostCategoryRatesFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId:350, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.AddCostCategoriesRates = function () {
        return this.postaction({ Input: "{ FormId:354}" }, this.addDataUrl);
    };
    SpaceService.prototype.EditCostCategoriesRates = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{ FormId:354, Id: " + selectedId + ",ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}" }, this.editDataUrl);
    };
    SpaceService.prototype.AddEditCostCategoryRts = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:354 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({
                Input: "{FormId:354 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}"
            }, this.submitEditUrl);
        }
    };
    SpaceService.prototype.DeleteCostCategoryRate = function (selectedId) {
        return this.postaction({ Input: "{FormId:350,Id:" + selectedId + "}" }, this.deleteUrl);
    };
    /*Cost Category Rates end*/
    /*Cost Category Rates for Units begin*/
    SpaceService.prototype.getCostCategoryRatesColumns = function () {
        return this.postaction({ Input: "{FormId:344}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getCostCategoryRatesData = function () {
        var rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: "{FormId:344, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.isStructureOrganization = function () {
        return this.postaction({ Input: "{FormId:344}" }, this.isStrlOrgnUrl);
    };
    /*Cost Category Rates for Units end*/
    /*Set Division Rates begin*/
    SpaceService.prototype.getDivisionRatesFields = function () {
        return this.postaction({ Input: "{ FormId:358 }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getDivisionRatesforCostCategoryRates = function (rptFieldValues) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.GetOrganizationalLevel1UnitsAndCostCatgoryUrl);
    };
    SpaceService.prototype.getDdlDivisionRates = function (rptFieldValues) {
        //  let rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: "{FormId:358, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.GetCostCategoryRateUrl);
    };
    SpaceService.prototype.updateDivisionRates = function (rptFieldValues) {
        //  let rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: rptFieldValues }, this.AddOrgUnitCostAssignmentUrl);
    };
    /*Set Division Rates end*/
    SpaceService.prototype.getSpaceSharingGridField = function () {
        return this.postaction({ Input: "{ FormId:343 }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceSharingGridData = function (id) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + id + "\"}]";
        return this.postaction({ Input: "{ FormId:343,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.getSpaceSharingeditFields = function () {
        return this.postaction({ Input: "{ FormId:345}" }, this.editDataUrl);
    };
    SpaceService.prototype.getSpaceSharingeditDetailsFields = function (id) {
        var lookupRptField = "[{\"FieldId\":1878,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":1879,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":1880,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":1881,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":1882,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId: 345,ParentFormId:343,Id:" + id + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
    };
    SpaceService.prototype.loadSpacesharingOrganizationalUnit = function (id, parentid, fieldobj) {
        return this.postaction({ Input: "{FormId:345,Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    SpaceService.prototype.getAreaOptions = function () {
        return this.postaction({ Input: "{ FormId:353}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.LoadAreaOptions = function () {
        return this.postaction({ Input: "{FormId:353}" }, this.listDataListUrl);
    };
    SpaceService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    SpaceService.prototype.insertSpacesharingOrganizationalUnit = function (input) {
        return this.postaction({ Input: input }, this.insertSpacesharingurl);
    };
    SpaceService.prototype.deleteSpacesharingOrganizationalUnit = function (input) {
        return this.postaction({ Input: "{FormId:0, ListReportFieldIdValues:" + input + "}" }, this.deleteSpacesharingurl);
    };
    SpaceService.prototype.AddAreaOptions = function (dblRate, blnExtWalArea, blnVerWalArea, blnNetAreaEnabled) {
        return this.postaction({ Input: "{ FormId:353}", dblRate: dblRate, blnExtWalArea: blnExtWalArea, blnVerWalArea: blnVerWalArea, blnNetAreaEnabled: blnNetAreaEnabled }, this.SetAreaOptions);
    };
    SpaceService.prototype.CheckIsEntityReferenceCost = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:353,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    SpaceService.prototype.updateMultipleSpaceData = function (strReportFieldIdValues, reportField, newValue, parentUnitId) {
        return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue, ParentUnitId: parentUnitId }, this.updateMultipleSpaceDataUrl);
    };
    SpaceService.prototype.GetGrossAreaDistributionbyCategoryForDashBoard = function () {
        return this.postaction({ CategoryId: 1, SiteId: 0 }, this.getGrossAreaDistributionbyCategoryForDashBoard);
    };
    SpaceService.prototype.GetSpaceBarChartDetailsForDashboard = function () {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getSpaceBarChartDetailsForDashboard);
    };
    SpaceService.prototype.GetOrgDistributionChartDetailsForDashboard = function () {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getOrgDistributionChartDetailsForDashboard);
    };
    SpaceService.prototype.GetDashboardOrgDistributionColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.dashboardOrgDistributionFormId + " }" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.GetDashboardOrgDistributionData = function (sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.dashboardOrgDistributionFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.listDataListUrl);
    };
    SpaceService.prototype.ddlLoadOrganizationalUnitsSearch = function () {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        var lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:366" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.loadSpaceOrganizationalUnitDll = function (id, parentid, fieldobj) {
        return this.postaction({ Input: "{FormId:366" + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    SpaceService.prototype.checkEditPrivilegeExistsForMultipleSpace = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.checkEditPrivilageExistForMultipleSpaceUrl);
    };
    SpaceService.prototype.AssignHotellingSeatToSpace = function (selectedId, roomCapacity, DrawingId, ModuleId, IsFromDrawing) {
        var roomcapacity = roomCapacity == undefined ? 0 : roomCapacity;
        var moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " }]}", ModuleId: moduleId, DrawingId: DrawingId, IsFromDrawing: IsFromDrawing }, this.AssignHotellingSeatToSpaceURL);
    };
    SpaceService.prototype.AssignHotellingSeatToMultipleSpace = function (Ids, roomCapacity, spacedrawingids, ModuleId, IsFromDrawing) {
        var roomcapacity = roomCapacity == undefined ? 0 : roomCapacity;
        var moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " }]}", ModuleId: moduleId, DrawingId: JSON.stringify(spacedrawingids), IsFromDrawing: IsFromDrawing, Ids: Ids }, this.AssignHotellingSeatToMultipleSpaceUrl);
    };
    SpaceService.prototype.AssignSpecialRoomSeatToSpace = function (selectedId, roomCapacity, seatAssignmentTypeId, DrawingId, ModuleId) {
        var roomcapacity = roomCapacity == undefined ? 1 : roomCapacity;
        var moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ applnInput: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " },{\"ReportFieldId\":6729, \"Value\":" + seatAssignmentTypeId + " }]}", ModuleId: moduleId, DrawingId: DrawingId }, this.AssignSpecialRoomSeatToSpaceURL);
    };
    SpaceService.prototype.AssignSpecialRoomSeatToMultipleSpace = function (Ids, roomCapacity, seatAssignmentTypeId, spacedrawingids, ModuleId) {
        var roomcapacity = roomCapacity == undefined ? 1 : roomCapacity;
        var moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ applnInput: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " },{\"ReportFieldId\":6729, \"Value\":" + seatAssignmentTypeId + " }]}", ModuleId: moduleId, DrawingId: JSON.stringify(spacedrawingids), Ids: Ids }, this.AssignSpecialRoomSeatToMultipleSpaceURL);
    };
    SpaceService.prototype.getSpaceFunctionColms = function () {
        return this.postaction({ Input: "{FormId:" + this.spaceFunctionListFrmId + "}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaecFunctionListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.spaceFunctionListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SpaceService.prototype.deleteSpaecFunction = function (seleId) {
        return this.postaction({ Input: "{ FormId:" + this.spaceFunctionListFrmId + ",ParentFormId:" + this.spaceFunctionListFrmId + ",Id:" + seleId + "}" }, this.deleteUrl);
    };
    SpaceService.prototype.addUpdateSpaceFunction = function (SelId, fldObj) {
        var urlText = SelId == 0 ? this.submitAddUrl : this.submitEditUrl;
        return this.postaction({ Input: "{ FormId:" + this.spaceFunctionListFrmId + ",ParentFormId:" + this.spaceFunctionListFrmId + ",ListReportFieldIdValues:" + fldObj + ",Id:" + SelId + "}" }, urlText);
    };
    SpaceService.prototype.getSpaceDriversFields = function () {
        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + "}" }, this.listFieldObjUrl);
    };
    SpaceService.prototype.getSpaceDriversList = function (index, column, direction, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.SpaceDriversListFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }" }, this.listDataListUrl);
    };
    SpaceService.prototype.loadSpaceDriversAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.CAISpaceAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.CAISpaceAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.editDataUrl);
        }
    };
    SpaceService.prototype.AddEditSpaceDrivers = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.CAISpaceAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.CAISpaceAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.submitEditUrl);
        }
    };
    SpaceService.prototype.DeleteSpaceDrivers = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SpaceService.prototype.CheckIsCIASpaceDriverReferenceFound = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    SpaceService.prototype.checkActiveReservationSeat = function (selectedId) {
        return this.postaction({ SpaceId: selectedId }, this.GetReservationsForSpaceIdsURL);
    };
    SpaceService.prototype.GetXRefedArchitecturalDrawingId = function (drawingid, Isbuildingdwg) {
        var listreportfield = "[{\"ReportFieldId\": 4449, \"Value\":\"" + drawingid + "\" }]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + listreportfield + "}", IsBuildingDrawing: Isbuildingdwg }, this.GetXRefedArchitecturalDrawingIdUrl);
    };
    SpaceService.prototype.checkOrphanSpaceDetails = function (drawingId, handles, sortCol, sortDir) {
        var reptFieldId = '';
        for (var _i = 0, handles_1 = handles; _i < handles_1.length; _i++) {
            var item = handles_1[_i];
            reptFieldId += " {\"ReportFieldId\":784,\"Value\":\"" + item + "\"},";
        }
        reptFieldId = reptFieldId.substring(0, reptFieldId.length - 1);
        //reptFieldId += "{ReportFieldId\":784, \"Value\":" + drawingId + " }";
        var input;
        if (sortCol != undefined && sortDir != undefined)
            input = "{SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[" + reptFieldId + "],Id:" + drawingId + "}";
        else
            input = "{ListReportFieldIdValues:[" + reptFieldId + "],Id:" + drawingId + "}";
        return this.postaction({ Input: input }, this.checkOrphanSpacesUrl);
    };
    SpaceService.prototype.relinkSpaceOrphanRecords = function (spacedata) {
        return this.postaction({ input: spacedata }, this.relinkSpaceOrphanRecordsUrl);
    };
    SpaceService.prototype.deleteSpaceOrphanRecords = function (spaceIds) {
        var reptFieldId = '';
        for (var _i = 0, spaceIds_1 = spaceIds; _i < spaceIds_1.length; _i++) {
            var item = spaceIds_1[_i];
            reptFieldId += "{\"ReportFieldId\":780,\"Value\":\"" + item + "\"},";
        }
        reptFieldId = reptFieldId.substring(0, reptFieldId.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldId + "]}" }, this.deleteSpaceOrphanRecordsUrl);
    };
    SpaceService.prototype.checkActiveReservationSeatMultipleSpace = function (pageDetails) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.GetReservationsForMultipleSpaceIdsURL);
    };
    SpaceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SpaceService);
    return SpaceService;
}(HttpHelpers_1.HttpHelpers));
exports.SpaceService = SpaceService;
//# sourceMappingURL=space.service.js.map