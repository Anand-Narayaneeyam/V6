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
var SpacesDashBoardHelpComponent = (function () {
    function SpacesDashBoardHelpComponent() {
        this.pageTitle = "Dash Board";
        this.isAdmin = false;
        this.enableGLAccount = false;
        this.sectionExpansionStatus = [{ "title": "Dash Board", "isExpanded": false }];
    }
    SpacesDashBoardHelpComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Help / Space / Dash Board";
    };
    SpacesDashBoardHelpComponent.prototype.onSectionExpandChange = function (obj) {
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
    SpacesDashBoardHelpComponent = __decorate([
        core_1.Component({
            selector: 'space-DashBoard-Help',
            templateUrl: './app/Views/Help/Space/space-dash-board.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SpacesDashBoardHelpComponent);
    return SpacesDashBoardHelpComponent;
}());
exports.SpacesDashBoardHelpComponent = SpacesDashBoardHelpComponent;
//# sourceMappingURL=space-dash-board.js.map