﻿
import {Component, Output, EventEmitter, DoCheck, KeyValueDiffers } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {SpaceService} from '../../../Models/Space/space.service'
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from "../../common/drawingdetails/drawingdetails.component";

@Component({
    selector: 'lockdrawinglist',
    templateUrl: './app/Views/Space/Tools/lockdrawing.component.html',
    directives: [searchBox, PageComponent, DrawingDetailsComponent],
    providers: [SpaceService, HTTP_PROVIDERS]

})

export class LockDrawingComponent {
    selectedTab: number = 0;
    pagePath = "Space / Lock Drawing ";
    itemsSource: any[];
    differ: any;
    pageTarget: number;
    moduleId: number;
    @Output() getSelectedFloorDrawing = new EventEmitter();
    public keyWordLookup: any[];
    viewDrawing: boolean = false;
    drawingId: number;
    getSelectedTab(event: any) {
        this.selectedTab = event[0];
    }
    constructor(private _spaceService: SpaceService, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
    }
    ngOnInit() {
        this.pageTarget = 3;
        this.moduleId = 3;

    }

}