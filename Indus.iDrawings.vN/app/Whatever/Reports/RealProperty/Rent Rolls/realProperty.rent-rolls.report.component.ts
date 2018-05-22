import {Component, OnInit, EventEmitter,Input, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {realPropertyRentRollsReportList} from './realProperty.rent-rolls.report.list.component'
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { RealPropertyService } from '../../../../Models/RealProperty/realproperty.service';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'realProperty.RentRolls.report',
    templateUrl: './app/Views/Reports/RealProperty/Rent Rolls/realProperty.rent-rolls.report.component.html',
    providers: [CommonReportService, NotificationService, RealPropertyService],
    directives: [PagingComponent, Notification, PageComponent, TabsComponent, TabComponent, realPropertyRentRollsReportList, DateComponent, SubMenu]
})

export class realPropertyRentRollsReport implements OnInit {

    dateSelectorField: IField[];
    @Output() onSubmitClick = new EventEmitter();
    isNextClicked: boolean;
    selectedTab: number = 0;
    pagePath: string;
    blnShowDate: boolean = true;
    fromDate: any;
    toDate: any;
    FromDateInput: any;
    ToDateInput: any;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;
    

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService, private realPropertyService: RealPropertyService) { }

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

        this.isNextClicked = false;
        this.pagePath = "Reports / Real property / Rent Rolls";
        var contextObj = this;
        contextObj.realPropertyService.rentRollsDateSelector().subscribe(function (resultData) {
            
            contextObj.dateSelectorField = resultData.Data;
            var date = new Date();
            var year = date.getFullYear();
            contextObj.dateSelectorField[0].FieldValue = "01 JAN " + year;
            contextObj.dateSelectorField[1].FieldValue = "01 DEC " + year;
        });

    }

    //onNextClick(event) {
    //    this.isNextClicked = false;
        
        
    //    this.fromDate = this.dateSelectorField[0].FieldValue;
    //    this.toDate = this.dateSelectorField[1].FieldValue;
         
    //    var toDate = new Date(this.toDate);
    //    var fromDate = new Date(this.fromDate);

    //    this.ToDateInput = toDate;
    //    this.FromDateInput = fromDate;

    //    if (toDate < fromDate) {
    //        this.notificationService.ShowToaster('From Date must be less than To Date', 2);
    //    }
    //    else {
            
    //      //  this.isNextClicked = true;
    //        var contexObj = this;
    //        setTimeout(function () {
    //          contexObj.isNextClicked = true;
    //        }, 50);
    //        setTimeout(function () {
    //            contexObj.selectedTab = 1;
    //        }, 100);
    //    }

        
        
    //}

    onSubMenuChange(event) {
        this.isNextClicked = false;


        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;

        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);

        this.ToDateInput = toDate;
        this.FromDateInput = fromDate;

        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than To Date', 2);
            }
            else {

                //  this.isNextClicked = true;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
        else
        {
            return
        }
    }

    getSelectedTab(event) {
        
        //this.selectedTab = event[0];
        //var contextObj = this;
        //if (event[0] == 1) {
        //    contextObj.isNextClicked = true;
        //}
        //if (this.isNextClicked) {
        //    setTimeout(function () {
        //        contextObj.tabDeleteIndex = 1;
        //        this.isNextClicked = false;
        //    }, 50);
        //    setTimeout(function () {
        //        contextObj.tabDeleteIndex = 1;
        //    }, 50);
        //}

        if (event[0] == 0) {
            this.selectedTab = 0;

            if (event[1] == true && this.isNextClicked == true) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isNextClicked = false;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    }



}