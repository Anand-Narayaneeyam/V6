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
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var projects_service_1 = require('../../../../Models/Projects/projects.service');
var stringtextbox_component_1 = require('../../../../../app/Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var TasksAddEditComponent = (function () {
    function TasksAddEditComponent(projService, notificationService) {
        this.projService = projService;
        this.notificationService = notificationService;
        this.submitSuccess = new core_1.EventEmitter();
    }
    TasksAddEditComponent.prototype.onSubmitData = function (event) {
        var context = this;
        event["fieldobject"] = JSON.parse(event["fieldobject"]);
        event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1078) {
                return item.Value = "1";
            }
        });
        event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1072) {
                return item.Value = context.projectId.toString();
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
                debugger;
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
        }
        else if (this.action == "edit") {
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
                debugger;
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
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TasksAddEditComponent.prototype, "submitSuccess", void 0);
    TasksAddEditComponent = __decorate([
        core_1.Component({
            selector: 'tasks-addedit',
            templateUrl: './app/Views/Projects/Projects Data/Tasks/tasks-addedit.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['fieldDetailsAddEdit', 'btnName', 'projectId', 'action', 'selectedId']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], TasksAddEditComponent);
    return TasksAddEditComponent;
}());
exports.TasksAddEditComponent = TasksAddEditComponent;
//# sourceMappingURL=tasks-addedit.js.map