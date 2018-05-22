import {Component, Input, OnInit, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import { NgControl } from '@angular/common';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {EmployeesAssignedEmployeesComponent} from '../AssignedEmployees/employees.assignedemployees.report.component'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';



@Component({
    selector: 'employees-AssignedEmployeesTreeComponent-report',
    templateUrl: './app/Views/Reports/Employee/AssignedEmployeesTree/employees.assignedemployeestree.report.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, EmployeesAssignedEmployeesComponent, DropDownListComponent],
    providers: [CommonReportService]
})


export class EmployeesAssignedEmployeesTreeComponent implements OnInit {
    ddlcriteriareport: IField = undefined;
    alignContent: string;
    selectedCriteria: number = 3;
    ReportCategoryId: number = 48;
    orgName: any;

    constructor(private commonreportservice: CommonReportService) { }

    next: any = undefined;
    selectedTab: number = 0;
    isInitialised: boolean = false;
    onCriteriaChange: boolean = true;
    L1Org: any;
    L2Org: any;
    L3Org: any;
    L4Org: any;
    L5Org: any; 
    tabTitle: string = "Select Floors";

    ngOnInit() {
        var contexObj = this;
        var id = 0;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
            contexObj.commonreportservice.criteriaforReport(id).subscribe(function (result) {
                contexObj.ddlcriteriareport.LookupDetails.LookupValues = result.Data.LookupValues;
                contexObj.ddlcriteriareport.FieldValue = "13";
                contexObj.L1Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[3].Value;
                contexObj.L2Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[4].Value;
                contexObj.L3Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[5].Value;
                contexObj.L4Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[6].Value;
                contexObj.L5Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[7].Value;
                contexObj.L1Org = contexObj.L1Org.slice(3);
                contexObj.L2Org = contexObj.L2Org.slice(3);
                contexObj.L3Org = contexObj.L3Org.slice(3);
                contexObj.L4Org = contexObj.L4Org.slice(3);
                contexObj.L5Org = contexObj.L5Org.slice(3);


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
                this.orgName = "by Site";
                this.tabTitle = "Select Sites";
                break;
            case "12": this.selectedCriteria = 2;
                this.onCriteriaChange = true;
                this.orgName = "by Building";
                this.tabTitle = "Select Buildings";
                break;
            case "13": this.selectedCriteria = 3;
                this.onCriteriaChange = true;
                this.orgName = "by Floor";
                this.tabTitle = "Select Floors";
                break;
            case "14" : this.selectedCriteria = 14;
                this.onCriteriaChange = true;
                this.orgName = this.L1Org;
                break;
            case "15": this.selectedCriteria = 15;
                this.onCriteriaChange = true;
                this.orgName = this.L2Org;
                break;
            case "16": this.selectedCriteria = 16;
                this.onCriteriaChange = true;
                this.orgName = this.L3Org;
                break;
            case "17": this.selectedCriteria = 17;
                this.onCriteriaChange = true;
                this.orgName = this.L4Org;
                break;
            case "18": this.selectedCriteria = 18;
                this.onCriteriaChange = true;
                this.orgName = this.L5Org;
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

}