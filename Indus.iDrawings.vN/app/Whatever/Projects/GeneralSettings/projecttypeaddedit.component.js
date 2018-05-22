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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var General_1 = require('../../../Models/Common/General');
var projects_service_1 = require('../../../models/projects/projects.service');
var ProjectTypeAddEditComponent = (function () {
    function ProjectTypeAddEditComponent(projectService, notificationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    ProjectTypeAddEditComponent.prototype.ngOnInit = function () {
        if (this.action == "add")
            this.btnName = "Save";
        else
            this.btnName = "Save Changes";
    };
    ProjectTypeAddEditComponent.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        var jsonobjectnew = [];
        var fieldobject = JSON.parse(event["fieldobject"]);
        for (var i = 0; i < fieldobject.length; i++) {
            if (fieldobject[i].ReportFieldId == 1064)
                jsonobjectnew.push(fieldobject[i]);
        }
        console.log('submit event', event);
        if (this.action == "add") {
            this.projectService.insertProjectType(JSON.stringify(jsonobjectnew)).subscribe(function (resultData) {
                contextObj.success = resultData["Data"];
                //  contextObj.checkXref(resultData, function () {
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Project Type added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"] });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj.notificationService.ShowToaster("Project Type already exists", 5);
                    }
                }
            });
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
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProjectTypeAddEditComponent.prototype, "submitSuccess", void 0);
    ProjectTypeAddEditComponent = __decorate([
        core_1.Component({
            selector: 'projectType-addedit',
            templateUrl: './app/Views/Projects/GeneralSettings/projectTypeAddEdit.component.html',
            providers: [projects_service_1.ProjectsService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], ProjectTypeAddEditComponent);
    return ProjectTypeAddEditComponent;
}());
exports.ProjectTypeAddEditComponent = ProjectTypeAddEditComponent;
//# sourceMappingURL=projecttypeaddedit.component.js.map