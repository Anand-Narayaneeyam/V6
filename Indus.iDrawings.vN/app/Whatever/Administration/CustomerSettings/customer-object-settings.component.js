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
var CustomerObjectSettingsComponent = (function () {
    function CustomerObjectSettingsComponent(_validateService, _notificationService, _objAdministrationService, notificationService) {
        var _this = this;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this._objAdministrationService = _objAdministrationService;
        this.notificationService = notificationService;
        this.dropdownfielddetails = [];
        this.btnName = "Save Changes";
        this.ObjectType = "Asset";
        this.ParentModuleId = 1;
        this.AutoNumberValue = "false";
        this.ConstantValue = "";
        this.Constsubscribed = "";
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    CustomerObjectSettingsComponent.prototype.ngOnInit = function () {
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
            contextObj._objAdministrationService.getAdminstnCustomerSettingsFormFieldsForObjects(contextObj.FormId, contextObj.ModuleId).subscribe(function (resultData) {
                contextObj.fieldDetails = resultData["Data"];
                contextObj._objAdministrationService.CheckAutoNumbering(contextObj.FormId, contextObj.ObjectCategoryId).subscribe(function (resultData) {
                    if (resultData["Message"] = "Success" && resultData["ServerId"] == 1) {
                        contextObj.RoomNoResult = true;
                    }
                    else {
                        contextObj.RoomNoResult = false;
                    }
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
                                contextObj._notificationService.ShowToaster("Enable As Builts Module", 5);
                                return true;
                            }
                        });
                    }
                    contextObj.LoadAllDetails();
                    length = contextObj.fieldDetails.length;
                    for (var i = 0; i < length; i++) {
                        if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                            if (contextObj.fieldDetails[i].DataEntryControlId != 5) {
                                contextObj.fieldDetails[i].IsHiddenLabel = true;
                                contextObj.SetDefaultValueForSubComponent(i + 1, 0);
                            }
                        }
                        if (contextObj.RoomNoResult == true && contextObj.fieldDetails[i]["FieldId"] == 2204) {
                            contextObj.fieldDetails[i].IsEnabled = false;
                            contextObj.AutoNumberValue = contextObj.fieldDetails[i].FieldValue;
                        }
                        if (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206) {
                            if (contextObj.ModuleSelect == true) {
                                contextObj.fieldDetails[i].FieldValue = "true";
                            }
                            contextObj.fieldDetails[i].IsEnabled = false;
                        }
                        if (contextObj.fieldDetails[i]["FieldId"] == 2207) {
                            if (contextObj.RoomNoResult == true) {
                                contextObj.fieldDetails[i].IsEnabled = false;
                                contextObj.Constsubscribed = contextObj.fieldDetails[i].FieldValue;
                                contextObj.ConstantValue = contextObj.fieldDetails[i + 1].FieldValue;
                                contextObj.fieldDetails[i + 1].IsEnabled = false;
                            }
                            else {
                                if (contextObj.ModuleSelect == true) {
                                    contextObj.fieldDetails[i].IsEnabled = true;
                                }
                            }
                        }
                    }
                });
            });
        });
    };
    CustomerObjectSettingsComponent.prototype.LoadAllDetails = function () {
        var contextObj = this;
        var length;
        length = contextObj.subscribeddetails.length;
        var _loop_1 = function(i) {
            contextObj.fieldDetails.find(function (item) {
                if (item.DataEntryControlId == 6) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        if (item.FieldId == 2204)
                            item.FieldLabel = "Enable Auto Numbering for " + contextObj.ObjectType + " Number";
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
                        //item.Width = "150";
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
            _loop_1(i);
        }
    };
    CustomerObjectSettingsComponent.prototype.SetDefaultValueForSubComponent = function (Position, FieldId) {
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
    CustomerObjectSettingsComponent.prototype.chkBoxChange = function (event) {
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
        var _loop_2 = function(i) {
            contextObj.fieldDetails.find(function (item) {
                if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"] && contextObj.subscribeddetails[i]["ParentFieldId"] == event["fieldId"]) {
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
                //else {
                //    if (item.DataEntryControlId == 6 && item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                //        contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                //    }
                //}
            });
        };
        for (var i = 0; i < length; i++) {
            _loop_2(i);
        }
        //event["fieldobject"]["FieldValue"] = event["IsChecked"];
    };
    CustomerObjectSettingsComponent.prototype.SelectAll = function (event) {
        var contextObj = this;
        contextObj.ModuleSelect = event.target.checked;
        var length = contextObj.fieldDetails.length;
        var _loop_3 = function(i) {
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
            if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                contextObj.SetDefaultValueForSubComponent((i + 1), 0);
            }
            setTimeout(function () {
                if (contextObj.ModuleSelect == true) {
                    if (contextObj.RoomNoResult && contextObj.fieldDetails[i]["FieldId"] == 2204) {
                        contextObj.fieldDetails[i].IsEnabled = false;
                        contextObj.fieldDetails[i].FieldValue = contextObj.AutoNumberValue;
                    }
                    if (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206) {
                        contextObj.fieldDetails[i].FieldValue = "true";
                        contextObj.fieldDetails[i].IsEnabled = false;
                    }
                    if (contextObj.fieldDetails[i]["FieldId"] == 2207) {
                        contextObj.fieldDetails[i].IsEnabled = !contextObj.RoomNoResult;
                        if (contextObj.RoomNoResult && contextObj.ConstantValue && contextObj.ConstantValue.length > 0) {
                            contextObj.fieldDetails[i].FieldValue = "true";
                            contextObj.fieldDetails[i + 1].FieldValue = contextObj.ConstantValue;
                            contextObj.fieldDetails[i + 1].IsEnabled = false;
                        }
                    }
                }
            }, 100);
        };
        for (var i = 0; i < length; i++) {
            _loop_3(i);
        }
    };
    CustomerObjectSettingsComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    CustomerObjectSettingsComponent.prototype.updateSubscribedFeature = function (event) {
        var contextObj = this;
        var FeatureDetails = "[";
        var length = contextObj.fieldDetails.length;
        var successflag = true;
        var _loop_4 = function(i) {
            if (contextObj.RoomNoResult && (contextObj.fieldDetails[i]["FieldId"] == 2204 || contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206 || contextObj.fieldDetails[i]["FieldId"] == 2207)) {
                if (contextObj.fieldDetails[i]["FieldId"] == 2204)
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": " + contextObj.AutoNumberValue + ", \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                else if (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206)
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                else if (contextObj.fieldDetails[i]["FieldId"] == 2207) {
                    constvalue = "";
                    if (contextObj.ConstantValue && contextObj.ConstantValue.length > 0) {
                        constvalue = contextObj.ConstantValue;
                    }
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": " + contextObj.Constsubscribed + ", \"FeatureLookupId\":\"" + LookupId + "\", \"DefaultValue\":\"" + constvalue + "\" },";
                }
            }
            else if ((contextObj.ModuleSelect == true) && (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206)) {
                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
            }
            else if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
                DefaultValue = "";
                LookupId = "";
                if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                    if (contextObj.fieldDetails[i + 1].DataEntryControlId == 1) {
                        DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                        if (contextObj.fieldDetails[i].FieldValue == "true") {
                            if (contextObj.fieldDetails[i + 1].FieldValue && contextObj.fieldDetails[i + 1].FieldValue.length) {
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
                        contextObj.fieldDetails[i + 1].LookupDetails["LookupValues"].find(function (item) {
                            if (item.Id == contextObj.fieldDetails[i + 1].FieldValue) {
                                DefaultValue = item.Value;
                                return true;
                            }
                        });
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
        };
        var constvalue, DefaultValue, LookupId, LookupValue;
        for (var i = 0; i < length; i++) {
            var state_4 = _loop_4(i);
            if (state_4 === "break") break;
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
    };
    CustomerObjectSettingsComponent.prototype.ChangeMargin = function (Fieldid) {
        var contextObj = this;
        var Margin;
        contextObj.subscribeddetails.find(function (item) {
            if (item["FieldId"] == Fieldid) {
                Margin = item["Level"] * 40;
                return true;
            }
        });
        return Margin;
    };
    CustomerObjectSettingsComponent.prototype.onChangeDataFieldCategory = function (event) {
        //this.notificationService.ShowToaster("dropdown changed has been updated", 3);
    };
    CustomerObjectSettingsComponent.prototype.rbtnChange = function (event) {
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
        var _loop_5 = function(i) {
            if (contextObj.subscribeddetails[i]["FieldId"] != event["fieldobject"]["FieldId"]) {
                contextObj.fieldDetails.find(function (item) {
                    if (contextObj.subscribeddetails[i]["ParentFieldId"] == Parent
                        && item.DataEntryControlId == 5
                        && item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        item.FieldValue = null;
                        return true;
                    }
                });
            }
        };
        for (var i = 0; i < length; i++) {
            _loop_5(i);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CustomerObjectSettingsComponent.prototype, "ModuleSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerObjectSettingsComponent.prototype, "FormId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerObjectSettingsComponent.prototype, "ModuleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CustomerObjectSettingsComponent.prototype, "Modulename", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CustomerObjectSettingsComponent.prototype, "Moduleenabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomerObjectSettingsComponent.prototype, "ObjectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CustomerObjectSettingsComponent.prototype, "ObjectType", void 0);
    CustomerObjectSettingsComponent = __decorate([
        core_1.Component({
            selector: 'customer-object-settings',
            templateUrl: 'app/Views/Administration/CustomerSettings/customer-object-settings.component.html',
            directives: [checkboxcomponent_component_1.CustomCheckBoxComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent, radiocomponent_component_1.CustomRadioComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, notify_service_1.NotificationService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], CustomerObjectSettingsComponent);
    return CustomerObjectSettingsComponent;
}());
exports.CustomerObjectSettingsComponent = CustomerObjectSettingsComponent;
//# sourceMappingURL=customer-object-settings.component.js.map