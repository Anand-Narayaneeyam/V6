import {Component, Input, Output, ElementRef, EventEmitter, SimpleChange,AfterViewChecked} from '@angular/core'
import {IField, ILookupValues} from '../../../Models/Interface/IField'

@Component({
    selector: 'RadioComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/radiocomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class CustomRadioComponent implements AfterViewChecked {
    public fieldObject: IField;
    @Input() validationData;
    @Output() rbtnClick = new EventEmitter();
    el: any;
    currentfocus: any;
    radiochange: boolean = false;
    constructor(elemRef: ElementRef) {
        this.el = elemRef;
    }
    ngOnInit() {
        if (this.fieldObject.GenericDataTypeId == 1) {

        }
    }

    ngAfterViewChecked() {
        var contextobj: any = this;       
        if (contextobj.radiochange) {
                var focusset: any = $(contextobj.el.nativeElement).find('input[checked="checked"]');
                if (focusset && focusset.length > 0)
                    contextobj.currentfocus = focusset[0];
                if (contextobj.currentfocus) {
                    contextobj.currentfocus.focus();
                    contextobj.radiochange = false;
                }
        }
    }
    onRbtnChange(event) {
        var contextobj: any = this;
        var currentfocus: any;
        this.fieldObject.FieldValue = event.target.id; /*Selected value*/ 
        this.rbtnClick.emit({
            fieldobject: this.fieldObject
        });     
        this.radiochange = true;
    }
}

