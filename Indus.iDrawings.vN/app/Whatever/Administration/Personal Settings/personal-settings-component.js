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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
require("../../../../Scripts/RSA.js");
require("../../../../Scripts/RSA.encryption.sample.js");
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var router_1 = require('@angular/router');
var PersonalSettings = (function () {
    function PersonalSettings(notificationService, administrationService, _validateService, router) {
        var _this = this;
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this._validateService = _validateService;
        this.router = router;
        this.isTabClicked = false;
        this.selectedTab = 0;
        this.iscard = true;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.objRSAEncryptionSample = new RSAEncryptionSample();
        this.isNamesNAN = true;
        this.passwordMaxLength = "8";
        this.enableEmail = false;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    PersonalSettings.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Change Password",
                "image": "Change Password",
                "path": "Change Password",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        this.pagePath = "Administration / Personal Settings";
        var contextObj = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            var sessionUserRoleId = data["Data"]["UserRoleId"];
            if (sessionUserRoleId > 3)
                contextObj.enableEmail = true;
            var userId = data["Data"]["UserId"];
            contextObj.administrationService.getPersonalSettingsFieldWithData(userId).subscribe(function (resultData) {
                var displayOptnFormat = resultData["Data"].find(function (item) { return item.FieldId === 2303; });
                if (Number(displayOptnFormat.FieldValue) == 1)
                    displayOptnFormat.FieldValue = "61";
                else if (Number(displayOptnFormat.FieldValue) == 2)
                    displayOptnFormat.FieldValue = "60";
                var loginName = resultData["Data"].find(function (item) { return item.FieldId === 2081; });
                var email = resultData["Data"].find(function (item) { return item.FieldId === 2085; });
                if (contextObj.enableEmail == true)
                    email.IsEnabled = true;
                contextObj.loginNameValue = loginName.FieldValue;
                contextObj.btnName = "Save Changes";
                contextObj.fieldDetails = resultData["Data"];
            });
        });
    };
    PersonalSettings.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.changePassword();
        }
    };
    PersonalSettings.prototype.changePassword = function () {
        var contextObj = this;
        this.administrationService.getChangePasswordlist().subscribe(function (data) {
            contextObj.lognNameFieldObject = data["Data"][0];
            contextObj.currentPassFieldObject = data["Data"][1];
            contextObj.newPassFieldObject = data["Data"][2];
            contextObj.confirmPassFieldObject = data["Data"][3];
            contextObj.administrationService.getPasswordPolicy().subscribe(function (resultData) {
                var temp = JSON.parse(resultData["Data"]);
                contextObj.passwordMaxLength = temp[0]["Minimum length of the password"];
                // contextObj.newPassFieldObject.MaxLength = Number(contextObj.passwordMaxLength);
                contextObj.newPassFieldObject.FieldLabel = "Password (Minimum " + contextObj.passwordMaxLength + " Characters)";
            });
            contextObj.pageTitle = "Change Password";
            contextObj.btnNamePass = "Save Changes";
            var loginName = data["Data"].find(function (item) { return item.FieldId === 2081; });
            loginName.FieldValue = contextObj.loginNameValue;
            contextObj.changePasswordField = data["Data"];
            contextObj.splitviewInput.showSecondaryView = true;
        });
    };
    PersonalSettings.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event.fieldobject);
        var email = temp.find(function (item) { return item.ReportFieldId === 447; });
        var displayOptnFormat = temp.find(function (item) { return item.ReportFieldId === 411; });
        contextObj.administrationService.checkMailDomain(email.Value).subscribe(function (result) {
            // if (contextObj.getData.checkForUnhandledErrors(result)) {
            if (result["Data"]) {
                if (displayOptnFormat.Value == "60")
                    displayOptnFormat.Value = "2";
                if (displayOptnFormat.Value == "61")
                    displayOptnFormat.Value = "1";
                if (contextObj.isNamesNAN) {
                    temp.push({
                        ReportFieldId: 410,
                        Value: "7"
                    });
                    //temp.push({
                    //    ReportFieldId: 411,//------>NameDisplayOptionId
                    //    Value: "1"
                    //});
                    temp.push({
                        ReportFieldId: 8222,
                        Value: "0"
                    });
                    contextObj.administrationService.updatePersonalSettingsData(JSON.stringify(temp)).subscribe(function (resultData) {
                        if (resultData.Data.Message == "Success") {
                            contextObj.notificationService.ShowToaster("Personal Settings updated. Changes will be reflected in the next login.", 3);
                            contextObj.splitviewInput.showSecondaryView = false;
                        }
                        else if (resultData.Data.Message == "Failure")
                            contextObj.notificationService.ShowToaster("Personal Settings update failed.", 5);
                    });
                }
            }
            else {
                contextObj.notificationService.ShowToaster("Specified mail domain not added in iDrawings.", 5);
                contextObj.setFormInvalid(447);
            }
            // }
        });
    };
    PersonalSettings.prototype.okSubmit = function (event) {
        var contextObj = this;
        if (this.currentPassFieldObject.HasValidationError == true || this.newPassFieldObject.HasValidationError == true || this.confirmPassFieldObject.HasValidationError == true)
            return;
        else if (this.currentPassFieldObject.HasValidationError == false && this.newPassFieldObject.HasValidationError == false && this.confirmPassFieldObject.HasValidationError == false) {
            if (contextObj.newPassFieldObject.FieldValue.length > Number(contextObj.passwordMaxLength) - 1) {
                this.administrationService.passwordChangePossible().subscribe(function (rst) {
                    if (rst["Data"] > 0) {
                        var retTime = contextObj.GetStringFromMinutes(rst["Data"]);
                        contextObj.notificationService.ShowToaster("Your password was changed recently. Next change is possible only after " + retTime, 5);
                    }
                    else {
                        contextObj.administrationService.getChangePasswordKey().subscribe(function (resultData) {
                            contextObj.objRSAEncryptionSample.initKeyForRSA(resultData.RSA_E, resultData.RSA_M);
                            var currentPass = contextObj.objRSAEncryptionSample.RSAEncryption(contextObj.currentPassFieldObject.FieldValue);
                            var Pass = contextObj.objRSAEncryptionSample.RSAEncryption(contextObj.newPassFieldObject.FieldValue);
                            var confirmPass = contextObj.objRSAEncryptionSample.RSAEncryption(contextObj.confirmPassFieldObject.FieldValue);
                            contextObj.administrationService.updatePassword(currentPass, Pass, confirmPass).subscribe(function (Data) {
                                if (Data.Message == "Password updated") {
                                    contextObj.notificationService.ShowToaster("Password updated.", 3);
                                    contextObj.splitviewInput.showSecondaryView = false;
                                }
                                else
                                    contextObj.notificationService.ShowToaster(Data.Message, 5);
                            });
                        });
                    }
                });
            }
            else
                contextObj.notificationService.ShowToaster("Password requires minimum of " + contextObj.passwordMaxLength + " characters.", 5);
        }
    };
    PersonalSettings.prototype.GetStringFromMinutes = function (min) {
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
    PersonalSettings.prototype.onSubmitPassWord = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event.fieldobject);
        //var de: any;
        //de = temp[1].Value;
        //de = btoa(de);
        //de = atob(de);
        //  <HTMLElement>document.getElementById("1387").nodeValue = almaarrattam(<HTMLElement>document.getElementById("1387").nodeValue);
        //var RSA_E = <HTMLElement>document.getElementById("txtRSAE").;
        //var RSA_M = <HTMLInputElement>document.getElementById("txtRSAM").value;
        if (temp[2].Value.length > 8) {
            contextObj.administrationService.getChangePasswordKey().subscribe(function (resultData) {
                contextObj.objRSAEncryptionSample.initKeyForRSA(resultData.RSA_E, resultData.RSA_M);
                var currentPass = contextObj.objRSAEncryptionSample.RSAEncryption(temp[1].Value);
                var Pass = contextObj.objRSAEncryptionSample.RSAEncryption(temp[2].Value);
                var confirmPass = contextObj.objRSAEncryptionSample.RSAEncryption(temp[3].Value);
                contextObj.administrationService.updatePassword(currentPass, Pass, confirmPass).subscribe(function (Data) {
                    if (Data.Message == "Password updated") {
                        contextObj.notificationService.ShowToaster("Password updated, Re-login after session expiry.", 3);
                        contextObj.splitviewInput.showSecondaryView = false;
                        setTimeout(function () {
                            if (this.IE11Staus == false) {
                                var baseUrl = window.document.baseURI;
                            }
                            else {
                                var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
                            }
                            if (baseUrl.includes("undefined/")) {
                                baseUrl.replace("undefined/", "");
                            }
                            var logoutUrl = baseUrl + "/Account/LogOff";
                            window.location.href = logoutUrl;
                        }, 2000);
                    }
                    else
                        contextObj.notificationService.ShowToaster(Data.Message, 5);
                });
            });
        }
        else
            contextObj.notificationService.ShowToaster("Password requires minimum of 8 characters.", 5);
    };
    //getSelectedTab(event) {
    //    if (event[0] == 0) {
    //        this.selectedTab = 0;
    //        if (event[1] == true && this.isNextClicked == true) {
    //            this.isNextClicked = false;
    //            var contextObj = this;
    //            setTimeout(function () {
    //                contextObj.tabDeleteIndex = 1;
    //                contextObj.isNextClicked = false;
    //            }, 50);
    //            setTimeout(function () {
    //                contextObj.tabDeleteIndex = 0;
    //            }, 50);
    //        }
    //    }
    //}
    PersonalSettings.prototype.getSelectedTab = function (event) {
    };
    PersonalSettings.prototype.onTabClose = function (event) {
    };
    PersonalSettings.prototype.onKeyUp = function (event) {
        var g_blnIsLowerCase;
        var g_blnIsUpperCase;
        var g_blnIsNumeric;
        var g_blnIsNonAlphaNumeric;
        //var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        //var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        //var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        //if (false == enoughRegex.test(event)) {
        //    $('#passstrength').html('More Characters');
        //} else if (strongRegex.test(event)) {
        //   // $('#passstrength').className = 'ok';
        //    $('#passstrength').html('Strong!');
        //} else if (mediumRegex.test(event)) {
        //   // $('#passstrength').className = 'alert';
        //    $('#passstrength').html('Medium!');
        //    $('#passstrength').css("color", "brown");
        //} else {
        //   // $('#passstrength').className = 'error';
        //    $('#passstrength').html('Weak!');
        //    $('#passstrength').css("color", "red");
        //}
        //return true;
        var desc = new Array();
        desc[0] = "Very Weak";
        desc[1] = "Weak";
        desc[2] = "Better";
        desc[3] = "Medium";
        desc[4] = "Strong";
        desc[5] = "Best";
        var score = 0;
        var Color = new Array();
        Color[0] = "url('Content/Icons/Ps0.png')";
        Color[1] = "url('Content/Icons/Ps1.png')";
        Color[2] = "url('Content/Icons/Ps2.png')";
        Color[3] = "url('Content/Icons/Ps3.png')";
        Color[4] = "url('Content/Icons/Ps4.png')";
        Color[5] = "url('Content/Icons/Ps5.png')";
        if (event.length > 4) {
            score++;
            if ((event.match(/[a-z]/)) && (event.match(/[A-Z]/)))
                score++;
            if (event.match(/[a-z]/))
                g_blnIsLowerCase = 'True';
            else
                g_blnIsLowerCase = 'False';
            if (event.match(/[A-Z]/))
                g_blnIsUpperCase = 'True';
            else
                g_blnIsUpperCase = 'False';
            if (event.match(/[0-9]/))
                score++;
            if (event.match(/[0-9]/))
                g_blnIsNumeric = 'True';
            else
                g_blnIsNumeric = 'False';
            if (event.match(/.[!,@@,#,$,%,^,&,*,?,_,-,(,)]/))
                score++;
            if (event.match(/.[!,@@,#,$,%,^,&,*,?,_,\-,(,),/]/))
                g_blnIsNonAlphaNumeric = 'True';
            else
                g_blnIsNonAlphaNumeric = 'False';
            if (event.length > 12)
                score++;
        }
        if (event.length == 0) {
            document.getElementById("pr0").innerHTML = "Not Rated";
            for (var s = 0; s < 6; s++)
                document.getElementById("pr" + s).style.background = "";
        }
        else {
            for (var s = 0; s <= score; s++)
                document.getElementById("pr" + s).style.background = Color[score];
            for (var s = score + 1; s < 6; s++)
                document.getElementById("pr" + s).style.background = "";
            document.getElementById("pr0").innerHTML = desc[score];
        }
    };
    PersonalSettings.prototype.txtBoxChange = function (event) {
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
                // this.notificationService.ShowToaster("Numeric characters are not allowed in " + msg, 5);
                if (curFieldObj.ReportFieldId == 449 && curFieldObj.FieldValue.length == 0)
                    this.isNamesNAN = true;
                if (curFieldObj.FieldValue.length > 0)
                    this.notificationService.ShowToaster(msg + " should contain at least one alphabet.", 5);
            }
            else {
                this.isNamesNAN = true;
            }
        }
    };
    PersonalSettings.prototype.setFormInvalid = function (rptFieldId) {
        this.fieldDetails.find(function (item) {
            if (item.ReportFieldId == rptFieldId) {
                item.HasValidationError = true;
                item.IsLocallyValidated = true;
                return true;
            }
            else
                return false;
        });
    };
    PersonalSettings.prototype.okSubmitCancel = function (event) {
        var loadDefaultURL = "/personalsettingscancelled";
        var contextObj = this;
        setTimeout(function () {
            contextObj.router.navigateByUrl(loadDefaultURL);
        }, 10);
    };
    PersonalSettings = __decorate([
        core_1.Component({
            selector: 'personal-settings',
            templateUrl: './app/Views/Administration/Personal Settings/personal-settings-component.html',
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, validation_service_1.ValidateService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, validation_service_1.ValidateService, router_1.Router])
    ], PersonalSettings);
    return PersonalSettings;
}());
exports.PersonalSettings = PersonalSettings;
//# sourceMappingURL=personal-settings-component.js.map