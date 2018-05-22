import {Component, Input,EventEmitter} from '@angular/core'
import {IField} from '../../../Models/Interface/IField'
import {Validation} from '../../Validation/validate.directive';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'TextAreaComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/textareacomponent.component.html',
    inputs: ['fieldObject'],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    directives: [Validation]
})

export class TextAreaComponent {

    public fieldObject: IField;
    public fieldHeight: number;
    public fieldWidth: string;
    public setAlignment: string;
    public labelWidth: string;
    public inlinewidth;

    maxLength: string = "";
    @Input() labelwidth;
    @Input() validationData;
    @Input() SetAlignment;

    constructor(private sanitizer: DomSanitizationService) {

    }

    ngOnInit() {
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
            this.labelWidth = this.labelwidth + "px";
            this.inlinewidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + this.labelwidth + ")");
            this.inlinewidth = this.inlinewidth + "px";
        } else {
            this.setAlignment = "block";
            this.labelWidth = "auto";
            this.inlinewidth = "";
        }

        if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
            this.fieldHeight = this.fieldObject.Height;
        }
        else {
            this.fieldHeight = 70;
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width;
        }
        else {
            this.fieldWidth = "250";
        }
        if ((this.fieldObject.MaxLength == null) || (this.fieldObject.MaxLength == undefined)) {
            this.maxLength = "Max 4000 Chars";
        }
        else{
            this.maxLength = "Max " + this.fieldObject.MaxLength + " Chars"; 
        }
    }
}






