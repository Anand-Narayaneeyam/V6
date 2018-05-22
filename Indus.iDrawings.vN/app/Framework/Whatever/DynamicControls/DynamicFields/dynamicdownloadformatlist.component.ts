import {Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';
import {IField, ILookupValues} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive'
import { NgModel } from '@angular/forms';


@Component({
    selector: 'DynamicDownloadFormatListComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/dynamicdownloadformatlist.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]
})

export class DynamicDownloadFormatListComponent implements OnInit {

    public fieldObject: IField;
    public selectedId: number = -1;
    strClassName: string = "";
    @Input() validationData;
    @Input() imgsrc1: string = "Content/list_adD.png";
    @Input() imgsrc2: string = "Content/list_removE.png";
    @Input() enableButton: boolean = true;
    @Output() dynamicListAdd = new EventEmitter<IDynamiclist>()
    @Output() dynamicListRemove = new EventEmitter<IDynamiclist>()
    constructor() {
    }

    ngOnInit() {
    }

    addListItem(event, list) {
        this.dynamicListAdd.emit({
            FieldObject: this.fieldObject,
            List: list,
            SelectedId: this.selectedId
        });
    }
    keyForDeleteOrAdd(event, dlist, id) {

        if (event.keyCode == 13 && id == 1) {
            this.addListItem(event, dlist);
        }
        else if (event.keyCode == 13 && id == 2) {
            this.removeListItem(event, dlist);
        }
        else if (event.keyCode == 46 && id == 3) {
            this.removeListItem(event, dlist);
        }
        else if (event.keyCode == 13 && id == 4) {
            this.addListItem(event, dlist);
        }
    }

    dlistClick(event) {

        var id = event.target.id;
        // var id = event.srcElement.id;
        if (id != "dlist") {
            if (id != undefined) {
                if (id != -1) {
                    this.selectedId = id;
                    var elem = document.getElementById(id);
                    if (elem) {
                        elem.style.backgroundColor = "rgb(153, 204, 255)";
                        elem.style.color = "white";
                    }
                }
                if (this.fieldObject != undefined) {
                    if (this.fieldObject.LookupDetails.LookupValues != undefined) {
                        for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                            var elem = document.getElementById(this.fieldObject.LookupDetails.LookupValues[i].Id.toString() + "li" + this.fieldObject.ReportFieldId.toString());
                            if (elem) {
                                if (elem.id == this.selectedId.toString()) {
                                    elem.style.backgroundColor = "rgb(153, 204, 255)";
                                    elem.style.color = "white";
                                }
                                else {
                                    elem.style.backgroundColor = "white";
                                    elem.style.color = "black";
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    removeListItem(event, list) {
        if (this.fieldObject.LookupDetails.LookupValues != undefined) {
            if (this.selectedId != -1) {
                var selectedLiId = this.selectedId.toString().replace("li" + this.fieldObject.ReportFieldId.toString(), "").trim();
                for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                    if (this.fieldObject.LookupDetails.LookupValues[i].Id == Number(selectedLiId)) {
                        this.fieldObject.LookupDetails.LookupValues[i].Id = null;
                        this.fieldObject.LookupDetails.LookupValues[i].Value = null;
                        this.fieldObject.LookupDetails.LookupValues.splice(i, 1);
                    }
                }
                this.fieldObject = JSON.parse(JSON.stringify(this.fieldObject));
            }
        }
        this.dynamicListRemove.emit({
            FieldObject: this.fieldObject,
            List: list,
            SelectedId: this.selectedId
        });
        this.selectedId = -1;
    }
}

export interface IDynamiclist {
    FieldObject: IField,
    List: any,
    SelectedId: number
}