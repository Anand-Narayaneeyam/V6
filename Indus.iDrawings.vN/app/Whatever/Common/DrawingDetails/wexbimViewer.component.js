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
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var administration_service_1 = require('../../..//models/administration/administration.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
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
var WexBMViewerComponent = (function () {
    function WexBMViewerComponent(asbuiltService, administrationService, notificationService) {
        this.asbuiltService = asbuiltService;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
    }
    WexBMViewerComponent.prototype.ngOnInit = function () {
        debugger;
    };
    WexBMViewerComponent.prototype.ngAfterViewInit = function () {
        debugger;
        var contextObj = this;
        contextObj.administrationService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            retData["CustomerId"];
            retData["CustomerName"];
            retData["UserId"];
            var filename = "Arboleda_Bldg-Arch1.wexbim";
            var mat4 = gl_matrix.mat4;
            var mat3 = gl_matrix.mat3;
            var vec3 = gl_matrix.vec3;
            if (retData != "") {
                $("#modelmenu").hide();
            }
            modelstrmr.OpenFile(contextObj.selectedRow["DWG File"], retData["CustomerName"], 0, contextObj.DrawingId, contextObj.RevisionNo, mat4, mat3, vec3, function (result) {
                debugger;
                if (result == 2)
                    contextObj.notificationService.ShowToaster("File Not Found", 5);
                else if (result == 0)
                    contextObj.notificationService.ShowToaster("Successfull", 3);
            });
        });
    };
    WexBMViewerComponent.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy");
        modelstrmr.CloseModel();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WexBMViewerComponent.prototype, "DrawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WexBMViewerComponent.prototype, "RevisionNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WexBMViewerComponent.prototype, "DrawingType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WexBMViewerComponent.prototype, "selectedRow", void 0);
    WexBMViewerComponent = __decorate([
        core_1.Component({
            selector: 'bimviewer',
            templateUrl: './app/Views/Common/DrawingDetails/WexbimViewer.component.html',
            directives: [],
            providers: [asbuilt_service_1.AsbuiltService, administration_service_1.AdministrationService, notify_service_1.NotificationService],
            styleUrls: ['./Scripts/WexBimDrawing/Libs/jquery-ui-styles/jquery-ui.min.css',
                './app/Views/Common/DrawingDetails/xbrowser-styles.css',
                './app/Views/Common/DrawingDetails/bootstrap.min.css',
                './app/Views/Common/DrawingDetails/Site.css']
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], WexBMViewerComponent);
    return WexBMViewerComponent;
}());
exports.WexBMViewerComponent = WexBMViewerComponent;
//function CloseModel() {
//    if (m_modelId != null) {
//        viewer.unload(m_modelId);
//        m_modelId = null;
//    }
//}
//m_modelId = args.id;
//# sourceMappingURL=wexbimViewer.component.js.map