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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var space_service_1 = require('../../../Models/Space/space.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var treeviewforlease_component_1 = require('../../../Framework/Whatever/TreeView/treeviewforlease.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var leaseItemUpdateBuildingFloorComponent = (function () {
    function leaseItemUpdateBuildingFloorComponent(realPropertyService, spaceService, notificationService, generFun) {
        this.realPropertyService = realPropertyService;
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.DataKey = "FloorID";
        this.objCategoryId = "0";
        this.successReturn = new core_1.EventEmitter();
    }
    leaseItemUpdateBuildingFloorComponent.prototype.ngOnInit = function () {
    };
    leaseItemUpdateBuildingFloorComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["module"] && changes["module"]["currentValue"][0] && changes["module"]["currentValue"][0] != changes["module"]["previousValue"][0])
            contextObj.loadData();
    };
    leaseItemUpdateBuildingFloorComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.spaceService.getFieldObject().subscribe(function (resultData) {
            contextObj.Fields = resultData["Data"];
        });
        contextObj.loadData();
    };
    leaseItemUpdateBuildingFloorComponent.prototype.loadData = function () {
        var contextObj = this;
        switch (contextObj.target) {
            case 2:
                contextObj.DataKey = "BuildingID";
                break;
            case 3:
                contextObj.DataKey = "FloorID";
                break;
        }
        if (contextObj.leaseRenewalCount == undefined || contextObj.leaseRenewalCount == null) {
            contextObj.leaseRenewalCount = 0;
        }
        contextObj.realPropertyService.getLeaseSiteBuildingFloorManagement(contextObj.leaseId[0], contextObj.leaseRenewalCount, contextObj.target).subscribe(function (resultData) {
            if (resultData["Table1"] == "[]") {
                if (contextObj.target == 2)
                    contextObj.notificationService.ShowToaster("No Buildings exist to Lease", 2);
                else if (contextObj.target == 3)
                    contextObj.notificationService.ShowToaster("No Floors exist to Lease", 2);
            }
            var fieldobj = new Array();
            fieldobj.push({
                Table1: eval(resultData["Table1"]),
                Table2: eval(resultData["Table2"]),
                Table3: eval(resultData["Table3"]),
                expanded: true
            });
            for (var i = 0; i < fieldobj[0].Table2.length; i++) {
                fieldobj[0].Table2[i].BuildingCalcultedArea = fieldobj[0].Table2[i].BuildingCalcultedArea.toFixed(2);
            }
            for (var i = 0; i < fieldobj[0].Table3.length; i++) {
                fieldobj[0].Table3[i].FloorCalculatedArea = fieldobj[0].Table3[i].FloorCalculatedArea.toFixed(2);
            }
            contextObj.FieldTable = fieldobj;
            if (contextObj.selectedUserId > 0) {
                contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
            }
        });
        //var obj = new Array<ReportFieldArray>();
        ////if (this.module != 7) {
        //this.getObjCategory();
        //obj.push(
        //    { ReportFieldId: 271, Value: "7" },
        //    { ReportFieldId: 2156, Value: "1" }
        //);
        //contextObj.spaceService.getDrawingMangamentData(obj, contextObj.selectedUserId).subscribe(function (resultData) {
        //    if (resultData["Table1"] == "[]") {
        //        contextObj.emptyDataMsgSettings(contextObj);
        //        contextObj.notificationService.ShowToaster("No Drawings exist", 2);
        //    }
        //    var fieldobj = new Array<FieldTable>();
        //    fieldobj.push({
        //        Table1: eval(resultData["Table1"]),
        //        Table2: eval(resultData["Table2"]),
        //        Table3: eval(resultData["Table3"]),
        //        expanded: true
        //    });
        //    contextObj.FieldTable = fieldobj;
        //    if (contextObj.selectedUserId > 0) {
        //        contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
        //    } else {
        //        contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
        //            contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
        //        });
        //    }
        //});
        //}
        //else
        //{
        //    obj.push({
        //        ReportFieldId: 2156,
        //        Value: "1"
        //    });
        //    contextObj.spaceService.getDrawingMangamentDataObject(obj, contextObj.selectedUserId).subscribe(function (resultData) {
        //        if (resultData["Table1"] == "[]") {
        //            contextObj.emptyDataMsgSettings(contextObj);
        //            contextObj.notificationService.ShowToaster("No Drawings exist", 2);
        //        }
        //        var fieldobj = new Array<FieldTable>();
        //        fieldobj.push({
        //            Table1: eval(resultData["Table1"]),
        //            Table2: eval(resultData["Table2"]),
        //            Table3: eval(resultData["Table3"]),
        //            expanded: true
        //        });
        //        contextObj.FieldTable = fieldobj;
        //        if (contextObj.selectedUserId > 0) {
        //            contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
        //        } else {
        //            contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
        //                contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
        //            });
        //        }
        //    });
        //}
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName", "BuildingCalcultedArea", "BuildingSelected"],
            clmn3: ["FloorID", "FloorName", "FloorCalculatedArea", "FloorSelected"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    };
    leaseItemUpdateBuildingFloorComponent.prototype.getObjCategory = function () {
        switch (this.module) {
            case 7:
                this.objCategoryId = "1";
                break;
            default:
                this.objCategoryId = "0";
                break;
        }
    };
    leaseItemUpdateBuildingFloorComponent.prototype.submit = function (value) {
        var contextObj = this;
        var buildingid1 = [];
        var buildingdata = "";
        if (contextObj.DataKey == "BuildingID") {
            var buildingid = JSON.parse(value.FieldIdValues);
            var count = 0;
            buildingid1.push(buildingid[0]);
            for (var i = 0; i < buildingid.length; i++) {
                for (var j = 0; j < buildingid1.length; j++) {
                    if (buildingid[i].ValueId == buildingid1[j].ValueId) {
                        count = 1;
                    }
                }
                if (count == 0) {
                    buildingid1.push(buildingid[i]);
                }
                count = 0;
            }
            //
            if (buildingid.length > 0) {
                for (var i = 0; i < buildingid1.length; i++) {
                    buildingdata = buildingdata + buildingid1[i].ValueId + "µ" + buildingid1[i].Area + "§";
                }
            }
            else {
                buildingdata = "";
            }
            contextObj.realPropertyService.InsertUpdateRPMBuildings(contextObj.leaseId[0], contextObj.leaseRenewalCount, buildingdata).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    contextObj.notificationService.ShowToaster("Lease Area updated", 3);
                    contextObj.successReturn.emit({
                        value: "success"
                    });
                }
            });
        }
        else if (contextObj.DataKey == "FloorID") {
            var floorid = JSON.parse(value.FieldIdValues);
            var obj = new Array();
            for (var i = 0; i < floorid.length; i++) {
                obj.push({ ReportFieldId: 5718, Value: floorid[i].ValueId });
            }
            obj.push({ ReportFieldId: 5716, Value: contextObj.leaseId[0] });
            obj.push({ ReportFieldId: 5717, Value: contextObj.leaseRenewalCount });
            var ReportFieldIdValues = JSON.stringify(obj);
            contextObj.realPropertyService.InsertUpdateRPMFloors(ReportFieldIdValues).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    contextObj.notificationService.ShowToaster("Lease Area updated", 3);
                    contextObj.successReturn.emit({
                        value: "success"
                    });
                }
            });
        }
        //if (contextObj.selectedUserId > 0) {
        //    this.spaceService.updateDrawingAccessForUser(value, contextObj.module, contextObj.selectedUserId).subscribe(function (resultData) {
        //        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
        //            if (resultData.StatusId == 1) {
        //                contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
        //            } else {
        //                contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
        //            }
        //        }
        //    });
        //} else {
        //    this.spaceService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
        //        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
        //            contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
        //        }
        //    });
        //}
    };
    leaseItemUpdateBuildingFloorComponent.prototype.emptyDataMsgSettings = function (contextObj) {
        if (contextObj.selectedUserId > 0) {
            switch (contextObj.module) {
                case "3":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in As Builts module. Set access to drawings in As Builts module first", 5);
                    break;
                case "14":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);
                    break;
                case "6":
                case "7":
                case "8":
                    contextObj.notificationService.ShowToaster("No utility drawing has been added to any floor", 5);
                    break;
                case "5":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);
                    break;
                case "12":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);
                    break;
                default:
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in As Builts module. Set access to drawings in As Builts module first", 5);
                    break;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "module", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "selectedUserId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "leaseId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "leaseRenewalCount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "Hidebutton", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], leaseItemUpdateBuildingFloorComponent.prototype, "successReturn", void 0);
    leaseItemUpdateBuildingFloorComponent = __decorate([
        core_1.Component({
            selector: 'leaseItemUpdate',
            templateUrl: './app/Views/RealProperty/Lease/leaseItemUpdate-Building-Floor.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, treeviewforlease_component_1.TreeViewForLease],
            providers: [realproperty_service_1.RealPropertyService, space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['module', 'selectedUserId', 'leaseId', 'leaseRenewalCount', 'target', 'Hidebutton'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], leaseItemUpdateBuildingFloorComponent);
    return leaseItemUpdateBuildingFloorComponent;
}());
exports.leaseItemUpdateBuildingFloorComponent = leaseItemUpdateBuildingFloorComponent;
//# sourceMappingURL=leaseItemUpdate-Building-Floor.component.js.map