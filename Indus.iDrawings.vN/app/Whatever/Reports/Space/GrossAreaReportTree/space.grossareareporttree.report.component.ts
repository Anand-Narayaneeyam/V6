import {Component, Input, OnInit, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import { NgControl } from '@angular/common'; 
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {SpaceGrossAreaReportComponent} from '../GrossAreaReport/space.grossareareport.report.component'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';



@Component({
    selector: 'spacegrossareatree-report',
    templateUrl: './app/Views/Reports/Space/GrossAreaReportTree/space.grossareareporttree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, SpaceGrossAreaReportComponent, DropDownListComponent],
    providers: [CommonReportService]
})


export class SpaceGrossAreaTreeComponent implements OnInit {
    ddluserfilterreport: IField = undefined;
    alignContent: string;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 226;
    tabTitle: string = "Select Floors";

    constructor(private commonreportservice: CommonReportService) { }

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    onCriteriaChange: boolean = true;

    ngOnInit() {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddluserfilterreport = resultData.Data[0];
            contexObj.ddluserfilterreport.FieldValue = "13";
            contexObj.ddluserfilterreport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";
      
    }

    onChangeType(event: any) {
        this.onCriteriaChange = false;
        this.tabTitle = "Select Floors";
                switch (event) {
                    case "11": this.selectedCriteria = 1;
                                this.onCriteriaChange = true;
                                this.tabTitle = "Select Sites";
                               break;
                    case "12": this.selectedCriteria = 2;
                                this.onCriteriaChange = true;
                                this.tabTitle = "Select Buildings";
                               break;
                    case "13": this.selectedCriteria = 3;
                                this.onCriteriaChange = true;
                                this.tabTitle = "Select Floors";
                               break;
                    default:   this.selectedCriteria = 3;
                                this.onCriteriaChange = true;
                                this.tabTitle = "Select Floors";
                               break;
        }

                var contexObj = this;
                contexObj.selectedTab = undefined;
                setTimeout(function () {
                    contexObj.selectedTab = 0;
                    contexObj.onCriteriaChange = true;
                }, 50);  

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