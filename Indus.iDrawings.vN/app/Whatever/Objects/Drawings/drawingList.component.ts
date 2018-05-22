import {Component, Output, Input ,OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';

@Component({
    selector: 'objectDrawinglist',
    templateUrl: './app/Views/Objects/Drawings/drawingList.component.html',
    directives: [ DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS],
    inputs: ['ObjectCategoryId']
   
})

export class DrawingListComponent implements OnInit {
    @Input() pageTarget: any;
    selectedTab: number = 0;
    ObjectCategoryId: number;
    itemsSource: any[];
    differ: any;
    //pageTarget: number;
    moduleId: number;
   
    ngOnInit() {
       // debugger;      
        console.log("ngOnInit");
        switch (this.ObjectCategoryId) {//asset=1
            case 1:
                this.moduleId = 7;
               // this.pageTarget = 1;
                if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
                    this.pageTarget = 1;
                }
                else {
                    this.pageTarget =2;
                }
                break;
        }
    }

}