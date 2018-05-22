var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../framework/models/interface/ifield.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var listboxcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component');
var administration_service_1 = require('../../../models/administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../Models/Common/General');
var SetWorkflowEntityDataFields = (function () {
    function SetWorkflowEntityDataFields(generFun, administrationService, notificationService, workOrdereService) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.workOrdereService = workOrdereService;
        this.btnEnable = false;
        //this.header1 = "Required";
        //this.header2 = "Action Point";
    }
    SetWorkflowEntityDataFields.prototype.ngOnInit = function () {
        this.workTypeId;
        var contextObj = this;
        contextObj.setAlignment = "vertical";
        this.workOrdereService.getWorkflowEntityDataFields("0", this.workTypeId, "9", "0").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]) {
                    contextObj.field = resultData["Data"].find(function (el) { return el.ReportFieldId === 6578; });
                    contextObj.fieldlist = resultData["Data"].find(function (el) { return el.ReportFieldId === 6579; });
                }
            }
        });
    };
    SetWorkflowEntityDataFields.prototype.ddlcategoryChange = function (event) {
        this.selectedid = event.ChildFieldObject.FieldValue;
        var arrayList = new Array();
        var contextObj = this;
        if (event.ChildFieldObject.FieldValue == "-1") {
            contextObj.btnEnable = false;
            contextObj.fieldlist.LookupDetails.LookupValues = [];
        }
        else {
            contextObj.btnEnable = true;
            this.workOrdereService.getWorkflowEntityData(this.selectedid, this.workTypeId).subscribe(function (resultData) {
                console.log("result data after ddl change", resultData["Data"]);
                contextObj.fieldlist.MultiFieldValues = [];
                if (resultData["Data"] != []) {
                    contextObj.fieldlist.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    var tempArray = [];
                    for (var i = 0; i < resultData["Data"]["LookupValues"].length; i++) {
                        if (resultData["Data"]["LookupValues"][i].IsChecked == 1) {
                            tempArray.push(resultData["Data"]["LookupValues"][i].Id.toString());
                        }
                    }
                    contextObj.fieldlist.MultiFieldValues = tempArray;
                }
            });
        }
    };
    SetWorkflowEntityDataFields.prototype.selectAllOptions = function (event) {
    };
    SetWorkflowEntityDataFields.prototype.Updateclick = function () {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 6578,
            Value: contextObj.selectedid.toString()
        });
        arrayList.push({
            ReportFieldId: 6577,
            Value: contextObj.workTypeId
        });
        if (contextObj.fieldlist != null) {
            for (var i = 0; i < contextObj.fieldlist.MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 6579,
                    Value: contextObj.fieldlist.MultiFieldValues[i]
                });
            }
        }
        this.workOrdereService.postSubmitWorkflowEntityData(JSON.stringify(arrayList)).subscribe(function (resultData) {
            console.log("result data after submit", resultData["Data"]);
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Entity Data Fields updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Entity Data Fields failed", 3);
            }
        });
    };
    SetWorkflowEntityDataFields = __decorate([
        core_1.Component({
            selector: 'set-workflow-entity-data-fields',
            templateUrl: 'app/Views/WorkOrder/Additional Data Fields/set-workflow-entity-data-fields.component.html',
            directives: [listboxcomponent_component_1.ListBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, workorder_service_1.WorkOrdereService],
            inputs: ['workTypeId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService, workorder_service_1.WorkOrdereService])
    ], SetWorkflowEntityDataFields);
    return SetWorkflowEntityDataFields;
}());
exports.SetWorkflowEntityDataFields = SetWorkflowEntityDataFields;
//# sourceMappingURL=set-workflow-entity-data-fields.component.js.map