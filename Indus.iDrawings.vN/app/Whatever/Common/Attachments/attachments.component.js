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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var attachments_addedit_component_1 = require('./attachments-addedit.component');
var space_service_1 = require('../../../Models/Space/space.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
require('../../../../Scripts/FileSaver.min.js');
var AttachmentsComponent = (function () {
    function AttachmentsComponent(notificationService, administrationService, getData, generFun, spaceService, employeeService) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.getData = getData;
        this.generFun = generFun;
        this.spaceService = spaceService;
        this.employeeService = employeeService;
        this.objectClassId = "0";
        this.isallattachmentmenuneeded = true;
        this.inputItems = { dataKey: "AttachmentId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.imgData = "";
        this.imgData1 = "";
        this.strFileName = "";
        this.viewImage = false;
        this.submitSuccess = [];
        this.success = "";
        this.classname = "";
        this.leaseRenewalCount = 0;
        this.width = 600;
        this.arrayForLease = [];
        this.messageLabel = "";
        this.message = "";
        this.menuData = [
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
        this.attachmentSuccess = new core_1.EventEmitter();
        this.position = "top-right";
        this.positionImage = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
    }
    AttachmentsComponent.prototype.ngOnInit = function () {
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
                else if (contextObj.moduleId == 30) {
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
                this.privilegeIds = [1871, 1873, 1874, 1875, 1872]; /*[1871, 1873, 1874, 1875, 1872];Bug fix for Bug 73471*/
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
        var i = 0;
        if (this.privilegeIds.length != 0) {
            var contextObj = this;
            this.menuData = this.menuData.filter(function (el) {
                el.privilegeId = contextObj.privilegeIds[i];
                i = i + 1;
                return true;
            });
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 7, this.administrationService, this.menuData.length);
        }
        var rptField = [56];
        var count = rptField.length;
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
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            if (Number(contextObj.attachmentCategoryId) == 18) {
                for (var i_1 = 0; i_1 < resultData["Data"].length; i_1++) {
                    if (resultData["Data"][i_1].ReportFieldId == 55 && resultData["Data"][i_1].FieldId == 692)
                        resultData["Data"][i_1].FieldLabel = "Document Category";
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
    };
    AttachmentsComponent.prototype.getAttachmentData = function (target) {
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
    };
    AttachmentsComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getAttachmentData(0);
    };
    ;
    AttachmentsComponent.prototype.onSort = function (objGrid) {
        this.getAttachmentData(0);
    };
    AttachmentsComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 100) {
            this.addAttachment();
        }
        else if (event.value == 102) {
            this.onMenuEditClick();
        }
        else if (event.value == 103) {
            this.onMenuDeleteClick();
        }
        else if (event.value == 105) {
            this.downloadAttachment(this.inputItems.selectedIds[0]);
        }
        else if (event.value == 104) {
            this.preview(this.inputItems.selectedIds[0]);
        }
    };
    AttachmentsComponent.prototype.addAttachment = function () {
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
                    });
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
                    });
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
                    for (var i = 0; i < resultData["Data"].length; i++) {
                        if (resultData["Data"][i].ReportFieldId == 55 && resultData["Data"][i].FieldId == 692)
                            resultData["Data"][i].FieldLabel = "Document Category";
                    }
                }
                else if (Number(contextObj.attachmentCategoryId) == 12) {
                    context.administrationService.Insertinvoiceifnotexists("Invoice").subscribe(function (resultinvoice) {
                        console.log('result data for invoice insertion ', resultinvoice);
                        var _loop_1 = function(i) {
                            if (resultData["Data"][i].ReportFieldId == 55 && resultData["Data"][i].FieldId == 692) {
                                resultData["Data"][i].IsEnabled = false;
                                console.log('look up details', resultData["Data"][i]["LookupDetails"]["LookupValues"]);
                                if (resultinvoice != -1)
                                    resultData["Data"][i]["LookupDetails"]["LookupValues"].push({ Id: resultinvoice, Value: "Invoice", IsChecked: null });
                                resultData["Data"][i]["LookupDetails"]["LookupValues"].find(function (item) {
                                    if (item.Value.toUpperCase() == "INVOICE") {
                                        lookup = item;
                                        resultData["Data"][i].FieldValue = lookup.Id;
                                        resultData["Data"][i].HasValidationError = false;
                                        return true;
                                    }
                                    else
                                        return false;
                                });
                                return "break";
                            }
                        };
                        var lookup;
                        for (var i = 0; i < resultData["Data"].length; i++) {
                            var state_1 = _loop_1(i);
                            if (state_1 === "break") break;
                        }
                    });
                }
                resultData["Data"][2].IsVisible = false;
                resultData["Data"][3].IsMandatory = true;
                contextObj.fieldDetailsAdd1 = resultData["Data"];
            });
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    AttachmentsComponent.prototype.onMenuEditClick = function () {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit " + contextObj.messageLabel;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            if (this.attachmentCategoryId.toString() == "5") {
                contextObj.spaceService.checkEditPrivilageExist(Number(contextObj.baseEntityId)).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.administrationService.getAttachmentDataGridLoad(contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString(), contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55; });
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
                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55; });
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
                            var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55; });
                            contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;
                            contextObj.fieldDetailsAdd1 = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else if (resultData["Data"] == 1) {
                        console.log('moduleId', contextObj.moduleId);
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
                    for (var i = 0; i < result["Data"].length; i++) {
                        if (result["Data"][i].ReportFieldId == 55 && result["Data"][i].FieldId == 692)
                            result["Data"][i].FieldLabel = "Document Category";
                    }
                    var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55; });
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
                    var attachmentCategry = result["Data"].find(function (item) { return item.ReportFieldId === 55; });
                    contextObj.customerAttachmentCategoryId = attachmentCategry.FieldValue;
                    if (contextObj.attachmentCategoryId.toString() == "12")
                        attachmentCategry.IsEnabled = false;
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    AttachmentsComponent.prototype.onMenuDeleteClick = function () {
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
    };
    AttachmentsComponent.prototype.deleteAttachment = function () {
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
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
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
                contextObj.notificationService.ShowToaster(contextObj.classname + " Attachment cannot be deleted", 5);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected " + contextObj.messageLabel + " Details delete Failed", 5);
            }
        });
    };
    AttachmentsComponent.prototype.inlineDelete = function (event) {
        this.deleteAttachment();
    };
    AttachmentsComponent.prototype.downloadAttachment = function (selIds) {
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
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
    };
    AttachmentsComponent.prototype.preview = function (selIds) {
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
    };
    AttachmentsComponent.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    AttachmentsComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.attachmentSuccess.emit({ status: "success", baseEntityId: contextObj.baseEntityId });
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        contextObj.enableMenu = [100, 102, 103, 104, 105];
    };
    //slide events/////
    AttachmentsComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteAttachment();
    };
    AttachmentsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AttachmentsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    AttachmentsComponent.prototype.closeSlideDialogPreview = function (value) {
        this.viewImage = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AttachmentsComponent.prototype, "attachmentSuccess", void 0);
    AttachmentsComponent = __decorate([
        core_1.Component({
            selector: 'attachments',
            templateUrl: './app/Views/Common/Attachments/attachments.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, attachments_addedit_component_1.AttachmentAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, space_service_1.SpaceService, employee_services_1.EmployeeService],
            inputs: ['attachmentCategoryId', 'moduleId', 'baseEntityId', 'objectClassId', 'isallattachmentmenuneeded', 'leaseRenewalCount']
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions, General_1.GeneralFunctions, space_service_1.SpaceService, employee_services_1.EmployeeService])
    ], AttachmentsComponent);
    return AttachmentsComponent;
}());
exports.AttachmentsComponent = AttachmentsComponent;
//# sourceMappingURL=attachments.component.js.map