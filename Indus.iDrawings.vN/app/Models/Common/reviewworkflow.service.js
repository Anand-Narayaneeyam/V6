var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var ReviewWorkFlowService = (function (_super) {
    __extends(ReviewWorkFlowService, _super);
    function ReviewWorkFlowService(http) {
        _super.call(this, http);
        this.http = http;
        this.actionpath = 'MockData/FieldObjects/reviewWorkFlow.json';
        this._spaceUnlockdrawingListData = 'MockData/Data/unlock_drawing_list.json';
        this._spaceUnlockdrawingFields = 'MockData/FieldObjects/unlockdrawingfieldobject.json';
    }
    ReviewWorkFlowService.prototype.getAction = function (workflowCatId, entityCatId, selectedid) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getStackPlans = function (id) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getRequestDetails = function () {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getRequestNumberDetails = function (id) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getsubMenu = function (workflowCatId, entityCatId, id) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getDescriptionData = function (selectedid) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getViewFloorData = function () {
        return this.postgetaction(null, this._spaceUnlockdrawingListData);
    };
    ReviewWorkFlowService.prototype.getViewFloorFieldObject = function () {
        return this.postgetaction(null, this._spaceUnlockdrawingFields);
    };
    ReviewWorkFlowService.prototype.getHistoryPaging = function (workflowCatId, entityCatId, pageIndex) {
        console.log("page", pageIndex);
    };
    ReviewWorkFlowService.prototype.getHistoryField = function () {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService.prototype.getHistoryData = function (id) {
        return this.postgetaction(null, this.actionpath);
    };
    ReviewWorkFlowService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReviewWorkFlowService);
    return ReviewWorkFlowService;
}(HttpHelpers_1.HttpHelpers));
exports.ReviewWorkFlowService = ReviewWorkFlowService;
//# sourceMappingURL=reviewworkflow.service.js.map