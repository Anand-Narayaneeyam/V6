import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class SchedulingService extends HttpHelpers {
    ///////////////////////new ////////

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';   
    private GetRoomReservationofDrawing = 'Space/GetRoomReservationofDrawing';
    private GetReservationbookedforList = 'Space/GetReservationbookedforListDetails';
    private SubmitReservation = 'Space/InsertReservationRequest';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private GetInviteesListForUserCategoryId = 'Space/GetInviteesListForUserCategoryId'
    private getNotificationMails = 'Space/GetNotificationMails';
    private sendMailsNotification = 'Space/SendReminderNotification';
    private getReservtnTimeSlotsUrl = 'Space/GetReservationTimeSlots';
    private GetReservationComponentsList = "Space/GetReservationComponentsList";
    private CheckreserveslotInuse = "Space/GetRoomDetailsForReservation";
    private GetReservationSeatsList = "Space/GetSpacesOnSearchForReservationSeats";
    private saveResourceForSeats = "Space/InsertSeatingResources";
    private Seatfilter = "Space/GetSpacesForReservationSeatsSearch";
    private checkWorkTypeInUseUrl = 'WorkFlow/CheckWorkTypeInUse';
    private Roomfilter = "Space/GetRoomReservationofDrawingSearch";
    private _checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';

    private deleteSeatUrl = "Space/DeleteSeats";
    private addSeatUrl = "Space/InsertSeatNumber";
    private updateSeatNumberAsHotelingUrl = "Space/UpdateSeatNumberAsHotelingOrNot";
    private conflictReserveSeatUrl = "Space/CheckConflictedSeatRequestExists";
    private reserveHotellingSeatUrl = "Space/InsertSeatReservationRequest";
    private getSiteTimeZone = "Space/GetTimeZoneNameForSite";
    private getSpacetime = "Space/GetCurrentTimeOfSpace";
    private updateReservationReq = "Space/UpdateReservationRequest";
    private isSeatReqEditPossible = "Space/IsEditPossible";
    private IsRoomEditPossible = 'Space/IsRoomEditPossible';

    private getBookedUserDetailsUrl = 'Space/GetBookedUserDetails';
    private updateStatusOfRequestUrl = 'Space/UpdateStatusOfRequest';
    //private isCheckInPossibleUrl = 'Space/IsCheckInPossible';
    private isCheckInCheckOutPossibleUrl = 'Space/IsCheckInCheckOutPossible';
    private isRoomCheckInCheckOutPossibleUrl = 'Space/IsRoomCheckInCheckOutPossible';

    private insertUpdateCheckInCheckOutDetailsUrl = 'Space/InsertUpdateCheckInCheckOutDetails';
    private RoomUsageForDashboard = 'Space/GetRoomUsageForDashboard';
    private RoomReservationCalendarForDashboard = 'Space/GetRoomReservationCalendarForDashboard'; 
    private SeatReservationCalendarForDashboard = 'Space/GetSeatReservationCalendarForDashboard'; 
    private GetHotelingRequestsCalender = 'SpaceDrawing/GetHotelingRequestsCalender'; 
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private UpdateRoomStatusOfRequest = 'Space/UpdateRoomStatusOfRequest';

    private getSessionValues = 'Common/GetSessionValues';
    private schedulingSearchFormId = 411;
    private amnetiesFormId = 154;
    private drawinglistFormId = 165;
    private CateringFormId = 166;
    private ServiceFormId = 169;
    private defineWorkTypeListFormId = 176;
    private defineWorkTypeAddEditFormId = 183;
    private ReserveRoomFormId = 311;
    private RoombookingrequestFormId = 313;
    private resourceFormId = 324;
    private IdrawingsUserFormId = 330;
    private InviteesEmployeeFormId = 331;
    private seatListFormId =361;
    private seatbookingListFrmId =362;
    private seatBookRequestListFrmId = 363;
    private seatBookAllActiveReqListFrmId = 368;
    private addSeatFrmId = 369;
    private bookHotellingSeat = 373;
    private hotellingResources = 384;
    private SeatAdvancesearch = 397;
    private ReserveroomAdvancesearch = 407;
    private equipmentResnListFrmId = 460;
    private reserevEquipmentFrmId = 467;
    private reserveEqupmtListFilter = 461;
    private EquipmentMyRequestListFrmId = 468;
    private EquipmentActiveRequestListFrmId = 469;
    private EquipmentTypeFormId = 459;
    private EquipementTypeAddEditFormId = 462
    private EquipmentQuantityFormId = 465;
    private EquipmentQuantityAddEditFormId = 466;
    private UserRoleBasedSettingsFormId = 537;
    private UserRoleBasedSettingsGridFormId = 541;

    private GetAllWorkSpaceDetailsurl = 'Space/GetAllWorkSpaceDetails';
    private GetSeatAdvancedSearchListContenturl = 'Space/GetSeatAdvancedSearchListContent';
    private insertUpdateSeatwithConflict = "Space/InsertUpdateSeatReservation";
    private insertUpdateEquipmentwithConflict = "Space/InsertUpdateEquipmentReservation";
    private conflictReserveEqupmtUrl = "Space/CheckConflictedEquipmentRequestExists";
    private eqpmtFilter = "Space/GetEquipmentsForReservationSearch";
    private updateStatusOfEquipmentRequestUrl = 'Space/UpdateEquipmentStatusOfRequest';
    private IsEquipmentEditPossible = 'Space/IsEquipmentEditPossible';
    private checkQuantityInUseUrl = 'Object/CheckEquipmentObjectClassStatisticsInUse'
    private checktypeinuseUrl = 'Object/CheckEquipmentObjectClassInUse';
    private equimenttypeListUrl = 'Object/GetObjectClassesforScheduling';
    private getSitetime = "Space/GetCurrentTimeOfSite";
    private isEquipmentCheckInCheckOutPossibleUrl = 'Space/IsEquipmentCheckInCheckOutPossible';
    private isMultipleCheckInCheckOutPossibleUrl = 'Space/IsMultipleCheckInCheckOutPossible';
    private CheckResourceinUseUrl = 'Space/CheckResourceinUse';
    private maxSeatCountUrl = 'Space/GetMaximumHotelingSeatsForSpace'

    private objectediturl = 'Object/GetEditAppFormFields';
    private objectListFieldUrl = 'Object/GetListAppFormFields';
    private objectAddUrl = 'Object/GetAddAppFormFields';
    private objectsubmitEditUrl = 'Object/UpdateAppFormData';
    private objectsubmitAddUrl = 'Object/InsertAppFormData';
    private GetReservationUserRolesBasedSettingURL = 'Space/GetReservationUserRolesBasedSettings';

    constructor(private http: Http) {
        super(http);
    }

    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }

    getAmenitiesFields() {
        return this.postaction({
            Input: "{FormId:" + this.amnetiesFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":809, \"ReportFieldId\":5854,\"Value\":\"14\"}, {\"FieldId\":809,\"ReportFieldId\":5853,\"Value\":\"8\"},{\"FieldId\":809,\"ReportFieldId\":6570,\"Value\":\"0\"}]}" }, this.listFieldObjUrl);
    }

    getAmenitiesData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    getAmenityAddLoad() {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + "}" }, this.addDataUrl);
    }

    getAmenityEditLoad(selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.amnetiesFormId + ",ParentFormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7431, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    }
    AddUpdateAmenities(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postAddAmenityDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditAmenityDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteAmenityDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:" + id + "}" }, this.deleteUrl);
    }
    getCateringFields() {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + "}" }, this.listFieldObjUrl);
    }
    getCateringData(index: number, column: any, direction: any, filter?: any) {        
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    getCateringAddLoad() {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + "}" }, this.addDataUrl);
    }

    getCateringEditLoad(selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.CateringFormId + ",ParentFormId:" + this.CateringFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 8750, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    }
    AddUpdateCatering(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postAddCateringDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditCateringDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteCateringDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    getServicesFields() {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId+"}" }, this.listFieldObjUrl);
    }
    getServicesData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId +",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }

    getServiceAddLoad() {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId +"}" }, this.addDataUrl);
    }

    getServiceEditLoad(selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.ServiceFormId + ",ParentFormId:" + this.ServiceFormId +",ListReportFieldIdValues:[{\"ReportFieldId\": 7445, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    }
    AddUpdateServices(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.ServiceFormId +",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({ Input: "{FormId:" + this.ServiceFormId +",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    postAddServiceDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:169,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditServiceDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:169,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteServiceDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId +" ,Id:" + id + "}" }, this.deleteUrl);
    }
    getScheduledDrawingsFields() {
        return this.postaction({ Input: "{ FormId: " + this.drawinglistFormId + " }" }, this.listFieldObjUrl);
    }

    getFieldsList() {
        return this.postaction({ Input: "{ FormId: " + this.defineWorkTypeListFormId + " }" }, this.listFieldObjUrl);
    }

    getDefineWorkTypesList(index: any, column: any, direction: any, moduleId: any, workFlowCategoryId: any) {
        return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5875,\"Value\":\"" + workFlowCategoryId + "\"}, {\"ReportFieldId\":5873,\"Value\":\"\"}]}" }, this.listDataListUrl);
    } 

    loadDefineWorkTypesAddEdit(selectedId: number, target: number, workFlowCategoryId: any, moduleId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1001,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 0 }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5875,\"Value\":\"" + workFlowCategoryId + "\"}, {\"ReportFieldId\":5873,\"Value\":\"\"}], ListLookupReportFieldIdValues:[{ \"FieldId\":1001,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " }, { \"FieldId\":1937,\"ReportFieldId\": 5830, \"Value\": 0 }, { \"FieldId\":1937,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1937,\"ReportFieldId\": 6575, \"Value\": " + selectedId + " }, { \"FieldId\":1937,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1937,\"ReportFieldId\": 6569, \"Value\": 0 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    loadWorkFlowEntityLookups(value: any, parentId: number, moduleId: number) {
        return this.postaction({ Input: "{FormId:" + this.defineWorkTypeAddEditFormId + ",Id:" + value + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 6571, \"Value\":" + value + "},{\"ReportFieldId\": 5854, \"Value\":" + moduleId + "}]}" }, this.lookupUrl);
    }

    postSubmitDefineWorkTypes(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }

    checkWorkTypeInUse(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeListFormId + ",Id:" + selectedId + "}" }, this.checkWorkTypeInUseUrl)
    }

    postDeleteDefineWorkType(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.defineWorkTypeListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl)
    }

    loadAssignWorkTypeEdit() {
        return this.postaction({ Input: "{ FormId:177,Id:0}" }, this.editDataUrl);
    }

    updateAssignWorkTypeEdit(pageDetails: any) {
        return this.postaction({ Input: "{ FormId:177,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    }

    getSchedulingDrawingListData(formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    }

    getSchedulingDrawingListDataSort(formId, ModuleId, index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{FormId:" + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    }

    getReserveRoomFields() {
        return this.postaction({ Input: "{ FormId: " + this.ReserveRoomFormId + " }" }, this.listFieldObjUrl);
    }
    getReserveRoomData(NameDisplayFormatId: number, StartDate: string, EndDate: string, SearchQuery: string, AminityQuery: string, IsAvailable: boolean, SearchToDate: string, DrawingId: number, ReservedBy: number, IsSpecialRoom: boolean, LoadNonBaseOrgUnitSpace: boolean, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, pageTarget?: number) {
        var isFromDrawing = false;
        if (pageTarget == 2)
            isFromDrawing = true;
        return this.postaction({
            Input: "{ FormId: " + this.ReserveRoomFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", NameDisplayFormatId: NameDisplayFormatId, Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AminityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: IsSpecialRoom, IsFromDrawing: isFromDrawing, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.GetRoomReservationofDrawing);
    }
    roombookingfields(selectedSpaceId: any) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ", Id:" + selectedSpaceId + "}" }, this.editDataUrl);
    }
    GetReservationbookedforListlookup(target: any) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: target }, this.GetReservationbookedforList);
    }
    submitReservationRequest(strRptFields: string, ReserveDetails: any) {    
        return this.postaction({ applnInput: "{FormId:" + this.RoombookingrequestFormId + ",ListReportFieldIdValues:" + strRptFields + ",ParentFormId:" + this.ReserveRoomFormId + "}", reservationDataInput: ReserveDetails}, this.SubmitReservation);       

    }

    getMyRequestsFields() {
        return this.postaction({ Input: "{FormId:326}" }, this.listFieldObjUrl);
    }

    getActiveRequestsFields() {
        return this.postaction({ Input: "{FormId:328}" }, this.listFieldObjUrl);
    }

    getMyRequestsData(index: number, column: any, direction: any, isChkBxChecked?: number) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{FormId:326" + ",ListReportFieldIdValues: " + rptFieldValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
    }

    getMyRequestsDataCopyRequest(reservationId: any) {
        return this.postaction({ Input: "{FormId:326" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + reservationId + "\"}]}" }, this.listDataListUrl);
    }

    loadRequestEdit(selectedId:any) {
        return this.postaction({ Input: "{ FormId:408, Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + selectedId +"\"},{\"ReportFieldId\":6716,\"Value\":\"32\"}, {\"ReportFieldId\":6716,\"Value\":\"40\"}, {\"ReportFieldId\":6716,\"Value\":\"41\"}]}" }, this.editDataUrl);
    }
    loadMyRequestEdit(selectedId: any, isChkBxChecked?: number) {
        return this.postaction({ Input: "{ FormId:409, Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + selectedId +"\"},{\"ReportFieldId\":6716,\"Value\":\"" +isChkBxChecked +"\"}]}" }, this.editDataUrl);
    }
    getActiveRequestsData(index: number, column: any, direction: any, isChkBxChecked?: number) {
               
        if (isChkBxChecked == 1) {
            var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"}]";
            return this.postaction({ Input: "{FormId:328" + ",ListReportFieldIdValues: " + rptFieldValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        } else {

            return this.postaction({ Input: "{FormId:328, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
    }

    getNotificationMailsMyRequests(reservationID: number, mailTarget: number) {
        return this.postaction({ Input: "{FormId:326}", RequestId: reservationID, MailTarget: mailTarget }, this.getNotificationMails);
    }

    sendMail(reservationID: number, status: number) {
        return this.postaction({ RequestId: reservationID, Target: status }, this.sendMailsNotification);
    }

    getNotificationMailsActiveRequests(reservationID: number, mailTarget: number) {
        return this.postaction({ Input: "{FormId:328}", RequestId: reservationID, MailTarget: mailTarget }, this.getNotificationMails);
    }

    cancelMyRequests(requestId: string, intStatusId: number, intisHotelling: number, reqIds?: any) {
        return this.postaction({ Input: "{FormId:326" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}, {\"ReportFieldId\":6716,\"Value\":\"" + intStatusId + "\"}, {\"ReportFieldId\":6561,\"Value\":\"" + intisHotelling + "\"}]}", requestIds: reqIds }, this.UpdateRoomStatusOfRequest);//this.submitEditUrl);
    }

    cancelActiveRequests(requestId: string, intStatusId: number, intisHotelling: number, reqIds?: any) {
        return this.postaction({ Input: "{FormId:328" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}, {\"ReportFieldId\":6716,\"Value\":\"" + intStatusId + "\"}, {\"ReportFieldId\":6561,\"Value\":\"" + intisHotelling + "\"}]}", requestIds: reqIds }, this.UpdateRoomStatusOfRequest); //this.submitEditUrl);
    }


    getResourceScheduling(moduleId: string, workFlowCategoryId: string, EntityCategoryId: string ) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]}" }, this.listFieldObjUrl);
    }

    getResourceAddLoad(moduleId: string, workFlowCategoryId: string, EntityCategoryId: string) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":1783, \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"FieldId\":1783,\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"FieldId\":1783,\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]}" }, this.addDataUrl);
    }
    getResourceEditLoad(selectedId: string, moduleId: string, workFlowCategoryId: string, EntityCategoryId: string) {
        return this.postaction({ Input: "{ FormId:" + this.resourceFormId + ",ParentFormId:" + this.resourceFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":1783, \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"FieldId\":1783,\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"FieldId\":1783,\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]  , Id:" + selectedId + "}" }, this.editDataUrl);
    }
    

    getResourceSchedulingData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);

    }
    AddUpdateResources(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:324" + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.resourceFormId +"}" }, this.submitAddUrl);

        } else {
            return this.postaction({
                Input: "{FormId:324" + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.resourceFormId + "}" }, this.submitEditUrl);
        }
    }

    postResourceDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    getInviteesCheckboxgridFields(Target: number) {
        switch (Target) {
            case 1:
                this.IdrawingsUserFormId = 330;
                break;
            case 2:
                this.IdrawingsUserFormId = 331;
                break;
            case 3:
                this.IdrawingsUserFormId = 332;
                break;
            case 4:
                this.IdrawingsUserFormId = 333;
                break;
        }
        return this.postaction({ Input: "{ FormId: " + this.IdrawingsUserFormId + " }" }, this.listFieldObjUrl);
    }
    GetInviteesListForUserCategory(target: any) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: target }, this.GetInviteesListForUserCategoryId);
    }

    getReservationTimeSlots(selectedObj:any) {
       
        //string Input, string Date, string StartDate, string EndDate, int SpaceId, int FloorId, string RoomNo, int ReservedBy)
        return this.postaction({
            Input: "{}",
            Date: selectedObj.selDate, StartDate: selectedObj.startDate,
            EndDate: selectedObj.endDate, SpaceId: selectedObj.spaceId,
            FloorId: selectedObj.floorId,
            RoomNo: selectedObj.roomNo, ReservedBy: selectedObj.reservedBy
        }, this.getReservtnTimeSlotsUrl);
        
    }

    GetAmenityOrServiceorCateringlist(Target: number, SpaceId: number,FloorId:number,RequestId:number) {
        if (Target == 1)
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ", ListReportFieldIdValues: [{ \"ReportFieldId\":7449,\"Value\":\"" + SpaceId + "\"}, {\"ReportFieldId\":539,\"Value\":\"" + FloorId + "\"}, {\"ReportFieldId\":7435,\"Value\":\"" + RequestId + "\"}]}", Target: Target }, this.GetReservationComponentsList);
        else
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: Target }, this.GetReservationComponentsList);
    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }

    SchedulingReportDateSelect() {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    }
    SchedulingReportDateTimeSelect() {
        return this.postaction({ Input: "{ FormId:391}" }, this.listFieldObjUrl);
    }
    UserReservationReportSelect() {
        return this.postaction({ Input: "{ FormId:417}" }, this.listFieldObjUrl);
    }
    loadBuilding(siteid: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + "417" + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    loadFloor(buildingId: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + "417" + ",Id:" + buildingId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    IsReservationSlotInUse(strRptFields: string) {
        return this.postaction({ Input: "{FormId:" + this.RoombookingrequestFormId + ",ParentFormId:" + this.ReserveRoomFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckreserveslotInuse);
    }
    Roomdetailsdata(strRptFields: string) {
        return this.postaction({ Input: "{FormId:" + this.RoombookingrequestFormId + ",ParentFormId:" + this.ReserveRoomFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckreserveslotInuse);
    }
    /*seat booking related functions*/
    getSeatListColumns() {
        return this.postaction({ Input: "{FormId:" + this.seatListFormId + "}" }, this.listFieldObjUrl);
    }

    seatsListData(rptFieldValues,pageIndex?: number, sortCol?: string, sortDir?: string) {
        //var rptFieldValues = "[{\"ReportFieldId\":8795,\"Value\":\"" + selSpaceId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues+ ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    maxseatscount(rptFieldValues, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.maxSeatCountUrl);

    }
    getAddSeatFields() {
        let rptlookupFieldValues = "[{\"FieldId\":2032,\"ReportFieldId\":12097,\"Value\":\"2858\"},{\"FieldId\":2099,\"ReportFieldId\":12097,\"Value\":\"2981\"}]";
        return this.postaction({ Input: "{FormId:" + this.addSeatFrmId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues +  "}" }, this.addDataUrl);
    }

    getSeatRequestListColumns() {
        return this.postaction({ Input: "{FormId:" + this.seatBookRequestListFrmId+ "}" }, this.listFieldObjUrl);
    }

    seatMyRequestListData(selSpaceId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number) { 
         
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookRequestListFrmId +  ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }    
    seatAllActiveReqListData(selSpaceId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookAllActiveReqListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    deleteSeat(selSeatId: number) {
        var rptFieldValues = "[{\"ReportFieldId\":8790,\"Value\":\"" + selSeatId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues +"}" }, this.deleteSeatUrl);
    }
    addSeat(fldObj, isMultiple, multiplespacerommnumber) {
        return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + ",ParentFormId:" + this.seatListFormId + ",ListReportFieldIdValues:" + fldObj + "}", IsMultiple: isMultiple, multiplespacerommnumber: JSON.stringify(multiplespacerommnumber) }, this.addSeatUrl);

    }
    updateSeatNumberAsHoteling(updateObj:string) {
        return this.postaction({ Input: updateObj }, this.updateSeatNumberAsHotelingUrl);
    }
    getseatbookingListfields() {
        return this.postaction({ Input: "{ FormId: " + this.seatbookingListFrmId + " }" }, this.listFieldObjUrl);
    }
    getReserveSeatData(SearchQuery: string, SearchResourceQuery: string, FromDate: string, ToDate: string, IsAvailable: boolean, IsSpecialRoom: boolean, LoadNonBaseOrgUnitSpace: boolean, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any) {
        return this.postaction({
            Input: "{ FormId: " + this.seatbookingListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", SearchQuery: SearchQuery, SearchResourceQuery: SearchResourceQuery, FromDate: FromDate, ToDate: ToDate, IsAvailable: IsAvailable, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.GetReservationSeatsList);
    }
    getSeatBookFields(seatId) {
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ParentFormId:" + this.seatbookingListFrmId + ",Id:" + seatId + "}" }, this.editDataUrl);
    }
   

    checkConflictedSeatRequestExists(seatId, fromDateTime, toDateTime, bookedForId?: number, recurPatternId?: number, requestId?: number, weekdays?: any, freq?: any) {

        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        requestId = requestId == undefined ? 0 : requestId;
        freq = freq == undefined ? 1 : freq;
        var rptFldVal = "";
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);

            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"}," + data + "]";
        } else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}]";
        }

        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",Id:" + seatId + ",ListReportFieldIdValues: " + rptFldVal + "}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId }, this.conflictReserveSeatUrl);
    }
    reserveHotellingSeat(fldObj,resources,otherResource) {       
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ListReportFieldIdValues: " + fldObj + "}", Resources: resources, OtherResources:otherResource }, this.reserveHotellingSeatUrl);
    }

    //getBookedUserDetails(bookedforUserId: number, bookedForUserCategoryId: number) {
    //    return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + "}", BookedforUserId: bookedforUserId, BookedForUserCategoryId: bookedForUserCategoryId }, this.getBookedUserDetailsUrl);

    //}


    updateReservationRequest(Id, fldObj, resources, otherResource, isSeatUpdate) {
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ListReportFieldIdValues: " + fldObj + ",Id:" + Id + "}", Resources: resources, OtherResources: otherResource, isSeatUpdate: isSeatUpdate }, this.updateReservationReq);
    }
    updateStatusOfRequest(requestId: number, statusId: number, isHoteling: number, reqIds?: any) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":6561,\"Value\":\"" + isHoteling + "\"}]}", requestIds: reqIds }, this.updateStatusOfRequestUrl);
    }
    //insertUpdateCheckInCheckOutDetails() {
    //    return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + "}" }, this.insertUpdateCheckInCheckOutDetailsUrl);
    //}
    isCheckInCheckOutPossible(requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn}, this.isCheckInCheckOutPossibleUrl);
    }
    isMultipleCheckInCheckOutPossible(requestDetails: any, isCheckIn) {
        return this.postaction({ Input: requestDetails, IsCheckIn: isCheckIn }, this.isMultipleCheckInCheckOutPossibleUrl);
    }
    isRoomCheckInCheckOutPossible(requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn }, this.isRoomCheckInCheckOutPossibleUrl);
    }
    isRoomEditPossible(requestId, isActive?: boolean) {
        //isSeatReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestId, IsActive: isActive }, this.IsRoomEditPossible);

    }
    checkPermissionForEditSeatRequest(requestId, isActive?: boolean) {
        //isSeatReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestId, IsActive: isActive }, this.isSeatReqEditPossible);

    }
    getTimeZoneNameForSite(siteId) {
        var rptFieldValues = "[{\"ReportFieldId\":571,\"Value\":\"" + siteId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat  + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.getSiteTimeZone);
    }

    getHotelingResourceFlds() {
        return this.postaction({ Input: "{ FormId: " + this.hotellingResources + " }" }, this.listFieldObjUrl);
    }
    getHotelingResourceData(selSeatId) {
        var rptFieldValues = "[{\"ReportFieldId\":8785,\"Value\":\"" + selSeatId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.hotellingResources + ",ListReportFieldIdValues: " + rptFieldValues  + "}" }, this.listDataListUrl);
    }
    saveSeatResources(seatIds, resourceObj: string) {
        return this.postaction({ Input: "{ SeatIds: [" + seatIds + "] ,ListResources: " + resourceObj + "}" }, this.saveResourceForSeats);
    }


    getRoomUsageForDashboard(interval: any, isHotelling: boolean, fromDate, toDate) {
        return this.postaction({ Interval: interval, IsHotelling: isHotelling, FromDate: fromDate, ToDate: toDate }, this.RoomUsageForDashboard);
    }
    getRoomReservationCalendarForDashboard(Interval, ReservedBy, StartDate, EndDate) {
        return this.postaction({ Interval: Interval, ReservedBy: ReservedBy, StartDate: StartDate, EndDate: EndDate }, this.RoomReservationCalendarForDashboard);
    }
    getSeatReservationCalendarForDashboard(Interval, ReservedBy, StartDate, EndDate, SeatId) {
        return this.postaction({ Interval: Interval, ReservedBy: ReservedBy, StartDate: StartDate, EndDate: EndDate, SeatId: SeatId }, this.SeatReservationCalendarForDashboard);
    }

    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }
    getTimeforspace(SpaceId) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + SpaceId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.RoombookingrequestFormId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.getSpacetime);
    }
    getReserveSeatDatafordrawing(StartDate: string, EndDate: string, SearchQuery: string, AminityQuery: string, IsAvailable: boolean, SearchToDate: string, DrawingId: number, ReservedBy: number, isSpecialRoom: boolean, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any) {
        return this.postaction({
            Input: "{ FormId: " + this.seatbookingListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AmenityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: isSpecialRoom
        }, this.GetHotelingRequestsCalender);
    }
    getAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:" + this.SeatAdvancesearch + "}" }, this.AdvanceSearchLookUpUrl)
    }
    getSeatfilterData(SearchQuery: string, SearchResourceQuery: string, FromDate: string, ToDate: string, IsAvailable: boolean, IsSpecialRoom: boolean, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, LoadNonBaseOrgUnitSpace?: any) {
        return this.postaction({
            Input: "{ FormId: " + this.SeatAdvancesearch + ",ParentFormId:" + this.SeatAdvancesearch + ",ListFilterIdValues: " + SearchQuery + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", SearchResourceQuery: SearchResourceQuery, FromDate: FromDate, ToDate: ToDate, IsAvailable: IsAvailable, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.Seatfilter);
    }
    getAdvnceSearchLookupforReserveroom() {
        return this.postaction({ Input: "{FormId:" + this.ReserveroomAdvancesearch + "}" }, this.AdvanceSearchLookUpUrl)
    }
    getAllWorkSpaceDetails(moduleId, drawingId, target: number, direction?: any, column?: any, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var formId = 0;
        if (target == 1)
            formId = 411;
        else
            formId = 412;
        var rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        var param = "{FormId:" + formId + ",ParentFormId:" + 115+",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        return this.postaction({ Input: param, Target: target }, this.GetAllWorkSpaceDetailsurl);
        //debugger
        //return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}", Target: target }, this.GetAllWorkSpaceDetailsurl);
    }
    getReserveRoomDataforsearch(NameDisplayFormatId: number, StartDate: string, EndDate: string, SearchQuery: string, AminityQuery: string, IsAvailable: boolean, SearchToDate: string, DrawingId: number, ReservedBy: number, IsSpecialRoom: boolean, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: any, LoadNonBaseOrgUnitSpace?: any) {
        return this.postaction({
            Input: "{ FormId: " + this.ReserveRoomFormId + ",ParentFormId:" + this.ReserveroomAdvancesearch + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AminityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.Roomfilter);
    }
    getAdvanceSearchFields(formId: number, DrawingId: number) {
        var applnFormFieldId = 0;
        if (formId == 411) {
            applnFormFieldId = 3208;
        } else if(formId == 412){
            applnFormFieldId = 3212;
        }
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":12097,\"Value\":\"" + applnFormFieldId + "\"}]";
        //let rptlookupFieldValues = "[{\"FieldId\":2264,\"ReportFieldId\":12097,\"Value\":\"" + applnFormFieldId + "\"}]";
        //return this.postaction({ Input: "{ FormId:" + formId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl);
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl);
    }
    getKeywordField(formId: number, DrawingId: any) {
        let rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + formId+",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    }
    getWorkSpaceDataKeyWordLookUp(drawingId: number) {
        let rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 413 + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    }
    getteamRommDataKeyWordLookUp(drawingId: number) {
        let rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 414+ ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);

    }
    getspecialRoomDataKeyWordLookUp(drawingId: number) {
        let rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 437 + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);

    }
    checkConflictedRoomRequestExists(RoomId, fromDateTime, toDateTime, recurPatternId: number, bookedForId?: number, Isroom?: any, weekdays?: any, freq?: any) {
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        freq = freq == undefined ? 1 : freq;
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + RoomId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"0\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"}," + data + "]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
        } else {
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + RoomId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"0\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"}]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
        }
    }
    checkConflictedRoomRequestExistsforedit(SpaceId, ResId, fromDateTime, toDateTime, bookedForId?: number, Isroom?: any, recurPatternId?: any) {
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 1 : recurPatternId;
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + SpaceId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + ResId + "\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"}]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
    }
    seatMyRequestSearchListData(selSpaceId, parentforId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookRequestListFrmId + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    getWorkspaceEquipmentExportHighlighted(selectedIds: any, IsChecked, formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptIds = '';
        for (var item of selectedIds)
            rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        var fields = fieldObjects;

        let filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

    }
    getMySeatRequestExportInput(IsChecked, formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        var fields = fieldObjects;

        let filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

    }
    getActiveSeatRequestExportInput(IsChecked, formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        var fields = fieldObjects;

        let filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

    }
    seatAllSearchActiveReqListData(selSpaceId, parentId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookAllActiveReqListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    seatAllAdvancedSearchActiveReqListData(selSpaceId, parentId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:363,ParentFormId:368,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.GetSeatAdvancedSearchListContenturl);
    }
    insertUpdateSeatReservationwithConflictChecking(Id, fromDateTime, toDateTime, bookedForId?: number, recurPatternId?: number, requestId?: number, weekdays?: any, freq?: any, fldObj?: any, resources?: any, otherResource?: any, isSeatUpdate?: any, actionTarget?: any) {
       
        actionTarget = actionTarget == "Edit" ? 0 : 1;
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        requestId = requestId == undefined ? 0 : requestId;
        freq = freq == undefined ? 1 : freq;
        var rptFldVal = "";
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);

            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"}," + data + "]";
        } else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}]";
        }
        return this.postaction({
            Input: "{ FormId:" + this.bookHotellingSeat + ",Id:" + requestId + ",ListReportFieldIdValues: " + fldObj + "}",
            ConflictInput: "{ FormId:" + this.bookHotellingSeat + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}" , FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId,IsRoomNo:0, Resources: resources, OtherResources: otherResource, isSeatUpdate: isSeatUpdate, Target:actionTarget
        }, this.insertUpdateSeatwithConflict);
       
    }
    getMySearchRequestsData(index: number, column: any, direction: any, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{FormId:326" + ",ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
    }
    getActiveSearchRequestsData(index: number, column: any, direction: any, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        if (isChkBxChecked == 1) {
            var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"}]";
            return this.postaction({ Input: "{FormId:328" + ",ListReportFieldIdValues: " + rptFieldValues + ", Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        } else {

            return this.postaction({ Input: "{FormId:328, SortColumn: '" + column + "', SortDirection: '" + direction + "', Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
    }
    getTeamRoomMySeatRequestExportInput(selectedIds, IsChecked, formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptIds = '';
        var rptFieldValues = '';
        if (selectedIds.length > 0) {
            for (var item of selectedIds)
                rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        } else {
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        }
        var fields = fieldObjects;

        let filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

    }
    getTeamRoomActiveSeatRequestExportInput(selectedIds, IsChecked, formId, pageIndex: any, sortDirection: any, sortColumn: any, fieldObjects: any, fileName, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        var rptIds = '';
        var rptFieldValues = '';
        if (selectedIds.length > 0) {
            for (var item of selectedIds)
                rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        } else {
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        }
        var fields = fieldObjects;

        let filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        if (IsChecked == 1)
            return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
        else
            return { Input: "{ FormId:" + formId + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };

    }
    getEquipmentReservationListfields() {
        return this.postaction({ Input: "{ FormId: " + this.equipmentResnListFrmId + " }" }, this.listFieldObjUrl);
    }
    getEquipmentAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:" + this.reserveEqupmtListFilter + "}" }, this.AdvanceSearchLookUpUrl)
    }
    getReserveEquipmentListData(pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, fromDatetime?: string, toDateTime?: string, target?: any, fldObjSearch?: any) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"},{\"ReportFieldId\":12389,\"Value\":\"" + fromDatetime + "\"},{\"ReportFieldId\":12390,\"Value\":\"" + toDateTime + "\"}]";
        if (target == 2) {
            return this.postaction({
                Input: "{ FormId: " + this.reserveEqupmtListFilter + ",ParentFormId:" + this.reserveEqupmtListFilter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: " + rptFieldValues + ",ListFilterIdValues:" + fldObjSearch + "}"
            }, this.eqpmtFilter);
        } else {

            return this.postaction({ Input: "{ FormId: " + this.equipmentResnListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.listDataListUrl);
        }
    }
    getReserveEquipmentFields(eqmtId) {
        let rptlookupFieldValues = "[{\"FieldId\":2497,\"ReportFieldId\":12097,\"Value\":\"3653\"}]";
        return this.postaction({ Input: "{ FormId:" + this.reserevEquipmentFrmId + ",ParentFormId:" + this.equipmentResnListFrmId + ",Id:" + eqmtId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.editDataUrl);

    }
    insertUpdateEquipmentReservationwithConflictChecking(Id, fromDateTime, toDateTime, bookedForId?: number, recurPatternId?: number, requestId?: number, weekdays?: any, freq?: any, SiteId?: any, BuildingId?: any, Quantity?: any, fldObj?: any, actionTarget?: any) {

        actionTarget = actionTarget == "Edit" ? 0 : 1;
        BuildingId = BuildingId == null ? 0 : BuildingId;
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        requestId = requestId == undefined ? 0 : requestId;
        freq = freq == undefined ? 1 : freq;
        var rptFldVal = "";
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);

            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}," + data + "]";
        } else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}]";
        }
        return this.postaction({
            Input: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + requestId + ",ListReportFieldIdValues: " + fldObj + "}",
            ConflictInput: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}",
            FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, SiteId: SiteId, BuildingId: BuildingId, Target: actionTarget
        }, this.insertUpdateEquipmentwithConflict);

    }
    checkConflictedEquipmtRequestExists(Id, fromDateTime, toDateTime, bookedForId?: number, recurPatternId?: number, requestId?: number, weekdays?: any, freq?: any, SiteId?: any, BuildingId?: any, Quantity?: any) {
        BuildingId = BuildingId == null ? 0 : BuildingId;
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        requestId = requestId == undefined ? 0 : requestId;
        freq = freq == undefined ? 1 : freq;
        var rptFldVal = "";
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);

            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}," + data + "]";
        } else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}]";
        }

        return this.postaction({ Input: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, SiteId: SiteId, BuildingId: BuildingId }, this.conflictReserveEqupmtUrl);
    }
    getEquipmentMyRequestListColumns() {
        return this.postaction({ Input: "{FormId:" + this.EquipmentMyRequestListFrmId + "}" }, this.listFieldObjUrl);
    }
    EquipmentMyRequestSearchListData(selSpaceId, parentforId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: 483,Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    updateStatusOfEquipmentRequest(requestId: number, statusId: number, isHoteling: number, reqIds?: any) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":12388,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12392,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":6561,\"Value\":\"" + isHoteling + "\"}]}", requestIds: reqIds }, this.updateStatusOfEquipmentRequestUrl);
    }
    getEquipmentActiveRequestListColumns() {
        return this.postaction({ Input: "{FormId:" + this.EquipmentActiveRequestListFrmId + "}" }, this.listFieldObjUrl);
    }
    EquipmentActiveRequestSearchListData(selSpaceId, parentforId, pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {

        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: 485,Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    checkPermissionForEditEquipmentRequest(requestIds, isActive?: boolean) {
        //isEquipmentReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestIds, IsActive: isActive }, this.IsEquipmentEditPossible);

    }
    isEquipmentCheckInCheckOutPossible(requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn }, this.isEquipmentCheckInCheckOutPossibleUrl);
    }
    EquipmentMyReqListData(pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.EquipmentMyRequestListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    EquipmentActiveReqListData(pageIndex?: number, sortCol?: string, sortDir?: string, isChkBxChecked?: number) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.EquipmentActiveRequestListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    getEquipmentQuantityFields() {
        return this.postaction({ Input: "{ FormId: " + this.EquipmentQuantityFormId + "}" }, this.listFieldObjUrl)
    }
    loadAddEditEquipmentQuantity(selectedId: any, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    CheckQuantityInUse(classStatisticId) {
        return this.postaction({ ClassStatisticsId: classStatisticId }, this.checkQuantityInUseUrl)
    }
    getEquipmentQuantityData(pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl)
    }
    postSubmitQuantity(pageDetails, selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    loadBuildingSchedule(siteid: any, parentId: number) {
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteid[0]) + "],ParentFieldId:" + parentId + "}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }
    loaddescription(typeid, parentId) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + ",Id:" + typeid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);

    }
    postDeleteQuantity(selectedId: any, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityFormId + ", Id:" + selectedId + "}" }, this.deleteUrl)
    }
    getEquipmentTypeFields() {
        return this.postaction({ Input: "{ FormId: " + this.EquipmentTypeFormId + ",BaseEntityId:" + 19 + "}" }, this.objectListFieldUrl)
    }
    getEquipmentTypeData(pageIndex, sortCol, sortDir, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.EquipmentTypeFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: '', DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.equimenttypeListUrl);
    }
    loadAddEditEquipmentType(selectedId: any, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + ",BaseEntityId:" + 19 + "}" }, this.objectAddUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + ",Id:" + selectedId + ",BaseEntityId:" + 19 + "}" }, this.objectediturl);
        }
    }
    CheckTypeInUse(classId) {
        return this.postaction({ ClassId: classId }, this.checktypeinuseUrl)
    }
    postSubmitObjectClass(pageDetails, selectedId: number, target: number, objectCategoryId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + " ,BaseEntityId:" + 19 + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.objectsubmitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.EquipementTypeAddEditFormId + " ,BaseEntityId:" + 19 + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.objectsubmitEditUrl);
        }
    }
    postDeleteObjectClass(selectedId: any, objectCategoryId: any) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentTypeFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "}], Id:" + selectedId + "}" }, this.deleteUrl)
    }
    getTimeforSite(SiteId) {
        return this.postaction({ Input: "{ FormId: " + this.reserevEquipmentFrmId + ",Id: " + SiteId + "}" }, this.getSitetime);
    }
    getUserRolebasedSettingsFields() {
        return this.postaction({ Input: "{ FormId: " + this.UserRoleBasedSettingsGridFormId + "}" }, this.listFieldObjUrl)
    }
    getUserRolebasedSettingsData(pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl)
    }
    loadUserRolebasedSettings(selectedId: any, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    SubmitUserRolebasedSettingsData(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    }
    DeleteUserRolebasedSettings(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.UserRoleBasedSettingsFormId + ", Id:" + selectedId + "}" }, this.deleteUrl)
    }
    GetUserRolebasedSettingsRowData(userroleId) {
        return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12556, \"Value\":" + userroleId + "}]}" }, this.listDataListUrl)
    }
    CheckResourceinUse(selectedId) {
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.CheckResourceinUseUrl)
    }
    GetReservationUserRolesBasedSetting(userroleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":12556, \"Value\":" + userroleId + "}]}" }, this.GetReservationUserRolesBasedSettingURL);
    }

}