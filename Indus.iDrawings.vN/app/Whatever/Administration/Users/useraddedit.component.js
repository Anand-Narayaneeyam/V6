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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var UserAddEditComponent = (function () {
    function UserAddEditComponent(administrationService, _notificationService, getData) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.userRole = -1;
        this.isNamesNAN = true;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.selectedIds = []; //[] = [];
        this.tempAray = [];
        this.blnEmailDomainValidation = false;
    }
    ;
    UserAddEditComponent.prototype.ngOnInit = function () {
        // var contextObj = this;
        // debugger
        //// if (rptFieldId.ReportFieldId == 8321) {
        // var selectSite = contextObj.fieldDetailsAdd.find(function (item) {
        //         return item.ReportFieldId === 8414;
        //     })
        //     selectSite.IsVisible = selectSite.FieldValue == "1";
        // //}
    };
    UserAddEditComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        // debugger
        this.administrationService.getCustomerSubscribedFeatures("189,214").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                var userAccssLevel = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8321;
                });
                if (customerSettingsData.Data && customerSettingsData.Data[1]["IsSubscribed"] == true) {
                    contextObj.blnEmailDomainValidation = true;
                }
                else {
                    contextObj.blnEmailDomainValidation = false;
                }
                userAccssLevel.IsVisible = true;
                userAccssLevel.IsMandatory = true;
            }
        });
        //this.administrationService.getSessionData().subscribe(function (sessionData) {
        // var userId = sessionData.Data[0]["UserId"];
        contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
            //debugger
            if (result == 1) {
                var userAccssLvl = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8321;
                });
                userAccssLvl.IsEnabled = false;
                userAccssLvl.IsMandatory = true;
                userAccssLvl.FieldValue = "1";
            }
            if (contextObj.fieldDetailsAdd != undefined) {
                var selectSite = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8414;
                });
                var useracess = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8321;
                });
                selectSite.IsVisible = useracess.FieldValue == "1";
                if (contextObj.selectedId.toString().length != 0) {
                    contextObj.administrationService.getUserAccessibleSiteIds(contextObj.selectedId).subscribe(function (result) {
                        //debugger;
                        for (var _i = 0, _a = JSON.parse(result); _i < _a.length; _i++) {
                            var item = _a[_i];
                            contextObj.selectedIds.push({
                                ReportFieldId: 571, Value: item.Id
                            });
                        }
                    });
                }
            }
        });
        // });
        // if (rptFieldId.ReportFieldId == 8321) {
    };
    UserAddEditComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        // debugger;
        if (contextObj.isNamesNAN) {
            switch (this.action) {
                case "add":
                    this.postSubmit(contextObj, event["fieldobject"], 1);
                    break;
                case "edit":
                    this.postSubmit(contextObj, event["fieldobject"], 2);
                    break;
            }
        }
    };
    UserAddEditComponent.prototype.postSubmit = function (contextObj, strsubmitField, target) {
        var submitObj = JSON.parse(strsubmitField);
        // debugger    
        var findObjRpt = [452, 454, 455, 447, 459, 8321]; //statusId,acctExpiry date,userroleddl,useraccesslevelddl
        var count = findObjRpt.length;
        var statusObj = [];
        var accExpiryDate = [];
        var activationDate = [];
        var emailObj = [];
        var userroleId = 0;
        var isSubmit = true;
        var maxUsersCreated = "";
        var strMaxWorkOrderUser = "";
        var userAccountLevel = 0;
        submitObj.find(function (item) {
            switch (item.ReportFieldId) {
                case 452:
                    statusObj.push(item);
                    count--;
                    break;
                case 454:
                    activationDate.push(item);
                    count--;
                    break;
                case 455:
                    accExpiryDate.push(item);
                    count--;
                    break;
                case 447:
                    emailObj.push(item);
                    count--;
                    break;
                case 459:
                    userroleId = item.Value;
                    count--;
                    break;
                case 8321:
                    userAccountLevel = item.Value == "-1" ? "0" : item.Value;
                    item.Value = item.Value == "-1" ? "0" : item.Value;
                    count--;
                    break;
            }
            if (count == 0) {
                return true;
            }
            else {
                return false;
            }
        });
        if (userAccountLevel == 1) {
            for (var _i = 0, _a = this.selectedIds; _i < _a.length; _i++) {
                var item = _a[_i];
                submitObj.push(item);
            }
        }
        // if (submitObj.find(     
        // JSON.parse(this.selectedIds)
        // debugger;
        var userAccssLevl = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 8321;
        });
        if (userAccssLevl.FieldValue == "1") {
            if (contextObj.selectedIds.length == 0) {
                contextObj._notificationService.ShowToaster("Select at least one Site", 5);
                isSubmit = false;
            }
        }
        this.administrationService.GetMaxUsrCreated().subscribe(function (resultData) {
            maxUsersCreated = resultData["Data"];
            contextObj.administrationService.GetMaxWOUserCreated().subscribe(function (resul) {
                strMaxWorkOrderUser = resul["Data"];
                if (maxUsersCreated == "0") {
                    if (userroleId > 2 && userroleId < 8) {
                        if ((contextObj.selectedUserRole == 8) || (statusObj[0].Value == "2") || (statusObj[0].Value == "5")) {
                            contextObj._notificationService.ShowToaster("Maximum number of users reached", 5);
                            isSubmit = false;
                        }
                    }
                }
                if (strMaxWorkOrderUser == "0") {
                    if (userroleId == 8) {
                        if ((contextObj.selectedUserRole != 8) || (statusObj[0].Value == "2") || (statusObj[0].Value == "5")) {
                            contextObj._notificationService.ShowToaster("Maximum number of Work Order users reached", 5);
                            isSubmit = false;
                        }
                    }
                }
                if (isSubmit == true) {
                    //--78482--statusObj[0].Value == "5" && 
                    if (new Date(accExpiryDate[0].Value) < new Date()) {
                        contextObj._notificationService.ShowToaster("'Account Expires On' must be a future date", 5);
                    }
                    else if (new Date(activationDate[0].Value) > new Date(accExpiryDate[0].Value)) {
                        contextObj._notificationService.ShowToaster("'Account Activates On' must be earlier than 'Account Expires On'", 5);
                    }
                    else {
                        //mail domain validation
                        contextObj.administrationService.checkMailDomain(emailObj[0].Value).subscribe(function (result) {
                            // if (contextObj.getData.checkForUnhandledErrors(result)) {
                            if ((contextObj.blnEmailDomainValidation && result["Data"]) || contextObj.blnEmailDomainValidation == false) {
                                contextObj.administrationService.AddUpdateUserDetails(JSON.stringify(submitObj), contextObj.selectedId, target).subscribe(function (resultData) {
                                    //if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                                    switch (resultData["Data"].StatusId) {
                                        case 0:
                                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                            break;
                                        case 1:
                                            if (target == 1) {
                                                contextObj._notificationService.ShowToaster("User added and the password has been sent to the email address", 3);
                                            }
                                            else {
                                                contextObj._notificationService.ShowToaster("User details updated", 3);
                                            }
                                            contextObj.submitSuccess.emit({ "returnData": resultData["Data"].Data });
                                            break;
                                        case 3:
                                            switch (resultData["Data"].ServerId) {
                                                case -1:
                                                    contextObj._notificationService.ShowToaster("Maximum number of users reached", 5);
                                                    break;
                                                case -2:
                                                    contextObj._notificationService.ShowToaster("Login Name already used by another iDrawings user", 5);
                                                    break;
                                                case -3:
                                                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                                    break;
                                            }
                                            break;
                                    }
                                    // }
                                });
                            }
                            else {
                                if (contextObj.blnEmailDomainValidation == true) {
                                    contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                                    contextObj.setFormInvalid(447);
                                }
                            }
                            // }
                        });
                    }
                }
            });
        });
    };
    UserAddEditComponent.prototype.onSubmitSiteSelection = function (event) {
        // var contextObj = this;
        // var selectedSiteIds = "";
        // for (var count = 0; count < this.fieldDetailsSites[0].MultiFieldValues.length; count++) {
        //     selectedSiteIds= selectedSiteIds + this.fieldDetailsSites[0].MultiFieldValues[count] + ',';
        // }
        // debugger
        //// selectedSiteIds = selectedSiteIds.slice(0, -1);
        this.selectedIds = JSON.parse(event.fieldobject); // selectedSiteIds;
        this.splitviewInput.showSecondaryView = false;
    };
    UserAddEditComponent.prototype.checkErrorsInForm = function () {
        var blnSuccess = true;
        return blnSuccess;
    };
    UserAddEditComponent.prototype.userddlChange = function (arg) {
        var rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        //userRoleId change 
        if (rptFieldId.ReportFieldId == 459) {
            this.userRole = parseInt(rptFieldId.FieldValue);
            //indus admin
            var tmpArr = [8321, 8114];
            var cnt = 2;
            this.fieldDetailsAdd.find(function (item) {
                if (tmpArr.indexOf(item.ReportFieldId) > -1) {
                    cnt--;
                    if (rptFieldId.FieldValue == 1) {
                        item.IsEnabled = false;
                        if (item.ReportFieldId == 8321) {
                            item.FieldValue = "0";
                        }
                    }
                    else {
                        item.IsEnabled = true;
                        if (item.ReportFieldId == 8321) {
                            item.FieldValue = "-1";
                        }
                    }
                }
                if (cnt == 0) {
                    return true;
                }
                else
                    return false;
            });
            if (rptFieldId.FieldValue <= 3 || rptFieldId.FieldValue == 9) {
                this.setDWGAccess(true);
            }
            else {
                this.setDWGAccess(false);
            }
        }
        else if (rptFieldId.ReportFieldId == 8321) {
            var selectSite = this.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 8414;
            });
            selectSite.IsVisible = rptFieldId.FieldValue == "1";
        }
    };
    UserAddEditComponent.prototype.setDWGAccess = function (value) {
        this.fieldDetailsAdd.find(function (item) {
            //DWG Access
            if (item.ReportFieldId == 692) {
                item.FieldValue = value;
                item.IsEnabled = !value;
                return true;
            }
            else {
                return false;
            }
        });
    };
    UserAddEditComponent.prototype.rdBtnListChange = function (event) {
        //436---access previlege
        if (event.rbtnObject.fieldobject.ReportFieldId == 436)
            this.accessPrevilegeChange(event);
    };
    UserAddEditComponent.prototype.accessPrevilegeChange = function (event) {
        var context = this;
        switch (event.rbtnObject.fieldobject.FieldValue) {
            case "1":
                context.setAccessPrevilegeddls(context, 1);
                context.administrationService.getUserListForUserRole(context.userRole, 0).subscribe(function (result) {
                    //  if (context.getData.checkForUnhandledErrors(result)) {
                    if (result.Data.length > 0) {
                        context.fieldDetailsAdd.find(function (item) {
                            if (item.ReportFieldId == 443) {
                                item.LookupDetails.LookupValues = result["Data"];
                                return true;
                            }
                            else
                                return false;
                        });
                    }
                    else
                        context._notificationService.ShowToaster("No Users exist", 2);
                    // }
                });
                break;
            case "2":
                context.setAccessPrevilegeddls(context, 2);
                context.administrationService.getAccessTemplatesForUserRole(context.userRole).subscribe(function (result) {
                    // if (context.getData.checkForUnhandledErrors(result)) {
                    if (result.Data.length > 0) {
                        context.fieldDetailsAdd.find(function (item) {
                            if (item.ReportFieldId == 6320) {
                                item.LookupDetails.LookupValues = result["Data"];
                                return true;
                            }
                            else
                                return false;
                        });
                    }
                    else
                        context._notificationService.ShowToaster("No Access Templates exist", 2);
                    //}
                });
                break;
            case "3":
                context.setAccessPrevilegeddls(context, 3);
                break;
        }
    };
    UserAddEditComponent.prototype.setAccessPrevilegeddls = function (context, target) {
        var rptField = [443, 6320];
        var count = rptField.length;
        context.fieldDetailsAdd.find(function (item) {
            //existing user
            if (item.ReportFieldId == 443 && item.DataEntryControlId == 4) {
                if (target == 1) {
                    item.IsEnabled = true;
                }
                else {
                    item.IsEnabled = false;
                }
                count--;
            }
            //access template
            if (item.ReportFieldId == 6320) {
                if (target == 2) {
                    item.IsEnabled = true;
                }
                else {
                    item.IsEnabled = false;
                }
                count--;
            }
            if (count == 0) {
                return true;
            }
            else
                return false;
        });
    };
    UserAddEditComponent.prototype.expiryActivationDateChange = function (event) {
        //454 -- account activation date
        //455 --- account expiry date
        var dateChangeField = event["dateChangeObject"].FieldObject;
        var activnDateFieldObj = this.fieldDetailsAdd.filter(function (item) { return item.ReportFieldId == 454; });
        var expiryDateFieldObj = this.fieldDetailsAdd.filter(function (item) { return item.ReportFieldId == 455; });
        var activatDate = new Date(activnDateFieldObj[0].FieldValue);
        var expiryDate = new Date(expiryDateFieldObj[0].FieldValue);
        var selectedDate = new Date(dateChangeField["FieldValue"]);
        var errorCode = 0;
        if ((dateChangeField["ReportFieldId"] == 455) && (selectedDate < new Date())) {
        }
        else if ((selectedDate > expiryDate) && (dateChangeField["ReportFieldId"] == 454)) {
        }
        if (errorCode == 0) {
            var selectedId = this.selectedId;
            this.fieldDetailsAdd.find(function (item) {
                if (item.ReportFieldId == 452 && item.FieldValue == "5" && selectedId > 0) {
                    item.FieldValue = "1";
                    return true;
                }
                else
                    return false;
            });
        }
    };
    UserAddEditComponent.prototype.checkAvailability = function (event) {
        // debugger;
        var context = this;
        var userId;
        if (this.action == "add") {
            userId = "0";
        }
        else {
            userId = context.selectedId;
        }
        if (event.fieldData.ReportFieldId == "8414") {
            context.administrationService.getUserAccessibleSiteslist(userId).subscribe(function (result) {
                if (result["Data"][0].LookupDetails.LookupValues.length < 1) {
                    context._notificationService.ShowToaster("No Sites exist", 2);
                }
                else {
                    context.fieldDetailsSites = result["Data"];
                    if (this.action != "Add") {
                        for (var _i = 0, _a = context.fieldDetailsSites[0].LookupDetails.LookupValues; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item["IsChecked"] == 1 && context.tempAray.indexOf(item.Id.toString()) == -1) {
                                context.tempAray.push(item.Id.toString());
                            }
                        }
                        context.fieldDetailsSites[0].MultiFieldValues = context.tempAray;
                    }
                    //if (context.fieldDetailsSites[0].MultiFieldValues != null) {
                    //    for (var itm of context.fieldDetailsSites[0].MultiFieldValues) {
                    //        if (context.tempAray.indexOf(item.Id.toString()) != -1)
                    //            context.tempAray.push(item.Id.toString());
                    //    }
                    //}
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                }
            });
        }
        else {
            var logInNameObj = this.fieldDetailsAdd.filter(function (item) { return item.ReportFieldId == 445; });
            if (logInNameObj[0].FieldValue != null && logInNameObj[0].FieldValue != undefined) {
                if (logInNameObj[0].HasValidationError == false)
                    if (logInNameObj[0].FieldValue.length > 0) {
                        this.administrationService.checkUserNameAvailable(logInNameObj[0].FieldValue).subscribe(function (result) {
                            //if (context.getData.checkForUnhandledErrors(result)) {
                            if (result["Data"] == 1) {
                                context._notificationService.ShowToaster("Login Name already used by another iDrawings user", 5);
                            }
                            else {
                                context._notificationService.ShowToaster("Login Name available", 2);
                            }
                            // }
                        });
                    }
                    else
                        context._notificationService.ShowToaster("Enter Login Name", 5);
            }
            else {
                context._notificationService.ShowToaster("Enter Login Name", 5);
            }
        }
    };
    UserAddEditComponent.prototype.txtBoxChange = function (event) {
        var curFieldObj = event["txtChangeObject"]["fieldObject"];
        var rptField = [448, 449, 450];
        if (rptField.indexOf(curFieldObj.ReportFieldId) > -1) {
            if (!isNaN(Number(curFieldObj.FieldValue))) {
                this.setFormInvalid(curFieldObj.ReportFieldId);
                var msg = "";
                switch (curFieldObj.ReportFieldId) {
                    case 448:
                        msg = "First Name";
                        break;
                    case 449:
                        msg = "Middle Name";
                        break;
                    case 450:
                        msg = "Last Name";
                        break;
                }
                this.isNamesNAN = false;
                this._notificationService.ShowToaster(msg + " should contain at least one alphabet", 5);
            }
            else {
                this.isNamesNAN = true;
            }
        }
    };
    UserAddEditComponent.prototype.setFormInvalid = function (rptFieldId) {
        this.fieldDetailsAdd.find(function (item) {
            if (item.ReportFieldId == rptFieldId) {
                item.HasValidationError = true;
                item.IsLocallyValidated = true;
                return true;
            }
            else
                return false;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UserAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UserAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserAddEditComponent.prototype, "submitSuccess", void 0);
    UserAddEditComponent = __decorate([
        core_1.Component({
            selector: 'user-add-edit',
            templateUrl: 'app/Views/Administration/Users/useraddedit.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'selectedUserRole'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], UserAddEditComponent);
    return UserAddEditComponent;
}());
exports.UserAddEditComponent = UserAddEditComponent;
//# sourceMappingURL=useraddedit.component.js.map