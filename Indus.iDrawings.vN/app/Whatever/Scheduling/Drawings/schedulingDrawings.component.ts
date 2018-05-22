import {Component, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';

@Component({
    selector: 'scheduling-drawinglist',
    templateUrl: './app/Views/Scheduling/Drawings/schedulingDrawings.component.html',
    directives: [ DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS]

})

export class SchedulingDrawingListComponent {
    @Input() selectedRowDetails: any;
    @Input() pageTarget: any;
    selectedTab: number = 0;
    pagePath = "Scheduling / Drawings ";
    objectCategoryId: number;
    //pageTarget: number;
    moduleId: number;    
    selectedRow: any[];
    constructor() {
       
    }
    ngOnInit() {
        debugger;
        //this.pageTarget = 1;     
        this.moduleId = 14; 
        this.objectCategoryId = 17;       
        if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
            this.pageTarget = 1;
        }
        else {
            this.pageTarget = 2;
            this.selectedRow = this.selectedRowDetails;           
        }

    }

}