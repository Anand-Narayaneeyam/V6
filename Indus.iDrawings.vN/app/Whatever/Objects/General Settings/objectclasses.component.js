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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var objectclasses_addedit_component_1 = require('./objectclasses-addedit.component');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var ObjectClassesComponent = (function () {
    function ObjectClassesComponent(generFun, objectsService, AdministrationService, notificationService) {
        this.generFun = generFun;
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 350;
        this.moduleId = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '' };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 919
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 920
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 921
            },
            {
                "id": 4,
                "title": "Attachments",
                "image": "Attachments",
                "path": "Attachments",
                "submenu": null,
                "privilegeId": 1035
            }
        ];
        this.enableMenu = [];
    }
    ObjectClassesComponent.prototype.ngOnInit = function () {
        switch (this.objectCategoryId) {
            case 1:
                this.classname = "Asset Class";
                break;
            case 2:
                this.classname = "Furniture Class";
                break;
            case 3:
                this.classname = "Object Class";
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                this.classname = "Component Type";
                break;
            case 20:
                this.classname = "Equipment Type";
                break;
        }
        this.btnName = "Add";
        var contextObj = this;
        var rptField = [648, 4485, 651];
        var count = rptField.length;
        contextObj.objectsService.getFieldsList(this.objectCategoryId).subscribe(function (resultData) {
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
            contextObj.fieldObject = (resultData["Data"]);
            if (contextObj.moduleId == 9) {
                contextObj.fieldObject.find(function (item) {
                    if (item.ReportFieldId == 653) {
                        item.IsVisible = false;
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
        });
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.messages = resultData["Data"].ReturnMessages;
            contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
            contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"];
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3, 4];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster(contextObj.messages["NoDataExist"], 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 204, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ObjectClassesComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    ObjectClassesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    ObjectClassesComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New " + this.classname;
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit " + this.classname;
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = "Attachments";
                this.attachmentsClick();
                break;
        }
    };
    ObjectClassesComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.objectsService.loadObjectClassAddEdit(0, 1, this.objectCategoryId).subscribe(function (resultData) {
            resultData["Data"].find(function (el) { return el.ReportFieldId === 653; })["FieldLabel"] = "Symbol";
            resultData["Data"].find(function (el) { return el.ReportFieldId === 655; })["FieldValue"] = "130";
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.moduleId == 9) {
                var length = contextObj.fieldDetailsAddEdit.length;
                for (var i = 0; i < length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].ReportFieldId) {
                        case 653:
                        case 655:
                            contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                            break;
                        case 4489:
                            contextObj.fieldDetailsAddEdit[i].FieldValue = "1";
                            break;
                        default:
                            break;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ObjectClassesComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.CheckIsInUse();
            this.objectsService.loadObjectClassAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var symbolField = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 653; });
                symbolField["FieldLabel"] = "Symbol";
                if (contextObj.IsObjectClassInUse == 1) {
                    var pmRequiredField = contextObj.fieldDetailsAddEdit.find(function (item) {
                        return item.ReportFieldId === 4489;
                    });
                    if (pmRequiredField.FieldValue == "1") {
                        pmRequiredField["IsEnabled"] = false;
                    }
                }
                if (contextObj.moduleId == 9) {
                    var length = contextObj.fieldDetailsAddEdit.length;
                    for (var i = 0; i < length; i++) {
                        switch (contextObj.fieldDetailsAddEdit[i].ReportFieldId) {
                            case 653:
                            case 655:
                                contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                                break;
                            default:
                                break;
                        }
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ObjectClassesComponent.prototype.CheckIsInUse = function () {
        var contextObj = this;
        this.objectsService.IsObjectClassInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            contextObj.IsObjectClassInUse = resultData["Data"];
        });
    };
    ObjectClassesComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var contextObj = this;
            this.CheckIsInUse();
            var dbObject = new Array();
            dbObject.push({ ReportFieldId: 173, Value: "135" });
            this.objectsService.CheckIsEntityReferenceFound(dbObject, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == false) {
                    contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"];
                }
                else {
                    if (contextObj.IsObjectClassInUse == 1) {
                        if (contextObj.moduleId == 9)
                            contextObj.deleteConfrmtnMsg = contextObj.messages["InUse"];
                        else
                            contextObj.deleteConfrmtnMsg = contextObj.messages["InUseWorkOrder"];
                    }
                    else
                        contextObj.deleteConfrmtnMsg = contextObj.messages["InUse"];
                    ;
                }
                contextObj.showSlide = !contextObj.showSlide;
            });
        }
    };
    ObjectClassesComponent.prototype.deleteObjectClass = function () {
        var contextObj = this;
        contextObj.objectsService.postDeleteObjectClass(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster(contextObj.messages["DeleteSuccess"], 3);
            }
            else {
            }
        });
    };
    ObjectClassesComponent.prototype.attachmentsClick = function () {
        this.action = "attachments";
        // this.btnName = "Save ";
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ObjectClassesComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    //grid inline events
    ObjectClassesComponent.prototype.inlineAdd = function (pageDetails) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = "1";
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = "1";
            }
        }
        contextObj.objectsService.InlineInsertUpdateObjectClass(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 1, this.objectCategoryId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.messages["AddSuccess"], 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId <= 0) {
                        contextObj.notificationService.ShowToaster(contextObj.messages["AlreadyExist"], 5);
                    }
                    break;
            }
        });
    };
    ObjectClassesComponent.prototype.inlineEdit = function (pageDetails) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = "1";
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = "1";
            }
        }
        contextObj.objectsService.InlineInsertUpdateObjectClass(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.messages["UpdateSuccess"], 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster(contextObj.messages["AlreadyExist"], 5);
                    }
                    break;
            }
        });
    };
    ObjectClassesComponent.prototype.inlineDelete = function (event) {
        this.deleteObjectClass();
    };
    //slide events//
    ObjectClassesComponent.prototype.okDelete = function (event) {
        this.deleteObjectClass();
        this.showSlide = !this.showSlide;
    };
    ObjectClassesComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ObjectClassesComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ObjectClassesComponent.prototype.attachmentSuccess = function (event) {
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        var selObj = context.itemsSource.find(function (item) {
            return item["Id"] === selId;
        });
        switch (event["status"]) {
            case "success":
                selObj["Attachments"] = (Number(selObj["Attachments"]) + 1).toString();
                break;
            case "delete":
                selObj["Attachments"] = (Number(selObj["Attachments"]) - 1).toString();
                break;
        }
        context.refreshgrid = context.refreshgrid.concat([true]);
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(context.itemsSource);
        //context.itemsSource = updatedData;
    };
    ObjectClassesComponent = __decorate([
        core_1.Component({
            selector: 'object-classes',
            templateUrl: './app/Views/Objects/General Settings/objectclasses.component.html',
            directives: [slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, attachments_component_1.AttachmentsComponent, objectclasses_addedit_component_1.ObjectClassesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, objects_service_1.ObjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['objectCategoryId', 'moduleId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], ObjectClassesComponent);
    return ObjectClassesComponent;
}());
exports.ObjectClassesComponent = ObjectClassesComponent;
//# sourceMappingURL=objectclasses.component.js.map