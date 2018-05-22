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
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var workflowEscalationNotifications_addedit_1 = require('./workflowEscalationNotifications-addedit');
var WorkflowEscalationsNotificationsComponent = (function () {
    function WorkflowEscalationsNotificationsComponent(generFun, workFlowService, notificationService) {
        this.generFun = generFun;
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.showSlide = false;
        this.position = "top-right";
        this.workTypeId = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
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
            }
        ];
        this.enableMenu = [];
    }
    WorkflowEscalationsNotificationsComponent.prototype.ngOnInit = function () {
        this.btnName = "Add";
        var contextObj = this;
        console.log("WT in EN: ", contextObj.workTypeId);
        this.workFlowService.getWorkflowEscalationsNotificationsFields().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
        });
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2];
            }
            else {
                contextObj.notificationService.ShowToaster("No Workflow Escalation Notifications exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    WorkflowEscalationsNotificationsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    WorkflowEscalationsNotificationsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    WorkflowEscalationsNotificationsComponent.prototype.onSubMenuChange = function (event) {
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
        }
    };
    WorkflowEscalationsNotificationsComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Workflow Escalation Notification";
        var contextObj = this;
        this.workFlowService.loadWorkflowEscalationsNotificationsAddEdit(0, 1, contextObj.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var arrList = new Array();
            arrList.push({
                ReportFieldId: 5472,
                Value: 25
            });
            var ddlNotificationSubject = contextObj.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2771;
            });
            contextObj.workFlowService.loadNotificationSubject(50783, JSON.stringify(arrList)).subscribe(function (resultData) {
                if (resultData["Data"] != "[]") {
                    contextObj.notificationSubjectDetails = JSON.parse(resultData["Data"]);
                    ddlNotificationSubject.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    var notificationDetails = contextObj.notificationSubjectDetails.find(function (item) {
                        return item.Id === parseInt(ddlNotificationSubject.FieldValue);
                    });
                }
            });
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    WorkflowEscalationsNotificationsComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Workflow Escalation Notification";
        var contextObj = this;
        this.destinationActionPointId = this.inputItems.rowData["DesiredWorkFlowActionPointId"];
        this.outcomefromSourceActionPointId = this.inputItems.rowData["WorkflowActionId"];
        this.outcomefromDestinationActionPointId = this.inputItems.rowData["DesiredWorkflowActionId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workFlowService.loadWorkflowEscalationsNotificationsAddEdit(this.inputItems.selectedIds[0], 2, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var _loop_1 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 2769:
                            contextObj.fieldDetailsAddEdit[i].FieldValue = contextObj.destinationActionPointId.toString();
                            break;
                        case 2770:
                            contextObj.workFlowService.loadOutcomefromDestinationActionPoint(contextObj.destinationActionPointId, 2769, contextObj.workTypeId, contextObj.outcomefromSourceActionPointId).subscribe(function (resultData) {
                                if (resultData["Data"]["LookupValues"] != "") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsAddEdit[i].FieldValue = contextObj.outcomefromDestinationActionPointId.toString();
                                }
                            });
                            break;
                        case 2771:
                            arrList = new Array();
                            arrList.push({
                                ReportFieldId: 5472,
                                Value: 25
                            });
                            contextObj.workFlowService.loadNotificationSubject(50783, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.notificationSubjectDetails = JSON.parse(resultData["Data"]);
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                }
                            });
                            break;
                        case 2775:
                            arrList1 = new Array();
                            arrList1.push({
                                ReportFieldId: 12570,
                                Value: contextObj.inputItems.selectedIds[0]
                            });
                            contextObj.workFlowService.loadNotificationRecipients(51202, JSON.stringify(arrList1)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    contextObj.notificationRecipientsDetails = JSON.parse(resultData["Data"]);
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                }
                                else {
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                }
                            });
                            break;
                    }
                };
                var arrList, arrList1;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_1(i);
                }
            });
        }
    };
    WorkflowEscalationsNotificationsComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow Escalation Notification", 2);
        }
        else {
            contextObj.showSlide = !contextObj.showSlide;
        }
    };
    WorkflowEscalationsNotificationsComponent.prototype.deleteEscalationNotification = function () {
        var contextObj = this;
        this.workFlowService.postDeleteWorkflowEscalationsNotifications(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Workflow Escalation Notifications exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Escalation Notification deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    WorkflowEscalationsNotificationsComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    WorkflowEscalationsNotificationsComponent.prototype.inlineDelete = function (event) {
        this.deleteEscalationNotification();
    };
    WorkflowEscalationsNotificationsComponent.prototype.okDelete = function (event) {
        this.deleteEscalationNotification();
        this.showSlide = !this.showSlide;
    };
    WorkflowEscalationsNotificationsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    WorkflowEscalationsNotificationsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    WorkflowEscalationsNotificationsComponent.prototype.getRecipientsList = function (event) {
        return event["RecipientsList"];
    };
    WorkflowEscalationsNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'workflow-EscalationsNotifications',
            templateUrl: './app/Views/Common/Set Workflow/workflow-EscalationNotificationsList.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent, workflowEscalationNotifications_addedit_1.WorkflowEscalationNotificationsAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workflow_service_1.WorkFlowService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['workTypeId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, workflow_service_1.WorkFlowService, notify_service_1.NotificationService])
    ], WorkflowEscalationsNotificationsComponent);
    return WorkflowEscalationsNotificationsComponent;
}());
exports.WorkflowEscalationsNotificationsComponent = WorkflowEscalationsNotificationsComponent;
//# sourceMappingURL=workflow-EscalationNotificationsList.js.map