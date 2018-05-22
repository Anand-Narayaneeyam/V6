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
var SchedulingService = (function (_super) {
    __extends(SchedulingService, _super);
    function SchedulingService(http) {
        _super.call(this, http);
        this.http = http;
        ///////////////////////new ////////
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
        this.GetRoomReservationofDrawing = 'Space/GetRoomReservationofDrawing';
        this.GetReservationbookedforList = 'Space/GetReservationbookedforListDetails';
        this.SubmitReservation = 'Space/InsertReservationRequest';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.GetInviteesListForUserCategoryId = 'Space/GetInviteesListForUserCategoryId';
        this.getNotificationMails = 'Space/GetNotificationMails';
        this.sendMailsNotification = 'Space/SendReminderNotification';
        this.getReservtnTimeSlotsUrl = 'Space/GetReservationTimeSlots';
        this.GetReservationComponentsList = "Space/GetReservationComponentsList";
        this.CheckreserveslotInuse = "Space/GetRoomDetailsForReservation";
        this.GetReservationSeatsList = "Space/GetSpacesOnSearchForReservationSeats";
        this.saveResourceForSeats = "Space/InsertSeatingResources";
        this.Seatfilter = "Space/GetSpacesForReservationSeatsSearch";
        this.checkWorkTypeInUseUrl = 'WorkFlow/CheckWorkTypeInUse';
        this.Roomfilter = "Space/GetRoomReservationofDrawingSearch";
        this._checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.deleteSeatUrl = "Space/DeleteSeats";
        this.addSeatUrl = "Space/InsertSeatNumber";
        this.updateSeatNumberAsHotelingUrl = "Space/UpdateSeatNumberAsHotelingOrNot";
        this.conflictReserveSeatUrl = "Space/CheckConflictedSeatRequestExists";
        this.reserveHotellingSeatUrl = "Space/InsertSeatReservationRequest";
        this.getSiteTimeZone = "Space/GetTimeZoneNameForSite";
        this.getSpacetime = "Space/GetCurrentTimeOfSpace";
        this.updateReservationReq = "Space/UpdateReservationRequest";
        this.isSeatReqEditPossible = "Space/IsEditPossible";
        this.IsRoomEditPossible = 'Space/IsRoomEditPossible';
        this.getBookedUserDetailsUrl = 'Space/GetBookedUserDetails';
        this.updateStatusOfRequestUrl = 'Space/UpdateStatusOfRequest';
        //private isCheckInPossibleUrl = 'Space/IsCheckInPossible';
        this.isCheckInCheckOutPossibleUrl = 'Space/IsCheckInCheckOutPossible';
        this.isRoomCheckInCheckOutPossibleUrl = 'Space/IsRoomCheckInCheckOutPossible';
        this.insertUpdateCheckInCheckOutDetailsUrl = 'Space/InsertUpdateCheckInCheckOutDetails';
        this.RoomUsageForDashboard = 'Space/GetRoomUsageForDashboard';
        this.RoomReservationCalendarForDashboard = 'Space/GetRoomReservationCalendarForDashboard';
        this.SeatReservationCalendarForDashboard = 'Space/GetSeatReservationCalendarForDashboard';
        this.GetHotelingRequestsCalender = 'SpaceDrawing/GetHotelingRequestsCalender';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.UpdateRoomStatusOfRequest = 'Space/UpdateRoomStatusOfRequest';
        this.getSessionValues = 'Common/GetSessionValues';
        this.schedulingSearchFormId = 411;
        this.amnetiesFormId = 154;
        this.drawinglistFormId = 165;
        this.CateringFormId = 166;
        this.ServiceFormId = 169;
        this.defineWorkTypeListFormId = 176;
        this.defineWorkTypeAddEditFormId = 183;
        this.ReserveRoomFormId = 311;
        this.RoombookingrequestFormId = 313;
        this.resourceFormId = 324;
        this.IdrawingsUserFormId = 330;
        this.InviteesEmployeeFormId = 331;
        this.seatListFormId = 361;
        this.seatbookingListFrmId = 362;
        this.seatBookRequestListFrmId = 363;
        this.seatBookAllActiveReqListFrmId = 368;
        this.addSeatFrmId = 369;
        this.bookHotellingSeat = 373;
        this.hotellingResources = 384;
        this.SeatAdvancesearch = 397;
        this.ReserveroomAdvancesearch = 407;
        this.equipmentResnListFrmId = 460;
        this.reserevEquipmentFrmId = 467;
        this.reserveEqupmtListFilter = 461;
        this.EquipmentMyRequestListFrmId = 468;
        this.EquipmentActiveRequestListFrmId = 469;
        this.EquipmentTypeFormId = 459;
        this.EquipementTypeAddEditFormId = 462;
        this.EquipmentQuantityFormId = 465;
        this.EquipmentQuantityAddEditFormId = 466;
        this.UserRoleBasedSettingsFormId = 537;
        this.UserRoleBasedSettingsGridFormId = 541;
        this.GetAllWorkSpaceDetailsurl = 'Space/GetAllWorkSpaceDetails';
        this.GetSeatAdvancedSearchListContenturl = 'Space/GetSeatAdvancedSearchListContent';
        this.insertUpdateSeatwithConflict = "Space/InsertUpdateSeatReservation";
        this.insertUpdateEquipmentwithConflict = "Space/InsertUpdateEquipmentReservation";
        this.conflictReserveEqupmtUrl = "Space/CheckConflictedEquipmentRequestExists";
        this.eqpmtFilter = "Space/GetEquipmentsForReservationSearch";
        this.updateStatusOfEquipmentRequestUrl = 'Space/UpdateEquipmentStatusOfRequest';
        this.IsEquipmentEditPossible = 'Space/IsEquipmentEditPossible';
        this.checkQuantityInUseUrl = 'Object/CheckEquipmentObjectClassStatisticsInUse';
        this.checktypeinuseUrl = 'Object/CheckEquipmentObjectClassInUse';
        this.equimenttypeListUrl = 'Object/GetObjectClassesforScheduling';
        this.getSitetime = "Space/GetCurrentTimeOfSite";
        this.isEquipmentCheckInCheckOutPossibleUrl = 'Space/IsEquipmentCheckInCheckOutPossible';
        this.isMultipleCheckInCheckOutPossibleUrl = 'Space/IsMultipleCheckInCheckOutPossible';
        this.CheckResourceinUseUrl = 'Space/CheckResourceinUse';
        this.maxSeatCountUrl = 'Space/GetMaximumHotelingSeatsForSpace';
        this.objectediturl = 'Object/GetEditAppFormFields';
        this.objectListFieldUrl = 'Object/GetListAppFormFields';
        this.objectAddUrl = 'Object/GetAddAppFormFields';
        this.objectsubmitEditUrl = 'Object/UpdateAppFormData';
        this.objectsubmitAddUrl = 'Object/InsertAppFormData';
        this.GetReservationUserRolesBasedSettingURL = 'Space/GetReservationUserRolesBasedSettings';
    }
    SchedulingService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    SchedulingService.prototype.getAmenitiesFields = function () {
        return this.postaction({
            Input: "{FormId:" + this.amnetiesFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":809, \"ReportFieldId\":5854,\"Value\":\"14\"}, {\"FieldId\":809,\"ReportFieldId\":5853,\"Value\":\"8\"},{\"FieldId\":809,\"ReportFieldId\":6570,\"Value\":\"0\"}]}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getAmenitiesData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getAmenityAddLoad = function () {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + "}" }, this.addDataUrl);
    };
    SchedulingService.prototype.getAmenityEditLoad = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.amnetiesFormId + ",ParentFormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7431, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.AddUpdateAmenities = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.postAddAmenityDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    SchedulingService.prototype.postEditAmenityDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    SchedulingService.prototype.postDeleteAmenityDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getCateringFields = function () {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getCateringData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getCateringAddLoad = function () {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + "}" }, this.addDataUrl);
    };
    SchedulingService.prototype.getCateringEditLoad = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.CateringFormId + ",ParentFormId:" + this.CateringFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 8750, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.AddUpdateCatering = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.postAddCateringDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    SchedulingService.prototype.postEditCateringDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    SchedulingService.prototype.postDeleteCateringDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.CateringFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getServicesFields = function () {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getServicesData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getServiceAddLoad = function () {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId + "}" }, this.addDataUrl);
    };
    SchedulingService.prototype.getServiceEditLoad = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.ServiceFormId + ",ParentFormId:" + this.ServiceFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 7445, \"Value\":" + selectedId + "}], Id:" + selectedId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.AddUpdateServices = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.ServiceFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.ServiceFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.postAddServiceDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:169,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    SchedulingService.prototype.postEditServiceDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:169,ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    SchedulingService.prototype.postDeleteServiceDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.ServiceFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getScheduledDrawingsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.drawinglistFormId + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getFieldsList = function () {
        return this.postaction({ Input: "{ FormId: " + this.defineWorkTypeListFormId + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getDefineWorkTypesList = function (index, column, direction, moduleId, workFlowCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5875,\"Value\":\"" + workFlowCategoryId + "\"}, {\"ReportFieldId\":5873,\"Value\":\"\"}]}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.loadDefineWorkTypesAddEdit = function (selectedId, target, workFlowCategoryId, moduleId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1001,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 0 }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5875,\"Value\":\"" + workFlowCategoryId + "\"}, {\"ReportFieldId\":5873,\"Value\":\"\"}], ListLookupReportFieldIdValues:[{ \"FieldId\":1001,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " }, { \"FieldId\":1937,\"ReportFieldId\": 5830, \"Value\": 0 }, { \"FieldId\":1937,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1937,\"ReportFieldId\": 6575, \"Value\": " + selectedId + " }, { \"FieldId\":1937,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1937,\"ReportFieldId\": 6569, \"Value\": 0 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    SchedulingService.prototype.loadWorkFlowEntityLookups = function (value, parentId, moduleId) {
        return this.postaction({ Input: "{FormId:" + this.defineWorkTypeAddEditFormId + ",Id:" + value + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 6571, \"Value\":" + value + "},{\"ReportFieldId\": 5854, \"Value\":" + moduleId + "}]}" }, this.lookupUrl);
    };
    SchedulingService.prototype.postSubmitDefineWorkTypes = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeAddEditFormId + ",ParentFormId:" + this.defineWorkTypeListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.checkWorkTypeInUse = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.defineWorkTypeListFormId + ",Id:" + selectedId + "}" }, this.checkWorkTypeInUseUrl);
    };
    SchedulingService.prototype.postDeleteDefineWorkType = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.defineWorkTypeListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.loadAssignWorkTypeEdit = function () {
        return this.postaction({ Input: "{ FormId:177,Id:0}" }, this.editDataUrl);
    };
    SchedulingService.prototype.updateAssignWorkTypeEdit = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:177,ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    };
    SchedulingService.prototype.getSchedulingDrawingListData = function (formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getSchedulingDrawingListDataSort = function (formId, ModuleId, index, column, direction, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{FormId:" + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getReserveRoomFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.ReserveRoomFormId + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getReserveRoomData = function (NameDisplayFormatId, StartDate, EndDate, SearchQuery, AminityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, IsSpecialRoom, LoadNonBaseOrgUnitSpace, pageIndex, sortCol, sortDir, filter, pageTarget) {
        var isFromDrawing = false;
        if (pageTarget == 2)
            isFromDrawing = true;
        return this.postaction({
            Input: "{ FormId: " + this.ReserveRoomFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", NameDisplayFormatId: NameDisplayFormatId, Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AminityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: IsSpecialRoom, IsFromDrawing: isFromDrawing, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.GetRoomReservationofDrawing);
    };
    SchedulingService.prototype.roombookingfields = function (selectedSpaceId) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ", Id:" + selectedSpaceId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.GetReservationbookedforListlookup = function (target) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: target }, this.GetReservationbookedforList);
    };
    SchedulingService.prototype.submitReservationRequest = function (strRptFields, ReserveDetails) {
        return this.postaction({ applnInput: "{FormId:" + this.RoombookingrequestFormId + ",ListReportFieldIdValues:" + strRptFields + ",ParentFormId:" + this.ReserveRoomFormId + "}", reservationDataInput: ReserveDetails }, this.SubmitReservation);
    };
    SchedulingService.prototype.getMyRequestsFields = function () {
        return this.postaction({ Input: "{FormId:326}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getActiveRequestsFields = function () {
        return this.postaction({ Input: "{FormId:328}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getMyRequestsData = function (index, column, direction, isChkBxChecked) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{FormId:326" + ",ListReportFieldIdValues: " + rptFieldValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getMyRequestsDataCopyRequest = function (reservationId) {
        return this.postaction({ Input: "{FormId:326" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + reservationId + "\"}]}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.loadRequestEdit = function (selectedId) {
        return this.postaction({ Input: "{ FormId:408, Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + selectedId + "\"},{\"ReportFieldId\":6716,\"Value\":\"32\"}, {\"ReportFieldId\":6716,\"Value\":\"40\"}, {\"ReportFieldId\":6716,\"Value\":\"41\"}]}" }, this.editDataUrl);
    };
    SchedulingService.prototype.loadMyRequestEdit = function (selectedId, isChkBxChecked) {
        return this.postaction({ Input: "{ FormId:409, Id:" + selectedId + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + selectedId + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]}" }, this.editDataUrl);
    };
    SchedulingService.prototype.getActiveRequestsData = function (index, column, direction, isChkBxChecked) {
        if (isChkBxChecked == 1) {
            var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"}]";
            return this.postaction({ Input: "{FormId:328" + ",ListReportFieldIdValues: " + rptFieldValues + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:328, SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
    };
    SchedulingService.prototype.getNotificationMailsMyRequests = function (reservationID, mailTarget) {
        return this.postaction({ Input: "{FormId:326}", RequestId: reservationID, MailTarget: mailTarget }, this.getNotificationMails);
    };
    SchedulingService.prototype.sendMail = function (reservationID, status) {
        return this.postaction({ RequestId: reservationID, Target: status }, this.sendMailsNotification);
    };
    SchedulingService.prototype.getNotificationMailsActiveRequests = function (reservationID, mailTarget) {
        return this.postaction({ Input: "{FormId:328}", RequestId: reservationID, MailTarget: mailTarget }, this.getNotificationMails);
    };
    SchedulingService.prototype.cancelMyRequests = function (requestId, intStatusId, intisHotelling, reqIds) {
        return this.postaction({ Input: "{FormId:326" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}, {\"ReportFieldId\":6716,\"Value\":\"" + intStatusId + "\"}, {\"ReportFieldId\":6561,\"Value\":\"" + intisHotelling + "\"}]}", requestIds: reqIds }, this.UpdateRoomStatusOfRequest); //this.submitEditUrl);
    };
    SchedulingService.prototype.cancelActiveRequests = function (requestId, intStatusId, intisHotelling, reqIds) {
        return this.postaction({ Input: "{FormId:328" + ", ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}, {\"ReportFieldId\":6716,\"Value\":\"" + intStatusId + "\"}, {\"ReportFieldId\":6561,\"Value\":\"" + intisHotelling + "\"}]}", requestIds: reqIds }, this.UpdateRoomStatusOfRequest); //this.submitEditUrl);
    };
    SchedulingService.prototype.getResourceScheduling = function (moduleId, workFlowCategoryId, EntityCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",ListReportFieldIdValues: [{ \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getResourceAddLoad = function (moduleId, workFlowCategoryId, EntityCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":1783, \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"FieldId\":1783,\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"FieldId\":1783,\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]}" }, this.addDataUrl);
    };
    SchedulingService.prototype.getResourceEditLoad = function (selectedId, moduleId, workFlowCategoryId, EntityCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.resourceFormId + ",ParentFormId:" + this.resourceFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":1783, \"ReportFieldId\":5854,\"Value\":\"" + moduleId + "\"}, {\"FieldId\":1783,\"ReportFieldId\":5853,\"Value\":\"" + workFlowCategoryId + "\"},{\"FieldId\":1783,\"ReportFieldId\":6570,\"Value\":\"" + EntityCategoryId + "\"}]  , Id:" + selectedId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.getResourceSchedulingData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.AddUpdateResources = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:324" + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.resourceFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({
                Input: "{FormId:324" + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.resourceFormId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.postResourceDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.resourceFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getInviteesCheckboxgridFields = function (Target) {
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
    };
    SchedulingService.prototype.GetInviteesListForUserCategory = function (target) {
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: target }, this.GetInviteesListForUserCategoryId);
    };
    SchedulingService.prototype.getReservationTimeSlots = function (selectedObj) {
        //string Input, string Date, string StartDate, string EndDate, int SpaceId, int FloorId, string RoomNo, int ReservedBy)
        return this.postaction({
            Input: "{}",
            Date: selectedObj.selDate, StartDate: selectedObj.startDate,
            EndDate: selectedObj.endDate, SpaceId: selectedObj.spaceId,
            FloorId: selectedObj.floorId,
            RoomNo: selectedObj.roomNo, ReservedBy: selectedObj.reservedBy
        }, this.getReservtnTimeSlotsUrl);
    };
    SchedulingService.prototype.GetAmenityOrServiceorCateringlist = function (Target, SpaceId, FloorId, RequestId) {
        if (Target == 1)
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ", ListReportFieldIdValues: [{ \"ReportFieldId\":7449,\"Value\":\"" + SpaceId + "\"}, {\"ReportFieldId\":539,\"Value\":\"" + FloorId + "\"}, {\"ReportFieldId\":7435,\"Value\":\"" + RequestId + "\"}]}", Target: Target }, this.GetReservationComponentsList);
        else
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + "}", Target: Target }, this.GetReservationComponentsList);
    };
    SchedulingService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    SchedulingService.prototype.SchedulingReportDateSelect = function () {
        return this.postaction({ Input: "{ FormId:306}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.SchedulingReportDateTimeSelect = function () {
        return this.postaction({ Input: "{ FormId:391}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.UserReservationReportSelect = function () {
        return this.postaction({ Input: "{ FormId:417}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.loadBuilding = function (siteid, parentId) {
        return this.postaction({ Input: "{FormId:" + "417" + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    SchedulingService.prototype.loadFloor = function (buildingId, parentId) {
        return this.postaction({ Input: "{FormId:" + "417" + ",Id:" + buildingId + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    SchedulingService.prototype.IsReservationSlotInUse = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.RoombookingrequestFormId + ",ParentFormId:" + this.ReserveRoomFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckreserveslotInuse);
    };
    SchedulingService.prototype.Roomdetailsdata = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.RoombookingrequestFormId + ",ParentFormId:" + this.ReserveRoomFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckreserveslotInuse);
    };
    /*seat booking related functions*/
    SchedulingService.prototype.getSeatListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.seatListFormId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.seatsListData = function (rptFieldValues, pageIndex, sortCol, sortDir) {
        //var rptFieldValues = "[{\"ReportFieldId\":8795,\"Value\":\"" + selSpaceId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.maxseatscount = function (rptFieldValues, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.maxSeatCountUrl);
    };
    SchedulingService.prototype.getAddSeatFields = function () {
        var rptlookupFieldValues = "[{\"FieldId\":2032,\"ReportFieldId\":12097,\"Value\":\"2858\"},{\"FieldId\":2099,\"ReportFieldId\":12097,\"Value\":\"2981\"}]";
        return this.postaction({ Input: "{FormId:" + this.addSeatFrmId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.addDataUrl);
    };
    SchedulingService.prototype.getSeatRequestListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.seatBookRequestListFrmId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.seatMyRequestListData = function (selSpaceId, pageIndex, sortCol, sortDir, isChkBxChecked) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookRequestListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.seatAllActiveReqListData = function (selSpaceId, pageIndex, sortCol, sortDir, isChkBxChecked) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookAllActiveReqListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.deleteSeat = function (selSeatId) {
        var rptFieldValues = "[{\"ReportFieldId\":8790,\"Value\":\"" + selSeatId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.seatListFormId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.deleteSeatUrl);
    };
    SchedulingService.prototype.addSeat = function (fldObj, isMultiple, multiplespacerommnumber) {
        return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + ",ParentFormId:" + this.seatListFormId + ",ListReportFieldIdValues:" + fldObj + "}", IsMultiple: isMultiple, multiplespacerommnumber: JSON.stringify(multiplespacerommnumber) }, this.addSeatUrl);
    };
    SchedulingService.prototype.updateSeatNumberAsHoteling = function (updateObj) {
        return this.postaction({ Input: updateObj }, this.updateSeatNumberAsHotelingUrl);
    };
    SchedulingService.prototype.getseatbookingListfields = function () {
        return this.postaction({ Input: "{ FormId: " + this.seatbookingListFrmId + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getReserveSeatData = function (SearchQuery, SearchResourceQuery, FromDate, ToDate, IsAvailable, IsSpecialRoom, LoadNonBaseOrgUnitSpace, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({
            Input: "{ FormId: " + this.seatbookingListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", SearchQuery: SearchQuery, SearchResourceQuery: SearchResourceQuery, FromDate: FromDate, ToDate: ToDate, IsAvailable: IsAvailable, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.GetReservationSeatsList);
    };
    SchedulingService.prototype.getSeatBookFields = function (seatId) {
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ParentFormId:" + this.seatbookingListFrmId + ",Id:" + seatId + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.checkConflictedSeatRequestExists = function (seatId, fromDateTime, toDateTime, bookedForId, recurPatternId, requestId, weekdays, freq) {
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        requestId = requestId == undefined ? 0 : requestId;
        freq = freq == undefined ? 1 : freq;
        var rptFldVal = "";
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"}," + data + "]";
        }
        else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}]";
        }
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",Id:" + seatId + ",ListReportFieldIdValues: " + rptFldVal + "}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId }, this.conflictReserveSeatUrl);
    };
    SchedulingService.prototype.reserveHotellingSeat = function (fldObj, resources, otherResource) {
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ListReportFieldIdValues: " + fldObj + "}", Resources: resources, OtherResources: otherResource }, this.reserveHotellingSeatUrl);
    };
    //getBookedUserDetails(bookedforUserId: number, bookedForUserCategoryId: number) {
    //    return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + "}", BookedforUserId: bookedforUserId, BookedForUserCategoryId: bookedForUserCategoryId }, this.getBookedUserDetailsUrl);
    //}
    SchedulingService.prototype.updateReservationRequest = function (Id, fldObj, resources, otherResource, isSeatUpdate) {
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ListReportFieldIdValues: " + fldObj + ",Id:" + Id + "}", Resources: resources, OtherResources: otherResource, isSeatUpdate: isSeatUpdate }, this.updateReservationReq);
    };
    SchedulingService.prototype.updateStatusOfRequest = function (requestId, statusId, isHoteling, reqIds) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":6561,\"Value\":\"" + isHoteling + "\"}]}", requestIds: reqIds }, this.updateStatusOfRequestUrl);
    };
    //insertUpdateCheckInCheckOutDetails() {
    //    return this.postaction({ Input: "{ FormId:" + this.addSeatFrmId + "}" }, this.insertUpdateCheckInCheckOutDetailsUrl);
    //}
    SchedulingService.prototype.isCheckInCheckOutPossible = function (requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn }, this.isCheckInCheckOutPossibleUrl);
    };
    SchedulingService.prototype.isMultipleCheckInCheckOutPossible = function (requestDetails, isCheckIn) {
        return this.postaction({ Input: requestDetails, IsCheckIn: isCheckIn }, this.isMultipleCheckInCheckOutPossibleUrl);
    };
    SchedulingService.prototype.isRoomCheckInCheckOutPossible = function (requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn }, this.isRoomCheckInCheckOutPossibleUrl);
    };
    SchedulingService.prototype.isRoomEditPossible = function (requestId, isActive) {
        //isSeatReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestId, IsActive: isActive }, this.IsRoomEditPossible);
    };
    SchedulingService.prototype.checkPermissionForEditSeatRequest = function (requestId, isActive) {
        //isSeatReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestId, IsActive: isActive }, this.isSeatReqEditPossible);
    };
    SchedulingService.prototype.getTimeZoneNameForSite = function (siteId) {
        var rptFieldValues = "[{\"ReportFieldId\":571,\"Value\":\"" + siteId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.bookHotellingSeat + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.getSiteTimeZone);
    };
    SchedulingService.prototype.getHotelingResourceFlds = function () {
        return this.postaction({ Input: "{ FormId: " + this.hotellingResources + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getHotelingResourceData = function (selSeatId) {
        var rptFieldValues = "[{\"ReportFieldId\":8785,\"Value\":\"" + selSeatId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.hotellingResources + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.saveSeatResources = function (seatIds, resourceObj) {
        return this.postaction({ Input: "{ SeatIds: [" + seatIds + "] ,ListResources: " + resourceObj + "}" }, this.saveResourceForSeats);
    };
    SchedulingService.prototype.getRoomUsageForDashboard = function (interval, isHotelling, fromDate, toDate) {
        return this.postaction({ Interval: interval, IsHotelling: isHotelling, FromDate: fromDate, ToDate: toDate }, this.RoomUsageForDashboard);
    };
    SchedulingService.prototype.getRoomReservationCalendarForDashboard = function (Interval, ReservedBy, StartDate, EndDate) {
        return this.postaction({ Interval: Interval, ReservedBy: ReservedBy, StartDate: StartDate, EndDate: EndDate }, this.RoomReservationCalendarForDashboard);
    };
    SchedulingService.prototype.getSeatReservationCalendarForDashboard = function (Interval, ReservedBy, StartDate, EndDate, SeatId) {
        return this.postaction({ Interval: Interval, ReservedBy: ReservedBy, StartDate: StartDate, EndDate: EndDate, SeatId: SeatId }, this.SeatReservationCalendarForDashboard);
    };
    SchedulingService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    SchedulingService.prototype.getTimeforspace = function (SpaceId) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + SpaceId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.RoombookingrequestFormId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.getSpacetime);
    };
    SchedulingService.prototype.getReserveSeatDatafordrawing = function (StartDate, EndDate, SearchQuery, AminityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, isSpecialRoom, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({
            Input: "{ FormId: " + this.seatbookingListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AmenityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: isSpecialRoom
        }, this.GetHotelingRequestsCalender);
    };
    SchedulingService.prototype.getAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:" + this.SeatAdvancesearch + "}" }, this.AdvanceSearchLookUpUrl);
    };
    SchedulingService.prototype.getSeatfilterData = function (SearchQuery, SearchResourceQuery, FromDate, ToDate, IsAvailable, IsSpecialRoom, pageIndex, sortCol, sortDir, filter, LoadNonBaseOrgUnitSpace) {
        return this.postaction({
            Input: "{ FormId: " + this.SeatAdvancesearch + ",ParentFormId:" + this.SeatAdvancesearch + ",ListFilterIdValues: " + SearchQuery + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", SearchResourceQuery: SearchResourceQuery, FromDate: FromDate, ToDate: ToDate, IsAvailable: IsAvailable, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.Seatfilter);
    };
    SchedulingService.prototype.getAdvnceSearchLookupforReserveroom = function () {
        return this.postaction({ Input: "{FormId:" + this.ReserveroomAdvancesearch + "}" }, this.AdvanceSearchLookUpUrl);
    };
    SchedulingService.prototype.getAllWorkSpaceDetails = function (moduleId, drawingId, target, direction, column, keyworsearch, value, IsKeyword, IsAdvance) {
        var formId = 0;
        if (target == 1)
            formId = 411;
        else
            formId = 412;
        var rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        var param = "{FormId:" + formId + ",ParentFormId:" + 115 + ",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + "}";
        return this.postaction({ Input: param, Target: target }, this.GetAllWorkSpaceDetailsurl);
        //debugger
        //return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}", Target: target }, this.GetAllWorkSpaceDetailsurl);
    };
    SchedulingService.prototype.getReserveRoomDataforsearch = function (NameDisplayFormatId, StartDate, EndDate, SearchQuery, AminityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, IsSpecialRoom, pageIndex, sortCol, sortDir, filter, LoadNonBaseOrgUnitSpace) {
        return this.postaction({
            Input: "{ FormId: " + this.ReserveRoomFormId + ",ParentFormId:" + this.ReserveroomAdvancesearch + ",ListFilterIdValues: " + filter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ", Filter: '" + filter + "' }", Date: null, StartDate: StartDate, EndDate: EndDate, SearchQuery: SearchQuery, AminityQuery: AminityQuery, IsAvailable: IsAvailable, SearchToDate: SearchToDate, DrawingId: DrawingId, ReservedBy: ReservedBy, IsSpecialRoom: IsSpecialRoom, LoadNonBaseOrgUnitSpace: LoadNonBaseOrgUnitSpace
        }, this.Roomfilter);
    };
    SchedulingService.prototype.getAdvanceSearchFields = function (formId, DrawingId) {
        var applnFormFieldId = 0;
        if (formId == 411) {
            applnFormFieldId = 3208;
        }
        else if (formId == 412) {
            applnFormFieldId = 3212;
        }
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":12097,\"Value\":\"" + applnFormFieldId + "\"}]";
        //let rptlookupFieldValues = "[{\"FieldId\":2264,\"ReportFieldId\":12097,\"Value\":\"" + applnFormFieldId + "\"}]";
        //return this.postaction({ Input: "{ FormId:" + formId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl);
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.AdvanceSearchLookUpUrl);
    };
    SchedulingService.prototype.getKeywordField = function (formId, DrawingId) {
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SchedulingService.prototype.getWorkSpaceDataKeyWordLookUp = function (drawingId) {
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 413 + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SchedulingService.prototype.getteamRommDataKeyWordLookUp = function (drawingId) {
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 414 + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SchedulingService.prototype.getspecialRoomDataKeyWordLookUp = function (drawingId) {
        var rptFieldValues = "[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + 437 + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.keywordLookUpUrl);
    };
    SchedulingService.prototype.checkConflictedRoomRequestExists = function (RoomId, fromDateTime, toDateTime, recurPatternId, bookedForId, Isroom, weekdays, freq) {
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 0 : recurPatternId;
        freq = freq == undefined ? 1 : freq;
        if (weekdays != undefined && weekdays.length > 0) {
            var data = JSON.stringify(weekdays);
            data = data.substring(1, data.length - 1);
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + RoomId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"0\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":12322,\"Value\":\"" + freq + "\"}," + data + "]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + RoomId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"0\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"}]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
        }
    };
    SchedulingService.prototype.checkConflictedRoomRequestExistsforedit = function (SpaceId, ResId, fromDateTime, toDateTime, bookedForId, Isroom, recurPatternId) {
        bookedForId = bookedForId == undefined ? 0 : bookedForId;
        recurPatternId = recurPatternId == undefined ? 1 : recurPatternId;
        return this.postaction({ Input: "{ FormId:" + this.RoombookingrequestFormId + ",Id:" + SpaceId + ",ListReportFieldIdValues:[{\"ReportFieldId\":6711,\"Value\":\"" + ResId + "\"},{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"}]}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: Isroom }, this.conflictReserveSeatUrl);
    };
    SchedulingService.prototype.seatMyRequestSearchListData = function (selSpaceId, parentforId, pageIndex, sortCol, sortDir, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookRequestListFrmId + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getWorkspaceEquipmentExportHighlighted = function (selectedIds, IsChecked, formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptIds = '';
        for (var _i = 0, selectedIds_1 = selectedIds; _i < selectedIds_1.length; _i++) {
            var item = selectedIds_1[_i];
            rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
        }
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    SchedulingService.prototype.getMySeatRequestExportInput = function (IsChecked, formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    SchedulingService.prototype.getActiveSeatRequestExportInput = function (IsChecked, formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    SchedulingService.prototype.seatAllSearchActiveReqListData = function (selSpaceId, parentId, pageIndex, sortCol, sortDir, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.seatBookAllActiveReqListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.seatAllAdvancedSearchActiveReqListData = function (selSpaceId, parentId, pageIndex, sortCol, sortDir, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:363,ParentFormId:368,ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.GetSeatAdvancedSearchListContenturl);
    };
    SchedulingService.prototype.insertUpdateSeatReservationwithConflictChecking = function (Id, fromDateTime, toDateTime, bookedForId, recurPatternId, requestId, weekdays, freq, fldObj, resources, otherResource, isSeatUpdate, actionTarget) {
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
        }
        else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"}]";
        }
        return this.postaction({
            Input: "{ FormId:" + this.bookHotellingSeat + ",Id:" + requestId + ",ListReportFieldIdValues: " + fldObj + "}",
            ConflictInput: "{ FormId:" + this.bookHotellingSeat + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, IsRoomNo: 0, Resources: resources, OtherResources: otherResource, isSeatUpdate: isSeatUpdate, Target: actionTarget
        }, this.insertUpdateSeatwithConflict);
    };
    SchedulingService.prototype.getMySearchRequestsData = function (index, column, direction, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{FormId:326" + ",ListReportFieldIdValues: " + rptFieldValues + ",Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getActiveSearchRequestsData = function (index, column, direction, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        if (isChkBxChecked == 1) {
            var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"}]";
            return this.postaction({ Input: "{FormId:328" + ",ListReportFieldIdValues: " + rptFieldValues + ", Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:328, SortColumn: '" + column + "', SortDirection: '" + direction + "', Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",PageIndex: '" + index + "'}" }, this.listDataListUrl);
        }
    };
    SchedulingService.prototype.getTeamRoomMySeatRequestExportInput = function (selectedIds, IsChecked, formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptIds = '';
        var rptFieldValues = '';
        if (selectedIds.length > 0) {
            for (var _i = 0, selectedIds_2 = selectedIds; _i < selectedIds_2.length; _i++) {
                var item = selectedIds_2[_i];
                rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
            }
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        }
        else {
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + IsChecked + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        }
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    SchedulingService.prototype.getTeamRoomActiveSeatRequestExportInput = function (selectedIds, IsChecked, formId, pageIndex, sortDirection, sortColumn, fieldObjects, fileName, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptIds = '';
        var rptFieldValues = '';
        if (selectedIds.length > 0) {
            for (var _i = 0, selectedIds_3 = selectedIds; _i < selectedIds_3.length; _i++) {
                var item = selectedIds_3[_i];
                rptIds += ",{\"ReportFieldId\":6711 ,\"Value\":\"" + item + "\"}";
            }
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}" + rptIds + "]";
        }
        else {
            rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + 40 + "\"},{\"ReportFieldId\":6716,\"Value\":\"" + 41 + "\"},{\"ReportFieldId\":4769,\"Value\":\"" + true + "\"}]";
        }
        var fields = fieldObjects;
        var filterArray = [];
        fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (IsChecked == 1)
            return { Input: "{ FormId:" + formId + ",ListReportFieldIdValues: " + rptFieldValues + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
        else
            return { Input: "{ FormId:" + formId + ",IsExport:1,PageIndex:" + pageIndex + ",SortColumn:'" + sortColumn + "',SortDirection:'" + sortDirection + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}", fileName: fileName, fields: filterArray };
    };
    SchedulingService.prototype.getEquipmentReservationListfields = function () {
        return this.postaction({ Input: "{ FormId: " + this.equipmentResnListFrmId + " }" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getEquipmentAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:" + this.reserveEqupmtListFilter + "}" }, this.AdvanceSearchLookUpUrl);
    };
    SchedulingService.prototype.getReserveEquipmentListData = function (pageIndex, sortCol, sortDir, isChkBxChecked, fromDatetime, toDateTime, target, fldObjSearch) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"},{\"ReportFieldId\":12389,\"Value\":\"" + fromDatetime + "\"},{\"ReportFieldId\":12390,\"Value\":\"" + toDateTime + "\"}]";
        if (target == 2) {
            return this.postaction({
                Input: "{ FormId: " + this.reserveEqupmtListFilter + ",ParentFormId:" + this.reserveEqupmtListFilter + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: " + rptFieldValues + ",ListFilterIdValues:" + fldObjSearch + "}"
            }, this.eqpmtFilter);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.equipmentResnListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues: " + rptFieldValues + "}" }, this.listDataListUrl);
        }
    };
    SchedulingService.prototype.getReserveEquipmentFields = function (eqmtId) {
        var rptlookupFieldValues = "[{\"FieldId\":2497,\"ReportFieldId\":12097,\"Value\":\"3653\"}]";
        return this.postaction({ Input: "{ FormId:" + this.reserevEquipmentFrmId + ",ParentFormId:" + this.equipmentResnListFrmId + ",Id:" + eqmtId + ",ListLookupReportFieldIdValues:" + rptlookupFieldValues + "}" }, this.editDataUrl);
    };
    SchedulingService.prototype.insertUpdateEquipmentReservationwithConflictChecking = function (Id, fromDateTime, toDateTime, bookedForId, recurPatternId, requestId, weekdays, freq, SiteId, BuildingId, Quantity, fldObj, actionTarget) {
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
        }
        else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}]";
        }
        return this.postaction({
            Input: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + requestId + ",ListReportFieldIdValues: " + fldObj + "}",
            ConflictInput: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}",
            FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, SiteId: SiteId, BuildingId: BuildingId, Target: actionTarget
        }, this.insertUpdateEquipmentwithConflict);
    };
    SchedulingService.prototype.checkConflictedEquipmtRequestExists = function (Id, fromDateTime, toDateTime, bookedForId, recurPatternId, requestId, weekdays, freq, SiteId, BuildingId, Quantity) {
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
        }
        else {
            rptFldVal = "[{\"ReportFieldId\":5612,\"Value\":\"" + recurPatternId + "\"},{\"ReportFieldId\":6711,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12423,\"Value\":\"" + Quantity + "\"}]";
        }
        return this.postaction({ Input: "{ FormId:" + this.reserevEquipmentFrmId + ",Id:" + Id + ",ListReportFieldIdValues: " + rptFldVal + "}", FromDate: fromDateTime, ToDate: toDateTime, BookedForId: bookedForId, SiteId: SiteId, BuildingId: BuildingId }, this.conflictReserveEqupmtUrl);
    };
    SchedulingService.prototype.getEquipmentMyRequestListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.EquipmentMyRequestListFrmId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.EquipmentMyRequestSearchListData = function (selSpaceId, parentforId, pageIndex, sortCol, sortDir, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: 483,Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.updateStatusOfEquipmentRequest = function (requestId, statusId, isHoteling, reqIds) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":12388,\"Value\":\"" + requestId + "\"},{\"ReportFieldId\":12392,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":6561,\"Value\":\"" + isHoteling + "\"}]}", requestIds: reqIds }, this.updateStatusOfEquipmentRequestUrl);
    };
    SchedulingService.prototype.getEquipmentActiveRequestListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.EquipmentActiveRequestListFrmId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.EquipmentActiveRequestSearchListData = function (selSpaceId, parentforId, pageIndex, sortCol, sortDir, isChkBxChecked, keyworsearch, value, IsKeyword, IsAdvance) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId: 485,Filter:'" + keyworsearch + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + " ,IsAdvancedSearch:" + IsAdvance + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.checkPermissionForEditEquipmentRequest = function (requestIds, isActive) {
        //isEquipmentReqEditPossible
        isActive = isActive == undefined ? true : false;
        return this.postaction({ RequestIds: requestIds, IsActive: isActive }, this.IsEquipmentEditPossible);
    };
    SchedulingService.prototype.isEquipmentCheckInCheckOutPossible = function (requestId, fromDate, toDate, IsCheckIn) {
        return this.postaction({ RequestId: requestId, FromDate: fromDate, ToDate: toDate, IsCheckIn: IsCheckIn }, this.isEquipmentCheckInCheckOutPossibleUrl);
    };
    SchedulingService.prototype.EquipmentMyReqListData = function (pageIndex, sortCol, sortDir, isChkBxChecked) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.EquipmentMyRequestListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.EquipmentActiveReqListData = function (pageIndex, sortCol, sortDir, isChkBxChecked) {
        var rptFieldValues = "[{\"ReportFieldId\":6716,\"Value\":\"" + isChkBxChecked + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.EquipmentActiveRequestListFrmId + ",ListReportFieldIdValues: " + rptFieldValues + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.getEquipmentQuantityFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.EquipmentQuantityFormId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.loadAddEditEquipmentQuantity = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    SchedulingService.prototype.CheckQuantityInUse = function (classStatisticId) {
        return this.postaction({ ClassStatisticsId: classStatisticId }, this.checkQuantityInUseUrl);
    };
    SchedulingService.prototype.getEquipmentQuantityData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityFormId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl);
    };
    SchedulingService.prototype.postSubmitQuantity = function (pageDetails, selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipmentQuantityAddEditFormId + " ,BaseEntityId:" + objectCategoryId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + " ,BaseEntityId:" + objectCategoryId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.loadBuildingSchedule = function (siteid, parentId) {
        //return this.postaction({ Input: "{FormId:" + this.floorListFormId + ",ListReportFieldIdValues:[" + JSON.stringify(siteid[0]) + "],ParentFieldId:" + parentId + "}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    SchedulingService.prototype.loaddescription = function (typeid, parentId) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityAddEditFormId + ",Id:" + typeid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    SchedulingService.prototype.postDeleteQuantity = function (selectedId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentQuantityFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getEquipmentTypeFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.EquipmentTypeFormId + ",BaseEntityId:" + 19 + "}" }, this.objectListFieldUrl);
    };
    SchedulingService.prototype.getEquipmentTypeData = function (pageIndex, sortCol, sortDir, objectCategoryId) {
        return this.postaction({ Input: "{ FormId:" + this.EquipmentTypeFormId + " ,BaseEntityId:" + objectCategoryId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }", ObjectCategoryId: objectCategoryId.toString(), DrawingIds: '', DataOption: "1", ClassListOption: "1", ObjectComponentCategory: "0" }, this.equimenttypeListUrl);
    };
    SchedulingService.prototype.loadAddEditEquipmentType = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + ",BaseEntityId:" + 19 + "}" }, this.objectAddUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + ",Id:" + selectedId + ",BaseEntityId:" + 19 + "}" }, this.objectediturl);
        }
    };
    SchedulingService.prototype.CheckTypeInUse = function (classId) {
        return this.postaction({ ClassId: classId }, this.checktypeinuseUrl);
    };
    SchedulingService.prototype.postSubmitObjectClass = function (pageDetails, selectedId, target, objectCategoryId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.EquipementTypeAddEditFormId + " ,BaseEntityId:" + 19 + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.objectsubmitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.EquipementTypeAddEditFormId + " ,BaseEntityId:" + 19 + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.objectsubmitEditUrl);
        }
    };
    SchedulingService.prototype.postDeleteObjectClass = function (selectedId, objectCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.EquipmentTypeFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":283, \"Value\":" + objectCategoryId + "}], Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.getTimeforSite = function (SiteId) {
        return this.postaction({ Input: "{ FormId: " + this.reserevEquipmentFrmId + ",Id: " + SiteId + "}" }, this.getSitetime);
    };
    SchedulingService.prototype.getUserRolebasedSettingsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.UserRoleBasedSettingsGridFormId + "}" }, this.listFieldObjUrl);
    };
    SchedulingService.prototype.getUserRolebasedSettingsData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ", SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " }" }, this.listDataListUrl);
    };
    SchedulingService.prototype.loadUserRolebasedSettings = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    SchedulingService.prototype.SubmitUserRolebasedSettingsData = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    SchedulingService.prototype.DeleteUserRolebasedSettings = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.UserRoleBasedSettingsFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    SchedulingService.prototype.GetUserRolebasedSettingsRowData = function (userroleId) {
        return this.postaction({ Input: "{ FormId:" + this.UserRoleBasedSettingsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":12556, \"Value\":" + userroleId + "}]}" }, this.listDataListUrl);
    };
    SchedulingService.prototype.CheckResourceinUse = function (selectedId) {
        return this.postaction({ Input: "{Id:" + selectedId + "}" }, this.CheckResourceinUseUrl);
    };
    SchedulingService.prototype.GetReservationUserRolesBasedSetting = function (userroleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":12556, \"Value\":" + userroleId + "}]}" }, this.GetReservationUserRolesBasedSettingURL);
    };
    SchedulingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SchedulingService);
    return SchedulingService;
}(HttpHelpers_1.HttpHelpers));
exports.SchedulingService = SchedulingService;
//# sourceMappingURL=scheduling.service.js.map