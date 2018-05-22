var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var stringtextbox_component_1 = require('../../Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var dropdownlistcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var textareacomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var datecomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/datecomponent.component');
var datetimecomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/datetimecomponent.component');
var fileuploadcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component');
var imageuploadcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/imageuploadcomponent.component');
var card_component_1 = require('../../Whatever/Card/card.component');
var checkboxcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var radiocomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var FieldComponent = (function () {
    function FieldComponent(card, differ, differs1) {
        this.isEditEnabled = true;
        this.differ = differ;
        this.readOnly = true;
        this.card = card;
        this.differ1 = differs1;
    }
    FieldComponent.prototype.ngOnInit = function () {
        this.diffCancel = this.differ.find(this.card.isCancel).create(null);
        this.diffSubmit = this.differ.find(this.card.isSubmit).create(null);
        this.differAdd = this.differ.find(this.card.isAdded).create(null);
        this.diffSource = this.differ1.find(this.card.List.source).create(null);
    };
    FieldComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var canclChange = this.diffCancel.diff(this.card.isCancel);
        if (canclChange) {
            if (this.oldfieldValue != undefined || this.oldfieldValue === null) {
                this.fieldValue = this.oldfieldValue;
            }
            if (this.fieldObject.DataEntryControlId == 4) {
                this.updateDdlValue(2);
            }
            this.readOnly = true;
        }
        else {
            var subChange = this.diffSubmit.diff(this.card.isSubmit);
            if (subChange) {
                if (this.card.submitSuccess) {
                    if (this.card.submitSuccess[0]["isSuccess"] == false) {
                        this.setFocusOnField(this.card.submitSuccess[0]["FieldId"]);
                        this.fieldObject.HasValidationError = true;
                        if (this.fieldObject.DataEntryControlId == 4) {
                            this.updateDdlValue(1);
                        }
                        if (this.card.isAdded[0] == "true")
                            this.card.List.isAddedCard = true;
                    }
                    else {
                        this.oldfieldValue = undefined;
                        this.fieldObject.HasValidationError = false;
                        this.readOnly = true;
                        this.card.isEditted = false;
                        this.card.List.isAddedCard = false;
                    }
                }
                else {
                    this.readOnly = true;
                    this.card.isEditted = false;
                    this.oldfieldValue = undefined;
                }
            }
        }
        var isAdded = this.differAdd.diff(this.card.isAdded);
        if (isAdded) {
            var contextObj = this;
            this.card.localenableDeleBtn = false;
            this.readOnly = false;
            this.fieldObject.IsLocallyValidated = null;
            if (this.fieldObject.IsEnabled == true && this.card.focusfieldId == 0) {
                this.card.focusfieldId = this.fieldObject.FieldId;
            }
            this.card.isEditted = true;
            this.card.selection = true;
            this.setFocusOnField(this.card.focusfieldId);
        }
        var changes = this.diffSource.diff(this.card.List.source);
        if (changes) {
            if (changes._removalsHead) {
                changes.forEachRemovedItem(function (r) { return _this.card.removeSelectedKeys(r.item[_this.card.List.datakey]); });
            }
        }
    };
    FieldComponent.prototype.onFieldDoubleClick = function (event) {
        event.stopPropagation();
        if (this.card.enableEditBtn == true) {
            if (this.isEditEnabled == true) {
                if (!this.card.List.isAddedCard) {
                    //this.card.localenableDeleBtn = false;
                    if ((this.fieldObject.IsEnabled == false) && (this.card.datakeyValue != undefined)) {
                        this.readOnly = true;
                    }
                    else {
                        //this.card.isEditted = true;
                        //this.card.selection = true;
                        this.oldfieldValue = this.fieldValue;
                        if (this.fieldObject.DataEntryControlId == 4) {
                            this.updateDdlValue(1);
                        }
                        this.readOnly = false;
                        this.setFocusOnField(this.fieldObject.FieldId);
                        this.card.onCardSelection(2);
                    }
                }
            }
        }
    };
    FieldComponent.prototype.setFocusOnField = function (focusFieldId) {
        setTimeout(function () {
            var element = document.getElementById(focusFieldId.toString());
            if (element)
                element.focus();
        }, 50);
    };
    FieldComponent.prototype.updateField = function (fldObj) {
        if (this.card.type == "list") {
            this.fieldObject.IsHiddenLabel = true;
        }
        if ((this.fieldObject.GenericDataTypeId == 6 || this.fieldObject.GenericDataTypeId == 4 || this.fieldObject.GenericDataTypeId == 5) && this.fieldValue != undefined && this.fieldValue != null &&
            (this.fieldObject.DataEntryControlId == 1 || this.fieldObject.DataEntryControlId == 3)) {
            if (this.fieldObject.GenericDataTypeId == 4)
                if (isNaN(Number(this.fieldValue)) == false)
                    this.fieldObject.FieldValue = Number(this.fieldValue).toFixed(2).toString().trim();
                else
                    this.fieldObject.FieldValue = this.fieldValue;
            else
                this.fieldObject.FieldValue = this.fieldValue.toString().trim();
        }
        else {
            //if (this.fieldObject.GenericDataTypeId == 2 || this.fieldObject.GenericDataTypeId==3) 
            //    this.formatDateandDateTime(this.fieldObject.GenericDataTypeId)                        
            //else
            this.fieldObject.FieldValue = this.fieldValue;
        }
        this.fieldObject.ReadOnlyMode = this.readOnly;
        this.fieldObject.NotificationType = "inline";
        return this.fieldObject;
    };
    FieldComponent.prototype.onChangeInput = function (e) {
        if (!this.fieldObject.HasValidationError)
            this.oldfieldValue = this.fieldValue;
        if (this.fieldObject.DataEntryControlId == 6) {
            this.fieldValue = e.target.checked;
        }
        else {
            this.fieldValue = e.target.value;
        }
    };
    FieldComponent.prototype.changeEmit = function (e, dataEntryCtrlId) {
        switch (dataEntryCtrlId) {
            case 2:
                if (!this.fieldObject.HasValidationError)
                    this.oldfieldValue = e.FieldObject.FieldValue;
                this.fieldValue = e.FieldObject.FieldValue;
                break;
            case 8:
                if (!this.fieldObject.HasValidationError)
                    this.oldfieldValue = e.fieldObj.FieldValue;
                this.fieldValue = e.fieldObj.FieldValue;
                break;
            case 5:
                if (!this.fieldObject.HasValidationError)
                    this.oldfieldValue = e.fieldObj.fieldValue;
                break;
        }
    };
    FieldComponent.prototype.updateDdlValue = function (target) {
        var value = this.fieldValue;
        var test;
        if (target == 1) {
            if (value == "" || value == undefined) {
                this.fieldValue = "0";
            }
            else {
                test = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Value === value; });
                if (test) {
                    this.fieldValue = test.Id.toString();
                }
            }
        }
        else {
            if (value == "0" || value == undefined) {
                this.fieldValue = "";
            }
            else {
                test = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Id.toString() === value; });
                if (test) {
                    this.fieldValue = test.Value.toString();
                }
            }
        }
    };
    FieldComponent.prototype.getFileData = function (event) {
        this.card.fileObject = event;
        this.card.onFileUpload.emit({ "fileObject": event });
    };
    ;
    FieldComponent.prototype.chkBoxOut = function (event) {
        this.card.chkboxOutEvent.emit(event);
    };
    FieldComponent.prototype.getImageData = function (event) {
        this.card.fileObject = event;
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldComponent.prototype, "fieldObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FieldComponent.prototype, "isEditEnabled", void 0);
    FieldComponent = __decorate([
        core_1.Component({
            selector: 'field',
            templateUrl: 'app/Framework/Views/Card/field.component.html',
            inputs: ['fieldObject', 'fieldValue'],
            //changeDetection: ChangeDetectionStrategy.OnPush,
            directives: [stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, textareacomponent_component_1.TextAreaComponent, datecomponent_component_1.DateComponent, datetimecomponent_component_1.DateTimeComponent, fileuploadcomponent_component_1.FileUploadComponent, imageuploadcomponent_component_1.ImageUploadComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, radiocomponent_component_1.CustomRadioComponent]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return card_component_1.CardComponent; }))), 
        __metadata('design:paramtypes', [card_component_1.CardComponent, core_1.KeyValueDiffers, core_1.IterableDiffers])
    ], FieldComponent);
    return FieldComponent;
}());
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map