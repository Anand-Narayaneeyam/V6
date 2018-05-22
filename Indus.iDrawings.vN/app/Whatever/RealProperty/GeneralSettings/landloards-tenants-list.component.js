var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import {Component, AfterViewInit} from '@angular/core';
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
//importing addedit component
var landloards_tenants_addedit_component_1 = require('./landloards-tenants-addedit.component');
var LandlordsComponent = (function () {
    function LandlordsComponent(realPropertyService, notificationService, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.pageTitle = "";
        //for input category id from the section landloards or tenants
        this.categorytype = 0;
        //passing category id as integer
        this.category = 0;
        //To show proper message: we need category name : landloards or tenants
        this.categoryname = "Landlord ";
        this.types = true;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    LandlordsComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.realPropertyService.getClientsColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            //console.log(result["Data"]);
            if (contextObj.categorytype == 1) {
                //DB field is Landlord Name: Change the list header to landlord name
                contextObj.fieldObject[1].FieldLabel = "Landlord Name";
                contextObj.category = 1;
                //For showing messages
                contextObj.categoryname = "Landlord";
            }
            else {
                contextObj.fieldObject[1].FieldLabel = "Tenant Name";
                contextObj.category = 2;
                contextObj.categoryname = "Tenant";
            }
            contextObj.dataLoad(1);
        });
    };
    LandlordsComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    LandlordsComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    //Adding extra parameters for loading
    LandlordsComponent.prototype.dataLoad = function (target) {
        // debugger;  
        var contextObj = this;
        contextObj.realPropertyService.getClientsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.categorytype).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No " + contextObj.categoryname + "s exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    LandlordsComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    //While clicking add icon
    LandlordsComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        contextObj.pageTitle = contextObj.categorytype == 1 ? "New Landlord" : "New Tenant";
        this.realPropertyService.loadClientsAddEdit(0, 1, contextObj.categorytype).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.updateLabel();
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    //While clicking edit icon
    LandlordsComponent.prototype.editClick = function () {
        debugger;
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a " + contextObj.categoryname, 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            console.log("editid", this.inputItems.selectedIds[0]);
            contextObj.pageTitle = contextObj.categorytype == 1 ? "Edit Landlord" : "Edit Tenant";
            this.realPropertyService.loadClientsAddEdit(this.inputItems.selectedIds[0], 2, contextObj.categorytype).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.updateLabel();
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    LandlordsComponent.prototype.updateLabel = function () {
        var contextObj = this;
        if (contextObj.categorytype == 1) {
            //DB field is Landlord Name: Change the list header to landlord name
            contextObj.fieldDetailsAdd1[1].FieldLabel = "Landlord Name";
            contextObj.category = 1;
            //For showing messages
            contextObj.categoryname = "Landlord";
        }
        else {
            contextObj.fieldDetailsAdd1[1].FieldLabel = "Tenant Name";
            contextObj.category = 2;
            contextObj.categoryname = "Tenant";
        }
    };
    //While clicking delete icon
    LandlordsComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a " + contextObj.categoryname, 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var contextObj = this;
            contextObj.realPropertyService.isClientInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname + " in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    LandlordsComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.enableMenu = [1, 2, 3];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        }
        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    //slide events/////
    LandlordsComponent.prototype.okDelete = function (event) {
        this.deleteClients();
        this.showSlide = !this.showSlide;
    };
    LandlordsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    LandlordsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    LandlordsComponent.prototype.deleteClients = function () {
        var contextObj = this;
        contextObj.realPropertyService.deleteClients(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname + " deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname + " in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    LandlordsComponent.prototype.updateclientcategory = function (fieldobject) {
        debugger;
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    };
    LandlordsComponent.prototype.findData = function (fieldObjectArray) {
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6140) {
                item.Value = contextObject.categorytype;
            }
        });
        return fieldObjectArray;
    };
    LandlordsComponent = __decorate([
        core_1.Component({
            selector: 'landlord-list',
            templateUrl: './app/Views/RealProperty/GeneralSettings/landloards-tenants-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, checkboxcomponent_component_1.CustomCheckBoxComponent, slide_component_1.SlideComponent, landloards_tenants_addedit_component_1.LandlordsTenantsAddEditComponent],
            providers: [realproperty_service_1.RealPropertyService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['categorytype'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], LandlordsComponent);
    return LandlordsComponent;
}());
exports.LandlordsComponent = LandlordsComponent;
//# sourceMappingURL=landloards-tenants-list.component.js.map