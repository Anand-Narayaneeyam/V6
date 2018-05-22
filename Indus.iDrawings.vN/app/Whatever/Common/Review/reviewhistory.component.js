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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var reviewworkflow_service_1 = require('../../../models/common/reviewworkflow.service');
var sortHelper_1 = require('../../utils/sortHelper');
var ReviewHistoryComponent = (function () {
    function ReviewHistoryComponent(reviewService, _sortHelper) {
        this.reviewService = reviewService;
        this._sortHelper = _sortHelper;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, allowAdd: false, allowEdit: false };
        this.totalItems = 100; //grid count
        this.itemsPerPage = 20; //number of rows to be shown per page 
        this.ClickEvent = new core_1.EventEmitter();
    }
    ReviewHistoryComponent.prototype.pageChanged = function (event) {
        this.reviewService.getHistoryPaging(this.workflowCatId, this.entityCatId, event.pageEvent.page);
    };
    ReviewHistoryComponent.prototype.onSort = function (objGrid) {
        var sortedData = new Array(); /*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;
    };
    ReviewHistoryComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["selectedid"] && changes["selectedid"]["currentValue"] != changes["selectedid"]["previousValue"]) {
            this.reviewService.getHistoryField().subscribe(function (resultData) { return _this.fieldObject = resultData["historyField"]; });
            this.reviewService.getHistoryData(this.selectedid).subscribe(function (resultData) { return _this.itemsSource = resultData["historyData"]; });
        }
    };
    ReviewHistoryComponent.prototype.CloseClick = function () {
        this.ClickEvent.emit("cancel");
    };
    ReviewHistoryComponent.prototype.ViewClick = function () {
        this.ClickEvent.emit(this.selectedid);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewHistoryComponent.prototype, "ClickEvent", void 0);
    ReviewHistoryComponent = __decorate([
        core_1.Component({
            selector: 'reviewHistory',
            templateUrl: './app/Views/Common/Review/reviewHistory.component.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [reviewworkflow_service_1.ReviewWorkFlowService, sortHelper_1.SortHelper],
            inputs: ['workflowCatId', 'entityCatId', 'selectedid']
        }), 
        __metadata('design:paramtypes', [reviewworkflow_service_1.ReviewWorkFlowService, sortHelper_1.SortHelper])
    ], ReviewHistoryComponent);
    return ReviewHistoryComponent;
}());
exports.ReviewHistoryComponent = ReviewHistoryComponent;
//# sourceMappingURL=reviewhistory.component.js.map