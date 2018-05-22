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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var FinancialClausesComponent = (function () {
    function FinancialClausesComponent(realPropertyService, notificationService, administrationServices, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.administrationServices = administrationServices;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.selFinanceClauses = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false, allowEdit: true };
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 0,
                "title": "Save",
                "image": "Save",
                "path": "Save",
                "subMenu": null,
                "privilegeId": 10035
            }
        ];
    }
    FinancialClausesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2282, contextObj.administrationServices, contextObj.menuData.length);
        this.enableMenu = [0];
        if (this.action == "add") {
            this.leaseId = 0;
        }
        else {
            this.leaseId = this.leaseId[0];
        }
        this.realPropertyService.getFinancialClausesFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.loadData();
    };
    FinancialClausesComponent.prototype.loadData = function () {
        var tempId = [];
        if (this.financialClauseIds.length != 0) {
            for (var i = 0; i < this.financialClauseIds.length; i++) {
                tempId.push(parseInt(this.financialClauseIds[i].Value));
            }
        }
        var array = new Array();
        if (this.leaseTypeId == 4) {
            array.push({
                ReportFieldId: 6167,
                Value: "4"
            });
            array.push({
                ReportFieldId: 6167,
                Value: "1"
            });
        }
        else if (this.leaseTypeId == 5) {
            array.push({
                ReportFieldId: 6167,
                Value: "5"
            });
        }
        else if (this.leaseTypeId == 1) {
            array.push({
                ReportFieldId: 6167,
                Value: "1"
            });
        }
        array.push({
            ReportFieldId: 6163,
            Value: this.leaseId
        });
        array.push({
            ReportFieldId: 6164,
            Value: this.leaseRenewalCount
        });
        var contextObj = this;
        this.realPropertyService.getFinancialClauses(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, JSON.stringify(array)).subscribe(function (resultData) {
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            for (var i = 0; i < temp.length; i++) {
                var index = tempId.indexOf(temp[i].Id);
                if (index != -1) {
                    temp[i]["Select All"] = 1;
                }
                else if (contextObj.action == "edit" && tempId.length != 0) {
                    temp[i]["Select All"] = 0;
                }
            }
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Financial Clauses exist", 2);
            }
        });
    };
    FinancialClausesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    };
    FinancialClausesComponent.prototype.okFinancialClauses = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        var i = 0;
        for (i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                arrayList.push({
                    ReportFieldId: 7384,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }
        }
        if (i == contextObj.itemsSource.length) {
            if (arrayList.length != 0) {
                contextObj.selFinanceClauses.emit({ returnData: arrayList });
            }
            else {
                contextObj.notificationService.ShowToaster("Select Financial Clause(s)", 2);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FinancialClausesComponent.prototype, "selFinanceClauses", void 0);
    FinancialClausesComponent = __decorate([
        core_1.Component({
            selector: 'financial-clauses',
            templateUrl: './app/Views/RealProperty/Lease/financial-clauses.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['leaseId', 'leaseRenewalCount', 'leaseTypeId', 'financialClauseIds', 'action']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], FinancialClausesComponent);
    return FinancialClausesComponent;
}());
exports.FinancialClausesComponent = FinancialClausesComponent;
//# sourceMappingURL=financial-clauses.js.map