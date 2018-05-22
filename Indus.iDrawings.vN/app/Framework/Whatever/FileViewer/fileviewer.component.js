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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var FileViewer = (function () {
    function FileViewer(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.objectClassId = 0;
        this.attachmentViewerClose = new core_1.EventEmitter();
        this.totalItems = 0;
        this.display = 'hidden';
        this.closeIconPath = "Content/Layout/data_attach.png";
        this.inputItems = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, allowAdd: false, allowEdit: false, sortDir: "ASC", selectioMode: 'single' };
        this.arrHighlightRowIds = [];
        this.attachmentIdList = [];
        this.viewGridChange = false;
        this.menuData = [
            {
                "id": 6,
                "title": "Attachments",
                "image": "Attachments",
                "path": "Attachments",
                "subMenu": null,
                "privilegeId": 424
            },];
        this.totalItem = 1;
        this.enableMenu = [];
        this.position = "top-right";
    }
    FileViewer.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getAttachmentField().subscribe(function (resultData) {
            /* console.log("resultData",resultData["Data"]) */
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].ReportFieldId == 53) {
                    resultData["Data"][i].IsHiddenLabel = false;
                    resultData["Data"][i].ReadOnlyMode = false;
                    resultData["Data"][i].FieldValue = "";
                }
                else if (resultData["Data"][i].ReportFieldId == 54)
                    resultData["Data"][i].IsEnabled = false;
                else if (resultData["Data"][i].ReportFieldId == 57)
                    resultData["Data"][i].IsEnabled = false;
                else if (resultData["Data"][i].ReportFieldId == 58)
                    resultData["Data"][i].IsEnabled = false;
            }
            contextObj.fields = resultData["Data"];
        });
    };
    FileViewer.prototype.onSubMenuChange = function (event) {
        if (this.viewGridChange == false)
            this.viewGridChange = true;
        else
            this.viewGridChange = false;
    };
    FileViewer.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes['baseEntityId'] && changes['baseEntityId']['currentValue']) {
            if (contextObj.attachmentCategoryId != null && contextObj.baseEntityId != null) {
                contextObj.administrationService.getSiteAttachmentData(contextObj.attachmentCategoryId.toString(), contextObj.baseEntityId.toString()).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0)
                        contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                    var selectedId;
                    var check = false;
                    for (var _i = 0, _a = contextObj.sourceData; _i < _a.length; _i++) {
                        var dataitem = _a[_i];
                        contextObj.attachmentIdList.push(dataitem['AttachmentId']);
                        if (check == false) {
                            var fileName = dataitem["File Name"];
                            var fileExtension = fileName.replace(/^.*\./, '');
                            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "bmp") {
                                selectedId = dataitem["AttachmentId"];
                                check = true;
                            }
                        }
                    }
                    if (selectedId != undefined) {
                        contextObj.inputItems.selectioMode = "multiple";
                        contextObj.attachmentPreview(selectedId);
                        contextObj.arrHighlightRowIds = [];
                        contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(selectedId);
                        contextObj.currentSelectedId = selectedId;
                    }
                });
            }
        }
        if (changes['isVisible'] && changes['isVisible']['currentValue']) {
            if (this.isVisible == true)
                this.display = 'visible';
            else {
                this.display = 'hidden';
            }
        }
    };
    FileViewer.prototype.onClose = function () {
        this.isVisible = false;
        this.display = 'hidden';
        this.attachmentViewerClose.emit({});
    };
    FileViewer.prototype.onDataSelectionChange = function (event) {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.attachmentPreview(this.inputItems.selectedIds[0]);
            this.currentSelectedId = this.inputItems.selectedIds[0];
        }
    };
    FileViewer.prototype.attachmentPreview = function (selId) {
        var contextObj = this;
        var filename;
        var customerAttachmentCategoryId;
        contextObj.sourceData.find(function (item) {
            if (item["AttachmentId"] == selId) {
                filename = item["File Name"];
                customerAttachmentCategoryId = item["CustomerAttachmentCategoryId"];
                return true;
            }
            return false;
        });
        var fileExtension = filename.replace(/^.*\./, '');
        if (fileExtension == "jpg" || fileExtension == "jpeg") {
            this.administrationService.downloadAttachment(contextObj.attachmentCategoryId.toString(), selId, contextObj.baseEntityId.toString(), filename, contextObj.objectClassId.toString(), customerAttachmentCategoryId).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    contextObj.imgSource = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                }
            });
        }
        else if (fileExtension == "png") {
            this.administrationService.downloadAttachment(contextObj.attachmentCategoryId.toString(), selId, contextObj.baseEntityId.toString(), filename, contextObj.objectClassId.toString(), customerAttachmentCategoryId).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    contextObj.imgSource = "data:image/png;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                }
            });
        }
        else if (fileExtension == "bmp") {
            this.administrationService.downloadAttachment(contextObj.attachmentCategoryId.toString(), selId, contextObj.baseEntityId.toString(), filename, contextObj.objectClassId.toString(), customerAttachmentCategoryId).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    contextObj.imgSource = "data:image/bmp;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                }
            });
        }
        else {
        }
    };
    FileViewer.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    FileViewer.prototype.previousOnclick = function () {
        var currentId = this.currentSelectedId;
        this.arrHighlightRowIds = [];
        var index = this.attachmentIdList.findIndex(function (el) { return el === currentId; });
        var selectedId;
        if (index != -1) {
            if (index == 0) {
                selectedId = this.attachmentIdList[this.attachmentIdList.length - 1];
                this.attachmentPreview(selectedId);
                this.currentSelectedId = selectedId;
            }
            else {
                selectedId = this.attachmentIdList[index - 1];
                this.attachmentPreview(selectedId);
                this.currentSelectedId = selectedId;
            }
            this.arrHighlightRowIds = this.arrHighlightRowIds.concat(selectedId);
        }
    };
    FileViewer.prototype.nextOnclick = function () {
        var currentId = this.currentSelectedId;
        this.arrHighlightRowIds = [];
        var index = this.attachmentIdList.findIndex(function (el) { return el === currentId; });
        var selectedId;
        if (index != -1) {
            if (index == this.attachmentIdList.length - 1) {
                selectedId = this.attachmentIdList[0];
                this.attachmentPreview(selectedId);
                this.currentSelectedId = selectedId;
            }
            else {
                selectedId = this.attachmentIdList[index + 1];
                this.attachmentPreview(selectedId);
                this.currentSelectedId = selectedId;
            }
            this.arrHighlightRowIds = this.arrHighlightRowIds.concat(selectedId);
        }
    };
    FileViewer.prototype.closeSlideDialog = function () {
        this.viewGridChange = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileViewer.prototype, "attachmentCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileViewer.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileViewer.prototype, "baseEntityId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileViewer.prototype, "objectClassId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FileViewer.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileViewer.prototype, "attachmentViewerClose", void 0);
    FileViewer = __decorate([
        core_1.Component({
            selector: 'file-viewer',
            templateUrl: 'app/Framework/Views/FileViewer/fileviewer.component.html',
            styleUrls: ['app/Framework/Views/FileViewer/fileviewer.component.css'],
            directives: [grid_component_1.GridComponent, notify_component_1.Notification, submenu_component_1.SubMenu, slide_component_1.SlideComponent],
            providers: [notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], FileViewer);
    return FileViewer;
}());
exports.FileViewer = FileViewer;
//# sourceMappingURL=fileviewer.component.js.map