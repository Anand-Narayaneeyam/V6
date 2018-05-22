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
var map_component_1 = require('../../../Framework/Whatever/Map/map.component');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var buildings_edit_component_1 = require('../Buildings/buildings-edit.component');
var General_1 = require('../../../Models/Common/General');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var contextmenu_component_1 = require('../../../Framework/Whatever/contextmenu/contextmenu.component');
var drawings_component_1 = require('../../asbuilts/drawings/drawings.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var BuildingsMapComponent = (function () {
    function BuildingsMapComponent(administrationService, realPropertyservice, notificationService, generFun) {
        this.administrationService = administrationService;
        this.realPropertyservice = realPropertyservice;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = [];
        this.alignContent = "horizontal";
        this.flag = false;
        this.splitview = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.target = true;
        this.submitSuccess = new core_1.EventEmitter();
        this.pageTitle = "";
        this.pagePath = 'Real Property / Map';
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.sessionflag = true;
    }
    BuildingsMapComponent.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        contextObj.OwnershipId = 0;
        this.realPropertyservice.getMapColumns().subscribe(function (resultData) {
            contextObj.OwnershipCategory = resultData["Data"][0];
            contextObj.OwnershipCategory.FieldValue = "0";
            contextObj.getGisData("0");
        });
    };
    BuildingsMapComponent.prototype.onChangeDataFieldCategory = function (event) {
        this.flag = false;
        if (event >= 0)
            this.getGisData(event);
    };
    BuildingsMapComponent.prototype.getGisData = function (event) {
        debugger;
        var contextObj = this;
        var Popup;
        var subPopup;
        var color;
        contextObj.inputItems = [];
        var Site, Building, OwnershipType, DateofConstruction, BuildingCondition;
        this.realPropertyservice.getGISData(event).subscribe(function (resultData) {
            contextObj.flag = true;
            contextObj.buildingMapSource = JSON.parse(resultData["FieldBinderData"]);
            for (var i = 0; i < contextObj.buildingMapSource.length; i++) {
                Site = contextObj.buildingMapSource[i]["Name"];
                Building = contextObj.buildingMapSource[i]["Building Name"];
                OwnershipType = contextObj.buildingMapSource[i]["OwnershipType"];
                DateofConstruction = contextObj.buildingMapSource[i]["DateofConstruction"];
                BuildingCondition = contextObj.buildingMapSource[i]["BuildingConditions"];
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
                if (contextObj.buildingMapSource[i]["OwnershipTypeId"] == 3) {
                    color = "Red";
                }
                else {
                    color = "Blue";
                }
                contextObj.inputItems.push({ Id: contextObj.buildingMapSource[i]["Id"], Latitude: contextObj.buildingMapSource[i]["Latitude"], Longitude: contextObj.buildingMapSource[i]["Longitude"], Popup: Popup, Color: color, Draggable: false });
            }
            //contextObj.realPropertyservice.getSessionData().subscribe(function (data) {
            //    var retData = data["Data"];
            //    contextObj.sessionUserId = retData["UserId"];
            //    contextObj.sessionUserCatId = retData["UserCategoryId"];
            //    contextObj.sessionUserRoleId = retData["UserRoleId"];
            //    if (contextObj.sessionUserRoleId != 4) {
            //        contextObj.sessionflag = true
            //    }
            //    else {
            //        contextObj.sessionflag = false
            //    }
            //});
            var fieldobj = new Array();
            fieldobj.push({ ReportFieldId: 343, Value: "34" });
            fieldobj.push({ ReportFieldId: 340, Value: "94" });
            contextObj.administrationService.getPagePrivilege(fieldobj).subscribe(function (resultData) {
                var privilegeData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                var contextmenu = privilegeData.find(function (item) { return item.Id === 94; });
                if (contextmenu.HasRight == true) {
                    contextObj.sessionflag = true;
                }
                else {
                    contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (data) {
                        contextObj.sessionflag = data["Data"];
                    });
                }
            });
        });
    };
    BuildingsMapComponent.prototype.outputItems = function (ids) {
        debugger;
        var contextObj = this;
        contextObj.target = true;
        if (contextObj.sessionflag == true) {
            contextObj.btnName = "Save Changes";
            contextObj.action = "edit";
            contextObj.pageTitle = "Edit Building";
            contextObj.selectedId = ids["Item"].Id;
            if (this.buildingMapSource[this.buildingMapSource.findIndex(function (c) { return c.Id == contextObj.selectedId; })]["Status"] == "Active") {
                this.realPropertyservice.loadBuildingAddEdit(contextObj.selectedId, "edit").subscribe(function (result) {
                    contextObj.fieldDetailsBuildingEdit = result["Data"];
                    contextObj.fieldDetailsBuildingEdit[3].IsVisible = false;
                    contextObj.fieldDetailsBuildingEdit[6].IsEnabled = false;
                    //console.log("Field object" + contextObj.fieldDetailsBuildingEdit)
                    contextObj.fieldDetailsBuildingEdit.find(function (el) {
                        //console.log("FieldId" + el.FieldId)
                        if (el.FieldId == 54) {
                            el.LookupDetails.PopupComponent = { Name: "Validate on Map", showImage: false };
                            return true;
                        }
                    });
                    contextObj.splitview.showSecondaryView = true;
                    contextObj.target = false;
                });
            }
            else {
                this.notificationService.ShowToaster("Site is not active, Building cannot be edited", 2);
            }
        }
    };
    BuildingsMapComponent.prototype.submitReturn = function (event) {
        var contextObj = this;
        var pageDetails;
        var UpdatedImap;
        pageDetails = JSON.parse(event["returnData"]);
        var Popup;
        var subPopup;
        var color;
        var Site, Building, OwnershipType, DateofConstruction, BuildingCondition;
        Site = pageDetails[0].Site;
        Building = pageDetails[0].Building;
        OwnershipType = pageDetails[0]['Ownership Type'];
        DateofConstruction = pageDetails[0]['Construction Date'];
        BuildingCondition = pageDetails[0]['Building Condition'];
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
        if (pageDetails[0].OwnershipTypeId == 3) {
            color = "Red";
        }
        else {
            color = "Blue";
        }
        var updatedData = new Array();
        UpdatedImap = { Id: pageDetails[0].BuildingId, Latitude: pageDetails[0].Latitude, Longitude: pageDetails[0].Longitude, Popup: Popup, Color: color, Draggable: false };
        var index = contextObj.inputItems.findIndex(function (c) { return c.Id == pageDetails[0].BuildingId; });
        contextObj.inputItems[index] = UpdatedImap;
        updatedData = updatedData.concat(contextObj.inputItems);
        contextObj.inputItems = updatedData;
        contextObj.splitview.showSecondaryView = false;
    };
    BuildingsMapComponent.prototype.onContextMenu = function (event, item) {
        event.preventDefault();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingsMapComponent.prototype, "submitSuccess", void 0);
    BuildingsMapComponent = __decorate([
        core_1.Component({
            selector: 'buildings-map',
            templateUrl: './app/Views/RealProperty/Buildings/buildings-map.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [map_component_1.MapComponent, notify_component_1.Notification, dropdownlistcomponent_component_1.DropDownListComponent, split_view_component_1.SplitViewComponent, buildings_edit_component_1.BuildingEditComponent, drawings_component_1.DrawingsComponent,
                page_component_1.PageComponent, contextmenu_component_1.ContextMenu],
            inputs: [],
            outputs: []
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], BuildingsMapComponent);
    return BuildingsMapComponent;
}());
exports.BuildingsMapComponent = BuildingsMapComponent;
//# sourceMappingURL=buildings-map.component.js.map