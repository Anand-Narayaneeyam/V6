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
var CommonReportService = (function (_super) {
    __extends(CommonReportService, _super);
    function CommonReportService(http) {
        _super.call(this, http);
        this.http = http;
        this.objectlistFieldObjUrl = 'Object/GetListAppFormFields';
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.reportFloorSelectionUrl = 'Report/GetUnlockedDrawingsforReportFloorSelection';
        this.SpaceFunctionCustomizedName = 'Report/getSpaceFunctionCustomizedName';
        this.forReportCriteria = 'Report/GetCriteriaforReportSelection';
        this.EmployeeOccupancyFloorSelection = 'Report/GetEmployeeOccupancyDrawingList';
        this.getDrawingsWithDataEmployee = 'Report/GetDrawingsWithDataforEmployeeReport';
        this.getComponentCategoryObjectCategory = 'Object/GetComponentCategoryObjectCategory';
        this.dbMulitObjectLookUpUrl = 'Common/GetMultiDatabyDBObject';
        this.getUserAccessibleDrawingHavingDataForObjectCat = 'Report/GetUserAccessibleDrawingHavingDataForObjectCategory';
        this.getAssetClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
        this.fieldsList = 'Object/GetListAppFormFields';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.checkReportPrivilegeforUser = 'Report/CheckReportPrivilegeforUser';
        this.listFieldObjWorkOrderUrl = 'WorkOrder/GetListAppFormFields';
        this.getOrgLevelCustomName = 'Employee/GetOrganizationStructures';
        this.getStatusLookups = 'Report/GetStatusLookups';
        this.getWorkTypeLookups = 'Report/GetWorkTypeLookups';
        this.getActionPointLookups = 'Report/GetActionPointLookups';
        this.getPMStatusReportLookups = 'Report/GetPMStatusLookups';
        this.getPMWorkTypeReportLookups = 'Report/GetPMWorkTypeLookups';
        this.getFirstLastdaysofWeek = 'Report/GetFirstLastdaysofWeek';
        this.setFirstLastdaysofWeek = 'Report/SetFirstLastdaysofWeek';
        this.getFirstLastdaysofMonth = 'Report/GetFirstLastdaysofMonth';
        this.getArchiveNameUrl = 'Space/GetNextArchiveName';
        this.updateArchiveUrl = 'Space/InsertCAIArchive';
        this.getArchivesListUrl = 'Space/GetArchiveList';
        this.updateSpaceArchivesUrl = 'Space/CAIUpdateArchives';
        this.updateBuildingStatusArchivesUrl = 'Space/CAIUpdateBuildingArchives';
        this.getAdditionalReportDetailsUrl = 'Report/GetAdditionalReports';
        this.SRandNPMFormId = 226;
        this.objectClassSelectionFormId = 210;
        this.pmSummaryFormId = 290;
        this.listReviewPMWorkorderFormId = 262;
    }
    CommonReportService.prototype.UserReportdate = function () {
        return this.postaction({ Input: "{ FormId:211}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getReportFloorSelection = function () {
        return this.postaction({ Input: "{ ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"8\"}]}" }, this.reportFloorSelectionUrl);
    };
    CommonReportService.prototype.ddlLoadUserStatus = function () {
        return this.postaction({ Input: "{ FormId:195,ListLookupReportFieldIdValues:[{ \"FieldId\":1085,\"ReportFieldId\": 12097, \"Value\":\"1387\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlLoadReportCriteria = function () {
        return this.postaction({ Input: "{ FormId:245,ListLookupReportFieldIdValues:[{ \"FieldId\":1342,\"ReportFieldId\": 12097, \"Value\":\"1757\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlLoadReportType = function () {
        return this.postaction({ Input: "{ FormId:255,ListLookupReportFieldIdValues:[{ \"FieldId\":1418,\"ReportFieldId\": 12097, \"Value\":\"1815\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getSpaceFunctionCustomizedName = function () {
        return this.postaction({}, this.SpaceFunctionCustomizedName);
    };
    CommonReportService.prototype.criteriaforReport = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.forReportCriteria);
    };
    CommonReportService.prototype.getEmployeeOccupancyFloorSelection = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.EmployeeOccupancyFloorSelection);
    };
    CommonReportService.prototype.getDrawingsWithDataforEmployee = function (moduleId) {
        return this.postaction({ Input: "{}", ModuleId: moduleId }, this.getDrawingsWithDataEmployee);
    };
    CommonReportService.prototype.getddlemployeemove = function () {
        return this.postaction({ Input: "{ FormId:272,ListLookupReportFieldIdValues:[{ \"FieldId\":1497,\"ReportFieldId\": 12097, \"Value\":\"1972\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getOrganizationalUnitField = function () {
        return this.postaction({ Input: "{ FormId:275,ListLookupReportFieldIdValues:[{ \"FieldId\":1523,\"ReportFieldId\": 289, \"Value\":\"1\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getEquipmentColumn = function (equipmentCategoryId) {
        return this.postaction({ Input: "{ FormId:278, BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory);
    };
    CommonReportService.prototype.getEquipmentType = function (equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:278,Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    CommonReportService.prototype.getGridData = function (equipmentCategoryId, equipmentClassId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:278,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " },{ \"ReportFieldId\": 657, \"Value\":" + equipmentClassId + " }]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.selectEntityCategory = function () {
        return this.postaction({ Input: "{ FormId:283}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getGridDataPMworkflowColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + "}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getGridDataPMworkflow = function (statusid, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " },{ \"ReportFieldId\": 4491, \"Value\":0},{ \"ReportFieldId\": 5873, \"Value\":0}]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.getGridDataSRworkflowColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + "}" }, this.listFieldObjWorkOrderUrl);
    };
    CommonReportService.prototype.getGridDataSRworkflow = function (statusid, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " }]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.getPrintSRFields = function () {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + "}" }, this.listFieldObjWorkOrderUrl);
    };
    CommonReportService.prototype.getPrintSRData = function (statusid, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " }]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.getUserAccessibleDrawingHavingDataForObjectCategory = function (objectCategoryId) {
        return this.postaction({ Input: "{}", objectCategoryId: objectCategoryId }, this.getUserAccessibleDrawingHavingDataForObjectCat);
    };
    CommonReportService.prototype.getAssetClassSelectionFieldsList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    CommonReportService.prototype.getAssetClassLookups = function (objectCategoryId, drawingIds, dataOption, classListOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.getAssetClassSelectionLookupUrl);
    };
    CommonReportService.prototype.getMonthlySummary = function () {
        return this.postaction({ Input: "{ FormId:" + this.pmSummaryFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 6573, \"Value\":\"3\", },{ \"FieldId\":1219,\"ReportFieldId\": 387, \"Value\":\"0\", }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getEquipmentForReport = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.pmSummaryFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbMulitObjectLookUpUrl);
    };
    CommonReportService.prototype.ddlRecurrencePattern = function () {
        return this.postaction({ Input: "{ FormId:291,ListLookupReportFieldIdValues:[{ \"FieldId\":1586,\"ReportFieldId\": 12097, \"Value\":\"2183\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getReportPrivilegeforUser = function (ModuleId, ReportDetailId, ReportCategoryId, CustomReportId, ReportFieldId) {
        return this.postaction({ Input: "{}", ModuleId: ModuleId, ReportDetailId: ReportDetailId, ReportCategoryId: ReportCategoryId, CustomReportId: CustomReportId, ReportFieldId: ReportFieldId }, this.checkReportPrivilegeforUser);
    };
    CommonReportService.prototype.getOrgLevelCustomizedName = function () {
        return this.postaction({}, this.getOrgLevelCustomName);
    };
    CommonReportService.prototype.getDetailsforCustomReport = function (dbObjectId, customReportId) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":147,\"Value\":\"" + customReportId + "\"}]}" }, this.dbObjectLookUpUrl);
    };
    CommonReportService.prototype.ddlLoadOrganizationalUnits = function () {
        return this.postaction({ Input: "{ FormId:367}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlgetSRStatusFields = function () {
        return this.postaction({ Input: "{ FormId:410}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlgetStatusLookups = function () {
        return this.postaction({ Input: "{ FormId:410}" }, this.getStatusLookups);
    };
    CommonReportService.prototype.ddlgetWorkTypeLookups = function (statusId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }]}" }, this.getWorkTypeLookups);
    };
    CommonReportService.prototype.ddlgetWorkTypeLookupsforEntityCategory = function (statusId, entityId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }, { \"ReportFieldId\": 6561, \"Value\":" + entityId + " }]}" }, this.getWorkTypeLookups);
    };
    CommonReportService.prototype.ddlgetSRActionTypeStatusFields = function () {
        return this.postaction({ Input: "{ FormId:415}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlgetActionPointLookups = function (worktypeid) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{\"ReportFieldId\":5829,\"Value\":\"0\"}, { \"ReportFieldId\": 5832, \"Value\":" + worktypeid + " }]}" }, this.getActionPointLookups);
    };
    CommonReportService.prototype.ddlgetPMStatusReportFields = function () {
        return this.postaction({ Input: "{ FormId:425}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlgetPMStatusReportLookups = function () {
        return this.postaction({ Input: "{ FormId:425}" }, this.getPMStatusReportLookups);
    };
    CommonReportService.prototype.ddlgetPMWorkTypeReportLookups = function (statusId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }]}" }, this.getPMWorkTypeReportLookups);
    };
    CommonReportService.prototype.getSRDailyReportFields = function () {
        return this.postaction({ Input: "{ FormId:451}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getPMDailyReportFields = function () {
        return this.postaction({ Input: "{ FormId:452}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getFirstLastdaysofWeekforReport = function () {
        return this.postaction({}, this.getFirstLastdaysofWeek);
    };
    CommonReportService.prototype.setFirstLastdaysofWeekforReport = function (FromDate, ToDate) {
        return this.postaction({ FromDate: FromDate, ToDate: ToDate }, this.setFirstLastdaysofWeek);
    };
    CommonReportService.prototype.getSRWeeklyReportFields = function () {
        return this.postaction({ Input: "{ FormId:493}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getPMWeeklyReportFields = function () {
        return this.postaction({ Input: "{ FormId:494}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getFirstLastdaysofMonthforReport = function (FromDate, ToDate) {
        return this.postaction({ FromDate: FromDate, ToDate: ToDate }, this.getFirstLastdaysofMonth);
    };
    CommonReportService.prototype.getSRFeedbackReportFields = function () {
        return this.postaction({ Input: "{ FormId:495}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getSRNumberRangeReportFields = function () {
        return this.postaction({ Input: "{ FormId:508}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getWorkTypesforWOScheduledforTodayReport = function (entityCategoryId) {
        return this.postaction({ Input: "{ FormId:517,ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId + "\", },]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getWorkTypesforforProductivityTechnicianReport = function (reportFieldId, entityCategoryId) {
        return this.postaction({ Input: "{ FormId:520,ListLookupReportFieldIdValues:[{ \"FieldId\":" + reportFieldId + ", \"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId + "\", }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.loadTradeLookupforWorkType = function (workTypeId, parentFieldId, entityCategoryId) {
        return this.postaction({ Input: "{FormId:520,Id:" + workTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + " }]}" }, this.lookupUrl);
    };
    CommonReportService.prototype.loadTechnicianLookupforWorkType = function (tradeId, workTypeId, parentFieldId, entityCategoryId) {
        return this.postaction({ Input: "{FormId:520,Id:" + tradeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + " }, { \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]}" }, this.lookupUrl);
    };
    CommonReportService.prototype.getWOCostDetailsReportFields = function () {
        return this.postaction({ Input: "{ FormId:521}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getGridDataPMWOCostDetailsReport = function (worktypeId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 4491, \"Value\":0},{ \"ReportFieldId\": 5873, \"Value\":" + worktypeId + "}]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.getGridDataSRWOCostDetailsReport = function (worktypeId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 6561, \"Value\":2},{ \"ReportFieldId\": 5873, \"Value\":" + worktypeId + " }]}" }, this.listDataListUrl);
    };
    CommonReportService.prototype.ddlCAILoadReportType = function () {
        return this.postaction({ Input: "{ FormId:531,ListLookupReportFieldIdValues:[{ \"FieldId\":2738,\"ReportFieldId\": 12097, \"Value\":\"4194\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getArchiveFields = function () {
        return this.postaction({ Input: "{FormId: 534}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.ddlArchiveReportType = function () {
        return this.postaction({ Input: "{ FormId:533,ListLookupReportFieldIdValues:[{ \"FieldId\":2743,\"ReportFieldId\": 12097, \"Value\":\"4199\" }]}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getArchiveName = function (target) {
        return this.postaction({ Input: "{FormId: 533}", TypeId: target }, this.getArchiveNameUrl);
    };
    CommonReportService.prototype.insertArchive = function (pageDetails, drawingIds) {
        return this.postaction({ Input: "{FormId: 533,ListReportFieldIdValues:" + pageDetails + "}", DrawingIds: drawingIds }, this.updateArchiveUrl);
    };
    CommonReportService.prototype.insertBuildingArchive = function (pageDetails) {
        return this.postaction({ Input: "{FormId: 534,ListReportFieldIdValues:" + pageDetails + ",Id:0}" }, this.submitAddUrl);
    };
    CommonReportService.prototype.archiveDateSelector = function () {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getArchiveSpaceDriverFields = function () {
        return this.postaction({ Input: "{FormId: 540 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getArchivesData = function (TypeId, ArchiveId, FromDate, ToDate, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: 540,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.getArchivesListUrl);
    };
    CommonReportService.prototype.UpdateSpaceArchive = function (strRptFields, selectedId, TypeId, ArchiveId, FromDate, ToDate) {
        return this.postaction({ Input: "{FormId: 543 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 540}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.updateSpaceArchivesUrl);
    };
    //loadSpaceArchiveEdit(selectedId: number) {
    //    return this.postaction({ Input: "{ FormId: 543,ParentFormId: 540,Id:" + selectedId + "}" }, this.editDataUrl);
    //}
    CommonReportService.prototype.getArchiveSpaceDriverEditFields = function () {
        return this.postaction({ Input: "{FormId: 543 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.UpdateBuildingStatusArchive = function (strRptFields, selectedId, TypeId, ArchiveId, FromDate, ToDate) {
        return this.postaction({ Input: "{FormId: 534 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 540}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.updateBuildingStatusArchivesUrl);
    };
    CommonReportService.prototype.getArchiveBuildingStatusEditFields = function () {
        return this.postaction({ Input: "{FormId: 534 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getAdditionalReportDetails = function (reportCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 3922, \"Value\":" + reportCategoryId + " }]}" }, this.getAdditionalReportDetailsUrl);
    };
    CommonReportService.prototype.getGetReportItemLookup = function (pageIndex, sortCol, sortDir) {
        var param = "{ FormId: 577, PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', ListReportFieldIdValues: [{ }]}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    };
    CommonReportService.prototype.getGetReportItemLookupFields = function () {
        return this.postaction({ Input: "{ FormId: 577 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.getFieldsforProceduresandStepsReport = function () {
        return this.postaction({ Input: "{ FormId: 594 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.loadEquipmentClassLookupforCategory = function (equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:594, Id:" + equipmentCategoryId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    CommonReportService.prototype.loadProcedureLookupforClassorCategory = function (equipmentClasId, equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:594, Id:" + equipmentClasId + ", ParentFieldId:" + parentFieldId + ", ListReportFieldIdValues:[{ \"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " }]}" }, this.lookupUrl);
    };
    CommonReportService.prototype.getFieldsforSchedulesbyEquipmentReport = function () {
        return this.postaction({ Input: "{ FormId: 602 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.loadEquipmentClassLookupforCategorySchedulesbyEquipment = function (equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:602, Id:" + equipmentCategoryId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    CommonReportService.prototype.loadEquipmentLookupforClassSchedulesbyEquipment = function (equipmentClasId, parentFieldId) {
        return this.postaction({ Input: "{FormId:602, Id:" + equipmentClasId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    CommonReportService.prototype.getFieldsforSchedulesbyDateRangeReport = function () {
        return this.postaction({ Input: "{ FormId: 604 }" }, this.listFieldObjUrl);
    };
    CommonReportService.prototype.loadAPUserLookupforWorkType = function (WorkTypeId, parentFieldId) {
        return this.postaction({ Input: "{FormId:604, Id:" + WorkTypeId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    CommonReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommonReportService);
    return CommonReportService;
}(HttpHelpers_1.HttpHelpers));
exports.CommonReportService = CommonReportService;
//# sourceMappingURL=common.service.js.map