import {Component, ChangeDetectorRef, SimpleChange, Output, KeyValueDiffers, EventEmitter, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {EmployeeService} from '../../../../Models/Employee/employee.services';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import {IField} from '../../../../Framework/Models//Interface/IField'
import {ShowDetailsComponent} from  './showdetails.component'
import { GeneralFunctions} from '../../../../Models/Common/General';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';

@Component({
    selector: 'move-project',
    templateUrl: './app/Views/Employee/Tools/Move Projects/moveProject.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, TabsComponent, TabComponent, ShowDetailsComponent, Notification, PageComponent, SlideComponent, SplitViewComponent, FieldComponent],
    providers: [NotificationService, EmployeeService],
    inputs: ['moduleId', 'targetId']
})

export class MoveProjectComponent {
    moveProjectMenu: any;
    moveProjectMenuTotalItems: number = 8;
    enablemoveProjectMenu: any[];
    eventAction: string;
    pagePath: string = "Employees / Move Projects ";
    executeFlowFields: IField[];
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
    btnName: string = "Generate";
    dataKey: string = "Id";
    pageTitle: string = "Move Project Work Order";

    moduleId: number;
    targetId: number;

    selectedTab: number = 0;

    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    itemsSource: any[];
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
    fieldObject: IField[];
    MoveProjectStatus: string;
    localselection: number;
    deleteIndex: number;

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    refreshgrid;
    isMoveExecutionFlowSubscribed: boolean = false;

    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {

    }
    updatemoveProjectMenu(event: any) {
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        this.MenuClickMoveProjectInSpacePlanning(event);
                        break;
                }
                break;
        }
    }
  
    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.loaddata();
        }
    }
    onTabClose(event: any) {
        this.eventAction = "";
        this.enablemoveProjectMenu=[0,1,2]
        this.selectedTab = event[0];
        this.pagePath = "Employees / Move Projects ";
    }
    pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.loaddata();
    }
    onSort(event: any) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.loaddata();
    }
    ngOnInit() {
        var contextObj = this;
        contextObj.employeeService.checkSubscribedFeature('234').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isMoveExecutionFlowSubscribed = result["Data"][0]["IsSubscribed"];
        });
        contextObj.employeeService.getMoveProjectList().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        })
        this.loaddata();
        this.loadMenu();

    }
    loaddata() {
        var contextObj = this;
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        var fieldobj = new Array<ReportFieldArray>();
                        fieldobj.push({
                            ReportFieldId: 893,
                            Value: null
                        })
                        this.employeeService.getMoveProjectListData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                                if (contextObj.itemsSource[i].StatusId == 30) {
                                    contextObj.itemsSource[i].Status = "Approved";
                                }
                            }
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            if (contextObj.totalItems == 0) {
                                contextObj.enablemoveProjectMenu = [];
                                contextObj._notificationService.ShowToaster("No Move Projects exist", 2);
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        });
                        break;
                }
                break;
        }
    }
    loadMenu() {
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        this.moveProjectMenu = [
                        //    {
                        //    "id": 0,
                        //    "title": "View Stack Plan",
                        //    "image": "",
                        //    "path": "",
                        //    "submenu": null
                        //},
                            {
                                "id": 1,
                                "title": "Show Details",
                                "image": "Show Details",
                                "path": "Show Details",
                                "submenu": null
                            },
                            {
                                "id": 2,
                                "title": "Execute",
                                "image": "Execute",
                                "path": "Execute",
                                "submenu": null
                            }]
                        this.enablemoveProjectMenu = [0, 1, 2]
                        break;
                }
                break;
        }
    }
    MenuClickMoveProjectInSpacePlanning(event: any) {
        var contextObj = this;
        var selected = contextObj.itemsSource.find(function (item) {            
            return item.Id === contextObj.inputItems.selectedIds[0]
        })
        debugger;
        switch (event.value) {
            case 1:               
                this.eventAction = "ShowDetails";
                this.localselection = 1;
                this.pagePath = "Employees / Move Projects / Show Details  ";
                this.enablemoveProjectMenu = [];
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);              
                contextObj.MoveProjectStatus = selected.Status;
                break;
            case 2:
                if (selected.Status == "Executed")
                    contextObj._notificationService.ShowToaster("Move Project is already executed", 2);
                else if (selected.Status == "Deleted")
                    contextObj._notificationService.ShowToaster("Move Project is already deleted", 2);
                else if (selected.Status == "Discarded")
                    contextObj._notificationService.ShowToaster("Move Project is discarded", 2);
                else if (selected.Status == "Work Order Generated")
                    contextObj._notificationService.ShowToaster("Work Order is generated for the selected Move Project", 2);
                else if (contextObj.isMoveExecutionFlowSubscribed)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.executeMoveProject();
                break;
        }
    }

    /**
     * slide events
     */

    public onYesClick(event: Event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        contextObj.employeeService.getMoveProjectExecutionRequestFields().subscribe(function (resultData) {
            debugger;
            contextObj.executeFlowFields = resultData["Data"];
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public onWorkFlowSubmit(event) {
        var contextObj = this;
        debugger;
        var fieldObjectArray: ReportFieldArray[] = JSON.parse(event["fieldobject"]).filter(function (item) { return item.ReportFieldId != 12254 });
        var actionUser: IField = contextObj.executeFlowFields.find(function (item) {
            return item.ReportFieldId === 12254
        });
        if (actionUser.MultiFieldValues != null) {
            for (var item of actionUser.MultiFieldValues) {
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }
        contextObj.employeeService.submitMoveExecutionRequestDetails(1, JSON.stringify(fieldObjectArray), 0, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            debugger;
            contextObj.refreshgrid = [];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc: any[] = JSON.parse(resultData["Data"]["Data"]);
                    if (retUpdatedSrc && retUpdatedSrc.length > 0) {
                        for (let i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][contextObj.inputItems.dataKey] == retUpdatedSrc[0][contextObj.inputItems.dataKey]) {
                                contextObj.itemsSource[i] = retUpdatedSrc[0];
                            }
                        }
                    }
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    contextObj._notificationService.ShowToaster("Move Project Work Order generated", 3);
                    break;
            }

        });
    }

    public onNoClick(event: Event) {
        this.showSlide = !this.showSlide;
        this.executeMoveProject();
    }

    public executeMoveProject() {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push(
            {
                ReportFieldId: 893,
                Value: this.inputItems.selectedIds[0].toString()
            },
            {
                ReportFieldId: 885,
                Value: this.inputItems.selectedIds[0].toString()
            },
            {
                ReportFieldId: 884,
                Value: null
            });
        contextObj.refreshgrid = [];
        contextObj.employeeService.executeMoveProject(fieldobj).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] > 0) {            
                contextObj.itemsSource.find(function (item) {
                    if (item["Id"] == contextObj.inputItems.selectedIds[0]) {
                            item["StatusId"] = 29;
                            item["Status"] = "Executed";
                            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                            contextObj._notificationService.ShowToaster("Move Project executed", 2);
                            return true;
                        } else
                            return false;
                    });               
                //let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: resultData["Data"].Data }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                //contextObj.totalItems = retUpdatedSrc["itemCount"];
                //if (contextObj.totalItems < 1) {
                //    contextObj.enablemoveProjectMenu = [];
                //}

               
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Already exist", 5);
                        }
                        else if (resultData["Data"].ServerId == -3)
                            contextObj._notificationService.ShowToaster("No Employee Move Details added to this Move Project", 2);
                        break;
                }
            }
        })
    }

    public closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public onDropDownChange(event: IField) {
        var contextObj = this;
        var actionUser: IField = contextObj.executeFlowFields.find(function (item) {
            return item.ReportFieldId === 12254
        });

        if (event.FieldValue == "-1") {
            actionUser.IsVisible = false;
            actionUser.IsMandatory = false;
            actionUser.HasValidationError = false;
            actionUser.LookupDetails.LookupValues = [];
            actionUser.MultiFieldValues = [];
            return;
        }
        contextObj.employeeService.getActionPointUserLookupValues(0, parseInt(event.FieldValue), 5, 20).subscribe(function (resultData) {
            if (resultData["FieldBinderData"] != "[]") {
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
            } else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}