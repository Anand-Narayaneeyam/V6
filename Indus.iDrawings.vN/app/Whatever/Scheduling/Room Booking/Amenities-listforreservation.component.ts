import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DynamicListComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { AmenitiesCustomadd } from './Amenities-listcustomadd.componet';

@Component({
    selector: 'Amenities-listforreservation',
    templateUrl: './app/Views/Scheduling/Room Booking/Amenities-listforreservation.component.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, AmenitiesCustomadd],
    providers: [SchedulingService, NotificationService],
    inputs: ['AmenitiesField']
})

export class Amenities implements OnInit {
    public AmenitiesField: IField[];
    list: any;
    Amnietyvalueforinsert: string = "";
    Amniety: any[];
    ShowinListItem: string;
    @Output() AmnietyList = new EventEmitter();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    ngOnInit() {
    }
    listbuttonadd(event: any) {
        var ContextObj = this;
        ContextObj.list = event["List"];
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    }
    listbuttondelete(event: any) {
        var ContextObj = this;
        var tempamniteesList = ""; 
        ContextObj.Amnietyvalueforinsert = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Amniety.pop();
        for (let i = 0; i < ContextObj.Amniety.length; i++) {
            tempamniteesList = ContextObj.Amniety[i]["InsertValue"];
            ContextObj.Amnietyvalueforinsert = ContextObj.Amnietyvalueforinsert + tempamniteesList;
        }
        ContextObj.AmnietyList.emit({ "AmnietyList": ContextObj.Amnietyvalueforinsert });
    }
    Remove() {
        var ContextObj = this;
        var temp = ContextObj;         
    }
    OnSuccessfulSubmit(event: any) {
        var ContextObj = this;
        var tempInviteesList = "";        
        ContextObj.Amnietyvalueforinsert = event["Amenityvalue"];
        ContextObj.Amniety = event["arrayList"];
        for (let i = 0; i < ContextObj.Amniety.length; i++) {           
            ContextObj.ShowinListItem = ContextObj.Amniety[i]["Value"];            
            var entry = <HTMLLIElement>document.createElement('li');
            entry.id = i.toString();            
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.AmnietyList.emit({ "AmnietyList": ContextObj.Amnietyvalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;  
    }
}