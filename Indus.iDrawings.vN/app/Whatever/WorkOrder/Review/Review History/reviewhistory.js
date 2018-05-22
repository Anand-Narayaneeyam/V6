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
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var ReviewHistory = (function () {
    function ReviewHistory(notificationService, workOrderService) {
        this.notificationService = notificationService;
        this.workOrderService = workOrderService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", allowSort: false };
    }
    ReviewHistory.prototype.ngOnInit = function () {
        var contextObj = this;
        this.workOrderService.getReviewHistoryColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    ReviewHistory.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewHistoryData(contextObj.workflowEntityId).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        });
    };
    ReviewHistory = __decorate([
        core_1.Component({
            selector: 'reviewHistory',
            templateUrl: './app/Views/WorkOrder/Review/Review History/reviewHistory.html',
            directives: [page_component_1.PageComponent, grid_component_1.GridComponent],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService],
            inputs: ['workflowEntityId'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService])
    ], ReviewHistory);
    return ReviewHistory;
}());
exports.ReviewHistory = ReviewHistory;
//# sourceMappingURL=reviewhistory.js.map