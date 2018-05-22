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
var milestone_addedit_1 = require('../Tasks/milestone-addedit');
var MilestoneListComponent = (function () {
    function MilestoneListComponent(projectService, notificationService, generFun) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewMileStone = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.milestoneAddEdit = false;
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 804
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 805
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 806
            }
        ];
        this.selectedId = 0;
        this.showSlide = false;
        this.isReview = false;
    }
    MilestoneListComponent.prototype.ngOnInit = function () {
        this.getMilestoneFields();
        this.getMilestoneList();
        this.taskNameDetails = "Task Name: " + "<b>" + this.taskName + "</b>";
        debugger;
    };
    MilestoneListComponent.prototype.getMilestoneFields = function () {
        var contextObj = this;
        this.projectService.getMilestoneFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData.Data;
        });
        return;
    };
    MilestoneListComponent.prototype.getMilestoneList = function () {
        var contextObj = this;
        contextObj.action = "list";
        var reportFieldArray = [];
        reportFieldArray.push({
            ReportFieldId: 1025,
            Value: this.taskId.toString()
        });
        debugger;
        contextObj.projectService.getMileStoneGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, reportFieldArray).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Milestones exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        return;
    };
    MilestoneListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    MilestoneListComponent.prototype.addClick = function () {
        debugger;
        this.splitviewMileStone.showSecondaryView = true;
        this.pageTitle = "New Milestone";
        this.btnName = "Save";
        this.action = "add";
        this.milestoneAddEdit = true;
        this.getAddEditFields();
    };
    MilestoneListComponent.prototype.editClick = function () {
        debugger;
        this.splitviewMileStone.showSecondaryView = true;
        this.pageTitle = "Edit Milestone";
        this.btnName = "Save Changes";
        this.action = "edit";
        this.milestoneAddEdit = true;
        this.selectedId = this.inputItems.selectedIds[0];
        this.getAddEditFields();
    };
    MilestoneListComponent.prototype.deleteClick = function () {
        debugger;
        var context = this;
        context.milestoneAddEdit = false;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.showSlide = true;
            context.slideTitle = "iDrawings V6";
            context.slideType = "notification";
            context.slideMessage = "Are you sure you want to delete the selected Milestone?";
        }
    };
    MilestoneListComponent.prototype.getAddEditFields = function () {
        var context = this;
        if (context.action == "add") {
            context.projectService.getMileStoneAddFields().subscribe(function (resultData) {
                context.fieldMilestoneAddEdit = resultData.Data;
                context.fieldMilestoneAddEdit = context.fieldMilestoneAddEdit.filter(function (item) {
                    return item.FieldId != 3083;
                });
            });
        }
        else if (context.action == "edit") {
            context.milestoneRowData = context.inputItems.rowData;
            var reportFieldArray = [];
            reportFieldArray.push({
                ReportFieldId: 1025,
                Value: this.taskId.toString()
            });
            var selectedId = context.inputItems.selectedIds[0];
            context.projectService.getMileStoneEditFields(selectedId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                context.fieldMilestoneAddEdit = resultData.Data;
            });
        }
    };
    MilestoneListComponent.prototype.onSort = function (objGrid) {
        this.getMilestoneList();
    };
    MilestoneListComponent.prototype.closeSlide = function (event) {
        this.showSlide = false;
    };
    MilestoneListComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewMileStone.showSecondaryView = false;
        this.milestoneAddEdit = false;
    };
    MilestoneListComponent.prototype.yesOnClick = function (event) {
        this.deleteTask();
        this.showSlide = false;
    };
    MilestoneListComponent.prototype.deleteTask = function () {
        var context = this;
        context.projectService.deleteMilestone(context.selectedId).subscribe(function (resultData) {
            debugger;
            if (resultData.Data.StatusId == 1) {
                var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Milestone exist", 2);
                    context.enableMenu = [1];
                }
                context.notificationService.ShowToaster("Selected Milestone deleted", 3);
            }
            else {
                switch (resultData.Data.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
        return;
    };
    MilestoneListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    MilestoneListComponent.prototype.submitSuccess = function (event) {
        debugger;
        var retUpdatedSrc;
        var context = this;
        context.splitviewMileStone.showSecondaryView = false;
        context.milestoneAddEdit = false;
        context.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    MilestoneListComponent = __decorate([
        core_1.Component({
            selector: 'milestone-list',
            templateUrl: './app/Views/Projects/Projects Data/Tasks/milestone-list.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent,
                grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, milestone_addedit_1.MilestoneAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['taskId', 'taskName', 'taskRowData']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], MilestoneListComponent);
    return MilestoneListComponent;
}());
exports.MilestoneListComponent = MilestoneListComponent;
//# sourceMappingURL=milestone-list.js.map