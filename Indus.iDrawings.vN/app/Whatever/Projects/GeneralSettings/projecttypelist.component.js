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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var projects_service_1 = require('../../../models/projects/projects.service');
var projecttypeaddedit_component_1 = require('./projecttypeaddedit.component');
var ProjectTypeListComponent = (function () {
    function ProjectTypeListComponent(projectService, administrationService, notificationService, generFun) {
        this.projectService = projectService;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 702
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 703
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 704
            }
        ];
        this.refreshgrid = [];
        this.showSlide = false;
    }
    ProjectTypeListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 150, contextObj.administrationService, contextObj.menuData.length);
        this.projectService.getProjectTypeListFields().subscribe(function (resultData) { contextObj.fieldObject = resultData["Data"]; });
        this.dataLoad();
    };
    ProjectTypeListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.projectService.getProjectsTypeListData(this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(function (resultData) {
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0)
                contextObj.enableMenu = [1];
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3];
            }
            //    
        });
    };
    ProjectTypeListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        this.splitviewInput.showSecondaryView = true;
        switch (event.value) {
            case 1:
                this.action = "add";
                this.pageTitle = "New Project Type";
                this.projectService.getProjectTypeAddEditFields(1).subscribe(function (resultField) {
                    contextObj.fieldDetailsAdd = resultField["Data"];
                });
                break;
            case 2:
                this.action = "edit";
                this.pageTitle = "Edit Project Type";
                this.selectedId = this.inputItems.selectedIds[0];
                this.projectService.getProjectTypeAddEditFields(2, this.selectedId).subscribe(function (resultFields) {
                    contextObj.fieldDetailsAdd = resultFields["Data"];
                });
                break;
            case 3:
                this.showSlide = true;
                this.selectedId = this.inputItems.selectedIds[0];
                this.splitviewInput.showSecondaryView = false;
                this.slideMessage = "Are you sure you want to delete the selected Project Type";
                break;
        }
    };
    ProjectTypeListComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    ProjectTypeListComponent.prototype.submitSuccess = function (event) {
        var retUpdatedSrc;
        if (event["status"] == "success") {
            if (event["returnData"]) {
                this.splitviewInput.showSecondaryView = false;
                if (this.action == "add") {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    this.itemsSource = retUpdatedSrc["itemSrc"];
                    if (this.totalItems > 0)
                        this.enableMenu = [1, 2, 3];
                }
                else if (this.action == "edit") {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.refreshgrid = this.refreshgrid.concat([true]);
                }
            }
        }
    };
    ProjectTypeListComponent.prototype.closeSlide = function (event) {
        this.showSlide = false;
    };
    ProjectTypeListComponent.prototype.yesOnClick = function (event) {
        this.deleteProjectType();
    };
    ProjectTypeListComponent.prototype.deleteProjectType = function () {
        var contextObj = this;
        this.showSlide = false;
        this.projectService.deleteProjectType(this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Project Type deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Project Type is in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    ProjectTypeListComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    ProjectTypeListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ProjectTypeListComponent = __decorate([
        core_1.Component({
            selector: 'projectType-list',
            templateUrl: './app/Views/Projects/GeneralSettings/projectTypeList.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, projecttypeaddedit_component_1.ProjectTypeAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, projects_service_1.ProjectsService],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ProjectTypeListComponent);
    return ProjectTypeListComponent;
}());
exports.ProjectTypeListComponent = ProjectTypeListComponent;
//# sourceMappingURL=projecttypelist.component.js.map