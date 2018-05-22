import { Injectable, ElementRef, Renderer  } from '@angular/core';
import {DatePipe, CurrencyPipe, DecimalPipe  } from '@angular/common'
import { Http, Response } from '@angular/http';
import {IField} from '../../Models/Interface/IField'
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';


@Injectable()

export class ValidateService extends HttpHelpers {

    list: Models.ViewModel.DefaultLayer[];
    private _charUrl = 'MockData/Data/validationData.json';
    validationDataObject: any;
    rChars: any[];
    errorMessage: string;
    datePattern: any;
    numericPattern: any;
    emailPattern: any;
    dateTimePattern: any;
    setdob: any;
    setcurrency: any;
    whitelist: any;

    getBlacklist() {
        return this.getaction<Observable<any>>(this._charUrl)
    }


    constructor(private http: Http, private el: ElementRef) {
        super(http);
    }

    public initializeService(validationData: any) {

        if (validationData == undefined) {
            this.getBlacklist().subscribe(resultData => this.validationDataObject = resultData,
                error => this.errorMessage = <any>error);

        } else {
            this.validationDataObject = validationData
        }
    };

    validate(validationObj: IField) {
        var message = "";
        if ((validationObj.FieldValue == null) || (validationObj.FieldValue.length == 0) || (validationObj.DataEntryControlId == 4 && validationObj.FieldValue == "-1")) {
            message = this.mandatory(validationObj);
        }
        else if (validationObj.FieldValue.length > 0) {
            validationObj.FieldValue = validationObj.FieldValue.replace(/\\'/g, "'");/*TO handle allowing single qoutes*/
            if (validationObj.DataEntryControlId == 12 || validationObj.DataEntryControlId == 9) {
                if (validationObj.FieldValue.includes("\\") == true) {
                    var fileName = validationObj.FieldValue.split("\\")[2]
                    validationObj.FieldValue = fileName;
                }
                else {
                    validationObj.FieldValue = validationObj.FieldValue.trim();
                }
            }
            else if (validationObj.DataEntryControlId == 8) {
                if (validationObj.FieldValue.includes("T") == true) {
                    var date = new Date(validationObj.FieldValue);
                    var dd = date.getDate().toString();
                    if (dd.toString().length == 1)
                        dd= ("0" + dd.toString());
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var mon = monthNames[date.getMonth()];
                    var yy = date.getFullYear();
                    var hh =  date.getHours();
                    var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                    var meridian = "";
                    var hour = "";
                    if (hh > 12) {
                        meridian = "PM"; 
                        var hr = hh - 12;
                        if (hr < 10) {
                            hour = "0" + hr;
                        }
                        else {
                            hour = hh.toString();
                        }
                    }
                    else {
                        if (hh < 10) {
                            hour = "0" + hh;
                        }
                        else {
                            hour = hh.toString();
                        }
                        meridian = "AM";
                    }
                    var strDateTime = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
                    validationObj.FieldValue = strDateTime;
                }
                else {
                    validationObj.FieldValue = validationObj.FieldValue.trim();
                }
            }
            else {
                validationObj.FieldValue = validationObj.FieldValue.trim();
            }
           /* validationObj.FieldValue = validationObj.FieldValue.trim(); */
            message = this.RangeValidation(validationObj)
            if (message == "")
                message = this.whitelistValidation(validationObj);
        }


        if (message == "")
            this.format(validationObj);
        return message;
    }
    RangeValidation(validationObj: IField) {
        var message = "";
        var dataTypeMsg = "a ";
        if (validationObj.GenericDataTypeId == 5) {
            dataTypeMsg = "an Integer";
        } else if (validationObj.GenericDataTypeId == 4) {
            dataTypeMsg = "a numeric";
        }
        if ((validationObj.RangeFrom != null) && (validationObj.RangeTo != null)) {
            if ((+validationObj.FieldValue < +validationObj.RangeFrom) || (+validationObj.FieldValue > +validationObj.RangeTo))
                message = "Enter " + dataTypeMsg + " value between " + validationObj.RangeFrom + " and " + validationObj.RangeTo + " for " + validationObj.FieldLabel;
        }
        else if ((validationObj.RangeFrom != null) && (validationObj.RangeTo == null)) {
            if (+validationObj.FieldValue <= +validationObj.RangeFrom)
                message = "Enter " + dataTypeMsg + " value greater than " + validationObj.RangeFrom + " in " + validationObj.FieldLabel;
        }
        else if ((validationObj.RangeFrom == null) && (validationObj.RangeTo != null)) {
            if (+validationObj.FieldValue >= +validationObj.RangeTo)
                message = "Enter " + dataTypeMsg + " value less than " + validationObj.RangeTo + " in " + validationObj.FieldLabel;
        }
        //else if (validationObj.Whitelist.Id == 11) {
        //    if (validationObj.FieldValue.length < 9)
        //        message = validationObj.FieldLabel +" requires minimum of 9 characters";
        //}
        return message
    }
    whitelistValidation(validationObj: IField) {
        var message = "";
        /*to be replaced by the commented version in original solution*/
        var value = validationObj.FieldValue;
        if (validationObj.IsValidated == false) {
            if (validationObj.Whitelist.RegularExpression) {

                var pattern = new RegExp(validationObj.Whitelist.RegularExpression.trim());
                if (value == null || value == "" || !pattern.test(value)) {
                    if (validationObj.Whitelist.Id == 5 || validationObj.Whitelist.Id == 10 || validationObj.Whitelist.Id == 16)
                        return message = "Enter a valid integer value for " + validationObj.FieldLabel;
                    else if (validationObj.Whitelist.Id == 1 || validationObj.Whitelist.Id == 9 || validationObj.Whitelist.Id == 13)
                        return message = "Enter a valid numeric value for " + validationObj.FieldLabel;
                    else if (validationObj.Whitelist.Id == 11 && validationObj.FieldLabel.includes("Phone"))
                        return message = "Enter a valid Phone Number";
                    else if (validationObj.Whitelist.Id == 11 && validationObj.FieldLabel == "Fax")
                        return message = "Enter a valid " + validationObj.FieldLabel;
                    else if (validationObj.Whitelist.Id == 7 && validationObj.FieldLabel == "Renovation Date")
                        return message = "";
                    else if (validationObj.FieldLabel.includes("Email"))
                        return message = "Enter a valid Email address";
                    else if (validationObj.Whitelist.Id == 3 && validationObj.FieldLabel == "Mail Domain")
                        return message = "Enter a valid Mail Domain";
                    else if (validationObj.Whitelist.Id == 20 && validationObj.FieldLabel == "Separator")
                        return message = "Enter a valid Separator(., _, -, &, @)";
                    else
                        return message = "Special characters are not allowed in  " + validationObj.FieldLabel;
                }
                if (validationObj.Whitelist.Id == 11 && validationObj.FieldValue.length != 0) {
                    var indices = [];
                    var indices2 = [];
                    var indicesForPlus = [];
                    var indicesforSymbol = [];
                    for (var i = 0; i < validationObj.FieldValue.length; i++) {
                        if (validationObj.FieldValue[i] === "(") indices.push(i);
                        if (validationObj.FieldValue[i] === ")") indices2.push(i);
                        if (validationObj.FieldValue[i] === "+") indicesForPlus.push(i);
                        if (validationObj.FieldValue[i] === "-") indicesforSymbol.push(i);
                    }
                    if (indices.length == indices2.length) {
                        for (var i = 0; i < indices.length; i++) {
                            if (indices[i] > indices2[i] || (indices[i] + 1) == indices2[i])
                                return message = "Enter a valid " + validationObj.FieldLabel + " Number";
                        }
                    }
                    else
                        return message = "Enter a valid " + validationObj.FieldLabel + " Number";
                    for (var i = 0; i < indicesForPlus.length-1; i++) {
                        if ((indicesForPlus[i] + 1) == indicesForPlus[i+1])
                            return message = "Enter a valid " + validationObj.FieldLabel + " Number";
                    }

                    for (var i = 0; i < indicesforSymbol.length; i++) {
                        if ((indicesforSymbol[i] + 1) == indicesforSymbol[i+1])
                            return message = "Enter a valid " + validationObj.FieldLabel + " Number";
                    }

                    var lastIndex = validationObj.FieldValue[validationObj.FieldValue.length - 1];
                    if (validationObj.FieldValue.replace('+', '').length == 0 || validationObj.FieldValue.replace('-', '').length == 0 || validationObj.FieldValue.replace('0', '').length == 0 || (validationObj.FieldValue[validationObj.FieldValue.length - 1] != ")" && isNaN(lastIndex as any) == true))
                    {
                        return message = "Enter a valid " + validationObj.FieldLabel + " Number";
                    }
                }
            }
            if (validationObj.Format.RegularExpression && (validationObj.Whitelist.Id != 18 && validationObj.Whitelist.Id != 17)) {
                var formatPattern;
                pattern = new RegExp(validationObj.Format.RegularExpression.trim());
                if (value != null) 
                    formatPattern = value.replace(/[üÑµô¥Çéæÿ]/g, "");
                else
                    formatPattern = null;
                if (formatPattern != null && formatPattern != "") {
                    if (!pattern.test(formatPattern)) {
                        if (validationObj.Format.Id == 3)
                            return message = "Enter a valid Email address";
                        else if (validationObj.Format.Id == 6)
                            return message = "Enter a valid numeric value for " + validationObj.FieldLabel;
                        else if (validationObj.Format.Id == 2)
                            return message = "Enter a valid date time value for " + validationObj.FieldLabel;
                        else if (validationObj.Format.Id == 1)
                            return message = "Enter a valid date value for " + validationObj.FieldLabel;
                        else
                            return message = "Enter a valid value for " + validationObj.FieldLabel;
                    }
                }
            }
            if (validationObj.Whitelist.Id == 11) {
                if (validationObj.FieldValue.length < 9)
                    message = validationObj.FieldLabel + " requires minimum of 9 characters";
            }
        }
        return message;

    }

    mandatory(validationObj: IField) {
        var message = ""
        if (validationObj.DataEntryControlId != 7) {
            if (validationObj.IsMandatory == true) {
                if (validationObj.FieldValue != null) {
                    if (validationObj.FieldValue.length == 0) {
                        if (!validationObj.FieldLabel) {
                            return message = "Enter a value ";
                        }
                        else {
                            message = 'Enter ' + validationObj.FieldLabel;
                        }
                    }
                    if ((validationObj.DataEntryControlId == 4 && validationObj.FieldValue == "-1") || (validationObj.DataEntryControlId == 12 && validationObj.FieldValue == "") || ((validationObj.DataEntryControlId == 9 && validationObj.FieldValue == ""))) {
                        var split = validationObj.FieldLabel.split(' ')[0]
                        var exceptionarray = ["User"]
                        if ((validationObj.FieldLabel.charAt(0) == 'A' || validationObj.FieldLabel.charAt(0) == 'E' || validationObj.FieldLabel.charAt(0) == 'I' || validationObj.FieldLabel.charAt(0) == 'O' || validationObj.FieldLabel.charAt(0) == 'U') && (exceptionarray.indexOf(split) <= -1))
                            message = 'Select an ' + validationObj.FieldLabel;
                        else
                            message = 'Select a ' + validationObj.FieldLabel;
                    }
                } else {
                    if ((validationObj.DataEntryControlId == 12 && validationObj.FieldValue == null) || (validationObj.DataEntryControlId == 9 && validationObj.FieldValue == null)) {
                        if (validationObj.FieldLabel.charAt(0) == 'A' || validationObj.FieldLabel.charAt(0) == 'E' || validationObj.FieldLabel.charAt(0) == 'I' || validationObj.FieldLabel.charAt(0) == 'O' || validationObj.FieldLabel.charAt(0) == 'U')
                            message = 'Select an ' + validationObj.FieldLabel;
                        else
                            message = 'Select a ' + validationObj.FieldLabel;
                    }
                    else
                        message = 'Enter ' + validationObj.FieldLabel;
                }
            }
        }
        return message;
    }

    format(validationObj: IField) {
        if (validationObj.IsValidated == false) {
            switch (validationObj.GenericDataTypeId) { /*GenericDataTypeId to be replaced wih Format id*/
                case 2: {
                    var userdate = this.el.nativeElement.value;
                    var datePipe = new DatePipe();
                    if ((userdate != "") && (userdate != undefined)) {
                        this.setdob = datePipe.transform(userdate, validationObj.Format.FormatString);
                        this.el.nativeElement.value = this.setdob
                    }
                } break;
                case 7: {
                    var usercurrency = this.el.nativeElement.value;
                    var currencyPipe = new CurrencyPipe();
                    if ((usercurrency != "")) {
                        this.setcurrency = currencyPipe.transform(usercurrency, validationObj.Format.FormatString, true, '1.2-2');
                        this.el.nativeElement.value = this.setcurrency
                    }
                } break;
                case 3: {
                    var userdatetime = this.el.nativeElement.value;
                    var datePipe = new DatePipe();
                    if ((userdatetime != "") && (userdatetime != undefined) && (validationObj.Format.Id != 10)) {
                        if (validationObj.Format.Id == 2) {
                            this.setdob = this.getformattedDataTimeonSelection(userdatetime);
                        }
                        else {
                            this.setdob = datePipe.transform(userdatetime, validationObj.Format.FormatString);
                            this.setdob = this.setdob.split("/")[0]
                            if (this.setdob.length < 20) {
                                var dateArray = this.setdob.split(" ");
                                var strDate = dateArray[0];
                                var strMon = dateArray[1];
                                var strYear = dateArray[2];
                                var strTime = dateArray[3];
                                var strMeridian = dateArray[4];
                                var hour;
                                var min;
                                if (strTime) {
                                    hour = strTime.split(":")[0];
                                    min = strTime.split(":")[1];
                                    if (hour.length < 2) {
                                        hour = "0" + hour;
                                    }
                                    if (min.length < 2) {
                                        min = "0" + min;
                                    }
                                }
                                this.setdob = strDate + " " + strMon + " " + strYear + " " + hour + ":" + min + " " + strMeridian;
                                this.el.nativeElement.value = this.setdob
                            }
                            else {
                                this.el.nativeElement.value = this.setdob
                            }
                        }
                        
                    }
                }


            }
        }
    }

    getformattedDataTimeonSelection(dt) {
        let d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        d.setSeconds(0);
        var mytime = d;

        var strDate = "";
        var date;
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        if (dt) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        hh = mytime.getHours();
        min = (mytime.getMinutes() < 10 ? '0' : '') + mytime.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else if (hh == 12) {
            meridian = "PM"
            hh = 12;
        }
        else {
            meridian = "AM";
        }
        if (meridian == "AM") {
            if (hh == 0) {
                hh = 12;
            }
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        return strDate;
    }

    initiateValidation(fieldObject: IField, contextObj, isValueChanged, element) {
        var message = "";
        if (isValueChanged) {
            if ((element.form) && (element.form.className) && (element.form.className == "cardformStyle")) {

                fieldObject.FieldValue = element.value.trim();
            }
            else {
                if (fieldObject.FieldValue != null) {
                    fieldObject.FieldValue = fieldObject.FieldValue.toString().trim();
                }
            }
        }
        message = this.validate(fieldObject);
       // console.log("initiate validaton", element, message)
        if (message.length > 0) {
            fieldObject.HasValidationError = true;
        } else {
            fieldObject.HasValidationError = false;
        }
        var attribute = element.getAttribute('class')
        if (fieldObject.NotificationType == null)
            fieldObject.NotificationType = "inline";
        switch (fieldObject.NotificationType) {
            case 'inline':
                {

                    var span;

                    if (!element.hasAttribute('class')) {
                        element.setAttribute('class', '')
                    }
                    if (element.nextElementSibling != null) {
                        span = element.nextElementSibling;
                        span.innerHTML = "";
                        span.innerHTML = message;
                        span.style.color = "red";
                        span.style.display = "block"
                        span.style.width = "100%"
                        span.style["overflow-x"] = "hidden"
                        span.style["word-wrap"] = "break-word"
                        span.style["font-size"] = "small"                           
                        if (fieldObject.IsMandatory == true) {
                            if (fieldObject.DataEntryControlId == 3 && fieldObject.FieldValue) {
                                element.setAttribute('aria-label', (fieldObject.FieldLabel + ' Mandatory Field ' + fieldObject.FieldValue+' '+ message));
                                element.removeAttribute("title");
                            }
                            else {
                            element.setAttribute('aria-label', (fieldObject.FieldLabel + ' Mandatory Field ' + message));
                            element.removeAttribute("title");
                            }
                        } else {
                            if (fieldObject.DataEntryControlId == 3 && fieldObject.FieldValue) {
                                element.setAttribute('aria-label', (fieldObject.FieldLabel + ' ' + fieldObject.FieldValue + ' ' + message));
                                element.removeAttribute("title");
                            }
                            else {
                            element.setAttribute('aria-label', fieldObject.FieldLabel + message);
                            element.removeAttribute("title");
                            }      
                        }        
                        if (message == "") {
                            if (element.getAttribute('class').search('ng-invalid') >= 0) {                               
                                element.setAttribute('class', element.getAttribute('class').replace('ng-invalid', 'ng-valid'));                                                                                                                 
                            }
                            element.style.borderColor = "darkgray";
                        }
                        else {
                            if ((element.getAttribute('class').search('ng-invalid') < 0) && (element.getAttribute('class').search('ng-valid') < 0))
                                element.setAttribute('class', attribute + ' ng-invalid')
                            else 
                                element.setAttribute('class', element.getAttribute('class').replace('ng-valid', 'ng-invalid'))                                
                                      
                            element.style.borderColor = "red";
                        }

                    }
                    else {
                       
                        span = document.createElement('span');
                        span.innerHTML = message;
                        element.parentNode.insertBefore(span, element.nextSibling);
                        span.style.color = "red";
                        span.style.display = "block"
                        span.style.width = "100%"
                        span.style["overflow-x"] = "hidden"
                        span.style["word-wrap"] = "break-word"
                        span.style["font-size"] = "small"
                        element.style.borderColor = "red";
                        if (fieldObject.IsMandatory == true) {
                            if (fieldObject.DataEntryControlId == 3 && fieldObject.FieldValue) {
                                element.setAttribute('aria-label', (fieldObject.FieldLabel + ' Mandatory Field ' + fieldObject.FieldValue + ' ' + message));
                                element.removeAttribute("title");
                            }
                            else {
                            element.setAttribute('aria-label', (fieldObject.FieldLabel + ' Mandatory Field ' + message));
                            element.removeAttribute("title");
                            }
                        } else {
                            if (fieldObject.DataEntryControlId == 3 && fieldObject.FieldValue) {
                                element.setAttribute('aria-label', (fieldObject.FieldLabel + ' ' + fieldObject.FieldValue + ' ' + message));
                                element.removeAttribute("title");
                            }
                            else {
                            element.setAttribute('aria-label', fieldObject.FieldLabel + message);
                            element.removeAttribute("title");
                            }    
                        }               
                        if (message == "") {                           
                            if (element.getAttribute('class').search('ng-invalid') >= 0) {
                                element.setAttribute('class', element.getAttribute('class').replace('ng-invalid', 'ng-valid'));                                
                            }
                            element.style.borderColor = "darkgray";
                        }
                        else {
                            
                            if ((element.getAttribute('class').search('ng-invalid') < 0) && (element.getAttribute('class').search('ng-valid') < 0))
                                element.setAttribute('class', attribute + ' ng-invalid')
                            else
                                element.setAttribute('class', element.getAttribute('class').replace('ng-valid', 'ng-invalid'))                                                             
                        }

                    }
                    break;
                }

            case 'return':
                {
                    if (message != "") {
                        if ((element.getAttribute('class').search('ng-invalid') < 0) && (element.getAttribute('class').search('ng-valid') < 0))
                            element.setAttribute('class', attribute + ' ng-invalid')
                        else
                            element.setAttribute('class', element.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                    }

                    else {
                        if (element.getAttribute('class').search('ng-invalid') >= 0)
                            element.setAttribute('class', element.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                    }
                    contextObj.validateMessage.emit({ message });
                }
        }
        fieldObject.IsLocallyValidated = true;
    }    
}