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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var AlertContactsComponent = (function () {
    function AlertContactsComponent(realPropertyService, notificationService, getData) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
        this.menuData = [
            {
                "id": 0,
                "title": "Save",
                "image": "Save",
                "path": "Save",
                "submenu": null
            }
        ];
        this.enableMenu = [0];
    }
    AlertContactsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.realPropertyService.getContactsForAlertFields().subscribe(function (resultData) {
            contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
            contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
            var removeArr = [5770];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
        this.loadData();
    };
    AlertContactsComponent.prototype.loadData = function () {
        var contextObj = this;
        this.realPropertyService.getContactsForAlert(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Contacts exist for the selected Lease", 2);
            }
        });
    };
    AlertContactsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    };
    AlertContactsComponent.prototype.updateContactsForAlert = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                //hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 5753,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }
        }
        arrayList.push({
            ReportFieldId: 5751,
            Value: contextObj.selectedId.toString()
        });
        this.realPropertyService.postSubmitContactsForAlert(JSON.stringify(arrayList), contextObj.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.notificationService.ShowToaster("Point of Contacts for sending Alert updated", 3);
                contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AlertContactsComponent.prototype, "submitSuccess", void 0);
    AlertContactsComponent = __decorate([
        core_1.Component({
            selector: 'alert-contacts',
            templateUrl: './app/Views/RealProperty/Lease/alert-contacts.html',
            directives: [grid_component_1.GridComponent, labelcomponent_component_1.LabelComponent, submenu_component_1.SubMenu],
            providers: [http_1.HTTP_PROVIDERS, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['selectedId', 'leaseIdentifier']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AlertContactsComponent);
    return AlertContactsComponent;
}());
exports.AlertContactsComponent = AlertContactsComponent;
//# sourceMappingURL=alert-contacts.js.map