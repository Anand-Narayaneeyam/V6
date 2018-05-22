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
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var labelcomponent_component_1 = require('../../../Framework/Whatever/Dynamiccontrols/Dynamicfields/labelcomponent.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var buttoncomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component');
var validation_service_1 = require('../../../framework/models/validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var UserLicencingSetupComponent = (function () {
    function UserLicencingSetupComponent(administrationService, notificationService, validateService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.sourceFieldObj = [];
        this.inputItems = { dataKey: "UserRoleId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "", isHeaderCheckBx: true };
        this.customerId = 0;
        this.entityCategoryId = 0;
        this.disableBtn = false;
        this.count = 0;
        this.licenceTypeId = 0;
        this.deviceTypeId = -1;
        this.value = [];
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.submitSuccess = new core_1.EventEmitter();
    }
    UserLicencingSetupComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";
        this.administrationService.loadUserLicenseSetupFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                if (contextObj.fieldObject[i].ReportFieldId == 112) {
                    contextObj.ddlCustomer = contextObj.fieldObject[i];
                    contextObj.ddlCustomer.FieldLabel = "Customer";
                    contextObj.ddlCustomer.FieldValue = contextObj.customerId;
                    contextObj.ddlCustomer.IsEnabled = false;
                    contextObj.ddlCustomer.IsMandatory = false;
                }
                else if (contextObj.fieldObject[i].ReportFieldId == 8413) {
                    contextObj.ddlLicenceAllotment = contextObj.fieldObject[i];
                    contextObj.ddlLicenceAllotment.FieldValue = "0";
                }
                else if (contextObj.fieldObject[i].ReportFieldId == 6324) {
                    contextObj.ddlDeviceType = contextObj.fieldObject[i];
                    if (contextObj.rowData["IsDevicewiseAllotmentRequired"] == 0) {
                        contextObj.ddlDeviceType.IsEnabled = false;
                        contextObj.ddlDeviceType.IsMandatory = false;
                        contextObj.ddlDeviceType.FieldValue = "-1";
                        contextObj.deviceTypeId = 0;
                    }
                    else {
                        contextObj.ddlDeviceType.FieldValue = "1";
                        contextObj.deviceTypeId = 1;
                    }
                }
                else if (contextObj.fieldObject[i].ReportFieldId == 5213) {
                    if (contextObj.rowData["HasConcurrentCap"] == 0) {
                        contextObj.fieldObject[i].IsEnabled = false;
                        contextObj.fieldObject[i].FieldValue = "0";
                    }
                }
            }
            contextObj.dynamicfieldObject = JSON.parse(JSON.stringify(contextObj.fieldObject));
            var removeArr = [112, 8413, 6324];
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            contextObj.loadUserLicenceSetupData(contextObj);
        });
    };
    UserLicencingSetupComponent.prototype.loadUserLicenceSetupData = function (contextObj) {
        if (contextObj.rowData["Role wise allotment required?"] == 1) {
            contextObj.isRolewise = true;
            contextObj.administrationService.getUserLicenceSetupDataForCustomers(contextObj.customerId, contextObj.deviceTypeId, contextObj.licenceTypeId).subscribe(function (result) {
                contextObj.itemSource = JSON.parse(result.FieldBinderData);
                contextObj.loadSource(contextObj);
            });
        }
        else {
            contextObj.isRolewise = false;
            contextObj.administrationService.getUserLicenceSetupData(contextObj.customerId, contextObj.deviceTypeId).subscribe(function (result) {
                contextObj.itemSource = JSON.parse(result.FieldBinderData);
                for (var i = 0; i < contextObj.dynamicfieldObject.length; i++) {
                    if (contextObj.dynamicfieldObject[i].ReportFieldId == 8413) {
                        contextObj.dynamicfieldObject[i].IsVisible = false;
                    }
                    else if (contextObj.dynamicfieldObject[i].ReportFieldId == 439) {
                        contextObj.dynamicfieldObject[i].IsVisible = false;
                    }
                    else if (contextObj.dynamicfieldObject[i].ReportFieldId == 5212) {
                        contextObj.dynamicfieldObject[i].IsMandatory = true;
                        if (contextObj.itemSource.length > 0)
                            contextObj.dynamicfieldObject[i].FieldValue = contextObj.itemSource[0]["MaxUsers"];
                        else
                            contextObj.dynamicfieldObject[i].FieldValue = "0";
                    }
                    else if (contextObj.dynamicfieldObject[i].ReportFieldId == 5213) {
                        contextObj.dynamicfieldObject[i].IsMandatory = true;
                        if (contextObj.itemSource.length > 0)
                            contextObj.dynamicfieldObject[i].FieldValue = contextObj.itemSource[0]["Maxlogins"];
                        else
                            contextObj.dynamicfieldObject[i].FieldValue = "0";
                    }
                }
            });
        }
    };
    UserLicencingSetupComponent.prototype.loadSource = function (contextObj) {
        var itemSrc = contextObj.itemSource;
        if (contextObj.fieldObject && contextObj.itemSource) {
            for (var j = 0; j < contextObj.fieldObject.length; j++) {
                if (j > 0)
                    contextObj.fieldObject[j].Width = "250";
                contextObj.fieldObject[j].IsHiddenLabel = true;
                if (contextObj.fieldObject[j].ReportFieldId == 439)
                    contextObj.fieldObject[j].ReadOnlyMode = true;
            }
            var fieldarr = contextObj.fieldObject;
            for (var i = 0; i < itemSrc.length; i++) {
                fieldarr = JSON.parse(JSON.stringify(fieldarr));
                fieldarr[0].FieldValue = itemSrc[i]["UserRoleId"];
                fieldarr[1].FieldValue = itemSrc[i]["User Role"];
                fieldarr[2].FieldValue = itemSrc[i]["Max. Users"];
                fieldarr[3].FieldValue = itemSrc[i]["Max. Logins"];
                contextObj.sourceFieldObj[i] = fieldarr;
            }
        }
    };
    UserLicencingSetupComponent.prototype.onChangeLicence = function (event) {
        this.licenceTypeId = event;
        this.loadUserLicenceSetupData(this);
    };
    UserLicencingSetupComponent.prototype.onChangeDevicetype = function (event) {
        this.deviceTypeId = event;
        this.loadUserLicenceSetupData(this);
    };
    UserLicencingSetupComponent.prototype.Update = function () {
        var context = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 8321, Value: this.licenceTypeId.toString() });
        reportfieldIdValues.push({ ReportFieldId: 6324, Value: this.deviceTypeId.toString() });
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() });
        var licenseSetupList = new Array();
        if (this.rowData["HasConcurrentCap"] == 1) {
            for (var i = 0; i < this.sourceFieldObj.length; i++) {
                if (parseInt(this.sourceFieldObj[i][2].FieldValue) > 0 && parseInt(this.sourceFieldObj[i][3].FieldValue) == 0) {
                    context.notificationService.ShowToaster("Enter a value between 0 and 9999 for Max.Logins", 2);
                    return;
                }
                else if (parseInt(this.sourceFieldObj[i][3].FieldValue) > parseInt(this.sourceFieldObj[i][2].FieldValue)) {
                    context.notificationService.ShowToaster("Max. Logins should be less than or equal to Max. Users", 2);
                    return;
                }
                else {
                    licenseSetupList.push({
                        UserRole: this.itemSource[i]['UserRoleId'].toString(),
                        MaxUsers: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                        MaxLogins: this.sourceFieldObj[i][3].FieldValue == "" ? "0" : this.sourceFieldObj[i][3].FieldValue,
                        AliasName: this.sourceFieldObj[i][1].FieldValue
                    });
                }
            }
        }
        else {
            for (var i = 0; i < this.sourceFieldObj.length; i++) {
                licenseSetupList.push({
                    UserRole: this.itemSource[i]['UserRoleId'].toString(),
                    MaxUsers: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                    MaxLogins: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                    AliasName: this.sourceFieldObj[i][1].FieldValue
                });
            }
        }
        this.administrationService.postsubmitRolewiseUserLicenseSetupUrl(this.customerId, JSON.stringify(reportfieldIdValues), JSON.stringify(licenseSetupList)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("User Licensing Setup details updated", 3);
                context.submitSuccess.emit({ returnData: result.Data });
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2);
            }
        });
    };
    UserLicencingSetupComponent.prototype.onSubmitData = function (reportfields) {
        var context = this;
        var fldArray = [5212, 5213];
        var cnt = fldArray.length;
        var maxuser = 0;
        var maxlogin = 0;
        var maxlogObj;
        var reptFieldObj = JSON.parse(reportfields.fieldobject);
        reptFieldObj.find(function (item) {
            switch (item.ReportFieldId) {
                case 5212:
                    maxuser = item.Value;
                    cnt--;
                    break;
                case 5213:
                    maxlogin = item.Value;
                    maxlogObj = item;
                    cnt--;
                    break;
            }
            if (cnt == 0) {
                return true;
            }
            else {
                return false;
            }
        });
        if (this.rowData["HasConcurrentCap"] == 1) {
            if (Number(maxuser) > 0 && Number(maxlogin) == 0) {
                context.notificationService.ShowToaster("Enter a value between 0 and 9999 for Max.Logins", 2);
                return;
            }
            if (Number(maxlogin) > Number(maxuser)) {
                context.notificationService.ShowToaster("Max. Logins should be less than or equal to Max. Users", 2);
                return;
            }
        }
        else {
            maxlogObj.Value = maxuser;
        }
        this.administrationService.postsubmitUserLicenseSetupUrl(this.customerId, JSON.stringify(reptFieldObj)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("User Licensing Setup details updated", 3);
                context.submitSuccess.emit({ returnData: result.Data });
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2);
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserLicencingSetupComponent.prototype, "submitSuccess", void 0);
    UserLicencingSetupComponent = __decorate([
        core_1.Component({
            selector: 'user-licensing-setup',
            templateUrl: './app/Views/Administration/Customers/user-licensing-setup.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, labelcomponent_component_1.LabelComponent, stringtextbox_component_1.StringTextBoxComponent, grid_component_1.GridComponent, dropdownlistcomponent_component_1.DropDownListComponent, buttoncomponent_component_1.ButtonComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ["customerId", "rowData"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], UserLicencingSetupComponent);
    return UserLicencingSetupComponent;
}());
exports.UserLicencingSetupComponent = UserLicencingSetupComponent;
//# sourceMappingURL=user-licensing-setup.js.map