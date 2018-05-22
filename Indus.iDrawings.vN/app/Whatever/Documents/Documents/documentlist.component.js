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
var stringtextbox_component_1 = require('../../../Framework/Whatever/Search/stringtextbox.component');
var keywordtextbox_1 = require('../../../Framework/Whatever/Search/keywordtextbox');
var integertextbox_component_1 = require('../../../Framework/Whatever/Search/integertextbox.component');
var numerictextbox_component_1 = require('../../../Framework/Whatever/Search/numerictextbox.component');
var datetimecomponent_component_1 = require('../../../Framework/Whatever/Search/datetimecomponent.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
//import { DocumentSearchBox} from './DocumentSearch';
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var documentaddedit_component_1 = require('./documentaddedit.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var multiple_edit_component_1 = require('../../../framework/whatever/multipleedit/multiple-edit.component');
var common_service_1 = require('../../../models/common/common.service');
var List_Revisions_1 = require('./List-Revisions');
var sendforapproval_component_1 = require('../../common/review/sendforapproval.component');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var DocumentListComponent = (function () {
    function DocumentListComponent(documentService, notificationService, generFun, commonService, administrationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.commonService = commonService;
        this.administrationService = administrationService;
        this.emitMenu = new core_1.EventEmitter();
        this.pagePath = "Documents / Documents";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, showContextMenu: true };
        this.blnIsGrid = true;
        this.imgData = "";
        this.showSlide = false;
        this.position = "top-right";
        this.imgData1 = "";
        this.strFileName = "";
        this.documentAddEditformId = 439;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.disable = false;
        this.filter = "";
        this.advanceValue = "[]";
        this.isDocCheckoutSubscribed = false;
        this.isDocPublishSubscribed = false;
        this.hideSerach = false;
        this.menumock = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 1289
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 1290
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 1291
            },
            {
                "id": 4,
                "title": "Revise",
                "image": "Revise",
                "path": "Revise",
                "submenu": null,
                "privilegeId": 1290
            },
            {
                "id": 5,
                "title": "Replace",
                "image": "Replace",
                "path": "Replace",
                "submenu": null,
                "privilegeId": 1290
            },
            {
                "id": 6,
                "title": "Revisions",
                "image": "Revisions",
                "path": "Revisions",
                "submenu": null,
            },
            {
                "id": 7,
                "title": "Display Settings",
                "image": "DisplaySettings",
                "path": "DisplaySettings",
                "subMenu": null
            },
            {
                "id": 8,
                "title": "Use shift/ctrl key to select multiple documents for download",
                "image": "Download",
                "path": "Download",
                "submenu": null,
            },
            {
                "id": 9,
                "title": "Check In",
                "image": "Check In",
                "path": "Check In",
                "submenu": null,
                "privilegeId": 1290
            },
            {
                "id": 10,
                "title": "Check Out",
                "image": "Check Out",
                "path": "Check Out",
                "submenu": null,
                "privilegeId": 1290
            },
        ];
        this.enableMenu = [];
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 263, contextObj.administrationService, contextObj.menumock.length);
        documentService.getDocumentListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
    }
    DocumentListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.dataLoad(true);
        contextObj.advanceSearch();
        this.LoadAdvanceSearchSaveAs();
        if (contextObj.totalItems == 0)
            contextObj.enableMenu = [1];
        contextObj.documentService.getDocumentKeywordField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
        contextObj.administrationService.getCustomerSubscribedFeatures("176").subscribe(function (result) {
            contextObj.isDocCheckoutSubscribed = false;
            var customerFeatureobj = result["Data"];
            if (customerFeatureobj) {
                contextObj.isDocCheckoutSubscribed = customerFeatureobj[0]["IsSubscribed"];
            }
            else {
                contextObj.isDocCheckoutSubscribed = false;
            }
            if (contextObj.isDocCheckoutSubscribed == false) {
                contextObj.menuData = contextObj.menuData.filter(function (ite) { return ite.id <= 8; });
            }
        });
    };
    DocumentListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        contextObj.documentService.getDocumentAdvanceSearchField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                    return item.FieldId != 2543; // to avoid Id field in Configure
                });
                contextObj.advancelookup = fldData;
                contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
            }
        });
    };
    DocumentListComponent.prototype.LoadAdvanceSearchSaveAs = function () {
        var contextObj = this;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: 32,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: 1,
        });
        contextObj.documentService.LoadAdvanceSearchSaveAs(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            debugger;
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.LoadSearchAdvanceSearch = resultData["Data"][0];
            }
        });
    };
    DocumentListComponent.prototype.dataLoad = function (onLoad) {
        debugger;
        var contextObj = this;
        if (contextObj.qResult) {
            contextObj.isNotification = false;
            if (onLoad == 1) {
                contextObj.itemsSource = JSON.parse(contextObj.qResult.FieldBinderData);
                contextObj.itemsPerPage = contextObj.qResult.RowsPerPage;
                contextObj.totalItems = contextObj.qResult.DataCount;
            }
            else {
                contextObj.commonService.QueryBuilderSeachResult(516, contextObj.buildarray, contextObj.QueryCategryId, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (result) {
                    contextObj.itemsPerPage = result.RowsPerPage;
                    contextObj.totalItems = result.DataCount;
                    if (contextObj.totalItems > 0)
                        contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                    else {
                        contextObj.notificationService.ShowToaster("No Documents exist", 2);
                        contextObj.enableMenu = [1];
                    }
                });
            }
        }
        else if (contextObj.SearchId) {
            contextObj.hideSerach = true;
            var reportfieldIdArray = new Array();
            reportfieldIdArray.push({
                ReportFieldId: 2143,
                Value: contextObj.SearchId,
            });
            contextObj.documentService.DocumentsForDashboardSearch(JSON.stringify(reportfieldIdArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                debugger;
                contextObj.totalItems = resultData["DataCount"];
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                    contextObj.itemsPerPage = resultData["RowsPerPage"];
                }
                else
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
            });
        }
        else {
            this.documentService.getDocumentListData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0)
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                else {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    contextObj.enableMenu = [1];
                }
            });
        }
    };
    DocumentListComponent.prototype.onSubMenuChange = function (event) {
        this.splitviewInput.secondaryArea = 40;
        switch (event.value) {
            case 1:
                this.pageTitle = "New Document";
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit Document";
                this.editClick();
                break;
            case 3:
                this.action = "delete";
                this.deleteClick();
                break;
            case 4:
                this.action = "revise";
                this.pageTitle = "Revise Document";
                this.reviseReplaceClick();
                break;
            case 5:
                this.action = "replace";
                this.pageTitle = "Replace Document";
                this.reviseReplaceClick();
                break;
            case 6:
                //this.action = "Revisions";
                this.pageTitle = "List Revisions";
                this.revisionsClick();
                break;
            case 7:
                this.pageTitle = "Display Settings";
                this.action = "displaysettings";
                this.splitviewInput.showSecondaryView = true;
                break;
            case 8:
                this.downloadDocument(this.inputItems.selectedIds[0]);
                break;
            case 9:
                this.action = "CheckIn";
                this.checkin();
                break;
            case 10:
                this.action = "checkout";
                this.pageTitle = "Request for Check Out";
                this.checkout();
                break;
        }
    };
    DocumentListComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Upload";
        var contextObj = this;
        this.documentService.loadDocumentAddEditFields(0, 1).subscribe(function (result) {
            contextObj.fieldDetailsAddEdit = (result["Data"]);
            contextObj.checkandgetNextDocumentNumber(contextObj);
            var fileuploadfield = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 960; });
            fileuploadfield.FieldLabel = "File (Provide full path)";
            //for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
            //    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2415)
            //    { // File upload
            //        contextObj.fieldDetailsAddEdit[i].FieldLabel = "File (Provide full path)";
            //    }
            //    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414) { // File Format 
            //        contextObj.fieldDetailsAddEdit[i].IsVisible = false;
            //        contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
            //    }
            //}
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    DocumentListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            contextObj.pageTitle = "Multiple Update";
            this.action = "multipleedit";
            this.onMultipleEditClick();
        }
        else {
            var temp = this.inputItems.rowData["Document Status"];
            if (temp.toLowerCase() == "active" || temp.toLowerCase() == "blocked") {
                this.documentService.loadDocumentAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                    for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) {
                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                            contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                            if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1") {
                                contextObj.fieldDetailsAddEdit[i].FieldValue = "70";
                            }
                            else {
                                contextObj.fieldDetailsAddEdit[i].FieldValue = "71";
                            }
                        }
                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414) {
                            contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                        }
                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                            contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                        }
                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) {
                            contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                        }
                    }
                    //var symbolField = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 653 });
                    //symbolField["FieldLabel"] = "Symbol";
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Document is not in Active status, cannot be edited", 2);
            }
        }
    };
    DocumentListComponent.prototype.onMultipleEditClick = function () {
        var contextObj = this;
        var isEdit = true;
        this.inputItems.rowData.find(function (item) {
            var test = item["Document Status"];
            if (test != "Active" && test != "Blocked") {
                isEdit = false;
            }
        });
        if (isEdit) {
            contextObj.commonService.getFieldsForMultipleEdit(this.documentAddEditformId).subscribe(function (resultData) {
                contextObj.multipleEditFieldDetails = JSON.parse(resultData);
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Some Documents are not in Active status, cannot be edited", 2);
        }
    };
    DocumentListComponent.prototype.onMultipleEditUpdate = function (event) {
        this.message = "Are you sure you want to update the selected records with the new value?";
        this.showSlide = !this.showSlide;
        this.multipleupdateevent = event;
    };
    DocumentListComponent.prototype.reviseReplaceClick = function () {
        this.btnName = "Upload";
        var contextObj = this;
        var selectedIds;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            selectedIds = contextObj.inputItems.selectedIds[0];
            if (contextObj.isDocCheckoutSubscribed == true) {
                switch (contextObj.inputItems.rowData["StatusId"]) {
                    case 32:
                        contextObj.documentService.getCheckOutUser(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                            if (resultData.StatusId == 1) {
                                contextObj.documentService.loadDocumentAddEditFields(selectedIds, 2).subscribe(function (resultData1) {
                                    contextObj.fieldDetailsAddEdit = resultData1["Data"];
                                    for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                                        if (contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 2 || contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 8) {
                                            contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                                        }
                                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414 || contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                                            contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                                        }
                                        else {
                                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                        }
                                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) {
                                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                            if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                                                contextObj.fieldDetailsAddEdit[i].FieldValue = "70";
                                        }
                                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) {
                                            contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
                                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                        }
                                    }
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                });
                            }
                            else {
                                contextObj.notificationService.ShowToaster("The Document '" + contextObj.inputItems.rowData["File Name"] + "' is locked for Check Out by " + resultData.Data, 2);
                            }
                        });
                        break;
                    case 33:
                        this.notificationService.ShowToaster("Selected document is already requested for Check Out", 2);
                        break;
                    default:
                        if (this.action == "revise") {
                            this.notificationService.ShowToaster("Document should be Checked Out before Revise", 2);
                        }
                        else {
                            this.notificationService.ShowToaster("Document should be Checked Out before Replace", 2);
                        }
                        break;
                }
            }
            else {
                switch (this.inputItems.rowData["StatusId"]) {
                    case 1:
                        contextObj.documentService.loadDocumentAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                            contextObj.fieldDetailsAddEdit = resultData["Data"];
                            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                                if (contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 2 || contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 8) {
                                    contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                                }
                                if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414 || contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                                    contextObj.fieldDetailsAddEdit[i].FieldValue = "";
                                }
                                else {
                                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                }
                                if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) {
                                    contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                    if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                                        contextObj.fieldDetailsAddEdit[i].FieldValue = "70";
                                }
                                else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) {
                                    contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
                                    contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                }
                            }
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                        break;
                    default:
                        if (this.action == "revise") {
                            this.notificationService.ShowToaster("Document is not in Active status, cannot be revised", 2);
                        }
                        else {
                            this.notificationService.ShowToaster("Document is not in Active status, cannot be replaced", 2);
                        }
                        break;
                }
            }
        }
    };
    DocumentListComponent.prototype.getUpdatedDisplaySettings = function (event) {
        debugger;
        if (event["dispSettingObject"] != undefined) {
            var contextObj = this;
            contextObj.DispalysettingsfieldObject = contextObj.fieldObject;
            contextObj.DispalysettingsfieldObject.find(function (item) {
                if (item["ReportFieldId"] == 961) {
                    item["FieldLabel"] = "File Size";
                    return true;
                }
            });
            contextObj.fieldObject = this.generFun.updateDisplaySettingsinUI(contextObj.DispalysettingsfieldObject, event["dispSettingObject"]);
            contextObj.fieldObject.find(function (item) {
                if (item["ReportFieldId"] == 961) {
                    item["FieldLabel"] = "File Size (KB)";
                    return true;
                }
            });
            if (event["IsDragged"] == true) {
                contextObj.documentService.getDocumentListFields().subscribe(function (result) {
                    contextObj.fieldObject = result["Data"];
                });
            }
            setTimeout(function () {
                contextObj.splitviewInput.showSecondaryView = false;
            }, 80);
        }
    };
    DocumentListComponent.prototype.downloadDocument = function (selectionIds) {
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
                        RevisionNo: item["Revisions"]
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
                                window.navigator.msSaveOrOpenBlob(blob, "Documents.zip");
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
                                linkElement.setAttribute("download", "Documents.zip");
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
                var RevisionNo = contextObj.inputItems.rowData["Revisions"];
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
    DocumentListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document to delete", 2);
        }
        else {
            this.message = "Are you sure you want to delete the selected Document?";
            this.showSlide = !this.showSlide;
        }
    };
    DocumentListComponent.prototype.deleteDocument = function () {
        var contextObj = this;
        var arrayList = new Array();
        var RevisioNo = contextObj.inputItems.rowData["Revisions"];
        var filename = contextObj.inputItems.rowData["File Name"];
        arrayList.push({
            ReportFieldId: 959,
            Value: RevisioNo
        });
        arrayList.push({
            ReportFieldId: 960,
            Value: filename
        });
        contextObj.documentService.deleteDocument(JSON.stringify(arrayList), this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
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
    DocumentListComponent.prototype.revisionsClick = function () {
        var contextObj = this;
        contextObj.action = "";
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            return;
        }
        else {
            contextObj.documentService.CheckRevisionExists(contextObj.inputItems.rowData["DocumentId"]).subscribe(function (resultData) {
                debugger;
                if (resultData == true) {
                    contextObj.action = "Revisions";
                    contextObj.pageTitle = "Revisions";
                    contextObj.DocumentId = contextObj.inputItems.rowData["DocumentId"];
                    contextObj.selectedId = contextObj.inputItems.selectedIds[0];
                    contextObj.splitviewInput.secondaryArea = 79;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Revisions exist", 2);
                }
            });
        }
    };
    DocumentListComponent.prototype.okClick = function (event) {
        this.showSlide = !this.showSlide;
        if (this.action == "delete")
            this.deleteDocument();
        else if (this.action == "CheckIn")
            this.checkInDocument();
        else if (this.action == "multipleedit") {
            var contextObj = this;
            for (var _i = 0, _a = this.inputItems.selectedIds; _i < _a.length; _i++) {
                var item = _a[_i];
                this.multipleupdateevent.ReportFieldIdValuesArray.push({ ReportFieldId: 964, Value: item });
            }
            this.documentService.updateMultipleDocuments(JSON.stringify(this.multipleupdateevent.ReportFieldIdValuesArray), this.multipleupdateevent.ReportFieldId, this.multipleupdateevent.NewValue).subscribe(function (resultData) {
                switch (resultData.StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Document details updated", 3);
                        break;
                    default:
                        break;
                }
            });
        }
    };
    DocumentListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DocumentListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DocumentListComponent.prototype.onSplitViewClose = function (event) {
        if (this.action == "multipleedit") {
            this.dataLoad(false);
        }
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    };
    DocumentListComponent.prototype.checkout = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var context = this;
            switch (this.inputItems.rowData["StatusId"]) {
                case 1:
                    this.selectedId = this.inputItems.selectedIds[0];
                    this.splitviewInput.showSecondaryView = true;
                    break;
                case 32:
                    this.documentService.getCheckOutUser(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (resultData.StatusId == 1) {
                            context.notificationService.ShowToaster("Selected Document is already Checked Out", 2);
                        }
                        else {
                            context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' is locked for Check Out by " + resultData.Data, 2);
                        }
                    });
                    break;
                case 33:
                    this.notificationService.ShowToaster("Selected Document is already requested for Check Out", 2);
                    break;
                case 35:
                    this.documentService.getCheckOutRequestedUsers(this.inputItems.rowData).subscribe(function (resultData) {
                        switch (resultData.StatusId) {
                            case -2:
                                context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case -1:
                                context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' Check Out is requested by " + resultData.Data, 2);
                                break;
                            case 0:
                                context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 2);
                                break;
                            case 1:
                                context.refreshgrid = [];
                                context.notificationService.ShowToaster("Document Checked Out. You can download your document for making changes now", 3);
                                var retData = { returnData: resultData.Data };
                                var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "edit", retData, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                                context.refreshgrid = context.refreshgrid.concat([true]);
                                break;
                        }
                    });
                    break;
                default:
                    this.notificationService.ShowToaster("Document is not in Active status, cannot be checked out", 2);
                    break;
            }
        }
    };
    DocumentListComponent.prototype.checkin = function () {
        var context = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        else if (context.inputItems.selectedIds.length > 1) {
            context.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            switch (context.inputItems.rowData["StatusId"]) {
                case 32:
                    context.documentService.getCheckOutUser(context.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (resultData.StatusId == 1) {
                            context.message = "Are you sure you want to Check In the selected document ?";
                            context.showSlide = !context.showSlide;
                        }
                        else {
                            context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' is locked for Check Out by " + resultData.Data, 2);
                        }
                    });
                    break;
                default:
                    context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' is not Checked Out. Only Checked Out documents can be Checked In ", 2);
                    break;
            }
        }
    };
    DocumentListComponent.prototype.checkInDocument = function () {
        var contextobj = this;
        var checkInDocument = [];
        contextobj.refreshgrid = [];
        checkInDocument.push({
            ReferenceId: contextobj.inputItems.rowData["DocumentId"],
            FileName: contextobj.inputItems.rowData["File Name"],
            RevisionNo: contextobj.inputItems.rowData["Revisions"],
        });
        contextobj.documentService.CheckInDocument(JSON.stringify(checkInDocument)).subscribe(function (resultData1) {
            if (resultData1.StatusId == 1) {
                contextobj.notificationService.ShowToaster("Document Checked In", 3);
                var retData = { returnData: resultData1.Data };
                var retUpdatedSrc = contextobj.generFun.updateDataSource(contextobj.itemsSource, "edit", retData, contextobj.inputItems.selectedIds, contextobj.inputItems.dataKey, contextobj.totalItems);
                contextobj.refreshgrid = contextobj.refreshgrid.concat([true]);
            }
            else {
                contextobj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    DocumentListComponent.prototype.getCustomerSubscribedFeatures = function (contextObj) {
        contextObj.administrationService.getCustomerSubscribedFeatures("233").subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                var customerFeatureobj = result["Data"];
                contextObj.isDocPublishSubscribed = customerFeatureobj[0]["IsSubscribed"];
                if (contextObj.isDocPublishSubscribed == true) {
                    contextObj.selectedId = contextObj.inputItems.selectedIds[0];
                    contextObj.action = "sendforapproval";
                }
            }
        });
    };
    DocumentListComponent.prototype.checkandgetNextDocumentNumber = function (contextObj) {
        contextObj.administrationService.getCustomerSubscribedFeatures("58").subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                var customerFeatureobj = result["Data"];
                if (customerFeatureobj[0]["IsSubscribed"] == true) {
                    contextObj.documentService.getNextDocumentNumber().subscribe(function (result) {
                        var documentnofield = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 967; });
                        documentnofield.FieldValue = result;
                    });
                }
            }
        });
    };
    DocumentListComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                this.selectedId = this.inputItems.selectedIds[0];
                this.getCustomerSubscribedFeatures(this);
            }
            else if (this.action == "edit" || this.action == "revise" || this.action == "replace") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            else if (this.action == "checkout") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    DocumentListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        if (this.IsKeyWordSearch == 1) {
            contextObj.documentService.DocumentKeywordSearch(this.filter, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                }
                else {
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                //contextObj.emitMenu.emit({ TotalItems: contextObj.advanceValue });
            });
        }
        else if (this.IsAdvanceSearch == 1) {
            this.documentService.DocumentAdvanceSeachResult(this.advanceValue, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"].DataCount);
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                }
                else {
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            });
        }
        else
            this.dataLoad(false);
    };
    DocumentListComponent.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    DocumentListComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        var contextObj = this;
        if (this.IsKeyWordSearch == 1) {
            contextObj.documentService.DocumentKeywordSearch(this.filter, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                }
                else {
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                //contextObj.emitMenu.emit({ TotalItems: contextObj.advanceValue });
            });
        }
        else if (this.IsAdvanceSearch == 1) {
            this.documentService.DocumentAdvanceSeachResult(this.advanceValue, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"].DataCount);
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                }
                else {
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            });
        }
        else
            this.dataLoad(false);
    };
    ;
    DocumentListComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        contextObj.documentService.DocumentKeywordSearch(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
            }
            else {
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            //contextObj.emitMenu.emit({ TotalItems: contextObj.advanceValue });
        });
    };
    DocumentListComponent.prototype.Submit = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.documentService.DocumentAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            debugger;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"].DataCount);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
            }
            else {
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    };
    DocumentListComponent.prototype.Clear = function (event) {
        var contextObj = this;
        this.documentService.getDocumentAdvanceSearchField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                    return item.FieldId != 2543; // to avoid Id field in Configure
                });
                contextObj.advancelookup = fldData;
            }
        });
    };
    DocumentListComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    DocumentListComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    DocumentListComponent.prototype.onContextMenuOnClick = function (event) {
        var tempID = "";
        if (event != undefined && event != null) {
            if (this.qResult != undefined) {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = tempID;
                this.analyticsInput.moduleId = 4;
                this.analyticsInput.pageTarget = 2;
                this.analyticsInput.IsAdvanceSearch = 0;
                this.analyticsInput.IsKeywordSearch = 0;
                this.analyticsInput.KeywordFilterValue = "";
                this.analyticsInput.AdvanceFilterValue = "[]";
                this.analyticsInput.FormId = 516;
                this.analyticsInput.ParentFormId = 0;
                this.analyticsInput.QueryCategryId = Number(this.QueryCategryId);
                this.analyticsInput.buildarray = this.buildarray;
                this.showAnalytics = true;
            }
            else {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = tempID;
                this.analyticsInput.moduleId = 4;
                this.analyticsInput.pageTarget = 1;
                this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
                this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
                this.analyticsInput.KeywordFilterValue = this.filter;
                this.analyticsInput.AdvanceFilterValue = this.advanceValue;
                this.analyticsInput.FormId = 427;
                this.analyticsInput.ParentFormId = 487;
                this.showAnalytics = true;
            }
        }
    };
    DocumentListComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DocumentListComponent.prototype, "qResult", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DocumentListComponent.prototype, "buildarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocumentListComponent.prototype, "QueryCategryId", void 0);
    __decorate([
        //Querybuilder
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentListComponent.prototype, "emitMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DocumentListComponent.prototype, "SearchId", void 0);
    DocumentListComponent = __decorate([
        core_1.Component({
            selector: 'document-list',
            templateUrl: './app/Views/Documents/Documents/documentlist.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, documentaddedit_component_1.DocumentAddEditComponent, displaysettings_component_1.DisplaySettingsComponent, multiple_edit_component_1.MultipleEdit, analytics_component_1.Analytics,
                List_Revisions_1.RevisionList, sendforapproval_component_1.SendForApprovalComponent, search_component_1.searchBox, stringtextbox_component_1.StringTextBoxSearchComponent, keywordtextbox_1.KeywordTextboxComponent, integertextbox_component_1.IntegerTextBoxsearchComponent, numerictextbox_component_1.NumericTextBoxComponent, datetimecomponent_component_1.DateTimeSearchComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, documents_service_1.DocumentService, common_service_1.CommonService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions, common_service_1.CommonService, administration_service_1.AdministrationService])
    ], DocumentListComponent);
    return DocumentListComponent;
}());
exports.DocumentListComponent = DocumentListComponent;
//# sourceMappingURL=documentlist.component.js.map