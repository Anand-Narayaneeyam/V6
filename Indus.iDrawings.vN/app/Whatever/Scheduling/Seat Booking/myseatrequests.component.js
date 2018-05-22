var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../framework/models/export/exporttoexcel.service.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var general_1 = require('../../../models/common/general');
var bookseat_component_1 = require('./bookseat.component');
var exporttoexcel_service_1 = require('../../../framework/models/export/exporttoexcel.service');
var customsearchforscheduling_component_1 = require('../seat booking/customsearchforscheduling.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var MySeatRequestGridComponent = (function () {
    function MySeatRequestGridComponent(administrationService, schedulingService, notificationService, generFun, exportObject) {
        this.administrationService = administrationService;
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.pageTitle = "";
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "", sortCol: "" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.showConformation = false;
        this.cancelRequestStatusId = 39;
        this.checkInStatusId = 40;
        this.checkOutStatusId = 32;
        this.confirmMessages = { "key": 0, "message": "" };
        this.pagePath = "Scheduling / My Reservations";
        this.isChkBxChecked = 1;
        this.seattxt = "Workspace";
        this.showEditReqSeat = false;
        this.confirmStatusReqIds = [];
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.cancelOwnReservation = false;
        this.menuData = [
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
        this.enableMenu = [];
        this.isSmartSearch = false;
        this.disable = false;
        this.reservationLabel = "Request Token";
        this.IsProxyReservationEnabled = false;
    }
    MySeatRequestGridComponent.prototype.ngOnInit = function () {
        //this.pagePath = "Employee / Scenarios ";
        var contextObj = this;
        this.schedulingService.getSeatRequestListColumns().subscribe(function (resultData) {
            var count = 2;
            resultData["Data"].find(function (el) {
                if (el.FieldId == 2009 || el.FieldId == 2010) {
                    el.IsVisible = false;
                    count--;
                }
                if (count == 0) {
                    var fobj = [];
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1999) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1980) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1986) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1984) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2002) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2004) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1995) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2007) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2008) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1983) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1982) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 1981) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2088) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2006) {
                        return el;
                    } }));
                    fobj.push(resultData["Data"].find(function (el) { if (el.FieldId == 2005) {
                        return el;
                    } }));
                    contextObj.fieldObject = fobj;
                    return true;
                }
                else
                    return false;
            });
            contextObj.schedulingService.getSessionData().subscribe(function (data) {
                var retData = data["Data"];
                contextObj.sessionUserRoleId = retData["UserRoleId"];
                contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.sessionUserRoleId).subscribe(function (result) {
                    if (result.Data.DataCount == 1) {
                        contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                    }
                    contextObj.checkSubscribedFeatures();
                });
            });
        });
        this.dataLoad(1, contextObj);
        setTimeout(function () {
            contextObj.administrationService.getkeywordFields(481).subscribe(function (resultData) {
                //resultData["FieldBinderList"].find(function (item) {
                //    if (item.FieldId == 2517) {
                //        item.FieldLabel = contextObj.reservationLabel;
                //    }
                //});
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                contextObj.keyWordLookup = resultData["FieldBinderList"];
            });
        }, 3000);
    };
    MySeatRequestGridComponent.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('245,248,274,284').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == false) {
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 2; }), 1);
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 3; }), 1);
            }
            else {
                if (result["Data"][1]["IsSubscribed"] == true && contextObj.IsProxyReservationEnabled == false) {
                    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 2; }), 1);
                    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 3; }), 1);
                }
            }
            if (result["Data"][2]["IsSubscribed"] == true) {
                contextObj.seattxt = result["Data"][2].Value;
            }
            if (result["Data"][3]["IsSubscribed"] == true) {
                contextObj.cancelOwnReservation = result["Data"][3].Value;
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
    };
    MySeatRequestGridComponent.prototype.dataLoad = function (target, context) {
        var contextObj = this;
        if (this.IsAdvanceSearch == 0 && this.IsKeyWordSearch == 0) {
            context.schedulingService.seatMyRequestListData(context.SelectedSpaceId, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.isChkBxChecked).subscribe(function (resultData) {
                context.totalItems = resultData["Data"].DataCount;
                debugger;
                if (context.totalItems > 0) {
                    context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                    if (target == 1) {
                        context.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    context.disable = false;
                }
                else {
                    setTimeout(function () {
                        var tabtag = document.getElementsByTagName("tabs");
                        if (tabtag && tabtag.length > 0) {
                            var activereservationtag = tabtag[0].getElementsByTagName("a");
                            if (activereservationtag && activereservationtag.length > 1)
                                window["GlobalFocusVariable"] = activereservationtag[1];
                        }
                    }, 500);
                    context.disable = true;
                    context.notificationService.ShowToaster("No Reservations exist", 2);
                    context.enableMenu = [];
                }
            });
        }
        if (this.IsAdvanceSearch == 1 && this.IsKeyWordSearch == 0) {
            contextObj.schedulingService.seatMyRequestSearchListData(0, 481, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            });
        }
        if (this.IsAdvanceSearch == 0 && this.IsKeyWordSearch == 1) {
            contextObj.schedulingService.seatMyRequestSearchListData(0, 479, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            });
        }
    };
    MySeatRequestGridComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    MySeatRequestGridComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    MySeatRequestGridComponent.prototype.onSubMenuChange = function (event) {
        this.pageTitle = "";
        switch (event.value) {
            case 1:
                if ((this.inputItems.rowData["Reserved UserId"] != this.inputItems.rowData["Added UserId"]) && this.IsProxyReservationEnabled == false) {
                    this.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
                }
                else if ((this.inputItems.rowData["Reserved UserId"] == this.inputItems.rowData["Added UserId"]) && this.IsProxyReservationEnabled == false) {
                    if (this.cancelOwnReservation == true)
                        this.cancelRequestOnClick();
                    else
                        this.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
                }
                else {
                    //  if (this.IsProxyReservationEnabled == true) {
                    this.cancelRequestOnClick();
                }
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkInOnClick();
                }
                break;
            case 3:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkOutOnClick();
                }
                break;
            case 4:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.requestbookDetlsEdit();
                }
                break;
            case 5:
                this.ExportGridData();
                break;
        }
    };
    MySeatRequestGridComponent.prototype.requestbookDetlsEdit = function () {
        var context = this;
        if (this.inputItems.rowData["StatusId"] != 41) {
            switch (this.inputItems.rowData["StatusId"]) {
                case 5:
                    context.notificationService.ShowToaster("Expired Reservations cannot be modified", 2);
                    break;
                case 32:
                    context.notificationService.ShowToaster("Checked out Reservations cannot be modified", 2);
                    break;
                case 39:
                    context.notificationService.ShowToaster("Cancelled Reservations cannot be modified", 2);
                    break;
                case 40:
                    context.notificationService.ShowToaster("Checked in Reservations cannot be modified", 2);
                    break;
                case 88:
                    context.notificationService.ShowToaster("Auto Bumped Reservations cannot be modified", 2);
                    break;
            }
        }
        else {
            // context.schedulingService.checkPermissionForEditSeatRequest(context.inputItems.selectedIds[0],false).subscribe(function (result) {
            //if (result == true) {
            var selRowData = context.inputItems.rowData;
            if (selRowData["IsEditable"] == 1) {
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
                                    case 1687:
                                        resultData["Data"][i].FieldValue = frmdate;
                                        break;
                                    case 2306:
                                        resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                            return item["Id"] < 6;
                                        });
                                        break;
                                    case 1695:
                                        resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                        resultData["Data"][i].FieldValue = frmtime;
                                        break;
                                    case 1688:
                                        resultData["Data"][i].FieldValue = todate;
                                        break;
                                    case 1696:
                                        resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                        resultData["Data"][i].FieldValue = totime;
                                        break;
                                    case 1697:
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 1725:
                                        resultData["Data"][i].FieldValue = "1";
                                        //if (context.sessionUserRoleId == 4) {
                                        resultData["Data"][i].IsVisible = false;
                                        //}
                                        break;
                                    case 1692:
                                        resultData["Data"][i].FieldValue = selRowData["Reserved UserId"];
                                        resultData["Data"][i].IsEnabled = false;
                                        if (context.IsProxyReservationEnabled == true) {
                                            resultData["Data"][i].IsVisible = true;
                                        }
                                        else {
                                            resultData["Data"][i].IsVisible = false;
                                        }
                                        break;
                                    case 698:
                                        resultData["Data"][i].IsEnabled = false;
                                        break;
                                    case 2050:
                                        resultData["Data"][i].FieldValue = selRowData["Time Zone"];
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 1981: /*location related space details hide*/
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
            }
            else {
                context.notificationService.ShowToaster("You do not have the privilege to edit the selected reservation", 2);
            }
        }
    };
    MySeatRequestGridComponent.prototype.getFormattedDate = function (dt) {
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
    };
    MySeatRequestGridComponent.prototype.getTimeIdForddl = function (date) {
        var d = new Date(date);
        var n = d.getHours();
        var m = d.getMinutes();
        var timeid = 0;
        if (m == 0) {
            timeid = (n * 2) + 1;
        }
        else
            timeid = (n * 2) + 2;
        //if (timeid == 48)
        //    timeid = 0;
        return timeid.toString();
    };
    MySeatRequestGridComponent.prototype.reserveSeatSubmitRet = function (event) {
        this.refreshgrid = [];
        //this.generFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.dataLoad(1, this);
        //this.refreshgrid = this.refreshgrid.concat([true]);
        this.splitviewInput.showSecondaryView = false;
    };
    MySeatRequestGridComponent.prototype.cancelRequestOnClick = function () {
        var context = this;
        var requestIds = this.inputItems.selectedIds;
        var statusarrLen = requestIds.length;
        this.confirmStatusReqIds = [];
        if (statusarrLen > 1) {
            var cancelCnt = 0;
            var CheckedInCnt = 0;
            var checkedOutCnt = 0;
            var expiredCnt = 0;
            var autoBumpCnt = 0;
            var confCnt = 0;
            var tempStatus;
            for (var i = 0; i < statusarrLen; i++) {
                switch (this.inputItems.rowData[i]["StatusId"]) {
                    case 5:
                        expiredCnt++;
                        break;
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
                        this.confirmStatusReqIds.push(this.inputItems.rowData[i]["Id"]);
                        confCnt++;
                        break;
                }
            }
            if (statusarrLen == expiredCnt) {
                tempStatus = 5;
            }
            else if (statusarrLen == checkedOutCnt) {
                tempStatus = 32;
            }
            else if (statusarrLen == cancelCnt) {
                tempStatus = 39;
            }
            else if (statusarrLen == CheckedInCnt) {
                tempStatus = 40;
            }
            else if (statusarrLen == autoBumpCnt) {
                tempStatus = 88;
            }
            else if (statusarrLen == confCnt) {
                tempStatus = 41;
            }
            else if (confCnt > 0) {
                tempStatus = 0;
            }
            else
                tempStatus = -1;
            this.statusMsgSettings(tempStatus, 1, context);
        }
        else {
            this.statusMsgSettings(this.inputItems.rowData["StatusId"], 0, context);
        }
    };
    MySeatRequestGridComponent.prototype.statusMsgSettings = function (statusId, IsMultiple, context) {
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
                // var msg = IsMultiple == 1 ? "Are you sure you want to cancel the selected Reservations?" : "Are you sure you want to cancel the selected Reservation?";
                context.confirmMessages = { key: 1, message: "Are you sure you want to cancel the selected Reservation(s)?" };
                context.showConformation = true;
                break;
            case 0:
                context.confirmMessages = { key: 1, message: "Some of the Reservations are not in confirmed status. Do you want to proceed?" };
                context.showConformation = true;
                break;
            case -1:
                context.notificationService.ShowToaster("Selected Reservations cannot be cancelled", 2);
                break;
        }
    };
    MySeatRequestGridComponent.prototype.checkOutOnClick = function () {
        var requestId = this.inputItems.selectedIds[0];
        var statusId = this.itemSource.find(function (el) { return el.Id === requestId; })['StatusId'];
        if (statusId != 40) {
            if (statusId == "32") {
                this.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
            }
            else {
                this.notificationService.ShowToaster("Selected Reservation is not checked in", 2);
            }
        }
        else {
            this.confirmMessages = { key: 3, message: "Are you sure you want to check out the selected Reservation?" };
            this.showConformation = true;
        }
    };
    MySeatRequestGridComponent.prototype.checkInOnClick = function () {
        var contextObj = this;
        var requestId = this.inputItems.selectedIds[0];
        var statusId = this.itemSource.find(function (el) { return el.Id === requestId; })['StatusId'];
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
                this.notificationService.ShowToaster("Selected Reservation is cancelled", 2);
            }
            else if (statusId == 88) {
                this.notificationService.ShowToaster("Selected Reservation is not confirmed, cannot be checked in", 2);
            }
        }
        else {
            var strFromDate;
            var strToDate;
            strFromDate = this.itemSource.find(function (el) { return el.Id === requestId; })['From'];
            if (strFromDate == "-1")
                return;
            strToDate = this.itemSource.find(function (el) { return el.Id === requestId; })['To'];
            if (strToDate == "-1")
                return;
            this.schedulingService.isCheckInCheckOutPossible(requestId, strFromDate, strToDate, true).subscribe(function (result) {
                var status = result;
                switch (result) {
                    case "-1":
                        contextObj.notificationService.ShowToaster("Reservation can be Checked In only by the user selected in 'Booked for'", 2);
                        break;
                    case "1":
                        contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                        break;
                    case "2":
                        contextObj.notificationService.ShowToaster("Check In allowed only before Scheduled time", 2);
                        break;
                    case "0":
                        contextObj.confirmMessages = { key: 2, message: "Are you sure you want to check in the selected Reservation?" };
                        contextObj.showConformation = true;
                        break;
                    case "4":
                        contextObj.notificationService.ShowToaster("Check In allowed only before Scheduled time", 2);
                        break;
                    case "5":
                        contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled date", 2);
                        break;
                    default:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            });
        }
    };
    MySeatRequestGridComponent.prototype.modelCallForUpdation = function (statusId) {
        debugger;
        var requestId = this.inputItems.selectedIds[0];
        var reqIds = [];
        var selLength = this.inputItems.selectedIds.length;
        if (statusId == 39) {
            reqIds = selLength > 1 ? this.confirmStatusReqIds : this.inputItems.selectedIds;
        }
        var isHoteling = 1;
        this.refreshgrid = [];
        var retUpdatedSrc;
        var contextObj = this;
        this.schedulingService.updateStatusOfRequest(requestId, statusId, isHoteling, reqIds).subscribe(function (result) {
            if (result.ServerId >= 0) {
                var event = { "returnData": result["Data"] };
                if (selLength == 1) {
                    if (contextObj.confirmMessages.key == 1 && contextObj.isChkBxChecked == 1) {
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "delete", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemSrc"].length;
                        if (retUpdatedSrc["itemSrc"].length == 0) {
                            contextObj.enableMenu = [];
                        }
                    }
                    else {
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    }
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
                else {
                    contextObj.itemSource = [];
                    contextObj.dataLoad(1, contextObj);
                }
                switch (statusId) {
                    case 39:
                        contextObj.notificationService.ShowToaster("Cancelled successfully", 3);
                        break;
                    case 40:
                        contextObj.notificationService.ShowToaster("Checked In successfully", 3);
                        break;
                    case 32:
                        contextObj.notificationService.ShowToaster("Checked Out successfully", 3);
                        break;
                }
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.showConformation = false;
        });
    };
    MySeatRequestGridComponent.prototype.yesOnClick = function (messageKey) {
        if (messageKey == 1) {
            this.modelCallForUpdation(this.cancelRequestStatusId);
        }
        else if (messageKey == 2) {
            this.modelCallForUpdation(this.checkInStatusId);
        }
        else if (messageKey == 3) {
            this.modelCallForUpdation(this.checkOutStatusId);
        }
    };
    MySeatRequestGridComponent.prototype.closeSlide = function (event) {
        this.showConformation = false;
    };
    MySeatRequestGridComponent.prototype.chkboxClick = function (event) {
        var contextObj = this;
        var srcelment = event.target || event.srcElement;
        this.isChkBxChecked = srcelment.checked == true ? 1 : 0;
        this.pageIndex = srcelment.checked == true ? 0 : this.pageIndex;
        this.itemSource = [];
        this.dataLoad(1, contextObj);
    };
    MySeatRequestGridComponent.prototype.ExportGridData = function () {
        var context = this;
        var fieldObjectsCopy = context.fieldObject.slice(); //copy of field object  
        var fileName = context.seattxt + " - My Reservations";
        if (context.inputItems.selectedIds.length > 1) {
            var input = context.schedulingService.getWorkspaceEquipmentExportHighlighted(context.inputItems.selectedIds, context.isChkBxChecked, 363, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("My Reservations List exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
        else {
            var input = context.schedulingService.getMySeatRequestExportInput(context.isChkBxChecked, 363, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("My Reservations List exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
    };
    MySeatRequestGridComponent.prototype.AdvanceSearch = function () {
        var contextObj = this;
        contextObj.administrationService.getAllAdvanceSearchLookup(481).subscribe(function (result) {
            //result["Data"]["FieldBinderList"].find(function (item) {
            //    if (item.FieldId == 2517) {
            //        item.FieldLabel = contextObj.reservationLabel;
            //    }
            //});
            contextObj.advancelookup = result["Data"]["FieldBinderList"];
        });
    };
    MySeatRequestGridComponent.prototype.Clear = function (event, target) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    MySeatRequestGridComponent.prototype.advanceSearchSubmit = function (event) {
        var contextObj = this;
        contextObj.showSearchFilter = [];
        contextObj.IsKeyWordSearch = 0;
        contextObj.IsAdvanceSearch = 1;
        contextObj.advanceValue = event.fieldobject;
        var fromdateTime = event.fromdateTime;
        var todateTime = event.todateTime;
        var fromtime;
        var totime;
        if (fromdateTime.indexOf("PM") > 0)
            fromtime = fromdateTime.replace("PM", ":00 PM");
        else if (fromdateTime.indexOf("AM") > 0)
            fromtime = fromdateTime.replace("AM", ":00 AM");
        if (todateTime.indexOf("PM") > 0)
            totime = todateTime.replace("PM", ":00 PM");
        else if (todateTime.indexOf("AM") > 0)
            totime = todateTime.replace("AM", ":00 AM");
        if (new Date(fromtime) >= new Date(totime)) {
            contextObj.showSearchFilter = contextObj.showSearchFilter.concat(true);
            //contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
        }
        else {
            contextObj.advanceValue = event.fieldobject;
            contextObj.StartDate = event.fromdateTime;
            contextObj.EndDate = event.todateTime;
            contextObj.pageIndex = 0;
            this.dataLoad(0, contextObj);
        }
    };
    MySeatRequestGridComponent.prototype.keywordSearchSubmit = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        contextObj.pageIndex = 0;
        this.dataLoad(0, contextObj);
        //contextObj.schedulingService.seatMyRequestSearchListData(0, 479, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
        //    contextObj.totalItems = resultData["Data"].DataCount;
        //    contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
        //    if (contextObj.totalItems == 0) {
        //        contextObj.notificationService.ShowToaster("No Reservations exist", 2);
        //        contextObj.enableMenu = [];
        //    }
        //});
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MySeatRequestGridComponent.prototype, "sessionUserRoleId", void 0);
    MySeatRequestGridComponent = __decorate([
        core_1.Component({
            selector: 'myseatrequest-list',
            templateUrl: './app/Views/Scheduling/Seat Booking/myseatrequests.component.html',
            directives: [customsearchforscheduling_component_1.Searchforschedule, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, bookseat_component_1.BookSeatComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, scheduling_service_1.SchedulingService, general_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, general_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel])
    ], MySeatRequestGridComponent);
    return MySeatRequestGridComponent;
}());
exports.MySeatRequestGridComponent = MySeatRequestGridComponent;
//# sourceMappingURL=myseatrequests.component.js.map