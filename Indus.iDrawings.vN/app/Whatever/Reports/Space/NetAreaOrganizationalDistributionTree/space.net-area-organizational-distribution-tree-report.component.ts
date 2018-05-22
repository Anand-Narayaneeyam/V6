import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {spaceNetAreaOrganizationaDistribution} from '../NetAreaOrganizationalDistribution/space.net-area-organizational-distribution-report.component'



@Component({
    selector: 'space-net-area-organizational-distribution-tree-report',
    templateUrl: './app/Views/Reports/Space/NetAreaOrganizationalDistributionTree/space.net-area-organizational-distribution-tree-report.component.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, spaceNetAreaOrganizationaDistribution],
})

export class spaceNetAreaOrganizationaDistributionTree implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 92;

    ngOnInit() {
        
    }

    submit(value: any) {
        this.isInitialised = false;
        this.next = value;
        var contexObj = this;
        setTimeout(function () {
            contexObj.isInitialised = true;
        }, 50);
        setTimeout(function () {
            contexObj.selectedTab = 1;
        }, 100);

    }

    getSelectedTab(event) {
        this.selectedTab = event[0];
    }

}