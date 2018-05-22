import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { LabelComponent } from '../../../Framework/Whatever/Dynamiccontrols/Dynamicfields/labelcomponent.component';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';

import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ButtonComponent}from '../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component'
import {ValidateService} from '../../../framework/models/validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'user-licensing-setup',
    templateUrl: './app/Views/Administration/Customers/user-licensing-setup.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, LabelComponent,StringTextBoxComponent,GridComponent, DropDownListComponent, ButtonComponent],
    providers: [AdministrationService, NotificationService, ValidateService],
    inputs: ["customerId","rowData"]
})
export class UserLicencingSetupComponent {

    ddlCustomer: any;
    rowData
    ddlLicenceAllotment: any;
    ddlDeviceType: any;
    alignContent: string;
    fieldObject: IField[];
    sourceFieldObj = [];
    dynamicfieldObject: IField[];
    itemSource;
    inputItems: IGrid = { dataKey: "UserRoleId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "", isHeaderCheckBx: true };
    refreshgrid;
    customerId: number = 0;
    entityCategoryId: number = 0;
    btnSave: string;
    disableBtn = false;
    count = 0;
    licenceTypeId = 0;
    deviceTypeId = -1;
    value = [];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    isRolewise;
    @Output() submitSuccess = new EventEmitter();


    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private validateService: ValidateService) {
    }

    ngOnInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";

        this.administrationService.loadUserLicenseSetupFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            for (let i = 0; i < contextObj.fieldObject.length; i++) {
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
            })
            contextObj.loadUserLicenceSetupData(contextObj);
        });
    }

    loadUserLicenceSetupData(contextObj)
    {
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
                for (let i = 0; i < contextObj.dynamicfieldObject.length; i++) {
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
    }


    loadSource(contextObj) {
        var itemSrc = contextObj.itemSource;
        if (contextObj.fieldObject && contextObj.itemSource) {
            for (var j = 0; j < contextObj.fieldObject.length; j++) {
                if (j > 0)
                    contextObj.fieldObject[j].Width = "250";
                contextObj.fieldObject[j].IsHiddenLabel = true;
                if (contextObj.fieldObject[j].ReportFieldId == 439)/*first col*/
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
    }

    onChangeLicence(event) {
        this.licenceTypeId = event;
        this.loadUserLicenceSetupData(this);

    }

    onChangeDevicetype(event) {
        this.deviceTypeId = event;
        this.loadUserLicenceSetupData(this);
    }

    Update() {
        var context = this;
        var reportfieldIdValues = new Array<ReportFieldIdValues>();
        reportfieldIdValues.push({ ReportFieldId: 8321, Value: this.licenceTypeId.toString() })
        reportfieldIdValues.push({ ReportFieldId: 6324, Value: this.deviceTypeId.toString() })
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() })
        var licenseSetupList = new Array<LicenseSetupList>();

        if (this.rowData["HasConcurrentCap"] == 1) {
            for (var i = 0; i < this.sourceFieldObj.length; i++) {

                if (parseInt(this.sourceFieldObj[i][2].FieldValue) > 0 && parseInt(this.sourceFieldObj[i][3].FieldValue) == 0)//max.login ==0
                {
                    context.notificationService.ShowToaster("Enter a value between 0 and 9999 for Max.Logins", 2)
                    return;
                }
                else if (parseInt(this.sourceFieldObj[i][3].FieldValue) > parseInt(this.sourceFieldObj[i][2].FieldValue)) //max.login > max.user
                {
                    context.notificationService.ShowToaster("Max. Logins should be less than or equal to Max. Users", 2)
                    return;
                }
                else {
                    licenseSetupList.push({
                        UserRole: this.itemSource[i]['UserRoleId'].toString(),
                        MaxUsers: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                        MaxLogins: this.sourceFieldObj[i][3].FieldValue == "" ? "0" : this.sourceFieldObj[i][3].FieldValue,
                        AliasName: this.sourceFieldObj[i][1].FieldValue
                    })
                }
            }
        }

        else
        {
            for (var i = 0; i < this.sourceFieldObj.length; i++) {
                licenseSetupList.push({
                    UserRole: this.itemSource[i]['UserRoleId'].toString(),
                    MaxUsers: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                    MaxLogins: this.sourceFieldObj[i][2].FieldValue == "" ? "0" : this.sourceFieldObj[i][2].FieldValue,
                    AliasName: this.sourceFieldObj[i][1].FieldValue
                })
            }
        }
        
        this.administrationService.postsubmitRolewiseUserLicenseSetupUrl(this.customerId, JSON.stringify(reportfieldIdValues), JSON.stringify(licenseSetupList)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("User Licensing Setup details updated", 3)
                context.submitSuccess.emit({ returnData: result.Data });

            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2)
            }
        });
    }

    onSubmitData(reportfields)
    {
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
            } else {
                return false;
            }

        });
        
        if (this.rowData["HasConcurrentCap"] == 1) {
            
            if (Number(maxuser) > 0 && Number(maxlogin) == 0) { //max.login ==0
                context.notificationService.ShowToaster("Enter a value between 0 and 9999 for Max.Logins", 2)
                return;
            }
            if (Number(maxlogin) > Number(maxuser)) //max.login > max.user
            {
                context.notificationService.ShowToaster("Max. Logins should be less than or equal to Max. Users", 2)
                return;
            }
        }

        else {
            maxlogObj.Value = maxuser;
        }

        this.administrationService.postsubmitUserLicenseSetupUrl(this.customerId, JSON.stringify(reptFieldObj)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("User Licensing Setup details updated", 3)
                context.submitSuccess.emit({ returnData: result.Data });
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2)
            }
        });
    }
}

export interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: string;
}

export interface LicenseSetupList {
    UserRole: string;
    MaxUsers: string;
    MaxLogins: string;
    AliasName: string;
}