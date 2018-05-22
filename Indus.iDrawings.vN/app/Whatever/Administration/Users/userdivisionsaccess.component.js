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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var UserDivisionsAccessComponent = (function () {
    function UserDivisionsAccessComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.defaultChkbxIsChecked = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.baseteamenable = false;
        var context = this;
        administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true)
                context.baseteamenable = true;
            else
                context.baseteamenable = false;
        });
    }
    UserDivisionsAccessComponent.prototype.ngAfterViewInit = function () {
        var context = this;
        if (this.selectedIds != undefined) {
            this.administrationService.getUserDivisionsAccesssFields().subscribe(function (result) {
                context.fieldObject = (result["Data"]);
                if (context.fieldObject.length > 1) {
                    context.administrationService.getUserDivisionsAccess(context.selectedIds[0], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
                        context.totalItems = result["Data"].DataCount;
                        context.itemsPerPage = result["Data"].RowsPerPage;
                        debugger;
                        if (context.totalItems > 0) {
                            context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        }
                        else {
                            var orgName = context.fieldObject.find(function (el) { return el.FieldId == 341; })['FieldLabel'];
                            context.notificationService.ShowToaster(orgName + " access is not to the selected User", 2);
                        }
                    });
                }
                else
                    context.notificationService.ShowToaster("No Organizational Structure defined", 2);
            });
        }
    };
    UserDivisionsAccessComponent.prototype.onCellEdit = function (event) {
        var contextObj = this;
        if (contextObj.baseteamenable) {
            var dataasourcecopy = event.dataSource;
            var row = dataasourcecopy.find(function (item) { return item.Id === contextObj.team; });
            if (row && row.View == "0" && event.dataKeyValue == contextObj.team) {
                contextObj.notificationService.ShowToaster("Base Team cannot be unchecked", 5);
                row.IsChecked = 1;
                row.View = "1";
            }
            event.dataSource = dataasourcecopy;
        }
    };
    UserDivisionsAccessComponent.prototype.onChangeCheckBx = function (event) {
        console.log(event.chkevent);
        console.log(event.field);
    };
    UserDivisionsAccessComponent.prototype.updateDivisionAdminSettings = function () {
        var contextObj = this;
        var updatedRptFldValues = '';
        var status = true;
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item['View'] == true) {
                updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + item['Id'] + "\"},";
            }
            else if (item["View"] == false && item["Id"] == contextObj.team) {
                // item["View"] = true;
                if (contextObj.baseteamenable) {
                    contextObj.notificationService.ShowToaster("Base Team cannot be unchecked", 5);
                    status = false;
                }
                else
                    status = true;
                break;
            }
        }
        if (status == true) {
            updatedRptFldValues = updatedRptFldValues.substring(0, updatedRptFldValues.length - 1);
            contextObj.administrationService.updateUserDivisionsAccess(updatedRptFldValues, contextObj.selectedIds[0], contextObj.isDivisionAdmin).subscribe(function (resultData) {
                if (resultData.ServerId == 1) {
                    contextObj.notificationService.ShowToaster("Access privilege for selected user updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
            ;
        }
        //this.notificationService.ShowToaster("Divisions accessible to the selected User(s) has been updated", 2);
    };
    UserDivisionsAccessComponent.prototype.SelectAllOnClick = function (event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    };
    UserDivisionsAccessComponent.prototype.getDefaultChkBoxChecked = function (array) {
        var isDefaultLayer;
        //var nNumLayers = 4;
        //if (this.isSpace)
        //    nNumLayers = 4;
        //else
        //    nNumLayers = 2;
        //if (array.length > nNumLayers) {
        //    this.defaultChkbxIsChecked = false;
        //    return;
        //}
        //for (var i = 0; i < nNumLayers; i++) {
        //    isDefaultLayer = array.some(function (el) { return el == i });
        //    if (isDefaultLayer != true) {
        //        this.defaultChkbxIsChecked = false;
        //        break;
        //    }
        //    if (isDefaultLayer)
        //        this.defaultChkbxIsChecked = true;
        //}
    };
    UserDivisionsAccessComponent.prototype.singleOnClick = function (event) {
        // //debugger
        var isDefaultLayer;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    };
    UserDivisionsAccessComponent.prototype.selectAll = function (event, fieldObj) {
        var contextObj = this;
        if (event.target.checked == true) {
            //    this.layerList[0].MultiFieldValues.splice(0, this.layerList[0].MultiFieldValues.length);
            this.IsSelectAllChecked = false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UserDivisionsAccessComponent.prototype, "selectedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserDivisionsAccessComponent.prototype, "isDivisionAdmin", void 0);
    UserDivisionsAccessComponent = __decorate([
        core_1.Component({
            selector: 'user-divisions-access',
            templateUrl: './app/Views/Administration/Users/userdivisionsaccess.component.html',
            directives: [notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds", "team"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], UserDivisionsAccessComponent);
    return UserDivisionsAccessComponent;
}());
exports.UserDivisionsAccessComponent = UserDivisionsAccessComponent;
//# sourceMappingURL=userdivisionsaccess.component.js.map