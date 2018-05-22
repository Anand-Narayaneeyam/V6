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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../../Models/Common/General');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var ReviewTeamMemberComponent = (function () {
    function ReviewTeamMemberComponent(workOrderService, notificationService, generFun) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.onUpdate = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Name]", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false };
        this.pageIndex = 0;
        this.types = true;
        this.allowSubmit = true;
        this.menuData = [
            {
                "id": 1,
                "title": "Save Changes",
                "image": "Update",
                "path": "Update",
                "subMenu": null,
                "privilegeId": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ;
    ReviewTeamMemberComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.workOrderService.getTeamMembersListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            contextObj.dataLoad(1);
        });
    };
    ReviewTeamMemberComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getTeamMembersListData(contextObj.getReportFieldIdValuesForList(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemSource = JSON.parse(result["Data"].FieldBinderData);
                for (var _i = 0, _a = contextObj.itemSource; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item["Select All"] = item["Select All"] == "True";
                }
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.notificationService.ShowToaster("No Team Members exist", 5);
                contextObj.enableMenu = [];
            }
        });
    };
    ReviewTeamMemberComponent.prototype.getReportFieldIdValuesForList = function () {
        var tempArray = [];
        for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
            var item = _a[_i];
            tempArray.push({
                ReportFieldId: 5859,
                Value: item
            });
        }
        tempArray.push({ ReportFieldId: 5827, Value: this.currentActionPointId });
        return JSON.stringify(tempArray);
    };
    ReviewTeamMemberComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.onUpdateClick();
                break;
        }
    };
    ReviewTeamMemberComponent.prototype.onUpdateClick = function () {
        if (this.allowSubmit) {
            var returnDatArray = [];
            for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
                var entityId = _a[_i];
                for (var _b = 0, _c = this.itemSource; _b < _c.length; _b++) {
                    var item = _c[_b];
                    var tempArray = [];
                    if (item["Select All"]) {
                        tempArray.push({ ReportFieldId: 5827, Value: this.currentActionPointId }, { ReportFieldId: 5859, Value: entityId });
                        switch (item["User Category"]) {
                            case 'Employee':
                                tempArray.push({ ReportFieldId: 7527, Value: item.Id });
                                break;
                            case 'Technician':
                                tempArray.push({ ReportFieldId: 7528, Value: item.Id });
                                break;
                            case 'Contractor':
                                tempArray.push({ ReportFieldId: 7529, Value: item.Id });
                                break;
                        }
                    }
                    if (tempArray.length > 0) {
                        returnDatArray.push({ WFReportFieldIdValues: tempArray });
                    }
                }
            }
            this.onUpdate.emit({ data: returnDatArray, target: this.isMultiple ? 2 : 1 });
            this.allowSubmit = false;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewTeamMemberComponent.prototype, "onUpdate", void 0);
    ReviewTeamMemberComponent = __decorate([
        core_1.Component({
            selector: 'review-TeamMembers',
            templateUrl: './app/Views/WorkOrder/Review/Review Team Members/reviewTeam-Members.component.html',
            directives: [page_component_1.PageComponent, slide_component_1.SlideComponent, grid_component_1.GridComponent, submenu_component_1.SubMenu],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions],
            inputs: ['currentActionPointId', 'workFlowEntityIds', 'isMultiple'],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewTeamMemberComponent);
    return ReviewTeamMemberComponent;
}());
exports.ReviewTeamMemberComponent = ReviewTeamMemberComponent;
//# sourceMappingURL=reviewteam-members.component.js.map