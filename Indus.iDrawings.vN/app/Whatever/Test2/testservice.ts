import {Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {HttpHelpers} from '../utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TestService extends HttpHelpers {
    /*private _getdataUrl: string = '../Home/GetList';
    list: Models.ViewModel.DefaultLayer[];
    constructor(private http: Http) {
        super(http);

    }
    getData() {
        return this.getaction<Observable<Models.ViewModel.DefaultLayer[]>>(this._getdataUrl).subscribe(
            result => this.list = result,
            error => this.errormsg = error);
    }
    get List(): Models.ViewModel.DefaultLayer[] {
       
        return this.list;
    }

    getList(): Models.ViewModel.DefaultLayer[] {
        this.getHeroes<Models.ViewModel.DefaultLayer[]>(this._getdataUrl).subscribe(
            result => {
                this.list = result;
                console.log(this.list);
            }, 
            error => this.errormsg = error);
        return this.list;
    }*/

   
}
