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
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var listboxcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component');
var administration_service_1 = require('../../../models/administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var SetWorkflowCategoryActionPoints = (function () {
    function SetWorkflowCategoryActionPoints(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.btnEnable = false;
        this.header1 = "Required";
        this.header2 = "Action Point";
    }
    SetWorkflowCategoryActionPoints.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.setAlignment = "horizontal";
        this.administrationService.getWorkflowCategoryActionPoint(this.selectedid).subscribe(function (resultData) {
            if (resultData["Data"]) {
                contextObj.field = resultData["Data"].find(function (el) { return el.ReportFieldId === 5843; });
                contextObj.fieldlist = resultData["Data"].find(function (el) { return el.ReportFieldId === 5844; });
            }
        });
    };
    SetWorkflowCategoryActionPoints.prototype.ddlcategoryChange = function (event) {
        this.selectedid = event.ChildFieldObject.FieldValue;
        var arrayList = new Array();
        var contextObj = this;
        if (event.ChildFieldObject.FieldValue == "-1") {
            contextObj.btnEnable = false;
        }
        else {
            contextObj.btnEnable = true;
            arrayList.push({
                ReportFieldId: 5843,
                Value: event.ChildFieldObject.FieldValue
            });
            this.administrationService.getWorkflowddCategoryActionPoint(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"]["DataCount"] > 0) {
                    contextObj.fieldlist = resultData["Data"];
                }
            });
        }
    };
    SetWorkflowCategoryActionPoints.prototype.selectAllOptions = function (event) {
    };
    SetWorkflowCategoryActionPoints.prototype.Updateclick = function () {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 5843,
            Value: contextObj.selectedid.toString()
        });
        if (contextObj.fieldlist != null) {
            for (var i = 0; i < contextObj.fieldlist.MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 5844,
                    Value: contextObj.fieldlist.MultiFieldValues[i]
                });
            }
        }
        this.administrationService.postSubmitWorkflowCategoryActionPoint(JSON.stringify(arrayList)).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points already exist", 5);
            }
        });
    };
    SetWorkflowCategoryActionPoints = __decorate([
        core_1.Component({
            selector: 'setworkflow-categoryactionpoints',
            templateUrl: 'app/Views/Administration/Workflow/setWorkflowCategoryActionPoints.html',
            directives: [listboxcomponent_component_1.ListBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService],
            inputs: []
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], SetWorkflowCategoryActionPoints);
    return SetWorkflowCategoryActionPoints;
}());
exports.SetWorkflowCategoryActionPoints = SetWorkflowCategoryActionPoints;
//# sourceMappingURL=setWorkflowCategoryActionPoints.js.map