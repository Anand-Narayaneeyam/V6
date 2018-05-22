import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DynamicListComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component';
import {Inviteescheckboxgrid} from './Invitees-checkboxgrid.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';

@Component({
    selector: 'Invitees-list',
    templateUrl: './app/Views/Scheduling/Room Booking/Invitees-list.component.html',
    directives: [FieldComponent, Notification, SlideComponent, DynamicListComponent, SplitViewComponent, Inviteescheckboxgrid],
    providers: [SchedulingService, NotificationService],
    inputs: ['InviteesField']
})

export class Invitees implements OnInit {
    public InviteesField: IField[];
    pageTitle: string = "Invitees";
    Checkboxvalues: any[];
    InviteesListForInsert: string="";
    ShowinListItem: string;
    list: any;
    Selectedhtml: any;
    SelectedLiId: any;
    @Output() InviteesList = new EventEmitter();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    ngOnInit() {
    }
    onSubmitData(event: any) {
    }
    listbuttonadd(event: any) {
        var ContextObj = this;
        ContextObj.list = event["List"];
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    }
    listbuttondelete(event: any) {
        var ContextObj = this;
        var tempInviteesList = "";
        document.getElementById(ContextObj.list.lastElementChild.id).remove();
        ContextObj.Checkboxvalues.pop();
        for (let i = 0; i < ContextObj.Checkboxvalues.length; i++) {
            tempInviteesList = ContextObj.Checkboxvalues[i]["Value"].split("µ")[0] + "µ" + ContextObj.Checkboxvalues[i]["Value"].split("µ")[1];
            ContextObj.ShowinListItem = ContextObj.Checkboxvalues[i]["Value"].split("µ")[2];
            ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§"
        }
        ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });      
    }
    Remove() {
        var ContextObj = this;
        var temp = ContextObj;
        //ContextObj.Selectedhtml = temp;
        //ContextObj.SelectedLiId = ContextObj.Selectedhtml.id;         
    }
    OnSuccessfulSubmit(event: any) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Checkboxvalues = [];
        ContextObj.Checkboxvalues = event["arrayList"];
        for (let i = 0; i < ContextObj.Checkboxvalues.length; i++) {
            tempInviteesList = ContextObj.Checkboxvalues[i]["Value"].split("µ")[0] + "µ" + ContextObj.Checkboxvalues[i]["Value"].split("µ")[1];
            ContextObj.ShowinListItem = ContextObj.Checkboxvalues[i]["Value"].split("µ")[2];           
            ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§"
            var entry = <HTMLLIElement>document.createElement('li');
            entry.id = i.toString();          
            entry.innerHTML = ContextObj.ShowinListItem;
            ContextObj.list.appendChild(entry);
        }
        var lis = document.getElementById("dlist").getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', this.Remove, false);
        }
        ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;  
    }
}