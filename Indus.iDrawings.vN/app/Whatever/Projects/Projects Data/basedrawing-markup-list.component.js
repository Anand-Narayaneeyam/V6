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
var projects_service_1 = require('../../../Models/Projects/projects.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var editmarkup_component_1 = require('./editmarkup.component');
var BaseDrawingMarkupListComponent = (function () {
    function BaseDrawingMarkupListComponent(projectService, notificationService, generFun) {
        this.projectService = projectService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.position = "top-right";
        this.showSlide = false;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', showContextMenu: false, isHeaderCheckBx: false };
        this.fieldObject = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Edit Description",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 752
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 753
            },
            {
                "id": 3,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null,
                "privilegeId": 754
            }
        ];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.drawingDialogMessages = { "key": 0, "message": "" };
        this.pagetarget = 0;
    }
    ;
    BaseDrawingMarkupListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        console.log('row data in mark up list as input', this.rowData);
        this.projectService.getBaseDrawingListFormId(578).subscribe(function (resultFields) {
            for (var i = 0; i < resultFields["Data"].length; i++) {
                switch (resultFields["Data"][i].ReportFieldId) {
                    case 1052:
                        contextObj.fieldProjectName = resultFields["Data"][i];
                        contextObj.fieldProjectName["FieldValue"] = contextObj.projectName;
                        break;
                    case 1012:
                        contextObj.fieldtitle = resultFields["Data"][i];
                        contextObj.fieldtitle["IsMandatory"] = false;
                        contextObj.fieldtitle["FieldValue"] = contextObj.rowData["Title"];
                        break;
                    case 1011:
                        contextObj.fieldCat = resultFields["Data"][i];
                        contextObj.fieldCat["IsMandatory"] = false;
                        if (contextObj.pagetarget == 0)
                            contextObj.fieldCat["FieldValue"] = contextObj.rowData["Category"];
                        else
                            contextObj.fieldCat["FieldValue"] = contextObj.rowData["Drawing Category"];
                        break;
                    case 1018:
                        contextObj.fieldRev = resultFields["Data"][i];
                        if (contextObj.pagetarget == 0)
                            contextObj.fieldRev["FieldValue"] = contextObj.rowData["Latest Revision No"];
                        else
                            contextObj.fieldRev["FieldValue"] = contextObj.rowData["Revision No."];
                        break;
                    case 1022:
                    case 1023:
                    case 1021:
                    case 1019:
                        contextObj.fieldObject.push(resultFields["Data"][i]);
                        break;
                }
            }
        });
        this.dataLoad();
    };
    BaseDrawingMarkupListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        var revNo;
        if (this.pagetarget == 0)
            revNo = contextObj.rowData["Latest Revision No"];
        else
            revNo = contextObj.rowData["Revision No."];
        this.projectService.getBaseDrawingMarkRevisionListData(578, this.rowData["Id"], this.inputItems.sortCol, this.inputItems.sortDir, this.pageIndex, 2, revNo).subscribe(function (resultData) {
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No markup exists", 2);
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3];
            }
        });
    };
    BaseDrawingMarkupListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    BaseDrawingMarkupListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.splitviewInput.showSecondaryView = true;
                this.markuprowData = this.inputItems.rowData;
                break;
            case 2:
                this.showSlide = true;
                this.drawingDialogMessages = { "key": 1, "message": "Are you sure you want to delete the selected Markup file?" };
                break;
        }
    };
    BaseDrawingMarkupListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        var retUpdatedSrc;
        this.splitviewInput.showSecondaryView = false;
        retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        this.totalItems = retUpdatedSrc["itemCount"];
        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
    };
    BaseDrawingMarkupListComponent.prototype.okBaseDrawingDelete = function (key) {
        switch (key) {
            case 1:
                this.deleteMarkUp();
                break;
        }
    };
    BaseDrawingMarkupListComponent.prototype.deleteMarkUp = function () {
        var contextObj = this;
        this.showSlide = false;
        this.projectService.deleteMarkUp(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [];
                }
                contextObj.notificationService.ShowToaster("Markup deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        }
                        break;
                }
            }
        });
    };
    BaseDrawingMarkupListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    BaseDrawingMarkupListComponent = __decorate([
        core_1.Component({
            selector: 'base-drawingmarkup-list',
            templateUrl: './app/Views/Projects/Projects Data/basedrawing-markup-list.component.html',
            providers: [sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["projectName", "rowData", "projectId", "pagetarget"],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, search_component_1.searchBox, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, labelcomponent_component_1.LabelComponent, editmarkup_component_1.EditMarkUpComponent]
        }), 
        __metadata('design:paramtypes', [projects_service_1.ProjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], BaseDrawingMarkupListComponent);
    return BaseDrawingMarkupListComponent;
}());
exports.BaseDrawingMarkupListComponent = BaseDrawingMarkupListComponent;
//# sourceMappingURL=basedrawing-markup-list.component.js.map