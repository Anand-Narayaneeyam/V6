import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../Interface/IField'
import {HttpHelpers} from '../../../whatever/utils/httphelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DrawingService extends HttpHelpers {
    private getiDrawingsLayersUrl = 'Drawing/GetiDrawingsLayers';
    private _spaceMandatoryLayerFields = 'MockData/space//mandatorylayer-mockdata.json';
    private customerSettings = 'Common/GetSubscribedFeatures';
    private listDataListUrl = 'Common/GetAppFormDataList';
    constructor(private http: Http) {
        super(http);
    }
    getiDrawingsLayers() {
        return this.postaction({}, this.getiDrawingsLayersUrl);
        //return this.getaction<Observable<any>>(this._spaceMandatoryLayerFields);
    }
    getCustomerSettings() {
        return this.postaction({
            input: "{Id:0}",
            FeatureCategoryIds: "31"
        }, this.customerSettings);
    }
    getDefaultDrawingLayerListData(pagedeatils: string, pageIndex?: number, sortCol?: string, sortDir?: string) {

        return this.postaction({ Input: "{ FormId: 562,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pagedeatils + "}" }, this.listDataListUrl);
    }
}