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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../Models/Space/space.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var RelinkSpace = (function () {
    function RelinkSpace(generFun, spaceService, notificationService) {
        this.generFun = generFun;
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.hatchSpace = new core_1.EventEmitter();
        this.onRelinkClick = new core_1.EventEmitter();
        this.relinkSubmitSuccess = new core_1.EventEmitter();
        this.afterAllOrphansUpdated = new core_1.EventEmitter();
        this.menuData = [{
                "id": 1,
                "title": "Re-Link",
                "image": "Revise",
                "path": "Re-Link",
                "submenu": null,
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
            },];
        this.inputItems = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC" };
        this.notificationMessageArray = [];
        this.showRelinkSlide = false;
        this.showDeleteSpaceDataSlide = false;
        this.totalItems = 0;
        this.deletedOrphanHandles = '';
        this.selectedNewHandle = '';
        this.selectedOldHandle = '';
        var contextObj = this;
        contextObj.spaceService.getSpaceGridField().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                //if (contextObj.pageTarget == 2 || contextObj.pageTarget == 3) {
                var rptField_1 = [1772, 488, 523];
                var count_1 = rptField_1.length;
                result["Data"].find(function (item) {
                    if (rptField_1.indexOf(item.ReportFieldId) >= 0) {
                        item.IsVisible = false;
                        count_1--;
                        if (count_1 == 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                });
                //}
                contextObj.fieldObject = result["Data"];
            }
        });
    }
    RelinkSpace.prototype.ngOnInit = function () {
        this.totalItems = this.itemsSource.length;
        if (this.spaceDetails.length > 0)
            this.enableMenu = [1, 2];
        else
            this.enableMenu = [2];
    };
    RelinkSpace.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.relinkOnClick();
                break;
            case 2:
                this.deleteSpaceData();
                break;
        }
    };
    RelinkSpace.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad();
    };
    RelinkSpace.prototype.dataLoad = function () {
        //this.spaceService.checkOrphanSpaceDetails(this.drawingId).subscribe(function (result) {
        //});
    };
    RelinkSpace.prototype.relinkOnClick = function () {
        debugger;
        var selLength = this.inputItems.selectedIds.length;
        var contextObj = this;
        if (selLength == 0) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else if (selLength > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.onRelinkClick.emit(false);
            var selectedData = this.inputItems.rowData;
            this.selectedIndex = this.itemsSource.findIndex(function (el) { return el.SpaceId == contextObj.inputItems.selectedIds[0]; });
            this.getOldAreaAndNewArea(1);
        }
        //this.isNetCustomer
    };
    RelinkSpace.prototype.relinkYesOnclick = function () {
        var contextObj = this;
        this.spaceDetails[this.selectedSpaceDataIndexForUpdate].SpaceId = this.inputItems.selectedIds[0];
        this.spaceDetails[this.selectedSpaceDataIndexForUpdate].IsNew = false;
        var selectedSpaceData = JSON.stringify([this.spaceDetails[this.selectedSpaceDataIndexForUpdate]]);
        this.spaceService.relinkSpaceOrphanRecords(selectedSpaceData).subscribe(function (result) {
            contextObj.setReturnRelinkMessages();
            var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.spaceDetails.splice(contextObj.selectedSpaceDataIndexForUpdate, 1);
            if (contextObj.spaceDetails.length == 0)
                contextObj.enableMenu = [2];
            contextObj.showRelinkSlide = false;
            contextObj.relinkSubmitSuccess.emit({ returnData: result.Data, totlaItems: contextObj.totalItems });
            if (contextObj.totalItems == 0)
                contextObj.afterAllOrphansUpdated.emit({ "newSpaces": contextObj.spaceDetails, "notificationMsg": contextObj.notificationMessageArray });
        });
    };
    RelinkSpace.prototype.relinkNoOnclick = function () {
        this.showRelinkSlide = false;
        if (this.selectedSpaceDataIndex != this.selectedFirstIndex)
            this.getOldAreaAndNewArea(2);
        else
            this.onRelinkClick.emit(true);
    };
    RelinkSpace.prototype.closeSlideDialog = function () {
        this.showRelinkSlide = false;
        this.showDeleteSpaceDataSlide = false;
    };
    RelinkSpace.prototype.getOldAreaAndNewArea = function (target) {
        this.oldArea = this.itemsSource[this.selectedIndex]["Gross Area"];
        this.newArea = 0;
        var contextObj = this;
        if (this.isNetCustomer) {
            if (target == 1) {
                this.selectedSpaceDataIndex = this.spaceDetails.findIndex(function (el) { return el.CarpetArea == contextObj.oldArea; });
                if (this.selectedSpaceDataIndex == -1)
                    this.selectedSpaceDataIndex = 0;
                this.selectedFirstIndex = this.selectedSpaceDataIndex;
            }
            this.newArea = this.spaceDetails[this.selectedSpaceDataIndex]['CarpetArea'];
            this.selectedNewHandle = this.spaceDetails[this.selectedSpaceDataIndex]["CarpetHandle"];
            this.selectedOldHandle = this.itemsSource[this.selectedIndex]["CarpetHandle"];
        }
        else {
            if (target == 1) {
                this.selectedSpaceDataIndex = this.spaceDetails.findIndex(function (el) { return el.BOMAArea == contextObj.oldArea; });
                if (this.selectedSpaceDataIndex == -1)
                    this.selectedSpaceDataIndex = 0;
                this.selectedFirstIndex = this.selectedSpaceDataIndex;
            }
            this.newArea = this.spaceDetails[this.selectedSpaceDataIndex]['BOMAArea'];
            this.selectedNewHandle = this.spaceDetails[this.selectedSpaceDataIndex]["BomaHandle"];
            this.selectedOldHandle = this.itemsSource[this.selectedIndex]["BomaHandle"];
        }
        this.hatchSpace.emit(contextObj.spaceDetails[this.selectedSpaceDataIndex]);
        this.selectedSpaceDataIndexForUpdate = this.selectedSpaceDataIndex;
        this.selectedSpaceDataIndex++;
        if (this.selectedSpaceDataIndex == this.spaceDetails.length)
            this.selectedSpaceDataIndex = 0;
        this.showRelinkSlide = true;
    };
    RelinkSpace.prototype.deleteSpaceData = function () {
        var selLength = this.inputItems.selectedIds.length;
        if (selLength == 0) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else
            this.showDeleteSpaceDataSlide = true;
    };
    RelinkSpace.prototype.deleteSpaceDataYesOnclick = function () {
        var contextObj = this;
        this.spaceService.deleteSpaceOrphanRecords(this.inputItems.selectedIds).subscribe(function (result) {
            if (result.StatusId == 1) {
                contextObj.setReturnDeleteMessages();
                for (var _i = 0, _a = contextObj.inputItems.selectedIds; _i < _a.length; _i++) {
                    var selectedId = _a[_i];
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', [selectedId], contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                }
                if (contextObj.totalItems == 0)
                    contextObj.afterAllOrphansUpdated.emit({ "newSpaces": contextObj.getNewSpaceDetails(), "notificationMsg": contextObj.notificationMessageArray });
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.showDeleteSpaceDataSlide = false;
        });
    };
    RelinkSpace.prototype.deleteSpaceDataNoOnclick = function () {
        this.showDeleteSpaceDataSlide = false;
    };
    RelinkSpace.prototype.getNewSpaceDetails = function () {
        var newSpaceDetails = [];
        for (var _i = 0, _a = this.spaceDetails; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.SpaceId == 0)
                newSpaceDetails.push(item);
        }
        return newSpaceDetails;
    };
    RelinkSpace.prototype.setReturnRelinkMessages = function () {
        var handles = this.selectedOldHandle + "-" + this.selectedNewHandle;
        this.notificationMessageArray.push({ NotificationMessage: ' Orphan record re-linked (' + handles + ' ) ' });
    };
    RelinkSpace.prototype.setReturnDeleteMessages = function () {
        var handle;
        for (var _i = 0, _a = this.inputItems.selectedIds; _i < _a.length; _i++) {
            var spaceId = _a[_i];
            if (this.isNetCustomer)
                handle = this.itemsSource.find(function (el) { return el.SpaceId == spaceId; })['CarpetHandle'];
            else
                handle = this.itemsSource.find(function (el) { return el.SpaceId == spaceId; })['BomaHandle'];
            this.notificationMessageArray.push({ NotificationMessage: "Orphan record(s) deleted (" + handle + ") " });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "itemsSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RelinkSpace.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "spaceDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RelinkSpace.prototype, "isNetCustomer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "handlesNotInDB", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "hatchSpace", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "onRelinkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "relinkSubmitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelinkSpace.prototype, "afterAllOrphansUpdated", void 0);
    RelinkSpace = __decorate([
        core_1.Component({
            selector: 'relink-space',
            templateUrl: './app/Views/Space/Tools/relink-space.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, slide_component_1.SlideComponent],
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, space_service_1.SpaceService, notify_service_1.NotificationService])
    ], RelinkSpace);
    return RelinkSpace;
}());
exports.RelinkSpace = RelinkSpace;
//# sourceMappingURL=relink-space.component.js.map