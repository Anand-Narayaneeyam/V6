import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {SpaceGrossAreaDistributionComponent} from '../GrossAreaDistribution/space.grossareadistribution.report.component'



@Component({
    selector: 'spaceGrossAreaDistributiontree-report',
    templateUrl: './app/Views/Reports/Space/GrossAreaDistributionTree/space.grossareadistributiontree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, SpaceGrossAreaDistributionComponent],
})


export class SpaceGrossAreaDistributionTreeComponent implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 89;

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