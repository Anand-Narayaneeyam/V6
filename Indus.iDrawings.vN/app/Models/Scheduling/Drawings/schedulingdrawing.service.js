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
var HttpHelpers_1 = require('../../../Whatever/utils/HttpHelpers');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var SchedulingDrawingService = (function (_super) {
    __extends(SchedulingDrawingService, _super);
    function SchedulingDrawingService() {
        _super.apply(this, arguments);
        this._checkDrawingSeatingAssignmentType = 'SpaceDrawing/CheckDrawingSeatingAssignmentType';
        this._getSpaceHandlesForScheduling = 'Space/GetSpaceIdsForScheduling';
        this._checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        //SpaceDrawing/IsApprovalRequiredforSpace
        //SpaceDrawing/CheckReservationSeatingAssignmentType
        this._checkReservationSeatingAssignmentType = 'SpaceDrawing/CheckReservationSeatingAssignmentType';
        //WorkFlow/GetFirstWorkflowActionPointByWorkTypeAndCategory
        //Space/spSPE_GetSpaceIdFromHandle
        //Common/GetSiteTimeOffset
        //Space/GetDailyReservationCount
        this.getSeatDetailsforDrawingUrl = 'Space/GetSeatDetailsforDrawing';
        this.updateSeatXYPositionUrl = 'Space/UpdateSeatXYPosition';
    }
    //get CheckDrawingSeatingAssignmentType
    SchedulingDrawingService.prototype.CheckDrawingSeatingAssignmentType = function (DrawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]}" }, this._checkDrawingSeatingAssignmentType);
    };
    //get GetSpaceIdsForScheduling
    SchedulingDrawingService.prototype.GetSpaceHandlesForScheduling = function (DrawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"},{ \"ReportFieldId\":6730,\"Value\":\"0\"},{ \"ReportFieldId\":791,\"Value\":\"0\"}]}" }, this._getSpaceHandlesForScheduling);
    };
    SchedulingDrawingService.prototype.checkReservationSeatingAssignmentType = function (spaceId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":6728,\"Value\":\"" + spaceId + "\"}]}" }, this._checkReservationSeatingAssignmentType);
    };
    SchedulingDrawingService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    SchedulingDrawingService.prototype.getSeatDetailsforDrawing = function (drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":2316,\"Value\":\"" + drawingId + "\"}]}" }, this.getSeatDetailsforDrawingUrl);
    };
    SchedulingDrawingService.prototype.updateSeatXYPosition = function (seatId, currentXCord, currentYCord, drawingId) {
        return this.postaction({ Input: "{Id:" + seatId + ",ListReportFieldIdValues:[{\"ReportFieldId\":8796,\"Value\":\"" + currentXCord + "\"},{\"ReportFieldId\":8797,\"Value\":\"" + currentYCord + "\"},{\"ReportFieldId\":2316,\"Value\":\"" + drawingId + "\"}]}" }, this.updateSeatXYPositionUrl);
    };
    SchedulingDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SchedulingDrawingService);
    return SchedulingDrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.SchedulingDrawingService = SchedulingDrawingService;
//# sourceMappingURL=schedulingdrawing.service.js.map