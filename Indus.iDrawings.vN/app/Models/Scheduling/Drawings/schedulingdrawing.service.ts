import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../../framework/models/interface/ifield.ts'
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()

export class SchedulingDrawingService extends HttpHelpers {
    
    _checkDrawingSeatingAssignmentType = 'SpaceDrawing/CheckDrawingSeatingAssignmentType';
    _getSpaceHandlesForScheduling = 'Space/GetSpaceIdsForScheduling';
    private _checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    //SpaceDrawing/IsApprovalRequiredforSpace
    //SpaceDrawing/CheckReservationSeatingAssignmentType
    _checkReservationSeatingAssignmentType = 'SpaceDrawing/CheckReservationSeatingAssignmentType';
    //WorkFlow/GetFirstWorkflowActionPointByWorkTypeAndCategory
    //Space/spSPE_GetSpaceIdFromHandle
    //Common/GetSiteTimeOffset
    //Space/GetDailyReservationCount
    private getSeatDetailsforDrawingUrl = 'Space/GetSeatDetailsforDrawing';
    private updateSeatXYPositionUrl = 'Space/UpdateSeatXYPosition';
    //get CheckDrawingSeatingAssignmentType
    CheckDrawingSeatingAssignmentType(DrawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]}" }, this._checkDrawingSeatingAssignmentType);
    } 

    //get GetSpaceIdsForScheduling
    GetSpaceHandlesForScheduling(DrawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"},{ \"ReportFieldId\":6730,\"Value\":\"0\"},{ \"ReportFieldId\":791,\"Value\":\"0\"}]}" }, this._getSpaceHandlesForScheduling);
    }
    checkReservationSeatingAssignmentType(spaceId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":6728,\"Value\":\"" + spaceId + "\"}]}" }, this._checkReservationSeatingAssignmentType);
    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }
    getSeatDetailsforDrawing(drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":2316,\"Value\":\"" + drawingId + "\"}]}" }, this.getSeatDetailsforDrawingUrl);
    }
    updateSeatXYPosition(seatId, currentXCord, currentYCord, drawingId) {
        return this.postaction({ Input: "{Id:" + seatId + ",ListReportFieldIdValues:[{\"ReportFieldId\":8796,\"Value\":\"" + currentXCord + "\"},{\"ReportFieldId\":8797,\"Value\":\"" + currentYCord + "\"},{\"ReportFieldId\":2316,\"Value\":\"" + drawingId + "\"}]}" }, this.updateSeatXYPositionUrl);
    }
}