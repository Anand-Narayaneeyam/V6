import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AnalyticsService extends HttpHelpers {
    private getAllSpaceDetailsAnalytics = "Space/GetAllSpaceDetailsAnalytics";
    private getAllEmployeeDetailsAnalyticsUrl = "Employee/GetAllEmployeeDetailsAnalytics";
    private getAllDocumentDetailsAnalyticsUrl = "Documents/GetDocumentListAnalytics";
    private getFloorDrawingDetailsAnalyticsUrl = "Common/GetFloorDrawingListAnalytics";
    private getBuldingDrawingDetailsAnalyticsUrl = "Common/GetBuildingDrawingListAnalytics";
    private getObjectDetailsAnalyticsUrl = "Object/GetObjectsSpaceDetailsAnalytics";
    private getRealPropertyAnalyticsUrl = "RealProperty/GetLeaseDetailsAnalytics";
    private getUserAnalyticsUrl = "User/GetUserListAnalytics";
    private getAllSpaceQueryDetailsAnalyticsUrl = "Space/GetQueryBuilderSearchResultsAnalytics";

    constructor(private http: Http) {
        super(http);
    }

    getAllSpaceDetailsforAnalytics(DrawingIds, ModuleId, AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceDataListFrmId, spaceDataParentFormId) {
        var param = "{FormId: " + spaceDataListFrmId + ",ParentFormId:" + spaceDataParentFormId+ ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, DrawingIds: DrawingIds, ModuleId: ModuleId, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllSpaceDetailsAnalytics);
    }

    getAllEmployeeDetailsforAnalytics(DrawingId, DrawingIds, ModuleId, AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceDataListFrmId, spaceDataParentFormId, assignmentStatus) {
        var param = "{FormId: " + spaceDataListFrmId + ",ParentFormId:" + spaceDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, DrawingId: DrawingId, DrawingIds: DrawingIds, ModuleId: ModuleId, AnalyticsType: AnalyticsType, ColumnName: ColumnName, AssignmentStatus: assignmentStatus}, this.getAllEmployeeDetailsAnalyticsUrl);
    }

    getAllDocumentDetailsforAnalytics( AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, documentDataListFrmId, documentDataParentFormId) {
        var param = "{FormId: " + documentDataListFrmId + ",ParentFormId:" + documentDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllDocumentDetailsAnalyticsUrl);
    }

    getFloorDrawingDetailsforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, floorDrawingDataListFrmId, floorDrawingDataParentFormId) {
        var param = "{FormId: " + floorDrawingDataListFrmId + ",ParentFormId:" + floorDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getFloorDrawingDetailsAnalyticsUrl);
    }

    getBuildingDrawingDetailsforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, buldingDrawingDataListFrmId, buildingDrawingDataParentFormId) {
        var param = "{FormId: " + buldingDrawingDataListFrmId + ",ParentFormId:" + buildingDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getBuldingDrawingDetailsAnalyticsUrl);
    }

    getObjectDetailsforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, buldingDrawingDataListFrmId, buildingDrawingDataParentFormId, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any) {        
        var param = "{FormId: " + buldingDrawingDataListFrmId + ",ParentFormId:" + buildingDrawingDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, ObjectCategory: objectCategoryId, DataOption: dataOption, AttributeOption: attributeOption, ObjectClassIds: objectClassIds, DrawingIds: drawingIds, SearchCondition: searchCondition, IsOrphan: isOrphan, ObjectId: objectId, IsDataBasedOnUserAccess: isDataBasedOnUserAccess, ObjectComponentType: objectComponentType, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getObjectDetailsAnalyticsUrl);
    }

    getRealPropertyDetailsforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, realPropertyDataListFrmId, realPropertyDataParentFormId) {
        var param = "{FormId: " + realPropertyDataListFrmId + ",ParentFormId:" + realPropertyDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getRealPropertyAnalyticsUrl);
    }
    getUsersforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, userDataListFrmId, userDataParentFormId) {
        var param = "{FormId: " + userDataListFrmId + ",ParentFormId:" + userDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + "}"
        return this.postaction({ Input: param, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getUserAnalyticsUrl);
    }
    getSpaceQueryDetailsforAnalytics(AnalyticsType, ColumnName, keywordSearchValue, advanceSearchValue, IsKeywordSearch, IsAdvanceSearch, spaceQueryDataListFrmId, spaceQueryDataParentFormId, drawingId, QueryId, Query) {
        var param = "{FormId: " + spaceQueryDataListFrmId + ",ParentFormId:" + spaceQueryDataParentFormId + ",Filter:'" + keywordSearchValue + "',ListFilterIdValues: " + advanceSearchValue + ",IsKeywordSearch:" + IsKeywordSearch + " ,IsAdvancedSearch:" + IsAdvanceSearch + ",ListReportFieldIdValues:" + Query + "}"
        return this.postaction({ Input: param, TargetId: QueryId, DrawingId: drawingId, AnalyticsType: AnalyticsType, ColumnName: ColumnName }, this.getAllSpaceQueryDetailsAnalyticsUrl);
    }
}