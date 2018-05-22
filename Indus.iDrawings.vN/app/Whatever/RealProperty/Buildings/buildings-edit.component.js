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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var map_component_1 = require('../../../Framework/Whatever/Map/map.component');
var BuildingEditComponent = (function () {
    function BuildingEditComponent(realPropertyService, _notificationService) {
        this.realPropertyService = realPropertyService;
        this._notificationService = _notificationService;
        this.dataKey = "BuildingId";
        this.submitSuccess = new core_1.EventEmitter();
        this.splitview = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.pageTitle = "";
        this.flag = false;
        this.inputItems = [];
    }
    BuildingEditComponent.prototype.ngOnInit = function () {
    };
    //Edit - Submit functionality
    BuildingEditComponent.prototype.onSubmitData = function (event) {
        console.log(event);
        var contextObj = this;
        if (this.btnName == "Save Changes") {
            this.realPropertyService.submitBuildingEdit(event["fieldobject"], this.selectedId).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Building updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building already exists", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Building Code already exists", 5);
                }
            });
        }
    };
    BuildingEditComponent.prototype.popupItemEmit = function (event) {
        this.pageTitle = "Map";
        this.getGisData(event);
    };
    BuildingEditComponent.prototype.getGisData = function (event) {
        var contextObj = this;
        contextObj.inputItems = [];
        var draggedLatitude = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 51; })]["FieldValue"];
        var draggedLongitude = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 54; })]["FieldValue"];
        if (draggedLatitude && draggedLongitude) {
            if (draggedLatitude >= -90 && draggedLatitude <= 90 && draggedLongitude >= -180 && draggedLongitude <= 180) {
                var Site, Building, OwnershipType, DateofConstruction, BuildingCondition;
                var Popup, subPopup, color;
                var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 46; });
                var draggedOwnershipId = contextObj.fieldDetailsAdd[index]["FieldValue"];
                if (draggedOwnershipId >= 0) {
                    var OwnershipLookup = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = OwnershipLookup.findIndex(function (c) { return c.Id == draggedOwnershipId; });
                    OwnershipType = OwnershipLookup[index].Value;
                }
                index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 45; });
                var draggedBuildingConditionId = contextObj.fieldDetailsAdd[index]["FieldValue"];
                //BuildingCondition = draggedBuildingConditionId
                if (draggedBuildingConditionId >= 0) {
                    var BuildingConditionLookup = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = BuildingConditionLookup.findIndex(function (c) { return c.Id == draggedBuildingConditionId; });
                    BuildingCondition = BuildingConditionLookup[index].Value;
                }
                index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38; });
                var SiteId = contextObj.fieldDetailsAdd[index]["FieldValue"];
                //BuildingCondition = draggedBuildingConditionId
                if (SiteId >= 0) {
                    var SiteLookup = contextObj.fieldDetailsAdd[index].LookupDetails.LookupValues;
                    index = SiteLookup.findIndex(function (c) { return c.Id == SiteId; });
                    Site = SiteLookup[index].Value;
                }
                //Site = this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38 })]["FieldValue"];
                var draggedid = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 38; })];
                Building = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 39; })]["FieldValue"];
                DateofConstruction = contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 47; })]["FieldValue"];
                Popup = "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Site + "\">SITE: " + Site + "</b><br/>"
                    + "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Building + "\">BUILDING: " + Building + "</b>"
                    + "<hr style=\"height: 1px;width:190px;color: #333;background-color:#333;margin-left:0px;margin-top: 5px;margin-bottom: 5px;\" />"
                    + "<table style=\"position:relative;font-size:13px;\"><tr><td style=\"white-space:nowrap;\">Ownership Type</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + OwnershipType + "</td></tr>";
                subPopup = "";
                if (DateofConstruction)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Construction Date</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + DateofConstruction + "</td></tr>";
                if (BuildingCondition)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Building Condition</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + BuildingCondition + "</td></tr>";
                Popup = Popup + subPopup + "</table>";
                if (contextObj.fieldDetailsAdd[contextObj.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 46; })]["FieldValue"] == 3) {
                    color = "Red";
                }
                else {
                    color = "Blue";
                }
                if (Popup) {
                    contextObj.inputItems.push({ Id: 0, Latitude: draggedLatitude, Longitude: draggedLongitude, Popup: Popup, Color: color, Draggable: true });
                    contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
                    contextObj.flag = true;
                    contextObj._notificationService.ShowToaster("Drag Pushpin to update Latitude and Longitude", 2);
                }
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Enter Latitude and Longitude Values", 5);
        }
    };
    BuildingEditComponent.prototype.outputDraggedValue = function (event) {
        var contextObj = this;
        var DraggedItem = event.DraggedItem;
        this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 51; })]["FieldValue"] = DraggedItem.Latitude;
        this.fieldDetailsAdd[this.fieldDetailsAdd.findIndex(function (el) { return el.FieldId == 54; })]["FieldValue"] = DraggedItem.Longitude;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingEditComponent.prototype, "submitSuccess", void 0);
    BuildingEditComponent = __decorate([
        core_1.Component({
            selector: 'building-Edit',
            templateUrl: './app/Views/RealProperty/Buildings/buildings-edit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [map_component_1.MapComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent],
            inputs: ['selectedId', 'fieldDetailsAdd', 'btnName']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], BuildingEditComponent);
    return BuildingEditComponent;
}());
exports.BuildingEditComponent = BuildingEditComponent;
//# sourceMappingURL=buildings-edit.component.js.map