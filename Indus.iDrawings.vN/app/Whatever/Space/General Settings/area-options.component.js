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
var http_1 = require('@angular/http');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var space_service_1 = require('../../../Models/space/space.service');
var AreaOptionsComponent = (function () {
    function AreaOptionsComponent(administrationService, notificationService, SpaceService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.SpaceService = SpaceService;
        this.btnName = "Save";
        this.totalItems = 0;
        this.isNetCustomerSubscribed = false;
        this.ExAreaSubscribed = false;
        this.vertAreaSubscribed = false;
        this.NetAreaSubscribed = false;
    }
    AreaOptionsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.SpaceService.getAreaOptions().subscribe(function (resultData) {
            contextObj.SpaceService.checkSubscribedFeature('31').subscribe(function (result) {
                if (result["Data"] == null || result["Data"].length == 0)
                    return;
                if (result["Data"][0]["IsSubscribed"] && result["Data"][0].FeatureLookupId == "2") {
                    contextObj.isNetCustomerSubscribed = true;
                }
                if (contextObj.isNetCustomerSubscribed == true) {
                    var exArea = resultData["Data"].find(function (item) { return item.ReportFieldId === 5353; });
                    var netArea = resultData["Data"].find(function (item) { return item.ReportFieldId === 786; });
                    exArea.IsVisible = false;
                    netArea.IsVisible = false;
                    contextObj.fieldDetails = resultData["Data"];
                }
                else
                    contextObj.fieldDetails = resultData["Data"];
            });
        });
        contextObj.SpaceService.checkSubscribedFeature('9,10,29').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.ExAreaSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.vertAreaSubscribed = result["Data"][1]["IsSubscribed"];
            contextObj.NetAreaSubscribed = result["Data"][2]["IsSubscribed"];
            contextObj.dataLoad();
        });
    };
    AreaOptionsComponent.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.SpaceService.LoadAreaOptions().subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            var currentelement = document.activeElement;
            setTimeout(function () {
                var el = document.getElementById("1935"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
                if (currentelement)
                    currentelement.focus();
            }, 20);
            var rate = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 736; });
            var ExArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 5353; });
            var vertArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 5355; });
            var NetArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 786; });
            ExArea.FieldValue = contextObj.ExAreaSubscribed ? "true" : "false";
            vertArea.FieldValue = contextObj.vertAreaSubscribed ? "true" : "false";
            NetArea.FieldValue = contextObj.NetAreaSubscribed ? "true" : "false";
            if (rate) {
                if (contextObj.itemsSource && contextObj.itemsSource.length > 0) {
                    rate.FieldValue = contextObj.itemsSource[0]["Rate"];
                }
                else {
                    rate.FieldValue = "";
                }
            }
        });
    };
    AreaOptionsComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var fieldObject = JSON.parse(event["fieldobject"]);
        var dblRate;
        var blnExtWalArea;
        var blnVerWalArea;
        var blnNetAreaEnabled;
        fieldObject.find(function (item) {
            switch (item.ReportFieldId) {
                case 736:
                    dblRate = item.Value;
                    break;
                case 5353:
                    blnExtWalArea = item.Value;
                    break;
                case 5355:
                    blnVerWalArea = item.Value;
                    break;
                case 786:
                    blnNetAreaEnabled = item.Value;
                    break;
            }
        });
        this.SpaceService.AddAreaOptions(dblRate, blnExtWalArea, blnVerWalArea, blnNetAreaEnabled).subscribe(function (resultData) {
            if (resultData == 1) {
                contextObj.notificationService.ShowToaster("Area Options updated", 3);
            }
        });
    };
    AreaOptionsComponent = __decorate([
        core_1.Component({
            selector: 'area-options',
            templateUrl: './app/Views/Space/General Settings/area-options.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, space_service_1.SpaceService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, space_service_1.SpaceService])
    ], AreaOptionsComponent);
    return AreaOptionsComponent;
}());
exports.AreaOptionsComponent = AreaOptionsComponent;
//# sourceMappingURL=area-options.component.js.map