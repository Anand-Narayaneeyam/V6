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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var NotificationRecipientsComponent = (function () {
    function NotificationRecipientsComponent(workFlowService, notificationService, generFun) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.sortCol = "[Name]";
        this.sortDir = "ASC";
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    NotificationRecipientsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.workFlowService.getNotificationRecipientsFields().subscribe(function (resultdata) {
            contextObj.ddlRecipientType = resultdata["Data"].find(function (el) { return el.ReportFieldId === 406; });
            contextObj.inputItems.isHeaderCheckBx = true;
            var removeArr = [406];
            contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            contextObj.ddlRecipientType.FieldValue = contextObj.ddlRecipientType.LookupDetails.LookupValues[0].Id.toString();
            contextObj.recipientTypeId = contextObj.ddlRecipientType.FieldValue;
            contextObj.workFlowService.getNotificationRecipientsList(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.recipientTypeId).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
                if (contextObj.chkBxValuesforRecipients != undefined)
                    contextObj.removeItem();
            });
        });
    };
    NotificationRecipientsComponent.prototype.removeItem = function () {
        var contextObj = this;
        for (var i = 0; i < contextObj.chkBxValuesforRecipients.length; i++) {
            contextObj.itemsSource = contextObj.itemsSource.filter(function (item) {
                return item.Value != contextObj.chkBxValuesforRecipients[i].CategoryId;
            });
        }
    };
    NotificationRecipientsComponent.prototype.onChangeRecipientType = function (event) {
        var contextObj = this;
        contextObj.recipientTypeId = event;
        if (contextObj.recipientTypeId == -1) {
            contextObj.itemsSource = [];
            contextObj.inputItems.isHeaderCheckBx = false;
        }
        else if (contextObj.recipientTypeId >= 1) {
            contextObj.inputItems.isHeaderCheckBx = true;
            var fieldEmail = contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 447; });
            fieldEmail.IsVisible = true;
            contextObj.workFlowService.getNotificationRecipientsList(this.pageIndex, this.sortCol, this.sortDir, contextObj.recipientTypeId).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
                if (contextObj.chkBxValuesforRecipients != undefined)
                    contextObj.removeItem();
            });
        }
        if (contextObj.recipientTypeId == 2) {
            var fieldEmail = contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 447; });
            fieldEmail.IsVisible = false;
        }
    };
    NotificationRecipientsComponent.prototype.insertNotificationRecipients = function (event) {
        var contextObj = this;
        var id;
        var name;
        var categoryId;
        var newItemSource = [];
        this.arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                id = contextObj.itemsSource[i].Id.toString();
                name = contextObj.itemsSource[i].Name.toString();
                categoryId = contextObj.itemsSource[i].Value.toString();
                this.arrayList.push({
                    Id: id,
                    Value: name,
                    CategoryId: categoryId
                });
            }
            else {
                newItemSource.push(contextObj.itemsSource[i]);
            }
        }
        contextObj.itemsSource = [];
        contextObj.itemsSource = newItemSource;
        contextObj.submitSuccess.emit({ arrayList: contextObj.arrayList });
        if (contextObj.arrayList.length > 0)
            contextObj.notificationService.ShowToaster("Recipients added", 2);
        else
            contextObj.notificationService.ShowToaster("Select Recipient(s)", 2);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NotificationRecipientsComponent.prototype, "submitSuccess", void 0);
    NotificationRecipientsComponent = __decorate([
        core_1.Component({
            selector: 'notificationRecipients-checkboxgrid',
            templateUrl: './app/Views/Common/Set Workflow/notificationRecipients-checkboxgrid.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, workflow_service_1.WorkFlowService],
            inputs: ['chkBxValuesforRecipients']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], NotificationRecipientsComponent);
    return NotificationRecipientsComponent;
}());
exports.NotificationRecipientsComponent = NotificationRecipientsComponent;
//# sourceMappingURL=notificationRecipients-checkboxgrid.js.map