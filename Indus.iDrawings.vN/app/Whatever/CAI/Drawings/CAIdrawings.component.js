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
var space_service_1 = require('../../../Models/Space/space.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require("../../common/drawingdetails/drawingdetails.component");
var CAIDrawingListComponent = (function () {
    function CAIDrawingListComponent(_spaceService, differs) {
        this._spaceService = _spaceService;
        this.differs = differs;
        this.selectedTab = 0;
        this.pagePath = "Space / Drawings ";
        this.getSelectedFloorDrawing = new core_1.EventEmitter();
        this.viewDrawing = false;
        this.differ = differs.find({}).create(null);
    }
    CAIDrawingListComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    CAIDrawingListComponent.prototype.ngOnInit = function () {
        this.pageTarget = 1;
        this.moduleId = 12;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CAIDrawingListComponent.prototype, "getSelectedFloorDrawing", void 0);
    CAIDrawingListComponent = __decorate([
        core_1.Component({
            selector: 'CAI-drawinglist',
            templateUrl: './app/Views/CAI/Drawings/CAIdrawings.component.html',
            directives: [search_component_1.searchBox, page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, core_1.KeyValueDiffers])
    ], CAIDrawingListComponent);
    return CAIDrawingListComponent;
}());
exports.CAIDrawingListComponent = CAIDrawingListComponent;
//# sourceMappingURL=CAIdrawings.component.js.map