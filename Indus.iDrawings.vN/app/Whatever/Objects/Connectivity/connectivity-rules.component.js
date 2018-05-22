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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var connectivity_rule_addedit_component_1 = require('./connectivity-rule-addedit.component');
var ConnectivityRules = (function () {
    function ConnectivityRules(objService, AdministrationService, notificationService, generFun) {
        this.objService = objService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.enableMenu = [];
        this.pageIndex = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pagePath = "";
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 250;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 5150
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 5150
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 5150
            }];
    }
    ConnectivityRules.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.objService.getConnectivityRulesListFields(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    ConnectivityRules.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.objService.getConnectivityRulesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Connectivity Rules exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ConnectivityRules.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ConnectivityRules.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ConnectivityRules.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New Connectivity Rule";
                this.action = "add";
                this.btnName = "Save";
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit Connectivity Rule";
                this.action = "edit";
                this.btnName = "Save Changes";
                this.editClick();
                break;
            case 3:
                this.action = "delete";
                this.deleteClick();
                break;
        }
    };
    ConnectivityRules.prototype.addClick = function () {
        var contextObj = this;
        contextObj.objService.loadConectivityRulesFieldsAddEditForRelationship(0, 1, contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.getLookupForComponnetType(result["Data"], contextObj);
            //contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
            //    result["Data"].filter(function (el) {
            //        if (el.FieldId == 2605) {
            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //            el.FieldValue = "-1";
            //            return true
            //        }
            //        else if (el.FieldId == 2607) {
            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //            el.FieldValue = "-1";
            //            return true
            //        } else {
            //            return false;
            //        }
            //    });
            //    contextObj.fieldDetailsAddEdit = (result["Data"]);
            //});
            //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ConnectivityRules.prototype.editClick = function () {
        var contextObj = this;
        contextObj.objService.CheckRelationshipRuleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1) {
                contextObj.notificationService.ShowToaster("Selected Connectivity Rule in use, cannot be updated.", 2);
            }
            else if (resultData == 0) {
                if (contextObj.inputItems.selectedIds.length == 0) {
                    contextObj.notificationService.ShowToaster("Select a Connectivity Rule", 2);
                }
                else if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else if (contextObj.inputItems.selectedIds.length == 1) {
                    if (contextObj.inputItems.selectedIds[0] != null) {
                        contextObj.objService.loadConectivityRulesFieldsAddEditForRelationship(contextObj.inputItems.selectedIds[0], 2, contextObj.objectCategoryId).subscribe(function (result) {
                            contextObj.getLookupForComponnetType(result["Data"], contextObj);
                            //contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
                            //    result["Data"].filter(function (el)
                            //    {
                            //        if (el.FieldId == 2605) {                                       
                            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            //            return true
                            //        }
                            //        else if (el.FieldId == 2607) {                                        
                            //            el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            //            return true
                            //        }
                            //        else {
                            //            return false;
                            //        }
                            //    }); 
                            //    contextObj.fieldDetailsAddEdit = result["Data"];          
                            //});
                        });
                    }
                }
            }
        });
    };
    ConnectivityRules.prototype.getLookupForComponnetType = function (data, contextObj) {
        contextObj.objService.getLookupsForFirstSecondComponentType(contextObj.objectCategoryId, 1, 0).subscribe(function (resultData) {
            var compTypeData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            data.filter(function (el) {
                if (el.FieldId == 2605 || el.FieldId == 2607) {
                    el.LookupDetails.LookupValues = compTypeData;
                    if (contextObj.action == "add")
                        el.FieldValue = "-1";
                    return true;
                }
                else {
                    return false;
                }
            });
            contextObj.fieldDetailsAddEdit = data;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ConnectivityRules.prototype.deleteClick = function () {
        var contextObj = this;
        contextObj.objService.CheckRelationshipRuleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1) {
                contextObj.showSlide = true;
                contextObj.slideMessage = "Selected Connectivity Rule in use. Are you sure you want to delete the selected Connectivity Rule?";
            }
            else if (resultData == 0) {
                contextObj.showSlide = true;
                contextObj.slideMessage = "Are you sure you want to delete the selected Connectivity Rule?";
            }
        });
    };
    ConnectivityRules.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ConnectivityRules.prototype.onSplitViewClose = function (event) {
        if (this.action == "multipleedit") {
            this.dataLoad();
        }
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    };
    ConnectivityRules.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteConnectivityRule();
    };
    ConnectivityRules.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ConnectivityRules.prototype.deleteConnectivityRule = function () {
        var contextObj = this;
        contextObj.objService.DeleteConnectivityRule(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems > 0) {
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Connectivity Rules exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Connectivity Rule deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Connectivity Rule in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    ConnectivityRules.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ConnectivityRules = __decorate([
        core_1.Component({
            selector: 'connectivity-rules',
            templateUrl: './app/Views/Objects/Connectivity/connectivity-rules.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, connectivity_rule_addedit_component_1.ConnectivityRuleAddEdit],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, objects_service_1.ObjectsService],
            inputs: ["objectCategoryId"]
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ConnectivityRules);
    return ConnectivityRules;
}());
exports.ConnectivityRules = ConnectivityRules;
//# sourceMappingURL=connectivity-rules.component.js.map