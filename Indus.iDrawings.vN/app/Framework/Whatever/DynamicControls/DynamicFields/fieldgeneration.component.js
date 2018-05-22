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
var stringtextbox_component_1 = require('./stringtextbox.component');
var textareacomponent_component_1 = require('./textareacomponent.component');
var dropdownlistcomponent_component_1 = require('./dropdownlistcomponent.component');
var radiocomponent_component_1 = require('./radiocomponent.component');
var checkboxcomponent_component_1 = require('./checkboxcomponent.component');
var listboxcomponent_component_1 = require('./listboxcomponent.component');
var datecomponent_component_1 = require('./datecomponent.component');
var datetimecomponent_component_1 = require('./datetimecomponent.component');
var labelcomponent_component_1 = require('./labelcomponent.component');
var buttoncomponent_component_1 = require('./buttoncomponent.component');
var fileuploadcomponent_component_1 = require('./fileuploadcomponent.component');
var colorpickercomponent_component_1 = require('./colorpickercomponent.component');
var imageuploadcomponent_component_1 = require('./imageuploadcomponent.component');
var dynamiclist_component_1 = require('./dynamiclist.component');
var lookuptextbox_component_1 = require('./lookuptextbox.component');
var validation_service_1 = require('../../../Models/Validation/validation.service');
var General_1 = require('../../../../Models/Common/General');
var ng2_dnd_1 = require('../../../ExternalLibraries/dnd/ng2-dnd');
var FieldComponent = (function () {
    function FieldComponent(_validateService, el, cdr, _renderer) {
        this._validateService = _validateService;
        this.el = el;
        this._renderer = _renderer;
        this.blnshowSubSwitches = false;
        this.blnSetFocus = false;
        this.ValidationIsFocused = false;
        this.holidaysDisabled = false;
        this.disableDates = ["Sunday", "Saturday"];
        this.showButton = true;
        this.supportMultiColumnDispay = false;
        this.c1 = new core_1.EventEmitter();
        this.fieldChange = new core_1.EventEmitter();
        this.rbnChange = new core_1.EventEmitter();
        this.chkChange = new core_1.EventEmitter();
        this.txtChange = new core_1.EventEmitter();
        this.txtkeyUpemitter = new core_1.EventEmitter();
        this.fileChange = new core_1.EventEmitter();
        this.colorChange = new core_1.EventEmitter();
        this.lstBoxChange = new core_1.EventEmitter();
        this.lstBoxSelAllChange = new core_1.EventEmitter();
        this.dateChange = new core_1.EventEmitter();
        this.submitFieldObject = new core_1.EventEmitter();
        this.popupItemEmit = new core_1.EventEmitter();
        this.btnItemEmit = new core_1.EventEmitter();
        this.dynamicListAddEmit = new core_1.EventEmitter();
        this.dynamicListRemoveEmit = new core_1.EventEmitter();
        this.lookupSelectEmit = new core_1.EventEmitter();
        this.multiColumnClass = "";
        this.multiColumnFormClass = "";
        this.cdr = cdr;
    }
    FieldComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this._validateService.getBlacklist().subscribe(function (resultData) {
            contextObj.validationData = resultData;
        });
        if (this.showButton == true || this.showButton == undefined || this.showButton == null || this.btnName != " " || this.btnName != null || this.btnName != undefined) {
            this.btnVisible = "block";
        }
        else {
            this.btnVisible = "none";
        }
        this.fieldListArray = this.dataSource;
        if (this.FileExtDynamicFields != undefined) {
            this.strFileExtensions = this.FileExtDynamicFields;
        }
        if (this.CommonFileExtDynamicFields != undefined) {
            this.strCommonFileExtensions = this.CommonFileExtDynamicFields;
        }
        if (contextObj.blndisableAllComponents == true) {
            contextObj.blnShowReadOnly = true;
        }
        else {
            contextObj.blnShowReadOnly = false;
        }
        console.log(this.holidaysDisabled);
    };
    FieldComponent.prototype.ngOnChanges = function (changes) {
        this.strFileExtensions = this.FileExtDynamicFields;
        var relationshipFields;
        if (changes["btnName"] && changes["btnName"]["currentValue"] != changes["btnName"]["previousValue"]) {
            if (this.btnName != "" && this.btnName != null && this.btnName != undefined) {
                this.btnVisible = "block";
            }
            else {
                this.btnVisible = "none";
            }
        }
        if (this.dataSource !== undefined) {
            /* relationshipFields function as per new fieldobject*/
            relationshipFields = this.dataSource.filter(function (x) { return x.HasChild !== undefined; }); /*JN to be checked */
            if (relationshipFields.length > 0) {
                var fieldsHavingParent = relationshipFields.filter(function (x) { return x.HasChild !== undefined; });
                var _loop_1 = function(i) {
                    subField = fieldsHavingParent[i];
                    parentFields = fieldsHavingParent[i].ParentId;
                    if (parentFields != null) {
                        if (fieldsHavingParent[i].IsSubField) {
                            parentFieldObj = this_1.dataSource.filter(function (x) { return x.FieldId == fieldsHavingParent[i].FieldId; })[0];
                            if (parentFieldObj.SubFields == undefined) {
                                parentFieldObj.SubFields = new Array();
                            }
                            checkForObject = function (obj) {
                                return obj.FieldId == subField.FieldId;
                            };
                            parentFieldObj.SubFields.push(subField);
                            this_1.dataSource.splice(this_1.dataSource.findIndex(checkForObject), 1);
                        }
                    }
                };
                var this_1 = this;
                var subField, parentFields, parentFieldObj, checkForObject;
                for (var i = 0; i < fieldsHavingParent.length; i++) {
                    _loop_1(i);
                }
            }
        }
        if (this.supportMultiColumnDispay || this.multiColumnNumber != undefined) {
            if (this.multiColumnNumber == undefined || this.multiColumnNumber == 2) {
                this.multiColumnClass = "col-md-6 col-lg-6 multi-column";
            }
            else if (this.multiColumnNumber == 3) {
                this.multiColumnClass = "col-md-4 col-lg-4 multi-column";
            }
            this.multiColumnFormClass = "multi-column-form";
        }
    };
    FieldComponent.prototype.ngAfterViewChecked = function () {
        var contextObj = this;
        if (contextObj.blndisableAllComponents == true) {
            contextObj.blnShowReadOnly = true;
        }
        else {
            contextObj.blnShowReadOnly = false;
        }
        if (contextObj.strPopupText != null || contextObj.strPopupText != "") {
            this.strPopUpTxt = contextObj.strPopupText;
        }
        if (this.blnShowReadOnly == true) {
            if (contextObj.dataSource != undefined) {
                for (var i = 0; i < this.dataSource.length; i++) {
                    this.dataSource[i].ReadOnlyMode = true;
                }
                this.btnVisible = "none";
            }
        }
        else {
        }
        if (this.blnIsFocused != true) {
            var input = null;
        }
    };
    FieldComponent.prototype.onSubmit = function (form, value) {
        debugger;
        this.ValidationIsFocused = false;
        var contextObj = this;
        var checkForErrors = function (fieldObject) {
            console.log('field objects in this page', fieldObject);
            return fieldObject.HasValidationError;
        };
        /*To set focus to the field with valdiation error on submit click */
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].HasValidationError == true && !this.ValidationIsFocused) {
                var input = null;
                if (contextObj.dataSource[i].DataEntryControlId == 5) {
                    input = document.getElementById(contextObj.dataSource[i].LookupDetails.LookupValues[0].Id.toString());
                }
                else {
                    input = document.getElementById(contextObj.dataSource[i].FieldId.toString());
                }
                if (contextObj.dataSource != undefined) {
                    if (input != undefined) {
                        this._renderer.invokeElementMethod(input, 'focus');
                        contextObj.ValidationIsFocused = true;
                        break;
                    }
                }
            }
        }
        /***** To set focus to the field with valdiation error on submit click *****/
        if (this.dataSource.find(checkForErrors)) {
            return;
        }
        var obj = new General_1.GeneralFunctions();
        var retObj;
        if (this.fileObj != null) {
            retObj = obj.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": this.dataSource, "filedata": this.fileObj });
            this.reportFieldArray = retObj["fieldobject"];
        }
        else {
            this.reportFieldArray = obj.getFieldValuesAsReportFieldArray(this.dataSource);
        }
        var isValid = true;
        if (isValid == true) {
            if (retObj != undefined) {
                this.submitFieldObject.emit({
                    fieldobject: this.reportFieldArray,
                    filedata: retObj["filedata"]
                });
            }
            else {
                this.submitFieldObject.emit({
                    fieldobject: this.reportFieldArray
                });
            }
        }
        else {
        }
    };
    FieldComponent.prototype.ddlRelationChange = function (event) {
        this.fieldChange.emit({
            ddlRelationShipEvent: event
        });
    };
    ;
    FieldComponent.prototype.rbtnChange = function (event) {
        this.rbnChange.emit({
            rbtnObject: event
        });
    };
    ;
    FieldComponent.prototype.chkBoxChange = function (event) {
        this.chkChange.emit({
            chkBoxObject: event
        });
    };
    ;
    FieldComponent.prototype.txtBoxChanges = function (event) {
        this.txtChange.emit({
            txtChangeObject: event
        });
    };
    ;
    FieldComponent.prototype.lookupSelect = function (event) {
        this.lookupSelectEmit.emit({
            selectedItem: event
        });
    };
    ;
    FieldComponent.prototype.emitKeyUp = function (event) {
        this.txtkeyUpemitter.emit({
            event: event,
            fieldObject: this.dataSource
        });
    };
    ;
    FieldComponent.prototype.listBoxChange = function (event) {
        this.lstBoxChange.emit({
            listChangeObject: event
        });
    };
    ;
    FieldComponent.prototype.SelectAllChange = function (event) {
        this.lstBoxSelAllChange.emit({
            listChangeObject: event
        });
    };
    ;
    FieldComponent.prototype.datePickerChange = function (event) {
        this.dateChange.emit({
            dateChangeObject: event
        });
    };
    ;
    FieldComponent.prototype.getColorChange = function (event) {
        this.colorChange.emit({
            colorChangeObject: event
        });
    };
    ;
    FieldComponent.prototype.getFileData = function (event) {
        this.fileObj = event;
        this.fileChange.emit({
            fileObj: this.fileObj
        });
    };
    ;
    FieldComponent.prototype.getImageData = function (event) {
        this.fileObj = event;
    };
    ;
    FieldComponent.prototype.popupClick = function (event) {
        this.popupItemEmit.emit(event);
    };
    ;
    FieldComponent.prototype.getBtnChanges = function (event) {
        this.btnItemEmit.emit(event);
    };
    ;
    FieldComponent.prototype.getDynamicListAdd = function (event) {
        this.dynamicListAddEmit.emit(event);
    };
    ;
    FieldComponent.prototype.getDynamicListRemove = function (event) {
        this.dynamicListRemoveEmit.emit(event);
    };
    ;
    FieldComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (fieldName == this.dataKey || isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    FieldComponent.prototype.toggleDisplaySettings = function () {
        if (this.blnshowSubSwitches == false) {
            this.blnshowSubSwitches = true;
        }
        else {
            this.blnshowSubSwitches = false;
        }
    };
    FieldComponent.prototype.onSelection = function (event, fieldId, IsVisible) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "strPopupText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "btnName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "holidaysDisabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "strLstBoxValidateMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "blnPopupImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "showButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "btnVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FieldComponent.prototype, "FileExtDynamicFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FieldComponent.prototype, "CommonFileExtDynamicFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "supportMultiColumnDispay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "multiColumnNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "blndisableAllComponents", void 0);
    __decorate([
        /*input for showing all components as disabled */ core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "showDateOnLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "showDateTimeOnLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "labelWidth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "fieldObject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "c1", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "fieldChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "rbnChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "chkChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "txtChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "txtkeyUpemitter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "fileChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "colorChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "lstBoxChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "lstBoxSelAllChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "dateChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "submitFieldObject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "popupItemEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "btnItemEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "dynamicListAddEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "dynamicListRemoveEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "lookupSelectEmit", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], FieldComponent.prototype, "input", void 0);
    FieldComponent = __decorate([
        core_1.Component({
            selector: 'DynamicFields',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/fieldGeneration.component.html',
            directives: [stringtextbox_component_1.StringTextBoxComponent, textareacomponent_component_1.TextAreaComponent, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, radiocomponent_component_1.CustomRadioComponent, listboxcomponent_component_1.ListBoxComponent, datecomponent_component_1.DateComponent, datetimecomponent_component_1.DateTimeComponent, labelcomponent_component_1.LabelComponent, buttoncomponent_component_1.ButtonComponent, fileuploadcomponent_component_1.FileUploadComponent, colorpickercomponent_component_1.ColorPickerComponent, imageuploadcomponent_component_1.ImageUploadComponent, dynamiclist_component_1.DynamicListComponent, lookuptextbox_component_1.LookupStringTextBoxComponent, ng2_dnd_1.DND_DIRECTIVES],
            inputs: ['dataSource'],
            providers: [validation_service_1.ValidateService, General_1.GeneralFunctions],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, core_1.ElementRef, core_1.ChangeDetectorRef, core_1.Renderer])
    ], FieldComponent);
    return FieldComponent;
}());
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=fieldgeneration.component.js.map