import {Component, Input, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { RelationshipAddEdit } from '../../Objects/Connectivity/relationship-add-edit.component';

@Component({
    selector: 'connection-relationships',
    templateUrl: './app/Views/Objects/Connectivity/connection-relationship.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
       SlideComponent, RelationshipAddEdit],
    providers: [ HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ObjectsService],
    inputs: ["objectCategoryId"]
})

export class ConnectionRelationships implements AfterViewInit {
   
    action: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAddEdit: IField[];
    enableMenu = [];
    pageIndex: number = 0;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    fieldObject: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    refreshgrid;
    pagePath = "";
    showSlide: boolean = false;
    objectCategoryId: any;
    position = "top-right";
    slidewidth = 250;
    slideMessage: string;
    
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 5148
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 5148
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 5148
        }];

    constructor(private objService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.objService.getConnectivityList(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.objService.getConnectivityRelationshipsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Connection Relationships exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    }

    public onSort(objGrid: any) {
        this.dataLoad(0);
    }


    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New Connection Relationship";
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit Connection Relationship";
                this.editClick();
                break;
            case 3:
                this.action = "delete";
                this.deleteClick();
                break;

        }
    }

    public addClick() {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        this.pageTitle = "New Connection Relationship";
        contextObj.objService.loadRelationshipFieldsAddEdit(0, 1, contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldDetailsAddEdit = (result["Data"]);
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick() {
     
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Connection Relationship";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Relationship", 2);
        } else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (contextObj.inputItems.selectedIds.length == 1) {
            if (contextObj.inputItems.selectedIds[0] != null) {
                contextObj.objService.loadRelationshipFieldsAddEdit(contextObj.inputItems.selectedIds[0], 2, contextObj.objectCategoryId).subscribe(function (result) {
                    contextObj.fieldDetailsAddEdit = result["Data"];                   
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (contextObj.inputItems.rowData["AssociationId"] == 0) {
            contextObj.showSlide = true;
            contextObj.slideMessage = "Are you sure you want to delete the selected Relationship?";
        }
        else {
            contextObj.showSlide = true;
            contextObj.slideMessage = "Selected Relationship is in use. Are you sure you want to delete  the selected Relationship?";
        }
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteRelationship();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public deleteRelationship() {
        var contextObj = this;

        contextObj.objService.DeleteRelationship(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }


                contextObj.notificationService.ShowToaster("Selected Relationship deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Relationship in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });

    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }     
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
         
}
