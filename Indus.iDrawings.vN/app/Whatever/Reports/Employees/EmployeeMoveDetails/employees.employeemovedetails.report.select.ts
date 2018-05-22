import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { EmployeeMoveDetailsComponent } from './employees.employeemovedetails.report.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'

@Component({
    selector: 'employee-MoveDetailsReport',
    templateUrl: './app/Views/Reports/Employee/EmployeeMoveDetails/employees.employeemovedetails.select.html',
    directives: [PageComponent, DateComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, EmployeeMoveDetailsComponent],
    providers: [CommonReportService, NotificationService],
    styleUrls: ['app/Views/Reports/Employee/EmployeeMoveDetails/employeemove.css']})

export class EmployeeMoveDetailsSelect implements OnInit {
    StatusId: string = "0";
    EmployeeId: string = "0";
    ToDate: string = "";
    FromDate: string = "";
    alignContent: string;
    dateSelectorField: any = undefined;
    ddlmoveStatus: IField = undefined;
    ddlemployee: IField = undefined;

    isNextClicked: boolean = false;
    pagePath: string;
    DateFrom: string = "";
    DateTo: string = "";
    selectedTab: number = 0;
    isnext: number = undefined;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;

    constructor(private reportservice: CommonReportService, private notificationService: NotificationService) { }



    ngOnInit() {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        var contexObj = this;
        contexObj.reportservice.getddlemployeemove().subscribe(function (resultData1) {
            contexObj.ddlmoveStatus = resultData1.Data[2];
            contexObj.ddlemployee = resultData1.Data[3];
            var tempArray = new Array();
            tempArray.push(resultData1.Data[0]);
            tempArray.push(resultData1.Data[1]);
            contexObj.dateSelectorField = tempArray;
            contexObj.dateSelectorField[0].IsMandatory = false;
            contexObj.dateSelectorField[1].IsMandatory = false;
        });
        this.pagePath = "Reports / Employees / Employee Move Details";
        contexObj.alignContent = "horizontal";
    }
    
    onChangeStatus(event: any) {
        switch (event) {
            case "19": this.StatusId = "13";
                break;
            case "20": this.StatusId = "17";
                break;
            case "21": this.StatusId = "27";
                break;
            case "22": this.StatusId = "34";
                break;
            case "23": this.StatusId = "39";
                break;
            default: this.StatusId = "0";
                break;
        }
    }

    onChangeEmployee(event: any) {
        this.EmployeeId = event;
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;

        this.FromDate = this.dateSelectorField[0].FieldValue;
        this.ToDate = this.dateSelectorField[1].FieldValue;

        var toDate = new Date(this.DateTo);
        var fromDate = new Date(this.DateFrom);
        if (toDate < fromDate) {
            this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
        }
        else {
            var dateselectorFrom: IField = this.dateSelectorField[0];
            var dateselectorTo: IField = this.dateSelectorField[1];
            if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
                this.isNextClicked = false;
            }
            else {
                this.isnext = 1;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
    }

    getSelectedTab(event) {
        if (event[0] == 0) {
            this.selectedTab = 0;

            if (event[1] == true && this.isnext != undefined) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isnext = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    }
}