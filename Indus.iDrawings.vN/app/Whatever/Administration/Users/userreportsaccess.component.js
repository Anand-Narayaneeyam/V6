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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var treeview_component_1 = require('../../../Framework/Whatever/TreeView/treeview.component');
var UserReportsAccessComponent = (function () {
    function UserReportsAccessComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.selectedIds = [];
        this.DataKey = "Id";
        this.objCategoryId = "0";
        this.dsbleSaveBtn = false;
        this.isChangeDetect = false;
        this.labelData = ["Module:", ""];
    }
    UserReportsAccessComponent.prototype.ngOnInit = function () {
    };
    UserReportsAccessComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getUserReportsAccessFieldsList().subscribe(function (resultData) {
            contextObj.Fields = resultData["data"];
        });
        if (contextObj.isChangeDetect == false) {
            contextObj.loadData(contextObj);
        }
    };
    UserReportsAccessComponent.prototype.loadData = function (contextObj) {
        var obj = new Array();
        //if (this.module != 7) {
        this.getObjCategory();
        obj.push({ ReportFieldId: 271, Value: contextObj.module }, { ReportFieldId: 2156, Value: contextObj.objCategoryId });
        contextObj.administrationService.getReportsAccessibleByUser(contextObj.selectedUserId).subscribe(function (resultData) {
            if (resultData["Table1"] == "[]") {
                contextObj.notificationService.ShowToaster("No Reports exist", 3);
            }
            else {
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
                for (var _i = 0, _a = contextObj.FieldTable[0]["Table3"]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item["Selected"] == "True")
                        contextObj.selectedIds.push({ "Id": item["Id"] });
                }
            }
        });
        var clmnfieldobj = new Array();
        clmnfieldobj.push({
            clmn1: ["ModuleId", "Name"],
            clmn2: ["CategoryId", "Name"],
            clmn3: ["Id", "Name"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    };
    UserReportsAccessComponent.prototype.getObjCategory = function () {
    };
    UserReportsAccessComponent.prototype.submit = function (value) {
        debugger;
        var contextObj = this;
        var rptFldValues = JSON.parse(value['ReportFieldIdValues']);
        var updatedRptFldValues = '';
        var ValueTypes;
        for (var _i = 0, rptFldValues_1 = rptFldValues; _i < rptFldValues_1.length; _i++) {
            var item = rptFldValues_1[_i];
            var index = contextObj.FieldTable[0]["Table3"].findIndex(function (el) { return el.Id == item['Value']; });
            if (index != -1) {
                //ValueTypes = "3914" + contextObj.co contextObj.FieldTable[0]["Table3"][index]['ReportId'] 
                updatedRptFldValues += "{\"ReportFieldId\":3914,\"Value\":\"" + contextObj.FieldTable[0]["Table3"][index]['ReportId'] + "\"},";
                updatedRptFldValues += "{\"ReportFieldId\":" + contextObj.FieldTable[0]["Table3"][index]['ReportId'] + ",\"Value\":\"" + contextObj.FieldTable[0]["Table3"][index]['ReportType'] + "\"},";
            }
        }
        this.administrationService.updateReportAccessToUser(updatedRptFldValues, contextObj.selectedUserId).subscribe(function (resultData) {
            if (resultData.StatusId == 1) {
                contextObj.notificationService.ShowToaster("Report Access updated", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserReportsAccessComponent.prototype, "selectedUserId", void 0);
    UserReportsAccessComponent = __decorate([
        core_1.Component({
            selector: 'user-reports-access',
            templateUrl: './app/Views/Administration/Users/userreportsaccess.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent, treeview_component_1.TreeView],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedUserId"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], UserReportsAccessComponent);
    return UserReportsAccessComponent;
}());
exports.UserReportsAccessComponent = UserReportsAccessComponent;
//# sourceMappingURL=userreportsaccess.component.js.map