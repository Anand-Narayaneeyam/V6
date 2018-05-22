var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../framework/whatever/slide/slide.component.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var CancellataionClausesComponent = (function () {
    function CancellataionClausesComponent(realPropertyService, notificationService, _validateService, administrationServices, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.administrationServices = administrationServices;
        this.generFun = generFun;
        this.leaseRenewalCount = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
        this.leaseStatus = "Active";
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 0,
                "title": "Save",
                "image": "Save",
                "path": "Save",
                "subMenu": null,
                "privilegeId": 10053
            }
        ];
        this.Alignment = "horizontal";
    }
    CancellataionClausesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
        if (this.leaseStatus == "Active" || this.leaseStatus == "Draft") {
            this.enableMenu = [0];
        }
        else {
            this.enableMenu = [];
        }
        var event = [6];
        this.realPropertyService.getCancellationClausesFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.txtItemSource = resultData["Data"].find(function (el) { return el.ReportFieldId === 7387; });
            contextObj.txtItemSource.IsHiddenLabel = true;
            contextObj.txtBxCancellationClauses = resultData["Data"].find(function (el) { return el.ReportFieldId === 5748; });
            contextObj.txtBxCancellationClauses["FieldLabel"] = "Cancellation Clause";
        });
        this.loadData();
    };
    CancellataionClausesComponent.prototype.loadData = function () {
        var contextObj = this;
        this.realPropertyService.getCancellationClauses(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.leaseId, contextObj.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.realPropertyService.getCancellationCost(contextObj.leaseId[0]).subscribe(function (result) {
                    var temp = JSON.parse(result["Data"]["FieldBinderData"]);
                    contextObj.CostDetails = temp[0]["Cost"];
                    if (contextObj.CostDetails != null || contextObj.CostDetails != "") {
                        contextObj.txtItemSource.FieldValue = contextObj.CostDetails;
                    }
                });
            }
            else {
                contextObj.enableMenu = [];
                contextObj.txtItemSource.IsEnabled = false;
                contextObj.notificationService.ShowToaster("No Cancellation Clauses exist", 2);
            }
        });
    };
    CancellataionClausesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    };
    CancellataionClausesComponent.prototype.updateCalcellationClauses = function (event) {
        if (this.fieldObject[6].HasValidationError == false) {
            var contextObj = this;
            var arrayList = new Array();
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    arrayList.push({
                        ReportFieldId: 7384,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            arrayList.push({
                ReportFieldId: 7382,
                Value: contextObj.leaseId.toString()
            });
            arrayList.push({
                ReportFieldId: 7383,
                Value: contextObj.leaseRenewalCount.toString()
            });
            this.realPropertyService.postSubmitCancellationClauses(JSON.stringify(arrayList), contextObj.leaseId).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    if (contextObj.CostDetails != null && contextObj.CostDetails != "" && contextObj.CostDetails != undefined) {
                        if (contextObj.CostDetails != contextObj.cost) {
                        }
                        else {
                            contextObj.cost = contextObj.CostDetails;
                        }
                    }
                    if (contextObj.cost != "" && contextObj.cost != undefined) {
                        contextObj.realPropertyService.LeaseCancellationCost(contextObj.cost, contextObj.leaseId[0]).subscribe(function (result) {
                        });
                    }
                    contextObj.notificationService.ShowToaster("Cancellation Clauses updated", 3);
                    contextObj.submitSuccess.emit({ status: "success" });
                }
            });
        }
    };
    CancellataionClausesComponent.prototype.txtBoxChange = function (event) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
        event.fieldObject.IsLocallyValidated = false;
        this.initiateValidation(event.fieldObject);
        this.cost = event.fieldObject.FieldValue;
        //}
    };
    CancellataionClausesComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CancellataionClausesComponent.prototype, "submitSuccess", void 0);
    CancellataionClausesComponent = __decorate([
        core_1.Component({
            selector: 'cancellation-clauses',
            templateUrl: './app/Views/RealProperty/Lease/cancellation-clauses.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, stringtextbox_component_1.StringTextBoxComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService, administration_service_1.AdministrationService],
            inputs: ['leaseId', 'leaseRenewalCount', 'leaseStatus'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, validation_service_1.ValidateService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], CancellataionClausesComponent);
    return CancellataionClausesComponent;
}());
exports.CancellataionClausesComponent = CancellataionClausesComponent;
//# sourceMappingURL=cancellation-clauses.js.map