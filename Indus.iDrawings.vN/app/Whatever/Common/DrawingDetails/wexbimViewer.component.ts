import {Component, OnInit, AfterViewInit, Input, OnDestroy} from '@angular/core';
import {AsbuiltService} from '../../../Models/Asbuilts/asbuilt.service';
import {AdministrationService} from '../../..//models/administration/administration.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

//require('../../../../Scripts/WexBimDrawing/Libs/jquery.js');
require('../../../../Scripts/WexBimDrawing/Libs/jquery-ui.js');
//require('../../../../Scripts/WexBimDrawing/jquery-1.12.4.min.js');
//require('../../../../Scripts/WexBimDrawing/jquery-ui-1.12.1.min.js');
require('../../../../Scripts/WexBimDrawing/Libs/webgl-utils.js');
var gl_matrix = require('../../../../Scripts/WexBimDrawing/Libs/gl-matrix.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-binary-reader.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-model-geometry.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-model-handle.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-product-type.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-shaders.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-state.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-triangulated-shape.debug.js');
require('../../../../Scripts/WexBimDrawing/Viewer/xbim-viewer.debug.js');
require('../../../../Scripts/WexBimDrawing/Plugins/NavigationCube/xbim-navigation-cube-shaders.debug.js');
require('../../../../Scripts/WexBimDrawing/Plugins/NavigationCube/xbim-navigation-cube-textures.debug.js');
require('../../../../Scripts/WexBimDrawing/Plugins/NavigationCube/xbim-navigation-cube.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-attribute-dictionary.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-browser.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-cobie-utils.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-cobieuk-utils.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-attribute.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-entity.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-model.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-property.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-templates.debug.js');
require('../../../../Scripts/WexBimDrawing/Browser/xbim-visual-assignment-set.debug.js');
var modelstrmr = require('../../../../Scripts/WexBimDrawing/WexBim/modelstreamer.js');
require('../../../../Scripts/WexBimDrawing/WexBim/menus.js');

@Component({
    selector: 'bimviewer',
    templateUrl: './app/Views/Common/DrawingDetails/WexbimViewer.component.html',
    directives: [],
    providers: [AsbuiltService, AdministrationService, NotificationService],
    styleUrls: ['./Scripts/WexBimDrawing/Libs/jquery-ui-styles/jquery-ui.min.css',
        './app/Views/Common/DrawingDetails/xbrowser-styles.css',
        './app/Views/Common/DrawingDetails/bootstrap.min.css',
        './app/Views/Common/DrawingDetails/Site.css']
})

export class WexBMViewerComponent {
    @Input() DrawingId: string;
    @Input() RevisionNo: string;
    @Input() DrawingType: string;
    @Input() selectedRow: string;

    constructor(private asbuiltService: AsbuiltService, private administrationService: AdministrationService, private notificationService: NotificationService) {

    }
    ngOnInit() {
        debugger

    }

    ngAfterViewInit() {
        debugger
        var contextObj = this;
        contextObj.administrationService.getSessionData().subscribe(function (data) {
            debugger
            var retData = data["Data"];
            retData["CustomerId"]
            retData["CustomerName"]
            retData["UserId"]
            var filename = "Arboleda_Bldg-Arch1.wexbim";
            var mat4 = gl_matrix.mat4;
            var mat3 = gl_matrix.mat3;
            var vec3 = gl_matrix.vec3;
            if (retData != "") {
                $("#modelmenu").hide();
             //   $("#quickProperties").hide();
            }
            modelstrmr.OpenFile(contextObj.selectedRow["DWG File"], retData["CustomerName"], 0, contextObj.DrawingId, contextObj.RevisionNo, mat4, mat3, vec3, function (result) {
                debugger
                if (result == 2)
                    contextObj.notificationService.ShowToaster("File Not Found", 5);
                else if (result == 0)
                    contextObj.notificationService.ShowToaster("Successfull", 3);
            });
        });
    }
    ngOnDestroy() {
        console.log("ngOnDestroy");
        modelstrmr.CloseModel();
    }

}








//function CloseModel() {
//    if (m_modelId != null) {
//        viewer.unload(m_modelId);
//        m_modelId = null;
//    }
//}
//m_modelId = args.id;
