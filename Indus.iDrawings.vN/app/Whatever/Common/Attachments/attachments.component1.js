//import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { HTTP_PROVIDERS } from '@angular/http';
//import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
//import { ListComponent } from '../../../Framework/Whatever/List/list.component';
//import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
//import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
//import { searchBox } from '../../../Framework/Whatever/Search/search.component';
//import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
//import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
//import { AdministrationService } from '../../../Models/Administration/administration.service';
//import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
//import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
//import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
//import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
//import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
//import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
//import { GeneralFunctions} from '../../../Models/Common/General';
//import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
//@Component({
//    selector: 'attachments1',
//    templateUrl: './app/Views/Common/Attachments/attachments1.component.html',
//    directives: [PageComponent, FieldComponent, DropDownListComponent, SubMenu, PagingComponent, Sorting, searchBox, ListComponent, CardComponent, Notification, ConfirmationComponent, SlideComponent],
//    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions],
//    inputs: ['attachmentCategoryId', 'moduleId', 'baseEntityId', 'objectClassId','isallattachmentmenuneeded']
//})
//export class AttachmentsComponent1 implements OnInit {
//    baseEntityId: string;
//    baseEnityIdSample: string;
//    attachmentCategoryId: string;
//    moduleId: number;
//    objectClassId: string = "0";
//    isallattachmentmenuneeded: boolean = true;
//    pagePath: string;
//    alignContent: string;
//    ddlAttachmentCategory: IField;
//    public fieldDetails: IField[];
//    public errorMessage: string;
//    private fields: IField[];
//    public keyWordLookup: any[];
//    sourceData: any[];
//    fileName: string = "";
//    fileSize: number = 0;
//    success = "";
//    cardButtonPrivilege = [false, false];
//    types = false;
//    imgData: string = "";
//    imgData1: string = "";
//    strFileName: string = "";
//    blnShowSort: boolean = true;
//    loggedInUserDetails: any;
//    viewImage: boolean = false;
//    submitSuccess: any[] = [];
//    menuData = [
//        {
//            "id": 0,
//            "title": "Add",
//            "image": "Add",
//            "path": "Add",
//            "submenu": null,
//            "privilegeId": null          
//        },
//        {
//            "id": 3,
//            "title": "Delete",
//            "image": "Delete",
//            "path": "Delete",
//            "submenu": null,
//            "privilegeId": null          
//        },
//        {
//            "id": 4,
//            "title": "View",
//            "image": "View",
//            "path": "View",
//            "submenu": null,
//            "privilegeId": null
//        },
//        {
//            "id": 5,
//            "title": "Download",
//            "image": "Download",
//            "path": "Download",
//            "submenu": null,
//            "privilegeId": null          
//        }, {
//            "id": 6,
//            "title": "Edit",
//            "image": null,
//            "path": null,
//            "submenu": null,
//            "privilegeId": null
//        }             
//    ];
//    // gridcount = 8;
//    gridcount: number = 0;
//    //enableMenu = [0, 2];
//    enableMenu = [];
//    selIds = new Array();
//    public totalItems: number = 0;
//    public itemsPerPage: number = 0;
//    @Output() attachmentSuccess = new EventEmitter();
//    data: any;
//    position = "top-right";
//    positionImage: string = "top-right";
//    showSlide = false;
//    slidewidth = 280;
//    oldFileName: any;
//    privilegeIds: any[];
//    constructor(private administrationService: AdministrationService, private generFun: GeneralFunctions, private notificationService: NotificationService, private getData: GeneralFunctions) {
//    }
//    ngOnInit(): void {
//        var contextObj = this;
//        switch (this.attachmentCategoryId.toString()) {
//            case "2":
//                if (contextObj.moduleId == 1) {
//                    this.privilegeIds = [251, 628, 629, 630, 252];
//                }
//                else {
//                    this.privilegeIds = [642, 644, 645, 646, 643];
//                }                
//                break;
//            case "3":
//                if (contextObj.moduleId == 1) {
//                    this.privilegeIds = [258, 631, 632, 633, 259];
//                }
//                else {
//                    this.privilegeIds = [647, 649, 650, 651, 648];
//                }
//                break;
//            case "4":
//                if (contextObj.moduleId == 1) {
//                    this.privilegeIds = [272, 634, 635, 636, 273];
//                }
//                else {
//                    this.privilegeIds = [652, 654, 655, 656, 653];
//                }
//                break;
//            case "9":
//                this.privilegeIds = [477, 479, 480, 481, 478];/*[1871, 1873, 1874, 1875, 1872];Bug fix for Bug 73471*/
//                break;
//            case "5":
//                this.privilegeIds = [477, 479, 480, 481, 478];
//                break;
//            case "6":
//                this.privilegeIds = [1046, 1048, 1049, 1050, 1047];
//                break;
//            case "7":
//                this.privilegeIds = [1051, 1053, 1054, 1055, 1052];
//                break;
//            case "21":
//                this.privilegeIds = [3506, 3507, 3508, 3509, 3506];
//                break;
//            default:
//                this.privilegeIds = [];
//        }
//        let i = 0;
//        if (this.privilegeIds.length != 0) {
//            var contextObj = this;
//            this.menuData = this.menuData.filter(function (el) {
//                el.privilegeId = contextObj.privilegeIds[i];
//                i = i + 1;
//                return true
//            });
//            var callBack = function (data) {
//                if (data != undefined && data.length != 0)
//                    data.filter(function (el) {
//                        if (el.title == "Edit") {
//                            contextObj.cardButtonPrivilege[0] = true;
//                        }
//                        else if (el.title == "Delete") {
//                            contextObj.cardButtonPrivilege[1] = true;
//                        }
//                    });
//                    contextObj.menuData = data;
//            };
//            this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 7, this.administrationService, this.menuData.length);
//        }
//        if (this.objectClassId == null || this.objectClassId == undefined)
//            this.objectClassId = "0";
//        this.pagePath = "Administration / Attachments";
//        this.alignContent = "horizontal";
//        if (this.isallattachmentmenuneeded == false) {
//            contextObj.enableMenu = [4, 5];
//            contextObj.cardButtonPrivilege = [false, false];
//        }
//        this.administrationService.getAttachmentField().subscribe(function (resultData) {
//           /* console.log("resultData",resultData["Data"]) */
//            for (let i = 0; i < resultData["Data"].length; i++) {
//                if (resultData["Data"][i].ReportFieldId == 53) {
//                    resultData["Data"][i].IsHiddenLabel = false;
//                    resultData["Data"][i].ReadOnlyMode = false
//                    resultData["Data"][i].FieldValue = ""
//                }
//                else if (resultData["Data"][i].ReportFieldId == 54)
//                   resultData["Data"][i].IsEnabled = false;
//                else if (resultData["Data"][i].ReportFieldId == 57)
//                    resultData["Data"][i].IsEnabled = false;
//                else if (resultData["Data"][i].ReportFieldId == 58) 
//                    resultData["Data"][i].IsEnabled = false;
//            }
//            contextObj.fields = resultData["Data"];
//        });
//        if (contextObj.attachmentCategoryId != null && contextObj.baseEntityId != null) {
//            contextObj.administrationService.getSiteAttachmentData(contextObj.attachmentCategoryId.toString(), contextObj.baseEntityId.toString()).subscribe(function (resultData) {
//                contextObj.baseEnityIdSample = contextObj.baseEntityId;
//                contextObj.totalItems = resultData["Data"].DataCount;
//                if (contextObj.totalItems > 0) {
//                    contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
//                  /*  console.log("data: ", resultData["Data"]); */
//                    if (contextObj.moduleId == 1)
//                    {
//                        contextObj.enableMenu = [4, 5];
//                        contextObj.cardButtonPrivilege = [false, false];
//                    }
//                    else
//                        contextObj.enableMenu = [0, 3, 4, 5];
//                    contextObj.blnShowSort = true;
//                }
//                else {
//                    if (contextObj.moduleId != 1)
//                        contextObj.enableMenu = [0];
//                    contextObj.notificationService.ShowToaster("No Attachments exist", 2);
//                    contextObj.blnShowSort = false;
//                }
//            });
//        }
//        this.administrationService.getSessionData().subscribe(function (data) {
//            var retData = data["Data"];
//            contextObj.loggedInUserDetails = {};
//            contextObj.loggedInUserDetails["username"] = retData["UserName"];
//            /*this.loggedInUserDetails["userrole"] = retData["UserRoleName"]; */
//            contextObj.loggedInUserDetails["customername"] = retData["CustomerName"];
//        });  
//    }
//    onCardSubmit(event: any) {
//        var fldFileName = this.fields.find(t => t.ReportFieldId == 53);
//        fldFileName.IsMandatory = false; 
//        var contextObj = this;
//        let test = event.fieldObject;
//        var temp = JSON.parse(event.fieldObject);
//        /*......for alraedy in use drop down update
//         var attachmentCategoryField = this.fields.find(t => t.ReportFieldId == 55);
//        if (isNaN(parseInt(attachmentCategoryField.FieldValue))) {
//            var lookup = attachmentCategoryField.LookupDetails.LookupValues.find(function (item) {
//                return item.Value === attachmentCategoryField.FieldValue;
//            });
//            attachmentCategoryField.FieldValue = lookup.Id.toString();
//            var attachmentValue = temp.find(function (item) {
//                return item.ReportFieldId === 55;
//            });
//            attachmentValue.Value = lookup.Id;
//        }
//        ......for alraedy in use drop down update......*/
//        temp.push({
//            ReportFieldId: 52,
//            Value: "11"
//        });
//        temp.push({
//            ReportFieldId: 51,
//            Value: this.attachmentCategoryId.toString()
//        });
//        for (let i = 0; i < this.fields.length; i++) {
//            if (this.fields[i].ReportFieldId == 54) 
//                this.fields[i].IsEnabled = false;
//            else if (this.fields[i].ReportFieldId == 57)
//                this.fields[i].IsEnabled = false;
//            else if (this.fields[i].ReportFieldId == 58)
//                this.fields[i].IsEnabled = false;
//        }
//        /*if (event["filedata"] != undefined)
//            { */
//            if (event["dataKeyValue"]) {
//                for (let i = 0; i < temp.length; i++) {
//                    if (temp[i].ReportFieldId == 58)
//                        temp[i].Value = null;
//                }
//                this.administrationService.postSubmitEditAttachmentList(JSON.stringify(this.editFileDetails(JSON.stringify(temp), event["filedata"])), event["filedata"], event["dataKeyValue"], this.attachmentCategoryId.toString(), this.baseEnityIdSample.toString(), this.oldFileName).subscribe(function (resultData) {
//                    contextObj.success = resultData["Data"].Message;
//                    contextObj.data = (resultData["Data"]);
//                    if (contextObj.success == "Success") {
//                        contextObj.notificationService.ShowToaster("Attachment updated", 3);
//                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
//                        /*-----------------edited by arun for drop down update */
//                        var attachmentCategory: IField = contextObj.fields.find(function (item) {
//                            return item.ReportFieldId === 55;
//                        });
//                        attachmentCategory.FieldValue = JSON.parse(resultData["Data"]["Data"])[0]["Attachment Category"];
//                        //----------------------------------------------------
//                    }
//                    else if (contextObj.success == "Object Class Attachment") {
//                        contextObj.notificationService.ShowToaster("Asset Class Attachment cannot be edited", 5);
//                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "689" }); 
//                    }
//                    else {
//                        contextObj.notificationService.ShowToaster("Attachment already exists", 5);
//                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "689" }); 
//                    }
//                });
//            }
//            else {
//                this.administrationService.postSubmitAddtAttachmentList(JSON.stringify(this.editFileDetails(JSON.stringify(temp), event["filedata"])), event["filedata"], this.attachmentCategoryId.toString(), this.baseEnityIdSample.toString()).subscribe(function (resultData) {
//                    contextObj.success = resultData["Data"].Message;
//                    contextObj.data = (resultData["Data"]);
//                   /* console.log("add: ", resultData["Data"]); */
//                    if (contextObj.success == "Success") {
//                        contextObj.totalItems = contextObj.totalItems + 1;
//                        contextObj.notificationService.ShowToaster("Attachment uploaded", 3);
//                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
//                        contextObj.attachmentSuccess.emit({ status: "success" });
//                        contextObj.enableMenu = [0,3,4,5];
//                      /*  contextObj.sourceData[contextObj.sourceData.length - 1].AttachmentId = resultData["Data"].ServerId; */
//                        contextObj.sourceData[contextObj.sourceData.length - 1] = eval(resultData["Data"].Data)[0];
//                        contextObj.types = false;
//                        contextObj.blnShowSort = true;
//                    }
//                    else {
//                        contextObj.notificationService.ShowToaster("Attachment already exists", 5);
//                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "689" }); 
//                        contextObj.enableMenu = [0, 3, 4, 5];
//                    }
//                   /* console.log("fieldDetails:", this.fieldDetails); */
//                });
//            }
//    }
//    public onSubMenuChange(event: any) {
//        if (event.value == 0) /* Add */
//        {
//            this.uploadAttachment();
//        }        
//        else if (event.value == 3) /* Delete */
//        {
//            this.onMenuDeleteClick();
//        }
//        else if (event.value == 5) /* Download */
//        {
//            this.downloadAttachment(this.selIds);
//        }
//        else if (event.value == 4) /* preview */
//        {
//            this.preview(this.selIds);
//        }
//    }
//    public preview(selIds: any) {
//        var contextObj = this;
//        if (this.selIds.length == 0) {
//            this.notificationService.ShowToaster("Select an attachment to view", 2);
//        }
//        else {
//            var filename;
//            contextObj.sourceData.find(function (item) {
//                if (item["AttachmentId"] == contextObj.selIds[0]) {
//                    filename = item["File Name"];
//                    return true;
//                }
//                return false;
//            });
//            var fileExtension = filename.replace(/^.*\./, '');
//            if (fileExtension == "jpg" || fileExtension == "jpeg") {
//                this.administrationService.downloadAttachment(this.attachmentCategoryId, this.selIds[0], this.baseEnityIdSample, filename, this.objectClassId).subscribe(function (resultData) {
//                    if (resultData._body == "Data is Null")
//                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
//                    else {
//                        var headers = resultData.headers;
//                        var contentType = headers.get("Content-Type");
//                        var linkElement = document.createElement('a');
//                        var linkElement1 = document.createElement('a');
//                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
//                        contextObj.imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
//                        contextObj.viewImage = true;
//                    }
//                });
//            }
//            else if (fileExtension == "png") {
//                this.administrationService.downloadAttachment(this.attachmentCategoryId, this.selIds[0], this.baseEnityIdSample, filename, this.objectClassId).subscribe(function (resultData) {
//                    if (resultData._body == "Data is Null")
//                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
//                    else {
//                        var headers = resultData.headers;
//                        var contentType = headers.get("Content-Type");
//                        var linkElement = document.createElement('a');
//                        var linkElement1 = document.createElement('a');
//                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
//                        contextObj.imgData1 = "data:image/png;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
//                        contextObj.viewImage = true;
//                    }
//                });
//            }
//            else if (fileExtension == "bmp") {
//                this.administrationService.downloadAttachment(this.attachmentCategoryId, this.selIds[0], this.baseEnityIdSample, filename, this.objectClassId).subscribe(function (resultData) {
//                    if (resultData._body == "Data is Null")
//                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
//                    else {
//                        var headers = resultData.headers;
//                        var contentType = headers.get("Content-Type");
//                        var linkElement = document.createElement('a');
//                        var linkElement1 = document.createElement('a');
//                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
//                        contextObj.imgData1 = "data:image/bmp;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
//                        contextObj.viewImage = true;
//                    }
//                });
//            }
//            else {
//                contextObj.viewImage = false;
//                this.notificationService.ShowToaster("No preview available ", 2);
//            }
//        }
//    }
//    public uploadAttachment() {
//        var fldFileName = this.fields.find(t => t.ReportFieldId == 53);
//        fldFileName.IsMandatory = true;        
//        this.sourceData = this.getData.addCardForGrid(this.sourceData, this.fields);
//        this.types = true;
//        this.enableMenu = [];
//        this.blnShowSort = false;
//    }
//    public downloadAttachment(selIds: any) {
//        if (this.selIds.length == 0) {
//            this.notificationService.ShowToaster("Select an attachment to download", 2);
//        }
//        else {
//            var contextObj = this;
//            var filename;
//            contextObj.sourceData.find(function (item) {
//                if (item["AttachmentId"] == contextObj.selIds[0]) {
//                    filename = item["File Name"];
//                    return true;
//                }
//                return false;
//            });
//            this.administrationService.downloadAttachment(this.attachmentCategoryId, this.selIds[0], this.baseEnityIdSample, filename, this.objectClassId).subscribe(function (resultData) {
//                if (resultData._body == "Data is Null")
//                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
//                else {
//                    var headers = resultData.headers;
//                    var contentType = headers.get("Content-Type");
//                    var linkElement = document.createElement('a');
//                    var linkElement1 = document.createElement('a');
//                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
//                    contextObj.imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
//                    contextObj.imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
//                    contextObj.strFileName = filename;
//                    try {
//                        var blob = new Blob([data], { type: contentType });
//                        var url = window.URL.createObjectURL(blob);
//                        linkElement.setAttribute('href', url);
//                        linkElement.setAttribute("download", filename);
//                        var clickEvent = new MouseEvent("click", {
//                            "view": window,
//                            "bubbles": true,
//                            "cancelable": false
//                        });
//                        linkElement.dispatchEvent(clickEvent);
//                    } catch (ex) {
//                        console.log(ex);
//                    }
//                }
//            });
//        }
//    }
//   base64ToArrayBuffer(base64) {
//    var binary_string = window.atob(base64);
//    var len = binary_string.length;
//    var bytes = new Uint8Array(len);
//    for (var i = 0; i < len; i++) {
//        bytes[i] = binary_string.charCodeAt(i);
//    }
//    return bytes.buffer;
//  }
//   onDelete(e: Event) {
//       if (this.moduleId != 1)
//        this.onMenuDeleteClick();
//    }
//   public onMenuDeleteClick() {
//        if (this.selIds.length > 1) {
//            this.notificationService.ShowToaster("This operation can be performed only one card at a time", 2);
//        }
//        else if (this.selIds.length == 0) {
//            this.notificationService.ShowToaster("Select an attachment to delete", 2);
//        }
//        else {
//            this.showSlide = !this.showSlide;
//        }
//    }
//    okDelete(event: any) {
//        this.deleteAttachment();
//        this.showSlide = !this.showSlide;
//    }
//    public deleteAttachment() {  
//        var contextObj = this;
//        this.administrationService.postAttachmentDelete(this.selIds, this.attachmentCategoryId.toString(), this.baseEnityIdSample.toString()).subscribe(function (resultData) {
//                contextObj.success = resultData["Data"].Message;
//                contextObj.success = resultData["Data"].Message;
//                if (contextObj.success == "Success") {
//                    contextObj.totalItems = contextObj.totalItems - 1;
//                    for (var j = 0; j < contextObj.selIds.length; j++) {
//                        var index = contextObj.sourceData.indexOf(contextObj.sourceData.filter(x => x["AttachmentId"] == contextObj.selIds[j])[0]);
//                        if (index > -1)
//                            contextObj.sourceData.splice(index, 1);
//                    } 
//                    contextObj.notificationService.ShowToaster("Selected Attachment deleted", 3);
//                    contextObj.attachmentSuccess.emit({ status: "delete" });
//                    contextObj.blnShowSort = true;
//                    if (contextObj.totalItems == 0) {
//                        contextObj.notificationService.ShowToaster("No Attachments exist", 2);
//                        contextObj.enableMenu = [0];
//                        contextObj.blnShowSort = false;
//                    }
//                } 
//                else if (contextObj.success == "Object Class Attachment") {
//                    contextObj.notificationService.ShowToaster("Asset Class Attachment cannot be deleted", 5);
//                }
//                else {
//                    contextObj.notificationService.ShowToaster("Selected Attachment Details delete Failed", 5);
//                }
//            });
//    }
//    cancelClick(event: Event) {
//        this.showSlide = !this.showSlide;
//    }
//    closeSlideDialog(value: any) {
//        this.showSlide = value.value;
//    }
//    editFileDetails(fieldobject: any, filedata: any) {
//        var jsonobject = JSON.parse(fieldobject);
//        if (filedata != undefined) {
//            var fileobject = JSON.parse(filedata);
//            if (jsonobject) {
//                for (let i = 0; i < jsonobject.length; i++) {
//                    if (jsonobject[i]["ReportFieldId"] == 53) {
//                        jsonobject[i]["Value"] = fileobject.FileName;
//                        this.fileName = fileobject.FileName;
//                        this.oldFileName = jsonobject[i]["Value"];
//                    }
//                    if (jsonobject[i]["ReportFieldId"] == 54) {
//                        jsonobject[i]["Value"] = (fileobject.FileSize);
//                    }
//                }
//            }
//            return jsonobject;
//        }
//        else {
//            for (let i = 0; i < jsonobject.length; i++) {
//                if (jsonobject[i]["ReportFieldId"] == 53) {
//                    this.oldFileName = jsonobject[i]["Value"];
//                }
//            }           
//            return jsonobject;
//        }
//    }
//    onCancel(e) {
//        if (this.totalItems == 0) {
//            this.enableMenu = [0];
//        }
//        else {
//            this.enableMenu = [0, 3, 4, 5];
//            this.blnShowSort = true;
//        }
//        var fldFileName = this.fields.find(t => t.ReportFieldId == 53);
//        fldFileName.IsMandatory = false;
//    }
//    onFileUpload(event) {
//        var contextObj = this;
//        contextObj.administrationService.getAttachmentDate().subscribe(function (resultData) {
//            resultData;
//        });
//        contextObj.sourceData.find(function (item) {
//            if (item["File Name"] == null) {
//                item["File Name"] = event.fileObject.FileName;
//            }
//            if (item["AttachmentId"] == contextObj.selIds[0]) {
//                item["File Name"] = event.fileObject.FileName;
//                item["File Size (KB)"] = (event["fileObject"].FileSize / 1024).toFixed();
//                var tempStr = "Administrator, Indus";
//                if (contextObj.loggedInUserDetails.username == tempStr) {
//                    item["Uploaded By"] = "Indus Administrator";
//                }
//                else
//                    item["Uploaded By"] = contextObj.loggedInUserDetails.username;
//                return true;
//            } else {
//                return false;
//            }
//        });
//        var updatedData = new Array();/*To notify the watcher about the change*/
//        updatedData = updatedData.concat(contextObj.sourceData);
//        contextObj.sourceData = updatedData;
//    }
//     /* public downloadAttachment(ids) {
//    console.log("download click", ids);
//    if (ids.length > 0) {
//    }
//    else {
//        this.notificationService.ShowToaster("Select an Attachment", 2);
//    }
//    } */
//    public pageChanged(event: any) {
//        /* this.administrationService.getSiteAttachmentData().subscribe(list => this.sourceData = list["data"],
//            error => this.errorMessage = <any>error); */
//    };
//    onSorting(event: any) {
//        this.administrationService.sortAttachmentData(event.sortDirection, event.selectedField, this.attachmentCategoryId.toString(), this.baseEnityIdSample.toString()).subscribe(resultData => this.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]));
//    }
//    closeSlideDialogPreview(value: any) {
//        this.viewImage = false;
//    }
//} 
//# sourceMappingURL=attachments.component1.js.map