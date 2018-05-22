import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class OpendrawingService extends HttpHelpers {
    private iDrawingLayers = 'Drawing/GetiDrawingsLayers';//mandatorylayer-mockdata.json
    private customerSettings = 'Common/GetSubscribedFeatures';
    private mandatoryLayers = 'Drawing/GetMandatoryLayers';
    private drawinDetailsUrl = 'Drawing/GetOpenDrawingDetails';
    private getSessionValues = 'Common/GetSessionValues';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';
    private accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
   // private _spaceMandatoryLayerFields = 'MockData/space//mandatorylayer-mockdata.json';

    constructor(private http: Http) {
        super(http);
    }
    getiDrawingLayers() {
        return this.postaction({},this.iDrawingLayers);
        //return this.getaction<Observable<any>>(this._spaceMandatoryLayerFields);
    }
    getCustomerSettings() {
        return this.postaction({
            input: "{Id:0}",
            FeatureCategoryIds: "7,8,11,29,31,32,42,187,186,190,192,195,189,285,49,51,53,80,88,96,126,136,146,224,17,19,21,78,86,94,222,124,134,144"
        }, this.customerSettings);     
    }
    getMandatoryLayers(moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":548,\"Value\":\"" + moduleId + "\"}]}"}, this.mandatoryLayers);
    } 
    getDrawingDetails(drawingId: number, isBuilding: boolean) {
        if (isBuilding == undefined || isBuilding == null)
            isBuilding = false;
        return this.postaction({ Input: "{ EntityId:" + drawingId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4308,\"Value\":\"" + isBuilding + "\"}]}" }, this.drawinDetailsUrl);
    }

    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }
    getIsModuleAdmin(moduleId: number) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    }
    getAccessibleModuleForUser() {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    }

}