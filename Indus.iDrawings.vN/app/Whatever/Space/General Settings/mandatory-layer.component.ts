import {Component, OnInit} from '@angular/core';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SpaceService } from '../../../Models/Space/space.service';
@Component({
    selector: 'mandatory-layers',
    templateUrl: './app/Views/Space/General Settings/mandatory-layer.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, ConfirmationComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, ConfirmationService]

})

export class MandatoryLayerComponent implements OnInit {
    public fieldDetails: IField[];
    public errorMessage: string;
    private fields: IField[];
    sourceData: any[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
        }
    ];
    gridcount = 20;
    enableMenu = [];
    selIds = new Array();
    public totalItems: number = 30;
    public itemsPerPage: number = 10;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {

        this.spaceService.getMandaoryLayer().subscribe(list => console.log(this.sourceData = list["data"]),
            error => this.errorMessage = <any>error);

        this.spaceService.getMandaoryLayerFields().subscribe(fields => this.fields = fields["data"],
            error => this.errorMessage = <any>error, () => console.log('fields', this.fields));
    }

    onCardSubmit() {
        // console.log("selectedids", this.selIds);
        if (this.selIds) {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Mandatory layer updated", 3);
        }
        else {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Mandatory layer added", 3);
        }
    }

    public onSubMenuChange(event: any, id: any) {
        let editid = 0;
        let deleteid = this.sourceData.length - 1;
        if (event.value == 1) // Add
        {
            this.addClick();
        }
        else if (event.value == 2) // Edit
        {
            this.editClick(editid);
        }
        else if (event.value == 3) // Delete
        {
            this.deleteClick();
        }
    }

    onSorting(event: any) {
        console.log("sort action");
    }

    public pageChanged(event: any) {

        if (event.pageEvent.page == 2) {
            this.spaceService.getMandaoryLayer()
                .subscribe(
                itemsSource => this.sourceData = itemsSource["paging"],
                error => this.errorMessage = <any>error);

        }
        else {

            this.spaceService.getMandaoryLayer()
                .subscribe(
                itemsSource => this.sourceData = itemsSource["data"],
                error => this.errorMessage = <any>error);

        }
    };

    public addClick() {
        let newDataSource: any;
        newDataSource = {
            "LayerName": ""
        };
        this.sourceData.push(newDataSource);
    }

    public editClick(id) {
        let newDataSource: any;
        newDataSource = {
            "LayerName": ""
        };
        this.sourceData.splice(id, newDataSource);
    }


    ondelete(e: Event) {
        this.deleteClick();
    }

    public deleteClick() {
        //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Mandatory layer?", "Yes");
        //let deleteid = this.sourceData.length - 1;

        //var index = this.sourceData.indexOf(this.sourceData[deleteid]);
        //if (index > -1) {
        //    this.sourceData.splice(index, 1);
        //}
        for (var j = 0; j < this.selIds.length; j++) {
            var index = this.sourceData.indexOf(this.sourceData.filter(x => x["Id"] == this.selIds[j])[0]);
            if (index > -1)
                this.sourceData.splice(index, 1);
        }
        this.spaceService.postSpaceStandardDelete(this.selIds[0]);
        this.notificationService.ShowToaster("Mandatory layer deleted", 3);

    }


    //okDelete(event: any) {
    //    if (event.returnOk == true) {
    //        let deleteid = this.sourceData.length - 1;
    //        this.spaceService.postSpaceStandardDelete(this.selIds[0]);
    //        var index = this.sourceData.indexOf(this.sourceData[deleteid]);
    //        if (index > -1) {
    //            this.sourceData.splice(index, 1);
    //        }
    //        this.notificationService.ShowToaster("Mandatory layer deleted", 3);

    //    }
    //}
}