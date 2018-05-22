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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var SiteAddEditComponent = (function () {
    function SiteAddEditComponent(administrationService, _renderer, _validateService, el, _notificationService, getData, cdr) {
        this.administrationService = administrationService;
        this._renderer = _renderer;
        this._validateService = _validateService;
        this.el = el;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.submitSuccess = new core_1.EventEmitter();
        this.cdr = cdr;
    }
    SiteAddEditComponent.prototype.ngOnInit = function () {
        console.log(this.moduleId);
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
    };
    SiteAddEditComponent.prototype.onSubmitData = function (event) {
        debugger;
        if (this.addEdit == "add") {
            var contextObj = this;
            var temp = JSON.parse(event["fieldobject"]);
            for (var i = 0; i < temp.length; i++) {
                if (temp[i]["ReportFieldId"] == 576) {
                    temp[i]["Value"] = "1";
                    break;
                }
            }
            if (contextObj.moduleId != undefined)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitSiteAdd(JSON.stringify(temp)).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"];
                    // if (contextObj.success["Data"] != "")
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Site added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Site already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1)
                            contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Site Code already exists", 5);
                    }
                }
            });
        }
        else if (this.addEdit == "edit") {
            var temp = JSON.parse(event["fieldobject"]);
            var contextObj = this;
            if (contextObj.moduleId)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitSiteEdit(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);
                    // if (contextObj.success["Data"] != "")
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Site updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Site already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1) {
                            contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                        }
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Site Code already exists", 5);
                    }
                }
            });
        }
    };
    SiteAddEditComponent.prototype.ngOnChanges = function (changes) {
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadSiteAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = contextObj.setSiteAreaCondition(resultData["Data"]);
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 238) {
                            contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;
                            break;
                        }
                    }
                }
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            var contextObj = this;
            this.administrationService.loadSiteAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = contextObj.setSiteAreaCondition(resultData["Data"]);
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 238) {
                            contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                            break;
                        }
                    }
                }
            });
        }
    };
    SiteAddEditComponent.prototype.setSiteAreaCondition = function (data) {
        var contextObj = this;
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            var isRpmEnabled = [];
            isRpmEnabled = resultData["Data"].filter(function (item) { return item.ModuleId === 30; });
            if (isRpmEnabled.length > 0) {
                data.find(function (item) {
                    if (item.FieldId == 168) {
                        if (isRpmEnabled) {
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                            var el = document.getElementById(item.FieldId.toString());
                            if (el != null && el != undefined) {
                                setTimeout(function () {
                                    contextObj._validateService.initiateValidation(item, contextObj, true, el);
                                }, 100);
                            }
                        }
                        return true;
                    }
                    else
                        return false;
                });
            }
        });
        return data;
    };
    SiteAddEditComponent.prototype.fieldChange = function (event) {
        var countryid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;
        var contextObj = this;
        if (countryid > 0) {
            if (parentFieldId == 171) {
                var stateid = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                    return item.FieldId === 173;
                });
                this.administrationService.loadState(countryid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            stateid.IsMandatory = true;
                            stateid.HasValidationError = true;
                            contextObj.newstate = stateid;
                            stateid = null;
                            contextObj.newstate.IsLocallyValidated = false;
                            stateid = contextObj.newstate;
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 173) {
                                    contextObj.fieldDetailsSpaceEdit[i] = null;
                                    contextObj.fieldDetailsSpaceEdit[i] = stateid;
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    contextObj.fieldDetailsSpaceEdit[i]["IsMandatory"] = true;
                                    var element = document.getElementById("173");
                                    contextObj.fieldDetailsSpaceEdit[i].IsLocallyValidated = false;
                                    contextObj.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true);
                                    // contextObj.fieldDetailsSpaceEdit[i].FieldValue = resultData["Data"]["LookupValues"][0].Value;-- to display the first look up value in the mandatory state field
                                    break;
                                }
                            }
                            contextObj.cdr.detectChanges();
                        }
                        else {
                            stateid.IsMandatory = false;
                            stateid.HasValidationError = false;
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 173) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    contextObj.fieldDetailsSpaceEdit[i]["IsMandatory"] = false;
                                    contextObj.fieldDetailsSpaceEdit[i]["HasValidationError"] = false;
                                    contextObj.fieldDetailsSpaceEdit[i].IsLocallyValidated = false;
                                    contextObj.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true);
                                    break;
                                }
                            }
                        }
                    }
                });
            }
        }
        else {
            if (parentFieldId == 171) {
                for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 173) {
                        contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                        contextObj.fieldDetailsSpaceEdit[i]["IsMandatory"] = false;
                        contextObj.fieldDetailsSpaceEdit[i]["HasValidationError"] = false;
                        contextObj.fieldDetailsSpaceEdit[i].IsLocallyValidated = false;
                        contextObj.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true);
                        break;
                    }
                }
            }
            else if (parentFieldId == 173) {
                var stateinfo = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.FieldId === 173; });
                stateinfo.IsMandatory = true;
                stateinfo.HasValidationError = true;
                contextObj.initiateValidation(stateinfo, contextObj, true);
            }
        }
    };
    SiteAddEditComponent.prototype.initiateValidation = function (fieldObject, contextObj, isValueChanged) {
        var el = document.getElementById("173");
        var message = contextObj._validateService.validate(fieldObject);
        if (message.length > 0) {
            fieldObject.HasValidationError = true;
        }
        else {
            fieldObject.HasValidationError = false;
        }
        var attribute = el.getAttribute('class');
        if (fieldObject.NotificationType == null)
            fieldObject.NotificationType = "inline";
        switch (fieldObject.NotificationType) {
            case 'inline':
                {
                    var span;
                    if (!el.hasAttribute('class')) {
                        el.setAttribute('class', '');
                    }
                    if (el.nextElementSibling != null) {
                        span = el.nextElementSibling;
                        span.innerHTML = "";
                        span.innerHTML = message;
                        span.style.color = "red";
                        span.style.display = "block";
                        span.style.width = "100%";
                        span.style["overflow-x"] = "hidden";
                        span.style["word-wrap"] = "break-word";
                        span.style["font-size"] = "small";
                        if (message == "") {
                            if (el.getAttribute('class').search('ng-invalid') >= 0)
                                el.setAttribute('class', el.getAttribute('class').replace('ng-invalid', 'ng-valid'));
                            el.style.borderColor = null;
                        }
                        else {
                            if ((el.getAttribute('class').search('ng-invalid') < 0) && (el.getAttribute('class').search('ng-valid') < 0))
                                el.setAttribute('class', attribute + ' ng-invalid');
                            else
                                contextObj.el.nativeElement.setAttribute('class', el.getAttribute('class').replace('ng-valid', 'ng-invalid'));
                            el.style.borderColor = "red";
                        }
                    }
                    else {
                        span = document.createElement('span');
                        span.innerHTML = message;
                        el.parentNode.insertBefore(span, contextObj.el.nativeElement.nextSibling);
                        span.style.color = "red";
                        span.style.display = "block";
                        span.style.width = "100%";
                        span.style["overflow-x"] = "hidden";
                        span.style["word-wrap"] = "break-word";
                        span.style["font-size"] = "small";
                        el.style.borderColor = "red";
                        if (message == "") {
                            if (el.getAttribute('class').search('ng-invalid') >= 0)
                                el.setAttribute('class', el.getAttribute('class').replace('ng-invalid', 'ng-valid'));
                            el.style.borderColor = null;
                        }
                        else {
                            if ((el.getAttribute('class').search('ng-invalid') < 0) && (el.getAttribute('class').search('ng-valid') < 0))
                                el.setAttribute('class', attribute + ' ng-invalid');
                            else
                                contextObj.el.nativeElement.setAttribute('class', el.getAttribute('class').replace('ng-valid', 'ng-invalid'));
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
        }
        fieldObject.IsLocallyValidated = true;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteAddEditComponent.prototype, "submitSuccess", void 0);
    SiteAddEditComponent = __decorate([
        core_1.Component({
            selector: 'site-addEdit',
            templateUrl: 'app/Views/Administration/Site/site-addedit.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'addEdit', 'moduleId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, core_1.Renderer, validation_service_1.ValidateService, core_1.ElementRef, notify_service_1.NotificationService, General_1.GeneralFunctions, core_1.ChangeDetectorRef])
    ], SiteAddEditComponent);
    return SiteAddEditComponent;
}());
exports.SiteAddEditComponent = SiteAddEditComponent;
//# sourceMappingURL=site-addedit.component.js.map