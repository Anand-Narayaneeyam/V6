var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var validate_directive_1 = require('../Validation/validate.directive');
var General_1 = require('../../../Models/Common/General');
var StringTextBoxSearchComponent = (function () {
    function StringTextBoxSearchComponent(limeter) {
        this.stringValue = "";
        this.validate = true;
        this.filteredList = [];
        this.stringCondition = "Ñ";
        this.percntge = "¥";
        this.singleQ = "ô";
        this.filterArray = [];
        this.limeter = limeter;
    }
    StringTextBoxSearchComponent.prototype.onChange = function (value) {
        var localObj = this;
        setTimeout(function () {
            localObj.stringValue = value.target.value;
            ;
            localObj.fieldObject.FieldValue = localObj.stringCondition + localObj.limeter.ColumnDelimeter + localObj.singleQ + localObj.percntge + localObj.stringValue + localObj.percntge + localObj.singleQ;
        }, 10);
    };
    StringTextBoxSearchComponent.prototype.ngOnInit = function () {
        this.fieldObject.IsMandatory = false;
        if (this.fieldObject.LookupDetails != null) {
            var JsonObj = this.fieldObject.LookupDetails.LookupValues;
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != undefined) {
            this.stringValue = this.fieldObject.FieldValue;
        }
        else {
        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != undefined) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.stringValue = arr1[0];
            }
            else {
                this.stringValue = this.fieldObject.FieldValue;
            }
        }
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;
        this.currentfocus = document.activeElement;
    };
    StringTextBoxSearchComponent.prototype.filter = function (value) {
        this.stringValue = value.target.value;
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;
        if (this.stringValue !== "" && this.stringValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null) {
                    this.currentfocus = value.srcElement;
                    return (el.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
                }
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    StringTextBoxSearchComponent.prototype.select = function (item) {
        this.stringValue = item;
        this.fieldObject.FieldValue = item;
        this.filteredList = [];
        this.fieldObject.FieldValue = this.stringCondition + this.limeter.ColumnDelimeter + this.singleQ + this.percntge + this.stringValue + this.percntge + this.singleQ;
    };
    StringTextBoxSearchComponent.prototype.selectonkeypress = function (Keyevent, item) {
        var contextobj = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            Keyevent.preventDefault();
            setTimeout(function () {
                if (contextobj.currentfocus) {
                    contextobj.currentfocus.focus();
                    contextobj.currentfocus = null;
                }
            }, 150);
            contextobj.select(item);
        }
    };
    //closekeypress() {
    //    var RootClass: any = document.getElementsByClassName("suggestions");
    //    if (RootClass && RootClass.length > 0) {
    //        var length = RootClass.length;
    //    }
    //}
    StringTextBoxSearchComponent.prototype.onBlurMethod = function () {
        this.filteredList = [];
    };
    StringTextBoxSearchComponent.prototype.onPaste = function (event) {
        var localObj = this;
        var copiedText = localObj.stringCondition + localObj.limeter.ColumnDelimeter + localObj.singleQ + localObj.percntge + event.clipboardData.getData('Text') + localObj.percntge + localObj.singleQ;
        var $targetElem = $(event.target);
        if ($targetElem.length > 0) {
            if (this.fieldObject.MaxLength) {
                if (copiedText.length <= this.fieldObject.MaxLength) {
                    var updatedValue = copiedText;
                    this.fieldObject.FieldValue = updatedValue;
                    $targetElem.val(event.clipboardData.getData('Text'));
                    $targetElem.focus();
                }
            }
            else {
                var updatedValue = copiedText;
                this.fieldObject.FieldValue = updatedValue;
                $targetElem.val(event.clipboardData.getData('Text'));
                $targetElem.focus();
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StringTextBoxSearchComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StringTextBoxSearchComponent.prototype, "validationData", void 0);
    StringTextBoxSearchComponent = __decorate([
        core_1.Component({
            selector: 'StringTextBoxSearch',
            template: "\n    <div style=\"float:left;width:100%;\">\n               <div  control-group class=\"floating-label\" style=\"float:left;\">\n                    <label>\n                        {{fieldObject.FieldLabel}}\n                     </label>\n               </div>\n               <div *ngIf=\"validate === true\"  control-group class=\"floating-label\" style=\"float:left;width:100%;\"> \n                    <label *ngIf=\"fieldObject.IsReadOnly === true\" class=\"readOnly\"  readOnly>{{fieldObject.FieldValue}}</label>\n                    <input  autocomplete=\"off\" (paste)=\"onPaste($event)\" validatetext [fieldObject]='fieldObject' [validationData]=\"validationData\" name=\"StringTextBox\" id=\"{{fieldObject.FieldId}}\"    type=\"text\" (change)=\"onChange($event)\" floating-label [(ngModel)]=\"stringValue\" (keyup)=filter($event)>     \n                     <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\" style=\"line-height:25px;border:1px solid #eeeded\">\n                        <ul>\n                            <li *ngFor=\"let item of filteredList\" (click)=\"select(item)\" tabindex=\"0\" [attr.aria-label]=\"''+item\" (keypress)=\"selectonkeypress($event,item)\">\n                                <a>{{item}}</a>\n                            </li>\n                        </ul>\n                    </div>            \n               </div>\n    </div> ",
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/Search/searchFields.css'],
            directives: [validate_directive_1.Validation],
            providers: [General_1.Delimeter]
        }), 
        __metadata('design:paramtypes', [General_1.Delimeter])
    ], StringTextBoxSearchComponent);
    return StringTextBoxSearchComponent;
}());
exports.StringTextBoxSearchComponent = StringTextBoxSearchComponent;
//# sourceMappingURL=stringtextbox.component.js.map