import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import { IField} from '../../../../Framework/Models//Interface/IField'
import { PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { IGrid} from '../../../../Framework/Models/Interface/Igrid'
import { SortHelper} from '../../../utils/sortHelper'
import { PageComponent} from '../../../../Framework/Whatever/Page/page.component'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { AddEditScenariosComponent } from './addeditscenario.component';
import { EmployeeService} from '../../../../Models/Employee/employee.services'

import { ScenarioDrawingComponent } from './scenario-drawings.component';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { TabsComponent } from '../../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../../Framework/Whatever/Tab/tab.component'

@Component({
    selector: 'scenarios',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/scenarios.component.html',
    directives: [PageComponent, SubMenu, GridComponent, PagingComponent, SplitViewComponent, AddEditScenariosComponent, SlideComponent, TabsComponent, TabComponent, ScenarioDrawingComponent],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService, GeneralFunctions]
})

export class ScenariosComponent implements OnInit{

    pagePath: string; 
    strScenarioName: string;
    target: number;
    selectedScenarioId: number;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    selectedTab: number = 0;
    showSlide = false;
    Position = "top-right";
    inputItems: IGrid = { dataKey: "Id", sortCol: "Id", sortDir: "ASC", selectedIds: [], allowAdd: false,allowEdit:false, isautosizecolms:false};
    fieldObject: any[];
    fieldDetailsAddEdit: IField[];
    itemSource: IField[];
    drawingId: number;
    menuData = [
        {
            "id": 0,
            "title": "Edit Scenario",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        
        {
            "id": 2,
            "title": "Drawings",
            "image": "Drawings",
            "path": "Drawings",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Create a Move Project",
            "image": "Users",
            "path": "Users",
            "submenu": null
        },
    ];
    enableMenu = [0, 1, 2];
    refreshgrid;
    pageTitle = "";
    splitViewScenario: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };

    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
       
        this.pagePath = "Employee / Scenarios ";        
        var contextObj = this; 
       
        this.employeeService.getScenarioListColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {               
                    item.Width = "0.5*";                                               
            })
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
       
    }
    public dataLoad(target?: number, context?: any) {
        context.employeeService.scenarioListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;

            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context._notificationService.ShowToaster("No Scenarios exist", 2);
                context.enableMenu = [];
            }
        });    

    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
    public onSubMenuChange(event: any) {
        this.target = 0;
        this.pageTitle = "";
        this.splitViewScenario.secondaryArea = 60;
        switch (event.value) {
            case 0:
                this.target = 1;
                this.pageTitle ="Edit Scenario"
                this.editScenario();
                break;
            case 1:
                this.showSlide = false;
                this.createMoveProject();
                break;
            case 2:
                this.target = 2;
                this.pageTitle = "Scenario Drawings";
                this.splitViewScenario.secondaryArea = 79;
                this.scenarioDrawings();
                break;
        }
       
    }

    public editScenario() {
        var contextObj = this;            
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Scenario", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            if (this.inputItems.rowData.StatusId == "1") {
                this.employeeService.loadEditScenario(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    //resultData["Data"].find(function (item) {
                    //    if(item.FieldId =)
                    //})
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                })
                contextObj.splitViewScenario.showSecondaryView = !contextObj.splitViewScenario.showSecondaryView;
            }
            else {
                this._notificationService.ShowToaster("Scenario is not active", 2);
            }
        }
    }

    createMoveProject() {
        var contextObj = this;     
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Scenario", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            switch (this.inputItems.rowData.StatusId) {
                case 1:
                    contextObj.showSlide = true;
                    break;
                case 30:
                    this._notificationService.ShowToaster("Move Project is already created", 2);
                    break;
                default:
                    this._notificationService.ShowToaster("Select an Active Scenario", 2);
                    break; 
            }           
        }
    }

   
    convertToMovePrjtClick(event: any) {
        var contextObj = this;
        var PageTarget;
        var rptArray = new Array<ReportFieldArray>();
        rptArray.push({
            ReportFieldId: 907,
            Value: this.inputItems.selectedIds[0]
        });
        this.employeeService.convertScenarioToMoveProject(JSON.stringify(rptArray)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.refreshgrid = [];
                contextObj.showSlide = !contextObj.showSlide;
                contextObj._notificationService.ShowToaster("Scenario is converted to Move Project", 3);
                contextObj.dataLoad(0, contextObj);
               // contextObj.ChangeStatus(contextObj);
                
            } else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        })
        
    }
    ChangeStatus(context) {
        context.itemSource.find(function (item) {
            if (item.Id == context.inputItems.selectedIds[0]) {
                item.Status = "Move Project Created";
                item.StatusId = "30";
                context.refreshgrid = context.refreshgrid.concat([true]);
                return true;
            } else return false;
            
        })
    }
    cancelClick(value: any) {     
        this.showSlide = value.value;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }


    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);     
        this.refreshgrid = this.refreshgrid.concat([true]);
        this.splitViewScenario.showSecondaryView = !this.splitViewScenario.showSecondaryView;
    }
    scenarioDrawings() {             
        switch (this.selectedTab) {
            case 0: 
                this.scenarioDrawingGrid();
             break;
            case 1: 
                /*code block for Open Drawing*/
             break;
        }
    }

    scenarioDrawingGrid() {
        var contextObj = this;
        contextObj.target = 2;
        contextObj.selectedScenarioId = contextObj.inputItems.rowData.Id;     
        contextObj.strScenarioName = contextObj.inputItems.rowData["Scenario Name"];
        if (contextObj.selectedScenarioId != null) {
            contextObj.splitViewScenario.showSecondaryView = true;
        }
    }

   
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}