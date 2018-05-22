import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {SpaceGrossAreaOrgDistributionComponent} from '../GrossAreaOrgDistribution/space.grossareaorgdistribution.report.component'



@Component({
    selector: 'spaceGrossAreaOrgDistributiontree-report',
    templateUrl: './app/Views/Reports/Space/GrossAreaOrgDistributionTree/space.grossareaorgdistributiontree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, SpaceGrossAreaOrgDistributionComponent],
})


export class SpaceGrossAreaOrgDistributionTreeComponent implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 90;

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