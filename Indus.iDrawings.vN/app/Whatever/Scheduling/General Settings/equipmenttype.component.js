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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var general_1 = require('../../../models/common/general');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var objects_service_1 = require('../../../models/objects/objects.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var EquipmentTypeComponent = (function () {
    function EquipmentTypeComponent(notificationService, objectsService, generFun, schedulingservice, administrationService) {
        this.notificationService = notificationService;
        this.objectsService = objectsService;
        this.generFun = generFun;
        this.schedulingservice = schedulingservice;
        this.administrationService = administrationService;
        this.splitviewequipmenttype = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.equipmenttypeMenuTotalItems = 0;
        this.inputItems = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Equipment Type]', sortDir: 'ASC', selectioMode: 'single' };
        this.refreshgrid = [];
        this.arrHighlightRowIds = [];
        this.menumock = [
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
                "privilegeId": 921
            }
        ];
        this.pageIndex = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.target = 0;
        this.position = "top-right";
        this.showSlide = false;
        var contextObj = this;
        //this.equipmenttypeMenu = this.menumock;
        this.enableaequipmenttypeMenu = [1, 2, 3];
        var callBack = function (data) {
            contextObj.equipmenttypeMenu = data;
        };
        this.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 204, contextObj.administrationService, contextObj.menumock.length);
    }
    EquipmentTypeComponent.prototype.ngOnInit = function () {
        var context = this;
        this.schedulingservice.getEquipmentTypeFields().subscribe(function (resultdata) {
            context.fieldObject = resultdata["Data"];
        });
        this.dataLoad();
    };
    EquipmentTypeComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewequipmenttype.showSecondaryView = false;
    };
    EquipmentTypeComponent.prototype.updateequipmenttypeMenu = function (event) {
        switch (event.value) {
            case 1:
                this.add();
                break;
            case 2:
                this.edit();
                break;
            case 3:
                this.delete();
                break;
        }
    };
    EquipmentTypeComponent.prototype.add = function () {
        this.splitViewTitle = "New Equipment Type";
        this.target = 1;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save";
        this.schedulingservice.loadAddEditEquipmentType(this.inputItems.selectedIds, this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"];
        });
    };
    EquipmentTypeComponent.prototype.edit = function () {
        this.splitViewTitle = " Edit Equipment Type";
        this.target = 2;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save Changes";
        this.schedulingservice.loadAddEditEquipmentType(this.inputItems.selectedIds[0], this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"];
        });
    };
    EquipmentTypeComponent.prototype.delete = function () {
        var context = this;
        //if the equipment type has been reserved, currently delete functionality is being blocked
        this.schedulingservice.CheckTypeInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1)
                context.notificationService.ShowToaster('Selected Equipment Type is in use, cannot be deleted', 2);
            else
                context.showSlide = true;
        });
    };
    EquipmentTypeComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.schedulingservice.getEquipmentTypeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, 1).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster('No Equipment Types exist', 2);
                contextObj.enableaequipmenttypeMenu = [1];
            }
        });
        /* this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir,1).subscribe(function (resultData) {
             //contextObj.messages = resultData["Data"].ReturnMessages;
             //contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
             //contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"];
             contextObj.totalItems = resultData["Data"].DataCount;
             if (contextObj.totalItems > 0) {
                 contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                 contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                 contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
             }
             else {
                 contextObj.notificationService.ShowToaster('No data exists', 2)
                 contextObj.enableaequipmenttypeMenu = [1];
             }
         });*/
    };
    EquipmentTypeComponent.prototype.onSort = function (event) {
        this.dataLoad();
    };
    EquipmentTypeComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    EquipmentTypeComponent.prototype.onSubmitData = function (event) {
        var pageDetails = event["fieldobject"];
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        arr.push({ ReportFieldId: 283, Value: "1" }, { ReportFieldId: 649, Value: "1" }, { ReportFieldId: 651, Value: "" }, { ReportFieldId: 4485, Value: "39" });
        var retUpdatedSrc;
        var contextObj = this;
        this.selectedId = this.inputItems.selectedIds[0];
        this.schedulingservice.postSubmitObjectClass(JSON.stringify(arr), this.selectedId, this.target, 1).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            var retData = { returnData: contextObj.success.Data };
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (contextObj.target == 1) {
                        contextObj.notificationService.ShowToaster('Equipment Type added', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "add", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    }
                    else {
                        contextObj.notificationService.ShowToaster('Equipment Type updated', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    }
                    contextObj.splitviewequipmenttype.showSecondaryView = false;
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster('Equipment Type already exists', 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster('Equipment types Already Exist', 5);
                    }
                    break;
            }
        });
    };
    EquipmentTypeComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        contextObj.schedulingservice.postDeleteObjectClass(contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableaequipmenttypeMenu = [1];
                }
                contextObj.notificationService.ShowToaster('Equipment Type deleted', 3);
            }
            else {
            }
        });
        this.showSlide = false;
        ;
    };
    EquipmentTypeComponent.prototype.cancelClick = function (event, index) {
        if (index == 1)
            this.showSlide = event.value;
    };
    EquipmentTypeComponent.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
    };
    EquipmentTypeComponent = __decorate([
        core_1.Component({
            selector: 'equipment-type',
            templateUrl: 'app/Views/Scheduling/General Settings/equipmenttype.component.html',
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, scheduling_service_1.SchedulingService, objects_service_1.ObjectsService],
            inputs: [],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, notify_component_1.Notification, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, objects_service_1.ObjectsService, general_1.GeneralFunctions, scheduling_service_1.SchedulingService, administration_service_1.AdministrationService])
    ], EquipmentTypeComponent);
    return EquipmentTypeComponent;
}());
exports.EquipmentTypeComponent = EquipmentTypeComponent;
//# sourceMappingURL=equipmenttype.component.js.map