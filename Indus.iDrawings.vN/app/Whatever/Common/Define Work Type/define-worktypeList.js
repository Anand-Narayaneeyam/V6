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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var define_worktypeaddedit_1 = require('./define-worktypeaddedit');
var set_notification_1 = require('./set-notification');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var DefineWorkTypeComponent = (function () {
    function DefineWorkTypeComponent(generFun, schedulingService, workFlowService, notificationService, validateService, administrationService) {
        this.generFun = generFun;
        this.schedulingService = schedulingService;
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.administrationService = administrationService;
        this.showSlide = false;
        this.position = "top-right";
        this.moduleId = 0;
        this.workFlowCategoryId = 0;
        this.isGeneral = false;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isSiteAdmin = true;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: "ASC", sortCol: "" };
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
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Notifications",
                "image": "Notifications",
                "path": "Notifications",
                "submenu": null
            }
        ];
        this.enableMenu = [];
    }
    DefineWorkTypeComponent.prototype.ngOnInit = function () {
        this.btnName = "Add";
        var contextObj = this;
        contextObj.administrationService.CheckIsSiteLevelAdmin(contextObj.moduleId).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        this.schedulingService.getFieldsList().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
        });
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.changeEnableMenu();
            }
            else {
                contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                contextObj.changeEnableMenu();
            }
        });
    };
    DefineWorkTypeComponent.prototype.changeEnableMenu = function () {
        switch (this.workFlowCategoryId) {
            case 1:
                this.enableMenu = this.totalItems > 0 ? [0, 1, 2, 3] : [0];
                break;
            case 8:
                this.enableMenu = this.totalItems == 0 ? [0] : (this.totalItems == 1 ? [1, 2] : [2]);
                break;
            default:
                this.enableMenu = this.totalItems > 0 ? [0, 1, 2] : [0];
                break;
        }
    };
    DefineWorkTypeComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    DefineWorkTypeComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    DefineWorkTypeComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.target = 1;
                this.addClick();
                break;
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.target = 2;
                this.notificationsClick();
                break;
        }
    };
    DefineWorkTypeComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Work Type";
        var contextObj = this;
        this.schedulingService.loadDefineWorkTypesAddEdit(0, 1, 0, this.moduleId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var workFlowCategory = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1001; });
            if (workFlowCategory.LookupDetails.LookupValues.length == 1) {
                workFlowCategory.FieldValue = workFlowCategory.LookupDetails.LookupValues[0].Id.toString();
                contextObj.loadWorkFlowEntityLookups();
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    DefineWorkTypeComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Work Type";
        var contextObj = this;
        this.isGeneral = this.inputItems.rowData["IsGeneral"];
        this.isWorkFlowExists = this.inputItems.rowData["IsWorkflowExists"];
        console.log("isGeneral", this.isGeneral);
        console.log("isWorkFlowExists", this.isWorkFlowExists);
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.loadDefineWorkTypesAddEdit(this.inputItems.selectedIds[0], 2, this.inputItems.rowData["WorkflowCategoryId"], this.moduleId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1001) {
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                    }
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1937) {
                        if (contextObj.isWorkFlowExists == 1 || contextObj.moduleId == 4) {
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                        }
                    }
                }
                contextObj.loadWorkFlowEntityLookups();
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    DefineWorkTypeComponent.prototype.loadWorkFlowEntityLookups = function () {
        var contextObj = this;
        var workFlowCategory = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1001; });
        contextObj.schedulingService.loadWorkFlowEntityLookups(workFlowCategory.FieldValue, workFlowCategory.FieldId, contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                var workFlowEntity = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1937; });
                workFlowEntity.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (workFlowEntity.LookupDetails.LookupValues.length == 1) {
                    workFlowEntity.MultiFieldValues = [workFlowEntity.LookupDetails.LookupValues[0].Id.toString()];
                }
            }
        });
    };
    DefineWorkTypeComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.checkWorkTypeInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (inUse) {
                if (inUse["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Work Type in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    DefineWorkTypeComponent.prototype.deleteWorkTypes = function () {
        var contextObj = this;
        this.schedulingService.postDeleteDefineWorkType(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.changeEnableMenu();
                    contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                }
                contextObj.notificationService.ShowToaster("Selected Work Type deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    DefineWorkTypeComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.changeEnableMenu();
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    DefineWorkTypeComponent.prototype.notificationsClick = function () {
        this.action = "setNotification";
        this.btnName = "Save Changes";
        this.pageTitle = "Set Notification";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("Select a Work Type", 2);
        }
        else {
            this.workFlowService.loadSetNotification(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsSetNotification = resultData["Data"];
                var _loop_1 = function(i) {
                    switch (contextObj.fieldDetailsSetNotification[i].FieldId) {
                        case 2801:
                            arrList = new Array();
                            arrList.push({
                                ReportFieldId: 5873,
                                Value: contextObj.inputItems.selectedIds[0]
                            });
                            contextObj.workFlowService.loadActionPoint(51182, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.actionPointDetails = JSON.parse(resultData["Data"]);
                                    contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    if (contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues.length == 1) {
                                        contextObj.fieldDetailsSetNotification[i].HasValidationError = false;
                                        contextObj.fieldDetailsSetNotification[i].FieldValue = contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues[0].Id.toString();
                                        contextObj.initiateValidation(contextObj.fieldDetailsSetNotification[i].FieldId, contextObj.fieldDetailsSetNotification[i]);
                                        var ddlOutcome = contextObj.fieldDetailsSetNotification.find(function (item) {
                                            return item.FieldId === 2802;
                                        });
                                        contextObj.workFlowService.loadOutcome(contextObj.fieldDetailsSetNotification[i].FieldValue, 2801).subscribe(function (resultData) {
                                            if (resultData["Data"]["LookupValues"].length == 1) {
                                                ddlOutcome.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                ddlOutcome.FieldValue = ddlOutcome.LookupDetails.LookupValues[0].Id.toString();
                                                ddlOutcome.HasValidationError = false;
                                                contextObj.initiateValidation(ddlOutcome.FieldId, ddlOutcome);
                                            }
                                            var ddlMessageTemplate = contextObj.fieldDetailsSetNotification.find(function (item) {
                                                return item.FieldId === 2803;
                                            });
                                            var dyLstBxRecipients = contextObj.fieldDetailsSetNotification.find(function (item) {
                                                return item.FieldId === 2804;
                                            });
                                            ddlMessageTemplate.IsMandatory = true;
                                            ddlMessageTemplate.HasValidationError = true;
                                            ddlMessageTemplate.IsLocallyValidated = false;
                                            contextObj.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                                            var actionPoint = contextObj.actionPointDetails.find(function (item) {
                                                return item.Id === +contextObj.fieldDetailsSetNotification[i].FieldValue;
                                            });
                                            contextObj.entityCategoryId = actionPoint.EntityCategoryId;
                                            if (contextObj.entityCategoryId == 1) {
                                                contextObj.messageTemplateCategoryId = 1;
                                            }
                                            else if (contextObj.entityCategoryId == 3) {
                                                contextObj.messageTemplateCategoryId = 11;
                                            }
                                            var arrList1 = new Array();
                                            arrList1.push({
                                                ReportFieldId: 5472,
                                                Value: contextObj.messageTemplateCategoryId
                                            });
                                            contextObj.workFlowService.loadMessageTemplate(50783, JSON.stringify(arrList1)).subscribe(function (resultData) {
                                                if (resultData["Data"] != "[]") {
                                                    ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                                    var arrMessageTemplate = new Array();
                                                    arrMessageTemplate.push({
                                                        ReportFieldId: 5834,
                                                        Value: ddlOutcome.FieldValue
                                                    });
                                                    contextObj.workFlowService.loadMessageTemplate(51211, JSON.stringify(arrMessageTemplate)).subscribe(function (resultData) {
                                                        if (resultData["Data"] != "[]") {
                                                            //ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                                            ddlMessageTemplate.FieldValue = JSON.parse(resultData["Data"])[0].Id.toString();
                                                            contextObj.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                                                        }
                                                        var arrRecipients = new Array();
                                                        arrRecipients.push({
                                                            ReportFieldId: 5834,
                                                            Value: ddlOutcome.FieldValue
                                                        });
                                                        contextObj.workFlowService.loadNotificationRecipientsInWotkType(51203, JSON.stringify(arrRecipients)).subscribe(function (resultData) {
                                                            if (resultData["Data"] != "[]") {
                                                                dyLstBxRecipients.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                                            }
                                                        });
                                                        arrRecipients = [];
                                                    });
                                                    arrMessageTemplate = [];
                                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                                }
                                            });
                                            arrList1 = [];
                                        });
                                    }
                                    else {
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                }
                            });
                            arrList = [];
                            break;
                    }
                };
                var arrList;
                for (var i = 0; i < contextObj.fieldDetailsSetNotification.length; i++) {
                    _loop_1(i);
                }
                //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    DefineWorkTypeComponent.prototype.initiateValidation = function (id, fieldObject) {
        var contextObj = this;
        var el = document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    };
    DefineWorkTypeComponent.prototype.inlineDelete = function (event) {
        this.deleteWorkTypes();
    };
    DefineWorkTypeComponent.prototype.okDelete = function (event) {
        this.deleteWorkTypes();
        this.showSlide = !this.showSlide;
    };
    DefineWorkTypeComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DefineWorkTypeComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DefineWorkTypeComponent.prototype.getRecipientsList = function (event) {
        return event["RecipientsList"];
    };
    DefineWorkTypeComponent = __decorate([
        core_1.Component({
            selector: 'define-workType',
            templateUrl: './app/Views/Common/Define Work Type/define-worktypeList.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent, define_worktypeaddedit_1.DefineWorkTypeAddEditComponent, set_notification_1.SetNotificationComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, workflow_service_1.WorkFlowService, validation_service_1.ValidateService],
            inputs: ['moduleId', 'workFlowCategoryId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, scheduling_service_1.SchedulingService, workflow_service_1.WorkFlowService, notify_service_1.NotificationService, validation_service_1.ValidateService, administration_service_1.AdministrationService])
    ], DefineWorkTypeComponent);
    return DefineWorkTypeComponent;
}());
exports.DefineWorkTypeComponent = DefineWorkTypeComponent;
//# sourceMappingURL=define-worktypeList.js.map