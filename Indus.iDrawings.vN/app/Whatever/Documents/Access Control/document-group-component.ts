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
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DocumentService} from '../../../Models/Documents/documents.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DocumentGroupAddEditComponent } from './document-group-addedit-component';
import { DocumentsforDocumentGroupsComponent } from './document-group-documents';
import { AccesstoDocumentGroupbyManyUsersComponent } from './access-documGroup-by-manyUsers';

@Component({
    selector: 'document-groups',
    templateUrl: './app/Views/Documents/Access Control/document-group-component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, DocumentGroupAddEditComponent, DocumentsforDocumentGroupsComponent, AccesstoDocumentGroupbyManyUsersComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, DocumentService, AdministrationService],
})

export class DocumentGroup implements OnInit {
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
    message = "Are you sure you want to delete the selected Document Group?";
    messageMsg = 'Selected Document Group is in use. Are you sure you want to delete the selected Document Group?';
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 1223
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 1224
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 1225
        },
        {
            "id": 4,
            "title": "Documents",
            "image": "Documents",
            "path": "Documents", 
            "subMenu": null,
            "privilegeId": 1231
        },
        {
            "id": 5,
            "title": "Access to Many Users",
            "image": "AccesstoManyUsers",
            "path": "AccesstoManyUsers",
            "subMenu": null,
            "privilegeId": 1231
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
        this.documentService.getDocumentGroupFields().subscribe(function (result) {

            result["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            contextObj.fieldObject = (result["Data"]);
            contextObj.getDocumentGroupData(1);
        });

    }

    getDocumentGroupData(target?: number) {
        var contextObj = this;

        this.documentService.getDocumentGroupData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Document Groups exist", 2);
                contextObj.enableMenu = [1];
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
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.documentClick();
                break;
            case 5:
                this.menuUsersClick();
                break;
        }
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Document Group";
        this.documentService.loadtDocumentGroupAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Document Group";
        var contextObj = this;
        this.splitviewInput.secondaryArea = 70;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Group", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.documentService.loadtDocumentGroupAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.secondaryArea = 70;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Group to delete", 2);
        }
        else {
            this.documentService.checkDocumentGroupIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                
                if (resultData == 1) {
                    contextObj.showSlideMsg = !contextObj.showSlideMsg;
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }
    public documentClick() {
        var contextObj = this;
        this.action = "documents";
        this.pageTitle = "Documents for Document Group";
        this.documentGroupName = this.inputItems.rowData["Document Group"];
        this.splitviewInput.secondaryArea = 79;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    public menuUsersClick() {
        var contextObj = this;
        this.action = "manyUsers";
        this.pageTitle = "Access to a Document Group by Many Users";
        this.splitviewInput.secondaryArea = 75;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    deleteDocumentGroup() {

        var contextObj = this;
        contextObj.documentService.postDocumentGroupDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Document Groups exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Document Group deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
    }

    public inlineDelete(event: any) {
        this.deleteClick();
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteDocumentGroup();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    okDeleteMsg(event: Event) {
        this.showSlideMsg = !this.showSlideMsg;
        this.deleteDocumentGroup();
    }

    cancelClickMsg(event: Event) {
        this.showSlideMsg = !this.showSlideMsg;
    }

    closeSlideDialogMsg(value: any) {
        this.showSlideMsg = value.value;
    }

}
