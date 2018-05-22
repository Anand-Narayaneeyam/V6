/// <reference path="teammembers/teammembers-list.component.ts" />
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { ProjectsService } from '../../../Models/Projects/projects.service'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { ProjectsAddEditComponent } from './project-data-add-edit';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { BaseDrawingListComponent } from './basedrawings.list.component';
import { BaseDocumentListComponent } from './base documents/basedocuments.list.component';
import { ProjectTeamMemberComponent } from './teammembers/teammembers-list.component';
import { ReviewsORComments } from './Reviews or Comments/reviewsorcomments.component';
import { TasksReviewComponent } from './Tasks/tasks-list.component';
import { NotesListComponent } from './Notes/notes-list';

@Component({
    selector: 'projects-list',
    templateUrl: './app/Views/Projects/Projects Data/projects-data-list.html',
    directives: [SubMenu, PageComponent, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, DropDownListComponent, ProjectsAddEditComponent,
        SlideComponent, BaseDrawingListComponent,
        BaseDocumentListComponent,
        ProjectTeamMemberComponent, ReviewsORComments,
        TasksReviewComponent, NotesListComponent],
    providers: [ProjectsService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})


export class ProjectsDataList implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    fieldDetailsAdd1: IField[];
    ddlAdditionalCharge: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: false, selectioMode: 'single', selectedIds: [0] };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 140 };
    action: string;
    btnName: string;
    target: number = 0;
    enableMenu = [];
    gridcount: number = 8;
    projectCategoryId: string = "";
    refreshgrid;

    pagePath: string = "Projects / Data";
    pageTitle: string;

    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    message: string;
    index: number;
    projectarget: number = 0;
    projectName: string;
    projectId: number;
    innerwidth: number = 0;;
    rowdata: any;
    prjStatus: string;
    menuData = [
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
            "privilegeId": 714    /* 715 for close */
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

    constructor(private projectsService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) {
        this.innerwidth = window.innerWidth -100;
    }

    ngOnInit(): void {

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


    }

    ngAfterViewInit() {

        var contextObj = this;
        this.projectsService.getProjectsFields().subscribe(function (result) {


            var projectCategory = result["Data"].find(function (item) { return item.ReportFieldId === 8258 })
            for (let i = 0; i < projectCategory.LookupDetails.LookupValues.length; i++) {
                if (projectCategory.LookupDetails.LookupValues[i].Value == "General") {
                    projectCategory.FieldValue = projectCategory.LookupDetails.LookupValues[i].Id;
                    contextObj.projectCategoryId = (projectCategory.LookupDetails.LookupValues[i].Id).toString();
                }
            }


            var updatedData = new Array();/*To notify the watcher about the change*/
            contextObj.ddlAdditionalCharge = result["Data"].splice(0, 1)[0];
            updatedData = updatedData.concat(result["Data"]);
            contextObj.fieldObject = updatedData;
            contextObj.itemsSource = [];
            contextObj.getProjectsData(1);
        });
    }

    getProjectsData(target?: number) {
        var contextObj = this;

        var newTemp: any[] = [];
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

    }

    onChangeProjectCategory(event: any) {

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
                    "privilegeId": 714    /* 715 for close */
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
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                if (this.inputItems.selectedIds.length == 0) {
                    this.notificationService.ShowToaster("Select a Project", 2);
                } else {
                    this.itemsSource;
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
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
                } else {
                    this.itemsSource;
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
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
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
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
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 1;
                        this.projectName = this.inputItems.rowData["Project Name"];
                        this.projectId = this.inputItems.selectedIds[0]
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Base Drawings"
                    }
                }
                break;
            case 7:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else {
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 2;
                        this.projectName = this.inputItems.rowData["Project Name"];
                        this.projectId = this.inputItems.selectedIds[0]
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Base Documents"
                    }
                }
                break;
            case 8:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else {
                    var itemSelected = this.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
                    if (itemSelected.Status == "Closed") {
                        contextObj.notificationService.ShowToaster("Select an Active project", 2);
                        return;
                    }
                    else {
                        this.projectarget = 3;
                        this.rowdata = this.inputItems.rowData;
                        this.projectId = this.inputItems.selectedIds[0];
                        this.splitviewInput.showSecondaryView = true;
                        this.pageTitle = "Team Members"
                    }
                }
                break;
            case 9:               
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger
                    this.projectarget = 4;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;                    
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Reviews or Comments"
                }
                break;
            case 10:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger
                    this.projectarget = 5;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Tasks"
                }
                break;
            case 11:
                if (this.inputItems.selectedIds.length == 0)
                    this.notificationService.ShowToaster('Select a Project', 2);
                else if (this.inputItems.rowData.Status != "Active")
                    this.notificationService.ShowToaster("Select an Active project", 2);
                else {
                    debugger
                    this.projectarget = 6;
                    this.projectName = this.inputItems.rowData["Project Name"];
                    this.projectId = this.inputItems.selectedIds[0];
                    this.prjStatus = this.inputItems.rowData.Status;
                    this.splitviewInput.showSecondaryView = true;
                    this.pageTitle = "Notes"
                }
                break;
        }
    }

    public addClick() {
        var contextObj = this;
        this.projectarget = 0;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Project";
        this.projectsService.loadProjectsAddEdit(0, 1).subscribe(function (resultData) {


            //var remiderStartsFrom = resultData["Data"].find(function (item) { return item.ReportFieldId === 500238 })
            //remiderStartsFrom.ReadOnlyMode = true;
            $("#47").attr("disabled", "true")

            for (let i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].ReportFieldId == 500237 && resultData["Data"][i].FieldId == 1913)
                    resultData["Data"][i].ReadOnlyMode = true;
                if (resultData["Data"][i].ReportFieldId == 1053 && resultData["Data"][i].FieldId == 1911) {
                    for (let j = 0; j < resultData["Data"][i].LookupDetails.LookupValues.length; j++) {
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

            var projectCategory = resultData["Data"].find(function (item) { return item.ReportFieldId === 8258 })
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
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.projectarget = 0;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Project";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.projectsService.loadProjectsAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {


                for (let i = 0; i < result["Data"].length; i++) {
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

                var projectCategory = result["Data"].find(function (item) { return item.ReportFieldId === 8258 })
                projectCategory.IsEnabled = false;

                var setReminder = result["Data"].find(function (item) { return item.ReportFieldId === 500236 })
                var setRemiderFlag = setReminder.FieldValue;
                var reminderStartsFrom = result["Data"].find(function (item) { return item.ReportFieldId === 500237 })
                var reminderInterval = result["Data"].find(function (item) { return item.ReportFieldId === 500238 })

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
    }

    public closeClick() {
        var contextObj = this;

        contextObj.refreshgrid = [];
        var newTemp: any[] = [];
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
                var itemSelected = contextObj.itemsSource.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] })
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
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getProjectsData(0);
    }

    public onSort(objGrid: any) {
        this.getProjectsData(0);
    }

    OnSuccessfulSubmit(event: any) {
    }

    submitReturn(event) {

        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.closeClick();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
//  8258
//@ProjectCategoryId
