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
var SearchQueryConditionComponent = (function () {
    function SearchQueryConditionComponent() {
    }
    SearchQueryConditionComponent.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        var testdatasource = contextObj.datasource;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchQueryConditionComponent.prototype, "datasource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SearchQueryConditionComponent.prototype, "conditionindex", void 0);
    SearchQueryConditionComponent = __decorate([
        core_1.Component({
            selector: 'qbsearchquerycondition',
            templateUrl: 'app/Framework/Views/QueryBuilder/searchquerycondition.component.html',
            directives: [SearchQueryConditionComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchQueryConditionComponent);
    return SearchQueryConditionComponent;
}());
exports.SearchQueryConditionComponent = SearchQueryConditionComponent;
//# sourceMappingURL=searchquerycondition.component.js.map