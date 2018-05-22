import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { TradeAddEditComponent } from './trade-add-edit.component';

@Component({
    selector: 'trades',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/trades.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, TradeAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, WorkOrdereService, AdministrationService],
})

export class Trades implements OnInit {
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single"};
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    message = "Are you sure you want to delete the selected Trade?";
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 3203
        },       
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 3204
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 3205
        },
    ];
   

    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    pageTitle: string;
    cardButtonPrivilege = [false, false];
    refreshgrid;
    constructor(private notificationService: NotificationService, private AdministrationService: AdministrationService, private getData: GeneralFunctions, private workOrdereService: WorkOrdereService, private generFun: GeneralFunctions) {


    }

    ngOnInit(): void {
        
        var contextObj = this;
        
        let rptField = [1395, 1396];
        let count = rptField.length;
        this.workOrdereService.getTradesFields().subscribe(function (result) {

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
            contextObj.getTradeData(1);
        });       

    }

    getTradeData(target?: number)
     {
        var contextObj = this;      

         this.workOrdereService.getTradesData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
             contextObj.totalItems = result["Data"].DataCount;
             if (contextObj.totalItems > 0) {
                 contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                // contextObj.enableMenu = [1, 2];
                 if (target == 1) {
                     contextObj.itemsPerPage = result["Data"].RowsPerPage;
                 }
             }
             else {
                 contextObj.notificationService.ShowToaster("No Trades exist", 2);
                 contextObj.enableMenu = [1];
             }
         });

         var callBack = function (data) {
             contextObj.menuData = data;
         };
         contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 733, contextObj.AdministrationService, contextObj.menuData.length);
        // contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 733, contextObj.AdministrationService, contextObj.menuData.length);
    }
    
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getTradeData(0);
    };
    public onSort(objGrid: any) {
        this.getTradeData(0);
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
        this.pageTitle = "New Trade";
        this.workOrdereService.loadTradesAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Trade";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Trade", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workOrdereService.loadTradesAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {        
                result["Data"][3].FieldValue = Number(result["Data"][3].FieldValue).toFixed(2);
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
            this.notificationService.ShowToaster("Select a trade to delete", 2);
        }
        else {
            this.workOrdereService.checkTradeIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Trade in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }


    deleteTrade() {

        var contextObj = this;
        contextObj.workOrdereService.postTradesDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Trade deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Trade in use, cannot be deleted", 5);
            }
                else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Trade in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    }

    public inlineDelete(event: any) {
        this.deleteTrade();
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
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteTrade();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}
