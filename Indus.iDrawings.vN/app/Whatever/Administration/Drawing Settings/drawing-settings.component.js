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
var drawing_layer_names_component_1 = require('./drawing-layer-names.component');
var layer_function_mappings_component_1 = require('./layer-function-mappings.component');
var plot_style_component_1 = require('./plot-style.component');
var drawing_layers_component_1 = require('./drawing-layers.component');
var assignstyle_drawing_layer_1 = require('./assignstyle-drawing-layer');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var drawing_layer_component_1 = require('../General Settings/drawing-layer-component');
var layer_function_mapping_component_1 = require('../General Settings/layer-function-mapping-component');
var DrawingSettingsComponent = (function () {
    function DrawingSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagepath = "Settings /Administration / Drawing Settings";
        this.pageTitle = "Drawing Settings";
        this.isAdmin = false;
        this.showLayer = false;
        this.sectionExpansionStatus = [{ "title": "iDrawings Layer Names", "isExpanded": false }, { "title": "Plot Style", "isExpanded": false }, { "title": "Assign Style for Drawing Layers", "isExpanded": false }, { "title": "Drawing Layers", "isExpanded": false }, { "title": "Layer Function Mappings", "isExpanded": false },
            { "title": "Drawing Layers", "isExpanded": false }, { "title": "Layer Function Mappings", "isExpanded": false }];
    }
    DrawingSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId <= 2) {
                objContext.isAdmin = true;
            }
        });
        this.administrationService.getCustomerSubscribedFeatures("118").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                objContext.showLayer = true;
            }
            else {
                objContext.showLayer = false;
                objContext.sectionExpansionStatus[0].isExpanded = true;
            }
        });
    };
    DrawingSettingsComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
                console.log("this.sectionExpansionStatus[i]", this.sectionExpansionStatus[i]);
                console.log("check", this.sectionExpansionStatus[i].title, this.sectionExpansionStatus[i].isExpanded);
            }
        }
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };
    ;
    DrawingSettingsComponent = __decorate([
        core_1.Component({
            selector: 'drawing-settings',
            templateUrl: './app/Views/Administration/Drawing Settings/drawing-settings.component.html',
            directives: [section_component_1.SectionComponent, drawing_layer_names_component_1.DrawingLayerNamesComponent, plot_style_component_1.PlotStyleComponent, page_component_1.PageComponent, drawing_layers_component_1.DrawingLayersComponent, layer_function_mappings_component_1.LayerFunctionMappingComponent, assignstyle_drawing_layer_1.AssignstyleDrawingLayerComponent, drawing_layer_component_1.DrawingLayerComponent, layer_function_mapping_component_1.LayerFunctionMappingsComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], DrawingSettingsComponent);
    return DrawingSettingsComponent;
}());
exports.DrawingSettingsComponent = DrawingSettingsComponent;
//# sourceMappingURL=drawing-settings.component.js.map