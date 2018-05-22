import { Component, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { IField } from '../../../Framework/Models//Interface/IField'
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
//import { SafetyCopyFromComponent } from './New-Equipment.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { ProceduresSafetyStepsAddEditComponent } from './Procedures-SafetySteps-AddEdit.component';

import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { FieldOrderCommonComponent } from '../../Common/Field Order/fieldorder-common.component';


@Component({
    selector: 'safety-steps-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/Procedures-SafetySteps-List.component.html',
    directives: [SlideComponent, SubMenu, Sorting, PagingComponent,
        GridComponent, FieldComponent,
        ListComponent, CardComponent,
        Notification, LabelComponent,
        searchBox, TabsComponent,
        TabComponent,
        ProceduresSafetyStepsAddEditComponent,
        SplitViewComponent, FieldOrderCommonComponent],
    providers: [WorkOrdereService, NotificationService, GeneralFunctions, AdministrationService],
 
    inputs: ['selectedId', 'entityName', 'ShowMenuOption'],
})

export class SafetyStepsListComponent {
    ShowMenuOption: boolean = true;
    showSlide: boolean = false;
    position: any = "top-right";
    target: number;
    selectedTab: number = 0;
    addeditSafetyStepTab: boolean = false;
    action: string;
    selectedId: any;
    fieldRoute: IField[];
    sourceData: any[];
    SafetyStepData: any;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    sortCol: string = "[Order]";
    sortDir: string = "ASC";
    success = "";
    selIds = new Array();
    private fields: IField[];
    cardButtonPrivilege = [false, false];
    //Form ID : 271
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (271))
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 6111            
        },
        //For privilege
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 6111
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 6111
        },
        {
            "id": 4,
            "title": "Change Order",
            "image": "Change Order",
            "path": "Change Order",
            "submenu": null,
            "privilegeId": 6111
        }
    ];
    gridcount = 8;
    enableMenu = [0];
    types = false;
    @Output() submitSuccess = new EventEmitter();
    entityName: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Safety Step]', sortDir: 'ASC' };
    localselection: number;
    deleteIndex: number;
    fieldDetailsAdd1: IField[];
    btnName: string;
    tabTitle: string;
    refreshgrid;

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    reportFieldSrc: any;
    showFieldOrder: boolean = false;
    fieldOrderTitle: string;
    rptFIdValues = [];
    selProcId: number = 0;
    pageTitle: string;
    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2544, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getSafetyStepsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            var updatedData = new Array();/*To notify the watcher about the change*/
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fields = updatedData;
        })
        this.workOrderService.getSafetyStepsData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Safety Steps exist", 2);
                contextObj.enableMenu = [0];
            }
            else if (contextObj.totalItems == 1) {
                contextObj.enableMenu = [0, 1, 2];
            }
            else if (contextObj.totalItems > 1) {
                contextObj.enableMenu = [0, 1, 2, 4];
            }

        });
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.addeditSafetyStepTab = false;
        }
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                if (this.inputItems.selectedIds.length == 1) {
                    contextObj.localselection = 1;
                    contextObj.addeditSafetyStepTab = true;
                    contextObj.action = "edit";
                    contextObj.btnName = "Save Changes";
                    contextObj.tabTitle = "Edit Safety Step";
                    this.workOrderService.loadSafetyStepAddEdit(this.inputItems.selectedIds[0], 2, this.selectedId).subscribe(function (resultData) {
                        contextObj.fieldDetailsAdd1 = resultData["Data"];
                        setTimeout(function () { contextObj.selectedTab = 1; }, 50);
                    });
                }
                else if (this.inputItems.selectedIds.length > 1){
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.notificationService.ShowToaster("Select a Safety Step", 2);
                }
                break;
            case 2:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
            case 0:
                contextObj.localselection = 1;
                contextObj.addeditSafetyStepTab = true;
                contextObj.action = "add";
                contextObj.btnName = "Save";
                contextObj.tabTitle = "New Safety Step";
                this.workOrderService.loadSafetyStepAddEdit(0, 1, this.selectedId).subscribe(function (resultData) {
                    contextObj.fieldDetailsAdd1 = resultData["Data"];
                    setTimeout(function () { contextObj.selectedTab = 1; }, 50);
                });
                break;
            case 4:
                contextObj.changeFieldOrder();
                break;
        }
    }

    changeFieldOrder() {

        var context = this;
        context.splitviewInput.showSecondaryView = true;
        context.pageTitle = "Safety Step Order";
        context.reportFieldSrc = [];
        for (var i = 0; i < context.sourceData.length; i++) {
            context.reportFieldSrc.push({ "Id": context.sourceData[i].Id, "PositionNo": context.sourceData[i]["Order"], "ColmnName": context.sourceData[i]["Safety Step"] });
        }
        context.showFieldOrder = true;
        context.fieldOrderTitle = "Safety Step";
        debugger
    }

    handleCommonFieldOrderUpdate(event) {

        var context = this;
        context.refreshgrid = [];
        context.rptFIdValues = [];
        context.selProcId = context.selectedId[0];
        for (var i = 0; i < event.rptFieldSrcIds.length; i++) {

            context.rptFIdValues.push({ "ReportFieldId": "5376", "Value": "" + event.rptFieldSrcIds[i] });
        }

        context.rptFIdValues.push({ "ReportFieldId": "1336", "Value": "" + context.selProcId });

        debugger
        context.workOrderService.updateSafetyStepsOrder(JSON.stringify(context.rptFIdValues)).subscribe(function (resultData) {

            if (resultData.StatusId == 1) {
                context.notificationService.ShowToaster("Safety Step Order updated", 3);
                context.sourceData = JSON.parse(resultData.Data);
                context.refreshgrid = context.refreshgrid.concat([true]);                
                context.splitviewInput.showSecondaryView = false;
                if(context.sourceData.length == 0) {

                    context.enableMenu = [0];
                    context.notificationService.ShowToaster("No Job Steps exist", 2);
                }
                else if (context.sourceData.length == 1) {
                    context.enableMenu = [0, 1, 2];
                }
                else if (context.sourceData.length > 1) {
                    context.enableMenu = [0, 1, 2, 4];
                }
            }
            else {
                context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }

    public deleteEquipment(safetystepIds) {
        if (safetystepIds.length == 1) {
            this.showSlide = !this.showSlide;
        }
        else if (safetystepIds.length > 1){
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select a Safety Step", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 1336,
            Value: this.selectedId.toString()
        });
        fieldobj.push({
            ReportFieldId: 5557,
            Value: this.inputItems.selectedIds[0].toString()
        });
        this.showSlide = !this.showSlide;
        this.workOrderService.postDeleteSafetyStepsDetails(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == "1") {
                contextObj.notificationService.ShowToaster("Selected Safety Step deleted", 3);
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.sourceData = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems == 0) {

                    contextObj.enableMenu = [0];
                }
                else if (contextObj.totalItems == 1) {
                    contextObj.enableMenu = [0, 1, 2];
                }
                else if (contextObj.totalItems > 1) {
                    contextObj.enableMenu = [0, 1, 2, 4];
                }
                contextObj.workOrderService.getSafetyStepsData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No Safety Steps exist", 2);
                        contextObj.enableMenu = [0];
                    }
                    else if (contextObj.totalItems == 1) {
                        contextObj.enableMenu = [0, 1, 2];
                    }
                    else if (contextObj.totalItems > 1) {
                        contextObj.enableMenu = [0, 1, 2, 4];
                    }

                });
                contextObj.workOrderService.getProceduresDataUpdateForGrid(contextObj.pageIndex, 'Procedure', 'ASC', contextObj.selectedId, '').subscribe(function (resultData) {
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                });
            }
        });
    }

    onDelete(e: Event) {
        this.deleteEquipment(this.selIds);
    }

    onTabClose(event: any) {
        this.addeditSafetyStepTab = false;
        this.selectedTab = 0;
    }

    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }
    onCardCancel(event) {
        this.enableMenu = [0];
    }

    submitReturn2(event: any) {
        debugger
        var contextObj = this;
        contextObj.refreshgrid = [];
        var data;
        if (event["status"] == "success") {
            this.deleteIndex = 0;
            if (this.localselection > 0) {
                this.deleteIndex = this.localselection;
                this.addeditSafetyStepTab = false;
            }
                let retUpdatedSrc;

                if (contextObj.action == "add") {
                    retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    contextObj.sourceData = retUpdatedSrc["itemSrc"];
                } else {
                    retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
                if (this.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                else if (this.totalItems == 1) {
                    contextObj.enableMenu = [0, 1, 2];
                }
                else if (this.totalItems > 1) {
                    contextObj.enableMenu = [0, 1, 2, 4];
                }
                //contextObj.sourceData = retUpdatedSrc["itemSrc"];
                this.workOrderService.getProceduresDataUpdateForGrid(this.pageIndex, 'Procedure', 'ASC', this.selectedId, '').subscribe(function (resultData) {
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                });
        }
    }

    onSorting(objGrid: any) {
        var contextObj = this;
        this.sortCol = objGrid.selectedField;
        this.sortDir = objGrid.sortDirection;
        this.workOrderService.getSafetyStepsData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getSafetyStepsData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}