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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var SchedulingFloorPlanViewHelpComponent = (function () {
    function SchedulingFloorPlanViewHelpComponent() {
        this.pageTitle = "Floor Plan View";
        this.isAdmin = false;
        this.enableGLAccount = false;
        this.sectionExpansionStatus = [{ "title": "Floor Plans", "isExpanded": false }, { "title": "Data", "isExpanded": false }];
    }
    SchedulingFloorPlanViewHelpComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Help / Scheduling / Floor Plan View";
    };
    SchedulingFloorPlanViewHelpComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };
    ;
    SchedulingFloorPlanViewHelpComponent = __decorate([
        core_1.Component({
            selector: 'scheduling-FloorPlanView-Help',
            templateUrl: './app/Views/Help/Scheduling/scheduling-floorplanview.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SchedulingFloorPlanViewHelpComponent);
    return SchedulingFloorPlanViewHelpComponent;
}());
exports.SchedulingFloorPlanViewHelpComponent = SchedulingFloorPlanViewHelpComponent;
//# sourceMappingURL=scheduling-floorplanview.js.map