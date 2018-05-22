import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {CAISpaceDriverComponent} from '../SpaceDriver/spaceDriver.report'



@Component({
    selector: 'spaceDriver-report',
    templateUrl: './app/Views/Reports/CAI/SpaceDriverTree/spaceDriverTree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, CAISpaceDriverComponent],
})


export class SpaceDriverTreeComponent implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 108;

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