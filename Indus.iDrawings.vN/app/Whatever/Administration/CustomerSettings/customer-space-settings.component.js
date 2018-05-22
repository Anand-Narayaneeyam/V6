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
var stringtextbox_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var CustomerSpaceSettingsComponent = (function () {
    function CustomerSpaceSettingsComponent(_validateService, _notificationService, _objAdministrationService, notificationService) {
        var _this = this;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this._objAdministrationService = _objAdministrationService;
        this.notificationService = notificationService;
        this.dropdownfielddetails = [];
        this.btnName = "Save Changes";
        this.ModuleSelect = false;
        this.FormId = 396;
        this.ModuleId = 3;
        this.ParentModuleId = 1;
        this.Modulename = "Space";
        this.Moduleenabled = true;
        this.isSchedulingEnabled = false;
        this.IsSeatBooking = false;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    CustomerSpaceSettingsComponent.prototype.ngOnInit = function () {
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
                //contextObj.CheckUniqueRoomNo();
                contextObj.fieldDetails = resultData["Data"];
                contextObj._objAdministrationService.GetUniqueRoomNo(contextObj.FormId).subscribe(function (resultData) {
                    contextObj.RoomNoresult = JSON.parse(resultData["FieldBinderData"]);
                    contextObj._objAdministrationService.getSubscribedFeaturesWithFields(405, 14).subscribe(function (resultData) {
                        var SchedulingSubscribeddetails = JSON.parse(resultData["FieldBinderData"]);
                        contextObj.subscribeddetails.find(function (item) {
                            if (item["ModuleId"] == contextObj.ModuleId && item["Id"] == 0 && item["IsSubscribed"] == 1) {
                                contextObj.ModuleSelect = true;
                                return true;
                            }
                        });
                        contextObj.subscribeddetails.find(function (item) {
                            if (item["ModuleId"] == 14 && item["Id"] == 0 && item["IsSubscribed"] == 1) {
                                contextObj.isSchedulingEnabled = true;
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
                        if (contextObj.Moduleenabled == true) {
                            SchedulingSubscribeddetails.find(function (item) {
                                if (item["FieldId"] == 2237 && item["IsSubscribed"] == 1) {
                                    contextObj.IsSeatBooking = true;
                                    return true;
                                }
                            });
                        }
                        contextObj.LoadAllDetails();
                        length = contextObj.fieldDetails.length;
                        var _loop_1 = function(i) {
                            if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                                if (contextObj.fieldDetails[i].DataEntryControlId != 5) {
                                    contextObj.fieldDetails[i].IsHiddenLabel = true;
                                    contextObj.SetDefaultValueForSubComponent(i + 1, 0);
                                }
                            }
                            if (contextObj.fieldDetails[i]["FieldId"] == 2131) {
                                contextObj.fieldDetails[i].IsEnabled = false;
                            }
                            if (contextObj.fieldDetails[i]["FieldId"] == 2128 && contextObj.ModuleSelect) {
                                contextObj.fieldDetails.find(function (item) {
                                    if (item["FieldId"] == 2129) {
                                        if (contextObj.fieldDetails[i]["FieldValue"] == "2") {
                                            item.IsEnabled = false;
                                            return true;
                                        }
                                        else {
                                            item.IsEnabled = true;
                                            return true;
                                        }
                                    }
                                });
                            }
                            if ((contextObj.fieldDetails[i]["FieldId"] == 2160 || contextObj.fieldDetails[i]["FieldId"] == 2137) && contextObj.IsSeatBooking) {
                                contextObj.fieldDetails[i].IsEnabled = false;
                            }
                        };
                        for (var i = 0; i < length; i++) {
                            _loop_1(i);
                        }
                    });
                });
            });
        });
    };
    CustomerSpaceSettingsComponent.prototype.LoadAllDetails = function () {
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
            });
        };
        for (var i = 0; i < length; i++) {
            _loop_2(i);
        }
    };
    CustomerSpaceSettingsComponent.prototype.SetDefaultValueForSubComponent = function (Position, FieldId) {
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
    CustomerSpaceSettingsComponent.prototype.chkBoxChange = function (event) {
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
        if (event["IsChecked"] == false && event["fieldId"] == 2144 && contextObj.isSchedulingEnabled) {
            setTimeout(function () {
                contextObj.fieldDetails.find(function (item) {
                    if (item.FieldId == event["fieldId"]) {
                        item.FieldValue = "true";
                        return true;
                    }
                });
                contextObj._notificationService.ShowToaster("Room Number is mandatory for Scheduling Module, cannot be unchecked", 5);
            }, 100);
        }
        else {
            var _loop_3 = function(i) {
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
                _loop_3(i);
            }
        }
        //event["fieldobject"]["FieldValue"] = event["IsChecked"];
    };
    CustomerSpaceSettingsComponent.prototype.SelectAll = function (event) {
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
            if (event.target.checked == true) {
                if (contextObj.fieldDetails[i]["FieldId"] == 2129) {
                    contextObj.fieldDetails[i].IsEnabled = event.target.checked;
                }
                else if ((contextObj.fieldDetails[i]["FieldId"] == 2131) || ((contextObj.fieldDetails[i]["FieldId"] == 2160 || contextObj.fieldDetails[i]["FieldId"] == 2137) && contextObj.IsSeatBooking)) {
                    contextObj.chkBoxChange({
                        fieldobject: contextObj.fieldDetails[i],
                        IsChecked: event.target.checked,
                        fieldId: contextObj.fieldDetails[i]["FieldId"]
                    });
                    contextObj.fieldDetails[i].IsEnabled = false;
                    contextObj.fieldDetails[i].FieldValue = "true";
                }
                else if (contextObj.fieldDetails[i]["FieldId"] == 2144 && contextObj.isSchedulingEnabled) {
                    contextObj.fieldDetails[i].IsEnabled = true;
                    contextObj.fieldDetails[i].FieldValue = "true";
                }
                else {
                    contextObj.subscribeddetails.find(function (item) {
                        if (item["FieldId"] == contextObj.fieldDetails[i]["FieldId"] && item["Level"] == 2) {
                            contextObj.fieldDetails[i].IsEnabled = event.target.checked;
                            return true;
                        }
                    });
                }
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
        };
        for (var i = 0; i < length; i++) {
            _loop_4(i);
        }
        //if (event.target.checked == true) {
        //    contextObj.fieldDetails.find(function (item) {
        //        if (item["FieldId"] == 2131) {
        //            contextObj.chkBoxChange({
        //                fieldobject: item,
        //                IsChecked: true,
        //                fieldId: item.FieldId
        //            });
        //            item.IsEnabled = false;
        //            item.FieldValue = "true";
        //            return true;
        //        }
        //    });
        //}
    };
    CustomerSpaceSettingsComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    CustomerSpaceSettingsComponent.prototype.updateSubscribedFeature = function (event) {
        var contextObj = this;
        var FeatureDetails = "[";
        var length = contextObj.fieldDetails.length;
        var successflag = true;
        var _loop_5 = function(i) {
            if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
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
                        if (contextObj.fieldDetails[i]["FieldId"] == 2147) {
                            if (contextObj.fieldDetails[i]["FieldValue"] == "true") {
                                if (contextObj.fieldDetails[i + 1].FieldValue == "11" && contextObj.RoomNoresult[0]["BuildngUniqueRoomNo"] == 1) {
                                    successflag = false;
                                    contextObj._notificationService.ShowToaster("Unique to a Building cannot be enabled, since duplicate Room Numbers exist", 5);
                                    return "break";
                                }
                                else if (contextObj.fieldDetails[i + 1].FieldValue == "12" && contextObj.RoomNoresult[0]["FloorUniqueRoomNo"] == 1) {
                                    successflag = false;
                                    contextObj._notificationService.ShowToaster("Unique to a Floor cannot be enabled, since duplicate Room Numbers exist", 5);
                                    return "break";
                                }
                                else if (contextObj.fieldDetails[i + 1].FieldValue == "13" && contextObj.RoomNoresult[0]["SiteUniqueRoomNo"] == 1) {
                                    successflag = false;
                                    contextObj._notificationService.ShowToaster("Unique to a Site cannot be enabled, since duplicate Room Numbers exist", 5);
                                    return "break";
                                }
                                else if (contextObj.fieldDetails[i + 1].FieldValue == "14" && contextObj.RoomNoresult[0]["CustomerUniqueRoomNo"] == 1) {
                                    successflag = false;
                                    contextObj._notificationService.ShowToaster("Unique to a Customer cannot be enabled, since duplicate Room Numbers exist", 5);
                                    return "break";
                                }
                            }
                        }
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
    };
    CustomerSpaceSettingsComponent.prototype.ChangeMargin = function (Fieldid) {
        var contextObj = this;
        var Margin;
        contextObj.subscribeddetails.find(function (item) {
            if (item["FieldId"] == Fieldid) {
                Margin = item["Level"] * 40;
                return true;
            }
        });
        if (Fieldid == 2134 || Fieldid == 2135 || Fieldid == 2136) {
            Margin = Margin + 20;
        }
        return Margin;
    };
    CustomerSpaceSettingsComponent.prototype.onChangeDataFieldCategory = function (event, Fieldid) {
        var contextObj = this;
        if (Fieldid == 2128) {
            contextObj.fieldDetails.find(function (item) {
                if (item["FieldId"] == 2129) {
                    if (event.target.value == 2) {
                        item.IsEnabled = false;
                        item.FieldValue = "true";
                        return true;
                    }
                    else {
                        item.IsEnabled = true;
                        item.FieldValue = "false";
                        return true;
                    }
                }
            });
        }
    };
    CustomerSpaceSettingsComponent = __decorate([
        core_1.Component({
            selector: 'customer-space-settings',
            templateUrl: 'app/Views/Administration/CustomerSettings/customer-space-settings.component.html',
            directives: [checkboxcomponent_component_1.CustomCheckBoxComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent, radiocomponent_component_1.CustomRadioComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, notify_service_1.NotificationService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], CustomerSpaceSettingsComponent);
    return CustomerSpaceSettingsComponent;
}());
exports.CustomerSpaceSettingsComponent = CustomerSpaceSettingsComponent;
//# sourceMappingURL=customer-space-settings.component.js.map