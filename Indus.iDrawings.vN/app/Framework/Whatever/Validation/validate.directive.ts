import {Directive, ElementRef, Renderer, Output, Input, EventEmitter, AfterViewInit, OnChanges, SimpleChange} from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import {ValidateService} from '../../Models/Validation/validation.service';
import {IField} from '../../Models//Interface/IField';


@Directive({

    selector: '[validatetext]',
    host: {
        '(blur)': 'onblur(fieldObject)',
        '(keypress)': 'onKeypress($event.keyCode,fieldObject)',
        '(change)': 'onchange(fieldObject)'
    },
    inputs: ['fieldObject'],
    providers: [ValidateService, HTTP_PROVIDERS]
})

export class Validation implements AfterViewInit, OnChanges {

    fieldObject: IField;
    blnErrorFocused: boolean;
    @Output() public validateMessage = new EventEmitter();
    @Input() validationData: any;
    constructor(private _validateService: ValidateService, private el: ElementRef, private _renderer: Renderer) {

    }
    ngAfterViewInit() {
        this._validateService.initializeService(this.validationData);
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.fieldObject.IsLocallyValidated = this.fieldObject.IsLocallyValidated;
        //console.log("onchanges in validate directive")
        if (changes["fieldObject"] && changes["fieldObject"]["currentValue"] == changes["fieldObject"]["previousValue"]) {
            this._validateService.initiateValidation(this.fieldObject, this, false, this.el.nativeElement);
        }
        else if (this.fieldObject.IsLocallyValidated == null || this.fieldObject.IsLocallyValidated == false) {
            this._validateService.initiateValidation(this.fieldObject, this, false, this.el.nativeElement);
        }

    }
    /*
    initiateValidation(fieldObject: IField, contextObj, isValueChanged) {
        var message = "";
        if (isValueChanged) {
             fieldObject.FieldValue = contextObj.el.nativeElement.value.trim();
            if ((contextObj.el.nativeElement.form) && (contextObj.el.nativeElement.form.className) && (contextObj.el.nativeElement.form.className == "cardformStyle")) {

                fieldObject.FieldValue = contextObj.el.nativeElement.value.trim();
            }
            else {
                console.log("initiate validaton", contextObj.el.nativeElememt)
                if (fieldObject.FieldValue != null) {
                    fieldObject.FieldValue = fieldObject.FieldValue.toString().trim();
                }
            }
        }
        message = contextObj._validateService.validate(fieldObject);
        if (message.length > 0) {
            fieldObject.HasValidationError = true;
        } else {
            fieldObject.HasValidationError = false;
        }
        var attribute = contextObj.el.nativeElement.getAttribute('class')
        document.getElementById('2').getAttribute().concat('nginvalid)'
        notification area
        if (fieldObject.NotificationType == null)
            fieldObject.NotificationType = "inline";
        switch (fieldObject.NotificationType) {
            case 'inline':
                {

                    var span;

                    if (!contextObj.el.nativeElement.hasAttribute('class')) {
                        contextObj.el.nativeElement.setAttribute('class', '')
                    }
                    if (contextObj.el.nativeElement.nextElementSibling != null) {
                        span = contextObj.el.nativeElement.nextElementSibling;
                        span.innerHTML = "";
                        span.innerHTML = message;
                        span.style.color = "red";
                        span.style.display = "block"
                        span.style.width = "100%"
                        span.style["overflow-x"] = "hidden"
                        span.style["word-wrap"] = "break-word"
                        span.style["font-size"] = "small"
                        if (message == "") {
                            if (contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') >= 0)
                                contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                            contextObj.el.nativeElement.style.borderColor = null;
                        }
                        else {
                            if ((contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') < 0) && (contextObj.el.nativeElement.getAttribute('class').search('ng-valid') < 0))
                                contextObj.el.nativeElement.setAttribute('class', attribute + ' ng-invalid')
                             contextObj.el.nativeElement.getAttribute('class').concat('nginvalid')
                            else
                                contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                            contextObj.el.nativeElement.style.borderColor = "red";
                        }

                    }
                    else {
                        span = document.createElement('span');
                        span.innerHTML = message;
                        contextObj.el.nativeElement.parentNode.insertBefore(span, contextObj.el.nativeElement.nextSibling);
                        span.style.color = "red";
                        span.style.display = "block"
                        span.style.width = "100%"
                        span.style["overflow-x"] = "hidden"
                        span.style["word-wrap"] = "break-word"
                        span.style["font-size"] = "small"
                        contextObj.el.nativeElement.style.borderColor = "red";
                        if (message == "") {
                            if (contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') >= 0)
                                contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                            contextObj.el.nativeElement.style.borderColor = null;
                        }
                        else {
                            if ((contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') < 0) && (contextObj.el.nativeElement.getAttribute('class').search('ng-valid') < 0))
                                contextObj.el.nativeElement.setAttribute('class', attribute + ' ng-invalid')
                             contextObj.el.nativeElement.getAttribute('class').concat('nginvalid')
                            else
                                contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                        }

                    }
                    if (this.blnErrorFocused != true) {
                        var input = document.getElementById(fieldObject.FieldId.toString());
                        if (input != undefined) {
                            this._renderer.invokeElementMethod(input, 'focus', []);
                            this.blnErrorFocused = true;
                        }
                    }
                    break;
                }

            case 'return':
                {
                    if (message != "") {
                        if ((contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') < 0) && (contextObj.el.nativeElement.getAttribute('class').search('ng-valid') < 0))
                            contextObj.el.nativeElement.setAttribute('class', attribute + ' ng-invalid')
                         contextObj.el.nativeElement.getAttribute('class').concat('nginvalid')
                        else
                            contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-valid', 'ng-invalid'))
                    }

                    else {
                        if (contextObj.el.nativeElement.getAttribute('class').search('ng-invalid') >= 0)
                            contextObj.el.nativeElement.setAttribute('class', contextObj.el.nativeElement.getAttribute('class').replace('ng-invalid', 'ng-valid'))
                    }
                    contextObj.validateMessage.emit({ message });

                     return message;
                }
        }
        this.fieldObject.IsLocallyValidated = true;
    }
*/

    onblur(fieldObject: IField) {
        this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
    }
    onchange(fieldObject: IField) {
        if (fieldObject.DataEntryControlId == 4) {
            this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
        }
    }
    onKeypress(keyCode, fieldObject: IField) {
        fieldObject.IsLocallyValidated
        if (keyCode == 13)
            this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
    }




}