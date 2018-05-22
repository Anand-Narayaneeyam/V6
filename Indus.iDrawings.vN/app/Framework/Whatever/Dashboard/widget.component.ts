import {Component, OnChanges, SimpleChange, Output, EventEmitter, ElementRef, Input} from '@angular/core'

@Component({
    selector: 'widget',
    templateUrl: 'app/Framework/Views/Dashboard/widget.component.html',
    directives: [],
    inputs: [],
    styleUrls: ['app/Framework/Views/Dashboard/widget.component.css']
})
export class WidgetComponent {
    constructor(private el: ElementRef) {    
    }
}