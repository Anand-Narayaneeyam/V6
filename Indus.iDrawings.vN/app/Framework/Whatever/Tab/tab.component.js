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
var tabs_component_1 = require('./tabs.component');
var TabComponent = (function () {
    function TabComponent(tabs) {
        this.active = this.active || false;
        this.vertical = false;
        tabs.addTab(this);
    }
    TabComponent = __decorate([
        core_1.Component({
            selector: 'tab',
            templateUrl: 'app/Framework/Views/Tab/tab.component.html',
            directives: [tabs_component_1.TabsComponent],
            inputs: ['title:tabTitle', 'active', 'closeButtonVisible'],
            styleUrls: ['app/Framework/Views/Tab/tab.style.css']
        }), 
        __metadata('design:paramtypes', [tabs_component_1.TabsComponent])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map