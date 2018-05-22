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
var forms_1 = require('@angular/forms');
var field_component_1 = require('../../Whatever/Card/field.component');
var list_component_1 = require('../../Whatever/List/list.component');
var General_1 = require('../../../Models/Common/General');
var CardComponent = (function () {
    function CardComponent(List, elemRef, genaralFun, differ) {
        this.genaralFun = genaralFun;
        this.enableDeleBtn = true;
        this.enableEditBtn = true;
        this.isViewForDrwg = false;
        this.onSubmition = new core_1.EventEmitter();
        this.inlineDelete = new core_1.EventEmitter();
        this.onCardClick = new core_1.EventEmitter();
        this.onViewForDrwgClick = new core_1.EventEmitter();
        this.onCancelClick = new core_1.EventEmitter();
        this.onFileUpload = new core_1.EventEmitter();
        this.onAddedOutObj = new core_1.EventEmitter();
        this.chkboxOutEvent = new core_1.EventEmitter();
        this.getTitle = new core_1.EventEmitter();
        this.localenableDeleBtn = true;
        this.titleForCard = "";
        this.selection = false;
        this.isEditted = false;
        this.hoverEffect = false;
        //viewTitle:string="View Markup"
        this.viewTooltip = "";
        this.isAdded = [];
        this.isCancel = [];
        this.isSubmit = [];
        this.submitTitle = "Save Changes";
        this.multiColumnClass = "";
        this.multiColumnFormClass = "";
        this.focusfieldId = 0;
        this.localSubmitSuccess = false; //to be remove
        this.toolTipView = "";
        this.differcard = differ;
        this.List = List;
        this.el = elemRef;
    }
    CardComponent.prototype.ngOnInit = function () {
        if (this.submitSuccess) {
            this.diffSubmitcard = this.differcard.find(this.submitSuccess).create(null);
        }
        this.toolTipView = this.viewTitle;
        this.viewTooltip = "View " + this.toolTipView;
        this.multiColumnClass = "col-md-6 col-lg-6 multi-column";
        this.multiColumnFormClass = "multi-column-form";
    };
    CardComponent.prototype.ngOnChanges = function (changes) {
        if (changes["datakeyValue"]) {
            if ((changes["datakeyValue"]["currentValue"] == null) || (changes["datakeyValue"]["currentValue"] == -1)) {
                this.isAdded.push("true");
                this.submitTitle = "Save";
                this.List.isAddedCard = true;
                this.removePrevSelection();
            }
        }
    };
    CardComponent.prototype.ngDoCheck = function () {
        if (this.submitSuccess) {
            var submitChange = this.diffSubmitcard.diff(this.submitSuccess);
            if (submitChange) {
                this.isSubmit.push("true");
            }
        }
        else if (this.localSubmitSuccess == true) {
            this.isSubmit.push("true");
            this.localSubmitSuccess = false;
        }
    };
    CardComponent.prototype.EnterOrDeleteKey = function (e) {
        if (e.keyCode == 13 || e.keyCode == 46) {
            var activeCardElem = $(document.activeElement);
            if (activeCardElem.length > 0) {
                if (activeCardElem[0].id == "card-item-each" && e.keyCode == 13) {
                    this.cardFunctions(e, 2);
                }
                else if (activeCardElem[0].id == "card-item-each" && e.keyCode == 46) {
                    this.cardFunctions(e, 6);
                }
            }
        }
    };
    CardComponent.prototype.getTitleForCard = function () {
        var getContentTitle = $(document.activeElement.querySelectorAll("stringtextbox"));
        if (getContentTitle.length > 0 && getContentTitle) {
            this.titleForCard = getContentTitle[0].title + " Press Enter to Edit or Delete to Delete this";
        }
    };
    CardComponent.prototype.onSubmit = function (e) {
        var ValidationError = [];
        if (this.isAdded[0] == "true") {
            this.cardFields.forEach(function (item) {
                var HasValidationError = item.fieldObject.HasValidationError;
                if (HasValidationError == true) {
                    ValidationError.push(HasValidationError);
                }
            });
        }
        if ((ValidationError.length < 1) || (this.submitSuccess && this.submitSuccess[0]["isSuccess"] == false)) {
            if (this.el.nativeElement.getElementsByClassName('ng-invalid').length == 0) {
                var returnObj = this.retFieldObj();
                this.localSubmitSuccess = true;
                //this.List.isAddedCard = false;              
                this.onSubmition.emit({ "fieldObject": returnObj, "dataKeyValue": this.datakeyValue, "filedata": this.fileData });
            }
        }
    };
    CardComponent.prototype.handleClick = function (e) {
        e.stopPropagation();
        this.onCardSelection(0);
    };
    CardComponent.prototype.cardFunctions = function (e, id) {
        this.getTitleForCard();
        if (id == 4) {
            this.handleClick(e);
        }
        else if (id == 6) {
            this.delete(e);
        }
        if (e.keyCode == 13 || e.keyCode == 32) {
            if (id == 1) {
                this.cancel(e);
            }
            else if (id == 2) {
                this.edit(e);
            }
            else if (id == 3) {
                this.delete(e);
            }
            else if (id == 5) {
                this.onSubmit(e);
            }
        }
    };
    CardComponent.prototype.onCardSelection = function (target) {
        // alert(this.List.isAddedCard);
        if (this.List.isAddedCard && this.datakeyValue >= 0 && this.datakeyValue != null) {
            this.selection = false;
        }
        else {
            if (this.List.selectionMode == "Single") {
                if (this.List.previousCardObj.length == 0)
                    this.List.previousCardObj.push(this.cardFields);
                else {
                    this.removePrevSelection();
                    this.List.selectedIds.pop();
                    this.List.previousCardObj.push(this.cardFields);
                }
            }
            //if ((this.List.selectionMode == "Single") && (this.List.selectedIds.length > 0)) {
            //    if (this.datakeyValue != this.List.selectedIds[0]) {
            //        var selCardObj = this.List.listElement.nativeElement.getElementsByClassName('selection');
            //        if (selCardObj.length > 0) {
            //            if (this.enableDeleBtn!=undefined) {
            //                if (this.enableDeleBtn != "false") {
            //                    selCardObj[0].getElementsByClassName('imgDelete')[0].setAttribute("hidden", true);
            //                }
            //            }
            //            if (this.type == "list") {
            //                selCardObj[0].className = "list-item";
            //                this.el.nativeElement.className = "list-item selection";
            //            }
            //            else {
            //                selCardObj[0].className = "card";
            //                this.el.nativeElement.className = "card selection";
            //            }
            //        }
            //        this.selection = false;
            //        this.List.selectedIds.pop();
            //    } else { this.selection = true; }
            //}
            switch (target) {
                case 1: //from double click action
                case 2:
                    this.localenableDeleBtn = false;
                    this.isEditted = true;
                    this.selection = true;
                    break;
                default:
                    if (this.isEditted) {
                        this.localenableDeleBtn = false;
                    }
                    else {
                        this.selection = !this.selection;
                        this.localenableDeleBtn = true;
                    }
                    break;
            }
            if (this.selection) {
                if (this.List.selectedIds.indexOf(this.datakeyValue) == -1) {
                    this.List.selectedIds.push(this.datakeyValue);
                }
                this.onCardClick.emit(this.datakeyValue);
            }
            else {
                this.removeSelectedKeys(this.datakeyValue);
            }
        }
    };
    CardComponent.prototype.handlMouseOver = function (e) {
        if (this.enableEditBtn == true) {
            if (!this.List.isAddedCard) {
                var edittedFieldscount_1 = 0;
                this.cardFields.forEach(function (item) {
                    if (item.readOnly && item.fieldObject.IsEnabled) {
                        edittedFieldscount_1++;
                    }
                });
                if (edittedFieldscount_1 > 0) {
                    this.hoverEffect = true;
                }
                else {
                    this.hoverEffect = false;
                }
            }
        }
    };
    CardComponent.prototype.onMouseLeave = function (e) {
        this.hoverEffect = false;
    };
    CardComponent.prototype.edit = function (e) {
        var firstEnabledFieldId;
        var firstElement;
        e.stopPropagation();
        this.isEditted = true;
        //this.localenableDeleBtn = false;    
        this.cardFields.forEach(function (item) {
            if (item.fieldObject.IsEnabled) {
                item.oldfieldValue = item.fieldValue;
                if (item.fieldObject.DataEntryControlId == 4) {
                    item.updateDdlValue(1);
                }
                item.readOnly = false;
                if (firstEnabledFieldId == undefined) {
                    firstEnabledFieldId = item.fieldObject.FieldId.toString();
                }
            }
        });
        this.onCardSelection(1);
        setTimeout(function () {
            var element = document.getElementById(firstEnabledFieldId);
            if (element)
                element.focus();
        }, 50);
    };
    CardComponent.prototype.delete = function (e) {
        e.stopPropagation();
        this.inlineDelete.emit(e);
    };
    CardComponent.prototype.cancel = function (e) {
        e.stopPropagation();
        if (this.isAdded[0] == "true" && (this.datakeyValue < 0 || this.datakeyValue == null)) {
            this.List.source.pop();
            this.List.isAddedCard = false;
            this.onCancelClick.emit({});
        }
        else {
            this.removeErrSpan();
            this.isEditted = false;
            this.isCancel.push("true");
        }
    };
    CardComponent.prototype.ViewDrwg = function (e) {
        e.stopPropagation();
        this.toolTipView = this.viewTitle;
        var isView = false;
        this.viewTooltip = "";
        var curSrc = e.target.getAttribute('src');
        var setSrc = "";
        if (curSrc.indexOf("viewDrawing.png") > -1) {
            isView = true;
            this.viewTooltip = "Hide " + this.toolTipView;
            setSrc = "Content/Layout/hidemarkup.png";
        }
        else {
            isView = false;
            this.viewTooltip = "View " + this.toolTipView;
            setSrc = "Content/Layout/viewDrawing.png";
        }
        e.target.setAttribute('src', setSrc);
        var returnObj = this.retFieldObj();
        this.onViewForDrwgClick.emit({ "fieldObject": returnObj, "dataKeyValue": this.datakeyValue, "isView": isView });
    };
    CardComponent.prototype.removeErrSpan = function () {
        var objErrorMsg = this.el.nativeElement.getElementsByClassName('ng-invalid');
        if (objErrorMsg.length > 0) {
            for (var i = 0; i < objErrorMsg.length; i++) {
                objErrorMsg[i].nextSibling.innerHTML = "";
            }
        }
    };
    CardComponent.prototype.retFieldObj = function () {
        var submitFieldObj = [];
        debugger;
        this.cardFields.forEach(function (item) {
            if ((item.fieldObject.GenericDataTypeId == 6) && item.fieldValue != undefined && item.fieldValue != null &&
                (item.fieldObject.DataEntryControlId == 1 || item.fieldObject.DataEntryControlId == 3)) {
                item.fieldObject.FieldValue = item.fieldValue.toString().trim();
            }
            else if (item.fieldObject.GenericDataTypeId == 4) {
                item.fieldValue = item.fieldValue == "" ? "0" : item.fieldValue;
                var n = parseFloat(item.fieldValue).toFixed(2);
                item.fieldObject.FieldValue = n;
            }
            else if (item.fieldObject.GenericDataTypeId == 5) {
                item.fieldObject.FieldValue = parseInt(item.fieldValue).toString();
            }
            else {
                item.fieldObject.FieldValue = item.fieldValue;
            }
            if (item.fieldObject.DataEntryControlId == 4) {
                item.updateDdlValue(2);
            }
            // item.oldfieldValue = item.fieldValue;
            submitFieldObj.push(item.fieldObject);
        });
        var rptFieldObj;
        if (this.fileObject != null) {
            var retObjwithFileData = this.genaralFun.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": submitFieldObj, "filedata": this.fileObject });
            rptFieldObj = retObjwithFileData["fieldobject"];
            this.fileData = retObjwithFileData["filedata"];
        }
        else {
            rptFieldObj = this.genaralFun.getFieldValuesAsReportFieldArray(submitFieldObj);
        }
        return rptFieldObj;
    };
    CardComponent.prototype.removeSelectedKeys = function (datakey) {
        if (this.List.selectedIds.indexOf(datakey) > -1) {
            this.List.selectedIds.splice(this.List.selectedIds.indexOf(datakey), 1);
        }
    };
    CardComponent.prototype.removePrevSelection = function () {
        if (this.List.previousCardObj.length > 0) {
            var contextObj = this;
            this.List.previousCardObj[0].forEach(function (item) {
                if (item.card.datakeyValue != contextObj.datakeyValue) {
                    if (item.oldfieldValue != undefined || item.oldfieldValue === null) {
                        item.fieldValue = item.oldfieldValue;
                    }
                    var errorMsgs = item.card.el.nativeElement.getElementsByClassName('ng-invalid');
                    if (errorMsgs.length > 0) {
                        for (var i = 0; i < errorMsgs.length; i++) {
                            errorMsgs[i].nextSibling.innerHTML = "";
                        }
                    }
                    item.fieldObject.HasValidationError = false;
                    item.card.isEditted = false;
                    item.card.selection = false;
                    item.readOnly = true;
                }
            });
            this.List.previousCardObj.pop();
        }
    };
    __decorate([
        core_1.ContentChildren(core_1.forwardRef(function () { return field_component_1.FieldComponent; })), 
        __metadata('design:type', core_1.QueryList)
    ], CardComponent.prototype, "cardFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "datakeyValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "viewTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "enableDeleBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "enableEditBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "isViewForDrwg", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onSubmition", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "inlineDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onCardClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onViewForDrwgClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onCancelClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onFileUpload", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "onAddedOutObj", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "chkboxOutEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CardComponent.prototype, "getTitle", void 0);
    CardComponent = __decorate([
        core_1.Component({
            selector: 'card',
            templateUrl: 'app/Framework/Views/Card/card.component.html',
            /*    >  <template [ngTemplateOutlet]="template" ></template>    //encapsulation: ViewEncapsulation.Native,*/
            directives: [forms_1.FORM_DIRECTIVES],
            providers: [General_1.GeneralFunctions],
            styleUrls: ['app/Framework/Views/Card/card.component.css'],
            host: {
                '[class.card]': 'type=="card" || !type',
                '[class.list-item]': 'type=="list"',
                "(click)": "handleClick($event)",
                '[class.selection]': 'selection',
                "(mouseover)": "handlMouseOver($event)",
                "(focusin)": "handlMouseOver($event)",
                "(focusout)": "onMouseLeave($event)",
                "(mouseleave)": "onMouseLeave($event)",
                "(keydown)": "EnterOrDeleteKey($event)"
            },
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return list_component_1.ListComponent; }))), 
        __metadata('design:paramtypes', [list_component_1.ListComponent, core_1.ElementRef, General_1.GeneralFunctions, core_1.KeyValueDiffers])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map