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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var popupadd_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/popupadd.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var financial_clauses_1 = require('./financial-clauses');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var cancellation_clauses_1 = require('./cancellation-clauses');
var LeaseAddEditComponent = (function () {
    function LeaseAddEditComponent(realpropertyservice, notificationService, _validateService) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.dataKey = "Id";
        this.financialClause = false;
        this.cancellationClause = false;
        this.leaseRenewalCount = 0;
        this.strPopUpValue = "Clauses";
        this.submitSuccess = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.financialClauseIds = [];
    }
    LeaseAddEditComponent.prototype.ngOnInit = function () {
        this.selectedId;
        var event = [1, 2];
        var contextObj = this;
        this.ddlLeaseType = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 984;
        });
        this.ddlLeaseStatus = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 979;
        });
        this.TenantDetails = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 981;
        });
        if (this.setFeatureLookupId == 49 && this.TenantDetails.FieldValue != "") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "1");
        }
        else if (this.setFeatureLookupId == 49 && this.TenantDetails.FieldValue == "") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "2");
        }
        else if (this.setFeatureLookupId == 50) {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "2");
        }
        else if (this.setFeatureLookupId == 51) {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "1");
        }
    };
    LeaseAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])), "add");
                break;
            case "edit":
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])), "edit");
                break;
        }
    };
    LeaseAddEditComponent.prototype.rbtnOnChange = function (event) {
        this.ddlLeaseType.LookupDetails.PopupComponent = null;
        this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
        if (event.rbtnObject.fieldobject.FieldLabel == "Purpose") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, event.rbtnObject.fieldobject.FieldValue);
        }
        if (event.rbtnObject.fieldobject.ReportFieldId == 6143) {
            if (this.ddlLeaseType.FieldValue == "4" || this.ddlLeaseType.FieldValue == "5" || this.ddlLeaseType.FieldValue == "1") {
                this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
            }
        }
    };
    LeaseAddEditComponent.prototype.checkBoxChange = function (event) {
    };
    LeaseAddEditComponent.prototype.updateFieldProperties = function (fieldObjectArray, value) {
        var contextObj = this;
        var event = [1, 2];
        if (value == "1") {
            fieldObjectArray.find(function (item) {
                if (item.ReportFieldId == 5775) {
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item.FieldId, item);
                }
                else if (item.ReportFieldId == 5774) {
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    item.FieldValue = "-1";
                    item.HasValidationError = false;
                }
                else if (item.ReportFieldId == 5778) {
                    item.FieldValue = "false";
                    item.IsEnabled = false;
                    item.IsVisible = false; // temporary hidden 
                }
                else if (item.ReportFieldId == 5771) {
                    item.FieldValue = "1";
                }
                else if (item.ReportFieldId == 6142) {
                    item.LookupDetails.LookupValues = this.leaseTypeDdl.filter(function (item) { return event.indexOf(item.Id) == -1; });
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    else if (contextObj.action == "edit" && contextObj.leaseStatus != "Active") {
                        if (item.FieldValue == "4" || item.FieldValue == "5" || item.FieldValue == "1") {
                            contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {
                                var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                if (temp != "[]") {
                                    for (var i = 0; i < temp.length; i++) {
                                        contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                                    }
                                }
                            });
                            item.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                        }
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                    contextObj.leaseTypeId = item.FieldValue;
                }
                else if (item.ReportFieldId == 5776) {
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                }
                else if (item.ReportFieldId == 5696) {
                    if (contextObj.action == "add") {
                        var Expirydate = new Date();
                        Expirydate.setDate(Expirydate.getDate() + 1);
                        var strDate = Expirydate.toDateString().split(" ");
                        item.FieldValue = strDate[1] + " " + strDate[2] + " " + strDate[3];
                    }
                }
            });
        }
        else if (value == "2") {
            fieldObjectArray.find(function (item) {
                if (item.ReportFieldId == 5775) {
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    item.FieldValue = "-1";
                }
                else if (item.ReportFieldId == 5774) {
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    contextObj.initiateValidation(item.FieldId, item);
                    item.IsLocallyValidated = false;
                }
                else if (item.ReportFieldId == 5778) {
                    item.IsEnabled = true;
                    item.IsVisible = false; // temporary hidden 
                }
                else if (item.ReportFieldId == 5771) {
                    item.FieldValue = "2";
                }
                else if (item.ReportFieldId == 6142) {
                    item.LookupDetails.LookupValues = this.leaseTypeDdl.filter(function (item) { return event.indexOf(item.Id) != -1; });
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    else if (contextObj.action == "edit" && contextObj.leaseStatus != "Active") {
                        if (item.FieldValue == "4" || item.FieldValue == "5" || item.FieldValue == "1") {
                            contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {
                                var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                if (temp != "[]") {
                                    for (var i = 0; i < temp.length; i++) {
                                        contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                                    }
                                }
                            });
                            item.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                        }
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                    contextObj.leaseTypeId = item.FieldValue;
                }
                else if (item.ReportFieldId == 5776) {
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                }
                else if (item.ReportFieldId == 5696) {
                    if (contextObj.action == "add") {
                        var Expirydate = new Date();
                        Expirydate.setDate(Expirydate.getDate() + 1);
                        var strDate = Expirydate.toDateString().split(" ");
                        item.FieldValue = strDate[1] + " " + strDate[2] + " " + strDate[3];
                    }
                }
            });
        }
        return JSON.parse(JSON.stringify(fieldObjectArray));
    };
    LeaseAddEditComponent.prototype.initiateValidation = function (id, fieldObject) {
        var contextObj = this;
        var el = document.getElementById(id);
        if (el) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    LeaseAddEditComponent.prototype.updateFieldValuesForSubmit = function (fieldObjectArray) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {
                if (item.Value == 1) {
                    item.Value = 0;
                }
                else {
                    item.Value = 1;
                }
            }
            else if (item.ReportFieldId == 5779) {
                if (item.Value === "true") {
                    item.Value = 1;
                }
                else {
                    item.Value = 0;
                }
            }
            else if (item.ReportFieldId == 5778) {
                if (item.Value === "true") {
                    item.Value = 1;
                }
                else {
                    item.Value = 0;
                }
                item.IsVisible = false; // temporary hidden 
            }
            else if (item.ReportFieldId == 5697) {
                contextObj.leaseExecutionDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5695) {
                contextObj.leaseCommencementDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5698) {
                contextObj.rentCommencementDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5696) {
                contextObj.leaseExpiryDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 6142) {
                contextObj.leaseTypeId = item.Value;
            }
        });
        return JSON.stringify(fieldObjectArray);
    };
    LeaseAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        if (contextObj.action == "edit" && contextObj.leaseStatus == "Active") {
        }
        else {
            if (contextObj.leaseExecutionDate > contextObj.leaseCommencementDate) {
                contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than or equal to Lease Execution Date", 2);
                return;
            }
            if (contextObj.leaseCommencementDate > contextObj.rentCommencementDate) {
                contextObj.notificationService.ShowToaster("Rent Commencement Date should be greater than or equal to Lease Commencement Date", 2);
                return;
            }
            if (contextObj.rentCommencementDate >= contextObj.leaseExpiryDate) {
                contextObj.notificationService.ShowToaster("Lease Expiry Date should be greater than Rent Commencement Date", 2);
                return;
            }
            if (contextObj.leaseExpiryDate <= new Date()) {
                contextObj.notificationService.ShowToaster("Lease Expiry Date should be a future date", 2);
                return;
            }
            if (contextObj.leaseTypeId == "4" || contextObj.leaseTypeId == "5" || contextObj.leaseTypeId == "1") {
                if (this.financialClauseIds.length == 0) {
                    this.notificationService.ShowToaster("Select Clause(s) ", 2);
                    return;
                }
            }
        }
        contextObj.realpropertyservice.submitAddUpdateLease(strsubmitField, contextObj.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (resultData["Data"]["Data"] != "" && resultData["Data"]["Data"] != undefined) {
                var temp = JSON.parse(resultData["Data"]["Data"]);
            }
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == "add") {
                        var selectedFinClause = new Array();
                        selectedFinClause = contextObj.financialClauseIds;
                        selectedFinClause.push({ ReportFieldId: 6163, Value: resultData["Data"].ServerId });
                        selectedFinClause.push({ ReportFieldId: 6164, Value: temp[0]["Lease Renewal Count"] });
                        console.log(selectedFinClause);
                        contextObj.realpropertyservice.submitUpdateLeaseFinancialClauses(JSON.stringify(selectedFinClause)).subscribe(function (resultData) {
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Lease added", 3);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        });
                    }
                    else {
                        var selectedFinClause = new Array();
                        selectedFinClause = contextObj.financialClauseIds;
                        selectedFinClause.push({ ReportFieldId: 6163, Value: resultData["Data"].ServerId });
                        selectedFinClause.push({ ReportFieldId: 6164, Value: temp[0]["Lease Renewal Count"] });
                        console.log(selectedFinClause);
                        contextObj.realpropertyservice.submitUpdateLeaseFinancialClauses(JSON.stringify(selectedFinClause)).subscribe(function (resultData) {
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Lease details updated", 3);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        });
                    }
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Lease Identifier already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2)
                        contextObj.notificationService.ShowToaster('Area and Cost Details not entered', 5);
                    break;
            }
        });
    };
    LeaseAddEditComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        if (this.action == "add") {
            if (fieldLabel == "Lease Type") {
                this.leaseTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
                    this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else {
                    this.ddlLeaseType.LookupDetails.PopupComponent = null;
                }
            }
        }
        else {
            if (fieldLabel == "Status") {
                this.leaseStatusId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseStatusId == 15) {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else if (this.leaseStatusId == 1) {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
                    if (contextObj.IsCostDataEntered == false && contextObj.IsRentDataEntered == false) {
                        contextObj.notificationService.ShowToaster("Area and Cost details not entered", 3);
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "37";
                        }, 100);
                    }
                    else if (contextObj.IsCostDataEntered == true && contextObj.IsRentDataEntered == false) {
                        contextObj.notificationService.ShowToaster("Rent Information not entered", 3);
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "37";
                        }, 100);
                    }
                    else if (contextObj.IsCostDataEntered == true && contextObj.IsRentDataEntered == true) {
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "1";
                        }, 100);
                    }
                }
                else {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
                }
            }
            if (fieldLabel == "Lease Type") {
                this.leaseTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
                    contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {
                        var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (temp != "[]") {
                            for (var i = 0; i < temp.length; i++) {
                                contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                            }
                        }
                    });
                    this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else {
                    this.ddlLeaseType.LookupDetails.PopupComponent = null;
                }
            }
        }
    };
    LeaseAddEditComponent.prototype.popupItemEmit = function (event) {
        this.splitviewInput.showSecondaryView == false;
        if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
            this.pageTitle = "Select Financial Clauses";
            this.financialClause = true;
            this.cancellationClause = false;
            this.leaseRenewalCount = 0;
        }
        if (this.leaseStatusId == 15) {
            this.pageTitle = "Cancellation Clauses";
            this.leaseStatus = "Active";
            this.cancellationClause = true;
            this.financialClause = false;
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseAddEditComponent.prototype.onSubmitFinanceClause = function (event) {
        var selectedFinClause = new Array();
        var contextobj = event;
        for (var i = 0; i < contextobj.returnData.length; i++) {
            selectedFinClause.push({ ReportFieldId: 6165, Value: contextobj.returnData[i].Value });
        }
        this.financialClauseIds = selectedFinClause;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseAddEditComponent.prototype.onSplitViewClose = function (event) {
        if (this.financialClause == true) {
            if (this.financialClauseIds.length == 0) {
                this.notificationService.ShowToaster("No Clause(s) selected", 2);
            }
        }
    };
    LeaseAddEditComponent.prototype.onSubmitCancelClause = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LeaseAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], LeaseAddEditComponent.prototype, "fieldDetailsAddEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LeaseAddEditComponent.prototype, "submitSuccess", void 0);
    LeaseAddEditComponent = __decorate([
        core_1.Component({
            selector: 'lease-addedit',
            templateUrl: 'app/Views/RealProperty/Lease/lease-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, popupadd_component_1.PopupAddComponent, split_view_component_1.SplitViewComponent, financial_clauses_1.FinancialClausesComponent, cancellation_clauses_1.CancellataionClausesComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'setFeatureLookupId', 'leaseTypeDdl', 'IsCostDataEntered', 'IsRentDataEntered', 'leaseStatus'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], LeaseAddEditComponent);
    return LeaseAddEditComponent;
}());
exports.LeaseAddEditComponent = LeaseAddEditComponent;
//# sourceMappingURL=lease-addedit.component.js.map