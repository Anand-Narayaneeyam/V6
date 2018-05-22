import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { SpaceService } from '../../../Models/space/space.service';
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
import { CostCategoriesAddEditComponent } from './Cost-Categories-add-edit';
import { CostCategoryRates } from './cost-category-rates.component';

@Component({
    selector: 'Cost-Categories',
    templateUrl: './app/Views/space/General Settings/Cost-Categories.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, GridComponent, ConfirmationComponent, SlideComponent, SplitViewComponent, CostCategoriesAddEditComponent, CostCategoryRates],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions]

})

export class CostCategories implements OnInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[] = [];
    itemsSource: any[];
    entityCategoryId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
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
    refreshgrid;
    showSlide = false;
    position = "top-right";
    message = "Are you sure you want to delete the selected Cost Category?";
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
        },
        {
            "id": 4,
            "title": "Cost Category Rates",
            "image": "Cost Category Rates",
            "path": "Cost Category Rates",
            "subMenu": null

        }];

    constructor(private notificationService: NotificationService, private SpaceService: SpaceService, private getData: GeneralFunctions, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;

        contextObj.SpaceService.getCostCategories().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        contextObj.dataLoad();
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
                this.costcategoryRates();
                break;
        }
    }

    public dataLoad() {
        var contextObj = this;
        contextObj.SpaceService.getCostCategoriesData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;

            if (contextObj.totalItems < 1) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Cost Categories exist", 3);
            }
            else {
                contextObj.enableMenu = [1, 2, 3, 4];
            }

        });
    }

    public addClick() {
        this.secondaryTarget = 0;
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Cost Category";
        var contextObj = this;
        this.fieldDetailsAdd1 = [];
        this.fieldDetailsAdd1 = this.fieldDetailsAdd1.concat(this.fieldObject)
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.SpaceService.AddCostCategories().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
       
    }

    public editClick() {
        
        this.secondaryTarget = 0;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Cost Category";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.SpaceService.EditCostCategories(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;

        var fieldObj: any[] = [];
        fieldObj.push({
            ReportFieldId: 173,
            Value: 144
        });
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Cost Category Name to delete", 2);
        }
        else {
            this.SpaceService.CheckIsEntityReferenceCost(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData["Data"] == false) {
                        contextObj.message = " Are you sure you want to delete the selected Cost Category?";
                        contextObj.showSlide = !this.showSlide;
                    }
                    else if(resultData["Data"] == true) {
                        contextObj.message = "Selected Cost Category is already in use. Are you sure you want to delete the selected Cost Category?";
                        contextObj.showSlide = !this.showSlide;
                    }
                   
            });
            
        }
    }

    public costcategoryRates() {
        /* Cost Category Rates */
        
        var contextObj = this;
        if (this.inputItems.selectedIds[0] != undefined) {
            this.pageTitle = "Cost Category Rates";
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            this.secondaryTarget = 1;
        }
        else {
            this.notificationService.ShowToaster("Select a Cost Category", 2);
            this.secondaryTarget = 0;
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
            this.enableMenu = [1, 2, 3, 4];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    deleteResource() {
        var contextObj = this;
        contextObj.SpaceService.DeleteCostCategories(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemsSource.length < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Cost Category deleted", 3);
                    contextObj.notificationService.ShowToaster("No Cost Categories exist", 3);
                 
                }
                else
                    contextObj.notificationService.ShowToaster("Selected Cost Category deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Cost Category in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Cost Category in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };

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