import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class ArchiveDrawingService extends HttpHelpers {
    private getAllArchiveSpaceDetailsUrl = 'Space/GetAllArchiveSpaceDetails';
    private getArchiveDisplaySettingsUrl = 'Space/GetArchiveDisplaySettings';
    private getArchivedSpaceLeaderlineDetailsUrl ='Space/GetArchivedSpaceLeaderlineDetails'
    getAllArchiveSpaceDetails(drawingId: number, archiveID: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1591,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1590,\"Value\":\"" + archiveID + "\"}]}" }, this.getAllArchiveSpaceDetailsUrl);
    }
    getArchiveDisplaySettings(drawingId: number, archiveID: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1534,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1533,\"Value\":\"" + archiveID + "\"}]}" }, this.getArchiveDisplaySettingsUrl);
    }
    getArchivedSpaceLeaderlineDetails(drawingId: number, archiveID: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1588,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1587,\"Value\":\"" + archiveID + "\"}]}" }, this.getArchivedSpaceLeaderlineDetailsUrl);
    }
}