import {Component, Input, Output, EventEmitter,ElementRef, AfterViewChecked} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive';

@Component({
    selector: 'StringTextBox',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/stringtextbox.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]
})

export class StringTextBoxComponent implements AfterViewChecked {
    public fieldObject: IField;
    public setAlignment: string;
    public fieldHeight: number;
    public fieldWidth: string;
    public txtAlign: string;
    public labelWidth: string;
    @Input() readonlymode: boolean;
    @Input() SetAlignment: string;
    @Input() alignContent: string;
    @Input() inttabIndex: number;
    @Input() labelwidth: number;
    @Input() validationData;
    @Input() blnPopupImage: boolean = true;
    @Input() strPopupText: string;
    @Output() validateMessageForGrid = new EventEmitter();
    @Output() txtBoxChange = new EventEmitter();
    @Output() keyUpemit = new EventEmitter();
    @Output() popupClick = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
        } else {
            this.setAlignment = "block";
        }

        if (this.labelwidth == undefined) {
            this.labelWidth = "auto";
        }
        else
        {
            this.labelWidth = this.labelwidth +"px";
        }

        if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
            this.fieldHeight = this.fieldObject.Height;
        }
        else {
            this.fieldHeight = 30;
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width;
        }
        else {
            this.fieldWidth = "250";
        }
        if (this.alignContent != "") {
            this.txtAlign = this.alignContent;
        }
        else {
            this.txtAlign = "left"
        }
    }

    ngAfterViewChecked() {
    }

    getTxtBoxDetails(event) {
        this.txtBoxChange.emit({
            txtBoxData: event,
            fieldObject: this.fieldObject
        });
    }

    onKey(event) {
        this.keyUpemit.emit(event.currentTarget.value);
    }
    onPaste(event) {
        var copiedText = event.clipboardData.getData('Text');
        var $targetElem = $(event.target);
        if ($targetElem.length > 0) {
            if (this.fieldObject.MaxLength) {
                if (copiedText.length <= this.fieldObject.MaxLength) {
                    var updatedValue = copiedText;
                    this.fieldObject.FieldValue = updatedValue;
                    $targetElem.val(updatedValue);
                    $targetElem.focus();
                }
            } else {
                var updatedValue = copiedText;
                this.fieldObject.FieldValue = updatedValue;
                $targetElem.val(updatedValue);
                $targetElem.focus();
            }
        }
        return false;
    }

    validateMessage(event) {
        this.validateMessageForGrid.emit(event);
    }

    popupAdd(event: any) {
        var reportfieldId = this.fieldObject.FieldId;
        this.popupClick.emit({
            reportfieldId
        });
    }
    onPopupKeyPress(Keyevent: any) {/*508 Compliance*/
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            Keyevent.preventDefault();
            this.popupAdd(Keyevent);
        }
    }
} 
