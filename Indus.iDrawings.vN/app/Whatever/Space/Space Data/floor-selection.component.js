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
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var employee_services_1 = require('../../../models/employee/employee.services');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var General_1 = require('../../../Models/Common/General');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var treeview_component_1 = require('../../../Framework/Whatever/TreeView/treeview.component');
var FloorSelectionComponent = (function () {
    function FloorSelectionComponent(employeeService, _spaceService, notificationService, drawingDetailsService, generFun, objectsService) {
        this.employeeService = employeeService;
        this._spaceService = _spaceService;
        this.notificationService = notificationService;
        this.drawingDetailsService = drawingDetailsService;
        this.generFun = generFun;
        this.objectsService = objectsService;
        this.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: true, allowAdd: false, isHeaderCheckBx: true, allowSort: false, isautosizecolms: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.btnName = "Show Data";
        this.btnClickOut = new core_1.EventEmitter();
        this.btnEnabled = true;
        this.iscard = true;
        this.isChanged = undefined;
        this.Criteria = 3; /* for selecting drawing id*/
        this.checkedId = [];
        this.DataKey = "DrawingID";
        //this.keyWordLookup=this._spaceService.getFloorSelectionKeyWordLookUp();
    }
    FloorSelectionComponent.prototype.ngOnInit = function () {
        switch (this.moduleId) {
            case 6:
                this.objectCategoryId = 3;
                break;
            case 7:
                this.objectCategoryId = 1;
                break;
            case 8:
                this.objectCategoryId = 2;
                break;
            case 17:
                this.objectCategoryId = 8;
                break;
            case 18:
                this.objectCategoryId = 9;
                break;
            case 24:
                this.objectCategoryId = 20;
                break;
            case 25:
                this.objectCategoryId = 10;
                break;
            case 26:
                this.objectCategoryId = 11;
                break;
            case 27:
                this.objectCategoryId = 12;
                break;
        }
    };
    FloorSelectionComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (contextObj.moduleId != undefined && ((this.moduleId != 5 && this.targetId != 2) || (this.moduleId == 5 && this.targetId != 2))) {
            this.loadFieldandSource(contextObj);
        }
        this.menuData = [
            {
                "id": 0,
                "title": this.btnName,
                "image": "Show Data",
                "path": "Show Data",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
    };
    FloorSelectionComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["selectedid"] && changes["selectedid"]["currentValue"] && changes["selectedid"]["currentValue"] != changes["selectedid"]["previousValue"])
            this.loadFieldandSource(contextObj);
    };
    FloorSelectionComponent.prototype.loadFieldandSource = function (conxtObj) {
        conxtObj._spaceService.getFloorSelectionField().subscribe(function (result) {
            if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                result["Data"].find(function (item) {
                    if (item.ReportFieldId == 540) {
                        item.Width = "*";
                        if (conxtObj.moduleId == 5 && conxtObj.targetId == 2)
                            item.isContentHtml = "hyperlink";
                    }
                    if (item.FieldId == 626)
                        item.Width = 220;
                });
                conxtObj.fieldObject = result["Data"];
            }
        });
        switch (conxtObj.moduleId) {
            case 3: //space
            case 14: //scheduling  
            case 12:
                conxtObj._spaceService.getFloorSelectionData(conxtObj.moduleId).subscribe(function (result) {
                    if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                        if (result["Data"].Table1 != "[]") {
                            var fieldobj = new Array();
                            fieldobj.push({
                                Table1: eval(result["Data"].Table1),
                                Table2: eval(result["Data"].Table2),
                                Table3: eval(result["Data"].Table3),
                                expanded: true
                            });
                            conxtObj.FieldTable = fieldobj;
                            conxtObj.drawingDetailsService.getDrawingLockedCount(118, conxtObj.moduleId).subscribe(function (resultData) {
                                if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
                                    if (resultData["Data"] > 0)
                                        conxtObj.notificationService.ShowToaster(resultData["Data"] + " drawing(s) to be unlocked", 2);
                                }
                            });
                        }
                        else {
                            conxtObj.drawingDetailsService.getDrawingLockedCount(118, 3).subscribe(function (resultData) {
                                if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
                                    if (resultData["Data"] == 0)
                                        conxtObj.notificationService.ShowToaster("No unlocked drawings exist", 2);
                                    else
                                        conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                    conxtObj.enableMenu = [];
                                }
                            });
                        }
                    }
                });
                break;
            case 5:
                switch (conxtObj.targetId) {
                    case 2:
                        //  debugger
                        conxtObj.btnName = "Save Changes";
                        conxtObj.employeeService.getAllocatedDrawingsForSpacePlanningProject(50898, conxtObj.selectedid[0]).subscribe(function (resultData) {
                            conxtObj.selectedFieldData = JSON.parse(resultData["Data"]);
                            conxtObj.employeeService.getFloorforSpacePlanning(5, conxtObj.selectedid[0]).subscribe(function (result) {
                                if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                                    if (result["Data"].Table1 == "[]") {
                                        //conxtObj.btnEnabled = false;
                                        conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                        conxtObj.enableMenu = [];
                                    }
                                    else {
                                        var fieldobj = new Array();
                                        fieldobj.push({
                                            Table1: eval(result["Data"].Table1),
                                            Table2: eval(result["Data"].Table2),
                                            Table3: eval(result["Data"].Table3),
                                            expanded: true
                                        });
                                        conxtObj.FieldTable = fieldobj;
                                    }
                                }
                            });
                        });
                        break;
                    default:
                        conxtObj.employeeService.getAssignedEmployeeMainListData(5).subscribe(function (result) {
                            if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                                if (result["Data"].Table1 == "[]") {
                                    //conxtObj.btnEnabled = false;
                                    conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                    conxtObj.enableMenu = [];
                                }
                                else {
                                    var fieldobj = new Array();
                                    fieldobj.push({
                                        Table1: eval(result["Data"].Table1),
                                        Table2: eval(result["Data"].Table2),
                                        Table3: eval(result["Data"].Table3),
                                        expanded: true
                                    });
                                    conxtObj.FieldTable = fieldobj;
                                }
                            }
                        });
                }
                break;
            case 6: //Telecom
            case 7: //Assets
            case 8: //Furniture
            case 17: //Electrical
            case 18: //Fire and Safety
            case 24: //Security Assets 
            case 25: //Mechanical 
            case 26: //Plumbing 
            case 27:
                conxtObj.objectsService.getAssignedFloorlist(50896, conxtObj.objectCategoryId).subscribe(function (resultData) {
                    if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"].Table1 == "[]") {
                            //conxtObj.btnEnabled = false;
                            conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                            conxtObj.enableMenu = [];
                        }
                        else {
                            var fieldobj = new Array();
                            fieldobj.push({
                                Table1: eval(resultData["Data"].Table1),
                                Table2: eval(resultData["Data"].Table2),
                                Table3: eval(resultData["Data"].Table3),
                                expanded: true
                            });
                            conxtObj.FieldTable = fieldobj;
                        }
                    }
                });
                break;
        }
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        conxtObj.clmFieldTable = clmnfieldobj[0];
    };
    FloorSelectionComponent.prototype.onSubMenuChange = function (event) {
        this.isChanged = !this.isChanged;
    };
    FloorSelectionComponent.prototype.btnClick = function () {
        this.isChanged = !this.isChanged;
    };
    FloorSelectionComponent.prototype.onColValClick = function (colVal) {
    };
    //search
    FloorSelectionComponent.prototype.SaveAs = function (event) {
    };
    FloorSelectionComponent.prototype.Delete = function (event) {
    };
    FloorSelectionComponent.prototype.onloadSearch = function (event) {
    };
    FloorSelectionComponent.prototype.Clear = function (event) {
    };
    FloorSelectionComponent.prototype.Submit = function (event) {
    };
    //end search
    FloorSelectionComponent.prototype.submitValues = function (value) {
        debugger;
        var Ids = JSON.parse(value.FieldIdValues);
        this.selectedIds = [];
        for (var i = 0; i < Ids.length; i++) {
            this.selectedIds.push(Ids[i]["ValueId"]);
        }
        if (this.moduleId == 5 && this.targetId == 2)
            this.btnClickOut.emit({ SelectedIds: this.selectedIds });
        else {
            if (Ids.length > 0) {
                this.btnClickOut.emit({ SelectedIds: this.selectedIds });
            }
            else {
                this.notificationService.ShowToaster("Select Floor(s)", 2);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FloorSelectionComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FloorSelectionComponent.prototype, "targetId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FloorSelectionComponent.prototype, "selectedid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorSelectionComponent.prototype, "btnClickOut", void 0);
    FloorSelectionComponent = __decorate([
        core_1.Component({
            selector: 'floor-selection',
            templateUrl: './app/Views/Space/Space Data/floor-selection.component.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, search_component_1.searchBox, submenu_component_1.SubMenu, treeview_component_1.TreeView],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, drawingdetails_service_1.DrawingDetailsService, employee_services_1.EmployeeService, objects_service_1.ObjectsService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, space_service_1.SpaceService, notify_service_1.NotificationService, drawingdetails_service_1.DrawingDetailsService, General_1.GeneralFunctions, objects_service_1.ObjectsService])
    ], FloorSelectionComponent);
    return FloorSelectionComponent;
}());
exports.FloorSelectionComponent = FloorSelectionComponent;
//# sourceMappingURL=floor-selection.component.js.map