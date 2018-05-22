import {Component, Input,Output,EventEmitter,OnInit,AfterViewChecked} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'

@Component({
    selector: 'CheckBoxComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/checkboxcomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class CustomCheckBoxComponent implements OnInit, AfterViewChecked {
    public fieldObject: IField;
    public IsSelectAllChecked: boolean;
    @Input() validationData;
    @Output() chkBoxClick = new EventEmitter();

    ngOnInit() {
        if (this.fieldObject.GenericDataTypeId == 1) {
            if ((this.fieldObject.FieldValue == null) || (this.fieldObject.FieldValue == "false") ||(this.fieldObject.FieldValue == "False")){
                this.fieldObject.FieldValue = "false";
            }
        }
        else if (this.fieldObject.GenericDataTypeId == 5) {
            if (this.fieldObject.FieldValue == null) {
                this.fieldObject.FieldValue = "0";
            }
        }
        if (this.fieldObject.FieldValue == "True" || this.fieldObject.FieldValue == "true" || this.fieldObject.FieldValue == "1") {
            this.IsSelectAllChecked = true;
        }
        else {
            this.IsSelectAllChecked = false;
        }
    }

    ngAfterViewChecked() {
        if (this.fieldObject.FieldValue == "True" || this.fieldObject.FieldValue == "true" || this.fieldObject.FieldValue == "1") {
            this.IsSelectAllChecked = true;
        }
        else {
            this.IsSelectAllChecked = false;
        }
    }

    selectAllOptions(event) {
        var srcelment = event.target || event.srcElement;
        if (this.fieldObject.GenericDataTypeId == 1) {
            if (srcelment.checked == true) {
                this.fieldObject.FieldValue = "true"
            }
            else {
                this.fieldObject.FieldValue = "false";
            }
        }
        else if (this.fieldObject.GenericDataTypeId == 5) {
            if (srcelment.checked == true) {
                this.fieldObject.FieldValue = "1"
            }
            else {
                this.fieldObject.FieldValue = "0";
            }
        }
        this.chkBoxClick.emit({
            fieldobject: this.fieldObject,
            IsChecked: srcelment.checked,
            fieldId: this.fieldObject.FieldId
        });
    }
}