import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ProjectsService} from '../../../models/projects/projects.service'
import {ProjectTypeAddEditComponent} from './projecttypeaddedit.component'

@Component({
    selector: 'projectType-list',
    templateUrl: './app/Views/Projects/GeneralSettings/projectTypeList.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, ProjectTypeAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ProjectsService],
})

export class ProjectTypeListComponent {
    fieldObject: IField[];
    fieldDetailsAdd: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    menuData = [
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
    pageTitle: string;
    selectedId: number;
    enableMenu: any;
    action: string;
    refreshgrid = [];

    slideTitle: string;
    showSlide: boolean = false;
    slideMessage: string;

    constructor(private projectService: ProjectsService, private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 150, contextObj.administrationService, contextObj.menuData.length);
        this.projectService.getProjectTypeListFields().subscribe(function (resultData) { contextObj.fieldObject = resultData["Data"] })
        this.dataLoad();
    }
    dataLoad() {
        var contextObj = this;
        this.projectService.getProjectsTypeListData(this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(function (resultData) {
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0)
                contextObj.enableMenu = [1];
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"])
                contextObj.enableMenu = [1, 2, 3];
            }
            //    
        })
    }
    onSubMenuChange(event) {
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
                })
                break;
            case 3:
                this.showSlide = true;
                this.selectedId = this.inputItems.selectedIds[0]
                this.splitviewInput.showSecondaryView = false;
                this.slideMessage = "Are you sure you want to delete the selected Project Type";
                break;

        }
    }
    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }
    submitSuccess(event) {
        let retUpdatedSrc;
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

    }
    closeSlide(event) {
        this.showSlide = false;
    }
    yesOnClick(event) {
        this.deleteProjectType();
    }
    deleteProjectType() {
        var contextObj = this;
        this.showSlide = false;
        this.projectService.deleteProjectType(this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Project Type deleted", 3);
            } else {
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
        })
    }
    onSort(event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    }
    pageChanged(event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    }
}