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
import { CateringCustomadd } from './Catering-listCustomadd.component';

@Component({
    selector: 'Catering-listforreservation',
    templateUrl: './app/Views/Scheduling/Room Booking/Catering-listforreservation.component.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, CateringCustomadd],
    providers: [SchedulingService, NotificationService],
    inputs: ['CateringField']
})

export class Catering implements OnInit {
    public CateringField: IField[];
    list: any;
    Cateringvalueforinsert: string = "";
    Catering: any[];
    ShowinListItem: string;
    @Output() CateringList = new EventEmitter();
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
        var tempCateringList = "";
        ContextObj.Cateringvalueforinsert = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Catering.pop();
        for (let i = 0; i < ContextObj.Catering.length; i++) {
            tempCateringList = ContextObj.Catering[i]["InsertValue"];
            ContextObj.Cateringvalueforinsert = ContextObj.Cateringvalueforinsert + tempCateringList;
        }
        ContextObj.CateringList.emit({ "CateringList": ContextObj.Cateringvalueforinsert });
    }
    Remove() {
        var ContextObj = this;
        var temp = ContextObj;
    }
    OnSuccessfulSubmit(event: any) {
        var ContextObj = this;
        var tempCateringList = "";
        ContextObj.Cateringvalueforinsert = event["Cateringvalue"];
        ContextObj.Catering = event["arrayList"];
        for (let i = 0; i < ContextObj.Catering.length; i++) {
            ContextObj.ShowinListItem = ContextObj.Catering[i]["Value"];
            var entry = <HTMLLIElement>document.createElement('li');
            entry.id = i.toString();          
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.CateringList.emit({ "CateringList": ContextObj.Cateringvalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    }
}