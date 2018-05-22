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
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var space_service_1 = require('../../../../Models/Space/space.service');
var sort_component_1 = require('../../../../Framework/Whatever/Sort/sort.component');
var space_trend_reportviewer_1 = require('../TrendReport/space.trend.reportviewer');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var SpaceSnapshotsListComponent = (function () {
    function SpaceSnapshotsListComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.selectedTab = 0;
        this.enableMenu = [0];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isCreateClicked = false;
        this.isViewClicked = false;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isReportshown = undefined;
        this.dateSelectorField = undefined;
        this.tabDeleteIndex = 0;
        this.SnapshotDate = "";
        this.StartDate = "";
        this.EndDate = "";
        this.dateCompare = false;
        this.dateClicked = false;
        this.snapshotId = 0;
        this.reportType = 0;
        this.ReportTitle = "";
        this.tabTitle = "Create Snapshot";
        this.enableReportMenu = [0];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 2,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null
            }
        ];
        this.menuReport = [
            {
                "id": 0,
                "title": "Save",
                "image": "Save",
                "path": "Save",
                "submenu": null
            }
        ];
    }
    SpaceSnapshotsListComponent.prototype.ngAfterViewInit = function () {
        this.pagePath = "Space / Snapshots";
        var contextObj = this;
        this.spaceService.getSnapshotsFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            tempArray.push(result.Data[2]);
            contextObj.fieldObject = tempArray;
            contextObj.dateSelectorField = result.Data[3];
            if (contextObj.itemsSource == null || contextObj.itemsSource.length == 0) {
                contextObj.LoadData(1);
            }
        });
    };
    SpaceSnapshotsListComponent.prototype.LoadData = function (target) {
        var contextObj = this;
        contextObj.spaceService.getSnapshotsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [0, 1, 2];
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Snapshots exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });
    };
    SpaceSnapshotsListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.deleteClick();
                break;
            case 2:
                this.viewClick();
                break;
        }
    };
    SpaceSnapshotsListComponent.prototype.onSort = function (objGrid) {
        this.LoadData(0);
    };
    SpaceSnapshotsListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.LoadData(0);
    };
    SpaceSnapshotsListComponent.prototype.addClick = function () {
        this.isCreateClicked = false;
        this.reportType = 15;
        this.ReportTitle = "Organizational Occupancy Snapshot";
        this.tabTitle = "Create Snapshot";
        var contexObj = this;
        this.isReportshown = 1;
        this.tabDeleteIndex = 0;
        setTimeout(function () {
            contexObj.isCreateClicked = true;
            contexObj.selectedTab = 1;
            contexObj.enableReportMenu[0];
        }, 100);
    };
    SpaceSnapshotsListComponent.prototype.onSaveSnapshot = function (event) {
        this.SnapshotDate = this.dateSelectorField.FieldValue;
        if (this.SnapshotDate == "" || this.SnapshotDate == null || this.SnapshotDate.split(" ")[2].length != 4) {
            return;
        }
        else {
            var contextObj = this;
            contextObj.spaceService.getSnapshotsDates().subscribe(function (resultData) {
                var date = JSON.parse(resultData.FieldBinderData);
                contextObj.EndDate = date[0].EndDate;
                if (contextObj.EndDate != null) {
                    var SnapDate = new Date(contextObj.SnapshotDate);
                    var endDate = new Date(contextObj.EndDate);
                    if (SnapDate < endDate) {
                        contextObj.dateCompare = true;
                    }
                    else {
                        contextObj.dateCompare = false;
                    }
                }
                if (contextObj.dateCompare == true) {
                    contextObj.notificationService.ShowToaster('Snapshot date cannot be less than the previously created Snapshot date', 2);
                }
                else {
                    contextObj.spaceService.getSnapshotsAdd(contextObj.SnapshotDate).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("Snapshot added", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.isCreateClicked = false;
                                setTimeout(function () {
                                    contextObj.tabDeleteIndex = 1;
                                    contextObj.isReportshown = undefined;
                                }, 50);
                                setTimeout(function () {
                                    contextObj.tabDeleteIndex = 0;
                                    contextObj.selectedTab = 0;
                                }, 100);
                                setTimeout(function () {
                                    contextObj.LoadData(0);
                                }, 100);
                            case 3:
                                if (resultData["Data"].ServerId == -2) {
                                    contextObj.notificationService.ShowToaster("Snapshot already exists for the selected date", 5);
                                }
                        }
                    });
                }
            });
        }
    };
    SpaceSnapshotsListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Snapshot", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    SpaceSnapshotsListComponent.prototype.deleteProcedure = function () {
        var contextObj = this;
        contextObj.spaceService.getSnapshotsdelete(contextObj.inputItems.rowData["Id"]).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Snapshot deleted", 3);
                        contextObj.LoadData(0);
                    }
            }
        });
    };
    SpaceSnapshotsListComponent.prototype.okDelete = function (event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    };
    SpaceSnapshotsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    SpaceSnapshotsListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SpaceSnapshotsListComponent.prototype.viewClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Snapshot", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.isViewClicked = false;
            this.reportType = 18;
            this.ReportTitle = "Snapshot Details";
            this.tabTitle = "View Snapshot";
            var contexObj = this;
            this.isReportshown = 1;
            this.snapshotId = this.inputItems.selectedIds[0];
            setTimeout(function () {
                contexObj.isViewClicked = true;
                contexObj.selectedTab = 1;
            }, 100);
        }
    };
    SpaceSnapshotsListComponent.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.isReportshown != undefined) {
                this.isCreateClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isReportshown = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
        else if (event[0] == 1) {
            this.dateClicked = false;
            this.selectedTab = 1;
        }
    };
    SpaceSnapshotsListComponent.prototype.onTabClose = function (event) {
    };
    SpaceSnapshotsListComponent.prototype.divClicked = function (event) {
        this.dateClicked = !this.dateClicked;
    };
    SpaceSnapshotsListComponent.prototype.onSaveClick = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SpaceSnapshotsListComponent = __decorate([
        core_1.Component({
            selector: 'spaceSnapshots',
            templateUrl: './app/Views/Space/TrendAnalysis/Snapshots/space-snapshots.list.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, tabs_component_1.TabsComponent, tab_component_1.TabComponent, slide_component_1.SlideComponent, grid_component_1.GridComponent, space_trend_reportviewer_1.SpaceTrendReportViewer, datecomponent_component_1.DateComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent],
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceSnapshotsListComponent);
    return SpaceSnapshotsListComponent;
}());
exports.SpaceSnapshotsListComponent = SpaceSnapshotsListComponent;
//# sourceMappingURL=space-snapshots.list.js.map