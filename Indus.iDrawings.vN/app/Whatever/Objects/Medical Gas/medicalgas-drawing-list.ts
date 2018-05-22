import {Component, Output, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';

@Component({
    selector: 'medicalgasDrawinglist',
    templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
    directives: [PageComponent, DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS]
})

export class MedicalGasDrawingList implements OnInit {
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
            this.objectCategoryId = 12;
            this.moduleId = 27;
        }
    }
}