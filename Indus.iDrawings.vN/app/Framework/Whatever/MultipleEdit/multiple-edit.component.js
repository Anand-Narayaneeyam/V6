/// <reference path="../../../models/common/common.service.ts" />
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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var stringtextbox_component_1 = require('../dynamiccontrols/dynamicfields/stringtextbox.component');
var datecomponent_component_1 = require('../dynamiccontrols/dynamicfields/datecomponent.component');
var textareacomponent_component_1 = require('../dynamiccontrols/dynamicfields/textareacomponent.component');
var dropdownlistcomponent_component_1 = require('../dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var datetimecomponent_component_1 = require('../dynamiccontrols/dynamicfields/datetimecomponent.component');
var common_service_1 = require('../../../models/common/common.service');
var MultipleEdit = (function () {
    function MultipleEdit(validateService, el, commonService) {
        var _this = this;
        this.validateService = validateService;
        this.el = el;
        this.commonService = commonService;
        this.onUpdate = new core_1.EventEmitter();
        this.showButton = false;
        this.applicationFormId = 0;
        this.objectCategoryId = 0;
        this.moduleId = 0;
        this.validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    MultipleEdit.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        contextObj.commonService.getMultipleEditFormFields().subscribe(function (resultData) {
            contextObj.ddlField = resultData["Data"][0];
            var dropdownSource = [];
            for (var _i = 0, _a = contextObj.datasource; _i < _a.length; _i++) {
                var item = _a[_i];
                dropdownSource.push({ Id: item.FieldId, Value: item.FieldLabel, IsChecked: false });
            }
            contextObj.ddlField.LookupDetails.LookupValues = dropdownSource;
        });
    };
    MultipleEdit.prototype.onSubmit = function (form) {
        if (this.fieldObjects) {
            if (!this.hasValidationError()) {
                var contextObj = this;
                var submitOutput;
                var orgArray = [290, 292, 294, 296, 298];
                debugger;
                if (orgArray.indexOf(contextObj.currentSelectedItem.ReportFieldId) == -1) {
                    var reportFieldIdValues = contextObj.getReportFieldIdValuesForSubmit();
                    submitOutput = { ReportFieldId: contextObj.currentSelectedItem.ReportFieldId, ParentUnitId: "0", OrgUnitId: "0", NewValue: contextObj.getNewFieldVaue(), ReportFieldIdValuesArray: reportFieldIdValues };
                    this.onUpdate.emit(submitOutput);
                }
                else {
                    submitOutput = { ReportFieldId: contextObj.currentSelectedItem.ReportFieldId, ParentUnitId: contextObj.getParentOrgUnitId(contextObj.currentSelectedItem.ReportFieldId), OrgUnitId: contextObj.getOrgUnitId(contextObj.currentSelectedItem.ReportFieldId, false), NewValue: contextObj.getOrgUnitId(contextObj.currentSelectedItem.ReportFieldId, true), ReportFieldIdValuesArray: [] };
                    this.onUpdate.emit(submitOutput);
                }
            }
        }
    };
    MultipleEdit.prototype.hasValidationError = function () {
        for (var _i = 0, _a = this.fieldObjects; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.HasValidationError)
                return true;
        }
        return false;
    };
    MultipleEdit.prototype.getParentOrgUnitId = function (childReportFieldId) {
        if (childReportFieldId == 290) {
            return "0";
        }
        else {
            var parentOrgUnit = this.fieldObjects.find(function (item) { return item.ReportFieldId === (childReportFieldId - 2); });
            if (parentOrgUnit)
                return parentOrgUnit.FieldValue;
            else
                return "0";
        }
    };
    MultipleEdit.prototype.getNewFieldVaue = function () {
        var contextObj = this;
        if (contextObj.fieldObjects[0].DataEntryControlId == 4) {
            var selectedValueObject = contextObj.fieldObjects[0].LookupDetails.LookupValues.find(function (item) { return item.Id === parseInt(contextObj.fieldObjects[0].FieldValue); });
            if (selectedValueObject)
                return selectedValueObject.Value;
            else
                return "";
        }
        else if (contextObj.fieldObjects[0].DataEntryControlId == 7) {
            var tempArray = [];
            var newSelectedValue = "";
            tempArray = contextObj.fieldObjects[0].MultiFieldValues;
            for (var i = 0; i < contextObj.fieldObjects[0].MultiFieldValues.length; i++) {
                newSelectedValue += tempArray[i] + ',';
            }
            newSelectedValue = newSelectedValue.slice(0, -1);
            if (newSelectedValue)
                return newSelectedValue;
            else
                return "";
        }
        else {
            return contextObj.fieldObjects[0].FieldValue;
        }
    };
    MultipleEdit.prototype.getOrgUnitId = function (reportFieldId, shouldReturnName) {
        var orgUnit = this.fieldObjects.find(function (item) { return item.ReportFieldId === reportFieldId; });
        if (orgUnit) {
            if (shouldReturnName) {
                if (orgUnit.FieldValue == "-1") {
                    return "";
                }
                else {
                    var lookup = orgUnit.LookupDetails.LookupValues.find(function (lookUp) { return lookUp.Id === parseInt(orgUnit.FieldValue); });
                    return lookup.Value;
                }
            }
            else {
                return orgUnit.FieldValue == "-1" ? "0" : orgUnit.FieldValue;
            }
        }
        else
            return "0";
    };
    MultipleEdit.prototype.getReportFieldIdValuesForSubmit = function () {
        debugger;
        var tempArray = [];
        for (var _i = 0, _a = this.fieldObjects; _i < _a.length; _i++) {
            var item = _a[_i];
            tempArray.push({ ReportFieldId: item.ReportFieldId, Value: item.FieldValue == "-1" ? "0" : item.FieldValue });
        }
        return tempArray;
    };
    MultipleEdit.prototype.onChange = function (value) {
        var contextObj = this;
        if (value != 0) {
            debugger;
            contextObj.fieldObjects = undefined;
            contextObj.currentSelectedItem = contextObj.datasource.find(function (item) { return item.FieldId === parseInt(value); });
            contextObj.commonService.getFieldDetailsForMultipleEdit(contextObj.currentSelectedItem.FormFieldId, contextObj.applicationFormId, contextObj.objectCategoryId, contextObj.getReportFieldIdValuesForField(contextObj.currentSelectedItem), contextObj.getLookUpReportFieldValuesForField(contextObj.currentSelectedItem)).subscribe(function (resultData) {
                contextObj.fieldObjects = resultData["Data"];
                contextObj.updateFieldObjectsCorrespondingToModules();
                for (var _i = 0, _a = contextObj.fieldObjects; _i < _a.length; _i++) {
                    var item = _a[_i];
                    switch (item.ReportFieldId) {
                        case 290:
                        case 292:
                        case 294:
                        case 296:
                        case 298:
                            if (contextObj.currentSelectedItem.ReportFieldId != item.ReportFieldId) {
                                item.IsMandatory = true;
                            }
                            break;
                        case 1629:
                            if (contextObj.moduleId == 12) {
                                item.IsVisible = true;
                            }
                            break;
                    }
                }
            });
        }
        else {
            contextObj.fieldObjects = undefined;
            contextObj.currentSelectedItem = undefined;
        }
    };
    MultipleEdit.prototype.showComponent = function (isVisible) {
        if (isVisible) {
            return "block";
        }
        else {
            return "none";
        }
    };
    MultipleEdit.prototype.getReportFieldIdValuesForField = function (selectedItem) {
        var orgArray = [290, 292, 294, 296, 298];
        var tempArray = [];
        if (orgArray.indexOf(selectedItem["ReportFieldId"]) == -1) {
            tempArray.push({ ReportFieldId: 12099, Value: selectedItem["FormFieldId"] });
        }
        else {
            var orgUnitDetailsArray = this.datasource.filter(function (item) { return (item["ReportFieldId"] <= selectedItem["ReportFieldId"] && item["ReportFieldId"] >= 290); });
            for (var _i = 0, orgUnitDetailsArray_1 = orgUnitDetailsArray; _i < orgUnitDetailsArray_1.length; _i++) {
                var orgUnit = orgUnitDetailsArray_1[_i];
                tempArray.push({ ReportFieldId: 12099, Value: orgUnit["FormFieldId"] });
            }
        }
        return JSON.stringify(tempArray);
    };
    MultipleEdit.prototype.getLookUpReportFieldValuesForField = function (selectedItem) {
        var orgArray = [290, 292, 294, 296, 298, 12446];
        var tempArray = [];
        if (orgArray.indexOf(selectedItem["ReportFieldId"]) == -1) {
            return null;
        }
        else {
            var firstLevel = this.datasource.find(function (item) { return (item.ReportFieldId === 290 || item.ReportFieldId === 12446); });
            tempArray.push({ FieldId: firstLevel["FieldId"], ReportFieldId: 289, Value: 1 });
            return JSON.stringify(tempArray);
        }
    };
    MultipleEdit.prototype.onDropdownChange = function (event) {
        if (event.ChildFieldObject) {
            var fieldObject = event.ChildFieldObject;
            switch (fieldObject.ReportFieldId) {
                case 290:
                    this.resetOrganizationalDropDowns(290);
                    this.loadOrganizationalDropDownValues(fieldObject.FieldValue, fieldObject.FieldId, 292, 2);
                    break;
                case 292:
                    this.resetOrganizationalDropDowns(292);
                    this.loadOrganizationalDropDownValues(fieldObject.FieldValue, fieldObject.FieldId, 294, 3);
                    break;
                case 294:
                    this.resetOrganizationalDropDowns(294);
                    this.loadOrganizationalDropDownValues(fieldObject.FieldValue, fieldObject.FieldId, 296, 4);
                    break;
                case 296:
                    this.resetOrganizationalDropDowns(296);
                    this.loadOrganizationalDropDownValues(fieldObject.FieldValue, fieldObject.FieldId, 298, 5);
                    break;
                default:
                    break;
            }
        }
    };
    MultipleEdit.prototype.loadOrganizationalDropDownValues = function (selectedId, parentId, reportFiedlId, levelId) {
        var contextObj = this;
        debugger;
        contextObj.commonService.loadOrganizationalUnit(selectedId, parentId, contextObj.applicationFormId, levelId).subscribe(function (resultData) {
            var orgFieldObj = contextObj.fieldObjects.find(function (item) { return item.ReportFieldId === reportFiedlId; });
            if (orgFieldObj) {
                orgFieldObj.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
            }
        });
    };
    MultipleEdit.prototype.resetOrganizationalDropDowns = function (reportFieldId) {
        var orgFieldArray = this.fieldObjects.filter(function (item) { return (item.ReportFieldId > reportFieldId && item.ReportFieldId <= 298); });
        for (var _i = 0, orgFieldArray_1 = orgFieldArray; _i < orgFieldArray_1.length; _i++) {
            var orgField = orgFieldArray_1[_i];
            orgField.FieldValue = "-1";
            orgField.LookupDetails.LookupValues = null;
        }
    };
    MultipleEdit.prototype.updateFieldObjectsCorrespondingToModules = function () {
        switch (this.applicationFormId) {
            case 104:
                var spaceCategoryField = this.fieldObjects.find(function (item) { return item.FieldId === 735; });
                if (spaceCategoryField && spaceCategoryField.LookupDetails.LookupValues) {
                    var idArray = [6, 7];
                    spaceCategoryField.LookupDetails.LookupValues = spaceCategoryField.LookupDetails.LookupValues.filter(function (item) { return idArray.indexOf(item.Id) == -1; });
                }
                break;
            case 54:
                var userstatus;
                if (this.fieldObjects[0].ReportFieldId == 452)
                    userstatus = this.fieldObjects[0];
                if (userstatus) {
                    userstatus.IsVisible = true;
                    userstatus.FieldValue = "1";
                }
                break;
            default:
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MultipleEdit.prototype, "datasource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleEdit.prototype, "onUpdate", void 0);
    MultipleEdit = __decorate([
        core_1.Component({
            selector: 'multiple-Edit',
            templateUrl: 'app/Framework/Views/MultipleEdit/multiple-edit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, stringtextbox_component_1.StringTextBoxComponent, datecomponent_component_1.DateComponent, textareacomponent_component_1.TextAreaComponent, dropdownlistcomponent_component_1.DropDownListComponent, datetimecomponent_component_1.DateTimeComponent],
            providers: [validation_service_1.ValidateService, common_service_1.CommonService, notify_service_1.NotificationService],
            inputs: ['datasource', 'applicationFormId', 'objectCategoryId', 'moduleId'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, core_1.ElementRef, common_service_1.CommonService])
    ], MultipleEdit);
    return MultipleEdit;
}());
exports.MultipleEdit = MultipleEdit;
//# sourceMappingURL=multiple-edit.component.js.map