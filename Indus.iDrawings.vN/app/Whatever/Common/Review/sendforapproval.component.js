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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var SendForApprovalComponent = (function () {
    function SendForApprovalComponent(documentService, employeeService, notificationService, _validateService) {
        this.documentService = documentService;
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.btnName = "";
        this.submitSuccess = new core_1.EventEmitter();
    }
    SendForApprovalComponent.prototype.ngOnInit = function () {
        this.btnName = "Send Request";
    };
    SendForApprovalComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["selectedid"] && changes["selectedid"]["currentValue"] != changes["selectedid"]["previousValue"]) {
            var fieldobj = new Array();
            fieldobj.push({
                FieldId: 794,
                ReportFieldId: 5854,
                Value: this.moduleid.toString()
            }, {
                FieldId: 794,
                ReportFieldId: 5853,
                Value: this.workflowcategoryId.toString()
            }, {
                FieldId: 794,
                ReportFieldId: 6570,
                Value: this.entityWorkflowCategoryId.toString()
            });
            switch (this.moduleid) {
                case 4:
                    this.employeeService.getSendForApprovalFields(fieldobj).subscribe(function (resultData) {
                        contextObj.sendForApprovalField = resultData["Data"];
                        for (var i = 0; i < contextObj.sendForApprovalField.length; i++) {
                            if (contextObj.sendForApprovalField[i].ReportFieldId == 5864) {
                                contextObj.sendForApprovalField[i].IsEnabled = false;
                                contextObj.sendForApprovalField[i].IsMandatory = false;
                                contextObj.sendForApprovalField[i].FieldLabel = "Next Action Point User(s)";
                            }
                            else if (contextObj.sendForApprovalField[i].ReportFieldId == 967) {
                                contextObj.sendForApprovalField[i].FieldValue = contextObj.rowdata["Document Number"];
                            }
                            else if (contextObj.sendForApprovalField[i].ReportFieldId == 960) {
                                contextObj.sendForApprovalField[i].FieldValue = contextObj.rowdata["File Name"];
                            }
                        }
                    });
                    break;
                case 5:
                    this.employeeService.getSendForApprovalFields(fieldobj).subscribe(function (resultData) {
                        contextObj.sendForApprovalField = resultData["Data"];
                        for (var i = 0; i < contextObj.sendForApprovalField.length; i++) {
                            if (contextObj.sendForApprovalField[i].ReportFieldId == 5864) {
                                contextObj.sendForApprovalField[i].IsEnabled = false;
                            }
                            else if (contextObj.sendForApprovalField[i].ReportFieldId == 967) {
                                contextObj.sendForApprovalField[i].IsVisible = false;
                            }
                            else if (contextObj.sendForApprovalField[i].ReportFieldId == 960) {
                                contextObj.sendForApprovalField[i].IsVisible = false;
                            }
                        }
                    });
                    break;
            }
        }
    };
    SendForApprovalComponent.prototype.getFormattedDate = function (dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    };
    SendForApprovalComponent.prototype.onSubmitData = function (event) {
        var date = new Date();
        var fieldObj = new Array();
        var newdate = this.getFormattedDate(date);
        //alert(this.workflowcategoryId);
        //alert(this.entityWorkflowCategoryId);
        fieldObj.push({
            ReportFieldId: 5861,
            Value: this.workTypeId.toString()
        }, {
            ReportFieldId: 5865,
            Value: newdate.toString()
        }, {
            ReportFieldId: 5866,
            Value: newdate.toString()
        }, {
            ReportFieldId: 6570,
            Value: this.entityWorkflowCategoryId.toString()
        });
        switch (this.workflowcategoryId) {
            case 4:
                fieldObj.push({
                    ReportFieldId: 5864,
                    Value: event["fieldObject"][1].toString()
                });
                this.employeeService.SubmitSendForApproval(fieldObj).subscribe();
                break;
            case 6:
                debugger;
                var fieldObject = JSON.parse(event["fieldobject"]);
                fieldObject.push({
                    ReportFieldId: 5909,
                    Value: "964"
                }, {
                    ReportFieldId: 5911,
                    Value: this.rowdata["Latest Revision No"].toString()
                }, {
                    ReportFieldId: 5919,
                    Value: this.rowdata["File Name"].toString()
                }, {
                    ReportFieldId: 6570,
                    Value: this.entityWorkflowCategoryId.toString()
                });
                var contextObj = this;
                if (this.entityWorkflowCategoryId == 19) {
                    fieldObject.push({
                        ReportFieldId: 5910,
                        Value: this.DocId.toString()
                    }, {
                        ReportFieldId: 5914,
                        Value: "37"
                    });
                    this.documentService.SendPublishRequest(fieldObject, this.selectedid, this.DocId).subscribe(function (resultData) {
                        contextObj.returnData = resultData;
                        switch (resultData.StatusId) {
                            case -1:
                                contextObj.notificationService.ShowToaster("Failure", 5);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("Request sent for Document Publish", 3);
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.returnData["Data"] });
                                break;
                        }
                    });
                }
                else {
                    fieldObject.push({
                        ReportFieldId: 5910,
                        Value: this.selectedid.toString()
                    }, {
                        ReportFieldId: 5914,
                        Value: "33"
                    });
                    this.documentService.SendCheckoutRequest(fieldObject, this.selectedid).subscribe(function (resultData) {
                        contextObj.returnData = resultData;
                        switch (resultData.StatusId) {
                            case -1:
                                contextObj.notificationService.ShowToaster("Failure", 5);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("Request sent for Document Check Out", 3);
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.returnData["Data"] });
                                break;
                        }
                    });
                }
                break;
        }
    };
    SendForApprovalComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var ddlNextActionPointUsers = this.sendForApprovalField.find(function (item) {
            return item.FieldId === 795;
        });
        if (fieldId == 794) {
            this.workTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            if (this.moduleid == 5) {
                var fieldObj = new Array();
                fieldObj.push({
                    FieldId: 795,
                    ReportFieldId: 5832,
                    Value: this.workTypeId.toString()
                }, {
                    FieldId: 795,
                    ReportFieldId: 5829,
                    Value: "-1"
                }, {
                    FieldId: 795,
                    ReportFieldId: 6570,
                    Value: this.entityWorkflowCategoryId.toString()
                });
                this.employeeService.getActionPoint(fieldObj).subscribe();
            }
            else if (this.moduleid == 4) {
                if (this.workTypeId > -1) {
                    var arrList = new Array();
                    arrList.push({
                        ReportFieldId: 5832,
                        Value: this.workTypeId.toString()
                    }, {
                        ReportFieldId: 5829,
                        Value: "0"
                    }, {
                        ReportFieldId: 6570,
                        Value: this.entityWorkflowCategoryId.toString()
                    });
                    this.employeeService.checkIsSpecificUser(50414, JSON.stringify(arrList)).subscribe(function (resultData) {
                        if (resultData["Data"] != "[]") {
                            var specifyUserDetails = JSON.parse(resultData["Data"]);
                            if (specifyUserDetails[0].IsSpecificUser) {
                                ddlNextActionPointUsers.IsEnabled = true;
                                ddlNextActionPointUsers.IsMandatory = true;
                                ddlNextActionPointUsers.HasValidationError = true;
                                ddlNextActionPointUsers.IsLocallyValidated = false;
                                contextObj.initiateValidation(ddlNextActionPointUsers.FieldId, ddlNextActionPointUsers);
                                var usersArrList = new Array();
                                usersArrList.push({
                                    ReportFieldId: 5832,
                                    Value: contextObj.workTypeId.toString()
                                }, {
                                    ReportFieldId: 1419,
                                    Value: "0"
                                }, {
                                    ReportFieldId: 5854,
                                    Value: contextObj.moduleid.toString()
                                }, {
                                    ReportFieldId: 6570,
                                    Value: contextObj.entityWorkflowCategoryId.toString()
                                });
                                contextObj.employeeService.loadNextActionPointUsers(51229, JSON.stringify(usersArrList)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        ddlNextActionPointUsers.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    }
                                });
                            }
                            else {
                                ddlNextActionPointUsers.IsEnabled = false;
                                ddlNextActionPointUsers.IsMandatory = false;
                                ddlNextActionPointUsers.HasValidationError = false;
                                ddlNextActionPointUsers.IsLocallyValidated = false;
                                ddlNextActionPointUsers.LookupDetails.LookupValues = [];
                                ddlNextActionPointUsers.FieldValue = "-1";
                            }
                        }
                    });
                }
                else {
                    ddlNextActionPointUsers.LookupDetails.LookupValues = [];
                    ddlNextActionPointUsers.IsEnabled = false;
                    ddlNextActionPointUsers.IsMandatory = false;
                    ddlNextActionPointUsers.HasValidationError = false;
                    ddlNextActionPointUsers.FieldValue = "-1";
                }
            }
        }
    };
    SendForApprovalComponent.prototype.initiateValidation = function (id, fieldObject) {
        var contextObj = this;
        var el = document.getElementById(id);
        setTimeout(function () {
            contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SendForApprovalComponent.prototype, "submitSuccess", void 0);
    SendForApprovalComponent = __decorate([
        core_1.Component({
            selector: 'send-for-approval',
            templateUrl: 'app/Views/Common/Review/sendforapproval.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, documents_service_1.DocumentService, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent],
            inputs: ['selectedid', 'moduleid', 'workflowcategoryId', 'entityWorkflowCategoryId', 'rowdata', 'DocId'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, employee_services_1.EmployeeService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], SendForApprovalComponent);
    return SendForApprovalComponent;
}());
exports.SendForApprovalComponent = SendForApprovalComponent;
//# sourceMappingURL=sendforapproval.component.js.map