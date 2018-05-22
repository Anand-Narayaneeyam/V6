
import {Component, Input, OnInit, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import { NgControl } from '@angular/common';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {EmployeesDetailedOccupancyReportsComponent} from '../DetailedOccupancyReports/employees.detailedoccupancy.report.component'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { SelectOrgUnitReportComponent } from '../../Common/SelectOrgUnitForReport/select.orgunit.report.component';



@Component({
    selector: 'employee-detailedoccupancytree-report',
    templateUrl: './app/Views/Reports/Employee/DetailedOccupancyReportTree/employees.detailedoccupancytree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, EmployeesDetailedOccupancyReportsComponent, DropDownListComponent, SelectOrgUnitReportComponent],
    providers: [CommonReportService]
})


export class EmployeesDetailedOccupancyReportsTreeComponent implements OnInit {
    ddlcriteriareport: IField = undefined;
    alignContent: string;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 100;
    tabTitle: string = "Select Floors";
    orgName: any;

    constructor(private commonreportservice: CommonReportService) { }

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    onCriteriaChange: boolean = true;
    orgLevelSelect: boolean = false;
    L1Org: any;

    ngOnInit() {
        var contexObj = this;
        var id = 1;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
                contexObj.commonreportservice.criteriaforReport(id).subscribe(function (result) {

                    contexObj.ddlcriteriareport.LookupDetails.LookupValues = result.Data.LookupValues;
                    contexObj.ddlcriteriareport.FieldValue = "13"; 
                    contexObj.L1Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[3].Value;
                    contexObj.L1Org = contexObj.L1Org.slice(3);       

                });
        });

        contexObj.alignContent = "horizontal";

    }

    onChangeType(event: any) {
        this.onCriteriaChange = false;
        this.orgLevelSelect = false;
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
            case "14": this.selectedCriteria = 14;
                this.orgLevelSelect = true;
                this.onCriteriaChange = true;
                this.orgName = this.L1Org;
                this.tabTitle = "Select " + this.orgName;
                break;
            default: this.selectedCriteria = 3;
                this.onCriteriaChange = true;
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


    Selected(event) {
        this.isInitialised = false;
        var newselectedIds = '';
        for (let count = 0; count < event.length; count++) {
            newselectedIds = newselectedIds + event[count] + ','
        }
        newselectedIds = newselectedIds.slice(0, -1);
        this.next = newselectedIds;
       
        var contexObj = this;
        setTimeout(function () {
            contexObj.selectedTab = 1;
            contexObj.isInitialised = true;
        }, 50);
    
    }

}