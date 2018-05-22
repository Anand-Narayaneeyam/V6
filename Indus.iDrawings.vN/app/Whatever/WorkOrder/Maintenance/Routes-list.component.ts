import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {EquipmentListComponent} from './Equipment-list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {RoutesAddEditComponent} from './Routes-AddEdit.component';


@Component({
    selector: 'Routes-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/Routes-list.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, SplitViewComponent, GridComponent, EquipmentListComponent, RoutesAddEditComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService]

})

export class RoutesListComponent implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = true;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Route', sortDir: 'ASC', selectioMode: "single"};
    public errorMessage: string;
    RoutesSource: any[];
    private fields: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    cardButtonPrivilege = [false, false];
     //Form ID : 235
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (235))
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "privilegeId": 3358 
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 3359
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 3360
        },
        {
            "id": 4,
            "title": "Equipment",
            "image": "Equipment",
            "path": "Equipment",
            "privilegeId": 3360
        }        
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    showSlideAdd = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    menuClickValue: any;
    action: string;
    isSiteAdmin: any;
    routeName: string;
    pageTitle: string;
    sortFields: IField[];
    target: number;
    submitSuccess: any[] = [];
    btnName: string;
    fieldDetailsAdd: IField[];
    refreshgrid = [];
    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 2545, contextObj.administrationServices, contextObj.menuData.length);
        contextObj.workOrderService.getRoutesFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.administrationServices.getCustomerSubscribedFeatures("189").subscribe(function (rt) {
                var customerFeatureobj = rt["Data"];
                for (let i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 189:
                            contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                            break;
                    }
                }
                if (contextObj.isSiteAdmin == false) {
                    contextObj.fields[3].IsVisible = false;
                }
                contextObj.getRoutes();
            });           
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [ 1, 2, 3, 4];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Routes exist", 2);
        }
    }

    public getRoutes() {
        var contextObj = this;
        this.workOrderService.getRoutesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.RoutesSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    }

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuClickValue = event.value;
        if (event.value == 1) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 2) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4) // Equipment List
        {
            this.onMenuEquipmentClick(1);
        }
    }

    public onMenuEquipmentClick(target) {
        var contextObj = this;
        this.target = target;
        this.showSlideAdd = false;
        this.menuClickValue = 4;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
                for (var i = 0; i <= contextObj.RoutesSource.length; i++) {
                    if (contextObj.RoutesSource[i]["Id"] == contextObj.inputItems.selectedIds[0]) {
                        contextObj.routeName = contextObj.RoutesSource[i]["Route"];
                        break;
                    }
                }
                contextObj.action = "Equipment";
                contextObj.pageTitle = "Equipment";
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;            
        }
        else {
            this.notificationService.ShowToaster("Select a Route", 2);
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Route";
        this.workOrderService.loadRoutesAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            if (contextObj.isSiteAdmin == false) {
                contextObj.fieldDetailsAdd[3].IsVisible = false;
            }
            else {
                contextObj.fieldDetailsAdd[3].IsMandatory = true;
            }
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Route";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadRoutesAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    if (contextObj.isSiteAdmin == false) {
                        contextObj.fieldDetailsAdd[3].IsVisible = false;
                    }
                    else {
                        contextObj.fieldDetailsAdd[3].IsMandatory = true;
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkRouteInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.notificationService.ShowToaster("Selected Route in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
        }
    }

    okDelete(event: Event) {
        this.deleteRoutes();
        this.showSlide = !this.showSlide;
    }
    deleteRoutes() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeleteRoutesDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.RoutesSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.RoutesSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Route deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Route in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    }

    cancelClick(event: Event) {
        this.showSlide = false;
        this.showSlideAdd = false;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
        this.showSlideAdd = value.value;
    }
    okAddEquip(event) {
        this.onMenuEquipmentClick(2);
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getRoutes();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getRoutes();
    }
    
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.RoutesSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.RoutesSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
            contextObj.showSlideAdd = true;

        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.RoutesSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }

        if (this.action == "add" || this.action == "edit") {
            contextObj.splitviewInput.showSecondaryView = false;
        }
    }
}