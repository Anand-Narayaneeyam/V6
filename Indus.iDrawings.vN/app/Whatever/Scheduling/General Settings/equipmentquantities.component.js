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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var objects_service_1 = require('../../../models/objects/objects.service');
var EquipmentQuantityComponent = (function () {
    function EquipmentQuantityComponent(notificationService, objectservice, generFun, schedulingservice, administrationService) {
        this.notificationService = notificationService;
        this.objectservice = objectservice;
        this.generFun = generFun;
        this.schedulingservice = schedulingservice;
        this.administrationService = administrationService;
        this.splitviewequipmentquantity = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.equipmentquantityMenuTotalItems = 0;
        this.inputItems = {
            dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Id]', sortDir: 'ASC', isautosizecolms: true, selectioMode: 'single'
        };
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
        //this.equipmentquantityMenu = this.menumock;
        this.enableaequipmentquantityMenu = [1, 2, 3];
        var callBack = function (data) {
            contextObj.equipmentquantityMenu = data;
        };
        this.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 204, contextObj.administrationService, contextObj.menumock.length);
    }
    EquipmentQuantityComponent.prototype.ngOnInit = function () {
        var context = this;
        this.schedulingservice.getEquipmentQuantityFields().subscribe(function (resultdata) {
            context.fieldObject = resultdata["Data"];
            var descwidth = context.fieldObject.find(function (item) { return item.ReportFieldId === 12375; });
            descwidth.Width = "0.5*";
        });
        this.dataLoad();
    };
    EquipmentQuantityComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewequipmentquantity.showSecondaryView = false;
    };
    EquipmentQuantityComponent.prototype.updateequipmentquantityMenu = function (event) {
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
    EquipmentQuantityComponent.prototype.add = function () {
        this.splitViewTitle = "New Equipment Quantity";
        this.target = 1;
        var context = this;
        this.splitviewequipmentquantity.showSecondaryView = true;
        this.btnName = "Save";
        this.schedulingservice.loadAddEditEquipmentQuantity(this.inputItems.selectedIds, this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"];
            context.fieldDetailsSpaceEdit.find(function (item) {
                switch (item.ReportFieldId) {
                    case 12375:
                        item.IsEnabled = true;
                        return true;
                }
            });
            var equipmenttype = context.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12377; });
            context.objectservice.getObjectClassSelectionLookups(1, '', 1, 1, 0).subscribe(function (resultData) {
                equipmenttype.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]); //equipmentType                     
            });
        });
    };
    EquipmentQuantityComponent.prototype.edit = function () {
        this.splitViewTitle = "Edit Equipment Quantity";
        var count = 0;
        this.target = 2;
        var context = this;
        this.btnName = "Save Changes";
        /*
        Edit functionality in this page is currently blocked with a notification message, like delete functionality
        */
        //this.schedulingservice.CheckQuantityInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
        //    if (resultData == 1)
        //        context.notificationService.ShowToaster('Selected Equipment is in use, cannot be edited', 2)
        //    else {
        context.splitviewequipmentquantity.showSecondaryView = true;
        context.schedulingservice.loadAddEditEquipmentQuantity(context.inputItems.selectedIds, context.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"];
            context.fieldDetailsSpaceEdit.find(function (item) {
                switch (item.ReportFieldId) {
                    case 12378:
                        item.IsEnabled = false;
                        count++;
                        break;
                    case 12379:
                        item.IsEnabled = false;
                        count++;
                        break;
                    case 12377:
                        item.IsEnabled = false;
                        count++;
                        break;
                }
                if (count == 3)
                    return true;
                else
                    return false;
            });
            var equipmenttype = context.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12377; });
            context.objectservice.getObjectClassSelectionLookups(1, '', 1, 1, 0).subscribe(function (resultData) {
                equipmenttype.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]); //equipmentType                     
            });
            //});
            //}
        });
    };
    EquipmentQuantityComponent.prototype.delete = function () {
        var context = this;
        /*as of now delete functionality is not implemented. the menu is lifted. Later delete functionality can be
         implemented with in use check and deletion would be blocked if it has active registrations
        If so the qn is whether all the entries with respect to the quanity would be deleted from class statistics page(edited entries)
        */
        this.schedulingservice.CheckQuantityInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1)
                context.notificationService.ShowToaster('Selected Equipment is in use, cannot be deleted', 2);
            else
                context.showSlide = true;
        });
    };
    EquipmentQuantityComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.schedulingservice.getEquipmentQuantityData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableaequipmentquantityMenu = [1, 2, 3];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster('No Equipment Quantities exist', 2);
                contextObj.enableaequipmentquantityMenu = [1];
            }
        });
    };
    EquipmentQuantityComponent.prototype.onSort = function (event) {
        this.dataLoad();
    };
    EquipmentQuantityComponent.prototype.onPageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.dataLoad();
    };
    ;
    EquipmentQuantityComponent.prototype.onSubmitData = function (event) {
        var pageDetails = event["fieldobject"];
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        var retUpdatedSrc;
        var contextObj = this;
        this.selectedId = this.inputItems.selectedIds[0];
        this.schedulingservice.postSubmitQuantity(JSON.stringify(arr), this.selectedId, this.target, 1).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            var retData = { returnData: contextObj.success.Data };
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (contextObj.target == 1) {
                        contextObj.notificationService.ShowToaster('Equipment added for the selected Site', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "add", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj.enableaequipmentquantityMenu = [1, 2, 3];
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    }
                    else {
                        contextObj.notificationService.ShowToaster('Equipment Quantity updated for the selected Site', 3);
                        //retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj.dataLoad();
                    }
                    contextObj.splitviewequipmentquantity.showSecondaryView = false;
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        if (contextObj.target == 1)
                            contextObj.notificationService.ShowToaster('Equipment of this Equipment Type already exists for the selected Site', 2);
                        else
                            contextObj.notificationService.ShowToaster('Selected Equipment is already in use, Quantity should not be less than the current value', 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster('Equipment types Already Exist', 5);
                    }
                    break;
            }
        });
    };
    EquipmentQuantityComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        if (fieldid > 0) {
            if (parentFieldId == 2491) {
                this.schedulingservice.loadBuildingSchedule(fieldid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 2492) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 2492) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                    }
                });
            }
            else if (parentFieldId == 2493) {
                this.schedulingservice.loaddescription(fieldid, parentFieldId).subscribe(function (resultData) {
                    console.log(resultData);
                    var desc = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12375; });
                    desc.FieldValue = resultData["Data"]["LookupValues"][0]["Value"];
                });
            }
        }
    };
    EquipmentQuantityComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        contextObj.schedulingservice.postDeleteQuantity(contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableaequipmentquantityMenu = [1];
                }
                contextObj.notificationService.ShowToaster('Equipment deleted for the selected Site', 3);
            }
            else {
            }
        });
        this.showSlide = false;
        ;
    };
    EquipmentQuantityComponent.prototype.cancelClick = function (event, index) {
        if (index == 1)
            this.showSlide = event.value;
    };
    EquipmentQuantityComponent.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
    };
    EquipmentQuantityComponent = __decorate([
        core_1.Component({
            selector: 'equipment-quantity',
            templateUrl: 'app/Views/Scheduling/General Settings/equipmentquantities.component.html',
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, objects_service_1.ObjectsService, scheduling_service_1.SchedulingService],
            inputs: [],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, notify_component_1.Notification, fieldGeneration_component_1.FieldComponent, slide_component_1.SlideComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, objects_service_1.ObjectsService, general_1.GeneralFunctions, scheduling_service_1.SchedulingService, administration_service_1.AdministrationService])
    ], EquipmentQuantityComponent);
    return EquipmentQuantityComponent;
}());
exports.EquipmentQuantityComponent = EquipmentQuantityComponent;
//# sourceMappingURL=equipmentquantities.component.js.map