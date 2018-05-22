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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var usermodulesaccess_component_1 = require('./usermodulesaccess.component');
var userdivisionsaccess_component_1 = require('./userdivisionsaccess.component');
var userdrawingsaccess_component_1 = require('../../Common/DrawingDetails/userdrawingsaccess.component');
var userreportsaccess_component_1 = require('./userreportsaccess.component');
var moduleadminsettings_component_1 = require('./moduleadminsettings.component');
var divisionadminsettings_component_1 = require('./divisionadminsettings.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var useraddedit_component_1 = require('./useraddedit.component');
var resetpassword_component_1 = require('./resetpassword.component');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var multiple_edit_component_1 = require('../../../framework/whatever/multipleedit/multiple-edit.component');
var common_service_1 = require('../../../models/common/common.service');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var UsersComponent = (function () {
    function UsersComponent(cdr, exportObject, administrationService, notificationService, confirmationService, generFun, commonService) {
        this.cdr = cdr;
        this.exportObject = exportObject;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.generFun = generFun;
        this.commonService = commonService;
        this.pagePath = "Administration / Users";
        this.chkCountSection = 0;
        this.selectedModuleId = -1;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "[User Name]", sortDir: "ASC", allowAdd: false, allowEdit: false, showContextMenu: true };
        this.slideMsg = "";
        this.slideAction = 0;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.isSiteAdmin = false;
        this.menumock = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 29
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 30
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 26
            },
            {
                "id": 4,
                "title": "Restore",
                "image": "Restore",
                "path": "Restore",
                "privilegeId": 27
            },
            {
                "id": 5,
                "title": "Reset Password",
                "image": "Reset Password",
                "path": "Reset Password",
                "privilegeId": 29
            },
            {
                "id": 6,
                "title": "Access",
                "image": "Access",
                "path": "Access",
                "privilegeId": 31
            },
            {
                "id": 7,
                "title": "Export",
                "image": "Export",
                "path": "Export",
                "privilegeId": 30
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.featureIds = "121,101,214";
        this.isActiveDirSupptSubscribed = false;
        this.isEmailDomainValidation = false;
        this.WOUserEnabled = false;
        this.selectedUserRole = 0;
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.sectionAccessExpansionStatus = [{ "title": "Module Access", "isExpanded": false }, { "title": "Drawing Access", "isExpanded": false }, { "title": "Division Access", "isExpanded": false }, { "title": "Module Administrator Settings", "isExpanded": false }, { "title": "Division Administrator Settings", "isExpanded": false }, { "title": "Report Access", "isExpanded": false }];
        this.fieldobj = new Array();
        this.expirydate = [];
        this.activatedate = [];
        this.status = [];
        this.roleid = [];
        this.baseteamenable = false;
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        this.fieldobj.push({
            FieldId: 2559,
            ReportFieldId: 289,
            Value: "1"
        });
        var contextObj = this;
        var rptField = [447, 455, 454];
        var count = rptField.length;
        administrationService.getUsersFieldList().subscribe(function (result) {
            // debugger
            //result["Data"].find(function (item) {
            //    if (rptField.indexOf(item.ReportFieldId) >= 0) {
            //        item.Width = "*";
            //        count--;
            //        if (count == 0) {
            //            return true;
            //        } else {
            //            return false;
            //        }
            //    } else {
            //        return false;
            //    }
            //});
            contextObj.fieldObject = result["Data"];
            //contextObj.loadKeywordSearch(contextObj);
            contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
                        var useracess = contextObj.fieldObject.find(function (item) {
                            return item.ReportFieldId === 8321;
                        });
                        if (result == 1) {
                            useracess.IsVisible = false;
                        }
                        else {
                            useracess.IsVisible = true;
                        }
                    });
                }
                else {
                    var userAcessLvl = contextObj.fieldObject.find(function (item) {
                        return item.ReportFieldId === 8321;
                    });
                    userAcessLvl.IsVisible = false;
                }
            });
            contextObj.administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
                var team = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 12446; });
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    contextObj.baseteamenable = true;
                    team.IsVisible = true;
                }
                else {
                    contextObj.baseteamenable = false;
                    team.IsVisible = false;
                }
            });
        });
        this.dataLoad(1, contextObj);
        this.loadKeywordSearch(contextObj);
        this.getCusSubscribedFeatures(contextObj);
        this.getSessionUserData(contextObj);
        this.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 14, contextObj.administrationService, contextObj.menumock.length);
    }
    UsersComponent.prototype.getSessionUserData = function (contextObj) {
        contextObj.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    UsersComponent.prototype.getCusSubscribedFeatures = function (contextObj) {
        contextObj.administrationService.getCustomerSubscribedFeatures(contextObj.featureIds).subscribe(function (rt) {
            if (contextObj.generFun.checkForUnhandledErrors(rt)) {
                var customerFeatureobj = rt["Data"];
                for (var i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 121:
                            contextObj.isActiveDirSupptSubscribed = customerFeatureobj[i]["IsSubscribed"];
                            break;
                        case 101:
                            contextObj.WOUserEnabled = customerFeatureobj[i]["IsSubscribed"];
                            break;
                        case 214:
                            contextObj.isEmailDomainValidation = customerFeatureobj[i]["IsSubscribed"];
                            break;
                    }
                }
            }
        });
    };
    UsersComponent.prototype.onPageChanged = function (event) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.dataLoad(0, contextObj);
    };
    ;
    UsersComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        contextObj.dataLoad(0, contextObj);
    };
    UsersComponent.prototype.dataLoad = function (target, context) {
        debugger;
        context.administrationService.getUsersList(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch).subscribe(function (result) {
            if (target == 1) {
                context.itemsPerPage = result["Data"].RowsPerPage;
                context.totalItems = result["Data"].DataCount;
            }
            if (context.totalItems > 0) {
                context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            }
            else {
                context.notificationService.ShowToaster("No Users exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    UsersComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                this.splitViewTarget = 1;
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.multipleedit();
                }
                else
                    this.editClick();
                break;
            case 3:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.deleteClick();
                break;
            case 4:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.restoreClick();
                break;
            case 5:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else {
                    this.splitViewTarget = 2;
                    this.resetPwdClick();
                }
                break;
            case 6:
                if (this.inputItems.selectedIds.length > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else {
                    this.pageTitle = undefined;
                    this.splitViewTarget = 3;
                    this.isModuleAdmin = false;
                    this.isDivisionAdmin = false;
                    this.chkCountSection = 0;
                    this.isModuleAccessPrivilege = false;
                    this.isDivisionAccessPrivilege = false;
                    this.isDrwgAccessPrivilege = false;
                    this.userAccessSettings();
                }
                break;
            case 7:
                this.ExportGridData();
                break;
        }
    };
    UsersComponent.prototype.onSplitViewClose = function () {
        this.splitViewTarget = -1;
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            this.sectionAccessExpansionStatus[i].isExpanded = false;
        }
    };
    UsersComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        this.pageTitle = "New User";
        var showadd = true;
        ;
        this.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
            maxUsersCreated = resultData["Data"];
            contextObj.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                strMaxWorkOrderUser = resul["Data"];
                if (maxUsersCreated == "0") {
                    if (contextObj.sessionUserCatId == 1) {
                        if (strMaxWorkOrderUser == "1") {
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add Indus Administrator, Indus User or Work Order User", 2);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add Indus Administrator or Indus User", 2);
                        }
                    }
                    else {
                        if (strMaxWorkOrderUser == "1")
                            contextObj.notificationService.ShowToaster("Maximum allowed users for the customer already created, you can add only Work Order User", 2);
                        else {
                            contextObj.notificationService.ShowToaster("Maximum allowed users already created", 2);
                            showadd = false;
                        }
                    }
                }
                if (strMaxWorkOrderUser == "0") {
                    if (contextObj.sessionUserCatId == 1)
                        contextObj.notificationService.ShowToaster("Maximum allowed Work Order users for the customer already created", 2);
                    else
                        contextObj.notificationService.ShowToaster("Maximum allowed Work Order users already created", 2);
                }
                if (showadd) {
                    contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 1).subscribe(function (resultData) {
                        contextObj.addEditDataSettings(contextObj, resultData, maxUsersCreated, strMaxWorkOrderUser, "add");
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        var team = contextObj.fieldDetailsAddEdit.find(function (item) { return item.ReportFieldId === 12446; });
                        if (contextObj.baseteamenable)
                            team.IsVisible = true;
                        else
                            team.IsVisible = false;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
            });
        });
    };
    UsersComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit User";
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        var contextObj = this;
        var showaddedit = true;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var selectedRowObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0]; });
            if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0] && contextObj.isSiteAdmin == true && selectedRowObj["UserRoleId"] <= 3) {
                contextObj.notificationService.ShowToaster("Logged-in user cannot be edited", 5);
            }
            else {
                if (selectedRowObj["StatusId"] == 4) {
                    this.notificationService.ShowToaster("Deleted user cannot be edited", 5);
                }
                else if ((selectedRowObj["StatusId"] == 1) || (selectedRowObj["StatusId"] == 6)) {
                    this.selectedUserRole = selectedRowObj["UserRoleId"];
                    //this.administrationService.GetMaxUserandWO().subscribe(function (resultData) {
                    //    maxUsersCreated = resultData["maxUser"];
                    //    strMaxWorkOrderUser = resultData["maxWOUSer"];
                    contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 2).subscribe(function (result) {
                        contextObj.addEditDataSettings(contextObj, result, maxUsersCreated, strMaxWorkOrderUser, "edit");
                        contextObj.fieldDetailsAddEdit = result["Data"];
                        var cnt = 2;
                        var rptIdArr = [12446, 8321];
                        contextObj.fieldDetailsAddEdit.find(function (item) {
                            if (rptIdArr.indexOf(item.ReportFieldId) > -1) {
                                cnt--;
                                if (item.ReportFieldId == 12446) {
                                    if (contextObj.baseteamenable)
                                        item.IsVisible = true;
                                    else
                                        item.IsVisible = false;
                                }
                                if (contextObj.selectedUserRole == 1 && item.ReportFieldId == 8321) {
                                    item.FieldValue = "0";
                                    item.IsEnabled = false;
                                }
                            }
                            if (cnt == 0)
                                return true;
                            else
                                return false;
                        });
                        if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0]) {
                            contextObj.fieldDetailsAddEdit.find(function (item) {
                                if (item.ReportFieldId == 452) {
                                    item.IsVisible = false;
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        contextObj.splitViewTarget = 1;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    this.selectedUserRole = selectedRowObj["UserRoleId"];
                    this.administrationService.GetMaxUserandWO().subscribe(function (resultData) {
                        maxUsersCreated = resultData["maxUser"];
                        strMaxWorkOrderUser = resultData["maxWOUSer"];
                        if (maxUsersCreated == "0") {
                            if (contextObj.selectedUserRole >= 3) {
                                if (strMaxWorkOrderUser == "1") {
                                    if (contextObj.selectedUserRole != 8) {
                                        contextObj.notificationService.ShowToaster("Maximum number of users already exist. You can only change the User Role to Work Order User", 5);
                                    }
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("Maximum number of users already exist. Selected user cannot be edited", 5);
                                    showaddedit = false;
                                }
                            }
                        }
                        //wo user           
                        if (contextObj.selectedUserRole > 3 && strMaxWorkOrderUser == "0" && contextObj.selectedUserRole == 8) {
                            contextObj.notificationService.ShowToaster("Maximum number of Work Order users already exist. Selected user cannot be edited", 5);
                            showaddedit = false;
                        }
                        if (showaddedit) {
                            contextObj.administrationService.loadUserAddEdit(contextObj.inputItems.selectedIds[0], JSON.stringify(contextObj.fieldobj), 2).subscribe(function (result) {
                                contextObj.addEditDataSettings(contextObj, result, maxUsersCreated, strMaxWorkOrderUser, "edit");
                                contextObj.fieldDetailsAddEdit = result["Data"];
                                if (contextObj.sessionUserId == contextObj.inputItems.selectedIds[0]) {
                                    var count = 0;
                                    contextObj.fieldDetailsAddEdit.find(function (item) {
                                        if (item.ReportFieldId == 8321) {
                                            item.IsEnabled = false;
                                            count++;
                                        }
                                        if (item.ReportFieldId == 452) {
                                            item.IsVisible = false;
                                            count++;
                                        }
                                        if (count == 2) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    });
                                }
                                contextObj.splitViewTarget = 1;
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }
                    });
                }
            }
        }
    };
    UsersComponent.prototype.multipleedit = function () {
        var context = this;
        this.expirydate = [];
        this.activatedate = [];
        this.status = [];
        this.roleid = [];
        var check = 0;
        var _loop_1 = function(i) {
            var selectedRowObj = context.itemsSource.find(function (item) { return item["Id"] === context.inputItems.selectedIds[i]; });
            this_1.expirydate.push(selectedRowObj["Account Expiry Date"]);
            this_1.activatedate.push(selectedRowObj["Account Activation Date"]);
            this_1.status.push(selectedRowObj["StatusId"]);
            this_1.roleid.push(selectedRowObj["UserRoleId"]);
            if (selectedRowObj["StatusId"] == 4) {
                this_1.notificationService.ShowToaster("Deleted Users cannot be edited", 5);
                check += 1;
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0; i < context.inputItems.selectedIds.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break") break;
        }
        if (check == 0) {
            this.commonService.getFieldsForMultipleEdit(54).subscribe(function (resultData) {
                context.multipleEditFieldDetails = JSON.parse(resultData);
            });
            this.splitViewTarget = 4;
            context.pageTitle = "Multiple Update";
            context.splitviewInput.showSecondaryView = true;
        }
    };
    UsersComponent.prototype.onMultipleEditUpdate = function (event) {
        // date-1
        //user number-2
        //work order user-3
        var check = 0;
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        console.log('multiple edit submit', event);
        var context = this;
        for (var _i = 0, _a = this.inputItems.selectedIds; _i < _a.length; _i++) {
            var item = _a[_i];
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 443, Value: item });
        }
        context.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
            maxUsersCreated = resultData["Data"];
            context.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                strMaxWorkOrderUser = resul["Data"];
                if (event["ReportFieldId"] == 455 && new Date(event["NewValue"]) < new Date()) {
                    context.notificationService.ShowToaster("'Account Expires On' must be a future date", 5);
                    check = 1;
                }
                else if (context.expirydate.length > 0 && context.activatedate.length > 0) {
                    for (var i = 0; i < context.expirydate.length; i++) {
                        if (check == 0) {
                            if ((event.ReportFieldId == 455 && new Date(event.NewValue) < new Date(context.activatedate[i])) || (event.ReportFieldId == 454 && new Date(event.NewValue) > new Date(context.expirydate[i]))) {
                                context.notificationService.ShowToaster("'Account Activates On' must be earlier than 'Account Expires On'", 5);
                                check = 1;
                            }
                            else if (event.ReportFieldId == 452 && event.NewValue == "1") {
                                if (maxUsersCreated == "0") {
                                    if (context.roleid[i] > 2 && context.roleid[i] < 8) {
                                        //context.notificationService.ShowToaster("Maximum number of users reached, Users cannot be edited", 5);
                                        check = 2;
                                        break;
                                    }
                                }
                                if (strMaxWorkOrderUser == "0") {
                                    if (context.roleid[i] != 8) {
                                        //context.notificationService.ShowToaster("Maximum number of Work Order users reached, Users cannot be edited", 5);
                                        check = 3;
                                        break;
                                    }
                                }
                                if (new Date(context.expirydate[i]) < new Date()) {
                                    context.notificationService.ShowToaster("'Account Expires On' must be a future date", 5);
                                    check = 1;
                                    break;
                                }
                            }
                            else if (event.ReportFieldId == 452 && event.NewValue != "1") {
                                if (event.ReportFieldIdValuesArray[i + 1].Value == context.sessionUserId) {
                                    context.notificationService.ShowToaster("Status of the logged in User cannot be edited", 5);
                                    check = 4;
                                }
                            }
                        }
                        else
                            break;
                    }
                }
                switch (check) {
                    case 0:
                        context.administrationService.updateMultipleUserData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue).subscribe(function (resultData) {
                            switch (resultData.StatusId) {
                                case 0:
                                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    break;
                                case 1:
                                    context.notificationService.ShowToaster("User details updated", 2);
                                    context.splitviewInput.showSecondaryView = false;
                                    context.dataLoad(1, context);
                                    break;
                                default:
                                    break;
                            }
                        });
                        break;
                    case 2:
                        context.notificationService.ShowToaster("Maximum number of users reached, Users cannot be edited", 5);
                        break;
                    case 3:
                        context.notificationService.ShowToaster("Maximum number of Work Order users reached, Users cannot be edited", 5);
                        break;
                }
            });
        });
    };
    UsersComponent.prototype.addEditDataSettings = function (contextObj, resultData, maxUsersCreated, strMaxWorkOrderUser, target) {
        var rptField = [460, 436, 459, 452, 445, 266, 455];
        var count = rptField.length;
        var userRoleId = contextObj.sessionUserRoleId;
        var userCatId = contextObj.sessionUserCatId;
        resultData["Data"].find(function (item) {
            switch (item.ReportFieldId) {
                case 460:
                    if (target == "add") {
                        item.FieldValue = true;
                    }
                    else {
                        item.IsEnabled = true;
                        item.FieldValue = false;
                    }
                    count--;
                    break;
                case 436:
                    item.FieldValue = "3";
                    count--;
                    break;
                case 452:
                    if (target == "edit") {
                        item.IsVisible = true;
                    }
                    count--;
                    break;
                case 455:
                    if (target == "add") {
                        var d = new Date();
                        d.setFullYear(d.getFullYear() + 1);
                        item.FieldValue = d.toDateString();
                    }
                    count--;
                    break;
                case 445:
                    if (target == "edit") {
                        item.IsEnabled = false;
                    }
                    count--;
                    break;
                case 266:
                    if (target == "edit") {
                        item.IsVisible = false;
                    }
                    count--;
                    break;
                case 459:
                    count--;
                    if (target == "edit") {
                        maxUsersCreated = "";
                    }
                    if (maxUsersCreated == "0") {
                        if (userCatId == 1) {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] <= 2;
                                    });
                                }
                                else {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) > -1;
                                    });
                                }
                            }
                            else {
                                var roleid = [1, 2];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }
                        }
                        else {
                            if (userRoleId == 3 && contextObj.WOUserEnabled && strMaxWorkOrderUser != "0") {
                                var roleid = [8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }
                        }
                    }
                    else {
                        if (userRoleId == 3) {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                                else {
                                    var roleid = [1, 2];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                            }
                            else {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }
                        }
                        else if (userRoleId == 2) {
                            if (target == "add") {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }
                            else {
                                var roleid = [1, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }
                        }
                        else {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] != 8;
                                    });
                                }
                            }
                            else {
                                if (strMaxWorkOrderUser == "0") {
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return el["Id"] != 8;
                                    });
                                }
                            }
                        }
                        if (contextObj.selectedUserRole > 2) {
                            if (contextObj.WOUserEnabled) {
                                if (strMaxWorkOrderUser == "0") {
                                    var roleid = [1, 2, 8];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                                else {
                                    var roleid = [1, 2];
                                    item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                        return roleid.indexOf(el["Id"]) < 0;
                                    });
                                }
                            }
                            else {
                                var roleid = [1, 2, 8];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) < 0;
                                });
                            }
                        }
                        else {
                            if (target != "add") {
                                var roleid = [1, 2];
                                item.LookupDetails.LookupValues = item.LookupDetails.LookupValues.filter(function (el) {
                                    return roleid.indexOf(el["Id"]) > -1;
                                });
                            }
                        }
                        break;
                    }
            }
            if (count == 0) {
                return true;
            }
            else
                return false;
        });
    };
    UsersComponent.prototype.deleteClick = function () {
        var contextObj = this;
        var findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0]; });
        switch (findSrcObj["StatusId"]) {
            case 4:
                contextObj.notificationService.ShowToaster("User already deleted", 2);
                break;
            case 5:
                contextObj.notificationService.ShowToaster("Selected user account has been expired and cannot be deleted", 2);
                break;
            case 6:
                contextObj.notificationService.ShowToaster("Selected user is not activated and cannot be deleted", 2);
                break;
            default:
                if (contextObj.sessionUserId == findSrcObj["Id"]) {
                    contextObj.notificationService.ShowToaster("Logged-in user cannot be deleted", 2);
                }
                else {
                    contextObj.slideAction = 1;
                    contextObj.slideMsg = "Are you sure you want to delete the selected User? ";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                break;
        }
    };
    UsersComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        this.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //this.refreshgrid = this.refreshgrid.concat([true]);
        this.splitViewTarget = -1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    UsersComponent.prototype.restoreClick = function () {
        var contextObj = this;
        var findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0]; });
        switch (findSrcObj["StatusId"]) {
            case 1:
                contextObj.notificationService.ShowToaster("Selected user is active", 2);
                break;
            case 2:
                contextObj.notificationService.ShowToaster("Selected user is blocked and cannot be restored", 2);
                break;
            case 5:
                contextObj.notificationService.ShowToaster("Selected user account has expired and cannot be restored", 2);
                break;
            case 6:
                contextObj.notificationService.ShowToaster("Selected user is not activated and cannot be restored", 2);
                break;
            case 7:
                contextObj.notificationService.ShowToaster("Selected user is locked and cannot be restored", 2);
                break;
            case 4:
                var maxUsersCreated_1 = "";
                var maxWorkOrderUser_1 = "";
                var userRoleId_1 = findSrcObj["UserRoleId"];
                var isWorkOrderUserEnabled_1 = true; //to be check
                var passRestore_1 = true;
                contextObj.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
                    maxUsersCreated_1 = resultData["Data"];
                    contextObj.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                        maxWorkOrderUser_1 = resul["Data"];
                        if (maxUsersCreated_1 == "0") {
                            if (userRoleId_1 > 2 && userRoleId_1 < 8) {
                                contextObj.notificationService.ShowToaster("Maximum number of users already exist. Selected user cannot be restored", 5);
                                passRestore_1 = false;
                            }
                        }
                        if (userRoleId_1 == 8) {
                            if (isWorkOrderUserEnabled_1) {
                                if (maxWorkOrderUser_1 == "0") {
                                    contextObj.notificationService.ShowToaster("Maximum number of Work Order users already exist.Selected user cannot be restored", 5);
                                    passRestore_1 = false;
                                }
                            }
                            else {
                                contextObj.notificationService.ShowToaster("User can't be restored as WO user-role is disabled", 2);
                                passRestore_1 = false;
                            }
                        }
                        if (passRestore_1) {
                            contextObj.slideAction = 2;
                            contextObj.slideMsg = "Are you sure you want to restore the selected User? ";
                            contextObj.showSlide = !contextObj.showSlide;
                        }
                    });
                });
                break;
        }
    };
    UsersComponent.prototype.resetPwdClick = function () {
        var context = this;
        var findSrcObj = context.itemsSource.find(function (item) { return item["Id"] === context.inputItems.selectedIds[0]; });
        if (findSrcObj["StatusId"] == 1) {
            //if (this.isEmailDomainValidation) {
            this.administrationService.resetPasswordthroghMail(this.inputItems.selectedIds[0]).subscribe(function (rst) {
                if (rst["Data"].Message == "Success") {
                    context.notificationService.ShowToaster("Password has been reset and sent to the email address provided", 3);
                }
                else
                    context.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
            });
        }
        else {
            context.notificationService.ShowToaster("Selected user is not Active, Password cannot be reset", 5);
        }
    };
    UsersComponent.prototype.resetPasswordOut = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    UsersComponent.prototype.GetStringFromMinutes = function (min) {
        var retVal = "";
        if (min < 60) {
            if (min == 1)
                retVal = min + " minute";
            else
                retVal = min + " minutes";
        }
        else {
            if ((min % 60) > 0) {
                if ((min % 60) < 10)
                    retVal = Math.floor(min / 60) + ":0" + (min % 60) + " hours";
                else
                    retVal = Math.floor(min / 60) + ":" + (min % 60) + " hours";
            }
            else {
                if ((min / 60) == 1)
                    retVal = Math.floor(min / 60) + " hour";
                else
                    retVal = Math.floor(min / 60) + " hours";
            }
        }
        return retVal;
    };
    UsersComponent.prototype.userAccessSettings = function () {
        var contextObj = this;
        this.pageTitle = "User Access";
        var findSrcObj = contextObj.itemsSource.find(function (item) { return item["Id"] === contextObj.inputItems.selectedIds[0]; });
        var userRoleId = findSrcObj["UserRoleId"];
        this.selectedUserRoleId = userRoleId;
        var statusId = findSrcObj["StatusId"];
        this.teamid = findSrcObj["OrganizationalUnitId"];
        var msgCount = 0;
        //module Access related
        if (userRoleId <= 3 || userRoleId == 9 || userRoleId == 10) {
            msgCount = 1;
            contextObj.notificationService.ShowToaster("Access Privilege settings are not allowed for users having admin privilege", 2);
        }
        else if (userRoleId == 8) {
            contextObj.notificationService.ShowToaster("Access Privilege settings are not allowed for Work Order Users", 2);
            msgCount = 1;
        }
        else {
            switch (statusId) {
                case 1:
                    var SASubscribed = true;
                    var isSiteAdmin = true;
                    var isUserUnderSiteAdmin = true;
                    this.chkCountSection++; //IsUserUnderSiteAdministrator(intUserId)
                    if (SASubscribed && isSiteAdmin) {
                        if (isUserUnderSiteAdmin == false) {
                            contextObj.notificationService.ShowToaster("You do not have privilege for Module Access Settings", 2);
                            msgCount = 1;
                        }
                        else {
                            this.isModuleAccessPrivilege = true;
                        }
                    }
                    else {
                        this.isModuleAccessPrivilege = true;
                    }
                    if (userRoleId == 6) {
                        contextObj.isModuleAdmin = true;
                    }
                    else if (userRoleId == 7) {
                        contextObj.isDivisionAdmin = true;
                    }
                    break;
                case 2:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for blocked users", 2);
                    msgCount = 1;
                    break;
                case 4:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for deleted users", 2);
                    msgCount = 1;
                    break;
                case 5:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for expired users", 2);
                    msgCount = 1;
                    break;
                case 6:
                    contextObj.notificationService.ShowToaster("Module Access settings are allowed only for active users", 2);
                    msgCount = 1;
                    break;
                case 7:
                    contextObj.notificationService.ShowToaster("Module Access settings are not allowed for locked users", 2);
                    msgCount = 1;
                    break;
            }
        }
        //Drwing Access Related
        if (statusId == 1) {
            if (userRoleId == 4 || userRoleId == 6 || userRoleId == 7) {
                this.isDrwgAccessPrivilege = true;
                this.isDivisionAccessPrivilege = true;
                this.chkCountSection++;
                var context = this;
                this.getDrwgAccessddlObj();
            }
            else {
                if (msgCount == 0) {
                    contextObj.notificationService.ShowToaster("Drawing Access settings are not allowed  for selected user", 2);
                }
            }
        }
        else {
            if (msgCount == 0)
                contextObj.notificationService.ShowToaster("Drawing Access settings are allowed only for active users", 2);
        }
        //Division Access related 
        //if (statusId == 1) {
        //    if (userRoleId == 4 || userRoleId == 6 || userRoleId == 7) {
        //        this.isDivisionAccessPrivilege = true;
        //    } else {
        //        contextObj.notificationService.ShowToaster("Division Access settings are not allowed  for selected user", 2);      
        //    }
        //} else {
        //    contextObj.notificationService.ShowToaster("Division Access settings are allowed only for active users", 2);        
        //}
        //Module Admin Settings
        //if (statusId == 1){
        //    if (userRoleId >= 3) {
        //        this.isModuleAdmin = true;
        //    } else {
        //        this.isModuleAdmin = false;
        //        contextObj.notificationService.ShowToaster("Module Admin Settings are not allowed  for selected user", 2);
        //    }
        //} else {
        //    this.isModuleAdmin = false;
        //    contextObj.notificationService.ShowToaster("Module Admin Settings are allowed only for active users", 2);
        //}
        //division admin settings
        //if (statusId == 1) {
        //    if (userRoleId == 7) {
        //        this.isDivisionAdmin = true;
        //    } else {
        //        contextObj.notificationService.ShowToaster("Selected User is not a Division Administrator", 2);
        //    }
        //} else {
        //    contextObj.notificationService.ShowToaster("Division Admin Settings is allowed only for active users", 2);
        //}
        if (this.isDrwgAccessPrivilege == true || this.isModuleAccessPrivilege == true || this.isDivisionAccessPrivilege == true)
            this.splitviewInput.showSecondaryView = true;
        else
            this.splitviewInput.showSecondaryView = false;
    };
    UsersComponent.prototype.isAnyModuleSelected = function (event) {
        this.isDrwgAccessPrivilege = event["isModuleAccess"];
        this.isDivisionAccessPrivilege = event["isModuleAccess"];
        if (this.isDrwgAccessPrivilege) {
            this.selectedModuleId = -1;
            this.getDrwgAccessddlObj();
        }
        if (this.isDivisionAccessPrivilege) {
            this.selectedModuleId = -1;
        }
    };
    UsersComponent.prototype.getDrwgAccessddlObj = function () {
        var context = this;
        context.administrationService.getUserDrawingAccessModuleddl(context.inputItems.selectedIds).subscribe(function (rst) {
            var remModlArray = [2, 4, 13, 30, 9, 29];
            rst["Data"][0].LookupDetails.LookupValues = rst["Data"][0].LookupDetails.LookupValues.filter(function (item) { return (item.IsChecked == 1 && remModlArray.indexOf(item.Id) == -1); });
            rst["Data"][0].LookupDetails.LookupValues.find(function (item) {
                if (item.Id == 1 && item.IsChecked == 1) {
                    item.Value = "As Builts";
                    return true;
                }
                else
                    return false;
            });
            rst["Data"][0].FieldValue = rst["Data"][0].FieldValue == null ? -1 : rst["Data"][0].FieldValue;
            context.ddlModule = rst["Data"][0]; //module ddl
        });
    };
    UsersComponent.prototype.drwgAccessModuleChange = function (event) {
        this.selectedModuleId = event.ChildFieldObject.FieldValue;
    };
    UsersComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    };
    //slide events/////
    UsersComponent.prototype.okDeleteRestore = function (event, slideTarget) {
        var contextObj = this;
        contextObj.administrationService.deleteRestoreUser(contextObj.inputItems.selectedIds[0], slideTarget).subscribe(function (resultData) {
            var returnId = resultData["Data"]["ServerId"];
            if (returnId > 0) {
                if (slideTarget == 1) {
                    contextObj.notificationService.ShowToaster("User deleted", 3);
                    contextObj.updateStatus(slideTarget, contextObj, returnId);
                }
                else {
                    contextObj.notificationService.ShowToaster("User restored", 3);
                    contextObj.updateStatus(slideTarget, contextObj, returnId);
                }
            }
            else
                contextObj.notificationService.ShowToaster("Failure action", 5);
        });
        this.showSlide = !this.showSlide;
    };
    UsersComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    UsersComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ///////end
    UsersComponent.prototype.updateStatus = function (slideTarget, contextObj, returnId) {
        contextObj.itemsSource.find(function (item) {
            if (item["Id"] == returnId) {
                if (slideTarget == 1) {
                    item["StatusId"] = 4;
                    item["Status"] = "Deleted";
                }
                else {
                    item["StatusId"] = 1;
                    item["Status"] = "Active";
                }
                return true;
            }
            else
                return false;
        });
        var updatedData = new Array();
        updatedData = updatedData.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedData;
    };
    /**************Export ******************/
    UsersComponent.prototype.ExportGridData = function () {
        var context = this;
        var fieldObjectsCopy = context.fieldObject.slice(); /*copy of field object  */
        var fileName = "Users";
        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, fieldObjectsCopy, fileName, function (retCode) {
                if (retCode == 0) {
                    context.notificationService.ShowToaster("User data exported", 3);
                }
                else {
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                }
            });
        }
        else {
            var input = context.administrationService.getUserGridDataExportInput(53, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, fieldObjectsCopy, fileName, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch);
            context.exportObject.ExportDataFromServer(input, 1, fileName, function (retCode) {
                if (retCode == 0)
                    context.notificationService.ShowToaster("User data exported", 3);
                else
                    context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
    };
    /*************************/
    /*Search related */
    UsersComponent.prototype.loadKeywordSearch = function (contextObj) {
        contextObj.administrationService.getCommonKeywordField(430).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            contextObj.keyWordLookup = resultData["FieldBinderList"];
            // contextObj.keyWordLookup = resultData["FieldBinderList"][0].LookupDetails.LookupValues;
        });
    };
    UsersComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        if (contextObj.advancelookup == undefined)
            this.administrationService.getCommonAdvnceSearchLookup(431).subscribe(function (resultData) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
                    var newadvance = contextObj.advancelookup;
                    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                        contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
                            if (result == 1) {
                                newadvance = contextObj.advancelookup.filter(function (item) { return item.ReportFieldId != 8321; });
                                contextObj.advancelookup = newadvance;
                            }
                        });
                    }
                    else {
                        newadvance = contextObj.advancelookup.filter(function (item) { return item.ReportFieldId != 8321; });
                        contextObj.advancelookup = newadvance;
                    }
                    contextObj.advancelookup = newadvance;
                    console.log('advance look up fields', contextObj.advancelookup);
                    if (contextObj.advancelookup)
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    else
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(newadvance));
                });
            });
    };
    UsersComponent.prototype.onloadSearch = function (event) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.advanceValue = "[]";
        this.itemsSource = [];
        this.pageIndex = 0;
        var contextObj = this;
        this.dataLoad(1, contextObj);
    };
    UsersComponent.prototype.Clear = function (event) {
        this.filter = "";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        this.dataLoad(1, contextObj);
    };
    UsersComponent.prototype.Submit = function (event) {
        this.filter = "";
        this.advanceValue = event.fieldobject;
        this.showSearchFilter = [];
        if (this.IsSearchSubmit(event)) {
            this.IsKeyWordSearch = 0;
            this.IsAdvanceSearch = 1;
            this.itemsSource = [];
            var contextObj = this;
            this.pageIndex = 0;
            this.dataLoad(1, contextObj);
        }
        else {
            this.showSearchFilter = this.showSearchFilter.concat(true);
        }
    };
    UsersComponent.prototype.IsSearchSubmit = function (event) {
        var eventObj = JSON.parse(event.fieldobject);
        /*Account Expiry /Account Activation Date field Comparison for between*/
        var isSubmit = true;
        var activaDateObjVal = undefined;
        var expiryDateObjVal = undefined;
        var cnt = 2;
        eventObj.find(function (el) {
            switch (el.ReportFieldId) {
                case 454:
                    if (el.Value.indexOf('æ') > -1) {
                        activaDateObjVal = el.Value;
                    }
                    cnt--;
                    break;
                case 455:
                    if (el.Value.indexOf('æ') > -1) {
                        expiryDateObjVal = el.Value;
                    }
                    cnt--;
                    break;
            }
            if (cnt == 0) {
                return true;
            }
            else
                return false;
        });
        if (expiryDateObjVal != undefined) {
            var splittedVal = expiryDateObjVal.split('ô');
            if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                this.notificationService.ShowToaster("Account expiry To date must be greater than From date", 2);
                isSubmit = false;
            }
            else {
                if (activaDateObjVal != undefined) {
                    var splittedVal = activaDateObjVal.split('ô');
                    if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                        this.notificationService.ShowToaster("Account activation To date must be greater than From date", 2);
                        isSubmit = false;
                    }
                    else {
                        isSubmit = true;
                    }
                }
                else
                    isSubmit = true;
            }
        }
        else if (activaDateObjVal != undefined) {
            var splittedVal = activaDateObjVal.split('ô');
            if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                this.notificationService.ShowToaster("Account activation To date must be greater than From date", 2);
                isSubmit = false;
            }
            else {
                isSubmit = true;
            }
        }
        else
            isSubmit = true;
        return isSubmit;
    };
    /*******************************/
    UsersComponent.prototype.onUserAdd = function (event) {
        this.administrationService.addUser(event);
        console.log(event, "add");
        this.notificationService.ShowToaster("User added and the password has been sent to the email address", 2);
    };
    UsersComponent.prototype.onEdit = function (event) {
        console.log("asd", event[0]);
        // this.administrationService.updateUserDetails(event[0]);
        this.notificationService.ShowToaster("User details updated", 3);
    };
    /*
    SaveAs(event: any) {
        console.log('Entered Save As');
    }
    Delete(event: any) {
        console.log('Entered Delete');
    }
    onSearchSubmit(event: any) {
        console.log('Enetered On Load Search');
    }
    public onAdvancedSearchSubmit(value: any) {
        console.log("search.,..");
    }
    */
    UsersComponent.prototype.onContextMenuOnClick = function (event) {
        var temp = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = temp;
            this.analyticsInput.moduleId = 0;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 53;
            this.analyticsInput.ParentFormId = 431;
            this.showAnalytics = true;
        }
    };
    UsersComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: './app/Views/Administration/Users/users.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, usermodulesaccess_component_1.UserModulesAccessComponent, userdivisionsaccess_component_1.UserDivisionsAccessComponent, multiple_edit_component_1.MultipleEdit, divisionadminsettings_component_1.DivisionAdminSettingsComponent, search_component_1.searchBox,
                userdrawingsaccess_component_1.UserDrawingsAccessComponent, userreportsaccess_component_1.UserReportsAccessComponent, moduleadminsettings_component_1.ModuleAdminSettingsComponent, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, useraddedit_component_1.UserAddEditComponent, resetpassword_component_1.UserResetPwdComponent, drawingmanagement_component_1.DrawingManagementComponent, dropdownlistcomponent_component_1.DropDownListComponent, analytics_component_1.Analytics],
            providers: [common_service_1.CommonService, administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, common_service_1.CommonService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map