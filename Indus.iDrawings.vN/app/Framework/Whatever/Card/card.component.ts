
import { Component, QueryList, Input, Output, EventEmitter, Inject, forwardRef, ElementRef, ContentChildren, SimpleChange, OnChanges, KeyValueDiffers, DoCheck, OnInit } from '@angular/core';
import { NgForm, FORM_DIRECTIVES } from '@angular/forms';
import { FieldComponent } from '../../Whatever/Card/field.component';
import { IField } from '../../Models/Interface/IField';
import { ListComponent } from '../../Whatever/List/list.component';
import { GeneralFunctions } from '../../../Models/Common/General';


@Component({
    selector: 'card',
    templateUrl: 'app/Framework/Views/Card/card.component.html',
    /*    >  <template [ngTemplateOutlet]="template" ></template>    //encapsulation: ViewEncapsulation.Native,*/
    directives: [FORM_DIRECTIVES],
    providers: [GeneralFunctions],

    styleUrls: ['app/Framework/Views/Card/card.component.css'],
    host: {
        '[class.card]': 'type=="card" || !type',
        '[class.list-item]': 'type=="list"',
        "(click)": "handleClick($event)",
        '[class.selection]': 'selection',
        "(mouseover)": "handlMouseOver($event)",
        "(focusin)": "handlMouseOver($event)",
        "(focusout)": "onMouseLeave($event)",
        "(mouseleave)": "onMouseLeave($event)",
        "(keydown)": "EnterOrDeleteKey($event)"
    },


})


export class CardComponent {
    @ContentChildren(forwardRef(() => FieldComponent)) cardFields: QueryList<FieldComponent>;

    @Input() datakeyValue;
    @Input() type;
    @Input() viewTitle;
    @Input() enableDeleBtn = true;
    @Input() enableEditBtn = true;
    @Input() isViewForDrwg = false;
    @Input() submitSuccess;
    @Output() onSubmition = new EventEmitter();
    @Output() inlineDelete = new EventEmitter();
    @Output() onCardClick = new EventEmitter();
    @Output() onViewForDrwgClick = new EventEmitter();
    @Output() onCancelClick = new EventEmitter();
    @Output() onFileUpload = new EventEmitter();
    @Output() onAddedOutObj = new EventEmitter();
    @Output() chkboxOutEvent = new EventEmitter();
    @Output() getTitle: EventEmitter<any> = new EventEmitter();
    public localenableDeleBtn = true;
    titleForCard: string = "";
    public List: ListComponent;
    public selection: boolean = false;
    public isEditted: boolean = false;
    public hoverEffect: boolean = false;
    //viewTitle:string="View Markup"
    viewTooltip: string = "";
    isAdded = [];
    isCancel = [];
    isSubmit = [];
    submitTitle: string = "Save Changes";
    multiColumnClass = "";
    multiColumnFormClass = "";
    el: ElementRef;
    public fileObject: IFileDetails;
    private fileData: any;

    private differcard: any;
    private diffSubmitcard: any;
    public focusfieldId: number = 0;
    private localSubmitSuccess: boolean = false; //to be remove
    private toolTipView: string = "";
    constructor( @Inject(forwardRef(() => ListComponent)) List: ListComponent, elemRef: ElementRef, private genaralFun: GeneralFunctions, differ: KeyValueDiffers) {
        this.differcard = differ;
        this.List = List;
        this.el = elemRef;

    }
    ngOnInit() {
        if (this.submitSuccess) {
            this.diffSubmitcard = this.differcard.find(this.submitSuccess).create(null);
        }
        this.toolTipView = this.viewTitle;
        this.viewTooltip = "View " + this.toolTipView;
        this.multiColumnClass = "col-md-6 col-lg-6 multi-column";
        this.multiColumnFormClass = "multi-column-form"
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["datakeyValue"]) {
            if ((changes["datakeyValue"]["currentValue"] == null) || (changes["datakeyValue"]["currentValue"] == -1)) {
                this.isAdded.push("true");
                this.submitTitle = "Save";
                this.List.isAddedCard = true;
                this.removePrevSelection();
            }
        }
    }
    ngDoCheck() {
        if (this.submitSuccess) {
            let submitChange = this.diffSubmitcard.diff(this.submitSuccess);
            if (submitChange) {
                this.isSubmit.push("true");
                //this.List.isAddedCard = false;
            }
        } else if (this.localSubmitSuccess == true) {
            this.isSubmit.push("true");
            this.localSubmitSuccess = false;
            //this.List.isAddedCard = false;        
        }

    }

    EnterOrDeleteKey(e) {/*508 Compliance*/
        if (e.keyCode == 13 || e.keyCode == 46) {
            var activeCardElem = $(document.activeElement);
            if (activeCardElem.length > 0) {
                if (activeCardElem[0].id == "card-item-each" && e.keyCode == 13) {
                    this.cardFunctions(e, 2);

                }
                else if (activeCardElem[0].id == "card-item-each" && e.keyCode == 46) {
                    this.cardFunctions(e, 6);

                }

            }
        }
    }

    getTitleForCard() {

        var getContentTitle = $(document.activeElement.querySelectorAll("stringtextbox"));
        if (getContentTitle.length > 0 && getContentTitle) {

            this.titleForCard = getContentTitle[0].title + " Press Enter to Edit or Delete to Delete this";
        }

    }

    onSubmit(e) {

        let ValidationError = [];
        if (this.isAdded[0] == "true") {
            this.cardFields.forEach(function (item): void {
                var HasValidationError = item.fieldObject.HasValidationError;
                if (HasValidationError == true) {
                    ValidationError.push(HasValidationError);
                }
            })
        }
        if ((ValidationError.length < 1) || (this.submitSuccess && this.submitSuccess[0]["isSuccess"] == false)) {// cheking any validaion error exists
            if (this.el.nativeElement.getElementsByClassName('ng-invalid').length == 0) {
                let returnObj = this.retFieldObj();
                this.localSubmitSuccess = true;
                //this.List.isAddedCard = false;              
                this.onSubmition.emit({ "fieldObject": returnObj, "dataKeyValue": this.datakeyValue, "filedata": this.fileData });
            }
        }
    }

    handleClick(e: Event) {
        e.stopPropagation();
        this.onCardSelection(0);
    }

    cardFunctions(e, id) {/*508 Compliance*/

        this.getTitleForCard();

        if (id == 4) {             //Card First Div Click 
            this.handleClick(e);
        }
        else if (id == 6) {         //Card Delete Key Press 
            this.delete(e);
        }

        if (e.keyCode == 13 || e.keyCode == 32)  // Events for Enter & Space Respectively
        {
            if (id == 1) {         //Cancel
                this.cancel(e)
            }
            else if (id == 2) {    //Edit
                this.edit(e);
            }
            else if (id == 3) {    //Delete
                this.delete(e);
            }
            else if (id == 5) {    //Submit
                this.onSubmit(e);
            }
        }
    }


    onCardSelection(target) {
        // alert(this.List.isAddedCard);
        if (this.List.isAddedCard && this.datakeyValue >= 0 && this.datakeyValue != null) {
            this.selection = false;

        } else {
            if (this.List.selectionMode == "Single") {
                if (this.List.previousCardObj.length == 0)
                    this.List.previousCardObj.push(this.cardFields);
                else {
                    this.removePrevSelection();
                    this.List.selectedIds.pop();
                    this.List.previousCardObj.push(this.cardFields);
                }
            }
            //if ((this.List.selectionMode == "Single") && (this.List.selectedIds.length > 0)) {
            //    if (this.datakeyValue != this.List.selectedIds[0]) {
            //        var selCardObj = this.List.listElement.nativeElement.getElementsByClassName('selection');
            //        if (selCardObj.length > 0) {
            //            if (this.enableDeleBtn!=undefined) {
            //                if (this.enableDeleBtn != "false") {

            //                    selCardObj[0].getElementsByClassName('imgDelete')[0].setAttribute("hidden", true);
            //                }
            //            }
            //            if (this.type == "list") {
            //                selCardObj[0].className = "list-item";
            //                this.el.nativeElement.className = "list-item selection";
            //            }
            //            else {
            //                selCardObj[0].className = "card";
            //                this.el.nativeElement.className = "card selection";
            //            }
            //        }
            //        this.selection = false;

            //        this.List.selectedIds.pop();
            //    } else { this.selection = true; }
            //}

            switch (target) {
                case 1: //from double click action
                case 2:  //from edit icon click
                    this.localenableDeleBtn = false;
                    this.isEditted = true;
                    this.selection = true;
                    break;
                default: //handleclick

                    if (this.isEditted) {
                        this.localenableDeleBtn = false;
                    }
                    else {
                        this.selection = !this.selection;
                        this.localenableDeleBtn = true;
                    }

                    break;
            }


            if (this.selection) {
                if (this.List.selectedIds.indexOf(this.datakeyValue) == -1) {
                    this.List.selectedIds.push(this.datakeyValue);
                }
                this.onCardClick.emit(this.datakeyValue);
            }
            else {
                this.removeSelectedKeys(this.datakeyValue);
            }
        }

    }
    handlMouseOver(e: Event) {

        if (this.enableEditBtn == true) {
            if (!this.List.isAddedCard) {
                let edittedFieldscount = 0;
                this.cardFields.forEach(function (item): void {
                    if (item.readOnly && item.fieldObject.IsEnabled) { edittedFieldscount++; }
                })
                if (edittedFieldscount > 0) {
                    this.hoverEffect = true;
                } else {
                    this.hoverEffect = false;
                }
            }
        }
    }

    onMouseLeave(e: Event) {

        this.hoverEffect = false;
    }
    edit(e: Event) {
        var firstEnabledFieldId: string;
        var firstElement;
        e.stopPropagation();
        this.isEditted = true;

        //this.localenableDeleBtn = false;    
        this.cardFields.forEach(function (item): void {
            if (item.fieldObject.IsEnabled) {
                item.oldfieldValue = item.fieldValue;
                if (item.fieldObject.DataEntryControlId == 4) {
                    item.updateDdlValue(1);
                }
                item.readOnly = false;
                if (firstEnabledFieldId == undefined) {
                    firstEnabledFieldId = item.fieldObject.FieldId.toString();
                }
            }
        })
        this.onCardSelection(1);
        setTimeout(function () {
            var element = <HTMLElement>document.getElementById(firstEnabledFieldId);
            if (element)
                element.focus();
        }, 50);
    }

    delete(e: Event) {
        e.stopPropagation();
        this.inlineDelete.emit(e)
    }
    cancel(e: Event) {
        e.stopPropagation();
        if (this.isAdded[0] == "true" && (this.datakeyValue < 0 || this.datakeyValue == null)) {
            this.List.source.pop();
            this.List.isAddedCard = false;
            this.onCancelClick.emit({});


        } else {
            this.removeErrSpan();
            this.isEditted = false;
            this.isCancel.push("true");
        }

    }

    ViewDrwg(e) {
        e.stopPropagation();
        this.toolTipView = this.viewTitle;
        let isView = false;
        this.viewTooltip = "";
        let curSrc = e.target.getAttribute('src');
        let setSrc = "";
        if (curSrc.indexOf("viewDrawing.png") > -1) {
            isView = true;
            this.viewTooltip = "Hide " + this.toolTipView;
            setSrc = "Content/Layout/hidemarkup.png";
        } else {
            isView = false;
            this.viewTooltip = "View " + this.toolTipView;
            setSrc = "Content/Layout/viewDrawing.png";
        }
        e.target.setAttribute('src', setSrc);
        let returnObj = this.retFieldObj();
        this.onViewForDrwgClick.emit({ "fieldObject": returnObj, "dataKeyValue": this.datakeyValue, "isView": isView });

    }

    private removeErrSpan() {
        let objErrorMsg = this.el.nativeElement.getElementsByClassName('ng-invalid');
        if (objErrorMsg.length > 0) {
            for (let i = 0; i < objErrorMsg.length; i++) {
                objErrorMsg[i].nextSibling.innerHTML = "";
            }
        }
    }

    private retFieldObj(): any {
        let submitFieldObj = [];
        debugger
        this.cardFields.forEach(function (item): void {
            if ((item.fieldObject.GenericDataTypeId == 6) && item.fieldValue != undefined && item.fieldValue != null &&
                (item.fieldObject.DataEntryControlId == 1 || item.fieldObject.DataEntryControlId == 3)) {//to avoid leading and trailing space problem for numeric and integer              
                item.fieldObject.FieldValue = item.fieldValue.toString().trim();

            }
            else if (item.fieldObject.GenericDataTypeId == 4) {
                item.fieldValue=item.fieldValue == "" ? "0" : item.fieldValue;
                var n = parseFloat(item.fieldValue).toFixed(2);
                item.fieldObject.FieldValue = n;
            }
            else if (item.fieldObject.GenericDataTypeId == 5) {
                item.fieldObject.FieldValue = parseInt(item.fieldValue).toString();
            }
            else {
                item.fieldObject.FieldValue = item.fieldValue;
            }

            if (item.fieldObject.DataEntryControlId == 4) {
                item.updateDdlValue(2);
            }

            // item.oldfieldValue = item.fieldValue;
            submitFieldObj.push(item.fieldObject);
        })
        let rptFieldObj;
        if (this.fileObject != null) {
            let retObjwithFileData = this.genaralFun.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": submitFieldObj, "filedata": this.fileObject });
            rptFieldObj = retObjwithFileData["fieldobject"];
            this.fileData = retObjwithFileData["filedata"];

        } else {
            rptFieldObj = this.genaralFun.getFieldValuesAsReportFieldArray(submitFieldObj);
        }
        return rptFieldObj;
    }

    public removeSelectedKeys(datakey) {
        if (this.List.selectedIds.indexOf(datakey) > -1) {
            this.List.selectedIds.splice(this.List.selectedIds.indexOf(datakey), 1);
        }
    }
    public removePrevSelection() {
        if (this.List.previousCardObj.length > 0) {
            var contextObj = this;
            this.List.previousCardObj[0].forEach(function (item): void {
                if (item.card.datakeyValue != contextObj.datakeyValue) {
                    if (item.oldfieldValue != undefined || item.oldfieldValue === null) {
                        item.fieldValue = item.oldfieldValue;
                    }
                    var errorMsgs = item.card.el.nativeElement.getElementsByClassName('ng-invalid');
                    if (errorMsgs.length > 0) {
                        for (let i = 0; i < errorMsgs.length; i++) {
                            errorMsgs[i].nextSibling.innerHTML = "";
                        }
                    }
                    item.fieldObject.HasValidationError = false;
                    item.card.isEditted = false;
                    item.card.selection = false;
                    item.readOnly = true;
                }
            })
            this.List.previousCardObj.pop();
        }
    }
}
export interface IFileDetails {
    FileName: string,
    FileData: string
}