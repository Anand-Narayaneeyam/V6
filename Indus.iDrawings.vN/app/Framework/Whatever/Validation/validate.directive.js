var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var validation_service_1 = require('../../Models/Validation/validation.service');
var Validation = (function () {
    function Validation(_validateService, el, _renderer) {
        this._validateService = _validateService;
        this.el = el;
        this._renderer = _renderer;
        this.validateMessage = new core_1.EventEmitter();
    }
    Validation.prototype.ngAfterViewInit = function () {
        this._validateService.initializeService(this.validationData);
    };
    Validation.prototype.ngOnChanges = function (changes) {
        this.fieldObject.IsLocallyValidated = this.fieldObject.IsLocallyValidated;
        //console.log("onchanges in validate directive")
        if (changes["fieldObject"] && changes["fieldObject"]["currentValue"] == changes["fieldObject"]["previousValue"]) {
            this._validateService.initiateValidation(this.fieldObject, this, false, this.el.nativeElement);
        }
        else if (this.fieldObject.IsLocallyValidated == null || this.fieldObject.IsLocallyValidated == false) {
            this._validateService.initiateValidation(this.fieldObject, this, false, this.el.nativeElement);
        }
    };
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
    Validation.prototype.onblur = function (fieldObject) {
        this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
    };
    Validation.prototype.onchange = function (fieldObject) {
        if (fieldObject.DataEntryControlId == 4) {
            this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
        }
    };
    Validation.prototype.onKeypress = function (keyCode, fieldObject) {
        fieldObject.IsLocallyValidated;
        if (keyCode == 13)
            this._validateService.initiateValidation(fieldObject, this, true, this.el.nativeElement);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Validation.prototype, "validateMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Validation.prototype, "validationData", void 0);
    Validation = __decorate([
        core_1.Directive({
            selector: '[validatetext]',
            host: {
                '(blur)': 'onblur(fieldObject)',
                '(keypress)': 'onKeypress($event.keyCode,fieldObject)',
                '(change)': 'onchange(fieldObject)'
            },
            inputs: ['fieldObject'],
            providers: [validation_service_1.ValidateService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, core_1.ElementRef, core_1.Renderer])
    ], Validation);
    return Validation;
}());
exports.Validation = Validation;
//# sourceMappingURL=validate.directive.js.map