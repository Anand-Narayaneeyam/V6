import {Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, Directive, ElementRef, Renderer,AfterViewInit,SimpleChange} from '@angular/core';
import {IField} from '../../Models/Interface/IField';
import {Validation} from '../Validation/validate.directive';
import {Delimeter} from '../../../Models/Common/General';

@Component({
    selector: 'KeywordTextBoxSearch',
    template: `
    <div style="float:left;width:100%;">
               <div *ngIf="validate === true"  control-group class="floating-label" style="float:left;width:100%;"> 
                <input tabindex="0" onpaste="return false;"  (blur)=onBlurMethod()  type="text" validatetext style="width: 85%;" [fieldObject]='fieldObject[0]' class="validate filter-input" [(ngModel)]=query (keyup)=filter($event) (ngModelChange)="fieldObject.FieldValue = $event"  (keyup)="eventHandler($event)" >    
                <span style="" [ngClass]="smartSearch == true ? 'smartSearchValidation':'SearchValidation'" ></span>             
                <input role="button" tabindex="0" aria-label="Keyword Search" onpaste="return false;" type="image" src="Content/Icons/keyword-search.png" (click)="onKeysearch()" class="searchbtn" style="border:hidden!important;"/>    
                <div class="suggestions" *ngIf="filteredList.length > 0">
                        <ul>
                            <li (mousedown)="onMousedown(item)" *ngFor="let item of filteredList" style="line-height:25px;border:1px solid #eeeded" (click)="selectSearch(item)" tabindex="0" [attr.aria-label]="''+item" (keypress)="selectSearchonkeypress($event,item)">
                                <a>{{item}}</a>
                            </li>
                        </ul>
                    </div>                  
               </div>              
    </div> `,
    inputs: ['fieldObject','smartSearch'],
    styleUrls: ['app/Framework/Views/Search/searchFields.css', 'app/Framework/Views/Search/Filter.css'],
    directives: [Validation],
    providers: [Delimeter]

})

export class KeywordTextboxComponent implements OnChanges {
    public stringValue = "";
    public fieldObject: any;
    public limeter: Delimeter;
    public validate: boolean = true;
    currentfocus: any;
    @Input() fieldValue: string;
    @Input() keyWordLookupValue;
    @Input() Keyword;
    @Input() Key;
    @Output() KeyClick = new EventEmitter();
    public filteredList = [];
    public filterArray = [];
    public query = '';

    public constructor(limeter: Delimeter) {
        this.limeter = limeter;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.fieldObject[0].LookupDetails != null) {
            var JsonObj = this.fieldObject[0].LookupDetails.LookupValues
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }          
    }

    ngOnInit() {
        if (this.fieldObject[0].LookupDetails != null) {
            var JsonObj = this.fieldObject[0].LookupDetails.LookupValues
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }
        if (this.Key == "" || this.Key == null) {
            this.Key = 2;
        }    
        this.currentfocus = document.activeElement;
    }

    selectSearch(item) {
        this.query = item;
        this.filteredList = [];
        this.fieldObject[0].FieldValue = this.query;
        if (this.currentfocus)
            this.currentfocus.focus();
    }

    onMousedown(item)
    {
        this.query = item;
        this.filteredList = [];
        this.fieldObject[0].FieldValue = this.query;
    }

    filter(value) {
        this.stringValue = value.target.value;
        if (this.stringValue !== "" && this.stringValue.length >= this.Key && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null)
                    return (el.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
        this.fieldObject[0].FieldValue = value.target.value;
    }

    onKeysearch() {
        this.fieldObject[0].FieldValue = this.fieldObject[0].FieldValue.replace(/\\'/g,"'")
        this.fieldObject[0].FieldValue = this.fieldObject[0].FieldValue.replace(/'/g, "\\'")
        this.filteredList = [];
        this.KeyClick.emit({

        });
    }

    eventHandler(event)
    {
        if (event.keyCode == 13)
        {
            this.filteredList = [];
            /*this.KeyClick.emit({
            });*/
            event.stopPropagation();
        }

    }

    selectSearchonkeypress(Keyevent, item) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            this.selectSearch(item);
        }
    }

    onBlurMethod()
    {
        this.filteredList = [];
    }  
} 
