/// <reference path="../../../models/common/common.service.ts" />

import {Component, Input, Output, EventEmitter, ElementRef, ViewEncapsulation} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import {IField} from '../../Models/Interface/IField';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { StringTextBoxComponent } from '../dynamiccontrols/dynamicfields/stringtextbox.component';
import { DateComponent } from '../dynamiccontrols/dynamicfields/datecomponent.component';
import { TextAreaComponent } from '../dynamiccontrols/dynamicfields/textareacomponent.component';
import { DropDownListComponent } from '../dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import { DateTimeComponent } from '../dynamiccontrols/dynamicfields/datetimecomponent.component';
import { CommonService } from '../../../models/common/common.service';

@Component({
    selector: 'multiple-Edit',
    templateUrl: 'app/Framework/Views/MultipleEdit/multiple-edit.component.html',
    directives: [FieldComponent, StringTextBoxComponent, DateComponent, TextAreaComponent, DropDownListComponent, DateTimeComponent],
    providers: [ValidateService, CommonService, NotificationService],
    inputs: ['datasource', 'applicationFormId','objectCategoryId','moduleId'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
   // encapsulation: ViewEncapsulation.None
})

export class MultipleEdit {
    @Input() datasource: IField[];
    @Output() onUpdate = new EventEmitter();

    validationData;
    showButton = false;
    fieldObjects: IField[];
    ddlField: IField;
    applicationFormId: number = 0;
    currentSelectedItem: IField;
    objectCategoryId: number = 0;
    moduleId: number = 0;

    constructor(private validateService: ValidateService, private el: ElementRef, private commonService: CommonService) {
        this.validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }

    ngOnInit() {
        debugger;
        var contextObj = this;
        contextObj.commonService.getMultipleEditFormFields().subscribe(function (resultData) {
         
            contextObj.ddlField = resultData["Data"][0];
            var dropdownSource: ISelectedItems[] = [];
            for (let item of contextObj.datasource) {
                dropdownSource.push({ Id: item.FieldId, Value: item.FieldLabel, IsChecked: false });
            }
            contextObj.ddlField.LookupDetails.LookupValues = dropdownSource;
        });
    }

    public onSubmit(form: NgForm) {
        if (this.fieldObjects) {
            if (!this.hasValidationError()) {
                var contextObj = this;
                var submitOutput: IMultipleSubmitOutput;
                var orgArray = [290, 292, 294, 296, 298];
                debugger;
                if (orgArray.indexOf(contextObj.currentSelectedItem.ReportFieldId) == -1) {
                    var reportFieldIdValues: IReportFieldIdValues[] = contextObj.getReportFieldIdValuesForSubmit();
                    submitOutput = { ReportFieldId: contextObj.currentSelectedItem.ReportFieldId, ParentUnitId: "0", OrgUnitId: "0", NewValue: contextObj.getNewFieldVaue(), ReportFieldIdValuesArray: reportFieldIdValues };
                    this.onUpdate.emit(submitOutput);
                } else {
                    submitOutput = { ReportFieldId: contextObj.currentSelectedItem.ReportFieldId, ParentUnitId: contextObj.getParentOrgUnitId(contextObj.currentSelectedItem.ReportFieldId), OrgUnitId: contextObj.getOrgUnitId(contextObj.currentSelectedItem.ReportFieldId, false), NewValue: contextObj.getOrgUnitId(contextObj.currentSelectedItem.ReportFieldId, true), ReportFieldIdValuesArray: [] }
                    this.onUpdate.emit(submitOutput);
                }
            }
        }
    }

    public hasValidationError() {
        for (var item of this.fieldObjects) {
            if (item.HasValidationError) return true;
        }
        return false;
    }

    public getParentOrgUnitId(childReportFieldId: number) {
        if (childReportFieldId == 290) {
            return "0";
        } else {
            var parentOrgUnit = this.fieldObjects.find(function (item) { return item.ReportFieldId === (childReportFieldId - 2) });
            if (parentOrgUnit)
                return parentOrgUnit.FieldValue;
            else
                return "0";
        }
    }

    public getNewFieldVaue() {
        var contextObj = this;
        if (contextObj.fieldObjects[0].DataEntryControlId == 4) {          // For DropDown
            var selectedValueObject = contextObj.fieldObjects[0].LookupDetails.LookupValues.find(function (item) { return item.Id === parseInt(contextObj.fieldObjects[0].FieldValue) });
            if (selectedValueObject)
                return selectedValueObject.Value;
            else
                return "";
        } else if (contextObj.fieldObjects[0].DataEntryControlId == 7) {   // For MultiFieldValues (List Box)
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
        } else {
            return contextObj.fieldObjects[0].FieldValue;
        }
    }

    public getOrgUnitId(reportFieldId: number, shouldReturnName: boolean) {
        var orgUnit = this.fieldObjects.find(function (item) { return item.ReportFieldId === reportFieldId });
        if (orgUnit) {
            if (shouldReturnName) {
                if (orgUnit.FieldValue == "-1") {
                    return "";
                } else {
                    var lookup = orgUnit.LookupDetails.LookupValues.find(function (lookUp) { return lookUp.Id === parseInt(orgUnit.FieldValue) });
                    return lookup.Value;
                }
            } else {
                return orgUnit.FieldValue == "-1" ? "0" : orgUnit.FieldValue;
            }
        }
        else
            return "0";
    }

    public getReportFieldIdValuesForSubmit() {
        debugger;
        var tempArray: IReportFieldIdValues[] = [];
        for (var item of this.fieldObjects) {
            tempArray.push({ ReportFieldId: item.ReportFieldId, Value: item.FieldValue == "-1" ? "0" : item.FieldValue});
        }
        return tempArray;
    }
 
    public onChange(value) {
        var contextObj = this;
        if (value != 0) {
            debugger;
            contextObj.fieldObjects = undefined;
            contextObj.currentSelectedItem = contextObj.datasource.find(function (item) { return item.FieldId === parseInt(value) });
            contextObj.commonService.getFieldDetailsForMultipleEdit(contextObj.currentSelectedItem.FormFieldId, contextObj.applicationFormId, contextObj.objectCategoryId, contextObj.getReportFieldIdValuesForField(contextObj.currentSelectedItem), contextObj.getLookUpReportFieldValuesForField(contextObj.currentSelectedItem)).subscribe(function (resultData) {
                contextObj.fieldObjects = resultData["Data"];
                contextObj.updateFieldObjectsCorrespondingToModules();
                for (var item of contextObj.fieldObjects) {
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
                        case 1629://CAI Space Driver
                            if (contextObj.moduleId == 12) {
                                item.IsVisible = true;
                            }
                            break;
                    }
                }
            });
        } else {
            contextObj.fieldObjects = undefined;
            contextObj.currentSelectedItem = undefined;
        }
        
    }

    public showComponent(isVisible) {
        if (isVisible) {
            return "block";
        } else {
            return "none";
        }
    }

    public getReportFieldIdValuesForField(selectedItem: any) {
        var orgArray = [290, 292, 294, 296, 298];
        var tempArray: IReportFieldIdValues[] = [];
        if (orgArray.indexOf(selectedItem["ReportFieldId"]) == -1) {
            tempArray.push({ ReportFieldId: 12099, Value: selectedItem["FormFieldId"] });
        } else {
            var orgUnitDetailsArray = this.datasource.filter(function (item) { return (item["ReportFieldId"] <= selectedItem["ReportFieldId"] && item["ReportFieldId"] >= 290) });
            for (var orgUnit of orgUnitDetailsArray) {
                tempArray.push({ ReportFieldId: 12099, Value: orgUnit["FormFieldId"] });
            }
        }
        return JSON.stringify(tempArray);
    }

    public getLookUpReportFieldValuesForField(selectedItem: any) {
        var orgArray = [290, 292, 294, 296, 298,12446];
        var tempArray: ILookUpReportFieldIdValues[] = [];
        if (orgArray.indexOf(selectedItem["ReportFieldId"]) == -1) {
            return null;
        } else {
            var firstLevel = this.datasource.find(function (item) { return (item.ReportFieldId === 290 || item.ReportFieldId === 12446)});
            tempArray.push({ FieldId: firstLevel["FieldId"], ReportFieldId: 289, Value: 1 });
            return JSON.stringify(tempArray);
        }
    }

    public onDropdownChange(event) {
        if (event.ChildFieldObject) {
            var fieldObject: IField = event.ChildFieldObject;
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
    }

    public loadOrganizationalDropDownValues(selectedId: string, parentId: number, reportFiedlId: number, levelId: number) {
        var contextObj = this;
        debugger;
        contextObj.commonService.loadOrganizationalUnit(selectedId, parentId, contextObj.applicationFormId, levelId).subscribe(function (resultData) {
            var orgFieldObj = contextObj.fieldObjects.find(function (item) { return item.ReportFieldId === reportFiedlId });
            if (orgFieldObj) {
                orgFieldObj.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
            }
        });
    }

    public resetOrganizationalDropDowns(reportFieldId: number) {
        var orgFieldArray = this.fieldObjects.filter(function (item) { return (item.ReportFieldId > reportFieldId && item.ReportFieldId <= 298) });
        for (var orgField of orgFieldArray) {
            orgField.FieldValue = "-1";
            orgField.LookupDetails.LookupValues = null;
        }
    }

    public updateFieldObjectsCorrespondingToModules() {
        switch (this.applicationFormId) {
            case 104: /*Space*/
                var spaceCategoryField = this.fieldObjects.find(function (item) { return item.FieldId === 735 });
                if (spaceCategoryField && spaceCategoryField.LookupDetails.LookupValues) {
                    var idArray = [6, 7];
                    spaceCategoryField.LookupDetails.LookupValues = spaceCategoryField.LookupDetails.LookupValues.filter(function (item) { return idArray.indexOf(item.Id) == -1 });
                }
                break;
            case 54://user multiple
                var userstatus
                if (this.fieldObjects[0].ReportFieldId == 452)
                    userstatus = this.fieldObjects[0]
                if (userstatus) {
                    userstatus.IsVisible = true;
                    userstatus.FieldValue = "1"
                }

                break;
            default:
                break;
        }


        
    }
}

export interface IMultipleSubmitOutput {
    ReportFieldIdValuesArray: IReportFieldIdValues[];
    ReportFieldId: number;
    NewValue: any;
    ParentUnitId: string;
    OrgUnitId: string;
}

interface ISelectedItems {
    Id: any;
    Value: any;
    IsChecked: boolean
}

interface IReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

interface ILookUpReportFieldIdValues {
    FieldId: number;
    ReportFieldId: number;
    Value: any;
}
   
