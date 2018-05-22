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
var UserRoleBasedSettingsComponent = (function () {
    function UserRoleBasedSettingsComponent(notificationService, objectsService, generFun, schedulingservice, administrationService) {
        this.notificationService = notificationService;
        this.objectsService = objectsService;
        this.generFun = generFun;
        this.schedulingservice = schedulingservice;
        this.administrationService = administrationService;
        this.splitviewequipmenttype = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.equipmenttypeMenuTotalItems = 0;
        this.inputItems = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: 'single' };
        this.refreshgrid = [];
        this.arrHighlightRowIds = [];
        this.menumock = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": null
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
    UserRoleBasedSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.schedulingservice.getUserRolebasedSettingsFields().subscribe(function (resultdata) {
            context.fieldObject = resultdata["Data"];
        });
        this.dataLoad();
    };
    UserRoleBasedSettingsComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewequipmenttype.showSecondaryView = false;
    };
    UserRoleBasedSettingsComponent.prototype.updateequipmenttypeMenu = function (event) {
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
    UserRoleBasedSettingsComponent.prototype.add = function () {
        this.splitViewTitle = "New User Role based Settings";
        this.target = 1;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save";
        this.schedulingservice.loadUserRolebasedSettings(this.inputItems.selectedIds, this.target).subscribe(function (result) {
            result["Data"].find(function (el) {
                if (el.FieldId == 2757) {
                    el.LookupDetails.LookupValues.splice(el.LookupDetails.LookupValues.findIndex(function (el) { return el.Id == 1; }), 1);
                    el.LookupDetails.LookupValues.splice(el.LookupDetails.LookupValues.findIndex(function (el) { return el.Id == 2; }), 1);
                    //el.LookupDetails.LookupValues.splice(el.LookupDetails.LookupValues.findIndex(function (el) { return el.Id == 3 }), 1);
                    el.LookupDetails.LookupValues.splice(el.LookupDetails.LookupValues.findIndex(function (el) { return el.Id == 8; }), 1);
                }
            });
            context.fieldDetailsSpaceEdit = result["Data"];
        });
    };
    UserRoleBasedSettingsComponent.prototype.edit = function () {
        this.splitViewTitle = " Edit User Role based Settings";
        this.target = 2;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save Changes";
        debugger;
        this.schedulingservice.loadUserRolebasedSettings(this.inputItems.selectedIds[0], this.target).subscribe(function (result) {
            result["Data"].find(function (el) {
                if (el.FieldId == 2757) {
                    el.IsEnabled = false;
                }
                if (el.FieldId == 2782) {
                    result["Data"].find(function (el1) {
                        if (el1.FieldId == 2757) {
                            if (el1.FieldValue == 4) {
                                el.IsEnabled = false;
                            }
                        }
                    });
                }
            });
            context.fieldDetailsSpaceEdit = result["Data"];
        });
    };
    UserRoleBasedSettingsComponent.prototype.delete = function () {
        var context = this;
        context.showSlide = true;
    };
    UserRoleBasedSettingsComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.schedulingservice.getUserRolebasedSettingsData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster('No User Role based Settings exist', 2);
                contextObj.enableaequipmenttypeMenu = [1];
            }
        });
    };
    UserRoleBasedSettingsComponent.prototype.onSort = function (event) {
        this.dataLoad();
    };
    UserRoleBasedSettingsComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    UserRoleBasedSettingsComponent.prototype.onSubmitData = function (event) {
        var pageDetails = event["fieldobject"];
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        var retUpdatedSrc;
        var contextObj = this;
        this.selectedId = this.inputItems.selectedIds[0];
        this.schedulingservice.SubmitUserRolebasedSettingsData(JSON.stringify(arr), this.selectedId, this.target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            var retData = { returnData: contextObj.success.Data };
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.target == 1) {
                        contextObj.notificationService.ShowToaster('User Role based Settings added', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "add", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    }
                    else {
                        contextObj.notificationService.ShowToaster('User Role based Settings updated', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    }
                    contextObj.splitviewequipmenttype.showSecondaryView = false;
                    break;
                case 3:
                    contextObj.notificationService.ShowToaster('User Role based Settings already exists', 5);
                    break;
            }
        });
    };
    UserRoleBasedSettingsComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        contextObj.schedulingservice.DeleteUserRolebasedSettings(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableaequipmenttypeMenu = [1];
                }
                contextObj.notificationService.ShowToaster('User Role based Settings deleted', 3);
            }
            else {
            }
        });
        this.showSlide = false;
        ;
    };
    UserRoleBasedSettingsComponent.prototype.cancelClick = function (event, index) {
        if (index == 1)
            this.showSlide = event.value;
    };
    UserRoleBasedSettingsComponent.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
    };
    UserRoleBasedSettingsComponent.prototype.ddlChange = function (event) {
        var Field = event.ddlRelationShipEvent.ChildFieldObject;
        if (Field.ReportFieldId == 12556) {
            var IsProxyResField = document.getElementById('2782');
            if (Field.FieldValue == 4) {
                IsProxyResField.disabled = true;
            }
            else {
                IsProxyResField.disabled = false;
            }
        }
    };
    UserRoleBasedSettingsComponent = __decorate([
        core_1.Component({
            selector: 'userrolebasedsettings',
            templateUrl: 'app/Views/Scheduling/General Settings/UserRoleBasedSettings.component.html',
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, scheduling_service_1.SchedulingService, objects_service_1.ObjectsService],
            inputs: [],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, notify_component_1.Notification, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, objects_service_1.ObjectsService, general_1.GeneralFunctions, scheduling_service_1.SchedulingService, administration_service_1.AdministrationService])
    ], UserRoleBasedSettingsComponent);
    return UserRoleBasedSettingsComponent;
}());
exports.UserRoleBasedSettingsComponent = UserRoleBasedSettingsComponent;
//# sourceMappingURL=UserRoleBasedSettings.component.js.map