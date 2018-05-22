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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var ReviewDocumentListComponent = (function () {
    function ReviewDocumentListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.documentSubmit = new core_1.EventEmitter();
        this.documentDelete = new core_1.EventEmitter();
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.inputItems = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, sortCol: "[Uploaded on]", sortDir: "DESC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
        this.types = true;
        this.cardButtonPrivilege = [false, false];
        this.pageTitle = "Attach Document";
        //Form id : 237-- page id 721
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (237))
        this.menuData = [];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ReviewDocumentListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        contextObj.setMenuData();
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 721, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getReviewDocumentListFields().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                contextObj.fieldObject = (result["Data"]);
                if (contextObj.workrequestId > 0) {
                    contextObj.dataLoad(1);
                }
                else {
                    // contextObj.inputItems.allowSort = false;
                    if (contextObj.itemsSource || contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    }
                }
                contextObj.enableMenu = contextObj.itemsSource.length == 0 ? [1] : [1, 2];
            }
        });
    };
    ReviewDocumentListComponent.prototype.setMenuData = function () {
        if (this.entityCategoryId == 1 && this.workrequestId != 0) {
            this.menuData = [
                {
                    "id": 1,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "subMenu": null,
                    "privilegeId": 3454
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "subMenu": null,
                    "privilegeId": 3454
                },
                {
                    "id": 4,
                    "title": "Download",
                    "image": "Download",
                    "path": "Download",
                    "subMenu": null,
                    "privilegeId": 3454
                }];
        }
        else if (this.entityCategoryId == 1 && this.workrequestId == 0) {
            this.menuData = [
                {
                    "id": 1,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "subMenu": null,
                    "privilegeId": 3454
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "subMenu": null,
                    "privilegeId": 3454
                }];
        }
        else {
            this.menuData = [
                {
                    "id": 4,
                    "title": "Download",
                    "image": "Download",
                    "path": "Download",
                    "subMenu": null,
                    "privilegeId": 3454
                }];
        }
    };
    ReviewDocumentListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrderService.getReviewDocumentdata(contextObj.workrequestId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            JSON.parse(JSON.stringify(contextObj.fieldObject));
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = contextObj.entityCategoryId == 1 ? [1, 2, 4] : [4];
            }
            else {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = contextObj.entityCategoryId == 1 ? [1] : [];
            }
            contextObj.itemSourceUpdate.emit(contextObj.itemsSource);
        });
    };
    ReviewDocumentListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                break;
            case 4:
                this.onDownLoadClick();
                break;
        }
    };
    ReviewDocumentListComponent.prototype.onSort = function (event) {
        if (this.workrequestId > 0) {
            this.dataLoad(0);
            this.inputItems.isClientSort = false;
        }
        else
            this.inputItems.isClientSort = true;
    };
    ReviewDocumentListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ReviewDocumentListComponent.prototype.onDocumentSubmit = function (event) {
        var contextObj = this;
        var fieldObjectArray = JSON.parse(event.fieldobject);
        var fileDataArray = JSON.parse(event.filedata);
        if (contextObj.itemsSource.length > 0) {
            var fileData = contextObj.itemsSource.find(function (item) {
                return item["File Name"] === fileDataArray.FileName;
            });
            if (fileData != null) {
                contextObj.notificationService.ShowToaster("File already exists", 5);
                return;
            }
        }
        var description = fieldObjectArray.find(function (item) {
            return item.ReportFieldId === 56;
        });
        var attachmentCategory = fieldObjectArray.find(function (item) {
            return item.ReportFieldId === 89;
        });
        var tempArray = [];
        tempArray.push((_a = {
                AttachmentId: contextObj.itemsSource.length == 0 ? -1 : (-1 - contextObj.itemsSource.length)
            },
            _a['File Name'] = fileDataArray.FileName,
            _a['File Size (KB)'] = fileDataArray.FileSize,
            _a.Description = description.Value,
            _a['Uploaded on'] = contextObj.getNewDate(),
            _a['Uploaded by'] = contextObj.userDetails.UserName,
            _a.AttachmentCategoryId = attachmentCategory.Value,
            _a.WorkRequestId = 0,
            _a
        ));
        var submitArray = [];
        if (contextObj.workrequestId > 0) {
            submitArray.push({
                ReportFieldId: 1350,
                Value: contextObj.workrequestId
            });
        }
        submitArray.push({
            ReportFieldId: 52,
            Value: 11
        }, {
            ReportFieldId: 53,
            Value: fileDataArray.FileName
        }, {
            ReportFieldId: 54,
            Value: fileDataArray.FileSize
        }, {
            ReportFieldId: 55,
            Value: attachmentCategory.Value
        }, {
            ReportFieldId: 56,
            Value: description.Value
        }, {
            ReportFieldId: 443,
            Value: contextObj.userDetails["UserId"]
        });
        var documentdata = { DocumentId: 0, FileDataInput: '', WFReportFieldIdValues: [] };
        documentdata.DocumentId = tempArray[0]["AttachmentId"];
        documentdata.FileDataInput = fileDataArray;
        documentdata.WFReportFieldIdValues = submitArray;
        var reviewDocumentInput = { WFEntityDocumentInput: { FormId: 240, WFEntityId: 0, ListDocumentReportFieldIdValues: [documentdata] } };
        contextObj.workOrderService.checkIsValidDocument(JSON.stringify(reviewDocumentInput)).subscribe(function (isValid) {
            console.log(isValid);
            if (isValid["Data"] == 1) {
                contextObj.notificationService.ShowToaster("Select a valid file", 5);
            }
            else {
                if (contextObj.workrequestId == 0) {
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    updatedData.push(tempArray[0]);
                    contextObj.itemsSource = updatedData;
                    contextObj.enableMenu = [1, 2];
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                contextObj.documentSubmit.emit({
                    fieldObject: submitArray,
                    fileData: fileDataArray,
                    Id: tempArray[0]["AttachmentId"],
                    itemSource: contextObj.itemsSource
                });
            }
        });
        var _a;
    };
    ReviewDocumentListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Upload";
        contextObj.workOrderService.loadReviewDocumentsAddEdit().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ReviewDocumentListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Attachment", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    ReviewDocumentListComponent.prototype.onDownLoadClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an attachment to download", 2);
        }
        else {
            var selectedItem = contextObj.itemsSource.find(function (item) { return item["AttachmentId"] === contextObj.inputItems.selectedIds[0]; });
            this.workOrderService.downloadReviewDocumentData(contextObj.getDocumentDataToDownLoad(selectedItem)).subscribe(function (resultData) {
                console.log(resultData);
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if (/Edge/.test(navigator.userAgent)) {
                            window.navigator.msSaveOrOpenBlob(blob, selectedItem["File Name"]);
                        }
                        else if (isSafari) {
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", selectedItem["File Name"]);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    }
                    catch (ex) {
                    }
                }
            });
        }
    };
    ReviewDocumentListComponent.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    ReviewDocumentListComponent.prototype.getDocumentDataToDownLoad = function (selectedItem) {
        var documentData = [{
                DocumentId: selectedItem["AttachmentId"],
                WFReportFieldIdValues: [{ ReportFieldId: 1350, Value: selectedItem["AttachmentId"] }],
                FileDataInput: {
                    FileName: selectedItem["File Name"],
                    FileSize: selectedItem["File Size (KB)"]
                }
            }];
        var returnData = { WFEntityDocumentInput: { FormId: 240, WFEntityId: this.workrequestId, ListDocumentReportFieldIdValues: documentData } };
        return JSON.stringify(returnData);
    };
    ReviewDocumentListComponent.prototype.deleteDocuments = function () {
        var contextObj = this;
        var itemToBeDeleted = contextObj.itemsSource.find(function (item) {
            return item["AttachmentId"] === contextObj.inputItems.rowData["AttachmentId"];
        });
        debugger;
        var index = contextObj.itemsSource.indexOf(itemToBeDeleted);
        if (index > -1) {
            contextObj.documentDelete.emit({
                itemToBeDeleted: itemToBeDeleted,
                itemSource: contextObj.itemsSource,
                fileData: { FileName: itemToBeDeleted["File Name"] }
            });
            if (contextObj.inputItems.rowData["AttachmentId"] < 0) {
                contextObj.itemsSource.splice(index, 1);
                var updatedData = new Array(); /*To notify the watcher about the change*/
                updatedData = updatedData.concat(contextObj.itemsSource);
                contextObj.itemsSource = undefined;
                contextObj.itemsSource = updatedData;
                contextObj.enableMenu = contextObj.itemsSource.length == 0 ? [1] : [1, 2];
            }
            if (contextObj.itemsSource.length == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.itemsSource = [];
            }
        }
    };
    ReviewDocumentListComponent.prototype.getNewDate = function () {
        var date = new Date();
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        return dd + " " + mon + " " + yy;
    };
    //slide events/////
    ReviewDocumentListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteDocuments();
    };
    ReviewDocumentListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ReviewDocumentListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewDocumentListComponent.prototype, "documentSubmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewDocumentListComponent.prototype, "documentDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewDocumentListComponent.prototype, "itemSourceUpdate", void 0);
    ReviewDocumentListComponent = __decorate([
        core_1.Component({
            selector: 'reviewDocument-list',
            templateUrl: './app/Views/WorkOrder/Review/reviewDocument-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['workrequestId', 'userDetails', 'itemsSource', 'entityCategoryId', 'enableMenu'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewDocumentListComponent);
    return ReviewDocumentListComponent;
}());
exports.ReviewDocumentListComponent = ReviewDocumentListComponent;
//# sourceMappingURL=reviewDocument-list.component.js.map