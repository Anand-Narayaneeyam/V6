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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var agreementclause_addedit_1 = require('./agreementclause-addedit');
var lease_agreementclauses_1 = require('./lease-agreementclauses');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var AgreementClausesComponent = (function () {
    function AgreementClausesComponent(realPropertyService, notificationService, generFun, administrationServices) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationServices = administrationServices;
        this.showSlide = false;
        this.position = "top-right";
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: "ASC", sortCol: "" };
        this.enableMenu = [];
    }
    AgreementClausesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var tempData;
        if (this.pageTarget == 1) {
            this.menuData = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 10052
                },
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 10052
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "submenu": null,
                    "privilegeId": 10052
                }
            ];
            this.enableMenu = [];
            this.realPropertyService.getAgreementClausesFields().subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
                var leaseIdentifier = contextObj.fieldObject.find(function (el) { return el.FieldId === 1662; });
                leaseIdentifier["IsVisible"] = false;
                var attachments = contextObj.fieldObject.find(function (el) { return el.FieldId === 1737; });
                attachments["IsVisible"] = false;
            });
            this.realPropertyService.getAgreementClausesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    tempData = JSON.parse(resultData["Data"].FieldBinderData);
                    for (var i = 0; i < tempData.length; i++) {
                        if (tempData[i]["Is Service Clause"]) {
                            tempData[i]["Is Service Clause"] = "True";
                        }
                        else {
                            tempData[i]["Is Service Clause"] = "False";
                        }
                        if (tempData[i]["Payable"]) {
                            tempData[i]["Payable"] = "True";
                        }
                        else {
                            tempData[i]["Payable"] = "False";
                        }
                    }
                    contextObj.itemsSource = tempData;
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [0, 1, 2];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                    contextObj.enableMenu = [0];
                }
            });
        }
        else {
            this.menuData = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 10052
                },
            ];
            this.enableMenu = [];
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
            this.realPropertyService.getAgreementClausesFields().subscribe(function (resultData) {
                contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
                contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
                var removeArr = [5770];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
                var payable = contextObj.fieldObject.find(function (el) { return el.FieldId === 1736; });
                //payable["FieldLabel"] = "Paid By";
            });
            this.leaseAgreementClauseList();
        }
    };
    AgreementClausesComponent.prototype.leaseAgreementClauseList = function () {
        var contextObj = this;
        var tempData;
        this.realPropertyService.getLeaseClausesByLeaseUrl(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                tempData = JSON.parse(resultData["Data"].FieldBinderData);
                for (var i = 0; i < tempData.length; i++) {
                    if (tempData[i]["Is Service Clause"]) {
                        tempData[i]["Is Service Clause"] = "True";
                    }
                    else {
                        tempData[i]["Is Service Clause"] = "False";
                    }
                    if (tempData[i]["Payable"]) {
                        tempData[i]["Payable"] = "True";
                    }
                    else {
                        tempData[i]["Payable"] = "False";
                    }
                }
                contextObj.itemsSource = tempData;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });
    };
    AgreementClausesComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                if (this.pageTarget == 1) {
                    this.target = 1;
                    this.addClick(1);
                }
                else if (this.pageTarget) {
                    this.target = 2;
                    this.addClick(2);
                }
                break;
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.target = 3;
                this.attachmentClick();
                break;
        }
    };
    AgreementClausesComponent.prototype.addClick = function (pageTarget) {
        this.action = "add";
        if (pageTarget == 1) {
            this.btnName = "Save";
            this.pageTitle = "New Agreement Clause";
            var contextObj = this;
            this.realPropertyService.loadAgreementClausesAddEdit(0, 1).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            this.pageTitle = "Select Agreement Clauses";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    AgreementClausesComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Agreement Clause";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        }
        else {
            this.realPropertyService.loadAgreementClausesAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    AgreementClausesComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        }
        else {
            contextObj.realPropertyService.checkAgreementClausesInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == true) {
                    contextObj.deleteAgreementClauses();
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    AgreementClausesComponent.prototype.deleteAgreementClauses = function () {
        var contextObj = this;
        this.realPropertyService.postDeleteAgreementClauses(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                }
                contextObj.notificationService.ShowToaster("Selected Agreement Clause deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Agreement Clause linked to a Lease, cannot be deleted", 5);
            }
        });
    };
    AgreementClausesComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        var contextObj = this;
        var tempData;
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                if (this.pageTarget == 1) {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    if (this.totalItems > 0) {
                        this.enableMenu = [0, 1, 2];
                    }
                    tempData = retUpdatedSrc["itemSrc"];
                    for (var i = 0; i < this.totalItems; i++) {
                        if (tempData[i]["Id"] == this.inputItems.selectedIds[0]) {
                            if (tempData[i]["Is Service Clause"]) {
                                tempData[i]["Is Service Clause"] = "True";
                            }
                            else {
                                tempData[i]["Is Service Clause"] = "False";
                            }
                            if (tempData[i]["Payable"]) {
                                tempData[i]["Payable"] = "True";
                            }
                            else {
                                tempData[i]["Payable"] = "False";
                            }
                        }
                    }
                    this.itemsSource = tempData;
                }
                else {
                    this.leaseAgreementClauseList();
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                tempData = retUpdatedSrc["itemSrc"];
                for (var i = 0; i < this.totalItems; i++) {
                    if (tempData[i]["Id"] == this.inputItems.selectedIds[0]) {
                        if (tempData[i]["Is Service Clause"]) {
                            tempData[i]["Is Service Clause"] = "True";
                        }
                        else {
                            tempData[i]["Is Service Clause"] = "False";
                        }
                        if (tempData[i]["Payable"]) {
                            tempData[i]["Payable"] = "True";
                        }
                        else {
                            tempData[i]["Payable"] = "False";
                        }
                    }
                }
                //this.itemsSource = tempData;
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    AgreementClausesComponent.prototype.attachmentClick = function () {
        var contextObj = this;
        this.pageTitle = "Attachments";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        }
        else {
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    AgreementClausesComponent.prototype.attachmentSuccess = function (event) {
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["Id"] === selId;
        });
        //switch (event["status"]) {
        //    case "success":
        //        selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
        //        break;
        //    case "delete":
        //        selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
        //        break;
        //}
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedData;
    };
    AgreementClausesComponent.prototype.okDelete = function (event) {
        this.deleteAgreementClauses();
        this.showSlide = !this.showSlide;
    };
    AgreementClausesComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AgreementClausesComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    AgreementClausesComponent = __decorate([
        core_1.Component({
            selector: 'agreement-clauses',
            templateUrl: 'app/Views/RealProperty/GeneralSettings/agreement-clauses.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, labelcomponent_component_1.LabelComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent, agreementclause_addedit_1.AgreementClauseAddEditComponent, lease_agreementclauses_1.LeaseAgreementClausesComponent, attachments_component_1.AttachmentsComponent],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['leaseId', 'leaseRenewalCount', 'leaseIdentifier', 'pageTarget']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], AgreementClausesComponent);
    return AgreementClausesComponent;
}());
exports.AgreementClausesComponent = AgreementClausesComponent;
//# sourceMappingURL=agreement-clauses.js.map