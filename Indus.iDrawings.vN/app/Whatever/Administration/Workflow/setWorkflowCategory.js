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
var administration_service_1 = require('../../../models/administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var SetWorkflowCategoriesComponent = (function () {
    function SetWorkflowCategoriesComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.btnName = "Save Changes";
        this.submitSuccess = new core_1.EventEmitter();
    }
    SetWorkflowCategoriesComponent.prototype.lbSelectAllChange = function () {
        var arr = new Array();
        var workflowCategory = this.fieldDetailsSetWorkflowCategory.find(function (el) { return el.ReportFieldId === 5843; });
        if (workflowCategory.MultiFieldValues.length == 0) {
            var lookups = workflowCategory["LookupDetails"]["LookupValues"];
            for (var i = 0; i < lookups.length; i++) {
                if (lookups[i]["IsDisabled"] == true)
                    arr.push(lookups[i]["Id"].toString());
            }
            workflowCategory.MultiFieldValues = arr;
        }
    };
    SetWorkflowCategoriesComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 5844,
            Value: contextObj.selectedId
        });
        if (contextObj.fieldDetailsSetWorkflowCategory != null) {
            for (var i = 0; i < contextObj.fieldDetailsSetWorkflowCategory[0].MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 5843,
                    Value: contextObj.fieldDetailsSetWorkflowCategory[0].MultiFieldValues[i]
                });
            }
        }
        this.administrationService.postSubmitWorkflowCategoryActionPt(JSON.stringify(arrayList)).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points already exist", 5);
            }
            contextObj.submitSuccess.emit({ status: "success", returnData: "" });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetWorkflowCategoriesComponent.prototype, "submitSuccess", void 0);
    SetWorkflowCategoriesComponent = __decorate([
        core_1.Component({
            selector: 'setworkflowcategory',
            templateUrl: './app/Views/Administration/Workflow/setWorkflowCategory.html',
            directives: [notify_component_1.Notification, fieldGeneration_component_1.FieldComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ['selectedId', 'fieldDetailsSetWorkflowCategory']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], SetWorkflowCategoriesComponent);
    return SetWorkflowCategoriesComponent;
}());
exports.SetWorkflowCategoriesComponent = SetWorkflowCategoriesComponent;
//# sourceMappingURL=setWorkflowCategory.js.map