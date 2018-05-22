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
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var General_1 = require('../../../Models/Common/General');
var setworkflow_addedit_1 = require('./setworkflow-addedit');
var workflow_settings_1 = require('./workflow-settings');
var workflow_outcomesList_1 = require('./workflow-outcomesList');
var administration_service_1 = require('../../../models/administration/administration.service');
var copy_workflow_1 = require('./copy-workflow');
var workflow_EscalationNotificationsList_1 = require('../Set Workflow/workflow-EscalationNotificationsList');
var SetWorkflowComponent = (function () {
    function SetWorkflowComponent(generFun, workFlowService, notificationService, administrationService) {
        this.generFun = generFun;
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.showSlide = false;
        this.showWorkflowSlide = false;
        this.position = "top-right";
        this.moduleId = 0;
        this.workFlowCategoryId = 0;
        this.workTypeId = 0;
        this.actionPointNumber = 0;
        this.actionPointTypeId = 0;
        this.actionPointId = 0;
        this.isGeneral = false;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.target = 0;
        this.isChanged = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
        this.menumock = [];
        this.openWorkflow = new core_1.EventEmitter();
        this.isSiteAdmin = false;
    }
    SetWorkflowComponent.prototype.ngOnInit = function () {
        this.btnName = "Add";
        var contextObj = this;
        contextObj.loadMenuData();
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 2437, contextObj.administrationService, contextObj.menumock.length);
        this.enableMenu = [];
        this.alignContent = "horizontal";
        this.loadFieldList(this.workTypeId);
        contextObj.administrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
    };
    SetWorkflowComponent.prototype.loadFieldList = function (worktypeId) {
        var contextObj = this;
        this.workFlowService.getFieldsList(this.moduleId, 0).subscribe(function (resultData) {
            contextObj.ddlWorkType = resultData["Data"].find(function (el) { return el.ReportFieldId === 5832; });
            var removeArr = [5832];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            if (contextObj.ddlWorkType.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Work Types exist", 2);
            }
            else if (contextObj.ddlWorkType.LookupDetails.LookupValues.length == 1) {
                var workTypeId = contextObj.ddlWorkType.LookupDetails.LookupValues[0].Id;
                contextObj.ddlWorkType.FieldValue = workTypeId.toString();
                contextObj.onChangeWorkType(workTypeId);
            }
            else if (worktypeId > 0) {
                contextObj.ddlWorkType.FieldValue = worktypeId.toString();
                contextObj.onChangeWorkType(worktypeId);
            }
        });
    };
    SetWorkflowComponent.prototype.onSplitViewClose = function (event) {
        if (this.target == 3) {
            this.onChangeWorkType(this.workTypeId);
        }
    };
    SetWorkflowComponent.prototype.onChangeWorkType = function (event) {
        var contextObj = this;
        this.workTypeId = event;
        if (this.workTypeId > -1) {
            this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    if (contextObj.isSiteAdmin)
                        contextObj.enableMenu = [3, 5, 7];
                    else
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                    contextObj.enableMenu = [0, 5];
                    contextObj.itemsSource = [];
                }
            });
        }
        else {
            contextObj.enableMenu = [];
            contextObj.itemsSource = [];
        }
    };
    SetWorkflowComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    //public onSort(objGrid: any) {
    //    var contextObj = this;
    //    this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
    //        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
    //        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
    //        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
    //    });
    //}
    SetWorkflowComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                contextObj.target = 1;
                if (this.isGeneral == false) {
                    this.editClick();
                }
                else {
                    this.notificationService.ShowToaster("Static Action Point cannot be edited", 2);
                }
                break;
            case 2:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                if (this.isGeneral == false) {
                    this.deleteClick();
                }
                else {
                    this.notificationService.ShowToaster("Static Action Point cannot be deleted", 2);
                }
                break;
            case 3:
                contextObj.target = 2;
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                this.workflowSettingsMenuClick();
                break;
            case 4:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                contextObj.target = 3;
                if (this.isGeneral == false) {
                    this.outcomesMenuClick();
                }
                else {
                    this.notificationService.ShowToaster("Outcomes cannot be set for static Action Point", 2);
                }
                break;
            case 5:
                var workTypeName = this.ddlWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id == contextObj.workTypeId; }).Value;
                this.openWorkflow.emit({ Id: this.workTypeId, Value: workTypeName });
                break;
            case 6:
                contextObj.target = 4;
                this.copyWorkflow();
                break;
            case 7:
                contextObj.target = 5;
                this.workflowEscalationNotifications();
                break;
        }
    };
    SetWorkflowComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Action Point";
        var contextObj = this;
        this.workFlowService.loadWorkFlowAddEdit(0, 1, this.workFlowCategoryId, this.moduleId, this.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var workflowEntity = contextObj.fieldDetailsAddEdit.find(function (el) { return el.FieldId === 1000; });
            var lookups = workflowEntity["LookupDetails"]["LookupValues"];
            if (lookups.length == 1) {
                workflowEntity.MultiFieldValues = [lookups[0]["Id"].toString()];
                workflowEntity.IsEnabled = false;
            }
            contextObj.isChanged = false;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    SetWorkflowComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Action Point";
        this.outcomeCount = this.inputItems.rowData["Outcome Count"];
        this.incomeOutcomeCount = this.inputItems.rowData["Incomming Outcome Count"];
        this.entityCategoryCount = this.inputItems.rowData["EntityCategory Count"];
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workFlowService.loadWorkFlowAddEdit(this.inputItems.selectedIds[0], 2, this.workFlowCategoryId, this.moduleId, this.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1000) {
                        if (contextObj.outcomeCount > contextObj.entityCategoryCount || contextObj.incomeOutcomeCount > 0) {
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                        }
                        var lookups = contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"];
                        if (lookups.length == 1) {
                            contextObj.fieldDetailsAddEdit[i].MultiFieldValues = [lookups[0]["Id"].toString()];
                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                        }
                    }
                }
                contextObj.isChanged = false;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    SetWorkflowComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workFlowService.isEditableWorkflow(contextObj.workTypeId, contextObj.inputItems.selectedIds[0]).subscribe(function (isEditable) {
                if (isEditable["Data"] == true) {
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.showWorkflowSlide = !contextObj.showWorkflowSlide;
                }
            });
        }
    };
    SetWorkflowComponent.prototype.deleteWorkFlow = function () {
        var contextObj = this;
        this.actionPointNumber = this.inputItems.rowData["Action Point Number"];
        this.workFlowService.postDeleteWorkFlow(this.workTypeId, this.actionPointNumber, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.workFlowService.getWorkFlowList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.workTypeId).subscribe(function (resultData) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = resultData["Data"].DataCount;
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0, 5];
                        contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                    }
                });
                contextObj.notificationService.ShowToaster("Selected Action Point deleted", 3);
            }
            else if (resultData["Data"].StatusId = -1)
                contextObj.notificationService.ShowToaster("Action Point is in use", 2);
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    SetWorkflowComponent.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            else if (this.action == "copy") {
                var newWorkTypeId = event["NewWorkTypeId"];
                this.ddlWorkType.FieldValue = newWorkTypeId;
                this.loadFieldList(newWorkTypeId);
                this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, newWorkTypeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                    }
                });
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    SetWorkflowComponent.prototype.inlineDelete = function (event) {
        this.deleteWorkFlow();
    };
    SetWorkflowComponent.prototype.okDelete = function (event) {
        this.deleteWorkFlow();
        this.showSlide = !this.showSlide;
    };
    SetWorkflowComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    SetWorkflowComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
        this.showWorkflowSlide = false;
    };
    SetWorkflowComponent.prototype.okWorkflowClick = function (event) {
        this.deleteWorkFlow();
        this.showWorkflowSlide = false;
    };
    SetWorkflowComponent.prototype.cancelWorkflowClick = function (value) {
        this.showWorkflowSlide = false;
    };
    SetWorkflowComponent.prototype.outcomesMenuClick = function () {
        this.pageTitle = "Set Outcomes for Action Point";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow", 2);
        }
        else {
            this.actionPointTypeId = this.inputItems.rowData["ActionPointTypeId"];
            this.actionPointId = this.inputItems.rowData["ActionPointId"];
            this.splitviewInput.showSecondaryView = true;
        }
    };
    //onUpdateOutcomeCount(event: any) {
    //    debugger    
    //    this.itemsSource.find(function (item) {
    //        if (item.Id == event.workflowActionPointId) {
    //            item["Outcome Count"] = event.outcomeCount.toString();
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    });
    //    var updatedData = new Array();/*To notify the watcher about the change*/
    //    updatedData = updatedData.concat(this.itemsSource);
    //    this.itemsSource = updatedData;
    //}
    SetWorkflowComponent.prototype.workflowSettingsMenuClick = function () {
        this.pageTitle = "Workflow Settings";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow", 2);
        }
        else {
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    SetWorkflowComponent.prototype.copyWorkflow = function () {
        var contextObj = this;
        this.action = "copy";
        this.btnName = "Save";
        this.pageTitle = "New Workflow";
        this.workTypeName = this.inputItems.rowData["Work Type"];
        this.workFlowService.loadCloneWorkflow().subscribe(function (resultData) {
            contextObj.fieldDetailsCloneWorkflow = resultData["Data"];
            var txtCopiedfrom = contextObj.fieldDetailsCloneWorkflow.find(function (item) {
                return item.FieldId === 2789;
            });
            txtCopiedfrom.FieldValue = contextObj.workTypeName;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    SetWorkflowComponent.prototype.workflowEscalationNotifications = function () {
        if (this.workTypeId > -1) {
            this.pageTitle = "Workflow Escalation Notifications";
            this.splitviewInput.showSecondaryView = true;
        }
    };
    SetWorkflowComponent.prototype.loadMenuData = function () {
        switch (this.moduleId) {
            case 5: /*Scheduling*/
            case 14:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
            case 4:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 3,
                        "title": "Workflow Settings",
                        "image": "Workflow Settings",
                        "path": "Workflow Settings",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
            case 9:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 3,
                        "title": "Workflow Settings",
                        "image": "Workflow Settings",
                        "path": "Workflow Settings",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 5,
                        "title": "Show Workflow",
                        "image": "Show Workflow",
                        "path": "Show Workflow",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 6,
                        "title": "Copy Workflow",
                        "image": "Copy Workflow",
                        "path": "Copy Workflow",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 7,
                        "title": "Workflow Escalation Notifications",
                        "image": "Workflow Escalation Notifications",
                        "path": "Workflow Escalation Notifications",
                        "submenu": null,
                        "privilegeId": null
                    }
                ];
                break;
            default:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 3,
                        "title": "Workflow Settings",
                        "image": "Workflow Settings",
                        "path": "Workflow Settings",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetWorkflowComponent.prototype, "openWorkflow", void 0);
    SetWorkflowComponent = __decorate([
        core_1.Component({
            selector: 'setworkflow',
            templateUrl: './app/Views/Common/Set Workflow/setworkflow.component.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent,
                setworkflow_addedit_1.SetWorkFlowAddEditComponent, workflow_settings_1.WorkflowSettingsComponent, workflow_outcomesList_1.WorkflowOutcomeComponent, copy_workflow_1.CopyWorkflowComponent, workflow_EscalationNotificationsList_1.WorkflowEscalationsNotificationsComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, workflow_service_1.WorkFlowService, administration_service_1.AdministrationService],
            inputs: ['moduleId', 'workFlowCategoryId', 'workTypeId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, workflow_service_1.WorkFlowService, notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], SetWorkflowComponent);
    return SetWorkflowComponent;
}());
exports.SetWorkflowComponent = SetWorkflowComponent;
//# sourceMappingURL=setworkflow.component.js.map