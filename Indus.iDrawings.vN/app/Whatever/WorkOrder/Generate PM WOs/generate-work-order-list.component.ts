import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { IField} from  '../../../Framework/Models/Interface/IField'
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { EmailRecipient } from './email-recipient.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'generate-work-order-list',
    templateUrl: './app/Views/WorkOrder/Generate PM WOs/generate-work-order-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, TabsComponent, TabComponent, EmailRecipient],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['numberOfDays', 'routeId', 'equipmentCategoryId', 'equipmentClassId', 'workTypeId', "date"]
})

export class GenerateWorkOrderListComponent implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    siteId: any;
    numberOfDays: any;
    equipmentCategoryId: any;
    equipmentClassId: any;
    routeId: any;
    workTypeId: any;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "PMId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 140 };
    action: string;
    btnName: string;
    target: number = 0;
    enableMenu = [];
    gridcount: number = 8;
    public selectedDateValue: any;
    nextPmDate: any[];
    procedureId: any[];
    gridDetails: string;
    selectedId: number = 0;
    date: string;
    pageTitle: string = "Select Notification Recipients";
    //Form Id : 264 --pageid:2550
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (264))
    menuData = [
        {
            "id": 1,
            "title": "Generate",
            "image": "Generate",
            "path": "Generate",
            "subMenu": null,
            "privilegeId": 6189
        }
    ];

    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {

        this.equipmentClassId;
        if (this.routeId == undefined)
            this.routeId = "-1";
        else if (this.equipmentCategoryId == undefined)
            this.equipmentCategoryId = "-1";
        else if (this.equipmentClassId == undefined)
            this.equipmentClassId = "-1";

        var contextObj = this;
        //   this.workOrderService.getGenerateWorkOrderListListFields().subscribe(function (resultData) {
        this.workOrderService.getGenerateWorkOrderListListFields(this.workTypeId).subscribe(function (resultData) {

            contextObj.fieldObject = (resultData["Data"]);
            //  contextObj.fieldObject = resultData.Data.FieldBinderList;


            //var idTemp = contextObj.fieldObject.find(function (item) {
            //    return item.FieldId === 1463;
            //});
            //idTemp.FieldLabel = "";
            //idTemp.IsEnabled = true;
            //idTemp.IsVisible = true;

            if (Number(contextObj.numberOfDays) >= 0)
                contextObj.loadDataHaveNumberofDays();
            else
                contextObj.loadDataHaveDate();

        });




        //form id : 264***** PageId :2550
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2550, contextObj.administrationServices, contextObj.menuData.length);

    }

    public loadDataHaveNumberofDays() {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.numberOfDays, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {

            contextObj.totalItems = resultData["Data"].DataCount;
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            let le = temp.length;
            if (le > 0) {

                //var temp = JSON.parse(resultData["Data"].FieldBinderData);
                //let le = temp.length;

                //.........time  change
                //for (let i = 0; i < temp.length; i++) {
                //    var dateTemp = new Date(temp[i]["Next PM Date"]);
                //    contextObj.setDate(dateTemp);
                //    temp[i]["Next PM Date"] = contextObj.selectedDateValue;;

                //}
                ////........ //.........time  change

                //  var fieldobj = new Array<ReportFieldArray>();

                // contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1];
            }
            else {
                var selectAll = contextObj.fieldObject.find(function (item) { return item.FieldId === 1463 })

                selectAll.IsEnabled = false;
                selectAll.IsVisible = false;

                contextObj.itemsSource = temp;
                contextObj.notificationService.ShowToaster("No PM Schedules exist for the Number of days entered / Work Order already generated, for the selected criteria", 2);
                contextObj.enableMenu = [];
            }
        });
    }

    public loadDataHaveDate() {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderListDataHavingDate(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.date, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {


            contextObj.totalItems = resultData["Data"].DataCount;
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            let le = temp.length;
            if (le > 0) {

                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1];
            }
            else {
                var selectAll = contextObj.fieldObject.find(function (item) { return item.FieldId === 1463 })

                selectAll.IsEnabled = false;
                selectAll.IsVisible = false;

                contextObj.itemsSource = temp;
                contextObj.notificationService.ShowToaster("No PM Schedules exist or Work Orders already generated for the selected criteria", 2);
                contextObj.enableMenu = [];
            }
        });
    }

    public setDate(date: any) {
        var d = date;
        let hour: string;
        let min: string;
        let h: number;
        let m: number;
        let meridian: string;
        let strdate: string;
        let strmonth: string;
        let strYear: string;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        strdate = d.getDate().toString();
        if (Number(strdate) < 10)
            strdate = "0" + Number(strdate)
        strmonth = d.getMonth().toString();
        var currentMonth = monthNames[d.getMonth()];
        strYear = d.getFullYear().toString();
        if (d.getHours() > 12) {
            meridian = "PM";
            h = d.getHours() % 12;
            if (h < 10) {
                hour = "0" + h.toString();
            }
            else {
                hour = h.toString();
            }
        }
        else {
            meridian = "AM";
            if (d.getHours() == 12) {
                h = 12;
                hour = "00";
            }
            else {
                h = d.getHours();
                hour = "0" + h.toString();
            }
        }
        m = d.getMinutes();
        if (m < 10) {
            min = "0" + m.toString();
        }
        else {
            min = m.toString();
        }
        this.selectedDateValue = strdate + " " + currentMonth + " " + strYear + " " + hour + ":" + min + " " + meridian;
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.target = 1;
                this.generateClick();
                break;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.getlistDataForDynamic(event);
    };

    getlistDataForDynamic(event: any)
    {
        var contextObj = this;
        if (Number(contextObj.numberOfDays) >= 0) {
            this.workOrderService.getGenerateWorkOrderListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.numberOfDays, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else {
            this.workOrderService.getGenerateWorkOrderListDataHavingDate(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.date, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
    }

    public generateClick() {
        var contextObj = this;
        this.inputItems.selectedIds = [];
        var arrayList = new Array<ReportFieldArray>();
        var sitelist = [];
       
        for (let i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Select All"] == true) {
                this.inputItems.selectedIds.push(this.itemsSource[i]["PMId"]);
                arrayList.push({
                    ReportFieldId: 5563,
                    Value: this.itemsSource[i]["PMIdProcedureIdAndNextPMDate"]
                });
                sitelist.push(this.itemsSource[i]["SiteId"]);
            }
        }
        for (let i = 0; i < sitelist.length-1; i++) {
           
            if (sitelist[i] != sitelist[i + 1]) {
                this.notificationService.ShowToaster("Select PM(s) of same site", 2);
                return;
            }
        }
        this.siteId = sitelist[0];
        this.selectedId = this.inputItems.selectedIds.length;
        if (this.inputItems.selectedIds.length > 0) {
            contextObj.gridDetails = JSON.stringify(arrayList);
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;

        } else {
            this.notificationService.ShowToaster("Select a PM", 2);
        }
    }

    OnSuccessfulSubmit(event: any) {
        //if (event["status"] == "success") {
        //    let retUpdatedSrc;
        //    if (this.action == "add") {
        //        retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //        this.totalItems = retUpdatedSrc["itemCount"];
        //    }
        //    else if (this.action == "edit") {
        //        retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //    }
        //    this.itemsSource = retUpdatedSrc["itemSrc"];
        //    this.splitviewInput.showSecondaryView = false;
        //}
    }

    generateSuccess(event: any) {
        console.log("generate", event["status"]);
        if (event["status"] == "success") {
            this.target = 0;
            this.splitviewInput.showSecondaryView = false;

            if (Number(this.numberOfDays) >= 0)
                this.loadDataHaveNumberofDays();
            else
                this.loadDataHaveDate();
        }
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
