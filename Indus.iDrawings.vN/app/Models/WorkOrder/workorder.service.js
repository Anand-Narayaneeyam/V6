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
var WorkOrdereService = (function (_super) {
    __extends(WorkOrdereService, _super);
    //---------------------------------
    function WorkOrdereService(http) {
        _super.call(this, http);
        this.http = http;
        //All general functions 
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.CheckFieldValueExist = 'Object/GetAttributeldHaveLookUpValues';
        this.checkIsInUse = 'Object/CheckAttributeIdIsInUse';
        this.getWhitelistUrl = 'Common/GetWhiteListDetails';
        this.getFieldFormatListUrl = 'Common/GetFieldFormatDetails';
        this.SearchedEquipmentsTypeForList = 'WorkOrder/GetSearchedEquipmentsTypeForList';
        this.InsertRouteEquipments = 'WorkOrder/InsertRouteEquipments';
        this.saveWorkFlowEntityUrl = 'WorkOrder/SaveWorkflowEntityData';
        this.saveWorkFlowDocumentDataUrl = 'WorkOrder/DocumentEntityInputData';
        this.getSessionValues = 'Common/GetSessionValues';
        this.WorkFlowPermissionUrl = 'WorkOrder/GetWorkFlowActionPointPermissions';
        this.getEquipmentTypeforPartsUrl = 'WorkOrder/GetEquipmentTypesForPart';
        this.CheckInUseHoldReasons = 'WorkOrder/CheckInUseHoldReasons';
        this.getWorkTypeUrl = 'WorkOrder/GetFieldsforWorkOrderReview';
        this.getActionPointUserLookupUrl = 'WorkOrder/GetActionPointUsers';
        this.checkProcedureinUse = 'WorkOrder/CheckPMProcedureInUse';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.fieldsList = 'Object/GetListAppFormFields';
        this.GetEquipmentClassSelectionLookupUrl = 'Object/GetObjectClassesLookup';
        this.GetAdvancedSearchLookupUrl = 'Objects/GetAdvancedSerachLookups';
        this.getObjectAttributeSearchFieldListUrl = 'WorkOrder/GetObjectAttributeSearchFieldList';
        this.saveWorkflowEntityCostItemsurl = 'WorkOrder/SaveWorkflowEntityCostItems';
        this.saveWorkFlowEntityMultipleCostUrl = 'WorkOrder/SaveMultipleWorkflowEntityCostItems';
        this.saveWorkFlowEntityEquipmentUrl = 'WorkOrder/EquipmentEntityInputData';
        this.getAutoPopulatedTimeSpentValueUrl = 'WorkOrder/GetAutoPopulatedTimeSpentInHours';
        this.deleteMultipleWorkflowEntityCostItemsUrl = 'WorkOrder/DeleteMultipleWorkflowEntityCostItems';
        this.checkDocumentFileDataValidUrl = 'WorkOrder/CheckDocumentFileData';
        this.reviewDocumentDownloadUrl = 'WorkOrder/DocumentFileDownload';
        this.getCostDetailsUrl = 'WorkOrder/GetCostDetails';
        this.equipmentAdvancedSearchUrl = 'Object/GetAdvancedSerachLookups';
        this.getEquipmentSearchListFieldListUrl = 'Object/GetListAppFormFields';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.getKeyWordSearchForWorkOrders = 'WorkOrder/GetKeyWordSearchForWorkOrders';
        this.getAdvanceSearchForWorkOrders = 'WorkOrder/GetAdvanceSearchForWorkOrders';
        this.getRequesterDetailsUrl = 'WorkOrder/GetRequesterDetails';
        this.getParentChildEntityDetailsUrl = 'WorkOrder/GetParentChildEntityDetails';
        this.InsertProcedureJobStep = 'WorkOrder/InsertPMProcedureJobStep';
        this.UpdateProcedureJobStep = 'WorkOrder/UpdatePMProcedureJobStep';
        this.InsertProcedureSafetyStep = 'WorkOrder/InsertPMProcedureSafetyStep';
        this.UpdateProcedureSafetyStep = 'WorkOrder/UpdatePMProcedureSafetyStep';
        this.listFieldObjWorkOrderUrl = 'WorkOrder/GetListAppFormFields';
        this.addDataWorkOrderUrl = 'WorkOrder/GetAddAppFormFields';
        this.editDataWorkOrderUrl = 'WorkOrder/GetEditAppFormFields';
        this.generateWorkOrderUrl = 'WorkOrder/InsertPMScheduleWorkOrders';
        this.insertUpdatePMUrl = 'WorkOrder/InsertUpdatePM';
        this.equipmentCategoryUrl = 'WorkOrder/GetEquipmentCategoryforPM';
        this.equipmentClassesUrl = 'WorkOrder/GetEquipmentClassesforPM';
        this.equipmentUrl = 'WorkOrder/GetEquipmentforPM';
        this.routeEquipmentUrl = 'WorkOrder/GetRouteEquipmentforPM';
        this.masterPMLookUpUrl = 'WorkOrder/GetPMTemplatesForPM';
        this.masterPMDetailsUrl = 'WorkOrder/GetMasterPMDetailsforPM';
        this.seasonsLookUpUrl = 'WorkOrder/GetSeasonsForPM';
        this.weekDaysLookUpUrl = 'WorkOrder/GetWeekDaysForPM';
        this.deleteMultiplePMUrl = 'WorkOrder/DeletePMForMultiple';
        this.checkMasterPMInUseUrl = 'WorkOrder/CheckPMTemplateInUse';
        this.insertUpdatePMTemplateUrl = 'WorkOrder/InsertUpdatePMTemplate';
        this.CheckAttributeLookupValueInUseurl = "Object/CheckAttributeLookupValueInUse";
        this.getComponentCategoryObjectCategory = 'Object/GetComponentCategoryObjectCategory';
        this.checkPMsProceduresInUse = 'WorkOrder/CheckPMsProceduresInUse';
        this.checkPMTemplateProceduresInUse = 'WorkOrder/CheckPMTemplateProceduresInUse';
        this.PrivilegesOfMultiplePagesForUser = 'Common/GetPrivilegesOfMultiplePagesForUser';
        this.checkMailDomains = 'User/CheckdomainValidations';
        this.CheckInUseContractor = 'WorkOrder/CheckContractorInUse';
        this.workOrderCalenderList = 'WorkOrder/GetCalendarInformation';
        this.workOrderGetMaxLength = 'WorkOrder/GetAttributeLength';
        this.checkEquipmentinUse = 'WorkOrder/CheckEquipmentInUse';
        this.generateWorkOrderListFields = 'WorkOrder/GetAddAppFormFields';
        this.customerFeatures = 'Common/GetSubscribedFeatures';
        this.CheckTechniciansInUse = 'WorkOrder/CheckTechnicianInUse';
        this.CheckTradeInUse = 'WorkOrder/CheckTradeInUse';
        this.CheckManufacturerInUse = 'WorkOrder/CheckManufacturerInUse';
        this.CheckItemIdInUse = 'WorkOrder/CheckItemIdInUse';
        this.CheckRouteInUse = 'WorkOrder/CheckRouteInUse';
        this.UpdateMultipleCompleteorClose = 'WorkOrder/UpdateMultipleCompleteorClose';
        this.CheckConditionforMultipleCompleteorClose = 'WorkOrder/CheckConditionforMultipleCompleteorClose';
        this.NextActionPointDetails = 'WorkOrder/GetNextActionPointDetails';
        this.insertWorkFlowEntityTeamMembersUrl = 'WorkOrder/InsertWorkFlowEntityTeamMembers';
        this.deleteWorkFlowEntityTeamMembersUrl = 'WorkOrder/DeleteWorkFlowEntityTeamMembers';
        //  private OverrideToSelectedActionPoint = 'WorkOrder/OverrideToSelectedActionPoint';
        //Dashboards
        // GetNonPMWOStatusForDashBoard
        // GetOpenedRequestAndNonPMWOAgingForDashBoard
        this.getNonPMWOStatusForDashBoard = 'WorkOrder/GetNonPMWOStatusForDashBoard';
        this.getOpenedRequestAndNonPMWOAgingForDashBoard = 'WorkOrder/GetOpenedRequestAndNonPMWOAgingForDashBoard';
        this.getPMWOStatusForDashBoard = 'WorkOrder/GetPMWOStatusForDashBoard';
        this.getOpenedPMWOAgingForDashBoard = 'WorkOrder/GetOpenedPMWOAgingForDashBoard';
        this.OverrideToSelectedActionPoint = 'WorkOrder/OverrideToSelectedActionPoint';
        this.ReminderData = 'WorkOrder/GetReminderData';
        this.SendReminderData = 'WorkOrder/ReminderNotification';
        this.listSpacefieldUrl = 'WorkFlow/GetWorkTypeSpaceFields';
        this.getUpdateRuleEdit = 'WorkFlow/GetWorkflowEntityRelationships';
        this.submitUpdateRuleEdit = 'WorkFlow/UpdateRule';
        this.SelectedActionPointsForRule = 'WorkOrder/GetSelectedActionPointsForRule';
        this.ChargebackLookupUrl = 'WorkOrder/GetChargebackLookup';
        this.workorderDetailsUrl = 'WorkOrder/GetWorkOrderDetails';
        this.updateJobStepsOrderUrl = 'WorkOrder/UpdateJobStepOrder';
        this.updateSafetyStepsOrderUrl = 'WorkOrder/UpdateSafetyStepOrder';
        this.ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetails';
        this.tradesFrmId = 179;
        this.contractorsFormId = 187;
        this.manufacturersFormId = 189;
        this.techniciansFormId = 191;
        this.techniciansAddEditFormId = 192;
        this.partsFormId = 201;
        this.partsAddEditFormId = 202;
        this.toolsFormId = 209;
        this.masterPMSchedulesListFormId = 198;
        this.masterPMScheduleAddEditFormId = 279;
        this.priorityListFormId = 217;
        this.priorityAddEditFormId = 219;
        this.pmScheduleTypesListFormId = 239;
        this.pmschedulesListFormId = 215;
        this.pmschedulesAddEditFormId = 238;
        this.holdReasonListFormId = 221;
        this.associateEquipmentClassFormId = 225;
        this.additionalDataFieldsFormId = 224;
        this.addlDataFieldAddEditFormId = 227;
        this.routesFormId = 235;
        this.fieldValueListFormId = 234;
        this.workFlowEntityDataFormId = 241;
        this.serviceRequestFormId = 226;
        this.reviewServiceRequestFormId = 228;
        this.ListRequestDocumentsFormId = 237;
        this.UploadDocumentsFormId = 240;
        this.listReviewTechnicianFormId = 249;
        this.listReviewPartsFormId = 250;
        this.listReviewToolsFormId = 251;
        this.listReviewOtherCostFormId = 252;
        this.reviewTechnicianAddFormId = 254;
        this.reviewPartsAddFormId = 256;
        this.reviewToolsAddFromId = 257;
        this.reviewOtherCostsAddFormId = 259;
        this.reviewEquipmentListFormId = 297;
        this.equipmentClassSelectionFormId = 210;
        this.equipmentAdvancedSearchFormId = 308;
        this.equipmentSearchListFormId = 327;
        this.serviceRequestAdvancedSearchFormid = 336;
        this.pmWorkOrderAdvancedSearchFormId = 337;
        this.serviceRequestKeywordSearchFormid = 338;
        this.pmWorkOrderKeywordSearchFormId = 339;
        this.listTeamMembersFormId = 429;
        this.objectDataListFormId = 207;
        this.completeCloseRequestFormId = 282;
        this.OverrideRequestFormId = 375;
        this.listTrackRequestFormId = 293;
        this.listReviewPMWorkorderFormId = 262;
        this.reviewPMWorkOrderFormId = 285;
        this.equipmentListFormId = 242;
        this.newEquipmentListFormId = 247;
        this.addEditAssociateEquipmentClassFormId = 258;
        this.generateWorkOrder = 260;
        this.proceduresListFormId = 263;
        this.procedureAddEditFormId = 265;
        this.procedureAECListFormId = 267;
        this.procedureAECAddDeleteFormId = 268;
        this.procedureJobStepsListFormId = 270;
        this.procedureSafetyStepsListFormId = 271;
        this.generateWorkOrderList = 264;
        this.emailRecipientFormId = 274;
        this.iDrawingsUsersFormId = 277;
        this.contractorsListFormId = 280;
        this.techniciansListFormId = 281;
        this.pmprocedureListFormId = 292;
        this.pmprocedureAddEditFormId = 294;
        this.masterpmprocedureListFormId = 295;
        this.masterpmprocedureAddEditFormId = 296;
        this.GetReminderDatasFormId = 385;
        this.SetWorkTypeSpaceFieldFormId = 432;
        this.SetRuleFieldsFormId = 433;
        this.ReviewHistoryFormId = 441;
        this.chargebackListFormId = 550;
        this.AssingWTtoSiteFormId = 557;
        this.AssignEquipmentCalendarListFormId = 567;
        this.AssignEquipmentUpdateFormId = 568;
        this.SpaceValidationUrl = 'WorkOrder/SpaceValidation';
    }
    WorkOrdereService.prototype.getTradesFields = function () {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getTradesData = function (pageIndex, sortCol, sortDir, filter) {
        /* return this.postaction({ Input: "{FormId:" + this.tradesFrmId + "}" }, this.listDataListUrl); */
        return this.postaction({ Input: "{ FormId: " + this.tradesFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadTradesAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.tradesFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.tradesFrmId + ",ParentFormId:" + this.tradesFrmId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateTrade = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tradesFrmId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.tradesFrmId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.postEditTradesDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postAddTradesDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postTradesDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkTradeIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",Id:" + id + "}" }, this.CheckTradeInUse);
    };
    WorkOrdereService.prototype.sortTrades = function (direction, column) {
        return this.postaction({ Input: "{FormId:" + this.tradesFrmId + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
    };
    //Contractors Begin
    WorkOrdereService.prototype.getContractorsField = function () {
        return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getContractorsData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadContractorsAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.contractorsFormId + ",ParentFormId:" + this.contractorsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.InlineAddUpdateContractors = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateContractors = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.contractorsFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.contractorsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.contractorsFormId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.deleteContractors = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkContractorIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.contractorsFormId + ",Id:" + id + "}" }, this.CheckInUseContractor);
    };
    //Contractors End
    //Manufacturers Begin
    WorkOrdereService.prototype.getManufacturersField = function () {
        return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getManufacturersData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadManufacturersAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.manufacturersFormId + ",ParentFormId:" + this.manufacturersFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.InlineAddUpdateManufacturers = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateManufacturers = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.manufacturersFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.manufacturersFormId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.checkManufacturerIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:" + id + "}" }, this.CheckManufacturerInUse);
    };
    WorkOrdereService.prototype.deleteManufacturers = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.manufacturersFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    //Manufacturers End
    //Technicians Begin
    WorkOrdereService.prototype.getTechniciansColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.techniciansFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getTechniciansData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.techniciansFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadTechnicianAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.techniciansAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.techniciansAddEditFormId + ",ParentFormId:" + this.techniciansFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateTechnicians = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.techniciansAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.techniciansFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.techniciansAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.techniciansFormId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.deleteTechnicians = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.techniciansFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkTechniciansIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.techniciansFormId + ",Id:" + id + "}" }, this.CheckTechniciansInUse);
    };
    WorkOrdereService.prototype.InlineAddUpdateTechnicians = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.techniciansFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.techniciansFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    //Technicians End
    //Parts Begin
    WorkOrdereService.prototype.getPartsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getPartsData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postAddPartsDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditPartsDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeletePartsDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.loadPartAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.partsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.partsFormId + ",ParentFormId:" + this.partsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdatePart = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.partsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.checkItemIdIsInUse = function (id, option) {
        if (option == 4)
            return this.postaction({ Input: "{FormId:" + this.partsFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
        if (option == 3)
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
        if (option == 5)
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",Id:" + id + "}", Option: option }, this.CheckItemIdInUse);
    };
    //Parts End
    //Parts-AssociateEquipmentClass Begin
    WorkOrdereService.prototype.getAECField = function () {
        return this.postaction({ Input: "{FormId:" + this.associateEquipmentClassFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getAssociateEquipmentClassData = function (selectedId, index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.associateEquipmentClassFormId + ",Id:" + selectedId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5510,\"Value\":" + selectedId + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getNewAssociateEquipmentColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.addEditAssociateEquipmentClassFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getNewAssociateEquipmentData = function (index, column, direction, equipmentCategoryId, equipmentTypeId, equipmentId) {
        return this.postaction({ Input: "{FormId:" + this.addEditAssociateEquipmentClassFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: ''}", EquipmentCategory: equipmentCategoryId, PartId: equipmentId, Target: 0 }, this.getEquipmentTypeforPartsUrl);
    };
    WorkOrdereService.prototype.postSubmitActionAssociateEquipment = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.addEditAssociateEquipmentClassFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitAddUrl); //this.submitAddUrl//this.InsertRouteEquipments
    };
    WorkOrdereService.prototype.postAssociateEquipmentDelete = function (fieldobj, selectedId) {
        return this.postaction({ Input: "{FormId:" + this.addEditAssociateEquipmentClassFormId + " ,Id:" + selectedId + ",ListReportFieldIdValues:" + fieldobj + "}" }, this.deleteUrl);
    };
    //Parts-AssociateEquipmentClass End
    //Tools Begin
    WorkOrdereService.prototype.getToolsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getToolsData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadToolAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.toolsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.toolsFormId + ",ParentFormId:" + this.toolsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateTools = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.postAddToolsDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditToolsDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeleteToolsDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.toolsFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    //Tools End
    //Master PM Schedules Begins
    WorkOrdereService.prototype.getMasterPMScheduleColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.masterPMSchedulesListFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getMasterPMScheduleData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.masterPMSchedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadMasterPMAddFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1534,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1534,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" }, { \"FieldId\":1382,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.addDataUrl);
    };
    WorkOrdereService.prototype.loadMasterPMEditFields = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1534,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1534,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1382,\"ReportFieldId\": 5605, \"Value\": " + selectedId + " }, { \"FieldId\":1543,\"ReportFieldId\": 5605, \"Value\": " + selectedId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    WorkOrdereService.prototype.loadEquipmentClassForMasterPM = function (equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:" + this.masterPMScheduleAddEditFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadMeterFieldForMasterPM = function (equipmentClassId, parentFieldId, equipmentCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.masterPMScheduleAddEditFormId + ",Id:" + equipmentClassId + ",ParentFieldId:" + parentFieldId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1563,\"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + " }]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.postSubmitMasterPMSchedule = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", IsAdd: 1 }, this.insertUpdatePMTemplateUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.masterPMScheduleAddEditFormId + ",ParentFormId:" + this.masterPMSchedulesListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", IsAdd: 0 }, this.insertUpdatePMTemplateUrl);
        }
    };
    WorkOrdereService.prototype.checkMasterPMScheduleInUse = function (selectedIds) {
        return this.postaction({ input: "{ FormId:" + this.masterPMSchedulesListFormId + ",Id:" + selectedIds + "}" }, this.checkMasterPMInUseUrl);
    };
    WorkOrdereService.prototype.postDeleteMasterPMSchedule = function (selectedIds) {
        return this.postaction({ Input: "{ FormId:" + this.masterPMSchedulesListFormId + ",Id:" + selectedIds + "}" }, this.deleteUrl);
    };
    //Master PM Schedules End
    //Proirity Begin
    WorkOrdereService.prototype.getPriorityFields = function () {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getPriorityData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postAddPriorityDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditPriorityDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeletePriorityDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.loadPriorityAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.priorityListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.priorityListFormId + ",ParentFormId:" + this.priorityListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdatePriority = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.priorityListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    //Priority End
    //HoldReason Begin
    WorkOrdereService.prototype.getHoldReasonFields = function () {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getHoldReasonData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadHoldReasonAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.holdReasonListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.holdReasonListFormId + ",ParentFormId:" + this.holdReasonListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateReasons = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.postAddHoldReasonDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditHoldReasonDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeleteHoldReasonDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkHoldReasonIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.holdReasonListFormId + ",Id:" + id + "}" }, this.CheckInUseHoldReasons);
    };
    //HoldReason End
    //PM Schedules Services Begin
    WorkOrdereService.prototype.pmScheduleTypesFields = function () {
        return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1322,\"ReportFieldId\": 571, \"Value\": 0 }]}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.loadEquipmentCategory = function (siteId, parentFieldId) {
        return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + siteId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadEquipmentClass = function (siteId, parentFieldId, equipmentCategoryId) {
        if (siteId == 0 || siteId == undefined) {
            return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1323,\"ReportFieldId\": 571, \"Value\": 0 }]}" }, this.lookupUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmScheduleTypesListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1323,\"ReportFieldId\": 571, \"Value\":" + siteId + "}]}" }, this.lookupUrl);
        }
    };
    WorkOrdereService.prototype.getPMListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getPMListData = function (pageIndex, sortCol, sortDir, equipmentCategoryId, equipmentClassId, routeId, siteId) {
        if (equipmentCategoryId > -1 && equipmentClassId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        }
        else if (routeId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\": 0 },{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\":" + routeId + "}, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        }
        else if (equipmentCategoryId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4485,\"Value\": 0 },{ \"ReportFieldId\":647,\"Value\": 0 },{ \"ReportFieldId\":5570,\"Value\": 0 }, { \"ReportFieldId\":665,\"Value\": " + siteId + " }]}" }, this.listDataListUrl);
        }
    };
    WorkOrdereService.prototype.loadPMAddFields = function (siteId, equipmentCategoryId, routeId) {
        if (equipmentCategoryId > -1 && siteId <= -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        }
        else if (equipmentCategoryId > -1 && siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        }
        else if (routeId > -1 && siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": " + siteId + " },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        }
        else if (routeId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        }
        else if (siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " }, { \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 },{ \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": 0 },{ \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": 0 }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }]}" }, this.addDataUrl);
        }
    };
    WorkOrdereService.prototype.loadPMEditFields = function (selectedId, siteId) {
        debugger;
        if (siteId > -1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":" + siteId + " },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1415,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": " + siteId + " }, { \"FieldId\":1423,\"ReportFieldId\": 5563, \"Value\": " + selectedId + " }, {  \"FieldId\":1423,\"ReportFieldId\": 271, \"Value\": 9 }, { \"FieldId\":1423,\"ReportFieldId\": 6573, \"Value\": 3 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1368,\"ReportFieldId\": 168, \"Value\":\"StatusId\" },{ \"FieldId\":1368,\"ReportFieldId\": 174, \"Value\":\"WO_PMs\" },{ \"FieldId\":1369,\"ReportFieldId\": 8356, \"Value\":0 },{ \"FieldId\":1383,\"ReportFieldId\": 656, \"Value\": 0 },{ \"FieldId\":1383,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1414,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1382,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1415,\"ReportFieldId\": 5506, \"Value\": " + selectedId + " }, { \"FieldId\":1412,\"ReportFieldId\": 8361, \"Value\": 0 }, { \"FieldId\":1423,\"ReportFieldId\": 5563, \"Value\": " + selectedId + " }, { \"FieldId\":1423,\"ReportFieldId\": 271, \"Value\": 9 }, { \"FieldId\":1423,\"ReportFieldId\": 6573, \"Value\": 3 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.loadEquipmentCategoryForPM = function (siteId, masterPMId) {
        if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": 0 }, { \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentCategoryUrl);
        }
        else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentCategoryUrl);
        }
        else if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentCategoryUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 656, \"Value\": 0 }, { \"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentCategoryUrl);
        }
    };
    WorkOrdereService.prototype.loadEquipmentClassForPM = function (equipmentCategoryId, siteId, masterPMId) {
        if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentClassesUrl);
        }
        else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.equipmentClassesUrl);
        }
        else if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentClassesUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1384,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1384,\"ReportFieldId\": 4485, \"Value\": " + equipmentCategoryId + " }, { \"FieldId\":1384,\"ReportFieldId\": 5605, \"Value\": 0 }]}" }, this.equipmentClassesUrl);
        }
    };
    WorkOrdereService.prototype.loadMeterFieldForPM = function (parentFieldId, equipmentClassId, equipmentCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",Id:" + 0 + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1404,\"ReportFieldId\": 4485, \"Value\":" + equipmentCategoryId + " },{ \"FieldId\":1404,\"ReportFieldId\": 657, \"Value\":" + equipmentClassId + " }]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadActionPointUser = function (workTypeId, parentFieldId, siteId) {
        return this.postaction({
            Input: "{FormId:" + this.pmschedulesAddEditFormId + ",Id:" + workTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5563, \"Value\": 0 }, { \"ReportFieldId\": 271, \"Value\": 9 }, { \"ReportFieldId\": 6573, \"Value\": 3 }, { \"ReportFieldId\": 12449, \"Value\": " + siteId + " }]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadEquipmentNoForPM = function (equipmentClassId, siteId, masterPMId) {
        if (siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        }
        else if (masterPMId > -1 && siteId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": " + siteId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        }
        else if (masterPMId > -1) {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"FieldId\":1401,\"ReportFieldId\": 657, \"Value\": " + equipmentClassId + " }, { \"FieldId\":1401,\"ReportFieldId\": 656, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5605, \"Value\": 0 }, { \"FieldId\":1401,\"ReportFieldId\": 5596, \"Value\": 0 }]}" }, this.equipmentUrl);
        }
    };
    WorkOrdereService.prototype.getMasterPMSchedule = function (masterPMId) {
        return this.postaction({ Input: "{ FormId: " + this.pmschedulesAddEditFormId + ",Id: " + masterPMId + " }" }, this.masterPMDetailsUrl);
    };
    WorkOrdereService.prototype.loadWeekDaysForPM = function (masterPMId) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.weekDaysLookUpUrl);
    };
    WorkOrdereService.prototype.loadSeasonsForPM = function (masterPMId) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5605, \"Value\": " + masterPMId + " }]}" }, this.seasonsLookUpUrl);
    };
    //loadRouteEquipmentNoForPM(routeId: any) {
    //    return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 5570, \"Value\": " + routeId + " }]}" }, this.routeEquipmentUrl);
    //}
    WorkOrdereService.prototype.loadMasterPM = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.masterPMLookUpUrl);
    };
    WorkOrdereService.prototype.loadRouteEquipmentNoForPM = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.pmschedulesAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkOrdereService.prototype.postSubmitPMSchedule = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ParentFormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", IsAdd: 1 }, this.insertUpdatePMUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.pmschedulesAddEditFormId + ",ParentFormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", IsAdd: 0 }, this.insertUpdatePMUrl);
        }
    };
    WorkOrdereService.prototype.postDeletePMSchedule = function (selectedIds) {
        return this.postaction({ input: "{FormId:" + this.pmschedulesListFormId + ",ListReportFieldIdValues:" + selectedIds + "}" }, this.deleteMultiplePMUrl);
    };
    //Additional Data Fields Begin
    WorkOrdereService.prototype.getAddtlDataFieldField = function () {
        return this.postaction({ Input: "{ FormId:" + this.additionalDataFieldsFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1219,\"ReportFieldId\": 5854, \"Value\":\"9\" },{ \"FieldId\":1219,\"ReportFieldId\": 5875, \"Value\":\"0\" },{ \"FieldId\":1219,\"ReportFieldId\": 5873, \"Value\":\" \" }]}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getAddtlDataFieldData = function (workTypeId, objectCategoryId, index, direction, column) {
        // return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
        return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5871,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":67,\"Value\":\"" + objectCategoryId + "\"}],SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.addAddlDataField = function (formObject) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",ParentFormId:" + this.additionalDataFieldsFormId + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.loadAddlDataFieldAddEdit = function (selectedId, addEdit, categoryid) {
        //return this.getaction<Observable<any>>(this.addlDatafieldFieldsAddEdit)
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.addlDataFieldAddEditFormId + ",Id:" + selectedId[0] + ",ParentFormId:" + this.additionalDataFieldsFormId + ",ListReportFieldIdValues:" + JSON.stringify(categoryid) + " }" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.deleteAddtlDataField = function (selectedID) {
        return this.postaction({ Input: "{FormId:" + this.additionalDataFieldsFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.updateAddlDataField = function (formObject, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + " ,ListReportFieldIdValues: " + formObject + ",Id:" + id + ",ParentFormId:" + this.additionalDataFieldsFormId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.AdditionalDataFieldHaveLookUp = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + Id + "}" }, this.CheckFieldValueExist);
    };
    WorkOrdereService.prototype.CheckisinUse = function (fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.checkIsInUse);
    };
    WorkOrdereService.prototype.getFieldValuesData = function (additionalDataFieldId) {
        //return this.getaction<Observable<any>>(this.fieldValues_Data)
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getFieldValuesFields = function () {
        //return this.getaction<Observable<any>>(this.fieldValues_Fields)
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getWhitelistDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getWhitelistUrl);
    };
    WorkOrdereService.prototype.getFieldFormatDetails = function (Id) {
        return this.postaction({ Input: "{Id:" + Id + "}" }, this.getFieldFormatListUrl);
    };
    WorkOrdereService.prototype.insertFieldValue = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.updateFieldValue = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id[0] + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDataFieldValueDelete = function (id) {
        // return this.getaction<Observable<any>>(this.fieldValues_Fields);
        return this.postaction({ Input: "{FormId:" + this.fieldValueListFormId + ",Id:" + id[0] + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.sortFieldValue = function (additionalDataFieldId, index, direction, column, filter) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.pagingFieldValue = function (additionalDataFieldId, index, direction, column) {
        return this.postaction({ Input: "{ FormId: " + this.fieldValueListFormId + ",PageIndex:" + index + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + ",ListReportFieldIdValues:[" + JSON.stringify(additionalDataFieldId[0]) + "]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.CheckAttributeLookupValueInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.addlDataFieldAddEditFormId + ",Id:" + id + "}" }, this.CheckAttributeLookupValueInUseurl);
    };
    WorkOrdereService.prototype.getWorkflowEntityDataFields = function (WorkflowCategoryId, workTypeId, moduleId, WorkFlowActionPointId) {
        // return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + "}" }, this.listFieldObjUrl);
        return this.postaction({ Input: "{ FormId:" + this.workFlowEntityDataFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1335,\"ReportFieldId\":6571,\"Value\":\"" + WorkflowCategoryId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":6575,\"Value\":\"" + workTypeId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"},{ \"FieldId\":1335,\"ReportFieldId\":6569,\"Value\":\"" + WorkFlowActionPointId + "\"}" + "\]}" }, this.addDataUrl);
    };
    WorkOrdereService.prototype.getWorkflowEntityData = function (entityCategoryId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + ",Id:" + entityCategoryId + ",ParentFieldId:1335,ListReportFieldIdValues:[{ \"FieldId\":1336,\"ReportFieldId\": 6577, \"Value\":" + workTypeId + "}]}" }, this.lookupUrl);
        // return this.postaction({ Input: "{FormId:" + this.workFlowEntityDataFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":6571,\"Value\":\"" + WorkflowCategoryId + "\"},{ \"ReportFieldId\":6575,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"},{ \"ReportFieldId\":6569,\"Value\":\"" + WorkFlowActionPointId + "\"}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postSubmitWorkflowEntityData = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.workFlowEntityDataFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id: 0 }" }, this.submitEditUrl);
    };
    //Additional Data Fields End
    //Routes Begin
    WorkOrdereService.prototype.getRoutesFields = function () {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getRoutesData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadRoutesAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.routesFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.routesFormId + ",ParentFormId:" + this.routesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateRoutes = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.postAddRoutesDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditRoutesDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeleteRoutesDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkRouteInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.routesFormId + " ,Id:" + id + "}", Option: 0 }, this.CheckRouteInUse);
    };
    //Routes End
    //Review Service Request Begin
    WorkOrdereService.prototype.getServiceRequestFields = function () {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}" }, this.listFieldObjWorkOrderUrl);
    };
    WorkOrdereService.prototype.getServiceRequestListData = function (pageIndex, sortCol, sortDir, filter, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\":1111,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadBuilding = function (siteid, parentId) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadFloor = function (buildingId, parentId) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + buildingId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadOrganizationalUnit = function (floorId, parentId) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + floorId + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":289,\"Value\":\"1\"}]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadDeficiencies = function (deficiecyCategroyId, parentId) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + deficiecyCategroyId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.loadReviewServiceRequest = function (selectedId, target, workTypeId, workFlowActionPointId, entityCategoryId, workflowEntityId, componentCategoryId) {
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
            }
            else {
                return this.postaction({
                    Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ParentFormId:" + this.serviceRequestFormId + ",Id:" + selectedId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" },{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" }," +
                        "{ \"FieldId\":1255,\"ReportFieldId\": 5832, \"Value\":\"" + workTypeId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 5827, \"Value\":\"" + workFlowActionPointId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 6553, \"Value\":\"" + entityCategoryId + "\" },{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" },{ \"FieldId\":2417,\"ReportFieldId\": 289, \"Value\":\"2\" },{ \"FieldId\":2418,\"ReportFieldId\": 289, \"Value\":\"3\" },{ \"FieldId\":2419,\"ReportFieldId\": 289, \"Value\":\"4\" },{ \"FieldId\":2420,\"ReportFieldId\": 289, \"Value\":\"5\" }]," +
                        "ListReportFieldIdValues:[{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5873,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":6561,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":1481,\"Value\":\"" + selectedId + "\"},{ \"ReportFieldId\":5859,\"Value\":\"" + workflowEntityId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"},{ \"ReportFieldId\":1490,\"Value\":\"25\"}]}", Target: 2, WorkTypeTarget: 3
                }, this.getWorkTypeUrl);
            }
        }
        else {
            return this.postaction({
                Input: "{ FormId:" + this.reviewPMWorkOrderFormId + ",ParentFormId:" + this.listReviewPMWorkorderFormId + ",Id:" + selectedId + ",WorkTypeId:" + workTypeId + ",WorkFlowEntityCategoryId:" + entityCategoryId + ",WorkFlowActionPointId:" + workFlowActionPointId + ",WorkFlowEntityId:" + 0 + ",ListLookupReportFieldIdValues: [{\"FieldId\":1261,\"ReportFieldId\": 5854, \"Value\":\"9\" },{\"FieldId\":1261,\"ReportFieldId\": 5875, \"Value\":\"1\" },{ \"FieldId\":1348,\"ReportFieldId\": 12097, \"Value\":\"1767\" }," +
                    "{ \"FieldId\":1255,\"ReportFieldId\": 5832, \"Value\":\"" + workTypeId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 5827, \"Value\":\"" + workFlowActionPointId + "\" },{ \"FieldId\":1255,\"ReportFieldId\": 6553, \"Value\":\"" + entityCategoryId + "\" }" + ",{ \"FieldId\":1499,\"ReportFieldId\": 289, \"Value\":\"1\" }]," +
                    "ListReportFieldIdValues:[{ \"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{ \"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{ \"ReportFieldId\":6553,\"Value\":\"" + entityCategoryId + "\"},{ \"ReportFieldId\":5826,\"Value\":\"1\"},{ \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " },{ \"ReportFieldId\": 4491, \"Value\":" + componentCategoryId + " },{ \"ReportFieldId\":1481,\"Value\":\"" + selectedId + "\"},{ \"ReportFieldId\":5859,\"Value\":\"" + workflowEntityId + "\"}]}", Target: 3, WorkTypeTarget: 4
            }, this.getWorkTypeUrl);
        }
    };
    WorkOrdereService.prototype.getParentChildEntityDetails = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.getParentChildEntityDetailsUrl);
    };
    /*****************************************************************
     * KeyWord and Advanced Search For PM and Service Requests Begin
     *****************************************************************/
    WorkOrdereService.prototype.getserviceRequestKeywordField = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.serviceRequestKeywordSearchFormid + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.keywordLookUpUrl);
    };
    WorkOrdereService.prototype.getServiceRequestAdvnceSearchLookup = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestAdvancedSearchFormid + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.AdvanceSearchLookUpUrl);
    };
    WorkOrdereService.prototype.getPmWorkorderKeywordField = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.pmWorkOrderKeywordSearchFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.keywordLookUpUrl);
    };
    WorkOrdereService.prototype.getPmWorkorderAdvnceSearchLookup = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.pmWorkOrderAdvancedSearchFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.AdvanceSearchLookUpUrl);
    };
    WorkOrdereService.prototype.getWorkOrderKeyWordListData = function (target, strReportFieldIds, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + (target == 1 ? this.listReviewPMWorkorderFormId : this.serviceRequestFormId) + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getKeyWordSearchForWorkOrders);
    };
    WorkOrdereService.prototype.getWorkOrderAdvanceSearchListData = function (target, strReportFieldIds, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + (target == 1 ? this.listReviewPMWorkorderFormId : this.serviceRequestFormId) + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListFilterIdValues: " + filter + ",ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getAdvanceSearchForWorkOrders);
    };
    /*****************************************************************
    * KeyWord and Advanced Search For PM and Service Requests End
    *****************************************************************/
    WorkOrdereService.prototype.loadOrganizationalFieldLookups = function (value, parentId, level) {
        return this.postaction({ Input: "{FormId:" + this.reviewServiceRequestFormId + ",Id:" + value + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 288, \"Value\":" + value + "},{\"ReportFieldId\": 289, \"Value\":" + level + "}]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.submitAddUpdateServiceRequest = function (strRptFields, selectedId, target) {
        return this.postaction({ Input: strRptFields, Target: target }, this.saveWorkFlowEntityUrl);
    };
    WorkOrdereService.prototype.getValuesWithDbObjectDetails = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkOrdereService.prototype.getWorkTypeLookupValues = function (value) {
        var target = value == "review" ? 2 : 1;
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}", Target: target }, this.getWorkTypeUrl);
    };
    WorkOrdereService.prototype.getActionPointUserLookupValues = function (outComeId, workTypeId, moduleId, entityCategoryId, siteId) {
        debugger;
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 12449, \"Value\":" + siteId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834, \"Value\":0}]}" }, this.getActionPointUserLookupUrl);
    };
    WorkOrdereService.prototype.getAutoPopulatedTimeSpentValue = function (workFlowEntityId) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",Id:" + workFlowEntityId + "}" }, this.getAutoPopulatedTimeSpentValueUrl);
    };
    WorkOrdereService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    WorkOrdereService.prototype.getCompleteOrCloseRequestFields = function () {
        return this.postaction({ Input: "{FormId:" + this.completeCloseRequestFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getOverrideRequestFields = function () {
        return this.postaction({ Input: "{FormId:" + this.OverrideRequestFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.loadNextActionPointDetails = function (strReportFieldIds, WorkTypeId, WorkflowEntity) {
        return this.postaction({ Input: "{FormId:" + this.OverrideRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5827, \"Value\":" + strReportFieldIds + "},{\"ReportFieldId\": 5859, \"Value\":" + WorkflowEntity + "},{\"ReportFieldId\": 5873, \"Value\":" + WorkTypeId + "}]}" }, this.NextActionPointDetails);
    };
    WorkOrdereService.prototype.overrideUpdateData = function (strRptFields) {
        return this.postaction({ Input: strRptFields }, this.OverrideToSelectedActionPoint);
    };
    WorkOrdereService.prototype.GetReminderData = function () {
        return this.postaction({ Input: "{FormId:385}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.GetReminderDatas = function (EntityCategoryId, WorkFlowEntityId, RequestId) {
        return this.postaction({ Input: "{FormId:" + this.GetReminderDatasFormId + ", ListReportFieldIdValues: [{ \"ReportFieldId\": 6561, \"Value\":" + EntityCategoryId + "},{\"ReportFieldId\": 5859, \"Value\":" + WorkFlowEntityId + "},{\"ReportFieldId\": 1481, \"Value\":" + RequestId + "}]}" }, this.ReminderData);
    };
    WorkOrdereService.prototype.sendReminderDatas = function (details) {
        return this.postaction({ Input: JSON.stringify(details) }, this.SendReminderData);
    };
    WorkOrdereService.prototype.getActionPointUserLookupForOverride = function (outComeId, workTypeId, moduleId, entityCategoryId, actionPointId) {
        return this.postaction({
            Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834 , \"Value\":" + actionPointId + "}]}"
        }, this.getActionPointUserLookupUrl);
    };
    WorkOrdereService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:" + this.completeCloseRequestFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    //Review Documents Begin
    WorkOrdereService.prototype.getReviewDocumentListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.ListRequestDocumentsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewDocumentdata = function (requestId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.ListRequestDocumentsFormId + ",Id:" + requestId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadReviewDocumentsAddEdit = function () {
        return this.postaction({ Input: "{ FormId:" + this.UploadDocumentsFormId + "}" }, this.addDataUrl);
    };
    WorkOrdereService.prototype.checkIsValidDocument = function (strReportFieldIds) {
        return this.postaction({ Input: strReportFieldIds }, this.checkDocumentFileDataValidUrl);
    };
    WorkOrdereService.prototype.submitReviewDocumentData = function (strRptFields, target) {
        return this.postaction({ Input: strRptFields, actionTarget: target }, this.saveWorkFlowDocumentDataUrl);
    };
    WorkOrdereService.prototype.downloadReviewDocumentData = function (strRptFields) {
        return this.downloadaction({ Input: strRptFields }, this.reviewDocumentDownloadUrl);
    };
    //Review Documents End
    WorkOrdereService.prototype.getPermissionsForWorkOrderReview = function (workTypeId, entityCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.reviewServiceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 6560, \"Value\":" + entityCategoryId + "}]}" }, this.WorkFlowPermissionUrl);
    };
    //Review Technician Begin
    WorkOrdereService.prototype.getReviewTechnicianFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewTechnicianFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewTechnicianData = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.listReviewTechnicianFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadReviewTechnicianAdd = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.reviewTechnicianAddFormId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    };
    //Review Technician End
    //Review Parts Begin
    WorkOrdereService.prototype.getReviewPartsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewPartsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewPartsData = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPartsFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadReviewPartsAdd = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.reviewPartsAddFormId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    };
    WorkOrdereService.prototype.loadEquipmentClassforParts = function (equipmentCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.reviewPartsAddFormId + "}", EquipmentCategory: equipmentCategoryId, PartId: 0, Target: 0 }, this.getEquipmentTypeforPartsUrl);
    };
    WorkOrdereService.prototype.loadPartsLookUpValues = function (strReportFieldIds, equipmentClassId, parentId) {
        return this.postaction({ Input: "{FormId:" + this.reviewPartsAddFormId + ",Id:" + equipmentClassId + ",ParentFieldId:" + parentId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.lookupUrl);
    };
    //Review Parts Begin
    //Review Tools Begin
    WorkOrdereService.prototype.getReviewToolsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewToolsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewToolsData = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.listReviewToolsFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadReviewToolsAdd = function (strReportFieldIds) {
        return this.postaction({ Input: "{ FormId:" + this.reviewToolsAddFromId + ",ListLookupReportFieldIdValues:" + strReportFieldIds + "}" }, this.addDataUrl);
    };
    //Review Tools End
    //Review OtherCosts Begin
    WorkOrdereService.prototype.getReviewOtherCostsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewOtherCostFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewOtherCostData = function (strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.listReviewOtherCostFormId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadReviewOtherCostsAdd = function () {
        return this.postaction({ Input: "{ FormId:" + this.reviewOtherCostsAddFormId + "}" }, this.addDataUrl);
    };
    /*Review OtherCosts End*/
    /*Get, Save & Delete Review Cost Begin*/
    WorkOrdereService.prototype.getReviewCostDetails = function (workFlowEntityId) {
        return this.postaction({ Input: "{Id:" + workFlowEntityId + "}" }, this.getCostDetailsUrl);
    };
    WorkOrdereService.prototype.submitReviewIndividualCostData = function (strRptFields) {
        return this.postaction({ Input: strRptFields }, this.saveWorkflowEntityCostItemsurl);
    };
    WorkOrdereService.prototype.submitReviewMultipleCostData = function (strRptFields, workFlowEntityIds) {
        return this.postaction({ Input: strRptFields, WorkflowEntityIds: workFlowEntityIds }, this.saveWorkFlowEntityMultipleCostUrl);
    };
    WorkOrdereService.prototype.deleteReviewCostData = function (strRptFields) {
        return this.postaction({ Input: strRptFields }, this.deleteMultipleWorkflowEntityCostItemsUrl);
    };
    /*Save & Delete Review Cost End*/
    /*Review Manage Equipment Begin*/
    WorkOrdereService.prototype.getReviewEquipmentListFields = function (equipmentCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.reviewEquipmentListFormId + ", BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory);
    };
    WorkOrdereService.prototype.getReviewEquipmentListData = function (equipmentCategoryId, requestId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.reviewEquipmentListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{\"ReportFieldId\": 4491, \"Value\":" + equipmentCategoryId + "},{\"ReportFieldId\": 1481, \"Value\":" + requestId + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getEquipmentClassSelectionFieldsList = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.equipmentClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.fieldsList);
    };
    WorkOrdereService.prototype.getEquipmentClassSelectionLookups = function (objectCategoryId, drawingIds, dataOption, classListOption, objectComponentCategory) {
        return this.postaction({ Input: "{FormId:" + this.equipmentClassSelectionFormId + " ,BaseEntityId:" + objectCategoryId + "}", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: drawingIds, DataOption: dataOption.toString(), ClassListOption: classListOption.toString(), ObjectComponentCategory: objectComponentCategory.toString() }, this.GetEquipmentClassSelectionLookupUrl);
    };
    WorkOrdereService.prototype.submitReviewEquipmentData = function (strRptFields, target) {
        return this.postaction({ Input: strRptFields, actionTarget: target }, this.saveWorkFlowEntityEquipmentUrl);
    };
    WorkOrdereService.prototype.getObjectSpaceData = function (PageTarget, IsKeywordSearch, IsAdvancedSearch, objectCategoryId, dataOption, attributeOption, objectClassIds, drawingIds, searchCondition, isOrphan, objectId, isDataBasedOnUserAccess, objectComponentType, pageIndex, sortCol, sortDir, filter, isExport, siteId, IsbuildingDrawing) {
        if (IsbuildingDrawing == undefined || IsbuildingDrawing == null)
            IsbuildingDrawing = false;
        if (IsAdvancedSearch == 1) {
            if (isExport == true)
                return this.postaction({
                    Input: "{ FormId: " + this.objectDataListFormId + ",IsExport:1 ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString() }, this.ListObjectSpaceDataUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,ParentFormId:273,BaseEntityId:" + objectCategoryId + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString() }, this.ListObjectSpaceDataUrl);
        }
        else if (isExport == true)
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,IsExport:1 ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString() }, this.ListObjectSpaceDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.objectDataListFormId + " ,BaseEntityId:" + objectCategoryId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "',IsKeywordSearch:" + IsKeywordSearch + ",IsAdvancedSearch:" + IsAdvancedSearch + ",PageTarget:" + PageTarget + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7411, \"Value\":" + siteId + "}]}", ObjectCategory: objectCategoryId.toString(), DataOption: dataOption.toString(), AttributeOption: attributeOption.toString(), ObjectClassIds: objectClassIds.toString(), DrawingIds: drawingIds.toString(), SearchCondition: searchCondition.toString(), IsOrphan: isOrphan.toString(), ObjectId: objectId.toString(), IsDataBasedOnUserAccess: isDataBasedOnUserAccess.toString(), ObjectComponentType: objectComponentType.toString(), IsBuildingDrawing: IsbuildingDrawing.toString() }, this.ListObjectSpaceDataUrl);
    };
    WorkOrdereService.prototype.getEquipmentSearchListFields = function (objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.equipmentSearchListFormId + " ,BaseEntityId:" + objectCategoryId + "}" }, this.getEquipmentSearchListFieldListUrl);
    };
    /*Review Manage Equipment End*/
    /**
     * Review Team Members Begin
     */
    WorkOrdereService.prototype.getTeamMembersListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getTeamMembersListData = function (reportFieldIdValues, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.deleteReviewTeamMemberData = function (strRptFields, target) {
        return this.postaction({ Input: strRptFields, Target: target }, this.deleteWorkFlowEntityTeamMembersUrl);
    };
    WorkOrdereService.prototype.submitReviewTeamMemberData = function (strRptFields, target) {
        return this.postaction({ Input: strRptFields, Target: target }, this.insertWorkFlowEntityTeamMembersUrl);
    };
    /**
     * Review Team Members End
     */
    /*Review Service Request End*/
    /*Review PM WorkOrders Beging*/
    WorkOrdereService.prototype.getPMReviewListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getPMReviewListData = function (workTypeId, componentCategoryId, statusId, date, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listReviewPMWorkorderFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: [{ \"ReportFieldId\": 5873, \"Value\":" + workTypeId + " },{ \"ReportFieldId\": 4491, \"Value\":" + componentCategoryId + " },{ \"ReportFieldId\": 1490, \"Value\":" + statusId + " },{ \"ReportFieldId\": 1442, \"Value\":'" + date + "' }]}" }, this.listDataListUrl);
    };
    //Review PM WorkOrders End
    //Track Requests Begin
    WorkOrdereService.prototype.getTrackRequestListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getTrackRequestListData = function (reportFieldIdValues, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getRequesterDetails = function (requestId) {
        return this.postaction({ Input: "{FormId:" + this.serviceRequestFormId + ",Id:" + requestId + "}" }, this.getRequesterDetailsUrl);
    };
    //Track Requests End
    //Route-Equipments Begin
    WorkOrdereService.prototype.getEquipmentColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.equipmentListFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getEquipmentData = function (index, column, direction, selectedId) {
        return this.postaction({ Input: "{ FormId: " + this.equipmentListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:0,ListReportFieldIdValues: [{ \"ReportFieldId\": 5632, \"Value\":" + selectedId + " }]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getNewEquipmentColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.newEquipmentListFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getEquipmentType = function (equipmentCategoryId, parentFieldId) {
        return this.postaction({ Input: "{FormId:" + this.newEquipmentListFormId + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.getNewEquipmentData = function (index, column, direction, equipmentCategoryId, equipmentTypeId, equipmentId) {
        return this.postaction({ Input: "{ FormId: " + this.newEquipmentListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + equipmentId + " }", EquipmentCategory: equipmentCategoryId, EquipmentType: equipmentTypeId, Target: 1 }, this.SearchedEquipmentsTypeForList);
    };
    WorkOrdereService.prototype.postSubmitActionEquipment = function (selectedRowIds, selectedId) {
        //return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5633, \"Value\":\"" + selectedRowIds + "\"},{\"ReportFieldId\": 5632, \"Value\":\"" + selectedId + "\"}],Id:" + selectedId + "}" }, this.submitAddUrl);
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.InsertRouteEquipments);
    };
    WorkOrdereService.prototype.postEquipmentDelete = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5633, \"Value\":\"" + selectedRowIds + "\"},{\"ReportFieldId\": 5632, \"Value\":\"" + selectedId + "\"}],Id:" + selectedId + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkEquipmentInUse = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newEquipmentListFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 5570, \"Value\":\"" + selectedId + "\"}],Id:" + selectedRowIds + "}" }, this.checkEquipmentinUse);
    };
    //Route-Equipments End
    //Generate Work Order Begin
    WorkOrdereService.prototype.generateWorkOrderFields = function () {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrder + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.loadGenerateWorkOrderEquipmentClass = function (parentFieldId, equipmentCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrder + ",Id:" + equipmentCategoryId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    //getGenerateWorkOrderListListFields() {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + "}" }, this.listFieldObjUrl);
    //}
    WorkOrdereService.prototype.getGenerateWorkOrderListListFields = function (workTypeId) {
        // return this.postaction({ Input: "{ FormId:264, BaseEntityId:'" + equipmentCategoryId + "'}" }, this.getComponentCategoryObjectCategory); generateWorkOrderListFields
        return this.postaction({ Input: "{ FormId:264, WorkTypeId:'" + workTypeId + "',WorkFlowEntityCategoryId:0,WorkFlowActionPointId:0,WorkFlowEntityId:0,ObjectCategoryId:1}" }, this.generateWorkOrderListFields);
    };
    WorkOrdereService.prototype.getGenerateWorkOrderListData = function (pageIndex, sortCol, sortDir, numberOfDays, routeId, equipmentCategoryId, equipmentClassId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":5533,\"Value\":" + numberOfDays + "},{ \"ReportFieldId\":6577,\"Value\":" + workTypeId + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrderListDataHavingDate = function (pageIndex, sortCol, sortDir, date, routeId, equipmentCategoryId, equipmentClassId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":1442,\"Value\":\"" + date + "\"},{ \"ReportFieldId\":6577,\"Value\":" + workTypeId + "}]}" }, this.listDataListUrl);
    };
    //getEmailRecipientField(outcomeId: number, moduleId: number, worktypeId: any, entityCategoryId: any,notificationTemplate) {
    //    return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListReportFieldIdValues: [{\"ReportFieldId\": 1419, \"Value\":\"" + outcomeId + "\"},{\"ReportFieldId\": 271, \"Value\":\"" + moduleId + "\"},{\"ReportFieldId\": 5873, \"Value\":\"" + worktypeId + "\"},{\"ReportFieldId\": 6573, \"Value\":\"" + entityCategoryId + "\"},{\"ReportFieldId\": 5472, \"Value\":\"" + outcomeId + "\"}],Id: 0}" }, this.listFieldObjUrl);
    //}
    WorkOrdereService.prototype.getEmailRecipientField = function (pageDetails) {
        return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListLookupReportFieldIdValues:" + pageDetails + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getActionPointUserLookupValuesGenerateWorkOrder = function (pageDetails) {
        return this.postaction({ Input: "{ FormId: " + this.emailRecipientFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.getActionPointUserLookupUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrderIdrawingsUsersFields = function () {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrderIdrawingsUserstData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.iDrawingsUsersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrdercontractorsListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.contractorsListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrdercontractorsListtData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.contractorsListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrdertechniciansListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.techniciansListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getGenerateWorkOrdertechniciansListtData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.techniciansListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    //generateWorkOrderForActionPointUser(strSelectedDatas: any, workTypeId: string, actionPointId: string, actionPointUserId: string) {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + "}", strSelectedDatas: strSelectedDatas, WorkTypeId: workTypeId, ActionPointId: actionPointId, ActionPointUserId: actionPointUserId}, this.generateWorkOrderUrl);
    //}
    //generateWorkOrderForActionPointUser(strSelectedDatas: any) {
    //    return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:" + strSelectedDatas + "}" }, this.generateWorkOrderUrl);
    //}
    WorkOrdereService.prototype.generateWorkOrderForActionPointUser = function (strSelectedDatas, sendToMailAddress, messageTemplateId) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:" + strSelectedDatas + "}", SendToMailAddress: sendToMailAddress, MessageTemplateId: messageTemplateId }, this.generateWorkOrderUrl);
    };
    //Generate Work Order Ends
    //Procedures Begin
    WorkOrdereService.prototype.getProceduresFields = function () {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getProceduresData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadProceduresAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureAddEditFormId + ",ParentFormId:" + this.proceduresListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.AddUpdateProcedures = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.getProceduresDataUpdateForGrid = function (index, column, direction, id, filter) {
        return this.postaction({ Input: "{FormId:" + this.proceduresListFormId + ",Id:" + id + " " + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5511,\"Value\":0}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postAddProceduresDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    WorkOrdereService.prototype.postEditProceduresDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.postDeleteProceduresDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.checkProcedureInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.procedureAddEditFormId + " ,Id:" + id + "}" }, this.checkProcedureinUse);
    };
    //Procedures End
    //Procedures-AssociateEquipmentClass Begin
    WorkOrdereService.prototype.getProcedureAECField = function () {
        return this.postaction({ Input: "{FormId:" + this.procedureAECListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getProcedureAssociateEquipmentClassData = function (selectedId, index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.procedureAECListFormId + ",Id:" + selectedId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "',ListReportFieldIdValues:[{ \"ReportFieldId\":5510,\"Value\":" + selectedId + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getProcedureNewAssociateEquipmentColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.procedureAECAddDeleteFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getProcedureNewAssociateEquipmentData = function (index, column, direction, equipmentCategoryId, equipmentTypeId, equipmentId) {
        return this.postaction({ Input: "{ FormId: " + this.procedureAECAddDeleteFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + equipmentId + " }", EquipmentCategory: equipmentCategoryId, EquipmentType: equipmentTypeId, Target: 2 }, this.SearchedEquipmentsTypeForList);
    };
    WorkOrdereService.prototype.postSubmitActionProcedureAssociateEquipment = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.procedureAECAddDeleteFormId + ",ListReportFieldIdValues: " + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitAddUrl); //this.submitAddUrl//this.InsertRouteEquipments
    };
    WorkOrdereService.prototype.postProcedureAssociateEquipmentDelete = function (fieldobj, selectedId) {
        return this.postaction({ Input: "{FormId:" + this.procedureAECAddDeleteFormId + " ,Id:" + selectedId + ",ListReportFieldIdValues:" + fieldobj + "}" }, this.deleteUrl);
    };
    //Procedures-AssociateEquipmentClass End
    //Procedures Job Stpes Begin
    WorkOrdereService.prototype.getJobStepsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getJobStepsData = function (index, column, direction, procId) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":0}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postAddJobStepsDetails = function (procedureId, jobstep) {
        //return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ProcedureId:" + procedureId + ",JobSteps:'" + jobstep + "',TradeId:0,ToolsData:'',SparesData:''" + "}" }, this.InsertProcedureJobStep);
    };
    WorkOrdereService.prototype.postEditJobStepsDetails = function (procedureId, jobstep, selectId) {
        //return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ProcedureId:" + procedureId + ",JobSteps:'" + jobstep + "',TradeId:0,ToolsData:'',SparesData:''" + ",EntityId:" + selectId + "}" }, this.UpdateProcedureJobStep);
    };
    WorkOrdereService.prototype.postDeleteJobStepsDetails = function (fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.loadJobStepAddEdit = function (selectedId, target, procId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureJobStepsListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureJobStepsListFormId + ",ParentFormId:" + this.procedureJobStepsListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":" + selectedId + "}]}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.getJobStepsDataforgridupdate = function (index, column, direction, procId, id) {
        return this.postaction({ Input: "{FormId:" + this.procedureJobStepsListFormId + ",Id:" + id + "" + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1330,\"Value\":" + procId + "},{ \"ReportFieldId\":5373,\"Value\":" + id + "}]}" }, this.listDataListUrl);
    };
    //Procedures Job Steps End
    //Procedures Safety Stpes Begin
    WorkOrdereService.prototype.getSafetyStepsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getSafetyStepsData = function (index, column, direction, procId) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":0}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.postAddSafetyStepsDetails = function (procedureId, safetystep) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + "}", ProcedureId: procedureId, SafetySteps: safetystep, TradeId: 0, ExpTradeHours: 0, ToolsData: null, SparesData: null }, this.InsertProcedureSafetyStep);
    };
    WorkOrdereService.prototype.postEditSafetyStepsDetails = function (procedureId, safetystep, selectId) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:" + selectId + "}", ProcedureId: procedureId, SafetySteps: safetystep, TradeId: 0, ExpTradeHours: 0, ToolsData: null, SparesData: null }, this.UpdateProcedureSafetyStep);
    };
    WorkOrdereService.prototype.postDeleteSafetyStepsDetails = function (fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.loadSafetyStepAddEdit = function (selectedId, target, procId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.procedureSafetyStepsListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.procedureSafetyStepsListFormId + ",ParentFormId:" + this.procedureSafetyStepsListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":" + selectedId + "}]}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.getSafetyStepsDataforgridupdate = function (index, column, direction, procId, id) {
        return this.postaction({ Input: "{FormId:" + this.procedureSafetyStepsListFormId + ",Id:" + id + " " + ", SortColumn: '[" + column + "]', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '',ListReportFieldIdValues:[{ \"ReportFieldId\":1336,\"Value\":" + procId + "},{ \"ReportFieldId\":5376,\"Value\":" + id + "}]}" }, this.listDataListUrl);
    };
    //Procedures Safety Steps End
    // For PM schedule procedures  start
    WorkOrdereService.prototype.getPMProcedureListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getPMProcedureListData = function (pageIndex, sortCol, sortDir, pmId) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getPMProcedureListDataAdd = function (ObjectClassId, target, selectedId) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1593,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.addDataUrl);
        }
    };
    WorkOrdereService.prototype.PMProcedureAddSubmit = function (strRptFields, target, selectedId) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.getPMProcedureListDataEdit = function (ObjectClassId, pmId, target, selectedId) {
        if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":1593,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.CheckPMsProceduresInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",Id:" + selectedId + "}" }, this.checkPMsProceduresInUse);
    };
    WorkOrdereService.prototype.deletePMsProcedures = function (procedureId, pmId) {
        return this.postaction({ Input: "{FormId:" + this.pmprocedureAddEditFormId + ",ParentFormId:" + this.pmprocedureListFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5594,\"Value\":" + procedureId + "},{ \"ReportFieldId\":5593,\"Value\":" + pmId + "}]}" }, this.deleteUrl);
    };
    // For PM schedule procedures end
    // For Master PM  procedures  start
    WorkOrdereService.prototype.getMasterPMProcedureListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getMasterPMProcedureListData = function (pageIndex, sortCol, sortDir, Id) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + Id + "}]}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getMasterPMProcedureListDataAdd = function (ObjectClassId, target, selectedId) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1596,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.addDataUrl);
        }
    };
    WorkOrdereService.prototype.MasterPMProcedureAddSubmit = function (strRptFields, target, selectedId) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else if (target == "edit") {
            return this.postaction({ Input: "{ FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.getMasterPMProcedureListDataEdit = function (ObjectClassId, Id, target, selectedId) {
        if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + Id + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":1596,\"ReportFieldId\": 5511, \"Value\":\"" + ObjectClassId + "\" }]}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.CheckMasterPMsProceduresInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5563,\"Value\":" + selectedId + "}]}" }, this.checkPMTemplateProceduresInUse);
    };
    WorkOrdereService.prototype.deleteMasterPMsProcedures = function (procedureId, pmId) {
        return this.postaction({ Input: "{FormId:" + this.masterpmprocedureAddEditFormId + ",ParentFormId:" + this.masterpmprocedureListFormId + ",Id:" + procedureId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":5600,\"Value\":" + pmId + "}]}" }, this.deleteUrl);
    };
    // For Master PM  procedures  end
    //GetPrivilegesOfMultiplePagesForUser begin
    WorkOrdereService.prototype.GetPrivilegesOfMultiplePagesForUser = function (pageid, privileages) {
        return this.postaction({ Input: "{}", PageId: pageid, Privileges: null }, this.PrivilegesOfMultiplePagesForUser);
    };
    //GetPrivilegesOfMultiplePagesForUser end
    WorkOrdereService.prototype.checkMailDomain = function (email) {
        return this.postaction({ "Email": email }, this.checkMailDomains);
    };
    WorkOrdereService.prototype.getObjectIdforEquipment = function (dbobjectId, value) {
        return this.postaction({ Input: "{Id:" + dbobjectId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4303,\"Value\":\"" + value + "\"},{ \"ReportFieldId\":661,\"Value\":\"" + value + "\"}]}" }, this.dbObjectLookUpUrl);
    };
    WorkOrdereService.prototype.getMaxCharUsed = function (addFieldId) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + JSON.stringify(addFieldId) + "}" }, this.workOrderGetMaxLength);
    };
    WorkOrdereService.prototype.getGenerateWorkOrderCalenderList = function (date, routeId, equipmentCategoryId, equipmentClassId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.generateWorkOrderList + ",ListReportFieldIdValues:[{ \"ReportFieldId\":4491,\"Value\":" + equipmentCategoryId + "},{ \"ReportFieldId\":647,\"Value\":" + equipmentClassId + "},{ \"ReportFieldId\":5570,\"Value\":" + routeId + "},{ \"ReportFieldId\":5533,\"Value\":\"" + date + "\"},{ \"ReportFieldId\":5873,\"Value\":" + workTypeId + "}]}" }, this.workOrderCalenderList);
    };
    WorkOrdereService.prototype.getCustomerSubscribedFeaturesBarcode = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    WorkOrdereService.prototype.CompleteUpdateData = function (strRptFields, Option) {
        if (Option == 1)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);
        if (Option == 2)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);
        if (Option == 3)
            return this.postaction({ Input: strRptFields, Option: Option }, this.UpdateMultipleCompleteorClose);
    };
    WorkOrdereService.prototype.CheckMultipleCompleteorClose = function (strRptFields, Option) {
        if (Option == 1) {
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);
        }
        if (Option == 2)
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);
        if (Option == 3) {
            return this.postaction({ Input: strRptFields, Option: Option }, this.CheckConditionforMultipleCompleteorClose);
        }
    };
    WorkOrdereService.prototype.getActionPointUserLookupForComplete = function (outComeId, workTypeId, moduleId, entityCategoryId, actionPointId) {
        return this.postaction({
            Input: "{FormId:" + this.serviceRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5827 , \"Value\":" + actionPointId + "}]}"
        }, this.getActionPointUserLookupUrl);
    };
    WorkOrdereService.prototype.GetNonPMWOStatusForDashBoard = function () {
        return this.postaction({}, this.getNonPMWOStatusForDashBoard);
    };
    WorkOrdereService.prototype.GetOpenedRequestAndNonPMWOAgingForDashBoard = function () {
        return this.postaction({}, this.getOpenedRequestAndNonPMWOAgingForDashBoard);
    };
    WorkOrdereService.prototype.GetPMWOStatusForDashBoard = function () {
        return this.postaction({}, this.getPMWOStatusForDashBoard);
    };
    WorkOrdereService.prototype.GetOpenedPMWOAgingForDashBoard = function () {
        return this.postaction({}, this.getOpenedPMWOAgingForDashBoard);
    };
    WorkOrdereService.prototype.GetFieldObjectForSetWorkTypeSpace = function (moduleId) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":2334,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":2334,\"ReportFieldId\": 5875, \"Value\":" + 0 + "}]}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.GetWorkFlowEntityCategory = function (worktypeid, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + ",ParentFieldId:" + 2334 + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 6571, \"Value\": 0 },{\"ReportFieldId\": 5854, \"Value\": " + moduleId + " },{\"ReportFieldId\": 6575, \"Value\": " + worktypeid + " },{ \"ReportFieldId\": 6569, \"Value\": 0 },{ \"ReportFieldId\": 5830, \"Value\": 1 }]}" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.GetSpaceFieldList = function (worktypeid, entitycatid, sortcol, sortdir) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + ",SortColumn:'" + sortcol + "',SortDirection:'" + sortdir + "'}", WorktypeId: worktypeid, EntityCategoryId: entitycatid }, this.listSpacefieldUrl);
    };
    WorkOrdereService.prototype.UpdateSpaceField = function (selectedValue) {
        return this.postaction({ Input: "{FormId:" + this.SetWorkTypeSpaceFieldFormId + " ,ListReportFieldIdValues: " + selectedValue + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.getSetRuleFields = function (workFlowEnityId, workRequestId) {
        return this.postaction({ Input: "{ FormId:" + this.SetRuleFieldsFormId + " , ListLookupReportFieldIdValues: [{ \"FieldId\":2340,\"ReportFieldId\": 5859, \"Value\": " + workFlowEnityId + "},{ \"FieldId\":2340,\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewHistoryColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.ReviewHistoryFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getReviewHistoryData = function (workflowEntityId) {
        return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",Id:" + workflowEntityId + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.getUpdateRuleEditdata = function (workRequestId) {
        return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.getUpdateRuleEdit);
    };
    WorkOrdereService.prototype.updateEditRuleSubmit = function (reportFieldIdValues) {
        return this.postaction({ Input: reportFieldIdValues }, this.submitUpdateRuleEdit);
    };
    WorkOrdereService.prototype.getSelectedActionPointsRule = function (workFlowEnityId, workRequestId) {
        return this.postaction({ Input: "{ ListReportFieldIdValues: [{ \"ReportFieldId\": 5859, \"Value\": " + workFlowEnityId + "},{ \"FieldId\":2340,\"ReportFieldId\": 1481, \"Value\":" + workRequestId + "}]}" }, this.SelectedActionPointsForRule);
    };
    WorkOrdereService.prototype.getChargebackListFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + " }" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getCustomerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{FormId:" + this.chargebackListFormId + " }", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    WorkOrdereService.prototype.getChargebackData = function (reportfieldIdValues, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + ", ListReportFieldIdValues: " + reportfieldIdValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    WorkOrdereService.prototype.loadChargebackAddEditFields = function (reportfieldIdValues, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + ", ListReportFieldIdValues: " + reportfieldIdValues + ",ParentFormId:" + this.chargebackListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkOrdereService.prototype.loadChargebackLookups = function (chargebackType) {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + " }", ChargebackType: chargebackType }, this.ChargebackLookupUrl);
    };
    WorkOrdereService.prototype.AddUpdateChargeback = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.chargebackListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.chargebackListFormId + "}" }, this.submitEditUrl);
        }
    };
    WorkOrdereService.prototype.getWorkorderDetails = function (workorderId) {
        return this.postaction({ Input: "{ FormId:" + this.chargebackListFormId + ", Id:" + workorderId + " }" }, this.workorderDetailsUrl);
    };
    WorkOrdereService.prototype.deleteChargeback = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId:" + this.chargebackListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    WorkOrdereService.prototype.loadAssignWorkTypestoSiteDetails = function () {
        return this.postaction({ Input: "{ FormId:" + this.AssingWTtoSiteFormId + "}" }, this.addDataUrl);
    };
    WorkOrdereService.prototype.postSubmitWorkTypestoSite = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AssingWTtoSiteFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.loadWorkTypesforSite = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.AssingWTtoSiteFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkOrdereService.prototype.updateJobStepsOrder = function (strRptFields) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + strRptFields + "}" }, this.updateJobStepsOrderUrl);
    };
    WorkOrdereService.prototype.updateSafetyStepsOrder = function (strRptFields) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + strRptFields + "}" }, this.updateSafetyStepsOrderUrl);
    };
    WorkOrdereService.prototype.getAssignEquipmentCalDDlFields = function () {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.getLookUpsForEquipmentClassDDL = function (parentId) {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ",ParentFieldId:" + 2910 + ",Id:" + parentId + " }" }, this.lookupUrl);
    };
    WorkOrdereService.prototype.getAssignEquipCalData = function (index, column, direction, isClassSelected, strRptFields) {
        if (isClassSelected == 0) {
            debugger;
            return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
        }
        else {
            debugger;
            return this.postaction({ Input: "{FormId:" + this.AssignEquipmentCalendarListFormId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.listDataListUrl);
        }
    };
    WorkOrdereService.prototype.getAssignEquipmentUpdateFields = function () {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentUpdateFormId + "}" }, this.listFieldObjUrl);
    };
    WorkOrdereService.prototype.postUpdateEquipmentCalendar = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AssignEquipmentUpdateFormId + ",ListReportFieldIdValues:" + pageDetails + ",ParentFormId:" + this.AssignEquipmentCalendarListFormId + "}" }, this.submitEditUrl);
    };
    WorkOrdereService.prototype.SpaceValidation = function (strRptFields, selectedId) {
        return this.postaction({ Input: strRptFields }, this.SpaceValidationUrl);
    };
    WorkOrdereService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WorkOrdereService);
    return WorkOrdereService;
}(HttpHelpers_1.HttpHelpers));
exports.WorkOrdereService = WorkOrdereService;
//# sourceMappingURL=workorder.service.js.map