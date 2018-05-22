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
var administration_service_1 = require('../../../models/administration/administration.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var addeditActionPoints_1 = require('./addeditActionPoints');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var General_1 = require('../../../Models/Common/General');
var dropdownlistComponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistComponent.component');
var radiocomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/radiocomponent.component');
var ActionPointUserGroup = (function () {
    function ActionPointUserGroup(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.siteId = 0;
        this.actionPointUserIds = new Array();
        this.ActPointUsrgroupSuccess = new core_1.EventEmitter();
        this.splitViewActionPoint = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };
    }
    ActionPointUserGroup.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (contextObj.selectedGridCellId != "") {
            this.administrationService.getActionPointUserGroupColumns().subscribe(function (resultData) {
                for (var i = 0; i < resultData["Data"].length; i++) {
                    if (resultData["Data"][i].FieldId == 496) {
                        resultData["Data"][i].IsVisible = false;
                    }
                    else if (resultData["Data"][i].FieldId == 2898) {
                        if (contextObj.rowData["Site Users Required"]) {
                            resultData["Data"][i].FieldLabel = "";
                            resultData["Data"][i].FieldValue = "0";
                            if (contextObj.rowData["SiteId"] != null) {
                                resultData["Data"][i].IsEnabled = false;
                            }
                            contextObj.rdAccessLevel = resultData["Data"][i];
                        }
                    }
                    else if (resultData["Data"][i].FieldId == 2900) {
                        if (contextObj.rowData["Site Users Required"]) {
                            if (contextObj.rowData["SiteId"] != null) {
                                resultData["Data"][i].IsEnabled = false;
                                resultData["Data"][i].FieldValue = contextObj.rowData["SiteId"];
                            }
                            contextObj.ddlSite = resultData["Data"][i];
                        }
                    }
                    else if (resultData["Data"][i].FieldId == 712) {
                        resultData["Data"][i].IsEnabled = false;
                    }
                }
                var removeArr = [500363, 12449];
                contextObj.fieldObjectUserGroupData = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
            });
            contextObj.loadData(0);
        }
        else {
            contextObj.notificationService.ShowToaster("Select an Action Point User Group", 2);
        }
    };
    ActionPointUserGroup.prototype.loadData = function (siteId) {
        var contextObj = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 12449, Value: siteId.toString() });
        this.administrationService.getActionPointUserGroupList(JSON.stringify(reportfieldIdValues), contextObj.selectedGridCellId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSourceUserGroupData = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.itemsSourceUserGroupData = [];
                contextObj.notificationService.ShowToaster("No Action Point User Groups exist", 2);
            }
        });
    };
    ActionPointUserGroup.prototype.rbtnChange = function (event) {
        if (event["fieldobject"]["FieldValue"] == "1") {
            this.ddlSite.IsEnabled = true;
            this.ddlSite.IsMandatory = true;
            this.ddlSite.HasValidationError = true;
            this.ddlSite.IsLocallyValidated = false;
            this.itemsSourceUserGroupData = [];
        }
        else {
            this.ddlSite.FieldValue = "-1";
            this.ddlSite.IsEnabled = false;
            this.ddlSite.IsMandatory = false;
            this.ddlSite.HasValidationError = false;
            this.ddlSite.IsLocallyValidated = true;
            this.siteId = 0;
            this.loadData(0);
        }
    };
    ActionPointUserGroup.prototype.ddlOnChange = function (value) {
        this.siteId = value;
        if (this.siteId != -1)
            this.loadData(this.siteId);
        else
            this.itemsSourceUserGroupData = [];
    };
    ActionPointUserGroup.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.loadData(this.siteId);
    };
    ActionPointUserGroup.prototype.updateActionPointUsers = function (event) {
        var contextObj = this;
        if (this.ddlSite && this.ddlSite.HasValidationError == true)
            return;
        var arrayList = new Array();
        var hasSelectedIds = false;
        for (var i = 0; i < contextObj.itemsSourceUserGroupData.length; i++) {
            if (contextObj.itemsSourceUserGroupData[i]["Select All"] == true) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 6295,
                    Value: contextObj.itemsSourceUserGroupData[i].Id.toString()
                });
            }
        }
        if (this.siteId != undefined && this.siteId != null)
            arrayList.push({ ReportFieldId: 12449, Value: this.siteId.toString() });
        if (hasSelectedIds == true) {
            this.administrationService.postSubmitActionPointUserGroup(JSON.stringify(arrayList), contextObj.selectedGridCellId).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        contextObj.ActPointUsrgroupSuccess.emit({
                            returnData: resultData
                        });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        }
                        break;
                }
            });
        }
        else {
            contextObj.administrationService.checkActionPointUsersAndUserGroup(contextObj.selectedGridCellId, 1).subscribe(function (resultData) {
                if (resultData.Data == "True") {
                    contextObj.administrationService.postSubmitActionPointUserGroup(JSON.stringify(arrayList), contextObj.selectedGridCellId).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                contextObj.ActPointUsrgroupSuccess.emit({
                                    returnData: resultData
                                });
                                break;
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                }
                                break;
                        }
                    });
                }
                else
                    contextObj.notificationService.ShowToaster("Select at least one Action Point User Groups", 2);
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ActionPointUserGroup.prototype, "selectedGridCellId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionPointUserGroup.prototype, "ActPointUsrgroupSuccess", void 0);
    ActionPointUserGroup = __decorate([
        core_1.Component({
            selector: 'action-point-user-group',
            templateUrl: 'app/Views/Administration/Workflow/actionPointUserGroup.html',
            directives: [page_component_1.PageComponent, grid_component_1.GridComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, addeditActionPoints_1.ActionPointsAddEditComponent, dropdownlistComponent_component_1.DropDownListComponent, radiocomponent_component_1.CustomRadioComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["selectedGridCellId", "rowData"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ActionPointUserGroup);
    return ActionPointUserGroup;
}());
exports.ActionPointUserGroup = ActionPointUserGroup;
//# sourceMappingURL=actionPointUserGroup.js.map