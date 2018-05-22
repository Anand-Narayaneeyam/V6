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
var MilestoneAddEditComponent = (function () {
    function MilestoneAddEditComponent(projService, notificationService) {
        this.projService = projService;
        this.notificationService = notificationService;
        this.submitSuccess = new core_1.EventEmitter();
    }
    MilestoneAddEditComponent.prototype.OnInit = function () {
        debugger;
    };
    MilestoneAddEditComponent.prototype.onSubmitData = function (event) {
        var _this = this;
        debugger;
        var context = this;
        event.fieldobject = JSON.parse(event.fieldobject);
        event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1025) {
                return item.Value = _this.taskId.toString();
            }
        });
        event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1028) {
                return item.Value = "1";
            }
        });
        debugger;
        if (context.action == "add") {
            context.projService.insertMilestone(JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger;
                switch (resultData.Data.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Milestone added", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Milestone already exists", 1);
                        }
                }
            });
        }
        else if (context.action == "edit") {
            var mileExpFinishDate = event.fieldobject.find(function (item) {
                if (item.ReportFieldId == 1029) {
                    return item;
                }
            });
            var mileActFinishDate = event.fieldobject.find(function (item) {
                if (item.ReportFieldId == 1030) {
                    return item;
                }
            });
            var taskExpStartDate = context.taskRowData['Expected Start Date'];
            var taskExpEndDate = context.taskRowData['Expected End Date'];
            debugger;
            if (mileExpFinishDate.Value != "" && taskExpStartDate != "" && mileExpFinishDate.Value != undefined) {
                taskExpStartDate = new Date(taskExpStartDate);
                mileExpFinishDate = new Date(mileExpFinishDate.Value);
                if (mileExpFinishDate < taskExpStartDate) {
                    this.notificationService.ShowToaster("Milestone Expected Finish Date must be greater than or equal to Expected Start Date of Task", 5);
                    return;
                }
            }
            if (mileActFinishDate.Value != "" && taskExpEndDate != "" && mileActFinishDate.Value != undefined) {
                mileActFinishDate = new Date(mileActFinishDate.Value);
                taskExpEndDate = new Date(taskExpEndDate);
                if (mileActFinishDate > taskExpEndDate) {
                    this.notificationService.ShowToaster("Milestone Actual Finish Date must be less than or equal to Expected End Date of Task", 5);
                    return;
                }
            }
            debugger;
            this.projService.updateMilestone(context.selectedId, JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger;
                switch (resultData.Data.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Milestone updated", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data.Data });
                        break;
                    case 3:
                        if (resultData.Data.ServerId == "-1") {
                            context.notificationService.ShowToaster("Milestone already exists", 1);
                        }
                }
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MilestoneAddEditComponent.prototype, "submitSuccess", void 0);
    MilestoneAddEditComponent = __decorate([
        core_1.Component({
            selector: 'milestone-addedit',
            templateUrl: './app/Views/Projects/Projects Data/Tasks/milestone-addedit.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['fieldMilestoneAddEdit', 'btnName', 'taskId', 'action', 'selectedId', 'taskRowData', 'milestoneRowData']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], MilestoneAddEditComponent);
    return MilestoneAddEditComponent;
}());
exports.MilestoneAddEditComponent = MilestoneAddEditComponent;
//# sourceMappingURL=milestone-addedit.js.map