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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var WarrantyAlert = (function () {
    function WarrantyAlert(workOrderService, objectsService, notificationService, generFun) {
        this.workOrderService = workOrderService;
        this.objectsService = objectsService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.btnEnable = true;
        this.sectionExpansionStatus = [{ "title": "iDrawings Users", "isExpanded": false }, { "title": "Contacts", "isExpanded": false }];
        this.sectionEnable = -1;
        this.inputItemsiDrawingsUser = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItemsiDrawingsUser = 0;
        this.itemsPerPageiDrawingsUser = 0;
        this.pageIndexiDrawingsUser = 0;
        this.inputItemsContacts = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
        this.totalItemsContacts = 0;
        this.itemsPerPageContacts = 0;
        this.pageIndexContacts = 0;
        this.actionPointUserId = "-1";
        this.generateSuccess = new core_1.EventEmitter();
        this.messageTemplateId = 0;
    }
    WarrantyAlert.prototype.onSectionExpandChange = function (obj) {
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
        else if (obj[1].title == "Contacts") {
            if (this.itemsSourceContacts == undefined || this.itemsSourceContacts == null || this.itemsSourceContacts.length == 0)
                this.loadContacts();
        }
    };
    ;
    WarrantyAlert.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        debugger;
        var rptFieldArray = new Array();
        rptFieldArray.push({
            ReportFieldId: 5472,
            Value: "24"
        });
        var lookupRptFieldArray = new Array();
        lookupRptFieldArray.push({
            FieldId: 1505,
            ReportFieldId: 5472,
            Value: "24"
        });
        this.objectsService.getEmailRecipientField(JSON.stringify(lookupRptFieldArray)).subscribe(function (resultData) {
            var data = resultData["Data"];
            resultData["Data"][0].IsMandatory = true;
            contextObj.ddlEmailRecipientNotificationTemplate = resultData["Data"].splice(0, 1)[0];
            contextObj.loadiDrawingsUsers();
            contextObj.loadContacts();
        });
    };
    WarrantyAlert.prototype.loadiDrawingsUsers = function () {
        var contextObj = this;
        var rptField = [448, 447];
        var count = rptField.length;
        this.objectsService.getIdrawingsUsersFields().subscribe(function (resultData) {
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
        this.objectsService.getIdrawingsUserstData(this.objectId, contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
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
    WarrantyAlert.prototype.loadContacts = function () {
        var contextObj = this;
        var rptField = [1305, 1315];
        var count = rptField.length;
        this.objectsService.getContactsListFields().subscribe(function (resultData) {
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
            contextObj.fieldObjectContacts = (resultData["Data"]);
        });
        this.objectsService.getContactsListtData(this.objectId, contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            if (contextObj.totalItemsContacts > 0) {
                contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Contacts exist", 2);
            }
        });
    };
    /*onChnageEmailRecipientActionPointUser(event: any) {
        
        this.btnEnable = this.ddlEmailRecipientActionPointUser.HasValidationError;
        this.actionPointUserId = event;
    } */
    WarrantyAlert.prototype.onChnageEmailRecipientNotificationTemplate = function (event) {
        this.sectionEnable = Number(event);
        this.messageTemplateId = Number(event);
    };
    WarrantyAlert.prototype.selectAllOptions = function (event) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    };
    WarrantyAlert.prototype.selectAOneOptions = function (event) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    };
    WarrantyAlert.prototype.Updateclick = function () {
        var contextObj = this;
        var arr = new Array();
        if (this.messageTemplateId > 0) {
            //..............iDrawingsUser
            this.inputItemsiDrawingsUser.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceiDrawingsUser != undefined) {
                for (var i = 0; i < this.itemsSourceiDrawingsUser.length; i++) {
                    if (this.itemsSourceiDrawingsUser[i]["Select All"] == true) {
                        this.inputItemsiDrawingsUser.selectedIds.push(this.itemsSourceiDrawingsUser[i]["Id"]);
                        arr.push({ ReportFieldId: 12306, Value: this.itemsSourceiDrawingsUser[i]["Id"] });
                    }
                }
            }
            //..................Contacts
            this.inputItemsContacts.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceContacts != undefined) {
                for (var i = 0; i < this.itemsSourceContacts.length; i++) {
                    if (this.itemsSourceContacts[i]["Select All"] == true) {
                        this.inputItemsContacts.selectedIds.push(this.itemsSourceContacts[i]["Id"]);
                        arr.push({ ReportFieldId: 12308, Value: this.itemsSourceContacts[i]["Id"] });
                    }
                }
            }
        }
        arr.push({ ReportFieldId: 12302, Value: this.objectId });
        arr.push({ ReportFieldId: 12303, Value: this.messageTemplateId.toString() });
        arr.push({ ReportFieldId: 12304, Value: this.warrantyNotificationDate });
        var strRptFields = JSON.stringify(arr);
        if (this.messageTemplateId > 0 && this.inputItemsiDrawingsUser.selectedIds.length == 0 && this.inputItemsContacts.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select at least one User", 2);
            return;
        }
        if (this.messageTemplateId > 0) {
            this.objectsService.updateWarrantyAlert(strRptFields).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.generateSuccess.emit({ returnData: "success" });
                    contextObj.notificationService.ShowToaster("Alert updated", 3);
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Notification Template", 2);
        }
    };
    WarrantyAlert.prototype.onSortiDrawingsUser = function (objGrid) {
        var contextObj = this;
        this.objectsService.getIdrawingsUserstData(this.objectId, contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
        });
    };
    WarrantyAlert.prototype.onSortContacts = function (objGrid) {
        var contextObj = this;
        this.objectsService.getContactsListtData(this.objectId, contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;
        });
    };
    WarrantyAlert.prototype.iDrawingpageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndexiDrawingsUser = event.pageEvent.page;
        this.objectsService.getIdrawingsUserstData(this.objectId, contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
        });
    };
    WarrantyAlert.prototype.contactpageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndexContacts = event.pageEvent.page;
        this.objectsService.getContactsListtData(this.objectId, contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {
            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WarrantyAlert.prototype, "generateSuccess", void 0);
    WarrantyAlert = __decorate([
        core_1.Component({
            selector: 'warranty-alert',
            templateUrl: './app/Views/Objects/Data/warranty-alert.component.html',
            directives: [section_component_1.SectionComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification, grid_component_1.GridComponent, listboxcomponent_component_1.ListBoxComponent, paging_component_1.PagingComponent],
            providers: [workorder_service_1.WorkOrdereService, objects_service_1.ObjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['objectId', 'warrantyNotificationDate']
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, objects_service_1.ObjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], WarrantyAlert);
    return WarrantyAlert;
}());
exports.WarrantyAlert = WarrantyAlert;
//# sourceMappingURL=warranty-alert.component.js.map