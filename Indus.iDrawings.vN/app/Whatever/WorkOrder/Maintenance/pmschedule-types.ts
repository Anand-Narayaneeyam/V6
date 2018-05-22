import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { PMSchedulesListComponent } from './pmschedules-list.component';

@Component({
    selector: 'pmschedule-types',
    templateUrl: './app/Views/WorkOrder/Maintenance/pmschedule-types.html',
    directives: [Notification, FieldComponent, TabsComponent, TabComponent, PMSchedulesListComponent ],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService],
    encapsulation: ViewEncapsulation.None
})

export class PMScheduleTypesComponent implements OnInit{
    fieldDetailsPMScheduleTypes: IField[];
    selectedId: any;
    btnName: string;
    siteId: any;
    siteName: any;
    equipmentCategoryId: any;
    equipmentClassId: any;
    routeId: any;
    routeName: any;
    scheduleTypes: IField;
    isGeneral: boolean;
    isRoutes: boolean;
    pmSchedulesTab: boolean = false;
    pmProcedureTab: boolean = false;
    selectedTab: number = 0;
    deleteIndex: number;
    localselection: number;
    //isSiteAdmin: boolean = false;
    isSubscribed: boolean = false;
    //equipmentClassName: any;
    //equipmentCategoryName: any;
    //equipmentClassIdfor: any;
    //pmId: any;

    constructor(private workOrdereService: WorkOrdereService, private AdministrationService: AdministrationService,  private notificationService: NotificationService) {
    }

    ngOnInit() {
        var contextObj = this;
        this.btnName = "Next";   
        //this.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
        //    contextObj.isSiteAdmin = result == 1 ? true : false;
        //    contextObj.loadDynamicFieldDetails();
        //});

        contextObj.AdministrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
            contextObj.loadDynamicFieldDetails();
        }); 
    }

    public loadDynamicFieldDetails() {
        var contextObj = this;
        this.workOrdereService.pmScheduleTypesFields().subscribe(function (resultData) {
            contextObj.fieldDetailsPMScheduleTypes = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsPMScheduleTypes.length; i++) {
                if (contextObj.fieldDetailsPMScheduleTypes[i].FieldId == 1321) {
                    if (contextObj.isSubscribed)
                        contextObj.fieldDetailsPMScheduleTypes[i]["IsMandatory"] = true;
                } else if (contextObj.fieldDetailsPMScheduleTypes[i].FieldId == 1325) {
                    contextObj.fieldDetailsPMScheduleTypes[i]["FieldLabel"] = "";
                    contextObj.fieldDetailsPMScheduleTypes[i]["FieldValue"] = "1";
                }
            }
            this.scheduleTypes = contextObj.fieldDetailsPMScheduleTypes.find(function (el) { return el.ReportFieldId === 5570; });
            if (this.scheduleTypes.FieldValue == "1") {
                contextObj.isGeneral = true;
            }
        });   
    }

    loadTabContent() {
        var contextObj = this;
        this.localselection = 1;
        contextObj.pmSchedulesTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    }

    onNextClick(event) {
        if (this.isRoutes == true && (this.routeId == -1 || this.routeId == undefined)) {
            this.notificationService.ShowToaster("Select a Route", 2);
        } else {
            this.loadTabContent();
        }        
    }

    getSelectedTab(event: any) {
        switch (event[0]) {
            case 0:                
                this.siteId = - 1;
                this.equipmentCategoryId = -1;
                this.equipmentClassId = - 1;
                this.routeId = - 1;
                this.pmSchedulesTab = false;
                this.isGeneral = true;
                this.isRoutes = false;
                this.loadDynamicFieldDetails(); 
                break;
        }
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    }

    onTabClose(event: any) {
        switch (event[0]) {
            case 0:
                this.pmSchedulesTab = false;
                this.equipmentCategoryId = -1;
                this.equipmentClassId = - 1;
                this.routeId = - 1;
                this.isGeneral = true;
                this.isRoutes = false; 
                this.loadDynamicFieldDetails();
                break;
            case 1:
                this.pmProcedureTab = false;
                break;
        }
        this.selectedTab = event[0];
    }

    scheduleTypesChange(event: any) {
        var contextObj = this;
        var equipmentCategory = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1322;
        });
        var equipmentClass = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1323;
        });
        var route = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1324;
        });
        if (event["rbtnObject"]["fieldobject"]["FieldValue"] == "1") {
            this.isGeneral = true;
            equipmentCategory.IsEnabled = true;
            equipmentCategory.IsVisible = true;
            equipmentClass.IsEnabled = false;
            equipmentClass.IsVisible = true;
            route.IsEnabled = false;
            route.IsVisible = true;
            route.FieldValue="-1";
            this.isRoutes = false; 

        } else if (event["rbtnObject"]["fieldobject"]["FieldValue"] == "2") {
            this.isRoutes = true; 
            equipmentCategory.IsEnabled = false;
            equipmentCategory.IsVisible = true;
            equipmentCategory.FieldValue = "-1";
            equipmentClass.IsEnabled = false;
            equipmentClass.IsVisible = true; 
            equipmentClass.FieldValue = "-1";          
            route.IsEnabled = true;
            route.IsVisible = true;
            this.isGeneral = false;
        }
    }

    fieldChange(event: any) {
        var contextObj = this;
        var lookUpDetails = event["ddlRelationShipEvent"]["ChildFieldObject"]["LookupDetails"]["LookupValues"];
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];  
        var ddlEquipmentCategory = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1322;
        });
        var ddlEquipmentClass = this.fieldDetailsPMScheduleTypes.find(function (item) {
            return item.FieldId === 1323;
        }); 
        if (this.isGeneral == true) {
            if (fieldLabel == "Site") {
                this.siteId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var siteFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                for (var i = 0; i < lookUpDetails.length; i++) {
                    var id = lookUpDetails[i].Id;
                    if (id == this.siteId){
                        this.siteName = lookUpDetails[i].Value;
                        break;
                    }
                }
                if (this.siteId > -1 && siteFieldId == 1321) {
                    this.workOrdereService.loadEquipmentCategory(this.siteId, siteFieldId).subscribe(function (resultData) {
                        if (resultData["Data"] != null && resultData["Data"]["LookupValues"] != "") {
                            ddlEquipmentCategory.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        }
                    });
                } else {
                    ddlEquipmentCategory.FieldValue = "-1";
                    ddlEquipmentClass.IsEnabled = false;
                    ddlEquipmentClass.IsVisible = true;
                    ddlEquipmentClass.FieldValue = "-1";
                }
            } else if (fieldLabel == "Equipment Category") {
                this.equipmentCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var equipmentCategoryFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];                
                if (this.equipmentCategoryId > -1 && equipmentCategoryFieldId == 1322) {
                    ddlEquipmentClass.IsEnabled = true;
                    ddlEquipmentClass.IsVisible = true;
                    this.workOrdereService.loadEquipmentClass(this.siteId, equipmentCategoryFieldId, this.equipmentCategoryId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            ddlEquipmentClass.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        }
                    });
                } else {
                    ddlEquipmentClass.IsEnabled = false;
                    ddlEquipmentClass.IsVisible = true;
                    ddlEquipmentClass.FieldValue = "-1";
                }               
            }
            else if (fieldLabel == "Equipment Class") {
                this.equipmentClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            }
        }
        else if (this.isRoutes == true) {
            this.routeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            for (var i = 0; i < lookUpDetails.length; i++) {
                var id = lookUpDetails[i].Id;
                if (id == this.routeId) {
                    this.routeName = lookUpDetails[i].Value;
                    break;
                }
            }
        }
    }

    //onProcedureClicked(event) {
    //    var contextObj = this;
    //    contextObj.equipmentClassName = event.equipmentClassName;
    //    contextObj.equipmentCategoryName = event.equipmentCategoryName;
    //    contextObj.pmId = event.pmId;
    //    contextObj.equipmentClassIdfor = event.equipmentClassId;
    //    contextObj.pmProcedureTab = true;
    //    setTimeout(function () {
    //        contextObj.selectedTab = 2;
    //    }, 100);
    //}
}