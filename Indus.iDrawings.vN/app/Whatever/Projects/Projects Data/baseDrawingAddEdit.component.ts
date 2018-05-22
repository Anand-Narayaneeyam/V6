import {Component, Output, EventEmitter, Input, OnInit, DoCheck} from '@angular/core';
import { ProjectsService } from '../../../Models/Projects/projects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'basedrawing-add-edit',
    templateUrl: './app/Views/Projects/Projects Data/project-data-add-edit.html',
    providers: [ProjectsService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'btnName', 'fieldDetailsAdd', 'projectId','rowData'],
})
export class BaseDrawingAddEditComponent {
    dataKey: string = "Id";
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
        if (this.action == "add" || this.action == "revise" || this.action=="replace") {
            this.btnName = "Upload";
        }
        else if (this.action == "edit")
            this.btnName = "Update";
    }
    onSubmitData(event) {
        console.log('add event', event)
        var contextObj = this;
        switch (contextObj.action) {
            case "add":
                if (event["filedata"]) {
                    var file = "";
                    var fileobject = JSON.parse(event["filedata"]);
                    if (fileobject) {
                        file = fileobject.FileName;
                        if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG") {
                            contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                            return false;
                        }
                    }
                }
                contextObj.projectService.postInsertBaseDrawingwithFile(572, JSON.stringify(contextObj.addFloorFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], 571).subscribe(function (resultData) {
                    contextObj.success = resultData["Data"];
                    //  contextObj.checkXref(resultData, function () {
                    if (contextObj.success.Message == "Invalid File") {
                        contextObj.notificationService.ShowToaster("Select a valid file", 2);
                    } else if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Base Drawing uploaded", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: false });
                    } else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj.notificationService.ShowToaster("Drawing already exists. Use Revise option to add a revision", 5);
                        }
                    }
                    //});                 
                });
                break;
            case "edit":
                contextObj.projectService.postUpdateBaseDrawing(572, JSON.stringify(contextObj.editFloorFileDetails(event["fieldobject"])), contextObj.selectedId, 571).subscribe(function (resultData) {
                    // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);
                    console.log('success edit', contextObj.success)
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Base Drawing details updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: false });

                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        }
                    }

                    //  }
                });
                break;
            case "revise":
                if (event["filedata"]) {
                    var file = "";
                    var fileobject = JSON.parse(event["filedata"]);
                    if (fileobject) {
                        file = fileobject.FileName;
                        if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG") {
                            contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                            return false;
                        }
                    }
                }
                contextObj.projectService.postReviseBaseDrawingAddwithFile(572, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], 571, contextObj.selectedId).subscribe(function (resultData) {
                    // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);
                    if (resultData["Data"].Message == "Invalid File") {
                        contextObj.notificationService.ShowToaster("Select a valid file", 2);
                    } else if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Base Drawing revised", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: true, isRevised: true });

                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                            contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                        }
                    }
                    //   }

                });
                break;
            case "replace":
                if (event["filedata"]) {
                    var file = "";
                    var fileobject = JSON.parse(event["filedata"]);
                    if (fileobject) {
                        file = fileobject.FileName;
                        if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG") {
                            contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                            return false;
                        }
                    }
                }
                contextObj.projectService.postReplaceBaseDrawingAddwithFile(572, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], 571, contextObj.selectedId).subscribe(function (resultData) {
                    // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);



                    if (resultData["Data"].Message == "Invalid File") {
                        contextObj.notificationService.ShowToaster("Select a valid file", 2);
                    } else if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Drawing replaced", 3);
                        //contextObj.checkXref(resultData, function () {
                            contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: true });
                        //});
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                            contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                        }
                    }

                    //  }
                });
                break;
        }
    }

    addFloorFileDetails(fieldobject: any, filedata: any) {
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 1002) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 1003) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);

                }
                else if (jsonobject[i]["ReportFieldId"] == 1010 || jsonobject[i]["ReportFieldId"] == 1011 || jsonobject[i]["ReportFieldId"] == 1014 || jsonobject[i]["ReportFieldId"] == 1013 || jsonobject[i]["ReportFieldId"] == 1012) {

                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        jsonobjectnew.push({
            ReportFieldId: 1010,
            Value: this.projectId.toString()
        });
        jsonobjectnew.push({
            ReportFieldId: 1006,
            Value: "0"
        });
        return jsonobjectnew;
    }
    editFloorFileDetails(fieldobject: any) {
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if ( jsonobject[i]["ReportFieldId"] == 1011 || jsonobject[i]["ReportFieldId"] == 1013 || jsonobject[i]["ReportFieldId"] == 1012) {
                    jsonobjectnew.push(jsonobject[i]);
                }                          
                if (jsonobject[i]["ReportFieldId"] == 1009) {
                    jsonobject[i]["Value"] = this.selectedId.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
            jsonobjectnew.push({
                ReportFieldId: 1010,
                Value: this.projectId.toString()
            });
        }
        return jsonobjectnew;
    }
    floorreviseFileDetails(fieldobject: any, filedata: any) {
        //////debugger
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] ==  1002) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 1003) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 1013) {
                    jsonobjectnew.push(jsonobject[i]);
                }                             
            }
            jsonobjectnew.push({
                ReportFieldId: 1010,
                Value: this.projectId.toString()
            });
            jsonobjectnew.push({
                ReportFieldId: 1006,
                Value: "0"
            });
            jsonobjectnew.push({
                ReportFieldId: 4377,
                Value: this.rowData["Latest Revision No"].toString()
            });


        }
        return jsonobjectnew;
    }
}

