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
import {BaseDrawingAddEditComponent} from './basedrawingaddedit.component'
import {BaseDrawingRevisionList} from './basedrawing-revision-list.component'
import {BaseDrawingMarkupListComponent} from './basedrawing-markup-list.component'
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {OpenDrawing } from '../../common/opendrawing/opendrawing.component';
@Component({
    selector: 'base-drawing-list',
    templateUrl: './app/Views/Projects/Projects Data/BaseDrawings.list.component.html',
    providers: [SortHelper, NotificationService, GeneralFunctions],
    inputs: ["projectName", "projectId"],
    directives: [OpenDrawing,TabsComponent, TabComponent,GridComponent, PagingComponent, PageComponent, SubMenu, searchBox, SlideComponent, SplitViewComponent, BaseDrawingRevisionList, BaseDrawingAddEditComponent, BaseDrawingMarkupListComponent]

})

export class BaseDrawingListComponent {

    position = "top-right";
    showSlide = false;
    public totalItems: number = 0;;
    public itemsPerPage: number
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
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
    drawingId: number;
    revisionNumber: number;
    moduleId: number=2;
    selectedTab: number = 0;
    drawingType: number = 5;
    drawingCategoryId: number = 1;
    viewDrawing: boolean = false;
    pageTarget: number = 1;
    IsOpenDrawingComponentActive: boolean = false
    drawingDetails: any = '[]';
    closeTbFuns: any = undefined;
    objiWhiz: any; // for drawing object
    deleteIndex: number;
    menuData = [{
        "id": 2,
        "title": "Add",
        "image": "Add",
        "path": "Add",
        "submenu": null,
        "privilegeId": 733
    },
        {
            "id": 1,
            "title": "Edit Description",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 734
        },

        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 735
        },
        {
            "id": 4,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null,
            "privilegeId": 738
        },
        {
            "id": 6,
            "title": "Revise",
            "image": "Revise",
            "path": "Revise",
            "submenu": null,
            "privilegeId": 736
        },
        {
            "id": 7,
            "title": "Replace",
            "image": "Replace",
            "path": "Replace",
            "submenu": null,
            "privilegeId": 737
        },
        {
            "id": 8,
            "title": "List Revisions",
            "image": "Revisions",
            "path": "Revisions",
            "submenu": null,
            "privilegeId": 740
        },
        //{
        //    "id": 9,
        //    "title": "List Markups",
        //    "image": "Markups",
        //    "path": "Markups",
        //    "submenu": null,
        //    "privilegeId": 741
        //},
        {
            "id": 11,
            "title": "Download",
            "image": "Download",
            "path": "Download",
            "submenu": null,
            "privilegeId": 739
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
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>"
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 153, contextObj.administrationService, contextObj.menuData.length);
        this.projectsService.getBaseDrawingListFormId(571).subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"]
        })
        this.dataLoad();


    }
    onSubMenuChange(event) {
        var contextObj = this;
        if (event.value!=4)
            this.splitviewInput.showSecondaryView = true;
        this.rowData = this.inputItems.rowData;
        this.selectedId = this.inputItems.selectedIds[0];
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 1001,
            Value: "0"
        });
        switch (event.value) {
            case 2:
                this.action = "add";
                this.basetarget = 1;
                this.pageTitle = "New Base Drawing"
                this.projectsService.getBaseDrawingAddEditFields(1).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052
                    })
                    projectName.FieldValue = contextObj.projectName;
                })
                break;
            case 1:
                this.action = "edit";
                this.basetarget = 1;
                this.pageTitle = "Edit Base Drawing"
                this.projectsService.getBaseDrawingAddEditFields(2, this.selectedId).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052
                    })
                    projectName.FieldValue = contextObj.projectName;
                    var drawingType = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1014 })
                    drawingType.IsEnabled = false;
                    // drawingType.IsMandatory = false;
                    var dwgFile = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1002 })
                    dwgFile.IsEnabled = false;
                    //dwgFile.IsMandatory = false;
                    dwgFile.ReadOnlyMode = true;
                })
                break;
            case 3:
                this.splitviewInput.showSecondaryView = false;
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1, "message": "Are you sure you want to delete the selected Base Drawing? " };
                break;
            case 4:
                this.viewDrawingOnClick();
                break;
            case 6:
                this.action = "revise";
                this.basetarget = 1;
                this.pageTitle = "Revise Base Drawing";
                var rev = fieldobj.find(function (item) { return item.ReportFieldId === 1001 })
                rev.Value = this.inputItems.rowData["Latest Revision No"];
                this.projectsService.getBaseDrawingAddEditFields(3, this.selectedId, fieldobj).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052
                    })
                    projectName.FieldValue = contextObj.projectName;
                    var drawingType = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1014 })
                    drawingType.IsEnabled = false;
                    var drawingCat = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1011 })
                    drawingCat.IsEnabled = false;
                })
                break;
            case 7:
                this.action = "replace";
                this.basetarget = 1;
                this.pageTitle = "Replace Base Drawing";
                var rev = fieldobj.find(function (item) { return item.ReportFieldId === 1001 })
                rev.Value = this.inputItems.rowData["Latest Revision No"];
                this.projectsService.getBaseDrawingAddEditFields(3, this.selectedId, fieldobj).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];

                    for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        switch (contextObj.fieldDetailsAdd[i].ReportFieldId) {
                            case 1052:
                                contextObj.fieldDetailsAdd[i].FieldValue = contextObj.projectName;
                                break;
                            case 1012:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;
                            case 1011:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;
                            case 1001:
                                contextObj.fieldDetailsAdd[i].IsVisible = true;
                                break;
                            case 1014:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;

                        }

                    }
                })
                break;
            case 8:
                if (this.inputItems.rowData["Revisions"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No Revisions exist", 2)
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 2;
                    this.pageTitle = "Base Drawing Revisions";
                }
                break;
            case 9:
                if (this.inputItems.rowData["Markups"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No markup exists", 2)
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 3;
                    this.pageTitle = "Base Drawing Markups";
                }
                break;
            case 11:
                this.splitviewInput.showSecondaryView = false;
                this.downloadFile();
                break;
        }
    }
    dataLoad() {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 1010,
            Value: this.projectId.toString()
        });
        this.projectsService.getBaseDrawingsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(
            function (data) {
                contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
                contextObj.totalItems = data["Data"]["DataCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster('No Base Drawings added', 2);
                    contextObj.enableMenu = [2]
                }
                else {
                    contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                    contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
                }




            }
        )
    }
    submitSuccess(event) {
        var contextObj = this;
        let retUpdatedSrc;
        console.log('event after add', event)
        this.splitviewInput.showSecondaryView = false;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems > 0)
                this.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "revise") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "replace") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
    }
    onSplitViewClose(event, target) {
        this.splitviewInput.showSecondaryView = false;
        if (target == 2 || target == 3)
            this.dataLoad();
    }
    okBaseDrawingDelete(event) {
        var contextObj = this;
        this.showSlide = false
        switch (event) {
            case 1:
                if (this.inputItems.rowData["Revisions"] > 0) {
                    this.showSlide = true
                    this.drawingDialogMessages = { "key": 2, "message": "Do you want to delete the selected Base Drawing with all its revisions? " };
                }
                else
                    this.deleteBaseDrawing(-1);
                break;
            case 2:
                this.deleteBaseDrawing(-1);
                break;
        }

    }
    deleteBaseDrawing(revisionNo) {
        var contextObj = this;
        this.projectsService.postDeleteBaseDrawing(571, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["DWG File"], "true").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1])
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [2];
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Selected Base Drawing deleted", 3);
                    else
                        contextObj.notificationService.ShowToaster("Latest revision of the selected Base Drawing deleted", 3);


                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        })
    }
    downloadFile() {
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;

            filename =
                contextObj.inputItems.rowData["DWG File"];

            if (contextObj.inputItems.rowData["Latest Revision No"] != undefined) {
                contextObj.revisionNo = contextObj.inputItems.rowData["Latest Revision No"];
            }
            else
                contextObj.revisionNo = 0;

           

            contextObj.projectsService.downloadFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {

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
    closeSlideDialog(event) {
        this.showSlide = false
    }
    cancelClick(event) {
        this.showSlide = false
        switch (event) {
            case 2:
                this.deleteBaseDrawing(this.inputItems.rowData["Revisions"])
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
    getSelectedTab(event: any) {
        debugger
        this.selectedTab = event[0];
    }
    onTabClose() {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
    }
    outDrawingObject(event: any) {
        //debugger;
        this.objiWhiz = event.dwgObject;
    }
    onTabBeforeClose($event) {
        var contextObj = this;
        contextObj.closeTbFuns = $event;
            contextObj.selectedTab = 0;
            if (contextObj.objiWhiz) {
                contextObj.objiWhiz.close(function (returnCode) {
                    contextObj.onTabClose();
                });
            }
            else
                contextObj.onTabClose();
    }
    viewDrawingOnClick() {
        debugger
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);

        } else {
            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                this.IsOpenDrawingComponentActive = false;
                this.viewDrawing = false;
                contextObj.deleteIndex = 1;
            }
            setTimeout(function () {
                contextObj.drawingDetails = contextObj.rowData;
                contextObj.revisionNumber = contextObj.rowData['Latest Revision No'];
                contextObj.drawingId = contextObj.inputItems.selectedIds[0];
                contextObj.IsOpenDrawingComponentActive = true;
                contextObj.viewDrawing = true;
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = 1;
                contextObj.deleteIndex = 0;
            }, 100);
        }
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}