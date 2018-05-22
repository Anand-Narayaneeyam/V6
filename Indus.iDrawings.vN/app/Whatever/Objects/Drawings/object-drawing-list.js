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
var ObjectDrawingList = (function () {
    function ObjectDrawingList() {
        this.selectedTab = 0;
    }
    ObjectDrawingList.prototype.ngOnInit = function () {
        if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
            this.pageTarget = 1;
        }
        else {
            this.pageTarget = 2;
        }
        this.selectedRow = this.selectedRowDetails;
        switch (this.objectCategoryId) {
            case 1:
                this.moduleId = 7;
                break;
            case 2:
                this.moduleId = 8;
                break;
            case 3:
                this.moduleId = 6;
                break;
            case 8:
                this.moduleId = 17;
                break;
            case 9:
                this.moduleId = 18;
                break;
            case 10:
                this.moduleId = 25;
                break;
            case 11:
                this.moduleId = 26;
                break;
            case 12:
                this.moduleId = 27;
                break;
            case 20:
                this.moduleId = 24;
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDrawingList.prototype, "selectedRowDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDrawingList.prototype, "pageTarget", void 0);
    ObjectDrawingList = __decorate([
        core_1.Component({
            selector: 'objectDrawinglist',
            templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
            directives: [page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [http_1.HTTP_PROVIDERS],
            inputs: ["objectCategoryId", "moduleId"]
        }), 
        __metadata('design:paramtypes', [])
    ], ObjectDrawingList);
    return ObjectDrawingList;
}());
exports.ObjectDrawingList = ObjectDrawingList;
//# sourceMappingURL=object-drawing-list.js.map