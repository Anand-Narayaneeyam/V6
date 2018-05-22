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
var common_service_1 = require('../../../Models/Common/common.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var email_service_1 = require('./email.service');
var EmailRecipientsScheduleReport = (function () {
    // @Input() clearEmailUserIds: boolean;
    function EmailRecipientsScheduleReport(commonService, _notificationService, _emailRecService) {
        this.commonService = commonService;
        this._notificationService = _notificationService;
        this._emailRecService = _emailRecService;
        // @Input() clearEmailRec: boolean;
        this.emailRecUpdated = new core_1.EventEmitter();
        this.inputItems = {
            dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true, selectioMode: "single", isHeaderCheckBx: true
        };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.reportId = 0;
        this.updateHistory = false;
        this.ddlSelectedVal = false;
    }
    EmailRecipientsScheduleReport.prototype.ngOnInit = function () {
        debugger;
        this.btnSave = "Save Changes";
        if (this.fieldDetailsEdit) {
            this.reportId = this.fieldDetailsEdit.Id;
            this.clearEmailInvokedStatus();
            if (this.emailRecCount > 0) {
                debugger;
                this._emailRecService.setStatus(false);
            }
            if (this.emailRecCount == 0) {
                debugger;
                this.clearEmailRecUserIds();
                this._emailRecService.setStatus(true);
            }
        }
        else if (this.emailRecCount == 0 && this.emailRecEditCount == 0) {
            this.clearEmailRecUserIds();
            this._emailRecService.setStatus(true);
        }
    };
    EmailRecipientsScheduleReport.prototype.dalaLoad = function (ddlFVal) {
        var contextObj = this;
        var ddlFvalue = ddlFVal;
        var actIndex = this.getActualIndex(ddlFvalue);
        if (ddlFVal != -1) {
            contextObj.ddlSelectedVal = true;
            contextObj.commonService.loadEmailRecipientsList(ddlFVal, contextObj.reportId).subscribe(function (result) {
                debugger;
                if (JSON.parse(result.FieldBinderData).length > 0) {
                    contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                    if (EmailReciepient[actIndex].Invoked == false) {
                        contextObj.fillEmailRecEdit(ddlFvalue);
                    }
                    if (EmailReciepient[actIndex].Invoked == true) {
                        contextObj.filterForUpdate(ddlFvalue);
                    }
                    if (contextObj._emailRecService.getStatus() == false) {
                        // this.clearEmailRecUserIds();
                        contextObj.preSelectCheckedUsers(ddlFVal);
                    }
                }
                else {
                    contextObj._notificationService.ShowToaster("No Email Recipients exist", 2);
                    contextObj.itemsSource = [];
                }
            });
        }
        else {
            contextObj.ddlSelectedVal = false;
            contextObj.itemsSource = [];
        }
    };
    EmailRecipientsScheduleReport.prototype.filterForUpdate = function (ddlFvalue) {
        var actIndex = this.getActualIndex(ddlFvalue);
        if (EmailReciepient[actIndex].UserIds.length == 0) {
            this.itemsSource.find(function (item) {
                return item['Select All'] = false;
            });
        }
        //for (var i = 0; i < EmailReciepient[actIndex].UserIds.length; i++) {
        //   this.itemsSource.find(function (item) {
        //        if (item.Id == EmailReciepient[actIndex].UserIds[i]) {
        //            return item['Select All'] = true;
        //        }
        //        else {
        //            return item['Select All'] = false;
        //        }
        //    });
        //}
        return;
    };
    EmailRecipientsScheduleReport.prototype.fillEmailRecEdit = function (ddlFvalue) {
        var actIndex = this.getActualIndex(ddlFvalue);
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]['Select All'] == true || this.itemsSource[i]['Select All'] == 1) {
                if (!EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id)) {
                    EmailReciepient[actIndex].UserIds.push(this.itemsSource[i].Id);
                }
            }
        }
        debugger;
    };
    EmailRecipientsScheduleReport.prototype.preSelectCheckedUsers = function (ddlVal) {
        switch (ddlVal) {
            case 2:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[0].UserIds.length; j++) {
                        if (EmailReciepient[0].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 4:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[1].UserIds.length; j++) {
                        if (EmailReciepient[1].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 5:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[2].UserIds.length; j++) {
                        if (EmailReciepient[2].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 6:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[3].UserIds.length; j++) {
                        if (EmailReciepient[3].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 7:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[4].UserIds.length; j++) {
                        if (EmailReciepient[4].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            default:
                break;
        }
    };
    EmailRecipientsScheduleReport.prototype.Update = function () {
        this.updateHistory = true;
        var actIndex = this.getActualIndex(this.selectedDDLId);
        //EmailReciepient[actIndex].UserIds = [];
        EmailReciepient[actIndex].Invoked = true;
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]['Select All'] == true) {
                if (!EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id)) {
                    EmailReciepient[actIndex].UserIds.push(this.itemsSource[i].Id);
                }
            }
            else {
                debugger;
                if (EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id)) {
                    var index = EmailReciepient[actIndex].UserIds.indexOf(this.itemsSource[i].Id);
                    if (index > -1) {
                        EmailReciepient[actIndex].UserIds.splice(index, 1);
                    }
                }
            }
        }
        if (this.getEmailRecipientsCount() > 0) {
            this._notificationService.ShowToaster("Email Recipients updated", 3);
            this._emailRecService.setStatus(false);
            this.emailRecUpdated.emit(EmailReciepient);
        }
        else {
            this._notificationService.ShowToaster("Select atleast one Email Recipient", 5);
        }
        debugger;
    };
    EmailRecipientsScheduleReport.prototype.getEmailRecipientsCount = function () {
        return EmailReciepient[0].UserIds.length +
            EmailReciepient[1].UserIds.length +
            EmailReciepient[2].UserIds.length +
            EmailReciepient[3].UserIds.length +
            EmailReciepient[4].UserIds.length;
    };
    EmailRecipientsScheduleReport.prototype.ddlChange = function (event) {
        if (event.ChildFieldObject.FieldId == 2742) {
            var ddlFieldValue = event.ChildFieldObject.FieldValue;
            ddlFieldValue = parseInt(ddlFieldValue);
            if (ddlFieldValue == 2 || ddlFieldValue == 7 || ddlFieldValue == 6 || ddlFieldValue == 5 || ddlFieldValue == 4) {
                this.dalaLoad(ddlFieldValue);
                this.selectedDDLId = ddlFieldValue;
            }
            else {
                this.dalaLoad(-1);
            }
        }
    };
    EmailRecipientsScheduleReport.prototype.getActualIndex = function (catId) {
        switch (catId) {
            case 2:
                return 0;
            case 4:
                return 1;
            case 5:
                return 2;
            case 6:
                return 3;
            case 7:
                return 4;
            default:
                break;
        }
    };
    EmailRecipientsScheduleReport.prototype.clearEmailRecUserIds = function () {
        debugger;
        EmailReciepient[0].UserIds = [];
        EmailReciepient[1].UserIds = [];
        EmailReciepient[2].UserIds = [];
        EmailReciepient[3].UserIds = [];
        EmailReciepient[4].UserIds = [];
    };
    EmailRecipientsScheduleReport.prototype.clearEmailInvokedStatus = function () {
        debugger;
        EmailReciepient[0].Invoked = false;
        EmailReciepient[1].Invoked = false;
        EmailReciepient[2].Invoked = false;
        EmailReciepient[3].Invoked = false;
        EmailReciepient[4].Invoked = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmailRecipientsScheduleReport.prototype, "emailRecFieldDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmailRecipientsScheduleReport.prototype, "fieldTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmailRecipientsScheduleReport.prototype, "fieldUserCategory", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmailRecipientsScheduleReport.prototype, "reportTitle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmailRecipientsScheduleReport.prototype, "emailRecUpdated", void 0);
    EmailRecipientsScheduleReport = __decorate([
        core_1.Component({
            selector: 'emailrecipients-schedulereport',
            templateUrl: './app/Views/Common/ScheduleReport/emailrecipients-schedulereport.component.html',
            providers: [common_service_1.CommonService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            inputs: ['selectedId', 'action', 'reportTitle',
                'fieldDetailsEdit', 'fieldTitle', 'fieldUserCategory', 'emailRecFieldDetails', 'emailRecCount', 'emailRecEditCount'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService, email_service_1.EmailRecipientService])
    ], EmailRecipientsScheduleReport);
    return EmailRecipientsScheduleReport;
}());
exports.EmailRecipientsScheduleReport = EmailRecipientsScheduleReport;
var EmailReciepient = [
    {
        ReciepientType: 2,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 4,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 5,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 6,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 7,
        UserIds: [],
        Invoked: false
    }
];
//# sourceMappingURL=emailrecipients-schedulereport.component.js.map