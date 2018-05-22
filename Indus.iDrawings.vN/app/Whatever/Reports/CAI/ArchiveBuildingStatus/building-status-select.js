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
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var floorselection_report_component_1 = require('../../Common/ReportFloorSelection/floorselection.report.component');
var spaceDriver_report_1 = require('../SpaceDriver/spaceDriver.report');
var common_service_1 = require('../../../../Models/reports/common.service');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var General_1 = require('../../../../Models/Common/General');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var archive_edit_1 = require('./archive-edit');
var building_status_report_1 = require('./building-status-report');
var ArchiveBuildingStatusComponent = (function () {
    function ArchiveBuildingStatusComponent(commonReportService, _notificationService, generalFunctions) {
        this.commonReportService = commonReportService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.selectedCriteria = 3;
        this.blnShowDate = true;
        this.iscard = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.isEnableGrid = false;
        this.archiveNameInput = "";
        this.createOnInput = "";
    }
    ArchiveBuildingStatusComponent.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null
            }
        ];
        this.enableMenu = [];
        this.pagePath = "CAI / Archives / CAI Space Driver";
        var contextObj = this;
        contextObj.commonReportService.archiveDateSelector().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            var date = new Date();
            //let arr: any[];
            //arr = date.toDateString().split(" ");
            //this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];
            var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var fromMon = monthNames[date.getMonth() - 1];
            var toMon = monthNames[date.getMonth()];
            var year = date.getFullYear();
            // contextObj.dateSelectorField[0].FieldValue = (Number(dd) - 1).toString + " " + fromMon + " " + year;
            contextObj.dateSelectorField[0].FieldValue = contextObj.setPrevMonthsDate();
            contextObj.dateSelectorField[1].FieldValue = dd + " " + toMon + " " + year;
        });
    };
    ArchiveBuildingStatusComponent.prototype.getData = function () {
        var contextObj = this;
        this.commonReportService.getArchivesData(3, 0, this.dateSelectorField[0].FieldValue, this.dateSelectorField[1].FieldValue, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.itemsPerPage = result.RowsPerPage;
                contextObj.enableMenu = [0, 1];
                contextObj.isEnableGrid = true;
            }
            else {
                contextObj._notificationService.ShowToaster("No Archives exist for the selected period", 2);
                contextObj.enableMenu = [];
                contextObj.isEnableGrid = false;
            }
        });
    };
    ArchiveBuildingStatusComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    ArchiveBuildingStatusComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.archiveNameInput = this.inputItems.rowData["Archive Name"];
                this.createOnInput = this.inputItems.rowData["Date of Creation"];
                this.isInitialised = false;
                this.next = this.inputItems.selectedIds;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isInitialised = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
                break;
            case 1:
                this.editClick();
                break;
        }
    };
    ArchiveBuildingStatusComponent.prototype.editClick = function () {
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Archive";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select an Archive", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.commonReportService.getArchiveBuildingStatusEditFields().subscribe(function (result) {
                contextObj.fromDateInput = contextObj.dateSelectorField[0].FieldValue;
                contextObj.toDateinput = contextObj.dateSelectorField[1].FieldValue;
                //result["Data"].find(function (item) {
                //    if (item.FieldId == 2786)
                //        item.FieldValue = contextObj.inputItems.rowData["Id"];
                //});
                result["Data"].find(function (item) {
                    if (item.FieldId == 2753) {
                        item.FieldValue = contextObj.inputItems.rowData["Archive Name"];
                        item.IsEnabled = false;
                    }
                });
                result["Data"].find(function (item) {
                    if (item.FieldId == 2754)
                        item.FieldValue = contextObj.inputItems.rowData["Description"];
                });
                contextObj.fieldDetailsEdit = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ArchiveBuildingStatusComponent.prototype.onNextClick = function (event) {
        var contextObj = this;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;
        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);
        this.ToDateInput = toDate;
        this.FromDateInput = fromDate;
        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this._notificationService.ShowToaster('From Date must be less than To Date', 2);
                contextObj.totalItems = 0;
                contextObj.itemsSource = [];
                contextObj.itemsPerPage = 0;
                contextObj.enableMenu = [];
                contextObj.isEnableGrid = false;
            }
            else {
                var dateselectorFrom = this.dateSelectorField[0];
                var dateselectorTo = this.dateSelectorField[1];
                if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError)
                    return;
                this.commonReportService.getArchiveSpaceDriverFields().subscribe(function (result) {
                    //let rptField = [1611,1613,1614,1615,1541];
                    //let count = rptField.length;
                    //result["Data"].find(function (item) {
                    //    if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    //        item.Width = "*";
                    //        count--;
                    //        if (count == 0) {
                    //            return true;
                    //        } else {
                    //            return false;
                    //        }
                    //    } else {
                    //        return false;
                    //    }
                    //});
                    result["Data"].find(function (item) {
                        if (item.FieldId == 2781) {
                            item.IsEnabled = false;
                            item.IsVisible = false;
                        }
                    });
                    contextObj.fieldObject = (result["Data"]);
                    contextObj.getData();
                });
            }
        }
        else {
            return;
        }
    };
    ArchiveBuildingStatusComponent.prototype.setPrevMonthsDate = function () {
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var prevMonth;
        var eoy;
        if (currentDate.getMonth() - 1 < 0) {
            prevMonth = monthNames[monthNames.length - 1];
            eoy = true;
        }
        else
            prevMonth = monthNames[currentDate.getMonth() - 1];
        var arr;
        arr = currentDate.toDateString().split(" ");
        if (eoy)
            arr[3] = (Number(arr[3]) - 1).toString();
        return arr[2] + " " + prevMonth + " " + arr[3];
    };
    ArchiveBuildingStatusComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        retUpdatedSrc = this.generalFunctions.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ArchiveBuildingStatusComponent.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getData();
    };
    ArchiveBuildingStatusComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getData();
    };
    ;
    ArchiveBuildingStatusComponent = __decorate([
        core_1.Component({
            selector: 'archive-buildingStatus-report',
            templateUrl: './app/Views/Reports/CAI/ArchiveBuildingStatus/building-status-select.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, spaceDriver_report_1.CAISpaceDriverComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, page_component_1.PageComponent, datecomponent_component_1.DateComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, archive_edit_1.ArchiveBuildingStatusEditComponent, building_status_report_1.ArchiveBuildingStatusReport],
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ArchiveBuildingStatusComponent);
    return ArchiveBuildingStatusComponent;
}());
exports.ArchiveBuildingStatusComponent = ArchiveBuildingStatusComponent;
//# sourceMappingURL=building-status-select.js.map