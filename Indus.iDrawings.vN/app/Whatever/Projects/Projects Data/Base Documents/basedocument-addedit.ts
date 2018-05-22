import {Component, Output, EventEmitter, Input, OnInit, DoCheck} from '@angular/core';
import { ProjectsService } from '../../../../Models/Projects/projects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'basedocument-add-edit',
    templateUrl: './app/Views/Projects/Projects Data/Base Documents/basedocument-addedit.html',
    providers: [ProjectsService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'btnName', 'fieldDetailsAdd', 'projectId', 'rowData'],
})

export class BaseDocumentAddEditComponent {

    dataKey: string = "BaseDocumentId";
    selectedId: number;
    fieldDetailsAdd: IField[];
    retItem: IField;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    btnName: string;
    projectId: number;
    success: any;
    rowData: any;

    constructor(private projectService: ProjectsService, private notificationService: NotificationService) { }
    ngOnInit() {
        var contextObj = this;
        if (this.action == "add" || this.action == "revise" || this.action == "replace") {
            this.btnName = "Upload";
        }
        else if (this.action == "edit")
            this.btnName = "Update";
    }
    onSubmitData(event) {
        console.log('event from base document add edit', event)
        switch (this.action) {
            case "add":
                this.postsubmit(event, 1);
                break;
            case "edit":
                this.postsubmit(event, 2);
                break;
            case "revise":
                this.postsubmit(event,3)
                break;
            case "replace":
                this.postsubmit(event,4)
                break;
        }

    }
    processfieldObject(event) {
        console.log(this.rowData)
        var jsonobjectnew = [];
        var fileobject;
        var jsonobject = JSON.parse(event["fieldobject"]);
        if (event["filedata"])
            fileobject = JSON.parse(event["filedata"]);
        if (jsonobject) {
            for (let i = 0; i < jsonobject.length; i++) {
                jsonobjectnew.push(jsonobject[i]);
            }
            if (fileobject)
                jsonobjectnew.push({
                    ReportFieldId: 991,
                    Value: fileobject.FileSize.toString()
                })
            jsonobjectnew.push({
                ReportFieldId: 995,
                Value: this.projectId.toString()
            })
            if (this.action == "revise" || this.action=="replace")
                jsonobjectnew.push({
                    ReportFieldId: 989,
                    Value: this.rowData["LatestRevisionNo"]
                })
        }
        return jsonobjectnew
    }
    postsubmit(event, target) {
        var contextObj = this;
        this.projectService.SubmitBaseDocuments(JSON.stringify(contextObj.processfieldObject(event)), event["filedata"], contextObj.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData;

            switch (resultData.StatusId) {
                case -1:
                    contextObj.notificationService.ShowToaster("Base Document already exists", 5);
                    break;
                case -3:
                    contextObj.notificationService.ShowToaster("File Type is not matching", 5);
                    break;
                case -4:
                    contextObj.notificationService.ShowToaster("Select a valid File", 5);
                    break;
                case 1:
                    if (target == 1) {
                        // contextObj.getCustomerSubscribedFeatures1(contextObj);
                        //if (contextObj.DocId > 0) {
                        contextObj.notificationService.ShowToaster("Base Document uploaded", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                        //  }
                    }
                    else if (target == 2) {
                        contextObj.notificationService.ShowToaster("Base Document updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 3) {
                        contextObj.notificationService.ShowToaster("Base Document revised", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 4) {
                        contextObj.notificationService.ShowToaster("Base Document replaced", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
            }

        })
    }
}