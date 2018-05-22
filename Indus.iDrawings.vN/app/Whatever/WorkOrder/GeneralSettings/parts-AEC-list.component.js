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
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var parts_newAEC_component_1 = require('./parts-newAEC.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var PartsAECListComponent = (function () {
    function PartsAECListComponent(workOrderService, notificationService, generFun) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.selectedTab = 0;
        this.newAssociateEquipmentTab = false;
        this.pageIndex = 0;
        this.sortCol = "[Equipment Class]";
        this.sortDir = "ASC";
        this.success = "";
        this.selIds = new Array();
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 1];
        this.types = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Equipment Class]', sortDir: 'ASC', selectioMode: "single" };
    }
    PartsAECListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.workOrderService.getAECField().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                resultData.Data[i]["Width"] = 200;
            }
            contextObj.fields = resultData["Data"];
        });
        this.deleteIndex = 0;
        if (this.localselection > 0) {
            this.deleteIndex = this.localselection;
            this.newAssociateEquipmentTab = false;
        }
        contextObj.dataLoad();
    };
    PartsAECListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.workOrderService.getAssociateEquipmentClassData(contextObj.selectedId, contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.gridcount = contextObj.totalItems;
            if (contextObj.totalItems == 0) {
                if (contextObj.target != 2)
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.enableMenu = [0];
            }
            if (contextObj.target == 2) {
                contextObj.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
            }
        });
    };
    PartsAECListComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        var contextObj = this;
        if (this.selectedTab == 0) {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "hidden";
                event[2].children[0].children[1].children[1].style.visibility = "hidden";
            }
        }
        else {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "visible";
                event[2].children[0].children[1].children[1].style.visibility = "visible";
            }
        }
    };
    PartsAECListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
        }
    };
    PartsAECListComponent.prototype.deleteEquipment = function (equipmentIds) {
        if (equipmentIds.length > 0) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select an Equipment Class", 2);
        }
    };
    PartsAECListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 12252,
            Value: this.selectedId.toString()
        });
        for (var c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 12251,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        var test = JSON.stringify(fieldobj);
        this.workOrderService.postAssociateEquipmentDelete(JSON.stringify(fieldobj), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Equipment Class deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Equipment Class in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    PartsAECListComponent.prototype.onDelete = function (e) {
        this.deleteEquipment(this.inputItems.selectedIds);
    };
    PartsAECListComponent.prototype.onTabClose = function (event) {
        this.newAssociateEquipmentTab = false;
        this.selectedTab = event[0];
    };
    PartsAECListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    PartsAECListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    PartsAECListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.sortCol, this.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.enableMenu = [0, 1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newAssociateEquipmentTab = false;
            });
        }
    };
    PartsAECListComponent.prototype.onSort = function (objGrid) {
        console.log('sorting');
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    PartsAECListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    PartsAECListComponent = __decorate([
        core_1.Component({
            selector: 'parts-AEC-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/parts-AEC-list.component.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox, tabs_component_1.TabsComponent, tab_component_1.TabComponent, parts_newAEC_component_1.NewAssociateEquipmentComponent, grid_component_1.GridComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['selectedId', 'entityName', 'target'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PartsAECListComponent);
    return PartsAECListComponent;
}());
exports.PartsAECListComponent = PartsAECListComponent;
//# sourceMappingURL=parts-AEC-list.component.js.map