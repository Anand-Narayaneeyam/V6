import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {AssetListByFloorComponent} from './asset.listbyfloor.report'
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'



@Component({
    selector: 'assetlistbyfloor-selector',
    templateUrl: './app/Views/Reports/Assets/AssetListByFloor/asset.listbyfloor.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [PagingComponent, Notification, PageComponent, FloorSelectionReportComponent, AssetListByFloorComponent, TabsComponent, TabComponent]
})

export class AssetListByFloorSelect implements OnInit {
    pagePath: string;
    next: any = undefined;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 107;
    isNextClicked: boolean = false;
    selectedTab: number = 0;

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.pagePath = "Reports / Assets / Asset List by Floor";
    }


    submit(value: any) {
        this.isNextClicked = false; 
        this.next = value;
        var contexObj = this;
        setTimeout(function () {
            contexObj.isNextClicked = true;  
        }, 100);

        setTimeout(function () {
            contexObj.selectedTab = 1;
        }, 200);
 
    }

    getSelectedTab(event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
        }
        else if (event[0] == 1 ) {
            this.selectedTab = 1;
        }
        
    }




}