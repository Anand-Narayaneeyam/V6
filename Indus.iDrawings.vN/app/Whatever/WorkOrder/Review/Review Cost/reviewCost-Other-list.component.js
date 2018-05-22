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
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var ReviewOtherCostComponent = (function () {
    function ReviewOtherCostComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.onSubmit = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.onCostUpdate = new core_1.EventEmitter();
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.cardButtonPrivilege = [false, false];
        this.types = true;
        this.pageTitle = "New Cost";
        //Form id : 252
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (252))
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": null
            } //,
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ReviewOtherCostComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getReviewOtherCostsFields().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                contextObj.fieldObject = (result["Data"]);
                contextObj.dataLoad(1);
            }
        });
        //form id : 252***** PageId :732
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
    };
    ReviewOtherCostComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getReviewOtherCostData(contextObj.getWorkFlowEntityReportFieldIdValues()).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.enableMenu = [1];
            }
            contextObj.itemSourceUpdate.emit({
                itemSource: contextObj.itemsSource,
                rowsPerPage: contextObj.itemsPerPage,
                totalItems: contextObj.totalItems,
                fieldObject: contextObj.fieldObject
            });
        });
    };
    ReviewOtherCostComponent.prototype.getWorkFlowEntityReportFieldIdValues = function () {
        var tempArray = [];
        for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
            var item = _a[_i];
            tempArray.push({
                ReportFieldId: 7486,
                Value: item
            });
        }
        return JSON.stringify(tempArray);
    };
    ReviewOtherCostComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    };
    ReviewOtherCostComponent.prototype.onOtherCostSubmit = function (event) {
        var fieldObjectArray = JSON.parse(event.fieldobject);
        if (this.isAlreadyExists(fieldObjectArray.find(function (item) { return item.ReportFieldId === 7487; }))) {
            this.notificationService.ShowToaster("Other Cost details already exists", 2);
            return;
        }
        fieldObjectArray.push({
            ReportFieldId: 7488,
            Value: 0
        });
        this.onSubmit.emit(fieldObjectArray);
        var contextObj = this;
        setTimeout(function () {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }, 150);
    };
    ReviewOtherCostComponent.prototype.isAlreadyExists = function (addedCostItem) {
        var otherCostItem = this.itemsSource.find(function (item) { return item["Cost Item"].toUpperCase() === addedCostItem.Value.toUpperCase(); });
        return otherCostItem != undefined;
    };
    ReviewOtherCostComponent.prototype.onCellUpdate = function (event) {
        this.onCostUpdate.emit(event);
    };
    ReviewOtherCostComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ReviewOtherCostComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ReviewOtherCostComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.workOrderService.loadReviewOtherCostsAdd().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetails(resultData["Data"]);
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ReviewOtherCostComponent.prototype.updateFieldDetails = function (fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            if (item.ReportFieldId == 5859) {
                item.FieldValue = contextObj.workFlowEntityIds[0];
            }
        });
        return fieldDetailsArray;
    };
    ReviewOtherCostComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    /*slide events*/
    ReviewOtherCostComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.onDelete.emit(this.inputItems.selectedIds);
    };
    ReviewOtherCostComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ReviewOtherCostComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewOtherCostComponent.prototype, "itemSourceUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewOtherCostComponent.prototype, "onSubmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewOtherCostComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewOtherCostComponent.prototype, "onCostUpdate", void 0);
    ReviewOtherCostComponent = __decorate([
        core_1.Component({
            selector: 'reviewOtherCosts-list',
            templateUrl: './app/Views/WorkOrder/Review/Review Cost/reviewCost-Other-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['workrequestId', 'workFlowEntityIds', 'itemsSource', 'totalItems', 'inputItems', 'itemsPerPage', 'enableMenu'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewOtherCostComponent);
    return ReviewOtherCostComponent;
}());
exports.ReviewOtherCostComponent = ReviewOtherCostComponent;
//# sourceMappingURL=reviewCost-Other-list.component.js.map