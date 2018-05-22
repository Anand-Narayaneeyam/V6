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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var email_recipient_component_1 = require('./email-recipient.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var GenerateWorkOrderListComponent = (function () {
    function GenerateWorkOrderListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "PMId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 140 };
        this.target = 0;
        this.enableMenu = [];
        this.gridcount = 8;
        this.selectedId = 0;
        this.pageTitle = "Select Notification Recipients";
        //Form Id : 264 --pageid:2550
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (264))
        this.menuData = [
            {
                "id": 1,
                "title": "Generate",
                "image": "Generate",
                "path": "Generate",
                "subMenu": null,
                "privilegeId": 6189
            }
        ];
    }
    GenerateWorkOrderListComponent.prototype.ngAfterViewInit = function () {
        this.equipmentClassId;
        if (this.routeId == undefined)
            this.routeId = "-1";
        else if (this.equipmentCategoryId == undefined)
            this.equipmentCategoryId = "-1";
        else if (this.equipmentClassId == undefined)
            this.equipmentClassId = "-1";
        var contextObj = this;
        //   this.workOrderService.getGenerateWorkOrderListListFields().subscribe(function (resultData) {
        this.workOrderService.getGenerateWorkOrderListListFields(this.workTypeId).subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            //  contextObj.fieldObject = resultData.Data.FieldBinderList;
            //var idTemp = contextObj.fieldObject.find(function (item) {
            //    return item.FieldId === 1463;
            //});
            //idTemp.FieldLabel = "";
            //idTemp.IsEnabled = true;
            //idTemp.IsVisible = true;
            if (Number(contextObj.numberOfDays) >= 0)
                contextObj.loadDataHaveNumberofDays();
            else
                contextObj.loadDataHaveDate();
        });
        //form id : 264***** PageId :2550
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2550, contextObj.administrationServices, contextObj.menuData.length);
    };
    GenerateWorkOrderListComponent.prototype.loadDataHaveNumberofDays = function () {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.numberOfDays, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            var le = temp.length;
            if (le > 0) {
                //var temp = JSON.parse(resultData["Data"].FieldBinderData);
                //let le = temp.length;
                //.........time  change
                //for (let i = 0; i < temp.length; i++) {
                //    var dateTemp = new Date(temp[i]["Next PM Date"]);
                //    contextObj.setDate(dateTemp);
                //    temp[i]["Next PM Date"] = contextObj.selectedDateValue;;
                //}
                ////........ //.........time  change
                //  var fieldobj = new Array<ReportFieldArray>();
                // contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1];
            }
            else {
                var selectAll = contextObj.fieldObject.find(function (item) { return item.FieldId === 1463; });
                selectAll.IsEnabled = false;
                selectAll.IsVisible = false;
                contextObj.itemsSource = temp;
                contextObj.notificationService.ShowToaster("No PM Schedules exist for the Number of days entered / Work Order already generated, for the selected criteria", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    GenerateWorkOrderListComponent.prototype.loadDataHaveDate = function () {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderListDataHavingDate(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.date, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            var le = temp.length;
            if (le > 0) {
                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1];
            }
            else {
                var selectAll = contextObj.fieldObject.find(function (item) { return item.FieldId === 1463; });
                selectAll.IsEnabled = false;
                selectAll.IsVisible = false;
                contextObj.itemsSource = temp;
                contextObj.notificationService.ShowToaster("No PM Schedules exist or Work Orders already generated for the selected criteria", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    GenerateWorkOrderListComponent.prototype.setDate = function (date) {
        var d = date;
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
    GenerateWorkOrderListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.target = 1;
                this.generateClick();
                break;
        }
    };
    GenerateWorkOrderListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.getlistDataForDynamic(event);
    };
    ;
    GenerateWorkOrderListComponent.prototype.getlistDataForDynamic = function (event) {
        var contextObj = this;
        if (Number(contextObj.numberOfDays) >= 0) {
            this.workOrderService.getGenerateWorkOrderListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.numberOfDays, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else {
            this.workOrderService.getGenerateWorkOrderListDataHavingDate(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.date, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
    };
    GenerateWorkOrderListComponent.prototype.generateClick = function () {
        var contextObj = this;
        this.inputItems.selectedIds = [];
        var arrayList = new Array();
        var sitelist = [];
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Select All"] == true) {
                this.inputItems.selectedIds.push(this.itemsSource[i]["PMId"]);
                arrayList.push({
                    ReportFieldId: 5563,
                    Value: this.itemsSource[i]["PMIdProcedureIdAndNextPMDate"]
                });
                sitelist.push(this.itemsSource[i]["SiteId"]);
            }
        }
        for (var i = 0; i < sitelist.length - 1; i++) {
            if (sitelist[i] != sitelist[i + 1]) {
                this.notificationService.ShowToaster("Select PM(s) of same site", 2);
                return;
            }
        }
        this.siteId = sitelist[0];
        this.selectedId = this.inputItems.selectedIds.length;
        if (this.inputItems.selectedIds.length > 0) {
            contextObj.gridDetails = JSON.stringify(arrayList);
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a PM", 2);
        }
    };
    GenerateWorkOrderListComponent.prototype.OnSuccessfulSubmit = function (event) {
        //if (event["status"] == "success") {
        //    let retUpdatedSrc;
        //    if (this.action == "add") {
        //        retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //        this.totalItems = retUpdatedSrc["itemCount"];
        //    }
        //    else if (this.action == "edit") {
        //        retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //    }
        //    this.itemsSource = retUpdatedSrc["itemSrc"];
        //    this.splitviewInput.showSecondaryView = false;
        //}
    };
    GenerateWorkOrderListComponent.prototype.generateSuccess = function (event) {
        console.log("generate", event["status"]);
        if (event["status"] == "success") {
            this.target = 0;
            this.splitviewInput.showSecondaryView = false;
            if (Number(this.numberOfDays) >= 0)
                this.loadDataHaveNumberofDays();
            else
                this.loadDataHaveDate();
        }
    };
    GenerateWorkOrderListComponent = __decorate([
        core_1.Component({
            selector: 'generate-work-order-list',
            templateUrl: './app/Views/WorkOrder/Generate PM WOs/generate-work-order-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, tabs_component_1.TabsComponent, tab_component_1.TabComponent, email_recipient_component_1.EmailRecipient],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['numberOfDays', 'routeId', 'equipmentCategoryId', 'equipmentClassId', 'workTypeId', "date"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], GenerateWorkOrderListComponent);
    return GenerateWorkOrderListComponent;
}());
exports.GenerateWorkOrderListComponent = GenerateWorkOrderListComponent;
//# sourceMappingURL=generate-work-order-list.component.js.map