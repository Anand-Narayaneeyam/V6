var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/general.ts" />
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var SiteDrawingListComponent = (function () {
    function SiteDrawingListComponent(administrationService, _sortHelper, differs, _notificationService, confirmationService, getData) {
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.position = "top-left";
        this.showSlide = false;
        this.add = false;
        this.edit = false;
        this.delete = false;
        //  @Output() selectedSiteIdsChange = new EventEmitter();
        this.updateSiteSelectedIds = new core_1.EventEmitter();
        this.targetTab = new core_1.EventEmitter();
        this.pageTitle = "Site List Component";
        this.totalItems = 1000;
        this.itemsPerPage = 200;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit };
        this.differ = differs.find({}).create(null);
        this.keyWordLookup = this.administrationService.getSiteSearchKeyWordLookup();
    }
    SiteDrawingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log("sited"+this.pageTarget);
        //console.log("sited" +this.moduleId);
        this.dataKey = ["Id"];
        //console.log('Site list');
        var contextObj = this;
        this.administrationService.getSiteColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["Data"]; });
        //this.administrationService.getSiteData().subscribe(function (resultData) {
        //    //console.log('Site list', resultData["Data"]);
        //    contextObj.itemsSource = JSON.parse(resultData["Data"]);
        //});
    };
    //ngDoCheck() {
    //    var changes = this.differ.diff(this.inputItems.selectedIds);
    //    if (changes) {
    //        var scopesite = this.inputItems.selectedIds;
    //        this.updateSiteSelectedIds.emit({
    //            scopesite
    //        })
    //    }
    //}
    SiteDrawingListComponent.prototype.ngOnChanges = function (changes) {
        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            this.showSlide = !this.showSlide;
        }
        if (changes["action"] && changes["action"]["currentValue"] == "close")
            this.administrationService.submitSiteClose(this.inputItems.selectedIds);
        if (changes["action"] && changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitSiteReopen(this.inputItems.selectedIds);
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (var i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    this.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    this.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    this.delete = true;
                this.inputItems.allowAdd = this.add;
                this.inputItems.allowEdit = this.edit;
            }
        }
    };
    SiteDrawingListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        //  if (event.returnOk == true) {
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
        // }
    };
    SiteDrawingListComponent.prototype.onSort = function (objGrid) {
        var sortedData = new Array(); /*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;
    };
    SiteDrawingListComponent.prototype.pageChanged = function (event) {
        //this.administrationService.sitePaging(event.pageEvent.page)
    };
    SiteDrawingListComponent.prototype.RowUpdate = function (event) {
        var test = this.getData.getFieldValuesAsReportFieldArray(event);
        //console.log("fieldConverion", test);
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds;
        this.administrationService.submitSiteEdit(test, this.id);
        this._notificationService.ShowToaster("Site updated", 3);
    };
    SiteDrawingListComponent.prototype.RowDelete = function (event) {
        if (this.delete == true)
            this.showSlide = !this.showSlide;
        // this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");       
    };
    SiteDrawingListComponent.prototype.RowAdd = function (event) {
        var test = this.getData.getFieldValuesAsReportFieldArray(event);
        //console.log("fieldConverion", test);
        this.administrationService.submitSiteAdd(test);
        this._notificationService.ShowToaster("Site added", 3);
    };
    SiteDrawingListComponent.prototype.onColValClick = function (colVal) {
        this.targetTab.emit("1");
        //console.log("colName", colVal.colName)
        //console.log("colVal", colVal.colVal);
    };
    SiteDrawingListComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    SiteDrawingListComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    SiteDrawingListComponent.prototype.onloadSearch = function (event) {
        //console.log('Enetered On Load Search', event);
        //  this.administrationService.SiteKeywordSeach(event);
    };
    SiteDrawingListComponent.prototype.Clear = function (event) {
        //console.log('Entered Clear');
    };
    SiteDrawingListComponent.prototype.Submit = function (event) {
        //console.log('Entered Search')
    };
    SiteDrawingListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SiteDrawingListComponent.prototype.cancelClick = function (value) {
        //console.log('Cancelled')
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteDrawingListComponent.prototype, "updateSiteSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteDrawingListComponent.prototype, "targetTab", void 0);
    SiteDrawingListComponent = __decorate([
        core_1.Component({
            selector: 'site-drawing-list',
            templateUrl: './app/Views/Common/DrawingDetails/sitedrawing-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
            inputs: ['action', 'pageTarget', 'moduleId', 'menuaccess'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], SiteDrawingListComponent);
    return SiteDrawingListComponent;
}());
exports.SiteDrawingListComponent = SiteDrawingListComponent;
//# sourceMappingURL=sitedrawing-list.component.js.map