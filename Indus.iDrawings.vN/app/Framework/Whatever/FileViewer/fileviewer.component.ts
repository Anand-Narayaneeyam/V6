import { Component, Input, Output, forwardRef, EventEmitter, Inject, SimpleChange, OnChanges, DoCheck, OnInit, ElementRef} from '@angular/core';
import {AppComponent } from '../../../app.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
@Component({
    selector: 'file-viewer',
    templateUrl: 'app/Framework/Views/FileViewer/fileviewer.component.html',
    styleUrls: ['app/Framework/Views/FileViewer/fileviewer.component.css'],
    directives: [GridComponent, Notification, SubMenu, SlideComponent],
    providers: [NotificationService]
})

export class FileViewer {
    @Input() attachmentCategoryId: number;
    @Input() moduleId: number;
    @Input() baseEntityId: number;
    @Input() objectClassId: number = 0;
    @Input() isVisible: boolean;
    @Output() attachmentViewerClose = new EventEmitter();
    private fields: IField[];
    public totalItems: number = 0;
    sourceData: any[];
    display: string = 'hidden';
    closeIconPath: string = "Content/Layout/data_attach.png";
    imgSource: any;
    inputItems: IGrid = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, allowAdd: false, allowEdit: false, sortDir: "ASC", selectioMode:'single' };
    arrHighlightRowIds = [];
    attachmentIdList = [];
    viewGridChange: boolean = false;
    menuData = [
        {
            "id": 6,
            "title": "Attachments",
            "image": "Attachments",
            "path": "Attachments",
            "subMenu": null,
            "privilegeId": 424   
        },];
    totalItem: number = 1;
    enableMenu = [];
    position: string = "top-right";
    currentSelectedId: number;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {

    }
    ngOnInit() {
        var contextObj = this;
        this.administrationService.getAttachmentField().subscribe(function (resultData) {
            /* console.log("resultData",resultData["Data"]) */
            for (let i = 0; i < resultData["Data"].length; i++) {

                if (resultData["Data"][i].ReportFieldId == 53) {
                    resultData["Data"][i].IsHiddenLabel = false;
                    resultData["Data"][i].ReadOnlyMode = false
                    resultData["Data"][i].FieldValue = ""
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
    }
    onSubMenuChange(event: any) {
        if (this.viewGridChange == false)
            this.viewGridChange = true;
        else
            this.viewGridChange = false;
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes['baseEntityId'] && changes['baseEntityId']['currentValue']) {
            if (contextObj.attachmentCategoryId != null && contextObj.baseEntityId != null) {
                contextObj.administrationService.getSiteAttachmentData(contextObj.attachmentCategoryId.toString(), contextObj.baseEntityId.toString()).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0)
                        contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                    var selectedId;
                    var check: boolean = false;
                    for (var dataitem of contextObj.sourceData) {
                        contextObj.attachmentIdList.push(dataitem['AttachmentId'])
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

    }
    onClose() {
        this.isVisible = false;
        this.display = 'hidden'
        this.attachmentViewerClose.emit({});

    }
    onDataSelectionChange(event: any) {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.attachmentPreview(this.inputItems.selectedIds[0]);
            this.currentSelectedId = this.inputItems.selectedIds[0];
        }
    }
    attachmentPreview(selId) {
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
                    //contextObj.viewImage = true;
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
                    //contextObj.viewImage = true;
                }
            });
        }
        else {
            //contextObj.viewImage = false;
            //this.notificationService.ShowToaster("No preview available ", 2);
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
    previousOnclick() {
        var currentId = this.currentSelectedId;
        this.arrHighlightRowIds = [];
        var index = this.attachmentIdList.findIndex(function (el) { return el === currentId });
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

    }
    nextOnclick() {
        var currentId = this.currentSelectedId ;
        this.arrHighlightRowIds = [];
        var index = this.attachmentIdList.findIndex(function (el) { return el === currentId });
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
    }
    closeSlideDialog() {
        this.viewGridChange = false;
    }
}