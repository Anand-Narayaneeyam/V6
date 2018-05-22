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
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var treeview_component_1 = require('../../../../Framework/Whatever/TreeView/treeview.component');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var employee_services_1 = require('../../../../models/employee/employee.services');
var FloorSelectionReportComponent = (function () {
    function FloorSelectionReportComponent(reportService, notificationService, generFun, employeeService) {
        this.reportService = reportService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.employeeService = employeeService;
        this.pagePath = "";
        this.selectedIds = new core_1.EventEmitter();
        this.iscard = true;
        this.isChanged = undefined;
        this.objectCategoryId = 1;
        this.additionalReportName = "";
    }
    FloorSelectionReportComponent.prototype.ngOnInit = function () {
        switch (this.objectCategoryId) {
            case 1:
                this.objectCategoryName = "Assets";
                break;
            case 2:
                this.objectCategoryName = "Furniture";
                break;
            case 3:
                this.objectCategoryName = "Object"; //Telecom
                break;
            case 8:
                this.objectCategoryName = "Component"; //Electric
                break;
            case 9:
                this.objectCategoryName = "Component"; //Fire and Safety
                break;
            case 10:
                this.objectCategoryName = "Component"; //Mechanical
                break;
        }
        switch (this.ReportCategoryId) {
            case 89:
                this.pagePath = "Reports / Space / Gross Area Distribution";
                break;
            case 90:
                this.pagePath = "Reports / Space / Gross Area Organizational Distribution";
                break;
            case 91:
                this.pagePath = "Reports / Space / Net Area Distribution";
                break;
            case 92:
                this.pagePath = "Reports / Space / Net Area Organizational Distribution";
                break;
            case 226:
                this.pagePath = "Reports / Space / Gross Area Report";
                break;
            case 17:
                this.pagePath = "Reports / Space / Space Details";
                break;
            case 100:
                this.pagePath = "Reports / Employees / Detailed Occupancy";
                break;
            case 101:
                this.pagePath = "Reports / Employees / Under Occupied Spaces";
                break;
            case 102:
                this.pagePath = "Reports / Employees / Over Occupied Spaces";
                break;
            case 103:
                this.pagePath = "Reports / Employees / Nominally Occupied ";
                break;
            case 326:
                this.pagePath = "Reports / Employees / Occupancy Distribution";
                break;
            case 99:
                this.pagePath = "Reports / Employees / Square Foot Analysis";
                break;
            case 48:
                this.pagePath = "Reports / Employees / Assigned Employees";
                break;
            case 108:
                this.pagePath = "Reports / CAI / CAI Space Driver";
                break;
            case 107:
                if (this.objectCategoryId == 3)
                    this.pagePath = "Reports / Telecom" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 8)
                    this.pagePath = "Reports / Electrical" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 9)
                    this.pagePath = "Reports / Fire and Safety" + " / " + this.objectCategoryName + " List by Floor";
                else if (this.objectCategoryId == 10)
                    this.pagePath = "Reports / Mechanical" + " / " + this.objectCategoryName + " List by Floor";
                else
                    this.pagePath = "Reports / " + this.objectCategoryName + " / " + this.objectCategoryName + " List by Floor";
                break;
            default:
                if (this.ReportCategoryId >= 1000)
                    this.pagePath = "Reports / Space / Additional Reports - " + this.additionalReportName;
                else
                    this.pagePath = " ";
                break;
        }
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
    };
    FloorSelectionReportComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        contextObj.loadData(contextObj);
    };
    FloorSelectionReportComponent.prototype.onSubMenuChange = function (event) {
        this.isChanged = !this.isChanged;
    };
    FloorSelectionReportComponent.prototype.loadData = function (contextObj) {
        var id = 0;
        var moduleIdEmp = 5;
        //var objectCategoryId = 1; /* assets */
        switch (this.ReportCategoryId) {
            case 100:
                id = 25;
                break;
            case 326:
                id = 25;
                break;
            case 101:
                id = 26;
                break;
            case 102:
                id = 27;
                break;
            case 103:
                id = 28;
                break;
            default:
                id = 0;
                break;
        }
        if (this.ReportCategoryId == 89 || this.ReportCategoryId == 226 || this.ReportCategoryId == 17 || this.ReportCategoryId == 90 || this.ReportCategoryId == 91 || this.ReportCategoryId == 92 || this.ReportCategoryId >= 1000) {
            contextObj.reportService.getReportFloorSelection().subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });
        }
        else if (this.ReportCategoryId == 100 || this.ReportCategoryId == 101 ||
            this.ReportCategoryId == 102 || this.ReportCategoryId == 103 || this.ReportCategoryId == 326) {
            contextObj.reportService.getEmployeeOccupancyFloorSelection(id).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });
        }
        else if (this.ReportCategoryId == 99 || this.ReportCategoryId == 48) {
            contextObj.reportService.getDrawingsWithDataforEmployee(moduleIdEmp).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });
        }
        else if (this.ReportCategoryId == 107) {
            contextObj.reportService.getUserAccessibleDrawingHavingDataForObjectCategory(contextObj.objectCategoryId).subscribe(function (resultData) {
                if (resultData["Data"]["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                var fieldobj = new Array();
                fieldobj.push({
                    Table1: eval(resultData["Data"]["Table1"]),
                    Table2: eval(resultData["Data"]["Table2"]),
                    Table3: eval(resultData["Data"]["Table3"]),
                    expanded: true
                });
                contextObj.FieldTable = fieldobj;
            });
        }
        else if (this.ReportCategoryId == 108) {
            contextObj.employeeService.getAssignedEmployeeMainListData(12).subscribe(function (result) {
                if (result["Data"].Table1 == "[]") {
                    contextObj.emptyDataMsgSettings();
                    contextObj.enableMenu = [];
                }
                else {
                    var fieldobj = new Array();
                    fieldobj.push({
                        Table1: eval(result["Data"].Table1),
                        Table2: eval(result["Data"].Table2),
                        Table3: eval(result["Data"].Table3),
                        expanded: true
                    });
                    contextObj.FieldTable = fieldobj;
                }
            });
        }
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    };
    FloorSelectionReportComponent.prototype.submit = function (value) {
        this.Ids = JSON.parse(value.FieldIdValues);
        if (this.Ids.length == 0) {
            if (this.Criteria == 1) {
                this.notificationService.ShowToaster("Select Site(s)", 2);
            }
            else if (this.Criteria == 2) {
                this.notificationService.ShowToaster("Select Building(s)", 2);
            }
            else {
                this.notificationService.ShowToaster("Select Floor(s)", 2);
            }
        }
        else {
            var newselectedIds = '';
            for (var count = 0; count < this.Ids.length; count++) {
                newselectedIds = newselectedIds + this.Ids[count]["ValueId"] + ',';
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds.emit(newselectedIds);
        }
        //var contextObj = this;
        //if (contextObj.selectedUserId > 0) {
        //    this.reportService.updateDrawingAccessForUser(value, contextObj.module, contextObj.selectedUserId).subscribe(function (resultData) {
        //        if (resultData.StatusId == 1) {
        //            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
        //        } else {
        //            contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
        //        }
        //    });
        //} else {
        //    this.reportService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
        //        contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
        //    });
        //}
    };
    FloorSelectionReportComponent.prototype.emptyDataMsgSettings = function () {
        var contextObj = this;
        if (contextObj.Criteria == 1) {
            contextObj.notificationService.ShowToaster("No Sites exist", 2);
        }
        else if (contextObj.Criteria == 2) {
            contextObj.notificationService.ShowToaster("No Buildings exist", 2);
        }
        else {
            contextObj.notificationService.ShowToaster("No Floors exist", 2);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorSelectionReportComponent.prototype, "selectedIds", void 0);
    FloorSelectionReportComponent = __decorate([
        core_1.Component({
            selector: 'floorselectionreport',
            templateUrl: './app/Views/Reports/Common/ReportFloorSelection/floorselection.report.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, treeview_component_1.TreeView, page_component_1.PageComponent, submenu_component_1.SubMenu],
            providers: [common_service_1.CommonReportService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService],
            inputs: ['Criteria', 'ReportCategoryId', 'objectCategoryId', 'additionalReportName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService])
    ], FloorSelectionReportComponent);
    return FloorSelectionReportComponent;
}());
exports.FloorSelectionReportComponent = FloorSelectionReportComponent;
//# sourceMappingURL=floorselection.report.component.js.map