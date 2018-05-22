import {Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';
import {IField, ILookupValues} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive'
import { NgModel } from '@angular/forms';


@Component({
    selector: 'DynamicListComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/dynamiclist.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]
})

export class DynamicListComponent implements OnInit {

    public fieldObject: IField;
    public selectedId: number = -1;
    strClassName: string = "";
    strValidation: string = "";
    @Input() validationData;
    @Input() strLstBoxValidateMessage: string;
    @Input() imgsrc1:string = "Content/list_adD.png";
    @Input() imgsrc2:string = "Content/list_removE.png";
    @Output() dynamicListAdd = new EventEmitter<IDynamiclist>()
    @Output() dynamicListRemove = new EventEmitter<IDynamiclist>()
    blnHasValidationError: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.validationMessage();
    }

    ngAfterViewChecked() {
        this.validationMessage();
    }

    addListItem(event, list) {
        this.dynamicListAdd.emit({
            FieldObject: this.fieldObject,
            List: list,
            SelectedId: this.selectedId
        });
    }

    keyForDeleteOrAdd(event, dlist, id) {
       
        if (event.keyCode == 32 && id == 1) {           
            event.preventDefault(); 
            this.addListItem(event, dlist);
        }
        else if (event.keyCode == 32 && id == 2) {        
            event.preventDefault();  
           this.removeListItem(event, dlist);
        }
        else if (event.keyCode == 46 && id == 3) {   
            event.preventDefault();       
            this.removeListItem(event, dlist);
        }
        else if (event.keyCode == 32 && id == 4) {  
            event.preventDefault();         
            this.addListItem(event, dlist);
        }
    }

    dlistClick(event) {        
        var id = event.target.id;
       // var id = event.srcElement.id;
        if (id != "dlist") {
            if (id != undefined) {
                if (id != -1) {
                    this.selectedId = id;
                    var elem = document.getElementById(id);
                    if (elem) {
                        elem.style.backgroundColor = "#178AE8";
                        elem.style.color = "white";
                    }
                }
                if (this.fieldObject != undefined) {
                    if (this.fieldObject.LookupDetails.LookupValues != undefined) {
                        for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                            var elem = document.getElementById(this.fieldObject.LookupDetails.LookupValues[i].Id.toString() + "li" + this.fieldObject.ReportFieldId.toString());
                            if (elem) {
                                if (elem.id == this.selectedId.toString()) {
                                    elem.style.backgroundColor = "#178AE8";
                                    elem.style.color = "white";
                                }
                                else {
                                    elem.style.backgroundColor = "white";
                                    elem.style.color = "black";
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    removeListItem(event, list) {       
            if (this.fieldObject.LookupDetails.LookupValues != undefined) {
                if (this.selectedId != -1) {
                    var selectedLiId = this.selectedId.toString().replace("li" + this.fieldObject.ReportFieldId.toString(), "").trim();
                    for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                        if (this.fieldObject.LookupDetails.LookupValues[i].Id == Number(selectedLiId)) {
                            this.fieldObject.LookupDetails.LookupValues[i].Id = null;
                            this.fieldObject.LookupDetails.LookupValues[i].Value = null;
                            this.fieldObject.LookupDetails.LookupValues.splice(i,1);
                        }
                    }
                    this.fieldObject = JSON.parse(JSON.stringify(this.fieldObject));
                }
            }
            this.dynamicListRemove.emit({
                FieldObject: this.fieldObject,
                List: list,
                SelectedId: this.selectedId
            }); 
            this.selectedId = -1;             
    }  

    validationMessage() {
        var contextObj = this;
        if (contextObj.fieldObject.IsMandatory == true) {
            if (!contextObj.fieldObject.LookupDetails || !contextObj.fieldObject.LookupDetails.LookupValues || contextObj.fieldObject.LookupDetails.LookupValues.length == 0) {
                contextObj.fieldObject.HasValidationError = true;
                contextObj.blnHasValidationError = true;
                if (contextObj.strLstBoxValidateMessage != undefined) {
                    contextObj.strValidation = contextObj.strLstBoxValidateMessage;
                } else {
                    contextObj.strValidation = "Select " + contextObj.fieldObject.FieldLabel;
                }
            } else {
                contextObj.fieldObject.HasValidationError = false;
                contextObj.blnHasValidationError = false;
            }
        } else {
            contextObj.fieldObject.HasValidationError = false;
            contextObj.blnHasValidationError = false;
        }
    }

}

export interface IDynamiclist {
    FieldObject: IField,
    List: any,
    SelectedId: number
}