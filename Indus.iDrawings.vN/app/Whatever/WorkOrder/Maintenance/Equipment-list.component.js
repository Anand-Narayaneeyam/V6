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
var New_Equipment_component_1 = require('./New-Equipment.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var EquipmentListComponent = (function () {
    function EquipmentListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.selectedTab = 0;
        this.newEquipmentTab = false;
        this.pageIndex = 0;
        this.sortCol = "[Order]";
        this.sortDir = "ASC";
        this.success = "";
        this.selIds = new Array();
        this.cardButtonPrivilege = [false, false];
        //Form id : 242
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (242))
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 6129
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 6131
            },
            //for privilege
            {
                "id": 2,
                "title": "Edit",
                "image": null,
                "path": null,
                "submenu": null,
                "isvisible": false,
                "privilegeId": 6131
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 1];
        this.deleteIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Order', sortDir: 'ASC' };
    }
    EquipmentListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.workOrderService.getEquipmentColumnData().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.fieldRoute = resultData["Data"].find(function (el) { return el.ReportFieldId === 5628; });
            //if (changes["EquipmentData"]["currentValue"]) {
            //    console.log('EquipmentData', this.EquipmentData);
            //    console.log('selectedId', this.selectedId);
            //    contextObj.fieldRoute["FieldValue"] = changes["EquipmentData"]["currentValue"]["Route"];
            //}
            //for (let i = 0; i < resultData["Data"].length; i++) {
            var updatedData = new Array(); /*To notify the watcher about the change*/
            //resultData["Data"].splice(1, 2)
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fields = updatedData;
            contextObj.fields = contextObj.fields.slice(0, 5);
            //    break;
            //}
        });
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                if (contextObj.target != 2)
                    contextObj.notificationService.ShowToaster("No Equipment exists", 2);
            }
        });
        if (this.target == 2) {
            this.localselection = 1;
            contextObj.newEquipmentTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }
        //form id : 242***** PageId :2539
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2539, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2539, contextObj.administrationServices, contextObj.menuData.length);
    };
    EquipmentListComponent.prototype.getSelectedTab = function (event) {
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
    EquipmentListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.localselection = 1;
                contextObj.newEquipmentTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
        }
    };
    EquipmentListComponent.prototype.deleteEquipment = function (equipmentIds) {
        var contextObj = this;
        if (equipmentIds.length == 1) {
            this.workOrderService.checkEquipmentInUse(this.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
                if (resultData["Data"] == 0)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.notificationService.ShowToaster("Selected Equipment in use, cannot be deleted", 5);
            });
        }
        else if (equipmentIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select Equipment", 2);
        }
    };
    EquipmentListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 5633,
            Value: this.selectedId.toString()
        });
        this.showSlide = !this.showSlide;
        this.workOrderService.postEquipmentDelete(this.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == "1") {
                //let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                //contextObj.sourceData = retUpdatedSrc["itemSrc"];
                //contextObj.totalItems = retUpdatedSrc["itemCount"];
                //if (contextObj.totalItems == 0) {
                //    contextObj.enableMenu = [0];
                //}
                contextObj.notificationService.ShowToaster("Selected Equipment deleted", 3);
                contextObj.workOrderService.getEquipmentData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.enableMenu = [0];
                    }
                });
            }
        });
    };
    EquipmentListComponent.prototype.onDelete = function (e) {
        this.deleteEquipment(this.selIds);
    };
    EquipmentListComponent.prototype.onTabClose = function (event) {
        this.newEquipmentTab = false;
        this.selectedTab = event[0];
    };
    EquipmentListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    EquipmentListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    EquipmentListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newEquipmentTab = false;
            });
        }
    };
    EquipmentListComponent.prototype.onSorting = function (objGrid) {
        console.log('sorting');
        var contextObj = this;
        this.sortCol = objGrid.selectedField;
        this.sortDir = objGrid.sortDirection;
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    EquipmentListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    EquipmentListComponent = __decorate([
        core_1.Component({
            selector: 'Equipment-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Equipment-list.component.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox, tabs_component_1.TabsComponent, tab_component_1.TabComponent, New_Equipment_component_1.NewEquipmentComponent, grid_component_1.GridComponent],
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'equipmentId', 'entityName', 'target'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], EquipmentListComponent);
    return EquipmentListComponent;
}());
exports.EquipmentListComponent = EquipmentListComponent;
//# sourceMappingURL=Equipment-list.component.js.map