import {Component, Input, AfterViewInit} from '@angular/core';
import {IField} from '../../Models/Interface/IField';
import {Validation} from '../Validation/validate.directive';
import {Delimeter} from '../../../Models/Common/General';
import { ValidateService } from '../../Models/Validation/validation.service';
@Component({
    selector: 'NumericTextBoxSearch',
    template: `
               <div style="float:left;width:100%;">
                <div  control-group class="floating-label" style="float:left;">
                    <label>
                       {{fieldObject.FieldLabel}}
                     </label>
               </div>
               <div control-group class="floating-label" style="float:left;width:100%;"> 
                    <label *ngIf="fieldObject.IsReadOnly === true" class="readOnly"  readOnly>{{fieldObject.FieldValue}}</label>
                    <select class="form-control" #t (change)="drpDwnChange(t.value)" style="width:90px!important;float:left;height:24px;padding:2px 4px;background-color: #f1f1f1;border: 1px solid #ababab;"  [ngModel]="dropDownValue">
                        <option *ngFor="let type of dropdownForText" [value]="type.Id">{{type.Value}}</option>
                    </select>
                    <input autocomplete="off" onpaste="return false;" name="IntegerTextBox" id="{{fieldObject.FieldId}}" validatetext [validationData]="validationData"  [fieldObject]='fieldObject'  [(readonly)]=readOnly type="text"  (change)="onChange($event)" floating-label [(ngModel)]="integerValue" style="width:132px!important;float:right"  class="numtype"(keyup)=filter($event) >
                    <div class="suggestions" *ngIf="filteredList.length > 0" style="height:140px!important;margin-left:75px!important;" >
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
    providers: [Delimeter, ValidateService]
})

 export class NumericTextBoxComponent {
    public fieldObject: IField;
    public integerValue = "";
    public limeter: Delimeter;
    public readOnly = false;
    @Input() fieldId: number;
    @Input() fieldName: string;
    @Input() fieldValue: string;
    @Input() validationData;
    public dropDownValue = "";
    currentfocus: any;
    public filteredList = [];
    public filterArray = [];
    dropdownForText: any = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }]
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
        else{
            this.filterArray = null;
        }
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue.indexOf(this.limeter.ColumnDelimeter) <= -1) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.integerValue = arr1[0];
                if (arr1[1] == ">")
                    this.dropDownValue = "ü";
                else if (arr1[1] == "=")
                    this.dropDownValue = "Ç";
                else if (arr1[1] == "<")
                    this.dropDownValue = "é";
            }
            else {
                this.dropDownValue = "";
                this.integerValue = this.fieldObject.FieldValue = "";
                this.readOnly = true;
                this.fieldObject.ReadOnlyMode = true;
            }
            this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.integerValue;
        }
        else {
            this.dropDownValue = "";
            this.integerValue = "";
            this.readOnly = true;
            this.fieldObject.FieldValue = "";
        }
        if (this.dropDownValue == "") {
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
        }
        else {
            this.fieldObject.IsMandatory = true;
            this.fieldObject.IsLocallyValidated = false;
        }
        this.currentfocus = document.activeElement;
    }

    public constructor(limeter: Delimeter, private _validateService: ValidateService) {
        this.limeter = limeter;
    }

    onChange(value) {
        var localObj = this;
        this.fieldObject.IsLocallyValidated = true;
        if (value.target.value == "") {
            localObj.fieldObject.FieldValue = "";
        }
        else {
            setTimeout(function () {
                localObj.integerValue = value.target.value;;
                localObj.fieldObject.FieldValue = localObj.dropDownValue + localObj.limeter.ColumnDelimeter + value.target.value;
            }, 500);
        }    
    }

    drpDwnChange(value) {
        this.dropDownValue = value;
        if (value == "") {
            this.readOnly = true;
            this.dropDownValue = "";
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
            this.integerValue = "";
        }
        else {
            this.integerValue = "";
            this.readOnly = false;
            this.fieldObject.IsMandatory = true;
            this.fieldObject.IsLocallyValidated = false;
        }
        this.fieldObject.FieldValue = "";
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
        }, 100);
        //this.fieldObject.FieldValue =  value + this.limeter.ColumnDelimeter + this.integerValue;
    }

    filter(value) {
        this.integerValue = value.target.value;;
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + value.target.value;
        if (this.integerValue !== "" && this.integerValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null) {
                    this.currentfocus = value.srcElement;
                    return (el.toLowerCase().substr(0, this.integerValue.length) === this.integerValue.toLowerCase()) == true;
                }
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }
    select(item) {
        this.integerValue = item;
        this.filteredList = [];
        this.fieldObject.FieldValue =this.dropDownValue + this.limeter.ColumnDelimeter + this.integerValue;
    }
    selectonkeypress(Keyevent, item) {
        var contextobj: any = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            setTimeout(function () {
                if (contextobj.currentfocus) {
                    contextobj.currentfocus.focus();
                    contextobj.currentfocus = null;
                }
            }, 150);            
            this.select(item);
        }
    }
    onBlurMethod() {
        this.filteredList = [];
    }

}