import {Component, Input} from '@angular/core';
import {IField} from '../../Models/Interface/IField';
import {Validation} from '../Validation/validate.directive';
import {Delimeter} from '../../../Models/Common/General';

@Component({
    selector: 'StringTextBoxSearch',
    template: `
    <div style="float:left;width:100%;">
               <div  control-group class="floating-label" style="float:left;">
                    <label>
                        {{fieldObject.FieldLabel}}
                     </label>
               </div>
               <div *ngIf="validate === true"  control-group class="floating-label" style="float:left;width:100%;"> 
                    <label *ngIf="fieldObject.IsReadOnly === true" class="readOnly"  readOnly>{{fieldObject.FieldValue}}</label>
                    <input  autocomplete="off" (paste)="onPaste($event)" validatetext [fieldObject]='fieldObject' [validationData]="validationData" name="StringTextBox" id="{{fieldObject.FieldId}}"    type="text" (change)="onChange($event)" floating-label [(ngModel)]="stringValue" (keyup)=filter($event)>     
                     <div class="suggestions" *ngIf="filteredList.length > 0" style="line-height:25px;border:1px solid #eeeded">
                        <ul>
                            <li *ngFor="let item of filteredList" (click)="select(item)" tabindex="0" [attr.aria-label]="''+item" (keypress)="selectonkeypress($event,item)">
                                <a>{{item}}</a>
                            </li>
                        </ul>
                    </div>            
               </div>
    </div> `,
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/Search/searchFields.css'],
    directives: [Validation],
    providers: [Delimeter]

})

export class StringTextBoxSearchComponent {
    public stringValue = "";
    public fieldObject: IField;
    public limeter: Delimeter;
    public validate: boolean = true;
    @Input() fieldValue: string;
    @Input() validationData;
    public filteredList = []; 
    stringCondition = "Ñ";
    percntge = "¥";
    singleQ = "ô";
    public filterArray = [];
    currentfocus: any;
    onChange(value) {
        var localObj = this;
        setTimeout(function () {
            localObj.stringValue = value.target.value;;
            localObj.fieldObject.FieldValue = localObj.stringCondition + localObj.limeter.ColumnDelimeter + localObj.singleQ + localObj.percntge + localObj.stringValue + localObj.percntge + localObj.singleQ;            
        },10);
    }     

    public constructor(limeter: Delimeter) {
        this.limeter = limeter;
    }

    ngOnInit() {
        this.fieldObject.IsMandatory = false;
        if (this.fieldObject.LookupDetails != null) {
            var JsonObj = this.fieldObject.LookupDetails.LookupValues
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else
        {
            this.filterArray = null;
        }
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
        }

        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != undefined) {

            this.stringValue = this.fieldObject.FieldValue;
        }
        else {

        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != undefined) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.stringValue = arr1[0];
            }
            else {
                this.stringValue = this.fieldObject.FieldValue;
            }
        }
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;
        this.currentfocus = document.activeElement;
    }

    filter(value) {
        this.stringValue = value.target.value;
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;
        if (this.stringValue !== "" && this.stringValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null) {
                    this.currentfocus = value.srcElement;
                    return (el.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
                }
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }
    select(item) {

        this.stringValue = item;
        this.fieldObject.FieldValue = item;
        this.filteredList = [];
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;

    }

    selectonkeypress(Keyevent, item) {
        var contextobj: any = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            setTimeout(function () {
                if (contextobj.currentfocus) {
                    contextobj.currentfocus.focus();
                    contextobj.currentfocus = null;
                }
            }, 150);            
            contextobj.select(item);
        }
    }
    //closekeypress() {
    //    var RootClass: any = document.getElementsByClassName("suggestions");
    //    if (RootClass && RootClass.length > 0) {
    //        var length = RootClass.length;

    //    }
    //}


    onBlurMethod() {
        this.filteredList = [];
    }

    onPaste(event) {
        var localObj = this;
        var copiedText = localObj.stringCondition + localObj.limeter.ColumnDelimeter + localObj.singleQ + localObj.percntge + event.clipboardData.getData('Text') + localObj.percntge + localObj.singleQ;
        var $targetElem = $(event.target);
        if ($targetElem.length > 0) {
            if (this.fieldObject.MaxLength) {
                if (copiedText.length <= this.fieldObject.MaxLength) {
                    var updatedValue = copiedText;
                    this.fieldObject.FieldValue = updatedValue;
                    $targetElem.val(event.clipboardData.getData('Text'));
                    $targetElem.focus();
                }
            } else {
                var updatedValue = copiedText;
                this.fieldObject.FieldValue = updatedValue;
                $targetElem.val(event.clipboardData.getData('Text'));
                $targetElem.focus();
            }
        }
        return false;
    }
} 
