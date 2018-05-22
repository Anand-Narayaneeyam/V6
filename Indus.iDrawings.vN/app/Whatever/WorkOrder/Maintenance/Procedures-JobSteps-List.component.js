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
//import { JobCopyFromComponent } from './New-Equipment.component';
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var Procedures_JobSteps_AddEdit_component_1 = require('./Procedures-JobSteps-AddEdit.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldorder_common_component_1 = require('../../Common/Field Order/fieldorder-common.component');
var JobStepsListComponent = (function () {
    function JobStepsListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.ShowMenuOption = true;
        this.showSlide = false;
        this.position = "top-right";
        this.selectedTab = 0;
        this.addeditJobStepTab = false;
        this.pageIndex = 0;
        this.sortCol = "[Order]";
        this.sortDir = "ASC";
        this.success = "";
        this.selIds = new Array();
        this.cardButtonPrivilege = [false, false];
        //Form Id : 270
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (270))
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 6102
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 6102
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 6102
            },
            {
                "id": 4,
                "title": "Change Order",
                "image": "Change Order",
                "path": "Change Order",
                "submenu": null,
                "privilegeId": 6102
            }
        ];
        this.gridcount = 0;
        this.enableMenu = [];
        this.types = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Job Step]', sortDir: 'ASC' };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.showFieldOrder = false;
        this.rptFIdValues = [];
        this.selProcId = 0;
    }
    JobStepsListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        this.workOrderService.getJobStepsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            var updatedData = new Array(); /*To notify the watcher about the change*/
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fields = updatedData;
        });
        this.workOrderService.getJobStepsData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            debugger;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Job Steps exist", 2);
                contextObj.enableMenu = [0];
            }
            else if (contextObj.totalItems == 1) {
                contextObj.enableMenu = [0, 1, 2];
            }
            else if (contextObj.totalItems > 1) {
                contextObj.enableMenu = [0, 1, 2, 4];
            }
        });
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2544, contextObj.administrationServices, contextObj.menuData.length);
    };
    JobStepsListComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.addeditJobStepTab = false;
        }
    };
    JobStepsListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                if (this.inputItems.selectedIds.length == 1) {
                    contextObj.localselection = 1;
                    contextObj.addeditJobStepTab = true;
                    contextObj.action = "edit";
                    contextObj.btnName = "Save Changes";
                    contextObj.tabTitle = "Edit Job Step";
                    this.workOrderService.loadJobStepAddEdit(this.inputItems.selectedIds[0], 2, this.selectedId).subscribe(function (resultData) {
                        contextObj.fieldDetailsAdd1 = resultData["Data"];
                        setTimeout(function () { contextObj.selectedTab = 1; }, 50);
                    });
                }
                else if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.notificationService.ShowToaster("Select a Job Step", 2);
                }
                break;
            case 2:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
            case 0:
                //this.addJobSteps();
                contextObj.localselection = 1;
                contextObj.addeditJobStepTab = true;
                contextObj.action = "add";
                contextObj.btnName = "Save";
                contextObj.tabTitle = "New Job Step";
                this.workOrderService.loadJobStepAddEdit(0, 1, this.selectedId).subscribe(function (resultData) {
                    contextObj.fieldDetailsAdd1 = resultData["Data"];
                    setTimeout(function () { contextObj.selectedTab = 1; }, 50);
                });
                break;
            case 4:
                contextObj.changeFieldOrder();
                break;
        }
    };
    JobStepsListComponent.prototype.deleteEquipment = function (jobstepIds) {
        if (jobstepIds.length == 1) {
            this.showSlide = !this.showSlide;
        }
        else if (jobstepIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select a Job Step", 2);
        }
    };
    JobStepsListComponent.prototype.changeFieldOrder = function () {
        var context = this;
        context.splitviewInput.showSecondaryView = true;
        context.pageTitle = "Job Step Order";
        context.reportFieldSrc = [];
        for (var i = 0; i < context.sourceData.length; i++) {
            context.reportFieldSrc.push({ "Id": context.sourceData[i].Id, "PositionNo": context.sourceData[i]["Order"], "ColmnName": context.sourceData[i]["Job Step"] });
        }
        context.showFieldOrder = true;
        context.fieldOrderTitle = "Job Step";
        debugger;
    };
    JobStepsListComponent.prototype.handleCommonFieldOrderUpdate = function (event) {
        var context = this;
        context.rptFIdValues = [];
        context.selProcId = context.selectedId[0];
        for (var i = 0; i < event.rptFieldSrcIds.length; i++) {
            context.rptFIdValues.push({ "ReportFieldId": "5373", "Value": "" + event.rptFieldSrcIds[i] });
        }
        context.rptFIdValues.push({ "ReportFieldId": "1330", "Value": "" + context.selProcId });
        debugger;
        context.workOrderService.updateJobStepsOrder(JSON.stringify(context.rptFIdValues)).subscribe(function (resultData) {
            if (resultData.StatusId == 1) {
                context.notificationService.ShowToaster("Job Step Order updated", 3);
                context.sourceData = JSON.parse(resultData.Data);
                context.refreshgrid = context.refreshgrid.concat([true]);
                context.splitviewInput.showSecondaryView = false;
                if (context.sourceData.length == 0) {
                    context.enableMenu = [0];
                    context.notificationService.ShowToaster("No Job Steps exist", 2);
                }
                else if (context.sourceData.length == 1) {
                    context.enableMenu = [0, 1, 2];
                }
                else if (context.sourceData.length > 1) {
                    context.enableMenu = [0, 1, 2, 4];
                }
            }
            else {
                context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    JobStepsListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 1330,
            Value: this.selectedId.toString()
        });
        fieldobj.push({
            ReportFieldId: 5548,
            Value: this.inputItems.selectedIds[0].toString()
        });
        this.showSlide = !this.showSlide;
        this.workOrderService.postDeleteJobStepsDetails(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == "1") {
                contextObj.notificationService.ShowToaster("Selected Job Step deleted", 3);
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.sourceData = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                debugger;
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                else if (contextObj.totalItems == 1) {
                    contextObj.enableMenu = [0, 1, 2];
                }
                else if (contextObj.totalItems > 1) {
                    contextObj.enableMenu = [0, 1, 2, 4];
                }
                contextObj.workOrderService.getJobStepsData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No Job Steps exist", 2);
                        contextObj.enableMenu = [0];
                    }
                    else if (contextObj.totalItems == 1) {
                        contextObj.enableMenu = [0, 1, 2];
                    }
                    else if (contextObj.totalItems > 1) {
                        contextObj.enableMenu = [0, 1, 2, 4];
                    }
                });
                contextObj.workOrderService.getProceduresDataUpdateForGrid(contextObj.pageIndex, 'Procedure', 'ASC', contextObj.selectedId, '').subscribe(function (resultData) {
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                });
            }
        });
    };
    JobStepsListComponent.prototype.onDelete = function (e) {
        this.deleteEquipment(this.selIds);
    };
    JobStepsListComponent.prototype.onTabClose = function (event) {
        this.addeditJobStepTab = false;
        this.selectedTab = 0;
    };
    JobStepsListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    JobStepsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    JobStepsListComponent.prototype.onCardCancel = function (event) {
        this.enableMenu = [0];
    };
    JobStepsListComponent.prototype.submitReturn = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            this.deleteIndex = 0;
            if (this.localselection > 0) {
                this.deleteIndex = this.localselection;
                this.addeditJobStepTab = false;
            }
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                contextObj.sourceData = retUpdatedSrc["itemSrc"];
            }
            else {
                retUpdatedSrc = this.generFun.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            if (this.totalItems == 0) {
                contextObj.enableMenu = [0];
            }
            else if (this.totalItems == 1) {
                contextObj.enableMenu = [0, 1, 2];
            }
            else if (this.totalItems > 1) {
                contextObj.enableMenu = [0, 1, 2, 4];
            }
            //contextObj.sourceData = retUpdatedSrc["itemSrc"];
            this.workOrderService.getProceduresDataUpdateForGrid(this.pageIndex, 'Procedure', 'ASC', this.selectedId, '').subscribe(function (resultData) {
                contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
            });
        }
    };
    JobStepsListComponent.prototype.onSorting = function (objGrid) {
        var contextObj = this;
        this.sortCol = objGrid.selectedField;
        this.sortDir = objGrid.sortDirection;
        this.workOrderService.getJobStepsData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    JobStepsListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getJobStepsData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobStepsListComponent.prototype, "submitSuccess", void 0);
    JobStepsListComponent = __decorate([
        core_1.Component({
            selector: 'job-steps-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Procedures-JobSteps-List.component.html',
            directives: [split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, submenu_component_1.SubMenu,
                sort_component_1.Sorting, paging_component_1.PagingComponent, grid_component_1.GridComponent,
                field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent,
                notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox,
                tabs_component_1.TabsComponent, tab_component_1.TabComponent, Procedures_JobSteps_AddEdit_component_1.ProceduresJobStepsAddEditComponent, fieldorder_common_component_1.FieldOrderCommonComponent],
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'entityName', 'ShowMenuOption'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], JobStepsListComponent);
    return JobStepsListComponent;
}());
exports.JobStepsListComponent = JobStepsListComponent;
//# sourceMappingURL=Procedures-JobSteps-List.component.js.map