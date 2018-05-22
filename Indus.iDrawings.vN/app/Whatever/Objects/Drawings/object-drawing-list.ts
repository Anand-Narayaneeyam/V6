import {Component, Output, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';

@Component({
    selector: 'objectDrawinglist',
    templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
    directives: [PageComponent, DrawingDetailsComponent ],
    providers: [HTTP_PROVIDERS],
    inputs: ["objectCategoryId", "moduleId"]
})

export class ObjectDrawingList implements OnInit {
    @Input() selectedRowDetails: any;
    @Input() pageTarget: any;
    selectedTab: number = 0;
    objectCategoryId: number;
    moduleId: number;
    selectedRow: any[];
    pagePath: string;

    constructor() {
    }

    ngOnInit() {
        if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
            this.pageTarget = 1;
        } else {
            this.pageTarget = 2;
        }
        this.selectedRow = this.selectedRowDetails;
        switch (this.objectCategoryId) {
            case 1: // Assets
                this.moduleId = 7;
                break;
            case 2: // Furniture
                this.moduleId = 8;
                break;
            case 3: // Telecom
                this.moduleId = 6;
                break;
            case 8: // Electrical
                this.moduleId = 17;
                break;
            case 9: // Fire and Safety
                this.moduleId = 18;
                break;
            case 10: // Mechanical
                this.moduleId = 25;
                break;
            case 11: // Plumbing
                this.moduleId = 26;
                break;
            case 12: // Medical Gas
                this.moduleId = 27;
                break;
            case 20: // Security Assets
                this.moduleId = 24;
                break;

        }
    }
}