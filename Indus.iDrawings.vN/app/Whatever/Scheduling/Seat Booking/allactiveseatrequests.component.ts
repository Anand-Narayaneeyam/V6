﻿import {Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { BookSeatComponent } from './bookseat.component';
import {ExportToExcel} from '../../../framework/models/export/exporttoexcel.service'
import { Searchforschedule } from '../seat booking/customsearchforscheduling.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
@Component({
    selector: 'allactiveseatreq-list',
    templateUrl: './app/Views/Scheduling/Seat Booking/allactiveseatrequests.component.html',
    directives: [Searchforschedule, SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, BookSeatComponent],
    providers: [HTTP_PROVIDERS, NotificationService, SchedulingService, GeneralFunctions, ExportToExcel]


})

export class ActiveSeatReqGridComponent {
    @Input() sessionUserRoleId: number;
    pageTitle: string = "";
    fieldObject: IField[];
    fieldDetailseditBook: IField[];
    itemSource: any[];
    inputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "", sortCol: "" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    cancelRequestStatusId = 39;
    checkInStatusId = 40;
    checkOutStatusId = 32;
    refreshgrid: any;
    showConformation: boolean = false;
    confirmMessages = { "key": 0, "message": "" };
    pagePath = "Scheduling / Active Reservations";
    seattxt = "Workspace"
    showEditReqSeat: boolean = false;
    Sitetime: string;
    isChkBxChecked = 1;
    activeconfirmStatusReqIds = [];

    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    isSmartSearch: boolean = false;
    exportDataSource: any;
    StartDate: string;
    IsAdvanceSearch = 0;
    EndDate: string;
    FromTime: any;
    Totime: any;
    disable: boolean = false;
    searchTitle: string;
    menuData = [
        {
            "id": 4,
            "title": "Modify",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Cancel Reservation",
            "image": "Cancel Request",
            "path": "Cancel Request",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Check In",
            "image": "Check In",
            "path": "Check in",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Check Out",
            "image": "Check Out",
            "path": "Check Out",
            "submenu": null
        },
        {
            "id": 5,
            "title": "Export",
            "image": "Export",
            "path": "Export"

        }
    ];
    KeywordFieldObject: any;
    enableMenu = [];
    advancelookup: IField[];
    keyWordLookup: any;
    showSearchFilter;
    reservationLabel = "Request Token";
    IsProxyReservationEnabled: boolean = false;
    constructor(private administrationService: AdministrationService, private schedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel) {
    }
    ngOnInit() {
        var contextObj = this;
        this.schedulingService.getSeatRequestListColumns().subscribe(function (resultData) {
            var count = 2;
            resultData["Data"].find(function (el) {
                if (el.FieldId == 2009 || el.FieldId == 2010) {
                    el.IsVisible = false;
                    count--;
                }
                if (count == 0)
                    return true;
                else
                    return false;
            });
            var fobj = [];
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1999) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1980) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1986) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1984) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2002) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2004) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 1990) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1990) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 1991) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1991) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 1992) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1992) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 1993) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1993) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 1994) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1994) { return el } }));
            if (resultData["Data"].find(function (el) { if (el.FieldId == 2557) { return el } }) != null)
                fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2557) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2005) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2007) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1995) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2008) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1983) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1982) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1981) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2088) { return el } }));
            fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2006) { return el } }));

            contextObj.fieldObject = fobj;
            //contextObj.fieldObject = resultData["Data"];
        });
        
        this.dataLoad(1, contextObj);
        setTimeout(function () {
            contextObj.administrationService.getkeywordFields(455).subscribe(function (resultData) {
                //resultData["Data"]["FieldBinderList"].find(function (item) {
                //    if (item.FieldId == 2517) {
                //        item.FieldLabel = contextObj.reservationLabel;
                //    }
                //});
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                contextObj.keyWordLookup = resultData["FieldBinderList"];
            });

        }, 3000);
        contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.sessionUserRoleId).subscribe(function (result) {
            if (result.Data.DataCount == 1) {
                contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
            }
            contextObj.checkSubscribedFeatures();
        });
        //if (this.sessionUserRoleId != 7) {
        //    this.menuData.splice(this.menuData.findIndex(function (el) { return el.id == 2 }), 1);
        //    this.menuData.splice(this.menuData.findIndex(function (el) { return el.id == 3 }), 1);
        //}
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('245,248,274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == false) {
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 2 }), 1);
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 3 }), 1);
            }
            else {
                if (result["Data"][1]["IsSubscribed"] == true && contextObj.IsProxyReservationEnabled == false) {
                    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 2 }), 1);
                    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 3 }), 1);
                }
            }
            if (result["Data"][2]["IsSubscribed"] == true) {
                contextObj.seattxt = result["Data"][2].Value;
            }
            contextObj.searchTitle = "Search " + contextObj.seattxt + " Reservation";
        });
        //contextObj.schedulingService.checkSubscribedFeature('273').subscribe(function (result) {
        //    if (result["Data"][0]["IsSubscribed"] == true) {
        //        contextObj.reservationLabel = result["Data"][0].Value;
        //    }
        //    contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
        //        if (item.FieldId == 1995) {
        //            item.FieldLabel = contextObj.reservationLabel;
        //        }
        //        return true;
        //    });
        //});
    }
    public dataLoad(target?: number, context?: any) {
        var contextObj = this;
        if (this.IsAdvanceSearch == 0 && this.IsKeyWordSearch == 0) {
            context.schedulingService.seatAllActiveReqListData(context.SelectedSpaceId, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.isChkBxChecked).subscribe(function (resultData) {
                context.totalItems = resultData["Data"].DataCount;

                if (context.totalItems > 0) {
                    context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                    if (target == 1) {
                        context.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    context.disable = false;
                }
                else {
                    context.notificationService.ShowToaster("No Active Reservations exist", 2);
                    context.enableMenu = [];
                    context.disable = true;
                }
            });
        }
        if (this.IsAdvanceSearch == 1 && this.IsKeyWordSearch == 0) {
            contextObj.schedulingService.seatAllAdvancedSearchActiveReqListData(0, 457, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemSource = JSON.parse(resultData.FieldBinderData);

                if (contextObj.totalItems == 0) {


                    contextObj.notificationService.ShowToaster("No Active Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            });
        }
        if (this.IsAdvanceSearch == 0 && this.IsKeyWordSearch == 1) {
            contextObj.schedulingService.seatAllSearchActiveReqListData(0, 455, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {

                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems == 0) {

                    contextObj.notificationService.ShowToaster("No Active Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            });
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
    public onSubMenuChange(event: any) {
        this.pageTitle = "";
        switch (event.value) {
            case 1:
                this.cancelRequestOnClick();
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.checkInOnClick();
                }
                break;
            case 3:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.checkOutOnClick();
                }
                break;
            case 4:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.requestbookDetlsEdit();
                }
                break;
            case 5: this.ExportGridData();
                break;
        }

    }
    private requestbookDetlsEdit() {
        if (this.inputItems.rowData["StatusId"] != 41) {
            switch (this.inputItems.rowData["StatusId"]) {
                case 5:
                    this.notificationService.ShowToaster("Expired Reservations cannot be modified", 2);
                    break;
                case 32:
                    this.notificationService.ShowToaster("Checked out Reservations cannot be modified", 2);
                    break;
                case 39:
                    this.notificationService.ShowToaster("Cancelled Reservations cannot be modified", 2);
                    break;
                case 40:
                    this.notificationService.ShowToaster("Checked in Reservations cannot be modified", 2);
                    break;
                case 88:
                    this.notificationService.ShowToaster("Auto Bumped Reservations cannot be modified", 2);
                    break;

            }

        } else {
            var context = this;
            context.schedulingService.checkPermissionForEditSeatRequest(context.inputItems.selectedIds).subscribe(function (result) {
                if (result == true) {
                    var selRowData = context.inputItems.rowData;
                    var fromdatetime = selRowData["From"];
                    var todateTime = selRowData["To"];
                    var frmdate = context.getFormattedDate(new Date(fromdatetime));
                    var frmtime = context.getTimeIdForddl(fromdatetime);
                    var todate = context.getFormattedDate(new Date(todateTime));
                    var totime = context.getTimeIdForddl(todateTime);

                    context.schedulingService.getTimeforspace(selRowData["SpaceId"]).subscribe(function (resulttime) {
                        context.Sitetime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                        context.schedulingService.getSeatBookFields(selRowData["SeatId"]).subscribe(function (resultData) {
                            if (resultData["Data"]) {
                                for (var i = 0; i < resultData["Data"].length; i++) {
                                    var holidays = [1, 7];
                                    switch (resultData["Data"][i].FieldId) {
                                        case 1687://fromdate
                                            resultData["Data"][i].FieldValue = frmdate;
                                            break;
                                        case 2306://recur   
                                            resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                                return item["Id"] < 6;
                                            });
                                            break;
                                        case 1695://fromtime   
                                            resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                            resultData["Data"][i].FieldValue = frmtime;
                                            break;
                                        case 1688://todate
                                            resultData["Data"][i].FieldValue = todate;
                                            break;
                                        case 1696://totime
                                            resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                            resultData["Data"][i].FieldValue = totime;
                                            break;
                                        case 1697://group location
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1725:/*user type*/

                                            resultData["Data"][i].FieldValue = "1";
                                            //if (context.sessionUserRoleId == 4) {
                                            resultData["Data"][i].IsVisible = false;
                                            //}
                                            break;
                                        case 1692:/*booked for hiding for facility user*/

                                            resultData["Data"][i].FieldValue = selRowData["Reserved UserId"];
                                            resultData["Data"][i].IsEnabled = false;
                                            if (context.IsProxyReservationEnabled == true) {
                                                resultData["Data"][i].IsVisible = true;
                                            } else {
                                                resultData["Data"][i].IsVisible = false;
                                            }
                                            break;
                                        case 698:/*space function*/
                                            resultData["Data"][i].IsEnabled = false;
                                            break;
                                        case 2050:/*sitetimezone*/
                                            resultData["Data"][i].FieldValue = selRowData["Time Zone"];
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1981:/*location related space details hide*/
                                        case 1982:
                                        case 1983:
                                        case 1987:
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1984:
                                            resultData["Data"][i].IsVisible = false;
                                            resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue.toString().replace("'", "");
                                            break;
                                        case 465:
                                            resultData["Data"][i].IsVisible = true;
                                            break;
                                        case 1540:
                                            resultData["Data"][i].FieldValue = "1";
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 2040:
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1732:
                                            resultData["Data"][i].FieldValue = selRowData["Comments"];
                                            break;

                                    }

                                }
                                context.fieldDetailseditBook = resultData["Data"];
                                context.showEditReqSeat = true;
                                context.pageTitle = "Modify " + context.seattxt + " Reservation";

                                context.splitviewInput.showSecondaryView = true;
                            }
                        });
                    });
                } else {
                    context.notificationService.ShowToaster("You do not have the privilege to edit the selected reservation", 2);
                }
            });
        }
    }

    private getFormattedDate(dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    }
    private getTimeIdForddl(date) {
        var d = new Date(date);
        var n = d.getHours();
        var m = d.getMinutes();
        var timeid = 0;
        if (m == 0) {
            timeid = (n * 2) + 1
        }
        else
            timeid = (n * 2) + 2;
        //if (timeid == 48)
        //    timeid = 0;
        return timeid.toString();
    }
    private reserveSeatSubmitRet(event) {
        this.refreshgrid = [];
        //this.generFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.dataLoad(1, this);
        //this.refreshgrid = this.refreshgrid.concat([true]);     
        this.splitviewInput.showSecondaryView = false;

    }
    cancelRequestOnClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Reservation", 2);
        } else {
            var requestIds = this.inputItems.selectedIds;
            var selIdLen = this.inputItems.selectedIds.length;
            var context = this;

            this.schedulingService.checkPermissionForEditSeatRequest(requestIds).subscribe(function (result) {
                if (result == true) {
                    context.activeconfirmStatusReqIds = [];
                    if (selIdLen > 1) {
                        var cancelCnt = 0;
                        var CheckedInCnt = 0;
                        var checkedOutCnt = 0;
                        var expiredCnt = 0;
                        var autoBumpCnt = 0;
                        var confCnt = 0;
                        var tempStatus;
                        for (var i = 0; i < selIdLen; i++) {
                            switch (context.inputItems.rowData[i]["StatusId"]) {
                                case 5:
                                    expiredCnt++;
                                    break
                                case 32:
                                    checkedOutCnt++;
                                    break;
                                case 39:
                                    cancelCnt++;
                                    break;
                                case 40:
                                    CheckedInCnt++;
                                    break;
                                case 88:
                                    autoBumpCnt++;
                                    break;
                                case 41:
                                    context.activeconfirmStatusReqIds.push(context.inputItems.rowData[i]["Id"]);
                                    confCnt++;
                                    break;
                            }
                        }

                        if (selIdLen == expiredCnt) {
                            tempStatus = 5;
                        } else if (selIdLen == checkedOutCnt) {
                            tempStatus = 32;
                        } else if (selIdLen == cancelCnt) {
                            tempStatus = 39;
                        } else if (selIdLen == CheckedInCnt) {
                            tempStatus = 40;
                        } else if (selIdLen == autoBumpCnt) {
                            tempStatus = 88;
                        } else if (selIdLen == confCnt) {
                            tempStatus = 41;
                        } else if (confCnt > 0) {
                            tempStatus = 0;
                        } else tempStatus = -1;

                        context.statusMsgSettings(tempStatus, 1, context);

                    } else {
                        context.statusMsgSettings(context.inputItems.rowData["StatusId"], 0, context);
                    }
                    //var statusId = context.itemSource.find(function (el) { return el.Id === requestId })['StatusId'];
                    //if (statusId == "39") {
                    //    context.notificationService.ShowToaster("Selected Reservation is already cancelled", 2);
                    //}
                    //else if (statusId == "40") {
                    //    context.notificationService.ShowToaster("Selected Reservation is already checked in, cannot be cancelled", 2);
                    //}
                    //else if (statusId == "32") {
                    //    context.notificationService.ShowToaster("Selected Reservation is already checked out, cannot be cancelled", 2);
                    //} else if (statusId == "5") {
                    //    context.notificationService.ShowToaster("Expired Reservations cannot be cancelled", 2);
                    //}
                    //else if (statusId == "88") {
                    //    context.notificationService.ShowToaster("Reservations in 'Auto Bump' status cannot be cancelled", 2);
                    //} else {
                    //    context.confirmMessages = { key: 1, message: "Are you sure you want to cancel the selected Reservation?" };
                    //    context.showConformation = true;
                    //}
                } else {
                    if (selIdLen == 1) {
                        context.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
                    } else
                        context.notificationService.ShowToaster("Selected Reservations cannot be cancelled", 2);
                }
            });
        }
    }

    private statusMsgSettings(statusId, IsMultiple, context) {
        var adddText = " is";
        if (IsMultiple == 1) {
            adddText = "s are";
        }
        switch (statusId) {
            case 5:
                context.notificationService.ShowToaster("Expired Reservations cannot be cancelled", 2);
                break;
            case 32:
                context.notificationService.ShowToaster("Selected Reservation" + adddText + " already checked out, cannot be cancelled", 2);
                break;
            case 39:
                context.notificationService.ShowToaster("Selected Reservation" + adddText + " already cancelled", 2);
                break;
            case 40:
                context.notificationService.ShowToaster("Selected Reservation" + adddText + " already checked in, cannot be cancelled", 2);
                break;
            case 88:
                context.notificationService.ShowToaster("Reservations in 'Auto Bump' status cannot be cancelled", 2);
                break;
            case 41:
                //var msg = IsMultiple == 1 ? "Are you sure you want to cancel the selected Reservations?" : "Are you sure you want to cancel the selected Reservation?";
                context.confirmMessages = { key: 1, message: "Are you sure you want to cancel the selected Reservation(s)?" };
                context.showConformation = true;
                break;
            case 0: /*multiple*/
                context.confirmMessages = { key: 1, message: "Some of the Reservations are not in confirmed status. Do you want to proceed?" };
                context.showConformation = true;
                break;
            case -1:
                context.notificationService.ShowToaster("Selected Reservations cannot be cancelled", 2);
                break;

        }
    }
    checkOutOnClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Reservation", 2);
        } else {
            var requestId = this.inputItems.selectedIds[0];
            var statusId = this.itemSource.find(function (el) { return el.Id === requestId })['StatusId'];
            if (statusId != 40) {
                if (statusId == "32") {
                    this.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                }
                else {
                    this.notificationService.ShowToaster("Selected Reservation is not checked in", 2);
                }
            } else {
                this.confirmMessages = { key: 3, message: "Are you sure you want to check out the selected Reservation?" };
                this.showConformation = true;
            }
        }
    }
    checkInOnClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Reservation", 2);
        } else {
            var contextObj = this;
            var requestId = this.inputItems.selectedIds[0];
            var statusId = this.itemSource.find(function (el) { return el.Id === requestId })['StatusId'];
            if (statusId != 41) {
                if (statusId == 40) {
                    this.notificationService.ShowToaster("Selected Reservation is already checked in", 2);
                }
                else if (statusId == 34) {
                    this.notificationService.ShowToaster("Selected Reservation is not approved, cannot check in", 2);
                }
                else if (statusId == 32) {
                    this.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                }
                else if (statusId == 39) {
                    this.notificationService.ShowToaster(" Cancelled successfully", 2);
                }
                else if (statusId == 88) {
                    this.notificationService.ShowToaster("Selected Reservation is not confirmed, cannot be checked in", 2);
                }
            } else {
                var strFromDate;
                var strReturnFromDate;
                var strToDate;
                var strReturnToDate;
                strFromDate = this.itemSource.find(function (el) { return el.Id === requestId })['From'];
                if (strFromDate == "-1")
                    return
                // strReturnFromDate = getdate(strFromDate)               
                strToDate = this.itemSource.find(function (el) { return el.Id === requestId })['To'];
                if (strToDate == "-1")
                    return;
                this.schedulingService.isCheckInCheckOutPossible(requestId, strFromDate, strToDate, true).subscribe(function (result) {
                    switch (result) {
                        case "-1":
                            contextObj.notificationService.ShowToaster("Reservation can be Checked In only by the user selected in 'Booked for'", 2);
                            break;
                        case "1":
                            contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                            break;
                        case "2":
                            contextObj.notificationService.ShowToaster("Check In allowed only one hour before Scheduled time", 2);
                            break;
                        case "0":
                            contextObj.confirmMessages = { key: 2, message: "Are you sure you want to check in the selected Reservation?" };
                            contextObj.showConformation = true;
                            break
                        case "4":
                            contextObj.notificationService.ShowToaster("Check In allowed only before Scheduled time", 2);
                            break;
                        case "5":
                            contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled date", 2);
                            break;
                        default:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 2);
                            break;
                    }
                });
            }
        }
    }
    modelCallForUpdation(statusId: number) {
        var requestId = this.inputItems.selectedIds[0];
        var isHoteling = 1;
        this.refreshgrid = [];
        var retUpdatedSrc;
        var contextObj = this;

        var reqIds = [];
        var selLength = this.inputItems.selectedIds.length;
        if (statusId == 39) {
            reqIds = selLength > 1 ? this.activeconfirmStatusReqIds : this.inputItems.selectedIds;
        }

        this.schedulingService.updateStatusOfRequest(requestId, statusId, isHoteling, reqIds).subscribe(function (result) {
            if (result.ServerId >= 0) {
                if (selLength == 1) {
                    var event = { "returnData": result["Data"] };
                    if (contextObj.confirmMessages.key == 1 && contextObj.isChkBxChecked == 1) {
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "delete", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemSrc"].length;
                        if (retUpdatedSrc["itemSrc"].length == 0) {
                            contextObj.enableMenu = [];
                        }
                    } else {
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    }
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                } else {
                    contextObj.itemSource = [];
                    contextObj.dataLoad(1, contextObj);
                }
                switch (statusId) {
                    case 39: contextObj.notificationService.ShowToaster("Cancelled successfully", 3);
                        break;
                    case 40: contextObj.notificationService.ShowToaster("Checked In successfully", 3);
                        break;
                    case 32: contextObj.notificationService.ShowToaster("Checked Out successfully", 3);
                        break;
                }
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.showConformation = false;
        });

    }
    yesOnClick(messageKey) {
        if (messageKey == 1) {
            this.modelCallForUpdation(this.cancelRequestStatusId);
        } else if (messageKey == 2) {
            this.modelCallForUpdation(this.checkInStatusId);
        } else if (messageKey == 3) {
            this.modelCallForUpdation(this.checkOutStatusId);
        }
    }
    closeSlide(event) {
        this.showConformation = false;
    }
    chkboxClick(event) {
        var contextObj = this;
        var srcelment = event.target || event.srcElement;
        this.isChkBxChecked = srcelment.checked == true ? 1 : 0;
        this.pageIndex = srcelment.checked == true ? 0 : this.pageIndex;
        this.itemSource = [];
        this.dataLoad(1, contextObj);
    }
    private ExportGridData() {
        var context = this;
        var fieldObjectsCopy = context.fieldObject.slice();//copy of field object  
        var fileName = context.seattxt + " - Active Reservations";

        if (context.inputItems.selectedIds.length > 1) {
            var input = context.schedulingService.getWorkspaceEquipmentExportHighlighted(context.inputItems.selectedIds, context.isChkBxChecked, 368, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("Active Reservations List exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
            //context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            //context.exportObject.ExportData(context.exportDataSource, fieldObjectsCopy, fileName, function (retCode) {
            //    if (retCode == 0) {
            //        context.notificationService.ShowToaster("Active Reservations List exported", 3);
            //    }
            //    else { context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
            //});
        }
        else {

            var input = context.schedulingService.getActiveSeatRequestExportInput(context.isChkBxChecked, 368, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("Active Reservations List exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
    }
    AdvanceSearch() {

        var contextObj = this;

        contextObj.administrationService.getAllAdvanceSearchLookup(457).subscribe(function (result) {
            //result["Data"]["FieldBinderList"].find(function (item) {
            //    if (item.FieldId == 2517) {
            //        item.FieldLabel = contextObj.reservationLabel;
            //    }
            //});
            contextObj.advancelookup = result["Data"]["FieldBinderList"];

        });
    }

    advanceSearchSubmit(event: any) {


        var contextObj = this;
        contextObj.showSearchFilter = [];
        var contextObj = this;
        contextObj.IsKeyWordSearch = 0;
        contextObj.IsAdvanceSearch = 1;
        contextObj.advanceValue = event.fieldobject;
        var fromdateTime = event.fromdateTime;
        var todateTime = event.todateTime;
        var fromtime;
        var totime;
        if (fromdateTime.indexOf("PM") > 0)
            fromtime = fromdateTime.replace("PM", ":00 PM")
        else if (fromdateTime.indexOf("AM") > 0)
            fromtime = fromdateTime.replace("AM", ":00 AM")
        if (todateTime.indexOf("PM") > 0)
            totime = todateTime.replace("PM", ":00 PM")
        else if (todateTime.indexOf("AM") > 0)
            totime = todateTime.replace("AM", ":00 AM")
        if (new Date(fromtime) >= new Date(totime)) {
            contextObj.showSearchFilter = contextObj.showSearchFilter.concat(true);
            //contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);

        }
        else {
            contextObj.IsAdvanceSearch = 1;
            contextObj.advanceValue = event.fieldobject;
            contextObj.StartDate = event.fromdateTime;
            contextObj.EndDate = event.todateTime;
            contextObj.pageIndex = 0;
            this.dataLoad(0, contextObj);
            //contextObj.schedulingService.seatAllAdvancedSearchActiveReqListData(0, 457, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
            //    contextObj.totalItems = resultData.DataCount;
            //    contextObj.itemSource = JSON.parse(resultData.FieldBinderData);

            //    if (contextObj.totalItems == 0) {


            //        contextObj.notificationService.ShowToaster("No Active Reservations exist", 2);
            //        contextObj.enableMenu = [];
            //    }
            //});
        }
    }
    keywordSearchSubmit(event: any) {


        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        contextObj.pageIndex = 0;
        this.dataLoad(0, contextObj);
        //contextObj.schedulingService.seatAllSearchActiveReqListData(0,455, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {

        //    contextObj.totalItems = resultData["Data"].DataCount;
        //    contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
        //    if (contextObj.totalItems == 0) {

        //        contextObj.notificationService.ShowToaster("No Active Reservations exist", 2);
        //        contextObj.enableMenu = [];
        //    }
        //});
    }
    Clear(event: any, target) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
}