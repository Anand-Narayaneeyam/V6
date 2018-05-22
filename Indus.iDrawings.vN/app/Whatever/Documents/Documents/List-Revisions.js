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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RevisionList = (function () {
    function RevisionList(notificationService, documentService, getData, generFun, administrationService) {
        this.notificationService = notificationService;
        this.documentService = documentService;
        this.getData = getData;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.documentGroupName = "";
        this.enableMenu = [];
        this.showSlide = false;
        this.position = "top-right";
        this.message = "Are you sure you want to delete the selected Document?";
        this.messageLabel = "";
        this.strFileName = "";
        this.imgData = "";
        this.imgData1 = "";
        this.menuData = [
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
            },
            {
                "id": 2,
                "title": "Download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
            }
        ];
    }
    RevisionList.prototype.ngOnInit = function () {
        var contextObj = this;
        var objContext = this;
        contextObj.enableMenu = [];
        objContext.btnName = "Submit";
        objContext.documentService.getDocumentRevisionFeildList().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
        contextObj.documentRevisionList(this.documentId);
    };
    RevisionList.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.deleteClick();
                break;
            case 2:
                this.downloadDocument(this.documentId);
                break;
        }
    };
    RevisionList.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Revision to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    RevisionList.prototype.documentRevisionList = function (documentId) {
        var contextObj = this;
        contextObj.documentService.getDocumentRevisionList(documentId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.notificationService.ShowToaster("No Revisions exist", 2);
            }
        });
    };
    RevisionList.prototype.deleteRevision = function () {
        var contextObj = this;
        var arrayList = new Array();
        var RevisioNo = contextObj.inputItems.rowData["Revisions"];
        var DocumentId = contextObj.inputItems.rowData["DocumentId"];
        arrayList.push({
            ReportFieldId: 959,
            Value: RevisioNo
        });
        contextObj.documentService.postRevisionDelete(JSON.stringify(arrayList), DocumentId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [];
                    contextObj.notificationService.ShowToaster("No Revision exist", 3);
                }
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Document in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Document in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    };
    RevisionList.prototype.downloadDocument = function (selectionIds) {
        var contextObj = this;
        if (selectionIds.length == 0) {
            this.notificationService.ShowToaster("Select an Document to download", 2);
        }
        else {
            var filename;
            var Reference;
            var multiFilename = [];
            var ReferenceIds = [];
            var multiDocumentDownload = [];
            var newFileName = "";
            if (contextObj.inputItems.selectedIds.length > 1) {
                for (var _i = 0, _a = contextObj.inputItems.rowData; _i < _a.length; _i++) {
                    var item = _a[_i];
                    //multiFilename.push(item["File Name"]);
                    //Reference = item.DocumentId
                    //ReferenceIds.push(Reference)
                    multiDocumentDownload.push({
                        ReferenceId: item["DocumentId"],
                        FileName: item["File Name"],
                        RevisionNo: item["Revision No."]
                    });
                }
                this.documentService.multiDocumentDownloadFile(JSON.stringify(multiDocumentDownload)).subscribe(function (resultData) {
                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");
                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');
                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                        contextObj.imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.strFileName = filename;
                        try {
                            var blob = new Blob([data], { type: contentType });
                            /*var blob = new File([data], contextObj.strFileName, { type: contentType }); */
                            var url = window.URL.createObjectURL(blob);
                            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                            if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                                window.navigator.msSaveOrOpenBlob(blob, contextObj.strFileName);
                            }
                            else if (isSafari) {
                                /* if (window["saveAs"] != undefined) {
                                     window["saveAs"](blob, filename);
                                 }
     
     
                                 setTimeout(function () {
                                     window["saveAs"](new Blob([data], { type: "application/octet-stream" }), contextObj.strFileName);
                                 }, 1);
     
                                 var file = new File([data], 'filename', { type: "application/octet-stream" });
                                 var url = window.URL.createObjectURL(file);
                                 var link = document.createElement('a');
                                 link.href = url;
                                 link.click();*/
                                contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                            }
                            else {
                                linkElement.setAttribute('href', url);
                                linkElement.setAttribute("download", "Download.zip");
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
            else {
                filename = contextObj.inputItems.rowData["File Name"];
                var RevisionNo = contextObj.inputItems.rowData["Revision No."];
                var ReferenceId = selectionIds;
                this.documentService.DocumentDownloadFile(ReferenceId, filename, RevisionNo).subscribe(function (resultData) {
                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");
                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');
                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                        contextObj.imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.strFileName = filename;
                        try {
                            contextObj.documentService.getDocumentFormtFileName(ReferenceId, filename, RevisionNo).subscribe(function (resultData1) {
                                if (resultData1.Message != null)
                                    newFileName = resultData1.Message;
                                else
                                    newFileName = filename;
                                var blob = new Blob([data], { type: contentType });
                                /*var blob = new File([data], contextObj.strFileName, { type: contentType }); */
                                var url = window.URL.createObjectURL(blob);
                                var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                                    if (resultData1.Message != null) {
                                        if (resultData1.StatusId == 100) {
                                            contextObj.notificationService.ShowToaster("Maximum number of charaters for file name exceeds. File name will be truncated.", 2);
                                        }
                                    }
                                    window.navigator.msSaveOrOpenBlob(blob, newFileName);
                                }
                                else if (isSafari) {
                                    /* if (window["saveAs"] != undefined) {
                                         window["saveAs"](blob, filename);
                                     }
         
         
                                     setTimeout(function () {
                                         window["saveAs"](new Blob([data], { type: "application/octet-stream" }), contextObj.strFileName);
                                     }, 1);
         
                                     var file = new File([data], 'filename', { type: "application/octet-stream" });
                                     var url = window.URL.createObjectURL(file);
                                     var link = document.createElement('a');
                                     link.href = url;
                                     link.click();*/
                                    contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                                }
                                else {
                                    if (resultData1.Message != null) {
                                        if (resultData1.StatusId == 100) {
                                            contextObj.notificationService.ShowToaster("Maximum number of charaters for file name exceeds. File name will be truncated.", 2);
                                        }
                                    }
                                    linkElement.setAttribute('href', url);
                                    linkElement.setAttribute("download", newFileName);
                                    var clickEvent = new MouseEvent("click", {
                                        "view": window,
                                        "bubbles": true,
                                        "cancelable": false
                                    });
                                    linkElement.dispatchEvent(clickEvent);
                                }
                            });
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                });
            }
        }
    };
    RevisionList.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    RevisionList.prototype.onSort = function (objGrid) {
        var contextObj = this;
        contextObj.inputItems.sortCol = objGrid.sortCol;
        contextObj.inputItems.sortDir = objGrid.sortDir;
        contextObj.documentRevisionList(contextObj.documentId);
    };
    RevisionList.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteRevision();
    };
    RevisionList.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    RevisionList.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    RevisionList = __decorate([
        core_1.Component({
            selector: 'ListRevisions',
            templateUrl: './app/Views/Documents/Documents/List-Revisions.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService, notify_service_1.NotificationService, administration_service_1.AdministrationService],
            inputs: ["documentId"]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService, General_1.GeneralFunctions, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], RevisionList);
    return RevisionList;
}());
exports.RevisionList = RevisionList;
//# sourceMappingURL=List-Revisions.js.map