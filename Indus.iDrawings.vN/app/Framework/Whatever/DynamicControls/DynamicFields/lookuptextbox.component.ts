import {Component, Input, Output, EventEmitter, ElementRef,OnInit} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive';

@Component({
    selector: 'LookupStringTextBox',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/lookuptextbox.component.html',
    inputs: ['fieldObject'], 
    styleUrls: ['app/Framework/Views/Search/searchFields.css'], 
    directives: [Validation]
})

export class LookupStringTextBoxComponent {
    public stringValue = "";
    public fieldObject: IField;
    public validate: boolean = true;
    @Input() fieldValue: string;
    public filteredList = [];
    public filterArray =[];
    public setAlignment: string;
    public fieldHeight: number;
    public fieldWidth: string;
    public txtAlign: string;
    public labelWidth: string;
  
    @Input() alignContent: string;
    @Input() SetAlignment: string;
    @Input() labelwidth: number;
    @Input() validationData;
    @Input() inttabIndex: number;
    @Output() lookupSelectEmit = new EventEmitter();

    ngOnInit() {   
        if (this.fieldObject.LookupDetails != null) {             
            this.filterArray = JSON.parse(JSON.stringify(this.fieldObject.LookupDetails.LookupValues));
        }
        else {
            this.filterArray = null;
        }
        
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
        } else {
            this.setAlignment = "block";
        }

        if (this.labelwidth == undefined) {
            this.labelWidth = "auto";
        }
        else {
            this.labelWidth = this.labelwidth + "px";
        }

        if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
            this.fieldHeight = this.fieldObject.Height;
        }
        else {
            this.fieldHeight = 30;
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width;
        }
        else {
            this.fieldWidth = "250";
        }
        if (this.alignContent != "") {
            this.txtAlign = this.alignContent;
        }
        else {
            this.txtAlign = "left"
        }     
    }
    
    filter(value) {
        var context = this;
        this.stringValue = value.target.value;
        if (this.stringValue !== "" && this.stringValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el.Value != null)

                   return el.Value.toLowerCase().indexOf(this.stringValue.toLowerCase()) !== -1;
                   // return (el.Value.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }
    select(item) {    
        this.fieldObject.FieldValue = item.Value;
        this.lookupSelectEmit.emit({ selectedItem: item });
        this.filteredList = [];      
    }

    onBlurMethod() {
        this.filteredList = [];
    }


} 
