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
import {EditMarkUpComponent} from'./editmarkup.component'

@Component({
    selector: 'base-drawingmarkup-list',
    templateUrl: './app/Views/Projects/Projects Data/basedrawing-markup-list.component.html',
    providers: [SortHelper, NotificationService, GeneralFunctions],
    inputs: ["projectName", "rowData", "projectId","pagetarget"],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, searchBox, SlideComponent, SplitViewComponent, LabelComponent, EditMarkUpComponent]

})

export class BaseDrawingMarkupListComponent {

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
    fieldRev: IField[];
    revisionNo: number;
    menuData = [
        {
            "id": 1,
            "title": "Edit Description",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 752
        },

        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 753
        },
        {
            "id": 3,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null,
            "privilegeId": 754
        }   
    ]
    projectName: string;
    pageTitle: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    enableMenu: any;
    rowData: any;
    markuprowData: any;
    projectId: number;
    drawingDialogMessages = { "key": 0, "message": "" };
    pagetarget: number = 0;

    constructor(private projectService: ProjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        console.log('row data in mark up list as input', this.rowData)
        this.projectService.getBaseDrawingListFormId(578).subscribe(function (resultFields) {
            for (var i = 0; i < resultFields["Data"].length; i++) {
                switch (resultFields["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultFields["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName; 
                        break;
                    case 1012:
                        contextObj.fieldtitle = resultFields["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"]
                        break;
                    case 1011:
                        contextObj.fieldCat = resultFields["Data"][i];
                        contextObj.fieldCat["IsMandatory"] = false;
                        if (contextObj.pagetarget==0)
                            contextObj.fieldCat["FieldValue"] = contextObj.rowData["Category"];
                        else
                            contextObj.fieldCat["FieldValue"] = contextObj.rowData["Drawing Category"];
                        break;
                    case 1018:
                        contextObj.fieldRev = resultFields["Data"][i];
                        if (contextObj.pagetarget==0)
                            contextObj.fieldRev["FieldValue"] = contextObj.rowData["Latest Revision No"]
                        else
                            contextObj.fieldRev["FieldValue"] = contextObj.rowData["Revision No."]
                        break;
                    case 1022:                        
                    case 1023:                       
                    case 1021:                       
                    case 1019:
                        contextObj.fieldObject.push(resultFields["Data"][i])
                        break;                  
                }
            }
        })
        this.dataLoad();
    }
    dataLoad() {
        var contextObj = this;
        var revNo;
        if (this.pagetarget == 0)
            revNo = contextObj.rowData["Latest Revision No"];
        else
            revNo = contextObj.rowData["Revision No."];
                this.projectService.getBaseDrawingMarkRevisionListData(578, this.rowData["Id"], this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex, 2, revNo).subscribe(function (resultData) {
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No markup exists", 2);
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3];
            }

        })
    }
    closeSlideDialog(event) {
        this.showSlide = false
    }
    onSubMenuChange(event) {
        switch (event.value) {
            case 1:
                this.splitviewInput.showSecondaryView = true;
                this.markuprowData = this.inputItems.rowData;
                break;
            case 2:
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1,"message":"Are you sure you want to delete the selected Markup file?" }
                break;
        }
    }
    submitSuccess(event) {
        var contextObj = this;
        let retUpdatedSrc;
        this.splitviewInput.showSecondaryView = false;
        retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        this.totalItems = retUpdatedSrc["itemCount"];
        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
    }
    okBaseDrawingDelete(key) {
        switch (key) {
            case 1:
                this.deleteMarkUp();
                break;
        }
    }
    deleteMarkUp() {
        var contextObj = this;
        this.showSlide = false;
        this.projectService.deleteMarkUp(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [];
                }
                contextObj.notificationService.ShowToaster("Markup deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        }
                        break;
                }
            }
        })
    }
    cancelClick(event) {
        this.showSlide = false;
    }

}