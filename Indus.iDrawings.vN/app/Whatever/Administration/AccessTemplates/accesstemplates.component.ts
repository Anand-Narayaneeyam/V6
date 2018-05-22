import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { ModuleAccessComponent } from './moduleaccess.component';
import { DivisionAccessComponent } from './divisionaccess.component';
import { FloorAccessComponent } from './flooraccess.component';
import { DrawingAccessComponent } from './drawingaccess.component';
import { TemplateUserAccessComponent } from './useraccess.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';

@Component({
    selector: 'access-templates',
    templateUrl: './app/Views/Administration/AccessTemplates/accesstemplates.component.html',
    directives: [PageComponent, SubMenu, Sorting, ListComponent, CardComponent, Notification, FieldComponent, PagingComponent,
        SplitViewComponent, SectionComponent, ModuleAccessComponent, DivisionAccessComponent, FloorAccessComponent,
        DrawingAccessComponent, TemplateUserAccessComponent, ConfirmationComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService]
})

export class AccessTemplatesComponent {

    public errorMessage: string;
    public pagePath = " Administration / Access Templates";
    private fields: IField[];
    sourceData: any[];
    public totalItems: number = 30;
    public itemsPerPage: number = 10;
    selectedIds = new Array();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    isUserList: boolean = false;
    userRole: string;
    ngOnInit() {
        this.pagePath = "Administration/ Access Templates";
    }
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add"
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete"
        },
        {
            "id": 3,
            "title": "Access",
            "image": "Access",
            "path": "Access",
        },
        {
            "id": 4,
            "title": "Users",
            "image": "Users",
            "path": "Users",
        }
    ];
    enableMenu = [1, 2, 3, 4];

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService) {

        administrationService.getAccessTemplatesFields().subscribe(
            result => this.fields = result["data"],
            error => this.errorMessage = error);
        administrationService.getAccessTemplatesData().subscribe(
            result => this.sourceData = result["data"],
            error => this.errorMessage = error);

        administrationService.getAccessTemplatesData().subscribe(
            result => this.totalItems = result["count"].TotalItems,
            error => this.errorMessage = error);
    }

    public onSubMenuChange(event: any, id: any) {
        let editid = 0;
        if (event.value == 1) // Add
        {
            this.addClick();
        }
        else if (event.value == 2) // Delete
        {
            this.onCardDelete(this.selectedIds);
        }
        else if (event.value == 3) // Access
        {
            this.isUserList = false;
            this.splitviewInput.showSecondaryView = true;
            this.splitviewInput.secondaryArea = 70;
        }
        else if (event.value == 4) // Users
        {
            this.isUserList = true;
            this.splitviewInput.showSecondaryView = true;
            this.splitviewInput.secondaryArea = 40;
            this.userRole = ""
        }
    }

    public onPageChanged(event: any) {
        this.administrationService.getAccessTemplatesData().subscribe(
            result => this.sourceData = result["data"],
            error => this.errorMessage = error);
        console.log(event.pageEvent.page, "page");
    }

    public addClick() {
        let newDataSource: any;
        newDataSource = {
            "Template Name": "",
            "Description": "",
            "User Role": "",
            "Site": ""
        };
        this.sourceData.push(newDataSource);
    }

    public onSorting(event: any) {
    }

    onCardSubmit(event: any) {
        console.log("selectedids", this.selectedIds);
        if (event["dataKeyValue"]) {
            this.notificationService.ShowToaster("Access Template updated", 3);
        }
        else {
            this.notificationService.ShowToaster("Access Template added", 3);
        }
    }

    public onCardDelete(id) {
        console.log("Id:", id);
        if (id.length > 0) {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Access Template?", "Yes");

        }
        else {
            this.notificationService.ShowToaster("Select an Access Template", 2);
        }
    }

    okDelete(event: any) {
        if (event.returnOk == true) {
            for (var j = 0; j < this.selectedIds.length; j++) {
                var index = this.sourceData.indexOf(this.sourceData.filter(x => x["Id"] == this.selectedIds[j])[0]);
                if (index > -1)
                    this.sourceData.splice(index, 1);
            }
            this.administrationService.deleteAccessTemplate(this.selectedIds);
            this.notificationService.ShowToaster("Access Template deleted", 3);
        }
    }

    onDelete(e: Event) {
        this.onCardDelete(this.selectedIds);
    }
}