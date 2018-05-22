import {Component, Input, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
@Component({
    selector: 'user-divisions-access',
    templateUrl: './app/Views/Administration/Users/userdivisionsaccess.component.html',
    directives: [Notification, ListBoxComponent, GridComponent, PagingComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds", "team"]
})

export class UserDivisionsAccessComponent {
    @Input() selectedIds: any[];
    @Input() isDivisionAdmin: boolean;
    accessDivisionsList: IField[];
    errorMessage: string;
    IsSelectAllChecked: boolean;
    defaultChkbxIsChecked: boolean = true;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    team: number;
    baseteamenable: boolean = false;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        var context = this;
       administrationService.getCustomerSubscribedFeatures("277").subscribe(function (customerSettingsData) {
           if (customerSettingsData.Data[0]["IsSubscribed"] == true)
               context.baseteamenable = true;
           else
               context.baseteamenable = false;
            
        });
    }
    ngAfterViewInit() {
        var context = this;
        if (this.selectedIds != undefined) {
            this.administrationService.getUserDivisionsAccesssFields().subscribe(function (result) {
                context.fieldObject = (result["Data"]);
                if (context.fieldObject.length > 1) {
                    context.administrationService.getUserDivisionsAccess(context.selectedIds[0], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
                        context.totalItems = result["Data"].DataCount;
                        context.itemsPerPage = result["Data"].RowsPerPage;
                        debugger
                        if (context.totalItems > 0) {
                            context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        } else {
                            var orgName = context.fieldObject.find(function (el) { return el.FieldId == 341 })['FieldLabel'];
                            context.notificationService.ShowToaster(orgName + " access is not to the selected User", 2);
                        }
                    });
                } else
                    context.notificationService.ShowToaster("No Organizational Structure defined", 2);
            });
        }
    }
    onCellEdit(event) {
        var contextObj = this;
        if (contextObj.baseteamenable){
                var dataasourcecopy = event.dataSource;
                var row = dataasourcecopy.find(function (item) { return item.Id === contextObj.team })
                if (row && row.View == "0" && event.dataKeyValue == contextObj.team) {
                    contextObj.notificationService.ShowToaster("Base Team cannot be unchecked", 5)
                    row.IsChecked = 1;
                    row.View = "1";
                }
                event.dataSource = dataasourcecopy;
            }

    }
    onChangeCheckBx(event) {

        console.log(event.chkevent);
        console.log(event.field);
    }
    updateDivisionAdminSettings() {
        var contextObj = this;
        var updatedRptFldValues = '';
        var status = true;
        for (var item of this.itemsSource) {
            if (item['View'] == true) {
                updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + item['Id'] + "\"},";
            }
            else if (item["View"] == false && item["Id"] == contextObj.team) {
                // item["View"] = true;
  
                    if (contextObj.baseteamenable) {
                        contextObj.notificationService.ShowToaster("Base Team cannot be unchecked", 5)
                        status = false;
                    } else
                        status = true;                 
               
                break;
            }
        }
        
            if (status == true) {
                updatedRptFldValues = updatedRptFldValues.substring(0, updatedRptFldValues.length - 1);
                contextObj.administrationService.updateUserDivisionsAccess(updatedRptFldValues, contextObj.selectedIds[0], contextObj.isDivisionAdmin).subscribe(function (resultData) {
                    if (resultData.ServerId == 1) {
                        contextObj.notificationService.ShowToaster("Access privilege for selected user updated", 3);
                    } else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });;
            }
        
        //this.notificationService.ShowToaster("Divisions accessible to the selected User(s) has been updated", 2);
    }
    SelectAllOnClick(event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    }
    getDefaultChkBoxChecked(array: any) {
        var isDefaultLayer: boolean;
        //var nNumLayers = 4;
        //if (this.isSpace)
        //    nNumLayers = 4;
        //else
        //    nNumLayers = 2;

        //if (array.length > nNumLayers) {
        //    this.defaultChkbxIsChecked = false;
        //    return;
        //}
        //for (var i = 0; i < nNumLayers; i++) {
        //    isDefaultLayer = array.some(function (el) { return el == i });
        //    if (isDefaultLayer != true) {
        //        this.defaultChkbxIsChecked = false;
        //        break;
        //    }
        //    if (isDefaultLayer)
        //        this.defaultChkbxIsChecked = true;
        //}
    }

    singleOnClick(event: any) {
        // //debugger
        var isDefaultLayer: boolean;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    }
    selectAll(event, fieldObj) {
        var contextObj = this;
        if (event.target.checked == true) {
            //    this.layerList[0].MultiFieldValues.splice(0, this.layerList[0].MultiFieldValues.length);
            this.IsSelectAllChecked = false;
            //    this.defaultChkbxIsChecked = true;
            //    if (this.layerList[0].LookupDetails.LookupValues != null) {
            //        if (this.isSpace) {
            //            for (var i = 0; i < 4; i++) {
            //                var iDrawingsLayes = [];
            //                contextObj.objiWhiz.getAlliDrawingsLayers(iDrawingsLayes);
            //                if (iDrawingsLayes.find(function (el) { return el === contextObj.layerList[0].LookupDetails.LookupValues[i].Value }))
            //                    this.layerList[0].MultiFieldValues.push(i.toString());
            //            }
            //        } else {
            //            for (var i = 0; i < 2; i++) {
            //                var isExist = [0];
            //                contextObj.objiWhiz.layerExists(this.layerList[0].LookupDetails.LookupValues[i].Value, isExist);
            //                if (isExist[0])
            //                    this.layerList[0].MultiFieldValues.push(i.toString());
            //            }
            //        }
            //    }

            //} else {
            //    this.defaultChkbxIsChecked = false;
            //    this.layerList[0].MultiFieldValues.splice(0, 4);
            //}

            //if (this.layerNameLength == this.layerList[0].MultiFieldValues.length)
            //    this.IsSelectAllLayerChecked = true;
            //else
            //    this.IsSelectAllLayerChecked = false;
        }
    }
}