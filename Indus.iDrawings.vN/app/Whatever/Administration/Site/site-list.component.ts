
import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';

@Component({
    selector: 'site-list',
    templateUrl: 'app/Views/Administration/Site/site-list.component.html',
    providers: [AdministrationService, SortHelper, NotificationService, GeneralFunctions, ExportToExcel],
    inputs: ['action', 'dataKey', 'menuaccess', 'returnData', 'attachmentSuccess'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, ConfirmationComponent, SlideComponent]

})
export class SiteListComponent {
    //import { ExportToExcelComponent} from '../../../Framework/Whatever/Export/exporttoexcel.component';
    disable = false;
    returnData: any;
    pageIndex: number = 0;
    success: any;
    position = "top-right";
    showSlide = false;
    showCloseSlide = false;
    showReopenSlide = false;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    KeywordFieldObject: any;
    loadSearch: any;
    advancelookup: IField[];
    filter = "";
    fileName = "SiteList.xls";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    @Output() updateSiteSelectedIds = new EventEmitter();
    @Output() targetTab = new EventEmitter();
    @Output() emitMenu = new EventEmitter();
    @Output() SiteStatus = new EventEmitter();
    pageTitle: string = "Site List Component";

    public totalItems: number = 0;

    public itemsPerPage: number = 0;
    itemsSource: any[];
    exportDataSource: any[];
    id: any;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '[Site]', selectioMode:"single" };
    fieldObject: IField[];
    action: string;
    differ: any;
    dataKey: any;
    public keyWordLookup: any;
    //arrHighlightRowIds = [];
    refreshgrid;
    constructor(private administrationService: AdministrationService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private generFun: GeneralFunctions,private exportObject:ExportToExcel) {
        this.differ = differs.find({}).create(null);      

    }

    advanceSearch() {
        var contextObj = this;
        this.administrationService.getAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
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
    ngOnInit() {

        this.dataKey = ["Id"];
        var contextObj = this;
        this.administrationService.getSiteColumnData().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            for (let i = 0; i < contextObj.fieldObject.length; i++) {
                if (contextObj.fieldObject[i].FieldId == 176) {
                    contextObj.fieldObject[i].isContentHtml = "hyperlink";
                    break;
                }
            }
        });
        
        this.administrationService.getSiteData(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
                contextObj.disable = true;
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
        setTimeout(function () {
            contextObj.administrationService.getSiteKeywordField().subscribe(function (resultData) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            });
        }, 3000);        
    }

    ngDoCheck() {

        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var scopesite = this.inputItems.selectedIds;
            this.updateSiteSelectedIds.emit({
                scopesite
            })
        }
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var context = this;        
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {

            context.refreshgrid = [];
            var g = changes["attachmentSuccess"]["currentValue"].status;

            var selId = context.inputItems.selectedIds[0];
            if (selId != undefined) {
                context.itemsSource.find(function (item) {
                    if (item["Id"] == selId) {
                        switch (changes["attachmentSuccess"]["currentValue"].status) {
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
                
                context.refreshgrid = context.refreshgrid.concat([true]);
                
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(context.itemsSource);
                //context.itemsSource = updatedData;
              
                //context.inputItems.selectioMode = "multiple";
                //setTimeout(function () {
                    
                //    context.arrHighlightRowIds = [];
                //    context.arrHighlightRowIds = context.arrHighlightRowIds.concat([selId])             
                //},1);

              
            }
        }

      else  if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            if (context.itemsSource)
                for (let i = 0; i < context.itemsSource.length; i++) {
                    if (context.itemsSource[i].Id == context.inputItems.selectedIds[0]) {
                        if (context.itemsSource[i]["Building Count"] == 0)
                            context.showSlide = !context.showSlide;
                        else
                            context._notificationService.ShowToaster("Selected Site cannot be deleted, Buildings added to it", 2);
                    }

                }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "siteexport") {

            //context.administrationService.getExportData(44,110, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue).subscribe(function (resultData) {
            //    context.exportDataSource = resultData["Data"]["FieldBinderData"];
            //    context.exportObject.ExportData(context.exportDataSource, context.fieldObject, "Sites", function (retCode) {
            //        if (retCode == 0) {
            //            context._notificationService.ShowToaster("Site data exported", 3);
            //        }
            //        else context._notificationService.ShowToaster("Site data cannot be exported", 3);
            //    });
            //});


            var input = context.administrationService.getExportData(44, 110, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.fieldObject, "Sites", context.filter, context.advanceValue);
          
            context.exportObject.ExportDataFromServer(input, 1, "Sites", function (retCode) {
                if (retCode == 0) {
                    context._notificationService.ShowToaster("Site data exported", 3);
                }
                else context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
      else  if (changes["action"] && changes["action"]["currentValue"] == "close") {

            context.administrationService.CheckSiteInUseWorkorder(context.inputItems.selectedIds[0]).subscribe(function (resultData) {

                if (resultData["Data"] == 1) {

                    context._notificationService.ShowToaster("Selected Site is linked to Work Order module, cannot be closed", 2);

                }
                else if (context.itemsSource)
                    for (let i = 0; i < context.itemsSource.length; i++) {
                        if (context.inputItems.selectedIds[0] == context.itemsSource[i].Id)
                            if (context.itemsSource[i].StatusId == 3) {
                                context._notificationService.ShowToaster("Site is already closed", 2)
                                break;
                            }
                            else if (context.itemsSource[i].StatusId == 2) {
                                context._notificationService.ShowToaster("Blocked Site cannot be closed", 2)
                                break;
                            }
                            else {
                                context.showCloseSlide = !context.showCloseSlide;
                                break;
                            }
                    }
            });



        }
       else if (changes["action"] && changes["action"]["currentValue"] == "reopen") {
            if (context.itemsSource)
                for (let i = 0; i < context.itemsSource.length; i++) {
                    if (context.inputItems.selectedIds[0] == context.itemsSource[i].Id)
                        if (context.itemsSource[i].StatusId == 1) {
                            context._notificationService.ShowToaster("Site is already active", 2)
                            break;
                        }
                        else if (context.itemsSource[i].StatusId == 2) {
                            context._notificationService.ShowToaster("Blocked Site cannot be re-opened", 2)
                            break;
                        }
                        else {
                            context.showReopenSlide = !context.showReopenSlide;
                            break;
                        }
                }
        }

      else  if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (let i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    context.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")

                    context.edit = true;

                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")

                    context.delete = true;
            }
        }
       else if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (context.action == 'add') {
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (context.itemsSource)
                    context.AddChange(added);
            }
            else if (context.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (context.inputItems.selectedIds.length == 1) {
                    context.EditChange(edited);
                }
            }
        }
    }
    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        /*code to delete from array manually
          if (event.returnOk == true) {
        for (var i = 0; i < this.itemsSource.length; i++) {
            for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                if (this.itemsSource[i]["FieldId"] == this.inputItems.selectedIds[j]) {
                    var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                    if (index > -1) {
                        this.itemsSource.splice(index, 1)
                        var sortedData = new Array();//To notify the watcher about the change
                        sortedData = sortedData.concat(this.itemsSource);
                        this.itemsSource = sortedData;
                    }
                }
            }
        }*/
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitSiteDelete(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                var updatedList = new Array();/*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Sites exist", 2);
                }
                contextObj._notificationService.ShowToaster("Site deleted", 3);

            }
            else if ((resultData["Data"]["ServerId"]  == -1)) {
                contextObj._notificationService.ShowToaster("Selected Site is linked to other module, cannot be deleted", 2);
            }
           else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        })

    }
    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortSite(this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page
        this.administrationService.sitePaging(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }

    RowUpdate(event: any) {
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        var contextObj = this;

        this.administrationService.submitSiteinlineEdit(event, this.id).subscribe(function (resultData) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj.disable = false;
                contextObj._notificationService.ShowToaster("Site updated", 3);
                contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])

            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -2) {
                    contextObj._notificationService.ShowToaster("Site already exists", 5);
                }
                else if (contextObj.success["ServerId"] == -1) {
                    contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                }
                else if (contextObj.success["ServerId"] == -3)
                    contextObj._notificationService.ShowToaster("Site Code already exists", 5);
            }
        });
    }
    RowDelete(event: any) {

    }
    RowAdd(event: any) {
        var contextObj = this;

        var temp = JSON.parse(event)
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 576) {
                temp[i]["Value"] = "1";
                break;
            }
        }
        this.administrationService.submitSiteinlineAdd(JSON.stringify(temp)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (contextObj.success["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Site added", 3);
                contextObj.disable = false;
                contextObj.itemsSource.pop();
                contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0])
            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -2) {
                    contextObj._notificationService.ShowToaster("Site already exists", 5);
                }
                else if (contextObj.success["ServerId"] == -1) {
                    contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                }
                else if (contextObj.success["ServerId"] == -3)
                    contextObj._notificationService.ShowToaster("Site Code already exists", 5);
            }
        });


    }
    onColValClick(event) {
        if (event.colVal > 0) {
            this.targetTab.emit("1");
        }

    }
    SaveAs(event: any) {

    }
    Delete(event: any) {


    }
    onloadSearch(event: any) {
        
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.advanceValue = "[]";
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.administrationService.SiteKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    }

    Clear(event: any) {
        var contextObj = this;
        this.administrationService.getAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    }

    onAdvanceSearch(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.filter = "";
        this.IsAdvanceSearch = 1;
        this.administrationService.SiteAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });

    }

    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showCloseSlide = value.value;
        else if (index == 3)
            this.showReopenSlide = value.value;

    }
    okClose(event: any) {
        this.showCloseSlide = !this.showCloseSlide;
        var contextObj = this;
        this.administrationService.submitSiteClose(this.inputItems.selectedIds).subscribe(function (resultData) {
            var datakey = contextObj.inputItems.dataKey;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData)[0][datakey]) {
                    contextObj.itemsSource[i] = JSON.parse(resultData)[0]
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedData;
                    contextObj._notificationService.ShowToaster("Site closed", 3);
                }
            }
        });

    }
    okReopen(event: any) {
        this.showReopenSlide = !this.showReopenSlide;
        var contextObj = this;
        this.administrationService.submitSiteReopen(this.inputItems.selectedIds).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (contextObj.success["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
            }
            else {
                var datakey = contextObj.inputItems.dataKey;
                for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData["Data"].Data[0])[0]["Id"]) {
                        contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data[0])[0];
                        var updatedData = new Array();/*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemsSource);
                        contextObj.itemsSource = updatedData;
                        contextObj._notificationService.ShowToaster("Site reopened", 3);
                    }
                }
            }
        });
    }
    cancelClick(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showCloseSlide = value.value;
        else if (index == 3)
            this.showReopenSlide = value.value;
    }
    ddlChangeFrmGrid(event: any) {
        var countryid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;

        var contextObj = this;
        if (countryid > 0) {
            if (parentFieldId == 171) {
                this.administrationService.loadState(countryid, parentFieldId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (let i = 0; i < contextObj.fieldObject.length; i++) {
                            if (contextObj.fieldObject[i]["FieldId"] == 173) {
                                contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                contextObj.fieldObject[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < contextObj.fieldObject.length; i++) {
                            if (contextObj.fieldObject[i]["FieldId"] == 173) {
                                contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldObject[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                })
            }
        }
        else {
            if (parentFieldId == 171) {
                for (let i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i]["FieldId"] == 173) {
                        contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldObject[i]["FieldValue"] = "-1";
                        break;
                    }
                }
            }
        }
    }
   
}
