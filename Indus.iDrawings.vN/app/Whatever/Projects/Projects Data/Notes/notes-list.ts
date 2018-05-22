import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { ProjectsService } from '../../../../Models/Projects/projects.service';
import { NotesAddEditComponent  } from './notes-addedit'

@Component({
    selector: 'notes-list',
    templateUrl: './app/Views/Projects/Projects Data/Notes/notes-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent,
        GridComponent, PagingComponent, FieldComponent,
        SlideComponent, NotesAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, ProjectsService],
    inputs: ['projectId', 'projectName']
})


export class NotesListComponent {


    fieldObject: IField[];
    fieldDetailsList: IField[];
    fieldNotesAddEdit: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    enableMenu = [1];
    menuData = [
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
    pageTitle: string;
    selectedId: number = 0;
    showSlide: boolean = false;
    slideTitle: string;
    slideType: string;
    slideMessage: string;
    refreshgrid;
    projectId: number;
    isReview: boolean = false;
    projectName: string;
    projectNameDetails: string;
    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {
        this.getNotesFields();
        this.getNotesList();
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>"
    }

    getNotesFields() {
        var contextObj = this;
        this.projectService.getNotesGridFields().subscribe(function (resultData) {
            debugger
            contextObj.fieldObject = resultData.Data;            
        });
        return;
    }

    getNotesList() {
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
            } else {
                contextObj.notificationService.ShowToaster("No Notes exist", 2);
                contextObj.enableMenu = [1];
            }
        });

        return;

    }

    public onSubMenuChange(event: any) {
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
    }

    addClick() {
        this.splitviewInput.showSecondaryView = true;       
        this.pageTitle = "New Note";
        this.btnName = "Save";
        this.action = "add";
        this.getAddEditFields(this.action, 0);

    }

    editClick() {
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
        debugger
    }

    deleteClick() {

        debugger
        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.showSlide = true;
            context.slideTitle = "iDrawings V6";
            context.slideType = "notification";
            context.slideMessage = "Are you sure you want to delete the selected Note?";
        }

    }


    getAddEditFields(action: string, rowId: number) {

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
                    return item.FieldId === 2957
                })
                projctname.FieldValue = context.projectName;             
            });
        } else if (action == "edit") {
            let selectedId = context.inputItems.selectedIds[0];
            var reportFieldArray = [];
            reportFieldArray.push({
                ReportFieldId: 1043,
                Value: context.projectId.toString(),
            });

            context.projectService.getNotesEdit(selectedId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                context.fieldNotesAddEdit = resultData.Data;

                    var natureRadio = context.fieldNotesAddEdit.find((item) => {
                        return item.FieldId === 3095;
                    });

                    if (natureRadio.FieldValue == "7")
                    {
                        natureRadio.FieldValue = "97";
                    } else if (natureRadio.FieldValue == "1")
                    {
                        natureRadio.FieldValue = "96";

                    }
                    var projctname = context.fieldNotesAddEdit.find(function (item) {
                        return item.FieldId === 2957
                    })
                    projctname.FieldValue = context.projectName;
            });
        }

    }

    public onSort(objGrid: any) {
        this.getNotesList();
    }

    closeSlide(event) {
        this.showSlide = false;
    }

    public onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }

    yesOnClick(event: Event) {

        this.deleteTask();
        this.showSlide = false;
    }
    deleteTask() {
        var context = this;
        context.projectService.deleteNote(context.selectedId).subscribe(function (resultData) {
            debugger
            if (resultData.Data.StatusId == 1) {
                let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
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
            } else {
                switch (resultData.Data.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
        return;
    }

    cancelClick(event: Event) {
        this.showSlide = false;
    }

    submitSuccess(event) {
        debugger
        let retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            debugger
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }

    }

}
