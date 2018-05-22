import {Component, Input, Output, ElementRef, OnInit, EventEmitter, AfterViewChecked} from '@angular/core'
import {IField, ILookupValues} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive'
import { NgModel } from '@angular/forms';

@Component({
    selector: 'ListBoxComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/listboxcomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]

})

export class ListBoxComponent implements OnInit, AfterViewChecked {

    public fieldObject: IField;
    public header1: string = "";
    public header2: string = "";
    public showDiv: string = "none";
    public strValidation: string = "";
    public fieldWidth: string;
    public blnDisableSelectAll: boolean = false;
    public blnHasValidationError: boolean = false;
    public IsSelectAllChecked: boolean;
    public setAlignment;
    IsChecked: boolean = true;
    @Input() blnSelectAllChecked: boolean;
    @Input() SetAlignment: string;
    @Input() validationData;
    @Input() strLstBoxValidateMessage: string;
    @Input() heading1;
    @Input() heading2;
    @Output() lstBox = new EventEmitter();
    @Output() selAll = new EventEmitter();
    public labeltitle: string = "";

    constructor(private _el: ElementRef) {
    }

    ngOnInit() {
        var contextObj = this;

        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
        } else {
            this.setAlignment = "block";
        }

        if (contextObj.heading1 != "") {
            contextObj.header1 = contextObj.heading1;
            contextObj.showDiv = "flex";
        }
        if (contextObj.heading1 != "") {
            contextObj.header2 = this.heading2;
        }
        if (contextObj.blnSelectAllChecked == true) {
            contextObj.IsSelectAllChecked = true;
        }
        else {
            contextObj.IsSelectAllChecked = false;
        }
        if (contextObj.fieldObject.MultiFieldValues != undefined && contextObj.fieldObject.LookupDetails.LookupValues != null) {
            if (contextObj.fieldObject.LookupDetails.LookupValues.length == contextObj.fieldObject.MultiFieldValues.length) {
                contextObj.IsSelectAllChecked = true;
            }
            else {
                contextObj.IsSelectAllChecked = false;
            }
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues) {
            contextObj.IsSelectAllChecked = false;
        }
        if (contextObj.fieldObject.IsEnabled == false) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (contextObj.fieldObject.Width != undefined) {
            contextObj.fieldWidth = contextObj.fieldObject.Width;
        }
        else {
            contextObj.fieldWidth = "250";
        }
        if (contextObj.fieldObject.FieldLabel)
            contextObj.labeltitle = contextObj.fieldObject.FieldLabel + ' ListBox';
        contextObj.validationMessage();
    }

    ngAfterViewChecked() {
        var contextObj = this;
        if (contextObj.fieldObject.MultiFieldValues != undefined && contextObj.fieldObject.LookupDetails.LookupValues != null) {
            if (contextObj.fieldObject.LookupDetails.LookupValues.length == contextObj.fieldObject.MultiFieldValues.length) {
                contextObj.IsSelectAllChecked = true;
            }
            else {
                contextObj.IsSelectAllChecked = false;
            }
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (this.fieldObject.MultiFieldValues != null) {
            for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                var element = <HTMLInputElement>document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                if (element != undefined) {
                    element.checked = false;
                }
            }
            for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                for (var j = 0; j < this.fieldObject.MultiFieldValues.length; j++) {
                    if (this.fieldObject.LookupDetails.LookupValues[i].Id.toString() == this.fieldObject.MultiFieldValues[j].toString()) {
                        var element = <HTMLInputElement>document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                        if (element != undefined) {
                            element.checked = true;
                        }
                    }
                }
            }

        }
        this.validationMessage();
    }

    update(value: string) {
    }

    checkedOption(fieldObj): boolean {
        if (!fieldObj["IsChecked"] || this.IsChecked == true) {
            fieldObj["IsChecked"] = false;
            if (this.fieldObject.MultiFieldValues != null) {
                for (let i = 0; i < this.fieldObject.MultiFieldValues.length; i++) {
                    if (this.fieldObject.MultiFieldValues[i] == fieldObj["Id"]) {
                        fieldObj["IsChecked"] = true;
                        break;
                    }
                }
            }
        }
        this.validationMessage();
        return fieldObj["IsChecked"];
    }

    updateCheckedOptions(option, event) {
        var mulFieldArrlen;
        var contextObj = this;
        var lookupArrLength = this.fieldObject.LookupDetails.LookupValues.length;
        if (contextObj.fieldObject.MultiFieldValues == null) {
            contextObj.fieldObject.MultiFieldValues = [];
            this.validationMessage();
            if (contextObj.fieldObject != undefined) {
                if (contextObj.fieldObject.FieldId != null) {
                    var element = <HTMLInputElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
                    if (element != undefined) {
                        element.checked = false;
                    }
                }
            }
        }
        var index = this.fieldObject.MultiFieldValues.indexOf(option["Id"].toString());
        if (event.target.checked == true) {
            if (index == -1) {
                contextObj.fieldObject.MultiFieldValues.push(option["Id"].toString());
            }
            mulFieldArrlen = this.fieldObject.MultiFieldValues.length;
            
            if (lookupArrLength == mulFieldArrlen) {
                contextObj.IsSelectAllChecked = true;
                if (contextObj.fieldObject != undefined) {
                    if (contextObj.fieldObject.FieldId != null) {
                        var element = <HTMLInputElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
                        if (element != undefined) {
                            element.checked = true;
                        }
                    }
                }
            }
            else {
                contextObj.IsSelectAllChecked = false;
                if (contextObj.fieldObject != undefined) {
                    if (contextObj.fieldObject.FieldId != null) {
                        var element = <HTMLInputElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
                        if (element != undefined) {
                            element.checked = false;
                        }
                    }
                }
            }
        }
        else if (event.target.checked == false) {
            if (index > -1) {
                this.fieldObject.MultiFieldValues.splice(index, 1);
            }
            this.IsSelectAllChecked = false;
            if (contextObj.fieldObject != undefined) {
                if (contextObj.fieldObject.FieldId != null) {
                    var element = <HTMLInputElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
                    if (element != undefined) {
                        element.checked = false;
                    }
                }
            }
        }
        this.lstBox.emit({
            chkevent: event,
            fieldObject: this.fieldObject
        })
    }

    validationMessage() {
        var contextObj = this;
        if (contextObj.fieldObject.IsMandatory == true) {
            if (contextObj.fieldObject.MultiFieldValues == [] || contextObj.fieldObject.MultiFieldValues == null || contextObj.fieldObject.MultiFieldValues.length == 0) {
                contextObj.fieldObject.HasValidationError = true;
                contextObj.blnHasValidationError = true;
                if (contextObj.strLstBoxValidateMessage != undefined) {
                    contextObj.strValidation = contextObj.strLstBoxValidateMessage;
                }
                else {
                    contextObj.strValidation = "Select  at least one " + contextObj.fieldObject.FieldLabel;
                }
            }
            else {
                contextObj.fieldObject.HasValidationError = false;
                contextObj.blnHasValidationError = false;
            }
        } else {
            contextObj.fieldObject.HasValidationError = false;
            contextObj.blnHasValidationError = false;
        }
    }

    selectAllOptions(event) {
        var contextObj = this;
        if (event.target.checked == true) {
            contextObj.IsChecked = true;
            contextObj.fieldObject.MultiFieldValues = [];
            if (contextObj.fieldObject.LookupDetails.LookupValues != null) {
                for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                    contextObj.fieldObject.MultiFieldValues.push(contextObj.fieldObject.LookupDetails.LookupValues[i].Id.toString());
                    var element = <HTMLInputElement>document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                    if (element != undefined) {
                        element.checked = true;
                    }
                }
            }
        }
        else if (event.target.checked == false) {
            if (contextObj.fieldObject.MultiFieldValues != null) {
                for (var i = 0; i < this.fieldObject.MultiFieldValues.length; i++) {
                    contextObj.fieldObject.MultiFieldValues.pop();
                    contextObj.IsChecked = false;
                }
                if (contextObj.fieldObject.LookupDetails.LookupValues != null) {
                    for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                        var element = <HTMLInputElement>document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                        if (element != undefined) {
                            element.checked = false;
                        }
                    }
                }
            }
            contextObj.fieldObject.MultiFieldValues = [];
            contextObj.IsChecked = false;
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        this.selAll.emit({
            chkevent: event.target.checked,
            fieldObject: this.fieldObject
        })
    }
    setlabeltitle() {
        var label: string = '';
        label = this.labeltitle;
        if (this.fieldObject.IsMandatory)
            label = label + ' Mandatory Field '
        if (this.blnHasValidationError == true)
            label = label + this.strValidation;
        return label;
    }
}