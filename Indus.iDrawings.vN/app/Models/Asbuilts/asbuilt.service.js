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
var AsbuiltService = (function (_super) {
    __extends(AsbuiltService, _super);
    function AsbuiltService(http) {
        _super.call(this, http);
        this.http = http;
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.inserBuildingDrawingUrl = 'Common/SaveBuildingDrawing';
        this.inserFloorDrawingUrl = 'Common/SaveFloorDrawing';
        //drawing controller
        this.reviseBuildingDrawing = 'Drawing/InsertRevisedBuildingDrawing';
        this.reviseFloorDrawing = 'Drawing/InsertRevisedDrawing';
        this.deleteBuildingDrawingUrl = 'Drawing/DeleteBuildingDrawing';
        this.deleteFloorDrawingUrl = 'Drawing/DeleteFloorDrawing';
        this.replaceBuildingDrawing = 'Drawing/ReplaceBuildingDrawing';
        this.replaceFloorDrawing = 'Drawing/ReplaceDrawing';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.buildingDrawinglistFormId = 47;
        this.floorDrawingListFormId = 48;
        this.markupFloorFormId = 81;
        this.markupBuildingFormId = 82;
        this.GetDetailsForAsbuiltsDashBoard = 'Common/GetDetailsForDashBoard';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.GetDrawingCategoriesCountforAsBuiltsDashboard = 'Common/GetDrawingCategoriesCountforDashboard';
        this.asbuiltsDrawingsFields = 'MockData/Asbuilts/drawings_Fields.json';
        this.asbuiltsDrawingsData = 'MockData/Asbuilts/drawings_Data.json';
        this.asbuiltsMenuData = 'MockData/Asbuilts/drawingMenu_data.json';
        this.drawingEditDiscription_Fields = 'MockData/Asbuilts/asbuiltsDrawing-edit_Fields.json';
        this.markupDescription_Fields = 'MockData/Asbuilts/markupdescription-fields.json';
        this._displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this.GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.downloadUrl = 'Common/ArrayDrawingDownloadFile';
        this.downloadBldngImageUrl = 'Common/ArrayBuildingImageDownloadFile';
        this.buildingDrawingdownloadUrl = 'Common/ArrayBuildingDrawingDownloadFile';
        this.multidownloadDocumentUrl = 'Common/MultipleDownloadFile';
        this.getXBIMFiles = 'Common/GetXBIMFiles';
    }
    AsbuiltService.prototype.getBuildingDrawingsData = function () {
        return this.postaction({ Input: "{FormId:" + this.buildingDrawinglistFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + "}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    };
    AsbuiltService.prototype.getBuildingDrawingsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.buildingDrawinglistFormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    };
    //getFloorDrawingsData(FormId) {
    //    console.log("{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}");
    //    return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
    //    // return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + "}" }, this.listDataListUrl);
    //    // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
    //    //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    //}
    AsbuiltService.prototype.getFloorDrawingsData = function (FormId, index, column, direction, filter, value, IsKeyword, IsAdvance) {
        //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    };
    AsbuiltService.prototype.getFloorDrawingsFields = function (FormId) {
        return this.postaction({ Input: "{ FormId: " + FormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    };
    AsbuiltService.prototype.getAsbuiltsMenuData = function () {
        return this.getaction(this.asbuiltsMenuData);
    };
    AsbuiltService.prototype.getDrawingtEditDiscriptionFields = function (selectedId, addEdit) {
        return this.getaction(this.drawingEditDiscription_Fields);
    };
    AsbuiltService.prototype.getmarkupDescription = function (isBuildingDrawing) {
        if (isBuildingDrawing)
            return this.postaction({ Input: "{ FormId: " + this.markupBuildingFormId + " }" }, this.addDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.markupFloorFormId + " }" }, this.addDataUrl);
    };
    AsbuiltService.prototype.getDrawingListSearchKeyWordLookup = function () {
        return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    };
    AsbuiltService.prototype.getAddDrawingFieldDetails = function (formId) {
        return this.postaction({ Input: "{ FormId: " + formId + " }" }, this.addDataUrl);
    };
    AsbuiltService.prototype.getEditDrawingFieldDetails = function (formId, selectedId, parentFormId) {
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
        //return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.editDataUrl);
    };
    AsbuiltService.prototype.postDrawingAdd = function (formId, pageDetails, ParentFormId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}" }, this.submitAddUrl);
    };
    AsbuiltService.prototype.postDrawingEdit = function (formId, pageDetails, id, ParentFormId) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + ParentFormId + "}" }, this.submitEditUrl);
    };
    //postDrawingReplace(formId, revision, buildingId, desc, file,size, id: any, ParentFormId) {
    //    console.log('entered edit service')
    //    return this.postaction({
    //      //  Input: "{FormId:" + formId + " ,Id:" + id + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"},{\"ReportFieldId\":516,\"Value\":\"" + desc + "\"},{\"ReportFieldId\":512,\"Value\":\"" + file + "\"},{\"ReportFieldId\":513,\"Value\":\"" + size + "\"}]}"
    //        Input: "{FormId:" + formId + " ,Id:" + id + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:ReportFieldId:511,Value:"+ revision+",ReportFieldId:487,Value:" + buildingId + ",ReportFieldId:516,Value:" + desc + ",ReportFieldId:512,Value:" + file + "ReportFieldId:513,Value:" + size + "}"
    //    }, this.submitEditUrl);
    //}
    //postDrawingReplaceWithFile(formId, revision, buildingId, desc, file, size,fileData ,ParentFormId) {
    //    return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"},{\"ReportFieldId\":516,\"Value\":\"" + desc + "\"},{\"ReportFieldId\":512,\"Value\":\"" + file + "\"},{\"ReportFieldId\":513,\"Value\":\"" + size + "\"}],ParentFormId:" + ParentFormId + "}", FileInput: fileData  }, this.fileUploadUrl);
    //}
    AsbuiltService.prototype.postInsertBuildingDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.inserBuildingDrawingUrl);
    };
    AsbuiltService.prototype.postInsertFloorDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.inserFloorDrawingUrl);
    };
    AsbuiltService.prototype.postReviseDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId, building, DrawingId) {
        if (building == true)
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseBuildingDrawing);
        else
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseFloorDrawing);
    };
    AsbuiltService.prototype.postReplaceDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId, building, DrawingId) {
        if (building == true)
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceBuildingDrawing);
        else
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceFloorDrawing);
    };
    //postDrawingReplaceWithFile(formId, pageDetails, fileData, ParentFormId,Id) {
    //    return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + Id + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.fileUploadUrl);
    //}
    AsbuiltService.prototype.loadState = function (formId, ParentId, parentFieldId) {
        //return this.postaction({ Input: "{FormId:" + formId + ",Id:" + childId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
        // return this.postaction({ Input: "{FormId:" + formId + " ,ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{\"ReportFieldId\":" + SiteReportFieldId + ",\"Value\":\"" + ParentId+"\"}]}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    AsbuiltService.prototype.sort = function (formId, direction, column) {
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
    };
    AsbuiltService.prototype.Paging = function (formId, index) {
        return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    AsbuiltService.prototype.FloorDrawingPaging = function (formId, index, column, direction, filter, value, IsKeyword, IsAdvance) {
        //  return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
        //console.log('current page', index)
    };
    AsbuiltService.prototype.spaceDrawingPaging = function (formId, index, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.buildingDrawinglistFormId + ",PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.listDataListUrl);
        //console.log('current page', index)
    };
    AsbuiltService.prototype.deleteBuildingDrawing = function (selectedID, revision, buildingId, filename) {
        if (revision != 0)
            return this.postaction({ applnInput: "{FormId:" + this.buildingDrawinglistFormId + ",Id:0 ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revision.toString() + "\"},{\"ReportFieldId\":4378,\"Value\":\"" + filename + "\"}]}" }, this.deleteBuildingDrawingUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.buildingDrawinglistFormId + ",Id:0  ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":4378,\"Value\":\"" + filename + "\"},{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.deleteBuildingDrawingUrl);
    };
    AsbuiltService.prototype.deleteFloorDrawing = function (selectedID, revision, floorId, filename) {
        if (revision != 0)
            return this.postaction({ applnInput: "{FormId:" + this.floorDrawingListFormId + ",Id:" + selectedID[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":522,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}" }, this.deleteFloorDrawingUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.floorDrawingListFormId + ",Id:" + selectedID[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":522,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}" }, this.deleteFloorDrawingUrl);
        //{\"ReportFieldId\":523,\"Value\":\"" + floorId + "\"} bugid 80844
    };
    AsbuiltService.prototype.getAllFloorDrawingAdvanceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:233}" }, this.AdvanceSearchLookUpUrl);
    };
    AsbuiltService.prototype.getAllFloorDrawingKeywordField = function () {
        return this.postaction({ Input: "{FormId:232}" }, this.keywordLookUpUrl);
    };
    //doubt
    AsbuiltService.prototype.AllFloorDrawingAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:48,ParentFormId:233,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    };
    AsbuiltService.prototype.AllFloorDrawingKeywordSeach = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:48,Filter: '" + value + "',SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}" }, this.listDataListUrl);
    };
    //Floor
    AsbuiltService.prototype.loadStateFloor = function (formId, ParentId, parentFieldId, floorfieldId, siteId, buildingId) {
        //return this.postaction({ Input: "{FormId:" + formId + ",Id:" + childId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
        // return this.postaction({ Input: "{FormId:" + formId + " ,ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{\"ReportFieldId\":" + SiteReportFieldId + ",\"Value\":\"" + ParentId+"\"}]}" }, this.lookupUrl);
        //  return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues: FieldId: " + floorfieldId + ", ReportFieldId: 1830, Value: " + siteId + ", ReportFieldId: 1830, Value: " + buildingId + "  }" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + ",LookupReportFieldValues: FieldId: " + floorfieldId + ", ReportFieldId: 1830, Value: " + siteId + " }" }, this.lookupUrl);
    };
    AsbuiltService.prototype.downloadFile = function (formId, EntityId, fileName, RevisionNo, drawingType) {
        if (drawingType == 0) {
            return this.downloadaction({ Input: "{FormId:" + formId + ",EntityId:4}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + EntityId + "',RevisionNo:'" + RevisionNo + "'}" }, this.downloadUrl);
        }
        else if (drawingType == 1) {
            return this.downloadaction({ Input: "{FormId:" + formId + ",EntityId:4}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + EntityId + "',RevisionNo:'" + RevisionNo + "'}" }, this.buildingDrawingdownloadUrl);
        }
        //   return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",AttachmentCategoryId:'" + attachmentCategoryId + "',FileName:'" + fileName + "',ReferenceId:'" + attachmentId  + "',BaseEntityId:'" + baseEntityId +  "'}" }, this.downloadUrl);
    };
    AsbuiltService.prototype.multipleDownloadFile = function (formId, drawingType, FileInput) {
        debugger;
        if (drawingType == 0) {
            return this.downloadaction({
                Input: "{FormId:" + formId + ",EntityId:23}", Fileinput: FileInput }, this.multidownloadDocumentUrl);
        }
        else if (drawingType == 1) {
            return this.downloadaction({
                Input: "{FormId:" + formId + ",EntityId:24}", Fileinput: FileInput }, this.multidownloadDocumentUrl);
        }
    };
    //getBuildingCategoriesFunctionFields() {
    //    return this.postaction({ Input: "{FormId:47,ListLookupReportFieldIdValues:[{ \"FieldId\":205,\"ReportFieldId\": 4309, \"Value\":\"1\" },{\"ReportFieldId\": 4310, \"Value\":\"0\"}]}" }, this.listFieldObjUrl);
    //}
    //getFloorCategoriesFunctionFields() {
    //    return this.postaction({ Input: "{FormId:48,ListLookupReportFieldIdValues:[{ \"FieldId\":240,\"ReportFieldId\": 4309, \"Value\":\"0\" },{\"ReportFieldId\": 4310, \"Value\":\"1\"}]}" }, this.listFieldObjUrl);
    //}
    //Space Drawing List
    AsbuiltService.prototype.GetDetailsForDashBoard = function () {
        return this.postaction({ Input: "{}" }, this.GetDetailsForAsbuiltsDashBoard);
    };
    AsbuiltService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    AsbuiltService.prototype.GetDrawingCategoriesCountforDashboard = function (buildingId) {
        return this.postaction({ Input: "{Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"}]}" }, this.GetDrawingCategoriesCountforAsBuiltsDashboard);
    };
    AsbuiltService.prototype.DownloadBuildingImage = function (baseEntityId, fileName) {
        return this.downloadaction({ Input: "{EntityId:'3',BaseEntityId:'" + baseEntityId + "'}", FileInput: "{FileName:'" + fileName + "'}" }, this.downloadBldngImageUrl);
    };
    AsbuiltService.prototype.GetXBIMFiles = function () {
        return this.postaction({ Input: "{}" }, this.getXBIMFiles);
    };
    AsbuiltService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AsbuiltService);
    return AsbuiltService;
}(HttpHelpers_1.HttpHelpers));
exports.AsbuiltService = AsbuiltService;
//# sourceMappingURL=asbuilt.service.js.map