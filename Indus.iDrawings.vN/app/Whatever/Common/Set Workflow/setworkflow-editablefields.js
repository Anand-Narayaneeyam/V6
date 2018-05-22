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
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var workorder_service_1 = require('../../../models/workorder/workorder.service');
var SetWorkflowEditableFieldsComponent = (function () {
    function SetWorkflowEditableFieldsComponent(workFlowService, notificationService, workorderservice) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.workorderservice = workorderservice;
        this.inputItems = { dataKey: "ReportFieldId", groupBy: ["Workflow Entity"], allowAdd: false, allowSort: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.spacefields = [];
    }
    SetWorkflowEditableFieldsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.workorderservice.GetSpaceFieldList(this.worktype, 3, '', '').subscribe(function (result) {
            console.log('space field data', result);
            for (var i = 0; i < JSON.parse(result["Data"]["FieldBinderData"]).length; i++) {
                if (JSON.parse(result["Data"]["FieldBinderData"])[i]["Select"] == true) {
                    context.spacefields.push(JSON.parse(result["Data"]["FieldBinderData"])[i]["ReportFieldId"]);
                }
            }
        });
    };
    SetWorkflowEditableFieldsComponent.prototype.ngAfterViewInit = function () {
        if (this.selectedId != undefined) {
            var contextObj = this;
            this.workFlowService.getWorkFlowEditableFields().subscribe(function (resultData) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId == 1306) {
                        item.IsVisible = false;
                    }
                });
                contextObj.fieldObject = (resultData["Data"]);
            });
            this.workFlowService.getWorkFlowEditableFieldsList(this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            });
        }
    };
    SetWorkflowEditableFieldsComponent.prototype.updateWorkflowEditableFields = function () {
        var contextObj = this;
        var arrayList = new Array();
        for (var i = 0; i < this.itemsSource.length; i++) {
            arrayList.push({
                Id: this.itemsSource[i]["ReportFieldId"],
                EntityCategoryId: this.itemsSource[i]["EntityCategoryId"],
                IsEdit: this.itemsSource[i]["Editable"],
                IsVisible: this.itemsSource[i]["Visible"]
            });
        }
        this.workFlowService.postSubmitWorkflowEditableFields(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Editable Fields updated", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Action Failure", 5);
            }
        });
    };
    SetWorkflowEditableFieldsComponent.prototype.checkBxClick = function (event) {
        var context = this;
        var check = true;
        var curSelectId = event.dataKeyValue;
        var selectedEntity = this.inputItems.rowData["EntityCategoryId"];
        if (event.colfieldObj["FieldId"] == 1272) {
            this.itemsSource.find(function (item) {
                if (item["ReportFieldId"] == curSelectId && item["EntityCategoryId"] == selectedEntity) {
                    if (selectedEntity == 1 || selectedEntity == 7 || selectedEntity == 19) {
                        if (item["Editable"] == true) {
                            item["Visible"] = item["Editable"];
                        }
                        else if (item["Editable"] == false) {
                            item["Visible"] = true;
                        }
                        return true;
                    }
                    else {
                        if (context.spacefields.indexOf(event.dataKeyValue) > -1) {
                            context.notificationService.ShowToaster('Space Fields cannot be edited', 5);
                            // item["Editable"] = false;
                            check = false;
                        }
                        if (!check)
                            item["Editable"] = false;
                        return true;
                    }
                }
                else
                    return false;
            });
        }
        else if (event.colfieldObj["FieldId"] == 1273) {
            this.itemsSource.find(function (item) {
                if (item["ReportFieldId"] == curSelectId && item["EntityCategoryId"] == selectedEntity && item["Editable"] == true && item["Visible"] == false) {
                    item["Visible"] = true;
                    return true;
                }
                else
                    return false;
            });
        }
    };
    SetWorkflowEditableFieldsComponent = __decorate([
        core_1.Component({
            selector: 'setworkflow-editablefields',
            templateUrl: './app/Views/Common/Set Workflow/setworkflow-editablefields.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent],
            providers: [workflow_service_1.WorkFlowService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, workorder_service_1.WorkOrdereService],
            inputs: ['selectedId', 'worktype']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, workorder_service_1.WorkOrdereService])
    ], SetWorkflowEditableFieldsComponent);
    return SetWorkflowEditableFieldsComponent;
}());
exports.SetWorkflowEditableFieldsComponent = SetWorkflowEditableFieldsComponent;
//# sourceMappingURL=setworkflow-editablefields.js.map