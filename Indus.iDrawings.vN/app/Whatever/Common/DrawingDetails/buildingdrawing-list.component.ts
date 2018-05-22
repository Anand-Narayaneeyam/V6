/// <reference path="../../../models/common/general.ts" />
import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {AsbuiltService} from '../../../Models/Asbuilts/asbuilt.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../utils/sortHelper'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';


@Component({
    selector: 'building-drawing-list',
    templateUrl: './app/Views/Common/DrawingDetails/buildingdrawing-list.component.html',
    providers: [AsbuiltService, SortHelper, NotificationService, GeneralFunctions],
    inputs: ['action', 'pageTarget', 'moduleId', 'returnDataBuilding', 'buildingdrawingId', 'revisions', 'buildingmarkups'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, SlideComponent, Analytics]

})
export class BuildingDrawingListComponent {
    returnDataBuilding: any;
    buildingdrawingId: number = 0;
    revisions: number = -1;
    buildingmarkups: number = -1;
    position = "top-right";
    showSlide = false;
    add: boolean = false;
    edit: boolean = true;
    delete: boolean = true;
    success: any;
    private buildingDrawinglistFormId = 47;
    action: string;
    pageTarget: any;
    moduleId: any;
    buildingId: number;
    revisionNo: number;
    dwgFilename: string;
    @Output() onNoBuildingData = new EventEmitter();
    @Output() updateBuildingSelectedIds = new EventEmitter();
    @Output() targetTab = new EventEmitter();
    @Output() onBuildingSelectionChange = new EventEmitter();

    pageTitle: string = "Buliding Drawing List";
    public totalItems: number;
    public itemsPerPage: number
    itemsSource: any[];
    id: any;
    inputItems: IGrid = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, selectioMode: 'Multiple', showContextMenu: false };
    fieldObject: IField[];

    differ: any;
    dataKey: any;
    public keyWordLookup: any[];
    refreshgrid;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private asbuiltService: AsbuiltService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) {
        this.differ = differs.find({}).create(null);
    }
    ngOnInit() {

        var contextObj = this;
        contextObj.dataKey = ["DrawingId"];

        switch (this.moduleId) // related to module wise drawing list
        {

            case 1: switch (this.pageTarget) { // As-Builts
                case 1:
                    contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                        //  contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })                                         
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]);//edit enabling for description
                        }
                    });
                    contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId });
                            }
                        }
                        contextObj.inputItems.showContextMenu = true;
                    });
                    break;
                case 2:

                    contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                        // contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]);//edit enabling for description
                        }
                    });
                    contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                        // //console.log('building list', resultData["Data"]);
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.totalItems = resultData["Data"].DataCount;
                        if (contextObj.itemsSource.length == 0) {
                            contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                            contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId });
                        }
                        contextObj.inputItems.showContextMenu = true;
                    });
                    break;


            }
                break;
            case 2: switch (this.pageTarget) { // project
                case 1:// main dawing list
                    contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                        //  contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]);//edit enabling for description
                        }
                    });
                    contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                        // //console.log('building list', resultData["Data"]);

                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                        }
                    });
                    break;
                case 2://unlock drawing list
                    break;
            }
                break;
            case 3: switch (this.pageTarget) {//Space
                case 1: //space drawing
                    break;

            }
                break;
            case 4: switch (this.pageTarget) { //
                case 1:
                    break;
            }
                break;
            case 5: switch (this.pageTarget) { //
                case 1:
                    break;
            }
                break;
            case 6:
                break;

        }



    }
    ngDoCheck() {

        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.buildingId = this.inputItems.rowData.BuildingId;
            this.revisionNo = this.inputItems.rowData.Revisions;
            this.dwgFilename = this.inputItems.rowData["DWG File"];

            var scopebuildingdrawing = this.inputItems.selectedIds;
            this.updateBuildingSelectedIds.emit({
                scopebuildingdrawing, rowData: this.inputItems.rowData, totalItems: this.totalItems
            })
        }

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        debugger
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (changes["returnDataBuilding"] && changes["returnDataBuilding"]["currentValue"] != undefined) {


            if (contextObj.action == 'add') {
                if (contextObj.totalItems == 0) {
                    contextObj.itemsSource = [];
                    contextObj.itemsSource.push(JSON.parse(changes["returnDataBuilding"]["currentValue"])[0]);
                }
                else
                    contextObj.itemsSource.unshift(JSON.parse(changes["returnDataBuilding"]["currentValue"])[0]);
                var updatedData = new Array();/*To notify the watcher about the change*/
                updatedData = updatedData.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedData;
                contextObj.onNoBuildingData.emit({ total: contextObj.itemsSource });

            }
            else if (contextObj.action == 'edit' || contextObj.action == 'replace' || contextObj.action == 'revise') {
                //
                if (contextObj.inputItems.selectedIds.length == 1) {
                    var datakey = contextObj.inputItems.dataKey;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][datakey] == JSON.parse(changes["returnDataBuilding"]["currentValue"])[0][datakey]) {
                            contextObj.itemsSource[i] = JSON.parse(changes["returnDataBuilding"]["currentValue"])[0]
                            //var updatedData = new Array();/*To notify the watcher about the change*/
                            //updatedData = updatedData.concat(contextObj.itemsSource);
                            //contextObj.itemsSource = updatedData;
                            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        }
                    }
                }
            }



        }
        else if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            contextObj.showSlide = true;
        }
        else if (changes["revisions"] && changes["revisions"]["currentValue"] != undefined) {

            let revisionnumber = changes["revisions"]["currentValue"];
            let drawingId = this.buildingdrawingId;
            var list = this.itemsSource.find(function (el) {
                return el.DrawingId === drawingId
            });
            if (list) {
                list.Revisions = revisionnumber;
                for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId) {
                        contextObj.itemsSource[i] = list;
                        var updatedData = new Array();/*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemsSource);
                        contextObj.itemsSource = updatedData;
                        break;
                    }
                }
            }
        }
        else if (changes["buildingmarkups"] && changes["buildingmarkups"]["currentValue"] != undefined) {//markup count

            let markupNumber = changes["buildingmarkups"]["currentValue"];
            let drawingId = this.buildingdrawingId;
            if (this.itemsSource) {
                var list = this.itemsSource.find(function (el) {
                    return el.DrawingId === drawingId
                });
                if (list) {
                    list.Markups = markupNumber;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId) {
                            contextObj.itemsSource[i] = list;
                            var updatedData = new Array();/*To notify the watcher about the change*/
                            updatedData = updatedData.concat(contextObj.itemsSource);
                            contextObj.itemsSource = updatedData;
                            break;
                        }
                    }
                }
            }
        }
    }
    okBuildingDelete(event: any) {

        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        debugger
        contextObj.revisionNo = contextObj.inputItems.rowData.Revisions;
        if (contextObj.revisionNo == 0) {
            contextObj.asbuiltService.deleteBuildingDrawing(contextObj.inputItems.selectedIds, 0, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    let retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    contextObj._notificationService.ShowToaster("Drawing deleted", 3);

                    if (contextObj.itemsSource.length == 0) {
                        contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                    }
                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            })
        } else {
            contextObj.asbuiltService.deleteBuildingDrawing(contextObj.inputItems.selectedIds, contextObj.revisionNo, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    //  contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    var updatedList = new Array();/*To notify the watcher about the change*/
                    contextObj.itemsSource = JSON.parse(resultData["Data"].Data);
                    updatedList = updatedList.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedList;
                    contextObj._notificationService.ShowToaster("Drawing deleted", 3);

                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            })
        }

    }
    public onSort(objGrid: any) {
        var contextObj = this;
        contextObj.asbuiltService.sort(this.buildingDrawinglistFormId, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);

            }
        });
        //alert("onSort");
        //this.asbuiltService.sort(this.buildingDrawinglistFormId, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
        //    resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));


    }
    public pageChanged(event: any) {
        // alert("pageChanged");
        var contextObj = this;
        this.asbuiltService.Paging(this.buildingDrawinglistFormId, event.pageEvent.page).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);

            }
        });
    }
    RowUpdate(event: any) {

        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1)
            contextObj.id = contextObj.inputItems.selectedIds
        var contextObj = contextObj;

        this.asbuiltService.postgetaction(event, contextObj.id).subscribe(function (resultData) {

            contextObj.success = (resultData["Data"]);
            if (contextObj.success["Data"] != "") {
                contextObj._notificationService.ShowToaster("Drawing description updated", 3);
                contextObj.returnDataBuilding = contextObj.success["Data"];

            }
        });

    }
    RowDelete(event: any) {
        //  if (this.delete == true)
        this.showSlide = !this.showSlide;
        // this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");       
    }
    RowAdd(event: any) {
        let test = this.generalFunctions.getFieldValuesAsReportFieldArray(event);
        this._notificationService.ShowToaster("Site added", 3);
    }
    onColValClick(colVal) {
        this.targetTab.emit("1");
        //console.log("colName", colVal.colName)
        //console.log("colVal", colVal.colVal);
    }
    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {

        //console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        //console.log('Enetered On Load Search', event);
        //    this.administrationService.SiteKeywordSeach(event);

    }
    Clear(event: any) {
        //console.log('Entered Clear');
    }
    Submit(event: any) {
        //console.log('Entered Search')
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    buildingSelectionChange(event: any) {

        //this.buildingId = event.rowdata.BuildingId;
        //this.revisionNo = event.rowdata.Revisions;
        //this.dwgFilename = event.rowdata["DWG File Name"];
        this.onBuildingSelectionChange.emit({ event, totalcount: this.totalItems });

    }
    setBuildingFieldDetails(jsonobject: any) {

        var contextObj = this;
        if (jsonobject) {
            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] != 4382) {
                    jsonobject[i]["IsEnabled"] = false;
                    jsonobject[i]["ReadOnlyMode"] = true;
                }
            }
        }
        return jsonobject;

    }
    onContextMenuOnClick(event: any) {
        var tempID: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 2;
            this.analyticsInput.IsAdvanceSearch = 0;
            this.analyticsInput.IsKeywordSearch = 0;
            this.analyticsInput.KeywordFilterValue = "";
            this.analyticsInput.AdvanceFilterValue = "[]";
            this.analyticsInput.FormId = 47;
            this.analyticsInput.ParentFormId = 0;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}