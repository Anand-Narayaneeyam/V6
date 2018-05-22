import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { DocumentService } from '../../../Models/Documents/documents.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
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
import { DocumentCategoriesAddEditComponent } from './DocumentCategories-add-edit';


@Component({
    selector: 'Document-Category',
    templateUrl: './app/Views/Documents/General Settings/Document-Categories.component.html',
    directives: [ListComponent, FieldComponent, Notification, SubMenu, PagingComponent, Sorting, GridComponent, ConfirmationComponent, SlideComponent, SplitViewComponent, DocumentCategoriesAddEditComponent],
    providers: [HTTP_PROVIDERS, DocumentService, NotificationService, GeneralFunctions]

})

export class DocumentCategory implements OnInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[] = [];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowEdit: false, selectioMode: "single"};
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu: number[];
    pageTitle: string;
    totalItems: number = 0;
    refreshgrid;
    showSlide = false;
    position = "top-right";
    slidewidth = 280;
    showSlideMsg = false;
    message = "Are you sure you want to delete the selected Document Category?";
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
   
    constructor(private notificationService: NotificationService, private DocumentService: DocumentService, private getData: GeneralFunctions, private generFun: GeneralFunctions) {
    }


    ngOnInit() {
        var contextObj = this;
        contextObj.DocumentService.getdocumentCategoryFeilds().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            contextObj.getDocumentCategory(1);
        });
      
       
    }

    getDocumentCategory(target?: number) {
        var contextObj = this;      
        contextObj.DocumentService.getdocumentCategory(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                // contextObj.enableMenu = [1, 2];
                if (target == 1) {
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Document Categories exist", 2);
                contextObj.enableMenu = [1];
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
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Document Category";
        contextObj.DocumentService.DocumentCategoryAddEdit(0, 1).subscribe(function (resultData) {
            
            contextObj.fieldDetailsAdd1 = resultData["Data"];
           
            
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Document Category";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Category", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.DocumentService.DocumentCategoryAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
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
            this.notificationService.ShowToaster("Select a Document Category to delete", 2);
        }
        else {
            contextObj.DocumentService.CheckDocumentCategoryInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData) {
                    contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
                } else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
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
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    deleteDocumentCategory() {
        var contextObj = this;
        contextObj.DocumentService.postDocumentCategoryDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Document Category deleted", 3);
                    contextObj.notificationService.ShowToaster("No Document Categories exist", 3);
                }
                else
                contextObj.notificationService.ShowToaster("Selected Document Category deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    }

    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getDocumentCategory(0);
    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getDocumentCategory(0);
    };

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteDocumentCategory();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }


}