import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DocumentService} from '../../../Models/Documents/documents.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DirectAccesstoaDocumentbyManyUsersUserListComponent } from './directAccesstoa-documentbyManyUsers-userList';

@Component({
    selector: 'directAccesstoa-documentby-manyUsers',
    templateUrl: './app/Views/Documents/Access Control/directAccesstoa-documentbyManyUsers.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, DirectAccesstoaDocumentbyManyUsersUserListComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, DocumentService, AdministrationService],
})

export class DirectAccesstoaDocumentbyManyUsersComp implements OnInit {
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    documentGroupName: string = "";
    enableMenu = [];
    documetNumber: string = "";
    documentName: string = "";
    menuData = [
        {
            "id": 1,
            "title": "Users",
            "image": "Users",
            "path": "Users",
            "subMenu": null
        }
    ];


    position = "top-right";
    showSlide = false;
    showSlideMsg = false;
    slidewidth = 280;
    pageTitle: string;
    refreshgrid;
    constructor(private notificationService: NotificationService, private documentService: DocumentService, private getData: GeneralFunctions, private generFun: GeneralFunctions, private administrationService: AdministrationService) {


    }

    ngOnInit(): void {

        var contextObj = this;

        let rptField = [2816];
        let count = rptField.length;
        this.documentService.getDirectAccesstoaDocumentbyManyUsersFields().subscribe(function (result) {
            
            contextObj.fieldObject = (result["Data"]);
            contextObj.getDocumentGroupData(1);
        });

    }

    getDocumentGroupData(target?: number) {
        var contextObj = this;

        this.documentService.getDirectAccesstoaDocumentbyManyUsersData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.enableMenu = [0];
            }
        });

        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 733, contextObj.administrationService, contextObj.menuData.length);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getDocumentGroupData(0);
    };
    public onSort(objGrid: any) {
        this.getDocumentGroupData(0);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.userClick();
                break;
        }
    }

    public userClick() {
        var contextObj = this;
        this.documetNumber = this.inputItems.rowData["Document Number"];
        this.documentName = this.inputItems.rowData["File Name"];
        this.action = "user";
        this.pageTitle = "User List";
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    //slide events/////


    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    cancelClickMsg(event: Event) {
        this.showSlideMsg = !this.showSlideMsg;
    }

    closeSlideDialogMsg(value: any) {
        this.showSlideMsg = value.value;
    }

}
