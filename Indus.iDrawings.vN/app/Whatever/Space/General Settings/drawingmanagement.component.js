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
var DrawingManagementComponent = (function () {
    function DrawingManagementComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.DataKey = "DrawingID";
    }
    DrawingManagementComponent.prototype.ngOnInit = function () {
        var contextObj = this;
    };
    DrawingManagementComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var obj = new Array();
        obj.push({
            ReportFieldId: 271,
            Value: contextObj.module
        });
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        this.clmFieldTable = clmnfieldobj[0];
        this.spaceService.getDrawingMangamentData(obj).subscribe(function (resultData) {
            //var mm = contextObj.convertJsonToTreeViewFormat(resultData,3);
            var fieldobj = new Array();
            fieldobj.push({
                Table1: eval(resultData["Table1"]),
                Table2: eval(resultData["Table2"]),
                Table3: eval(resultData["Table3"]),
                expanded: true
            });
            contextObj.FieldTable = fieldobj;
        });
        this.spaceService.getFieldObject().subscribe(function (resultData) {
            contextObj.Fields = resultData["Data"];
        });
        this.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
            contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            if (resultData["Data"].DataCount == 0) {
                contextObj.notificationService.ShowToaster("No Drawings exist", 2);
            }
        });
    };
    DrawingManagementComponent.prototype.submit = function (value) {
        var contextObj = this;
        this.spaceService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        });
    };
    DrawingManagementComponent.prototype.convertJsonToTreeViewFormat = function (data, level) {
        var fieldObjectsTreeView = [];
        var i = 1;
        var status = 0;
        var dir = [];
        var clmFieldName = this.clmFieldTable;
        var table = eval(data["Table" + i]);
        for (var j = 0; j < table.length; j++) {
            var newTable;
            var type;
            newTable = eval(data["Table" + 2]).filter(function (e) {
                if (e[clmFieldName["clmn" + i][0]] == table[j][clmFieldName["clmn" + i][0]]) {
                    return true;
                }
            });
            if (newTable.length > 0) {
            }
            else {
            }
            dir.push(type);
        }
        if (dir != undefined)
            fieldObjectsTreeView.push(dir);
        return fieldObjectsTreeView;
    };
    DrawingManagementComponent.prototype.function2 = function (clmFieldName, data, newTable) {
        var newTable2;
        var dir2 = [];
        var type;
        for (var j = 0; j < newTable.length; j++) {
            var newTable;
            newTable2 = eval(data["Table" + 3]).filter(function (e) {
                if (e[clmFieldName["clmn" + 2][0]] == newTable[j][clmFieldName["clmn" + 2][0]]) {
                    return true;
                }
            });
            if (newTable2.length > 0) {
                var ff = [];
                newTable2.find(function (e) {
                    ff.push(e[clmFieldName["clmn" + 3][1]]);
                });
            }
            else {
            }
            dir2.push(type);
        }
        return dir2;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingManagementComponent.prototype, "module", void 0);
    DrawingManagementComponent = __decorate([
        core_1.Component({
            selector: 'drawingmanagement',
            templateUrl: './app/Views/Space/General Settings/drawingmanagement.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, treeview_component_1.TreeView],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DrawingManagementComponent);
    return DrawingManagementComponent;
}());
exports.DrawingManagementComponent = DrawingManagementComponent;
//# sourceMappingURL=drawingmanagement.component.js.map