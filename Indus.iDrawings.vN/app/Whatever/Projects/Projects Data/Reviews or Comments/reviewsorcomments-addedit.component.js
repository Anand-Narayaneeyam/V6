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
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var projects_service_1 = require('../../../../Models/Projects/projects.service');
var ReviewsORCommentsAddEdit = (function () {
    function ReviewsORCommentsAddEdit(projService, notificationService) {
        this.projService = projService;
        this.notificationService = notificationService;
        this.submitSuccess = new core_1.EventEmitter();
    }
    ReviewsORCommentsAddEdit.prototype.onSubmitData = function (event) {
        var _this = this;
        var context = this;
        event["fieldobject"] = JSON.parse(event["fieldobject"]);
        event.fieldobject.find(function (item) {
            if (item.ReportFieldId == 1034) {
                return item.Value = _this.projectId;
            }
        });
        event.fieldobject.push({
            ReportFieldId: 995,
            Value: this.projectId
        });
        if (this.action == "add") {
            this.projService.InsertReviewsORComments(JSON.stringify(event["fieldobject"]), event["filedata"]).subscribe(function (resultData) {
                debugger;
                switch (resultData.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Review or Comments uploaded", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data });
                        break;
                    case 3:
                        context.notificationService.ShowToaster("Unknown problem", 1);
                }
            });
        }
        else if (this.action == "edit") {
            this.projService.updateReviewORComments(context.selectedId, JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                debugger;
                switch (resultData.StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        context.notificationService.ShowToaster("Review or Comments updated", 3);
                        context.submitSuccess.emit({ returnData: resultData.Data });
                        break;
                    case 3:
                        context.notificationService.ShowToaster("Unknown problem", 1);
                }
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewsORCommentsAddEdit.prototype, "submitSuccess", void 0);
    ReviewsORCommentsAddEdit = __decorate([
        core_1.Component({
            selector: 'reviews-or-comments-addedit',
            templateUrl: './app/Views/Projects/Projects Data/Reviews or Comments/reviewsorcomments-addedit.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, projects_service_1.ProjectsService],
            inputs: ['fieldDetailsAddEdit', 'btnName', 'projectId', 'action', 'selectedId']
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService])
    ], ReviewsORCommentsAddEdit);
    return ReviewsORCommentsAddEdit;
}());
exports.ReviewsORCommentsAddEdit = ReviewsORCommentsAddEdit;
//# sourceMappingURL=reviewsorcomments-addedit.component.js.map