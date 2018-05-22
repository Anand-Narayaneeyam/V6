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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var resource_types_component_1 = require('./resource-types.component');
var space_resources_component_1 = require('./space_resources.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var SpaceResourcesComponent = (function () {
    function SpaceResourcesComponent() {
        this.pageTitle = "Space Resources";
    }
    SpaceResourcesComponent.prototype.ngOnInit = function () {
        this.pagePath = "Space / Space Resources";
    };
    SpaceResourcesComponent = __decorate([
        core_1.Component({
            selector: 'space-resources',
            templateUrl: './app/Views/Space/Space Resources/space-resources.component.html',
            directives: [page_component_1.PageComponent, section_component_1.SectionComponent, resource_types_component_1.ResouceTypesComponent, space_resources_component_1.Space_ResourcesComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceResourcesComponent);
    return SpaceResourcesComponent;
}());
exports.SpaceResourcesComponent = SpaceResourcesComponent;
//# sourceMappingURL=space-resources.component.js.map