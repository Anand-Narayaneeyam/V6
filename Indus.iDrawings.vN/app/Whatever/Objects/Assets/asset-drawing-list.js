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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require('../../common/drawingdetails/drawingdetails.component');
var AssetsDrawingList = (function () {
    function AssetsDrawingList() {
        this.selectedTab = 0;
    }
    AssetsDrawingList.prototype.ngOnInit = function () {
        this.pageTarget = 1;
        this.objectCategoryId = 1;
        this.moduleId = 7;
    };
    AssetsDrawingList = __decorate([
        core_1.Component({
            selector: 'assetDrawinglist',
            templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
            directives: [page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetsDrawingList);
    return AssetsDrawingList;
}());
exports.AssetsDrawingList = AssetsDrawingList;
//# sourceMappingURL=asset-drawing-list.js.map