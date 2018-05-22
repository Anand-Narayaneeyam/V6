import {Component, ElementRef, Renderer, Output, Input, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'field-relation',
    templateUrl: 'app/Views/Common/Additional Data Fields/fieldrelation.component.html',
    inputs: ['fieldobject','ddlParentName'],
    directives: [ListComponent, CardComponent, FieldComponent, DropDownListComponent, Notification, ListBoxComponent, SlideComponent],
    providers: [AdministrationService, NotificationService],
})

export class FieldRelation
{
    public header1 = "Id";
    public header2 = "fieldvalue";
    @Input() ddlParentName;
    @Input() fieldobject;
    @Input() category;
    @Output() closerelation = new EventEmitter();
    selId =[];
    childValueList: IField;
    parentValueList;
    parentFieldValue:any;
    childFieldValue:any;
    ddlchildField: IField;
    position = "top-left";
    showSlide = false;   
    hasRelation = false;
    disable = true;

    constructor(private el: ElementRef, private administrationService: AdministrationService, private _notificationService: NotificationService)
    {

    } 

    ngOnInit(): void {
        this.childValueList;
    }

    onddlChange(value: any)
    {
        this.childFieldValue = "0";
        this.parentFieldValue = value;
        this.childValueList = undefined;
        this.selId = [];
        this.hasRelation = false;
        this.disable = true;
        if (value == "0") {
            this.parentValueList = undefined;
            this.ddlchildField = undefined;        
        }
        else {
            this.administrationService.GetAdditionalDataFieldLookupValues(value).subscribe(list => this.parentValueList = list["data"]);
            this.administrationService.getValidatedFieldValues(value).subscribe(list =>this.ddlchildField = list["data"]); 
            //this.administrationService.GetPossibleChildFields(value).subscribe(list => console.log(this.ddlchildField = list["data"]));
            //this.el.nativeElement.children[1].children[0].value=0;
        }
    }

    onddlchildChange(value: any) {
        if (value== "0") {
            this.childValueList = undefined;
            this.childFieldValue = "0";
            this.disable = true;
        }
        else {
            this.hasRelation = true;    /*this.administrationService.IsRelationExists(value).subscribe(list => console.log(this.parentValueList = list["data"]));*/
            this.disable = false;
            this.childFieldValue = value;
            this.administrationService.getChildFieldValuesData(value).subscribe(
                fieldDetails => this.childValueList = fieldDetails["data"]);     
        }
    }

    checkSelected(value: any)
    {
        if (value == this.parentFieldValue)
            return true;
        else
            return false;
    }

    Submit()
    {
        this.selId;
        if (this.parentFieldValue == "0" || this.childFieldValue=="0")
        {
            if (this.parentFieldValue=="0")
                this._notificationService.ShowToaster("Select Parent Field", 4);
            else
                this._notificationService.ShowToaster("Select Child Field", 4);
        }
        else
        {        
            if (this.selId.length <= 0) {
                this._notificationService.ShowToaster("Select Parent Lookup Value", 5);
            }
            else {
                this.administrationService.DeleteAdditionalFieldRelation(this.parentFieldValue, this.childFieldValue);
                this.administrationService.UpdateAdditionalDataFieldRelation(this.parentFieldValue, this.childFieldValue);
                this.childValueList.MultiFieldValues.forEach((item, index) => {
                    this.administrationService.SetDataDFieldRelation(this.selId[0], item);
                });
            }
        }      
    }

    removeRelation()
    {
        this.showSlide = true;   
    }

    close()
    {
        this.closerelation.emit({
        })
    }
    okDelete($event) {
        this.administrationService.DeleteAdditionalFieldRelation(this.parentFieldValue, this.childFieldValue);
        this.parentValueList = undefined;
        this.ddlchildField = undefined;
        this.hasRelation = false;
        this.childValueList = undefined;
        this.el.nativeElement.children[1].children[0].value = 0;
        this.parentFieldValue = "0";
        this.childFieldValue = "0";
        this.selId = [];    
        this.showSlide = false;   
    }

    cancelClick(value: any) {
        this.showSlide = false;   
    }
    closeSlideDialog(value: any) {
        this.showSlide = false;
    }

    cardClick(value: any)
    {
        if(this.childFieldValue!="0")
            this.administrationService.GetAdditionalDataFieldValuesMapping(this.parentFieldValue, this.childFieldValue, value).subscribe(
                fieldDetails => this.childValueList = fieldDetails["data"]);     
    }

}