import {Component, Input, OnInit, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import { NgControl } from '@angular/common';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {EmployeesSpaceStandardComponent} from '../OccupancyDistributionSpace/employees.spacestandard.report.component'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';



@Component({
    selector: 'employee-spacestandardtree-report',
    templateUrl: './app/Views/Reports/Employee/OccupancyDistributionSpaceTree/employees.spacestandardtree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, EmployeesSpaceStandardComponent, DropDownListComponent],
    providers: [CommonReportService]
})


export class EmployeesNominallyOccupiedSpacesTreeComponent implements OnInit {
    ddlcriteriareport: IField = undefined;
    alignContent: string;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 326;
    tabTitle: string = "Select Floors";

    constructor(private commonreportservice: CommonReportService) { }

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    onCriteriaChange: boolean = true;

    ngOnInit() {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
            contexObj.ddlcriteriareport.FieldValue = "13";
            contexObj.ddlcriteriareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";

    }

    onChangeType(event: any) {
        this.tabTitle = "Select Floors";
        this.onCriteriaChange = false;
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
            default: this.selectedCriteria = 3;
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