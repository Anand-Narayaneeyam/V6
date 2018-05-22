import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { ProjectsService } from '../../../../Models/Projects/projects.service';
import { MilestoneAddEditComponent } from '../Tasks/milestone-addedit';


@Component({
    selector: 'milestone-list',
    templateUrl: './app/Views/Projects/Projects Data/Tasks/milestone-list.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent,
        GridComponent, PagingComponent, FieldComponent,
        SlideComponent, MilestoneAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['taskId', 'taskName','taskRowData']
})


export class MilestoneListComponent {


    fieldObject: IField[];
    fieldDetailsList: IField[];
    fieldMilestoneAddEdit: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewMileStone: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    milestoneAddEdit: boolean = false;
    enableMenu = [1];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 804
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 805
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 806
        }

    ];
    pageTitle: string;
    selectedId: number = 0;
    showSlide: boolean = false;
    slideTitle: string;
    slideType: string;
    slideMessage: string;
    refreshgrid;
    taskId: number;
    isReview: boolean = false;
    taskName: string;
    taskNameDetails: string;
    milestoneRowData: any;
    taskRowData: any;
    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {        
        this.getMilestoneFields();
        this.getMilestoneList();
        this.taskNameDetails = "Task Name: " + "<b>" + this.taskName + "</b>"
        debugger
    }

    
    getMilestoneFields() {
        var contextObj = this;
        this.projectService.getMilestoneFields().subscribe(function (resultData) {
            debugger
            contextObj.fieldObject = resultData.Data;            
        });
        return;
    }

    getMilestoneList() {
        var contextObj = this;
        contextObj.action = "list";
        var reportFieldArray = [];
        reportFieldArray.push({
            ReportFieldId: 1025,
            Value: this.taskId.toString()
        });


        debugger
        contextObj.projectService.getMileStoneGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, reportFieldArray).subscribe(function (resultData) {
            debugger
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {

                contextObj.enableMenu = [1, 2, 3];
            } else {
                contextObj.notificationService.ShowToaster("No Milestones exist", 2);
                contextObj.enableMenu = [1];
            }
        });

        return;

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

    addClick() {
        debugger
        this.splitviewMileStone.showSecondaryView = true;
        this.pageTitle = "New Milestone";
        this.btnName = "Save";
        this.action = "add";
        this.milestoneAddEdit = true;
        this.getAddEditFields();
    }

    editClick() {
        debugger
        this.splitviewMileStone.showSecondaryView = true;
        this.pageTitle = "Edit Milestone";
        this.btnName = "Save Changes";
        this.action = "edit";
        this.milestoneAddEdit = true;
        this.selectedId = this.inputItems.selectedIds[0];        
        this.getAddEditFields();        
    }

    deleteClick() {

        debugger
        var context = this;
        context.milestoneAddEdit = false;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.showSlide = true;
            context.slideTitle = "iDrawings V6";
            context.slideType = "notification";
            context.slideMessage = "Are you sure you want to delete the selected Milestone?";
        }

    }
    getAddEditFields() {

        var context = this;       
        if (context.action == "add") {
            context.projectService.getMileStoneAddFields().subscribe(function (resultData) {
                context.fieldMilestoneAddEdit = resultData.Data;
                context.fieldMilestoneAddEdit = context.fieldMilestoneAddEdit.filter((item) => {
                    return item.FieldId != 3083;
                }); 
                           
            });
        } else if (context.action == "edit") {
            context.milestoneRowData = context.inputItems.rowData;
            var reportFieldArray = [];
            reportFieldArray.push({
                ReportFieldId: 1025,
                Value: this.taskId.toString()
            });
            let selectedId = context.inputItems.selectedIds[0];
            context.projectService.getMileStoneEditFields(selectedId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                context.fieldMilestoneAddEdit = resultData.Data;               
            });
        }

    }

    public onSort(objGrid: any) {
        this.getMilestoneList();
    }

    closeSlide(event) {
        this.showSlide = false;        
    }

    public onSplitViewClose(event) {
        this.splitviewMileStone.showSecondaryView = false;
        this.milestoneAddEdit = false;
    }

    yesOnClick(event: Event) {

        this.deleteTask();
        this.showSlide = false;
    }
    deleteTask() {
        var context = this;
        context.projectService.deleteMilestone(context.selectedId).subscribe(function (resultData) {
            debugger
            if (resultData.Data.StatusId == 1) {
                let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Milestone exist", 2);
                    context.enableMenu = [1];
                }

                context.notificationService.ShowToaster("Selected Milestone deleted", 3);
            } else {
                switch (resultData.Data.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
        return;
    }

    cancelClick(event: Event) {
        this.showSlide = false;
    }

    submitSuccess(event) {
        debugger
        let retUpdatedSrc;
        var context = this;
        context.splitviewMileStone.showSecondaryView = false;
        context.milestoneAddEdit = false;
        context.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }

    }

}
