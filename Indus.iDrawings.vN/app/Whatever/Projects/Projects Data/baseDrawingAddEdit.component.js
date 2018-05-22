var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var projects_service_1 = require('../../../Models/Projects/projects.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var BaseDrawingAddEditComponent = (function () {
    function BaseDrawingAddEditComponent(projectService, notificationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    BaseDrawingAddEditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.action == "add" || this.action == "revise" || this.action == "replace") {
            this.btnName = "Upload";
        }
        else if (this.action == "edit")
            this.btnName = "Update";
    };
    BaseDrawingAddEditComponent.prototype.onSubmitData = function (event) {
        console.log('add event', event);
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
                    }
                    else if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Base Drawing uploaded", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: false });
                    }
                    else if (contextObj.success["StatusId"] == 0)
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
                    console.log('success edit', contextObj.success);
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
                    }
                    else if (contextObj.success["StatusId"] == 1) {
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
                    }
                    else if (contextObj.success["StatusId"] == 1) {
                        contextObj.notificationService.ShowToaster("Drawing replaced", 3);
                        //contextObj.checkXref(resultData, function () {
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: true });
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
    };
    BaseDrawingAddEditComponent.prototype.addFloorFileDetails = function (fieldobject, filedata) {
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
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
    };
    BaseDrawingAddEditComponent.prototype.editFloorFileDetails = function (fieldobject) {
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 1011 || jsonobject[i]["ReportFieldId"] == 1013 || jsonobject[i]["ReportFieldId"] == 1012) {
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
    };
    BaseDrawingAddEditComponent.prototype.floorreviseFileDetails = function (fieldobject, filedata) {
        //////debugger
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 1002) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaseDrawingAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaseDrawingAddEditComponent.prototype, "submitSuccess", void 0);
    BaseDrawingAddEditComponent = __decorate([
        core_1.Component({
            selector: 'basedrawing-add-edit',
            templateUrl: './app/Views/Projects/Projects Data/project-data-add-edit.html',
            providers: [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'btnName', 'fieldDetailsAdd', 'projectId', 'rowData'],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], BaseDrawingAddEditComponent);
    return BaseDrawingAddEditComponent;
}());
exports.BaseDrawingAddEditComponent = BaseDrawingAddEditComponent;
//# sourceMappingURL=baseDrawingAddEdit.component.js.map