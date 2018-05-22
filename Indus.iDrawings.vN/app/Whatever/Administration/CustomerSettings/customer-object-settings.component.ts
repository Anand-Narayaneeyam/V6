import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IField} from '../../../Framework/Models//Interface/IField'
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import {StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'customer-object-settings',
    templateUrl: 'app/Views/Administration/CustomerSettings/customer-object-settings.component.html',
    directives: [CustomCheckBoxComponent, FieldComponent, DropDownListComponent, StringTextBoxComponent, CustomRadioComponent],
    providers: [AdministrationService, NotificationService, ValidateService]
})
export class CustomerObjectSettingsComponent implements OnInit {
    public fieldDetails: IField[];
    public dropdownfielddetails: IField[] = [];
    btnName: string = "Save Changes";
    @Input() ModuleSelect: Boolean;
    @Input() FormId: Number;
    @Input() ModuleId: Number;    
    @Input() Modulename: String;
    @Input() Moduleenabled: Boolean;
    @Input() ObjectCategoryId: Number;
    @Input() ObjectType: String ="Asset";
    ParentModuleId: Number = 1;
    RoomNoResult: Boolean;
    subscribeddetails: any;
    public validationData;
    AutoNumberValue: string = "false";
    ConstantValue: string = "";
    Constsubscribed: string = "";
    constructor(private _validateService: ValidateService, private _notificationService: NotificationService, private _objAdministrationService: AdministrationService, private notificationService: NotificationService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }
    ngOnInit() {        
        var contextObj = this;
        var Level: Number;
        if (contextObj.ModuleSelect.toString() == "false") {
            contextObj.ModuleSelect = false;
        } else {
            contextObj.ModuleSelect = true;
        }
        if (contextObj.Moduleenabled.toString() == "false") {
            contextObj.Moduleenabled = false;
        } else {
            contextObj.Moduleenabled = true;
        }

        contextObj._objAdministrationService.getSubscribedFeaturesWithFields(contextObj.FormId, contextObj.ModuleId).subscribe(function (resultData) {
            contextObj.subscribeddetails = JSON.parse(resultData["FieldBinderData"]);
            contextObj._objAdministrationService.getAdminstnCustomerSettingsFormFieldsForObjects(contextObj.FormId, contextObj.ModuleId).subscribe(function (resultData) {
                contextObj.fieldDetails = resultData["Data"];
                contextObj._objAdministrationService.CheckAutoNumbering(contextObj.FormId, contextObj.ObjectCategoryId).subscribe(function (resultData) {
                    if (resultData["Message"] = "Success" && resultData["ServerId"] == 1) {
                        contextObj.RoomNoResult = true;
                    } else {
                        contextObj.RoomNoResult = false;
                    }
                    contextObj.subscribeddetails.find(function (item) {
                        if (item["ModuleId"] == contextObj.ModuleId && item["Id"] == 0 && item["IsSubscribed"] == 1) {
                            contextObj.ModuleSelect = true;
                            return true
                        }
                    });

                    if (contextObj.ParentModuleId) {
                        contextObj.subscribeddetails.find(function (item) {
                            if (item["ModuleId"] == contextObj.ParentModuleId && item["Id"] == 0 && item["IsSubscribed"] == 0) {
                                contextObj.ModuleSelect = false;
                                contextObj.Moduleenabled = false;
                                contextObj._notificationService.ShowToaster("Enable As Builts Module", 5);
                                return true
                            }
                        });
                    }

                    contextObj.LoadAllDetails();
                    length = contextObj.fieldDetails.length;
                    for (let i = 0; i < length; i++) {
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
                            } else {
                                if (contextObj.ModuleSelect == true) {
                                    contextObj.fieldDetails[i].IsEnabled = true;
                                }
                            }
                        }
                    }
                });
            });
        });
    }

    LoadAllDetails() {
        var contextObj = this;
        var length: Number;
        length = contextObj.subscribeddetails.length;

        for (let i = 0; i < length; i++) {
            contextObj.fieldDetails.find(function (item) {
                if (item.DataEntryControlId == 6) {
                    if (item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        if (item.FieldId == 2204)
                            item.FieldLabel = "Enable Auto Numbering for " + contextObj.ObjectType + " Number"
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2
                            )) {
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
                                || contextObj.subscribeddetails[i]["Level"] == 2
                            )) {
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
                                || contextObj.subscribeddetails[i]["Level"] == 2
                            )) {
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
                        item["LookupDetails"]["LookupValues"] = [{ Id: 0, IsDisabled: null, Value: item["FieldLabel"] }]
                        item["FieldLabel"] = null;
                        if (contextObj.subscribeddetails[i]["ChangeSetting"] == "Yes" && contextObj.ModuleSelect == true
                            && (contextObj.subscribeddetails[i]["ParentSubscribed"] == true
                                || contextObj.subscribeddetails[i]["Level"] == 2
                            )) {
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
        }
    }

    SetDefaultValueForSubComponent(Position: any, FieldId: any) {        
        var contextObj: any = this;
        var isvalidate: Boolean = true;
        if (Position == -1) {
            isvalidate = false;
            Position = contextObj.fieldDetails.findIndex(c => c["FieldId"] == FieldId) + 1;
        }
        if (contextObj.fieldDetails[Position - 1] && !contextObj.fieldDetails[Position - 1].FieldLabel) { 
            if (contextObj.fieldDetails[Position].DataEntryControlId == 4) {
                contextObj.fieldDetails[Position]["FieldValue"] = contextObj.fieldDetails[Position].LookupDetails["LookupValues"][0].Id.toString();
            } else if (contextObj.fieldDetails[Position].DataEntryControlId == 1) {
                contextObj.fieldDetails[Position].FieldValue = "";
            }

            if (contextObj.fieldDetails[Position - 1]["FieldValue"] == "false") {
                contextObj.fieldDetails[Position].IsEnabled = false;
                contextObj.fieldDetails[Position].IsMandatory = false;
                contextObj.fieldDetails[Position].HasValidationError = false;
            } else {
                contextObj.fieldDetails[Position].IsEnabled = true;
                contextObj.fieldDetails[Position].IsMandatory = true;
                if (isvalidate) {
                    if (contextObj.fieldDetails[Position].DataEntryControlId == 1) {
                        contextObj.subscribeddetails.find(function (item) {
                            if (contextObj.fieldDetails[Position - 1]["FieldId"] == item["FieldId"]) {
                                contextObj.fieldDetails[Position]["FieldValue"] = item["SubscribedFeatureValue"];
                                return true
                            }
                        });
                    } else {
                        if (contextObj.fieldDetails[Position].DataEntryControlId == 4) {
                            contextObj.subscribeddetails.find(function (item) {
                                if (contextObj.fieldDetails[Position - 1]["FieldId"] == item["FieldId"]) {
                                    if (item["FeatureLookupId"]) {
                                        contextObj.fieldDetails[Position]["FieldValue"] = item["FeatureLookupId"];
                                    }
                                    return true
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
    }

    chkBoxChange(event: any) {        
        var contextObj: any = this;
        var length: Number;
        length = contextObj.subscribeddetails.length;
        contextObj.fieldDetails.find(function (item) {
            if (item.FieldId == event["fieldId"]) {
                item.FieldValue = event["IsChecked"].toString();
                if (!item.FieldLabel)
                contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                return true
            }
        });
        for (let i = 0; i < length; i++) {
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
                        } else if (item.DataEntryControlId == 1) {
                            item.FieldValue = "";
                            item.IsMandatory = event["IsChecked"];
                            item.HasValidationError = event["IsChecked"];
                        }
                    } else if (item.DataEntryControlId == 1) {
                        item.FieldValue = "";
                        item.IsLocallyValidated = !event["IsChecked"];
                        item.IsMandatory = event["IsChecked"];
                        document.getElementById(item.FieldId.toString()).focus();
                        setTimeout(function () {
                            document.getElementById(item.FieldId.toString()).blur();
                        }, 100);
                    }
                    return true
                }
                //else {
                //    if (item.DataEntryControlId == 6 && item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                //        contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                //    }
                //}
            });
        }

        //event["fieldobject"]["FieldValue"] = event["IsChecked"];
    }

    SelectAll(event: any) {
        var contextObj = this;
        contextObj.ModuleSelect = event.target.checked;
        var length: number = contextObj.fieldDetails.length;
        for (let i = 0; i < length; i++) {
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
                        return true
                    }
                });
            }
            else {
                contextObj.subscribeddetails.find(function (item) {
                    if (item["FieldId"] == contextObj.fieldDetails[i]["FieldId"]) {
                        contextObj.fieldDetails[i].IsEnabled = event.target.checked;
                        return true
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
        }

    }

    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }
    updateSubscribedFeature(event: any) {        
        var contextObj: any = this;
        var FeatureDetails: any = "[";
        var length: number = contextObj.fieldDetails.length;
        var successflag: Boolean = true;
        for (let i = 0; i < length; i++) {
            if (contextObj.RoomNoResult && (contextObj.fieldDetails[i]["FieldId"] == 2204 || contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206 || contextObj.fieldDetails[i]["FieldId"] == 2207))
            {

                if (contextObj.fieldDetails[i]["FieldId"] == 2204)
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": " + contextObj.AutoNumberValue + ", \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                else if (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206)
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                else if (contextObj.fieldDetails[i]["FieldId"] == 2207)
                {
                    var constvalue: string = "";
                    if (contextObj.ConstantValue && contextObj.ConstantValue.length > 0) {
                        constvalue = contextObj.ConstantValue;
                    }
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": " + contextObj.Constsubscribed + ", \"FeatureLookupId\":\"" + LookupId + "\", \"DefaultValue\":\"" + constvalue + "\" },";
                }
            }
            else if ((contextObj.ModuleSelect == true) && (contextObj.fieldDetails[i]["FieldId"] == 2205 || contextObj.fieldDetails[i]["FieldId"] == 2206))
            {
                FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
            }
            else if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
                var DefaultValue: string = "";
                var LookupId: string = "";
                if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                    if (contextObj.fieldDetails[i + 1].DataEntryControlId == 1) {
                        DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                        if (contextObj.fieldDetails[i].FieldValue == "true") {
                            if (contextObj.fieldDetails[i + 1].FieldValue && contextObj.fieldDetails[i + 1].FieldValue.length) {
                                DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                            } else {
                                successflag = false;
                                break;
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
                    var LookupValue: string
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
                } else {
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                }

            }
        }
        FeatureDetails = FeatureDetails.slice(0, FeatureDetails.length - 1);
        FeatureDetails = FeatureDetails + "]";
        if (successflag) {
            this._objAdministrationService.UpdateCustomerSettings(contextObj.ModuleId, FeatureDetails, contextObj.ModuleSelect).subscribe(function (resultData) {
                if (resultData["ServerId"] > 0) {
                    contextObj._notificationService.ShowToaster("Customer Settings for " + contextObj.Modulename + " module updated. Changes will be reflected in the next login.", 3);
                    //contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
    }

    ChangeMargin(Fieldid: any) {
        var contextObj: any = this;
        var Margin: any;
        contextObj.subscribeddetails.find(function (item) {
            if (item["FieldId"] == Fieldid) {
                Margin = item["Level"] * 40;
                return true
            }
        });
        return Margin;
    }

    onChangeDataFieldCategory(event: any) {

        //this.notificationService.ShowToaster("dropdown changed has been updated", 3);
    }
    rbtnChange(event: any) {        
        var contextObj: any = this;
        var length: Number;
        length = contextObj.subscribeddetails.length;
        var Parent: any;
        contextObj.subscribeddetails.find(function (item) {
            if (item.FieldId == event["fieldobject"]["FieldId"]) {
                Parent = item["ParentFieldId"];
                return true
            }
        });

        for (let i = 0; i < length; i++) {
            if (contextObj.subscribeddetails[i]["FieldId"] != event["fieldobject"]["FieldId"]) {
                contextObj.fieldDetails.find(function (item) {
                    if (contextObj.subscribeddetails[i]["ParentFieldId"] == Parent
                        && item.DataEntryControlId == 5
                        && item.FieldId == contextObj.subscribeddetails[i]["FieldId"]) {
                        item.FieldValue = null;
                        return true
                    }
                });
            }
        }
    }

}

