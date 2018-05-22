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
var treeview_component_1 = require('../../../Framework/Whatever/TreeView/treeview.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var DrawingManagementComponent = (function () {
    function DrawingManagementComponent(spaceService, notificationService, generFun, administrationService) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.DataKey = "DrawingID";
        this.objCategoryId = "0";
        this.dsbleSaveBtn = false;
        this.isChangeDetect = false;
    }
    DrawingManagementComponent.prototype.ngOnInit = function () {
        this.getCusSubscribedFeatures();
    };
    DrawingManagementComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.isChangeDetect = false;
        if (changes["module"] && changes["module"]["currentValue"][0] && changes["module"]["currentValue"][0] != changes["module"]["previousValue"][0])
            contextObj.isChangeDetect = true;
        contextObj.loadData(contextObj);
    };
    DrawingManagementComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.spaceService.getFieldObject().subscribe(function (resultData) {
            contextObj.Fields = resultData["Data"];
        });
        if (contextObj.isChangeDetect = false) {
            contextObj.loadData(contextObj);
        }
    };
    DrawingManagementComponent.prototype.getCusSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("276").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 276:
                        contextObj.drawinglabel = customerFeatureobj[i]["Value"];
                        if (contextObj.drawinglabel == "" || contextObj.drawinglabel == null)
                            contextObj.drawinglabel = "Drawing";
                        break;
                }
            }
        });
    };
    DrawingManagementComponent.prototype.loadData = function (contextObj) {
        var obj = new Array();
        //if (this.module != 7) {
        this.getObjCategory();
        obj.push({ ReportFieldId: 271, Value: contextObj.module }, { ReportFieldId: 2156, Value: contextObj.objCategoryId });
        contextObj.spaceService.getDrawingMangamentData(obj, contextObj.selectedUserId).subscribe(function (resultData) {
            if (resultData["Table1"] == "[]") {
                contextObj.emptyDataMsgSettings(contextObj);
            }
            var fieldobj = new Array();
            fieldobj.push({
                Table1: eval(resultData["Table1"]),
                Table2: eval(resultData["Table2"]),
                Table3: eval(resultData["Table3"]),
                expanded: true
            });
            if (fieldobj[0]["Table1"].length == 0 && contextObj.selectedUserId == undefined) {
                contextObj.dsbleSaveBtn = true;
            }
            contextObj.FieldTable = fieldobj;
            if (contextObj.selectedUserId > 0) {
                contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
            }
            else {
                contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
                    contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                });
            }
        });
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
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    };
    DrawingManagementComponent.prototype.getObjCategory = function () {
        switch (this.module) {
            case 7:
                this.objCategoryId = "1";
                break;
            case 8:
                this.objCategoryId = "2";
                break;
            case 17:
                this.objCategoryId = "8";
                break;
            case 18:
                this.objCategoryId = "9";
                break;
            case 24:
                this.objCategoryId = "20";
                break;
            case 25:
                this.objCategoryId = "10";
                break;
            case 26:
                this.objCategoryId = "11";
                break;
            case 27:
                this.objCategoryId = "12";
                break;
            default:
                this.objCategoryId = "0";
                break;
        }
    };
    DrawingManagementComponent.prototype.submit = function (value) {
        var contextObj = this;
        if (contextObj.selectedUserId > 0) {
            this.spaceService.updateDrawingAccessForUser(value, contextObj.module, contextObj.selectedUserId).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (resultData.StatusId == 1) {
                        if (contextObj.module == '14')
                            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
                        else
                            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
                    }
                }
            });
        }
        else {
            this.spaceService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (contextObj.module == '14')
                        contextObj.notificationService.ShowToaster(contextObj.drawinglabel + " Management updated", 3);
                    else
                        contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
                }
            });
        }
    };
    DrawingManagementComponent.prototype.emptyDataMsgSettings = function (contextObj) {
        if (contextObj.selectedUserId > 0) {
            switch (contextObj.module) {
                case "3":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in As Builts module. Set access to drawings in As Builts module first", 5);
                    break;
                //case "14"://commented on 21/06/2017 suggested by tkk
                //    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);
                //    break;
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
                case "14":
                    contextObj.notificationService.ShowToaster("No Drawings exist", 5);
                    break;
                default:
                    contextObj.notificationService.ShowToaster("No Drawings exist", 5);
                    break;
            }
        }
        else {
            if (contextObj.module == "14")
                contextObj.notificationService.ShowToaster("No Drawings exist", 5);
            else
                contextObj.notificationService.ShowToaster("No Drawings exist", 2);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingManagementComponent.prototype, "module", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingManagementComponent.prototype, "selectedUserId", void 0);
    DrawingManagementComponent = __decorate([
        core_1.Component({
            selector: 'drawingmanagement',
            templateUrl: './app/Views/Common/DrawingManagement/drawingmanagement.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, treeview_component_1.TreeView],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['module', 'selectedUserId'],
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], DrawingManagementComponent);
    return DrawingManagementComponent;
}());
exports.DrawingManagementComponent = DrawingManagementComponent;
//# sourceMappingURL=drawingmanagement.component.js.map