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
    selector: 'customer-workorder-settings',
    templateUrl: 'app/Views/Administration/CustomerSettings/customer-workorder-settings.component.html',
    directives: [CustomCheckBoxComponent, FieldComponent, DropDownListComponent, StringTextBoxComponent, CustomRadioComponent],
    providers: [AdministrationService, NotificationService, ValidateService]

})
export class CustomerWorkorderSettingsComponent implements OnInit {
    public fieldDetails: IField[];
    public dropdownfielddetails: IField[] = [];
    btnName: string = "Save Changes";
    @Input() ModuleSelect: Boolean;
    @Input() FormId: Number;
    @Input() ModuleId: Number;
    @Input() ParentModuleId: Number;
    @Input() Modulename: String;
    @Input() Moduleenabled: Boolean;
    subscribeddetails: any;
    IsSiteAminRole: boolean = false;
    WorkorderCount: Number;
    public validationData;
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
            contextObj._objAdministrationService.getAdminstnCustomerSettingsFormFields(contextObj.FormId).subscribe(function (resultData) {
                contextObj.fieldDetails = resultData["Data"];
                contextObj._objAdministrationService.GetWorkorderCount().subscribe(function (workordercountData) {
                    contextObj.WorkorderCount = workordercountData;
                    contextObj._objAdministrationService.getCustomerSubscribedFeatures("189").subscribe(function (resultData) {
                        var OtherSubscribeddetails: any = resultData["Data"];
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
                            contextObj._notificationService.ShowToaster("Enable " + item["Name"] + " Module", 5);
                            return true
                        }
                    });
                }

                if (contextObj.Moduleenabled == true) {
                    for (let i = 0; i < OtherSubscribeddetails.length; i++) {
                        if (OtherSubscribeddetails[i]["IsSubscribed"] == 1 || OtherSubscribeddetails[i]["IsSubscribed"] == true) {
                            switch (OtherSubscribeddetails[i]["Id"]) {
                                case 189:
                                    contextObj.IsSiteAminRole = true;
                                    break;                                
                            }
                        }
                    }
                }

                contextObj.LoadAllDetails();                
                length = contextObj.fieldDetails.length;
                for (let i = 0; i < length; i++) {
                    if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                        if (contextObj.fieldDetails[i].DataEntryControlId != 5) {
                            contextObj.fieldDetails[i].IsHiddenLabel = true;
                            //contextObj.SetDefaultValueForSubComponent(i, contextObj.fieldDetails[i]["FieldId"]);
                            contextObj.SetDefaultValueForSubComponent(i+1,0); //Label Changed
                        }
                        //if (contextObj.fieldDetails[i].DataEntryControlId == 4) {  //Label Changed
                        //    contextObj.fieldDetails[i].Height = 20;
                        //} else if (contextObj.fieldDetails[i].DataEntryControlId == 1) {
                        //    contextObj.fieldDetails[i].Height = 25;
                        //    contextObj.fieldDetails[i].Width = "200";
                        //}
                    }
                }
                });
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
                            item.FieldValue = "false"
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
        //if (contextObj.fieldDetails[Position] && !contextObj.fieldDetails[Position].FieldLabel) { 
        if (contextObj.fieldDetails[Position-1] && !contextObj.fieldDetails[Position-1].FieldLabel) { //Label Changed
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
                else if (contextObj.fieldDetails[Position].DataEntryControlId == 1)
                {
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
                if (!item.FieldLabel) // Label Changed
                contextObj.SetDefaultValueForSubComponent(-1, item.FieldId);
                return true
            }
        });

        if (!contextObj.IsSiteAminRole && event["IsChecked"] == true && event["fieldId"] == 2752) {
            setTimeout(function () {
                contextObj.fieldDetails.find(function (item) {
                    if (item.FieldId == event["fieldId"]) {
                        item.FieldValue = "false";
                        return true
                    }
                });
                contextObj._notificationService.ShowToaster("Enable Site Administrator Role in Administration Module", 5);
            }, 100);
        } else {
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
                                item.FieldValue = ""; //Label Changed
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
                });
            }
        }
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
            } else if (contextObj.fieldDetails[i].DataEntryControlId == 1) {
                if (event.target.checked == false) {
                    contextObj.fieldDetails[i].FieldValue = null;
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

            //if (contextObj.fieldDetails[i + 1] && !contextObj.fieldDetails[i + 1].FieldLabel) { // Label Changed
            if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                //contextObj.SetDefaultValueForSubComponent((i + 1), contextObj.fieldDetails[i + 1].FieldId);
                contextObj.SetDefaultValueForSubComponent((i + 1), 0);
            }
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
            if (contextObj.fieldDetails[i].DataEntryControlId == 6) {
                var DefaultValue: string = "";
                var LookupId: string = "";
                //if (contextObj.fieldDetails[i + 1] && !contextObj.fieldDetails[i + 1].FieldLabel) { // Label Changed
                if (contextObj.fieldDetails[i] && !contextObj.fieldDetails[i].FieldLabel) {
                    if (contextObj.fieldDetails[i + 1].DataEntryControlId == 1) {
                        DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                        if (contextObj.fieldDetails[i].FieldValue == "true") {
                            if (contextObj.fieldDetails[i + 1].FieldValue && contextObj.fieldDetails[i + 1].FieldValue.length > 0) {
                                DefaultValue = contextObj.fieldDetails[i + 1].FieldValue;
                            } else {
                                successflag = false;
                                //contextObj._notificationService.ShowToaster("Enter a Value", 5); //Label Changed
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
                if (contextObj.ModuleSelect == false || contextObj.fieldDetails[i].IsEnabled ==false) {
                    FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": false, \"FeatureLookupId\":\"\", \"DefaultValue\":\"\" },";
                }
                else {
                        if (contextObj.fieldDetails[i].FieldValue && contextObj.fieldDetails[i].FieldValue.length) {
                            FeatureDetails = FeatureDetails + "{\"FieldId\":" + contextObj.fieldDetails[i].FieldId + ",\"Issubscribed\": true, \"FeatureLookupId\":\"\", \"DefaultValue\":\"" + contextObj.fieldDetails[i].FieldValue + "\" },";
                        }
                        else {
                               successflag = false;
                               break;
                        }                   
                }
                if (contextObj.fieldDetails[i].FieldId == 2213 && contextObj.fieldDetails[i].IsEnabled) {
                    if (Number(contextObj.fieldDetails[i].FieldValue) <= 0) {
                        contextObj._notificationService.ShowToaster("Work Order User Count should be greater than zero", 5);
                        successflag = false;
                    } else if (Number(contextObj.fieldDetails[i].FieldValue) < contextObj.WorkorderCount) {
                        contextObj._notificationService.ShowToaster("The number of Active and Inactive Work Order users is greater than the entered value. Enter a valid number", 5);
                        successflag = false;
                    }
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

