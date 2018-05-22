import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class SpaceService extends HttpHelpers {

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
    private CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
    private ListDataForTreeViewUrl = 'Drawing/GetAllDrawingsForModuleDrawingManagement';
    private ListDataForTreeViewObjectUrl = ' Drawing/GetModuleDrawingsForDrawingManagement';
    private submitDistributionSettingsUrl = 'SpaceDrawing/UpdateDistributionMapSettings';
    private DistributionMapSettingListUrl = 'SpaceDrawing/GetDistributionMapSettings';
    private ListAllocatedDrawingsUrl = 'Drawing/GetAllocatedDrawings';
    private updateDrawingManagementUrl = 'Drawing/UpdateDrawingManagement';
    private UserPrivilegesofPagejUrl = 'Common/GetUserPrivilegesofPage';;
    private insertUpdateSpaceData = "SpaceDrawing/InsertUpdateSpaceData";
    private UpdateDrawingLockAsUnlockedURL = "SpaceDrawing/UpdateDrawingLockAsUnlocked";
    private userDwgAccess = "User/GetDrawingAccessDetails";
    private updateUserDwgAccess = "User/AllocateDrawingsForUser";
    private UpdateLockStatusOfDrawing = 'Drawing/UpdateLockStatusOfDrawing';
    private checkSpaceForDrawingUrl = 'spaceDrawing/CheckSpaceForDrawing';
    private _checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    private getDistributionMapSettingsBasedOnDrawingsUrl = 'SpaceDrawing/GetDistributionMapSettingsBasedOnDrawings';
    private InsertUserSessionDistributionMapSettings = 'Drawing/InsertUserSessionDistributionMapSettings';
    private UpdateArchivedSpaceDriverDefaultColorsUrl ='Space/UpdateArchivedSpaceDriverDefaultColors'
    private isStrlOrgnUrl = 'Common/CheckOrgUnitStructureExists';
    private GetReservationsForSpaceIdsURL = 'Space/GetReservationsForSpaceIds';
    //spacedata

    //spacedata
    private floorSelectionFrmId = 118;
    private spaceDataListFrmId = 103;
    public spaceAddEditFrmId = 104;
    private assignDeassignSpaceStdFrmId = 132;
    private spaceDisplaySettingsFrmId = 150;
    private getSpaceDataUrl = 'Space/GetAllSpaceDetails';
    private assignSpaceStdUrl = "Space/AssignSpaceStandard";
    private assignMultipleSpaceStdUrl = 'Space/AssignMultipleSpaceStd'
    private deassignSpaceStdUrl = "Space/DeAssignSpaceStandard";
    private deassignMultipleSpaceStdUrl = 'Space/DeassignMultipleSpaceStd'
    private spaceTotalizeUrl = "Space/GetTotalizeData";
    private spaceStdDescriptn = "Space/GetSpaceStandardDetails";
    private updateSpaceData = "Space/UpdateSpaceDetails";
    private searchSpaceData = "Space/GetSearchForSpace";
    private getSpaceDataForDrawing = 'Space/GetAllSpaceDetails';
    private AssignHotellingSeatToSpaceURL = 'Space/AssignHotellingSeatToSpace';
    private AssignHotellingSeatToMultipleSpaceUrl = 'Space/AssignHotellingSeatToMultipleSpace'
    private AssignSpecialRoomSeatToSpaceURL = 'Space/AssignSpecialRoomSeatToSpace';
    private AssignSpecialRoomSeatToMultipleSpaceURL = 'Space/AssignSpecialRoomSeatToMultipleSpace'

    GetXRefedArchitecturalDrawingIdUrl = 'SpaceDrawing/GetXRefedArchitecturalDrawingId';
    private GetReservationsForMultipleSpaceIdsURL = 'Space/GetReservationsForMultipleSpaceIds'
    //end space data

    //Space Resource
    private spaceResourceListFormId = 151;
    private newSpaceResourceListFormId = 155;
    private SpaceDriversListFormId = 510;
    private CAISpaceAddEditFormId = 511;
    private resourceTypeLookUpGetUrl = 'Employee/GetResourceTypeLookupValues';
    private newSpaceResourceGetUrl = 'Space/GetSpaceResourceforAllocation';
    private insertSpaceResourcesSubmitUrl = 'Space/InsertResourcesToSpace';
    private deleteSpaceResourcesSubmitUrl = 'Space/DeleteSpaceResources';

    private resourceTypesFields = 'MockData/Data/resource-types_fieldDetails.json';
    private resourceTypesData = 'MockData/Data/resource-typesData.json';
    private resourceTypesSubmit = 'MockData/Data/resource-types_fieldDetails.json';

    private spaceResourcesFieldList = 'MockData/Data/space-resources_FieldList.json';
    private spaceResourcesFields = 'MockData/Data/space-resources_List.json';
    private ddlResourceType = 'MockData/Data/ddl-resource-type.json';

    private _SpaceStdFieldsDataUrl = 'MockData/Space/spacestdfields.json';
    private _submitURL = 'MockData/Submit/pagesubmit-mockdata.json';
    private _NewspaceStdDataUrl = 'MockData/Space/spacestd_mockdataCopy.json';
    private _SpaceStdDataUrl = 'MockData/Space/spacestd_mockdata.json';
    private _SpaceStdPagingDataUrl = 'MockData/Space/spacestd_mockdata1.json';
    private _spaceDrawingmenuData = 'MockData/FieldObjects/spaceDrawing_menuData.json';

    //space data related data
    private spaceDataMenuUrl = 'MockData/Menu/space_submenu.json'
    private _floorSelectionFields = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
    private _floorSelectionData = 'MockData/Data/user-drawing-floor-access.json';
    private _spaceDataGridFields = 'MockData/FieldObjects/spacedataGridColumnList.json'
    private _spaceDataGridData = 'MockData/Data/spacedataGridData.json'
    private _spaceDataGridEdit = 'MockData/FieldObjects/spaceDataAddEdit.json';

    //unlockdrawinglist
    private _unlockdrawingfieldlist = 'MockData/FieldObjects/unlockdrawingfieldobject.json';
    private _unlockdrawinglist = 'MockData/Data/unlock_drawing_list.json';
    private checkOrphanSpacesUrl = 'Space/CheckOrphanSpaceDetails';
    private relinkSpaceOrphanRecordsUrl = 'SpaceDrawing/RelinkSpaceOrphanRecords';
    private deleteSpaceOrphanRecordsUrl = 'SpaceDrawing/DeleteSpaceOrphanRecords';
    //private spaceFunctionsFields = 'MockData/Data/space-functions_Fields.json';
    //private spaceFunctionsData = 'MockData/Data/space-functions_Data.json';

    private _spaceMandatoryLayer = 'MockData/space/mandatorylayer-mockdata.json';
    private _spaceMandatoryLayerFields = 'MockData/space/mandatorylayerfields-mockdata.json';
    private _spaceDefaultLayer = 'MockData/space/customer_defaultLayers.json';
    private _customerSettings = 'MockData/space/customer_Settings.json';
    //Delete Space data
    private unlockedDrawingsUrl = 'Drawing/GetUnlockedDrawings';
    private deleteSpaceDataUrl = 'Space/DeleteSpaceData';

    private insertSpacesharingurl = 'Space/InsertMultipleOrgUnitAssignment';
    private deleteSpacesharingurl = 'Space/DeleteMultipleOrgUnitAssignment';

    private listSpaceSnapshotsFormId = 301;
    private getDatesOfSnapShots = 'Space/GetDatesOfSnapShots';
    private SpaceFunctionCustomizedName = 'Space/getSpaceFunctionCustomizedName'
    private GetUnlockedDrawingsForFloorSelection = 'Drawing/GetUnlockedDrawingsForFloorSelection';
    private GetAmenitiesListForAssgnSpaceStdUrl = 'Space/GetAmenityData';
    private GetOrganizationalLevel1UnitsAndCostCatgoryUrl = 'Space/GetOrganizationalLevel1UnitsAndCostCatgory';
    private GetCostCategoryRateUrl = 'Space/GetCostCategoryRate';
    private SetAreaOptions = 'Space/SetAreaOptions';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private AddOrgUnitCostAssignmentUrl = 'Space/AddOrgUnitCostAssignment';

    private updateMultipleSpaceDataUrl = 'Space/UpdateMultipleSpaceData';
    //Archive Drawings
    private GetArchiveDrawingDetailsUrl = 'Space/GetArchiveDrawingDetails';

    //Space DashBoard
    private getGrossAreaDistributionbyCategoryForDashBoard = 'Space/GetGrossAreaDistributionbyCategoryForDashBoard';
    private getSpaceBarChartDetailsForDashboard = 'Space/GetSpaceBarChartDetailsForDashboard';
    private getOrgDistributionChartDetailsForDashboard = 'Space/GetOrgDistributionChartDetailsForDashboard';
    private checkEditPrivilageExistForMultipleSpaceUrl = 'Space/CheckEditPrivilageExistForMultipleSpace';
    private dashboardOrgDistributionFormId = 370;

    private CostCategoriesFormId = 342;
    private CostCategoryRatesFrmId = 350;
    private SetDisvisonRatesFrmId = 358;
    private spaceFunctionListFrmId = 416;

    private getCAIDistributionMapSettingsURL = 'Space/GetCAIDistributionMapSettings';
    private submitCAIDistributionSettingsUrl = 'Space/UpdateCAIDistributionMapSettings';


    constructor(private http: Http) {
        super(http);
        console.log("SpaceService", this.http);
    }

    submitSpaceStandard(pageDetails) {
        return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    updateSpaceStandard(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    getSpaceStandard(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:105,Id:0, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    }

    loadSpaceStandardAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:105}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:105,ParentFormId:105,Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    AddUpdateSpaceStandard(pageDetails, selectId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:105,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
        }
    }

    getSpaceStandardFields() {
        return this.postaction({ Input: "{FormId:105}" }, this.listFieldObjUrl);
    }
    getSpaceStandardPagingData() {
        return this.getaction<Observable<any>>(this._SpaceStdPagingDataUrl)
    }

    postSpaceStandardDelete(id: any) {
        return this.postaction({ Input: "{FormId:105 ,Id:" + id + "}" }, this.deleteUrl);
    }



    getResourceTypesFields() {
        return this.getaction<Observable<any>>(this.resourceTypesFields)
    }

    getResourceTypes() {
        return this.getaction<Observable<any>>(this.resourceTypesData)
    }

    postResourceTypesyDelete(id: any) {
        // return this.getaction<Observable<any>>(this.resourceTypesFields);
    }

    getSpaceResourcesFieldList() {
        return this.getaction<Observable<any>>(this.spaceResourcesFieldList);
    }

    getSpaceResourcesList() {
        return this.getaction<Observable<any>>(this.spaceResourcesFields);
    }
    getspaceDrawingMenuData() {
        return this.getaction<Observable<any>>(this._spaceDrawingmenuData)
    }
    addSpaceResources(userDetails: IField[]) {
        console.log('Space Resources added ');
    }

    updateSpaceResources(fieldData: IField[]) {
        console.log('Space Resources updated')
    }

    deleteSpaceResources(selectedID: any) {
        console.log(selectedID, "Space Resources Deleted");
    }

    getDdlResourceType() {
        return this.getaction<Observable<any>>(this.ddlResourceType);
    }

    //Space Data related
    //*******************
    getSpaceDataMenu() {
        return this.postgetaction<Observable<any>>(null, this.spaceDataMenuUrl)
    }

    getFloorSelectionField() {
        return this.postaction({ Input: "{ FormId:" + this.floorSelectionFrmId + " }" }, this.listFieldObjUrl);
    }

    getFloorSelectionData(moduleId: number) {
        let accessCode = Math.pow(2, moduleId);
        let rptFieldValues = "[{\"ReportFieldId\":508,\"Value\":\"" + accessCode.toString() + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.floorSelectionFrmId + ",ListReportFieldIdValues:" + rptFieldValues + " }" }, this.GetUnlockedDrawingsForFloorSelection);
    }

    getFloorSelectionKeyWordLookUp() {
        return ["Aberdeen", "Arlington", "Hawaii Towers", "Miami Towers", "Brown Building", "Columbus Building", "Hamilton Building"]
    }
    floorSelectionPaging(index: number) { }

    getSpaceGridDataKeyWordLookUp(moduleId: number, DrawingIds: any) {
        let rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{FormId:115,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl)
    }

    getSpaceDataKeywordField() {
        return this.postaction({ Input: "{ FormId:107}" }, this.listFieldObjUrl);
    }

    getAdvnceSearchLookup(moduleId: number, DrawingIds: any) {
        let rptFieldValues = "";
        if (DrawingIds == "[0]")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{FormId:116,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl)
    }

    getSpaceKeywordField(moduleId: number, DrawingIds: any) {
        let rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{ FormId:115,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    }

    SpaceKeywordSeach(keyworsearch: string, index: number, direction: any, column: any, DrawingIds: any) {
        let rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"3\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"3\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        return this.postaction({ Input: "{ FormId:103,ParentFormId:116,Filter:'" + keyworsearch + "',IsKeywordSearch:1,IsAdvancedSearch:0,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.searchSpaceData);
    }


    SpaceAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:103,ParentFormId:116,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.searchSpaceData);
    }

    loadSpaceDataAddEdit(selectedSpaceData: number, action: string) {
        if (action == "add") {
            //code for loading add fields
            return this.getaction<Observable<any>>(this._spaceDataGridEdit)
        }
        else if (action == "edit") {
            //code for loading edit fields
            return this.getaction<Observable<any>>(this._spaceDataGridEdit)
        }
    }
    submitSpaceGridData(fieldObject: IField[]) { }
    updateSpaceGridData(fieldObject: IField[]) { }
    spacedataGridPaging(index: number) { }


    getSpaceGridField(moduleId?: number) {
        var moduleId = ((moduleId == undefined) || (moduleId == 3)) ? 0 : moduleId;
        let rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + " }" }, this.listFieldObjUrl);
    }

    getSpaceGridData(moduleId: number, index?: number, direction?: any, column?: any, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any, DrawingIds?: any, pageTarget?: number, isExport?: any, id?: any) {
        let rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        if (column != undefined && id == undefined) {
            var param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}"
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
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + " ,IsExport:1}"
            else
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}"
        }
        if (pageTarget == 3) {
            return this.postaction({ Input: param }, this.getSpaceDataUrl);
        }
        else
            return this.postaction({ Input: param }, this.listDataListUrl);
    }
    getSpaceGridDataExport(moduleId: number, fieldObjects: any, fileName, index?: number, direction?: any, column?: any, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any, DrawingIds?: any, pageTarget?: number, isExport?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        let rptFieldValues = "";
        if (DrawingIds == "0")
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"}]";
        else
            rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingIds + "\"}]";
        if (column != undefined) {
            var param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}"
        } else {
            var param = "";
            if (isExport == true)
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + " ,IsExport:1}"
            else
                param = "{ FormId: " + this.spaceDataListFrmId + ",PageIndex:" + index + ",ParentFormId:116,SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}"
        }
        if (pageTarget == 3) {
            return { Input: param, fileName: fileName, fields: filterArray };
        }
        else
            return { Input: param, fileName: fileName, fields: filterArray };
    }
    loadSpaceAddEdit(selectedId: number, target: number) {
        let lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.spaceAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.spaceAddEditFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
        }
    }

    loadSpaceOrganizationalUnit(id, parentid, fieldobj) {

        return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    }

    AddUpdateSpaceData(strRptFields: string, selectedId: number, target: number, drwgIds: any[]) {
        if (target == 1) {//add        
            return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.spaceDataListFrmId + "}" }, this.updateSpaceData);
        } else {
            return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + "}", "DrawingIds": drwgIds.toString() }, this.updateSpaceData);
        }
    }

    //InsertRptFieldForList(dataObj: string,drawingIds) {
    //    let rptfieldArray = JSON.parse(dataObj);
    //    rptfieldArray.push({ ReportFieldId: 271, Value: 3 }, { ReportFieldId: 781, Value: drawingIds });
    //    return JSON.stringify(rptfieldArray);
    //}

    InlineAddUpdateSpaceData(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    loadAssignDeAssignSpacesStd(selectedId: number) {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }
    loadMultipleAssignStd() {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + "}" }, this.addDataUrl);

    }
    getAmenitiesListForAssgnSpaceStd(pageDetails: any) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.GetAmenitiesListForAssgnSpaceStdUrl)
    }

    assignSpaceStdwithAmenity(fieldObj: string, selectedId: number, strAmenities: string, drawingIds: string) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "aminitees": strAmenities, "DrawingIds": drawingIds }, this.assignSpaceStdUrl);
    }
    assignMultipleSpaceStdwithAmenity(fieldObj: string, selectedIds, strAmenities: string, drawingIds: string) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "aminitees": strAmenities, "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds }, this.assignMultipleSpaceStdUrl);
    }


    assignSpaceStd(fieldObj: string, selectedId: number, drawingIds: string) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "DrawingIds": drawingIds }, this.assignSpaceStdUrl);
    }
    assignMultipleSpaceStd(fieldObj: string, selectedIds, drawingIds: string, seatspacearray: string) {
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + fieldObj + "}", "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds, SeatSpaceArray: JSON.stringify(seatspacearray) }, this.assignMultipleSpaceStdUrl);
    }
    deAssignSpaceStd(selectedId, drawingIds: string) {
        let rptFieldValues = "[{\"ReportFieldId\":790,\"Value\":\"0\"}]";
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + "}", "DrawingIds": drawingIds }, this.deassignSpaceStdUrl);
    }
    deAssignMultipleSpaceStd(selectedIds, drawingIds: string) {
        let rptFieldValues = "[{\"ReportFieldId\":790,\"Value\":\"0\"}]";
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + " ,ListReportFieldIdValues: " + rptFieldValues + "}", "DrawingIds": JSON.stringify(drawingIds), Ids: selectedIds }, this.deassignMultipleSpaceStdUrl);
    }
    getTotalizeSpace(selectedIds: any[]) {
        let rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.spaceTotalizeUrl);

    }
    getSpaceStandardDescrpn(spaceStdId) {
        return this.postaction({ Input: "{Id:" + spaceStdId + "}" }, this.spaceStdDescriptn);
    }

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
    getUnlockDrawingFieldList() {
        return this.postgetaction<Observable<any>>(null, this._unlockdrawingfieldlist);
    }
    getUnlockDrawingList() {
        return this.postgetaction<Observable<any>>(null, this._unlockdrawinglist);
    }
    getUnlockDrawingLookUp() {
        return ["Frahmingam", "CBOC", "Aberdeen", "Hawaii Towers"];
    }
    unlockDrawingPaging(index: number)
    { }


    getMandaoryLayerFields() {
        return this.getaction<Observable<any>>(this._spaceMandatoryLayerFields);
    }

    getMandaoryLayer() {

        return this.getaction<Observable<any>>(this._spaceMandatoryLayer);
    }
    getDefaultLayers() {
        return this.getaction<Observable<any>>(this._spaceDefaultLayer);
    }
    getCustomerSettings() {
        return this.getaction<Observable<any>>(this._customerSettings);
    }
    deleteSpaceData(selectedID: any) {
        console.log(selectedID, "Space data Deleted");
    }
    getdeleteSpaceSelectionField() {
        return this.getaction<Observable<any>>(this._floorSelectionFields)
    }
    getdeleteSpaceSelectionData() {
        return this.getaction<Observable<any>>(this._floorSelectionData)
    }
    deleteSpacePaging(index: number) { }

    CheckIsEntityReferenceFound(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:103,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }

    //******** Drawing Management *******///
    getDrawingMangamentData(orgId?: any, selectedUserId?: number) {
        if (selectedUserId > 0) {
            return this.postaction({ "selectedUserId": selectedUserId.toString(), "ModuleId": orgId[0].Value }, this.userDwgAccess);

        } else {
            //if (orgId[0].Value !=7)
            return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}" }, this.ListDataForTreeViewUrl);
            //else
            //    return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}" }, this.ListDataForTreeViewObjectUrl);

        }
    }

    //getDrawingMangamentDataObject(orgId?: any, selectedUserId?: number) {
    //    if (selectedUserId > 0) {
    //        return this.postaction({ "selectedUserId": selectedUserId.toString(), "ModuleId": orgId[0].Value }, this.userDwgAccess);

    //    } else {
    //        return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}" }, this.ListDataForTreeViewObjectUrl);
    //    }
    //}

    getFieldObject() {
        return this.postaction({ Input: "{FormId:145}" }, this.listFieldObjUrl);
    }

    getAllocatedDrawings(ModuleId?: any) {

        return this.postaction({ Input: "{FormId:145}", ModuleId: ModuleId.toString() }, this.ListAllocatedDrawingsUrl);
    }

    updateDrawingsManagement(value?: any, ModuleId?: any) {
        return this.postaction({ applnInput: "{FormId:145,ListReportFieldIdValues:" + value.ReportFieldIdValues + "}", ModuleId: ModuleId.toString() }, this.updateDrawingManagementUrl);
    }
    updateDrawingAccessForUser(value, moduleId, userId) {
        return this.postaction({ Input: "{FormId:145,ListReportFieldIdValues:" + value.ReportFieldIdValues + ",Id:" + userId + "}", ModuleId: moduleId }, this.updateUserDwgAccess);
    }
    //*********** Distribution Map Settings***********//

    getCAIDistributionMapSettings(formId: string, ModuleId: string, isMySetting: boolean) {
        return this.postaction({ Input: "{FormId:147}", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getCAIDistributionMapSettingsURL);
    };

    updateCAIDistributionMapSettingsData(pageDetails: any, target: number, isBounding: number) {
        return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + "}", target: target.toString(), isbounding: isBounding.toString() }, this.submitCAIDistributionSettingsUrl);
    }



    getDistributionMapSettingsFields() {
        return this.postaction({ Input: "{FormId:147}" }, this.listFieldObjUrl);
    }

    getDistributionMapSettingsData(orgId: any, orgValue: any, target: any, FieldName?: string) {
        return this.postaction({ Input: "{FormId:147,ListReportFieldIdValues:[" + JSON.stringify(orgId[0]) + "]}", OrgUnitId: orgValue.toString(), Target: target.toString(), selectedFieldName: FieldName }, this.DistributionMapSettingListUrl)
    }

    updateDistributionMapSettingsData(pageDetails: any, target: number, isBounding: number, PageTarget?: number, valueofDropDown?: any, id?: string) {
        if (PageTarget == 4)
            return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + ",Id:" + id + " }", target: target.toString(), isbounding: isBounding.toString(), PageTarget: PageTarget.toString(), dropDownValue: valueofDropDown }, this.submitDistributionSettingsUrl);
        else
            return this.postaction({ Input: "{FormId:147,ListEntityReportFieldIdValues:" + pageDetails + "}", target: target.toString(), isbounding: isBounding.toString(), PageTarget: PageTarget.toString(), dropDownValue: valueofDropDown }, this.submitDistributionSettingsUrl);
    }

    getSpaceResourceColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + " }" }, this.listFieldObjUrl);
    }

    getSpaceResourceData(index: number, column: any, direction: any, selectedId: any) {

        var id;
        if (selectedId["currentValue"])
            id = selectedId["currentValue"]
        else
            id = selectedId
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + id + "}" }, this.listDataListUrl);
    }

    sortSpaceResource(index: number, column: any, direction: any, selectedId: any) {
        return this.postaction({ Input: "{ FormId: " + this.spaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    }

    postResourcesDelete(selectedResourceIds: any, spaceId: any) {
        return this.postaction({ Input: "{ FormId:" + this.spaceResourceListFormId + ",ListReportFieldIdValues:" + selectedResourceIds + ", Id:" + spaceId + "}" }, this.deleteSpaceResourcesSubmitUrl);
    }

    getSpaceNewResourceColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.newSpaceResourceListFormId + " }" }, this.listFieldObjUrl);
    }

    postSubmitActionSpaceRsource(selectedRowIds, selectedId) { // submit
        return this.postaction({ Input: "{ FormId:" + this.newSpaceResourceListFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.insertSpaceResourcesSubmitUrl);
    }

    getResourceType(objectCategoryId: any, dataOption: number) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",DataOption:" + dataOption + " }" }, this.resourceTypeLookUpGetUrl);
    }

    getSpaceNewResourceData(index: number, column: any, direction: any, resourceTypeId: any, spaceId: any) {
        return this.postaction({ Input: "{ FormId: " + this.newSpaceResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: "16", DataOption: "1", AttributeOption: "2", ObjectClassIds: resourceTypeId.toString(), DrawingIds: '', SearchCondition: '', IsOrphan: "0", ObjectId: "0", IsDataBasedOnUserAccess: "1", ObjectComponentType: "1", SpaceId: spaceId.toString() }, this.newSpaceResourceGetUrl);
    }

    getUserPrivilegesofPage(pageId: any, previlages: any) {
        return this.postaction({ Input: "{ FormId:147 }", PageId: pageId, Privileges: previlages }, this.UserPrivilegesofPagejUrl);
    }
    SaveSpaceData(spacedata) {
        return this.postaction({
            input: spacedata
        }, this.insertUpdateSpaceData)


    }
    UpdateDrawingLockAsUnlocked(drawingId, ModuleId) {

        return this.postaction({ input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":507,\"Value\":\"" + drawingId + "\"},{ \"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.UpdateDrawingLockAsUnlockedURL);

    }
    UpdateDrawingUnLockAslocked(drawingId, ModuleId) {

        return this.postaction({ input: "{Id:" + drawingId + " ,ListReportFieldIdValues: [{ \"ReportFieldId\":507,\"Value\":\"" + drawingId + "\"},{ \"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"},{ \"ReportFieldId\":278,\"Value\":\"" + ModuleId.toString() + "\"}]}" }, this.UpdateLockStatusOfDrawing);

    }
    DeleteSpaceData(drawingId, ModuleId) {

        return this.postaction({ input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":522,\"Value\":\"" + drawingId + "\"}]}" }, this.deleteSpaceDataUrl);

    }
    getSpaceFloorDrawingsData(formId, ModuleId) {

        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);

    }
    // Space data grid in drawing
    getAllSpaceDetails(moduleId: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this.getSpaceDataForDrawing);
    }
    unlockedDrawings(ModuleId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.unlockedDrawingsUrl);

    }
    sortSpaceUnlockedData(direction: any, column: any, moduleId) {

        return this.postaction({ input: "{SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.unlockedDrawingsUrl);

    }
    GetArchiveDrawingDetails(archiveId: number, pageIndex?: number, sortDir?: string, sortCol?: string) {
        return this.postaction({ Input: "{SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":1540,\"Value\":\"" + archiveId + "\"}]}" }, this.GetArchiveDrawingDetailsUrl);
    }
    checkSpaceForDrawing(selectedIds: any[]) {
        let rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.checkSpaceForDrawingUrl);

    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }

    getSnapshotsFields() {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + "}" }, this.listFieldObjUrl);
    }

    getSnapshotsData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getSnapshotsAdd(SnapshotDate: string) {
        return this.postaction({ Input: "{ FormId:" + this.listSpaceSnapshotsFormId + ",ParentFormId:" + this.listSpaceSnapshotsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":771,\"Value\":\"" + SnapshotDate + "\"}]}" }, this.submitAddUrl);
    }
    getSnapshotsdelete(Id: number) {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + ",ParentFormId:" + this.listSpaceSnapshotsFormId + ",Id:" + Id + "}" }, this.deleteUrl);
    }
    getSnapshotsDates() {
        return this.postaction({ Input: "{FormId:" + this.listSpaceSnapshotsFormId + "}" }, this.getDatesOfSnapShots);
    }

    trendAnalysisDateSelector() {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    }

    getSpaceFunctionCustomizedName() {
        return this.postaction({}, this.SpaceFunctionCustomizedName);
    }





    getDistributionMapSettingsonDrawingsFields() {
        return this.postaction({ Input: "{FormId:325}" }, this.listFieldObjUrl);
    }

    getDistributionMapSettingsnDrawingsData(orgId: any, orgValue: any, target: any, FieldName?: string) {
        if (target == "-4")
            orgValue = 0;
        return this.postaction({ Input: "{FormId:325,ListReportFieldIdValues:" + JSON.stringify(orgId) + "}", OrgUnitId: orgValue.toString(), Target: target.toString(), selectedFieldName: FieldName }, this.getDistributionMapSettingsBasedOnDrawingsUrl)
    }
    insertDistributionMaponDrawing(DBObjectColumnId: any, DrawingId: any, ItemId: any, HatchpatternId: any, Hatchangle: any, HatchScale: any, ColorId: any) {
        return this.postaction({ Input: "{FormId:325}", distInput: "{DBObjectColumnId:" + DBObjectColumnId + ", DrawingId:" + DrawingId + ", ItemId:" + ItemId + ", HatchpatternId:" + HatchpatternId + ", Hatchangle:" + Hatchangle + ", HatchScale:" + HatchScale + ", ColorId:" + ColorId + "}" }, this.InsertUserSessionDistributionMapSettings);
    }
    UpdateArchivedSpaceDriverDefaultColors(listEntityReptIdValues,drawingId, archiveId) {
        return this.postaction({ applnInput:"{ListEntityReportFieldIdValues:" +listEntityReptIdValues+"}", DrawingId: drawingId,ArchiveId:archiveId}, this.UpdateArchivedSpaceDriverDefaultColorsUrl);
    }
    deleteDistributionMaponDrawing() {
        return this.postaction({ Input: "{FormId:325,Id:0}" }, this.deleteUrl)
    }



    getCostCategories() {
        return this.postaction({ Input: "{ FormId:342}" }, this.listFieldObjUrl);
    }

    getCostCategoriesData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.CostCategoriesFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);

    }

    AddCostCategories() {
        return this.postaction({ Input: "{ FormId:342}" }, this.addDataUrl);
    }

    EditCostCategories(selectedId: string) {
        return this.postaction({ Input: "{ FormId:342, Id: " + selectedId + "}" }, this.editDataUrl);
    }

    DeleteCostCategories(selectedId: string) {
        return this.postaction({ Input: "{FormId:342,Id:" + selectedId + "}" }, this.deleteUrl);
    }

    AddUpdateResources(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:342 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoriesFormId + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({
                Input: "{FormId:342 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.CostCategoriesFormId + "}"
            }, this.submitEditUrl);
        }
    }

    /*Cost Category Rates begin*/
    getCostCategoryRtsColumns() {
        return this.postaction({ Input: "{FormId:350}" }, this.listFieldObjUrl);
    }

    getCostCategoryRtsData(pageIndex?: number, sortCol?: string, sortDir?: string, rptFieldValues?) {
        return this.postaction({ Input: "{FormId:" + this.CostCategoryRatesFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId:350, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
    }

    AddCostCategoriesRates() {
        return this.postaction({ Input: "{ FormId:354}" }, this.addDataUrl);
    }

    EditCostCategoriesRates(selectedId: string, strRptFields) {
        return this.postaction({ Input: "{ FormId:354, Id: " + selectedId + ",ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}" }, this.editDataUrl);
    }

    AddEditCostCategoryRts(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:354 ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({
                Input: "{FormId:354 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.CostCategoryRatesFrmId + "}"
            }, this.submitEditUrl);
        }
    }

    DeleteCostCategoryRate(selectedId: string) {
        return this.postaction({ Input: "{FormId:350,Id:" + selectedId + "}" }, this.deleteUrl);
    }
    /*Cost Category Rates end*/


    /*Cost Category Rates for Units begin*/
    getCostCategoryRatesColumns() {
        return this.postaction({ Input: "{FormId:344}" }, this.listFieldObjUrl);
    }

    getCostCategoryRatesData() {
        let rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: "{FormId:344, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.listDataListUrl);
    }

    isStructureOrganization() {
        return this.postaction({ Input: "{FormId:344}" }, this.isStrlOrgnUrl);
    }

    /*Cost Category Rates for Units end*/


    /*Set Division Rates begin*/
    getDivisionRatesFields() {
        return this.postaction({ Input: "{ FormId:358 }" }, this.listFieldObjUrl);
    }

    getDivisionRatesforCostCategoryRates(rptFieldValues: string) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.GetOrganizationalLevel1UnitsAndCostCatgoryUrl);
    }

    getDdlDivisionRates(rptFieldValues) {
        //  let rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: "{FormId:358, ListReportFieldIdValues:" + rptFieldValues + "}" }, this.GetCostCategoryRateUrl);
    }

    updateDivisionRates(rptFieldValues) {
        //  let rptFieldValues = "[{\"ReportFieldId\":289,\"Value\":\"1" + "\"}]";
        return this.postaction({ Input: rptFieldValues }, this.AddOrgUnitCostAssignmentUrl);
    }

    /*Set Division Rates end*/

    getSpaceSharingGridField() {
        return this.postaction({ Input: "{ FormId:343 }" }, this.listFieldObjUrl);
    }
    getSpaceSharingGridData(id: any) {
        let rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + id + "\"}]";
        return this.postaction({ Input: "{ FormId:343,ListReportFieldIdValues: " + rptFieldValues + "}" }, this.listDataListUrl);
    }

    getSpaceSharingeditFields() {
        return this.postaction({ Input: "{ FormId:345}" }, this.editDataUrl);
    }
    getSpaceSharingeditDetailsFields(id: any) {
        let lookupRptField = "[{\"FieldId\":1878,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":1879,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":1880,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":1881,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":1882,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId: 345,ParentFormId:343,Id:" + id + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.editDataUrl);
    }

    loadSpacesharingOrganizationalUnit(id, parentid, fieldobj) {

        return this.postaction({ Input: "{FormId:345,Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    }

    getAreaOptions() {
        return this.postaction({ Input: "{ FormId:353}" }, this.listFieldObjUrl);
    }
    LoadAreaOptions() {
        return this.postaction({ Input: "{FormId:353}" }, this.listDataListUrl);
    }

    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }

    insertSpacesharingOrganizationalUnit(input: any) {

        return this.postaction({ Input: input }, this.insertSpacesharingurl);
    }

    deleteSpacesharingOrganizationalUnit(input: any) {

        return this.postaction({ Input: "{FormId:0, ListReportFieldIdValues:" + input + "}" }, this.deleteSpacesharingurl);
    }


    AddAreaOptions(dblRate, blnExtWalArea, blnVerWalArea, blnNetAreaEnabled) {
        return this.postaction({ Input: "{ FormId:353}", dblRate: dblRate, blnExtWalArea: blnExtWalArea, blnVerWalArea: blnVerWalArea, blnNetAreaEnabled: blnNetAreaEnabled }, this.SetAreaOptions);
    }

    CheckIsEntityReferenceCost(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:353,Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }

    updateMultipleSpaceData(strReportFieldIdValues: string, reportField: number, newValue: any, parentUnitId: any) {
        return this.postaction({ Input: "{FormId:" + this.spaceAddEditFrmId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue, ParentUnitId: parentUnitId }, this.updateMultipleSpaceDataUrl);
    }


    GetGrossAreaDistributionbyCategoryForDashBoard() {
        return this.postaction({ CategoryId: 1, SiteId: 0 }, this.getGrossAreaDistributionbyCategoryForDashBoard);
    }

    GetSpaceBarChartDetailsForDashboard() {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getSpaceBarChartDetailsForDashboard);
    }
    GetOrgDistributionChartDetailsForDashboard() {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.getOrgDistributionChartDetailsForDashboard);
    }

    GetDashboardOrgDistributionColumns() {
        return this.postaction({ Input: "{ FormId:" + this.dashboardOrgDistributionFormId + " }" }, this.listFieldObjUrl);
    }

    GetDashboardOrgDistributionData(sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.dashboardOrgDistributionFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":0 }]}" }, this.listDataListUrl);
    }


    ddlLoadOrganizationalUnitsSearch() {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        let lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:366" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    }

    loadSpaceOrganizationalUnitDll(id, parentid, fieldobj) {

        return this.postaction({ Input: "{FormId:366" + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    }

    checkEditPrivilegeExistsForMultipleSpace(strReportFieldIds: string) {
        return this.postaction({ Input: "{ FormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.checkEditPrivilageExistForMultipleSpaceUrl);
    }
    AssignHotellingSeatToSpace(selectedId, roomCapacity, DrawingId: string, ModuleId: string, IsFromDrawing: any) {

        let roomcapacity = roomCapacity == undefined ? 0 : roomCapacity;
        let moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " }]}", ModuleId: moduleId, DrawingId: DrawingId, IsFromDrawing: IsFromDrawing }, this.AssignHotellingSeatToSpaceURL);
    }
    AssignHotellingSeatToMultipleSpace(Ids, roomCapacity, spacedrawingids: any, ModuleId: string, IsFromDrawing: any) {
        let roomcapacity = roomCapacity == undefined ? 0 : roomCapacity;
        let moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ Input: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " }]}", ModuleId: moduleId, DrawingId: JSON.stringify(spacedrawingids), IsFromDrawing: IsFromDrawing, Ids: Ids }, this.AssignHotellingSeatToMultipleSpaceUrl);
    }
    AssignSpecialRoomSeatToSpace(selectedId, roomCapacity, seatAssignmentTypeId, DrawingId: string, ModuleId: string) {
        let roomcapacity = roomCapacity == undefined ? 1 : roomCapacity;
        let moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ applnInput: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " },{\"ReportFieldId\":6729, \"Value\":" + seatAssignmentTypeId + " }]}", ModuleId: moduleId, DrawingId: DrawingId }, this.AssignSpecialRoomSeatToSpaceURL);
    }
    AssignSpecialRoomSeatToMultipleSpace(Ids, roomCapacity, seatAssignmentTypeId, spacedrawingids: any, ModuleId: string) {
        let roomcapacity = roomCapacity == undefined ? 1 : roomCapacity;
        let moduleId = ModuleId == undefined ? 3 : ModuleId;
        return this.postaction({ applnInput: "{FormId:" + this.assignDeassignSpaceStdFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6730, \"Value\":" + roomcapacity + " },{\"ReportFieldId\":6729, \"Value\":" + seatAssignmentTypeId + " }]}", ModuleId: moduleId, DrawingId: JSON.stringify(spacedrawingids), Ids: Ids }, this.AssignSpecialRoomSeatToMultipleSpaceURL);
    }
    getSpaceFunctionColms() {
        return this.postaction({ Input: "{FormId:" + this.spaceFunctionListFrmId + "}" }, this.listFieldObjUrl);
    }

    getSpaecFunctionListData(pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.spaceFunctionListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    deleteSpaecFunction(seleId: number) {
        return this.postaction({ Input: "{ FormId:" + this.spaceFunctionListFrmId + ",ParentFormId:" + this.spaceFunctionListFrmId + ",Id:" + seleId + "}" }, this.deleteUrl);
    }

    addUpdateSpaceFunction(SelId, fldObj) {
        var urlText = SelId == 0 ? this.submitAddUrl : this.submitEditUrl;
        return this.postaction({ Input: "{ FormId:" + this.spaceFunctionListFrmId + ",ParentFormId:" + this.spaceFunctionListFrmId + ",ListReportFieldIdValues:" + fldObj + ",Id:" + SelId + "}" }, urlText);

    }

    getSpaceDriversFields() {

        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + "}" }, this.listFieldObjUrl);
    }

    getSpaceDriversList(index: any, column: any, direction: any, objectCategoryId: any) {

        return this.postaction({ Input: "{ FormId:" + this.SpaceDriversListFormId + " , SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }" }, this.listDataListUrl);

    }

    loadSpaceDriversAddEdit(selectedId: number, target: number) {

        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.CAISpaceAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.CAISpaceAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.editDataUrl);
        }
    }

    AddEditSpaceDrivers(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add
        {
            return this.postaction({ Input: "{FormId:" + this.CAISpaceAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.CAISpaceAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.SpaceDriversListFormId + "}" }, this.submitEditUrl);
        }
    }
    DeleteSpaceDrivers(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    }

    CheckIsCIASpaceDriverReferenceFound(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:" + this.SpaceDriversListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }
    checkActiveReservationSeat(selectedId) {

        return this.postaction({ SpaceId: selectedId }, this.GetReservationsForSpaceIdsURL);
    }
    GetXRefedArchitecturalDrawingId(drawingid: any,Isbuildingdwg: any) {
        let listreportfield = "[{\"ReportFieldId\": 4449, \"Value\":\"" + drawingid + "\" }]";

        return this.postaction({ Input: "{ListReportFieldIdValues:" + listreportfield + "}", IsBuildingDrawing: Isbuildingdwg }, this.GetXRefedArchitecturalDrawingIdUrl);

    }
    checkOrphanSpaceDetails(drawingId: number, handles: any, sortCol?: string, sortDir?: string) {
        var reptFieldId = '';
        for (var item of handles)
            reptFieldId += " {\"ReportFieldId\":784,\"Value\":\"" + item + "\"},";
        reptFieldId = reptFieldId.substring(0, reptFieldId.length - 1);
        //reptFieldId += "{ReportFieldId\":784, \"Value\":" + drawingId + " }";
        var input;
        if (sortCol != undefined && sortDir != undefined)
            input = "{SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[" + reptFieldId + "],Id:" + drawingId + "}";
        else
            input = "{ListReportFieldIdValues:[" + reptFieldId + "],Id:" + drawingId + "}";
        return this.postaction({ Input: input }, this.checkOrphanSpacesUrl);
    }
    relinkSpaceOrphanRecords(spacedata) {
        return this.postaction({ input: spacedata }, this.relinkSpaceOrphanRecordsUrl)
    }
    deleteSpaceOrphanRecords(spaceIds: any) {
        var reptFieldId = '';
        for (var item of spaceIds)
            reptFieldId += "{\"ReportFieldId\":780,\"Value\":\"" + item + "\"},";
        reptFieldId = reptFieldId.substring(0, reptFieldId.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldId + "]}" }, this.deleteSpaceOrphanRecordsUrl)
    }
    checkActiveReservationSeatMultipleSpace(pageDetails) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + pageDetails + "}" }, this.GetReservationsForMultipleSpaceIdsURL)
    }

}

