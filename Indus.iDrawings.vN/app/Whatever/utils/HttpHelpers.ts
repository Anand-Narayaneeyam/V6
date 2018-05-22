import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { GeneralFunctions } from '../../Models/Common/General';

export class HttpHelpers {
    constructor(private _http: Http) {
    }

    get haserror(): boolean {
        return this.errormsg != null;
    }

    errormsg: string;

    getaction<T>(path: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(path, options)
            .map(res => {
                return <T>res.json();
            })
            .catch(this._handleError);
    }
    getHeroes<T>(path: string): Observable<T> {
        return this._http.get(path)
            .map(this.extractData)
            .catch(this._handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private gel(data: any) {
        var bytes = []; // char codes 
        var dataLen = data.length;
        var counter = 1;
        var dataLengthScatterLimit = 50000;
        if (dataLen > dataLengthScatterLimit) {
            counter = 5000;
        }
        var i = 0;
        if (counter == 5000) {
            while (i < 5000) {
                var code = data.charCodeAt(i);
                bytes = bytes.concat([code]);
                i = i + 1;
            }
        }
        while (i < dataLen) {
            var code = data.charCodeAt(i);
            bytes = bytes.concat([code]);
            i = i + counter;
        }
        if (i >= dataLen && dataLen > dataLengthScatterLimit) {
            i = i - counter;
            while (i < dataLen) {
                var code = data.charCodeAt(i);
                bytes = bytes.concat([code]);
                i = i + 1;
            }
        }
        var count = bytes.length;
        var sum1 = 0;
        var sum2 = 0;
        var index;
        for (index = 0; index < count; ++index) {
            sum1 = (sum1 + bytes[index]*index) % 255;
            sum2 = (sum2 + sum1) % 255;
        }        
        return (sum2 << 8) | sum1;
    }

    GetIEVersion() {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");

        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

        // If IE 11 then look for Updated user agent string.
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;

        else
            return 0; //It is not IE
    }
    CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    postaction<T>(param: T, path: string) {
        if (this.GetIEVersion() <= 0) {
            window.dispatchEvent(new CustomEvent('onRequestStart', { detail: 'request inititated' }));
        } else {
            window.dispatchEvent(this.CustomEvent('onRequestStart', { detail: 'request inititated' }));
        }
        this.errormsg = null;
        let body = JSON.stringify(param);
        var gel = this.gel(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(path, body, options)
            .map(m => {
                var jsonresult = <Models.ViewModel.JSONReturnVM<T>>m.json();
                if (jsonresult.haserror) {
                    this.errormsg = jsonresult.errormessage;
                }
                /*if (jsonresult["Data"] != undefined) {
                    if (jsonresult["Data"]["UnhandledErrorMessage"] != undefined) {
                        var errorMessage = jsonresult["Data"]["UnhandledErrorMessage"];
                        if (errorMessage != null) {
                            console.error("iDrawings V6 Error Log: ", errorMessage);
                        }
                    }
                } else {
                    jsonresult["Data"] = [];
                }*/
                var objGeneralFunc: GeneralFunctions = new GeneralFunctions();
                objGeneralFunc.checkForUnhandledErrors(jsonresult);
                if (this.GetIEVersion() <= 0) {
                    window.dispatchEvent(new CustomEvent('onRequestEnd', { detail: 'request completed' }));
                } else {
                    window.dispatchEvent(this.CustomEvent('onRequestEnd', { detail: 'request completed' }));
                }
                return jsonresult;
            })
            .catch(this._handleError);
    }
    downloadaction<T>(param: T, path: string) {
        this.errormsg = null;
        let body = JSON.stringify(param);
        var gel = this.gel(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(path, body, options)
            .map(m => {
                if (m["url"] != null && m["url"] != undefined && m["url"].indexOf("Account/Login") > 0) {
                    var isIE11 = /msie|Trident/.test(navigator.userAgent);
                    if (isIE11 == false) {
                        (<any>window).BrowserName = "IE11";
                        var baseUrl = window.document.baseURI;
                    }
                    else {

                        var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';

                    }

                    if (baseUrl.includes("undefined/")) {
                        baseUrl.replace("undefined/", "");
                    }
                    var logoutUrl = baseUrl + "/Account/LogOff";
                    window.location.href = logoutUrl;
                }
                var fileresult = m;
                return fileresult;
            })
            .catch(this._handleError);
    }
    postgetaction<T>(param: T, path: string) {
        /*this.errormsg = null;//Need to be uncommented when we need to fetch from web methods

        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(path, body, options)
            .map(m => {
                var jsonresult = <T>m.json();            

                return jsonresult;
            })
            .catch(this._handleError);*/
        var gel = this.gel(JSON.stringify(param));
        let headers = new Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(path, options)
            .map(res => {
                return <T>res.json();
            })
            .catch(this._handleError);
    }

    private _handleError(error: Response) {
        console.log("Response", Response);
        var objGeneralFunc: GeneralFunctions = new GeneralFunctions();
        //debugger
        objGeneralFunc.checkForUnhandledErrors({ StatusId: "-9999" });
        return Observable.throw(error.text() || 'Server error');
    }
}