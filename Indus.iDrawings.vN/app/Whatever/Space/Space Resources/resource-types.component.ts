import { Component, OnInit } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { SpaceService } from '../../../Models/Space/space.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';

@Component({
    selector: 'resource-types',
    templateUrl: './app/Views/Space/Space Resources/resource-types.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, ConfirmationComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, ConfirmationService]
})

export class ResouceTypesComponent implements OnInit {

    public fieldDetails: IField[];
    public errorMessage: string;
    private fields: IField[];
    sourceDataCopy: any[];
    sourceData: any[];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    gridcount = 8;
    enableMenu = [0, 2];
    selIds = new Array();
    public totalItems: number = 30;
    public itemsPerPage: number = 10;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.spaceService.getResourceTypes().subscribe(list => this.sourceData = list["data"],
            error => this.errorMessage = <any>error);

        this.spaceService.getResourceTypesFields().subscribe(fields => this.fields = fields["data"],
            error => this.errorMessage = <any>error);
    }

    onCardSubmit(event: any) {
        console.log("selectedids", this.selIds);
        if (event["dataKeyValue"]){
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Resource Type updated", 3);
        }
        else {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Resource Type added", 3);
        }
    }

    public onSubMenuChange(event: any) {
        if (event.value == 0) // Add
        {
            this.addClick();
        }
        else if (event.value == 2) // Delete
        {
            this.deleteClick(this.selIds);
        }
    }

    onSorting(event: any) {
        console.log("sort action");
    }

    public pageChanged(event: any) {
        this.spaceService.getResourceTypes().subscribe(list => this.sourceData = list["data"],
            error => this.errorMessage = <any>error);
    };

    public addClick() {
        let newDataSource: any;
        newDataSource = {
            "Resource Type": "",
            "Resource Category": ""
        };
        this.sourceData.push(newDataSource);
    }

    public deleteClick(id) {
        console.log("ID", id)
        if (id.length > 0) {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Resource Type?", "Yes");
        }
        else {
            this.notificationService.ShowToaster("Select a Resource Type", 2);
        }
    }

    okDelete(event: any) {
        if (event.returnOk == true) {
            for (var j = 0; j < this.selIds.length; j++) {
                var index = this.sourceData.indexOf(this.sourceData.filter(x => x["Id"] == this.selIds[j])[0]);
                if (index > -1)
                    this.sourceData.splice(index, 1);
            }
            this.spaceService.postResourceTypesyDelete(this.selIds);
            this.notificationService.ShowToaster("Selected Resource Type deleted", 3);
        }
    }

    onDelete(e: Event) {
        this.deleteClick(this.selIds);
    }
}