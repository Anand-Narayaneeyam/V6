import {Component, Input, Output, EventEmitter,OnInit} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'

@Component({
    selector: 'ButtonComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/buttoncomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class ButtonComponent implements OnInit {
    public fieldObject: IField;
    @Output() btnChange = new EventEmitter();
    ngOnInit() {
       
    }
    btnCompClick(event) {
        this.btnChange.emit({
            fieldData: this.fieldObject
        });
        event.stopPropagation();
        return false;
    }
} 
