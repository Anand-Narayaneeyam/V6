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
var wo_pmwocostdetails_report_component_1 = require('./wo.pmwocostdetails.report.component');
var paging_component_1 = require('../../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOPMCostDetailsSelect = (function () {
    function WOPMCostDetailsSelect(commonreportservice, notificationService) {
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
        this.WorkOrderNo = "";
        this.Date = "";
        this.selectedTab = 0;
        this.statusid = 0;
        this.iscard = true;
    }
    WOPMCostDetailsSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Order Cost Details";
        var contextObj = this;
        this.commonreportservice.getGridDataPMworkflowColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        this.commonreportservice.getWOCostDetailsReportFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOPMCostDetailsSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetPMWorkTypeReportLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOPMCostDetailsSelect.prototype.onChangeWorkType = function (event) {
        this.selectedworkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
        var contextObj = this;
        contextObj.LoadData(1);
    };
    WOPMCostDetailsSelect.prototype.LoadData = function (target) {
        var contextObj = this;
        contextObj.commonreportservice.getGridDataPMWOCostDetailsReport(contextObj.selectedworkTypeId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, '').subscribe(function (result) {
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
    WOPMCostDetailsSelect.prototype.onSubMenuChange = function (event) {
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
            this.WorkFlowEntityId = this.inputItems.rowData["WorkFlowEntityId"];
            this.WorkOrderNo = this.inputItems.rowData["Work Order No."];
            this.Date = this.inputItems.rowData["Scheduled Date"];
            if (this.selectedIds == undefined || this.WorkFlowEntityId == undefined || this.selectedworkTypeId == -1) {
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
    WOPMCostDetailsSelect.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.LoadData(0);
    };
    WOPMCostDetailsSelect.prototype.onSort = function (objGrid) {
        this.LoadData(0);
    };
    WOPMCostDetailsSelect.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        if (event[0] == 0 && event[1] == true) {
            this.LoadData(0);
        }
    };
    WOPMCostDetailsSelect = __decorate([
        core_1.Component({
            selector: 'wo-pmwocostdetails-report',
            templateUrl: './app/Views/Reports/WorkOrder/PM/CostDetails/wo.pmwocostdetails.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [grid_component_1.GridComponent, wo_pmwocostdetails_report_component_1.WOPMCostDetailsReportComponent, paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOPMCostDetailsSelect);
    return WOPMCostDetailsSelect;
}());
exports.WOPMCostDetailsSelect = WOPMCostDetailsSelect;
//# sourceMappingURL=wo.pmwocostdetails.report.select.js.map