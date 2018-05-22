var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../dashboard/objectdashboard.component.ts" />
var core_1 = require('@angular/core');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require('../../../common/drawingdetails/drawingdetails.component');
var objectdashboard_component_1 = require('../../dashboard/objectdashboard.component');
var AssetDashBoard = (function () {
    function AssetDashBoard() {
        //selectedRow: any[];
        //pagePath: string;
        this.pagePath = "Assets / Dashboard";
    }
    AssetDashBoard.prototype.ngOnInit = function () {
        // if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
        // this.objectCategoryId = 1;
        // this.moduleId = 7;
        //    this.pageTarget = 1;
        //} else {
        //    this.pageTarget = 2;
        //    this.selectedRow = this.selectedRowDetails;
        //    switch (this.objectCategoryId) {
        //        case 1: // Assets
        //           this.moduleId = 7;
        //            break;
        //        case 2: // Furniture
        //            this.moduleId = 8;
        //            break;
        //    }
        //}
    };
    AssetDashBoard = __decorate([
        core_1.Component({
            selector: 'assetdashboard',
            template: '<objectdashboard [objectCategoryId]="1" [moduleId]="7"></objectdashboard>',
            directives: [page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent, objectdashboard_component_1.ObjectDashBoard]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetDashBoard);
    return AssetDashBoard;
}());
exports.AssetDashBoard = AssetDashBoard;
//# sourceMappingURL=assetdashboard.component.js.map