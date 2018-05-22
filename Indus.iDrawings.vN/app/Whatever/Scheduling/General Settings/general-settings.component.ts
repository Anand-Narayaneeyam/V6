import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AmenityComponent } from './amenities.component';
import { CateringComponent } from './catering.component';
import { ServiceComponent } from './services.component';
import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
import { DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';
import { ResourceScheduling} from './resources';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {EquipmentTypeComponent} from './equipmenttype.component'
import {EquipmentQuantityComponent} from './equipmentquantities.component'
import {UserRoleBasedSettingsComponent} from './UserRoleBasedSettings.component'
import { NumberFormat} from '../../common/number format/numberformat.component';
@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/Scheduling/General Settings/general-settings.component.html',
    directives: [SectionComponent, PageComponent, EquipmentQuantityComponent, AmenityComponent, EquipmentTypeComponent, DrawingManagementComponent, ResourceScheduling, ServiceComponent, CateringComponent, DefineWorkTypeComponent, SetWorkflowComponent, UserRoleBasedSettingsComponent, NumberFormat]
})

export class SchedulingGeneralSettingsComponent {
    pagePath = "Settings / Scheduling / General Settings"
    pageTitle: string = "General Settings";
    isSiteAdmin: boolean = false;
    isroomresv: boolean = false;
    isseatresv: boolean = false;
    iseqpresv: boolean = false;
    iscatering: boolean = false;
    isamenities: boolean = false;
    isservice: boolean = false;
    Drawinglabel: string;

    sectionExpansionStatus = [{ "title": "Floor Plan Management", "isExpanded": false }, { "title": "Amenities", "isExpanded": false }, { "title": "Services", "isExpanded": false }, { "title": "Catering", "isExpanded": false }, { "title": "Resources", "isExpanded": false }, { "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }, { "title": "Equipment Types", "isExpanded": false }, { "title": "Equipment Quantity", "isExpanded": false }, { "title": "User Role based Settings", "isExpanded": false }, { "title": "Number Prefix", "isExpanded": false }];

    constructor(private administrationService: AdministrationService) {

    }

    onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
    };
    ngOnInit() {
        var context = this;
        context.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
        });


        context.administrationService.getCustomerSubscribedFeatures("256,186,187,281,282,283,276").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];//281,282,283
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 256:/*Equipment Booking*/
                        context.iseqpresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 186: /*Room Booking*/
                        context.isroomresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 187: /*Seat Booking*/
                        context.isseatresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 281:/*Catering*/
                        context.iscatering = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 282:/*Amenities*/
                        context.isamenities = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 283:/*Services*/
                        context.isservice = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 276:
                        if (customerFeatureobj[i]["Value"] == "")
                            context.Drawinglabel = "Drawing Management"
                        else
                            context.Drawinglabel = customerFeatureobj[i]["Value"] + " Management";
                        break;


                }
            }
        });
    }
}