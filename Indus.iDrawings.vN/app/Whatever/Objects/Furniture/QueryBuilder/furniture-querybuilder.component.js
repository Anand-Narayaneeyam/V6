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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var querybuildersearch_component_1 = require('../../../../framework/whatever/querybuilder/querybuildersearch.component');
var objects_service_1 = require('../../../../models/objects/objects.service');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var FurnitureQueryBuilderComponent = (function () {
    function FurnitureQueryBuilderComponent(objectsService) {
        this.objectsService = objectsService;
        this.dataoption = "1";
    }
    FurnitureQueryBuilderComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.pagePath = "Furniture / Query Builder";
        contextObj.moduleId = 8;
        contextObj.QueryCategryId = "10";
        contextObj.objectCategoryId = 2;
        contextObj.objectsService.getObjectClassSelectionFieldsList(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldDetailsCheckBox = (result["Data"][0]);
            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, "", contextObj.dataoption, 1, 0).subscribe(function (resultData) {
                contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
            });
        });
    };
    FurnitureQueryBuilderComponent.prototype.Next = function (event) {
    };
    FurnitureQueryBuilderComponent = __decorate([
        core_1.Component({
            selector: 'furniture-querybuilder',
            templateUrl: './app/Views/Objects/QueryBuilder/objects-querybuilder.component.html',
            directives: [page_component_1.PageComponent, querybuildersearch_component_1.QueryBuilderComponent, listboxcomponent_component_1.ListBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, objects_service_1.ObjectsService]
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService])
    ], FurnitureQueryBuilderComponent);
    return FurnitureQueryBuilderComponent;
}());
exports.FurnitureQueryBuilderComponent = FurnitureQueryBuilderComponent;
//# sourceMappingURL=furniture-querybuilder.component.js.map