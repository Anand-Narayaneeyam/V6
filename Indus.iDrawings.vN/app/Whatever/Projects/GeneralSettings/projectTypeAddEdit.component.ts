import { ViewEncapsulation, Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import {ProjectsService} from '../../../models/projects/projects.service'
@Component({
    selector: 'projectType-addedit',
    templateUrl: './app/Views/Projects/GeneralSettings/projectTypeAddEdit.component.html',

    providers: [ProjectsService, NotificationService, AdministrationService, GeneralFunctions],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd'],
    encapsulation: ViewEncapsulation.None
})

export class ProjectTypeAddEditComponent {
    fieldDetailsAdd: IField;
    dataKey: string = "Id";
    btnName: string;
    action: string;
    success: any;
    @Output() submitSuccess = new EventEmitter();
    selectedId: number;

    constructor(private projectService: ProjectsService, private notificationService: NotificationService) { }

    ngOnInit() {
        if (this.action == "add")
            this.btnName = "Save";
        else
            this.btnName = "Save Changes";
    }
    onSubmitData(event) {
        debugger
        var contextObj = this;
        var jsonobjectnew = [];
        var fieldobject = JSON.parse(event["fieldobject"]);
        for (var i = 0; i < fieldobject.length; i++) {
            if (fieldobject[i].ReportFieldId == 1064)
                jsonobjectnew.push(fieldobject[i]);
        }
        console.log('submit event', event)
        if (this.action == "add") {
            this.projectService.insertProjectType(JSON.stringify(jsonobjectnew)).subscribe(function (resultData) {
                contextObj.success = resultData["Data"];
                //  contextObj.checkXref(resultData, function () {
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Project Type added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"] });
                } else if (contextObj.success["StatusId"] == 0)
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj.notificationService.ShowToaster("Project Type already exists", 5);
                    }
                }
            })
        }
        else if (this.action == "edit") {
            this.projectService.updateProjectType(JSON.stringify(jsonobjectnew), this.selectedId).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Project Type updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"] });

                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj.notificationService.ShowToaster("Project Type already exists", 5);
                    }
                }
            })
        }
    }
}
