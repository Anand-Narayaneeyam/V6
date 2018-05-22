var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var reserveroom_reservationrequest_component_1 = require('../Room Booking/reserveroom-reservationrequest.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var my_active_requests_edit_component_1 = require('./my-active-requests-edit.component');
var exporttoexcel_service_1 = require('../../../framework/models/export/exporttoexcel.service');
var customsearchforscheduling_component_1 = require('../seat booking/customsearchforscheduling.component');
var MyActiveRequests = (function () {
    function MyActiveRequests(notificationService, getData, schedulingService, generFun, administrationService, exportObject) {
        this.notificationService = notificationService;
        this.getData = getData;
        this.schedulingService = schedulingService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.exportObject = exportObject;
        this.copyRequsetFlag = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", allowAdd: false, allowEdit: false };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.enableMenu = [];
        // pageTitle: string = "General Settings";
        this.pagePath = "";
        this.selectedTab = 0;
        this.myRequestsFlag = true;
        this.menuData = [
            {
                "id": 0,
                "title": "Modify",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
            },
            //{
            //    "id": 1,
            //    "title": "Reminder",
            //    "image": "Reminder",
            //    "path": "Reminder",
            //    "submenu": null,
            //},
            //{
            //    "id": 2,
            //    "title": "Copy Request",
            //    "image": "Copy Request",
            //    "path": "Copy Request",
            //},
            {
                "id": 3,
                "title": "Cancel Reservation",
                "image": "Cancel Request",
                "path": "Cancel Request",
                "submenu": null,
            },
            {
                "id": 5,
                "title": "Check In",
                "image": "Check In",
                "path": "Check In",
            },
            {
                "id": 6,
                "title": "Check Out",
                "image": "Check Out",
                "path": "Check Out",
                "submenu": null,
            },
            //{
            //    "id": 4,
            //    "title": "Invitee Status",
            //    "image": "Invitee Status",
            //    "path": "Invitee Status",
            //    "submenu": null,
            //},
            {
                "id": 7,
                "title": "Export",
                "image": "Export",
                "path": "Export"
            }
        ];
        this.inputItemsActiveRequests = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItemsActiveRequests = 0;
        this.itemsPerPageActiveRequests = 0;
        this.pageIndexActiveRequests = 0;
        this.enableMenuActiveRequests = [];
        this.activeRequestsFlag = false;
        this.menuDataActiveRequests = [
            {
                "id": 0,
                "title": "Modify",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
            },
            //{
            //    "id": 4,
            //    "title": "Reminder",
            //    "image": "Reminder",
            //    "path": "Reminder",
            //    "submenu": null,
            //},
            {
                "id": 1,
                "title": "Cancel Reservation",
                "image": "Cancel Request",
                "path": "Cancel Request",
                "submenu": null,
            },
            {
                "id": 2,
                "title": "Check In",
                "image": "Check In",
                "path": "Check In",
            },
            {
                "id": 3,
                "title": "Check Out",
                "image": "Check Out",
                "path": "Check Out",
                "submenu": null,
            },
            //{
            //    "id": 5,
            //    "title": "Invitee Status",
            //    "image": "Invitee Status",
            //    "path": "Invitee Status",
            //    "submenu": null,
            //},
            {
                "id": 7,
                "title": "Export",
                "image": "Export",
                "path": "Export"
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.message = "Are you sure you want to cancel the selected Reservation(s)?";
        this.positionCheckIn = "top-right";
        this.showSlideCheckIn = false;
        this.slidewidthCheckIn = 280;
        this.messageCheckIn = "Are you sure you want to check in the selected Reservation?";
        this.positionCheckOut = "top-right";
        this.showSlideCheckOut = false;
        this.slidewidthCheckOut = 280;
        this.messageCheckOut = "Are you sure you want to check out the selected Reservation?";
        this.userRoleFlag = false;
        this.positionInvitee = "top-right";
        this.showSlideInvitee = false;
        this.whoArrayList = [];
        this.isChkBxChecked = 1;
        this.filter = "";
        this.advanceValue = "[]";
        this.isSmartSearch = false;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.disable = false;
        this.roomtxt = "Team Room";
        this.reservationLabel = "Request Token";
        this.IsProxyReservationEnabled = false;
        this.cancelOwnReservation = false;
    }
    ;
    MyActiveRequests.prototype.ngOnInit = function () {
        var contextObj = this;
        //  contextObj.loadMyRequestData(); ---->     intail it loads two times also loaded in tab change event when page loaded
        contextObj.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.UserRoleId = retData["UserRoleId"];
            //if (contextObj.UserRoleId != 7) {
            //    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 5 }), 1);
            //    contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 6 }), 1);
            //    contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 2 }), 1);
            //    contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 3 }), 1);
            //}
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.UserRoleId).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
                contextObj.checkSubscribedFeaturesForMenu();
            });
            contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
                contextObj.isSiteAdmin = result == 1 ? true : false;
                if (contextObj.UserRoleId == 4 || contextObj.isSiteAdmin == true)
                    contextObj.userRoleFlag = false;
                else
                    contextObj.userRoleFlag = true;
            });
        });
    };
    MyActiveRequests.prototype.checkSubscribedFeaturesForMenu = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('262,266,284').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == false) {
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 5; }), 1);
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 6; }), 1);
                contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 2; }), 1);
                contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 3; }), 1);
            }
            else if (result["Data"][1]["IsSubscribed"] == true && contextObj.IsProxyReservationEnabled == false) {
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 5; }), 1);
                contextObj.menuData.splice(contextObj.menuData.findIndex(function (el) { return el.id == 6; }), 1);
                contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 2; }), 1);
                contextObj.menuDataActiveRequests.splice(contextObj.menuDataActiveRequests.findIndex(function (el) { return el.id == 3; }), 1);
            }
            else if (result["Data"][2]["IsSubscribed"] == true && contextObj.IsProxyReservationEnabled == false) {
                contextObj.cancelOwnReservation = true;
            }
        });
    };
    MyActiveRequests.prototype.checkSubscribedFeaturesForPagepath = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
            contextObj.searchTitle = "Search " + contextObj.roomtxt + " Reservation";
            if (contextObj.myRequestsFlag == true) {
                contextObj.pagePath = "Scheduling / " + contextObj.roomtxt + " Reservation / Reservations / My Reservations";
            }
            else {
                contextObj.pagePath = "Scheduling / " + contextObj.roomtxt + " Reservation / Reservations / Active Reservations";
            }
        });
    };
    MyActiveRequests.prototype.loadMyRequestData = function () {
        var contextObj = this;
        //this.pagePath = "Scheduling / " + contextObj.roomtxt +" Reservation / Reservations / My Reservations";
        contextObj.checkSubscribedFeaturesForPagepath();
        this.schedulingService.getMyRequestsFields().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 6730) {
                    item.IsVisible = false;
                }
            });
            contextObj.fieldObject = result["Data"];
            //contextObj.schedulingService.checkSubscribedFeature('273').subscribe(function (result) {
            //    if (result["Data"][0]["IsSubscribed"] == true) {
            //        contextObj.reservationLabel = result["Data"][0].Value;
            //    }
            //    contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
            //        if (item.FieldId == 1796) {
            //            item.FieldLabel = contextObj.reservationLabel;
            //        }
            //        return true;
            //    });
            //});
        });
        this.schedulingService.getMyRequestsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked).subscribe(function (result) {
            if (contextObj.IsAdvanceSearch == 0 && contextObj.IsKeyWordSearch == 0) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.disable = false;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6];
                }
                else {
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    setTimeout(function () {
                        var tabtag = document.getElementsByTagName("tabs");
                        if (tabtag && tabtag.length > 0) {
                            var activereservationtag = tabtag[0].getElementsByTagName("a");
                            if (activereservationtag && activereservationtag.length > 1)
                                window["GlobalFocusVariable"] = activereservationtag[1];
                        }
                    }, 500);
                    contextObj.disable = true;
                    contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            }
            if (contextObj.IsAdvanceSearch == 1 && contextObj.IsKeyWordSearch == 0) {
                contextObj.schedulingService.getMySearchRequestsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                        contextObj.enableMenu = [];
                    }
                });
            }
            if (contextObj.IsAdvanceSearch == 0 && contextObj.IsKeyWordSearch == 1) {
                contextObj.schedulingService.getMySearchRequestsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                        contextObj.enableMenu = [];
                    }
                });
            }
        });
        contextObj.administrationService.getkeywordFields(474).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
        });
    };
    MyActiveRequests.prototype.loadActiveRequestsData = function () {
        debugger;
        var contextObj = this;
        //this.pagePath = "Scheduling / " + contextObj.roomtxt +" Reservation / Reservations / Active Reservations";
        contextObj.checkSubscribedFeaturesForPagepath();
        this.schedulingService.getActiveRequestsFields().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 6730) {
                    item.IsVisible = false;
                }
            });
            contextObj.fieldObjectActiveRequests = result["Data"];
            //contextObj.schedulingService.checkSubscribedFeature('273').subscribe(function (result) {
            //    if (result["Data"][0]["IsSubscribed"] == true) {
            //        contextObj.reservationLabel = result["Data"][0].Value;
            //    }
            //    contextObj.fieldObjectActiveRequests = contextObj.fieldObjectActiveRequests.filter(function (item) {
            //        if (item.FieldId == 1796) {
            //            item.FieldLabel = contextObj.reservationLabel;
            //        }
            //        return true;
            //    });
            //});
        });
        this.schedulingService.getActiveRequestsData(contextObj.pageIndexActiveRequests, contextObj.inputItemsActiveRequests.sortCol, contextObj.inputItemsActiveRequests.sortDir, contextObj.isChkBxChecked).subscribe(function (result) {
            if (contextObj.IsAdvanceSearch == 0 && contextObj.IsKeyWordSearch == 0) {
                contextObj.totalItemsActiveRequests = result["Data"].DataCount;
                contextObj.itemsSourceActiveRequests = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.totalItemsActiveRequests > 0) {
                    contextObj.disable = false;
                    contextObj.itemsPerPageActiveRequests = result["Data"].RowsPerPage;
                    contextObj.enableMenuActiveRequests = [0, 1, 2, 3];
                }
                else {
                    contextObj.disable = true;
                    contextObj.notificationService.ShowToaster("No Active Reservations exist", 2);
                    contextObj.enableMenuActiveRequests = [];
                }
            }
            if (contextObj.IsAdvanceSearch == 1 && contextObj.IsKeyWordSearch == 0) {
                contextObj.schedulingService.getActiveSearchRequestsData(contextObj.pageIndexActiveRequests, contextObj.inputItemsActiveRequests.sortCol, contextObj.inputItemsActiveRequests.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (result) {
                    contextObj.totalItemsActiveRequests = result["Data"].DataCount;
                    contextObj.itemsSourceActiveRequests = JSON.parse(result["Data"].FieldBinderData);
                    if (contextObj.totalItemsActiveRequests == 0) {
                        contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                        contextObj.enableMenuActiveRequests = [];
                    }
                });
            }
            if (contextObj.IsAdvanceSearch == 0 && contextObj.IsKeyWordSearch == 1) {
                contextObj.schedulingService.getActiveSearchRequestsData(contextObj.pageIndexActiveRequests, contextObj.inputItemsActiveRequests.sortCol, contextObj.inputItemsActiveRequests.sortDir, contextObj.isChkBxChecked, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (result) {
                    contextObj.totalItemsActiveRequests = result["Data"].DataCount;
                    contextObj.itemsSourceActiveRequests = JSON.parse(result["Data"].FieldBinderData);
                    if (contextObj.totalItemsActiveRequests == 0) {
                        contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                        contextObj.enableMenuActiveRequests = [];
                    }
                });
            }
        });
        contextObj.administrationService.getkeywordFields(472).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
        });
    };
    MyActiveRequests.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.loadMyRequestData();
    };
    MyActiveRequests.prototype.pageChangedActiveRequests = function (event) {
        this.pageIndexActiveRequests = event.pageEvent.page;
        this.loadActiveRequestsData();
    };
    MyActiveRequests.prototype.onSort = function (objGrid) {
        this.loadMyRequestData();
    };
    MyActiveRequests.prototype.onSortActiveRequests = function (objGrid) {
        this.loadActiveRequestsData();
    };
    MyActiveRequests.prototype.onSubMenuChange = function (event) {
        var isedit = false;
        switch (event.value) {
            case 0:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    isedit = this.checkedit(this.inputItems.rowData["StatusId"]);
                    if (isedit) {
                        this.editClickMyRequest();
                    }
                }
                break;
            case 1:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.reminderClick(1);
                }
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.copyReqests();
                }
                break;
            case 3:
                this.cancelMyReqests();
                break;
            case 4:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.inviteeStatus(1);
                }
                break;
            case 5:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkInMy();
                }
                break;
            case 6:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkOutMy();
                }
                break;
            case 7:
                this.ExportMyRequestGridData();
                break;
        }
    };
    MyActiveRequests.prototype.onSubMenuChangeActiveRequests = function (event) {
        var isedit = false;
        switch (event.value) {
            case 0:
                if (this.inputItemsActiveRequests.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    isedit = this.checkedit(this.inputItemsActiveRequests.rowData["StatusId"]);
                    if (isedit) {
                        this.editClick();
                    }
                }
                break;
            case 1:
                this.cancelActiveReqests();
                break;
            case 2:
                if (this.inputItemsActiveRequests.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkIn();
                    break;
                }
            case 3:
                if (this.inputItemsActiveRequests.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.checkOut();
                }
                break;
            case 4:
                if (this.inputItemsActiveRequests.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.reminderClick(2);
                }
                break;
            case 5:
                if (this.inputItemsActiveRequests.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.inviteeStatus(2);
                }
                break;
            case 7:
                this.ExportActiveRequestGridData();
                break;
        }
    };
    MyActiveRequests.prototype.checkedit = function (status) {
        var msg = "";
        if (status == 41) {
            return true;
        }
        else {
            switch (status) {
                case 5:
                    msg = "Expired Reservations cannot be modified";
                    break;
                case 32:
                    msg = "Checked out Reservations cannot be modified";
                    break;
                case 39:
                    msg = "Cancelled Reservations cannot be modified";
                    break;
                case 40:
                    msg = "Checked in Reservations cannot be modified";
                    break;
                case 88:
                    msg = "Auto Bumped Reservations cannot be modified";
                    break;
            }
            this.notificationService.ShowToaster(msg, 2);
            return false;
        }
    };
    MyActiveRequests.prototype.editClickMyRequest = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Modify " + this.roomtxt + " Reservation";
        var contextObj = this;
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItems.selectedIds.length == 1) {
        if (this.inputItems.selectedIds[0] != null) {
            if (contextObj.inputItems.rowData["IsEditable"] == 1) {
                this.schedulingService.loadMyRequestEdit(this.inputItems.selectedIds[0], contextObj.isChkBxChecked).subscribe(function (result) {
                    debugger;
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    var from = contextObj.fieldDetailsAdd1[1].FieldValue;
                    var to = contextObj.fieldDetailsAdd1[3].FieldValue;
                    var d = new Date(from);
                    var n = d.getHours();
                    var m = d.getMinutes();
                    if (m == 0) {
                        //n = n + 1;
                        var timeid = (n * 2);
                    }
                    else
                        var timeid = (n * 2) + 1;
                    var d = new Date(to);
                    var n = d.getHours();
                    var m = d.getMinutes();
                    if (m == 0) {
                        //n = n + 1;
                        var totimeid = (n * 2);
                    }
                    else
                        var totimeid = (n * 2) + 1;
                    contextObj.fieldDetailsAdd1[2].LookupDetails.LookupValues.splice(26, 26);
                    contextObj.fieldDetailsAdd1[2].FieldValue = contextObj.fieldDetailsAdd1[2].LookupDetails.LookupValues[timeid - 12].Id.toString();
                    //if (timeid == 47)
                    //    totimeid = 0;
                    //else
                    //    totimeid = timeid + 1;
                    contextObj.fieldDetailsAdd1[4].LookupDetails.LookupValues.splice(0, 1);
                    contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd1[4].LookupDetails.LookupValues[totimeid - 13].Id.toString();
                    // contextObj.fieldDetailsAdd1[6].IsVisible = false;
                    contextObj.fieldDetailsAdd1[7].IsEnabled = false;
                    contextObj.fieldDetailsAdd1[8].IsEnabled = false;
                    contextObj.fieldDetailsAdd1[9].IsVisible = false;
                    contextObj.fieldDetailsAdd1[10].IsVisible = false;
                    if (contextObj.IsProxyReservationEnabled == true) {
                        contextObj.fieldDetailsAdd1[8].IsVisible = true;
                    }
                    else {
                        contextObj.fieldDetailsAdd1[8].IsVisible = false;
                    }
                    contextObj.ReservedUserId = contextObj.inputItems.rowData["Reserved UserId"];
                    var spaceId = contextObj.inputItems.rowData["SpaceId"];
                    contextObj.SpaceId = spaceId;
                    contextObj.schedulingService.getTimeforspace(spaceId).subscribe(function (resulttime) {
                        var SpaceTime = "";
                        SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                        var tdt = new Date(SpaceTime);
                        var fromdt = new Date(from);
                        var todt = new Date(to);
                        //if (tdt > fromdt || tdt > todt) {
                        //    contextObj.notificationService.ShowToaster("Reservation cannot be modified", 2);
                        //    return;
                        //}
                        contextObj.SpaceTime = SpaceTime;
                        //contextObj.schedulingService.isRoomEditPossible(contextObj.inputItems.selectedIds[0]).subscribe(function (data) {
                        //if (data == true) {
                        contextObj.roomCapacity = contextObj.inputItems.rowData["Room Capacity"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        contextObj.myreqedit = true;
                        contextObj.activereqedit = false;
                    });
                });
            }
            else {
                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the selected Reservation", 2);
            }
        }
    };
    MyActiveRequests.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Modify " + this.roomtxt + " Reservation";
        ;
        var contextObj = this;
        //if (this.inputItemsActiveRequests.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItemsActiveRequests.selectedIds.length == 1) {
        if (this.inputItemsActiveRequests.selectedIds[0] != null) {
            this.schedulingService.loadRequestEdit(this.inputItemsActiveRequests.selectedIds[0]).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                var from = contextObj.fieldDetailsAdd1[1].FieldValue;
                var to = contextObj.fieldDetailsAdd1[3].FieldValue;
                var d = new Date(from);
                var n = d.getHours();
                var m = d.getMinutes();
                if (m == 0) {
                    //n = n + 1;
                    var timeid = (n * 2);
                }
                else
                    var timeid = (n * 2) + 1;
                var d = new Date(to);
                var n = d.getHours();
                var m = d.getMinutes();
                if (m == 0) {
                    //n = n + 1;
                    var totimeid = (n * 2);
                }
                else
                    var totimeid = (n * 2) + 1;
                contextObj.fieldDetailsAdd1[2].LookupDetails.LookupValues.splice(26, 26);
                contextObj.fieldDetailsAdd1[2].FieldValue = contextObj.fieldDetailsAdd1[2].LookupDetails.LookupValues[timeid - 12].Id.toString();
                //if (timeid == 47)
                //    totimeid = 0;
                //else
                //    totimeid = timeid + 1;
                contextObj.fieldDetailsAdd1[4].LookupDetails.LookupValues.splice(0, 1);
                contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd1[4].LookupDetails.LookupValues[totimeid - 13].Id.toString();
                //contextObj.fieldDetailsAdd1[6].IsVisible = false;
                contextObj.fieldDetailsAdd1[7].IsEnabled = false;
                contextObj.fieldDetailsAdd1[8].IsEnabled = false;
                contextObj.fieldDetailsAdd1[9].IsVisible = false;
                contextObj.fieldDetailsAdd1[10].IsVisible = false;
                if (contextObj.IsProxyReservationEnabled == true) {
                    contextObj.fieldDetailsAdd1[8].IsVisible = true;
                }
                else {
                    contextObj.fieldDetailsAdd1[8].IsVisible = false;
                }
                contextObj.ReservedUserId = contextObj.inputItemsActiveRequests.rowData["Reserved UserId"];
                var spaceId = contextObj.inputItemsActiveRequests.rowData["SpaceId"];
                contextObj.SpaceId = spaceId;
                contextObj.schedulingService.getTimeforspace(spaceId).subscribe(function (resulttime) {
                    var SpaceTime = "";
                    SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                    var tdt = new Date(SpaceTime);
                    var fromdt = new Date(from);
                    var todt = new Date(to);
                    contextObj.SpaceTime = SpaceTime;
                    contextObj.schedulingService.isRoomEditPossible(contextObj.inputItemsActiveRequests.selectedIds[0]).subscribe(function (data) {
                        if (data == true) {
                            contextObj.roomCapacity = contextObj.inputItems.rowData["Room Capacity"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            contextObj.myreqedit = false;
                            contextObj.activereqedit = true;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("You do not have the privilege to edit the selected Reservation", 2);
                        }
                    });
                });
            });
        }
        //}
    };
    MyActiveRequests.prototype.copyReqests = function () {
        var contextObj = this;
        this.schedulingService.getMyRequestsDataCopyRequest(this.inputItems.selectedIds[0]).subscribe(function (result) {
            contextObj.copyRequsetFlag = true;
            contextObj.fieldDetailsAdd = result["Data"].FieldBinderData;
            contextObj.target = 1;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    MyActiveRequests.prototype.checkIn = function () {
        debugger;
        var contextObj = this;
        var selId;
        var intStatusId;
        var fromDate;
        var toDate;
        var spaceId;
        selId = this.inputItemsActiveRequests.selectedIds[0];
        for (var i = 0; i < contextObj.itemsSourceActiveRequests.length; i++) {
            if (contextObj.itemsSourceActiveRequests[i].Id == selId) {
                intStatusId = contextObj.itemsSourceActiveRequests[i].StatusId;
                fromDate = contextObj.itemsSourceActiveRequests[i].From;
                toDate = contextObj.itemsSourceActiveRequests[i].To;
                spaceId = contextObj.itemsSourceActiveRequests[i].SpaceId;
            }
        }
        contextObj.schedulingService.getTimeforspace(spaceId).subscribe(function (resulttime) {
            var SpaceTime = "";
            SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
            var fdate = new Date(fromDate);
            var tdate = new Date(toDate);
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            contextObj.getCurrentDate();
            var currentDate = new Date(contextObj.selectedDateValue);
            var fromDateLessOneHour = new Date(fromDate);
            var now = new Date(SpaceTime);
            //fromDateLessOneHour.setHours(fromDateLessOneHour.getHours() - 1);        
            fromDateLessOneHour.setHours(0);
            fromDateLessOneHour.setMinutes(0);
            switch (intStatusId) {
                case 40:
                    contextObj.notificationService.ShowToaster("Selected Reservation is checked in", 2);
                    break;
                case 34:
                    contextObj.notificationService.ShowToaster("Selected Reservation is not approved, cannot check in", 2);
                    break;
                case 32:
                    contextObj.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                    break;
                case 41:
                    //if (currentDate > toDate)
                    //    this.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                    //else if (currentDate < fromDateLessOneHour)
                    //    this.notificationService.ShowToaster("Check In allowed only one hour before Scheduled time", 2);
                    contextObj.schedulingService.isRoomCheckInCheckOutPossible(selId, fromDate, toDate, true).subscribe(function (result) {
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
                            case "4":
                                contextObj.notificationService.ShowToaster("Check In allowed only before Scheduled time", 2);
                                break;
                            case "5":
                                contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled date", 2);
                                break;
                        }
                        if (result == "0") {
                            contextObj.schedulingService.checkSubscribedFeature("247").subscribe(function (resultData) {
                                var IsSubscribed = resultData["Data"][0].IsSubscribed;
                                if (IsSubscribed == true) {
                                    var value = resultData["Data"][0].Value;
                                    var min = fdate.getMinutes();
                                    fdate.setMinutes(fdate.getMinutes() + parseInt(value));
                                    if (now > fdate)
                                        contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                                    else if (now < fromDateLessOneHour)
                                        contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled day after 06:00 AM", 2);
                                    else
                                        contextObj.showSlideCheckIn = true;
                                }
                                else {
                                    if (now > toDate)
                                        contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                                    else if (now < fromDateLessOneHour)
                                        contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled day after 06:00 AM", 2);
                                    else
                                        contextObj.showSlideCheckIn = true;
                                }
                            });
                        }
                    });
                    break;
                default:
                    contextObj.notificationService.ShowToaster("Selected Reservation is not confirmed, cannot be checked in", 2);
                    break;
            }
        });
    };
    MyActiveRequests.prototype.checkOut = function () {
        debugger;
        var contextObj = this;
        var selId;
        var intStatusId;
        selId = this.inputItemsActiveRequests.selectedIds[0];
        for (var i = 0; i < contextObj.itemsSourceActiveRequests.length; i++) {
            if (contextObj.itemsSourceActiveRequests[i].Id == selId) {
                intStatusId = contextObj.itemsSourceActiveRequests[i].StatusId;
            }
        }
        switch (intStatusId) {
            case 32:
                this.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                break;
            case 40:
                this.showSlideCheckOut = true;
                break;
            default:
                this.notificationService.ShowToaster("Selected Reservation is not checked in", 2);
                break;
        }
    };
    MyActiveRequests.prototype.checkInMy = function () {
        debugger;
        var contextObj = this;
        var selId;
        var intStatusId;
        var fromDate;
        var toDate;
        var spaceId;
        selId = this.inputItems.selectedIds[0];
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i].Id == selId) {
                intStatusId = contextObj.itemsSource[i].StatusId;
                fromDate = contextObj.itemsSource[i].From;
                toDate = contextObj.itemsSource[i].To;
                spaceId = contextObj.itemsSource[i].SpaceId;
            }
        }
        contextObj.schedulingService.getTimeforspace(spaceId).subscribe(function (resulttime) {
            var SpaceTime = "";
            SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
            var fdate = new Date(fromDate);
            var tdate = new Date(toDate);
            fromDate = new Date(fromDate);
            toDate = new Date(toDate);
            contextObj.getCurrentDate();
            var currentDate = new Date(contextObj.selectedDateValue);
            var fromDateLessOneHour = new Date(fromDate);
            var now = new Date(SpaceTime);
            //fromDateLessOneHour.setHours(fromDateLessOneHour.getHours() - 1);        
            fromDateLessOneHour.setHours(0);
            fromDateLessOneHour.setMinutes(0);
            switch (intStatusId) {
                case 40:
                    contextObj.notificationService.ShowToaster("Selected Reservation is checked in", 2);
                    break;
                case 34:
                    contextObj.notificationService.ShowToaster("Selected Reservation is not approved, cannot check in", 2);
                    break;
                case 32:
                    contextObj.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                    break;
                case 41:
                    //if (currentDate > toDate)
                    //    this.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                    //else if (currentDate < fromDateLessOneHour)
                    //    this.notificationService.ShowToaster("Check In allowed only one hour before Scheduled time", 2);
                    contextObj.schedulingService.isRoomCheckInCheckOutPossible(selId, fromDate, toDate, true).subscribe(function (result) {
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
                            case "4":
                                contextObj.notificationService.ShowToaster("Check In allowed only before Scheduled time", 2);
                                break;
                            case "5":
                                contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled date", 2);
                                break;
                        }
                        if (result == "0") {
                            contextObj.schedulingService.checkSubscribedFeature("247").subscribe(function (resultData) {
                                var IsSubscribed = resultData["Data"][0].IsSubscribed;
                                if (IsSubscribed == true) {
                                    var value = resultData["Data"][0].Value;
                                    var min = fdate.getMinutes();
                                    fdate.setMinutes(fdate.getMinutes() + parseInt(value));
                                    if (now > fdate)
                                        contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                                    else if (now < fromDateLessOneHour)
                                        contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled day after 06:00 AM", 2);
                                    else
                                        contextObj.showSlideCheckIn = true;
                                }
                                else {
                                    if (now > toDate)
                                        contextObj.notificationService.ShowToaster("Check In not allowed after Scheduled time", 2);
                                    else if (now < fromDateLessOneHour)
                                        contextObj.notificationService.ShowToaster("Check In allowed only on Scheduled day after 06:00 AM", 2);
                                    else
                                        contextObj.showSlideCheckIn = true;
                                }
                            });
                        }
                    });
                    break;
                default:
                    contextObj.notificationService.ShowToaster("Selected Reservation is not confirmed, cannot be checked in", 2);
                    break;
            }
        });
    };
    MyActiveRequests.prototype.checkOutMy = function () {
        debugger;
        var contextObj = this;
        var selId;
        var intStatusId;
        selId = this.inputItems.selectedIds[0];
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i].Id == selId) {
                intStatusId = contextObj.itemsSource[i].StatusId;
            }
        }
        switch (intStatusId) {
            case 32:
                this.notificationService.ShowToaster("Selected Reservation is already checked out", 2);
                break;
            case 40:
                this.showSlideCheckOut = true;
                break;
            default:
                this.notificationService.ShowToaster("Selected Reservation is not checked in", 2);
                break;
        }
    };
    MyActiveRequests.prototype.reminderClick = function (Target) {
        var contextObj = this;
        var selId;
        var intStatusId;
        var fromDate;
        var Target = Target;
        var Itemsoursce;
        var InputItem;
        if (Target == 1) {
            Itemsoursce = contextObj.itemsSource;
            InputItem = contextObj.inputItems;
        }
        else {
            Itemsoursce = contextObj.itemsSourceActiveRequests;
            InputItem = contextObj.inputItemsActiveRequests;
        }
        selId = InputItem.selectedIds[0];
        for (var i = 0; i < Itemsoursce.length; i++) {
            if (Itemsoursce[i].Id == selId) {
                intStatusId = Itemsoursce[i].StatusId;
                fromDate = Itemsoursce[i].From;
            }
        }
        // fromDate = "28 Mar 2017 4:00 PM";
        fromDate = new Date(fromDate);
        contextObj.getCurrentDate();
        var currentDate = new Date(contextObj.selectedDateValue);
        switch (intStatusId) {
            case 39:
                this.notificationService.ShowToaster("Selected Reservation is cancelled, Reminder cannot be sent", 2);
                break;
            case 40:
                this.notificationService.ShowToaster("Selected Reservation is checked in, Reminder cannot be sent", 2);
                break;
            case 32:
                this.notificationService.ShowToaster("Selected Reservation is checked out, Reminder cannot be sent", 2);
                break;
            case 88:
                this.notificationService.ShowToaster("Selected Reservation is Auto Bumped, Reminder cannot be sent", 2);
                break;
            case 41:
                //if (currentDate > fromDate)
                //    this.notificationService.ShowToaster("Reminder cannot be sent after the Scheduled time", 2);
                //else {
                ////contextObj.schedulingService.getNotificationMailsMyRequests(Number(selId), 0).subscribe(function (result) {
                ////    debugger
                ////});
                contextObj.schedulingService.sendMail(Number(selId), 6).subscribe(function (result) {
                    contextObj.notificationService.ShowToaster("Reminder email sent", 3);
                });
                //}
                break;
            default:
                this.notificationService.ShowToaster("Selected Reservation has been sent for approval, Reminder cannot be sent", 2);
                break;
        }
    };
    MyActiveRequests.prototype.inviteeStatus = function (Target) {
        var contextObj = this;
        var Target = Target;
        var temp;
        var timeZone;
        var Itemsoursce;
        var InputItem;
        if (Target == 1) {
            Itemsoursce = contextObj.itemsSource;
            InputItem = contextObj.inputItems;
        }
        else {
            Itemsoursce = contextObj.itemsSourceActiveRequests;
            InputItem = contextObj.inputItemsActiveRequests;
        }
        for (var i = 0; i < Itemsoursce.length; i++) {
            if (Itemsoursce[i].Id == InputItem.selectedIds[0]) {
                contextObj.eventName = Itemsoursce[i]["Event Name"];
                contextObj.fromDateMsg = Itemsoursce[i]["From"];
                contextObj.toDateMSg = Itemsoursce[i]["To"];
                contextObj.site = Itemsoursce[i]["Site"];
                contextObj.building = Itemsoursce[i]["Building"];
                contextObj.floor = Itemsoursce[i]["Floor"];
                contextObj.comments = Itemsoursce[i]["Comments"];
                contextObj.roomNo = Itemsoursce[i]["Room No"];
                contextObj.roomNo = Itemsoursce[i]["Room No."];
                contextObj.rquestedBy = Itemsoursce[i]["Requested by"];
                contextObj.Bookedfor = Itemsoursce[i]["Booked for"];
                contextObj.timezone = Itemsoursce[i]["Time Zone"];
            }
        }
        contextObj.when = contextObj.fromDateMsg + " - " + contextObj.toDateMSg + " ";
        if (contextObj.comments != null && contextObj.comments != undefined && contextObj.comments != "")
            contextObj.where = contextObj.site + ", " + contextObj.building + " " + contextObj.floor + ", " + contextObj.comments + ", " + contextObj.roomNo;
        else
            contextObj.where = contextObj.site + ", " + contextObj.building + " " + contextObj.floor + ", " + contextObj.roomNo;
        contextObj.schedulingService.getNotificationMailsMyRequests(Number(InputItem.selectedIds[0]), 0).subscribe(function (result) {
            temp = JSON.parse(result["Data"].FieldBinderData);
            timeZone = temp[0]["TimeZone"];
            contextObj.who = contextObj.Bookedfor + " - Organizer ";
            var tempArray = [];
            tempArray.push({
                Name: contextObj.who,
                statusID: temp[0]["StatusId"]
            });
            //contextObj.whoArrayList[0]["Name"] = contextObj.who;
            //contextObj.whoArrayList[0]["statusID"] = temp[0]["StatusId"];
            for (var i = 1; i < temp.length; i++) {
                tempArray.push({
                    Name: temp[i]["Invitee"],
                    statusID: temp[i]["StatusId"]
                });
            }
            contextObj.when = contextObj.when + contextObj.timezone;
            contextObj.whoArrayList = tempArray;
            contextObj.showSlideInvitee = true;
        });
    };
    MyActiveRequests.prototype.getCurrentDate = function () {
        var d = new Date();
        var hour;
        var min;
        var h;
        var m;
        var meridian;
        var strdate;
        var strmonth;
        var strYear;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        strdate = d.getDate().toString();
        if (Number(strdate) < 10)
            strdate = "0" + Number(strdate);
        strmonth = d.getMonth().toString();
        var currentMonth = monthNames[d.getMonth()];
        strYear = d.getFullYear().toString();
        if (d.getHours() > 12) {
            meridian = "PM";
            h = d.getHours() % 12;
            if (h < 10) {
                hour = "0" + h.toString();
            }
            else {
                hour = h.toString();
            }
        }
        else {
            meridian = "AM";
            if (d.getHours() == 12) {
                h = 12;
                hour = "00";
            }
            else {
                h = d.getHours();
                hour = "0" + h.toString();
            }
        }
        m = d.getMinutes();
        if (m < 10) {
            min = "0" + m.toString();
        }
        else {
            min = m.toString();
        }
        this.selectedDateValue = strdate + " " + currentMonth + " " + strYear + " " + hour + ":" + min + " " + meridian;
    };
    MyActiveRequests.prototype.cancelMyReqests = function () {
        this.cancelReqestsSettings(this, 1);
    };
    MyActiveRequests.prototype.cancelReqestsSettings = function (context, target) {
        var requestIds = target == 1 ? context.inputItems.selectedIds : context.inputItemsActiveRequests.selectedIds;
        var gridObj = target == 1 ? context.inputItems : context.inputItemsActiveRequests;
        var statusarrLen = requestIds.length;
        context.confirmStatusReqIds = [];
        if (statusarrLen > 1) {
            var cancelCnt = 0;
            var CheckedInCnt = 0;
            var checkedOutCnt = 0;
            var expiredCnt = 0;
            var autoBumpCnt = 0;
            var confCnt = 0;
            var tempStatus;
            for (var i = 0; i < statusarrLen; i++) {
                switch (gridObj.rowData[i]["StatusId"]) {
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
                        context.confirmStatusReqIds.push(gridObj.rowData[i]["Id"]);
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
            this.statusMsgSettings(gridObj.rowData["StatusId"], 0, context);
        }
    };
    MyActiveRequests.prototype.statusMsgSettings = function (statusId, IsMultiple, context) {
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
                context.message = "Are you sure you want to cancel the selected Reservation(s)?";
                context.showSlide = true;
                break;
            case 0:
                context.message = "Some of the Reservations are not in confirmed status. Do you want to proceed?";
                context.showSlide = true;
                break;
            case -1:
                context.notificationService.ShowToaster("Selected Reservations cannot be cancelled", 2);
                break;
        }
    };
    MyActiveRequests.prototype.cancelActiveReqests = function () {
        var contextObj = this;
        var selIds = this.inputItemsActiveRequests.selectedIds;
        if ((this.inputItems.rowData["Reserved UserId"] != this.inputItems.rowData["Added UserId"]) && this.IsProxyReservationEnabled == false) {
            this.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
        }
        else if ((this.inputItems.rowData["Reserved UserId"] == this.inputItems.rowData["Added UserId"]) && this.IsProxyReservationEnabled == false) {
            if (this.cancelOwnReservation == true)
                contextObj.cancelReqestsSettings(contextObj, 2);
            else
                this.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
        }
        else {
            contextObj.cancelReqestsSettings(contextObj, 2);
        }
        //contextObj.schedulingService.isRoomEditPossible(selIds).subscribe(function (data) {
        //    if (data == true) {
        //        contextObj.cancelReqestsSettings(contextObj, 2);
        //    } else {
        //        contextObj.notificationService.ShowToaster("You do not have the privilege to cancel the selected reservation", 2);
        //    }
        //});
    };
    MyActiveRequests.prototype.cancelMyRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelMyRequests(this.inputItems.selectedIds[0].toString(), 39, 0, this.inputItems.selectedIds).subscribe(function (result) {
            contextObj.loadMyRequestData();
            contextObj.notificationService.ShowToaster("Cancelled Successfully", 3);
        });
    };
    MyActiveRequests.prototype.cancelActiveRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelActiveRequests(this.inputItemsActiveRequests.selectedIds[0].toString(), 39, 0, this.inputItemsActiveRequests.selectedIds).subscribe(function (result) {
            contextObj.loadActiveRequestsData();
            contextObj.notificationService.ShowToaster("Cancelled Successfully", 3);
        });
    };
    MyActiveRequests.prototype.checkInActiveRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelActiveRequests(this.inputItemsActiveRequests.selectedIds[0].toString(), 40, 0).subscribe(function (result) {
            contextObj.showSlideCheckIn = false;
            contextObj.notificationService.ShowToaster("Checked In successfully", 2);
            contextObj.loadActiveRequestsData();
        });
    };
    MyActiveRequests.prototype.checkOutActiveRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelActiveRequests(this.inputItemsActiveRequests.selectedIds[0].toString(), 32, 0).subscribe(function (result) {
            contextObj.showSlideCheckOut = false;
            contextObj.notificationService.ShowToaster("Checked Out successfully", 2);
            contextObj.loadActiveRequestsData();
        });
    };
    MyActiveRequests.prototype.checkInMyRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelActiveRequests(this.inputItems.selectedIds[0].toString(), 40, 0).subscribe(function (result) {
            contextObj.showSlideCheckIn = false;
            contextObj.notificationService.ShowToaster("Checked In successfully", 2);
            contextObj.loadMyRequestData();
        });
    };
    MyActiveRequests.prototype.checkOutMyRequests = function () {
        var contextObj = this;
        contextObj.schedulingService.cancelActiveRequests(this.inputItems.selectedIds[0].toString(), 32, 0).subscribe(function (result) {
            contextObj.showSlideCheckOut = false;
            contextObj.notificationService.ShowToaster("Checked Out successfully", 2);
            contextObj.loadMyRequestData();
        });
    };
    MyActiveRequests.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.myRequestsFlag = true;
            this.activeRequestsFlag = false;
            this.isChkBxChecked = 1;
            var inpchk = document.getElementById("inpChk");
            inpchk.checked = true;
            this.loadMyRequestData();
        }
        else if (event[0] == 1) {
            this.activeRequestsFlag = true;
            this.myRequestsFlag = false;
            this.isChkBxChecked = 1;
            var inpchk2 = document.getElementById("inpChk2");
            inpchk2.checked = true;
            this.loadActiveRequestsData();
        }
    };
    MyActiveRequests.prototype.onTabClose = function (event) {
    };
    //slide events/////
    MyActiveRequests.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        if (this.myRequestsFlag == true && this.activeRequestsFlag == false)
            this.cancelMyRequests();
        else if (this.myRequestsFlag == false && this.activeRequestsFlag == true)
            this.cancelActiveRequests();
    };
    MyActiveRequests.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    MyActiveRequests.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    //slide events/////
    MyActiveRequests.prototype.okDeleteCheckIn = function (event) {
        if (this.myRequestsFlag == true) {
            this.checkInMyRequests();
        }
        else {
            this.checkInActiveRequests();
        }
    };
    MyActiveRequests.prototype.cancelClickCheckIn = function (event) {
        this.showSlideCheckIn = !this.showSlideCheckIn;
    };
    MyActiveRequests.prototype.closeSlideDialogCheckIn = function (value) {
        this.showSlideCheckIn = value.value;
    };
    //slide events/////
    MyActiveRequests.prototype.okDeleteCheckOut = function (event) {
        if (this.myRequestsFlag == true) {
            this.checkOutMyRequests();
        }
        else {
            this.checkOutActiveRequests();
        }
    };
    MyActiveRequests.prototype.cancelClickCheckOut = function (event) {
        this.showSlideCheckOut = !this.showSlideCheckOut;
    };
    MyActiveRequests.prototype.closeSlideDialogCheckOut = function (value) {
        this.showSlideCheckOut = value.value;
    };
    MyActiveRequests.prototype.closeSlideDialogInvitee = function (value) {
        this.showSlideInvitee = value.value;
    };
    MyActiveRequests.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        if (this.myRequestsFlag == true) {
            this.loadMyRequestData();
        }
        else {
            this.loadActiveRequestsData();
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    MyActiveRequests.prototype.chkboxClick = function (event, target) {
        var contextObj = this;
        var srcelment = event.target || event.srcElement;
        this.isChkBxChecked = srcelment.checked == true ? 1 : 0;
        if (target == 1) {
            this.pageIndex = srcelment.checked == true ? 0 : this.pageIndex;
            this.myRequestsFlag = true;
            this.activeRequestsFlag = false;
            this.itemsSource = [];
            this.loadMyRequestData();
        }
        else {
            this.pageIndexActiveRequests = srcelment.checked == true ? 0 : this.pageIndex;
            this.myRequestsFlag = false;
            this.activeRequestsFlag = true;
            this.itemsSourceActiveRequests = [];
            this.loadActiveRequestsData();
        }
    };
    //Export
    MyActiveRequests.prototype.ExportMyRequestGridData = function () {
        var context = this;
        var fieldObjectsCopy = context.fieldObject.slice(); //copy of field object  
        var fileName = this.roomtxt + " - My Reservations";
        // if (context.inputItems.selectedIds.length > 1) {
        //context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
        //context.exportObject.ExportData(context.exportDataSource, fieldObjectsCopy, fileName, function (retCode) {
        //    if (retCode == 0) {
        //        context.notificationService.ShowToaster("My Reservations List exported", 3);
        //    }
        //    else { context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
        //});
        // }
        //   else {
        var input = context.schedulingService.getTeamRoomMySeatRequestExportInput(context.inputItems.selectedIds, context.isChkBxChecked, 326, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
        context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
            if (retCode == 0)
                context.notificationService.ShowToaster("My Reservations List exported", 3);
            else
                context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });
        //  }
    };
    MyActiveRequests.prototype.ExportActiveRequestGridData = function () {
        debugger;
        var context = this;
        var fieldObjectsCopy = context.fieldObjectActiveRequests.slice(); //copy of field object  
        var fileName = this.roomtxt + " - Active Reservations";
        // if (context.inputItemsActiveRequests.selectedIds.length > 1) {
        //context.exportDataSource = JSON.stringify(context.inputItemsActiveRequests.rowData.slice());
        //context.exportObject.ExportData(context.exportDataSource, fieldObjectsCopy, fileName, function (retCode) {
        //    if (retCode == 0) {
        //        context.notificationService.ShowToaster("Active Reservations List exported", 3);
        //    }
        //    else { context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
        //});
        //    }
        // else {
        var input = context.schedulingService.getTeamRoomActiveSeatRequestExportInput(context.inputItemsActiveRequests.selectedIds, context.isChkBxChecked, 328, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
        context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
            if (retCode == 0)
                context.notificationService.ShowToaster("Active Reservations List exported", 3);
            else
                context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });
        // }
    };
    MyActiveRequests.prototype.AdvanceSearch = function (index) {
        var contextObj = this;
        if (index == 1) {
            contextObj.administrationService.getAllAdvanceSearchLookup(474).subscribe(function (result) {
                //result["Data"]["FieldBinderList"].find(function (item) {
                //    if (item.FieldId == 2430) {
                //        item.FieldLabel = contextObj.reservationLabel;
                //    }
                //});
                contextObj.advancelookup = result["Data"]["FieldBinderList"];
            });
        }
        else {
            contextObj.administrationService.getAllAdvanceSearchLookup(471).subscribe(function (result) {
                //result["Data"]["FieldBinderList"].find(function (item) {
                //    if (item.FieldId == 2430) {
                //        item.FieldLabel = contextObj.reservationLabel;
                //    }
                //});
                contextObj.advancelookup = result["Data"]["FieldBinderList"];
            });
        }
    };
    MyActiveRequests.prototype.advanceSearchSubmit = function (event, index) {
        var contextObj = this;
        contextObj.showSearchFilter = [];
        contextObj.IsAdvanceSearch = 1;
        contextObj.IsKeyWordSearch = 0;
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
            contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
        }
        else {
            contextObj.IsAdvanceSearch = 1;
            contextObj.advanceValue = event.fieldobject;
            contextObj.StartDate = event.fromdateTime;
            contextObj.EndDate = event.todateTime;
            if (index == 1) {
                contextObj.pageIndex = 0;
                contextObj.loadMyRequestData();
            }
            else {
                contextObj.pageIndexActiveRequests = 0;
                contextObj.loadActiveRequestsData();
            }
        }
    };
    MyActiveRequests.prototype.keywordSearchSubmit = function (event, index) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        if (index == 1) {
            contextObj.pageIndex = 0;
            contextObj.loadMyRequestData();
        }
        else {
            contextObj.pageIndexActiveRequests = 0;
            contextObj.loadActiveRequestsData();
        }
    };
    MyActiveRequests.prototype.Clear = function (event, index) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        if (index == 1) {
            contextObj.schedulingService.getMyRequestsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                    contextObj.enableMenu = [];
                }
            });
        }
        else {
            contextObj.schedulingService.getActiveRequestsData(contextObj.pageIndexActiveRequests, contextObj.inputItemsActiveRequests.sortCol, contextObj.inputItemsActiveRequests.sortDir, contextObj.isChkBxChecked).subscribe(function (result) {
                contextObj.totalItemsActiveRequests = result["Data"].DataCount;
                contextObj.itemsSourceActiveRequests = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.totalItemsActiveRequests == 0) {
                    contextObj.notificationService.ShowToaster("No Reservations exist", 2);
                    contextObj.enableMenuActiveRequests = [];
                }
            });
        }
    };
    MyActiveRequests = __decorate([
        core_1.Component({
            selector: 'my-active-requests',
            templateUrl: './app/Views/Scheduling/Requests/my-active-requests.component.html',
            directives: [customsearchforscheduling_component_1.Searchforschedule, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, page_component_1.PageComponent, reserveroom_reservationrequest_component_1.ReservationRequestforroom, split_view_component_1.SplitViewComponent, my_active_requests_edit_component_1.MyActiveRequestEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, scheduling_service_1.SchedulingService, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, General_1.GeneralFunctions, scheduling_service_1.SchedulingService, General_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel])
    ], MyActiveRequests);
    return MyActiveRequests;
}());
exports.MyActiveRequests = MyActiveRequests;
//# sourceMappingURL=my-active-requests.component.js.map