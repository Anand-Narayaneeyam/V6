import {Component, Output, Input, OnInit} from '@angular/core';
import {ObjectDashBoard} from '../../dashboard/objectdashboard.component';
@Component({
    selector: 'assetdashboard',
    template: '<objectdashboard [objectCategoryId]="2" [moduleId]="8"></objectdashboard>',
    directives: [ObjectDashBoard]
})

export class FurnitureDashBoard implements OnInit {
    objectCategoryId: number;
    moduleId: number;
    pagePath = "Furniture / Dashboard";
    constructor() {
    }

    ngOnInit() {
    }
}