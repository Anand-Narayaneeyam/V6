import {Injectable } from '@angular/core';
import {IField} from  '../../Framework/Models/Interface/IField'
import { Http, Response } from '@angular/http';
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GeneralService extends HttpHelpers {
    private url = 'Common/GetFieldLookupValuesforList';
    constructor(private http: Http) {
        super(http);
    }

    populateHasRelationddl(Id: number, formFieldId: number) {  
       
        var tets = this.postaction({ Input: "{FormFieldId:" + formFieldId + ",Id:" + Id + "}" }, this.url);
        return tets;
       
    }
}
