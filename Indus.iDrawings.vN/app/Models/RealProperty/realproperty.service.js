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
var RealPropertyService = (function (_super) {
    __extends(RealPropertyService, _super);
    function RealPropertyService(http) {
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
        this.AddEditDataUrl = 'Common/GetAppFormFields';
        this.customerSettingsUrl = 'Common/GetSubscribedFeatures';
        //Passing Parameter ownershipId : 1:owned 3:leased
        this.listDataListUrlBuilding = 'Common/GetBuildingList';
        this.leaseRenewalsListUrl = 'RealProperty/GetLeaseRenewals';
        this.leaseClausesByLeaseUrl = 'RealProperty/GetLeaseClausesByLease';
        this.updateLeaseAgreementClausesUrl = 'RealProperty/UpdateLeaseAgreementClauses';
        this.clientInUseUrl = 'RealProperty/IsClientInUse';
        this.getAdditionalChargeTORateHighValue = 'RealProperty/GetFinancialStartEndRange';
        this.getLeaseItemSiteBuildingFloorManagement = 'RealProperty/GetLeaseSiteBuildingFloorManagement';
        this.insertUpdateRPMBuildings = 'RealProperty/InsertUpdateRPMBuildings';
        this.insertUpdateRPMFloors = 'RealProperty/InsertUpdateRPMFloors';
        this.checkIsEntityReferenceExistsUrl = 'Common/CheckIsEntityReferenceExists';
        this.AdditionalChargeInUse = 'RealProperty/IsCheckFinancialHeadInUse';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        //Specify the correct formid here : landlord/tenants same form.
        this.landlordtenantListFrmId = 168;
        this.landlordAddEditFrmId = 168;
        this.landlordListFrmId = 168;
        //rpm->Buildings->Owned/Leased
        this.buildinglistFormId = 1;
        this.buildingaddEditFormId = 2;
        //rpm->Buildings->Owned/Leased->Rennovations
        this.buildingRennovationlistFormId = 186;
        this.agreementClausesFormId = 170;
        this.agreementClausesAddEditFormId = 317;
        this.leaseAgreementClausesFormId = 318;
        this.cancellationClausesFormId = 321;
        this.additionalChargeRatesFormId = 171;
        this.additionalChargeRatesAddEditFormId = 329;
        this.contactListFormId = 172;
        this.contactAddEditFormId = 172;
        this.additionalChargeFormId = 173;
        this.additionalChargeListFormId = 359;
        this.leaseListFromId = 180;
        this.leaseAddEditFormId = 181;
        this.subleaseAddEditFormId = 185;
        this.leaseAreaCostDetailsFormId = 314;
        this.leaseRenewalListFormId = 196;
        this.renewLeaseFormId = 310;
        this.alertContactsFormId = 319;
        this.financialClausesFormId = 320;
        this.rentPaymentFormId = 322;
        this.rentInformationDetailsFormId = 323;
        this.UpdateRentPaymentFormId = 340;
        //---------------------------------
        this.CheckInUseLeaseClauses = 'RealProperty/CheckLeaseClausesinuse';
        this.UpdateLeaseFinancialClauses = 'RealProperty/UpdateLeaseAgreementFinancialClauses';
        this.CanLeaseStatusSetActive = 'RealProperty/GetIsLeaseStatusEditable';
        this.GetLeaseFinancialClauseIds = 'RealProperty/GetLeaseFinancialClauseId';
        this.InsertLeaseCancelCost = 'RealProperty/InsertLeaseCancellationCost';
        this.GetLeaseCancelCost = ' RealProperty/GetLeaseCancellationCost';
        this.getSessionValues = 'Common/GetSessionValues';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        //DashBoard
        this.getLeaseExpirationSqFtForDashboard = 'RealProperty/GetLeaseExpirationSqFtForDashboard';
        this.getLeaseRentableAreaForDashboard = 'RealProperty/GetLeaseRentableAreaForDashboard';
        this.getLeasedBuildingOccupancyForDashboard = 'RealProperty/GetLeasedBuildingOccupancyForDashboard';
        //Map
        this.MapFormId = 376;
        this.MapListUrl = 'RealProperty/GetGisData';
    }
    RealPropertyService.prototype.checkEntityReferenceExists = function (strReportFieldIds, Id) {
        return this.postaction({ input: "{Id:" + Id + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.checkIsEntityReferenceExistsUrl);
    };
    //getting grid data - landlord/tenant
    RealPropertyService.prototype.getClientsData = function (pageIndex, sortCol, sortDir, categorytype) {
        return this.postaction({ Input: "{ FormId: " + this.landlordtenantListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype + "\"}]}" }, this.listDataListUrl);
    };
    //Getting all the field column names - landlord/tenant
    RealPropertyService.prototype.getClientsColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.landlordtenantListFrmId + " }" }, this.listFieldObjUrl);
    };
    //loading add-edit form fields - landlord/tenant
    RealPropertyService.prototype.loadClientsAddEdit = function (selectedId, target, categorytype) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.landlordAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.landlordAddEditFrmId + ",ParentFormId:" + this.landlordtenantListFrmId + ",Id:" + selectedId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype + "\"}]}" }, this.editDataUrl);
        }
    };
    //Add edit submit - landlord/tenant
    RealPropertyService.prototype.AddUpdateClients = function (strRptFields, selectedId, target, categorytype) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.landlordAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.landlordtenantListFrmId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.landlordAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.landlordtenantListFrmId + "}" }, this.submitEditUrl);
        }
    };
    //Inline add edit - landlord/tenant
    RealPropertyService.prototype.InlineAddUpdateClients = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    //delete  - landlord/tenant
    RealPropertyService.prototype.deleteClients = function (selectedID) {
        return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + ",Id:" + selectedID + "}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.isClientInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + ",Id:" + selectedId + "}" }, this.clientInUseUrl);
    };
    /***************************************************************************************************/
    //AgreementClauses
    RealPropertyService.prototype.getAgreementClausesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.agreementClausesFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getAgreementClausesData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.getLeaseClausesByLeaseUrl = function (index, column, direction, leaseId, leaseRenewalCount) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5726,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":5727,\"Value\": " + leaseRenewalCount + " }]}" }, this.leaseClausesByLeaseUrl);
    };
    RealPropertyService.prototype.getLeaseAgreementClausesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.leaseAgreementClausesFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getLeaseAgreementClauses = function (index, column, direction, leaseId, leaseRenewalCount) {
        return this.postaction({ Input: "{FormId:" + this.leaseAgreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5726,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":5727,\"Value\": " + leaseRenewalCount + " }]}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.postSubmitLeaseAgreementClauses = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.leaseAgreementClausesFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.updateLeaseAgreementClausesUrl);
    };
    RealPropertyService.prototype.loadAgreementClausesAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.agreementClausesAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.agreementClausesAddEditFormId + ",ParentFormId:" + this.agreementClausesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    RealPropertyService.prototype.postSubmitAddEditAgreementClauses = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.agreementClausesAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.agreementClausesFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.agreementClausesAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + ",ParentFormId:" + this.agreementClausesFormId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.postDeleteAgreementClauses = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.checkAgreementClausesInUse = function (selectedId) {
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.CheckInUseLeaseClauses);
    };
    RealPropertyService.prototype.getContactColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.contactListFormId + " }" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getContactData = function (moduleId, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.contactListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.loadContactsAddEdit = function (selectedId, target, moduleId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.contactAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.contactAddEditFormId + ",ParentFormId:" + this.contactAddEditFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.editDataUrl);
        }
    };
    RealPropertyService.prototype.InlineAddUpdateContacts = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.contactListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.contactListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.AddUpdateContacts = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.contactAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.contactListFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.contactAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.contactListFormId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.deleteContacts = function (selectedId, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.contactListFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.getAdditionalChargeRatesDataField = function () {
        return this.postaction({ Input: "{ FormId: " + this.additionalChargeRatesFormId + " }" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getAdditionalChargeRatesFieldData = function (categoryid, selectedID, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],Id:" + selectedID + "}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.AddUpdateAdditionalChargeRates = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.additionalChargeRatesFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.additionalChargeRatesFormId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.loadAdditionalChargeRatesAddEdit = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues:[ " + JSON.stringify(strRptFields[0]) + "],ParentFormId:" + this.additionalChargeRatesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    RealPropertyService.prototype.getAdditionalChargeTORateHighValueFuctn = function (selectedId) {
        // return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + "}", attachmentCategoryId, baseEntityId }, this.attachmentDetails)
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.getAdditionalChargeTORateHighValue);
    };
    RealPropertyService.prototype.postAdditionalChargeRatesUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.postAdditionalChargeRatesInsert = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:0" + "}" }, this.submitAddUrl);
    };
    RealPropertyService.prototype.sortAdditionalChargeRates = function (direction, column, categoryid, selectedID) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + "',ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],Id:" + selectedID + "}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.postAdditionalChargeRatesDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.getAdditionalChargesFields = function () {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getAdditionalChargesData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.loadAdditionalChargeAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5711,\"Value\":\"" + 0 + "\"}],ParentFormId:" + this.additionalChargeListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    RealPropertyService.prototype.postAddAdditionalChargesDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    RealPropertyService.prototype.postEditAdditionalChargesDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.postDeleteAdditionalChargesDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    //***********************************************************************************
    //Building owned/lease
    //Getting Building Data : Building owned/lease : Passing Parameter ownershipId : 1:owned 3:leased
    RealPropertyService.prototype.getBuildingData = function (index, column, direction, ownerShipId, ReportFieldIdValues) {
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",ListReportFieldIdValues:" + ReportFieldIdValues + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" /*, OwnerShipId: ownerShipId*/ }, this.listDataListUrl); //this.listDataListUrlBuilding
    };
    //Getting all the field columns : Building owned/lease
    RealPropertyService.prototype.getBuildingColumnData = function () {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + "}" }, this.listFieldObjUrl);
    };
    //Sorting  : Building owned/lease
    RealPropertyService.prototype.sortBuilding = function (index, direction, column, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    //Building page  : Building owned/lease
    RealPropertyService.prototype.buildingPage = function (index, direction, column, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    //loading add-edit form fields : Building owned/lease
    RealPropertyService.prototype.loadBuildingAddEdit = function (selectedId, addEdit) {
        if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.buildinglistFormId + " }" }, this.editDataUrl);
        }
        return this.postaction({ id: 1 }, this.AddEditDataUrl);
    };
    //Edit from form : Building owned/lease
    RealPropertyService.prototype.submitBuildingEdit = function (pageDetails, id) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitEditUrl);
    };
    //Edit from the grid itself : Building owned/lease   //Inline add edit - landlord/tenant
    RealPropertyService.prototype.InlineAddUpdateBuilding = function (strRptFields, selectedId, target) {
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    //************* 
    //Rennovations
    RealPropertyService.prototype.getRennovationFields = function () {
        return this.postaction({ Input: "{FormId:186}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getRennovationData = function (index, column, direction, buildingId) {
        return this.postaction({ Input: "{FormId:186,Id:" + buildingId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId +",Id:"+ buildingId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.getRenovationAddLoad = function () {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + "}" }, this.addDataUrl);
    };
    RealPropertyService.prototype.AddUpdateRenovation = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.postAddRennovationDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    RealPropertyService.prototype.postEditRennovationDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.postDeleteRennovationDetails = function (selectId, Rennovationdate) {
        return this.postaction({ Input: "{FormId:186,Id:" + selectId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":6695,\"Value\":\"" + selectId + "\"},{ \"ReportFieldId\":6696,\"Value\":\"" + Rennovationdate + "\"},{ \"ReportFieldId\":271,\"Value\":\"30\"}]}" }, this.deleteUrl);
    };
    //Getting all the field columns
    RealPropertyService.prototype.getLeaseListColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.leaseListFromId + " }" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getLeaseListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.leaseListFromId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.loadLeaseAddEdit = function (selectedId, target) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.leaseAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1034,\"ReportFieldId\": 12097, \"Value\":\"1300\" },{ \"FieldId\":981,\"ReportFieldId\": 6140, \"Value\":\"2\" },{ \"FieldId\":982,\"ReportFieldId\": 6140, \"Value\":\"1\" }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.leaseAddEditFormId + ",ParentFormId:" + this.leaseListFromId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1034,\"ReportFieldId\": 12097, \"Value\":\"1300\" },{ \"FieldId\":981,\"ReportFieldId\": 6140, \"Value\":\"2\" },{ \"FieldId\":982,\"ReportFieldId\": 6140, \"Value\":\"1\" }], ListReportFieldIdValues:[{\"ReportFieldId\":6029,\"Value\":\"" + selectedId + "\"}]}" }, this.editDataUrl);
        }
    };
    RealPropertyService.prototype.submitAddUpdateLease = function (strRptFields, selectedId, target) {
        if (target == "add") {
            return this.postaction({ Input: "{FormId:" + this.leaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.leaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
        }
    };
    RealPropertyService.prototype.submitUpdateLeaseFinancialClauses = function (FinanceRptFields) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + FinanceRptFields + "}" }, this.UpdateLeaseFinancialClauses);
    };
    RealPropertyService.prototype.deleteLease = function (selectedId, leaseRenewalCount) {
        return this.postaction({ Input: "{FormId:" + this.leaseListFromId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5681,\"Value\":\"" + leaseRenewalCount + "\"}]}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.loadSubLeaseAddEdit = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.subleaseAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1038,\"ReportFieldId\": 6169, \"Value\":\"7\" },{ \"FieldId\":1038,\"ReportFieldId\": 6169, \"Value\":\"8\" },{ \"FieldId\":1015,\"ReportFieldId\": 6140, \"Value\":\"1\" },{ \"FieldId\":1036,\"ReportFieldId\": 6140, \"Value\":\"2\" }]}" }, this.addDataUrl); //6169 for sublease property type
    };
    RealPropertyService.prototype.submitAddUpdateSubLease = function (strRptFields, selectedId) {
        return this.postaction({ Input: "{FormId:" + this.subleaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitAddUrl);
    };
    RealPropertyService.prototype.loadareaCostDetails = function (selectedId, leaseRenewalCount) {
        return this.postaction({ Input: "{ FormId:" + this.leaseAreaCostDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5756,\"Value\":\"" + selectedId + "\"}, {\"ReportFieldId\":5757,\"Value\":\"" + leaseRenewalCount + "\"}]" + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1705,\"ReportFieldId\": 12097, \"Value\":\"2183\" }]}" }, this.editDataUrl);
    };
    RealPropertyService.prototype.submitAreaCostDetails = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.leaseAreaCostDetailsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.rentInformationDetails = function (selectedId, leaseRenewalCount) {
        return this.postaction({ Input: "{ FormId:" + this.rentInformationDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5693,\"Value\":\"" + selectedId + "\"}, {\"ReportFieldId\":5694,\"Value\":\"" + leaseRenewalCount + "\"}]" + ",ListLookupReportFieldIdValues: [{ \"FieldId\":1773,\"ReportFieldId\": 12097, \"Value\":\"2440\" }]}" }, this.editDataUrl);
    };
    RealPropertyService.prototype.submitRentInfoDetails = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.rentInformationDetailsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.getLeaseRenewalListColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.leaseRenewalListFormId + " }" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getLeaseRenewalListData = function (leaseId, renewalCount, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.leaseRenewalListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + leaseId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5694,\"Value\":\"" + renewalCount + "\"}] }" }, this.leaseRenewalsListUrl);
    };
    RealPropertyService.prototype.loadRenewLease = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.renewLeaseFormId + "}" }, this.addDataUrl);
    };
    RealPropertyService.prototype.postSubmitRenewLease = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.renewLeaseFormId + ",ParentFormId:" + this.leaseRenewalListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    RealPropertyService.prototype.deleteLeaseRenewal = function (leaseId, renewalCount) {
        return this.postaction({ Input: "{FormId:" + this.leaseRenewalListFormId + ",Id:" + leaseId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5694 ,\"Value\":\"" + renewalCount + "\"}]}" }, this.deleteUrl);
    };
    RealPropertyService.prototype.getContactsForAlertFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.alertContactsFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getContactsForAlert = function (index, column, direction, leaseId) {
        return this.postaction({ Input: "{FormId:" + this.alertContactsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5768,\"Value\":\"" + leaseId + "\"}]}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.postSubmitContactsForAlert = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.alertContactsFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.getCancellationClausesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.cancellationClausesFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getCancellationClauses = function (index, column, direction, leaseId, leaseRenewalCount) {
        return this.postaction({ Input: "{FormId:" + this.cancellationClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":7382,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7383,\"Value\":\"" + leaseRenewalCount + "\"}]}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.postSubmitCancellationClauses = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.cancellationClausesFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.getFinancialClausesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.financialClausesFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getFinancialClauses = function (index, column, direction, leaseTypeId) {
        return this.postaction({ Input: "{FormId:" + this.financialClausesFormId + ",ListReportFieldIdValues:" + leaseTypeId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.getRentInformationFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.rentPaymentFormId + "}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getRentInformation = function (index, column, direction, leaseId, leaseRenewalCount) {
        return this.postaction({ Input: "{FormId:" + this.rentPaymentFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":7865,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7866,\"Value\":\"" + leaseRenewalCount + "\"}, {\"ReportFieldId\":7867,\"Value\":\"" + 0 + "\"}]}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.updateRentPayment = function (leaseId, leaseRenewalCount, paymentno) {
        return this.postaction({ Input: "{ FormId:" + this.UpdateRentPaymentFormId + ",ParentFormId:" + this.rentPaymentFormId + ",Id:" + 0 + ",ListReportFieldIdValues:[{\"ReportFieldId\":7865,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7866,\"Value\":\"" + leaseRenewalCount + "\"}, {\"ReportFieldId\":7867,\"Value\":\"" + paymentno + "\"}]}" }, this.editDataUrl);
    };
    RealPropertyService.prototype.updateRentPaymentSubmit = function (strUpdateDeatils) {
        return this.postaction({ Input: "{ FormId:" + this.UpdateRentPaymentFormId + ",ParentFormId:" + this.rentPaymentFormId + ",Id: " + 0 + " ,ListReportFieldIdValues: " + strUpdateDeatils + "}" }, this.submitEditUrl);
    };
    RealPropertyService.prototype.customerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerSettingsUrl);
    };
    RealPropertyService.prototype.rentRollsDateSelector = function () {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.IsCostRentEntered = function (selectedId) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.CanLeaseStatusSetActive);
    };
    RealPropertyService.prototype.GetLeaseFinancialClauseId = function (selectedId) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.GetLeaseFinancialClauseIds);
    };
    RealPropertyService.prototype.LeaseCancellationCost = function (cost, selectedId) {
        return this.postaction({ Input: "{Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":7387,\"Value\":\"" + cost + "\"}]}" }, this.InsertLeaseCancelCost);
    };
    RealPropertyService.prototype.getCancellationCost = function (selectedId) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.GetLeaseCancelCost);
    };
    //Lease Item Begin
    RealPropertyService.prototype.getLeaseSiteBuildingFloorManagement = function (Leaseid, RenewalCount, Target) {
        return this.postaction({ Input: "{ Id:0 }", Leaseid: Leaseid, RenewalCount: RenewalCount, Target: Target }, this.getLeaseItemSiteBuildingFloorManagement);
    };
    RealPropertyService.prototype.InsertUpdateRPMBuildings = function (Leaseid, RenewalCount, BuildingData) {
        return this.postaction({ Input: "{ Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":5684,\"Value\":\"" + Leaseid + "\"},{\"ReportFieldId\":5685,\"Value\":\"" + RenewalCount + "\"}] }", Leaseid: Leaseid, RenewalCount: RenewalCount, BuildingData: BuildingData, RowSeperator: "§", ColumnSeperator: "µ" }, this.insertUpdateRPMBuildings);
    };
    RealPropertyService.prototype.InsertUpdateRPMFloors = function (ReportFieldIdValues) {
        return this.postaction({ Input: "{ Id:0,ListReportFieldIdValues:" + ReportFieldIdValues + "}" }, this.insertUpdateRPMFloors);
    };
    RealPropertyService.prototype.getExportData = function (formId, ParentFormId, index, sortDirection, sortColumn, fieldObjects, ReportFieldIdValues, fileName, keywordSearch, advancedSearchValue) {
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
        return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',ListReportFieldIdValues:" + ReportFieldIdValues + ",IsKeywordSearch:0,IsAdvancedSearch:0,IsExport:1}", fileName: fileName, fields: filterArray };
    };
    RealPropertyService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    RealPropertyService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    };
    RealPropertyService.prototype.isAdditionalChargeInUse = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + ",Id:" + selectedId + "}", Option: 0 }, this.AdditionalChargeInUse);
    };
    //Lease Ttem End
    //map
    RealPropertyService.prototype.getMapColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.MapFormId + " }" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.getGISData = function (OwnerShipType) {
        return this.postaction({ Input: "{ FormId:" + this.MapFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":7013,\"Value\":\"" + OwnerShipType + "\"}]}" }, this.MapListUrl);
    };
    RealPropertyService.prototype.GetLeaseExpirationSqFtForDashboard = function () {
        return this.postaction({}, this.getLeaseExpirationSqFtForDashboard);
    };
    RealPropertyService.prototype.GetLeaseRentableAreaForDashboard = function () {
        return this.postaction({}, this.getLeaseRentableAreaForDashboard);
    };
    RealPropertyService.prototype.GetLeasedBuildingOccupancyForDashboard = function () {
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":571,\"Value\":\" 0 \"}] }" }, this.getLeasedBuildingOccupancyForDashboard);
    };
    RealPropertyService.prototype.GetCriticalLeaseDatesFields = function () {
        return this.postaction({ Input: "{FormId:386}" }, this.listFieldObjUrl);
    };
    RealPropertyService.prototype.GetCriticalLeaseDatesData = function (column, direction) {
        return this.postaction({ Input: "{FormId:386, SortColumn: '" + column + "', SortDirection: '" + direction + "'}" }, this.listDataListUrl);
    };
    RealPropertyService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    RealPropertyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RealPropertyService);
    return RealPropertyService;
}(HttpHelpers_1.HttpHelpers));
exports.RealPropertyService = RealPropertyService;
//# sourceMappingURL=realproperty.service.js.map