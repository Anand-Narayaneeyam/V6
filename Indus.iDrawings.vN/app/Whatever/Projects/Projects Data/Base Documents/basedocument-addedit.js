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
var projects_service_1 = require('../../../../Models/Projects/projects.service');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../../Models/Common/General');
var BaseDocumentAddEditComponent = (function () {
    function BaseDocumentAddEditComponent(projectService, notificationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.dataKey = "BaseDocumentId";
        this.submitSuccess = new core_1.EventEmitter();
    }
    BaseDocumentAddEditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.action == "add" || this.action == "revise" || this.action == "replace") {
            this.btnName = "Upload";
        }
        else if (this.action == "edit")
            this.btnName = "Update";
    };
    BaseDocumentAddEditComponent.prototype.onSubmitData = function (event) {
        console.log('event from base document add edit', event);
        switch (this.action) {
            case "add":
                this.postsubmit(event, 1);
                break;
            case "edit":
                this.postsubmit(event, 2);
                break;
            case "revise":
                this.postsubmit(event, 3);
                break;
            case "replace":
                this.postsubmit(event, 4);
                break;
        }
    };
    BaseDocumentAddEditComponent.prototype.processfieldObject = function (event) {
        console.log(this.rowData);
        var jsonobjectnew = [];
        var fileobject;
        var jsonobject = JSON.parse(event["fieldobject"]);
        if (event["filedata"])
            fileobject = JSON.parse(event["filedata"]);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                jsonobjectnew.push(jsonobject[i]);
            }
            if (fileobject)
                jsonobjectnew.push({
                    ReportFieldId: 991,
                    Value: fileobject.FileSize.toString()
                });
            jsonobjectnew.push({
                ReportFieldId: 995,
                Value: this.projectId.toString()
            });
            if (this.action == "revise" || this.action == "replace")
                jsonobjectnew.push({
                    ReportFieldId: 989,
                    Value: this.rowData["LatestRevisionNo"]
                });
        }
        return jsonobjectnew;
    };
    BaseDocumentAddEditComponent.prototype.postsubmit = function (event, target) {
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
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaseDocumentAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaseDocumentAddEditComponent.prototype, "submitSuccess", void 0);
    BaseDocumentAddEditComponent = __decorate([
        core_1.Component({
            selector: 'basedocument-add-edit',
            templateUrl: './app/Views/Projects/Projects Data/Base Documents/basedocument-addedit.html',
            providers: [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'btnName', 'fieldDetailsAdd', 'projectId', 'rowData'],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], BaseDocumentAddEditComponent);
    return BaseDocumentAddEditComponent;
}());
exports.BaseDocumentAddEditComponent = BaseDocumentAddEditComponent;
//# sourceMappingURL=basedocument-addedit.js.map