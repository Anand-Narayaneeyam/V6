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
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var General_1 = require('../../../Models/Common/General');
var workflowoutcomes_addedit_1 = require('./workflowoutcomes-addedit');
var WorkflowOutcomeComponent = (function () {
    function WorkflowOutcomeComponent(workFlowService, notificationService, generFun) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.target = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
        this.workflowEntityCategoryId = 0;
        this.success = "";
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
            }
        ];
        this.gridcount = 8;
        this.types = false;
        this.enableMenu = [];
        this.outcomeCount = new core_1.EventEmitter();
    }
    WorkflowOutcomeComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    WorkflowOutcomeComponent.prototype.ngOnChanges = function (changes) {
    };
    WorkflowOutcomeComponent.prototype.loadData = function () {
        var contextObj = this;
        contextObj.workFlowService.getWorkflowOutcomeFields().subscribe(function (resultData) {
            contextObj.fieldWorkType = resultData["Data"].find(function (el) { return el.ReportFieldId === 5876; });
            contextObj.fieldActionPoint = resultData["Data"].find(function (el) { return el.ReportFieldId === 5800; });
            if (contextObj.workflowData) {
                contextObj.fieldWorkType["FieldValue"] = contextObj.workflowData["Work Type"];
                contextObj.fieldActionPoint["FieldValue"] = contextObj.workflowData["Action Point"];
            }
            var removeArr = [5876, 5800];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            contextObj.workFlowService.getWorkflowOutcomeData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.selectedId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
                if (contextObj.gridcount > 0) {
                    contextObj.enableMenu = [0, 1, 2];
                }
                else {
                    contextObj.enableMenu = [0];
                }
            });
        });
    };
    WorkflowOutcomeComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.defaultOutcomeId = this.inputItems.rowData["OutcomeTypeId"];
                if (this.defaultOutcomeId == 28) {
                    this.notificationService.ShowToaster("Outcome Type 'Timed Out' cannot be deleted", 2);
                }
                else {
                    this.deleteClick();
                }
                break;
        }
    };
    WorkflowOutcomeComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkflowOutcomeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    WorkflowOutcomeComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.workFlowService.getWorkflowOutcomeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    WorkflowOutcomeComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Outcome";
        var contextObj = this;
        contextObj.notificationRecipientsDetails = [];
        this.workFlowService.loadWorkflowOutcomeAdd(this.workFlowCategoryId, this.moduleId, this.workTypeId, this.selectedId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.moduleId != 9)
                contextObj.hideNotificationFields(contextObj.fieldDetailsAddEdit);
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    WorkflowOutcomeComponent.prototype.hideNotificationFields = function (fieldDetailsAddEdit) {
        var contextObj = this;
        var notifyRequester = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        });
        notifyRequester.IsVisible = false;
        notifyRequester.IsMandatory = false;
        var chkBoxNotification = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2813;
        });
        chkBoxNotification.IsVisible = false;
        chkBoxNotification.IsMandatory = false;
        var ddlMessageTemplate = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2814;
        });
        ddlMessageTemplate.IsVisible = false;
        ddlMessageTemplate.IsMandatory = false;
        var chkBoxRepeatReminder = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2815;
        });
        chkBoxRepeatReminder.IsVisible = false;
        chkBoxRepeatReminder.IsMandatory = false;
        var txtEveryDays = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2816;
        });
        txtEveryDays.IsVisible = false;
        txtEveryDays.IsMandatory = false;
        var dylstBxRecipients = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2817;
        });
        dylstBxRecipients.IsVisible = false;
        dylstBxRecipients.IsMandatory = false;
    };
    WorkflowOutcomeComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Outcome";
        var contextObj = this;
        this.outcomeTypeId = this.inputItems.rowData["OutcomeTypeId"];
        this.EntityName = this.inputItems.rowData["Workflow Entity"];
        this.workflowEntityCategoryId = this.inputItems.rowData["EntityCategoryId"];
        this.nextWorkFlowActionPointId = this.inputItems.rowData["NextWorkFlowActionPointId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workFlowService.loadWorkflowOutcomeEdit(this.inputItems.selectedIds[0], this.actionPointId, this.actionPointTypeId, this.workFlowCategoryId, this.moduleId, this.selectedId, this.outcomeTypeId, this.workflowEntityCategoryId, this.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                if (contextObj.moduleId != 9)
                    contextObj.hideNotificationFields(contextObj.fieldDetailsAddEdit);
                var _loop_1 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1080:
                            if (contextObj.workflowEntityCategoryId == 2) {
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            }
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;
                        case 1082:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            break;
                        case 1083:
                            notifyRequester = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1086;
                            });
                            outcome = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1082;
                            });
                            if (contextObj.EntityName == "Service Requests") {
                                if (contextObj.outcomeTypeId == "2" || contextObj.outcomeTypeId == "18" || contextObj.outcomeTypeId == "7" || contextObj.outcomeTypeId == "8" || contextObj.outcomeTypeId == "9" || contextObj.outcomeTypeId == "11" || contextObj.outcomeTypeId == "16" || this_1.outcomeTypeId == "21" || contextObj.outcomeTypeId == "23" || contextObj.outcomeTypeId == "19") {
                                    notifyRequester.IsEnabled = false;
                                    notifyRequester.IsVisible = true;
                                    if (contextObj.outcomeTypeId == "18") {
                                        outcome.IsEnabled = false;
                                    }
                                }
                                else {
                                    notifyRequester.IsEnabled = true;
                                    notifyRequester.IsVisible = true;
                                }
                            }
                            else if (contextObj.EntityName == "PM Work Orders") {
                                notifyRequester.IsEnabled = false;
                                notifyRequester.IsVisible = false;
                            }
                            contextObj.updateNotifyRequesterField(notifyRequester);
                            if (contextObj.outcomeTypeId == "30" || contextObj.outcomeTypeId == "6" || contextObj.outcomeTypeId == "7" || contextObj.outcomeTypeId == "8" || contextObj.outcomeTypeId == "9" || contextObj.outcomeTypeId == "11" || contextObj.outcomeTypeId == "14" || contextObj.outcomeTypeId == "15" || contextObj.outcomeTypeId == "16" || contextObj.outcomeTypeId == "21" || contextObj.outcomeTypeId == "23") {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            }
                            else {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            }
                            if (contextObj.outcomeTypeId == "28") {
                                if (contextObj.moduleId != 9 && contextObj.moduleId != 4) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["HasValidationError"] = false;
                                    break;
                                }
                                ddlUser = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 1171;
                                });
                                arrList = new Array();
                                arrList.push({
                                    ReportFieldId: 5837,
                                    Value: contextObj.outcomeTypeId
                                }, {
                                    ReportFieldId: 5832,
                                    Value: contextObj.workTypeId
                                }, {
                                    ReportFieldId: 6570,
                                    Value: contextObj.workflowEntityCategoryId
                                });
                                contextObj.workFlowService.loadNextActionPointDetails(50570, JSON.stringify(arrList)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.userLookUpDetails = JSON.parse(resultData["Data"]);
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        var actionPointDetails = contextObj.userLookUpDetails.find(function (item) {
                                            return item.Id === parseInt(contextObj.fieldDetailsAddEdit[i].FieldValue);
                                        });
                                    }
                                    if (actionPointDetails.IsSpecificUser == 1) {
                                        contextObj.workFlowService.loadUser(actionPointDetails.ActionPointId, 1083, contextObj.moduleId, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                                            if (resultData["Data"]["LookupValues"] != "") {
                                                ddlUser.IsMandatory = true;
                                                ddlUser.HasValidationError = true;
                                                ddlUser.IsLocallyValidated = false;
                                                ddlUser.IsEnabled = true;
                                                ddlUser.IsVisible = true;
                                                ddlUser.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                var userLookUp = ddlUser.LookupDetails.LookupValues;
                                                for (var i = 0; i < userLookUp.length; i++) {
                                                    if (userLookUp[i]["IsChecked"] == 1) {
                                                        ddlUser.FieldValue = userLookUp[i]["Id"].toString();
                                                        break;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            if (contextObj.outcomeTypeId == "28" && contextObj.EntityName == "PM Work Orders") {
                                notifyRequester.IsEnabled = false;
                                notifyRequester.IsVisible = false;
                            }
                            break;
                        case 2813:
                            if (contextObj.moduleId == 9) {
                                ddlMessageTemplate = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2814;
                                });
                                chkBxRepeatReminder = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2815;
                                });
                                txtBxEveryDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2816;
                                });
                                dyLstBxRecipients = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2817;
                                });
                                if (contextObj.workflowEntityCategoryId) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                }
                                isEnable = contextObj.fieldDetailsAddEdit[i].FieldValue == "Yes";
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = isEnable.toString();
                                ddlMessageTemplate.IsEnabled = isEnable;
                                ddlMessageTemplate.IsMandatory = isEnable;
                                arrMessageTemplate = new Array();
                                arrMessageTemplate.push({
                                    ReportFieldId: 6557,
                                    Value: contextObj.workflowEntityCategoryId
                                });
                                contextObj.workFlowService.loadMessageTemplateforOutcome(51200, JSON.stringify(arrMessageTemplate)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    }
                                });
                                chkBxRepeatReminder.IsEnabled = isEnable;
                                chkBxRepeatReminder.IsVisible = true;
                                if (chkBxRepeatReminder.FieldValue == "true") {
                                    txtBxEveryDays.IsEnabled = true;
                                    txtBxEveryDays.IsVisible = true;
                                    txtBxEveryDays.IsMandatory = true;
                                    txtBxEveryDays.HasValidationError = true;
                                    txtBxEveryDays.IsLocallyValidated = false;
                                    daystoRepeatReminder = contextObj.inputItems.rowData["Days to Repeat Reminder"];
                                    txtBxEveryDays.FieldValue = daystoRepeatReminder;
                                }
                                else if (chkBxRepeatReminder.FieldValue == "false") {
                                    txtBxEveryDays.IsEnabled = false;
                                    txtBxEveryDays.IsVisible = true;
                                    txtBxEveryDays.FieldValue = "";
                                }
                                dyLstBxRecipients.IsEnabled = isEnable;
                                dyLstBxRecipients.IsVisible = true;
                                dyLstBxRecipients.IsMandatory = isEnable;
                                dyLstBxRecipients.HasValidationError = isEnable;
                                dyLstBxRecipients.IsLocallyValidated = false;
                            }
                            break;
                        case 2817:
                            if (contextObj.moduleId == 9) {
                                arrRecipients = new Array();
                                arrRecipients.push({
                                    ReportFieldId: 5834,
                                    Value: contextObj.inputItems.selectedIds[0]
                                });
                                contextObj.workFlowService.loadNotificationRecipients(51203, JSON.stringify(arrRecipients)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        contextObj.notificationRecipientsDetails = JSON.parse(resultData["Data"]);
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                    else {
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                });
                            }
                            if (contextObj.moduleId != 9)
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            break;
                    }
                    if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 5840) {
                        if (contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"]["length"] == 0) {
                            contextObj.fieldDetailsAddEdit[i].FieldValue = "-1";
                        }
                    }
                };
                var this_1 = this;
                var notifyRequester, outcome, ddlUser, arrList, ddlMessageTemplate, chkBxRepeatReminder, txtBxEveryDays, dyLstBxRecipients, isEnable, arrMessageTemplate, daystoRepeatReminder, arrRecipients;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_1(i);
                }
            });
        }
    };
    WorkflowOutcomeComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    WorkflowOutcomeComponent.prototype.deleteWorkFlow = function () {
        var contextObj = this;
        this.EntityName = this.inputItems.rowData["Workflow Entity"];
        this.workFlowService.postDeleteWorkflowOutcomes(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Outcome deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Outcome cannot be deleted", 5);
            }
        });
    };
    WorkflowOutcomeComponent.prototype.OnSuccessfulSubmit = function (event) {
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            }
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    WorkflowOutcomeComponent.prototype.updateNotifyRequesterField = function (field) {
        switch (this.workFlowCategoryId) {
            case 6:
                field.IsVisible = false;
                field.IsMandatory = false;
            case 8: /*Scheduling*/
            case 17:
                field.IsVisible = false;
                field.FieldValue = "false";
                break;
            default:
                field.IsVisible = true;
                break;
        }
    };
    WorkflowOutcomeComponent.prototype.inlineDelete = function (event) {
        this.deleteWorkFlow();
    };
    WorkflowOutcomeComponent.prototype.okDelete = function (event) {
        this.deleteWorkFlow();
        this.showSlide = !this.showSlide;
    };
    WorkflowOutcomeComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    WorkflowOutcomeComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkflowOutcomeComponent.prototype, "outcomeCount", void 0);
    WorkflowOutcomeComponent = __decorate([
        core_1.Component({
            selector: 'workflow-outcomes',
            templateUrl: './app/Views/Common/Set Workflow/workflow-outcomesList.html',
            directives: [split_view_component_1.SplitViewComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, slide_component_1.SlideComponent, workflowoutcomes_addedit_1.WorkflowOutcomeAddEditComponent],
            providers: [workflow_service_1.WorkFlowService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'workflowData', 'workTypeId', 'workFlowCategoryId', 'moduleId', 'actionPointTypeId', 'actionPointId', 'isChanged']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], WorkflowOutcomeComponent);
    return WorkflowOutcomeComponent;
}());
exports.WorkflowOutcomeComponent = WorkflowOutcomeComponent;
//# sourceMappingURL=workflow-outcomesList.js.map