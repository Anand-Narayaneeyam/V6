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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var AddSymbol_1 = require('./AddSymbol');
var AssignSymbol_1 = require('./AssignSymbol');
var fileuploadcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var SymbolLibrarySettings = (function () {
    function SymbolLibrarySettings(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "Symbol Library";
        this.sectionExpansionStatus = [{ "title": "Add Symbol", "isExpanded": false }, { "title": "Assign Symbol", "isExpanded": false }];
    }
    SymbolLibrarySettings.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        contextObj.pagePath = "Settings/Administration/Symbol Library";
    };
    SymbolLibrarySettings.prototype.onSectionExpandChange = function (obj) {
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
    SymbolLibrarySettings = __decorate([
        core_1.Component({
            selector: 'General-Settings',
            templateUrl: './app/Views/Administration/SymbolLibrary/General Settings.html',
            directives: [section_component_1.SectionComponent, AddSymbol_1.AddSymbolLibrary, fileuploadcomponent_component_1.FileUploadComponent, page_component_1.PageComponent, AssignSymbol_1.SymbolAssign]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], SymbolLibrarySettings);
    return SymbolLibrarySettings;
}());
exports.SymbolLibrarySettings = SymbolLibrarySettings;
//# sourceMappingURL=General Settings.js.map