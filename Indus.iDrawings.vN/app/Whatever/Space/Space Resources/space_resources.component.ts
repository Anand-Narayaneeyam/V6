import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SpaceService } from '../../../Models/Space/space.service'
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component'
import { IGrid } from '../../../Framework/Models/Interface/Igrid';

@Component({
    selector: 'space_resources',
    templateUrl: './app/Views/Space/Space Resources/space_resources.component.html',
    directives: [SubMenu, SectionComponent, GridComponent, PagingComponent, FieldComponent, Notification, DropDownListComponent, ConfirmationComponent],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, ConfirmationService]
})

export class Space_ResourcesComponent{
    ddlResourceType: IField;
    alignContent: string;
    errorMessage: string;
    fieldObject: IField[];
    itemsSource: any[];
    totalItems: number = 0;
    itemsPerPage: number = 10;
    inputItems: IGrid = { dataKey: "ResourceId", groupBy: [], grpWithCheckBx: false, selectedIds: [] };
    menuData = [
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    gridcount = 10;
    enableMenu = [2];

    ngOnInit(): void {
        this.alignContent = "horizontal";
    }

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private confirmationService: ConfirmationService) {
       
        spaceService.getDdlResourceType().subscribe(result => this.ddlResourceType = result["data"], error => this.errorMessage = error);

        spaceService.getSpaceResourcesFieldList().subscribe(result => this.fieldObject = result["data"], error => this.errorMessage = error);

        spaceService.getSpaceResourcesList().subscribe(result => this.itemsSource = result["data"], error => this.errorMessage = error);

        spaceService.getSpaceResourcesList().subscribe(result => this.totalItems = result["count"][0].TotalItems, error => this.errorMessage = error);
    }

    public pageChanged(event: any) {
        this.spaceService.getSpaceResourcesList().subscribe(result => this.itemsSource = result["data"],
            error => this.errorMessage = error);
    }

    public onSort(objGrid: any) {
        console.log("onSort", this.inputItems)
        this.spaceService.getSpaceResourcesList().subscribe(result => this.itemsSource = result["data"],
            error => this.errorMessage = error);
    }

    public onAdd(event: any) {
        this.spaceService.addSpaceResources(event);
        this.notificationService.ShowToaster("Space Resource added", 3);
    }

    public onEdit(event: any) {
        console.log("edit:", event);
        if (this.inputItems.selectedIds.length > 0) {
            this.spaceService.updateSpaceResources(this.inputItems.selectedIds);
            this.notificationService.ShowToaster("Space Resource updated", 3);
        }
    }

    public onDelete(event: any) {
        this.deleteOnClick();
    }

    public deleteOnClick() {
        if (this.inputItems.selectedIds.length > 0) // Delete
        {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Resource?", "Yes");
            for (var i = 0; i < this.itemsSource.length; i++) {
                for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                    if (this.itemsSource[i]["ResourceId"] == this.inputItems.selectedIds[j]) {
                        var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                        if (index > -1) {
                            this.itemsSource.splice(index, 1)
                            var sortedData = new Array();/*To notify the watcher about the change*/
                            sortedData = sortedData.concat(this.itemsSource);
                            this.itemsSource = sortedData;
                        }
                    }
                }
            }
            this.spaceService.deleteSpaceResources(this.inputItems.selectedIds);
            this.notificationService.ShowToaster("Selected Employee Resource deleted", 3);
        }
        else {
            this.notificationService.ShowToaster("Select a Resource", 2);
        }
    }
    //okDelete(event: any) {
    //    if (event.returnOk == true) {
    //        for (var i = 0; i < this.itemsSource.length; i++) {
    //            for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
    //                if (this.itemsSource[i]["ResourceId"] == this.inputItems.selectedIds[j]) {
    //                    var index = (this.itemsSource.indexOf(this.itemsSource[i]));
    //                    if (index > -1) {
    //                        this.itemsSource.splice(index, 1)
    //                        var sortedData = new Array();/*To notify the watcher about the change*/
    //                        sortedData = sortedData.concat(this.itemsSource);
    //                        this.itemsSource = sortedData;
    //                    }
    //                }
    //            }
    //        }
    //        this.spaceService.deleteSpaceResources(this.inputItems.selectedIds);
    //        this.notificationService.ShowToaster("Selected Employee Resource deleted", 3);
    //    }
    //}

    ddlResourceTypeChange(event: any) {
        console.log(event);
    }
}