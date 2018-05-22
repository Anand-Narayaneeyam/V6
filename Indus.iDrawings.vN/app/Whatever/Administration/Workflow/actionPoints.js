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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var addeditActionPoints_1 = require('./addeditActionPoints');
var actionPointUsers_1 = require('./actionPointUsers');
var actionPointUserGroup_1 = require('./actionPointUserGroup');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var General_1 = require('../../../Models/Common/General');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var setWorkflowCategory_1 = require('./setWorkflowCategory');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var WorkFlowActionPoints = (function () {
    function WorkFlowActionPoints(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.showSlide = false;
        this.showUserSlide = false;
        this.Position = "bottom-right";
        this.submitSuccess = new core_1.EventEmitter();
        this.splitViewActionPoint = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Action Point]", selectioMode: "single", sortDir: "ASC", selectedIds: [], allowAdd: false };
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
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Action Point Users / User Groups",
                "image": "Users",
                "path": "Users",
                "submenu": null
            },
            {
                "id": 4,
                "title": "Set Workflow Category",
                "image": "SetWFCategoryAP",
                "path": "SetWFCategoryAP",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1, 2, 3];
        this.sectionAccessExpansionStatus = [{ "title": "Action Point Users", "isExpanded": false }, { "title": "Action Point User Groups", "isExpanded": false }];
    }
    WorkFlowActionPoints.prototype.ngOnInit = function () {
        debugger;
        this.pagePath = "Administration / Action Points";
        var contextObj = this;
        this.administrationService.getActionPointsColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                contextObj.fieldObject[i].IsEnabled = false;
            }
        });
        this.dataLoad();
    };
    WorkFlowActionPoints.prototype.dataLoad = function () {
        var contextObj = this;
        this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    WorkFlowActionPoints.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 1) {
            this.editClick();
        }
        else if (event.value == 2) {
            this.actionPointUsersClick();
        }
        else if (event.value == 3) {
            if (contextObj.totalItems > 0) {
                this.deleteClick();
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
            }
        }
        else if (event.value == 4) {
            this.setWorkFlowCategory();
        }
    };
    WorkFlowActionPoints.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    WorkFlowActionPoints.prototype.addClick = function () {
        this.pageTitle = "New Action Point";
        this.btnName = "Save";
        this.action = "add";
        var contextObj = this;
        this.target = 1;
        this.administrationService.listActionPointAddEdit(0, 1).subscribe(function (resultData) {
            if (resultData["Data"] != undefined) {
                contextObj.administrationService.getCustomerSubscribedFeatures("189,255").subscribe(function (result) {
                    contextObj.isSiteAdminEnabled = result["Data"][0]["IsSubscribed"];
                    contextObj.isSiteLevelUser = result["Data"][1]["IsSubscribed"]; /* Bug 81968 */
                    for (var i = 0; i < resultData["Data"].length; i++) {
                        if (resultData["Data"][i].FieldId == 682) {
                            resultData["Data"][i].IsVisible = false;
                            resultData["Data"][i].IsEnabled = false;
                            resultData["Data"][i].FieldValue = null;
                        }
                        if (resultData["Data"][i].FieldId == 991) {
                            resultData["Data"][i].IsVisible = false;
                            resultData["Data"][i].IsEnabled = false;
                        }
                        if (resultData["Data"][i].FieldId == 2875) {
                            if (contextObj.isSiteAdminEnabled) {
                                resultData["Data"][i].IsVisible = true;
                                resultData["Data"][i].IsEnabled = true;
                            }
                            if (!contextObj.isSiteLevelUser) {
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                            }
                            else if (contextObj.isSiteLevelUser) {
                                resultData["Data"][i].IsVisible = true;
                                resultData["Data"][i].IsEnabled = true;
                            }
                        }
                    }
                });
            }
            contextObj.fieldDetailsAddEdit = resultData["Data"];
        });
        contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView;
    };
    WorkFlowActionPoints.prototype.editClick = function () {
        this.pageTitle = "Edit Action Point";
        this.btnName = "Save Changes";
        this.action = "edit";
        var contextObj = this;
        this.target = 2;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.administrationService.listActionPointAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                if (resultData["Data"] != undefined) {
                    contextObj.administrationService.getCustomerSubscribedFeatures("189,255").subscribe(function (result) {
                        contextObj.isSiteAdminEnabled = result["Data"][0]["IsSubscribed"];
                        contextObj.isSiteLevelUser = result["Data"][1]["IsSubscribed"]; /* Bug 81968 */
                        for (var i = 0; i < resultData["Data"].length; i++) {
                            if (resultData["Data"][i].FieldId == 682) {
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                                resultData["Data"][i].FieldValue = null;
                            }
                            if (resultData["Data"][i].FieldId == 991) {
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                            }
                            if (resultData["Data"][i].FieldId == 2875) {
                                if (contextObj.isSiteAdminEnabled) {
                                    resultData["Data"][i].IsVisible = true;
                                    resultData["Data"][i].IsEnabled = true;
                                }
                                if (!contextObj.isSiteLevelUser) {
                                    resultData["Data"][i].IsVisible = false;
                                    resultData["Data"][i].IsEnabled = false;
                                }
                                else if (contextObj.isSiteLevelUser) {
                                    resultData["Data"][i].IsVisible = true;
                                    resultData["Data"][i].IsEnabled = true;
                                }
                            }
                        }
                    });
                }
                contextObj.fieldDetailsAddEdit = resultData["Data"];
            });
        }
        contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView;
        this.btnName = "Save Changes";
    };
    WorkFlowActionPoints.prototype.actionPointUsersClick = function () {
        var contextObj = this;
        this.pageTitle = "Action Point Users / User Groups";
        this.target = 3;
        contextObj.selectedCellId = null;
        contextObj.splitViewActionPoint.showSecondaryView = true;
        contextObj.selectedCellId = contextObj.inputItems.selectedIds;
    };
    WorkFlowActionPoints.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        contextObj.administrationService.postDeleteActionPoints(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Action Point deleted", 3);
            }
        });
        this.showSlide = false;
    };
    WorkFlowActionPoints.prototype.cancelClick = function (value) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    };
    WorkFlowActionPoints.prototype.APDefaultSetting = function (event) {
        var contextObj = this;
        this.target = 3;
        this.splitViewActionPoint.showSecondaryView = true;
        this.showUserSlide = false;
    };
    WorkFlowActionPoints.prototype.cancelAPClick = function (value) {
        var contextObj = this;
        this.showUserSlide = false;
    };
    WorkFlowActionPoints.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
        this.showUserSlide = false;
    };
    WorkFlowActionPoints.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    };
    WorkFlowActionPoints.prototype.deleteClick = function () {
        var contextObj = this;
        contextObj.administrationService.postActionPointsInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData.Data == 1) {
                contextObj.notificationService.ShowToaster("Selected Action Point in use, cannot be deleted", 2);
            }
            else {
                contextObj.showSlide = true;
            }
        });
    };
    WorkFlowActionPoints.prototype.setWorkFlowCategory = function () {
        this.pageTitle = "Set Workflow Category";
        this.target = 4;
        this.action = "setWorkFlowCategory";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Action Point", 2);
        }
        else {
            if (this.inputItems.selectedIds != undefined) {
                var contextObj = this;
                contextObj.administrationService.checkWorkFlowCategoryInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    contextObj.categoriesInUse = JSON.parse(resultData["Data"].FieldBinderData);
                });
                contextObj.administrationService.getWorkFlowCategories(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    contextObj.fieldDetailsSetWorkflowCategory = resultData["Data"];
                    var workflowCategory = contextObj.fieldDetailsSetWorkflowCategory.find(function (el) { return el.ReportFieldId === 5843; });
                    var lookups = workflowCategory["LookupDetails"]["LookupValues"];
                    for (var i = 0; i < contextObj.categoriesInUse.length; i++) {
                        if (contextObj.categoriesInUse[i]["IsDisabled"] == 1) {
                            var disablelookup = lookups.find(function (el) { return el.Id === contextObj.categoriesInUse[i]["WorkFlowCategoryId"]; });
                            if (disablelookup)
                                disablelookup.IsDisabled = true;
                        }
                    }
                    contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView;
                });
            }
        }
    };
    WorkFlowActionPoints.prototype.pageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    WorkFlowActionPoints.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                var addedId;
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                if (event.returnData != undefined) {
                    addedId = JSON.parse(event.returnData)[0].Id;
                    contextObj.selectedCellId = addedId;
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                }
                this.showUserSlide = true;
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            this.splitViewActionPoint.showSecondaryView = false;
            this.pageTitle = "Action Point Users / User Groups";
        }
    };
    WorkFlowActionPoints.prototype.getActionPointResult = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event.returnData.Data.StatusId == 1) {
            this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    var itemsSource = JSON.parse(resultData["Data"].FieldBinderData); //Bug 81881:  Grid Refresh Issue
                    contextObj.generFun.updateDataSource(itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
            });
        }
    };
    WorkFlowActionPoints.prototype.getActionPointGroupResult = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event.returnData.Data.StatusId == 1) {
            this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    var itemsSource = JSON.parse(resultData["Data"].FieldBinderData); //Bug 81881:  Grid Refresh Issue
                    contextObj.generFun.updateDataSource(itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
            });
        }
    };
    WorkFlowActionPoints.prototype.onSplitViewClose = function (event) {
        this.dataLoad();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkFlowActionPoints.prototype, "submitSuccess", void 0);
    WorkFlowActionPoints = __decorate([
        core_1.Component({
            selector: 'action-points',
            templateUrl: 'app/Views/Administration/Workflow/actionPoints.html',
            directives: [page_component_1.PageComponent, grid_component_1.GridComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, notify_component_1.Notification, addeditActionPoints_1.ActionPointsAddEditComponent, actionPointUsers_1.ActionPointUsers, actionPointUserGroup_1.ActionPointUserGroup, section_component_1.SectionComponent, paging_component_1.PagingComponent, setWorkflowCategory_1.SetWorkflowCategoriesComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: []
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], WorkFlowActionPoints);
    return WorkFlowActionPoints;
}());
exports.WorkFlowActionPoints = WorkFlowActionPoints;
//# sourceMappingURL=actionPoints.js.map