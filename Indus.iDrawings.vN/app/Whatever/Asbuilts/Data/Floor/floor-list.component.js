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
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../../utils/sortHelper');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../../Framework/Whatever/Search/search.component');
var confirm_component_1 = require('../../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../../Framework/Models/Notification/confirm.service');
var FloorListComponent = (function () {
    function FloorListComponent(administrationService, _sortHelper, differs, _notificationService, confirmationService) {
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.updateFloorSelectedIds = new core_1.EventEmitter();
        this.pageTitle = "Floor List Component";
        this.totalItems = 1000;
        this.itemsPerPage = 200;
        this.inputItems = { dataKey: "Floor FieldID", groupBy: [], grpWithCheckBx: false, selectedIds: [] };
        this.dataKey = ['Site FieldId', 'Building FieldId', 'Floor FieldID'];
        this.differ = differs.find({}).create(null);
    }
    FloorListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var scopefloor = this.inputItems.selectedIds;
            this.updateFloorSelectedIds.emit({ scopefloor: scopefloor });
        }
    };
    FloorListComponent.prototype.onSort = function (objGrid) {
        var sortedData = new Array(); /*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;
    };
    FloorListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["buildingId"] && changes["buildingId"]["currentValue"] != changes["buildingId"]["previousValue"]) {
            if (this.buildingId != undefined) {
                this.administrationService.getFloorColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
            }
            else {
                this.administrationService.getFloorColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
            }
        }
        if (changes["action"]["currentValue"] == "delete") {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Floor?", "Yes");
        }
        if (changes["action"]["currentValue"] == "close")
            this.administrationService.submitFloorClose(this.inputItems.selectedIds);
        if (changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitFloorReopen(this.inputItems.selectedIds);
    };
    FloorListComponent.prototype.okDelete = function (event) {
        if (event.returnOk == true) {
            for (var i = 0; i < this.itemsSource.length; i++) {
                for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                    if (this.itemsSource[i]["Floor FieldID"] == this.inputItems.selectedIds[j]) {
                        var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                        if (index > -1) {
                            this.itemsSource.splice(index, 1);
                            var sortedData = new Array(); /*To notify the watcher about the change*/
                            sortedData = sortedData.concat(this.itemsSource);
                            this.itemsSource = sortedData;
                        }
                    }
                }
            }
            //this.administrationService.submitFloorDelete(this.inputItems.selectedIds);
            this._notificationService.ShowToaster("Floor deleted", 3);
        }
    };
    FloorListComponent.prototype.pageChanged = function (event) {
        //this.administrationService.buildingPage(event.pageEvent.page)
    };
    FloorListComponent.prototype.RowUpdate = function (event) {
        //this.administrationService.submitFloorEdit(event);
        //this._notificationService.ShowToaster("Floor updated", 3);
    };
    FloorListComponent.prototype.RowDelete = function (event) {
        this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Floor?", "Yes");
    };
    FloorListComponent.prototype.RowAdd = function (event) {
        this.administrationService.submitFloorAdd(event);
        this._notificationService.ShowToaster("Floor added", 3);
    };
    FloorListComponent.prototype.SaveAs = function (event) {
        console.log('Entered Save As');
    };
    FloorListComponent.prototype.Delete = function (event) {
        console.log('Entered Delete');
    };
    FloorListComponent.prototype.onloadSearch = function (event) {
        console.log('Enetered On Load Search');
    };
    FloorListComponent.prototype.Clear = function (event) {
        console.log('Entered Clear');
    };
    FloorListComponent.prototype.Submit = function (event) {
        console.log('Entered Search');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorListComponent.prototype, "updateFloorSelectedIds", void 0);
    FloorListComponent = __decorate([
        core_1.Component({
            selector: 'floor-list',
            templateUrl: './app/Views/Asbuilts/Data/floor-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService],
            inputs: ['action', 'buildingId'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], FloorListComponent);
    return FloorListComponent;
}());
exports.FloorListComponent = FloorListComponent;
//# sourceMappingURL=floor-list.component.js.map