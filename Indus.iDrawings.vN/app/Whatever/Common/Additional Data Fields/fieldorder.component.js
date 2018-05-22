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
var ng2_dnd_1 = require('../../../Framework/ExternalLibraries/dnd/ng2-dnd');
var FieldOrderComponent = (function () {
    function FieldOrderComponent() {
        this.fieldorder = new core_1.EventEmitter();
        this.fieldId = [];
    }
    FieldOrderComponent.prototype.ngOnInit = function () {
        this.Fieldordersource = this.fieldData;
    };
    FieldOrderComponent.prototype.SaveClick = function () {
        this.fieldObjectArray = this.Fieldordersource;
        for (var i = 0; i < this.fieldObjectArray.length; i++) {
            this.fieldId[i] = this.fieldObjectArray[i][this.dataKey];
        }
        console.log(this.Fieldordersource, this.fieldId);
        this.fieldorder.emit(this.Fieldordersource);
    };
    FieldOrderComponent.prototype.CancelClick = function () {
        this.fieldorder.emit("cancel");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldOrderComponent.prototype, "fieldData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldOrderComponent.prototype, "colmntoOdr", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldOrderComponent.prototype, "dataKey", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldOrderComponent.prototype, "fieldorder", void 0);
    FieldOrderComponent = __decorate([
        core_1.Component({
            selector: 'Field-Order',
            templateUrl: 'app/Views/Common/Additional Data Fields/fieldorder.html',
            inputs: ['fieldData'],
            directives: [ng2_dnd_1.DND_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], FieldOrderComponent);
    return FieldOrderComponent;
}());
exports.FieldOrderComponent = FieldOrderComponent;
//# sourceMappingURL=fieldorder.component.js.map