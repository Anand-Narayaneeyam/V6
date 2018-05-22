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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var SetWorkflowPerissionsComponent = (function () {
    function SetWorkflowPerissionsComponent(workFlowService, notificationService) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.inputItems = { dataKey: "ReportFieldId", groupBy: ["Workflow Entity"], allowAdd: false, allowSort: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isGeneral = false;
    }
    SetWorkflowPerissionsComponent.prototype.ngAfterViewInit = function () {
        if (this.selectedId != undefined) {
            var contextObj = this;
            this.workFlowService.getWorkflowPermissionFields().subscribe(function (resultData) {
                contextObj.fieldDetailsWorkflowPermissions = (resultData["Data"]);
                contextObj.fieldDetailsWorkflowPermissions[0].IsVisible = false;
                contextObj.fieldDetailsWorkflowPermissions[4].FieldLabel = "Has Permission";
            });
            this.workFlowService.getWorkFlowPermissionsList(this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    if (contextObj.isGeneral) {
                        var removeArr = [2];
                        contextObj.itemsSource = contextObj.itemsSource.filter(function (item) {
                            return removeArr.indexOf(item.Id) == -1;
                        });
                    }
                    //contextObj.fieldDetailsWorkflowPermissions[5].FieldLabel = "";
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            });
        }
        //this.btnName = "Save Changes";
        //if (this.selectedId != undefined) {
        //    debugger
        //    var contextObj = this;
        //    this.workFlowService.getWorkflowPermissions(contextObj.selectedId).subscribe(function (resultData) {
        //        contextObj.fieldDetailsWorkflowPermissions = resultData["Data"];
        //    });
        //}
    };
    SetWorkflowPerissionsComponent.prototype.updateWorkflowPermissions = function () {
        var contextObj = this;
        var arr = new Array();
        //arr.push({ ReportFieldId: 5825, Value: contextObj.selectedId.toString() });
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Has Permission"] == true || this.itemsSource[i]["Has Permission"] == 1) {
                arr.push({ PermissionId: contextObj.itemsSource[i]["Id"],
                    EntityCategoryId: contextObj.itemsSource[i]["EntityCategoryId"] });
            }
        }
        //this.pageDetails = event["fieldobject"];             
        //arr = JSON.parse(this.pageDetails);
        //for (let i = 0; i < arr.length; i++) {
        //    if (arr[i].ReportFieldId == 5825) {
        //        arr[i].Value = this.selectedId;
        //    }
        //} 
        this.workFlowService.postSubmitWorkflowPermissions(JSON.stringify(arr), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Permissions updated", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Action Failure", 5);
            }
        });
    };
    SetWorkflowPerissionsComponent = __decorate([
        core_1.Component({
            selector: 'setworkflow-permissions',
            templateUrl: './app/Views/Common/Set Workflow/setworkflow-permissions.html',
            directives: [notify_component_1.Notification, fieldGeneration_component_1.FieldComponent, grid_component_1.GridComponent],
            providers: [workflow_service_1.WorkFlowService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ['selectedId', 'isGeneral']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService])
    ], SetWorkflowPerissionsComponent);
    return SetWorkflowPerissionsComponent;
}());
exports.SetWorkflowPerissionsComponent = SetWorkflowPerissionsComponent;
//# sourceMappingURL=setworkflow-permissions.js.map