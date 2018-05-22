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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var common_service_1 = require('../../../Models/Common/common.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var customreport_addedit_component_1 = require('./customreport-addedit.component');
var CustomReportGridComponent = (function () {
    function CustomReportGridComponent(commonService, notificationService, generFun) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "[Report Name]", selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Custom Report";
        this.enableMenu = [];
        this.btnName = "Save";
        this.reportId = 0;
        this.reportCatgryId = 0;
        this.QueryCatgryId = 0;
        this.ObjCategryId = 0;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.sessionUserId = 0;
        this.sessionUserRoleId = 0;
    }
    CustomReportGridComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.commonService.getCustomReportListColumns().subscribe(function (result) {
            console.log(result["Data"]);
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 155) {
                    item.Width = '0.85*';
                    return true;
                }
                else
                    return false;
            });
            contextObj.fieldObject = result["Data"];
        });
        contextObj.commonService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
        this.dataLoad(1, contextObj);
        this.getCustomReportSettings();
    };
    CustomReportGridComponent.prototype.getCustomReportSettings = function () {
        switch (this.moduleId) {
            case 2:
                this.QueryCatgryId = 17;
                this.reportCatgryId = 23;
                break;
            case 3:
                this.QueryCatgryId = 16;
                this.reportCatgryId = 17;
                break;
            case 4:
                this.QueryCatgryId = 18;
                this.reportCatgryId = 63;
                break;
            case 5:
                this.QueryCatgryId = 19;
                this.reportCatgryId = 44;
                break;
            case 6:
                this.ObjCategryId = 3;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 190;
                break;
            case 7:
                this.ObjCategryId = 1;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 43;
                break;
            case 8:
                this.ObjCategryId = 2;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 187;
                break;
            case 17:
                this.ObjCategryId = 8;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 196;
                break;
            case 18:
                this.ObjCategryId = 9;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 199;
                break;
            case 12:
                this.QueryCatgryId = 21;
                this.reportCatgryId = 38;
                break;
            case 24:
                this.ObjCategryId = 20;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 206;
                break;
            case 25:
                this.ObjCategryId = 10;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 206;
                break;
            case 26:
                this.ObjCategryId = 11;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 210;
                break;
            case 27:
                this.ObjCategryId = 12;
                this.QueryCatgryId = 20;
                this.reportCatgryId = 214;
                break;
            case 30:
                this.QueryCatgryId = 46;
                this.reportCatgryId = 410;
                break;
            case 9:
                this.QueryCatgryId = 47;
                this.reportCatgryId = 411;
                break;
        }
    };
    CustomReportGridComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    CustomReportGridComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    CustomReportGridComponent.prototype.dataLoad = function (target, context) {
        context.commonService.getCustomReportData(context.moduleId, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
            if (result["Data"].FieldBinderData != "[]") {
                context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                context.totalItems = context.itemsSource.length;
            }
            else {
                context.totalItems = 0;
                context.notificationService.ShowToaster("No Custom Reports exist", 2);
                context.enableMenu = [1];
            }
            if (target == 1)
                context.itemsPerPage = result["Data"].RowsPerPage;
        });
    };
    CustomReportGridComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
            case 2:
                this.addEditReportClick(event.value);
                break;
            case 3:
                this.deleteClick();
                break;
            default:
                break;
        }
    };
    CustomReportGridComponent.prototype.addEditReportClick = function (target) {
        var contextObj = this;
        var isLoadAddEdit = true;
        if (target == 1) {
            contextObj.btnName = "Save";
            this.reportId = 0;
        }
        else {
            if (contextObj.sessionUserRoleId == 5 && (contextObj.inputItems.rowData["AddedBy"] != contextObj.sessionUserId)) {
                contextObj.notificationService.ShowToaster("This Custom Report is created by Another User", 2);
                isLoadAddEdit = false;
            }
            else {
                contextObj.btnName = "Save Changes";
                this.reportId = this.inputItems.selectedIds[0];
            }
        }
        if (isLoadAddEdit) {
            contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
                contextObj.fieldObjectAddEdit = result["Data"];
            });
            var listParams = new Array();
            listParams.push({ ReportFieldId: 353, Value: contextObj.moduleId }, { ReportFieldId: 141, Value: this.reportId }, { ReportFieldId: 348, Value: this.reportCatgryId }, { ReportFieldId: 66, Value: "" });
            contextObj.commonService.loadCustomRptAddEditData(this.reportId, target, JSON.stringify(listParams), this.ObjCategryId).subscribe(function (result) {
                contextObj.itemsSourceAddEdit = JSON.parse(result);
            });
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    };
    CustomReportGridComponent.prototype.saveCustomRptRow = function (event) {
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, event["actionName"], event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.refreshgrid = [];
        if (event["actionName"] == "add") {
            // this.totalItems = retUpdatedSrc["itemCount"];         
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.totalItems = retUpdatedSrc["itemCount"];
            this.enableMenu = [1, 2, 3];
        }
        else {
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    CustomReportGridComponent.prototype.deleteClick = function () {
        var context = this;
        if (this.sessionUserRoleId == 5 && this.sessionUserId != this.inputItems.rowData["AddedBy"])
            this.notificationService.ShowToaster("This Custom Report is created by Another User", 2);
        else
            this.showSlide = !this.showSlide;
    };
    CustomReportGridComponent.prototype.okDelete = function (event) {
        this.deleteReport();
        this.showSlide = !this.showSlide;
    };
    CustomReportGridComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    CustomReportGridComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    CustomReportGridComponent.prototype.deleteReport = function () {
        var contextObj = this;
        contextObj.commonService.deleteCustomReport(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.notificationService.ShowToaster("Custom Report deleted", 3);
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CustomReportGridComponent.prototype, "moduleId", void 0);
    CustomReportGridComponent = __decorate([
        core_1.Component({
            selector: 'customReportGrid',
            templateUrl: './app/Views/Common/Custom Reports/customreport-grid.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonService, notify_service_1.NotificationService, http_1.HTTP_PROVIDERS, General_1.GeneralFunctions],
            inputs: ['moduleId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CustomReportGridComponent);
    return CustomReportGridComponent;
}());
exports.CustomReportGridComponent = CustomReportGridComponent;
//# sourceMappingURL=customreport-grid.component.js.map