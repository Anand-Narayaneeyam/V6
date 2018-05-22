import { Component, ElementRef} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'
import {StringTextBoxComponent} from  '../DynamicFields/stringtextbox.component';
@Component({
    selector: 'field',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/field.component.html',
    inputs: ['fieldObject', 'fieldValue'],
    directives: [StringTextBoxComponent]
})
export class FieldComponent {
    fieldObject: IField;
    readOnly: boolean;
    fieldValue: string;
    constructor(private myElement: ElementRef) {
        this.readOnly = true;
    }

    onFieldDoubleClick(event) {
        this.readOnly = false;
    }
    updateField(fldObj: IField): IField {
        fldObj.FieldValue = this.fieldValue;
        fldObj.ReadOnlyMode = this.readOnly;
        fldObj.NotificationType = "1";
        return fldObj;
    }

}
