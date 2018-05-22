import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class RealPropertyService extends HttpHelpers {
    //All general functions 
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private AddEditDataUrl = 'Common/GetAppFormFields'
    private customerSettingsUrl = 'Common/GetSubscribedFeatures';

    //Passing Parameter ownershipId : 1:owned 3:leased
    private listDataListUrlBuilding = 'Common/GetBuildingList';

    private leaseRenewalsListUrl = 'RealProperty/GetLeaseRenewals';
    private leaseClausesByLeaseUrl = 'RealProperty/GetLeaseClausesByLease';
    private updateLeaseAgreementClausesUrl = 'RealProperty/UpdateLeaseAgreementClauses';
    private clientInUseUrl = 'RealProperty/IsClientInUse';
    private getAdditionalChargeTORateHighValue = 'RealProperty/GetFinancialStartEndRange';
    private getLeaseItemSiteBuildingFloorManagement = 'RealProperty/GetLeaseSiteBuildingFloorManagement';
    private insertUpdateRPMBuildings = 'RealProperty/InsertUpdateRPMBuildings';
    private insertUpdateRPMFloors = 'RealProperty/InsertUpdateRPMFloors';
    private checkIsEntityReferenceExistsUrl = 'Common/CheckIsEntityReferenceExists';
    private AdditionalChargeInUse = 'RealProperty/IsCheckFinancialHeadInUse';

    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';

    //Specify the correct formid here : landlord/tenants same form.
    private landlordtenantListFrmId = 168;
    private landlordAddEditFrmId = 168;
    private landlordListFrmId = 168;
    //rpm->Buildings->Owned/Leased
    private buildinglistFormId = 1;
    private buildingaddEditFormId = 2;
     //rpm->Buildings->Owned/Leased->Rennovations
    private buildingRennovationlistFormId = 186;
   
    private agreementClausesFormId = 170;
    private agreementClausesAddEditFormId = 317;
    private leaseAgreementClausesFormId = 318;
    private cancellationClausesFormId = 321;

    private additionalChargeRatesFormId = 171;
    private additionalChargeRatesAddEditFormId = 329;
        
    private contactListFormId = 172;
    private contactAddEditFormId = 172;
    private additionalChargeFormId = 173;
    private additionalChargeListFormId = 359;

    private leaseListFromId = 180;
    private leaseAddEditFormId = 181;
    private subleaseAddEditFormId = 185;
    private leaseAreaCostDetailsFormId = 314;
    private leaseRenewalListFormId = 196;
    private renewLeaseFormId = 310;
    private alertContactsFormId = 319;
    private financialClausesFormId = 320;
    private rentPaymentFormId = 322;
    private rentInformationDetailsFormId = 323;
    private UpdateRentPaymentFormId = 340;
    //---------------------------------

    private CheckInUseLeaseClauses = 'RealProperty/CheckLeaseClausesinuse';
    private UpdateLeaseFinancialClauses = 'RealProperty/UpdateLeaseAgreementFinancialClauses';
    private CanLeaseStatusSetActive = 'RealProperty/GetIsLeaseStatusEditable';
    private GetLeaseFinancialClauseIds = 'RealProperty/GetLeaseFinancialClauseId';
    private InsertLeaseCancelCost = 'RealProperty/InsertLeaseCancellationCost';
    private GetLeaseCancelCost = ' RealProperty/GetLeaseCancellationCost';
    private getSessionValues = 'Common/GetSessionValues';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';

    //DashBoard
    private getLeaseExpirationSqFtForDashboard = 'RealProperty/GetLeaseExpirationSqFtForDashboard';
    private getLeaseRentableAreaForDashboard = 'RealProperty/GetLeaseRentableAreaForDashboard';
    private getLeasedBuildingOccupancyForDashboard = 'RealProperty/GetLeasedBuildingOccupancyForDashboard';


   //Map
    private MapFormId = 376;
    private MapListUrl = 'RealProperty/GetGisData';
    constructor(private http: Http) {
        super(http);
    }

    checkEntityReferenceExists(strReportFieldIds: string, Id: number) {
        return this.postaction({ input: "{Id:" + Id + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.checkIsEntityReferenceExistsUrl);
    }

    //getting grid data - landlord/tenant
    getClientsData(pageIndex?: number, sortCol?: string, sortDir?: string, categorytype?: number) {
        return this.postaction({ Input: "{ FormId: " + this.landlordtenantListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype +"\"}]}" }, this.listDataListUrl);
    }

    //Getting all the field column names - landlord/tenant
    getClientsColumns() {
        return this.postaction({ Input: "{ FormId:" + this.landlordtenantListFrmId + " }" }, this.listFieldObjUrl);
    }

    //loading add-edit form fields - landlord/tenant
    loadClientsAddEdit(selectedId: number, target: number, categorytype: string) {
      
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.landlordAddEditFrmId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.landlordAddEditFrmId + ",ParentFormId:" + this.landlordtenantListFrmId + ",Id:" + selectedId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":6140,\"Value\":\"" + categorytype +"\"}]}" }, this.editDataUrl);
        }
    }
    //Add edit submit - landlord/tenant
    AddUpdateClients(strRptFields: string, selectedId: number, target: number, categorytype: string) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.landlordAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.landlordtenantListFrmId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.landlordAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.landlordtenantListFrmId + "}" }, this.submitEditUrl);
        }

    }
    //Inline add edit - landlord/tenant
    InlineAddUpdateClients(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    //delete  - landlord/tenant
    deleteClients(selectedID: any) {
        return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + ",Id:" + selectedID + "}" }, this.deleteUrl)
    }  

    isClientInUse(selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.landlordtenantListFrmId + ",Id:" + selectedId + "}" }, this.clientInUseUrl)
    }

    /***************************************************************************************************/

    //AgreementClauses
    getAgreementClausesFields() {
        return this.postaction({ Input: "{ FormId:" + this.agreementClausesFormId + "}" }, this.listFieldObjUrl);
    }

    getAgreementClausesData(index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    }

    getLeaseClausesByLeaseUrl(index: number, column: any, direction: any, leaseId: number, leaseRenewalCount: number) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5726,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":5727,\"Value\": "+ leaseRenewalCount +" }]}" }, this.leaseClausesByLeaseUrl);
    }

    getLeaseAgreementClausesFields() {
        return this.postaction({ Input: "{ FormId:" + this.leaseAgreementClausesFormId + "}" }, this.listFieldObjUrl);
    }

    getLeaseAgreementClauses(index: number, column: any, direction: any, leaseId: number, leaseRenewalCount: number) {
        return this.postaction({ Input: "{FormId:" + this.leaseAgreementClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5726,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":5727,\"Value\": " + leaseRenewalCount + " }]}" }, this.listDataListUrl);
    }

    postSubmitLeaseAgreementClauses(selectedRowIds, selectedId) { 
        return this.postaction({ Input: "{ FormId:" + this.leaseAgreementClausesFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.updateLeaseAgreementClausesUrl);
    }

    loadAgreementClausesAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.agreementClausesAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.agreementClausesAddEditFormId + ",ParentFormId:" + this.agreementClausesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
        
    postSubmitAddEditAgreementClauses(pageDetails: any, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.agreementClausesAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.agreementClausesFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.agreementClausesAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + ",ParentFormId:" + this.agreementClausesFormId + "}" }, this.submitEditUrl);
        }
    }

    postDeleteAgreementClauses(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.agreementClausesFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }
    checkAgreementClausesInUse(selectedId: any) {
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.CheckInUseLeaseClauses)
    }
    
    getContactColumns() {
        return this.postaction({ Input: "{ FormId:" + this.contactListFormId + " }" }, this.listFieldObjUrl);
    }

    getContactData(moduleId: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.contactListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}"  }, this.listDataListUrl);
    }

    loadContactsAddEdit(selectedId: number, target: number, moduleId: string) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.contactAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.contactAddEditFormId + ",ParentFormId:" + this.contactAddEditFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.editDataUrl);
        }
    }

    InlineAddUpdateContacts(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.contactListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.contactListFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

   
    AddUpdateContacts(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.contactAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.contactListFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.contactAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.contactListFormId + "}" }, this.submitEditUrl);
        }

    }

    deleteContacts(selectedId: any, moduleId: string) {
        return this.postaction({ Input: "{FormId:" + this.contactListFormId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\": " + moduleId + " }]}" }, this.deleteUrl)
    }

    getAdditionalChargeRatesDataField() {
        return this.postaction({ Input: "{ FormId: " + this.additionalChargeRatesFormId + " }" }, this.listFieldObjUrl);
    }

    getAdditionalChargeRatesFieldData(categoryid: any, selectedID: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],Id:" + selectedID + "}" }, this.listDataListUrl);
    }

    AddUpdateAdditionalChargeRates(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.additionalChargeRatesFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.additionalChargeRatesFormId + "}" }, this.submitEditUrl);
        }
    }

    loadAdditionalChargeRatesAddEdit(strRptFields: any,selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesAddEditFormId + " ,ListReportFieldIdValues:[ " + JSON.stringify(strRptFields[0]) + "],ParentFormId:" + this.additionalChargeRatesFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    getAdditionalChargeTORateHighValueFuctn(selectedId: number) {
       // return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + "}", attachmentCategoryId, baseEntityId }, this.attachmentDetails)
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.getAdditionalChargeTORateHighValue);
    }

    postAdditionalChargeRatesUpdate(pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postAdditionalChargeRatesInsert(pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.additionalChargeRatesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:0" +  "}" }, this.submitAddUrl);
    }

    sortAdditionalChargeRates(direction: any, column: any, categoryid: any, selectedID: number) {       
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",SortColumn:'[" + column + "]',SortDirection:'" + direction + "',ListReportFieldIdValues:[" + JSON.stringify(categoryid[0]) + "],Id:" + selectedID + "}" }, this.listDataListUrl);
    }

    postAdditionalChargeRatesDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeRatesFormId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    getAdditionalChargesFields() {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + "}" }, this.listFieldObjUrl);
    }
    getAdditionalChargesData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    loadAdditionalChargeAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.additionalChargeFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5711,\"Value\":\"" + 0 + "\"}],ParentFormId:" + this.additionalChargeListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    postAddAdditionalChargesDetails(pageDetails) {        
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditAdditionalChargesDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteAdditionalChargesDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
    //***********************************************************************************
    //Building owned/lease
    //Getting Building Data : Building owned/lease : Passing Parameter ownershipId : 1:owned 3:leased
    getBuildingData(index: any, column: any, direction: any, ownerShipId: any, ReportFieldIdValues:any) {   
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",ListReportFieldIdValues:" + ReportFieldIdValues + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}"/*, OwnerShipId: ownerShipId*/ }, this.listDataListUrl);//this.listDataListUrlBuilding
    }

    //Getting all the field columns : Building owned/lease
    getBuildingColumnData() { 
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + "}" }, this.listFieldObjUrl)
    }

    //Sorting  : Building owned/lease
    sortBuilding(index?: number, direction?: any, column?: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }

     //Building page  : Building owned/lease
    buildingPage(index: number, direction: any, column: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.buildinglistFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }

    //loading add-edit form fields : Building owned/lease
    loadBuildingAddEdit(selectedId: number, addEdit: string) {     
       if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.buildingaddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.buildinglistFormId + " }" }, this.editDataUrl);
        }
       return this.postaction({ id: 1 }, this.AddEditDataUrl);       
    }

    //Edit from form : Building owned/lease
    submitBuildingEdit(pageDetails: IField[], id: any) {
        console.log('entered edit service');
        return this.postaction({ Input: "{FormId:" + this.buildingaddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.buildinglistFormId + "}" }, this.submitEditUrl);
    }
    //Edit from the grid itself : Building owned/lease   //Inline add edit - landlord/tenant
    InlineAddUpdateBuilding(strRptFields: string, selectedId: number, target: number) {        
        return this.postaction({ Input: "{FormId:" + this.buildinglistFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
       
    }
    
    //************* 
    //Rennovations
    getRennovationFields() {
        return this.postaction({ Input: "{FormId:186}" }, this.listFieldObjUrl);
    }
    getRennovationData(index: number, column: any, direction: any, buildingId: any) {
        return this.postaction({ Input: "{FormId:186,Id:" + buildingId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index  + "}" }, this.listDataListUrl);
       // return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId +",Id:"+ buildingId + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    getRenovationAddLoad() {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + "}" }, this.addDataUrl);
    }
    AddUpdateRenovation(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postAddRennovationDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId+",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditRennovationDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.buildingRennovationlistFormId+",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteRennovationDetails(selectId, Rennovationdate) {
        return this.postaction({ Input: "{FormId:186,Id:" + selectId + ",ListReportFieldIdValues:[{ \"ReportFieldId\":6695,\"Value\":\"" + selectId + "\"},{ \"ReportFieldId\":6696,\"Value\":\"" + Rennovationdate + "\"},{ \"ReportFieldId\":271,\"Value\":\"30\"}]}" }, this.deleteUrl);
    }
    //Getting all the field columns
    getLeaseListColumns() {
        return this.postaction({ Input: "{ FormId:" + this.leaseListFromId + " }" }, this.listFieldObjUrl);
    }

    getLeaseListData(pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.leaseListFromId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl);
    }

    loadLeaseAddEdit(selectedId: number, target: string) {
        if (target == "add") {
            return this.postaction({ Input: "{ FormId:" + this.leaseAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1034,\"ReportFieldId\": 12097, \"Value\":\"1300\" },{ \"FieldId\":981,\"ReportFieldId\": 6140, \"Value\":\"2\" },{ \"FieldId\":982,\"ReportFieldId\": 6140, \"Value\":\"1\" }]}" }, this.addDataUrl);
        }
        else { //6029
            return this.postaction({ Input: "{ FormId:" + this.leaseAddEditFormId + ",ParentFormId:" + this.leaseListFromId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1034,\"ReportFieldId\": 12097, \"Value\":\"1300\" },{ \"FieldId\":981,\"ReportFieldId\": 6140, \"Value\":\"2\" },{ \"FieldId\":982,\"ReportFieldId\": 6140, \"Value\":\"1\" }], ListReportFieldIdValues:[{\"ReportFieldId\":6029,\"Value\":\"" + selectedId + "\"}]}" }, this.editDataUrl);
        }
    }

    submitAddUpdateLease(strRptFields: string, selectedId: number, target: string) {
        if (target == "add")
        {
            return this.postaction({ Input: "{FormId:" + this.leaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.leaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
        }
    }

    submitUpdateLeaseFinancialClauses(FinanceRptFields: string) {
        return this.postaction({ Input: "{ListReportFieldIdValues: " + FinanceRptFields + "}" }, this.UpdateLeaseFinancialClauses);
    }
    deleteLease(selectedId: any, leaseRenewalCount: number) {
        return this.postaction({ Input: "{FormId:" + this.leaseListFromId + ",Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5681,\"Value\":\"" + leaseRenewalCount + "\"}]}" }, this.deleteUrl)
    }

    loadSubLeaseAddEdit(selectedId: number) {
        return this.postaction({ Input: "{ FormId:" + this.subleaseAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1038,\"ReportFieldId\": 6169, \"Value\":\"7\" },{ \"FieldId\":1038,\"ReportFieldId\": 6169, \"Value\":\"8\" },{ \"FieldId\":1015,\"ReportFieldId\": 6140, \"Value\":\"1\" },{ \"FieldId\":1036,\"ReportFieldId\": 6140, \"Value\":\"2\" }]}" }, this.addDataUrl); //6169 for sublease property type
    }

    submitAddUpdateSubLease(strRptFields: string, selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.subleaseAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitAddUrl);
    }

    loadareaCostDetails(selectedId: number, leaseRenewalCount: any) {
        return this.postaction({ Input: "{ FormId:" + this.leaseAreaCostDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5756,\"Value\":\"" + selectedId + "\"}, {\"ReportFieldId\":5757,\"Value\":\"" + leaseRenewalCount + "\"}]" + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1705,\"ReportFieldId\": 12097, \"Value\":\"2183\" }]}" }, this.editDataUrl);
    }

    submitAreaCostDetails(strRptFields: string) {
        return this.postaction({ Input: "{FormId:" + this.leaseAreaCostDetailsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
    }    
    rentInformationDetails(selectedId: number, leaseRenewalCount: any) {
        return this.postaction({ Input: "{ FormId:" + this.rentInformationDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5693,\"Value\":\"" + selectedId + "\"}, {\"ReportFieldId\":5694,\"Value\":\"" + leaseRenewalCount + "\"}]" + ",ListLookupReportFieldIdValues: [{ \"FieldId\":1773,\"ReportFieldId\": 12097, \"Value\":\"2440\" }]}" }, this.editDataUrl);
    }

    submitRentInfoDetails(strRptFields: string) {
        return this.postaction({ Input: "{FormId:" + this.rentInformationDetailsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.leaseListFromId + "}" }, this.submitEditUrl);
    }

    getLeaseRenewalListColumns() {
        return this.postaction({ Input: "{ FormId:" + this.leaseRenewalListFormId + " }" }, this.listFieldObjUrl);
    }

    getLeaseRenewalListData(leaseId: any, renewalCount: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.leaseRenewalListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + leaseId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5694,\"Value\":\"" + renewalCount + "\"}] }" }, this.leaseRenewalsListUrl);
    }

    loadRenewLease(selectedId: number) {
        return this.postaction({ Input: "{ FormId:" + this.renewLeaseFormId + "}" }, this.addDataUrl);
    }

    postSubmitRenewLease(pageDetails: any) {
        return this.postaction({ Input: "{ FormId:" + this.renewLeaseFormId + ",ParentFormId:" + this.leaseRenewalListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    deleteLeaseRenewal(leaseId: any, renewalCount: number) {
        return this.postaction({ Input: "{FormId:" + this.leaseRenewalListFormId + ",Id:" + leaseId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5694 ,\"Value\":\"" + renewalCount + "\"}]}" }, this.deleteUrl)
    }

    getContactsForAlertFields() {
        return this.postaction({ Input: "{ FormId:" + this.alertContactsFormId + "}" }, this.listFieldObjUrl);
    }

    getContactsForAlert(index: number, column: any, direction: any, leaseId: number) {
        return this.postaction({ Input: "{FormId:" + this.alertContactsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5768,\"Value\":\"" + leaseId + "\"}]}" }, this.listDataListUrl);
    }

    postSubmitContactsForAlert(selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.alertContactsFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    }

    getCancellationClausesFields() {
        return this.postaction({ Input: "{ FormId:" + this.cancellationClausesFormId + "}" }, this.listFieldObjUrl);
    }

    getCancellationClauses(index: number, column: any, direction: any, leaseId: number, leaseRenewalCount: any) {
        return this.postaction({ Input: "{FormId:" + this.cancellationClausesFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":7382,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7383,\"Value\":\"" + leaseRenewalCount + "\"}]}" }, this.listDataListUrl);
    }

    postSubmitCancellationClauses(selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.cancellationClausesFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    }

    getFinancialClausesFields() {
        return this.postaction({ Input: "{ FormId:" + this.financialClausesFormId + "}" }, this.listFieldObjUrl);
    }

    getFinancialClauses(index: number, column: any, direction: any, leaseTypeId) {
        return this.postaction({ Input: "{FormId:" + this.financialClausesFormId + ",ListReportFieldIdValues:" + leaseTypeId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    }
    
    getRentInformationFields() {
        return this.postaction({ Input: "{ FormId:" + this.rentPaymentFormId + "}" }, this.listFieldObjUrl);
    }

    getRentInformation(index: number, column: any, direction: any, leaseId: number, leaseRenewalCount: any) {
        return this.postaction({ Input: "{FormId:" + this.rentPaymentFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":7865,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7866,\"Value\":\"" + leaseRenewalCount + "\"}, {\"ReportFieldId\":7867,\"Value\":\"" + 0 + "\"}]}" }, this.listDataListUrl);
    }

    updateRentPayment(leaseId: number, leaseRenewalCount: number, paymentno: number) {
        return this.postaction({ Input: "{ FormId:" + this.UpdateRentPaymentFormId + ",ParentFormId:" + this.rentPaymentFormId + ",Id:" + 0 + ",ListReportFieldIdValues:[{\"ReportFieldId\":7865,\"Value\":\"" + leaseId + "\"}, {\"ReportFieldId\":7866,\"Value\":\"" + leaseRenewalCount + "\"}, {\"ReportFieldId\":7867,\"Value\":\"" + paymentno + "\"}]}" }, this.editDataUrl);
    }
    updateRentPaymentSubmit(strUpdateDeatils) {
        return this.postaction({ Input: "{ FormId:" + this.UpdateRentPaymentFormId + ",ParentFormId:" + this.rentPaymentFormId + ",Id: "+ 0 +" ,ListReportFieldIdValues: " + strUpdateDeatils + "}" }, this.submitEditUrl);
    }     

    customerSubscribedFeatures(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerSettingsUrl);
    } 
     
    rentRollsDateSelector() {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    }

    IsCostRentEntered(selectedId: number) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.CanLeaseStatusSetActive);
    }
    GetLeaseFinancialClauseId(selectedId: number) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.GetLeaseFinancialClauseIds);
    }
    
    LeaseCancellationCost(cost: string, selectedId: number) {
        return this.postaction({ Input: "{Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":7387,\"Value\":\"" + cost + "\"}]}" }, this.InsertLeaseCancelCost);
    }

    getCancellationCost(selectedId: number) {
        return this.postaction({ Input: "{ Id:" + selectedId + "}" }, this.GetLeaseCancelCost);
    }
    //Lease Item Begin
    getLeaseSiteBuildingFloorManagement(Leaseid: number, RenewalCount: number, Target: number) {
        return this.postaction({ Input: "{ Id:0 }", Leaseid: Leaseid, RenewalCount: RenewalCount, Target: Target }, this.getLeaseItemSiteBuildingFloorManagement);
    }

    InsertUpdateRPMBuildings(Leaseid: number, RenewalCount: number, BuildingData: string) {
        return this.postaction({ Input: "{ Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":5684,\"Value\":\"" + Leaseid + "\"},{\"ReportFieldId\":5685,\"Value\":\"" + RenewalCount + "\"}] }", Leaseid: Leaseid, RenewalCount: RenewalCount, BuildingData: BuildingData, RowSeperator: "§", ColumnSeperator: "µ" }, this.insertUpdateRPMBuildings);
    }

    InsertUpdateRPMFloors(ReportFieldIdValues: any) {
        return this.postaction({ Input: "{ Id:0,ListReportFieldIdValues:" + ReportFieldIdValues + "}"}, this.insertUpdateRPMFloors);
    }

    getExportData(formId, ParentFormId, index: any, sortDirection: any, sortColumn: any, fieldObjects: any, ReportFieldIdValues: any, fileName, keywordSearch?: string, advancedSearchValue?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{FormId:" + formId + ",ParentFormId:" + ParentFormId + ",Filter:'" + keywordSearch + "',PageIndex:" + index + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "',ListReportFieldIdValues:" + ReportFieldIdValues + ",IsKeywordSearch:0,IsAdvancedSearch:0,IsExport:1}", fileName: fileName, fields: filterArray };
    }

    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }

    getIsModuleAdmin(moduleId: number) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    }
    isAdditionalChargeInUse(selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.additionalChargeListFormId + ",Id:" + selectedId + "}", Option: 0 }, this.AdditionalChargeInUse)
    }


    //Lease Ttem End
    //map
    getMapColumns() {
        return this.postaction({ Input: "{ FormId:" + this.MapFormId + " }" }, this.listFieldObjUrl);
    }
    getGISData(OwnerShipType: number) {
        return this.postaction({ Input: "{ FormId:" + this.MapFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":7013,\"Value\":\"" + OwnerShipType + "\"}]}" }, this.MapListUrl);
    }

    GetLeaseExpirationSqFtForDashboard() { 
        return this.postaction({}, this.getLeaseExpirationSqFtForDashboard);
    }

    GetLeaseRentableAreaForDashboard() { 
        return this.postaction({}, this.getLeaseRentableAreaForDashboard);
    }

    GetLeasedBuildingOccupancyForDashboard() { 
        return this.postaction({ Input: "{ListReportFieldIdValues: [{ \"ReportFieldId\":571,\"Value\":\" 0 \"}] }"}, this.getLeasedBuildingOccupancyForDashboard);
    }

    GetCriticalLeaseDatesFields() {
        return this.postaction({ Input: "{FormId:386}" }, this.listFieldObjUrl);
    }

    GetCriticalLeaseDatesData(column, direction) {
        return this.postaction({ Input: "{FormId:386, SortColumn: '" + column + "', SortDirection: '" + direction + "'}" }, this.listDataListUrl);
    }

    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }
}