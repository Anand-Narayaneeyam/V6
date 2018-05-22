import {Component, Input, Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core'
import {IField, ILookupValues} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive'

@Component({
    selector: 'DropDownListComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/dropdownlistcomponent.component.html',
    inputs: ['fieldObject', 'setAlignment'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]
})

export class DropDownListComponent implements AfterViewInit {

    public fieldObject: IField;
    public ddlFieldObject: IField;
    public selectedLabel: string;
    public setAlignment: string;
    public fieldHeight: number;
    public fieldWidth: string;
    public strPopupstring: string;
    public drplabelWidth: string;
    public drplabelWidthPopup: string;
    public ddlSelectedTitle: string;
    public ischange: boolean = false;
    @Input() blnPopupImage: boolean = true;
    @Input() ShowSelectOption: boolean = true;
    @Input() strPopupText: string;
    @Input() SetAlignment: string;
    @Input() alignContent: string;
    @Input() labelWidth: string;
    @Input() validationData;
    @Output() ddlChange = new EventEmitter<ddlProperties>();
    @Output() popupClick = new EventEmitter();
    el: any;
    constructor(elemRef: ElementRef) {
        this.el = elemRef;
    }

    ngOnInit() {  
        if (this.fieldObject)
        {
            if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue == "") {
            this.fieldObject.FieldValue = "-1";
        }
        else {
            if (this.fieldObject.ReportFieldId > 1000000) {
                if (this.fieldObject.LookupDetails.LookupValues) {
                    var lookupObj: any;
                    if (this.fieldObject.GenericDataTypeId == 2 || this.fieldObject.GenericDataTypeId == 3) {
                        var datevalue: any,
                            datefieldvalue: any,
                            contextObj: any = this;
                        datefieldvalue = new Date(contextObj.fieldObject.FieldValue);
                        this.fieldObject.LookupDetails.LookupValues.find(function (item) {
                            datevalue = new Date(item.Value);
                            if (datefieldvalue && datevalue && datevalue.valueOf() == datefieldvalue.valueOf()) {
                                lookupObj = item;
                                return true;
                            }
                            else
                                return false;
                        });
                    }
                    else {
                        lookupObj = this.fieldObject.LookupDetails.LookupValues.find(item => item.Value == this.fieldObject.FieldValue);
                    }
                    if (lookupObj != null) {
                        this.fieldObject.FieldValue = lookupObj.Id.toString();
                    } else {
                        this.fieldObject.FieldValue = "-1";
                    }

                }
            }
            if (this.fieldObject.ReportFieldId >= 290 && this.fieldObject.ReportFieldId < 300) {
                if (this.fieldObject.LookupDetails.LookupValues) {
                    var lookupObj: any = this.fieldObject.LookupDetails.LookupValues.find(item => item.Value == this.fieldObject.FieldValue);
                    if (lookupObj != null) {
                        this.fieldObject.FieldValue = lookupObj.Id.toString();
                    } else {
                        this.fieldObject.FieldValue = "-1";
                    }
                }
            }
        }
            if (this.SetAlignment == "horizontal") {
                this.setAlignment = "inline-flex";
            }
            else {
                this.setAlignment = "block";
            }
            if (this.labelWidth == undefined) {
                this.drplabelWidth = "auto";
            }
            else {
                this.drplabelWidth = this.labelWidth + "px";
            }
            if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
                this.fieldHeight = this.fieldObject.Height;
            }
            else {
                this.fieldHeight = 30;
            }
            if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
                this.fieldWidth = this.fieldObject.Width;
                if (this.fieldObject.LookupDetails.PopupComponent)
                    this.drplabelWidthPopup = this.labelWidth + 45;
            }
            else {
                this.fieldWidth = "250";
            }
            if ((this.labelWidth != null) || (this.labelWidth != undefined)) {
                this.drplabelWidth = this.labelWidth;
            }
            else {
                this.labelWidth = "150";
            }
            if (this.fieldObject.LookupDetails.LookupValues != null) {
                var selectedId: string = this.fieldObject.FieldValue;
                if (this.fieldObject.IsMandatory == true) {
                    if (selectedId == null || selectedId.length == 0 || selectedId == "-1") {
                        if (this.fieldObject.LookupDetails.LookupValues.length == 1) {
                            this.fieldObject.FieldValue = this.fieldObject.LookupDetails.LookupValues[0].Id.toString();
                            selectedId = this.fieldObject.FieldValue;      
                            this.onddlChange(selectedId);
                            this.ischange = true;                           
                        }
                    }
                }
                for (let i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                    if (this.fieldObject.LookupDetails.LookupValues[i].Id.toString() == selectedId) {
                        this.selectedLabel = this.fieldObject.LookupDetails.LookupValues[i].Value;
                    }
                }                
            }
        }
    }

    ngAfterViewInit()
    {        
        var context: any = this;            
        if (this.ischange)
        {
            setTimeout(function () { 
                context.fireChangeEventOnWindow();
                context.ischange = false;
            }, 100); 
        }                
            
    }

    fireChangeEventOnWindow()
    {
        var context: any = this; 
        if (context.fieldObject && context.fieldObject.FieldId)
        {
            var input = document.getElementById(context.fieldObject.FieldId.toString());
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent('change', true, false);            
            input.dispatchEvent(evt);
        }
    }

    onddlChange(event: any) {
        if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue == "") {
            this.fieldObject.FieldValue = "-1";
        }
        else {
            this.fieldObject.FieldValue = event;
        }
        if (this.strPopupText != "" || this.strPopupText != null) {
            this.strPopupstring = this.strPopupText;
        }
        this.ddlChange.emit({
            ChildFieldObject: this.fieldObject
        });
    }
    getSelectedValueDDL() {

        if (this.selectedLabel != null && this.selectedLabel != "" && this.selectedLabel != undefined) 
        {

            this.ddlSelectedTitle = this.selectedLabel;
        }
           
    }

    popupAdd(event: any) {
        var reportfieldId = this.fieldObject.FieldId;
        this.popupClick.emit({
            reportfieldId
        });
    }
    onPopupKeyPress(Keyevent: any) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            Keyevent.preventDefault();
            this.popupAdd(Keyevent);
        }
    }
    ondropdownfocusin() {        
        var ContextObj: any = this; 
            var labelclass: any = ContextObj.el.nativeElement.getElementsByClassName("ddllabel_" + ContextObj.fieldObject.FieldId.toString());
            if (labelclass && labelclass.length) {
                if (labelclass[0].tabIndex != 0) {
                    var selectclass: any = ContextObj.el.nativeElement.getElementsByClassName("ddl");
                    labelclass[0].setAttribute('aria-label', selectclass[0].getAttribute('aria-label'));
                    labelclass[0].tabIndex = 0;
                    labelclass[0].focus();
                    setTimeout(function () {
                        if (selectclass && selectclass.length) {
                            selectclass[0].focus();
                        }
                    }, 400);
                }
                else {
                    labelclass[0].tabIndex = -1;
                }
            }
    }
}

export interface ddlProperties {
    ChildFieldObject: IField;
}
