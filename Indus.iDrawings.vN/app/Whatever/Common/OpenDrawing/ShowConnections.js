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
var space_service_1 = require('../../../Models/space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var treeview_component_1 = require('../../../Framework/Whatever/TreeView/treeview.component');
var ShowConnections = (function () {
    function ShowConnections(notificationService, generalFunctions, ObjectsService, generFun) {
        this.notificationService = notificationService;
        this.generalFunctions = generalFunctions;
        this.ObjectsService = ObjectsService;
        this.generFun = generFun;
        this.labelData = [];
        this.DataKey = "ObjectId";
        this.enableFlag = false;
        this.ShowConnectionBlink = new core_1.EventEmitter();
    }
    ShowConnections.prototype.ngOnInit = function () {
        this.labelData[0] = "Component Type: ";
        this.labelData[1] = "";
        this.labelData[2] = "";
        var contextObj = this;
        var drawingclass = JSON.parse(contextObj.fieldDetails[0])[0].Class;
        var Objnumber = JSON.parse(contextObj.fieldDetails[0])[0].ObjectNumber;
        var ObjectId = contextObj.fieldDetails[1];
        var objectCategoryId = contextObj.fieldDetails[2];
        var ConnectivityStatus = contextObj.fieldDetails[3];
        var isBuildingDrawing = contextObj.fieldDetails[4];
        var DrawingId = contextObj.fieldDetails[5];
        contextObj.ObjectsService.getShowConectivityField().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 4481) {
                    item.FieldValue = drawingclass;
                    item.IsEnabled = false;
                }
                else if (item.ReportFieldId == 500108) {
                    item.FieldValue = Objnumber;
                    item.IsEnabled = false;
                }
            });
            debugger;
            var temp = result["Data"].find(function (item) {
                if (item.ReportFieldId == 656)
                    return item;
            });
            contextObj.fieldDetailsAdd = result["Data"].splice(0, 2);
            contextObj.Fields = temp;
            var reportfields = new Array();
            reportfields.push({
                ReportFieldId: 649,
                Value: objectCategoryId,
            });
            reportfields.push({
                ReportFieldId: 4518,
                Value: ObjectId,
            });
            reportfields.push({
                ReportFieldId: 669,
                Value: DrawingId,
            });
            reportfields.push({
                ReportFieldId: 4508,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4509,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4510,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4769,
                Value: isBuildingDrawing,
            });
            contextObj.ObjectsService.getShowConectivityTreeView(JSON.stringify(reportfields)).subscribe(function (result) {
                debugger;
                if (result["Data"]["Table2"] == "[]") {
                    contextObj.notificationService.ShowToaster("No Connection exist", 5);
                }
                var fieldobj = new Array();
                fieldobj.push({
                    Table1: eval(result["Data"]["Table1"]),
                    Table2: eval(result["Data"]["Table3"]),
                    Table3: eval(result["Data"]["Table2"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
                var clmnfieldobj = new Array();
                clmnfieldobj.push({
                    clmn1: ["ConnectionHeadingId", "ConnectionHeading"],
                    clmn2: ["ObjectClassId", "ObjectClassName"],
                    clmn3: ["ObjectId", "NumberWithAssociation"]
                });
                contextObj.clmFieldTable = clmnfieldobj[0];
                //contextObj.selectedFieldData = '';
                contextObj.enableFlag = true;
            });
        });
    };
    ShowConnections.prototype.ShowConnectivity = function () {
    };
    ShowConnections.prototype.onSubmitData = function (event) {
        debugger;
    };
    ShowConnections.prototype.submit = function (value) {
        debugger;
        var contextObj = this;
        var PrimaryObjectId = contextObj.fieldDetails[1];
        var SecondaryObjectId = JSON.parse(value.FieldIdValues);
        if (value.FieldIdValues == "[]") {
            contextObj.notificationService.ShowToaster("No Component(s) selected", 5);
        }
        else {
            this.ShowConnectionBlink.emit({
                "PrimaryObjectId": PrimaryObjectId,
                "SecondaryObjectId": SecondaryObjectId
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShowConnections.prototype, "fieldDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ShowConnections.prototype, "ShowConnectionBlink", void 0);
    ShowConnections = __decorate([
        core_1.Component({
            selector: 'Show-Connections',
            templateUrl: './app/Views/Common/OpenDrawing/ShowConnections.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent, treeview_component_1.TreeView],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions, objects_service_1.ObjectsService],
            inputs: ['fieldDetails', 'drawingId', 'isBuildingDrawing'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, General_1.GeneralFunctions, objects_service_1.ObjectsService, General_1.GeneralFunctions])
    ], ShowConnections);
    return ShowConnections;
}());
exports.ShowConnections = ShowConnections;
//# sourceMappingURL=ShowConnections.js.map