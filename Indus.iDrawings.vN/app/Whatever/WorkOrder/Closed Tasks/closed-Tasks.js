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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var trackRequest_list_component_1 = require('../Track Request/trackRequest-list.component');
var General_1 = require('../../../Models/Common/General');
var reviewPmWorkorder_list_component_1 = require('../Review/reviewPmWorkorder-list.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var ClosedTasksComponent = (function () {
    function ClosedTasksComponent(notificationService, workOrderService, generalFunctions) {
        this.notificationService = notificationService;
        this.workOrderService = workOrderService;
        this.generalFunctions = generalFunctions;
        this.selectedTab = 0;
        this.pageTitle = "Review";
        this.pagePath = "Work Order / My Requests";
        this.entityCategoryId = 1;
        this.requestId = 0;
        this.closedRequestListSource = [];
        this.closedRequestListTotalItems = 0;
        this.closedRequestListItemsPerPage = 0;
        this.initList = false;
        this.closedRequestInputItems = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.userDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };
    }
    ClosedTasksComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.workOrderService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.initList = true;
            }
        });
    };
    ClosedTasksComponent.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.pagePath = "Work Order / Closed Tasks / Service Requests";
        }
        else {
            this.pagePath = "Work Order / Closed Tasks / PM Work Orders";
        }
        this.selectedTab = event[0];
    };
    ClosedTasksComponent = __decorate([
        core_1.Component({
            selector: 'closed-tasks',
            templateUrl: './app/Views/WorkOrder/Closed Tasks/closed-Tasks.html',
            directives: [page_component_1.PageComponent, trackRequest_list_component_1.TrackRequestListComponent, reviewPmWorkorder_list_component_1.ListReviewPMWorkOrderComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions])
    ], ClosedTasksComponent);
    return ClosedTasksComponent;
}());
exports.ClosedTasksComponent = ClosedTasksComponent;
//# sourceMappingURL=closed-Tasks.js.map