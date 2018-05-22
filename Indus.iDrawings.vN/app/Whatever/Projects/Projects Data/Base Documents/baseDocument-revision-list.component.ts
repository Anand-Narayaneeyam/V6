import {Component, OnInit, Output, SimpleChange, Input, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import { ProjectsService } from '../../../../Models/Projects/projects.service'
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
import {LabelComponent} from '../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component'

@Component({
    selector: 'base-documentrevision-list',
    templateUrl: './app/Views/Projects/Projects Data/Base Documents/baseDocument-revision-list.component.html',
    providers: [SortHelper, NotificationService, GeneralFunctions],
    inputs: ["projectName", "rowData", "projectId"],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, searchBox, SlideComponent, SplitViewComponent, LabelComponent]

})

export class BaseDocumentRevisionListComponent {

    position = "top-right";
    showSlide = false;
    public totalItems: number = 0;;
    public itemsPerPage: number
    pageIndex: number = 0;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "BaseDocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
    fieldObject: IField[] = [];
    refreshgrid;
    fieldProjectName: IField[];
    fieldtitle: IField[];
    fieldCat: IField[];
    revisionNo: number;
    menuData = [

        {
            "id": 1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 779
        },
        {
            "id": 2,
            "title": "Download",
            "image": "Download",
            "path": "Download",
            "submenu": null,
            "privilegeId": 780
        }
    ]
    projectName: string;
    pageTitle: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    enableMenu: any;
    rowData: any;
    projectId: number;
    drawingDialogMessages = { "key": 0, "message": "" };
    @Output() outrevlist = new EventEmitter();

    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) { }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 158, contextObj.administrationService, contextObj.menuData.length);
        contextObj.projectService.getBaseDocumentFields(589).subscribe(function (resultField) {
            for (var i = 0; i < resultField["Data"].length; i++) {
                switch (resultField["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultField["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName;
                        break;
                    case 996:
                        contextObj.fieldtitle = resultField["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"];
                        break;
                    case 989:
                        resultField["Data"][i].FieldLabel = "Revision No.";
                    case 998:
                    case 990:
                    case 991:
                    case 993:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                }
            }
        })
        this.dataLoad();
    }
    dataLoad() {
        console.log('rowdata in revision list of base document', this.rowData)
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 994,
            Value: this.rowData["BaseDocumentId"]
        });
        this.projectService.getBaseDocumentsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(
            function (data) {
                contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
                contextObj.totalItems = data["Data"]["DataCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster('No Base Documents added', 2);
                    contextObj.enableMenu = []
                }
                else {
                    contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                    contextObj.enableMenu = [1, 2]
                }
            }
        )
    }
    onSubMenuChange(event) {
        this.rowData = this.inputItems.rowData;
        switch (event.value) {
            case 1:
                this.showSlide = true;
                this.drawingDialogMessages.message = "Are you sure you want to delete the selected Document? "
                break;
            
            case 2:
                this.downloadFile();
                break;
        }
    }
    downloadFile() {
        this.revisionNo = undefined
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;

            filename =
                contextObj.inputItems.rowData["File Name"];

            if (contextObj.revisionNo == undefined)
                contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."]


            contextObj.projectService.downloadBaseDocumentFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {

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
    okBaseDrawingDelete(event) {
        this.showSlide = false;
        this.deleteBaseDocument(this.inputItems.rowData["Revision No."]);
    }
    deleteBaseDocument(revisionNo) {
        var contextObj = this;
        this.projectService.postDeleteBaseDocument(589, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["File Name"], "false").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1])
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                        contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Document deleted", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        })
    }
    cancelClick(event) {
        this.showSlide = false
    }
    closeSlideDialog(event) {
        this.showSlide = false
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