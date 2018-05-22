import {Component, OnInit, Output, SimpleChange, Input, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import { ProjectsService } from '../../../../models/projects/projects.service'
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../../utils/sortHelper'
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../../Framework/Whatever/Search/search.component';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { AdministrationService } from '../../../../Models/Administration/administration.service';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import {BaseDocumentAddEditComponent} from './basedocument-addedit';
import {BaseDocumentRevisionListComponent} from './basedocument-revision-list.component'

@Component({
    selector: 'base-document-list',
    templateUrl: './app/Views/Projects/Projects Data/Base Documents/baseDocuments.list.component.html',
    providers: [SortHelper, ProjectsService, NotificationService, GeneralFunctions],
    inputs: ["projectName", "projectId"],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, searchBox, SlideComponent, SplitViewComponent, BaseDocumentAddEditComponent, BaseDocumentRevisionListComponent]

})

export class BaseDocumentListComponent {

    position = "top-right";
    showSlide = false;
    public totalItems: number = 0;;
    public itemsPerPage: number
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "BaseDocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
    fieldObject: IField[];
    fieldDetailsAdd: IField[];
    public keyWordLookup: any[];
    pageIndex: number = 0;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    advancelookup: IField[];
    KeywordFieldObject: any;
    refreshgrid;
    projectName: string;
    projectId: number;
    projectNameDetails: string;
    selectedId: number;
    revisionNo: number;
    menuData = [{
        "id": 1,
        "title": "Add",
        "image": "Add",
        "path": "Add",
        "submenu": null,
        "privilegeId": 768
    },
        {
            "id": 2,
            "title": "Edit Description",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 769
        },

        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 770
        },
        //{
        //    "id": 4,
        //    "title": "View",
        //    "image": "View",
        //    "path": "View",
        //    "submenu": null,
        //    "privilegeId": 773
        //},
        {
            "id": 5,
            "title": "Revise",
            "image": "Revise",
            "path": "Revise",
            "submenu": null,
            "privilegeId": 771
        },
        {
            "id": 6,
            "title": "Replace",
            "image": "Replace",
            "path": "Replace",
            "submenu": null,
            "privilegeId": 772
        },
        {
            "id": 7,
            "title": "List Revisions",
            "image": "Revisions",
            "path": "Revisions",
            "submenu": null,
            "privilegeId": 775
        },
        {
            "id": 8,
            "title": "Download",
            "image": "Download",
            "path": "Download",
            "submenu": null,
            "privilegeId": 774
        }
    ]
    enableMenu;
    action: string;
    pageTitle: string;
    drawingDialogMessages = { "key": 0, "message": "" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    rowData: any;
    basetarget: number;

    constructor(private projectsService: ProjectsService, private generFun: GeneralFunctions, private administrationService: AdministrationService, private notificationService: NotificationService) { }
    ngOnInit() {
        var context = this;
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>"
        var callBack = function (data) {
            context.menuData = data;
        };
        context.generFun.GetPrivilegesOfPage(context.menuData, callBack, 157, context.administrationService, context.menuData.length);
        this.projectsService.getBaseDocumentFields(581).subscribe(function (resultFields) {
            console.log('result fields in document page', resultFields)
            context.fieldObject = resultFields["Data"];
        })
        this.dataLoad();
    }
    closeSlideDialog(event) {
        this.showSlide = false
    }
    onSubMenuChange(event) {
        this.selectedId = this.inputItems.selectedIds[0];
        this.rowData = this.inputItems.rowData
        this.splitviewInput.showSecondaryView = true;
        var fieldobj = new Array<ReportFieldArray>();
        if (this.selectedId)
            fieldobj.push({ ReportFieldId: 994, Value: this.selectedId.toString() }, { ReportFieldId: 989, Value: "-1" })
        switch (event.value) {
            case 1:
                this.addDocument();
                break;
            case 2:
                this.editDocument(fieldobj);
                break;
            case 3:
                this.splitviewInput.showSecondaryView = false;
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1, "message": "Are you sure you want to delete the selected Base Document? " }
                break;
            case 5:
                this.reviseDocument(fieldobj);
                break;
            case 6:
                this.replaceDocument(fieldobj);
                break;
            case 8:
                this.splitviewInput.showSecondaryView = false;
                this.downloadFile();
                break;
            case 7:
                if (this.inputItems.rowData["Revisions"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No Revisions exist", 2)
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 2;
                    this.pageTitle = "Base Document Revisions";
                }
                break;
        }
    }
    dataLoad() {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 995,
            Value: this.projectId.toString()
        });
        this.projectsService.getBaseDocumentsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(
            function (data) {
                contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
                contextObj.totalItems = data["Data"]["DataCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster('No Base Documents added', 2);
                    contextObj.enableMenu = [1]
                }
                else {
                    contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                    contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8]
                }
            }
        )
    }
    addDocument() {
        var contextObj = this;
        this.action = "add";
        this.basetarget = 1;
        this.pageTitle = "New Base Document"
        this.projectsService.getBaseDocumentAddEditFields(1).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052
            })
            projectName.FieldValue = contextObj.projectName;
            var fileuploadfield = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 990 });
            fileuploadfield.FieldLabel = "File (Provide full path)";
        })
    }
    editDocument(fieldobj) {
        var contextObj = this;
        this.action = "edit";
        this.basetarget = 1;
        this.pageTitle = "Edit Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052
            })
            projectName.FieldValue = contextObj.projectName;

            var docFile = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 990 })
            docFile.IsEnabled = false;
            docFile.FieldLabel = "File (Provide full path)";
            docFile.ReadOnlyMode = true;
        })
    }
    reviseDocument(fieldobj) {
        var contextObj = this;
        var rev = fieldobj.find(function (item) { return item.ReportFieldId === 989 })
        rev.Value = this.inputItems.rowData["LatestRevisionNo"];
        this.action = "revise";
        this.basetarget = 1;
        this.pageTitle = "Revise Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052
            })
            projectName.FieldValue = contextObj.projectName;
            var title = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 996 })
            title.IsEnabled = false;

        })
    }
    replaceDocument(fieldobj) {
        var contextObj = this;
        var rev = fieldobj.find(function (item) { return item.ReportFieldId === 989 })
        rev.Value = this.inputItems.rowData["LatestRevisionNo"];
        this.action = "replace";
        this.basetarget = 1;
        this.pageTitle = "Replace Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052
            })
            projectName.FieldValue = contextObj.projectName;
            var title = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 996 })
            title.IsEnabled = false;

        })
    }
    downloadFile() {
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;

            filename =
                contextObj.inputItems.rowData["File Name"];

       

            if (contextObj.inputItems.rowData["LatestRevisionNo"] != undefined) {
                contextObj.revisionNo = contextObj.inputItems.rowData["LatestRevisionNo"];
            }
            else
                contextObj.revisionNo = 0;

            contextObj.projectsService.downloadBaseDocumentFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {

                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");


                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');

                    var data = contextObj.generFun.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));




                    try {

                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);

                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }

                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);

                        }

                        else {

                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", filename);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }


                    } catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }

    }
    submitSuccess(event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                //this.selectedId = this.inputItems.selectedIds[0];
            }
            else if (this.action == "edit" || this.action == "revise" || this.action == "replace") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    }
    onSplitViewClose(event, target) {
        this.splitviewInput.showSecondaryView = false;
        if (target == 2)
            this.dataLoad();
    }
    okBaseDrawingDelete(event) {
        this.showSlide = false
        switch (event) {
            case 1:
                if (this.inputItems.rowData["Revisions"] > 0) {
                    this.showSlide = true
                    this.drawingDialogMessages = { "key": 2, "message": "Do you want to delete the selected Base Document with all its revisions? " };
                }
                else
                    this.deleteBaseDocument(-1);
                break;
            case 2:
                this.deleteBaseDocument(-1);
                break;
        }
    }
    deleteBaseDocument(revisionno) {
        var contextObj = this;
        this.projectsService.postDeleteBaseDocument(581, this.inputItems.selectedIds, revisionno, this.projectId, this.inputItems.rowData["File Name"], "true").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1])
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    if (revisionno == -1)
                        contextObj.notificationService.ShowToaster("Selected Base Document deleted", 3);
                    else
                        contextObj.notificationService.ShowToaster("Latest revision of the selected Base Document deleted", 3);


                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        })
    }
    cancelClick(event) {
        this.showSlide = false
        switch (event) {
            case 2:
                this.deleteBaseDocument(this.inputItems.rowData["Revisions"])
                break;
        }
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
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}