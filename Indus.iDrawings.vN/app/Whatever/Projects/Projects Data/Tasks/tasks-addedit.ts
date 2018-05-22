import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
    selector: 'tasks-addedit',
    templateUrl: './app/Views/Projects/Projects Data/Tasks/tasks-addedit.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['fieldDetailsAddEdit', 'btnName', 'projectId', 'action', 'selectedId']
})


export class TasksAddEditComponent {

    fieldDetailsAdd: IField[];
    btnName: string;
    projectId: number;
    @Output() submitSuccess = new EventEmitter();
    selectedId: number;
    action: string;
    constructor(private projService: ProjectsService, private notificationService: NotificationService) { }

    onSubmitData(event) {
        var context = this;
        event["fieldobject"] = JSON.parse(event["fieldobject"]);
        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1078) {
                return item.Value = "1";
            }
        });
        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1072){
                return item.Value=context.projectId.toString()
            }
        });

        var endDate = event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1077) {
                return item;
            }
        });
        var startDate = event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1076) {
                return item;
            }
        });
        if (endDate.Value != "" && startDate.Value != "") {
            endDate = new Date(endDate.Value);
            startDate = new Date(startDate.Value);
            if (endDate < startDate) {                
                this.notificationService.ShowToaster("Expected End Date must be greater than or equal to Expected Start Date", 5);
                return;
            }
        }
        if (this.action == "add") {
            this.projService.insertTasks(JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Task added", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Task already exists", 1);
                        }
                }

            });
        } else if (this.action == "edit") {
            var actEndDate = event.fieldobject.find(function (item) {
                if (item.ReportFieldId == 1080) {
                    return item;
                }
            });
            var actStartDate = event.fieldobject.find(function (item) {
                if (item.ReportFieldId == 1079) {
                    return item;
                }
            });
            if (actStartDate.Value != "" && actEndDate.Value != "") {
                actEndDate = new Date(actEndDate.Value);
                actStartDate = new Date(actStartDate.Value);
                if (actEndDate < actStartDate) {
                    this.notificationService.ShowToaster("Actual End Date must be greater than or equal to Actual Start Date", 5);
                    return;
                }
            }
            this.projService.updateTasks(context.selectedId, JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Task updated", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Task already exists", 1);
                        }
                }
            });

        }
    }
}