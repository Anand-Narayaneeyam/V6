import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class ReviewWorkFlowService extends HttpHelpers {

    private actionpath = 'MockData/FieldObjects/reviewWorkFlow.json';
    private _spaceUnlockdrawingListData = 'MockData/Data/unlock_drawing_list.json';
    private _spaceUnlockdrawingFields = 'MockData/FieldObjects/unlockdrawingfieldobject.json';


    constructor(private http: Http) {
        super(http);
    }
   
    getAction(workflowCatId: any, entityCatId: any,selectedid:number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getStackPlans(id: number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getRequestDetails() {
        return this.postgetaction<Observable<any>>(null, this.actionpath)
    }
    getRequestNumberDetails(id: number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getsubMenu(workflowCatId: number, entityCatId: number, id: number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getDescriptionData(selectedid: number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getViewFloorData() {
        return this.postgetaction<Observable<any>>(null, this._spaceUnlockdrawingListData);
    }
    getViewFloorFieldObject() {
        return this.postgetaction<Observable<any>>(null, this._spaceUnlockdrawingFields);
    }
    getHistoryPaging(workflowCatId: any, entityCatId: any, pageIndex: number) {
        console.log("page", pageIndex);
    }
    getHistoryField() {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
    getHistoryData(id: number) {
        return this.postgetaction<Observable<any>>(null, this.actionpath);
    }
}