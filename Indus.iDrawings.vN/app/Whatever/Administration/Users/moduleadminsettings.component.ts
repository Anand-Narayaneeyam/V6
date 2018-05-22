import {Component,Input,AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'module-admin-settings',
    templateUrl: './app/Views/Administration/Users/moduleadminsettings.component.html',
    directives: [Notification, ListBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class ModuleAdminSettingsComponent {

    modulesList: IField[];
    errorMessage: string;
    @Input() selectedIds: any[]; 
    IsSelectAllChecked: boolean;
    defaultChkbxIsChecked: boolean = true;
   
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
      
    }

    ngAfterViewInit() {
        var contextObj = this;     
        debugger
        contextObj.administrationService.getModuleAdminSettings(contextObj.selectedIds).subscribe(function (resultData) {
            contextObj.modulesList = resultData["Data"];
             
        });


        //this.administrationService.getUserDrawingAccessModuleddl(contextObj.selectedIds).subscribe(function (rst) {
     
        //    var remModlArray = [2, 4, 13, 30, 9, 29];
        //    debugger
        //    //rst["Data"][0].LookupDetails.LookupValues  = rst["Data"][0].LookupDetails.LookupValues.filter(function (item) { return (item.IsChecked == 1 && remModlArray.indexOf(item.Id) == -1) });

        //    contextObj.modulesList = rst["Data"]; //module ddl
        //    rst["Data"][0].LookupDetails.LookupValues.find(function (item) {
        //        if (item.Id == 1 && item.IsChecked == 1) {
        //            item.Value = "As Builts";
        //            return true;
        //        } else
        //            return false;
        //    });
        //    rst["Data"][0].FieldValue = rst["Data"][0].FieldValue == null ? -1 : rst["Data"][0].FieldValue;

        //    console.log("module",contextObj.modulesList[0]);
        //});
    }

    updateModuleAdminSettings() {       
        var contextObj = this;  
        var count = 0;
        let updateArray = [];
        debugger
        let i = 0;

    
        contextObj.modulesList[0].LookupDetails.LookupValues.filter(function (item) {
                var checked = false;
            for ( i = 0; i < contextObj.modulesList[0].MultiFieldValues.length; i++) {
                if (item.Id.toString() == contextObj.modulesList[0].MultiFieldValues[i]) {
                    updateArray.push({
                        ModuleId: item.Id,
                        IsCkecked: 1,
                        UserId: contextObj.selectedIds[0]
                    })
                    checked = true;
                }
               
                }
                if (checked == false) {
                    updateArray.push({
                        ModuleId: item.Id,
                        IsCkecked: 0,
                        UserId: contextObj.selectedIds[0]
                    })
                }
                count++;
             
             if (count == contextObj.modulesList[0].LookupDetails.LookupValues.length)
                    return true;
                else
                    return false;
           
        });

        this.administrationService.updateModuleAdminSettings(contextObj.selectedIds, updateArray).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Module Administrator Settings updated", 3);
            } else
                contextObj.notificationService.ShowToaster("Action Failure", 5);
        });

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