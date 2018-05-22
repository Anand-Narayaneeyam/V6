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
var administration_service_1 = require('../../../models/administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var schedule_report_addedit_component_1 = require('../../Common/ScheduleReport/schedule-report-addedit.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var ManageReportsComponent = (function () {
    function ManageReportsComponent(administrationService, notificationService, generFun, documentService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.documentService = documentService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
        this.pageIndex = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.types = true;
        this.menuData = [
            {
                "id": 0,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Activate ",
                "image": "Activate",
                "path": "Activate",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Block ",
                "image": "Block",
                "path": "Block",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1, 2, 3];
        this.position = "top-right";
        this.showSlide = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.showSheduleReportAddEdit = false;
        this.isEdit = false;
    }
    ManageReportsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.enableMenu = [];
        this.administrationService.getManageReportFieldObject().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.administrationService.getSessionData().subscribe(function (data) {
                var userId = data["Data"]["UserId"];
                contextObj.administrationService.getPersonalSettingsFieldWithData(userId).subscribe(function (resultData) {
                    var displayOptnFormat = resultData["Data"].find(function (item) { return item.FieldId === 2303; });
                    contextObj.nameDisplayFormatId = displayOptnFormat.FieldValue;
                    contextObj.loadData(1);
                });
            });
            contextObj.itemsSource = [];
        });
    };
    ManageReportsComponent.prototype.loadData = function (target) {
        var contextObj = this;
        this.administrationService.getManageReportData(Number(contextObj.moduleId), Number(contextObj.target), Number(contextObj.nameDisplayFormatId), 0, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.enableMenu = [0, 1, 2, 3];
                if (target == 1) {
                    contextObj.itemsPerPage = result.RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Scheduled Reports exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    ManageReportsComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.editClick(this.inputItems);
                break;
            case 1:
                this.StatusClick(event.value);
                break;
            case 2:
                this.StatusClick(event.value);
                break;
            case 3:
                this.deleteClick(this.inputItems.selectedIds);
                break;
        }
    };
    ManageReportsComponent.prototype.editClick = function (inputItems) {
        this.reportName = this.inputItems.rowData.Name;
        this.fieldDetailsEdit = this.inputItems.rowData;
        this.isEdit = true;
        debugger;
        this.showSheduleReport();
    };
    ManageReportsComponent.prototype.StatusClick = function (status) {
        var contextObj = this;
        this.refreshgrid = [];
        var selectedItem = contextObj.itemsSource.find(function (item) {
            if (item.Id == contextObj.inputItems.selectedIds[0])
                return true;
        });
        var obj = new Array();
        obj.push({
            ReportFieldId: 8646,
            Value: status
        });
        if (selectedItem.StatusId == 59)
            contextObj.notificationService.ShowToaster("Only active Report can be Blocked", 5);
        else if (status == 1) {
            if (selectedItem.StatusId == 1)
                contextObj.notificationService.ShowToaster("Selected Report is already Activated", 5);
            else {
                contextObj.administrationService.manageReportDataStatus(JSON.stringify(obj), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.Message == "Success") {
                        contextObj.inputItems.rowData["Status"] = "Active";
                        contextObj.inputItems.rowData["StatusId"] = 1;
                        //contextObj.itemsSource.find(function (item) {
                        //    if (item.Id == contextObj.inputItems.selectedIds[0]) {
                        //        item.Status = "Active";
                        //        item.StatusId = 1;
                        //        return true;
                        //    }
                        //});
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        // contextObj.loadData(0);
                        contextObj.notificationService.ShowToaster("Selected report has been Activated", 3);
                    }
                    else if (resultData.Message == "Failure")
                        contextObj.notificationService.ShowToaster("Report Status Update Failed", 5);
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            }
        }
        else if (status == 2) {
            if (selectedItem.StatusId == 2)
                contextObj.notificationService.ShowToaster("Selected Report is already Blocked", 5);
            else {
                contextObj.administrationService.manageReportDataStatus(JSON.stringify(obj), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.Message == "Success") {
                        contextObj.inputItems.rowData["Status"] = "Blocked";
                        contextObj.inputItems.rowData["StatusId"] = 2;
                        //contextObj.itemsSource.find(function (item) {
                        //    if (item.Id == contextObj.inputItems.selectedIds[0]) {
                        //        item.Status = "Blocked";
                        //        item.StatusId = 2;
                        //        return true;
                        //    }
                        //});
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        // contextObj.loadData(0);
                        contextObj.notificationService.ShowToaster("Selected report has been Blocked", 3);
                    }
                    else if (resultData.Message == "Failure")
                        contextObj.notificationService.ShowToaster("Report Status Update Failed", 5);
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            }
        }
    };
    ManageReportsComponent.prototype.deleteClick = function (userIds) {
        if (userIds.length == 1) {
            this.showSlide = !this.showSlide;
            this.deleteMsg = "Are you sure you want to delete the selected Scheduled Report?";
        }
        else if (userIds.length < 1) {
            this.notificationService.ShowToaster("Select a Report", 2);
        }
        else if (userIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
    };
    ManageReportsComponent.prototype.deleteReports = function () {
        var contextObj = this;
        contextObj.administrationService.manageReportDataDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Scheduled Reports exist", 2);
                    contextObj.enableMenu = [];
                }
                contextObj.notificationService.ShowToaster("Selected Report has been deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    ManageReportsComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.deleteReports();
    };
    ManageReportsComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    ManageReportsComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    ManageReportsComponent.prototype.onSort = function (objGrid) {
        this.loadData(0);
    };
    ManageReportsComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.loadData(0);
    };
    ManageReportsComponent.prototype.showSheduleReport = function () {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "Edit Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    };
    ManageReportsComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    ManageReportsComponent.prototype.handleUpdateSuccess = function (event) {
        debugger;
        var context = this;
        this.refreshgrid = [];
        this.splitviewInput.showSecondaryView = false;
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.refreshgrid = this.refreshgrid.concat([true]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ManageReportsComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ManageReportsComponent.prototype, "target", void 0);
    ManageReportsComponent = __decorate([
        core_1.Component({
            selector: 'manageReports',
            templateUrl: './app/Views/Administration/General Settings/manage-reports-component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent,
                submenu_component_1.SubMenu, sort_component_1.Sorting,
                paging_component_1.PagingComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS,
                notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService])
    ], ManageReportsComponent);
    return ManageReportsComponent;
}());
exports.ManageReportsComponent = ManageReportsComponent;
//# sourceMappingURL=manage-reports-component.js.map