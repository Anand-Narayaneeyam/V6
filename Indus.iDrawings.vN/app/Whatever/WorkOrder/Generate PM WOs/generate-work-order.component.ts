import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { GenerateWorkOrderListComponent } from './generate-work-order-list.component';
import { CalendarComponent } from '../../../framework/whatever/calendar/calendar.component';

@Component({
    selector: 'generate-work-order',
    templateUrl: './app/Views/WorkOrder/Generate PM WOs/generate-work-order.component.html',
    directives: [Notification, FieldComponent, TabsComponent, TabComponent, GenerateWorkOrderListComponent, PageComponent, CalendarComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService],
    encapsulation: ViewEncapsulation.None
})

export class GenerateWorkOrderComponent implements OnInit {
    fieldDetailsGenerateWorkOrder: IField[];
    selectedId: any;
    btnName: string;
    siteId: any;
    equipmentCategoryId: any;
    equipmentClassId: any;
    routeId: any;
    scheduleTypes: IField;
    isGenral: boolean;
    isRoutes: boolean;
    generateWorkOrderListTab: boolean = false;
    selectedTab: number = 0;
    localselection: number;
    deleteIndex: number;
    workTypeId: any;
    numberOfDays: any;
    date: string;
    pageTitle: string = "General Settings";
    pagePath = "Work Order / Generate PM WOs";
    calenderFlag: boolean;
    calenderFlagSet: boolean;
    dynamicFlagSet: boolean;
    nextbuttonFlag: boolean;
    calendarObj: CalendarObjArray[];
    calenderDate: string;
    blnBlockPrevClick: boolean = true;

    constructor(private workOrdereService: WorkOrdereService, private notificationService: NotificationService) {
    }

    ngOnInit() {

        this.btnName = "Next";
        this.equipmentClassId = "-1";
        this.calenderFlag = false;
        this.calenderFlagSet = false;
        this.dynamicFlagSet = true;
        this.nextbuttonFlag = false;
        this.onload();
    }

    private onload() {
        var contextObj = this;
        this.workOrdereService.generateWorkOrderFields().subscribe(function (resultData) {

            if (resultData["Data"] != null || resultData["Data"] != undefined) {
                //  contextObj.fieldDetailsGenerateWorkOrder = resultData["Data"];
                var workType = resultData["Data"].find(function (item) {
                    return item.FieldId === 1438;
                });

                if (workType.LookupDetails.LookupValues != null || workType.LookupDetails.LookupValues != undefined) {
                    if (workType.LookupDetails.LookupValues.length == 1) {
                        var id = workType.LookupDetails.LookupValues[0].Id;
                        workType.FieldValue = id.toString();
                        workType.IsEnabled = false;
                        contextObj.workTypeId = id.toString();
                    }
                }
                contextObj.fieldDetailsGenerateWorkOrder = resultData["Data"];
            }
            else
                contextObj.fieldDetailsGenerateWorkOrder = resultData["Data"];
        });
    }

    onNextClick(event) {
        

        if (this.calenderFlag == false) {

            var contextObj = this;
            this.routeId;
            this.equipmentCategoryId;
            if ((this.routeId == undefined && this.equipmentCategoryId == undefined) || (this.routeId == undefined && this.equipmentCategoryId == -1) || (this.routeId == -1 && this.equipmentCategoryId == undefined) || (this.routeId == -1 && this.equipmentCategoryId == -1) || (this.routeId <= 0 && this.equipmentCategoryId <= 0)) {
                contextObj.notificationService.ShowToaster("Select Route or Equipment Category", 2);
                return;
            }


            // var temp = JSON.parse(event["fieldobject"]);
            var temp = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                return item.FieldId === 1434;
            });
            this.numberOfDays = temp["FieldValue"];
            var contextObj = this;
            this.localselection = 1;
            contextObj.generateWorkOrderListTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 100);

        }
        else {
            this.nextbuttonFlag = true;
            // this.calenderFlagSet = true;
            // this.dynamicFlagSet = false;

            var contextObj = this;

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var time;
            var currentTime = new Date();
            var day = currentTime.getDate()
            var month = monthNames[currentTime.getMonth()];
            var year = currentTime.getFullYear();
            if (Number(day) > 10)
                time = day + " " + month + " " + year;
            else
                time = "0" + day + " " + month + " " + year;

            if ((this.routeId == undefined && this.equipmentCategoryId == undefined) || (this.routeId == undefined && this.equipmentCategoryId == -1) || (this.routeId == -1 && this.equipmentCategoryId == undefined) || (this.routeId == -1 && this.equipmentCategoryId == -1) || (this.routeId <= 0 && this.equipmentCategoryId <= 0)) {
                contextObj.notificationService.ShowToaster("Select Route or Equipment Category", 2);
                this.calenderFlagSet = false;
                this.dynamicFlagSet = true;
                return;
            }

            this.calenderFlagSet = true;
            this.dynamicFlagSet = false;

            if (this.routeId == undefined || Number(this.routeId) < 0 || this.routeId == null)
                this.routeId = "0";
            else if (this.equipmentCategoryId == undefined || Number(this.equipmentCategoryId) < 0 || this.equipmentCategoryId == null)
                this.equipmentCategoryId = "0";
            else if (this.equipmentClassId == undefined || Number(this.equipmentClassId) < 0 || this.equipmentClassId == null)
                this.equipmentClassId = "0";

            contextObj.calenderDate = time;
            contextObj.workOrdereService.getGenerateWorkOrderCalenderList(time, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                
                var data = JSON.parse(resultData["Data"].FieldBinderData);

                var arrayList = new Array<CalendarObjArray>();

                for (let i = 0; i < data.length; i++) {
                    arrayList.push({
                        strDate: data[i].Day,
                        count: Number(data[i].PMCount)
                    });
                }

                contextObj.calendarObj = arrayList;
            });
        }
    }

    getSelectedTab(event: any) {

        //  this.generateWorkOrderListTab = false;
        //this.onload();
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.generateWorkOrderListTab = false;
        }
    }

    onTabClose(event: any) {

        this.generateWorkOrderListTab = false;
        this.selectedTab = event[0];

        var contextObj = this;
        if (this.calenderFlag == true) {
            contextObj.workOrdereService.getGenerateWorkOrderCalenderList(contextObj.calenderDate, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
                

                contextObj.calendarObj = [];
                var data = JSON.parse(resultData["Data"].FieldBinderData);

                var arrayList = new Array<CalendarObjArray>();

                for (let i = 0; i < data.length; i++) {
                    arrayList.push({
                        strDate: data[i].Day,
                        count: Number(data[i].PMCount)
                    });
                }

                contextObj.calendarObj = arrayList;
            });
        }
        //  this.onload();
    }

    fieldChange(event: any) {

        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        if (fieldLabel == "Route") {
            this.routeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            if (this.routeId > -1) {
                var equipmentCategory = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                    return item.FieldId === 1436;
                });
                equipmentCategory.IsEnabled = false;

                var equipmentClass = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                    return item.FieldId === 1437;
                });
                equipmentClass.IsEnabled = false;
            }
            else {
                var equipmentCategory = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                    return item.FieldId === 1436;
                });
                equipmentCategory.IsEnabled = true;

            }

        } else if (fieldLabel == "Equipment Category") {

            var route = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                return item.FieldId === 1435;
            });
            route.IsEnabled = false;
            //  route.IsVisible = false;

            this.equipmentCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var equipmentClass = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                return item.FieldId === 1437;
            });
            if (this.equipmentCategoryId > -1) {
                var equipmentCategoryFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                if (this.equipmentCategoryId > -1 && equipmentCategoryFieldId == 1436) {
                    equipmentClass.IsEnabled = true;
                    equipmentClass.IsVisible = true;
                    this.workOrdereService.loadGenerateWorkOrderEquipmentClass(equipmentCategoryFieldId, this.equipmentCategoryId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            var ddlEquipmentClass = contextObj.fieldDetailsGenerateWorkOrder.find(function (item) { return item.ReportFieldId === 647 })
                            ddlEquipmentClass.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        }
                    });
                }
            }
            else {
                var route = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                    return item.FieldId === 1435;
                });
                route.IsEnabled = true;
                var equipmentClass = this.fieldDetailsGenerateWorkOrder.find(function (item) {
                    return item.FieldId === 1437;
                });
                equipmentClass.IsEnabled = false;
                equipmentClass.FieldValue = "-1";
                this.equipmentClassId = "-1";
            }
        }
        else if (fieldLabel == "Equipment Class") {
            this.equipmentClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        }
        else if (fieldLabel == "Work Type") {
            this.workTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        }
    }

    checkBoxClick(event: any) {
        var contextObj = this;
        

        this.calenderFlag = event.currentTarget.checked;
        if (this.calenderFlag == true) {
            var numberOfDays = contextObj.fieldDetailsGenerateWorkOrder.find(function (item) {
                return item.FieldId === 1434;
            });
            numberOfDays.IsEnabled = false;
            numberOfDays.IsVisible = false;
            numberOfDays.IsMandatory = false;
            numberOfDays.FieldValue = "";
            numberOfDays.IsLocallyValidated = true;
            numberOfDays.HasValidationError = false;
            if (this.nextbuttonFlag = false) {
                this.calenderFlagSet = true;
                this.dynamicFlagSet = false;
            }

        }
        if (this.calenderFlag == false) {
            contextObj.fieldDetailsGenerateWorkOrder
            var numberOfDays = contextObj.fieldDetailsGenerateWorkOrder.find(function (item) {
                return item.FieldId === 1434;
            });
            numberOfDays.IsEnabled = true;
            numberOfDays.IsVisible = true;
            numberOfDays.IsMandatory = true;
            this.calenderFlagSet = false;
            this.dynamicFlagSet = true;
            numberOfDays.IsLocallyValidated = false;
            numberOfDays.HasValidationError = true;
            contextObj.calendarObj = null;

            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("1434"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
            }, 20);
            
        }
        
    }
    prevMonClick(event: any) {
        
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonth = monthNames[month];

        var currentDate = "01 " + currentMonth + " " + year;

        //var currentDateSample = new Date(currentDate);
        //var prevDate = new Date(event.selectedDate);
        if (currentDate == event.selectedDate)
            this.blnBlockPrevClick = true;
        else
            this.blnBlockPrevClick = false;

        var contextObj = this;
        contextObj.calendarObj = null;
        contextObj.workOrdereService.getGenerateWorkOrderCalenderList(event.selectedDate, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
            
            var data = JSON.parse(resultData["Data"].FieldBinderData);

            var arrayList = new Array<CalendarObjArray>();

            for (let i = 0; i < data.length; i++) {
                arrayList.push({
                    strDate: data[i].Day,
                    count: Number(data[i].PMCount)
                });
            }

            contextObj.calendarObj = arrayList;
        });
    }
    nextMonClick(event: any) {
        

        var contextObj = this;
        contextObj.blnBlockPrevClick = false;
        contextObj.calendarObj = null;
        contextObj.workOrdereService.getGenerateWorkOrderCalenderList(event.selectedDate, contextObj.routeId, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.workTypeId).subscribe(function (resultData) {
            
            var data = JSON.parse(resultData["Data"].FieldBinderData);

            var arrayList = new Array<CalendarObjArray>();

            for (let i = 0; i < data.length; i++) {
                arrayList.push({
                    strDate: data[i].Day,
                    count: Number(data[i].PMCount)
                });
            }

            contextObj.calendarObj = arrayList;
        });
    }
    btnClick(event: any) {
        
        
        this.numberOfDays = "-1";
        this.date = event.selectedDate;
        this.calenderDate = event.selectedDate;;
        var contextObj = this;
        this.localselection = 1;
        contextObj.generateWorkOrderListTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    }
}

export interface CalendarObjArray {
    strDate: string,
    count: number
}
