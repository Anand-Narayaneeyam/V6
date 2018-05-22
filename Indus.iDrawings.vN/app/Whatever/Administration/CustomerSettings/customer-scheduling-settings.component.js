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
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var CustomerSchedulingSettingsComponent = (function () {
    function CustomerSchedulingSettingsComponent(_validateService, _notificationService, _objAdministrationService, notificationService) {
        var _this = this;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this._objAdministrationService = _objAdministrationService;
        this.notificationService = notificationService;
        this.dropdownfielddetails = [];
        this.btnName = "Save Changes";
        this.IsRoomenable = false;
        this.IsSeatEnable = false;
        this.IsSpacefunction = false;
        this.IsBaseTeam = false;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    CustomerSchedulingSettingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var Level;
        if (contextObj.ModuleSelect.toString() == "false") {
            contextObj.ModuleSelect = false;
        }
        else {
            contextObj.ModuleSelect = true;
        }
        if (contextObj.Moduleenabled.toString() == "false") {
            contextObj.Moduleenabled = false;
        }
        else {
            contextObj.Moduleenabled = true;
        }
        contextObj._objAdministrationService.getSubscribedFeaturesWithFields(contextObj.FormId, contextObj.ModuleId).subscribe(function (resultData) {
            contextObj.subscribeddetails = JSON.parse(resultData["FieldBinderData"]);
            contextObj._objAdministrationService.getAdminstnCustomerSettingsFormFields(contextObj.FormId).subscribe(function (resultData) {
                contextObj.fieldDetails = resultData["Data"];
                contextObj._objAdministrationService.getCustomerSubscribedFeatures("36,203,5,277").subscribe(function (resultData) {
                    var OtherSubscribeddetails = resultData["Data"];
                    contextObj.subscribeddetails.find(function (item) {
                        if (item["ModuleId"] == contextObj.ModuleId && item["Id"] == 0 && item["IsSubscribed"] == 1) {
                            contextObj.ModuleSelect = true;
                            return true;
                        }
                    });
                    if (contextObj.ParentModuleId) {
                        contextObj.subscribeddetails.find(function (item) {
                            if (item["ModuleId"] == contextObj.ParentModuleId && item["Id"] == 0 && item["IsSubscribed"] == 0) {
                                contextObj.ModuleSelect = false;
                                contextObj.Moduleenabled = false;
                                contextObj._notificationService.ShowToaster("Enable Space Module", 5);
                                return true;
                            }
                        });
                    }
                    /*if (contextObj.Moduleenabled == true) {  featureId=36
                        SpaceSubscribeddetails.find(function (item) {
                            if (item["FieldId"] == 2144 && item["IsSubscribed"] == 1) {
                                contextObj.IsRoomenable = true;
                                return true;
                            }
                        });
                        SpaceSubscribeddetails.find(function (item) { featureId=203
                            if (item["FieldId"] == 2160 && item["IsSubscribed"] == 1) {
                                contextObj.IsSeatEnable = true;
                                return true;
                            }
                        });

                        SpaceSubscribeddetails.find(function (item) { featureId=5
                            if (item["FieldId"] == 2137 && item["IsSubscribed"] == 1) {
                                contextObj.IsSpacefunction = true;
                                return true;
                            }
                        });
                    }*/
                    if (contextObj.Moduleenabled == true) {
                        for (var i = 0; i < OtherSubscribeddetails.length; i++) {
                            if (OtherSubscribeddetails[i]["IsSubscribed"] == 1 || OtherSubscribeddetails[i]["IsSubscribed"] == true) {
                                switch (OtherSubscribeddetails[i]["Id"]) {
                                    case 36:
                                        contextObj.IsRoomenable = true;
                                        break;
                                    case 203:
                                        contextObj.IsSeatEnable = true;
                                        break;
                                    case 5:
                                        contextObj.IsSpacefunction = true;
                                        break;
                                    case 277:
                                        contextObj.IsBaseTeam = true;
                                        break;
                                }
                            }
                        }
                    }
                    contextObj.LoadAllDetails();
                    length = contextObj.fieldDetails.length;
                    var HideField = [2231, 2232, 2233, 2234, 2238, 2239, 2240, 2241, 2244, 2245, 2246, 2247]; //for hiding temporarily
                    var _loop_1 = function(i) {
                        if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                            if (contextObj.fieldDetails[i].DataEntryControlId != 5) {
                                contextObj.fieldDetails[i].IsHiddenLabel = true;
                                contextObj.SetDefaultValueForSubComponent(i + 1, 0);
                            }
                        }
                        HideField.find(function (item) {
                            if (contextObj.fieldDetails[i].FieldId == item) {
                                contextObj.fieldDetails[i].IsVisible = false;
                                return true;
                            }
                        });
                    };
                    for (var i = 0; i < length; i++) {
                        _loop_1(i);
                    }
                });
            });
        });
    };
    CustomerSchedulingSettingsComponent.prototype.LoadAllDetails = function () {
        var contextObj = this;
        var length;
        length = contextObj.subscribeddetails.length;
        var _loop_2 = function(i) {
            contextObj.fieldDetails.find(function (item) {
                if (item.DataEntryControlId == 6) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2)) {
                            item.IsEnabled = true;
                        }
                        else {
                            item.IsEnabled = false;
                        }
                        if (contextObj.subscribeddetails[i]["IsSubscribed"] == 1) {
                            item.FieldValue = "true";
                        }
                        else {
                            item.FieldValue = "false";
                        }
                        return true;
                    }
                }
                else if (item.DataEntryControlId == 4) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        item.Height = 20;
                        /*item.Width = "150";*/
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2)) {
                            item.IsEnabled = true;
                        }
                        else {
                            item.IsEnabled = false;
                        }
                        if (contextObj.subscribeddetails[i]["IsSubscribed"] == 1 && contextObj.subscribeddetails[i]["FeatureLookupId"]) {
                            item.FieldValue = contextObj.subscribeddetails[i]["FeatureLookupId"];
                            return true;
                        }
                        else {
                            item.FieldValue = item.LookupDetails["LookupValues"][0].Id.toString();
                            return true;
                        }
                    }
                }
                else if (item.DataEntryControlId == 1) {
                    item.Height = 25;
                    item.Width = "200";
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2)) {
                            item.IsEnabled = true;
                        }
                        else {
                            item.IsEnabled = false;
                        }
                        if (contextObj.subscribeddetails[i]["IsSubscribed"] == 1 && contextObj.subscribeddetails[i]["SubscribedFeatureValue"]) {
                            item.FieldValue = contextObj.subscribeddetails[i]["SubscribedFeatureValue"];
                            return true;
                        }
                        else {
                            item.FieldValue = '';
                            return true;
                        }
                    }
                }
                else if (item.DataEntryControlId == 5) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        item["FieldValue"] = "0";
                        item["LookupDetails"]["LookupValues"] = [{ Id: 0, IsDisabled: null, Value: item["FieldLabel"] }];
                        item["FieldLabel"] = null;
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2)) {
                            item.IsEnabled = true;
                        }
                        else {
                            item.IsEnabled = false;
                        }
                        if (contextObj.subscribeddetails[i]["IsSubscribed"] == 1) {
                            item["FieldValue"] = "0";
                        }
                        else {
                            item["FieldValue"] = null;
                        }
                        return true;
                    }
                }
            });
        };
        for (var i = 0; i < length; i++) {
            _loop_2(i);
        }
    };
    CustomerSchedulingSettingsComponent.prototype.SetDefaultValueForSubComponent = function (Position, FieldId) {
        var contextObj = this;
        var isvalidate = true;
        if (Position == -1) {
            isvalidate = false;
            Position = contextObj.fieldDetails.findIndex(function (c) { return c["FieldId"] == FieldId; }) + 1;
        }
        if (contextObj.fieldDetails[Position - 1] && !contextObj.fieldDetails[Position - 1].FieldLabel) {
            if (contextObj.fieldDetails[Position].DataEntryControlId == 4) {
                contextObj.fieldDetails[Position]["FieldValue"] = contextObj.fieldDetails[Position].LookupDetails["LookupValues"][0].Id.toString();
            }
            else if (contextObj.fieldDetails[Position].DataEntryControlId == 1) {
                contextObj.fieldDetails[Position].FieldValue = "";
            }
            if (contextObj.fieldDetails[Position - 1]["FieldValue"] == "false") {
                contextObj.fieldDetails[Position].IsEnabled = false;
                contextObj.fieldDetails[Position].IsMandatory = false;
                contextObj.fieldDetails[Position].HasValidationError = false;
            }
            else {
                contextObj.fieldDetails[Position].IsEnabled = true;
                contextObj.fieldDetails[Position].IsMandatory = true;
                if (isvalidate) {
                    if (contextObj.fieldDetails[Position].DataEntryControlId == 1) {
                        contextObj.subscribeddetails.find(function (item) {
                            if (contextObj.fieldDetails[Position - 1]["FieldId"] == item["FieldId"]) {
                                contextObj.fieldDetails[Position]["FieldValue"] = item["SubscribedFeatureValue"];
                                return true;
                            }
                        });
                    }
                    else {
                        if (contextObj.fieldDetails[Position].DataEntryControlId == 4) {
                            contextObj.subscribeddetails.find(function (item) {
                                if (contextObj.fieldDetails[Position - 1]["FieldId"] == item["FieldId"]) {
                                    if (item["FeatureLookupId"]) {
                                        contextObj.fieldDetails[Position]["FieldValue"] = item["FeatureLookupId"];
                                    }
                                    return true;
                                }
                            });
                        }
                    }
                }
                else if (contextObj.fieldDetails[Position].DataEntryControlId == 1) {
                    contextObj.fieldDetails[Position].IsLocallyValidated = isvalidate;
                }
            }
        }
    };
    CustomerSchedulingSettingsComponent.prototype.chkBoxChange = function (event) {
        var contextObj = this;
        var length;
        length = contextObj.subscribeddetails.length;
        contextObj.fieldDetails.find(function (item) {
            if (item.FieldId == event["fieldId"]) {
                item.FieldValue = event["IsChecked"].toString();
                if (!item.FieldLabel)
                    contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                return true;
            }
        });
        if (event["IsChecked"] == true && event["fieldId"] == 2230 && (!contextObj.IsRoomenable || !contextObj.IsSpacefunction)) {
            if (!contextObj.IsRoomenable) {
                setTimeout(function () {
                    contextObj.fieldDetails.find(function (item) {
                        if (item.FieldId == event["fieldId"]) {
                            item.FieldValue = "false";
                            return true;
                        }
                    });
                    contextObj._notificationService.ShowToaster("Enable Room number in Space Module", 5);
                }, 100);
            }
            else if (!contextObj.IsSpacefunction) {
                setTimeout(function () {
                    contextObj.fieldDetails.find(function (item) {
                        if (item.FieldId == event["fieldId"]) {
                            item.FieldValue = "false";
                            return true;
                        }
                    });
                    contextObj._notificationService.ShowToaster("Enable Space Function", 5);
                }, 100);
            }
        }
        else {
            if (event["IsChecked"] == true && event["fieldId"] == 2237 && (!contextObj.IsSeatEnable || !contextObj.IsSpacefunction)) {
                if (!contextObj.IsSeatEnable) {
                    setTimeout(function () {
                        contextObj.fieldDetails.find(function (item) {
                            if (item.FieldId == event["fieldId"]) {
                                item.FieldValue = "false";
                                return true;
                            }
                        });
                        contextObj._notificationService.ShowToaster("Define Seats in Space Module", 5);
                    }, 100);
                }
                else if (!contextObj.IsSpacefunction) {
                    setTimeout(function () {
                        contextObj.fieldDetails.find(function (item) {
                            if (item.FieldId == event["fieldId"]) {
                                item.FieldValue = "false";
                                return true;
                            }
                        });
                        contextObj._notificationService.ShowToaster("Enable Space Function", 5);
                    }, 100);
                }
            }
            else if (!contextObj.IsBaseTeam && event["IsChecked"] == true && event["fieldId"] == 2730) {
                setTimeout(function () {
                    contextObj.fieldDetails.find(function (item) {
                        if (item.FieldId == event["fieldId"]) {
                            item.FieldValue = "false";
                            return true;
                        }
                    });
                    contextObj._notificationService.ShowToaster("Enable Base Team in Administration Module", 5);
                }, 100);
            }
            else {
                var _loop_3 = function(i) {
                    contextObj.fieldDetails.find(function (item) {
                        if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                            if ((item.FieldId == 2234 || item.FieldId == 2241) && event["fieldId"] != 2234 && event["fieldId"] != 2241) {
                                item.IsEnabled = false;
                                item.FieldValue = "false";
                            }
                            else if (event["fieldId"] == 2230 && item.FieldId == 2231 && event["IsChecked"] == true) {
                                setTimeout(function () {
                                    item.IsEnabled = true;
                                    item.FieldValue = "0";
                                }, 100);
                            }
                            else if (event["fieldId"] == 2237 && item.FieldId == 2238 && event["IsChecked"] == true) {
                                setTimeout(function () {
                                    item.IsEnabled = true;
                                    item.FieldValue = "0";
                                }, 100);
                            }
                            else if (contextObj.subscribeddetails[i]["ParentFieldId"] == event["fieldId"]) {
                                item.IsEnabled = event["IsChecked"];
                                if (event["IsChecked"] == false) {
                                    if (item.DataEntryControlId == 6) {
                                        item.FieldValue = "false";
                                        contextObj.chkBoxChange({
                                            fieldobject: item,
                                            IsChecked: event["IsChecked"],
                                            fieldId: item.FieldId
                                        });
                                    }
                                    else if (item.DataEntryControlId == 4) {
                                        item.FieldValue = item.LookupDetails["LookupValues"][0].Id.toString();
                                    }
                                    else if (item.DataEntryControlId == 5) {
                                        item.FieldValue = null;
                                    }
                                    else if (item.DataEntryControlId == 1) {
                                        item.FieldValue = "";
                                        item.IsMandatory = event["IsChecked"];
                                        item.HasValidationError = event["IsChecked"];
                                    }
                                }
                                else if (item.DataEntryControlId == 1) {
                                    item.FieldValue = "";
                                    item.IsLocallyValidated = !event["IsChecked"];
                                    item.IsMandatory = event["IsChecked"];
                                    document.getElementById(item.FieldId.toString()).focus();
                                    setTimeout(function () {
                                        document.getElementById(item.FieldId.toString()).blur();
                                    }, 100);
                                }
                                return true;
                            }
                        }
                        /*else {
                            if (item.DataEntryControlId == 6 && item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                                contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                            }
                        }*/
                    });
                };
                for (var i = 0; i < length; i++) {
                    _loop_3(i);
                }
            }
        }
        /*event["fieldobject"]["FieldValue"] = event["IsChecked"];*/
    };
    CustomerSchedulingSettingsComponent.prototype.SelectAll = function (event) {
        var contextObj = this;
        contextObj.ModuleSelect = event.target.checked;
        var length = contextObj.fieldDetails.length;
        var _loop_4 = function(i) {
            if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
                if (event.target.checked == false) {
                    contextObj.fieldDetails[i].FieldValue = event.target.checked.toString();
                }
            }
            else if (contextObj.fieldDetails[i].DataEntryControlId == 4) {
                if (event.target.checked == false) {
                    contextObj.fieldDetails[i].FieldValue = contextObj.fieldDetails[i].LookupDetails["LookupValues"][0].Id.toString();
                }
            }
            else if (contextObj.fieldDetails[i].DataEntryControlId == 5) {
                if (event.target.checked == false) {
                    contextObj.fieldDetails[i].FieldValue = null;
                }
            }
            if (event.target.checked == true) {
                contextObj.subscribeddetails.find(function (item) {
                    if (item["FieldId"] == contextObj.fieldDetails[i]["FieldId"] && item["Level"] == 2) {
                        contextObj.fieldDetails[i].IsEnabled = event.target.checked;
                        return true;
                    }
                });
            }
            else {
                contextObj.subscribeddetails.find(function (item) {
                    if (item["FieldId"] == contextObj.fieldDetails[i]["FieldId"]) {
                        contextObj.fieldDetails[i].IsEnabled = event.target.checked;
                        return true;
                    }
                });
            }
            if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel && contextObj.fieldDetails[i].DataEntryControlId != 5) {
                contextObj.SetDefaultValueForSubComponent((i + 1), 0);
            }
        };
        for (var i = 0; i < length; i++) {
            _loop_4(i);
        }
    };
    CustomerSchedulingSettingsComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    CustomerSchedulingSettingsComponent.prototype.updateSubscribedFeature = function (event) {
        var contextObj = this;
        var FeatureDetails = "[";
        var length = contextObj.fieldDetails.length;
        var successflag = true;
        var count = 0;
        if (contextObj.ModuleSelect) {
            successflag = false;
            contextObj.fieldDetails.find(function (item) {
                if ((item["FieldId"] == 2230 || item["FieldId"] == 2237) && (item.FieldValue == "true" || item.FieldValue == "1")) {
                    successflag = true;
                    return true;
                }
                else
                    return false;
            });
        }
        if (successflag) {
            var _loop_5 = function(i) {
                if (!contextObj.fieldDetails[i].HasValidationError) {
                    if (contextObj.fieldDetails[i].IsVisible) {
                        if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
                            DefaultValue = "";
                            LookupId = "";
                            if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                                if (contextObj.fieldDetails[i + 1].DataEntryControlId == 1) {
                                    DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                                    if (contextObj.fieldDetails[i].FieldValue == "true") {
                                        if (contextObj.fieldDetails[i + 1].FieldValue && contextObj.fieldDetails[i + 1].FieldValue.length && !contextObj.fieldDetails[i].HasValidationError) {
                                            DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                                        }
                                        else {
                                            successflag = false;
                                            return "break";
                                        }
                                    }
                                }
                                else if (contextObj.fieldDetails[i + 1].DataEntryControlId == 4) {
                                    LookupId = contextObj.fieldDetails[i + 1].FieldValue;
                                    if (!contextObj.fieldDetails[i].HasValidationError) {
                                        contextObj.fieldDetails[i + 1].LookupDetails["LookupValues"].find(function (item) {
                                            if (item.Id == contextObj.fieldDetails[i + 1].FieldValue) {
                                                DefaultValue = item.Value;
                                                return true;
                                            }
                                        });
                                    }
                                    else {
                                        successflag = false;
                                        return "break";
                                    }
                                }
                            }
                            FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": " + contextObj.fieldDetails[i].FieldValue + ", \"FeatureLookupId\":\"" + LookupId + "\", \"DefaultValue\":\"" + DefaultValue + "\" },";
                        }
                        else if (contextObj.fieldDetails[i].DataEntryControlId == 4) {
                            if (contextObj.ModuleSelect == false) {
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": false, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                            }
                            else {
                                contextObj.fieldDetails[i].LookupDetails["LookupValues"].find(function (item) {
                                    if (item.Id == contextObj.fieldDetails[i].FieldValue) {
                                        LookupValue = item.Value;
                                        return true;
                                    }
                                });
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"" + contextObj.fieldDetails[i].FieldValue + "\", \"DefaultValue\":\"" + LookupValue + "\" },";
                            }
                        }
                        else if (contextObj.fieldDetails[i].DataEntryControlId == 1) {
                            if (contextObj.ModuleSelect == false) {
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": false, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                            }
                            else {
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"" + contextObj.fieldDetails[i].FieldValue + "\" },";
                            }
                        }
                        else if (contextObj.fieldDetails[i].DataEntryControlId == 5) {
                            if (contextObj.ModuleSelect == false || !contextObj.fieldDetails[i].FieldValue) {
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": false, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                            }
                            else {
                                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                            }
                        }
                    }
                }
                else {
                    successflag = false;
                    return "break";
                }
            };
            var DefaultValue, LookupId, LookupValue;
            for (var i = 0; i < length; i++) {
                var state_5 = _loop_5(i);
                if (state_5 === "break") break;
            }
            FeatureDetails = FeatureDetails.slice(0, FeatureDetails.length - 1);
            FeatureDetails = FeatureDetails + "]";
            if (successflag) {
                this._objAdministrationService.UpdateCustomerSettings(contextObj.ModuleId, FeatureDetails, contextObj.ModuleSelect).subscribe(function (resultData) {
                    if (resultData["ServerId"] > 0) {
                        contextObj._notificationService.ShowToaster("Customer Settings for " + contextObj.Modulename + " module updated. Changes will be reflected in the next login.", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
                });
            }
        }
        else
            contextObj._notificationService.ShowToaster("Team Room or Workspace Booking is mandatory for Scheduling Module.", 5);
    };
    CustomerSchedulingSettingsComponent.prototype.ChangeMargin = function (Fieldid) {
        var contextObj = this;
        var Margin;
        contextObj.subscribeddetails.find(function (item) {
            if (item["FieldId"] == Fieldid) {
                Margin = item["Level"] * 40;
                return true;
            }
        });
        if (Fieldid == 2231 || Fieldid == 2232 || Fieldid == 2233 || Fieldid == 2234
            || Fieldid == 2238 || Fieldid == 2239 || Fieldid == 2240 || Fieldid == 2241) {
            Margin = Margin + 40;
        }
        return Margin;
    };
    CustomerSchedulingSettingsComponent.prototype.onChangeDataFieldCategory = function (event) {
        //this.notificationService.ShowToaster("dropdown changed has been updated", 3);
    };
    CustomerSchedulingSettingsComponent.prototype.rbtnChange = function (event) {
        var contextObj = this;
        var length;
        length = contextObj.subscribeddetails.length;
        var Parent;
        contextObj.subscribeddetails.find(function (item) {
            if (item.FieldId == event["fieldobject"]["FieldId"]) {
                Parent = item["ParentFieldId"];
                return true;
            }
        });
        var _loop_6 = function(i) {
            if (contextObj.subscribeddetails[i]["FieldId"] != event["fieldobject"]["FieldId"]) {
                contextObj.fieldDetails.find(function (item) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        if (contextObj.subscribeddetails[i]["ParentFieldId"] == Parent
                            && item.DataEntryControlId == 5) {
                            item.FieldValue = null;
                            return true;
                        }
                        else if (item.FieldId == 2234) {
                            if (event["fieldobject"]["FieldId"] == 2233 || event["fieldobject"]["FieldId"] == 2232) {
                                if (event["fieldobject"]["FieldValue"]) {
                                    item.IsEnabled = true;
                                }
                                else if (event["fieldobject"]["FieldId"] == 2231) {
                                    item.IsEnabled = false;
                                }
                            }
                            else {
                                item.IsEnabled = false;
                            }
                            return true;
                        }
                        else if (item.FieldId == 2241) {
                            if (event["fieldobject"]["FieldId"] == 2240 || event["fieldobject"]["FieldId"] == 2239) {
                                if (event["fieldobject"]["FieldValue"]) {
                                    item.IsEnabled = true;
                                }
                                else if (event["fieldobject"]["FieldId"] == 2238) {
                                    item.IsEnabled = false;
                                }
                            }
                            else {
                                item.IsEnabled = false;
                            }
                            return true;
                        }
                    }
                });
            }
        };
        for (var i = 0; i < length; i++) {
            _loop_6(i);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CustomerSchedulingSettingsComponent.prototype, "ModuleSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerSchedulingSettingsComponent.prototype, "FormId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerSchedulingSettingsComponent.prototype, "ModuleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerSchedulingSettingsComponent.prototype, "ParentModuleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CustomerSchedulingSettingsComponent.prototype, "Modulename", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CustomerSchedulingSettingsComponent.prototype, "Moduleenabled", void 0);
    CustomerSchedulingSettingsComponent = __decorate([
        core_1.Component({
            selector: 'customer-scheduling-settings',
            templateUrl: 'app/Views/Administration/CustomerSettings/customer-scheduling-settings.component.html',
            directives: [checkboxcomponent_component_1.CustomCheckBoxComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent, radiocomponent_component_1.CustomRadioComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, notify_service_1.NotificationService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], CustomerSchedulingSettingsComponent);
    return CustomerSchedulingSettingsComponent;
}());
exports.CustomerSchedulingSettingsComponent = CustomerSchedulingSettingsComponent;
//# sourceMappingURL=customer-scheduling-settings.component.js.map