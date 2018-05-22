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
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var basedrawing_markup_list_component_1 = require('./basedrawing-markup-list.component');
var BaseDrawingRevisionList = (function () {
    function BaseDrawingRevisionList(projectService, notificationService, generFun, administrationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.position = "top-right";
        this.showSlide = false;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
        this.fieldObject = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 745
            },
            //{
            //    "id": 2,
            //    "title": "View",
            //    "image": "View",
            //    "path": "View",
            //    "submenu": null,
            //    "privilegeId": 746
            //},
            {
                "id": 3,
                "title": "List Markups",
                "image": "Markups",
                "path": "Markups",
                "submenu": null,
                "privilegeId": 748
            },
            {
                "id": 4,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
                "privilegeId": 747
            }
        ];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.drawingDialogMessages = { "key": 0, "message": "" };
    }
    ;
    BaseDrawingRevisionList.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 154, contextObj.administrationService, contextObj.menuData.length);
        this.projectService.getBaseDrawingListFormId(576).subscribe(function (resultField) {
            console.log('resultField in base drawing revision list', resultField);
            for (var i = 0; i < resultField["Data"].length; i++) {
                switch (resultField["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultField["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName;
                        break;
                    case 1012:
                        contextObj.fieldtitle = resultField["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"];
                        break;
                    case 1011:
                        contextObj.fieldCat = resultField["Data"][i];
                        contextObj.fieldCat["IsMandatory"] = false;
                        contextObj.fieldCat["FieldValue"] = contextObj.rowData["Category"];
                        break;
                    case 1001:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                    case 1013:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                    case 1002:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                    case 1003:
                        resultField["Data"][i].IsVisible = true;
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                    case 5247:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                    case 551:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                }
            }
        });
        this.dataLoad();
    };
    BaseDrawingRevisionList.prototype.dataLoad = function () {
        var contextObj = this;
        this.projectService.getBaseDrawingMarkRevisionListData(576, this.rowData["Id"], this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex, 1, '').subscribe(function (resultData) {
            console.log('resultData', resultData);
            console.log('rowData', contextObj.rowData);
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4];
            }
        });
    };
    BaseDrawingRevisionList.prototype.onSubMenuChange = function (event) {
        this.rowData = this.inputItems.rowData;
        switch (event.value) {
            case 1:
                this.showSlide = true;
                this.drawingDialogMessages.message = "Are you sure you want to delete the selected Drawing? ";
                break;
            case 3:
                if (this.inputItems.rowData["Markups"] == 0) {
                    this.notificationService.ShowToaster("No markup exists", 2);
                }
                else {
                    this.pageTitle = "Base Drawing Markups";
                    this.splitviewInput.showSecondaryView = true;
                }
                break;
            case 4:
                this.downloadFile();
                break;
        }
    };
    BaseDrawingRevisionList.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    BaseDrawingRevisionList.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    BaseDrawingRevisionList.prototype.downloadFile = function () {
        this.revisionNo = undefined;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;
            filename =
                contextObj.inputItems.rowData["DWG File"];
            if (contextObj.inputItems.rowData["Revision No."] != undefined)
                contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
            else
                contextObj.revisionNo = 0;
            contextObj.projectService.downloadFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {
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
    BaseDrawingRevisionList.prototype.okBaseDrawingDelete = function (event) {
        this.showSlide = false;
        this.deleteBaseDrawing(this.inputItems.rowData["Revision No."]);
    };
    BaseDrawingRevisionList.prototype.deleteBaseDrawing = function (revisionNo) {
        var contextObj = this;
        this.projectService.postDeleteBaseDrawing(576, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["DWG File"], "false").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1]);
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                        contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Drawing deleted", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    BaseDrawingRevisionList.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.dataLoad();
    };
    BaseDrawingRevisionList.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    BaseDrawingRevisionList.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    BaseDrawingRevisionList = __decorate([
        core_1.Component({
            selector: 'base-drawingrevision-list',
            templateUrl: './app/Views/Projects/Projects Data/basedrawing-revision-list.component.html',
            providers: [sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["projectName", "rowData", "projectId"],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, search_component_1.searchBox, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, labelcomponent_component_1.LabelComponent, basedrawing_markup_list_component_1.BaseDrawingMarkupListComponent]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], BaseDrawingRevisionList);
    return BaseDrawingRevisionList;
}());
exports.BaseDrawingRevisionList = BaseDrawingRevisionList;
//# sourceMappingURL=basedrawing-revision-list.component.js.map