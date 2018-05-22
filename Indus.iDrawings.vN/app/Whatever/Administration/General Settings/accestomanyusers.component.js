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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var AccessToManyUsersComponent = (function () {
    function AccessToManyUsersComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.orgName = "";
        this.Stylename = "search-containerInline";
        this.disable = false;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.isSmartSearch = true;
        this.gridHeight = "100%";
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.fieldobjSelected = new Array();
        this.fieldobjNew = new Array();
        this.fieldobjSearchSelected = new Array();
        this.baseteamenable = false;
        var contextObj = this;
        this.administrationService.getFields(419).subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        contextObj.administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true)
                contextObj.baseteamenable = true;
            else
                contextObj.baseteamenable = false;
        });
    }
    AccessToManyUsersComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.dataLoad();
        contextObj.Stylename = "search-containerInlinefromgrid";
        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
            contextObj.gridHeight = window.innerHeight - 240;
            contextObj.gridHeight = contextObj.gridHeight + "px";
        }
        contextObj.administrationService.getKeywordField(423).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
        });
    };
    AccessToManyUsersComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    AccessToManyUsersComponent.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    AccessToManyUsersComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var rptFieldValues = "[{\"ReportFieldId\":301,\"Value\":\"" + contextObj.selectedIds + "\"}]";
        contextObj.administrationService.getListSearch(419, "", contextObj.selectedIds, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, rptFieldValues).subscribe(function (result) {
            contextObj.fieldobjSelected = [];
            contextObj.itemsSourceFirst = JSON.parse(result["Data"].FieldBinderData);
            for (var _i = 0, _a = contextObj.itemsSourceFirst; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item['View'] == true) {
                    contextObj.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: item['Id']
                    });
                }
            }
        });
        contextObj.administrationService.getListSearch(419, 423, contextObj.selectedIds, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, rptFieldValues, contextObj.filter, "1", "0", "[]").subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;
            //contextObj.fieldobjSelected = [];
            //for (var item of contextObj.itemsSourceFirst) {
            //    if (item['View'] == true) {
            //        contextObj.fieldobjSelected.push({
            //            ReportFieldId: 300,
            //            Value: item['Id']
            //        });
            //    }
            //}
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            }
            else {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    };
    AccessToManyUsersComponent.prototype.dataLoad = function () {
        var context = this;
        context.fieldobjSelected = [];
        var rptFieldValues = "[{\"ReportFieldId\":301,\"Value\":\"" + context.selectedIds + "\"}]";
        context.administrationService.getListSearch(419, "", context.selectedIds, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, rptFieldValues).subscribe(function (result) {
            context.itemsPerPage = result["Data"].RowsPerPage;
            context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            context.itemsSourceFirst = context.itemsSource.slice();
            for (var _i = 0, _a = context.itemsSourceFirst; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item['View'] == true) {
                    context.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: item['Id']
                    });
                }
            }
            context.totalItems = context.itemsSource.length;
            if (context.totalItems == 0) {
                context.disable = true;
                context.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    };
    AccessToManyUsersComponent.prototype.onCellUpdate = function (event) {
        var context = this;
        if (context.baseteamenable) {
            context.administrationService.GetBaseOrganizationUsers(context.selectedIds).subscribe(function (result) {
                var index = result.indexOf(event.dataKeyValue);
                var viewofuser = event.dataSource.find(function (item) { return item.Id === event.dataKeyValue; });
                if (index > -1 && viewofuser.View == 0) {
                    context.notificationService.ShowToaster("Base Team cannot be unchecked", 5);
                    var row = event.dataSource.find(function (item) { return item.Id === event.dataKeyValue; });
                    row.View = 1;
                    console.log("onCellUpdate", viewofuser, event.dataKeyValue);
                }
            });
        }
        if (event.isHeaderClicked != undefined) {
            if (context.IsKeyWordSearch == 0) {
                if (event.isHeaderClicked == false) {
                    context.fieldobjSelected = [];
                }
                else {
                    context.fieldobjSelected = [];
                    for (var _i = 0, _a = context.itemsSourceFirst; _i < _a.length; _i++) {
                        var item = _a[_i];
                        //  if (item['View'] == true) {
                        context.fieldobjSelected.push({
                            ReportFieldId: 300,
                            Value: item['Id']
                        });
                    }
                }
            }
            else {
                //search
                for (var _b = 0, _c = context.itemsSource; _b < _c.length; _b++) {
                    var item = _c[_b];
                    var index = context.fieldobjSelected.findIndex(function (data) {
                        return data["Value"] === item['Id'];
                    });
                    if (event.isHeaderClicked == true) {
                        if (index != -1) {
                            context.fieldobjSelected.splice(index, 1);
                            context.fieldobjSelected.push({
                                ReportFieldId: 300,
                                Value: item['Id']
                            });
                        }
                        else {
                            context.fieldobjSelected.push({
                                ReportFieldId: 300,
                                Value: item['Id']
                            });
                        }
                    }
                    else {
                        if (index != -1) {
                            context.fieldobjSelected.splice(index, 1);
                        }
                    }
                }
            }
        }
        else {
            var index = context.fieldobjSelected.findIndex(function (data) {
                return data["Value"] === event.dataKeyValue;
            });
            if (index != -1) {
                if (event.isChecked == false) {
                    context.fieldobjSelected.splice(index, 1);
                }
                else {
                    context.fieldobjSelected.push({
                        ReportFieldId: 300,
                        Value: event.dataKeyValue
                    });
                }
            }
            if (event.isChecked == true) {
                context.fieldobjSelected.push({
                    ReportFieldId: 300,
                    Value: event.dataKeyValue
                });
            }
        }
    };
    AccessToManyUsersComponent.prototype.updateDivisionAdminSettings = function () {
        var updateArray = [];
        var contextObj = this;
        var count;
        var updatedRptFldValues = '';
        var status = true;
        this.administrationService.GetBaseOrganizationUsers(this.selectedIds).subscribe(function (result) {
            for (var _i = 0, _a = contextObj.itemsSource; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item['View'] == true) {
                    updatedRptFldValues += "{\"ReportFieldId\":300,\"Value\":\"" + item['Id'] + "\"},";
                }
                else if (item["View"] == false && result.indexOf(item["Id"]) > -1) {
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
                updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + contextObj.selectedIds + "\"},{\"ReportFieldId\":302,\"Value\":\"0\"}";
                contextObj.administrationService.updateDivisionAccessToManyUsers(updatedRptFldValues, contextObj.selectedIds).subscribe(function (resultData) {
                    if (resultData.ServerId == 1) {
                        contextObj.notificationService.ShowToaster(contextObj.orgName + " access updated", 3);
                    }
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AccessToManyUsersComponent.prototype, "selectedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AccessToManyUsersComponent.prototype, "orgName", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccessToManyUsersComponent.prototype, "onSearchInDrawing", void 0);
    AccessToManyUsersComponent = __decorate([
        core_1.Component({
            selector: 'access-many-users',
            templateUrl: './app/Views/Administration/General Settings/accestomanyusers.component.html',
            directives: [search_component_1.searchBox, notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], AccessToManyUsersComponent);
    return AccessToManyUsersComponent;
}());
exports.AccessToManyUsersComponent = AccessToManyUsersComponent;
//# sourceMappingURL=accestomanyusers.component.js.map