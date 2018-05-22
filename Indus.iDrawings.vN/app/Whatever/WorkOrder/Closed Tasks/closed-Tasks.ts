import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { TrackRequestListComponent } from '../Track Request/trackRequest-list.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ListReviewPMWorkOrderComponent} from '../Review/reviewPmWorkorder-list.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';


@Component({
    selector: 'closed-tasks',
    templateUrl: './app/Views/WorkOrder/Closed Tasks/closed-Tasks.html',
    directives: [PageComponent, TrackRequestListComponent, ListReviewPMWorkOrderComponent, TabsComponent, TabComponent],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions],
})

export class ClosedTasksComponent implements OnInit {
    selectedTab: number = 0;
    pageTitle: string = "Review";
    pagePath: string = "Work Order / My Requests";
    entityCategoryId: number = 1;
    requestId: number = 0;
    closedRequestListSource: any[] = [];
    closedRequestListTotalItems: number = 0;
    closedRequestListItemsPerPage: number = 0;
    initList: boolean = false;
    closedRequestInputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    userDetails: UserDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };

    constructor(private notificationService: NotificationService, private workOrderService: WorkOrdereService, private generalFunctions: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.workOrderService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.initList = true;
            }
        });
    }


    public getSelectedTab(event: any) {
        if (event[0] == 0) {
            this.pagePath = "Work Order / Closed Tasks / Service Requests";
        } else {
            this.pagePath = "Work Order / Closed Tasks / PM Work Orders";
        }
        this.selectedTab = event[0];
    }
}

interface UserDetails {
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserFirstName: string;
    UserMiddleName: string;
    UserLastName: string;
}



