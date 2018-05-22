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
    selector: 'notes-addedit',
    templateUrl: './app/Views/Projects/Projects Data/Notes/notes-addedit.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['fieldNotesAddEdit', 'btnName', 'projectId', 'action', 'selectedId']
})


export class NotesAddEditComponent {

    fieldNotesAddEdit: IField[];
    btnName: string;
    projectId: number;
    @Output() submitSuccess = new EventEmitter();
    selectedId: number;
    action: string;
    constructor(private projService: ProjectsService, private notificationService: NotificationService) { }

    ngOnInit() {

        debugger
    }

    onSubmitData(event) {
        var context = this;
        event["fieldobject"] = JSON.parse(event["fieldobject"]);
        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1043) {
                return item.Value = context.projectId
            }
        });

        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1044 && item.Value=="97") {
                return item.Value = "7"
            }
        });

        event.fieldobject.find((item) => {
            if (item.ReportFieldId == 1044 && item.Value == "96") {
                return item.Value = "1"
            }
        });

        debugger
        
        if (this.action == "add") {
            this.projService.insertNotes(JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Note added", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Note already exists", 1);
                        }
                }

            });
        } else if (this.action == "edit") {

            this.projService.updateNotes(context.selectedId, JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger
                switch (resultData.Data.StatusId) {

                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Note updated", 3);
                        debugger
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Note already exists", 1);
                        }
                }
            });

        }
    }
}