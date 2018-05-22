import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DocumentService} from '../../../Models/Documents/documents.service';
import { AdministrationService } from '../../../Models/Administration/administration.service'


@Component({
    selector: 'ListRevisions',
    templateUrl: './app/Views/Documents/Documents/List-Revisions.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, DocumentService, NotificationService, AdministrationService],
    inputs: ["documentId"]
})


export class RevisionList implements OnInit {
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false};
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    action: string;
    btnName: string;
    documentGroupName: string = "";
    enableMenu = [];
    refreshgrid;
    UserId: any;
    showSlide = false;
    documentId;
    position: any = "top-right";
    message = "Are you sure you want to delete the selected Document?";
    messageLabel: string = "";
    strFileName: string = "";
    imgData: string = "";
    imgData1: string = "";
    menuData = [
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
    constructor(private notificationService: NotificationService, private documentService: DocumentService, private getData: GeneralFunctions, private generFun: GeneralFunctions, private administrationService: AdministrationService) {
       
    }

    ngOnInit(): void {
            var contextObj = this;
            var objContext = this;
            contextObj.enableMenu = [];
            objContext.btnName = "Submit";
            objContext.documentService.getDocumentRevisionFeildList().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            });
        contextObj.documentRevisionList(this.documentId);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.deleteClick();
                break;
            case 2:
                this.downloadDocument(this.documentId);
                break;
        }
    }
    deleteClick() {
            
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Revision to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    }



    public documentRevisionList(documentId: any) {
        var contextObj = this;
        contextObj.documentService.getDocumentRevisionList(documentId,this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;

            if (contextObj.totalItems > 0)
            {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [1,2];
            }
            else {
                contextObj.notificationService.ShowToaster("No Revisions exist", 2);
            }
        });
    }

    deleteRevision()
    {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        var RevisioNo = contextObj.inputItems.rowData["Revisions"];
        var DocumentId = contextObj.inputItems.rowData["DocumentId"];
        arrayList.push({
            ReportFieldId: 959,
            Value: RevisioNo
        });

        contextObj.documentService.postRevisionDelete(JSON.stringify(arrayList), DocumentId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
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


                        } catch (ex) {
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

                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                });
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

    public onSort(objGrid: any) {
        var contextObj = this;
        contextObj.inputItems.sortCol = objGrid.sortCol;
        contextObj.inputItems.sortDir = objGrid.sortDir;
        contextObj.documentRevisionList(contextObj.documentId);
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteRevision();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}


