import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { ObjectsService } from '../../../Models/Objects/objects.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
//importing addedit component
import { WarrantyAddEditComponent } from './warranty-addedit.component'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { WarrantyAlert } from './warranty-alert.component';

@Component({
    selector: 'warranty-list',
    templateUrl: './app/Views/Objects/Data/warranty-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, WarrantyAddEditComponent, WarrantyAlert],
    providers: [WorkOrdereService, ObjectsService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ["selectedId", "isallattachmentmenuneeded","objectCategoryName"],
})

export class WarrantyListComponent implements OnInit {

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
    enableMenu = [];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 994
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 994
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 994
        },
        {
            "id": 4,
            "title": "Alert",
            "image": "Alert",
            "path": "Alert",
            "submenu": null,
            "privilegeId": null
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    selectedId: number;
    warrantyNotificationDate: any;
    isallattachmentmenuneeded: boolean;
    objectCategoryName: any;
    constructor(private workOrdereService: WorkOrdereService, private objectsService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        this.objectsService.getWarrantyField().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.objectsService.getWarrantyData(contextObj.selectedId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems <= 0) {
                contextObj.notificationService.ShowToaster("No Warranty details exist", 2);
                contextObj.enableMenu = [1];
            }
            if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == false) {
                contextObj.enableMenu = [];
            }
            if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == true) {
                contextObj.enableMenu = [1];
            }
            if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == false) {
                contextObj.enableMenu = [4];
            }
            if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == true) {
                contextObj.enableMenu = [1, 2, 3, 4];
            }
            //if (contextObj.isallattachmentmenuneeded == false) {
            //    contextObj.enableMenu = [4];
            //}
            //else {
            //    contextObj.enableMenu = [1, 2, 3, 4];
            //}           
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public enableSubMenu() {
        var contextObj = this;
        if (contextObj.totalItems <= 0) {
            contextObj.notificationService.ShowToaster("No Warranty details exist", 2);
            contextObj.enableMenu = [1];
        }
        if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == false) {
            contextObj.enableMenu = [];
        }
        if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == true) {
            contextObj.enableMenu = [1];
        }
        if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == false) {
            contextObj.enableMenu = [4];
        }
        if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == true) {
            contextObj.enableMenu = [1, 2, 3, 4];
        }
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
                this.alertClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public alertClick() {
        var contextObj = this;
        this.action = "alert";
        this.btnName = "Save Alert";
        this.pageTitle = "Warranty Alert";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.warrantyNotificationDate = this.inputItems.rowData["End Date"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Warranty", 2);
        }       
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Warranty";
        this.objectsService.loadWarrantyAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[3].IsVisible = false;
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Warranty";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.objectsService.loadWarrantyAddEdit(this.inputItems.selectedIds[0], 2, this.selectedId).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.fieldDetailsAdd1[3].IsVisible = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }

    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            //this.workOrdereService.checkContractorIsInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
            //    if (returnCheck["Data"] == -1)
            //        contextObj.notificationService.ShowToaster("Selected Warranty is in use, cannot be deleted", 5);
            //    else
                    contextObj.showSlide = !contextObj.showSlide;
            //});
            //if (this.inputItems.selectedIds[0] != null)
            //    this.showSlide = !this.showSlide;
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
            contextObj.enableSubMenu();
        } else if (this.action == "edit"){
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }


    deleteContacts() {
        var contextObj = this;
        contextObj.objectsService.deleteWarranty(contextObj.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Warranty deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Warranty Details in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}