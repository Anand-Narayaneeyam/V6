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
var http_1 = require('@angular/http');
var ng2_dnd_1 = require('../../../FrameWork/ExternalLibraries/dnd/ng2-dnd');
var FieldOrderCommonComponent = (function () {
    function FieldOrderCommonComponent() {
        this.retFieldOrderUpdate = new core_1.EventEmitter();
    }
    FieldOrderCommonComponent.prototype.ngOnInit = function () {
        debugger;
    };
    FieldOrderCommonComponent.prototype.fieldOrderSaveClick = function () {
        var rptfldIds = [];
        var subHdrFldIds = [];
        for (var i = 0; i < this.rptFieldSource.length; i++) {
            rptfldIds.push(this.rptFieldSource[i]["Id"]);
        }
        console.log("data", rptfldIds);
        this.retFieldOrderUpdate.emit({ "rptFieldSrcIds": rptfldIds });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldOrderCommonComponent.prototype, "retFieldOrderUpdate", void 0);
    FieldOrderCommonComponent = __decorate([
        core_1.Component({
            selector: 'fieldorder-common',
            templateUrl: 'app/Views/Common/Field Order/fieldorder-common.component.html',
            directives: [ng2_dnd_1.DND_DIRECTIVES],
            providers: [ng2_dnd_1.DND_PROVIDERS, http_1.HTTP_PROVIDERS],
            inputs: ['rptFieldSource', 'fieldOrderTitle']
        }), 
        __metadata('design:paramtypes', [])
    ], FieldOrderCommonComponent);
    return FieldOrderCommonComponent;
}());
exports.FieldOrderCommonComponent = FieldOrderCommonComponent;
//# sourceMappingURL=fieldorder-common.component.js.map