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
var page_component_1 = require('../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../Framework/Whatever/Submenu/submenu.component');
var TestComponent = (function () {
    function TestComponent() {
        this.enableMenu = [];
        this.testMenu = [
            {
                "id": 0,
                "title": "Add",
                "image": "Home",
                "path": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Home",
                "path": null,
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Home",
                "path": null,
            },
            {
                "id": 3,
                "title": "Close",
                "image": "Home",
                "path": null,
            },
            {
                "id": 4,
                "title": "Reopen",
                "image": "Home",
                "path": null,
            }
        ];
        this.pageTitle = "test";
    }
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            templateUrl: './app/Views/test/test.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map