import {Component} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {DrawingLayerNamesComponent} from './drawing-layer-names.component';
import {LayerFunctionMappingComponent} from './layer-function-mappings.component';
import {PlotStyleComponent} from './plot-style.component';
import {DrawingLayersComponent} from './drawing-layers.component';
import {AssignstyleDrawingLayerComponent} from './assignstyle-drawing-layer';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DrawingLayerComponent } from '../General Settings/drawing-layer-component';
import { LayerFunctionMappingsComponent } from '../General Settings/layer-function-mapping-component';

@Component({
    selector: 'drawing-settings',
    templateUrl: './app/Views/Administration/Drawing Settings/drawing-settings.component.html',
    directives: [SectionComponent, DrawingLayerNamesComponent, PlotStyleComponent, PageComponent, DrawingLayersComponent, LayerFunctionMappingComponent, AssignstyleDrawingLayerComponent, DrawingLayerComponent, LayerFunctionMappingsComponent]
})
export class DrawingSettingsComponent {
    pagepath = "Settings /Administration / Drawing Settings";
    pageTitle: string = "Drawing Settings";
    isAdmin: boolean = false;
    showLayer: boolean = false;
    sectionExpansionStatus = [{ "title": "iDrawings Layer Names", "isExpanded": false }, { "title": "Plot Style", "isExpanded": false }, { "title": "Assign Style for Drawing Layers", "isExpanded": false }, { "title": "Drawing Layers", "isExpanded": false }, { "title": "Layer Function Mappings", "isExpanded": false }
        , { "title": "Drawing Layers", "isExpanded": false }, { "title": "Layer Function Mappings", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {

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
            } else {
                objContext.showLayer = false;
                objContext.sectionExpansionStatus[0].isExpanded = true;
            }
        });

    }
    onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {
                this.sectionExpansionStatus[i].isExpanded = true;
                console.log("this.sectionExpansionStatus[i]", this.sectionExpansionStatus[i]);
                console.log("check", this.sectionExpansionStatus[i].title, this.sectionExpansionStatus[i].isExpanded);
            }
        }
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };
}