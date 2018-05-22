import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'

@Component({
    selector: 'popupAdd',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/popupaddcomponent.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class PopupAddComponent {
    public fieldObject: IField;
    @Input() validationData;
    @Output() addClick = new EventEmitter();
    ngOnInit() {
    }

    popupAdd(event: any) {
        this.addClick.emit({
            event
        });
    }
} 
