import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked, ElementRef, OnChanges, ChangeDetectorRef, SimpleChange, Renderer, ViewChild} from '@angular/core'
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { StringTextBoxComponent } from './stringtextbox.component';
import { TextAreaComponent } from './textareacomponent.component';
import { DropDownListComponent } from './dropdownlistcomponent.component';
import { CustomRadioComponent } from './radiocomponent.component';
import { CustomCheckBoxComponent } from './checkboxcomponent.component';
import { ListBoxComponent } from './listboxcomponent.component';
import { DateComponent } from './datecomponent.component';
import { DateTimeComponent } from './datetimecomponent.component';
import { LabelComponent } from './labelcomponent.component';
import { ButtonComponent } from './buttoncomponent.component';
import { FileUploadComponent } from './fileuploadcomponent.component';
import { ColorPickerComponent } from './colorpickercomponent.component';
import { ImageUploadComponent } from './imageuploadcomponent.component';
import { DynamicListComponent } from './dynamiclist.component';
import { LookupStringTextBoxComponent } from './lookuptextbox.component';
import { ValidateService } from '../../../Models/Validation/validation.service';
import { IField } from '../../../Models/Interface/IField';
import { GeneralFunctions} from '../../../../Models/Common/General';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../ExternalLibraries/dnd/ng2-dnd';

@Component({
    selector: 'DynamicFields',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/fieldGeneration.component.html',
    directives: [StringTextBoxComponent, TextAreaComponent, DropDownListComponent, CustomCheckBoxComponent, CustomRadioComponent, ListBoxComponent, DateComponent, DateTimeComponent, LabelComponent, ButtonComponent, FileUploadComponent, ColorPickerComponent, ImageUploadComponent, DynamicListComponent, LookupStringTextBoxComponent, DND_DIRECTIVES],
    inputs: ['dataSource'],
    providers: [ValidateService, GeneralFunctions],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
})

export class FieldComponent implements OnInit, AfterViewChecked {
    public validationData;
    blnshowSubSwitches: boolean = false;
    private dataSource: IField[];
    public fieldListArray: IField[];
    public strFileExtensions: string[];
    public strCommonFileExtensions: string[];
    public reportFieldArray: any;
    public fileObj: IFileDetails;
    blnSetFocus: boolean = false;
    blnIsFocused: boolean;
    ValidationIsFocused: boolean = false;
    blnShowReadOnly: boolean;
    strPopUpTxt: string;
    contextObj: this;
    @Input() strPopupText: string;
    @Input() btnName: string;
    @Input() holidaysDisabled: boolean = false;
    disableDates: Array<string> = ["Sunday", "Saturday"];
    @Input() dataKey: string;
    @Input() strLstBoxValidateMessage: string;
    @Input() blnPopupImage: boolean;
    @Input() showButton: boolean = true;
    @Input() btnVisible: string;
    @Input() FileExtDynamicFields: string[];
    @Input() CommonFileExtDynamicFields: string[];
    @Input() supportMultiColumnDispay: boolean = false;
    @Input() multiColumnNumber: any;
    @Input() blndisableAllComponents: boolean; /*input for showing all components as disabled */
    @Input() showDateOnLoad: boolean;
    @Input() showDateTimeOnLoad: boolean;
    @Input() SetAlignment: string;
    @Input() labelWidth: string;
    @Output() fieldObject;
    @Output() c1 = new EventEmitter<any>();
    @Output() fieldChange = new EventEmitter();
    @Output() rbnChange = new EventEmitter();
    @Output() chkChange = new EventEmitter();
    @Output() txtChange = new EventEmitter();
    @Output() txtkeyUpemitter = new EventEmitter();
    @Output() fileChange = new EventEmitter();
    @Output() colorChange = new EventEmitter();
    @Output() lstBoxChange = new EventEmitter();
    @Output() lstBoxSelAllChange = new EventEmitter();
    @Output() dateChange = new EventEmitter();
    @Output() submitFieldObject = new EventEmitter();
    @Output() popupItemEmit = new EventEmitter();
    @Output() btnItemEmit = new EventEmitter();
    @Output() dynamicListAddEmit = new EventEmitter();
    @Output() dynamicListRemoveEmit = new EventEmitter();
    @Output() lookupSelectEmit = new EventEmitter();

    @ViewChild('input') input: ElementRef;
    cdr: any;
    multiColumnClass: string = "";
    multiColumnFormClass: string = "";

    constructor(private _validateService: ValidateService, private el: ElementRef, cdr: ChangeDetectorRef, private _renderer: Renderer) {
        this.cdr = cdr;
    }

    ngOnInit() {
        var contextObj = this;
        this._validateService.getBlacklist().subscribe(function (resultData) {
            contextObj.validationData = resultData;
        });
        if (this.showButton == true || this.showButton == undefined || this.showButton == null || this.btnName != " " || this.btnName != null || this.btnName != undefined) {
            this.btnVisible = "block";
        }
        else {
            this.btnVisible = "none";
        }
        this.fieldListArray = this.dataSource;
        if (this.FileExtDynamicFields != undefined) {
            this.strFileExtensions = this.FileExtDynamicFields;
        }
        if (this.CommonFileExtDynamicFields != undefined) {
            this.strCommonFileExtensions = this.CommonFileExtDynamicFields;
        }
        if (contextObj.blndisableAllComponents == true) {
            contextObj.blnShowReadOnly = true;
        }
        else {
            contextObj.blnShowReadOnly = false;
        }

        console.log(this.holidaysDisabled);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.strFileExtensions = this.FileExtDynamicFields;
        var relationshipFields: IField[];
        if (changes["btnName"] && changes["btnName"]["currentValue"] != changes["btnName"]["previousValue"]) {
            if (this.btnName != "" && this.btnName != null && this.btnName != undefined) {
                this.btnVisible = "block";
            }
            else {
                this.btnVisible = "none";
            }
        }
        if (this.dataSource !== undefined) {
            /* relationshipFields function as per new fieldobject*/
            relationshipFields = this.dataSource.filter(x => x.HasChild !== undefined);  /*JN to be checked */
            if (relationshipFields.length > 0) {
                var fieldsHavingParent = relationshipFields.filter(x => x.HasChild !== undefined);
                for (let i = 0; i < fieldsHavingParent.length; i++) {
                    var subField = fieldsHavingParent[i];
                    var parentFields = fieldsHavingParent[i].ParentId;
                    if (parentFields != null) {
                        if (fieldsHavingParent[i].IsSubField) {
                            var parentFieldObj = this.dataSource.filter(x => x.FieldId == fieldsHavingParent[i].FieldId)[0];
                            if (parentFieldObj.SubFields == undefined) {
                                parentFieldObj.SubFields = new Array();
                            }
                            var checkForObject = function (obj: IField) {
                                return obj.FieldId == subField.FieldId;
                            }
                            parentFieldObj.SubFields.push(subField);
                            this.dataSource.splice(this.dataSource.findIndex(checkForObject), 1);
                        }
                    }
                }
            }
        }
        if (this.supportMultiColumnDispay || this.multiColumnNumber != undefined) {
            if (this.multiColumnNumber == undefined || this.multiColumnNumber == 2) {
                this.multiColumnClass = "col-md-6 col-lg-6 multi-column";
            }
            else if (this.multiColumnNumber == 3) {
                this.multiColumnClass = "col-md-4 col-lg-4 multi-column";
            }
            this.multiColumnFormClass = "multi-column-form";
        }
    }

    ngAfterViewChecked() {
        var contextObj = this;
        if (contextObj.blndisableAllComponents == true) {
            contextObj.blnShowReadOnly = true;
        }
        else {
            contextObj.blnShowReadOnly = false;
        }
        if (contextObj.strPopupText != null || contextObj.strPopupText != "") {
            this.strPopUpTxt = contextObj.strPopupText;
        }
        if (this.blnShowReadOnly == true) {
            if (contextObj.dataSource != undefined) {
                for (var i = 0; i < this.dataSource.length; i++) {
                    this.dataSource[i].ReadOnlyMode = true;
                }
                this.btnVisible = "none";
            }
        }
        else {
        }
        if (this.blnIsFocused != true) {
            var input = null;
            /*  if (contextObj.dataSource != undefined) {
                  for (var i = 0; i < contextObj.dataSource.length; i++) {
                      if (contextObj.dataSource[i].IsEnabled == true) {
                          if (contextObj.dataSource[i].DataEntryControlId == 5) {
                              input = document.getElementById(contextObj.dataSource[i].LookupDetails.LookupValues[0].Id.toString());
                          }
                          else {
                              input = document.getElementById(contextObj.dataSource[i].FieldId.toString());
                          }
                          if (input != undefined) {
                              this._renderer.invokeElementMethod(input, 'focus');
                              /*input.nativeElement.focus();*/
            /* this._renderer.invokeElementMethod(input, 'focus', []);*/
            /* contextObj.blnIsFocused = true;
             break;
         }
     }
 }
}*/
            /*var focused: boolean = false;
            if (contextObj.dataSource != undefined) {
                for (var i = 0; i < contextObj.dataSource.length; i++) {
                    if (contextObj.dataSource[i].DataEntryControlId == 1 && contextObj.dataSource[i].IsEnabled == true) {
                        var element = <HTMLInputElement>document.getElementById(this.dataSource[i].FieldId.toString());
                        if (element != undefined) {
                            element.focus();
                            focused = true;
                        }
                        if (focused == true) {
                            setTimeout(function () {
                                var element = <HTMLInputElement>document.getElementById(this.dataSource[i].FieldId.toString());
                                if (element != undefined) {
                                    element.blur();
                                }
                            }, 10);
                            break;
                        }
                        break;
                    }
                }
            }*/
        }
    }


    onSubmit(form: NgForm, value: string) {
        debugger
        this.ValidationIsFocused = false;
        var contextObj = this;
        var checkForErrors = function (fieldObject: IField) {
            console.log('field objects in this page', fieldObject)
            return fieldObject.HasValidationError;
        };
        /*To set focus to the field with valdiation error on submit click */
        for (let i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].HasValidationError == true && !this.ValidationIsFocused) {
                var input = null;
                if (contextObj.dataSource[i].DataEntryControlId == 5) {
                    input = document.getElementById(contextObj.dataSource[i].LookupDetails.LookupValues[0].Id.toString());
                }
                else {
                    input = document.getElementById(contextObj.dataSource[i].FieldId.toString());
                }
                if (contextObj.dataSource != undefined) {
                    if (input != undefined) {
                        this._renderer.invokeElementMethod(input, 'focus');
                        contextObj.ValidationIsFocused = true;
                        break;
                    }
                }
            }
        }
        /***** To set focus to the field with valdiation error on submit click *****/
        if (this.dataSource.find(checkForErrors)) {
            return;
        }
        var obj: GeneralFunctions = new GeneralFunctions();
        var retObj;
        if (this.fileObj != null) {
            retObj = obj.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": this.dataSource, "filedata": this.fileObj });
            this.reportFieldArray = retObj["fieldobject"];
        }
        else {
            this.reportFieldArray = obj.getFieldValuesAsReportFieldArray(this.dataSource);
        }
        var isValid = true;
        if (isValid == true) {
            if (retObj != undefined) {
                this.submitFieldObject.emit({
                    fieldobject: this.reportFieldArray,
                    filedata: retObj["filedata"]
                })
            } else {
                this.submitFieldObject.emit({
                    fieldobject: this.reportFieldArray
                })
            }
        }
        else {
        }
    }
    public ddlRelationChange(event: any): void {
        this.fieldChange.emit({
            ddlRelationShipEvent: event
        });
    };

    public rbtnChange(event: any): void {
        this.rbnChange.emit({
            rbtnObject: event
        })
    };

    public chkBoxChange(event: any): void {
        this.chkChange.emit({
            chkBoxObject: event
        })
    };

    public txtBoxChanges(event: any): void {
        this.txtChange.emit({
            txtChangeObject: event
        })
    };
    public lookupSelect(event: any): void {
        this.lookupSelectEmit.emit({
            selectedItem: event
        })
    };



    public emitKeyUp(event: any): void {
        this.txtkeyUpemitter.emit({
            event: event,
            fieldObject: this.dataSource
        });
    };

    public listBoxChange(event: any): void {
        this.lstBoxChange.emit({
            listChangeObject: event
        })
    };

    public SelectAllChange(event: any): void {
        this.lstBoxSelAllChange.emit({
            listChangeObject: event
        })
    };

    public datePickerChange(event: any): void {
        this.dateChange.emit({
            dateChangeObject: event
        })
    };

    public getColorChange(event: any): void {
        this.colorChange.emit({
            colorChangeObject: event
        })
    };

    public getFileData(event: any): void {
        this.fileObj = event;
        this.fileChange.emit({
            fileObj: this.fileObj
        })
    };

    public getImageData(event: any): void {
        this.fileObj = event;
    };

    public popupClick(event: any): void {
        this.popupItemEmit.emit(event);
    };

    public getBtnChanges(event: any): void {
        this.btnItemEmit.emit(event);
    };

    public getDynamicListAdd(event: any): void {
        this.dynamicListAddEmit.emit(event);
    };

    public getDynamicListRemove(event: any): void {
        this.dynamicListRemoveEmit.emit(event);
    };

    showComponent(fieldName, isVisible) {
        if (fieldName == this.dataKey || isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    toggleDisplaySettings() {
        if (this.blnshowSubSwitches == false) {
            this.blnshowSubSwitches = true;

        }
        else {
            this.blnshowSubSwitches = false;
        }
    }
    onSelection(event, fieldId, IsVisible) {
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    FieldValue: string;
}

export interface IFileDetails {
    FileName: string,
    FileData: string
}





