import { Component, AfterViewInit,Output,EventEmitter } from '@angular/core';
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


@Component({
    selector: 'reviews-or-comments-addedit',
    templateUrl: './app/Views/Projects/Projects Data/Reviews or Comments/reviewsorcomments-addedit.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['fieldDetailsAddEdit', 'btnName', 'projectId', 'action', 'selectedId']
})


export class ReviewsORCommentsAddEdit {

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
            if (item.ReportFieldId == 1034) {
                return item.Value = this.projectId;
            }
        });
        event.fieldobject.push({
            ReportFieldId: 995,
            Value: this.projectId
        });

        if (this.action == "add") {
            this.projService.InsertReviewsORComments(JSON.stringify(event["fieldobject"]), event["filedata"]).subscribe(function (resultData) {
                debugger
                switch (resultData.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Review or Comments uploaded", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data });
                        break;
                    case 3:
                        context.notificationService.ShowToaster("Unknown problem", 1);

                }

            });
        } else if (this.action == "edit") {

            this.projService.updateReviewORComments(context.selectedId,JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Review or Comments updated", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data });
                        break;
                    case 3:
                        context.notificationService.ShowToaster("Unknown problem", 1);

                }



            });

          }


    
    }

}