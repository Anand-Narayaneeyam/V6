import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ExecutiveSummaryService extends HttpHelpers {
    ///////////////////////new ////////
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private submitAddUrl = 'Common/InsertAppFormData';
    private DashboardConfigurationFrmId = "514";

    constructor(private http: Http) {
        super(http);
    }


    GetWidgetFields() {
        return this.postaction({ Input: "{FormId:514}" }, this.listFieldObjUrl);
    }

    GetAllWidgets(column, direction) {
        return this.postaction({ Input: "{FormId:514, SortColumn: '" + column + "', SortDirection: '" + direction + "'}" }, this.listDataListUrl);
    }

    postWidgetPreferences(WidgetDetails) {
        debugger;
        return this.postaction({ Input: "{ FormId:" + this.DashboardConfigurationFrmId + ",ListReportFieldIdValues:" + WidgetDetails + "}" }, this.submitAddUrl);
    }
}