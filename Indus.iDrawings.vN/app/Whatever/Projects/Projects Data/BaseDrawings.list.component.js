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
var projects_service_1 = require('../../../Models/Projects/projects.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var basedrawingaddedit_component_1 = require('./basedrawingaddedit.component');
var basedrawing_revision_list_component_1 = require('./basedrawing-revision-list.component');
var basedrawing_markup_list_component_1 = require('./basedrawing-markup-list.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var opendrawing_component_1 = require('../../common/opendrawing/opendrawing.component');
var BaseDrawingListComponent = (function () {
    function BaseDrawingListComponent(projectsService, generFun, administrationService, notificationService) {
        this.projectsService = projectsService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.position = "top-right";
        this.showSlide = false;
        this.totalItems = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
        this.pageIndex = 0;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.moduleId = 2;
        this.selectedTab = 0;
        this.drawingType = 5;
        this.drawingCategoryId = 1;
        this.viewDrawing = false;
        this.pageTarget = 1;
        this.IsOpenDrawingComponentActive = false;
        this.drawingDetails = '[]';
        this.closeTbFuns = undefined;
        this.menuData = [{
                "id": 2,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 733
            },
            {
                "id": 1,
                "title": "Edit Description",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 734
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 735
            },
            {
                "id": 4,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null,
                "privilegeId": 738
            },
            {
                "id": 6,
                "title": "Revise",
                "image": "Revise",
                "path": "Revise",
                "submenu": null,
                "privilegeId": 736
            },
            {
                "id": 7,
                "title": "Replace",
                "image": "Replace",
                "path": "Replace",
                "submenu": null,
                "privilegeId": 737
            },
            {
                "id": 8,
                "title": "List Revisions",
                "image": "Revisions",
                "path": "Revisions",
                "submenu": null,
                "privilegeId": 740
            },
            //{
            //    "id": 9,
            //    "title": "List Markups",
            //    "image": "Markups",
            //    "path": "Markups",
            //    "submenu": null,
            //    "privilegeId": 741
            //},
            {
                "id": 11,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
                "privilegeId": 739
            }
        ];
        this.drawingDialogMessages = { "key": 0, "message": "" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    }
    ;
    BaseDrawingListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>";
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 153, contextObj.administrationService, contextObj.menuData.length);
        this.projectsService.getBaseDrawingListFormId(571).subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad();
    };
    BaseDrawingListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        if (event.value != 4)
            this.splitviewInput.showSecondaryView = true;
        this.rowData = this.inputItems.rowData;
        this.selectedId = this.inputItems.selectedIds[0];
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 1001,
            Value: "0"
        });
        switch (event.value) {
            case 2:
                this.action = "add";
                this.basetarget = 1;
                this.pageTitle = "New Base Drawing";
                this.projectsService.getBaseDrawingAddEditFields(1).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052;
                    });
                    projectName.FieldValue = contextObj.projectName;
                });
                break;
            case 1:
                this.action = "edit";
                this.basetarget = 1;
                this.pageTitle = "Edit Base Drawing";
                this.projectsService.getBaseDrawingAddEditFields(2, this.selectedId).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052;
                    });
                    projectName.FieldValue = contextObj.projectName;
                    var drawingType = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1014; });
                    drawingType.IsEnabled = false;
                    // drawingType.IsMandatory = false;
                    var dwgFile = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1002; });
                    dwgFile.IsEnabled = false;
                    //dwgFile.IsMandatory = false;
                    dwgFile.ReadOnlyMode = true;
                });
                break;
            case 3:
                this.splitviewInput.showSecondaryView = false;
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1, "message": "Are you sure you want to delete the selected Base Drawing? " };
                break;
            case 4:
                this.viewDrawingOnClick();
                break;
            case 6:
                this.action = "revise";
                this.basetarget = 1;
                this.pageTitle = "Revise Base Drawing";
                var rev = fieldobj.find(function (item) { return item.ReportFieldId === 1001; });
                rev.Value = this.inputItems.rowData["Latest Revision No"];
                this.projectsService.getBaseDrawingAddEditFields(3, this.selectedId, fieldobj).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.ReportFieldId === 1052;
                    });
                    projectName.FieldValue = contextObj.projectName;
                    var drawingType = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1014; });
                    drawingType.IsEnabled = false;
                    var drawingCat = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1011; });
                    drawingCat.IsEnabled = false;
                });
                break;
            case 7:
                this.action = "replace";
                this.basetarget = 1;
                this.pageTitle = "Replace Base Drawing";
                var rev = fieldobj.find(function (item) { return item.ReportFieldId === 1001; });
                rev.Value = this.inputItems.rowData["Latest Revision No"];
                this.projectsService.getBaseDrawingAddEditFields(3, this.selectedId, fieldobj).subscribe(function (data) {
                    contextObj.fieldDetailsAdd = data["Data"];
                    for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        switch (contextObj.fieldDetailsAdd[i].ReportFieldId) {
                            case 1052:
                                contextObj.fieldDetailsAdd[i].FieldValue = contextObj.projectName;
                                break;
                            case 1012:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;
                            case 1011:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;
                            case 1001:
                                contextObj.fieldDetailsAdd[i].IsVisible = true;
                                break;
                            case 1014:
                                contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                break;
                        }
                    }
                });
                break;
            case 8:
                if (this.inputItems.rowData["Revisions"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No Revisions exist", 2);
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 2;
                    this.pageTitle = "Base Drawing Revisions";
                }
                break;
            case 9:
                if (this.inputItems.rowData["Markups"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No markup exists", 2);
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 3;
                    this.pageTitle = "Base Drawing Markups";
                }
                break;
            case 11:
                this.splitviewInput.showSecondaryView = false;
                this.downloadFile();
                break;
        }
    };
    BaseDrawingListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 1010,
            Value: this.projectId.toString()
        });
        this.projectsService.getBaseDrawingsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(function (data) {
            contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
            contextObj.totalItems = data["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster('No Base Drawings added', 2);
                contextObj.enableMenu = [2];
            }
            else {
                contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11];
            }
        });
    };
    BaseDrawingListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        var retUpdatedSrc;
        console.log('event after add', event);
        this.splitviewInput.showSecondaryView = false;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems > 0)
                this.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "revise") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "replace") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
    };
    BaseDrawingListComponent.prototype.onSplitViewClose = function (event, target) {
        this.splitviewInput.showSecondaryView = false;
        if (target == 2 || target == 3)
            this.dataLoad();
    };
    BaseDrawingListComponent.prototype.okBaseDrawingDelete = function (event) {
        var contextObj = this;
        this.showSlide = false;
        switch (event) {
            case 1:
                if (this.inputItems.rowData["Revisions"] > 0) {
                    this.showSlide = true;
                    this.drawingDialogMessages = { "key": 2, "message": "Do you want to delete the selected Base Drawing with all its revisions? " };
                }
                else
                    this.deleteBaseDrawing(-1);
                break;
            case 2:
                this.deleteBaseDrawing(-1);
                break;
        }
    };
    BaseDrawingListComponent.prototype.deleteBaseDrawing = function (revisionNo) {
        var contextObj = this;
        this.projectsService.postDeleteBaseDrawing(571, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["DWG File"], "true").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1]);
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [2];
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Selected Base Drawing deleted", 3);
                    else
                        contextObj.notificationService.ShowToaster("Latest revision of the selected Base Drawing deleted", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    BaseDrawingListComponent.prototype.downloadFile = function () {
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;
            filename =
                contextObj.inputItems.rowData["DWG File"];
            if (contextObj.inputItems.rowData["Latest Revision No"] != undefined) {
                contextObj.revisionNo = contextObj.inputItems.rowData["Latest Revision No"];
            }
            else
                contextObj.revisionNo = 0;
            contextObj.projectsService.downloadFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.generFun.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", filename);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
    };
    BaseDrawingListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    BaseDrawingListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
        switch (event) {
            case 2:
                this.deleteBaseDrawing(this.inputItems.rowData["Revisions"]);
                break;
        }
    };
    BaseDrawingListComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    BaseDrawingListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    BaseDrawingListComponent.prototype.getSelectedTab = function (event) {
        debugger;
        this.selectedTab = event[0];
    };
    BaseDrawingListComponent.prototype.onTabClose = function () {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
    };
    BaseDrawingListComponent.prototype.outDrawingObject = function (event) {
        //debugger;
        this.objiWhiz = event.dwgObject;
    };
    BaseDrawingListComponent.prototype.onTabBeforeClose = function ($event) {
        var contextObj = this;
        contextObj.closeTbFuns = $event;
        contextObj.selectedTab = 0;
        if (contextObj.objiWhiz) {
            contextObj.objiWhiz.close(function (returnCode) {
                contextObj.onTabClose();
            });
        }
        else
            contextObj.onTabClose();
    };
    BaseDrawingListComponent.prototype.viewDrawingOnClick = function () {
        debugger;
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                this.IsOpenDrawingComponentActive = false;
                this.viewDrawing = false;
                contextObj.deleteIndex = 1;
            }
            setTimeout(function () {
                contextObj.drawingDetails = contextObj.rowData;
                contextObj.revisionNumber = contextObj.rowData['Latest Revision No'];
                contextObj.drawingId = contextObj.inputItems.selectedIds[0];
                contextObj.IsOpenDrawingComponentActive = true;
                contextObj.viewDrawing = true;
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = 1;
                contextObj.deleteIndex = 0;
            }, 100);
        }
    };
    BaseDrawingListComponent = __decorate([
        core_1.Component({
            selector: 'base-drawing-list',
            templateUrl: './app/Views/Projects/Projects Data/BaseDrawings.list.component.html',
            providers: [sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["projectName", "projectId"],
            directives: [opendrawing_component_1.OpenDrawing, tabs_component_1.TabsComponent, tab_component_1.TabComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, search_component_1.searchBox, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, basedrawing_revision_list_component_1.BaseDrawingRevisionList, basedrawingaddedit_component_1.BaseDrawingAddEditComponent, basedrawing_markup_list_component_1.BaseDrawingMarkupListComponent]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], BaseDrawingListComponent);
    return BaseDrawingListComponent;
}());
exports.BaseDrawingListComponent = BaseDrawingListComponent;
//# sourceMappingURL=BaseDrawings.list.component.js.map