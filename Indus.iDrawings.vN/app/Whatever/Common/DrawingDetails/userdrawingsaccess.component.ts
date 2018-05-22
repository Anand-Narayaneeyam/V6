/// <reference path="../../../models/common/drawingdetails.service.ts" />
import {Component } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service'
import { DrawingDetailsService } from '../../../Models/Common/drawingdetails.service'


@Component({
    selector: 'user-drawings-access',
    templateUrl: './app/Views/Common/DrawingDetails/userdrawingsaccess.component.html',
    directives: [Notification, ListBoxComponent, GridComponent, PagingComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, DrawingDetailsService],
    inputs: ["selectedIds","moduleId"]
})

export class UserDrawingsAccessComponent {
    moduleId: number = 0;
    accessDrawingModulesList: IField[];  
    fieldObject: IField[];    
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: ["Site", "Building"], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true  };
    totalItems: number = 0;
    itemsPerPage: number = 10;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private DrawingDetailsService: DrawingDetailsService) {
        administrationService.getUserDrawingAccessModules().subscribe(
            fieldDetails => this.accessDrawingModulesList = fieldDetails["data"],
            error => this.errorMessage = error);

        DrawingDetailsService.getDrawingFloorAccessFieldsList().subscribe(
            result => this.fieldObject = result["data"],
            error => this.errorMessage = error);

        DrawingDetailsService.getDrawingFloorAccessList().subscribe(
            fieldDetails => this.itemsSource = fieldDetails["data"],
            error => this.errorMessage = error);

        DrawingDetailsService.getDrawingFloorAccessList().subscribe(
            result => this.totalItems = result["count"].TotalItems,
            error => this.errorMessage = error);
    }

    public onPageChanged(event: any) {
        this.DrawingDetailsService.getDrawingFloorAccessList().subscribe(
            result => this.itemsSource = result["data"],
            error => this.errorMessage = error);
        console.log(event.pageEvent.page, "page");
    }

    updateDrawingsAccessData() {
        this.DrawingDetailsService.updateDrawingAccess(this.itemsSource);
        console.log("this.itemsSource",this.itemsSource);

        this.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
    }
}