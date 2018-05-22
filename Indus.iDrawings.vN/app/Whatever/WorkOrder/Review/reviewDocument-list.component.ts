import {Component, EventEmitter, AfterViewInit, Output} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';


@Component({
    selector: 'reviewDocument-list',
    templateUrl: './app/Views/WorkOrder/Review/reviewDocument-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['workrequestId', 'userDetails', 'itemsSource', 'entityCategoryId', 'enableMenu'],
})

export class ReviewDocumentListComponent implements AfterViewInit {

    @Output() documentSubmit = new EventEmitter();
    @Output() documentDelete = new EventEmitter();
    @Output() itemSourceUpdate = new EventEmitter();
    fieldObject: IField[];
    workrequestId: number;
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    entityCategoryId: number;
    inputItems: IGrid = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, sortCol: "[Uploaded on]", sortDir: "DESC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
    action: string;
    btnName: string;
    userDetails: any;
    types: boolean = true;
    cardButtonPrivilege = [false, false];
    enableMenu: number[];
    pageTitle: string = "Attach Document";
    //Form id : 237-- page id 721
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (237))


    menuData = [];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {

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
                } else {
                   // contextObj.inputItems.allowSort = false;
                    if (contextObj.itemsSource || contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No Documents exist", 2);
                    }
                }
                contextObj.enableMenu = contextObj.itemsSource.length == 0 ? [1] : [1, 2];
            }

        });
    }

    public setMenuData() {
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
        } else if (this.entityCategoryId == 1 && this.workrequestId == 0) {
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
        } else {
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
    }

    public dataLoad(target?: number) {
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
    }

    public onSubMenuChange(event: any) {
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
    }

    public onSort(event) {
        if (this.workrequestId > 0){
            this.dataLoad(0);
            this.inputItems.isClientSort = false;
        }
        else
            this.inputItems.isClientSort = true;
    }

    public pageChanged(event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0)
    }

    public onDocumentSubmit(event) {

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
        var tempArray: any[] = [];
        tempArray.push({
            AttachmentId: contextObj.itemsSource.length == 0 ? -1 : (-1 - contextObj.itemsSource.length),
            ['File Name']: fileDataArray.FileName,
            ['File Size (KB)']: fileDataArray.FileSize,
            Description: description.Value,
            ['Uploaded on']: contextObj.getNewDate(),
            ['Uploaded by']: contextObj.userDetails.UserName,
            AttachmentCategoryId: attachmentCategory.Value,
            WorkRequestId: 0
        });

        var submitArray: ReportFieldIdValues[] = [];
        if (contextObj.workrequestId > 0) {
            submitArray.push(
                {
                    ReportFieldId: 1350,    /*RequestId*/
                    Value: contextObj.workrequestId
                });
        }

        submitArray.push(
            {
                ReportFieldId: 52,  /*PermittedFileId*/
                Value: 11
            },
            {
                ReportFieldId: 53,  /*FileName*/
                Value: fileDataArray.FileName
            },
            {
                ReportFieldId: 54,  /*FileSize*/
                Value: fileDataArray.FileSize
            },
            {
                ReportFieldId: 55,  /*CustomerAttachmentCategoryId*/
                Value: attachmentCategory.Value
            },
            {
                ReportFieldId: 56,  /*Description*/
                Value: description.Value
            },
            {
                ReportFieldId: 443, /**/
                Value: contextObj.userDetails["UserId"]
            });

        var documentdata: DocumentDataInput = { DocumentId: 0, FileDataInput: '', WFReportFieldIdValues: [] };
        documentdata.DocumentId = tempArray[0]["AttachmentId"];
        documentdata.FileDataInput = fileDataArray;
        documentdata.WFReportFieldIdValues = submitArray;
        var reviewDocumentInput: ReviewDocumentInput = { WFEntityDocumentInput: { FormId: 240, WFEntityId: 0, ListDocumentReportFieldIdValues: [documentdata] } };
        contextObj.workOrderService.checkIsValidDocument(JSON.stringify(reviewDocumentInput)).subscribe(function (isValid) {

            console.log(isValid);
            if (isValid["Data"] == 1) {
                contextObj.notificationService.ShowToaster("Select a valid file", 5);
            } else {
                if (contextObj.workrequestId == 0) {
                    var updatedData = new Array();/*To notify the watcher about the change*/
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


    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Upload";

        contextObj.workOrderService.loadReviewDocumentsAddEdit().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Attachment", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    public onDownLoadClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an attachment to download", 2);
        } else {
            var selectedItem = contextObj.itemsSource.find(function (item) { return item["AttachmentId"] === contextObj.inputItems.selectedIds[0] });
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
                        } else if (isSafari) {
                            //if (window["saveAs"] != undefined) {
                            //    window["saveAs"](blob, selectedItem["File Name"]);
                            //}                          
                            //setTimeout(function () {
                            //    window["saveAs"](new Blob([data], { type: "application/octet-stream" }), selectedItem["File Name"]);
                            //}, 1);

                            //var file = new File([data], 'filename', { type: "application/octet-stream" });
                            //var url = window.URL.createObjectURL(file);
                            //var link = document.createElement('a');
                            //link.href = url;
                            //link.click();

                        } else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", selectedItem["File Name"]);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    } catch (ex) {

                    }
                }
            });
        }
    }

    public base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public getDocumentDataToDownLoad(selectedItem) {
        var documentData: DocumentDataInput[] = [{
            DocumentId: selectedItem["AttachmentId"],
            WFReportFieldIdValues: [{ ReportFieldId: 1350, Value: selectedItem["AttachmentId"] }],
            FileDataInput: {
                FileName: selectedItem["File Name"],
                FileSize: selectedItem["File Size (KB)"]
            }
        }];
        var returnData: ReviewDocumentInput = { WFEntityDocumentInput: { FormId: 240, WFEntityId: this.workrequestId, ListDocumentReportFieldIdValues: documentData } }
        return JSON.stringify(returnData);
    }

    public deleteDocuments() {
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
                var updatedData = new Array();/*To notify the watcher about the change*/
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
    }

    public getNewDate() {
        var date = new Date();
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        return dd + " " + mon + " " + yy;
    }


    //slide events/////


    public okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteDocuments();
    }

    public cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    public closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

interface ReviewDocumentInput {
    WFEntityDocumentInput: DocumentInput;
}

interface DocumentInput {
    FormId: number;
    WFEntityId: number;
    ListDocumentReportFieldIdValues: DocumentDataInput[];
}

interface DocumentDataInput {
    DocumentId: number;
    WFReportFieldIdValues: ReportFieldIdValues[];
    FileDataInput: any;
}
