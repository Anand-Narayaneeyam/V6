
import { Component, Output, EventEmitter, Inject, forwardRef, Input, ChangeDetectionStrategy, KeyValueDiffers, DoCheck, OnInit, IterableDiffers} from '@angular/core';
import {IField} from  '../../Models/Interface/IField';
import { NgForm, FORM_DIRECTIVES} from '@angular/forms';
import {StringTextBoxComponent} from  '../../Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { DropDownListComponent } from '../../Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { TextAreaComponent } from '../../Whatever/DynamicControls/DynamicFields/textareacomponent.component';
import { DateComponent } from '../../Whatever/DynamicControls/DynamicFields/datecomponent.component'
import { DateTimeComponent } from '../../Whatever/DynamicControls/DynamicFields/datetimecomponent.component'
import { FileUploadComponent } from '../../Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component'
import { ImageUploadComponent } from '../../Whatever/DynamicControls/DynamicFields/imageuploadcomponent.component';
import { CardComponent } from '../../Whatever/Card/card.component';
import { CustomCheckBoxComponent } from '../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { CustomRadioComponent } from '../../Whatever/DynamicControls/DynamicFields/radiocomponent.component';

import { NgModel} from '@angular/forms';
@Component({
    selector: 'field',
    templateUrl: 'app/Framework/Views/Card/field.component.html',
    inputs: ['fieldObject', 'fieldValue'],

    //changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [StringTextBoxComponent, DropDownListComponent, TextAreaComponent, DateComponent, DateTimeComponent, FileUploadComponent, ImageUploadComponent, CustomCheckBoxComponent, CustomRadioComponent]
})

export class FieldComponent implements DoCheck {
    @Input() fieldObject: IField;
    @Input() fieldValue: string;
    @Input() isEditEnabled: boolean = true;

    private card: CardComponent;
    oldfieldValue: string;
    readOnly: boolean;
    private differ: any;
    private diffCancel: any;
    private diffSubmit: any;
    private diffSource: any;
    private differ1: any;
    private differAdd: any;


    constructor( @Inject(forwardRef(() => CardComponent)) card: CardComponent, differ: KeyValueDiffers, differs1: IterableDiffers) {
        this.differ = differ;
        this.readOnly = true;
        this.card = card;
        this.differ1 = differs1;
    }

    ngOnInit() {
        this.diffCancel = this.differ.find(this.card.isCancel).create(null);
        this.diffSubmit = this.differ.find(this.card.isSubmit).create(null);
        this.differAdd = this.differ.find(this.card.isAdded).create(null);
        this.diffSource = this.differ1.find(this.card.List.source).create(null);

    }

    ngDoCheck() {
        let canclChange = this.diffCancel.diff(this.card.isCancel);

        if (canclChange) {
         
            if (this.oldfieldValue != undefined || this.oldfieldValue === null) {
                this.fieldValue = this.oldfieldValue;
            }
            if (this.fieldObject.DataEntryControlId == 4) { //dropdown
                this.updateDdlValue(2);
            }

            this.readOnly = true;

        } else {
            let subChange = this.diffSubmit.diff(this.card.isSubmit);
            if (subChange) {
                if (this.card.submitSuccess) {
                    if (this.card.submitSuccess[0]["isSuccess"] == false) {                      
                        this.setFocusOnField(this.card.submitSuccess[0]["FieldId"]);
                        this.fieldObject.HasValidationError = true;
                        if (this.fieldObject.DataEntryControlId == 4) { //dropdown
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
        let isAdded = this.differAdd.diff(this.card.isAdded);
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

        let changes = this.diffSource.diff(this.card.List.source);
        if (changes) {
            if (changes._removalsHead) {
                changes.forEachRemovedItem(r => this.card.removeSelectedKeys(r.item[this.card.List.datakey]));
            }

        }
    }

    onFieldDoubleClick(event: Event) {
        event.stopPropagation();
        if (this.card.enableEditBtn == true) {
            if (this.isEditEnabled == true) {
                if (!this.card.List.isAddedCard) {
                    //this.card.localenableDeleBtn = false;
                    if ((this.fieldObject.IsEnabled == false) && (this.card.datakeyValue != undefined)) {
                        this.readOnly = true;
                    } else {

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
    }

    setFocusOnField(focusFieldId) {
        setTimeout(function () {
            var element = <HTMLElement>document.getElementById(focusFieldId.toString());
            if (element)
                element.focus();
        }, 50);

    }
    updateField(fldObj: IField): IField {
        if (this.card.type == "list") {
            this.fieldObject.IsHiddenLabel = true;
        }
        if ((this.fieldObject.GenericDataTypeId == 6 || this.fieldObject.GenericDataTypeId == 4 || this.fieldObject.GenericDataTypeId == 5) && this.fieldValue != undefined && this.fieldValue != null &&
            (this.fieldObject.DataEntryControlId == 1 || this.fieldObject.DataEntryControlId == 3)) {//to avoid leading and trailing space problem for numeric and integer
            if (this.fieldObject.GenericDataTypeId == 4)
                if (isNaN(Number(this.fieldValue)) == false)
                    this.fieldObject.FieldValue = Number(this.fieldValue).toFixed(2).toString().trim();
                else
                    this.fieldObject.FieldValue = this.fieldValue;
            else
                this.fieldObject.FieldValue = this.fieldValue.toString().trim();
        } else {
            //if (this.fieldObject.GenericDataTypeId == 2 || this.fieldObject.GenericDataTypeId==3) 
            //    this.formatDateandDateTime(this.fieldObject.GenericDataTypeId)                        
            //else
                this.fieldObject.FieldValue = this.fieldValue;
        }


        this.fieldObject.ReadOnlyMode = this.readOnly;
        this.fieldObject.NotificationType = "inline";
        return this.fieldObject;
    }
    
    onChangeInput(e) {
        if (!this.fieldObject.HasValidationError)//so that error value is not reset in card
            this.oldfieldValue = this.fieldValue;
        if (this.fieldObject.DataEntryControlId == 6) {
            this.fieldValue = e.target.checked;
        } else {
            this.fieldValue = e.target.value;
        }
    }

    changeEmit(e, dataEntryCtrlId) {
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
    }

    updateDdlValue(target: number) {
   
        let value = this.fieldValue;
        let test;
        if (target == 1) {
            if (value == "" || value == undefined) {
                this.fieldValue = "0";
            }
            else {
                test = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Value === value });
                if (test) {
                    this.fieldValue = test.Id.toString();
                }
            }
        } else {
            if (value == "0" || value == undefined) {
                this.fieldValue = "";
            }
            else {
                test = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Id.toString() === value });
                if (test) {
                    this.fieldValue = test.Value.toString();
                }

            }
        }
    }

    public getFileData(event: any): void {
      
        this.card.fileObject = event;
        this.card.onFileUpload.emit({ "fileObject": event })
    };
    chkBoxOut(event) {
        this.card.chkboxOutEvent.emit(event);
    }
    public getImageData(event: any): void {
       
        this.card.fileObject = event;
    };


}
