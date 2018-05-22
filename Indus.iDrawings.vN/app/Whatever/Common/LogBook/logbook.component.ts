import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgControl} from '@angular/common';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField} from '../../../Framework/Models//Interface/IField'
import { PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid'
import { SortHelper} from '../../utils/sortHelper'
import { PageComponent} from '../../../Framework/Whatever/Page/page.component'
import { SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { LogUserListComponent } from './logUserList.component';
import { LogEntityListComponent } from './logEntityList.component';
import { LogActivityListComponent } from './logActivityList.component';
import {ExportToExcel} from '../../../framework/models/export/exporttoexcel.service';

@Component({
    selector: 'logbook',
    templateUrl: './app/Views/Common/LogBook/logbook.component.html',
    inputs: ['dataKey'],
    directives: [searchBox, PageComponent, SubMenu, FieldComponent, SlideComponent, SplitViewComponent, SectionComponent, LogUserListComponent, LogEntityListComponent, LogActivityListComponent, GridComponent, PagingComponent],
    providers: [ExportToExcel, AdministrationService, HTTP_PROVIDERS, NotificationService]
})

export class LogbookComponent implements AfterViewInit, OnInit {

    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    pagingTarget: number = 0;
    blnUserSection: boolean = false;
    pageTitle: string = "Select Criteria";
    pagePath: string;
    errorMessage: string;
    btnName: string = "Next";
    strSelectedIds: string;
    logUserDataInput: string;
    logParameterListRptFields: string;
    logParamDataforEntities: string;
    logUserDataforEntities: string;
    logEntitiesInput: string;
    logParamDataforActivity: string;
    logUserDataforActivity: string;
    logEntitiesDataforActivity: string;
    logActivityInput: string;
    strLogParams: string;
    strLogUsers: string;
    strLogEvents: string;
    strLogActivities: string;
    sessionUserRoleId: number;
    fieldObjectLog: any[];
    itemsSourceLog: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Date Time]", sortDir: "DESC", selectedIds: [], allowAdd: false, allowEdit: false };
    splitViewLogBook: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    public keyWordLookup: any[];
    public logbookParameterFieldData: IField[];
    public dateSelectorData: IField[];
    public logUserData: IField[];
    sectionAccessExpansionStatus = [{ "title": "Select Criteria", "isExpanded": false }, { "title": "Select User", "isExpanded": false }, { "title": "Select Entities", "isExpanded": false }, { "title": "Select Activities", "isExpanded": false }];

    menuData = [
        {
            "id": 1,
            "title": "Filter",
            "image": "Filter",
            "path": "Filter",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Export",
            "image": "Export",
            "path": "Export",
            "submenu": null
        }
    ];
    enableMenu = [1];

    constructor(private exportObject: ExportToExcel, private administrationService: AdministrationService, private _notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngOnInit() {
        this.pagePath = "Logbook";
    }

    ngAfterViewInit() {
        var contextObj = this;
        var multivalue: string[] = [];
        this.getSessionUserData(contextObj);
        contextObj.pagingTarget = 1;
        contextObj.sectionAccessExpansionStatus[0].isExpanded = true;
        this.administrationService.getLogListColumns().subscribe(function (resultData) {
            contextObj.fieldObjectLog = resultData["Data"];
        })
        this.administrationService.getLogBookParameterFieldList().subscribe(function (resultData) {
            for (let i = 0; i < resultData["Data"].length; i++) {
                if (i == 0) {
                    contextObj.dateSelectorData = resultData["Data"][0];
                }
                if (resultData["Data"][i].ReportFieldId == 500339) { /*set last month  */
                    resultData["Data"][i].FieldValue = contextObj.setPrevMonthsDate();
                }
                if (resultData["Data"][i].ReportFieldId == 1703) { /*set other users as default*/
                    resultData["Data"][i].FieldValue = "1";
                }
                if (resultData["Data"][i].ReportFieldId == 1698) { /*set this customer as default*/
                    resultData["Data"][i].FieldValue = "1";
                }
                if (resultData["Data"][i].ReportFieldId == 6325) {
                    var lookup = resultData["Data"][i]["LookupDetails"]["LookupValues"];
                    var length = lookup.length;
                    for (var k = 0; k < length; k++) {
                        multivalue.push(lookup[k].Id.toString());
                    }
                    resultData["Data"][i]["MultiFieldValues"] = multivalue;
                    multivalue = [];
                }
            }
            contextObj.logbookParameterFieldData = resultData["Data"];
        });
        /*
        this.administrationService.getLogBookDataOnload().subscribe(function (resultData) {
            if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
            }
        });*/
        this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            }
        });
    }

    private getSessionUserData(contextObj) {
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.toggleSearch();
                break;
            case 2: this.ExportToExcel();
                break;
        }
    }

    ShowSplitView(event) {
    }

    toggleSearch() {
        var contextObj = this;
        if (contextObj.splitViewLogBook.showSecondaryView == false) {
            contextObj.splitViewLogBook.showSecondaryView = true;
            contextObj.blnUserSection = true;
        }
        else if (contextObj.splitViewLogBook.showSecondaryView == true) {
            contextObj.splitViewLogBook.showSecondaryView = false;
            contextObj.blnUserSection = false;
        }
    }

    getListBoxChanges(event) {
    }

    setPrevMonthsDate() { /*function to set previous month*/
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var prevMonth; var eoy;
        if (currentDate.getMonth() - 1 < 0) {
            prevMonth = monthNames[monthNames.length - 1]
            eoy = true;
        }
        else
            prevMonth = monthNames[currentDate.getMonth() - 1];
        let arr: any[];
        arr = currentDate.toDateString().split(" ");
        if (eoy)
            arr[3] = (Number(arr[3]) - 1).toString();
        return arr[2] + " " + prevMonth + " " + arr[3];
    }

    onSubmitData(event) {
        var contextObj = this;
        var DeviceTypeIds: string = "";
        var blnModulesSelected = false;
        var listBoxData: IField;
        var rptFieldArray: any[];
        this.strSelectedIds = "";
        var fromDateIfield: IField;
        var toDateIfield: IField;
        if (contextObj.logbookParameterFieldData.length > 0) {
            fromDateIfield = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 500339; });
            toDateIfield = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 500340; });
            var frmDate = new Date(fromDateIfield.FieldValue);
            var toDate = new Date(toDateIfield.FieldValue);
            if (frmDate <= toDate) {
                if (contextObj.logbookParameterFieldData.length > 0) {
                    listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 1699; });
                    if (listBoxData.MultiFieldValues != null) {
                        for (let i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                            if (i == 0) {
                                this.strSelectedIds = listBoxData.MultiFieldValues[i];
                            }
                            else {
                                this.strSelectedIds = this.strSelectedIds + "," + listBoxData.MultiFieldValues[i];
                            }
                        }
                    }
                    listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 6325; });/*Device Type*/
                    if (listBoxData && listBoxData.MultiFieldValues != null) {
                        for (let i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                            if (i == 0) {
                                DeviceTypeIds = listBoxData.MultiFieldValues[i];
                            }
                            else {
                                DeviceTypeIds = DeviceTypeIds + "," + listBoxData.MultiFieldValues[i];
                            }
                        }
                    }
                }
                rptFieldArray = JSON.parse(event.fieldobject);
                for (let i = 0; i < rptFieldArray.length; i++) {
                    if (rptFieldArray[i].ReportFieldId == 1703) {
                        rptFieldArray[i].Value = "-1"; /*for all users*/
                        /*
                        switch (rptFieldArray[i].Value) {
                            case "0":
                                rptFieldArray[i].Value = "-1"; for all users
                                break;
                            case "1":
                                rptFieldArray[i].Value = "-3"; for others users
                                break;
                            case "2":
                                rptFieldArray[i].Value = "-2"; for Indus Admin Only
                                break;
                        }
                        */
                    }
                    if (i == 4) {
                        rptFieldArray[i].Value = this.strSelectedIds;
                    }
                    if (rptFieldArray[i].ReportFieldId == 6325) { /*Device Type*/
                        rptFieldArray[i].Value = DeviceTypeIds;
                    }
                }
                if (this.strSelectedIds != "") {
                    this.administrationService.postLogBookParameterFieldInsert(JSON.stringify(rptFieldArray)).subscribe(function (resultData) {
                        if (JSON.parse(resultData["Data"].FieldBinderData).length > 0) {
                            contextObj.logUserDataInput = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.logParameterListRptFields = JSON.stringify(rptFieldArray);
                            contextObj._notificationService.ShowToaster("Select Users", 2);
                            contextObj.sectionAccessExpansionStatus[0].isExpanded = false;
                            contextObj.sectionAccessExpansionStatus[1].isExpanded = true;
                        }
                        else {
                            contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                        }
                    })
                }
                else {
                    contextObj._notificationService.ShowToaster("Select at least one Module", 2);
                }
            }
            else {
                contextObj._notificationService.ShowToaster("To Date must be greater than From Date", 2);
            }
        }
    }

    getDataForEntities(event) {
        var contextObj = this;
        contextObj.logEntitiesInput = event.logEntitiesInput;
        contextObj.logParamDataforEntities = event.logParameterData;
        contextObj.logUserDataforEntities = event.logUserData;
        contextObj.sectionAccessExpansionStatus[1].isExpanded = false;
        contextObj.sectionAccessExpansionStatus[2].isExpanded = true;
    }

    getDataForActivities(event) {
        var contextObj = this;
        contextObj.logEntitiesDataforActivity = event.logEntities;
        contextObj.logParamDataforActivity = event.logParameterData;
        contextObj.logUserDataforActivity = event.logUserData;
        contextObj.logActivityInput = event.logActivityInput;
        contextObj.sectionAccessExpansionStatus[2].isExpanded = false;
        contextObj.sectionAccessExpansionStatus[3].isExpanded = true;
    }

    getDataForLog(event) {
        var contextObj = this;
        contextObj.pagingTarget = 2;
        if (event != null) {
            contextObj.strLogParams = JSON.stringify(event.logActivityList);
            contextObj.strLogUsers = event.logParamList;
            contextObj.strLogEvents = event.logUserList;
            contextObj.strLogActivities = event.logEntityList;
            this.administrationService.postLogListFieldInsert(JSON.stringify(event.logActivityList), event.logParamList, event.logUserList, event.logEntityList, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.sectionAccessExpansionStatus[3].isExpanded = false;
                    contextObj.splitViewLogBook.showSecondaryView = false;
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                    contextObj.splitViewLogBook.showSecondaryView = false;
                }
            })
        }
        else {
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
            }
            contextObj.splitViewLogBook.showSecondaryView = false;
        }
        contextObj.sectionAccessExpansionStatus[0].isExpanded = true;
    }

    getLogGenerateClick() { /*Random log generation*/
        var contextObj = this;
        var blnModulesSelected = false;
        var listBoxData: IField;
        var logParameterArray: any[];
        var logUserIdsArray: any[];
        var logEntityIdsArray: any[];
        var logActivityIdsArray: any[];
        this.strSelectedIds = "";
        if (contextObj.logbookParameterFieldData.length > 0) {
            listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 1699; });
            if (listBoxData.MultiFieldValues != null) {
                for (let i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                    if (i == 0) {
                        this.strSelectedIds = listBoxData.MultiFieldValues[i];
                    }
                    else {
                        this.strSelectedIds = this.strSelectedIds + "," + listBoxData.MultiFieldValues[i];
                    }
                }
            }
        }
        logParameterArray = JSON.parse(this.getData.getFieldValuesAsReportFieldArray(contextObj.logbookParameterFieldData));
        for (let i = 0; i < logParameterArray.length; i++) {
            if (logParameterArray[i].ReportFieldId == 1703) {
                switch (logParameterArray[i].Value) {
                    case "0":
                        logParameterArray[i].Value = "-1";
                        break;
                    case "1":
                        logParameterArray[i].Value = "-3";
                        break;
                    case "2":
                        logParameterArray[i].Value = "-2";
                        break;
                }
            }
            if (i == 4) {
                logParameterArray[i].Value = this.strSelectedIds;
            }
        }
        if (this.strSelectedIds != "") {
            this.administrationService.postLogListOnRandomSelection(JSON.stringify(logParameterArray), "", "", "", contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            })
        }
        else {
            contextObj._notificationService.ShowToaster("Select at least one Module", 2);
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        if (contextObj.pagingTarget == 1) {
            this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
        else if (contextObj.pagingTarget == 2) {
            this.administrationService.postLogListFieldInsert(contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            })
        }
    };

    public onSort(objGrid: any) {
        var contextObj = this;
        if (contextObj.pagingTarget == 1) {
            this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
        else if (contextObj.pagingTarget == 2) {
            this.administrationService.postLogListFieldInsert(contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            })
        }
    }

    private onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;

            } else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    }
    ExportToExcel() {
        var contextObj = this;
        var fieldObjectsCopy = contextObj.fieldObjectLog.slice();//copy of field object  
        var fileName = "Logbook-Details";
        debugger
        var input = contextObj.administrationService.getInputExportHighlighted(contextObj.inputItems.selectedIds, fileName, contextObj.pagingTarget, fieldObjectsCopy, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities);
        contextObj.exportObject.ExportDataFromServer(input, 5, fileName, function (retCode) {
            if (retCode == 0)
                contextObj._notificationService.ShowToaster("Log Activites exported", 3);
            //else
            //    contextObj._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });
    }
}

