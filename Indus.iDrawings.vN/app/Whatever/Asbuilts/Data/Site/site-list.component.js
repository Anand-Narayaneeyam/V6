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
var SiteListComponent = (function () {
    function SiteListComponent(administrationService, _sortHelper, differs, _notificationService, confirmationService) {
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        //  @Output() selectedSiteIdsChange = new EventEmitter();
        this.updateSiteSelectedIds = new core_1.EventEmitter();
        this.targetTab = new core_1.EventEmitter();
        this.pageTitle = "Site List Component";
        this.totalItems = 1000;
        this.itemsPerPage = 200;
        this.inputItems = { dataKey: "FieldId", groupBy: [], grpWithCheckBx: false, selectedIds: [] };
        this.differ = differs.find({}).create(null);
        this.keyWordLookup = this.administrationService.getSiteSearchKeyWordLookup();
    }
    SiteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataKey = ["FieldId"];
        //this.administrationService.getSiteData().subscribe(resultData => this.itemsSource = resultData["data"]);
        this.administrationService.getSiteColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
    };
    SiteListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var scopesite = this.inputItems.selectedIds;
            this.updateSiteSelectedIds.emit({
                scopesite: scopesite
            });
        }
    };
    SiteListComponent.prototype.ngOnChanges = function (changes) {
        if (changes["action"]["currentValue"] == "delete") {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");
        }
        if (changes["action"]["currentValue"] == "close")
            this.administrationService.submitSiteClose(this.inputItems.selectedIds);
        if (changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitSiteReopen(this.inputItems.selectedIds);
    };
    SiteListComponent.prototype.okDelete = function (event) {
        if (event.returnOk == true) {
            for (var i = 0; i < this.itemsSource.length; i++) {
                for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                    if (this.itemsSource[i]["FieldId"] == this.inputItems.selectedIds[j]) {
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
            this.administrationService.submitSiteDelete(this.inputItems.selectedIds);
            this._notificationService.ShowToaster("Site deleted", 3);
        }
    };
    SiteListComponent.prototype.onSort = function (objGrid) {
        var sortedData = new Array(); /*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;
    };
    SiteListComponent.prototype.pageChanged = function (event) {
        //this.administrationService.sitePaging(event.pageEvent.page)
    };
    SiteListComponent.prototype.RowUpdate = function (event) {
        this.administrationService.submitSiteEdit(event, 1);
        this._notificationService.ShowToaster("Site updated", 3);
    };
    SiteListComponent.prototype.RowDelete = function (event) {
        this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");
    };
    SiteListComponent.prototype.RowAdd = function (event) {
        this.administrationService.submitSiteAdd(event);
        this._notificationService.ShowToaster("Site added", 3);
    };
    SiteListComponent.prototype.onColValClick = function (colVal) {
        this.targetTab.emit("1");
        console.log("colName", colVal.colName);
        console.log("colVal", colVal.colVal);
    };
    SiteListComponent.prototype.SaveAs = function (event) {
        console.log('Entered Save As');
    };
    SiteListComponent.prototype.Delete = function (event) {
        console.log('Entered Delete');
    };
    SiteListComponent.prototype.onloadSearch = function (event) {
        console.log('Enetered On Load Search');
    };
    SiteListComponent.prototype.Clear = function (event) {
        console.log('Entered Clear');
    };
    SiteListComponent.prototype.Submit = function (event) {
        console.log('Entered Search');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteListComponent.prototype, "updateSiteSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteListComponent.prototype, "targetTab", void 0);
    SiteListComponent = __decorate([
        core_1.Component({
            selector: 'site-list',
            templateUrl: 'app/Views/Asbuilts/Data/site-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService],
            inputs: ['action', 'dataKey'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], SiteListComponent);
    return SiteListComponent;
}());
exports.SiteListComponent = SiteListComponent;
//# sourceMappingURL=site-list.component.js.map