/// <reference path="../../space/space data/floor-selection.component.ts" />
import {Component, ChangeDetectorRef, Output, EventEmitter, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PlanningProjectComponent} from './planningproject.component'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component';
import {EmployeeService} from '../../../Models/Employee/employee.services';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ViewStacktComponent} from './viewstack.component';
import { GeneralFunctions} from '../../../Models/Common/General';



@Component({
    selector: 'stack-plans',
    templateUrl: './app/Views/Employee/Tools/stackplans.component.html',
    directives: [TabsComponent, TabComponent, PageComponent, PlanningProjectComponent, FloorSelectionComponent, GridComponent, PageComponent,
        SubMenu, SlideComponent, SplitViewComponent, ViewStacktComponent, PagingComponent],
    providers: [NotificationService, EmployeeService, GeneralFunctions]
})

export class StackPlansComponent {

    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    itemsSource: any[];
    @Input() MoveProjectId;
    @Input() StackPlanId;
    enablePlansMenu = [0, 1, 2,3 ,4];
    @Input() prjstatusId;
    Position = "top-right";
    width = 300;
    change = false;
    showSlide = false;
    showstack: boolean = false;
    selectedIdForStack: number;
    id: any;
    differ: any;
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    fieldObject: IField[];
    pageTitle: string = "Space Assignment Plan";
    stackplansMenu: any[] =
    [
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
        },
        {
            "id": 3,
            "title": "Approve",
            "image": "Approve",
            "path": "Approve",
            "submenu": null
        },
        {
            "id": 4,
            "title": "View Stack",
            "image": "View Stack",
            "path": "View Stack",
            "submenu": null
        }
    ];

    @Output() isApproved = new EventEmitter();
    public fieldobj = new Array<ReportFieldArray>();
    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {

    }

    ngAfterViewInit() {
        var contextObj = this;

        var stackplansMenuDl = this.stackplansMenu.filter(function (el) {
            if (contextObj.prjstatusId != 1) {
                if (el["title"] == "View Stack")
                    return true;
                else
                    return false
            }
            else {
              if (el["title"] != "View Stack")
                    return true;
              else
                  return false
            }
        });
        this.stackplansMenu = stackplansMenuDl;
        this.employeeService.getStackPlansListField().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        contextObj.fieldobj.push({
            ReportFieldId: 8972,
            Value: this.MoveProjectId
        }, {
                ReportFieldId: 8971,
                Value: this.StackPlanId
            });
        this.dataLoad(1, contextObj);  
       
    }

    updatePlanningMenu(event: any)
    {
        this.showstack = false;
        switch (event.value) {
            case 0:                                                                                                                                                                                                                                                      
              
                this.selectedIdForStack = 0;                         
                this.addEditStack();
                break;
            case 1:
                this.selectedIdForStack = this.inputItems.selectedIds[0];              
                this.addEditStack();
                break;
            case 2: {
                this.deleteStackPlan();
                break;
            }
            case 3: {
                this.approveStackPlan();
                break;
            }
            case 4: {
                this.selectedIdForStack = this.inputItems.selectedIds[0];
                this.addEditStack();
                break;
            }
        }
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

    public dataLoad(target?: number, context?: any) {
        context.employeeService.getStackPlansListData(context.fieldobj,context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
            if (context.generFun.checkForUnhandledErrors(result)) {
                context.totalItems = result["Data"]["DataCount"];

                if (context.totalItems == 0) {
                    context._notificationService.ShowToaster("No Stack Plans exist", 2);
                    if (context.prjstatusId == 1) {
                        context.enablePlansMenu = [0];
                    }
                    else {
                        context.enablePlansMenu = [4];
                    }

                } else {
                    context.itemsSource = JSON.parse(result["Data"]["FieldBinderData"]);
                    context.itemsPerPage = result["Data"]["RowsPerPage"];
                }
            }
        });
    }


    addEditStack() {
        this.showstack = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    saveStackRow(event) {      
        let retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, event["actionName"], event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);              
        this.itemsSource = retUpdatedSrc["itemSrc"];
        if (event["actionName"] == "add") {
            this.totalItems = retUpdatedSrc["itemCount"];
            this.enablePlansMenu = [0, 1, 2, 3];
        }     
        this.showstack = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    deleteStackPlan()
    {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2)
        }
        else {
            contextObj.menuDeleteClick();     
        }
    }

    approveStackPlan() {

        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2)
        }
        else {
            var fieldobj1 = new Array<ReportFieldArray>();
            fieldobj1.push({
                ReportFieldId: 8972,
                Value: this.MoveProjectId
            },{
                    ReportFieldId: 8971,
                    Value: this.inputItems.selectedIds[0]
                });
            this.employeeService.approveStackPlans(fieldobj1, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {                 
                    contextObj.employeeService.getStackPlansListData(contextObj.fieldobj, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj._notificationService.ShowToaster("Selected Stack Plan approved", 3);
                        contextObj.stackplansMenu =[
                                {
                                    "id": 4,
                                    "title": "View Stack",
                                    "image": "View Stack",
                                    "path": "View Stack",
                                    "submenu": null
                                }
                        ];
                        contextObj.enablePlansMenu = [4];
                        contextObj.prjstatusId = 27;
                    });
                    contextObj.isApproved.emit({ "approved": true})
                   
                }
                else
                {
                    contextObj._notificationService.ShowToaster(resultData["Data"].Message, 2)
                }
            });
        }    
    }

    okDelete($event) {
        var contextObj = this;
        this.employeeService.deleteStackPlans(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {  
                           
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems == 0) {
                        contextObj.enablePlansMenu = [0];
                    }
                    contextObj._notificationService.ShowToaster("Selected Stack plan deleted", 3);
                }          
        });
        this.showSlide = !this.showSlide;
    }

    public menuDeleteClick() {
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    cancelClick(value: any) {
        this.showSlide = value.value;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}