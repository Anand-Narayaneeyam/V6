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
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RentPaymentComponent = (function () {
    function RentPaymentComponent(realPropertyService, notificationService, administrationServices, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.administrationServices = administrationServices;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.target = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
        this.success = "";
        this.menuData = [
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 10051
            }
        ];
        this.gridcount = 8;
        this.types = false;
        this.enableMenu = [];
        this.outcomeCount = new core_1.EventEmitter();
    }
    RentPaymentComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
        contextObj.loadData();
    };
    RentPaymentComponent.prototype.ngOnChanges = function (changes) {
    };
    RentPaymentComponent.prototype.loadData = function () {
        var contextObj = this;
        contextObj.realPropertyService.getRentInformationFields().subscribe(function (resultData) {
            contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
            contextObj.fieldRenewalCount = resultData["Data"].find(function (el) { return el.ReportFieldId === 7866; });
            contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
            contextObj.fieldRenewalCount["FieldValue"] = contextObj.leaseRenewalCount;
            var removeArr = [5770, 7866];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            contextObj.realPropertyService.getRentInformation(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.leaseId, contextObj.leaseRenewalCount).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
                if (contextObj.gridcount > 0) {
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Rent Payments exist", 2);
                }
            });
        });
    };
    RentPaymentComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
        }
    };
    RentPaymentComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.realPropertyService.getRentInformation(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    RentPaymentComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.realPropertyService.getRentInformation(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    RentPaymentComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.realPropertyService.updateRentPayment(this.leaseId, this.leaseRenewalCount, this.inputItems.rowData["Payment No"]).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1768:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "Lease Payment Number";
                            break;
                        case 1858:
                            contextObj.fieldDetailsAddEdit[i]["ReadOnlyMode"] = true;
                            break;
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    RentPaymentComponent.prototype.onSubmit = function (event) {
        var statusID = 44;
        var paidamount;
        var data = JSON.parse(event["fieldobject"]);
        var d1;
        var d2;
        data.find(function (item) {
            switch (item.ReportFieldId) {
                case 7865:
                    d1 = item;
                    break;
                case 7869:
                    d2 = item;
                    break;
                case 7872:
                    paidamount = item.Value;
                    break;
            }
        });
        var index;
        index = data.indexOf(d1);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d2);
        if (index > -1) {
            data.splice(index, 1);
        }
        if (parseInt(paidamount) > 0) {
            statusID = 42;
        }
        data.push({
            ReportFieldId: 7865,
            Value: this.leaseId.toString()
        });
        data.push({
            ReportFieldId: 7869,
            Value: statusID.toString()
        });
        this.refreshgrid = [];
        var contextObj = this;
        contextObj.realPropertyService.updateRentPaymentSubmit(JSON.stringify(data)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempData = JSON.parse(resultData["Data"]["Data"]);
                    var tempStatusId = tempData[0]["StatusId"];
                    if (tempStatusId == 44) {
                        tempData[0]["Status"] = "Past Due";
                    }
                    var tempDataString = JSON.stringify(tempData);
                    contextObj.notificationService.ShowToaster("Rent Payment updated", 3);
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: tempDataString }, contextObj.inputItems.selectedIds, "Payment No", contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RentPaymentComponent.prototype, "outcomeCount", void 0);
    RentPaymentComponent = __decorate([
        core_1.Component({
            selector: 'rent-payment',
            templateUrl: './app/Views/RealProperty/Lease/rent-paymentlist.html',
            directives: [split_view_component_1.SplitViewComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['leaseId', 'leaseIdentifier', 'leaseRenewalCount']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], RentPaymentComponent);
    return RentPaymentComponent;
}());
exports.RentPaymentComponent = RentPaymentComponent;
//# sourceMappingURL=rent-paymentlist.js.map