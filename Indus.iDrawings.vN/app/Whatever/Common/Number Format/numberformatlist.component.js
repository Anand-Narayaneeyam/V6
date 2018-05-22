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
var validate_directive_1 = require('../../../framework/whatever/validation/validate.directive');
var NumberFormatListComponent = (function () {
    function NumberFormatListComponent() {
        this.selectedId = -1;
        this.strClassName = "";
        this.strValidation = "";
        this.imgsrc1 = "Content/list_adD.png";
        this.imgsrc2 = "Content/list_removE.png";
        this.enableButton = true;
        this.dynamicListAdd = new core_1.EventEmitter();
        this.dynamicListRemove = new core_1.EventEmitter();
        this.blnHasValidationError = false;
    }
    NumberFormatListComponent.prototype.ngOnInit = function () {
        this.validationMessage();
    };
    NumberFormatListComponent.prototype.ngAfterViewChecked = function () {
        this.validationMessage();
    };
    NumberFormatListComponent.prototype.addListItem = function (event, list) {
        this.dynamicListAdd.emit({
            FieldObject: this.fieldObject,
            List: list,
            SelectedId: this.selectedId
        });
    };
    NumberFormatListComponent.prototype.keyForDeleteOrAdd = function (event, dlist, id) {
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
    };
    NumberFormatListComponent.prototype.dlistClick = function (event) {
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
    };
    NumberFormatListComponent.prototype.removeListItem = function (event, list) {
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
    };
    NumberFormatListComponent.prototype.validationMessage = function () {
        var contextObj = this;
        if (contextObj.fieldObject.IsMandatory == true) {
            if (!contextObj.fieldObject.LookupDetails || !contextObj.fieldObject.LookupDetails.LookupValues || contextObj.fieldObject.LookupDetails.LookupValues.length == 0) {
                contextObj.fieldObject.HasValidationError = true;
                contextObj.blnHasValidationError = true;
                if (contextObj.strLstBoxValidateMessage != undefined) {
                    contextObj.strValidation = contextObj.strLstBoxValidateMessage;
                }
                else {
                    contextObj.strValidation = "Select " + contextObj.fieldObject.FieldLabel;
                }
            }
            else {
                contextObj.fieldObject.HasValidationError = false;
                contextObj.blnHasValidationError = false;
            }
        }
        else {
            contextObj.fieldObject.HasValidationError = false;
            contextObj.blnHasValidationError = false;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberFormatListComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NumberFormatListComponent.prototype, "strLstBoxValidateMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NumberFormatListComponent.prototype, "imgsrc1", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NumberFormatListComponent.prototype, "imgsrc2", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NumberFormatListComponent.prototype, "enableButton", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NumberFormatListComponent.prototype, "dynamicListAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NumberFormatListComponent.prototype, "dynamicListRemove", void 0);
    NumberFormatListComponent = __decorate([
        core_1.Component({
            selector: 'NumberFormatListComponent',
            templateUrl: './app/Views/Common/Number Format/numberformatlist.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [])
    ], NumberFormatListComponent);
    return NumberFormatListComponent;
}());
exports.NumberFormatListComponent = NumberFormatListComponent;
//# sourceMappingURL=numberformatlist.component.js.map