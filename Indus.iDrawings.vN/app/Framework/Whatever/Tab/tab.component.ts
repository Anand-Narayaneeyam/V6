import {Component, Input} from '@angular/core';
import {TabsComponent} from './tabs.component';


@Component({
    selector: 'tab',
    templateUrl:'app/Framework/Views/Tab/tab.component.html',    
    directives: [TabsComponent],
    inputs: ['title:tabTitle', 'active', 'closeButtonVisible'],
    styleUrls: ['app/Framework/Views/Tab/tab.style.css']

})
export class TabComponent {

    title: string;
    active = this.active || false;
    vertical = false;

    constructor(tabs: TabsComponent) {
        tabs.addTab(this);
    }



}