/// <reference path="../../space/space data/floor-selection.component.ts" />
import {Component, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PlanningProjectComponent} from './planningproject.component'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component';
import {EmployeeService} from '../../../Models/Employee/employee.services';
import {StackPlansComponent} from './stackplans.component'


@Component({
    selector: 'space-planning-project',
    templateUrl: './app/Views/Employee/Tools/spaceplanningprojects.html',
    directives: [TabsComponent, TabComponent, PageComponent, PlanningProjectComponent, FloorSelectionComponent, StackPlansComponent],
    providers: [NotificationService, EmployeeService],
    encapsulation: ViewEncapsulation.None
})

export class SpacePlanningProjectComponent {
    pagePath: string = "Employees / Projects";
    selectedTab: number = 0;
    moduleId: number = 5;
    targetId: number = 2;
    stackPlanId: number = 0;
    prjStatusId: number = 0;
    moveProjectId: number = 0;
    eventaction: string;
    id: any;
    localselection: number = 0;
    deleteIndex: number;
    success: any;
    
    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService) {
    }

    getSelectedTab(event?: any) {
        this.deleteIndex = 0;
       
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            
        }
        switch (event[0]) {
            case 0:
                this.pagePath = "Employees / Projects";
                break;
          
        }

    }

    Action(event: any) {
        var contextObj = this;
        this.eventaction = "";
     
        if (event["action"] == "Floor") {
          
            this.pagePath = "Employees / Projects / Select Floors";
            this.localselection = 1;
            this.eventaction = "Flooraction";
            this.id = event["id"];
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }
        else if (event["action"] == "StackPlans") {
            this.localselection = 2;
            this.eventaction = "StackPlans";
            this.id = event["id"];
            this.prjStatusId = event["prjtStatusId"];
            this.pagePath = "Employees / Projects / Stack Plans";
            this.moveProjectId = event["id"][0];
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        } else {
            this.pagePath = "Employees / Projects";
            setTimeout(function () {
                contextObj.selectedTab = 0;
            }, 50);
        }

    }
    getSelectedIds(event: any) {
        var contextObj = this;
        console.log(event["SelectedIds"]);
        this.employeeService.updateEmployeeMoveProjectFloors(this.id, event["SelectedIds"]).subscribe(function (resultData) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Floor(s) added", 3);
                // contextObj.submitSuccess.emit({ success: "success", returnData: resultData["Data"].Data });
            }
            else if (contextObj.success["StatusId"] == 0) {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                // contextObj.itemsSource.pop();
            }
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == 0) {
                    contextObj._notificationService.ShowToaster("Floor(s) added", 3);
                }
            }
        })

    }
    onTabClose(event) {
        console.log(event)
        this.eventaction = "";
        this.selectedTab = event[0];
    }
  
}