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
var projects_service_1 = require('../../../../Models/Projects/projects.service');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../../utils/sortHelper');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../../Framework/Whatever/Search/search.component');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var labelcomponent_component_1 = require('../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var BaseDocumentRevisionListComponent = (function () {
    function BaseDocumentRevisionListComponent(projectService, notificationService, generFun, administrationService) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.position = "top-right";
        this.showSlide = false;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "BaseDocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
        this.fieldObject = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 779
            },
            {
                "id": 2,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
                "privilegeId": 780
            }
        ];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.drawingDialogMessages = { "key": 0, "message": "" };
        this.outrevlist = new core_1.EventEmitter();
    }
    ;
    BaseDocumentRevisionListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 158, contextObj.administrationService, contextObj.menuData.length);
        contextObj.projectService.getBaseDocumentFields(589).subscribe(function (resultField) {
            for (var i = 0; i < resultField["Data"].length; i++) {
                switch (resultField["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultField["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName;
                        break;
                    case 996:
                        contextObj.fieldtitle = resultField["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"];
                        break;
                    case 989:
                        resultField["Data"][i].FieldLabel = "Revision No.";
                    case 998:
                    case 990:
                    case 991:
                    case 993:
                        contextObj.fieldObject.push(resultField["Data"][i]);
                        break;
                }
            }
        });
        this.dataLoad();
    };
    BaseDocumentRevisionListComponent.prototype.dataLoad = function () {
        console.log('rowdata in revision list of base document', this.rowData);
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 994,
            Value: this.rowData["BaseDocumentId"]
        });
        this.projectService.getBaseDocumentsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(function (data) {
            contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
            contextObj.totalItems = data["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster('No Base Documents added', 2);
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2];
            }
        });
    };
    BaseDocumentRevisionListComponent.prototype.onSubMenuChange = function (event) {
        this.rowData = this.inputItems.rowData;
        switch (event.value) {
            case 1:
                this.showSlide = true;
                this.drawingDialogMessages.message = "Are you sure you want to delete the selected Document? ";
                break;
            case 2:
                this.downloadFile();
                break;
        }
    };
    BaseDocumentRevisionListComponent.prototype.downloadFile = function () {
        this.revisionNo = undefined;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;
            filename =
                contextObj.inputItems.rowData["File Name"];
            if (contextObj.revisionNo == undefined)
                contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
            contextObj.projectService.downloadBaseDocumentFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {
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
    BaseDocumentRevisionListComponent.prototype.okBaseDrawingDelete = function (event) {
        this.showSlide = false;
        this.deleteBaseDocument(this.inputItems.rowData["Revision No."]);
    };
    BaseDocumentRevisionListComponent.prototype.deleteBaseDocument = function (revisionNo) {
        var contextObj = this;
        this.projectService.postDeleteBaseDocument(589, this.inputItems.selectedIds, revisionNo, this.projectId, this.inputItems.rowData["File Name"], "false").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1]);
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                        contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                    }
                    if (revisionNo == -1)
                        contextObj.notificationService.ShowToaster("Document deleted", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    BaseDocumentRevisionListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    BaseDocumentRevisionListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    BaseDocumentRevisionListComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    BaseDocumentRevisionListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaseDocumentRevisionListComponent.prototype, "outrevlist", void 0);
    BaseDocumentRevisionListComponent = __decorate([
        core_1.Component({
            selector: 'base-documentrevision-list',
            templateUrl: './app/Views/Projects/Projects Data/Base Documents/baseDocument-revision-list.component.html',
            providers: [sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["projectName", "rowData", "projectId"],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, search_component_1.searchBox, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, labelcomponent_component_1.LabelComponent]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], BaseDocumentRevisionListComponent);
    return BaseDocumentRevisionListComponent;
}());
exports.BaseDocumentRevisionListComponent = BaseDocumentRevisionListComponent;
//# sourceMappingURL=basedocument-revision-list.component.js.map