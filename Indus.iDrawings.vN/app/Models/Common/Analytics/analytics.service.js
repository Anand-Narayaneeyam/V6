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
var HttpHelpers_1 = require('../../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var AnalyticsService = (function (_super) {
    __extends(AnalyticsService, _super);
    function AnalyticsService(http) {
        _super.call(this, http);
        this.http = http;
        this.getAllSpaceDetailsAnalytics = "Space/GetAllSpaceDetailsAnalytics";
        this.getAllEmployeeDetailsAnalyticsUrl = "Employee/GetAllEmployeeDetailsAnalytics";
        this.getAllDocumentDetailsAnalyticsUrl = "Documents/GetDocumentListAnalytics";
        this.getFloorDrawingDetailsAnalyticsUrl = "Common/GetFloorDrawingListAnalytics";
        this.getBuldingDrawingDetailsAnalyticsUrl = "Common/GetBuildingDrawingListAnalytics";
        this.getObjectDetailsAnalyticsUrl = "Object/GetObjectsSpaceDetailsAnalytics";
        this.getRealPropertyAnalyticsUrl = "RealProperty/GetLeaseDetailsAnalytics";
        this.getUserAnalyticsUrl = "User/GetUserListAnalytics";
        this.getAllSpaceQueryDetailsAnalyticsUrl = "Space/GetQueryBuilderSearchResultsAnalytics";
    }
    AnalyticsService.prototype.getAllSpaceDetailsforAnalytics = function (DrawingIds, ModuleId, AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceDataListFrmId, spaceDataParentFormId) {
        var param = "{FormId: " + spaceDataListFrmId + ",ParentFormId:" + spaceDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, DrawingIds: DrawingIds, ModuleId: ModuleId, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllSpaceDetailsAnalytics);
    };
    AnalyticsService.prototype.getAllEmployeeDetailsforAnalytics = function (DrawingId, DrawingIds, ModuleId, AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceDataListFrmId, spaceDataParentFormId, assignmentStatus) {
        var param = "{FormId: " + spaceDataListFrmId + ",ParentFormId:" + spaceDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, DrawingId: DrawingId, DrawingIds: DrawingIds, ModuleId: ModuleId, AnalyticsType: AnalyticsType, ColumnName: ColumnName, AssignmentStatus: assignmentStatus }, this.getAllEmployeeDetailsAnalyticsUrl);
    };
    AnalyticsService.prototype.getAllDocumentDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, documentDataListFrmId, documentDataParentFormId) {
        var param = "{FormId: " + documentDataListFrmId + ",ParentFormId:" + documentDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllDocumentDetailsAnalyticsUrl);
    };
    AnalyticsService.prototype.getFloorDrawingDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, floorDrawingDataListFrmId, floorDrawingDataParentFormId) {
        var param = "{FormId: " + floorDrawingDataListFrmId + ",ParentFormId:" + floorDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getFloorDrawingDetailsAnalyticsUrl);
    };
    AnalyticsService.prototype.getBuildingDrawingDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, buldingDrawingDataListFrmId, buildingDrawingDataParentFormId) {
        var param = "{FormId: " + buldingDrawingDataListFrmId + ",ParentFormId:" + buildingDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getBuldingDrawingDetailsAnalyticsUrl);
    };
    AnalyticsService.prototype.getObjectDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, buldingDrawingDataListFrmId, buildingDrawingDataParentFormId, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType) {
        var param = "{FormId: " + buldingDrawingDataListFrmId + ",ParentFormId:" + buildingDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getObjectDetailsAnalyticsUrl);
    };
    AnalyticsService.prototype.getRealPropertyDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, realPropertyDataListFrmId, realPropertyDataParentFormId) {
        var param = "{FormId: " + realPropertyDataListFrmId + ",ParentFormId:" + realPropertyDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getRealPropertyAnalyticsUrl);
    };
    AnalyticsService.prototype.getUsersforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, userDataListFrmId, userDataParentFormId) {
        var param = "{FormId: " + userDataListFrmId + ",ParentFormId:" + userDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}";
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getUserAnalyticsUrl);
    };
    AnalyticsService.prototype.getSpaceQueryDetailsforAnalytics = function (AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceQueryDataListFrmId, spaceQueryDataParentFormId, drawingId, QueryId, Query) {
        var param = "{FormId: " + spaceQueryDataListFrmId + ",ParentFormId:" + spaceQueryDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + ",ListReportFieldIdValues:" + Query + "}";
        return this.postaction({ Input: param, TargetId: QueryId, DrawingId: drawingId, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllSpaceQueryDetailsAnalyticsUrl);
    };
    AnalyticsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AnalyticsService);
    return AnalyticsService;
}(HttpHelpers_1.HttpHelpers));
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map