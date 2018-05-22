var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component, OnInit, Input } from '@angular/core';
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var buildings_rennovations_addedit_component_1 = require('./buildings-rennovations-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var BuildingRennovationComponent = (function () {
    function BuildingRennovationComponent(realPropertyservice, notificationService, getData, administrationService) {
        this.realPropertyservice = realPropertyservice;
        this.notificationService = notificationService;
        this.getData = getData;
        this.administrationService = administrationService;
        this.types = true;
        this.pageIndex = 0;
        this.sortCol = "";
        this.sortDir = "ASC";
        this.success = "";
        this.selIds = new Array();
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 94
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 94
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 94
            }
        ];
        this.gridcount = 0;
        this.enableMenu = [0, 1, 2];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.submitSuccess = [];
        this.showSort = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pageTitle = "";
        this.fieldDetailsAdd1 = [];
    }
    BuildingRennovationComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.realPropertyservice.getRennovationFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fields = resultData["Data"];
            contextObj.getBuildingRennovationDetails();
        });
        var callBack = function (data) {
            contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (resultdata) {
                if (resultdata["Data"] == false) {
                    contextObj.menuData = data;
                }
            });
        };
        this.getData.GetPrivilegesOfPage(this.menuData, callBack, 34, this.administrationService, this.menuData.length);
    };
    BuildingRennovationComponent.prototype.getBuildingRennovationDetails = function () {
        var contextObj = this;
        this.realPropertyservice.getRennovationData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.buildingrennovationSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Renovations exist", 2);
            }
            else {
                contextObj.enableMenu = [0, 1, 2];
            }
        });
    };
    BuildingRennovationComponent.prototype.onSubMenuChange = function (event, Id) {
        if (event.value == 0) {
            this.onMenuAddClick();
        }
        else if (event.value == 1) {
            this.onMenuEditClick();
        }
        else if (event.value == 2) {
            this.onMenuDeleteClick();
        }
    };
    BuildingRennovationComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Renovation";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.realPropertyservice.getRenovationAddLoad().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var buildingId = contextObj.selectedId[0].toString();
            contextObj.fieldDetailsAdd1[3].FieldValue = buildingId;
        });
    };
    BuildingRennovationComponent.prototype.onMenuEditClick = function () {
        var contextObj = this;
        this.btnName = "Save Changes";
        this.action = "edit";
        this.pageTitle = "Edit Renovation";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.realPropertyservice.getRenovationAddLoad().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[1].ReadOnlyMode = true;
            var date = contextObj.inputItems.rowData["Renovation Date"];
            var cost = contextObj.inputItems.rowData["Cost"];
            var buildingId = contextObj.selectedId[0].toString();
            contextObj.fieldDetailsAdd1[3].FieldValue = buildingId;
            contextObj.fieldDetailsAdd1[1].FieldValue = date;
            contextObj.fieldDetailsAdd1[2].FieldValue = cost;
        });
    };
    BuildingRennovationComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var bcd = new Date(this.BuildingConstructionDate);
        if (event["dataKeyValue"]) {
            var fieldDetails = this.updateBuildingname(event.fieldObject);
            var field = new Array();
            field = JSON.parse(fieldDetails);
            field.push({
                ReportFieldId: 6695,
                Value: this.selectedId[0]
            });
            var date = new Date(field[0].Value);
            var year = date.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mon = monthNames[date.getMonth()];
            var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            field[0].Value = dd + " " + mon + " " + year;
            field.push({
                ReportFieldId: 271,
                Value: "30"
            });
            fieldDetails = JSON.stringify(field);
            this.realPropertyservice.postEditRennovationDetails(fieldDetails, 0).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Renovation updated", 3);
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    contextObj.showSort = true;
                }
                else {
                    contextObj.notificationService.ShowToaster("Renovation already exists", 5);
                    //contextObj.getBuildingRennovationDetails();
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
                }
                contextObj.changeEnableMenu();
            });
        }
        else {
            var fieldDetails = this.updateBuildingname(event.fieldObject);
            var field = new Array();
            field = JSON.parse(fieldDetails);
            field.push({
                ReportFieldId: 6695,
                Value: this.selectedId[0]
            });
            field.push({
                ReportFieldId: 271,
                Value: "30"
            });
            fieldDetails = JSON.stringify(field);
            var date = new Date(field[0].Value);
            if (bcd > date) {
                var year = bcd.getFullYear();
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var mon = monthNames[bcd.getMonth()];
                var dd = (bcd.getDate() < 10 ? '0' : '') + bcd.getDate();
                var bcd1 = dd + " " + mon + " " + year;
                contextObj.notificationService.ShowToaster("Renovation Date should be greater than Building Construction Date (" + bcd1 + ")", 2);
                contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
            }
            else {
                this.realPropertyservice.postAddRennovationDetails(fieldDetails).subscribe(function (resultData) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Renovation added", 3);
                        contextObj.types = false;
                        contextObj.buildingrennovationSource[contextObj.buildingrennovationSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.fields = contextObj.fields.filter(function (el) {
                            if (el.ReportFieldId == 6696) {
                                el.IsEnabled = false;
                            }
                            return true;
                        });
                        contextObj.getBuildingRennovationDetails();
                        contextObj.selIds = [];
                        contextObj.showSort = true;
                    }
                    else {
                        //contextObj.buildingrennovationSource.splice(contextObj.buildingrennovationSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Renovation already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
                    }
                    contextObj.changeEnableMenu();
                });
            }
        }
    };
    BuildingRennovationComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [0, 1, 2];
        if (contextObj.totalItems == 0) {
            contextObj.notificationService.ShowToaster("No Renovations exist", 2);
        }
    };
    //Delete----------------------------------------------------------------------
    BuildingRennovationComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select a Renovation", 2);
        }
    };
    BuildingRennovationComponent.prototype.onDelete = function (e) {
        var contextObj = this;
        this.onMenuDeleteClick();
    };
    BuildingRennovationComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.deleteBuildingRennovation();
        this.showSlide = !this.showSlide;
    };
    //-------------------------
    BuildingRennovationComponent.prototype.deleteBuildingRennovation = function () {
        var contextObj = this;
        this.realPropertyservice.postDeleteRennovationDetails(contextObj.selectedId[0], contextObj.inputItems.rowData["Renovation Date"]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (contextObj.success == "Success") {
                contextObj.notificationService.ShowToaster("Selected Renovation deleted", 3);
                contextObj.getBuildingRennovationDetails();
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Renovation in use, cannot be deleted", 5);
            }
        });
    };
    BuildingRennovationComponent.prototype.onCardCancelClick = function () {
        this.changeEnableMenu();
        this.fields = this.fields.filter(function (el) {
            if (el.ReportFieldId == 6696) {
                el.IsEnabled = false;
            }
            return true;
        });
        this.showSort = true;
    };
    BuildingRennovationComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    BuildingRennovationComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    BuildingRennovationComponent.prototype.updateBuildingname = function (fieldobject) {
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    };
    BuildingRennovationComponent.prototype.findData = function (fieldObjectArray) {
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6695) {
                item.Value = contextObject.selectedId[0];
            }
            if (item.ReportFieldId == 488) {
                //debugger;
                fieldObjectArray = fieldObjectArray.filter(function (item) {
                    return item.ReportFieldId !== 488;
                });
            }
        });
        return fieldObjectArray;
    };
    BuildingRennovationComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getBuildingRennovationDetails();
    };
    BuildingRennovationComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getBuildingRennovationDetails();
    };
    BuildingRennovationComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
        }
        else if (this.action == "edit") {
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.getBuildingRennovationDetails();
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    BuildingRennovationComponent = __decorate([
        core_1.Component({
            selector: 'buildings-rennovations',
            templateUrl: './app/Views/RealProperty/Buildings/buildings-rennovations.component.html',
            directives: [list_component_1.ListComponent, fieldGeneration_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, sort_component_1.Sorting, slide_component_1.SlideComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, buildings_rennovations_addedit_component_1.RenovationAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'BuildingName', 'BuildingConstructionDate']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], BuildingRennovationComponent);
    return BuildingRennovationComponent;
}());
exports.BuildingRennovationComponent = BuildingRennovationComponent;
//# sourceMappingURL=buildings-rennovations.component.js.map