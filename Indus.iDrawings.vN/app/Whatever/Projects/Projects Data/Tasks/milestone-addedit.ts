import { Component, AfterViewInit, Output, EventEmitter,OnInit } from '@angular/core';
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
import { StringTextBoxComponent } from '../../../../../app/Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';

@Component({
    selector: 'milestone-addedit',
    templateUrl: './app/Views/Projects/Projects Data/Tasks/milestone-addedit.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['fieldMilestoneAddEdit', 'btnName', 'taskId', 'action', 'selectedId','taskRowData','milestoneRowData']
})


export class MilestoneAddEditComponent {

    fieldMilestoneAddEdit: IField[];
    btnName: string;
    projectId: number;
    @Output() submitSuccess = new EventEmitter();
    selectedId: number;
    action: string;
    taskId: number;
    taskRowData: any;
    milestoneRowData: any;
    constructor(private projService: ProjectsService, private notificationService: NotificationService) { }

    OnInit() {



        debugger

    }

    onSubmitData(event) {

        debugger
        var context = this;
        event.fieldobject = JSON.parse(event.fieldobject);
        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1025) {
                return item.Value = this.taskId.toString();
            }
        });

        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1028) {
                return item.Value = "1";
            }
        });

        debugger

        if (context.action == "add") {
            context.projService.insertMilestone(JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Milestone added", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Milestone already exists", 1);
                        }
                }

            });
        } else if (context.action == "edit") {

            

            let mileExpFinishDate= event.fieldobject.find(function (item) {
                if (item.ReportFieldId ==1029) {
                    return item;
                }
            });

            let mileActFinishDate = event.fieldobject.find(function (item) {
                if (item.ReportFieldId == 1030) {
                    return item;
                }
            });

            let taskExpStartDate = context.taskRowData['Expected Start Date'];
            let taskExpEndDate = context.taskRowData['Expected End Date'];

            debugger

            if (mileExpFinishDate.Value != "" && taskExpStartDate != "" && mileExpFinishDate.Value!=undefined) {
                taskExpStartDate = new Date(taskExpStartDate);
                mileExpFinishDate = new Date(mileExpFinishDate.Value);
                if (mileExpFinishDate < taskExpStartDate) {
                    this.notificationService.ShowToaster("Milestone Expected Finish Date must be greater than or equal to Expected Start Date of Task", 5);
                    return;
                }
            }

            if (mileActFinishDate.Value != "" && taskExpEndDate != "" && mileActFinishDate.Value != undefined) {
                mileActFinishDate = new Date(mileActFinishDate.Value);
                taskExpEndDate = new Date(taskExpEndDate);
                if (mileActFinishDate > taskExpEndDate) {
                    this.notificationService.ShowToaster("Milestone Actual Finish Date must be less than or equal to Expected End Date of Task", 5);
                    return;
                }
            }

            debugger

            this.projService.updateMilestone(context.selectedId, JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Milestone updated", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Milestone already exists", 1);
                        }
                }
            });

        }
    }
}