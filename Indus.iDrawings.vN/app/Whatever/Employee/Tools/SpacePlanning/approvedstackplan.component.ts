import {Component, ChangeDetectorRef, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { EmployeeService} from '../../../../Models/Employee/employee.services'
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
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { TabsComponent } from '../../../../Framework/Whatever/Tab/tabs.component';
import { TabComponent } from '../../../../Framework/Whatever/Tab/tab.component';
import { StackPlanDetailsComponent } from './stackplan-details';
import { ViewStacktComponent } from '../viewstack.component';
import { AddEditScenariosComponent } from './addeditscenario.component';

@Component({
    selector: 'approvedstackplan',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/approvedstackplan.component.html',
    directives: [PageComponent, SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, TabsComponent, TabComponent, StackPlanDetailsComponent, ViewStacktComponent, AddEditScenariosComponent],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})

export class ApprovedStackPlanComponent implements OnInit {

    pagePath: string;
    pageTitle: string = "";
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    target: number;
    ProjectId: number;
    StackPlanDetailsId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false };
    fieldObject: any[];
    AddScenarioIField: IField[];
    itemSource: IField[];
    selectedTab: number = 0;
    localselection: number;
    eventAction: string;
    btnName: string;
    isTabOpen = false;
    showSlide = false;
    scenarioSlideText = "";
    showSlideMoveProject = false;
    Position = "top-right";
    splitViewApprovedStackPlan: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    deleteIndex: number;
    menuData = [
        {
            "id": 0,
            "title": "View Stack",
            "image": "View Stack",
            "path": "View Stack",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Show Details",
            "image": "Show Details",
            "path": "Show Details",
            "submenu": null
        },
       
        {
            "id": 2,
            "title": "Create a Scenario",
            "image": "Create a Scenario",
            "path": "Create a Scenario",
            "submenu": null
        },
        
        {
            "id": 3,
            "title": "Convert to Move Project",
            "image": "Convert to Move Project",
            "path": "Convert to Move Project",
            "submenu": null
        }
    ];
    enableMenu = [0, 1, 2,3];
    private rptFieldArray = new Array<ReportFieldArray>();
    refreshgrid;
    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        this.pagePath = "Employees / Approved Stack Plans ";
        var contextObj = this;
        this.employeeService.getApprovedStackPlanListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        })
        contextObj.loadData();
    }

    loadData() {
        
        this.rptFieldArray.push({
            ReportFieldId: 893,
            Value: "20"
        });
        var contextObj = this;
        this.employeeService.postApprovedStackPlanListData(JSON.stringify(this.rptFieldArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Approved Stack Plans exist", 2);
            }
        })
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        this.rptFieldArray = new Array<ReportFieldArray>();
        contextObj.ProjectId = this.inputItems.selectedIds[0];
        this.rptFieldArray.push({
            ReportFieldId: 893,
            Value: contextObj.ProjectId.toString()
        });
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Stack Plan", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2)

        } else {
            if (event.value == 0) /* Convert to Move Project*/ {
               
                this.target = 1;
                this.pageTitle = "Space Assignment Plan";
                this.StackPlanDetailsId;
              
                this.employeeService.getGetApprovedStackPlanforaProject(JSON.stringify(this.rptFieldArray)).subscribe(function (resultData) {
                    if (resultData.Data != undefined) {
                        if (resultData.Data.FieldBinderData != "[]") {
                            if (JSON.parse(resultData.Data.FieldBinderData)[0] != undefined) {
                                contextObj.StackPlanDetailsId = JSON.parse(resultData.Data.FieldBinderData)[0].StackPlanId;
                                contextObj.splitViewApprovedStackPlan.showSecondaryView = !contextObj.splitViewApprovedStackPlan.showSecondaryView;
                            }
                        }
                        else {
                            contextObj._notificationService.ShowToaster("No stack plans exist", 2);
                        }
                    }
                });
            }
            else if (event.value == 1) {
                var contextObj = this;
                this.localselection = 1;
                contextObj.isTabOpen = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 100);
            }

            else if (event.value == 2) // Create Scenario
            {
                this.showSlide = false;
                this.createScenario();
                
            }

            else if (event.value == 3) { /*Convert to Move Project*/
                if (this.inputItems.rowData.Status == "Approved") {
                    if (this.inputItems.rowData.PlannedEmployeeExist == 1) {
                        contextObj._notificationService.ShowToaster("Move locations of all employees should be assigned before converting to Move Project", 2);
                        this.showSlideMoveProject = false;

                    } else {
                       this.GetMoveProjectEmployeeDetails(1);                      
                    }
                }
                else if (this.inputItems.rowData.Status == "Move Project Created") {
                    contextObj._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Executed") {
                    contextObj._notificationService.ShowToaster("Executed Space Planning Project cannot be converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Discarded") {
                    contextObj._notificationService.ShowToaster("Discarded Space Planning Project cannot be converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Scenario Created") {
                    contextObj._notificationService.ShowToaster("Scenario is already created for the selected Stack Plan. Move Project can be created through Scenarios", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.StatusId == 19) {
                    contextObj._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
            }
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;       
        var contextObj = this;
        this.employeeService.postApprovedStackPlanListData(JSON.stringify(this.rptFieldArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Approved Stack Plans exist", 2);
            }
        })
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;

        }
    }

    onTabClose(event: any) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
        contextObj.loadData();
    }

    scenarioOKClick(event: any) {      
        var contextObj = this;   
        contextObj.refreshgrid = [];               
        contextObj.employeeService.convertApprovedStackPlanToScenario(JSON.stringify(this.rptFieldArray)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.itemSource.find(function (item) {
                    if (item["Id"] == contextObj.ProjectId) {
                        item["StatusId"] = 31;
                        item["Status"] = "Scenario Created";
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj._notificationService.ShowToaster("Scenario created for the Approved Stack Plan", 2);
                        return true;
                    } else
                        return false;
                });
                
            } else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }    
            contextObj.showSlide = false;               
        });          
        
    }

    cancelScenarioClick(value: any) {
        var contextObj = this;
        this.showSlide = false;
    }

    PromptConvertToMoveProject(event: any) {
        /*prompt for Creating a Move Project*/
        var contextObj = this;
        this.ProjectId = this.inputItems.selectedIds[0];
        var reportFieldArray = new Array<ReportFieldArray>();
        reportFieldArray.push({
            ReportFieldId: 907,
            Value: this.ProjectId.toString()
        });
        contextObj.refreshgrid = [];      
        this.employeeService.postCreateMoveProject(JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
       
            if (resultData["Data"].StatusId == 1) {
                contextObj.itemSource.find(function (item) {
                    if (item["Id"] == contextObj.ProjectId) {                      
                        item["StatusId"] = 30;
                        item["Status"] = "Move Project Created";
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj._notificationService.ShowToaster("Approved Stack Plan is converted to Move Project", 2);
                        return true;
                    } else
                        return false;
                });         
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });

        this.showSlideMoveProject = false;
    }

    ConvertToMoveProjectcancelClick(value: any) {
        var contextObj = this;
        this.showSlideMoveProject = false;
    }


    closeSlideDialog(value: any) {
        this.showSlide = false;
        this.showSlideMoveProject = false;
    }

    createScenario() {
        var statusId = this.inputItems.rowData.StatusId;
     
        if (statusId == 29) {
            this._notificationService.ShowToaster("Scenarios cannot be created for executed Stack Plans", 2);
        } else if (statusId == 30) {
            this._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
        }  else if(statusId == 28) {
            this._notificationService.ShowToaster("Scenarios cannot be created for discarded Stack Plans", 2);
        } else if (statusId == 19) {
            this._notificationService.ShowToaster("Scenarios cannot be created for Stack Plans in Work Order generated status", 2);
        } else if (this.inputItems.rowData.PlannedEmployeeExist == 1) {
            this._notificationService.ShowToaster("Move locations of all employees should be assigned before creating a Scenario", 2);
        }
        else {
           this.GetMoveProjectEmployeeDetails(2);
         
        }                                    
    }

    GetMoveProjectEmployeeDetails(target) {
        var retData = "";
        var context = this;               
        this.employeeService.postGetMoveProjectDetailBasedOnStatusId(JSON.stringify(context.rptFieldArray), context.pageIndex, "", context.inputItems.sortDir).subscribe(function (resultData) {
            retData = resultData["Data"].FieldBinderData;
            if (retData == "1") {
                if (target == 1) {
                    context.showSlideMoveProject = true;
                } else {                  
                    context.scenarioSlideText ="Are you sure you want to create a Scenario for the selected Stack Plan?" //"Are you sure you want to create a Scenario for the selected " + context.inputItems.rowData["Project Name"] + "?";
                    context.showSlide = true;
                }
            } else {
                context._notificationService.ShowToaster("No Employee Move Details added to the Space Planning Project: " + context.inputItems.rowData["Project Name"], 2);
            }
        });
        return retData;
    }
}
   
    
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}