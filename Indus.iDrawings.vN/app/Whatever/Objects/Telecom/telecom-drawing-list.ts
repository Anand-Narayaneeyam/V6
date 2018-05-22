﻿import {Component, Output, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';

@Component({
    selector: 'telecomDrawinglist',
    templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
    directives: [PageComponent, DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS]
})

export class TelecomDrawingList implements OnInit {
    pageTarget: any;
    selectedTab: number = 0;
    objectCategoryId: number;
    moduleId: number;
    selectedRow: any[];
    pagePath: string;

    constructor() {
    }

    ngOnInit() {
        this.pageTarget = 1;
        this.objectCategoryId = 3;
        this.moduleId = 6;
    }
}