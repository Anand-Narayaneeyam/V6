import { Component, OnInit } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'attachment-categories',
    templateUrl: './app/Views/Administration/General Settings/attachment-categories.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, SlideComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions]
})

export class AttachmentCategoryComponent implements OnInit {

    public errorMessage: string;
    public totalItems: number;
    public itemsPerPage: number;
    public fieldDetails: IField[];
    private fields: IField[];
    attachmentCategorySource: any[];
    submitSuccess: any[] = [];
    success: any;
    showSlide = false;
    Position = "bottom-right";
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
    types = false;
    enableMenu = [];
    selIds = new Array();

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFunctions: GeneralFunctions) {
    }

    ngOnInit(): void {
        var contextObj = this;
        this.administrationService.getAttachmentCategoryData().subscribe(function (list) {
            contextObj.totalItems = JSON.parse(list["Data"].FieldBinderData).length;
            if (JSON.parse(list["Data"].FieldBinderData).length > 0) {
                contextObj.sourceData = JSON.parse(list["Data"].FieldBinderData);
                contextObj.itemsPerPage = list["Data"].RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Attachment Category exists", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }

            }
            else {
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Attachment Categories exist", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
            contextObj.attachmentCategorySource = JSON.parse(list["Data"].FieldBinderData);
        });
        this.administrationService.getAttachmentCategoryFields().subscribe(function (list) {
            contextObj.fields = (list["Data"]);
        });
    }

    onCardSubmit(event: any) {
        var contextObj = this;
        var id = [event["dataKeyValue"]];
        if (event["dataKeyValue"]) {
            let test = event.fieldObject;
            this.administrationService.postAttachmentCategoryUpdate(test, event["dataKeyValue"]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Attachment Category updated", 3);
                    let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else {
                    contextObj.notificationService.ShowToaster("Attachment Category already exists", 5);
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "162" });
                }
            });
        }
        else {
            let test = event.fieldObject;
            this.administrationService.postAttachmentCategoryInsert(test).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Attachment Category added", 3);
                    contextObj.sourceData.pop();
                    let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (resultData["Data"].ServerId == -1){
                    contextObj.notificationService.ShowToaster("Attachment Category already exists", 5);
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "162" });
                }
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.types = false;
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            });
        }
    }

    public onSubMenuChange(event: any) {
        if (event.value == 0) 
        {
            this.addClick();
        }
        else if (event.value == 2) 
        {
            this.deleteClick(this.selIds);
        }
    }

    onSorting(event: any) {
    }

    public pageChanged(event: any) {
        /*if (event.pageEvent.page == 2) {
            this.administrationService.getAttachmentCategoryData()
                .subscribe(
                list => this.sourceData = list["paging"],
                error => this.errorMessage = <any>error);
        }
        else {
            this.administrationService.getAttachmentCategoryData()
                .subscribe(
                result => this.sourceData = result["data"],
                error => this.errorMessage = error,
                () => console.log('list', this.sourceData));
        }*/
    };
   

    public addClick() {
        this.sourceData = this.generFunctions.addCardForGrid(this.sourceData, this.fields);
        this.types = true;
        this.enableMenu = [];
    }


    public deleteClick(id) {
        var contextObj = this;
        if (id[0] != null) {
            this.administrationService.postAttachmentCategoryinUse(this.selIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Attachment Category in use, cannot be deleted", 2);
                }
                else if (resultData["Data"] == 0) {
                    contextObj.showSlide = true;
                }
            });
        }
        else if (id.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select an Attachment Category", 2);
        }
    }

    onDelete(e: Event) {
        this.deleteClick(this.selIds);
    }

    onCancel(e) {
        if (this.totalItems > 0) {
            this.enableMenu = [0, 2];
        }
        else {
            this.enableMenu = [0];
        }
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        this.administrationService.postAttachmentCategoryDelete(this.selIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.totalItems = contextObj.totalItems - 1;
                for (var j = 0; j < contextObj.selIds.length; j++) {
                    var index = contextObj.sourceData.indexOf(contextObj.sourceData.filter(x => x["Id"] == contextObj.selIds[j])[0]);
                    if (index > -1)
                        contextObj.sourceData.splice(index, 1);
                }
            }
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.types = false;
            }
            else {
                contextObj.enableMenu = [0, 2];
                contextObj.types = true;
            }
        });
        contextObj.notificationService.ShowToaster("Selected  Attachment Category deleted", 3);
        this.showSlide = false;
    }

    cancelClick(value: any) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    }

    closeSlideDialog(value: any) {
        this.showSlide = false;
    }
}