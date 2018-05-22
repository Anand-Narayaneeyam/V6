var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="teammembers/teammembers-list.component.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var projects_service_1 = require('../../../Models/Projects/projects.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var project_data_add_edit_1 = require('./project-data-add-edit');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var basedrawings_list_component_1 = require('./basedrawings.list.component');
var basedocuments_list_component_1 = require('./base documents/basedocuments.list.component');
var teammembers_list_component_1 = require('./teammembers/teammembers-list.component');
var reviewsorcomments_component_1 = require('./Reviews or Comments/reviewsorcomments.component');
var tasks_list_component_1 = require('./Tasks/tasks-list.component');
var notes_list_1 = require('./Notes/notes-list');
var ProjectsDataList = (function () {
    function ProjectsDataList(projectsService, notificationService, generFun, administrationService) {
        this.projectsService = projectsService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: false, selectioMode: 'single', selectedIds: [0] };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 140 };
        this.target = 0;
        this.enableMenu = [];
        this.gridcount = 8;
        this.projectCategoryId = "";
        this.pagePath = "Projects / Data";
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.projectarget = 0;
        this.innerwidth = 0;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 714
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 714 /* 715 for close */
            },
            {
                "id": 3,
                "title": "Close",
                "image": "Close",
                "path": "Close",
                "submenu": null,
                "privilegeId": 716
            },
            {
                "id": 4,
                "title": "Reopen",
                "image": "Print",
                "path": null,
                "subMenu": null,
                "privilegeId": 717
            },
            {
                "id": 5,
                "title": "Items",
                "image": "Settings",
                "path": "Settings",
                "subMenu": [
                    {
                        "id": 6,
                        "title": "Base Drawings",
                        "image": "Base Drawings",
                        "path": "Base Drawings",
                        "subMenu": null,
                        "privilegeId": 720
                    },
                    {
                        "id": 7,
                        "title": "Base Documents",
                        "image": "Base Documents",
                        "path": "Base Documents",
                        "subMenu": null,
                        "privilegeId": 721
                    },
                    {
                        "id": 9,
                        "title": "Reviews or Comments",
                        "image": "Reviews or Comments",
                        "path": "Reviews or Comments",
                        "subMenu": null,
                        "privilegeId": 724
                    },
                    {
                        "id": 10,
                        "title": "Tasks",
                        "image": "Tasks",
                        "path": "Tasks",
                        "subMenu": null,
                        "privilegeId": 792
                    },
                    {
                        "id": 11,
                        "title": "Notes",
                        "image": "Notes",
                        "path": "Notes",
                        "subMenu": null,
                        "privilegeId": 726
                    }
                ]
            },
            {
                "id": 8,
                "title": "Team Members",
                "image": "Users",
                "path": "Users",
                "subMenu": null,
                "privilegeId": 718
            }
        ];
        this.innerwidth = window.innerWidth - 100;
    }
    ;
    ProjectsDataList.prototype.ngOnInit = function () {
        var contextObj = this;
        //contextObj.administrationService.getSessionData().subscribe(function (data) {
        //    var retData = data["Data"];
        //    var UserRoleId = retData["UserRoleId"]
        //    if (UserRoleId == 4 || UserRoleId == 7 || UserRoleId == 6) {
        //        contextObj.menuData = [
        //            {
        //                "id": 2,
        //                "title": "Edit",
        //                "image": "Edit",
        //                "path": "Edit",
        //                "submenu": null,
        //                "privilegeId": null
        //            },
        //            {
        //                "id": 3,
        //                "title": "Close",
        //                "image": "Close",
        //                "path": "Close",
        //                "submenu": null,
        //                "privilegeId": null
        //            }
        //        ];
        //    }
        //});
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 151, contextObj.administrationService, contextObj.menuData.length);
    };
    ProjectsDataList.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.projectsService.getProjectsFields().subscribe(function (result) {
            var projectCategory = result["Data"].find(function (item) { return item.ReportFieldId === 8258; });
            for (var i = 0; i < projectCategory.LookupDetails.LookupValues.length; i++) {
                if (projectCategory.LookupDetails.LookupValues[i].Value == "General") {
                    projectCategory.FieldValue = projectCategory.LookupDetails.LookupValues[i].Id;
                    contextObj.projectCategoryId = (projectCategory.LookupDetails.LookupValues[i].Id).toString();
                }
            }
            var updatedData = new Array(); /*To notify the watcher about the change*/
            contextObj.ddlAdditionalCharge = result["Data"].splice(0, 1)[0];
            updatedData = updatedData.concat(result["Data"]);
            contextObj.fieldObject = updatedData;
            contextObj.itemsSource = [];
            contextObj.getProjectsData(1);
        });
    };
    ProjectsDataList.prototype.getProjectsData = function (target) {
        var contextObj = this;
        var newTemp = [];
        newTemp.push({
            ReportFieldId: 8258,
            Value: contextObj.projectCategoryId
        });
        this.projectsService.getProjectsData(JSON.stringify(newTemp), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                // contextObj.enableMenu = [1, 2];
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Projects exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    ProjectsDataList.prototype.onChangeProjectCategory = function (event) {
        this.projectCategoryId = event;
        if (Number(event) == 5) {
            this.menuData = [];
            this.menuData = [
                {
                    "id": 2,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 715
                },
                {
                    "id": 3,
                    "title": "Close",
                    "image": "Close",
                    "path": "Close",
                    "submenu": null,
                    "privilegeId": 716
                }
            ];
        }
        else {
            this.menuData = [];
            this.menuData = [
                {
                    "id": 1,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 714
                },
                {
                    "id": 2,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 714 /* 715 for close */
                },
                {
                    "id": 3,
                    "title": "Close",
                    "image": "Close",
                    "path": "Close",
                    "submenu": null,
                    "privilegeId": 716
                },
                {
                    "id": 4,
                    "title": "Reopen",
                    "image": "Print",
                    "path": null,
                    "subMenu": null,
                    "privilegeId": 717
                },
                {
                    "id": 5,
                    "title": "Items",
                    "image": "Settings",
                    "path": "Settings",
                    "subMenu": [
                        {
                            "id": 6,
                            "title": "Base Drawings",
                            "image": "Base Drawings",
                            "path": "Base Drawings",
                            "subMenu": null,
                            "privilegeId": 720
                        },
                        {
                            "id": 7,
                            "title": "Base Documents",
                            "image": "Base Documents",
                            "path": "Base Documents",
                            "subMenu": null,
                            "privilegeId": 721
                        },
                        {
                            "id": 9,
                            "title": "Reviews or Comments",
                            "image": "Reviews or Comments",
                            "path": "Reviews or Comments",
                            "subMenu": null,
                            "privilegeId": 724
                        },
                        {
                            "id": 10,
                            "title": "Tasks",
                            "image": "Tasks",
                            "path": "Tasks",
                            "subMenu": null,
                            "privilegeId": 792
                        },
                        {
                            "id": 11,
                            "title": "Notes",
                            "image": "Notes",
                            "path": "Notes",
                            "subMenu": null,
                            "privilegeId": 726
                        }
                    ]
                },
                {
                    "id": 8,
                    "title": "Team Members",
                    "image": "Users",
                    "path": "Users",
                    "subMenu": null,
                    "privilegeId": 718
                }
            ];
        }
        this.itemsSource = [];
        this.getProjectsData(0);
    };
    ProjectsDataList.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                if (this.inputItems.selectedIds.length == 0) {
                    this.notificationService.ShowToaster("Select a Project", 2);
                }
                else {
                    this.itemsSource;
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Selected Project is closed, cannot be edited ", 2);
                        return;
                    }
                    else
                        this.editClick();
                }
                break;
            case 3:
                if (this.inputItems.selectedIds.length == 0) {
                    this.notificationService.ShowToaster("Select a Project", 2);
                }
                else {
                    this.itemsSource;
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Selected Project is already closed", 2);
                        return;
                    }
                    else {
                        this.index = 1;
                        this.message = "Are you sure you want to close the selected Project?";
                        this.showSlide = !this.showSlide;
                    }
                }
                break;
            case 4:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster("Select a Project", 2);
                else {
                    this.itemsSource;
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Active") {
                        contextObj.notificationService.ShowToaster("Selected Project is already open", 2);
                        return;
                    }
                    else {
                        this.index = 2;
                        this.message = "Are you sure you want to re-open the selected Project?";
                        this.showSlide = true;
                    }
                }
                break;
            case 6:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else {
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 1;
                        this.projectName = this.inputItems.rowData["Project Name"];
                        this.projectId = this.inputItems.selectedIds[0];
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Base Drawings";
                    }
                }
                break;
            case 7:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else {
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 2;
                        this.projectName = this.inputItems.rowData["Project Name"];
                        this.projectId = this.inputItems.selectedIds[0];
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Base Documents";
                    }
                }
                break;
            case 8:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else {
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 3;
                        this.rowdata = this.inputItems.rowData;
                        this.projectId = this.inputItems.selectedIds[0];
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Team Members";
                    }
                }
                break;
            case 9:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger;
                    this.projectarget = 4;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Reviews or Comments";
                }
                break;
            case 10:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger;
                    this.projectarget = 5;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Tasks";
                }
                break;
            case 11:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger;
                    this.projectarget = 6;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Notes";
                }
                break;
        }
    };
    ProjectsDataList.prototype.addClick = function () {
        var contextObj = this;
        this.projectarget = 0;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Project";
        this.projectsService.loadProjectsAddEdit(0, 1).subscribe(function (resultData) {
            //var remiderStartsFrom = resultData["Data"].find(function (item) { return item.ReportFieldId === 500238 })
            //remiderStartsFrom.ReadOnlyMode = true;
            $("#47").attr("disabled", "true");
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].ReportFieldId == 500237 && resultData["Data"][i].FieldId == 1913)
                    resultData["Data"][i].ReadOnlyMode = true;
                if (resultData["Data"][i].ReportFieldId == 1053 && resultData["Data"][i].FieldId == 1911) {
                    for (var j = 0; j < resultData["Data"][i].LookupDetails.LookupValues.length; j++) {
                        if (resultData["Data"][i].LookupDetails.LookupValues[j].Value == "Blocked")
                            resultData["Data"][i].LookupDetails.LookupValues[j].IsChecked = false;
                        else {
                            resultData["Data"][i].LookupDetails.LookupValues[j].IsChecked = true;
                            resultData["Data"][i].FieldValue = resultData["Data"][i].LookupDetails.LookupValues[j].Id;
                        }
                    }
                    resultData["Data"][i].IsEnabled = false;
                }
            }
            var projectCategory = resultData["Data"].find(function (item) { return item.ReportFieldId === 8258; });
            if (Number(contextObj.projectCategoryId) > 0) {
                projectCategory.FieldValue = Number(contextObj.projectCategoryId);
                projectCategory.IsEnabled = false;
                projectCategory.IsMandatory = true;
                projectCategory.IsLocallyValidated = false;
                projectCategory.HasValidationError = true;
            }
            else {
                projectCategory.IsMandatory = true;
                projectCategory.IsLocallyValidated = false;
                projectCategory.HasValidationError = true;
            }
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ProjectsDataList.prototype.editClick = function () {
        this.projectarget = 0;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Project";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.projectsService.loadProjectsAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                for (var i = 0; i < result["Data"].length; i++) {
                    if (result["Data"][i].ReportFieldId == 1053 && result["Data"][i].FieldId == 1911) {
                        if (Number(result["Data"][i].FieldValue) == 1) {
                            result["Data"][i].FieldValue = 46;
                            result["Data"][i].LookupDetails.LookupValues[0].IsChecked = true;
                        }
                        else if (Number(result["Data"][i].FieldValue) == 2) {
                            result["Data"][i].FieldValue = 47;
                            result["Data"][i].LookupDetails.LookupValues[1].IsChecked = true;
                        }
                    }
                }
                var projectCategory = result["Data"].find(function (item) { return item.ReportFieldId === 8258; });
                projectCategory.IsEnabled = false;
                var setReminder = result["Data"].find(function (item) { return item.ReportFieldId === 500236; });
                var setRemiderFlag = setReminder.FieldValue;
                var reminderStartsFrom = result["Data"].find(function (item) { return item.ReportFieldId === 500237; });
                var reminderInterval = result["Data"].find(function (item) { return item.ReportFieldId === 500238; });
                if (setRemiderFlag == true || setRemiderFlag == "true" || setRemiderFlag == "True") {
                    reminderStartsFrom.ReadOnlyMode = false;
                    reminderStartsFrom.IsMandatory = true;
                    reminderStartsFrom.IsLocallyValidated = false;
                    reminderStartsFrom.HasValidationError = true;
                    reminderInterval.IsEnabled = true;
                    reminderInterval.IsMandatory = true;
                    reminderInterval.IsLocallyValidated = false;
                    reminderInterval.HasValidationError = true;
                    setRemiderFlag.FieldValue = "true";
                }
                else if (setRemiderFlag == false || setRemiderFlag == "false" || setRemiderFlag == "False") {
                    reminderStartsFrom.ReadOnlyMode = true;
                    reminderStartsFrom.IsMandatory = false;
                    reminderStartsFrom.IsLocallyValidated = true;
                    reminderStartsFrom.HasValidationError = false;
                    reminderInterval.IsEnabled = false;
                    reminderInterval.IsMandatory = false;
                    reminderInterval.IsLocallyValidated = true;
                    reminderInterval.HasValidationError = false;
                    setRemiderFlag.FieldValue = "false";
                }
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ProjectsDataList.prototype.closeClick = function () {
        var contextObj = this;
        contextObj.refreshgrid = [];
        var newTemp = [];
        if (this.index == 1)
            newTemp.push({
                ReportFieldId: 1053,
                Value: 3
            });
        else
            newTemp.push({
                ReportFieldId: 1053,
                Value: 1
            });
        this.projectsService.updateProjectStatus(JSON.stringify(newTemp), this.inputItems.selectedIds[0]).subscribe(function (result) {
            if (result["Data"].Message == "Success") {
                var itemSelected = contextObj.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                if (contextObj.index == 1) {
                    itemSelected.Status = "Closed";
                    contextObj.notificationService.ShowToaster("Project closed", 2);
                }
                else {
                    itemSelected.Status = "Active";
                    contextObj.notificationService.ShowToaster("Project re-opened", 2);
                }
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 2);
        });
    };
    ProjectsDataList.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getProjectsData(0);
    };
    ProjectsDataList.prototype.onSort = function (objGrid) {
        this.getProjectsData(0);
    };
    ProjectsDataList.prototype.OnSuccessfulSubmit = function (event) {
    };
    ProjectsDataList.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ProjectsDataList.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ProjectsDataList.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.closeClick();
    };
    ProjectsDataList.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ProjectsDataList = __decorate([
        core_1.Component({
            selector: 'projects-list',
            templateUrl: './app/Views/Projects/Projects Data/projects-data-list.html',
            directives: [submenu_component_1.SubMenu, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, dropdownlistcomponent_component_1.DropDownListComponent, project_data_add_edit_1.ProjectsAddEditComponent,
                slide_component_1.SlideComponent, basedrawings_list_component_1.BaseDrawingListComponent,
                basedocuments_list_component_1.BaseDocumentListComponent,
                teammembers_list_component_1.ProjectTeamMemberComponent, reviewsorcomments_component_1.ReviewsORComments,
                tasks_list_component_1.TasksReviewComponent, notes_list_1.NotesListComponent],
            providers: [projects_service_1.ProjectsService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], ProjectsDataList);
    return ProjectsDataList;
}());
exports.ProjectsDataList = ProjectsDataList;
//  8258
//@ProjectCategoryId
//# sourceMappingURL=projects-data-list.js.map