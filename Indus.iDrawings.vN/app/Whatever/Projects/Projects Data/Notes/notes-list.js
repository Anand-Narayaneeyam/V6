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
var notes_addedit_1 = require('./notes-addedit');
var NotesListComponent = (function () {
    function NotesListComponent(projectService, notificationService, generFun) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 813
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 814
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 815
            }
        ];
        this.selectedId = 0;
        this.showSlide = false;
        this.isReview = false;
    }
    NotesListComponent.prototype.ngOnInit = function () {
        this.getNotesFields();
        this.getNotesList();
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>";
    };
    NotesListComponent.prototype.getNotesFields = function () {
        var contextObj = this;
        this.projectService.getNotesGridFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData.Data;
        });
        return;
    };
    NotesListComponent.prototype.getNotesList = function () {
        var contextObj = this;
        var reportFieldArray = [];
        reportFieldArray.push({
            ReportFieldId: 1043,
            Value: this.projectId.toString()
        });
        contextObj.projectService.getNotesGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, reportFieldArray).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Notes exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        return;
    };
    NotesListComponent.prototype.onSubMenuChange = function (event) {
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
    NotesListComponent.prototype.addClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "New Note";
        this.btnName = "Save";
        this.action = "add";
        this.getAddEditFields(this.action, 0);
    };
    NotesListComponent.prototype.editClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "Edit Note";
        this.btnName = "Save Changes";
        this.action = "edit";
        this.selectedId = this.inputItems.selectedIds[0];
        if (this.inputItems.rowData['IsReview'] == 1) {
            this.isReview = true;
        }
        if (this.inputItems.rowData['IsReview'] == 0) {
            this.isReview = false;
        }
        this.getAddEditFields(this.action, this.projectId);
        debugger;
    };
    NotesListComponent.prototype.deleteClick = function () {
        debugger;
        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.showSlide = true;
            context.slideTitle = "iDrawings V6";
            context.slideType = "notification";
            context.slideMessage = "Are you sure you want to delete the selected Note?";
        }
    };
    NotesListComponent.prototype.getAddEditFields = function (action, rowId) {
        var context = this;
        var reportFieldLookupArray = [];
        reportFieldLookupArray.push({
            ReportFieldId: 981,
            Value: this.projectId.toString(),
            FieldId: 3069
        });
        if (action == "add") {
            context.projectService.getNotesAdd().subscribe(function (resultData) {
                context.fieldNotesAddEdit = resultData.Data;
                var notesNature = context.fieldNotesAddEdit.find(function (item) {
                    return item.FieldId === 3095;
                });
                notesNature.FieldValue = "97";
                var projctname = context.fieldNotesAddEdit.find(function (item) {
                    return item.FieldId === 2957;
                });
                projctname.FieldValue = context.projectName;
            });
        }
        else if (action == "edit") {
            var selectedId = context.inputItems.selectedIds[0];
            var reportFieldArray = [];
            reportFieldArray.push({
                ReportFieldId: 1043,
                Value: context.projectId.toString(),
            });
            context.projectService.getNotesEdit(selectedId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                context.fieldNotesAddEdit = resultData.Data;
                var natureRadio = context.fieldNotesAddEdit.find(function (item) {
                    return item.FieldId === 3095;
                });
                if (natureRadio.FieldValue == "7") {
                    natureRadio.FieldValue = "97";
                }
                else if (natureRadio.FieldValue == "1") {
                    natureRadio.FieldValue = "96";
                }
                var projctname = context.fieldNotesAddEdit.find(function (item) {
                    return item.FieldId === 2957;
                });
                projctname.FieldValue = context.projectName;
            });
        }
    };
    NotesListComponent.prototype.onSort = function (objGrid) {
        this.getNotesList();
    };
    NotesListComponent.prototype.closeSlide = function (event) {
        this.showSlide = false;
    };
    NotesListComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    NotesListComponent.prototype.yesOnClick = function (event) {
        this.deleteTask();
        this.showSlide = false;
    };
    NotesListComponent.prototype.deleteTask = function () {
        var context = this;
        context.projectService.deleteNote(context.selectedId).subscribe(function (resultData) {
            debugger;
            if (resultData.Data.StatusId == 1) {
                var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Notes exist", 2);
                    context.enableMenu = [1];
                }
                context.notificationService.ShowToaster("Selected Note deleted", 3);
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
    NotesListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    NotesListComponent.prototype.submitSuccess = function (event) {
        debugger;
        var retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            debugger;
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    NotesListComponent = __decorate([
        core_1.Component({
            selector: 'notes-list',
            templateUrl: './app/Views/Projects/Projects Data/Notes/notes-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent,
                grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, notes_addedit_1.NotesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['projectId', 'projectName']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], NotesListComponent);
    return NotesListComponent;
}());
exports.NotesListComponent = NotesListComponent;
//# sourceMappingURL=notes-list.js.map