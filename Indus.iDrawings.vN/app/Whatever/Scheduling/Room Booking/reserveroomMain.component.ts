import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, AfterViewChecked, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {ReserveroomComponenet } from './reserveroom.component';
import {ReserveRoomSchedulingOpenDrawing } from '../drawings/reserveroom.schedulingopendrawing.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
@Component({
    selector: 'reserveroommain',
    templateUrl: './app/Views/Scheduling/Room Booking/reserveroomMain.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, ReserveroomComponenet, ReserveRoomSchedulingOpenDrawing],
    providers: [HTTP_PROVIDERS, SchedulingService],
    encapsulation: ViewEncapsulation.None
})

export class ReserveroomMainComponenet {
    selectedTab: number = 0;
    viewDrawing: boolean = false;
    drawingId: number;
    IsOpenDrawingComponentActive: boolean = false;
    closeTbFuns: any = undefined;
    selectedData: any;
    pagePath: string = "Scheduling / Reserve Team Room";
    localselection: number;
    deleteIndex: number;
    isFromRoomClick: boolean = false;
    roomtxt = "Team Room";
    drawingLabel = "Drawing";
    constructor(private schedulingService: SchedulingService) {
    }
    ngOnInit() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {//275
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
                contextObj.pagePath = "Scheduling / Reserve " + contextObj.roomtxt;
            }
        });
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.roomtxt;
        contextObj.schedulingService.checkSubscribedFeature('276').subscribe(function (result) {
            debugger
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.drawingLabel = result["Data"][0].Value;
                
            }
        });
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
    getSelectedData(data: any) {
        this.selectedData = data;
    }
    floorCellOnClick(event: number) {
        if (event['isFromRoomClick'] == true)
            this.isFromRoomClick = true;
        else
            this.isFromRoomClick = false;
        this.drawingId = event['rowData']['DrawingId'];
        this.selectedData = event['rowData'];
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.roomtxt + " / View " + contextObj.drawingLabel;
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
        this.pagePath = "Scheduling / Reserve " + this.roomtxt;
    }
    onFirstTabClick() {

        this.deleteIndex = 1;
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.localselection = 0;
        this.pagePath = "Scheduling / Reserve " + this.roomtxt;
    }
}