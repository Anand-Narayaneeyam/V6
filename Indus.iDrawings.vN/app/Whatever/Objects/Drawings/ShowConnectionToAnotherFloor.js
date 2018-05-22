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
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var opendrawing_component_1 = require('../../../whatever/common/opendrawing/opendrawing.component');
var floordrawing_list_component_1 = require('../../common/drawingdetails/floordrawing-list.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../models/administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var ConnectComponentsView = (function () {
    function ConnectComponentsView(notificationService, administrationService) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.selectedTab = 0;
        this.floorTabName = "Drawings";
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        this.totalItems = 0;
        this.drawingType = 1;
        this.closeTbFuns = undefined;
        this.pageTarget = 4;
        this.dwgDetails = "[]";
        this.secondCanvasIdName = "iWhizCanvas_2";
        this.loadingIndicatorIdName = "loading-indicator_2";
        //@Output() outDrawingobject = new EventEmitter();
        //@Output() onDrawingClose = new EventEmitter();
        this.splitViewDataGrid = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.menuData = [
            {
                "id": 4,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null
            }];
        this.enableMenu = [4];
    }
    ConnectComponentsView.prototype.ngOnInit = function () {
        debugger;
        this.ConnectivityList = this.connectivityListInputs;
        this.BlinkOutSideDrawings = this.BlinkOutSideDrawings;
    };
    ConnectComponentsView.prototype.getSelectedTab = function (event) {
    };
    ConnectComponentsView.prototype.updateFloorDrawingSelectedID = function (event) {
        var contextObj = this;
        contextObj.selectedFloorIds = event["scopefloordrawing"];
        contextObj.totalItems = event.totalItems;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.revisionNo = event.rowData['Revision No.'];
    };
    ConnectComponentsView.prototype.onSubMenuChange = function (event) {
        if (event.value == 4) {
            this.viewDrawings();
        }
    };
    ConnectComponentsView.prototype.viewDrawings = function () {
        var contextObj = this;
        contextObj.splitViewDataGrid.secondaryArea = 79;
        if (contextObj.selectedFloorIds)
            if (contextObj.selectedFloorIds.length > 1) {
                contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                this.menuData = null;
                //if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                //    this.IsOpenDrawingComponentActive = false;
                //    this.viewDrawing = false;
                //}
                setTimeout(function () {
                    contextObj.IsOpenDrawingComponentActive = true;
                    contextObj.floorTabName = "View Drawing";
                    contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                }, 50);
                setTimeout(function () {
                    contextObj.selectedTab = 0;
                }, 100);
            }
    };
    ConnectComponentsView.prototype.updateCrossSession = function (SelectedId) {
        this.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
        });
    };
    ConnectComponentsView.prototype.outDrawingObject = function (event) {
        this.objiWhiz = event.dwgObject;
        //   this.outDrawingobject.emit(event);
    };
    ConnectComponentsView.prototype.onTabBeforeClose = function ($event) {
        var contextObj = this;
        this.closeTbFuns = $event;
        if (contextObj.objiWhiz) {
            contextObj.objiWhiz.close(function (returnCode) {
                contextObj.onTabClose();
            });
        }
    };
    ConnectComponentsView.prototype.onTabClose = function () {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        // this.onDrawingClose.emit({});
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "BlinkOutSideDrawings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "objectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "AssociationId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "PrimaryObjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "fieldDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ConnectComponentsView.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConnectComponentsView.prototype, "connectivityListInputs", void 0);
    ConnectComponentsView = __decorate([
        core_1.Component({
            selector: 'ShowConnection-ToAnotherFloor',
            templateUrl: './app/Views/Objects/Drawings/ShowConnectionToAnotherFloor.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, core_1.forwardRef(function () { return opendrawing_component_1.OpenDrawing; }), floordrawing_list_component_1.FloorDrawingListComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], ConnectComponentsView);
    return ConnectComponentsView;
}());
exports.ConnectComponentsView = ConnectComponentsView;
//# sourceMappingURL=ShowConnectionToAnotherFloor.js.map