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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var warranty_list_component_1 = require('../../Objects/Data/warranty-list.component');
var common_service_1 = require('../../../models/common/common.service');
var OrphanObjectDataListComponent = (function () {
    function OrphanObjectDataListComponent(objectsService, AdministrationService, notificationService, generFun, exportObject, commonService) {
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.commonService = commonService;
        this.isQuerybuilder = false;
        this.inputItems = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'Multiple', showContextMenu: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 100;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 100 };
        this.filter = "";
        this.varsort = "DESC";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.blnIsGrid = true;
        this.PageTarget = 0;
        this.dispSettingCategoryId = 6;
        this.dispTab = 0;
        this.arrHighlightRowIds = [];
        this.Isallattachmentmenuneeded = true;
        this.IsSearchmenuNeeded = false;
        this.selectedObjectClassDisplaySettingsId = 0;
        this.submitSuccess = new core_1.EventEmitter();
        this.ChangePagepath = new core_1.EventEmitter();
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.orphanHandleOut = new core_1.EventEmitter();
        this.attributeoption = 2;
        this.haseditprivilage = 1;
        this.IsOpenDrawingComponentActive = false;
        this.drawingType = 1;
        this.isSiteAdmin = false;
        this.secondaryViewTarget = 0;
        this.pagePath = "";
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.IsModuleAdmin = false;
        this.tempObjectClassId = 0;
        this.g_selectedClassIds = "";
        this.enableMenu = [3, 5, 9, 13, 12];
        this.searchindex = 0;
        this.menuData = [
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 995
            },
            {
                "id": 5,
                "title": "Tools",
                "image": "Settings",
                "path": "Settings",
                "subMenu": [
                    {
                        "id": 13,
                        "title": "Re-Link",
                        "image": "Re-Link",
                        "path": "Re-Link",
                        "subMenu": null,
                        "privilegeId": null
                    }
                ]
            },
            {
                "id": 9,
                "title": "Attachments",
                "image": "Attachments",
                "path": "Attachments",
                "subMenu": null,
                "privilegeId": null
            },
            {
                "id": 12,
                "title": "Warranty Details",
                "image": "Warranty",
                "path": "Warranty",
                "subMenu": null,
                "privilegeId": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.IsBarcodeSubscribed = false;
        this.IsAutoNumbering = false;
    }
    OrphanObjectDataListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.enableMenu = [];
        var featureid = "";
        switch (contextObj.objectCategoryId) {
            case 1:
                featureid = "105,72";
                this.classname = "Asset Class";
                this.objectmultiplename = "Assets";
                this.modulename = "Assets";
                this.attributetitle = "Class Attributes";
                break;
            case 2:
                featureid = "107,73";
                // this.menuData[4].subMenu[2].title = "Warehouse";
                this.classname = "Furniture Class";
                this.objectmultiplename = "Furniture";
                this.modulename = "Furniture";
                this.attributetitle = "Class Attributes";
                break;
            case 3:
                featureid = "109,71";
                this.classname = "Object Class";
                this.objectmultiplename = "Objects";
                this.modulename = "Telecom";
                this.attributetitle = "Class Attributes";
                break;
            case 8:
                featureid = "113,92";
                // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Electrical";
                this.attributetitle = "Type Attributes";
                break;
            case 9:
                featureid = "115,100";
                //this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Fire and Safety";
                this.attributetitle = "Type Attributes";
                break;
            case 10:
                featureid = "229,130";
                // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Mechanical";
                this.attributetitle = "Type Attributes";
                break;
            case 11:
                featureid = "131,140";
                //  this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Plumbing";
                this.attributetitle = "Type Attributes";
                break;
            case 12:
                featureid = "141,150";
                // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Medical Gas";
                this.attributetitle = "Type Attributes";
                break;
            case 20:
                featureid = "151,228";
                //this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Equipment Type";
                this.objectmultiplename = "Equipment";
                this.modulename = "Security Assets";
                this.attributetitle = "Type Attributes";
                break;
        }
        contextObj.objectsService.getCustomerSubscribedFeaturesBarcode(featureid).subscribe(function (rt) {
            rt["Data"].find(function (item) {
                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                }
            });
        });
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            if (contextObj.sessionUserRoleId == 6) {
                contextObj.objectsService.getIsModuleAdmin(contextObj.moduleId).subscribe(function (resultData) {
                    if (resultData["Data"] == true) {
                        var callBack = function (data) {
                            contextObj.menuData = data;
                        };
                        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
                    }
                    else {
                        contextObj.enableMenu = [5, 9, 13, 12];
                    }
                });
            }
            else {
                var callBack = function (data) {
                    contextObj.menuData = data;
                };
                contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
            }
        });
    };
    OrphanObjectDataListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        var count = 0;
        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.fieldObjectGrid.find(function (item) {
                switch (item.ReportFieldId) {
                    case 4303:
                        if (contextObj.IsBarcodeSubscribed == true) {
                            if (item.IsVisible == true) {
                                item.IsVisible = true;
                            }
                            else {
                                item.IsVisible = false;
                            }
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        count++;
                        break;
                    case 651:
                        if (contextObj.IsAutoNumbering == false && item.FieldId == 1985) {
                            item.IsVisible = true;
                            count++;
                        }
                        if (contextObj.IsAutoNumbering == false && item.FieldId == 1605) {
                            item.IsVisible = false;
                            count++;
                        }
                }
                if (count == 3) {
                    return true;
                }
                else
                    return false;
            });
            contextObj.dataLoad('', 1);
        });
    };
    OrphanObjectDataListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        this.objectsService.getAdvnceSearchLookup(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                contextObj.advancelookup.find(function (item) {
                    if (item.ReportFieldId == 4303) {
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        return true;
                    }
                    else
                        return false;
                });
            }
        });
    };
    OrphanObjectDataListComponent.prototype.dataLoad = function (classIds, target) {
        debugger;
        var contextObj = this;
        if (this.orphanObjectcount) {
            if (this.orphanObjectcount > 0) {
                this.itemsSource = this.orphanObjectData;
                this.totalItems = this.orphanObjectcount;
                this.itemsPerPage = this.totalItems + 1;
                contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, classIds, this.drawingIds, '', true, 0, true, 1, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (result) {
                    console.log('objectdata', result);
                    contextObj.messages = result.ReturnMessages;
                    contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
                });
                this.changeEnableMenu(true);
            }
        }
    };
    OrphanObjectDataListComponent.prototype.changeEnableMenu = function (haveData) {
        if (haveData) {
            switch (this.dataOption) {
                case 1:
                    this.enableMenu = [3, 5, 9, 13, 12];
                    break;
            }
        }
        else {
            this.enableMenu = [];
        }
    };
    OrphanObjectDataListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 3:
                //this.pageTitle = "Delete";
                this.deleteClick();
                break;
            case 9:
                this.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 12:
                this.pageTitle = "Warranty Details";
                this.warranty();
                break;
            case 13:
                this.relinkObject();
                break;
        }
    };
    OrphanObjectDataListComponent.prototype.itemSelected = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
            return false;
        }
        return true;
    };
    OrphanObjectDataListComponent.prototype.showSelectaMessage = function (contextObj) {
        switch (contextObj.objectCategoryId) {
            case 1:
            case 3:
            case 20:
                contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName, 2);
                break;
            case 2:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName, 2);
                break;
        }
    };
    OrphanObjectDataListComponent.prototype.warranty = function () {
        this.secondaryTarget = 12;
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else if (this.inputItems.selectedIds.length == 1) {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
            else {
                this.showSelectaMessage(contextObj);
            }
        }
    };
    OrphanObjectDataListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        var deletecount;
        if (this.inputItems.selectedIds.length == 0) {
            this.showSelectaMessage(contextObj);
        }
        else {
            this.objectsService.IsObjectInuse(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (result) {
                deletecount = result["Data"];
                if (contextObj.itemSelected) {
                    if (contextObj.inputItems.selectedIds.length == 0) {
                        this.showSelectaMessage(contextObj);
                    }
                    else if (contextObj.inputItems.selectedIds.length > 1) {
                        contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    else {
                        if (deletecount == 0) {
                            contextObj.message = "Are you sure you want to delete the selected " + contextObj.objectCategoryName + "? ";
                        }
                        else {
                            contextObj.message = "Selected " + contextObj.objectCategoryName + " is used in Work Order module. Are you sure you want to delete from " + contextObj.modulename + " Module?";
                        }
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                }
            });
        }
    };
    OrphanObjectDataListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteObjec();
    };
    OrphanObjectDataListComponent.prototype.deleteObjec = function () {
        var contextObj = this;
        contextObj.objectsService.deleteObject(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId, contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Object cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    OrphanObjectDataListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    OrphanObjectDataListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    OrphanObjectDataListComponent.prototype.attachmentClick = function () {
        this.secondaryTarget = 9;
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length == 0) {
                this.showSelectaMessage(contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    };
    OrphanObjectDataListComponent.prototype.relinkObject = function () {
        var rowdata = [];
        if (this.inputItems.selectedIds.length == 0) {
            this.showSelectaMessage(this);
        }
        else if (this.inputItems.selectedIds.length == 1)
            rowdata.push(this.inputItems.rowData);
        else if (this.inputItems.selectedIds.length > 1)
            rowdata = this.inputItems.rowData;
        this.orphanHandleOut.emit(rowdata);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OrphanObjectDataListComponent.prototype, "isQuerybuilder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "buildarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "qResult", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "QueryCategryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "selectedClassIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "ChangePagepath", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "onSearchInDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OrphanObjectDataListComponent.prototype, "orphanHandleOut", void 0);
    OrphanObjectDataListComponent = __decorate([
        core_1.Component({
            selector: 'orphanobjectData-list',
            templateUrl: './app/Views/Objects/Data/orphanObjectData-List.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, attachments_component_1.AttachmentsComponent,
                search_component_1.searchBox, warranty_list_component_1.WarrantyListComponent],
            providers: [objects_service_1.ObjectsService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService],
            inputs: ["objectCategoryId", "dataOption", "drawingIds", "moduleId", "orphanObjectData", "orphanObjectcount"],
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService])
    ], OrphanObjectDataListComponent);
    return OrphanObjectDataListComponent;
}());
exports.OrphanObjectDataListComponent = OrphanObjectDataListComponent;
//# sourceMappingURL=orphanobjectdata-list.component.js.map