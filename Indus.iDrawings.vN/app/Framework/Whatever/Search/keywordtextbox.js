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
var KeywordTextboxComponent = (function () {
    function KeywordTextboxComponent(limeter) {
        this.stringValue = "";
        this.validate = true;
        this.KeyClick = new core_1.EventEmitter();
        this.filteredList = [];
        this.filterArray = [];
        this.query = '';
        this.limeter = limeter;
    }
    KeywordTextboxComponent.prototype.ngOnChanges = function (changes) {
        if (this.fieldObject[0].LookupDetails != null) {
            var JsonObj = this.fieldObject[0].LookupDetails.LookupValues;
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }
    };
    KeywordTextboxComponent.prototype.ngOnInit = function () {
        if (this.fieldObject[0].LookupDetails != null) {
            var JsonObj = this.fieldObject[0].LookupDetails.LookupValues;
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }
        if (this.Key == "" || this.Key == null) {
            this.Key = 2;
        }
        this.currentfocus = document.activeElement;
    };
    KeywordTextboxComponent.prototype.selectSearch = function (item) {
        this.query = item;
        this.filteredList = [];
        this.fieldObject[0].FieldValue = this.query;
        if (this.currentfocus)
            this.currentfocus.focus();
    };
    KeywordTextboxComponent.prototype.onMousedown = function (item) {
        this.query = item;
        this.filteredList = [];
        this.fieldObject[0].FieldValue = this.query;
    };
    KeywordTextboxComponent.prototype.filter = function (value) {
        this.stringValue = value.target.value;
        if (this.stringValue !== "" && this.stringValue.length >= this.Key && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null)
                    return (el.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
        this.fieldObject[0].FieldValue = value.target.value;
    };
    KeywordTextboxComponent.prototype.onKeysearch = function () {
        this.fieldObject[0].FieldValue = this.fieldObject[0].FieldValue.replace(/\\'/g, "'");
        this.fieldObject[0].FieldValue = this.fieldObject[0].FieldValue.replace(/'/g, "\\'");
        this.filteredList = [];
        this.KeyClick.emit({});
    };
    KeywordTextboxComponent.prototype.eventHandler = function (event) {
        if (event.keyCode == 13) {
            this.filteredList = [];
            /*this.KeyClick.emit({
            });*/
            event.stopPropagation();
        }
    };
    KeywordTextboxComponent.prototype.selectSearchonkeypress = function (Keyevent, item) {
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            this.selectSearch(item);
        }
    };
    KeywordTextboxComponent.prototype.onBlurMethod = function () {
        this.filteredList = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], KeywordTextboxComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], KeywordTextboxComponent.prototype, "keyWordLookupValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], KeywordTextboxComponent.prototype, "Keyword", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], KeywordTextboxComponent.prototype, "Key", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], KeywordTextboxComponent.prototype, "KeyClick", void 0);
    KeywordTextboxComponent = __decorate([
        core_1.Component({
            selector: 'KeywordTextBoxSearch',
            template: "\n    <div style=\"float:left;width:100%;\">\n               <div *ngIf=\"validate === true\"  control-group class=\"floating-label\" style=\"float:left;width:100%;\"> \n                <input tabindex=\"0\" onpaste=\"return false;\"  (blur)=onBlurMethod()  type=\"text\" validatetext style=\"width: 85%;\" [fieldObject]='fieldObject[0]' class=\"validate filter-input\" [(ngModel)]=query (keyup)=filter($event) (ngModelChange)=\"fieldObject.FieldValue = $event\"  (keyup)=\"eventHandler($event)\" >    \n                <span style=\"\" [ngClass]=\"smartSearch == true ? 'smartSearchValidation':'SearchValidation'\" ></span>             \n                <input role=\"button\" tabindex=\"0\" aria-label=\"Keyword Search\" onpaste=\"return false;\" type=\"image\" src=\"Content/Icons/keyword-search.png\" (click)=\"onKeysearch()\" class=\"searchbtn\" style=\"border:hidden!important;\"/>    \n                <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                        <ul>\n                            <li (mousedown)=\"onMousedown(item)\" *ngFor=\"let item of filteredList\" style=\"line-height:25px;border:1px solid #eeeded\" (click)=\"selectSearch(item)\" tabindex=\"0\" [attr.aria-label]=\"''+item\" (keypress)=\"selectSearchonkeypress($event,item)\">\n                                <a>{{item}}</a>\n                            </li>\n                        </ul>\n                    </div>                  \n               </div>              \n    </div> ",
            inputs: ['fieldObject', 'smartSearch'],
            styleUrls: ['app/Framework/Views/Search/searchFields.css', 'app/Framework/Views/Search/Filter.css'],
            directives: [validate_directive_1.Validation],
            providers: [General_1.Delimeter]
        }), 
        __metadata('design:paramtypes', [General_1.Delimeter])
    ], KeywordTextboxComponent);
    return KeywordTextboxComponent;
}());
exports.KeywordTextboxComponent = KeywordTextboxComponent;
//# sourceMappingURL=keywordtextbox.js.map