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
import { ServicesCustomadd } from './CustomServiceAdd.component';

@Component({
    selector: 'Services-listforresrvation',
    templateUrl: './app/Views/Scheduling/Room Booking/Services-listforresrvation.component.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, ServicesCustomadd],
    providers: [SchedulingService, NotificationService],
    inputs: ['ServiceField']    
})

export class Services implements OnInit {
    public ServiceField: IField[];
    list: any;
    Servicevalueforinsert: string = "";
    Service: any[];
    ShowinListItem: string;
    @Output() ServiceList = new EventEmitter();
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
        var tempServiceList = "";
        ContextObj.Servicevalueforinsert = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Service.pop();
        for (let i = 0; i < ContextObj.Service.length; i++) {
            tempServiceList = ContextObj.Service[i]["InsertValue"];
            ContextObj.Servicevalueforinsert = ContextObj.Servicevalueforinsert + tempServiceList;
        }
        ContextObj.ServiceList.emit({ "ServiceList": ContextObj.Servicevalueforinsert });
    }
    Remove() {
        var ContextObj = this;
        var temp = ContextObj;
    }
    OnSuccessfulSubmit(event: any) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Servicevalueforinsert = event["Servicevalue"];
        ContextObj.Service = event["arrayList"];
        for (let i = 0; i < ContextObj.Service.length; i++) {
            ContextObj.ShowinListItem = ContextObj.Service[i]["Value"];
            var entry = <HTMLLIElement>document.createElement('li');
            entry.id = i.toString();           
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.ServiceList.emit({ "ServiceList": ContextObj.Servicevalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    }
}