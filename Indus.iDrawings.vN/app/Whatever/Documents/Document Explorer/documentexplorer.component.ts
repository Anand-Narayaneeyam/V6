import { Component, OnInit, Output, SimpleChange, OnChanges, Input, DoCheck, KeyValueDiffers, EventEmitter, Directive } from '@angular/core';
import { DocumentService } from '../../../Models/Documents/documents.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NodeComponent } from '../../../Framework/Whatever/FileExplorer/fileexplorer.component';
import { IField } from '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { GeneralFunctions } from '../../../Models/Common/General';
import { WidgetComponent } from '../../../Framework/Whatever/Dashboard/widget.component';
import { DocumentExplorerDetails } from './document-details-component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { DocumentAddEditComponent } from '../../Documents/Documents/documentaddedit.component';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { CommonService } from '../../../models/common/common.service';
import { DisplaySettingsComponent } from '../../../Framework/Whatever/Display Settings/displaysettings.component';
import { RevisionList } from '../../Documents/Documents/List-Revisions';
import { SendForApprovalComponent } from '../../common/review/sendforapproval.component'
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'document-explorer',
    templateUrl: './app/Views/Documents/Document Explorer/documentexplorer.component.html',
    directives: [NodeComponent, DisplaySettingsComponent, RevisionList, SendForApprovalComponent,
        Notification, GridComponent, MultipleEdit, SectionComponent, FieldComponent, PageComponent, DocumentExplorerDetails,
        PagingComponent, SplitViewComponent, WidgetComponent, SubMenu, DocumentAddEditComponent, SlideComponent, ConfirmationComponent, Analytics],
    providers: [DocumentService, NotificationService, AdministrationService, GeneralFunctions, ConfirmationService, CommonService, HTTP_PROVIDERS]
      
})

export class DocumentExplorerComponent {
    field: any;
    sortTree: any = "";
    imgData1: string = "";
    strFileName: string = "";
    imgData: string = "";
    advancelookup: IField[];
    @Output() emitMenu = new EventEmitter();
    filter = "";
    advanceValue = "[]";
    DocumentId;
    selectedId: string;
    multipleupdateevent: IMultipleSubmitOutput;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    action: string;
    pageTitle: string;
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    refreshgrid;
    btnName: string;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    enableMenu = [];
    menuData;
    message: string;
    showSlide = false;
    previewEnabled: boolean = false;
    documentId: any;
    position = "top-right";
    documentAddEditformId = 439;
    multipleEditFieldDetails: any;
    isDocCheckoutSubscribed: boolean = false;
    menumock = [
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
            "title": "Download",
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

    itemsSource: any[];
    
    inputItems: IGrid = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, showContextMenu: true };
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private documentService: DocumentService,
        private notificationService: NotificationService,
        private administrationService: AdministrationService,       
        private commonService: CommonService,
        private generFun: GeneralFunctions) {
        var contextObj = this;

        var callBack = function (data) {
            contextObj.menuData = data;
        };
        generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 263, contextObj.administrationService, contextObj.menumock.length)

        documentService.getDocumentListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        })

    }

    dataLoadIndexed() {

        var contextObj = this;
        this.documentService.getDocumentListOnTreeSelection(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.sortTree).subscribe(function (result) {
            contextObj.itemsPerPage = result.RowsPerPage;
            contextObj.totalItems = result.DataCount;

            if (contextObj.totalItems > 0)
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            else {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.enableMenu = [1]
            }

            contextObj.inputItems.rowData = contextObj.itemsSource[0];
            contextObj.previewEnabled = !contextObj.previewEnabled;
        })

    }

    public onPageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoadIndexed();

       
    };

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New Document";
                this.splitviewInput.secondaryArea = 40;
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit Document";
                this.splitviewInput.secondaryArea = 40;
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
                this.splitviewInput.secondaryArea = 40;
                this.reviseReplaceClick();
                break;
            case 6:
                this.action = "Revisions";
                this.pageTitle = "List Revisions";
                this.revisionsClick();
                break;
            case 7:
                this.action = "displaysettings";
                this.pageTitle = "Display Settings";
                this.splitviewInput.secondaryArea = 40;
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
    }

    getUpdatedDisplaySettings(event) {
        if (event["dispSettingObject"] != undefined) {
            var contextObj = this;
            this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);
            if (event["IsDragged"] == true) {
                contextObj.documentService.getDocumentListFields().subscribe(function (result) {
                    contextObj.fieldObject = result["Data"];
                })
            }
            setTimeout(function () {
                contextObj.splitviewInput.showSecondaryView = false;
            }, 80);
        }
    }

    public onSort(objGrid: any) {
        
        this.dataLoadIndexed();
    }

    //checkout()
    //{        
    //    if (this.inputItems.rowData["Document Status"] == "Active") {
    //        this.selectedId = this.inputItems.selectedIds[0];
    //        this.splitviewInput.showSecondaryView = true;
    //    }
    //    else if (this.inputItems.rowData["Document Status"] == "Check Out Requested") {
    //        this.notificationService.ShowToaster("Selected Document is already requested for Check Out", 2);
            
    //    }
    //    else if (this.inputItems.rowData["Document Status"] == "Checked Out") {
    //        this.notificationService.ShowToaster("The Document '" + this.inputItems.rowData["File Name"] + "' is locked for Check Out by '" + this.inputItems.rowData["Uploaded By"] + "'", 2);
    //    }
    //    else if (this.inputItems.rowData["Document Status"] == "Approved for Check Out") {
    //        this.notificationService.ShowToaster("The Document '" + this.inputItems.rowData["File Name"] + "' Check Out is requested by '" + this.inputItems.rowData["Uploaded By"] + "'", 2);
    //    }
    //    else {
    //        this.notificationService.ShowToaster("Document is not in Active status, cannot be checked out", 2);
    //    }
    //}

    private checkout() {

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
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
                        } else {
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
                                let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "edit", retData, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
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
    }


    base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public downloadDocument(selectionIds: any) {
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
            var newFileName: string = ""; 

            if (contextObj.inputItems.selectedIds.length > 1) {
                for (var item of contextObj.inputItems.rowData) {
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


                        } catch (ex) {
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
                                        contextObj.notificationService.ShowToaster("Maximum number of characters for file name exceeds. File name will be truncated.", 2);
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

                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                });
            }
        }


    }

    public revisionsClick() {
        var contextObj = this;
        contextObj.action = "";
        if (contextObj.inputItems.selectedIds.length != 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            return;
        }
        else {
            contextObj.documentService.CheckRevisionExists(contextObj.inputItems.rowData["DocumentId"]).subscribe(function (resultData) {
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

    }

    //public reviseReplaceClick() {
    //    this.btnName = "Upload";
    //    var contextObj = this;
    //    var selectedIds;

    //    if (this.inputItems.selectedIds.length > 1) {
    //        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
    //    } else {
    //        selectedIds = contextObj.inputItems.selectedIds[0];  
    //        if (this.inputItems.rowData["Document Status"] == "Active") {
    //            this.documentService.loadDocumentAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
    //                contextObj.fieldDetailsAddEdit = resultData["Data"];
    //                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

    //                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2310 || contextObj.fieldDetailsAddEdit[i].FieldId == 2311) {
    //                        contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
    //                    }
    //                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414 || contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
    //                        contextObj.fieldDetailsAddEdit[i].FieldValue = ""
    //                    }
    //                    else {
    //                        contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
    //                    }

    //                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) { // Document Status 
    //                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
    //                        contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
    //                        if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
    //                            contextObj.fieldDetailsAddEdit[i].FieldValue = "70"
    //                    }
    //                    else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) { // Date of Upload
    //                        contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
    //                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
    //                    }
    //                }
    //                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    //            });
    //        }
    //        else {
    //            if (this.action == "revise") {
    //                contextObj.notificationService.ShowToaster("Document is not in Active status, cannot be revised", 2);
    //            }
    //            else
    //            { contextObj.notificationService.ShowToaster("Document is not in Active status, cannot be replaced", 2);}
    //        }

    //    }
    //}

    public reviseReplaceClick() {
        this.btnName = "Upload";
        var contextObj = this;
        var selectedIds;

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            selectedIds = contextObj.inputItems.selectedIds[0];
            if (contextObj.isDocCheckoutSubscribed == true) {
                switch (contextObj.inputItems.rowData["StatusId"]) {
                    case 32:
                        contextObj.documentService.getCheckOutUser(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                            if (resultData.StatusId == 1) {
                                contextObj.documentService.loadDocumentAddEditFields(selectedIds, 2).subscribe(function (resultData1) {
                                    contextObj.fieldDetailsAddEdit = resultData1["Data"];
                                    for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

                                        if (contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 2 || contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 8) {
                                            contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                                        }
                                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414 || contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                                            contextObj.fieldDetailsAddEdit[i].FieldValue = ""
                                        }
                                        else {
                                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                        }

                                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) { // Document Status 
                                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                            if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                                                contextObj.fieldDetailsAddEdit[i].FieldValue = "70"
                                        }
                                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) { // Date of Upload
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
                            for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

                                if (contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 2 || contextObj.fieldDetailsAddEdit[i].DataEntryControlId == 8) {
                                    contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                                }
                                if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414 || contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                                    contextObj.fieldDetailsAddEdit[i].FieldValue = ""
                                }
                                else {
                                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                }

                                if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) { // Document Status 
                                    contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                                    if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                                        contextObj.fieldDetailsAddEdit[i].FieldValue = "70"
                                }
                                else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) { // Date of Upload
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
    }

    public addClick()
    {
        this.action = "add";
        this.btnName = "Upload";        
        var contextObj = this;
        this.documentService.loadDocumentAddEditFields(0, 1).subscribe(function (result) {
            contextObj.fieldDetailsAddEdit = (result["Data"]);
            var fileuploadfield = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 960 });
            fileuploadfield.FieldLabel = "File (Provide full path)";
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick()
    {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            contextObj.pageTitle = "Multiple Update";
            this.action = "multipleedit";
            this.onMultipleEditClick();
        } else {
            var temp = this.inputItems.rowData["Document Status"];
            if (temp.toLowerCase() == "active" || temp.toLowerCase() == "blocked")  {
                this.documentService.loadDocumentAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {

                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) { // Document Status 
                            contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                            contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                            if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                                contextObj.fieldDetailsAddEdit[i].FieldValue = "70";
                            else
                                contextObj.fieldDetailsAddEdit[i].FieldValue = "71";
                        }
                        if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414) { // File Format 
                            contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                        }
                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2415) { // File Name
                            contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                        }
                        else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) { // Date of Upload
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
    }

    public onMultipleEditClick() {
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
        } else
        { contextObj.notificationService.ShowToaster("Some Documents are not in Active status, cannot be edited", 2); }
    }

    public onMultipleEditUpdate(event: IMultipleSubmitOutput) {
        this.message = "Are you sure you want to update the selected records with the new value?";
        this.showSlide = !this.showSlide;
        this.multipleupdateevent = event;
    }

    public deleteClick() {
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
    }

    okClick(event: Event) {
        this.showSlide = !this.showSlide;

        if (this.action == "delete")
            this.deleteDocument();
        else if (this.action == "CheckIn")
            this.checkInDocument();
        else if (this.action == "multipleedit") {
            var contextObj = this;
            for (var item of this.inputItems.selectedIds) {
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

            this.inputItems.rowData = this.itemsSource[0];
            this.previewEnabled = !this.previewEnabled;
        }
    }

    private checkin() {
        var context = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document", 2);
        } else if (context.inputItems.selectedIds.length > 1) {
            context.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            switch (context.inputItems.rowData["StatusId"]) {
                case 32:
                    context.documentService.getCheckOutUser(context.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (resultData.StatusId == 1) {
                            context.message = "Are you sure you want to Check In the selected document ?";
                            context.showSlide = !context.showSlide;


                        } else {
                            context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' is locked for Check Out by " + resultData.Data, 2);
                        }
                    });
                    break;
                default:
                    context.notificationService.ShowToaster("The Document '" + context.inputItems.rowData["File Name"] + "' is not Checked Out. Only Checked Out documents can be Checked In ", 2);
                    break;
            }
        }
    }

    private checkInDocument() {
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
                let retUpdatedSrc = contextobj.generFun.updateDataSource(contextobj.itemsSource, "edit", retData, contextobj.inputItems.selectedIds, contextobj.inputItems.dataKey, contextobj.totalItems);
                contextobj.refreshgrid = contextobj.refreshgrid.concat([true]);
            }
            else {
                contextobj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public deleteDocument() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
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
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems >= 1) {
                    contextObj.inputItems.rowData = contextObj.itemsSource[0];
                    contextObj.previewEnabled = !contextObj.previewEnabled;
                }
                else if (contextObj.totalItems < 1) {
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
        
        //this.inputItems.rowData = this.itemsSource[0];
        //this.previewEnabled = !this.previewEnabled;
    }

    OnSuccessfulSubmit(event: any) {     
        debugger   
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4];
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

        this.inputItems.rowData = this.itemsSource[0];
        this.previewEnabled = !this.previewEnabled;
    }

    private getCustomerSubscribedFeatures(contextObj) {        

        contextObj.administrationService.getCustomerSubscribedFeatures("176").subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                var customerFeatureobj = result["Data"];
                contextObj.isDocCheckoutSubscribed = customerFeatureobj[0]["IsSubscribed"];
                if (contextObj.isDocCheckoutSubscribed == true) {
                    contextObj.selectedId = contextObj.inputItems.selectedIds[0];
                    contextObj.action = "sendforapproval";
                    //contextObj.documentNo = contextObj.itemsSource.find(function (item) {
                    //    return item.ReportFieldId == 967
                    //});
                    //contextObj.fileName= contextObj.itemsSource.find(function (item) {
                    //    return item.ReportFieldId == 960
                    //});

                    //contextObj.splitviewInput.showSecondaryView = true;
                }
            }
        });
    }



    clickRow(inp, event) {
       
        if (inp.selectedIds[0] != this.documentId) {
            this.documentId = inp.selectedIds[0];
            this.previewEnabled = !this.previewEnabled;
        }
        //if (inp.selectedIds.length > 0) {
        //    console.log(inp.selectedIds[0]);
        //}
    }

    //ngOnInit() {
    //    this.getData(0);
    //    this.dataLoad();
    //}

    ngOnInit() {        
        var contextObj = this;

        contextObj.getData(0);
        contextObj.dataLoad();

        contextObj.administrationService.getCustomerSubscribedFeatures("176").subscribe(function (result) {
            contextObj.isDocCheckoutSubscribed = false;
            var customerFeatureobj = result["Data"];
            if (customerFeatureobj) {
                contextObj.isDocCheckoutSubscribed = customerFeatureobj[0]["IsSubscribed"];
            } else {
                contextObj.isDocCheckoutSubscribed = false;
            }
            if (contextObj.isDocCheckoutSubscribed == false) {
                contextObj.menuData = contextObj.menuData.filter(function (ite) { return ite.id <= 8 });
            }
        });
    }

    public onSplitViewClose(event) {
        if (this.action == "multipleedit") {
            this.dataLoadIndexed();
        }
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    }

    dataLoad()
    {
               
        var contextObj = this;
        this.documentService.getDocumentListOnTreeSelection(0, "", "", "").subscribe(function (result) {
            contextObj.itemsPerPage = result.RowsPerPage;
            contextObj.totalItems = result.DataCount;

            if (contextObj.totalItems > 0)
            {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.pageIndex = 0;
            }
            else {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.enableMenu = [1]
            }
        })


    }

    getData(status) {
                
        var contextObj = this;
        var resultObjLength;
        contextObj.documentService.GetExplorerFieldValues("0", "").subscribe(function (result) {                      
            if (result[0] != null && result[0] != "" && result[0] != undefined) {
                contextObj.field = result[0];
            }
            else {
                contextObj.field = { children: "", id: "-1", label: "Documents", levelno: "-1", fieldname: "Documents" }
            }

        })

        if (status != 0)
        {            
            contextObj.sortTree = "";
            contextObj.dataLoad();
        }

    }

    Expanddata(node)
    {        
        if (node)
        {
            var contextObj = this;
            var arrayList = new Array<DocumentDetailsOnClick>();
            var pref = "Ñµ";
            var suf = "";
            var fieldLabel = pref + node.label + suf;
            var nodeLevel = node.levelno;
            var filtervalue: string="";

            if (nodeLevel != "0") { 
                arrayList.push({
                    ReportFieldId: node.fieldname,
                    Value: fieldLabel
                });
                if (nodeLevel != "1")
                {
                    if (node.parentFieldName) {
                        for (var i = 0; i < node.parentFieldName.length; i++) {
                            arrayList.push({
                                ReportFieldId: node.parentFieldName[i],
                                Value: pref + node.parentLabel[i] + suf
                            });
                        }
                    }
                }
                filtervalue = JSON.stringify(arrayList);
            }

            if (nodeLevel != "0" && (!node.children || (node.children && node.children.length==0))) {
                contextObj.documentService.GetExplorerFieldValues(nodeLevel, filtervalue).subscribe(function (result) {                           
                    if (result[0] != null && result[0] != "" && result[0] != undefined)
                    {
                        var Children: any[] = [];
                        var parentFieldName: string[] = [];
                        var parentLabel: string[] = [];
                        if (node.parentFieldName)
                        {
                            for (let i = 0; i < node.parentFieldName.length; i++)                            
                                parentFieldName.push(node.parentFieldName[i]);
                            
                        }
                        if (node.parentLabel)
                        {
                            for (let i = 0; i < node.parentLabel.length; i++)
                                parentLabel.push(node.parentLabel[i]);
                        }

                        parentFieldName.push(node.fieldname);
                        parentLabel.push(node.label);

                        for (let i = 0; i < result.length; i++) {
                            Children.push({
                                id: result[i].id,
                                label: result[i].label,
                                levelno: result[i].levelno,
                                fieldname: result[i].fieldname,
                                children: result[i].children,
                                parentLabel: parentLabel,
                                parentFieldName: parentFieldName,
                                HasChild: result[i].HasChild
                            })
                        }
                        node.children = Children;
                    }                                      
                });
            }            
        }
    }

    NodeClick(ev) {
        debugger;        
        var arrayList = new Array<DocumentDetailsOnClick>();
        var pref = "Ñµ";
        var suf = "";
        var fieldLabel = pref + ev.label + suf;
        var nodeLevel = ev.levelno;          


        if (nodeLevel == "0") {
            //arrayList.push({
            //    ReportFieldId: null,
            //    Value: null
            //})


            var contextObj = this;
            contextObj.pageIndex = 0;
            contextObj.documentService.getDocumentListOnTreeSelection(0, "", "", JSON.stringify(arrayList)).subscribe(function (result) {
                contextObj.itemsPerPage = result.RowsPerPage;
                contextObj.totalItems = result.DataCount;
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                if (contextObj.totalItems > 0) {
                    contextObj.inputItems.rowData = contextObj.itemsSource[0];
                    contextObj.previewEnabled = !contextObj.previewEnabled;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    contextObj.enableMenu = [1]
                }
            })
            contextObj.sortTree = JSON.stringify(arrayList);
        }
        if (nodeLevel == "1")
        {
            arrayList.push({
                ReportFieldId: ev.fieldname,
                Value: fieldLabel
            })

            var contextObj = this;
            contextObj.pageIndex = 0;
            this.documentService.getDocumentListOnTreeSelection(0, "", "", JSON.stringify(arrayList)).subscribe(function (result) {                

                contextObj.itemsPerPage = result.RowsPerPage;
                contextObj.totalItems = result.DataCount;

                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                if (contextObj.totalItems > 0) {
                    
                    contextObj.inputItems.rowData = contextObj.itemsSource[0];
                    contextObj.previewEnabled= !contextObj.previewEnabled;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    contextObj.enableMenu = [1]
                }
            })

            contextObj.sortTree = JSON.stringify(arrayList);

        }
        if (nodeLevel == "2" || nodeLevel == "3" || nodeLevel == "4" || nodeLevel == "5")
        {
            arrayList.push({
                ReportFieldId: ev.fieldname,
                Value: fieldLabel
            })
            for (var i = 0; i < ev.parentFieldName.length; i++) {
                arrayList.push({
                    ReportFieldId: ev.parentFieldName[i],
                    Value: pref + ev.parentLabel[i] + suf
                })
            }

           

            var contextObj = this;
            contextObj.pageIndex = 0;
            this.documentService.getDocumentListOnTreeSelection(0, "", "", JSON.stringify(arrayList)).subscribe(function (result) {
                contextObj.itemsPerPage = result.RowsPerPage;
                contextObj.totalItems = result.DataCount;

                contextObj.itemsSource = JSON.parse(result.FieldBinderData);

                if (contextObj.totalItems > 0) {
                    
                    contextObj.inputItems.rowData = contextObj.itemsSource[0];
                    contextObj.previewEnabled = !contextObj.previewEnabled;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    contextObj.enableMenu = [1]
                }
            })

            contextObj.sortTree = JSON.stringify(arrayList);            
        }
    }

    onloadSearch(event: any) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        contextObj.documentService.DocumentKeywordSearch(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["DataCount"].DataCount);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
            }
            else {
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    }

    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.documentService.DocumentAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"].DataCount);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
            } else {
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    }


    Clear(event: any) {
        var contextObj = this;
        this.documentService.getDocumentAdvanceSearchField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    }

    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {
        //console.log('Entered Delete');
    }
    OnSuccessfullEditSuccess(event: any) {
        
        this.refreshgrid = [];
        if (event.status.status == "success") {
            let retUpdatedSrc;
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event.status, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
            this.splitviewInput.showSecondaryView = false;
            this.previewEnabled = !this.previewEnabled;
        }
    }
    onContextMenuOnClick(event: any) {
        var tempID: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = 4;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = 0;
            this.analyticsInput.IsKeywordSearch = 0;
            this.analyticsInput.KeywordFilterValue = "";
            this.analyticsInput.AdvanceFilterValue = "[]";
            this.analyticsInput.FormId = 427;
            this.analyticsInput.ParentFormId = 0;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}

export interface DocumentDetailsOnClick {
    ReportFieldId: string;
    Value: string;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface DocumentDownloadArray {
    multiFilename: string;
    ReferenceIds: string;
}