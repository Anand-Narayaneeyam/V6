import {Component, ElementRef, Renderer, Output, Input, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import { IField} from  '../../../Framework/Models/Interface/IField';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../Framework/ExternalLibraries/dnd/ng2-dnd';



@Component({
    selector: 'Field-Order',
    templateUrl: 'app/Views/Common/Additional Data Fields/fieldorder.html',
    inputs: ['fieldData'],
    directives: [DND_DIRECTIVES],
})

export class FieldOrderComponent {
    @Input() fieldData;
    @Input() colmntoOdr;
    @Input() dataKey;
    @Output() fieldorder = new EventEmitter();
    Fieldordersource: any;
    fieldId: number[] = [];
    fieldObjectArray: any;

    ngOnInit(): void {
       
        this.Fieldordersource=this.fieldData;
    }
    SaveClick() {
        this.fieldObjectArray = this.Fieldordersource;
        for (var i = 0; i < this.fieldObjectArray.length; i++) {
            this.fieldId[i] = this.fieldObjectArray[i][this.dataKey]
        }
        console.log(this.Fieldordersource, this.fieldId)
        this.fieldorder.emit(this.Fieldordersource)
    }
    CancelClick() {
        this.fieldorder.emit("cancel")
    }
}
