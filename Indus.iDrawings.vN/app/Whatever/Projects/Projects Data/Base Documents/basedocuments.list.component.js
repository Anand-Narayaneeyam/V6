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
var projects_service_1 = require('../../../../models/projects/projects.service');
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
var basedocument_addedit_1 = require('./basedocument-addedit');
var basedocument_revision_list_component_1 = require('./basedocument-revision-list.component');
var BaseDocumentListComponent = (function () {
    function BaseDocumentListComponent(projectsService, generFun, administrationService, notificationService) {
        this.projectsService = projectsService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.position = "top-right";
        this.showSlide = false;
        this.totalItems = 0;
        this.inputItems = { dataKey: "BaseDocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
        this.pageIndex = 0;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.menuData = [{
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 768
            },
            {
                "id": 2,
                "title": "Edit Description",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 769
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 770
            },
            //{
            //    "id": 4,
            //    "title": "View",
            //    "image": "View",
            //    "path": "View",
            //    "submenu": null,
            //    "privilegeId": 773
            //},
            {
                "id": 5,
                "title": "Revise",
                "image": "Revise",
                "path": "Revise",
                "submenu": null,
                "privilegeId": 771
            },
            {
                "id": 6,
                "title": "Replace",
                "image": "Replace",
                "path": "Replace",
                "submenu": null,
                "privilegeId": 772
            },
            {
                "id": 7,
                "title": "List Revisions",
                "image": "Revisions",
                "path": "Revisions",
                "submenu": null,
                "privilegeId": 775
            },
            {
                "id": 8,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
                "privilegeId": 774
            }
        ];
        this.drawingDialogMessages = { "key": 0, "message": "" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    }
    ;
    BaseDocumentListComponent.prototype.ngOnInit = function () {
        var context = this;
        this.projectNameDetails = "Project Name: " + "<b>" + this.projectName + "</b>";
        var callBack = function (data) {
            context.menuData = data;
        };
        context.generFun.GetPrivilegesOfPage(context.menuData, callBack, 157, context.administrationService, context.menuData.length);
        this.projectsService.getBaseDocumentFields(581).subscribe(function (resultFields) {
            console.log('result fields in document page', resultFields);
            context.fieldObject = resultFields["Data"];
        });
        this.dataLoad();
    };
    BaseDocumentListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    BaseDocumentListComponent.prototype.onSubMenuChange = function (event) {
        this.selectedId = this.inputItems.selectedIds[0];
        this.rowData = this.inputItems.rowData;
        this.splitviewInput.showSecondaryView = true;
        var fieldobj = new Array();
        if (this.selectedId)
            fieldobj.push({ ReportFieldId: 994, Value: this.selectedId.toString() }, { ReportFieldId: 989, Value: "-1" });
        switch (event.value) {
            case 1:
                this.addDocument();
                break;
            case 2:
                this.editDocument(fieldobj);
                break;
            case 3:
                this.splitviewInput.showSecondaryView = false;
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1, "message": "Are you sure you want to delete the selected Base Document? " };
                break;
            case 5:
                this.reviseDocument(fieldobj);
                break;
            case 6:
                this.replaceDocument(fieldobj);
                break;
            case 8:
                this.splitviewInput.showSecondaryView = false;
                this.downloadFile();
                break;
            case 7:
                if (this.inputItems.rowData["Revisions"] == 0) {
                    this.basetarget = 0;
                    this.notificationService.ShowToaster("No Revisions exist", 2);
                    this.splitviewInput.showSecondaryView = false;
                }
                else {
                    this.basetarget = 2;
                    this.pageTitle = "Base Document Revisions";
                }
                break;
        }
    };
    BaseDocumentListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 995,
            Value: this.projectId.toString()
        });
        this.projectsService.getBaseDocumentsListData(fieldobj, this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex).subscribe(function (data) {
            contextObj.itemsPerPage = data["Data"]["RowsPerPage"];
            contextObj.totalItems = data["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster('No Base Documents added', 2);
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.itemsSource = JSON.parse(data["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
            }
        });
    };
    BaseDocumentListComponent.prototype.addDocument = function () {
        var contextObj = this;
        this.action = "add";
        this.basetarget = 1;
        this.pageTitle = "New Base Document";
        this.projectsService.getBaseDocumentAddEditFields(1).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052;
            });
            projectName.FieldValue = contextObj.projectName;
            var fileuploadfield = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 990; });
            fileuploadfield.FieldLabel = "File (Provide full path)";
        });
    };
    BaseDocumentListComponent.prototype.editDocument = function (fieldobj) {
        var contextObj = this;
        this.action = "edit";
        this.basetarget = 1;
        this.pageTitle = "Edit Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052;
            });
            projectName.FieldValue = contextObj.projectName;
            var docFile = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 990; });
            docFile.IsEnabled = false;
            docFile.FieldLabel = "File (Provide full path)";
            docFile.ReadOnlyMode = true;
        });
    };
    BaseDocumentListComponent.prototype.reviseDocument = function (fieldobj) {
        var contextObj = this;
        var rev = fieldobj.find(function (item) { return item.ReportFieldId === 989; });
        rev.Value = this.inputItems.rowData["LatestRevisionNo"];
        this.action = "revise";
        this.basetarget = 1;
        this.pageTitle = "Revise Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052;
            });
            projectName.FieldValue = contextObj.projectName;
            var title = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 996; });
            title.IsEnabled = false;
        });
    };
    BaseDocumentListComponent.prototype.replaceDocument = function (fieldobj) {
        var contextObj = this;
        var rev = fieldobj.find(function (item) { return item.ReportFieldId === 989; });
        rev.Value = this.inputItems.rowData["LatestRevisionNo"];
        this.action = "replace";
        this.basetarget = 1;
        this.pageTitle = "Replace Base Document";
        this.projectsService.getBaseDocumentAddEditFields(2, this.selectedId, JSON.stringify(fieldobj)).subscribe(function (data) {
            contextObj.fieldDetailsAdd = data["Data"];
            var projectName = contextObj.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 1052;
            });
            projectName.FieldValue = contextObj.projectName;
            var title = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 996; });
            title.IsEnabled = false;
        });
    };
    BaseDocumentListComponent.prototype.downloadFile = function () {
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Drawing", 2);
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var filename;
            filename =
                contextObj.inputItems.rowData["File Name"];
            if (contextObj.inputItems.rowData["LatestRevisionNo"] != undefined) {
                contextObj.revisionNo = contextObj.inputItems.rowData["LatestRevisionNo"];
            }
            else
                contextObj.revisionNo = 0;
            contextObj.projectsService.downloadBaseDocumentFile(contextObj.inputItems.selectedIds[0], filename, contextObj.revisionNo, contextObj.projectId).subscribe(function (resultData) {
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
    BaseDocumentListComponent.prototype.submitSuccess = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else if (this.action == "edit" || this.action == "revise" || this.action == "replace") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    BaseDocumentListComponent.prototype.onSplitViewClose = function (event, target) {
        this.splitviewInput.showSecondaryView = false;
        if (target == 2)
            this.dataLoad();
    };
    BaseDocumentListComponent.prototype.okBaseDrawingDelete = function (event) {
        this.showSlide = false;
        switch (event) {
            case 1:
                if (this.inputItems.rowData["Revisions"] > 0) {
                    this.showSlide = true;
                    this.drawingDialogMessages = { "key": 2, "message": "Do you want to delete the selected Base Document with all its revisions? " };
                }
                else
                    this.deleteBaseDocument(-1);
                break;
            case 2:
                this.deleteBaseDocument(-1);
                break;
        }
    };
    BaseDocumentListComponent.prototype.deleteBaseDocument = function (revisionno) {
        var contextObj = this;
        this.projectsService.postDeleteBaseDocument(581, this.inputItems.selectedIds, revisionno, this.projectId, this.inputItems.rowData["File Name"], "true").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"][0]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["Data"][1]);
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    if (revisionno == -1)
                        contextObj.notificationService.ShowToaster("Selected Base Document deleted", 3);
                    else
                        contextObj.notificationService.ShowToaster("Latest revision of the selected Base Document deleted", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    BaseDocumentListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
        switch (event) {
            case 2:
                this.deleteBaseDocument(this.inputItems.rowData["Revisions"]);
                break;
        }
    };
    BaseDocumentListComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    BaseDocumentListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    BaseDocumentListComponent = __decorate([
        core_1.Component({
            selector: 'base-document-list',
            templateUrl: './app/Views/Projects/Projects Data/Base Documents/baseDocuments.list.component.html',
            providers: [sortHelper_1.SortHelper, projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["projectName", "projectId"],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, search_component_1.searchBox, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, basedocument_addedit_1.BaseDocumentAddEditComponent, basedocument_revision_list_component_1.BaseDocumentRevisionListComponent]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], BaseDocumentListComponent);
    return BaseDocumentListComponent;
}());
exports.BaseDocumentListComponent = BaseDocumentListComponent;
//# sourceMappingURL=basedocuments.list.component.js.map