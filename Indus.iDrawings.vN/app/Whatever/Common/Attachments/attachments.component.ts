import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { AttachmentAddEditComponent } from './attachments-addedit.component';
import { SpaceService } from '../../../Models/Space/space.service'
import { EmployeeService } from '../../../Models/Employee/employee.services';
import '../../../../Scripts/FileSaver.min.js';

@Component({
    selector: 'attachments',
    templateUrl: './app/Views/Common/Attachments/attachments.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, AttachmentAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, SpaceService, EmployeeService],
    inputs: ['attachmentCategoryId', 'moduleId', 'baseEntityId', 'objectClassId', 'isallattachmentmenuneeded', 'leaseRenewalCount']
})

export class AttachmentsComponent implements OnInit {
    baseEntityId: string;
    baseEnityIdSample: string;
    attachmentCategoryId: string;
    moduleId: number;
    objectClassId: string = "0";
    isallattachmentmenuneeded: boolean = true;
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    imgData: string = "";
    imgData1: string = "";
    strFileName: string = "";
    loggedInUserDetails: any;
    viewImage: boolean = false;
    submitSuccess: any[] = [];
    success = "";
    classname: string = "";
    leaseRenewalCount: number = 0;
    width: number = 600;

    customerAttachmentCategoryId: string;
    arrayForLease: any[] = [];
    messageLabel: string = "";
    message = "";
    menuData = [
        {
            "id": 100,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id": 102,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id": 103,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id": 104,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null,
            "privilegeId": null
        },
        {
            "id": 105,
            "title": "Download",
            "image": "Download",
            "path": "Download",
            "submenu": null,
            "privilegeId": null
        }
    ];

    @Output() attachmentSuccess = new EventEmitter();
    position = "top-right";
    positionImage: string = "top-right";
    showSlide = false;
    slidewidth = 280;
    pageTitle: string;
    privilegeIds: any[];
    refreshgrid;

    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private getData: GeneralFunctions, private generFun: GeneralFunctions, private spaceService: SpaceService, private employeeService: EmployeeService) {


    }

    ngOnInit(): void {

        if (window["IsMobile"]) {
            this.width = 320;
        }
        var contextObj = this;
        switch (this.attachmentCategoryId.toString()) {
            case "2":
                if (contextObj.moduleId == 1) {
                    this.privilegeIds = [251, 252, 628, 629, 630];
                }
                else {
                    this.privilegeIds = [642, 643, 644, 645, 646];
                }
                break;
            case "3":
                if (contextObj.moduleId == 1) {
                    this.privilegeIds = [258, 259, 631, 632, 633];
                }
                else if (contextObj.moduleId == 30) {//Fix for Bug 76103
                    this.privilegeIds = [1051, 1052, 1053, 1054, 1055];
                }
                else {
                    this.privilegeIds = [647, 648, 649, 650, 651];
                }
                break;
            case "4":
                if (contextObj.moduleId == 1) {
                    this.privilegeIds = [272, 273, 634, 635, 636];
                }
                else {
                    this.privilegeIds = [652, 653, 654, 655, 656];
                }
                break;
            case "9":
                this.privilegeIds = [1871, 1873, 1874, 1875, 1872];/*[1871, 1873, 1874, 1875, 1872];Bug fix for Bug 73471*/
                break;
            case "5":
                this.privilegeIds = [477, 478, 479, 480, 481]; /* [1871, 1873, 1874, 1875, 1872];*/
                break;
            case "6":
                this.privilegeIds = [1046, 1047, 1048, 1049, 1050];
                break;
            case "7":
                switch (this.moduleId) {
                    case 7:
                    case 8:
                        this.classname = "Asset Class";
                        break;
                    case 6:
                        this.classname = "Object Class";
                        break;
                    case 25:
                    case 26:
                    case 27:
                    case 29:
                    case 18:
                    case 17:
                        this.classname = "Component Type";
                        break;
                    case 24:
                        this.classname = "Equipment Type";
                        break;
                }
                this.privilegeIds = [1051, 1052, 1053, 1054, 1055];
                break;
            case "21":
                this.privilegeIds = [3506, 3506, 3507, 3508, 3509];
                break;
            case "18":
                this.privilegeIds = [10055, 10056, 10057, 10058, 10059];
                break;
            default:
                this.privilegeIds = [];
        }

        let i = 0;
        if (this.privilegeIds.length != 0) {
            var contextObj = this;
            this.menuData = this.menuData.filter(function (el) {
                el.privilegeId = contextObj.privilegeIds[i];
                i = i + 1;
                return true
            });
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 7, this.administrationService, this.menuData.length);
        }

        let rptField = [56];
        let count = rptField.length;

        if (this.objectClassId == null || this.objectClassId == undefined)
            this.objectClassId = "0";

        if (this.isallattachmentmenuneeded == false) {
            contextObj.enableMenu = [104, 105];

        }

        this.administrationService.getAttachmentField().subscribe(function (resultData) {

            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });

            if (Number(contextObj.attachmentCategoryId) == 18) {
                for (let i = 0; i < resultData["Data"].length; i++) {
                    if (resultData["Data"][i].ReportFieldId == 55 && resultData["Data"][i].FieldId == 692)
                        resultData["Data"][i].FieldLabel = "Document Category";
                }
            }

            contextObj.fieldObject = (resultData["Data"]);
            if (contextObj.attachmentCategoryId != null && contextObj.baseEntityId != null) {
                contextObj.arrayForLease.push({
                    ReportFieldId: 5741,
                    Value: contextObj.baseEntityId
                });
                contextObj.arrayForLease.push({
                    ReportFieldId: 5742,
                    Value: contextObj.leaseRenewalCount
                });

                contextObj.getAttachmentData(1);
            }
        });


        if (Number(contextObj.attachmentCategoryId) == 18)
            contextObj.messageLabel = "Document";
        else if (Number(contextObj.attachmentCategoryId) == 12)
            contextObj.messageLabel = "Invoice";
        else
            contextObj.messageLabel = "Attachment";

        contextObj.message = "Are you sure you want to delete the selected " + contextObj.messageLabel + "?";
    }

    getAttachmentData(target?: number) {
        var contextObj = this;


        //contextObj.arrayForLease.push({
        //    ReportFieldId: 5741,
        //    Value: contextObj.baseEntityId
        //});
        //contextObj.arrayForLease.push({
        //    ReportFieldId: 5742,
        //    Value: contextObj.leaseRenewalCount
        //});

        this.administrationService.getAttachmentDataGrid(JSON.stringify(contextObj.arrayForLease), contextObj.attachmentCategoryId.toString(), contextObj.baseEntityId.toString(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {

            contextObj.baseEnityIdSample = contextObj.baseEntityId;
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                // contextObj.enableMenu = [101, 102];
                if (target == 1) {
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }

                if (contextObj.moduleId == 1) {
                    contextObj.enableMenu = [104, 105];

                }
                else if (contextObj.moduleId == 7 && contextObj.isallattachmentmenuneeded == false) {
                    contextObj.enableMenu = [104, 105];
                }
                else
                    contextObj.enableMenu = [100, 102, 103, 104, 105];

            }
            else if (resultData["Data"].Message == "Invalid File") {
                contextObj.notificationService.ShowToaster("Select a valid image", 2);
            }

            else {
                if (contextObj.moduleId != 1)
                    contextObj.enableMenu = [100];
                if (contextObj.moduleId == 7 && contextObj.isallattachmentmenuneeded == false)
                    contextObj.enableMenu = [];
                contextObj.notificationService.ShowToaster("No " + contextObj.messageLabel + "s exist", 2);

            }

        });
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getAttachmentData(0);
    };
    public onSort(objGrid: any) {
        this.getAttachmentData(0);
    }

    public onSubMenuChange(event: any) {
        if (event.value == 100) /* Add */ {
            this.addAttachment();
        }
        else if (event.value == 102) /* Edit */ {
            this.onMenuEditClick();
        }
        else if (event.value == 103) /* Delete */ {
            this.onMenuDeleteClick();
        }
        else if (event.value == 105) /* Download */ {
            this.downloadAttachment(this.inputItems.selectedIds[0]);
        }
        else if (event.value == 104) /* preview */ {
            this.preview(this.inputItems.selectedIds[0]);
        }
    }

    public addAttachment() {

        var contextObj = this;
        if (this.attachmentCategoryId.toString() == "5") {
            contextObj.spaceService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {
                if (resultData.ServerId > 0) {
                    contextObj.action = "add";
                    contextObj.btnName = "Upload";
                    contextObj.pageTitle = "New Attachment";
                    contextObj.administrationService.loadAttachmentAddEdit(0, 1).subscribe(function (resultData) {

                        resultData["Data"][2].IsVisible = false;
                        resultData["Data"][3].IsMandatory = true;
                        contextObj.fieldDetailsAdd1 = resultData["Data"];
                    })
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else
                    contextObj.notificationService.ShowToaster("You do not have the privilege to add the data of the selected space", 2);
            });
        }

        else if (this.attachmentCategoryId.toString() == "9") {
            contextObj.employeeService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {
                if (resultData["Data"].ServerId > 0) {
                    contextObj.action = "add";
                    contextObj.btnName = "Upload";
                    contextObj.pageTitle = "New Attachment";
                    contextObj.administrationService.loadAttachmentAddEdit(0, 1).subscribe(function (resultData) {

                        resultData["Data"][2].IsVisible = false;
                        resultData["Data"][3].IsMandatory = true;
                        contextObj.fieldDetailsAdd1 = resultData["Data"];
                    })
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else
                    contextObj.notificationService.ShowToaster("You do not have the privilege to add attachment to the selected employee", 2);
            });
        }

        else {
            var context = this;
            this.action = "add";
            this.btnName = "Upload";
            this.pageTitle = "New " + contextObj.messageLabel;
            this.administrationService.loadAttachmentAddEdit(0, 1).subscribe(function (resultData) {

                if (Number(contextObj.attachmentCategoryId) == 18) {
                    for (let i = 0; i < resultData["Data"].length; i++) {
                        if (resultData["Data"][i].ReportFieldId == 55 && resultData["Data"][i].FieldId == 692)
                            resultData["Data"][i].FieldLabel = "Document Category";
                    }
                }
                else if (Number(contextObj.attachmentCategoryId) == 12) {
                    context.administrationService.Insertinvoiceifnotexists("Invoice").subscribe(function (resultinvoice) {
                        console.log('result data for invoice insertion ', resultinvoice)
                        for (let i = 0; i < resultData["Data"].length; i++) {
                            if (resultData["Data"][i].ReportFieldId == 55 && resultData["Data"][i].FieldId == 692) {
                                var lookup
                                resultData["Data"][i].IsEnabled = false;
                                console.log('look up details', resultData["Data"][i]["LookupDetails"]["LookupValues"])
                                if (resultinvoice != -1)
                                    resultData["Data"][i]["LookupDetails"]["LookupValues"].push({ Id: resultinvoice, Value: "Invoice", IsChecked: null })
                                resultData["Data"][i]["LookupDetails"]["LookupValues"].find(function (item) {
                                    if (item.Value.toUpperCase() == "INVOICE") {
                                        lookup = item;
                                        resultData["Data"][i].FieldValue = lookup.Id;
                                        resultData["Data"][i].HasValidationError = false;
                                        return true;
                                    }
                                    else
                                        return false;
                                })
                                break;
                            }
                        }
                    })
                }
                resultData["Data"][2].IsVisible = false;
                resultData["Data"][3].IsMandatory = true;
                contextObj.fieldDetailsAdd1 = resultData["Data"];
            })
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public onMenuEditClick() {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit " + contextObj.messageLabel;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {

            if (this.attachmentCategoryId.toString() == "5") {
                contextObj.spaceService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {

                    if (resultData.ServerId > 0) {

                        contextObj.administrationService.getAttachmentDataGridLoad(contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {

                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55 })
                            contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;
                            contextObj.fieldDetailsAdd1 = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            // contextObj.splitviewInput.showSecondaryView = true;
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }

            else if (this.attachmentCategoryId.toString() == "9") {
                contextObj.employeeService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {

                    if (resultData["Data"].ServerId > 0) {

                        contextObj.administrationService.getAttachmentDataGridLoad(contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {

                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55 })
                            contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;

                            contextObj.fieldDetailsAdd1 = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected employee", 2);
                });
            }
            else if (this.attachmentCategoryId.toString() == "7") {
                contextObj.administrationService.attachmentAssetClassorNot(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {

                    if (resultData["Data"] == 0) {

                        contextObj.administrationService.getAttachmentDataGridLoad(contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {

                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55 })
                            contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;

                            contextObj.fieldDetailsAdd1 = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else if (resultData["Data"] == 1) {
                        console.log('moduleId', contextObj.moduleId)
                        switch (contextObj.moduleId) {
                            case 7:
                                contextObj.notificationService.ShowToaster("Asset Class Attachment cannot be edited", 2);
                                break;
                            case 8:
                                contextObj.notificationService.ShowToaster("Furniture Class Attachment cannot be edited", 2);
                                break;
                            case 24:
                                contextObj.notificationService.ShowToaster("Equipment Type Attachment cannot be edited", 2);
                                break;
                            default:
                                contextObj.notificationService.ShowToaster("Component Type Attachment cannot be edited", 2);
                                break;
                                
                        }                        
                    }
                });
            }

            else if (this.attachmentCategoryId.toString() == "18") {
                contextObj.administrationService.getAttachmentDataGridLoadLease(JSON.stringify(contextObj.arrayForLease), contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                    for (let i = 0; i < result["Data"].length; i++) {
                        if (result["Data"][i].ReportFieldId == 55 && result["Data"][i].FieldId == 692)
                            result["Data"][i].FieldLabel = "Document Category";
                    }

                    var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55 })
                    contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;

                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });

            }

            else {

                // this.administrationService.loadAttachmentAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.administrationService.getAttachmentDataGridLoad(contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {

                    /*......for alraedy in use drop down update  */

                    //if (result["Data"] != undefined) {
                    //    var attachmentCategoryField = result["Data"][1];

                    //    if (isNaN(parseInt(attachmentCategoryField.FieldValue))) {
                    //        var lookup = attachmentCategoryField.LookupDetails.LookupValues.find(function (item) {
                    //            return item.Value === attachmentCategoryField.FieldValue;
                    //        });

                    //        attachmentCategoryField.FieldValue = lookup.Id.toString();
                    //        //var attachmentValue = temp.find(function (item) {
                    //        //    return item.ReportFieldId === 55;
                    //        //});

                    //        //attachmentValue.Value = lookup.Id;
                    //    }
                    //}
                    /*  ......for alraedy in use drop down update......*/

                    var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55 })
                    contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;
                    if (contextObj.attachmentCategoryId.toString() == "12")
                        attachmentCategry.IsEnabled = false;

                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }


    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a trade to delete", 2);
        }
        else {

            if (this.attachmentCategoryId.toString() == "5") {
                contextObj.spaceService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {

                    if (resultData.ServerId > 0) {
                        contextObj.showSlide = !this.showSlide;

                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to delete the data of the selected space", 2);
                });
            }

            else if (this.attachmentCategoryId.toString() == "9") {
                contextObj.employeeService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {

                    if (resultData["Data"].ServerId > 0) {
                        contextObj.showSlide = !this.showSlide;
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to delete the data of the selected employee", 2);
                });
            }
            else if (this.attachmentCategoryId.toString() == "7") {

                contextObj.administrationService.attachmentAssetClassorNot(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {

                    if (resultData["Data"] == 0) {
                        contextObj.showSlide = !this.showSlide;
                    }
                    else if (resultData["Data"] == 1) {
                        switch (contextObj.moduleId) {
                            case 7:
                                contextObj.notificationService.ShowToaster("Asset Class Attachment cannot be deleted", 2);
                                break;
                            case 8:
                                contextObj.notificationService.ShowToaster("Furniture Class Attachment cannot be deleted", 2);
                                break;
                            case 24:
                                contextObj.notificationService.ShowToaster(" Equipment Type Attachment cannot be deleted", 2);
                                break;
                            default:
                                contextObj.notificationService.ShowToaster("Component Type Attachment cannot be deleted", 2);
                                break;

                        } 
                    }
                       // contextObj.notificationService.ShowToaster(contextObj.classname+ " Attachment cannot be deleted", 2);
                });
            }
            else {
                contextObj.showSlide = !this.showSlide;
            }

        }
    }

    deleteAttachment() {
        var contextObj = this;
        var customerAttachmentCategoryId;
        var filename;
        contextObj.itemsSource.find(function (item) {

            if (item["AttachmentId"] == contextObj.inputItems.selectedIds[0]) {
                filename = item["File Name"];
                customerAttachmentCategoryId = item["CustomerAttachmentCategoryId"];
                return true;
            }
            return false;
        });
        this.administrationService.postAttachmentDelete(contextObj.inputItems.selectedIds[0], this.attachmentCategoryId.toString(), this.baseEnityIdSample.toString(), customerAttachmentCategoryId, filename).subscribe(function (resultData) {

            contextObj.success = resultData["Data"].Message;
            if (contextObj.success == "Success") {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [100];
                }

                contextObj.notificationService.ShowToaster("Selected " + contextObj.messageLabel + " deleted", 3);
                contextObj.attachmentSuccess.emit({ status: "delete", baseEntityId: contextObj.baseEntityId });


                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No " + contextObj.messageLabel + "s exist", 2);
                    contextObj.enableMenu = [100];

                }
            }
            else if (contextObj.success == "Object Class Attachment") {
                contextObj.notificationService.ShowToaster(contextObj.classname +" Attachment cannot be deleted", 5);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected " + contextObj.messageLabel + " Details delete Failed", 5);
            }
        });
    }

    public inlineDelete(event: any) {
        this.deleteAttachment();
    }

    public downloadAttachment(selIds: any) {
        var contextObj = this;

        if (selIds.length == 0) {
            this.notificationService.ShowToaster("Select an " + contextObj.messageLabel + " to download", 2);
        }
        else {
            var contextObj = this;
            var filename;
            var customerAttachmentCategoryId;

            contextObj.itemsSource.find(function (item) {

                if (item["AttachmentId"] == selIds) {
                    filename = item["File Name"];
                    customerAttachmentCategoryId = item["CustomerAttachmentCategoryId"];
                    return true;
                }
                return false;
            });

            this.administrationService.downloadAttachment(this.attachmentCategoryId, selIds, this.baseEnityIdSample, filename, this.objectClassId, customerAttachmentCategoryId).subscribe(function (resultData) {

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
                            linkElement.setAttribute("download", filename);
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
    }

    public preview(selIds: any) {

        var contextObj = this;
        if (selIds.length == 0) {
            this.notificationService.ShowToaster("Select an " + contextObj.messageLabel + " to view", 2);
        }
        else {

            var filename;
            var customerAttachmentCategoryId;

            contextObj.itemsSource.find(function (item) {

                if (item["AttachmentId"] == selIds) {
                    filename = item["File Name"];
                    customerAttachmentCategoryId = item["CustomerAttachmentCategoryId"];
                    return true;
                }
                return false;
            });

            var fileExtension = filename.replace(/^.*\./, '');

            
            if (fileExtension.toUpperCase() == "JPG" || fileExtension.toUpperCase() == "JPEG") {

                this.administrationService.downloadAttachment(this.attachmentCategoryId, selIds, this.baseEnityIdSample, filename, this.objectClassId, customerAttachmentCategoryId).subscribe(function (resultData) {

                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");
                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');
                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                        contextObj.imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.viewImage = true;
                    }
                });
            }
            else if (fileExtension == "png") {

                this.administrationService.downloadAttachment(this.attachmentCategoryId, selIds, this.baseEnityIdSample, filename, this.objectClassId, customerAttachmentCategoryId).subscribe(function (resultData) {
                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");
                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');
                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                        contextObj.imgData1 = "data:image/png;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.viewImage = true;
                    }
                });
            }
            else if (fileExtension == "bmp") {

                this.administrationService.downloadAttachment(this.attachmentCategoryId, selIds, this.baseEnityIdSample, filename, this.objectClassId, customerAttachmentCategoryId).subscribe(function (resultData) {
                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");
                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');
                        var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                        contextObj.imgData1 = "data:image/bmp;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                        contextObj.viewImage = true;
                    }
                });
            }
            else {
                contextObj.viewImage = false;
                this.notificationService.ShowToaster("No preview available ", 2);
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

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {

            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.attachmentSuccess.emit({ status: "success", baseEntityId: contextObj.baseEntityId });

        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        contextObj.enableMenu = [100, 102, 103, 104, 105];
    }

    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteAttachment();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    closeSlideDialogPreview(value: any) {
        this.viewImage = false;
    }
}