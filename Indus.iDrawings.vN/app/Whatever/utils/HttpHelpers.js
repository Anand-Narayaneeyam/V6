var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
var General_1 = require('../../Models/Common/General');
var HttpHelpers = (function () {
    function HttpHelpers(_http) {
        this._http = _http;
    }
    Object.defineProperty(HttpHelpers.prototype, "haserror", {
        get: function () {
            return this.errormsg != null;
        },
        enumerable: true,
        configurable: true
    });
    HttpHelpers.prototype.getaction = function (path) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(path, options)
            .map(function (res) {
            return res.json();
        })
            .catch(this._handleError);
    };
    HttpHelpers.prototype.getHeroes = function (path) {
        return this._http.get(path)
            .map(this.extractData)
            .catch(this._handleError);
    };
    HttpHelpers.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    HttpHelpers.prototype.gel = function (data) {
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
            sum1 = (sum1 + bytes[index] * index) % 255;
            sum2 = (sum2 + sum1) % 255;
        }
        return (sum2 << 8) | sum1;
    };
    HttpHelpers.prototype.GetIEVersion = function () {
        var sAgent = window.navigator.userAgent;
        var Idx = sAgent.indexOf("MSIE");
        // If IE, return version number.
        if (Idx > 0)
            return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
        else if (!!navigator.userAgent.match(/Trident\/7\./))
            return 11;
        else
            return 0; //It is not IE
    };
    HttpHelpers.prototype.CustomEvent = function (event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    HttpHelpers.prototype.postaction = function (param, path) {
        var _this = this;
        if (this.GetIEVersion() <= 0) {
            window.dispatchEvent(new CustomEvent('onRequestStart', { detail: 'request inititated' }));
        }
        else {
            window.dispatchEvent(this.CustomEvent('onRequestStart', { detail: 'request inititated' }));
        }
        this.errormsg = null;
        var body = JSON.stringify(param);
        var gel = this.gel(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(path, body, options)
            .map(function (m) {
            var jsonresult = m.json();
            if (jsonresult.haserror) {
                _this.errormsg = jsonresult.errormessage;
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
            var objGeneralFunc = new General_1.GeneralFunctions();
            objGeneralFunc.checkForUnhandledErrors(jsonresult);
            if (_this.GetIEVersion() <= 0) {
                window.dispatchEvent(new CustomEvent('onRequestEnd', { detail: 'request completed' }));
            }
            else {
                window.dispatchEvent(_this.CustomEvent('onRequestEnd', { detail: 'request completed' }));
            }
            return jsonresult;
        })
            .catch(this._handleError);
    };
    HttpHelpers.prototype.downloadaction = function (param, path) {
        this.errormsg = null;
        var body = JSON.stringify(param);
        var gel = this.gel(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(path, body, options)
            .map(function (m) {
            if (m["url"] != null && m["url"] != undefined && m["url"].indexOf("Account/Login") > 0) {
                var isIE11 = /msie|Trident/.test(navigator.userAgent);
                if (isIE11 == false) {
                    window.BrowserName = "IE11";
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
    };
    HttpHelpers.prototype.postgetaction = function (param, path) {
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
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), 'gel': gel });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.get(path, options)
            .map(function (res) {
            return res.json();
        })
            .catch(this._handleError);
    };
    HttpHelpers.prototype._handleError = function (error) {
        console.log("Response", http_1.Response);
        var objGeneralFunc = new General_1.GeneralFunctions();
        //debugger
        objGeneralFunc.checkForUnhandledErrors({ StatusId: "-9999" });
        return Observable_1.Observable.throw(error.text() || 'Server error');
    };
    return HttpHelpers;
}());
exports.HttpHelpers = HttpHelpers;
//# sourceMappingURL=HttpHelpers.js.map