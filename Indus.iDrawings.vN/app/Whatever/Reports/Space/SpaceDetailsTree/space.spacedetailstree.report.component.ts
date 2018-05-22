import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common'; 
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {SpaceDetailsComponent} from '../Spacedetails/space.spacedetails.report.component'



@Component({
    selector: 'spacedetailstreereport',
    templateUrl: './app/Views/Reports/Space/SpaceDetailsTree/space.spacedetailstree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, SpaceDetailsComponent],
})


export class SpaceDetailsTreeComponent implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 17;

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