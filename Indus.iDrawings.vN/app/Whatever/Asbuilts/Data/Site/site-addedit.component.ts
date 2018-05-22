import {Component,Output, OnInit,SimpleChange,OnChanges,EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import {AdministrationService} from '../../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField'


@Component({
    selector: 'site-addEdit',
    templateUrl: 'app/Views/Asbuilts/Data/site-addedit.html',
    providers: [AdministrationService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'addEdit']

})

export class SiteAddEditComponent implements OnInit  {
    public fieldDetailsSpaceEdit: IField[];
    btnName: string ;
    selectedId: number;
    addEdit: string;
    @Output() submitSuccess = new EventEmitter();
 
    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService) {

    }


    ngOnInit() {
        if (this.addEdit == "add")
            this.btnName = "Add"
        else if (this.addEdit == "edit")
            this.btnName = "Edit"
    }
   
    onSubmitData(event) {
        if (this.addEdit == "add") {
            this.administrationService.submitSiteAdd(this.fieldDetailsSpaceEdit);
            this._notificationService.ShowToaster("Site Added",3);
        }
        else if (this.addEdit == "edit") {
            this.administrationService.submitSiteEdit(this.fieldDetailsSpaceEdit, this.selectedId);
            this._notificationService.ShowToaster("Site Updated", 3);

        }
        this.submitSuccess.emit("success");       
    }
    
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
       
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Add"
            this.administrationService.loadSiteAddEdit(this.selectedId, this.addEdit).subscribe(resultData => this.fieldDetailsSpaceEdit = resultData["data"])
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Edit"
            this.administrationService.loadSiteAddEdit(this.selectedId, this.addEdit).subscribe(resultData => this.fieldDetailsSpaceEdit = resultData["data"])
        }
    }

}