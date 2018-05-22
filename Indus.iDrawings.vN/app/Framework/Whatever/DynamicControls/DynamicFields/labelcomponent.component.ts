import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'

@Component({
    selector: 'LabelComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/labelcomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class LabelComponent {
    public fieldObject: IField;
    ngOnInit() {
    }
} 
