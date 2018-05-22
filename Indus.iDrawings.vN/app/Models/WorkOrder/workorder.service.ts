import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class WorkOrdereService extends HttpHelpers {
    //All general functions 
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private CheckFieldValueExist = 'Object/GetAttributeldHaveLookUpValues';
    private checkIsInUse = 'Object/CheckAttributeIdIsInUse';
    private getWhitelistUrl = 'Common/GetWhiteListDetails';
    private getFieldFormatListUrl = 'Common/GetFieldFormatDetails';
    private SearchedEquipmentsTypeForList = 'WorkOrder/GetSearchedEquipmentsTypeForList';
    private InsertRouteEquipments = 'WorkOrder/InsertRouteEquipments';
    private saveWorkFlowEntityUrl = 'WorkOrder/SaveWorkflowEntityData';
    private saveWorkFlowDocumentDataUrl = 'WorkOrder/DocumentEntityInputData';
    private getSessionValues = 'Common/GetSessionValues';
    private WorkFlowPermissionUrl = 'WorkOrder/GetWorkFlowActionPointPermissions';
    private getEquipmentTypeforPartsUrl = 'WorkOrder/GetEquipmentTypesForPart';
    private CheckInUseHoldReasons = 'WorkOrder/CheckInUseHoldReasons';
    private getWorkTypeUrl = 'WorkOrder/GetFieldsforWorkOrderReview'
    private getActionPointUserLookupUrl = 'WorkOrder/GetActionPointUsers';
    private checkProcedureinUse = 'WorkOrder/CheckPMProcedureInUse';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
    private fieldsList = 'Object/GetListAppFormFields';
    private GetEquipmentClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
    private GetAdvancedSearchLookupUrl = 'Objects/GetAdvancedSerachLookups';
    private getObjectAttributeSearchFieldListUrl = 'WorkOrder/GetObjectAttributeSearchFieldList';
    private saveWorkflowEntityCostItemsurl = 'WorkOrder/SaveWorkflowEntityCostItems';
    private saveWorkFlowEntityMultipleCostUrl = 'WorkOrder/SaveMultipleWorkflowEntityCostItems';
    private saveWorkFlowEntityEquipmentUrl = 'WorkOrder/EquipmentEntityInputData';
    private getAutoPopulatedTimeSpentValueUrl = 'WorkOrder/GetAutoPopulatedTimeSpentInHours';
    private deleteMultipleWorkflowEntityCostItemsUrl = 'WorkOrder/DeleteMultipleWorkflowEntityCostItems';
    private checkDocumentFileDataValidUrl = 'WorkOrder/CheckDocumentFileData';
    private reviewDocumentDownloadUrl = 'WorkOrder/DocumentFileDownload'
    private getCostDetailsUrl = 'WorkOrder/GetCostDetails';
    private equipmentAdvancedSearchUrl = 'Object/GetAdvancedSerachLookups';
    private getEquipmentSearchListFieldListUrl = 'Object/GetListAppFormFields';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private getKeyWordSearchForWorkOrders = 'WorkOrder/GetKeyWordSearchForWorkOrders';
    private getAdvanceSearchForWorkOrders = 'WorkOrder/GetAdvanceSearchForWorkOrders';
    private getRequesterDetailsUrl = 'WorkOrder/GetRequesterDetails';
    private getParentChildEntityDetailsUrl = 'WorkOrder/GetParentChildEntityDetails';

    private InsertProcedureJobStep = 'WorkOrder/InsertPMProcedureJobStep';
    private UpdateProcedureJobStep = 'WorkOrder/UpdatePMProcedureJobStep';
    private InsertProcedureSafetyStep = 'WorkOrder/InsertPMProcedureSafetyStep';
    private UpdateProcedureSafetyStep = 'WorkOrder/UpdatePMProcedureSafetyStep';

    private listFieldObjWorkOrderUrl = 'WorkOrder/GetListAppFormFields';
    private addDataWorkOrderUrl = 'WorkOrder/GetAddAppFormFields';
    private editDataWorkOrderUrl = 'WorkOrder/GetEditAppFormFields';
    private generateWorkOrderUrl = 'WorkOrder/InsertPMScheduleWorkOrders';

    private insertUpdatePMUrl = 'WorkOrder/InsertUpdatePM';
    private equipmentCategoryUrl = 'WorkOrder/GetEquipmentCategoryforPM';
    private equipmentClassesUrl = 'WorkOrder/GetEquipmentClassesforPM';
    private equipmentUrl = 'WorkOrder/GetEquipmentforPM';
    private routeEquipmentUrl = 'WorkOrder/GetRouteEquipmentforPM';
    private masterPMLookUpUrl = 'WorkOrder/GetPMTemplatesForPM';
    private masterPMDetailsUrl = 'WorkOrder/GetMasterPMDetailsforPM';
    private seasonsLookUpUrl = 'WorkOrder/GetSeasonsForPM';
    private weekDaysLookUpUrl = 'WorkOrder/GetWeekDaysForPM';
    private deleteMultiplePMUrl = 'WorkOrder/DeletePMForMultiple';

    private checkMasterPMInUseUrl = 'WorkOrder/CheckPMTemplateInUse';

    private insertUpdatePMTemplateUrl = 'WorkOrder/InsertUpdatePMTemplate';
    private CheckAttributeLookupValueInUseurl = "Object/CheckAttributeLookupValueInUse";
    private getComponentCategoryObjectCategory = 'Object/GetComponentCategoryObjectCategory'
    private checkPMsProceduresInUse = 'WorkOrder/CheckPMsProceduresInUse'
    private checkPMTemplateProceduresInUse = 'WorkOrder/CheckPMTemplateProceduresInUse'
    private PrivilegesOfMultiplePagesForUser = 'Common/GetPrivilegesOfMultiplePagesForUser'
    private checkMailDomains = 'User/CheckdomainValidations';
    private CheckInUseContractor = 'WorkOrder/CheckContractorInUse';
    private workOrderCalenderList = 'WorkOrder/GetCalendarInformation';
    private workOrderGetMaxLength = 'WorkOrder/GetAttributeLength';
    private checkEquipmentinUse = 'WorkOrder/CheckEquipmentInUse';
    private generateWorkOrderListFields = 'WorkOrder/GetAddAppFormFields';
    private customerFeatures = 'Common/GetSubscribedFeatures';
    private CheckTechniciansInUse = 'WorkOrder/CheckTechnicianInUse';
    private CheckTradeInUse = 'WorkOrder/CheckTradeInUse';
    private CheckManufacturerInUse = 'WorkOrder/CheckManufacturerInUse';
    private CheckItemIdInUse = 'WorkOrder/CheckItemIdInUse';
    private CheckRouteInUse = 'WorkOrder/CheckRouteInUse';
    private UpdateMultipleCompleteorClose = 'WorkOrder/UpdateMultipleCompleteorClose';
    private CheckConditionforMultipleCompleteorClose = 'WorkOrder/CheckConditionforMultipleCompleteorClose';
    private NextActionPointDetails = 'WorkOrder/GetNextActionPointDetails';
    private insertWorkFlowEntityTeamMembersUrl = 'WorkOrder/InsertWorkFlowEntityTeamMembers';
    private deleteWorkFlowEntityTeamMembersUrl = 'WorkOrder/DeleteWorkFlowEntityTeamMembers';
    //  private OverrideToSelectedActionPoint = 'WorkOrder/OverrideToSelectedActionPoint';

    //Dashboards
    // GetNonPMWOStatusForDashBoard
    // GetOpenedRequestAndNonPMWOAgingForDashBoard
    private getNonPMWOStatusForDashBoard = 'WorkOrder/GetNonPMWOStatusForDashBoard';
    private getOpenedRequestAndNonPMWOAgingForDashBoard = 'WorkOrder/GetOpenedRequestAndNonPMWOAgingForDashBoard';
    private getPMWOStatusForDashBoard = 'WorkOrder/GetPMWOStatusForDashBoard';
    private getOpenedPMWOAgingForDashBoard = 'WorkOrder/GetOpenedPMWOAgingForDashBoard';
    private OverrideToSelectedActionPoint = 'WorkOrder/OverrideToSelectedActionPoint';
    private ReminderData = 'WorkOrder/GetReminderData';
    private SendReminderData = 'WorkOrder/ReminderNotification';
    private listSpacefieldUrl = 'WorkFlow/GetWorkTypeSpaceFields';
    private getUpdateRuleEdit = 'WorkFlow/GetWorkflowEntityRelationships';
    private submitUpdateRuleEdit = 'WorkFlow/UpdateRule';
    private SelectedActionPointsForRule = 'WorkOrder/GetSelectedActionPointsForRule';
    private ChargebackLookupUrl = 'WorkOrder/GetChargebackLookup';
    private workorderDetailsUrl = 'WorkOrder/GetWorkOrderDetails';
    private updateJobStepsOrderUrl = 'WorkOrder/UpdateJobStepOrder';
    private updateSafetyStepsOrderUrl = 'WorkOrder/UpdateSafetyStepOrder';
    private ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetails';

    private tradesFrmId = 179;
    private contractorsFormId = 187;
    private manufacturersFormId = 189;
    private techniciansFormId = 191;
    private techniciansAddEditFormId = 192;
    private partsFormId = 201;
    private partsAddEditFormId = 202;
    private toolsFormId = 209;

    private masterPMSchedulesListFormId = 198;
    private masterPMScheduleAddEditFormId = 279;

    private priorityListFormId = 217;
    private priorityAddEditFormId = 219;

    private pmScheduleTypesListFormId = 239;
    private pmschedulesListFormId = 215;
    private pmschedulesAddEditFormId = 238;

    private holdReasonListFormId = 221;
    private associateEquipmentClassFormId = 225;

    private additionalDataFieldsFormId = 224;
    private addlDataFieldAddEditFormId = 227;
    private routesFormId = 235;
    private fieldValueListFormId = 234;
    private workFlowEntityDataFormId = 241;

    private serviceRequestFormId = 226;
    private reviewServiceRequestFormId = 228;
    private ListRequestDocumentsFormId = 237;
    private UploadDocumentsFormId = 240;
    private listReviewTechnicianFormId = 249;
    private listReviewPartsFormId = 250;
    private listReviewToolsFormId = 251;
    private listReviewOtherCostFormId = 252;
    private reviewTechnicianAddFormId = 254;
    private reviewPartsAddFormId = 256;
    private reviewToolsAddFromId = 257;
    private reviewOtherCostsAddFormId = 259;
    private reviewEquipmentListFormId = 297;
    private equipmentClassSelectionFormId = 210;
    private equipmentAdvancedSearchFormId = 308;
    private equipmentSearchListFormId = 327;
    private serviceRequestAdvancedSearchFormid = 336;
    private pmWorkOrderAdvancedSearchFormId = 337;
    private serviceRequestKeywordSearchFormid = 338;
    private pmWorkOrderKeywordSearchFormId = 339;
    private listTeamMembersFormId = 429;
    private objectDataListFormId = 207;

    private completeCloseRequestFormId = 282;
    private OverrideRequestFormId = 375;
    private listTrackRequestFormId = 293;

    private listReviewPMWorkorderFormId = 262;
    private reviewPMWorkOrderFormId = 285;

    private equipmentListFormId = 242;
    private newEquipmentListFormId = 247;
    private addEditAssociateEquipmentClassFormId = 258;
    private generateWorkOrder = 260;
    private proceduresListFormId = 263;
    private procedureAddEditFormId = 265;
    private procedureAECListFormId = 267;
    private procedureAECAddDeleteFormId = 268;
    private procedureJobStepsListFormId = 270;
    private procedureSafetyStepsListFormId = 271;
    private generateWorkOrderList = 264;
    private emailRecipientFormId = 274;
    private iDrawingsUsersFormId = 277;
    private contractorsListFormId = 280;
    private techniciansListFormId = 281;
    private pmprocedureListFormId = 292;
    private pmprocedureAddEditFormId = 294
    private masterpmprocedureListFormId = 295
    private masterpmprocedureAddEditFormId = 296;
    private GetReminderDatasFormId = 385;

    private SetWorkTypeSpaceFieldFormId = 432;

    private SetRuleFieldsFormId = 433;
    private ReviewHistoryFormId = 441;
    private chargebackListFormId = 550;
    private AssingWTtoSiteFormId = 557;
    private AssignEquipmentCalendarListFormId = 567;
    private AssignEquipmentUpdateFormId = 568;
    private SpaceValidationUrl = 'WorkOrder/SpaceValidation';
    //---------------------------------

    constructor(private http: Http) {
        super(http);
    }

    getTradesFields() {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + "}" }, this.listFieldObjUrl);
    }
    getTradesData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        /* return this.postaction({ Input: "{FormId:" + this.tradesFrmId + "}" }, this.listDataListUrl); */
        return this.postaction({ Input: "{ FormId: " + this.tradesFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    loadTradesAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.tradesFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.tradesFrmId + ",ParentFormId:" + this.tradesFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    AddUpdateTrade(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tradesFrmId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.tradesFrmId + "}" }, this.submitEditUrl);
        }
    }

    postEditTradesDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }
    postAddTradesDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }
    postTradesDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    checkTradeIsInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",Id:" + id + "}" }, this.CheckTradeInUse);
    }

    sortTrades(direction: any, column: any) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
    }

    //Contractors Begin
    getContractorsField() {
        return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + " }" }, this.listFieldObjUrl);
    }

    getContractorsData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    loadContractorsAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + ",ParentFormId:" + this.contractorsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    InlineAddUpdateContractors(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }


    AddUpdateContractors(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.contractorsFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.contractorsFormId + "}" }, this.submitEditUrl);
        }

    }

    deleteContractors(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }
    checkContractorIsInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:" + id + "}" }, this.CheckInUseContractor);
    }
    //Contractors End
    //Manufacturers Begin
    getManufacturersField() {
        return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + " }" }, this.listFieldObjUrl);
    }

    getManufacturersData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    loadManufacturersAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + ",ParentFormId:" + this.manufacturersFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    InlineAddUpdateManufacturers(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }


    AddUpdateManufacturers(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.manufacturersFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.manufacturersFormId + "}" }, this.submitEditUrl);
        }

    }
    checkManufacturerIsInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:" + id + "}" }, this.CheckManufacturerInUse);
    }

    deleteManufacturers(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }
    //Manufacturers End
    //Technicians Begin
    getTechniciansColumns() {
        return this.postaction({ Input: "{ FormId:" + this.techniciansFormId + " }" }, this.listFieldObjUrl);
    }

    getTechniciansData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.techniciansFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    loadTechnicianAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.techniciansAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.techniciansAddEditFormId + ",ParentFormId:" + this.techniciansFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    AddUpdateTechnicians(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.techniciansAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.techniciansFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.techniciansAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.techniciansFormId + "}" }, this.submitEditUrl);
        }
    }

    deleteTechnicians(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.techniciansFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }

    checkTechniciansIsInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.techniciansFormId + ",Id:" + id + "}" }, this.CheckTechniciansInUse);
    }

    InlineAddUpdateTechnicians(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.techniciansFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.techniciansFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    //Technicians End
    //Parts Begin
    getPartsFields() {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + "}" }, this.listFieldObjUrl);
    }
    getPartsData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    postAddPartsDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditPartsDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeletePartsDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    loadPartAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.partsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.partsFormId + ",ParentFormId:" + this.partsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdatePart(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }
    checkItemIdIsInUse(id: any, option: any) {//for Part,Tool
        if (option == 4)
            return this.postaction({ Input: "{FormId:" + this.partsFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
        if (option == 3)
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
        if (option == 5)
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
    }
    //Parts End
    //Parts-AssociateEquipmentClass Begin
    getAECField() {
        return this.postaction({ Input: "{FormId:" + this.associateEquipmentClassFormId + "}" }, this.listFieldObjUrl);
    }
    getAssociateEquipmentClassData(selectedId: number, index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.associateEquipmentClassFormId + ",Id:" + selectedId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5510,\"Value\":" + selectedId + "}]}" }, this.listDataListUrl);
    }
    getNewAssociateEquipmentColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.addEditAssociateEquipmentClassFormId + " }" }, this.listFieldObjUrl);
    }
    getNewAssociateEquipmentData(index: number, column: string, direction: string, equipmentCategoryId: any, equipmentTypeId: any, equipmentId: number) {
        return this.postaction({ Input: "{FormId:" + this.addEditAssociateEquipmentClassFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: ''}", EquipmentCategory: equipmentCategoryId, PartId: equipmentId, Target: 0 }, this.getEquipmentTypeforPartsUrl);
    }
    postSubmitActionAssociateEquipment(selectedRowIds, selectedId) { // submit
        return this.postaction({ Input: "{ FormId:" + this.addEditAssociateEquipmentClassFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitAddUrl);//this.submitAddUrl//this.InsertRouteEquipments
    }
    postAssociateEquipmentDelete(fieldobj: any, selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.addEditAssociateEquipmentClassFormId + " ,Id:" + selectedId + ",ListReportFieldIdValues:" + fieldobj + "}" }, this.deleteUrl);
    }
    //Parts-AssociateEquipmentClass End
    //Tools Begin
    getToolsFields() {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + "}" }, this.listFieldObjUrl);
    }
    getToolsData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    loadToolAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.toolsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.toolsFormId + ",ParentFormId:" + this.toolsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateTools(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postAddToolsDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditToolsDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteToolsDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    //Tools End
    //Master PM Schedules Begins
    getMasterPMScheduleColumns() {
        return this.postaction({ Input: "{ FormId:" + this.masterPMSchedulesListFormId + " }" }, this.listFieldObjUrl);
    }

    getMasterPMScheduleData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.masterPMSchedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    loadMasterPMAddFields() {
        return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1534,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1534,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" }, { \"FieldId\":1382,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.addDataUrl);
    }

    loadMasterPMEditFields(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1534,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1534,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1382,\"ReportFieldId\": 5605, \"Value\": " + selectedId + " }, { \"FieldId\":1543,\"ReportFieldId\": 5605, \"Value\": " + selectedId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }

    loadEquipmentClassForMasterPM(equipmentCategoryId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:" + this.masterPMScheduleAddEditFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }

    loadMeterFieldForMasterPM(equipmentClassId: number, parentFieldId: number, equipmentCategoryId: number) {
        return this.postaction({ Input: "{FormId:" + this.masterPMScheduleAddEditFormId + ",Id:" + equipmentClassId + ",ParentFieldId:" + parentFieldId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1563,\"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " }]}" }, this.lookupUrl);
    }

    postSubmitMasterPMSchedule(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", IsAdd: 1 }, this.insertUpdatePMTemplateUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", IsAdd: 0 }, this.insertUpdatePMTemplateUrl);
        }
    }

    checkMasterPMScheduleInUse(selectedIds: any) {
        return this.postaction({ input: "{ FormId:" + this.masterPMSchedulesListFormId + ",Id:" + selectedIds + "}" }, this.checkMasterPMInUseUrl)
    }

    postDeleteMasterPMSchedule(selectedIds: any) {
        return this.postaction({ Input: "{ FormId:" + this.masterPMSchedulesListFormId + ",Id:" + selectedIds + "}" }, this.deleteUrl)
    }


    //Master PM Schedules End
    //Proirity Begin
    getPriorityFields() {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + "}" }, this.listFieldObjUrl);
    }
    getPriorityData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    postAddPriorityDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditPriorityDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeletePriorityDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    loadPriorityAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.priorityListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.priorityListFormId + ",ParentFormId:" + this.priorityListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdatePriority(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }

    //Priority End
    //HoldReason Begin
    getHoldReasonFields() {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + "}" }, this.listFieldObjUrl);
    }
    getHoldReasonData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    loadHoldReasonAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.holdReasonListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.holdReasonListFormId + ",ParentFormId:" + this.holdReasonListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateReasons(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }
    postAddHoldReasonDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditHoldReasonDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteHoldReasonDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    checkHoldReasonIsInUse(id: any) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",Id:" + id + "}" }, this.CheckInUseHoldReasons);
    }
    //HoldReason End

    //PM Schedules Services Begin
    pmScheduleTypesFields() {
        return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1322,\"ReportFieldId\": 571, \"Value\": 0 }]}" }, this.listFieldObjUrl);
    }

    loadEquipmentCategory(siteId: number, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + siteId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }

    loadEquipmentClass(siteId: number, parentFieldId: number, equipmentCategoryId: number) {
        if (siteId == 0 || siteId == undefined) {
            return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1323,\"ReportFieldId\": 571, \"Value\": 0 }]}" }, this.lookupUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1323,\"ReportFieldId\": 571, \"Value\":" + siteId + "}]}" }, this.lookupUrl);
        }
    }

    getPMListFields() {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + "}" }, this.listFieldObjUrl);
    }

    getPMListData(pageIndex: number, sortCol: string, sortDir: string, equipmentCategoryId: any, equipmentClassId: any, routeId: any, siteId: any) {
        if (equipmentCategoryId > -1 && equipmentClassId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        } else if (routeId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\": 0 },{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\":" + routeId + "}, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        } else if (equipmentCategoryId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\": 0 },{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        }
    }

    loadPMAddFields(siteId: any, equipmentCategoryId: any, routeId: any) {
        if (equipmentCategoryId > -1 && siteId <= -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        } else if (equipmentCategoryId > -1 && siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        } else if (routeId > -1 && siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": " + siteId + " },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        } else if (routeId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        } else if (siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " }, { \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        } else {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        }
    }

    loadPMEditFields(selectedId: any, siteId: any) {
        debugger
        if (siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1415,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }, { \"FieldId\":1423,\"ReportFieldId\": 5563, \"Value\": " + selectedId + " }, {  \"FieldId\":1423,\"ReportFieldId\": 271, \"Value\": 9 }, { \"FieldId\":1423,\"ReportFieldId\": 6573, \"Value\": 3 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        } else {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1415,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }, { \"FieldId\":1423,\"ReportFieldId\": 5563, \"Value\": " + selectedId + " }, { \"FieldId\":1423,\"ReportFieldId\": 271, \"Value\": 9 }, { \"FieldId\":1423,\"ReportFieldId\": 6573, \"Value\": 3 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    loadEquipmentCategoryForPM(siteId: number, masterPMId: any) {
        if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": 0 }, { \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentCategoryUrl);
        } else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentCategoryUrl);
        } else if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentCategoryUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": 0 }, { \"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentCategoryUrl);
        }
    }

    loadEquipmentClassForPM(equipmentCategoryId: number, siteId: number, masterPMId: any) {
        if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentClassesUrl);
        } else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentClassesUrl);
        } else if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentClassesUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentClassesUrl);
        }
    }

    loadMeterFieldForPM(parentFieldId: number, equipmentClassId: number, equipmentCategoryId: number) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",Id:" + 0 + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1404,\"ReportFieldId\": 4485, \"Value\":" + equipmentCategoryId + " },{ \"FieldId\":1404,\"ReportFieldId\": 657, \"Value\":" + equipmentClassId + " }]}" }, this.lookupUrl);
    }

    loadActionPointUser(workTypeId: number, parentFieldId: number,siteId) {
        return this.postaction({
            Input: "{FormId:" + this.pmschedulesAddEditFormId + ",Id:" + workTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5563, \"Value\": 0 }, { \"ReportFieldId\": 271, \"Value\": 9 }, { \"ReportFieldId\": 6573, \"Value\": 3 }, { \"ReportFieldId\": 12449, \"Value\": " + siteId + " }]}"}, this.lookupUrl);
    }

    loadEquipmentNoForPM(equipmentClassId: number, siteId: number, masterPMId: any) {
        if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        } else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        } else if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        }
    }

    getMasterPMSchedule(masterPMId: any) {
        return this.postaction({ Input: "{ FormId: " + this.pmschedulesAddEditFormId + ",Id: " + masterPMId + " }" }, this.masterPMDetailsUrl);
    }

    loadWeekDaysForPM(masterPMId: any) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.weekDaysLookUpUrl);
    }

    loadSeasonsForPM(masterPMId: any) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.seasonsLookUpUrl);
    }

    //loadRouteEquipmentNoForPM(routeId: any) {
    //    return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5570, \"Value\": " + routeId + " }]}" }, this.routeEquipmentUrl);
    //}

    loadMasterPM(strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.masterPMLookUpUrl);
    }

    loadRouteEquipmentNoForPM(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    postSubmitPMSchedule(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ParentFormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", IsAdd: 1 }, this.insertUpdatePMUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ParentFormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", IsAdd: 0 }, this.insertUpdatePMUrl);
        }
    }

    postDeletePMSchedule(selectedIds: any) {
        return this.postaction({ input: "{FormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues:" + selectedIds + "}" }, this.deleteMultiplePMUrl)
    }

    //Additional Data Fields Begin
    getAddtlDataFieldField() {
        return this.postaction({ Input: "{ FormId:" + this.additionalDataFieldsFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 5854, \"Value\":\"9\" },{ \"FieldId\":1219,\"ReportFieldId\": 5875, \"Value\":\"0\" },{ \"FieldId\":1219,\"ReportFieldId\": 5873, \"Value\":\" \" }]}" }, this.listFieldObjUrl);
    }

    getAddtlDataFieldData(workTypeId: any, objectCategoryId: any, index: number, direction: any, column: any) {
        // return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);

        return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5871,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":67,\"Value\":\"" + objectCategoryId + "\"}],SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex:" + index + "}" }, this.listDataListUrl);
    }

    addAddlDataField(formObject: IField[]) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",ParentFormId:" + this.additionalDataFieldsFormId + "}" }, this.submitAddUrl);
    }

    loadAddlDataFieldAddEdit(selectedId: number, addEdit: string, categoryid: any) {
        //return this.getaction<Observable<any>>(this.addlDatafieldFieldsAddEdit)
        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:" + JSON.stringify(categoryid) + " }" }, this.editDataUrl);
        }
    }

    deleteAddtlDataField(selectedID: any) {
        return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)

    }

    updateAddlDataField(formObject: IField[], id: any) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",Id:" + id + ",ParentFormId:" + this.additionalDataFieldsFormId + "}" }, this.submitEditUrl);
    }

    AdditionalDataFieldHaveLookUp(Id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + Id + "}" }, this.CheckFieldValueExist);
    }
    CheckisinUse(fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.checkIsInUse);

    }

    getFieldValuesData(additionalDataFieldId: any) {
        //return this.getaction<Observable<any>>(this.fieldValues_Data)
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl)

    }

    getFieldValuesFields() {
        //return this.getaction<Observable<any>>(this.fieldValues_Fields)
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + " }" }, this.listFieldObjUrl);
    }

    getWhitelistDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl)
    }

    getFieldFormatDetails(Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl)
    }

    insertFieldValue(pageDetails: any) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    }

    updateFieldValue(pageDetails: any, id: any) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id[0] + "}" }, this.submitEditUrl);
    }

    postDataFieldValueDelete(id: any) {
        // return this.getaction<Observable<any>>(this.fieldValues_Fields);
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",Id:" + id[0] + "}" }, this.deleteUrl)
    }

    sortFieldValue(additionalDataFieldId: any, index?: number, direction?: any, column?: any, filter?: any) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    }

    pagingFieldValue(additionalDataFieldId: any, index?: number, direction?: any, column?: any) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",PageIndex:" + index + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);

    }

    CheckAttributeLookupValueInUse(id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + "}" }, this.CheckAttributeLookupValueInUseurl);
    }

    getWorkflowEntityDataFields(WorkflowCategoryId: any, workTypeId: any, moduleId: any, WorkFlowActionPointId: any) {
        // return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + "}" }, this.listFieldObjUrl);
        return this.postaction({ Input: "{ FormId:" + this.workFlowEntityDataFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1335,\"ReportFieldId\":6571,\"Value\":\"" + WorkflowCategoryId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":6575,\"Value\":\"" + workTypeId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":6569,\"Value\":\"" + WorkFlowActionPointId + "\"}" + "\]}" }, this.addDataUrl);
    }

    getWorkflowEntityData(entityCategoryId: any, workTypeId: any) {

        return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + ",Id:" + entityCategoryId + ",ParentFieldId:1335,ListReportFieldIdValues:[{ \"FieldId\":1336,\"ReportFieldId\": 6577, \"Value\":" + workTypeId + "}]}" }, this.lookupUrl);
        // return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":6571,\"Value\":\"" + WorkflowCategoryId + "\"},{ \"ReportFieldId\":6575,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"},{ \"ReportFieldId\":6569,\"Value\":\"" + WorkFlowActionPointId + "\"}]}" }, this.listDataListUrl);
    }

    postSubmitWorkflowEntityData(pageDetails) {

        return this.postaction({ Input: "{ FormId:" + this.workFlowEntityDataFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id: 0 }" }, this.submitEditUrl);
    }
    //Additional Data Fields End

    //Routes Begin
    getRoutesFields() {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + "}" }, this.listFieldObjUrl);
    }
    getRoutesData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    loadRoutesAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.routesFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.routesFormId + ",ParentFormId:" + this.routesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateRoutes(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }

    postAddRoutesDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditRoutesDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteRoutesDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    checkRouteInUse(id) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,Id:" + id + "}", Option: 0 }, this.CheckRouteInUse);
    }
    //Routes End


    //Review Service Request Begin

    getServiceRequestFields() {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}" }, this.listFieldObjWorkOrderUrl);
    }

    getServiceRequestListData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string, workTypeId?: string) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\":1111,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    }

    loadBuilding(siteid: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    loadFloor(buildingId: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + buildingId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    loadOrganizationalUnit(floorId: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + floorId + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":289,\"Value\":\"1\"}]}" }, this.lookupUrl);
    }

    loadDeficiencies(deficiecyCategroyId: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + deficiecyCategroyId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    loadReviewServiceRequest(selectedId: number, target: string, workTypeId: number, workFlowActionPointId: number, entityCategoryId: number, workflowEntityId: number, componentCategoryId?: number) {
        if (entityCategoryId != 3) {
            if (target == "add") {
                return this.postaction({
                    Input: "{ FormId:" + this.reviewServiceRequestFormId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" }," +
                    "{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" },{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" }],ListReportFieldIdValues: [{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"}]}", Target: 1, WorkTypeTarget: 1
                }, this.getWorkTypeUrl);
            }
            else if (target == "review") {
                return this.postaction({
                    Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ParentFormId:" + this.serviceRequestFormId + ",Id:" + selectedId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" },{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" }," +
                    "{ \"FieldId\":1255,\"ReportFieldId\": 5832, \"Value\":\"" + workTypeId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 5827, \"Value\":\"" + workFlowActionPointId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 6553, \"Value\":\"" + entityCategoryId + "\" } ,{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" },{ \"FieldId\":2417,\"ReportFieldId\": 289, \"Value\":\"2\" },{ \"FieldId\":2418,\"ReportFieldId\": 289, \"Value\":\"3\" },{ \"FieldId\":2419,\"ReportFieldId\": 289, \"Value\":\"4\" },{ \"FieldId\":2420,\"ReportFieldId\": 289, \"Value\":\"5\" }]," +
                    "ListReportFieldIdValues:[{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5873,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":6561,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":1481,\"Value\":\"" + selectedId + "\"},{ \"ReportFieldId\":5859,\"Value\":\"" + workflowEntityId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"}]}", Target: 2, WorkTypeTarget: entityCategoryId
                }, this.getWorkTypeUrl);
            } else {
                return this.postaction({
                    Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ParentFormId:" + this.serviceRequestFormId + ",Id:" + selectedId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" },{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" }," +
                    "{ \"FieldId\":1255,\"ReportFieldId\": 5832, \"Value\":\"" + workTypeId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 5827, \"Value\":\"" + workFlowActionPointId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 6553, \"Value\":\"" + entityCategoryId + "\" },{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" },{ \"FieldId\":2417,\"ReportFieldId\": 289, \"Value\":\"2\" },{ \"FieldId\":2418,\"ReportFieldId\": 289, \"Value\":\"3\" },{ \"FieldId\":2419,\"ReportFieldId\": 289, \"Value\":\"4\" },{ \"FieldId\":2420,\"ReportFieldId\": 289, \"Value\":\"5\" }]," +
                    "ListReportFieldIdValues:[{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5873,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":6561,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":1481,\"Value\":\"" + selectedId + "\"},{ \"ReportFieldId\":5859,\"Value\":\"" + workflowEntityId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"},{ \"ReportFieldId\":1490,\"Value\":\"25\"}]}", Target: 2, WorkTypeTarget: 3
                }, this.getWorkTypeUrl);
            }
        } else {
            return this.postaction({
                Input: "{ FormId:" + this.reviewPMWorkOrderFormId + ",ParentFormId:" + this.listReviewPMWorkorderFormId + ",Id:" + selectedId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues: [{\"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" },{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" }," +
                "{ \"FieldId\":1255,\"ReportFieldId\": 5832, \"Value\":\"" + workTypeId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 5827, \"Value\":\"" + workFlowActionPointId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 6553, \"Value\":\"" + entityCategoryId + "\" }" + ",{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" }]," +
                "ListReportFieldIdValues:[{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"},{ \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " },{ \"ReportFieldId\": 4491, \"Value\":" + componentCategoryId + " },{ \"ReportFieldId\":1481,\"Value\":\"" + selectedId + "\"},{ \"ReportFieldId\":5859,\"Value\":\"" + workflowEntityId + "\"}]}", Target: 3, WorkTypeTarget: 4
            }, this.getWorkTypeUrl);
        }
    }

    getParentChildEntityDetails(strReportFieldIds: string) {
        return this.postaction({ Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.getParentChildEntityDetailsUrl);
    }

    /*****************************************************************
     * KeyWord and Advanced Search For PM and Service Requests Begin
     *****************************************************************/
    getserviceRequestKeywordField(strReportFieldIds: string) {
        return this.postaction({ Input: "{ FormId:" + this.serviceRequestKeywordSearchFormid + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.keywordLookUpUrl);
    }

    getServiceRequestAdvnceSearchLookup(strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestAdvancedSearchFormid + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.AdvanceSearchLookUpUrl)
    }

    getPmWorkorderKeywordField(strReportFieldIds: string) {
        return this.postaction({ Input: "{ FormId:" + this.pmWorkOrderKeywordSearchFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.keywordLookUpUrl);
    }

    getPmWorkorderAdvnceSearchLookup(strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.pmWorkOrderAdvancedSearchFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.AdvanceSearchLookUpUrl)
    }

    getWorkOrderKeyWordListData(target: number, strReportFieldIds: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + (target == 1 ? this.listReviewPMWorkorderFormId : this.serviceRequestFormId) + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getKeyWordSearchForWorkOrders);
    }

    getWorkOrderAdvanceSearchListData(target: number, strReportFieldIds: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + (target == 1 ? this.listReviewPMWorkorderFormId : this.serviceRequestFormId) + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListFilterIdValues: " + filter + ",ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getAdvanceSearchForWorkOrders);
    }
    /*****************************************************************
    * KeyWord and Advanced Search For PM and Service Requests End
    *****************************************************************/

    loadOrganizationalFieldLookups(value: any, parentId: number, level: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + value + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 288, \"Value\":" + value + "},{\"ReportFieldId\": 289, \"Value\":" + level + "}]}" }, this.lookupUrl);
    }

    submitAddUpdateServiceRequest(strRptFields: string, selectedId: number, target: number) {

        return this.postaction({ Input: strRptFields, Target: target }, this.saveWorkFlowEntityUrl);
    }

    getValuesWithDbObjectDetails(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    getWorkTypeLookupValues(value: string) {
        var target = value == "review" ? 2 : 1;
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}", Target: target }, this.getWorkTypeUrl);
    }

    getActionPointUserLookupValues(outComeId: number, workTypeId: number, moduleId: number, entityCategoryId: number, siteId: number) {

        debugger
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 12449, \"Value\":" + siteId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834, \"Value\":0}]}" }, this.getActionPointUserLookupUrl);
    }

    getAutoPopulatedTimeSpentValue(workFlowEntityId: number) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",Id:" + workFlowEntityId + "}" }, this.getAutoPopulatedTimeSpentValueUrl);
    }

    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }

    getCompleteOrCloseRequestFields() {
        return this.postaction({ Input: "{FormId:" + this.completeCloseRequestFormId + "}" }, this.listFieldObjUrl);
    }
    getOverrideRequestFields() {
        return this.postaction({ Input: "{FormId:" + this.OverrideRequestFormId + "}" }, this.listFieldObjUrl);
    }

    loadNextActionPointDetails(strReportFieldIds: string, WorkTypeId: string, WorkflowEntity: string) {
        return this.postaction({ Input: "{FormId:" + this.OverrideRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5827, \"Value\":" + strReportFieldIds + "},{\"ReportFieldId\": 5859, \"Value\":" + WorkflowEntity + "},{\"ReportFieldId\": 5873, \"Value\":" + WorkTypeId + "}]}" }, this.NextActionPointDetails);
    }

    overrideUpdateData(strRptFields: any) {
        return this.postaction({ Input: strRptFields }, this.OverrideToSelectedActionPoint);

    }

    GetReminderData() {
        return this.postaction({ Input: "{FormId:385}" }, this.listFieldObjUrl);

    }

    GetReminderDatas(EntityCategoryId: any, WorkFlowEntityId: any, RequestId: any) {
        return this.postaction({ Input: "{FormId:" + this.GetReminderDatasFormId + ", ListReportFieldIdValues: [{ \"ReportFieldId\": 6561, \"Value\":" + EntityCategoryId + "},{\"ReportFieldId\": 5859, \"Value\":" + WorkFlowEntityId + "},{\"ReportFieldId\": 1481, \"Value\":" + RequestId + "}]}" }, this.ReminderData);

    }

    sendReminderDatas(details: any) {
        return this.postaction({ Input: JSON.stringify(details) }, this.SendReminderData);

    }

    getActionPointUserLookupForOverride(outComeId: number, workTypeId: number, moduleId: number, entityCategoryId: number, actionPointId: number) {
        return this.postaction({
            Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834 , \"Value\":" + actionPointId + "}]}"
        }, this.getActionPointUserLookupUrl);
    }



    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:" + this.completeCloseRequestFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }
    //Review Documents Begin
    getReviewDocumentListFields() {
        return this.postaction({ Input: "{FormId:" + this.ListRequestDocumentsFormId + "}" }, this.listFieldObjUrl);
    }

    getReviewDocumentdata(requestId: number, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{FormId:" + this.ListRequestDocumentsFormId + ",Id:" + requestId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    loadReviewDocumentsAddEdit() {
        return this.postaction({ Input: "{ FormId:" + this.UploadDocumentsFormId + "}" }, this.addDataUrl);
    }

    checkIsValidDocument(strReportFieldIds: string) {
        return this.postaction({ Input: strReportFieldIds }, this.checkDocumentFileDataValidUrl);
    }

    submitReviewDocumentData(strRptFields: string, target: number) { //Target: 1- add, 2- update, 3- delete
        return this.postaction({ Input: strRptFields, actionTarget: target }, this.saveWorkFlowDocumentDataUrl);
    }

    downloadReviewDocumentData(strRptFields: string) {
        return this.downloadaction({ Input: strRptFields }, this.reviewDocumentDownloadUrl);
    }
    //Review Documents End

    getPermissionsForWorkOrderReview(workTypeId: any, entityCategoryId: any) {
        return this.postaction({ Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 6560, \"Value\":" + entityCategoryId + "}]}" }, this.WorkFlowPermissionUrl);
    }
    //Review Technician Begin
    getReviewTechnicianFields() {
        return this.postaction({ Input: "{FormId:" + this.listReviewTechnicianFormId + "}" }, this.listFieldObjUrl);
    }

    getReviewTechnicianData(strReportFieldIds: any) {
        return this.postaction({ Input: "{FormId:" + this.listReviewTechnicianFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    }

    loadReviewTechnicianAdd(strReportFieldIds: any) {
        return this.postaction({ Input: "{ FormId:" + this.reviewTechnicianAddFormId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    }
    //Review Technician End
    //Review Parts Begin
    getReviewPartsFields() {
        return this.postaction({ Input: "{FormId:" + this.listReviewPartsFormId + "}" }, this.listFieldObjUrl);
    }

    getReviewPartsData(strReportFieldIds: any) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPartsFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    }

    loadReviewPartsAdd(strReportFieldIds: any) {
        return this.postaction({ Input: "{ FormId:" + this.reviewPartsAddFormId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    }

    loadEquipmentClassforParts(equipmentCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.reviewPartsAddFormId + "}", EquipmentCategory: equipmentCategoryId, PartId: 0, Target: 0 }, this.getEquipmentTypeforPartsUrl);
    }

    loadPartsLookUpValues(strReportFieldIds: any, equipmentClassId: number, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.reviewPartsAddFormId + ",Id:" + equipmentClassId + ",ParentFieldId:" + parentId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.lookupUrl);
    }
    //Review Parts Begin
    //Review Tools Begin
    getReviewToolsFields() {
        return this.postaction({ Input: "{FormId:" + this.listReviewToolsFormId + "}" }, this.listFieldObjUrl);
    }

    getReviewToolsData(strReportFieldIds: any) {
        return this.postaction({ Input: "{FormId:" + this.listReviewToolsFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    }

    loadReviewToolsAdd(strReportFieldIds: any) {
        return this.postaction({ Input: "{ FormId:" + this.reviewToolsAddFromId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    }
    //Review Tools End
    //Review OtherCosts Begin
    getReviewOtherCostsFields() {
        return this.postaction({ Input: "{FormId:" + this.listReviewOtherCostFormId + "}" }, this.listFieldObjUrl);
    }

    getReviewOtherCostData(strReportFieldIds: any) {
        return this.postaction({ Input: "{FormId:" + this.listReviewOtherCostFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    }

    loadReviewOtherCostsAdd() {
        return this.postaction({ Input: "{ FormId:" + this.reviewOtherCostsAddFormId + "}" }, this.addDataUrl);
    }
    /*Review OtherCosts End*/
    /*Get, Save & Delete Review Cost Begin*/
    getReviewCostDetails(workFlowEntityId: any) {
        return this.postaction({ Input: "{Id:" + workFlowEntityId + "}" }, this.getCostDetailsUrl);
    }

    submitReviewIndividualCostData(strRptFields: string) {
        return this.postaction({ Input: strRptFields }, this.saveWorkflowEntityCostItemsurl);
    }

    submitReviewMultipleCostData(strRptFields: string, workFlowEntityIds: any) {
        return this.postaction({ Input: strRptFields, WorkflowEntityIds: workFlowEntityIds }, this.saveWorkFlowEntityMultipleCostUrl);
    }

    deleteReviewCostData(strRptFields: string) {
        return this.postaction({ Input: strRptFields }, this.deleteMultipleWorkflowEntityCostItemsUrl);
    }
    /*Save & Delete Review Cost End*/
    /*Review Manage Equipment Begin*/
    getReviewEquipmentListFields(equipmentCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.reviewEquipmentListFormId + ", BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory);
    }

    getReviewEquipmentListData(equipmentCategoryId: any, requestId: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.reviewEquipmentListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{\"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + "},{\"ReportFieldId\": 1481, \"Value\":" + requestId + "}]}" }, this.listDataListUrl);
    }

    getEquipmentClassSelectionFieldsList(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.equipmentClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    }

    getEquipmentClassSelectionLookups(objectCategoryId: any, drawingIds: string, dataOption: any, classListOption: any, objectComponentCategory: any) {
        return this.postaction({ Input: "{FormId:" + this.equipmentClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetEquipmentClassSelectionLookupUrl);
    }

    submitReviewEquipmentData(strRptFields: string, target: number) { /*Target: 1- add, 2- delete*/
        return this.postaction({ Input: strRptFields, actionTarget: target }, this.saveWorkFlowEntityEquipmentUrl);
    }

    getObjectSpaceData(PageTarget: number, IsKeywordSearch: number, IsAdvancedSearch: number, objectCategoryId: any, dataOption: any, attributeOption: any, objectClassIds: string, drawingIds: string, searchCondition: string, isOrphan: any, objectId: any, isDataBasedOnUserAccess: any, objectComponentType: any, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, isExport?: any, siteId?: any, IsbuildingDrawing?: boolean) {
        if (IsbuildingDrawing == undefined || IsbuildingDrawing == null)
            IsbuildingDrawing = false;
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return this.postaction({
                    Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString()}, this.ListObjectSpaceDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString()}, this.ListObjectSpaceDataUrl);
        } else if (isExport == true)
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString()}, this.ListObjectSpaceDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString() }, this.ListObjectSpaceDataUrl);
    }

    getEquipmentSearchListFields(objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.equipmentSearchListFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.getEquipmentSearchListFieldListUrl);
    }
    /*Review Manage Equipment End*/
    /**
     * Review Team Members Begin
     */
    getTeamMembersListFields() {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + "}" }, this.listFieldObjUrl);
    }

    getTeamMembersListData(reportFieldIdValues: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    }

    deleteReviewTeamMemberData(strRptFields: string, target: number) { /*Target: 1- Single, 2- Multiple*/
        return this.postaction({ Input: strRptFields, Target: target }, this.deleteWorkFlowEntityTeamMembersUrl);
    }

    submitReviewTeamMemberData(strRptFields: string, target: number) { /*Target: 1- Single, 2- Multiple*/
        return this.postaction({ Input: strRptFields, Target: target }, this.insertWorkFlowEntityTeamMembersUrl);
    }
    /**
     * Review Team Members End
     */
    /*Review Service Request End*/

    /*Review PM WorkOrders Beging*/

    getPMReviewListFields() {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + "}" }, this.listFieldObjUrl);
    }

    getPMReviewListData(workTypeId: number, componentCategoryId: number, statusId: number, date: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " },{ \"ReportFieldId\": 4491, \"Value\":" + componentCategoryId + " },{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " },{ \"ReportFieldId\": 1442, \"Value\":'" + date + "' }]}" }, this.listDataListUrl);
    }

    //Review PM WorkOrders End

    //Track Requests Begin

    getTrackRequestListFields() {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}" }, this.listFieldObjUrl);
    }

    getTrackRequestListData(reportFieldIdValues: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    }

    getRequesterDetails(requestId) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",Id:" + requestId + "}" }, this.getRequesterDetailsUrl);
    }

    //Track Requests End

    //Route-Equipments Begin
    getEquipmentColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.equipmentListFormId + " }" }, this.listFieldObjUrl);
    }

    getEquipmentData(index: number, column: any, direction: any, selectedId: any) {
        return this.postaction({ Input: "{ FormId: " + this.equipmentListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:0,ListReportFieldIdValues: [{ \"ReportFieldId\": 5632, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    }

    getNewEquipmentColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.newEquipmentListFormId + " }" }, this.listFieldObjUrl);
    }

    getEquipmentType(equipmentCategoryId: any, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:" + this.newEquipmentListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }
    getNewEquipmentData(index: number, column: any, direction: any, equipmentCategoryId: any, equipmentTypeId: any, equipmentId: number) {
        return this.postaction({ Input: "{ FormId: " + this.newEquipmentListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + equipmentId + " }", EquipmentCategory: equipmentCategoryId, EquipmentType: equipmentTypeId, Target: 1 }, this.SearchedEquipmentsTypeForList);
    }
    postSubmitActionEquipment(selectedRowIds, selectedId) { // submit
        //return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5633, \"Value\":\"" + selectedRowIds + "\"},{\"ReportFieldId\": 5632, \"Value\":\"" + selectedId + "\"}],Id:" + selectedId + "}" }, this.submitAddUrl);
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.InsertRouteEquipments);
    }
    postEquipmentDelete(selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5633, \"Value\":\"" + selectedRowIds + "\"},{\"ReportFieldId\": 5632, \"Value\":\"" + selectedId + "\"}],Id:" + selectedId + "}" }, this.deleteUrl);
    }
    checkEquipmentInUse(selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5570, \"Value\":\"" + selectedId + "\"}],Id:" + selectedRowIds + "}" }, this.checkEquipmentinUse);
    }
    //Route-Equipments End
    //Generate Work Order Begin
    generateWorkOrderFields() {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrder + "}" }, this.listFieldObjUrl);
    }
    loadGenerateWorkOrderEquipmentClass(parentFieldId: number, equipmentCategoryId: number) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrder + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);

    }

    //getGenerateWorkOrderListListFields() {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + "}" }, this.listFieldObjUrl);
    //}

    getGenerateWorkOrderListListFields(workTypeId: any) {
        // return this.postaction({ Input: "{ FormId:264, BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory); generateWorkOrderListFields
        return this.postaction({ Input: "{ FormId:264, WorkTypeId:'" + workTypeId + "',WorkFlowEntityCategoryId:0,WorkFlowActionPointId:0,WorkFlowEntityId:0,ObjectCategoryId:1}" }, this.generateWorkOrderListFields);


    }

    getGenerateWorkOrderListData(pageIndex: number, sortCol: string, sortDir: string, numberOfDays: any, routeId: any, equipmentCategoryId: any, equipmentClassId: any, workTypeId: any) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":5533,\"Value\":" + numberOfDays + "},{ \"ReportFieldId\":6577,\"Value\":" + workTypeId + "}]}" }, this.listDataListUrl);
    }
    getGenerateWorkOrderListDataHavingDate(pageIndex: number, sortCol: string, sortDir: string, date: any, routeId: any, equipmentCategoryId: any, equipmentClassId: any, workTypeId: any) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":1442,\"Value\":\"" + date + "\"},{ \"ReportFieldId\":6577,\"Value\":" + workTypeId + "}]}" }, this.listDataListUrl);
    }
    //getEmailRecipientField(outcomeId: number, moduleId: number, worktypeId: any, entityCategoryId: any,notificationTemplate) {
    //    return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 1419, \"Value\":\"" + outcomeId + "\"},{\"ReportFieldId\": 271, \"Value\":\"" + moduleId + "\"},{\"ReportFieldId\": 5873, \"Value\":\"" + worktypeId + "\"},{\"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId + "\"},{\"ReportFieldId\": 5472, \"Value\":\"" + outcomeId + "\"}],Id: 0}" }, this.listFieldObjUrl);
    //}

    getEmailRecipientField(pageDetails: any) {

        return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListLookupReportFieldIdValues:" + pageDetails + "}" }, this.listFieldObjUrl);
    }

    getActionPointUserLookupValuesGenerateWorkOrder(pageDetails: any) {

        return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.getActionPointUserLookupUrl);
    }

    getGenerateWorkOrderIdrawingsUsersFields() {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersFormId + "}" }, this.listFieldObjUrl);
    }

    getGenerateWorkOrderIdrawingsUserstData(pageIndex: number, sortCol: string, sortDir: string) {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getGenerateWorkOrdercontractorsListFields() {
        return this.postaction({ Input: "{FormId:" + this.contractorsListFormId + "}" }, this.listFieldObjUrl);
    }

    getGenerateWorkOrdercontractorsListtData(pageIndex: number, sortCol: string, sortDir: string) {
        return this.postaction({ Input: "{FormId:" + this.contractorsListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getGenerateWorkOrdertechniciansListFields() {
        return this.postaction({ Input: "{FormId:" + this.techniciansListFormId + "}" }, this.listFieldObjUrl);
    }

    getGenerateWorkOrdertechniciansListtData(pageIndex: number, sortCol: string, sortDir: string) {
        return this.postaction({ Input: "{FormId:" + this.techniciansListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    //generateWorkOrderForActionPointUser(strSelectedDatas: any, workTypeId: string, actionPointId: string, actionPointUserId: string) {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + "}", strSelectedDatas: strSelectedDatas, WorkTypeId: workTypeId, ActionPointId: actionPointId, ActionPointUserId: actionPointUserId}, this.generateWorkOrderUrl);
    //}
    //generateWorkOrderForActionPointUser(strSelectedDatas: any) {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:" + strSelectedDatas + "}" }, this.generateWorkOrderUrl);
    //}

    generateWorkOrderForActionPointUser(strSelectedDatas: any, sendToMailAddress: string[], messageTemplateId: number) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:" + strSelectedDatas + "}", SendToMailAddress: sendToMailAddress, MessageTemplateId: messageTemplateId }, this.generateWorkOrderUrl);
    }
    //Generate Work Order Ends
    //Procedures Begin
    getProceduresFields() {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + "}" }, this.listFieldObjUrl);
    }
    getProceduresData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.listDataListUrl);
    }

    loadProceduresAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureAddEditFormId + ",ParentFormId:" + this.proceduresListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.editDataUrl);
        }
    }
    AddUpdateProcedures(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + /*",ParentFormId:" + this.proceduresListFormId + */"}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + /*",ParentFormId:" + this.proceduresListFormId +*/ "}" }, this.submitEditUrl);
        }

    }
    getProceduresDataUpdateForGrid(index: number, column: any, direction: any, id: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + ",Id:" + id + " " + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.listDataListUrl);
    }
    postAddProceduresDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }
    postEditProceduresDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }
    postDeleteProceduresDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    checkProcedureInUse(id) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,Id:" + id + "}" }, this.checkProcedureinUse);
    }
    //Procedures End
    //Procedures-AssociateEquipmentClass Begin
    getProcedureAECField() {
        return this.postaction({ Input: "{FormId:" + this.procedureAECListFormId + "}" }, this.listFieldObjUrl);
    }
    getProcedureAssociateEquipmentClassData(selectedId: number, index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.procedureAECListFormId + ",Id:" + selectedId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5510,\"Value\":" + selectedId + "}]}" }, this.listDataListUrl);
    }
    getProcedureNewAssociateEquipmentColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.procedureAECAddDeleteFormId + " }" }, this.listFieldObjUrl);
    }
    getProcedureNewAssociateEquipmentData(index: number, column: string, direction: string, equipmentCategoryId: any, equipmentTypeId: any, equipmentId: number) {
        return this.postaction({ Input: "{ FormId: " + this.procedureAECAddDeleteFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + equipmentId + " }", EquipmentCategory: equipmentCategoryId, EquipmentType: equipmentTypeId, Target: 2 }, this.SearchedEquipmentsTypeForList);
    }
    postSubmitActionProcedureAssociateEquipment(selectedRowIds, selectedId) { // submit
        return this.postaction({ Input: "{ FormId:" + this.procedureAECAddDeleteFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitAddUrl);//this.submitAddUrl//this.InsertRouteEquipments
    }
    postProcedureAssociateEquipmentDelete(fieldobj: any, selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.procedureAECAddDeleteFormId + " ,Id:" + selectedId + ",ListReportFieldIdValues:" + fieldobj + "}" }, this.deleteUrl);
    }
    //Procedures-AssociateEquipmentClass End
    //Procedures Job Stpes Begin
    getJobStepsFields() {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + "}" }, this.listFieldObjUrl);
    }
    getJobStepsData(index: number, column: any, direction: any, procId: any) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":0}]}" }, this.listDataListUrl);
    }
    postAddJobStepsDetails(procedureId, jobstep: string) {
        //return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ProcedureId:" + procedureId + ",JobSteps:'" + jobstep + "',TradeId:0,ToolsData:'',SparesData:''" + "}" }, this.InsertProcedureJobStep);
    }
    postEditJobStepsDetails(procedureId, jobstep: string, selectId) {
        //return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ProcedureId:" + procedureId + ",JobSteps:'" + jobstep + "',TradeId:0,ToolsData:'',SparesData:''" + ",EntityId:" + selectId + "}" }, this.UpdateProcedureJobStep);
    }
    postDeleteJobStepsDetails(fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    }

    loadJobStepAddEdit(selectedId: number, target: number, procId: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureJobStepsListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureJobStepsListFormId + ",ParentFormId:" + this.procedureJobStepsListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":" + selectedId + "}]}" }, this.editDataUrl);
        }
    }
    getJobStepsDataforgridupdate(index: number, column: any, direction: any, procId: any, id: any) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",Id:" + id + "" + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":" + id + "}]}" }, this.listDataListUrl);
    }


    //Procedures Job Steps End
    //Procedures Safety Stpes Begin
    getSafetyStepsFields() {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + "}" }, this.listFieldObjUrl);
    }
    getSafetyStepsData(index: number, column: any, direction: any, procId: any) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":0}]}" }, this.listDataListUrl);
    }
    postAddSafetyStepsDetails(procedureId: number, safetystep: string) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + "}", ProcedureId: procedureId, SafetySteps: safetystep, TradeId: 0, ExpTradeHours: 0, ToolsData: null, SparesData: null }, this.InsertProcedureSafetyStep);
    }
    postEditSafetyStepsDetails(procedureId: number, safetystep: string, selectId: number) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:" + selectId + "}", ProcedureId: procedureId, SafetySteps: safetystep, TradeId: 0, ExpTradeHours: 0, ToolsData: null, SparesData: null }, this.UpdateProcedureSafetyStep);
    }
    postDeleteSafetyStepsDetails(fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    }

    loadSafetyStepAddEdit(selectedId: number, target: number, procId: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureSafetyStepsListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureSafetyStepsListFormId + ",ParentFormId:" + this.procedureSafetyStepsListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":" + selectedId + "}]}" }, this.editDataUrl);
        }
    }
    getSafetyStepsDataforgridupdate(index: number, column: any, direction: any, procId: any, id: any) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:" + id + " " + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":" + id + "}]}" }, this.listDataListUrl);
    }
    //Procedures Safety Steps End
    // For PM schedule procedures  start
    getPMProcedureListFields() {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureListFormId + "}" }, this.listFieldObjUrl);
    }

    getPMProcedureListData(pageIndex: number, sortCol: string, sortDir: string, pmId: any) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}]}" }, this.listDataListUrl);

    }
    getPMProcedureListDataAdd(ObjectClassId: number, target: number, selectedId: number) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1593,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.addDataUrl);
        }
    }
    PMProcedureAddSubmit(strRptFields: string, target: string, selectedId: number) {

        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    }

    getPMProcedureListDataEdit(ObjectClassId: number, pmId: number, target: number, selectedId: number) {
        if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":1593,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.editDataUrl);
        }
    }

    CheckPMsProceduresInUse(selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + "}" }, this.checkPMsProceduresInUse);
    }

    deletePMsProcedures(procedureId: number, pmId: number) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5594,\"Value\":" + procedureId + "},{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}]}" }, this.deleteUrl);
    }

    // For PM schedule procedures end


    // For Master PM  procedures  start
    getMasterPMProcedureListFields() {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureListFormId + "}" }, this.listFieldObjUrl);
    }

    getMasterPMProcedureListData(pageIndex: number, sortCol: string, sortDir: string, Id: any) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + Id + "}]}" }, this.listDataListUrl);

    }

    getMasterPMProcedureListDataAdd(ObjectClassId: number, target: number, selectedId: number) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1596,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.addDataUrl);
        }
    }
    MasterPMProcedureAddSubmit(strRptFields: string, target: string, selectedId: number) {

        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    }


    getMasterPMProcedureListDataEdit(ObjectClassId: number, Id: number, target: number, selectedId: number) {
        if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + Id + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":1596,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.editDataUrl);
        }
    }

    CheckMasterPMsProceduresInUse(selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5563,\"Value\":" + selectedId + "}]}" }, this.checkPMTemplateProceduresInUse);
    }

    deleteMasterPMsProcedures(procedureId: number, pmId: number) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + procedureId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + pmId + "}]}" }, this.deleteUrl);
    }

    // For Master PM  procedures  end
    //GetPrivilegesOfMultiplePagesForUser begin
    GetPrivilegesOfMultiplePagesForUser(pageid, privileages) {
        return this.postaction({ Input: "{}", PageId: pageid, Privileges: null }, this.PrivilegesOfMultiplePagesForUser);
    }
    //GetPrivilegesOfMultiplePagesForUser end

    checkMailDomain(email: string) {
        return this.postaction({ "Email": email }, this.checkMailDomains);
    }

    getObjectIdforEquipment(dbobjectId: number, value: string) {
        return this.postaction({ Input: "{Id:" + dbobjectId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4303,\"Value\":\"" + value + "\"},{ \"ReportFieldId\":661,\"Value\":\"" + value + "\"}]}" }, this.dbObjectLookUpUrl);
    }

    getMaxCharUsed(addFieldId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + JSON.stringify(addFieldId) + "}" }, this.workOrderGetMaxLength);

    }

    getGenerateWorkOrderCalenderList(date: any, routeId: any, equipmentCategoryId: any, equipmentClassId: any, workTypeId: any) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":5533,\"Value\":\"" + date + "\"},{ \"ReportFieldId\":5873,\"Value\":" + workTypeId + "}]}" }, this.workOrderCalenderList);
    }

    getCustomerSubscribedFeaturesBarcode(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    }

    CompleteUpdateData(strRptFields: any, Option: number) {

        if (Option == 1)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);

        if (Option == 2)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);

        if (Option == 3)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);
    }

    CheckMultipleCompleteorClose(strRptFields: any, Option: number) {

        if (Option == 1) {
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);
        }
        if (Option == 2)
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);

        if (Option == 3) {
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);
        }
    }

    getActionPointUserLookupForComplete(outComeId: number, workTypeId: number, moduleId: number, entityCategoryId: number, actionPointId: number) {
        return this.postaction({
            Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5827 , \"Value\":" + actionPointId + "}]}"
        }, this.getActionPointUserLookupUrl);
    }

    GetNonPMWOStatusForDashBoard() {
        return this.postaction({}, this.getNonPMWOStatusForDashBoard);
    }

    GetOpenedRequestAndNonPMWOAgingForDashBoard() {
        return this.postaction({}, this.getOpenedRequestAndNonPMWOAgingForDashBoard);
    }

    GetPMWOStatusForDashBoard() {
        return this.postaction({}, this.getPMWOStatusForDashBoard);
    }

    GetOpenedPMWOAgingForDashBoard() {
        return this.postaction({}, this.getOpenedPMWOAgingForDashBoard);
    }

    GetFieldObjectForSetWorkTypeSpace(moduleId: any) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":2334,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":2334,\"ReportFieldId\": 5875, \"Value\":" + 0 + "}]}" }, this.listFieldObjUrl)
    }
    GetWorkFlowEntityCategory(worktypeid: any, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + ",ParentFieldId:" + 2334 + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6571, \"Value\": 0 },{\"ReportFieldId\": 5854, \"Value\": " + moduleId + " },{\"ReportFieldId\": 6575, \"Value\": " + worktypeid + " },{ \"ReportFieldId\": 6569, \"Value\": 0 },{ \"ReportFieldId\": 5830, \"Value\": 1 }]}" }, this.lookupUrl)
    }
    GetSpaceFieldList(worktypeid, entitycatid, sortcol, sortdir) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + ",SortColumn:'" + sortcol + "',SortDirection:'" + sortdir + "'}", WorktypeId: worktypeid, EntityCategoryId: entitycatid }, this.listSpacefieldUrl)
    }
    UpdateSpaceField(selectedValue) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + " ,ListReportFieldIdValues: " + selectedValue + "}" }, this.submitEditUrl);

    }

    getSetRuleFields(workFlowEnityId, workRequestId) {
        return this.postaction({ Input: "{ FormId:" + this.SetRuleFieldsFormId + " , ListLookupReportFieldIdValues: [{ \"FieldId\":2340,\"ReportFieldId\": 5859, \"Value\": " + workFlowEnityId + "},{ \"FieldId\":2340,\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.listFieldObjUrl);
    }

    getReviewHistoryColumns() {
        return this.postaction({ Input: "{ FormId:" + this.ReviewHistoryFormId + " }" }, this.listFieldObjUrl);
    }

    getReviewHistoryData(workflowEntityId) {
        return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",Id:" + workflowEntityId + "}" }, this.listDataListUrl);
    }

    getUpdateRuleEditdata(workRequestId) {
        return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.getUpdateRuleEdit);
    }

    updateEditRuleSubmit(reportFieldIdValues: any) {
        return this.postaction({ Input: reportFieldIdValues }, this.submitUpdateRuleEdit);
    }

    getSelectedActionPointsRule(workFlowEnityId, workRequestId) {
        return this.postaction({ Input: "{ ListReportFieldIdValues: [{ \"ReportFieldId\": 5859, \"Value\": " + workFlowEnityId + "},{ \"FieldId\":2340,\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.SelectedActionPointsForRule);
    }

    getChargebackListFields() {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + " }" }, this.listFieldObjUrl);
    }
    getCustomerSubscribedFeatures(feaureIds: string) {
        return this.postaction({ input: "{FormId:" + this.chargebackListFormId + " }", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    }

    getChargebackData(reportfieldIdValues,index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + ", ListReportFieldIdValues: " + reportfieldIdValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    }

    loadChargebackAddEditFields(reportfieldIdValues,selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + ", ListReportFieldIdValues: " + reportfieldIdValues +  ",ParentFormId:" + this.chargebackListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    loadChargebackLookups(chargebackType) {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + " }", ChargebackType: chargebackType }, this.ChargebackLookupUrl);
    }

    AddUpdateChargeback(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.chargebackListFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.chargebackListFormId + "}" }, this.submitEditUrl);
        }
    }

    getWorkorderDetails(workorderId) {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + ", Id:" + workorderId + " }" }, this.workorderDetailsUrl);
    }

    deleteChargeback(strRptFields,selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }

    loadAssignWorkTypestoSiteDetails() {
        return this.postaction({ Input: "{ FormId:" + this.AssingWTtoSiteFormId + "}" }, this.addDataUrl);        
    }

    postSubmitWorkTypestoSite(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AssingWTtoSiteFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitEditUrl);
    }

    loadWorkTypesforSite(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.AssingWTtoSiteFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }


    updateJobStepsOrder(strRptFields) {

        return this.postaction({ Input: "{ListReportFieldIdValues: " + strRptFields + "}" }, this.updateJobStepsOrderUrl)

    }
    updateSafetyStepsOrder(strRptFields) {

        return this.postaction({ Input: "{ListReportFieldIdValues: " + strRptFields + "}" }, this.updateSafetyStepsOrderUrl)

    }

    getAssignEquipmentCalDDlFields() {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + "}" }, this.listFieldObjUrl);
    }
    getLookUpsForEquipmentClassDDL(parentId) {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ",ParentFieldId:" + 2910 + ",Id:" + parentId+" }" }, this.lookupUrl);
    }
    getAssignEquipCalData(index: number, column: any, direction: any, isClassSelected: number, strRptFields:any) {
        if (isClassSelected == 0) {
            debugger
            return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
        }
        else {
            debugger
            return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues: " + strRptFields+"}" }, this.listDataListUrl);
        }
    }
    getAssignEquipmentUpdateFields() {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentUpdateFormId + "}" }, this.listFieldObjUrl);
    }
    postUpdateEquipmentCalendar(pageDetails:any) {

        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentUpdateFormId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.AssignEquipmentCalendarListFormId+ "}" }, this.submitEditUrl);
    }
    SpaceValidation(strRptFields: string, selectedId: number) {

        return this.postaction({ Input: strRptFields }, this.SpaceValidationUrl);
    }
}