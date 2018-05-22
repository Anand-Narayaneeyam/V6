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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var General_1 = require('../../../Models/Common/General');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var ReviewEmpMoveResourceListComponent = (function () {
    function ReviewEmpMoveResourceListComponent(empService, notificationService, genFun) {
        this.empService = empService;
        this.notificationService = notificationService;
        this.genFun = genFun;
        this.inputItems = { dataKey: "ResourceId", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.pageTitle = "";
        this.showslide = false;
        this.resoureDeleteEmit = new core_1.EventEmitter();
        this.menuData = [
            {
                "id": 1,
                "title": "Remove",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
    }
    ReviewEmpMoveResourceListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.empService.getReviewMOveResourceColumns().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    ReviewEmpMoveResourceListComponent.prototype.dataLoad = function (target, context) {
        context.empService.getReviewMoveResourceListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.moveReqId, context.selEmpId).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Resources exist");
            }
        });
    };
    ReviewEmpMoveResourceListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    ReviewEmpMoveResourceListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    ReviewEmpMoveResourceListComponent.prototype.onSubMenuChange = function (event) {
        this.showslide = true;
    };
    ReviewEmpMoveResourceListComponent.prototype.yesResourceOnClick = function ($event) {
        var contextObj = this;
        this.empService.deleteEmpMoveResourceDetails(contextObj.selEmpId, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.showslide = false;
                contextObj.notificationService.ShowToaster("Resource removed", 3);
                contextObj.resoureDeleteEmit.emit({ "ResourceCount": contextObj.totalItems });
            }
        });
    };
    ReviewEmpMoveResourceListComponent.prototype.closeResourceOnClick = function (event) {
        this.showslide = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReviewEmpMoveResourceListComponent.prototype, "selEmpId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReviewEmpMoveResourceListComponent.prototype, "moveReqId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewEmpMoveResourceListComponent.prototype, "resoureDeleteEmit", void 0);
    ReviewEmpMoveResourceListComponent = __decorate([
        core_1.Component({
            selector: 'review-resource',
            templateUrl: 'app/Views/Employee/Move Review/reviewEmpMoveResourceList.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewEmpMoveResourceListComponent);
    return ReviewEmpMoveResourceListComponent;
}());
exports.ReviewEmpMoveResourceListComponent = ReviewEmpMoveResourceListComponent;
//# sourceMappingURL=reviewempmoveresourcelist.component.js.map