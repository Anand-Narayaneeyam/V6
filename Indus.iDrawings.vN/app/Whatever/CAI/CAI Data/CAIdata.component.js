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
var floor_selection_component_1 = require('../../Space/Space Data/floor-selection.component');
var spacedata_grid_component_1 = require('../../space/space data/spacedata-grid.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var space_service_1 = require('../../../Models/Space/space.service');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var opendrawing_component_1 = require('../../common/opendrawing/opendrawing.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var CAIDataComponent = (function () {
    function CAIDataComponent(_spaceService, _notificationService) {
        this._spaceService = _spaceService;
        this._notificationService = _notificationService;
        this.pagePath = "CAI / Data";
        this.moduleId = 12;
        this.selectedTab = 0;
        this.isSpaceDataTab = false;
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        this.drawingType = 1;
        this.splitview = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.spaceTabEnabled = false;
        this.tabDeleteIndex = 0;
        this.innerwidthDwg = window.innerWidth - 50;
    }
    CAIDataComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        switch (event[0]) {
            case 0:
                if (event[1] && this.spaceTabEnabled) {
                    this.closeTab(1);
                    this.spaceTabEnabled = false;
                }
                break;
        }
        contextObj.selectedTab = event[0];
    };
    CAIDataComponent.prototype.closeTab = function (index) {
        var contextObj = this;
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    };
    CAIDataComponent.prototype.getSelectedIds = function (event) {
        var contextObj = this;
        this.selectedFloorIds = event.SelectedIds;
        if (this.selectedFloorIds) {
            contextObj.pagePath = "CAI / Data";
            contextObj.spaceTabEnabled = true;
            setTimeout(function () {
                contextObj.spaceTabEnabled = true;
            }, 100);
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 200);
            setTimeout(function () {
                //contextObj.documentTabEnabled = true;
                contextObj.isSpaceDataTab = true;
            }, 300);
        }
    };
    CAIDataComponent.prototype.onTabClose = function (event) {
        this.selectedTab = 0;
        this.spaceTabEnabled = false;
    };
    CAIDataComponent.prototype.getDrawingObject = function (event) {
        this.objiWhiz = event.dwgObject;
    };
    CAIDataComponent.prototype.spShowInDrawingOnClick = function (event) {
        this.dwgPageTarget = 3;
        this.selectedDrawingId = event["drawingId"];
        this.openDrawing(event["selectedIds"]);
    };
    CAIDataComponent.prototype.spShowZoomOnClick = function (event) {
        this.dwgPageTarget = 4;
        this.selectedDrawingId = event["drawingId"];
        this.openDrawing(event["selectedIds"]);
    };
    CAIDataComponent.prototype.openDrawing = function (selectedIds) {
        // if (selectedFloorIds.length == 1) {
        var contextObj = this;
        contextObj.selectedSpaceIds = selectedIds;
        //        setTimeout(function () {
        //            contextObj.IsOpenDrawingComponentActive = true;
        //            contextObj.selectedSpaceIds = selectedIds;
        //}, 100);
        if (contextObj.IsOpenDrawingComponentActive) {
            this.IsOpenDrawingComponentActive = false;
        }
        setTimeout(function () {
            contextObj.IsOpenDrawingComponentActive = true;
        }, 50);
        contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
        //setTimeout(function () {
        //    contextObj.selectedTab = 2;
        //}, 100);
        //}
        // else 
        //  this._notificationService.ShowToaster("The selected records are of different floors", 2)
    };
    CAIDataComponent.prototype.onSecondaryClose = function () {
        console.log("objiWhizobjiWhiz", this.objiWhiz);
        if (this.objiWhiz) {
            this.IsOpenDrawingComponentActive = false;
            this.objiWhiz.close(function (returnCode) {
            });
        }
    };
    CAIDataComponent = __decorate([
        core_1.Component({
            selector: 'CAIdata',
            templateUrl: './app/Views/CAI/CAI Data/CAIdata.component.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floor_selection_component_1.FloorSelectionComponent, spacedata_grid_component_1.SpaceDataGridComponent, page_component_1.PageComponent, displaysettings_component_1.DisplaySettingsComponent, opendrawing_component_1.OpenDrawing, split_view_component_1.SplitViewComponent],
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService])
    ], CAIDataComponent);
    return CAIDataComponent;
}());
exports.CAIDataComponent = CAIDataComponent;
//# sourceMappingURL=CAIdata.component.js.map