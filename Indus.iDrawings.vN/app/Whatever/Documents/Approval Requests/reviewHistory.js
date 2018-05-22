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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var DocumentReviewHistory = (function () {
    function DocumentReviewHistory(notificationService, documentService) {
        this.notificationService = notificationService;
        this.documentService = documentService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", allowSort: false };
    }
    DocumentReviewHistory.prototype.ngOnInit = function () {
        var contextObj = this;
        this.documentService.getReviewHistoryColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    DocumentReviewHistory.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.documentService.getReviewHistoryData(contextObj.workflowEntityId).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        });
    };
    DocumentReviewHistory.prototype.onSort = function (objGrid) {
    };
    DocumentReviewHistory = __decorate([
        core_1.Component({
            selector: 'documentReviewHistory',
            templateUrl: 'app/Views/Documents/Approval Requests/reviewHistory.html',
            directives: [page_component_1.PageComponent, grid_component_1.GridComponent],
            providers: [notify_service_1.NotificationService, documents_service_1.DocumentService],
            inputs: ['workflowEntityId'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService])
    ], DocumentReviewHistory);
    return DocumentReviewHistory;
}());
exports.DocumentReviewHistory = DocumentReviewHistory;
//# sourceMappingURL=reviewHistory.js.map