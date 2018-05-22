import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
@Component({
    selector: 'access-many-users',
    templateUrl: './app/Views/Administration/General Settings/accestomanyusers.component.html',
    directives: [searchBox, Notification, GridComponent, PagingComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class AccessToManyUsersComponent implements AfterViewInit {
    fieldObject: IField[];
    itemsSource: any[];
    itemsSourceFirst: any[];
    errorMessage: string;

    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    @Input() selectedIds: any[];
    @Input() orgName = "";

    Stylename = "search-containerInline";
    disable: boolean = false;
    public keyWordLookup: any;
    advancelookup: IField[];
    advancelookupDefault: IField[];
    KeywordFieldObject: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    isSmartSearch: boolean = true;
    gridHeight: any = "100%";
    @Output() onSearchInDrawing = new EventEmitter();
    fieldobjSelected = new Array<ReportFieldArray>();
    fieldobjNew = new Array<ReportFieldArray>();
    fieldobjSearchSelected = new Array<ReportFieldArray>();
    baseteamenable: boolean = false;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        var contextObj = this;
        this.administrationService.getFields(419).subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        contextObj.administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true)
                contextObj.baseteamenable = true;
            else
                contextObj.baseteamenable = false;
            
        });

    }
    ngAfterViewInit() {
        var contextObj = this;
        this.dataLoad();
        contextObj.Stylename = "search-containerInlinefromgrid";
        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
            contextObj.gridHeight = window.innerHeight - 240;
            contextObj.gridHeight = contextObj.gridHeight + "px";
        }
        contextObj.administrationService.getKeywordField(423).subscribe(function (resultData) {

            contextObj.KeywordFieldObject = resultData["FieldBinderList"];

        });
    }
    public onPageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    public onSort(objGrid: any) {
        this.dataLoad();
    }

    onloadSearch(event: any) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var rptFieldValues = "[{\"ReportFieldId\":301,\"Value\":\"" + contextObj.selectedIds + "\"}]";
        contextObj.administrationService.getListSearch(419, "", contextObj.selectedIds, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, rptFieldValues).subscribe(function (result) {
            contextObj.fieldobjSelected = [];
            contextObj.itemsSourceFirst = JSON.parse(result["Data"].FieldBinderData);
            for (var item of contextObj.itemsSourceFirst) {
                if (item['View'] == true) {
                    contextObj.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: item['Id']
                    });
                }
            }
        });


        contextObj.administrationService.getListSearch(419, 423, contextObj.selectedIds, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, rptFieldValues, contextObj.filter, "1", "0", "[]").subscribe(function (result) {

            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;

            //contextObj.fieldobjSelected = [];
            //for (var item of contextObj.itemsSourceFirst) {
            //    if (item['View'] == true) {
            //        contextObj.fieldobjSelected.push({
            //            ReportFieldId: 300,
            //            Value: item['Id']
            //        });
            //    }
            //}
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);


            } else {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
                // context.enableMenu = [1];
            }
        });
    }

    public dataLoad() {

        var context = this;
        context.fieldobjSelected = [];
        var rptFieldValues = "[{\"ReportFieldId\":301,\"Value\":\"" + context.selectedIds + "\"}]";
        context.administrationService.getListSearch(419, "", context.selectedIds, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, rptFieldValues).subscribe(function (result) {

            context.itemsPerPage = result["Data"].RowsPerPage;
            context.itemsSource = JSON.parse(result["Data"].FieldBinderData);


            context.itemsSourceFirst = context.itemsSource.slice();
            for (var item of context.itemsSourceFirst) {
                if (item['View'] == true) {
                    context.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: item['Id']
                    });
                }
            }
            context.totalItems = context.itemsSource.length;
            if (context.totalItems == 0) {
                context.disable = true;
                context.notificationService.ShowToaster("No Users exist", 2);
                // context.enableMenu = [1];
            }
        });

    }
    public onCellUpdate(event) {
        var context = this;
        if (context.baseteamenable){
                context.administrationService.GetBaseOrganizationUsers(context.selectedIds).subscribe(function (result) {
                    var index = result.indexOf(event.dataKeyValue)
                    var viewofuser = event.dataSource.find(function (item) { return item.Id === event.dataKeyValue })
                    if (index > -1 && viewofuser.View == 0) {
                        context.notificationService.ShowToaster("Base Team cannot be unchecked", 5);
                        var row = event.dataSource.find(function (item) { return item.Id === event.dataKeyValue });
                        row.View = 1;
                        console.log("onCellUpdate", viewofuser, event.dataKeyValue);
                    }
                });
            }
    

        if (event.isHeaderClicked != undefined) {//Case 3:header isc clicked 
            if (context.IsKeyWordSearch == 0) {
                if (event.isHeaderClicked == false) {
                    context.fieldobjSelected = [];
                }
                else {
                    context.fieldobjSelected = [];
                    for (var item of context.itemsSourceFirst) {
                        //  if (item['View'] == true) {
                        context.fieldobjSelected.push({
                            ReportFieldId: 300,
                            Value: item['Id']
                        });
                        // }
                    }
                }
            }
            else {
                //search

                for (var item of context.itemsSource) {//search itemsource
                    var index = context.fieldobjSelected.findIndex(function (data) {
                        return data["Value"] === item['Id'];

                    });

                    if (event.isHeaderClicked == true) {
                        if (index != -1) {
                            context.fieldobjSelected.splice(index, 1);
                            context.fieldobjSelected.push({
                                ReportFieldId: 300,
                                Value: item['Id']
                            });
                        } else {
                            context.fieldobjSelected.push({
                                ReportFieldId: 300,
                                Value: item['Id']
                            });
                        }

                    }
                    else {
                        if (index != -1) {
                            context.fieldobjSelected.splice(index, 1);
                        }
                    }
                }

            }
        }
        else {
            var index = context.fieldobjSelected.findIndex(function (data) {
                return data["Value"] === event.dataKeyValue;

            });
            if (index != -1) {
                if (event.isChecked == false) { //Case 1:unselect frm the list
                    context.fieldobjSelected.splice(index, 1);
                }
                else {
                    context.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: event.dataKeyValue
                    });
                }

            }
            if (event.isChecked == true) {//Case 2:select frm the list
                context.fieldobjSelected.push({
                    ReportFieldId: 300,
                    Value: event.dataKeyValue
                });
            }
        }
    }
    updateDivisionAdminSettings() {
        let updateArray = [];
        var contextObj = this;
        var count;
        var updatedRptFldValues = '';
        var status = true;
        this.administrationService.GetBaseOrganizationUsers(this.selectedIds).subscribe(function (result) {
            for (var item of contextObj.itemsSource) {
                if (item['View'] == true) {
                    updatedRptFldValues += "{\"ReportFieldId\":300,\"Value\":\"" + item['Id'] + "\"},";
                }
                else if (item["View"] == false && result.indexOf(item["Id"]) > -1) {
                    // item["View"] = true;
                    if (contextObj.baseteamenable) {
                            contextObj.notificationService.ShowToaster("Base Team cannot be unchecked", 5)
                            status = false;
                        }
                        else
                            status = true;
                   
                    break;
                }
            }
                if (status == true) {
                    updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + contextObj.selectedIds + "\"},{\"ReportFieldId\":302,\"Value\":\"0\"}";
                    contextObj.administrationService.updateDivisionAccessToManyUsers(updatedRptFldValues, contextObj.selectedIds).subscribe(function (resultData) {
                        if (resultData.ServerId == 1) {
                            contextObj.notificationService.ShowToaster(contextObj.orgName + " access updated", 3);
                        } else
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    });
                }

        });
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: any;
}