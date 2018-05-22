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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var FeedbackComponent = (function () {
    function FeedbackComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.pageTitle = "FeedBack";
        this.userName = "";
        this.userId = "";
    }
    FeedbackComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.btnName = "Submit";
        objContext.pagePath = "Administration / Feedback";
        objContext.administrationService.getSessionData().subscribe(function (data) {
            objContext.userId = data["Data"].UserId;
            objContext.userName = data["Data"].UserName;
        });
        objContext.administrationService.getFeedbackFields().subscribe(function (rt) {
            objContext.fieldDetails = rt["Data"];
            objContext.fieldDetails[0].FieldValue = objContext.userName;
        });
    };
    FeedbackComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        contextObj.administrationService.submitFeedback(event.fieldobject, this.userId).subscribe(function (resultData) {
            if (resultData == "Feedback Sent") {
                contextObj.notificationService.ShowToaster("Feedback sent", 3);
            }
            else if (resultData == "Feedback Sending failed")
                contextObj.notificationService.ShowToaster("Feedback Sending failed.", 5);
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    FeedbackComponent = __decorate([
        core_1.Component({
            selector: 'feedback-component";',
            templateUrl: './app/Views/Administration/Feedback/feedback-component.html',
            directives: [page_component_1.PageComponent, fieldGeneration_component_1.FieldComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
exports.FeedbackComponent = FeedbackComponent;
//# sourceMappingURL=feedback-component.js.map