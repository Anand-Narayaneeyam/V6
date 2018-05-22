import { Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { AsbuiltService } from '../../../Models/Asbuilts/asbuilt.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'drawing-addEdit',
    templateUrl: 'app/Views/Common/Additional Data Fields/addl-datafield_addedit.html',
    directives: [FieldComponent],
    providers: [AsbuiltService, NotificationService],
    inputs: ['selectedId', 'addEdit']
})

export class AdditionalDataFieldomponentAddEdit implements OnInit {
    public fieldDetailsAddEdit: IField[];
    btnName: string = "Add";
    dataKey: string = "DrawingId";
    selectedId: number;
    addEdit: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private asbuiltService: AsbuiltService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        if (this.addEdit == "add") {
            this.btnName = "ADD";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "EDIT";
        }
    }

    onSubmitData(event) {
        if (this.addEdit == "add") {
            this.notificationService.ShowToaster("Drawing added", 3);
        }
        else if (this.addEdit == "edit") {
            //this.asbuiltService.editDescrition(event[0]);
            this.notificationService.ShowToaster("Drawing updated", 3);
        }
        this.submitSuccess.emit("success");
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "ADD";
        }
        else if (changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "EDIT";
            this.asbuiltService.getDrawingtEditDiscriptionFields(this.selectedId, this.addEdit).
                subscribe(resultData => this.fieldDetailsAddEdit = resultData["data"]);
        }
    }
}