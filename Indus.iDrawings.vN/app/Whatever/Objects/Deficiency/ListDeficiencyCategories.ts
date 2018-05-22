import { Component, KeyValueDiffers, OnInit, Input } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DeficiencyCategoriesAddEdit} from './deficiencycategories-addedit.component';

@Component({
    selector: 'ListDeficiencyCategories',
    templateUrl: './app/Views/Objects/Deficiency/ListDeficiencyCategories.html',
    directives: [SlideComponent, SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, DeficiencyCategoriesAddEdit],
    providers: [HTTP_PROVIDERS, ObjectsService, NotificationService, GeneralFunctions, AdministrationService],
})

export class ListDeficiencyCategoriesComponent implements OnInit {

    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 300;
    @Input() objectCategoryId: number;
    @Input() moduleId: number = 0;
    menuClickValue: any;
    fieldObject: IField[];
    DeficiencyCategoryAddEdit: IField[];
    itemsSource: any[];
    messages: any[];
    deleteConfrmtnMsg: string;
    fieldType: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    addlDataField: number[];
    differ: any;
    message;
    hasFieldValue: boolean = false;
    gridcount = 1;
    isinUse: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: 'Name' };
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null

        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
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
    enableMenu: any[];
    pageTitle: string;
    refreshgrid;

    constructor(private generFun: GeneralFunctions, private objectsService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
    }

    ngOnInit(): void {
        this.enableMenu = [0]
        var contextObj = this;
        contextObj.objectsService.getDeficiencyCategoryFieldList(contextObj.objectCategoryId).subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            contextObj.dataLoad();
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 200, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public dataLoad() {
        var contextObj = this;
        this.objectsService.getDeficiencyCategoryList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.objectCategoryId==0){
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems > 0) {
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [0, 1, 2];
                }
                else {
                    // contextObj.notificationService.ShowToaster("No Object Classes exist", 2);
                    contextObj.notificationService.ShowToaster("No Deficiency Categories exist", 2)
                    contextObj.enableMenu = [0];
                }
            }
            else {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);            
            if (contextObj.totalItems > 0) {
                contextObj.itemsPerPage = resultData.RowsPerPage;
                contextObj.enableMenu = [0, 1, 2];
            }
            else {
                // contextObj.notificationService.ShowToaster("No Object Classes exist", 2);
                contextObj.notificationService.ShowToaster("No Deficiency Categories exist", 2)
                contextObj.enableMenu = [0];
                }
            }
        });
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.objectsService.getDeficiencyCategoryList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }
    public onSort(objGrid: any) {
        debugger
        if (objGrid.sortCol == "[Component Type]")
        {
            this.inputItems.sortCol = "[Component Class]";
        }
        else
        {
            this.inputItems.sortCol = objGrid.sortCol;
        }
        this.dataLoad();
        //var contextObj = this;
        //this.inputItems.sortCol = objGrid.sortCol;
        //this.inputItems.sortDir = objGrid.sortDir;
        //this.objectsService.getDeficiencyCategoryList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
        //    contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
        //    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
        //    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        //});
    }

    public onSubMenuChange(event: any) {
        this.menuClickValue = event.value;
        switch (event.value) {
            case 0:
                this.pageTitle = "New Deficiency Category";
                this.addClick();
                break;
            case 1:
                this.pageTitle = "Edit Deficiency Category";
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.objectsService.getDeficiencyCategoryFieldAddEdit(0, 1, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.DeficiencyCategoryAddEdit = resultData["Data"];
            //contextObj.DeficiencyCategoryAddEdit.filter(function (el) {
            //    if (el.FieldId == 2365) {
            //        if (contextObj.objectCategoryId==1)
            //            el.FieldLabel = "Asset Categories";
            //        else if (contextObj.objectCategoryId == 2)
            //            el.FieldLabel = "Furniture Categories";
            //    }
            //    return true
            //});
            contextObj.DeficiencyCategoryAddEdit = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {
        debugger
        this.action = "edit";
        this.btnName = "Save Changes";
        var compntCatgry = "";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.objectsService.getDeficiencyCategoryFieldAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
                debugger
                contextObj.DeficiencyCategoryAddEdit = resultData["Data"];
                contextObj.DeficiencyCategoryAddEdit.filter(function (el) {
                    if (el.FieldId == 2365) {
                        //el.FieldLabel = "Component Category";
                        //if (contextObj.objectCategoryId == 1)
                        //    el.FieldLabel = "Asset Categories";
                        //else if (contextObj.objectCategoryId == 2)
                        //    el.FieldLabel = "Furniture Categories";

                        if (el.FieldValue != "-1" && el.FieldValue != null && el.FieldValue != "")
                            compntCatgry = el.FieldValue;
                        else
                            el.FieldValue = "-1";
                    }
                    if (el.FieldId == 2366) {
                        if (compntCatgry != "-1" && compntCatgry != "") {
                            contextObj.objectsService.getDeficiencyClassLookups(contextObj.objectCategoryId, 1, compntCatgry).subscribe(function (resultData) {
                                el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                if (el.FieldValue != "-1" && el.FieldValue != null && el.FieldValue != "")
                                    el.FieldValue = el.FieldValue;
                                else
                                    el.FieldValue = "-1";
                            });
                        }
                    }
                    return true
                });

                contextObj.DeficiencyCategoryAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        var Isinuse;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.objectsService.IsDeficiencyCategoriesInuse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                Isinuse = resultData;
                if (Isinuse == 0) {

                    contextObj.message = "Are you sure you want to delete the selected Deficiency Category?";

                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Deficiency Category in use, cannot be deleted", 2);
                }
            });
        }
    }

    OnSuccessfulSubmit(event: any) {
   
        var contextObj = this;
        contextObj.refreshgrid = [];
        let retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems >= 1)
                contextObj.enableMenu = [0, 1, 2]
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            //if (retUpdatedSrc["itemSrc"]["0"]["Validated"] == "True")
            //    contextObj.enableMenu = []
            //else
            //    contextObj.enableMenu = []
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    deleteDeficiencyCategories() {
        var contextObj = this;
        contextObj.objectsService.postDeleteDeficiencyCategories(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Deficiency Category deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Deficiency Category in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteDeficiencyCategories();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    loadControl(eventValue: any, contextObj, action) {

    }
    Successfulladd(event: any) {

    }

}

