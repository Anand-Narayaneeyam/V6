/// <reference path="../../dashboard/objectdashboard.component.ts" />
import {Component, Output, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component';
import {DrawingDetailsComponent} from '../../../common/drawingdetails/drawingdetails.component';
import {ObjectDashBoard} from '../../dashboard/objectdashboard.component';
@Component({
    selector: 'assetdashboard',
    template: '<objectdashboard [objectCategoryId]="1" [moduleId]="7"></objectdashboard>',
    directives: [PageComponent, DrawingDetailsComponent, ObjectDashBoard]
})

export class AssetDashBoard implements OnInit {
    //@Input() selectedRowDetails: any;
    //@Input() pageTarget: any;
    //selectedTab: number = 0;
    objectCategoryId: number;
    moduleId: number;
    //selectedRow: any[];
    //pagePath: string;
    pagePath = "Assets / Dashboard";
    constructor() {
    }

    ngOnInit() {
       // if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
           // this.objectCategoryId = 1;
           // this.moduleId = 7;
        //    this.pageTarget = 1;
        //} else {
        //    this.pageTarget = 2;
        //    this.selectedRow = this.selectedRowDetails;
        //    switch (this.objectCategoryId) {
        //        case 1: // Assets
         //           this.moduleId = 7;
        //            break;
        //        case 2: // Furniture
        //            this.moduleId = 8;
        //            break;
        //    }
        //}
    }
}