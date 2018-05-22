import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
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
    selector: 'building-list',
    templateUrl: './app/Views/Administration/Building/building-list.component.html',
    providers: [AdministrationService, SortHelper, NotificationService, ConfirmationService, ExportToExcel],
    inputs: ['action', 'siteId', 'menuaccess', 'returnData', 'attachmentSuccess'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, ConfirmationComponent, SlideComponent]


})
export class BuildingListComponent {
    @Output() updateBuildingSelectedIds = new EventEmitter();
    @Output() selectedTab = new EventEmitter();
    @Output() emitMenu = new EventEmitter();
    disable = false;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    pageIndex: number = 0;
    position = "top-right";
    showSlide = false;

    pageTitle: string = "Building List Component";
    public totalItems: number;
    public itemsPerPage: number;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "BuildingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: 'Site,Building' };
    fieldObject: IField[];
    action: string;
    siteId: number;
    siteIdArray: any[];
    differ: any;
    public keyWordLookup: any;
    KeywordFieldObject: any;
    advancelookup: IField[];
    advancelookupDefault: IField[];
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    id: any;
    success: any;
    exportDataSource: any[];
    refreshgrid;
    constructor(private generFun: GeneralFunctions, private administrationService: AdministrationService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private exportObject: ExportToExcel) {
        this.differ = differs.find({}).create(null);
        var contextObj = this;

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
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        var contextObj = this;
        if (changes) {
            var scopebuilding = this.inputItems.selectedIds;
            var sitestatus = contextObj.itemsSource.find(function (item) {
                return item.BuildingId === contextObj.inputItems.selectedIds[0]
            })
            if (sitestatus != null && sitestatus != [] && sitestatus != undefined) {
                this.updateBuildingSelectedIds.emit({ scopebuilding, sitestatus: sitestatus["SiteStatus"], siteId: this.siteId })
            }
            else {
                this.updateBuildingSelectedIds.emit({ scopebuilding, sitestatus: "", siteId: this.siteId })
            }

        }
    }

    advanceSearch() {
        var contextObj = this;
        if (contextObj.advancelookup==undefined)
            if (this.siteId != undefined) {
                var fieldobj = new Array<ReportFieldArray>();
                fieldobj.push({
                    ReportFieldId: 489,
                    Value: this.siteId[0]
                });
                contextObj.administrationService.getBuildingAdvnceSearchLookup(fieldobj).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                });
            } else {

                contextObj.administrationService.getBuildingAdvnceSearchLookup(contextObj.siteId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                });
            }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        var contextObj = this;
        contextObj.administrationService.getBuildingColumnData().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                for (let i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i].FieldId == 310) {
                        contextObj.fieldObject[i].isContentHtml = "hyperlink";
                        break;
                    }
                }
            }
        })
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            contextObj.refreshgrid = [];

            var result = changes["attachmentSuccess"]["currentValue"].status;
            var selId = contextObj.inputItems.selectedIds[0];
            if (selId != undefined) {
                contextObj.itemsSource.find(function (item) {
                    if (item["BuildingId"] == selId) {
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
                //updatedData = updatedData.concat(contextObj.itemsSource);
                //contextObj.itemsSource = updatedData;

            }
        }

        if (changes["siteId"])
            if ((changes["siteId"]["currentValue"]) != (changes["siteId"]["previousValue"])) {
                var fieldobj = new Array<ReportFieldArray>();
                if (contextObj.siteId != undefined) {
                    fieldobj.push({
                        ReportFieldId: 489,
                        Value: contextObj.siteId[0]
                    });
                    contextObj.siteIdArray = fieldobj;
                    contextObj.administrationService.getBuildingData(fieldobj, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                            if (contextObj.totalItems == 0) {
                                contextObj.disable = true;
                                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        }
                    })
                    setTimeout(function () {
                        contextObj.administrationService.getBuildingSearchKeyWordLookup(fieldobj).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                    }, 3000);
                }
                else {

                    contextObj.administrationService.getBuildingData(contextObj.siteId, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                            if (contextObj.totalItems == 0) {
                                contextObj.disable = true;
                                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                                contextObj.updateBuildingSelectedIds.emit({ scopebuilding: 0, sitestatus: "Active" })
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        }
                    })
                    setTimeout(function () {
                        contextObj.administrationService.getBuildingSearchKeyWordLookup(contextObj.siteId).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                    }, 3000);

                }

            }
        if (changes["action"] != undefined) {
            if (changes["action"]["currentValue"] == "delete") {
                if (contextObj.itemsSource)
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i].BuildingId == contextObj.inputItems.selectedIds[0]) {
                            if (contextObj.itemsSource[i]["Floor Count"] == 0)
                                contextObj.showSlide = !contextObj.showSlide;
                            else
                                contextObj._notificationService.ShowToaster("Selected Building cannot be deleted,Floors added to it", 2);
                        }
                    }
            }
            else if (changes["action"]["currentValue"] == "close") {

                contextObj.administrationService.submitBuildingClose(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        var datakey = contextObj.inputItems.dataKey;
                        for (let i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData)[0][datakey]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData)[0]
                                var updatedData = new Array();/*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                            }
                        }
                    }
                }
                )
            }
            else if (changes["action"]["currentValue"] == "reopen")
                contextObj.administrationService.submitbuildingReopen(contextObj.inputItems.selectedIds);
            else if (changes["action"] && changes["action"]["currentValue"] == "buildingexport") {
              
                var fieldobj = new Array<ReportFieldArray>();
                if (contextObj.siteId != undefined) {

                    fieldobj.push({
                        ReportFieldId: 489,
                        Value: contextObj.siteId[0]
                    });
                } else
                    fieldobj = undefined;
                var input = contextObj.administrationService.getBuildingExportData(1, 122, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, "Buildings", contextObj.filter, contextObj.advanceValue, fieldobj);
                      //  contextObj.exportDataSource = resultData["Data"]["FieldBinderData"];

                contextObj.exportObject.ExportDataFromServer(input, 1, "Buildings", function (retCode) {
                       // contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "Buildings", function (retCode) {

                            if (retCode == 0) {
                                contextObj._notificationService.ShowToaster("Building data exported", 3);
                            }
                            else
                                contextObj._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                        });
                   // });
                }
            
        }

        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (let i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    contextObj.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")

                    contextObj.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")

                    contextObj.delete = true;

            }
        }
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {

            if (contextObj.action == 'add') {
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (contextObj.itemsSource)
                    contextObj.AddChange(added);
            }
            else if (contextObj.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (contextObj.inputItems.selectedIds.length == 1) {
                    contextObj.EditChange(edited);
                }
            }
        }
    }
    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        function findEntity(entity) {
            return entity.BuildingId === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitBuildingDelete(this.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                var updatedList = new Array();/*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj._notificationService.ShowToaster("Building deleted", 3);

            }
            else if (resultData["Data"]["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Selected Building in use, cannot be deleted", 5);

            }
            else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        })
    }
    public onSort(objGrid: any) {
        var fieldobj = new Array<ReportFieldArray>();
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
        }
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortBuilding(fieldobj, this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        var sortcol;
        var fieldobj = new Array<ReportFieldArray>();
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
        }
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol
        else
            sortcol = 'Site,Building'
        this.administrationService.buildingPage(fieldobj,this.pageIndex, this.inputItems.sortDir, sortcol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }
    onColValClick(event) {
        if (event.colVal > 0) {
            this.selectedTab.emit("2");
        }

    }
    RowUpdate(event: any) {
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        var contextObj = this;

        var temp = JSON.parse(event);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 6655)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitBuildinginlineEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Buidling updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])

                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("Failed to update Building", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building already exists", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Buiding Code already exists", 5);

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
            if (temp[i]["ReportFieldId"] == 6655)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitBuildinginlineAdd(event).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Building added", 3);
                    contextObj.disable = false;
                    contextObj.itemsSource.pop();
                    contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0])
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("Failed to add  Building", 5);
                    contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building Name already exist", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Buiding Code already exists", 5);
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
        if (this.siteId != undefined) {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
            contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        } else {
            contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        }
    }
    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol
        else
            sortcol = 'Site,Building'
        this.pageIndex = 0;
        this.administrationService.BuildingAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, sortcol, this.siteIdArray).subscribe(function (resultData) {

            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });

        });
    }

    onloadSearch(event: any) {
        var contextObj = this;
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol
        else
            sortcol = 'Site,Building'
        var fieldobj = new Array<ReportFieldArray>();
        this.pageIndex = 0;
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });

            this.administrationService.BuildingKeywordSeach(event.value, fieldobj, this.pageIndex, this.inputItems.sortDir, sortcol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });

            });
        } else {

            this.administrationService.BuildingKeywordSeach(event.value, this.siteId, this.pageIndex, this.inputItems.sortDir, sortcol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });

            });

        }
    }


    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    cancelClick(value: any) {

        this.showSlide = false;
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}