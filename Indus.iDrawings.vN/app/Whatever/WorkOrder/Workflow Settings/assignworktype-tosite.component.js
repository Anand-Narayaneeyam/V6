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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var workorder_service_1 = require('../../../models/workorder/workorder.service');
var AssignWorkTypeToSite = (function () {
    function AssignWorkTypeToSite(notificationservice, workorderservice) {
        this.notificationservice = notificationservice;
        this.workorderservice = workorderservice;
        this.btnName = "";
    }
    AssignWorkTypeToSite.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.btnName = "Save";
        debugger;
        this.workorderservice.loadAssignWorkTypestoSiteDetails().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObjectAssignWorkType = resultData["Data"];
            contextObj.lstWorkType = contextObj.fieldObjectAssignWorkType.find(function (item) {
                return item.FieldId === 2842;
            });
            contextObj.lstWorkType.IsVisible = false;
            if (resultData["Data"].length == 0)
                contextObj.notificationservice.ShowToaster("No Sites exist", 2);
        });
    };
    AssignWorkTypeToSite.prototype.lbSelectAllChange = function () {
        var contextObj = this;
        var arr = new Array();
        if (contextObj.lstWorkType.MultiFieldValues.length == 0) {
            var lookups = contextObj.lstWorkType["LookupDetails"]["LookupValues"];
            for (var i = 0; i < lookups.length; i++) {
                if (lookups[i]["IsDisabled"] == true)
                    arr.push(lookups[i]["Id"].toString());
            }
            contextObj.lstWorkType.MultiFieldValues = arr;
        }
    };
    AssignWorkTypeToSite.prototype.onDropDownChange = function (event) {
        debugger;
        var contextObj = this;
        var siteFieldId = event["FieldId"];
        var siteId = event["FieldValue"];
        contextObj.lstWorkType.MultiFieldValues = null;
        if (siteId > -1 && siteFieldId == 2841) {
            contextObj.lstWorkType.IsVisible = true;
            var arrList = new Array();
            arrList.push({
                ReportFieldId: 12499,
                Value: siteId.toString()
            });
            contextObj.workorderservice.loadWorkTypesforSite(51209, JSON.stringify(arrList)).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"] != "[]") {
                    var Values = JSON.parse(resultData["Data"]);
                    contextObj.lstWorkType.LookupDetails.LookupValues = Values;
                    var arrValues = Values.filter(function (item) { return (item.IsChecked == 1); });
                    if (arrValues.length > 0) {
                        contextObj.lstWorkType.MultiFieldValues = [];
                        for (var i = 0; i < arrValues.length; i++) {
                            contextObj.lstWorkType.MultiFieldValues.push(arrValues[i].Id.toString());
                        }
                    }
                    else {
                        contextObj.lstWorkType.MultiFieldValues = [];
                    }
                    debugger;
                    var arrDisabledValues = Values.filter(function (item) { return (item.IsDisabled == 1); });
                    if (arrDisabledValues.length > 0) {
                        for (var i = 0; i < arrDisabledValues.length; i++) {
                            if (arrDisabledValues[i]["IsDisabled"] == 1) {
                                var disablelookup = contextObj.lstWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id === arrDisabledValues[i]["Id"]; });
                                disablelookup.IsDisabled = true;
                            }
                        }
                    }
                }
            });
        }
        else {
            contextObj.lstWorkType.IsVisible = false;
            contextObj.lstWorkType.LookupDetails.LookupValues = [];
            contextObj.lstWorkType.MultiFieldValues = null;
        }
    };
    AssignWorkTypeToSite.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        this.workorderservice.postSubmitWorkTypestoSite(event.fieldobject).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationservice.ShowToaster("Work Type(s) assigned to the selected Site", 3);
            }
            else {
                contextObj.notificationservice.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    AssignWorkTypeToSite = __decorate([
        core_1.Component({
            selector: 'assignworktype-tosite',
            templateUrl: 'app/Views/WorkOrder/Workflow Settings/assignworktype-tosite.component.html',
            providers: [notify_service_1.NotificationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService])
    ], AssignWorkTypeToSite);
    return AssignWorkTypeToSite;
}());
exports.AssignWorkTypeToSite = AssignWorkTypeToSite;
//# sourceMappingURL=assignworktype-tosite.component.js.map