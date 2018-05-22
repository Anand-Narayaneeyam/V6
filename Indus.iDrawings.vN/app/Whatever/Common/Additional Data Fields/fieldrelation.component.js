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
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var FieldRelation = (function () {
    function FieldRelation(el, administrationService, _notificationService) {
        this.el = el;
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.header1 = "Id";
        this.header2 = "fieldvalue";
        this.closerelation = new core_1.EventEmitter();
        this.selId = [];
        this.position = "top-left";
        this.showSlide = false;
        this.hasRelation = false;
        this.disable = true;
    }
    FieldRelation.prototype.ngOnInit = function () {
        this.childValueList;
    };
    FieldRelation.prototype.onddlChange = function (value) {
        var _this = this;
        this.childFieldValue = "0";
        this.parentFieldValue = value;
        this.childValueList = undefined;
        this.selId = [];
        this.hasRelation = false;
        this.disable = true;
        if (value == "0") {
            this.parentValueList = undefined;
            this.ddlchildField = undefined;
        }
        else {
            this.administrationService.GetAdditionalDataFieldLookupValues(value).subscribe(function (list) { return _this.parentValueList = list["data"]; });
            this.administrationService.getValidatedFieldValues(value).subscribe(function (list) { return _this.ddlchildField = list["data"]; });
        }
    };
    FieldRelation.prototype.onddlchildChange = function (value) {
        var _this = this;
        if (value == "0") {
            this.childValueList = undefined;
            this.childFieldValue = "0";
            this.disable = true;
        }
        else {
            this.hasRelation = true; /*this.administrationService.IsRelationExists(value).subscribe(list => console.log(this.parentValueList = list["data"]));*/
            this.disable = false;
            this.childFieldValue = value;
            this.administrationService.getChildFieldValuesData(value).subscribe(function (fieldDetails) { return _this.childValueList = fieldDetails["data"]; });
        }
    };
    FieldRelation.prototype.checkSelected = function (value) {
        if (value == this.parentFieldValue)
            return true;
        else
            return false;
    };
    FieldRelation.prototype.Submit = function () {
        var _this = this;
        this.selId;
        if (this.parentFieldValue == "0" || this.childFieldValue == "0") {
            if (this.parentFieldValue == "0")
                this._notificationService.ShowToaster("Select Parent Field", 4);
            else
                this._notificationService.ShowToaster("Select Child Field", 4);
        }
        else {
            if (this.selId.length <= 0) {
                this._notificationService.ShowToaster("Select Parent Lookup Value", 5);
            }
            else {
                this.administrationService.DeleteAdditionalFieldRelation(this.parentFieldValue, this.childFieldValue);
                this.administrationService.UpdateAdditionalDataFieldRelation(this.parentFieldValue, this.childFieldValue);
                this.childValueList.MultiFieldValues.forEach(function (item, index) {
                    _this.administrationService.SetDataDFieldRelation(_this.selId[0], item);
                });
            }
        }
    };
    FieldRelation.prototype.removeRelation = function () {
        this.showSlide = true;
    };
    FieldRelation.prototype.close = function () {
        this.closerelation.emit({});
    };
    FieldRelation.prototype.okDelete = function ($event) {
        this.administrationService.DeleteAdditionalFieldRelation(this.parentFieldValue, this.childFieldValue);
        this.parentValueList = undefined;
        this.ddlchildField = undefined;
        this.hasRelation = false;
        this.childValueList = undefined;
        this.el.nativeElement.children[1].children[0].value = 0;
        this.parentFieldValue = "0";
        this.childFieldValue = "0";
        this.selId = [];
        this.showSlide = false;
    };
    FieldRelation.prototype.cancelClick = function (value) {
        this.showSlide = false;
    };
    FieldRelation.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
    };
    FieldRelation.prototype.cardClick = function (value) {
        var _this = this;
        if (this.childFieldValue != "0")
            this.administrationService.GetAdditionalDataFieldValuesMapping(this.parentFieldValue, this.childFieldValue, value).subscribe(function (fieldDetails) { return _this.childValueList = fieldDetails["data"]; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldRelation.prototype, "ddlParentName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldRelation.prototype, "fieldobject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldRelation.prototype, "category", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldRelation.prototype, "closerelation", void 0);
    FieldRelation = __decorate([
        core_1.Component({
            selector: 'field-relation',
            templateUrl: 'app/Views/Common/Additional Data Fields/fieldrelation.component.html',
            inputs: ['fieldobject', 'ddlParentName'],
            directives: [list_component_1.ListComponent, card_component_1.CardComponent, field_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent, slide_component_1.SlideComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], FieldRelation);
    return FieldRelation;
}());
exports.FieldRelation = FieldRelation;
//# sourceMappingURL=fieldrelation.component.js.map