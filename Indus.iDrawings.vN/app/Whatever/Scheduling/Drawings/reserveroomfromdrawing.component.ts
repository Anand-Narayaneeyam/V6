import {Component, ChangeDetectorRef, EventEmitter, Output, Input, ViewEncapsulation, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {RoomBookingComponent} from '../../../framework/whatever/scheduler/roombooking.component';

@Component({
    selector: 'reserveroomfromdrawing',
    templateUrl: './app/Views/Scheduling/Drawings/reserveroomfromdrawing.component.html',
    directives: [TabsComponent, TabComponent, RoomBookingComponent],
    encapsulation: ViewEncapsulation.None
})
export class ReserveRoomFromDrawing{
    @Input() spaceDataItem: any;
    selectedTab: number = 0;

}