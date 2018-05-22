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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var listboxcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component');
var EmailRecipient = (function () {
    function EmailRecipient(workOrderService, notificationService, generFun) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.btnEnable = false;
        this.actionPointUserNumber = false;
        this.sectionExpansionStatus = [{ "title": "iDrawings Users", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }];
        this.sectionEnable = -1;
        this.inputItemsiDrawingsUser = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItemsiDrawingsUser = 0;
        this.itemsPerPageiDrawingsUser = 0;
        this.pageIndexiDrawingsUser = 0;
        this.inputItemsContractors = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItemsContractors = 0;
        this.itemsPerPageContractors = 0;
        this.pageIndexContractors = 0;
        this.inputItemsTechnicians = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItemsTechnicians = 0;
        this.itemsPerPageTechnicians = 0;
        this.pageIndexTechnicians = 0;
        this.actionPointUserId = "-1";
        this.generateSuccess = new core_1.EventEmitter();
        this.messageTemplateId = 0;
    }
    EmailRecipient.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        if (obj[1].title == "iDrawings Users") {
            if (this.itemsSourceiDrawingsUser == undefined || this.itemsSourceiDrawingsUser == null || this.itemsSourceiDrawingsUser.length == 0)
                this.loadiDrawingsUsers();
        }
        else if (obj[1].title == "Contractors") {
            if (this.itemsSourceContractors == undefined || this.itemsSourceContractors == null || this.itemsSourceContractors.length == 0)
                this.loadContractors();
        }
        else if (obj[1].title == "Technicians") {
            if (this.itemsSourceTechnicians == undefined || this.itemsSourceTechnicians == null || this.itemsSourceTechnicians.length == 0)
                this.loadTechnicians();
        }
    };
    ;
    EmailRecipient.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var rptFieldArray = new Array();
        rptFieldArray.push({
            ReportFieldId: 1419,
            Value: "0"
        });
        rptFieldArray.push({
            ReportFieldId: 271,
            Value: "9"
        });
        rptFieldArray.push({
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        rptFieldArray.push({
            ReportFieldId: 6573,
            Value: "3"
        });
        rptFieldArray.push({
            ReportFieldId: 5472,
            Value: "7"
        });
        var lookupRptFieldArray = new Array();
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 1419,
            Value: "0"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 271,
            Value: "9"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 6573,
            Value: "3"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 12449,
            Value: this.siteId.toString()
        });
        lookupRptFieldArray.push({
            FieldId: 1505,
            ReportFieldId: 5472,
            Value: "7"
        });
        /* this.workOrderService.getEmailRecipientField(0, 9, this.workTypeId,3,0).subscribe(function (resultData) { */
        this.workOrderService.getEmailRecipientField(JSON.stringify(lookupRptFieldArray)).subscribe(function (resultData) {
            var data = resultData["Data"];
            contextObj.ddlEmailRecipientActionPointUser = resultData["Data"].splice(0, 1)[0];
            /*var tempArray = [];
            for (let i = 0; i < contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues.length; i++) {
                tempArray.push(contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues[i]);
            }
            contextObj.ddlEmailRecipientActionPointUser.MultiFieldValues = tempArray; */
            if (contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues.length == 0) {
                contextObj.ddlEmailRecipientActionPointUser.IsEnabled = false;
                contextObj.ddlEmailRecipientActionPointUser.IsMandatory = false;
                contextObj.ddlEmailRecipientActionPointUser.IsVisible = false;
                contextObj.actionPointUserNumber = false;
            }
            else
                contextObj.actionPointUserNumber = true;
            contextObj.ddlEmailRecipientNotificationTemplate = resultData["Data"].splice(0, 1)[0];
        });
        /*this.loadiDrawingsUsers();
        this.loadContractors();
        this.loadTechnicians(); */
    };
    EmailRecipient.prototype.loadiDrawingsUsers = function () {
        var contextObj = this;
        var rptField = [448, 447];
        var count = rptField.length;
        this.workOrderService.getGenerateWorkOrderIdrawingsUsersFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObjectiDrawingsUser = (resultData["Data"]);
        });
        this.workOrderService.getGenerateWorkOrderIdrawingsUserstData(contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            if (contextObj.totalItemsiDrawingsUser > 0) {
                contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    };
    EmailRecipient.prototype.loadContractors = function () {
        var contextObj = this;
        var rptField = [1305, 1315];
        var count = rptField.length;
        this.workOrderService.getGenerateWorkOrdercontractorsListFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObjectContractors = (resultData["Data"]);
        });
        this.workOrderService.getGenerateWorkOrdercontractorsListtData(contextObj.pageIndexContractors, contextObj.inputItemsContractors.sortCol, contextObj.inputItemsContractors.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsContractors = resultData["Data"].DataCount;
            if (contextObj.totalItemsContractors > 0) {
                contextObj.itemsSourceContractors = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageContractors = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Contractors exist", 2);
            }
        });
    };
    EmailRecipient.prototype.loadTechnicians = function () {
        var contextObj = this;
        var rptField = [1384, 5386];
        var count = rptField.length;
        this.workOrderService.getGenerateWorkOrdertechniciansListFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObjectTechnicians = (resultData["Data"]);
        });
        this.workOrderService.getGenerateWorkOrdertechniciansListtData(contextObj.pageIndexTechnicians, contextObj.inputItemsTechnicians.sortCol, contextObj.inputItemsTechnicians.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsTechnicians = resultData["Data"].DataCount;
            if (contextObj.totalItemsTechnicians > 0) {
                contextObj.itemsSourceTechnicians = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageTechnicians = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Technicians exist", 2);
            }
        });
    };
    /*onChnageEmailRecipientActionPointUser(event: any) {
        
        this.btnEnable = this.ddlEmailRecipientActionPointUser.HasValidationError;
        this.actionPointUserId = event;
    } */
    EmailRecipient.prototype.onChnageEmailRecipientNotificationTemplate = function (event) {
        this.sectionEnable = Number(event);
        this.messageTemplateId = Number(event);
    };
    EmailRecipient.prototype.selectAllOptions = function (event) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    };
    EmailRecipient.prototype.selectAOneOptions = function (event) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    };
    EmailRecipient.prototype.Updateclick = function () {
        if (this.actionPointUserNumber == true && this.ddlEmailRecipientActionPointUser.MultiFieldValues == null) {
            this.notificationService.ShowToaster("Select at least one Action Point User", 2);
            return;
        }
        var contextObj = this;
        var userDetails = "";
        var actionPointUsers = new Array();
        var id = new Array();
        var pmId = new Array();
        var userDetailsString = new Array();
        if (this.messageTemplateId > 0) {
            //..............iDrawingsUser
            this.inputItemsiDrawingsUser.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceiDrawingsUser != undefined) {
                for (var i_1 = 0; i_1 < this.itemsSourceiDrawingsUser.length; i_1++) {
                    if (this.itemsSourceiDrawingsUser[i_1]["Select All"] == true) {
                        this.inputItemsiDrawingsUser.selectedIds.push(this.itemsSourceiDrawingsUser[i_1]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceiDrawingsUser[i_1]["Email"];
                    }
                }
                if (this.inputItemsiDrawingsUser.selectedIds.length > 0) {
                    userDetails = JSON.stringify(arrayList);
                }
            }
            //..................Contractors
            this.inputItemsContractors.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceContractors != undefined) {
                for (var i_2 = 0; i_2 < this.itemsSourceContractors.length; i_2++) {
                    if (this.itemsSourceContractors[i_2]["Select All"] == true) {
                        this.inputItemsContractors.selectedIds.push(this.itemsSourceContractors[i_2]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceContractors[i_2]["Email"];
                    }
                }
                if (this.inputItemsContractors.selectedIds.length > 0) {
                    if (userDetails.length > 0 && JSON.stringify(arrayList).length > 0)
                        userDetails = userDetails.substring(0, String(userDetails).length - 1) + "," + JSON.stringify(arrayList).substring(1, JSON.stringify(arrayList).length);
                    else if (JSON.stringify(arrayList).length > 0)
                        userDetails = JSON.stringify(arrayList);
                }
            }
            //...................Technicians
            this.inputItemsTechnicians.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceTechnicians != undefined) {
                for (var i_3 = 0; i_3 < this.itemsSourceTechnicians.length; i_3++) {
                    if (this.itemsSourceTechnicians[i_3]["Select All"] == true) {
                        this.inputItemsTechnicians.selectedIds.push(this.itemsSourceTechnicians[i_3]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceTechnicians[i_3]["Email"];
                    }
                }
                if (this.inputItemsTechnicians.selectedIds.length > 0) {
                    if (userDetails.length > 0 && JSON.stringify(arrayList).length > 0)
                        userDetails = userDetails.substring(0, String(userDetails).length - 1) + "," + JSON.stringify(arrayList).substring(1, JSON.stringify(arrayList).length);
                    else if (JSON.stringify(arrayList).length > 0)
                        userDetails = JSON.stringify(arrayList);
                }
            }
        }
        /*   if (userDetails.length > 0 || this.ddlEmailRecipientActionPointUser.MultiFieldValues != null) { */
        var pageDetails;
        var f = JSON.parse(this.gridDetails);
        if (this.ddlEmailRecipientActionPointUser.MultiFieldValues != null) {
            for (var i = 0; i < this.ddlEmailRecipientActionPointUser.MultiFieldValues.length; i++) {
                actionPointUsers[i] = this.ddlEmailRecipientActionPointUser.MultiFieldValues[i];
                f.push({
                    ReportFieldId: 12254,
                    Value: this.ddlEmailRecipientActionPointUser.MultiFieldValues[i]
                });
            }
        }
        f.push({
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        f.push({
            ReportFieldId: 5827,
            Value: "0"
        });
        pageDetails = JSON.stringify(f);
        this.ddlEmailRecipientActionPointUser.MultiFieldValues;
        if (userDetails.length > 0)
            userDetailsString = JSON.parse(userDetails);
        else
            userDetailsString = [];
        if (this.messageTemplateId > 0 && userDetailsString.length == 0) {
            this.notificationService.ShowToaster("Select Email Recipients", 2);
            return;
        }
        /*this.workOrderService.generateWorkOrderForActionPointUser(this.gridDetails, this.workTypeId, "0", this.actionPointUserId).subscribe(function (resultData) { */
        this.workOrderService.generateWorkOrderForActionPointUser(pageDetails, userDetailsString, this.messageTemplateId).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                if (userDetailsString.length > 0)
                    contextObj.notificationService.ShowToaster("Work Order generated and an email has been sent to the Notification Email Recipients", 3);
                else
                    contextObj.notificationService.ShowToaster("Work order generated", 3);
                contextObj.generateSuccess.emit({ status: "success" });
            }
            else {
                contextObj.notificationService.ShowToaster("Work order generated failed", 2);
                contextObj.generateSuccess.emit({ status: "failed" });
            }
        });
        /* }
         else {
             contextObj.notificationService.ShowToaster("Select either an action point user or technicians", 2);
         } */
    };
    EmailRecipient.prototype.onSortiDrawingsUser = function (objGrid) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderIdrawingsUserstData(contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
        });
    };
    EmailRecipient.prototype.onSortContractors = function (objGrid) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrdercontractorsListtData(contextObj.pageIndexContractors, contextObj.inputItemsContractors.sortCol, contextObj.inputItemsContractors.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsContractors = resultData["Data"].DataCount;
            contextObj.itemsSourceContractors = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageContractors = resultData["Data"].RowsPerPage;
        });
    };
    EmailRecipient.prototype.onSortTechnicians = function (objGrid) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrdertechniciansListtData(contextObj.pageIndexTechnicians, contextObj.inputItemsTechnicians.sortCol, contextObj.inputItemsTechnicians.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsTechnicians = resultData["Data"].DataCount;
            contextObj.itemsSourceTechnicians = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageTechnicians = resultData["Data"].RowsPerPage;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmailRecipient.prototype, "generateSuccess", void 0);
    EmailRecipient = __decorate([
        core_1.Component({
            selector: 'email-recipient',
            templateUrl: './app/Views/WorkOrder/Generate PM WOs/email-recipient.component.html',
            directives: [section_component_1.SectionComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification, grid_component_1.GridComponent, listboxcomponent_component_1.ListBoxComponent],
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['workTypeId', 'gridDetails', 'siteId']
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], EmailRecipient);
    return EmailRecipient;
}());
exports.EmailRecipient = EmailRecipient;
//# sourceMappingURL=email-recipient.component.js.map