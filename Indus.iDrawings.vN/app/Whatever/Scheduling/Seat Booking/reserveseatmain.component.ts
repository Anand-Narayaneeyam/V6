import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {ReserveSeatComponenet } from './reserveseats.component';
import {ReserveRoomSchedulingOpenDrawing } from '../drawings/reserveroom.schedulingopendrawing.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
@Component({
    selector: 'reserveseatmain',
    templateUrl: './app/Views/Scheduling/Seat Booking/reserveseatmain.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, ReserveSeatComponenet, ReserveRoomSchedulingOpenDrawing],
    providers: [HTTP_PROVIDERS, SchedulingService],
    encapsulation: ViewEncapsulation.None
})

export class ReserveseatsMainComponenet {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    selectedTab: number = 0;
    viewDrawing: boolean = false;
    drawingId: number;
    IsOpenDrawingComponentActive: boolean = false;
    isSpecialRoom: boolean = false;
    closeTbFuns: any = undefined;
    selectedData: any;
    pagePath: string = "Scheduling / Reserve Workspace";
    localselection: number;
    deleteIndex: number;
    isFromRoomClick: boolean = false;
    seattxt = "Workspace";
    constructor(private schedulingService: SchedulingService) {
    }
    ngOnInit() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
                contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
            }
        });
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
        
    }
    getSelectedTab(event: any) {

        this.selectedTab = event[0];
        if (this.selectedTab == 0 && event[1] == true)
            this.onFirstTabClick();
        //this.deleteIndex = 0;
        //if (this.localselection > 0 && event[0] == 0) {
        //    this.deleteIndex = this.localselection;

        //}
    }
    floorCellOnClick(event: any) {
        debugger
        if (event['isFromRoomClick'] == true)
            this.isFromRoomClick = true;
        else
            this.isFromRoomClick = false;
        this.drawingId = event["selRowData"]["DrawingId"];
        this.selectedData = event["selRowData"];
        this.isSpecialRoom = event["isSpecialRoom"];
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve "+ contextObj.seattxt+" / Daily Reservation Summary";
        if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
            contextObj.deleteIndex = 1;
            this.IsOpenDrawingComponentActive = false;
            this.viewDrawing = false;
        }
        setTimeout(function () {
            contextObj.viewDrawing = true;
            contextObj.deleteIndex = 0;
        }, 50);
        this.localselection = 1;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 200);
        setTimeout(function () {
            contextObj.IsOpenDrawingComponentActive = true;
        }, 250);
    }
    //onTabBeforeClose($event) {
    //    var contextObj = this;
    //    contextObj.closeTbFuns = $event;
    //    this.onTabClose();
    //}
    //onTabClose() {
    //    var callBackForCloseTab = this.closeTbFuns[1];
    //    var selectedTabObj = this.closeTbFuns[2];
    //    var tabContextObj = this.closeTbFuns[3];
    //    callBackForCloseTab(selectedTabObj, tabContextObj, "out");

    //}
    onTabClose(event: any) {
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.localselection = 0;
        this.pagePath = "Scheduling / Reserve " + this.seattxt;
    }
    onFirstTabClick() {

        this.deleteIndex = 1;
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.localselection = 0;
        this.pagePath = "Scheduling / Reserve " + this.seattxt;
    }
}