import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { ResourcesAddEditComponent } from './resources-add-edit'

@Component({
    selector: 'resource-scheduling',
    templateUrl: './app/Views/Scheduling/General Settings/resources.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, GridComponent, ConfirmationComponent, SlideComponent, SplitViewComponent, ResourcesAddEditComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions]

})

export class ResourceScheduling implements OnInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[] = [];
    itemsSource: any[];
    entityCategoryId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    userDetails: any;
    types: boolean = true;
    cardButtonPrivilege = [false, false];
    enableMenu: number[];
    pageTitle: string;
    totalItems: number = 0;
    moduleId: string="9"
    workFlowCategoryId: string="1";
    EntityCategoryId: string = "1";
    refreshgrid;
    showSlide = false;
    position = "top-right";
    message = "Are you sure you want to delete the selected Resource?";
    isApprovalProcessSubscribed: boolean = false;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null

        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null

        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null

        }];

    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService, private getData: GeneralFunctions, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;

        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getResourceScheduling(this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
               
               
            });
        });
       
        contextObj.dataLoad();
    }

    public dataLoad() {
        var contextObj = this;
        contextObj.schedulingService.getResourceSchedulingData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            if (contextObj.totalItems < 1) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Resources exist", 3);
            }
            else {
                contextObj.enableMenu = [1, 2, 3];
            }

        });
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
        }
    }

    public addClick() {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Resource";
        var contextObj = this;
        this.fieldDetailsAdd1 = [];
        this.fieldDetailsAdd1 = this.fieldDetailsAdd1.concat(this.fieldObject)
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getResourceAddLoad(this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8782 });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        })
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Resource";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Resource", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.getResourceEditLoad(this.inputItems.selectedIds[0], this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8782 });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
          //  contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Resource to delete", 2);
        }
        else {
            this.schedulingService.CheckResourceinUse(this.inputItems.selectedIds).subscribe(function (resultData) {
                if (resultData.Data == 1) {
                    contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 2);
                }
                else {
                    contextObj.showSlide = true;
                }
            });

        }
    }

    deleteResource() {
        var contextObj = this;
        contextObj.schedulingService.postResourceDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Resource deleted", 3);
                    contextObj.notificationService.ShowToaster("No Resources exist", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Selected Resource deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    }

    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteResource();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}
