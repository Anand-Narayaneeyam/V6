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
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../models/administration/administration.service');
var ScheduledReportComponent = (function () {
    function ScheduledReportComponent(spaceService, notificationService, generFun, administrationService) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.DataKey = "ReportTypeId";
        this.dsbleSaveBtn = false;
        this.isChangeDetect = false;
        this.labelData = [];
        this.selectedeTempArray = [];
    }
    ScheduledReportComponent.prototype.ngOnInit = function () {
        this.labelData[0] = "Module: ";
        this.labelData[1] = "";
        this.labelData[2] = "";
    };
    ScheduledReportComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.isChangeDetect = false;
        if (changes["module"] && changes["module"]["currentValue"][0] && changes["module"]["currentValue"][0] != changes["module"]["previousValue"][0])
            contextObj.isChangeDetect = true;
        contextObj.loadData(contextObj);
    };
    ScheduledReportComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getSchedulingReportFieldObject().subscribe(function (resultData) {
            contextObj.Fields = resultData["Data"];
        });
        if (contextObj.isChangeDetect == false) {
            contextObj.loadData(contextObj);
        }
    };
    ScheduledReportComponent.prototype.loadData = function (contextObj) {
        var obj = new Array();
        obj.push({
            ReportFieldId: 149,
            Value: "0"
        });
        contextObj.administrationService.getSchedulingReportData(obj).subscribe(function (resultData) {
            if (resultData["Data"]["Table1"] == "[]") {
                contextObj.notificationService.ShowToaster("No Reports exist", 5);
            }
            var fieldobj = new Array();
            fieldobj.push({
                Table1: eval(resultData["Data"]["Table1"]),
                Table2: eval(resultData["Data"]["Table2"]),
                Table3: eval(resultData["Data"]["Table3"]),
                expanded: true
            });
            if (fieldobj[0]["Table1"].length == 0) {
                contextObj.dsbleSaveBtn = true;
            }
            contextObj.FieldTable = fieldobj;
            contextObj.table3Temp = JSON.parse(resultData["Data"]["Table3"]);
            var tempArray = JSON.parse(resultData["Data"]["Table3"]);
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].Selected == "True" || tempArray[i].Selected == true)
                    contextObj.selectedeTempArray.push(tempArray[i]);
            }
            contextObj.selectedFieldData = contextObj.selectedeTempArray;
        });
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["ModuleId", "ModuleName"],
            clmn2: ["CategoryId", "CategoryName"],
            clmn3: ["ReportTypeId", "ReportsName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    };
    ScheduledReportComponent.prototype.submit = function (value) {
        var contextObj = this;
        var temp = JSON.parse(value.ReportFieldIdValues);
        var selectedObj = new Array();
        for (var i = 0; i < temp.length; i++) {
            selectedObj.push({
                ReportFieldId: temp[i].Value.split(",")[1],
                Value: temp[i].Value.split(",")[0] //TypeId
            });
        }
        this.administrationService.updateSchedulingReportData(JSON.stringify(selectedObj)).subscribe(function (resultData) {
            if (resultData.Message == 'Success')
                contextObj.notificationService.ShowToaster("Scheduled Report(s) updated", 3);
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScheduledReportComponent.prototype, "module", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScheduledReportComponent.prototype, "selectedUserId", void 0);
    ScheduledReportComponent = __decorate([
        core_1.Component({
            selector: 'scheduledReport',
            templateUrl: './app/Views/Administration/General Settings/scheduled-report-component.html',
            directives: [grid_component_1.GridComponent, treeview_component_1.TreeView],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['module'],
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], ScheduledReportComponent);
    return ScheduledReportComponent;
}());
exports.ScheduledReportComponent = ScheduledReportComponent;
//# sourceMappingURL=scheduled-report-component.js.map