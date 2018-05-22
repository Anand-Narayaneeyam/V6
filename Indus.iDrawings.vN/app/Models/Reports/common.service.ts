import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IField } from '../../Framework/Models//Interface/IField'
import { HttpHelpers } from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class CommonReportService extends HttpHelpers {

    private objectlistFieldObjUrl = 'Object/GetListAppFormFields';
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private reportFloorSelectionUrl = 'Report/GetUnlockedDrawingsforReportFloorSelection'
    private SpaceFunctionCustomizedName = 'Report/getSpaceFunctionCustomizedName'
    private forReportCriteria = 'Report/GetCriteriaforReportSelection'
    private EmployeeOccupancyFloorSelection = 'Report/GetEmployeeOccupancyDrawingList'
    private getDrawingsWithDataEmployee = 'Report/GetDrawingsWithDataforEmployeeReport'
    private getComponentCategoryObjectCategory = 'Object/GetComponentCategoryObjectCategory'
    private dbMulitObjectLookUpUrl = 'Common/GetMultiDatabyDBObject';
    private getUserAccessibleDrawingHavingDataForObjectCat = 'Report/GetUserAccessibleDrawingHavingDataForObjectCategory'
    private getAssetClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
    private fieldsList = 'Object/GetListAppFormFields';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
    private checkReportPrivilegeforUser = 'Report/CheckReportPrivilegeforUser';
    private listFieldObjWorkOrderUrl = 'WorkOrder/GetListAppFormFields';
    private getOrgLevelCustomName = 'Employee/GetOrganizationStructures';
    private getStatusLookups = 'Report/GetStatusLookups';
    private getWorkTypeLookups = 'Report/GetWorkTypeLookups';
    private getActionPointLookups = 'Report/GetActionPointLookups';
    private getPMStatusReportLookups = 'Report/GetPMStatusLookups';
    private getPMWorkTypeReportLookups = 'Report/GetPMWorkTypeLookups';
    private getFirstLastdaysofWeek = 'Report/GetFirstLastdaysofWeek';
    private setFirstLastdaysofWeek = 'Report/SetFirstLastdaysofWeek';
    private getFirstLastdaysofMonth = 'Report/GetFirstLastdaysofMonth';
    private getArchiveNameUrl = 'Space/GetNextArchiveName';
    private updateArchiveUrl = 'Space/InsertCAIArchive';
    private getArchivesListUrl = 'Space/GetArchiveList';
    private updateSpaceArchivesUrl = 'Space/CAIUpdateArchives';
    private updateBuildingStatusArchivesUrl = 'Space/CAIUpdateBuildingArchives';
    private getAdditionalReportDetailsUrl = 'Report/GetAdditionalReports';
   
    
    private SRandNPMFormId = 226;
    private objectClassSelectionFormId = 210;
    private pmSummaryFormId = 290;
    private listReviewPMWorkorderFormId = 262;

    







    constructor(private http: Http) {
        super(http);
    }    

    UserReportdate() {
        return this.postaction({ Input: "{ FormId:211}" }, this.listFieldObjUrl);
    }

    getReportFloorSelection() {
        return this.postaction({ Input: "{ ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"8\"}]}" }, this.reportFloorSelectionUrl);

    }

    ddlLoadUserStatus() {
        return this.postaction({ Input: "{ FormId:195,ListLookupReportFieldIdValues:[{ \"FieldId\":1085,\"ReportFieldId\": 12097, \"Value\":\"1387\" }]}" }, this.listFieldObjUrl);
    }

    ddlLoadReportCriteria() {
        return this.postaction({ Input: "{ FormId:245,ListLookupReportFieldIdValues:[{ \"FieldId\":1342,\"ReportFieldId\": 12097, \"Value\":\"1757\" }]}" }, this.listFieldObjUrl);
    }

    ddlLoadReportType() {
        return this.postaction({ Input: "{ FormId:255,ListLookupReportFieldIdValues:[{ \"FieldId\":1418,\"ReportFieldId\": 12097, \"Value\":\"1815\" }]}" }, this.listFieldObjUrl);
    }

    getSpaceFunctionCustomizedName() {
        return this.postaction({ }, this.SpaceFunctionCustomizedName);
    }

    criteriaforReport(Id: number) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.forReportCriteria);
    }

    getEmployeeOccupancyFloorSelection(Id: number) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.EmployeeOccupancyFloorSelection);

    }

    getDrawingsWithDataforEmployee(moduleId: number) {
        return this.postaction({ Input: "{}", ModuleId: moduleId }, this.getDrawingsWithDataEmployee);

    }

    getddlemployeemove() {
        return this.postaction({ Input: "{ FormId:272,ListLookupReportFieldIdValues:[{ \"FieldId\":1497,\"ReportFieldId\": 12097, \"Value\":\"1972\" }]}" }, this.listFieldObjUrl);
    }

    getOrganizationalUnitField() {
        return this.postaction({ Input: "{ FormId:275,ListLookupReportFieldIdValues:[{ \"FieldId\":1523,\"ReportFieldId\": 289, \"Value\":\"1\" }]}" }, this.listFieldObjUrl);
    }

    getEquipmentColumn(equipmentCategoryId: any) {
        return this.postaction({ Input: "{ FormId:278, BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory);

    }
    getEquipmentType(equipmentCategoryId: any, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:278,Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }

    getGridData(equipmentCategoryId: any, equipmentClassId: any, pageIndex?: number, sortCol?: any, sortDir?: any) {

        return this.postaction({ Input: "{FormId:278,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " },{ \"ReportFieldId\": 657, \"Value\":" + equipmentClassId + " }]}" }, this.listDataListUrl);
  
    }

    selectEntityCategory() {
        return this.postaction({ Input: "{ FormId:283}" }, this.listFieldObjUrl);
    }


    getGridDataPMworkflowColumns() {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + "}" }, this.listFieldObjUrl);
    }

    getGridDataPMworkflow(statusid: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " },{ \"ReportFieldId\": 4491, \"Value\":0},{ \"ReportFieldId\": 5873, \"Value\":0}]}" }, this.listDataListUrl);
    }



    getGridDataSRworkflowColumns() {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + "}" }, this.listFieldObjWorkOrderUrl);
    }

    getGridDataSRworkflow(statusid: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " }]}" }, this.listDataListUrl);
    }

    getPrintSRFields() {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + "}" }, this.listFieldObjWorkOrderUrl);
    }

    getPrintSRData(statusid: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusid + " }]}" }, this.listDataListUrl);
    }
    
    getUserAccessibleDrawingHavingDataForObjectCategory(objectCategoryId: number) {
        return this.postaction({ Input: "{}", objectCategoryId: objectCategoryId }, this.getUserAccessibleDrawingHavingDataForObjectCat);

    }

    getAssetClassSelectionFieldsList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getAssetClassLookups(objectCategoryId: any, drawingIds: string, dataOption: any, classListOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:" + this.objectClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.getAssetClassSelectionLookupUrl);
    }
    getMonthlySummary() {
        return this.postaction({ Input: "{ FormId:" + this.pmSummaryFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 6573, \"Value\":\"3\", },{ \"FieldId\":1219,\"ReportFieldId\": 387, \"Value\":\"0\", }]}" }, this.listFieldObjUrl);
    }

    getEquipmentForReport(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.pmSummaryFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbMulitObjectLookUpUrl);
    }

    ddlRecurrencePattern() {
        return this.postaction({ Input: "{ FormId:291,ListLookupReportFieldIdValues:[{ \"FieldId\":1586,\"ReportFieldId\": 12097, \"Value\":\"2183\" }]}" }, this.listFieldObjUrl);
    }
     
    getReportPrivilegeforUser(ModuleId: number, ReportDetailId: number, ReportCategoryId :number, CustomReportId : number, ReportFieldId :number) {
        return this.postaction({ Input: "{}", ModuleId: ModuleId, ReportDetailId: ReportDetailId, ReportCategoryId: ReportCategoryId, CustomReportId: CustomReportId, ReportFieldId: ReportFieldId }, this.checkReportPrivilegeforUser);
    } 

    getOrgLevelCustomizedName() {
        return this.postaction({}, this.getOrgLevelCustomName);
    }

    getDetailsforCustomReport(dbObjectId: number, customReportId: number) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":147,\"Value\":\"" + customReportId + "\"}]}" }, this.dbObjectLookUpUrl);
    }

    ddlLoadOrganizationalUnits() {
        return this.postaction({ Input: "{ FormId:367}" }, this.listFieldObjUrl);
    }

    ddlgetSRStatusFields() {
        return this.postaction({ Input: "{ FormId:410}" }, this.listFieldObjUrl);
    }
    ddlgetStatusLookups() {
        return this.postaction({ Input: "{ FormId:410}"  }, this.getStatusLookups);
    }
    ddlgetWorkTypeLookups(statusId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }]}" }, this.getWorkTypeLookups);
    }
    ddlgetWorkTypeLookupsforEntityCategory(statusId: number, entityId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }, { \"ReportFieldId\": 6561, \"Value\":" + entityId + " }]}" }, this.getWorkTypeLookups);
    }
    ddlgetSRActionTypeStatusFields() {
        return this.postaction({ Input: "{ FormId:415}" }, this.listFieldObjUrl);
    }
    ddlgetActionPointLookups(worktypeid: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{\"ReportFieldId\":5829,\"Value\":\"0\"}, { \"ReportFieldId\": 5832, \"Value\":" + worktypeid + " }]}" }, this.getActionPointLookups);
    }

    ddlgetPMStatusReportFields() {
        return this.postaction({ Input: "{ FormId:425}" }, this.listFieldObjUrl);
    }
    ddlgetPMStatusReportLookups() {
        return this.postaction({ Input: "{ FormId:425}" }, this.getPMStatusReportLookups);
    }    
    ddlgetPMWorkTypeReportLookups(statusId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " }]}" }, this.getPMWorkTypeReportLookups);
    }
    getSRDailyReportFields() {
        return this.postaction({ Input: "{ FormId:451}" }, this.listFieldObjUrl);
    }
    getPMDailyReportFields() {
        return this.postaction({ Input: "{ FormId:452}" }, this.listFieldObjUrl);
    }
    getFirstLastdaysofWeekforReport() {
        return this.postaction({}, this.getFirstLastdaysofWeek);        
    }
    setFirstLastdaysofWeekforReport(FromDate: any, ToDate: any) {
        return this.postaction({ FromDate: FromDate, ToDate: ToDate }, this.setFirstLastdaysofWeek);
    }
    getSRWeeklyReportFields() {
        return this.postaction({ Input: "{ FormId:493}" }, this.listFieldObjUrl);
    }
    getPMWeeklyReportFields() {
        return this.postaction({ Input: "{ FormId:494}" }, this.listFieldObjUrl);
    }
    getFirstLastdaysofMonthforReport(FromDate: any, ToDate: any) {
        return this.postaction({ FromDate: FromDate, ToDate: ToDate }, this.getFirstLastdaysofMonth);
    }
    getSRFeedbackReportFields() {
        return this.postaction({ Input: "{ FormId:495}" }, this.listFieldObjUrl);
    }
    getSRNumberRangeReportFields() {
        return this.postaction({ Input: "{ FormId:508}" }, this.listFieldObjUrl);
    }
    getWorkTypesforWOScheduledforTodayReport(entityCategoryId: any) {
        return this.postaction({ Input: "{ FormId:517,ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId +"\", },]}" }, this.listFieldObjUrl);
    }

    getWorkTypesforforProductivityTechnicianReport(reportFieldId: any, entityCategoryId: any) {
        return this.postaction({ Input: "{ FormId:520,ListLookupReportFieldIdValues:[{ \"FieldId\":" + reportFieldId + ", \"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId + "\", }]}" }, this.listFieldObjUrl);
    }

    loadTradeLookupforWorkType(workTypeId: number, parentFieldId: number, entityCategoryId: number) {
        return this.postaction({ Input: "{FormId:520,Id:" + workTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + " }]}" }, this.lookupUrl);
    }

    loadTechnicianLookupforWorkType(tradeId: number, workTypeId: number, parentFieldId: number, entityCategoryId: number) {
        return this.postaction({ Input: "{FormId:520,Id:" + tradeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + " }, { \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]}" }, this.lookupUrl);
    }
    getWOCostDetailsReportFields() {
        return this.postaction({ Input: "{ FormId:521}" }, this.listFieldObjUrl);
    }
    getGridDataPMWOCostDetailsReport(worktypeId: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 4491, \"Value\":0},{ \"ReportFieldId\": 5873, \"Value\":" + worktypeId + "}]}" }, this.listDataListUrl);
    }
    getGridDataSRWOCostDetailsReport(worktypeId: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.SRandNPMFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 6561, \"Value\":2},{ \"ReportFieldId\": 5873, \"Value\":" + worktypeId + " }]}" }, this.listDataListUrl);
    }
    ddlCAILoadReportType() {
        return this.postaction({ Input: "{ FormId:531,ListLookupReportFieldIdValues:[{ \"FieldId\":2738,\"ReportFieldId\": 12097, \"Value\":\"4194\" }]}" }, this.listFieldObjUrl);
    }
    getArchiveFields() {
        return this.postaction({ Input: "{FormId: 534}" }, this.listFieldObjUrl);
    }
    ddlArchiveReportType() {
        return this.postaction({ Input: "{ FormId:533,ListLookupReportFieldIdValues:[{ \"FieldId\":2743,\"ReportFieldId\": 12097, \"Value\":\"4199\" }]}" }, this.listFieldObjUrl);
    }
    getArchiveName(target: string) {
        return this.postaction({ Input: "{FormId: 533}", TypeId: target }, this.getArchiveNameUrl);

    }
    insertArchive(pageDetails: any, drawingIds) {
        return this.postaction({ Input: "{FormId: 533,ListReportFieldIdValues:" + pageDetails + "}", DrawingIds: drawingIds }, this.updateArchiveUrl);
    }
    insertBuildingArchive(pageDetails: any) {
        return this.postaction({ Input: "{FormId: 534,ListReportFieldIdValues:" + pageDetails + ",Id:0}" }, this.submitAddUrl);
    }
    archiveDateSelector() {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    }
    getArchiveSpaceDriverFields() {
        return this.postaction({ Input: "{FormId: 540 }" }, this.listFieldObjUrl);
    }
    getArchivesData(TypeId: number, ArchiveId: number, FromDate: any, ToDate: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: 540,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.getArchivesListUrl);
    }
    UpdateSpaceArchive(strRptFields: string, selectedId: number, TypeId: number, ArchiveId: number, FromDate: any, ToDate: any) {
        return this.postaction({ Input: "{FormId: 543 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 540}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.updateSpaceArchivesUrl);
    }
    //loadSpaceArchiveEdit(selectedId: number) {
    //    return this.postaction({ Input: "{ FormId: 543,ParentFormId: 540,Id:" + selectedId + "}" }, this.editDataUrl);
    //}
    getArchiveSpaceDriverEditFields() {
        return this.postaction({ Input: "{FormId: 543 }" }, this.listFieldObjUrl);
    }
    UpdateBuildingStatusArchive(strRptFields: string, selectedId: number, TypeId: number, ArchiveId: number, FromDate: any, ToDate: any) {
        return this.postaction({ Input: "{FormId: 534 ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId: 540}", typeId: TypeId, archiveId: ArchiveId, fromDate: FromDate, toDate: ToDate }, this.updateBuildingStatusArchivesUrl);
    }
    getArchiveBuildingStatusEditFields() {
        return this.postaction({ Input: "{FormId: 534 }" }, this.listFieldObjUrl);
    }
    getAdditionalReportDetails(reportCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\": 3922, \"Value\":" + reportCategoryId + " }]}" }, this.getAdditionalReportDetailsUrl);
    }
    getGetReportItemLookup(pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: 577, PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', ListReportFieldIdValues: [{ }]}";
        return this.postaction({ Input: param }, this.listDataListUrl);
    }
    getGetReportItemLookupFields() {
        return this.postaction({ Input: "{ FormId: 577 }" }, this.listFieldObjUrl);
    }

    getFieldsforProceduresandStepsReport() {
        return this.postaction({ Input: "{ FormId: 594 }" }, this.listFieldObjUrl);
    }
    loadEquipmentClassLookupforCategory(equipmentCategoryId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:594, Id:" + equipmentCategoryId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }
    loadProcedureLookupforClassorCategory(equipmentClasId: number, equipmentCategoryId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:594, Id:" + equipmentClasId + ", ParentFieldId:" + parentFieldId + ", ListReportFieldIdValues:[{ \"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " }]}" }, this.lookupUrl);
    }

    getFieldsforSchedulesbyEquipmentReport() {
        return this.postaction({ Input: "{ FormId: 602 }" }, this.listFieldObjUrl);
    }
    loadEquipmentClassLookupforCategorySchedulesbyEquipment(equipmentCategoryId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:602, Id:" + equipmentCategoryId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }
    loadEquipmentLookupforClassSchedulesbyEquipment(equipmentClasId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:602, Id:" + equipmentClasId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }

    getFieldsforSchedulesbyDateRangeReport() {
        return this.postaction({ Input: "{ FormId: 604 }" }, this.listFieldObjUrl);
    }
    loadAPUserLookupforWorkType(WorkTypeId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:604, Id:" + WorkTypeId + ", ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }
}