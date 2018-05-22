import {Component, OnInit, Output, SimpleChange, Input, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import { ProjectsService } from '../../../Models/Projects/projects.service'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../utils/sortHelper'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {LabelComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component'
import {BaseDrawingMarkupListComponent }from './basedrawing-markup-list.component'

@Component({
    selector: 'base-drawingrevision-list',
    templateUrl: './app/Views/Projects/Projects Data/basedrawing-revision-list.component.html',
    providers: [SortHelper, NotificationService, GeneralFunctions],
    inputs: ["projectName", "rowData", "projectId"],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, searchBox, SlideComponent, SplitViewComponent, LabelComponent, BaseDrawingMarkupListComponent]

})

export class BaseDrawingRevisionList {

    position = "top-right";
    showSlide = false;
    public totalItems: number = 0;;
    public itemsPerPage: number
    pageIndex: number = 0;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
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
            "privilegeId": 745
        },
        //{
        //    "id": 2,
        //    "title": "View",
        //    "image": "View",
        //    "path": "View",
        //    "submenu": null,
        //    "privilegeId": 746
        //},


        {
            "id": 3,
            "title": "List Markups",
            "image": "Markups",
            "path": "Markups",
            "submenu": null,
            "privilegeId": 748
        },

        {
            "id": 4,
            "title": "Download",
            "image": "Download",
            "path": "Download",
            "submenu": null,
            "privilegeId": 747
        }
    ]
    projectName: string;
    pageTitle: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    enableMenu: any;
    rowData: any;
    projectId: number;
    drawingDialogMessages = { "key": 0, "message": "" };



    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) { }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 154, contextObj.administrationService, contextObj.menuData.length);
        this.projectService.getBaseDrawingListFormId(576).subscribe(function (resultField) {
            console.log('resultField in base drawing revision list', resultField)
            for (var i = 0; i < resultField["Data"].length; i++) {
                switch (resultField["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultField["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName;
                        break;
                    case 1012:
                        contextObj.fieldtitle = resultField["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"]
                        break;
                    case 1011:
                        contextObj.fieldCat = resultField["Data"][i];
                        contextObj.fieldCat["IsMandatory"] = false;
                        contextObj.fieldCat["FieldValue"] = contextObj.rowData["Category"];
                        break;
                    case 1001:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break
                    case 1013:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                    case 1002:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                    case 1003:
                        resultField["Data"][i].IsVisible = true;
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                    case 5247:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                    case 551:
                        contextObj.fieldObject.push(resultField["Data"][i])
                        break;
                }
            }
        })
        this.dataLoad();
    }
    dataLoad() {
        var contextObj = this;
        this.projectService.getBaseDrawingMarkRevisionListData(576, this.rowData["Id"], this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex, 1, '').subscribe(function (resultData) {
            console.log('resultData', resultData)
            console.log('rowData', contextObj.rowData)
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4];
            }

        })
    }
    onSubMenuChange(event) {
        this.rowData = this.inputItems.rowData;
        switch (event.value) {
            case 1:
                this.showSlide = true;
                this.drawingDialogMessages.message = "Are you sure you want to delete the selected Drawing? "
                break;
            case 3:
                if (this.inputItems.rowData["Markups"] == 0) {
                    this.notificationService.ShowToaster("No markup exists", 2)
                }
                else {
                    this.pageTitle = "Base Drawing Markups";
                    this.splitviewInput.showSecondaryView = true;
                }
                break;
            case 4:
                this.downloadFile();
                break;
        }
    }
    closeSlideDialog(event) {
        this.showSlide = false
    }
    cancelClick(event) {
        this.showSlide = false
    }
    downloadFile() {
        this.revisionNo = undefined
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;

            filename =
                contextObj.inputItems.rowData["DWG File"];

            if (contextObj.inputItems.rowData["Revision No."] != undefined)
                contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
            else
                contextObj.revisionNo = 0;


            contextObj.projectService.downloadFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {

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
        this.deleteBaseDrawing(this.inputItems.rowData["Revision No."]);
    }
    deleteBaseDrawing(revisionNo) {
        var contextObj = this;
        this.projectService.postDeleteBaseDrawing(576, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["DWG File"], "false").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1])
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                        contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Drawing deleted", 3);

                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        })
    }
    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
        this.dataLoad();
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