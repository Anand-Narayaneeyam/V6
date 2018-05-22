/// <reference path="../../../models/space/space.service.ts" />
import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {AdministrationService} from '../../../Models/Administration/administration.service'
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
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';

@Component({
    selector: 'floor-list',
    templateUrl: './app/Views/Administration/Floor/floor-list.component.html',
    providers: [AdministrationService, SortHelper, NotificationService, ConfirmationService, ExportToExcel],
    inputs: ['action', 'buildingId', 'menuaccess', 'returnData', 'attachmentSuccess'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, ConfirmationComponent, SlideComponent]

})
export class FloorListComponent {
    position = "top-right";
    showSlide = false;
    pageIndex: number = 0;
    disable = false;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;

    @Output() emitMenu = new EventEmitter();
    @Output() updateFloorSelectedIds = new EventEmitter();
    pageTitle: string = "Floor List Component";
    totalItems: number;
    itemsPerPage: number;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "FloorId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC' };
    fieldObject: IField[];
    action: string;
    buildingId: number;
    differ: any;
    public keyWordLookup: any;
    KeywordFieldObject: any;
    advancelookup: IField[];
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    id: any;
    success: any;
    Parameter: any;
    message: string;
    cdr: any;
    exportDataSource: any[];
    refreshgrid;
    constructor(cdr: ChangeDetectorRef, private generFun: GeneralFunctions, private administrationService: AdministrationService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private exportObject: ExportToExcel) {
        this.differ = differs.find({}).create(null);
        var contextObj = this;
        this.cdr = cdr;
    }

    AddChange(added: any) {
        this.itemsSource.unshift(added);
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
    }
    EditChange(edited: any) {
        this.refreshgrid = [];
        var datakey = this.inputItems.dataKey;
        for (let i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i][datakey] == edited[datakey]) {
                this.itemsSource[i] = edited
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(this.itemsSource);
                //this.itemsSource = updatedData;
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
        }
    }

    advanceSearch() {
        var contextObj = this;
        this.administrationService.getFloorAdvnceSearchLookup(this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        var contextObj = this;

        if (changes) {
            var scopefloor = this.inputItems.selectedIds;
            var sitestatus = contextObj.itemsSource.find(function (item) {
                return item.FloorId === contextObj.inputItems.selectedIds[0]
            })

            if (sitestatus != null && sitestatus != [] && sitestatus != undefined) {
                this.updateFloorSelectedIds.emit({ scopefloor, sitestatus: sitestatus["SiteStatus"], buildingId: this.buildingId })
            }
            else {
                this.updateFloorSelectedIds.emit({ scopefloor, sitestatus: "", buildingId: this.buildingId })
            }


        }
    }
    public onSort(objGrid: any) {
        var fieldobj = new Array<ReportFieldArray>();
        if (this.buildingId != undefined) {
            fieldobj.push({
                ReportFieldId: 541,
                Value: this.buildingId[0]
            });
        }
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortFloor(fieldobj, this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        this.administrationService.getFloorColumnData().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                for (let i = 0; i < contextObj.fieldObject.length; i++) {
                    if ((contextObj.fieldObject[i]["FieldId"] == 38) || (contextObj.fieldObject[i]["FieldId"] == 325))
                        contextObj.fieldObject[i]["IsEnabled"] = false;
                }
            }
        });

        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            contextObj.refreshgrid = [];

            var result = changes["attachmentSuccess"]["currentValue"].status;

            var context = this;
            var selId = context.inputItems.selectedIds[0];
            if (selId != undefined) {
                context.itemsSource.find(function (item) {
                    if (item["FloorId"] == selId) {
                        switch (result) {
                            case "success":
                                if (item["Attachments"] == "None")
                                    item["Attachments"] = "0";
                                item["Attachments"] = (Number(item["Attachments"]) + 1).toString();
                                break;
                            case "delete":
                                item["Attachments"] = (Number(item["Attachments"]) - 1).toString();
                                if (item["Attachments"] == "0")
                                    item["Attachments"] = "0";
                                break;
                        }
                        return true;
                    } else
                        return false;
                });

                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);

                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(context.itemsSource);
                //context.itemsSource = updatedData;

            }
        }

        if (changes["buildingId"] && changes["buildingId"]["currentValue"] != changes["buildingId"]["previousValue"]) {
            var fieldobj = new Array<ReportFieldArray>();
            if (this.buildingId != undefined) {
                fieldobj.push({
                    ReportFieldId: 541,
                    Value: this.buildingId[0]
                });
                this.administrationService.getFloorData(fieldobj, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                        if (contextObj.totalItems == 0) {
                            contextObj.disable = true;
                            contextObj._notificationService.ShowToaster("No Floors exist", 2);
                        }
                        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    }
                });
                setTimeout(function () {
                    contextObj.administrationService.getFloorSearchKeyWordLookup(fieldobj).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                }, 3000);

            }
            else {
                this.administrationService.getFloorData(this.buildingId, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                        if (contextObj.totalItems == 0) {
                            contextObj.disable = true;
                            contextObj._notificationService.ShowToaster("No Floors exist", 2);
                            contextObj.updateFloorSelectedIds.emit({ scopefloor: 0, sitestatus: "Active" })
                        }
                        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    }
                });
                setTimeout(function () {
                    contextObj.administrationService.getFloorSearchKeyWordLookup(this.buildingId).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                }, 3000);

            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            if (this.itemsSource) {
                var contextObj = this;
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 173, Value: "112" })
                this.administrationService.CheckIsEntityReferenceFound(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"] == false) {
                            contextObj.message = " Are you sure you want to delete the selected Floor?";
                        }
                        else {
                            contextObj.message = " Drawings and data attached to the selected Floor will be lost. Are you sure you want to delete the selected Floor?";
                        }
                        contextObj.showSlide = !this.showSlide;
                    }
                });
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "floorexport") {         
            var context = this;
            var fieldobj = new Array<ReportFieldArray>();
            if (context.buildingId != undefined) {
                fieldobj.push({
                    ReportFieldId: 541,
                    Value: context.buildingId[0]
                });
            }
            else
                fieldobj = undefined
            //debugger
         var input=   context.administrationService.getFloorExportData(context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol == undefined ? "Site,Building,Floor" : context.inputItems.sortCol, fieldobj, contextObj.fieldObject, "Floors", context.filter, context.advanceValue, true);
               
           //  this.administrationService.getExportData(71, 125, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol == undefined ? "" : context.inputItems.sortCol, context.filter, context.advanceValue).subscribe(function (resultData) {
                // context.exportDataSource = resultData["Data"]["FieldBinderData"];
         context.exportObject.ExportDataFromServer(input, 1, "Floors", function (retCode) {
                    if (retCode == 0) {
                        context._notificationService.ShowToaster("Floor data exported", 3);
                    }
                     else
                        context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                });
            //});
        }
        if (changes["action"] && changes["action"]["currentValue"] == "close")
            this.administrationService.submitFloorClose(this.inputItems.selectedIds);
        if (changes["action"] && changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitFloorReopen(this.inputItems.selectedIds);
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (let i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    this.add = false;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    this.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    this.delete = true;

            }
        }
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (this.action == 'add') {
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (this.itemsSource)
                    this.AddChange(added);
            }
            else if (this.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (this.inputItems.selectedIds.length == 1) {
                    this.EditChange(edited);
                }
            }
        }
        var fieldobj = new Array<ReportFieldArray>();
        if (this.buildingId != undefined) {
            fieldobj.push({
                ReportFieldId: 541,
                Value: this.buildingId[0]
            });
            this.Parameter = fieldobj;
        }
        else {
            this.Parameter = this.buildingId;
        }
    }
    okDelete(event: any) {
        var contextObj = this;
        var fieldObj = new Array<ReportFieldArray>();
        for (let i = 0; i < this.inputItems.selectedIds.length; i++) {
            var selectedrow = this.itemsSource.find(function (item) { return item.FloorId === contextObj.inputItems.selectedIds[i] })
            fieldObj.push({ ReportFieldId: 539, Value: contextObj.inputItems.selectedIds[i] })
        }
        this.showSlide = !this.showSlide;
        function findEntity(entity) {
            return entity.FloorId === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitFloorDelete(fieldObj, this.inputItems.selectedIds).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if ((resultData["ServerId"] >= 0) && (resultData["StatusId"] == 1)) {
                    contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    var updatedList = new Array();/*To notify the watcher about the change*/
                    updatedList = updatedList.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedList;
                    contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                    contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Floors exist", 2);
                    }
                    contextObj._notificationService.ShowToaster("Floor deleted", 3);

                }
                else
                    contextObj._notificationService.ShowToaster("Failed to delete Floor", 5);
            }
        })


    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol
        else
            sortcol = 'Site,Building,Floor'
        this.administrationService.floorPage(this.pageIndex, this.inputItems.sortDir, sortcol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }
    RowUpdate(event: any) {

        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        var contextObj = this;

        var temp = JSON.parse(event);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 8624)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
            if (temp[i]["ReportFieldId"] == 787)
                if (temp[i]["Value"] == undefined)
                    temp[i]["Value"] = 0;
        }
        event = JSON.stringify(temp);
        this.administrationService.submitFloorinlineEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Floor updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])

                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Floor already exists", 5);
                    }
                }
            }
        });

    }
    RowDelete(event: any) {

    }
    RowAdd(event: any) {
        var contextObj = this;

        var temp = JSON.parse(event);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 8624)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitFloorinlineAdd(event).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.disable = false;
                    contextObj._notificationService.ShowToaster("Floor added", 3);
                    contextObj.itemsSource.pop();
                    contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0])
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("Failed to add  Floor", 5);
                    contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Floor already exists", 5);
                    }
                }
            }
        });

    }
    SaveAs(event: any) {

    }
    Delete(event: any) {

    }

    Clear(event: any) {
        var contextObj = this;
        this.administrationService.getFloorAdvnceSearchLookup(this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    }
    Submit(event: any) {
        var contextObj = this;
        contextObj.advanceValue = event.fieldobject;
        contextObj.IsKeyWordSearch = 0;
        contextObj.filter = "";
        contextObj.IsAdvanceSearch = 1;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol
        else
            sortcol = 'Site,Building,Floor'
        this.administrationService.FloorAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, sortcol, this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Floors exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    }

    onloadSearch(event: any) {
      
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.advanceValue = "[]";
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        this.administrationService.FloorKeywordSeach(event.value, this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Floors exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    cancelClick(value: any) {

        this.showSlide = false;

    }
    ddlChangeFrmGrid(event: any) {
        var fieldobj = new Array<ReportFieldArray>();
        var siteid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        if (siteid) {
            fieldobj.push({
                ReportFieldId: event["ddlRelationShipEvent"]["ChildFieldObject"]["ReportFieldId"],
                Value: event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]
            });

        }
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;

        var contextObj = this;
        if (siteid > 0) {
            if (parentFieldId == 38) {
                this.administrationService.loadBuilding(siteid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (let i = 0; i < contextObj.fieldObject.length; i++) {
                                if (contextObj.fieldObject[i]["FieldId"] == 325) {
                                    contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldObject[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < contextObj.fieldObject.length; i++) {
                                if (contextObj.fieldObject[i]["FieldId"] == 325) {
                                    contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldObject[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                    }
                })
            }
        }
        else {
            if (parentFieldId == 38) {
                for (let i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i]["FieldId"] == 325) {
                        contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldObject[i]["FieldValue"] = "-1";
                        break;
                    }
                }
            }
        }
    }


}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}