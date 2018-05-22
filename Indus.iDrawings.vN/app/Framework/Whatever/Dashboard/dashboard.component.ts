import {Component, OnChanges, SimpleChange, Output, EventEmitter, ElementRef, Input} from '@angular/core'
import {WidgetComponent} from './widget.component'



@Component({
    selector: 'dashboard',
    templateUrl: 'app/Framework/Views/Dashboard/dashboard.component.html',
    directives: [WidgetComponent],
    inputs: []
})
export class DashboardComponent {

    widgets: WidgetComponent[];

    constructor(private el: ElementRef) {
        this.widgets = [];        
    }
}