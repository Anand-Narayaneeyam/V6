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
var UserResetPwdComponent = (function () {
    function UserResetPwdComponent(administrationService, _notificationService) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.passWord = "";
        this.confirmPwd = "";
        this.isLowerCase = false;
        this.isNumeric = false;
        this.isNonAlphaNumeric = false;
        this.isUpperCase = false;
        this.resetPwdOut = new core_1.EventEmitter();
    }
    UserResetPwdComponent.prototype.resetSubmit = function (event) {
        var contextObj = this;
        var count = 3; //3 rptfieldids to be found
        var logInName = "";
        this.fieldDetailsReset.find(function (item) {
            if (item.ReportFieldId == 445) {
                logInName = item.FieldValue;
                count--;
            }
            else if (item.ReportFieldId == 446) {
                if (contextObj.passWord.length > 0) {
                    contextObj.confirmPwd = item.FieldValue.trim();
                    count--;
                }
                else {
                    contextObj.passWord = item.FieldValue.trim();
                    count--;
                }
            }
            if (count == 0) {
                return true;
            }
            else
                return false;
        });
        if (logInName.trim() == contextObj.passWord.trim()) {
            contextObj._notificationService.ShowToaster("Password cannot be same as Login Name", 5);
        }
        else {
            this.passwordStrength(contextObj, contextObj.passWord);
            this.administrationService.getPasswordPolicy().subscribe(function (result) {
                var pwdPolicy = JSON.parse(result["Data"]);
                var retPwdPolicyCheck = contextObj.checkPWDPolicy(pwdPolicy[0], contextObj);
                if (retPwdPolicyCheck) {
                    if (contextObj.passWord != contextObj.confirmPwd) {
                        contextObj._notificationService.ShowToaster("Password and Confirm Password should be same", 5);
                    }
                    else {
                        contextObj.administrationService.resetPassword(contextObj.selectedId, event["fieldobject"]).subscribe(function (result) {
                            if (result["Data"].StatusId == 1) {
                                contextObj._notificationService.ShowToaster("Password updated", 2);
                                contextObj.resetPwdOut.emit({ "StatusId": 1 });
                            }
                            else {
                                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        });
                    }
                }
            });
        }
    };
    UserResetPwdComponent.prototype.passwordStrength = function (context, password) {
        var desc = new Array();
        desc[0] = "Very Weak";
        desc[1] = "Weak";
        desc[2] = "Better";
        desc[3] = "Medium";
        desc[4] = "Strong";
        desc[5] = "Best";
        var score = 0;
        // var Color = new Array(); Color[0] = "url('../images/General/Ps0.gif')"; Color[1] = "url('../images/General/Ps1.gif')"; Color[2] = "url('../images/General/Ps2.gif')"; Color[3] = "url('../images/General/Ps3.gif')"; Color[4] = "url('../images/General/Ps4.gif')"; Color[5] = "url('../images/General/Ps5.gif')";
        //if password bigger than 4 give 1 point
        if (password.length > 4) {
            score++;
            //if password has both lower and uppercase characters give 1 point
            // if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) score++;
            if (password.match(/[a-z]/))
                context.isLowerCase = true;
            else
                context.isLowerCase = false;
            if (password.match(/[A-Z]/))
                context.isUpperCase = true;
            else
                context.isUpperCase = false;
            //if password has at least one number give 1 point
            //if (password.match(/[0-9]/)) score++;
            if (password.match(/[0-9]/))
                context.isNumeric = true;
            else
                context.isNumeric = false;
            //if password has at least one special caracther give 1 point
            //if (password.match(/.[!,@,#,$,%,^,&,*,?,_,-,(,)]/)) score++;
            if (password.match(/.[!,@,#,$,%,^,&,*,?,_,-,(,)]/))
                context.isNonAlphaNumeric = true;
            else
                context.isNonAlphaNumeric = false;
            //if password bigger than 12 give another 1 point
            if (password.length > 12)
                score++;
        }
        //if (password.length == 0) {   
        //    document.getElementById("pr0").innerHTML = "Not Rated";
        //    for (s = 0; s < 6; s++)        
        //        document.getElementById("pr" + s).style.background = "";
        //}
        //else {
        //    for (s = 0; s <= score; s++)        
        //        document.getElementById("pr" + s).style.background = Color[score];
        //    for (s = score + 1; s < 6; s++)         
        //        document.getElementById("pr" + s).style.background = "";      
        //    document.getElementById("pr0").innerHTML = desc[score];
        //}
    };
    UserResetPwdComponent.prototype.checkPWDPolicy = function (pwdPolicyObj, Context) {
        if (pwdPolicyObj) {
            if (Context.passWord.length < pwdPolicyObj["Minimum length of the password"]) {
                Context._notificationService.ShowToaster("Password requires minimum of " + pwdPolicyObj["Minimum length of the password"] + " characters", 5);
                return false;
            }
            if (!Context.isUpperCase && pwdPolicyObj["Requires at least one upper case character"]) {
                Context._notificationService.ShowToaster("Password requires at least one Upper Case character", 5);
                return false;
            }
            if (!Context.isLowerCase && pwdPolicyObj["Requires at least one lower case character"]) {
                Context._notificationService.ShowToaster("Password requires at least one Lower Case character", 5);
                return false;
            }
            if (!Context.isNumeric && pwdPolicyObj["Requires at least one numeric character"]) {
                Context._notificationService.ShowToaster("Password requires at least one Number", 5);
                return false;
            }
            if (!Context.isNonAlphaNumeric && pwdPolicyObj["Requires at least one non-alphanumeric character"]) {
                Context._notificationService.ShowToaster("Password requires at least one Special character and should not be at the beginning", 5);
                return false;
            }
        }
        return true;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserResetPwdComponent.prototype, "resetPwdOut", void 0);
    UserResetPwdComponent = __decorate([
        core_1.Component({
            selector: 'user-reset-pwd',
            templateUrl: 'app/Views/Administration/Users/resetpassword.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'fieldDetailsReset']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], UserResetPwdComponent);
    return UserResetPwdComponent;
}());
exports.UserResetPwdComponent = UserResetPwdComponent;
//# sourceMappingURL=resetpassword.component.js.map