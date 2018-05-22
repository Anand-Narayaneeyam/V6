import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class MenuService extends HttpHelpers {
    private _adminMenuUrl = 'MockData/menu/admin.json';
    private _spaceMenuUrl = 'MockData/menu/space.json';
    private _OverAllDataUrl = 'MockData/menu/overall.json';
    private _generalsettingsUrl = 'MockData/menu/generalsettings.json';
    private _employeeMenuUrl = 'MockData/menu/employee.json';
    private _asbuiltsMenuUrl = 'MockData/menu/asbuilts.json';
    private _schedulingMenuUrl = 'MockData/menu/scheduling.json';
    private _assetsMenuUrl = 'MockData/menu/assets.json';
    private _rpmMenuUrl = 'MockData/menu/rpm.json';
    private _workorderMenuUrl = 'MockData/menu/workorder.json';
    private _reportMenuUrl = 'MockData/menu/reportsmenu.json';

    private _MenuUrl = 'Common/GetMenuDetails';
    private _SettingsMenuUrl = 'Common/GetSettingsMenuDetails';
    private _ReportsMenuUrl = 'Common/GetReportMenuDetails';

    constructor(private http: Http) {
        super(http);
    }
    switchModules(moduleId) {
        switch (moduleId) {
            case 0: return this.postaction({ Input: "{EntityId: 13, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 1: return this.postaction({ Input: "{EntityId: 17, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 3: return this.postaction({ Input: "{EntityId: 21, Id: " + moduleId + " }" }, this._MenuUrl);
            case 4: return this.postaction({ Input: "{EntityId: 60, Id: " + moduleId + " }" }, this._MenuUrl) 
            case 5: return this.postaction({ Input: "{EntityId: 25, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 14: return this.postaction({ Input: "{EntityId: 29, Id: " + moduleId + " }" }, this._MenuUrl);
            case 7: return this.postaction({ Input: "{EntityId: 33, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 9: return this.postaction({ Input: "{EntityId: 37, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 11: return this.postaction({ Input: "{EntityId: 89, Id: " + moduleId + " }" }, this._MenuUrl); 
            case 30: return this.postaction({ Input: "{EntityId: 41, Id: " + moduleId + " }" }, this._MenuUrl);
            case 2: return this.postaction({ Input: "{EntityId: 45, Id: " + moduleId + " }" }, this._MenuUrl);
            case 8: return this.postaction({ Input: "{EntityId: 47, Id: " + moduleId + " }" }, this._MenuUrl);
            case 6: return this.postaction({ Input: "{EntityId: 86, Id: " + moduleId + " }" }, this._MenuUrl);
            case 17: return this.postaction({ Input: "{EntityId: 65, Id: " + moduleId + " }" }, this._MenuUrl);
            case 12: return this.postaction({ Input: "{EntityId: 80, Id: " + moduleId + " }" }, this._MenuUrl);
            case 18: return this.postaction({ Input: "{EntityId: 68, Id: " + moduleId + " }" }, this._MenuUrl);
            case 24: return this.postaction({ Input: "{EntityId: 77, Id: " + moduleId + " }" }, this._MenuUrl);
            case 25: return this.postaction({ Input: "{EntityId: 71, Id: " + moduleId + " }" }, this._MenuUrl);
            case 26: return this.postaction({ Input: "{EntityId: 74, Id: " + moduleId + " }" }, this._MenuUrl);
            case 27: return this.postaction({ Input: "{EntityId: 83, Id: " + moduleId + " }" }, this._MenuUrl);

        } 
    }
    getmenu(defaultModuleId) {
        var contextObj = this;
        return this.switchModules(defaultModuleId);
    }
    getChangemenu(value: any) {
        return this.switchModules(value);
    }
    getAllDatasource() {
        return this.getaction<Observable<any>>(this._OverAllDataUrl)
    }
    getgeneralsettingssource(value: any) {
        switch (value) {
            case 12: return this.postaction({}, this._SettingsMenuUrl); /*return this.postgetaction<Observable<any>>(null, this._generalsettingsUrl);*/
            case 11: return this.postaction({}, this._ReportsMenuUrl); /*return this.postgetaction<Observable<any>>(null, this._reportMenuUrl);*/
        }
       
    }
}
