import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'floor-access',
    templateUrl: './app/Views/Administration/AccessTemplates/flooraccess.component.html',
    directives: [Notification, GridComponent, PagingComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class FloorAccessComponent {

    fieldObject: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: ["Site", "Building"], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true};
    totalItems: number = 0;
    itemsPerPage: number = 10;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        administrationService.getFloorAccessFields().subscribe(
            result => this.fieldObject = result["data"],
            error => this.errorMessage = error);

        administrationService.getFloorAccessData().subscribe(
            fieldDetails => this.itemsSource = fieldDetails["data"],
            error => this.errorMessage = error);

        administrationService.getFloorAccessData().subscribe(
            result => this.totalItems = result["count"].TotalItems,
            error => this.errorMessage = error);
    }

    public onPageChanged(event: any) {
        this.administrationService.getFloorAccessData().subscribe(
            result => this.itemsSource = result["data"],
            error => this.errorMessage = error);
        console.log(event.pageEvent.page, "page");
    }

    updateFloorAccess() {
        this.administrationService.updateFloorAccess(this.itemsSource);
        this.notificationService.ShowToaster("Floor Management updated", 3);
    }
}