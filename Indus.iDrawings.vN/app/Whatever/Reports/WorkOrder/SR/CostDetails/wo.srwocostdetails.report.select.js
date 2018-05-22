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
var common_service_1 = require('../../../../../Models/reports/common.service');
var grid_component_1 = require('../../../../../Framework/Whatever/Grid/grid.component');
var wo_srwocostdetails_report_component_1 = require('./wo.srwocostdetails.report.component');
var paging_component_1 = require('../../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOSRCostDetailsSelect = (function () {
    function WOSRCostDetailsSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.ddlWorkType = undefined;
        this.inputItems = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isNextClicked = false;
        this.totalItems = 0;
        this.selectedworkTypeId = 0;
        this.WorkTypeName = "";
        this.RequestNo = "";
        this.Description = "";
        this.selectedTab = 0;
        this.statusid = 0;
        this.iscard = true;
    }
    WOSRCostDetailsSelect.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Cost Details";
        var contextObj = this;
        this.commonreportservice.getGridDataSRworkflowColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        this.commonreportservice.getWOCostDetailsReportFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRCostDetailsSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOSRCostDetailsSelect.prototype.onChangeWorkType = function (event) {
        this.selectedworkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
        var contextObj = this;
        contextObj.LoadData(1);
    };
    WOSRCostDetailsSelect.prototype.LoadData = function (target) {
        var contextObj = this;
        contextObj.commonreportservice.getGridDataSRWOCostDetailsReport(contextObj.selectedworkTypeId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, '').subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Work Orders exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    WOSRCostDetailsSelect.prototype.onSubMenuChange = function (event) {
        this.isNextClicked = false;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            event = this.inputItems.selectedIds;
            var newselectedIds = '';
            for (var count = 0; count < event.length; count++) {
                newselectedIds = newselectedIds + event[count] + ',';
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds = newselectedIds;
            this.WorkOrderId = this.inputItems.rowData["WorkOrderId"];
            this.RequestNo = this.inputItems.rowData["Request Number"];
            this.Description = this.inputItems.rowData["Description"];
            if (this.selectedIds == undefined || this.WorkOrderId == undefined || this.selectedworkTypeId == -1) {
                this.isNextClicked = false;
            }
            else {
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
    };
    WOSRCostDetailsSelect.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.LoadData(0);
    };
    WOSRCostDetailsSelect.prototype.onSort = function (objGrid) {
        this.LoadData(0);
    };
    WOSRCostDetailsSelect.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        if (event[0] == 0 && event[1] == true) {
            this.LoadData(0);
        }
    };
    WOSRCostDetailsSelect = __decorate([
        core_1.Component({
            selector: 'wo-srwocostdetails-report',
            templateUrl: './app/Views/Reports/WorkOrder/SR/CostDetails/wo.srwocostdetails.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [grid_component_1.GridComponent, wo_srwocostdetails_report_component_1.WOSRCostDetailsReportComponent, paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSRCostDetailsSelect);
    return WOSRCostDetailsSelect;
}());
exports.WOSRCostDetailsSelect = WOSRCostDetailsSelect;
//# sourceMappingURL=wo.srwocostdetails.report.select.js.map