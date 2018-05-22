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
var ListComponent = (function () {
    function ListComponent(el) {
        this.el = el;
        this.selectedIds = [];
        this.selectedIdsChange = new core_1.EventEmitter();
        this.previousCardObj = [];
        this.isAddedCard = false;
        this.listElement = el;
    }
    ListComponent.prototype.ngAfterContentChecked = function () {
    };
    ListComponent.prototype.changeSelectedIds = function (ids) {
        this.selectedIds.push(ids);
        this.selectedIdsChange.emit(this.selectedIds);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "selectedIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListComponent.prototype, "datakey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListComponent.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "selectedIdsChange", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], ListComponent.prototype, "userItemTemplate", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'list',
            template: "\n                <template ngFor [ngForOf] = \"source\" [ngForTemplate] = \"userItemTemplate\"   >\n                </template>",
            inputs: ['source', 'selectedIds', 'datakey', 'selectionMode'],
            styleUrls: ['app/Framework/Views/List/list.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map