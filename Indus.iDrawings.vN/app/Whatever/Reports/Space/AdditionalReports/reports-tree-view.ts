import {Component, Input, OnInit, AfterViewChecked, DoCheck} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {AdditionalReportComponent} from './reports-report-view'
import { ActivatedRoute, Router } from '@angular/router';
import { CommonReportService } from '../../../../Models/reports/common.service'


@Component({
    selector: 'additionalReportTree-report',
    templateUrl: './app/Views/Reports/Space/AdditionalReports/reports-tree-view.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, AdditionalReportComponent],
    providers: [CommonReportService]
})


export class AdditionalReportTreeComponent implements OnInit {

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    ReportCategoryId: number = undefined;
    sub: number = 0;
    reportCategoryIdTemp: number;
    isFlooraenabled: boolean = false;
    reportFieldId: number;
    reportName: string;
    deleteIndex: number = 0;

    constructor(private route: ActivatedRoute, private router: Router, private reportService: CommonReportService) { }

    ngOnInit() {
    }

    ngDoCheck() {
        var contextObj = this;
        var oldValue = this.sub;
        this.sub = this.route.snapshot.params["t"];       
        
        if (this.sub != oldValue) {
            this.sub = this.route.snapshot.params["t"];
            this.isFlooraenabled = false;

            if (this.isInitialised == true) {
                this.closeTab(1);
                this.isInitialised = false;
                this.selectedTab = 0;
                this.next = undefined;
            }
            if (this.sub >= 1000) {
                this.reportCategoryIdTemp = this.sub - 1000;
                this.ReportCategoryId = Number(this.sub);
                this.reportService.getAdditionalReportDetails(this.ReportCategoryId).subscribe(function (resultData) {                    
                    var temp = JSON.parse(resultData.FieldBinderData);
                    contextObj.reportFieldId = temp[0].Id;
                    contextObj.reportName = temp[0].Column1;
                    contextObj.isFlooraenabled = true;
                });               
            }
        }
    }

    submit(value: any) {
        
      //  this.deleteIndex = undefined;
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
        // this.selectedTab = event[0];
       // console.log('event:  ', event);
       // var contextObj = this
        //switch (event[0]) {
        //    case 0:
        //        if (event[1] && this.isInitialised) {
        //            this.closeTab(1);
        //            this.isInitialised = false;
        //        }
        //        break;
        //}
        this.selectedTab = event[0];

    }
    public closeTab(index: number) {
        var contextObj = this
        setTimeout(function () {
            contextObj.deleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.deleteIndex = 0;
        }, 50);
    }
}