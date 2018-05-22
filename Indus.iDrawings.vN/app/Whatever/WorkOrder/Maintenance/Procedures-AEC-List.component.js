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
var Procedures_newAEC_component_1 = require('./Procedures-newAEC.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var ProceduresAECListComponent = (function () {
    function ProceduresAECListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
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
        this.cardButtonPrivilege = [false, false];
        //Form Id : 267
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (267))
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 6096
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 6097
            },
            //For privilege
            {
                "id": 2,
                "title": "Edit",
                "image": null,
                "path": null,
                "submenu": null,
                "isvisible": false,
                "privilegeId": 6097
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [1, 3];
        this.submitSuccess1 = new core_1.EventEmitter();
        this.types = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Equipment Class]', sortDir: 'ASC', selectioMode: "single" };
    }
    ProceduresAECListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.workOrderService.getProcedureAECField().subscribe(function (resultData) {
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
        //form id : 267***** PageId :2533
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2533, contextObj.administrationServices, contextObj.menuData.length);
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2533, contextObj.administrationServices, contextObj.menuData.length);
    };
    ProceduresAECListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.workOrderService.getProcedureAssociateEquipmentClassData(contextObj.selectedId, contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.gridcount = contextObj.totalItems;
            if (contextObj.totalItems == 0) {
                if (contextObj.target != 2)
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.enableMenu = [1];
            }
            if (contextObj.target == 2) {
                contextObj.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                contextObj.tabchange = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
            }
        });
    };
    ProceduresAECListComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        var contextObj = this;
        if (this.selectedTab == 0) {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "hidden";
                event[2].children[0].children[1].children[1].style.visibility = "hidden";
            }
            contextObj.tabchange = false;
        }
        else {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "visible";
                event[2].children[0].children[1].children[1].style.visibility = "visible";
            }
        }
    };
    ProceduresAECListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                contextObj.tabchange = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 3:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
        }
    };
    ProceduresAECListComponent.prototype.deleteEquipment = function (equipmentIds) {
        var contextObj = this;
        this.workOrderService.checkProcedureInUse(contextObj.selectedId).subscribe(function (returnCheck) {
            if (returnCheck["Data"] == 1)
                contextObj.notificationService.ShowToaster("Selected Equipment Class in use, cannot be deleted", 5);
            else if (equipmentIds.length > 0)
                contextObj.showSlide = !contextObj.showSlide;
            else
                this.notificationService.ShowToaster("Select an Equipment Class", 2);
        });
    };
    ProceduresAECListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 5510,
            Value: this.selectedId.toString()
        });
        for (var c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 5511,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        var test = JSON.stringify(fieldobj);
        this.workOrderService.postProcedureAssociateEquipmentDelete(JSON.stringify(fieldobj), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Equipment Class deleted", 3);
                contextObj.submitSuccess1.emit({ status: "success" });
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
    ProceduresAECListComponent.prototype.onDelete = function (e) {
        this.deleteEquipment(this.selIds);
    };
    ProceduresAECListComponent.prototype.onTabClose = function (event) {
        this.newAssociateEquipmentTab = false;
        this.tabchange = false;
        this.selectedTab = event[0];
    };
    ProceduresAECListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    ProceduresAECListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    ProceduresAECListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.workOrderService.getProcedureAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.sortCol, this.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.enableMenu = [1, 3];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.submitSuccess1.emit({ status: "success" });
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newAssociateEquipmentTab = false;
                contextObj.tabchange = false;
            });
        }
    };
    ProceduresAECListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.workOrderService.getProcedureAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    ProceduresAECListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getProcedureAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProceduresAECListComponent.prototype, "submitSuccess1", void 0);
    ProceduresAECListComponent = __decorate([
        core_1.Component({
            selector: 'procedure-AEC-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Procedures-AEC-List.component.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox, tabs_component_1.TabsComponent, tab_component_1.TabComponent, Procedures_newAEC_component_1.NewProcedureAssociateEquipmentComponent, grid_component_1.GridComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'entityName', 'target'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ProceduresAECListComponent);
    return ProceduresAECListComponent;
}());
exports.ProceduresAECListComponent = ProceduresAECListComponent;
//# sourceMappingURL=Procedures-AEC-List.component.js.map