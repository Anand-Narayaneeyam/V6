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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var customsearchforscheduling_component_1 = require('../seat booking/customsearchforscheduling.component');
var bookequipment_component_1 = require('./bookequipment.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var ReserveEquipmentListComponent = (function () {
    function ReserveEquipmentListComponent(schedulingService, notificationService, generFun, validateService) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.validateService = validateService;
        this.disableDates = ["Sunday", "Saturday"];
        this.itemsPerPage = 0;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", selectioMode: 'single', sortDir: 'ASC', sortCol: '', allowAdd: false, allowEdit: false };
        this.pageTitle = "";
        this.pagePath = "";
        this.isChkBxChecked = 1;
        this.sessionUserId = 0;
        this.sessionUserRoleId = 0;
        this.isReserved = false;
        this.showBookEqpt = false;
        this.IsAdvanceSearch = 0;
        this.advanceValue = "[]";
    }
    ReserveEquipmentListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve Equipment";
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2);
        }
        else
            contextObj.timeid = (n * 2) + 1;
        if (contextObj.timeid >= 38)
            contextObj.timeid = 12;
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        if (contextObj.timeid == 12) {
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
        contextObj.schedulingService.getEquipmentReservationListfields().subscribe(function (resultData) {
            var rptFieldForSearch = [12389, 12390, 12411, 12417];
            var fldObjArray = [];
            var len = resultData["Data"].length;
            for (var i = 0; i < len; i++) {
                var rptFldId = resultData["Data"][i].ReportFieldId;
                debugger;
                switch (rptFldId) {
                    case 6731:
                        resultData["Data"][i].isContentHtml = "hyperlink";
                        break;
                    case 12389:
                        resultData["Data"][i].Width = 150;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.FromdateObj = resultData["Data"][i];
                    case 12390:
                        resultData["Data"][i].Width = 150;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.TodateObj = resultData["Data"][i];
                        break;
                    case 12411:
                        resultData["Data"][i].Width = 100;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.FromTimeObj = resultData["Data"][i];
                        contextObj.FromTimeObj.LookupDetails.LookupValues.splice(26, 26);
                        break;
                    case 12417:
                        resultData["Data"][i].Width = 100;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.ToTimeObj = resultData["Data"][i];
                        contextObj.ToTimeObj.LookupDetails.LookupValues.splice(0, 1);
                        break;
                }
                if (rptFieldForSearch.indexOf(resultData["Data"][i].ReportFieldId) == -1) {
                    fldObjArray.push(resultData["Data"][i]);
                }
                if (i == len - 1) {
                    contextObj.fieldObject = fldObjArray;
                    if (contextObj.timeid == 12) {
                        contextObj.FromdateObj.FieldValue = contextObj.TommorrowDate;
                        contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
                    }
                    else if (contextObj.timeid >= 38)
                        contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
                    else if (contextObj.timeid > 12 && contextObj.timeid < 38) {
                        contextObj.FromdateObj.FieldValue = todaydate;
                        contextObj.TodateObj.FieldValue = todaydate;
                    }
                    else if (contextObj.timeid < 12) {
                        contextObj.FromdateObj.FieldValue = todaydate;
                        contextObj.TodateObj.FieldValue = todaydate;
                        contextObj.timeid = 12;
                    }
                    contextObj.FromTimeObj.FieldValue = contextObj.FromTimeObj.LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
                    var totimeid;
                    if (contextObj.timeid >= 38)
                        totimeid = 12;
                    else
                        totimeid = contextObj.timeid + 1;
                    contextObj.ToTimeObj.FieldValue = contextObj.ToTimeObj.LookupDetails.LookupValues[totimeid - 13].Id.toString();
                }
            }
            contextObj.ReserveEquipmentdataLoad(contextObj);
        });
        contextObj.getSessionUserData();
    };
    ReserveEquipmentListComponent.prototype.ReserveEquipmentdataLoad = function (contextObj, target) {
        var fromtime = contextObj.FromTimeObj.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTimeObj.FieldValue)); });
        var totime = contextObj.ToTimeObj.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTimeObj.FieldValue)); });
        var fromdateTime = contextObj.FromDate + fromtime[0].Value;
        var todateTime = contextObj.ToDate + totime[0].Value;
        var isDataload = true;
        if (target == 1) {
            //var subDatefromTime = contextObj.FromDate + fromtime[0].Value.substring(0, fromtime[0].Value.length - 2) + ":00 " + fromtime[0].Value.substring(fromtime[0].Value.length - 2, fromtime[0].Value.length);
            //var subDatetoTime = contextObj.ToDate + totime[0].Value.substring(0, totime[0].Value.length - 2) + ":00 " + totime[0].Value.substring(totime[0].Value.length - 2, totime[0].Value.length);
            //if ((contextObj.FromDate == contextObj.ToDate) && fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
            //    contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
            //    isDataload = false;
            //} else if (new Date(subDatefromTime) > new Date(subDatetoTime)) {
            //    contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            //}  
            if (new Date(contextObj.FromDate) > new Date(contextObj.ToDate)) {
                contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
                isDataload = false;
            }
            else if (fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
                contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
                isDataload = false;
            }
        }
        if (isDataload) {
            contextObj.schedulingService.getReserveEquipmentListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, fromdateTime, todateTime, target, contextObj.advanceValue).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems > 0) {
                    contextObj.itemsPerPage = resultData.RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment is available for reservation", 2);
                }
            });
        }
    };
    ReserveEquipmentListComponent.prototype.getSessionUserData = function () {
        var context = this;
        this.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.sessionUserId = retData["UserId"];
            context.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    ReserveEquipmentListComponent.prototype.getFormattedDate = function (dt) {
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
    ReserveEquipmentListComponent.prototype.dateSearchClick = function (event, target) {
        var date = event["FieldObject"]["FieldValue"];
        if (target == 1) {
            this.FromDate = date;
            this.ToDate = date;
            var elem = document.getElementsByClassName("date-picker")[1];
            elem.value = date;
            if (this.getFormattedDate(new Date()) == this.getFormattedDate(date)) {
                this.DateforcalenderSearch = "";
            }
            else
                this.DateforcalenderSearch = date;
        }
        else {
            this.ToDate = date;
        }
        this.SearchToDate = date;
    };
    ReserveEquipmentListComponent.prototype.OnSearchBtnClick = function (event) {
        this.ReserveEquipmentdataLoad(this, 1);
    };
    ReserveEquipmentListComponent.prototype.chkboxClick = function (event) {
        var contextObj = this;
        var srcelment = event.target || event.srcElement;
        this.isChkBxChecked = srcelment.checked == true ? 1 : 0;
        this.pageIndex = srcelment.checked == true ? 0 : this.pageIndex;
        this.itemsSource = [];
        this.ReserveEquipmentdataLoad(contextObj);
    };
    ReserveEquipmentListComponent.prototype.onHyperLinkClick = function (event) {
        var colName = event["colName"];
        this.selRowData = event["selRowData"];
        this.showBookEqpt = false;
        //if (this.isReserved == false)
        switch (colName) {
            case "Book Equipment":
                if (this.selRowData["Equipment Quantity"] > 0) {
                    this.bookEquipment();
                }
                else {
                    this.notificationService.ShowToaster("All '" + this.selRowData["Equipment Type"] + "s' are already reserved", 2);
                }
                break;
        }
        //this.isReserved = false;
    };
    ReserveEquipmentListComponent.prototype.bookEquipment = function () {
        var context = this;
        //context.schedulingService.getTimeforspace(selRowdata["SpaceId"]).subscribe(function (resulttime) {          
        //    context.Sitetime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
        //    context.splitviewInput.showSecondaryView = true;
        //    context.showBookEqpt = true;
        //});
        context.selRowData.FromDateVal = context.FromDate;
        context.selRowData.ToDateVal = context.ToDate;
        context.selRowData.FromTimeVal = context.FromTimeObj;
        context.selRowData.ToTimeVal = context.ToTimeObj;
        context.pageTitle = "Reserve Equipment";
        context.splitviewInput.showSecondaryView = true;
        context.showBookEqpt = true;
    };
    ReserveEquipmentListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveEquipmentdataLoad(contextObj);
    };
    ReserveEquipmentListComponent.prototype.onSort = function (objGrid) {
        this.ReserveEquipmentdataLoad(this);
    };
    ReserveEquipmentListComponent.prototype.onChangefrom = function (event) {
        var contextObj = this;
        if (event != "-1") {
            var timeid = parseInt(event);
            if (event == "39") {
                timeid = 13;
                contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
            }
            else
                contextObj.TodateObj.FieldValue = contextObj.ToDate;
            contextObj.ToTimeObj.FieldValue = contextObj.ToTimeObj.LookupDetails.LookupValues[timeid - 13].Id.toString();
            var ele = document.getElementsByClassName("ddl ng-invalid ng-dirty ng-touched");
            if (ele.length > 0) {
                var focusingElmt = ele[ele.length - 1];
                focusingElmt.focus();
                this.validateService.initiateValidation(contextObj.ToTimeObj, this, true, focusingElmt);
            }
        }
    };
    ReserveEquipmentListComponent.prototype.reserveEquipmtSubmitRet = function (event) {
        if (event["success"]) {
            var context = this;
            context.isReserved = true;
            this.ReserveEquipmentdataLoad(context);
            this.splitviewInput.showSecondaryView = false;
        }
    };
    ReserveEquipmentListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        this.schedulingService.getEquipmentAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    };
    ReserveEquipmentListComponent.prototype.Submit = function (event) {
        var contextObj = this;
        contextObj.showSearchFilter = [];
        this.IsAdvanceSearch = 1;
        var contextObj = this;
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
            contextObj.itemsSource = [];
            contextObj.schedulingService.getReserveEquipmentListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, fromdateTime, todateTime, 2, contextObj.advanceValue).subscribe(function (resultData) {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                contextObj.itemsPerPage = resultData.RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Equipment is available for the search criteria", 2);
                }
            });
        }
    };
    ReserveEquipmentListComponent.prototype.Clear = function (event) {
        this.advanceValue = '[]';
        this.ReserveEquipmentdataLoad(this);
    };
    ReserveEquipmentListComponent = __decorate([
        core_1.Component({
            selector: 'reserveequipmentslist',
            templateUrl: './app/Views/Scheduling/Equipment Reservation/reserveequipmentlist.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent,
                dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, slide_component_1.SlideComponent, customsearchforscheduling_component_1.Searchforschedule, bookequipment_component_1.BookEquipmentComponent],
            providers: [validation_service_1.ValidateService, scheduling_service_1.SchedulingService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], ReserveEquipmentListComponent);
    return ReserveEquipmentListComponent;
}());
exports.ReserveEquipmentListComponent = ReserveEquipmentListComponent;
//# sourceMappingURL=reserveequipmentlist.component.js.map