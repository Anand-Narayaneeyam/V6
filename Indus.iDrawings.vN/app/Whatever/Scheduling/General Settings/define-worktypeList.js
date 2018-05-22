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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var define_worktypeaddedit_1 = require('./define-worktypeaddedit');
var DefineWorkTypeComponent = (function () {
    function DefineWorkTypeComponent(generFun, schedulingService, notificationService) {
        this.generFun = generFun;
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.showSlide = false;
        this.position = "top-right";
        this.moduleId = 0;
        this.workFlowCategoryId = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1, 2];
    }
    DefineWorkTypeComponent.prototype.ngOnInit = function () {
        this.btnName = "Add";
        var contextObj = this;
        this.schedulingService.getFieldsList().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
        });
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, this.workFlowCategoryId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No data exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    DefineWorkTypeComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, this.workFlowCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    DefineWorkTypeComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    };
    DefineWorkTypeComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Add";
        var contextObj = this;
        this.schedulingService.loadDefineWorkTypesAddEdit(0, 1, this.workFlowCategoryId, this.moduleId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    DefineWorkTypeComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.loadDefineWorkTypesAddEdit(this.inputItems.selectedIds[0], 2, this.workFlowCategoryId, this.moduleId).subscribe(function (resultData) {
                resultData["Data"] = contextObj.setWorkTypeAddEditFieldDetails(resultData["Data"]);
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                //for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                //    if ((contextObj.fieldDetailsAddEdit[i].FieldId == 1001) && (contextObj.fieldDetailsAddEdit[i].FieldId == 1000)) {
                //        this.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                //        this.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                //        this.fieldDetailsAddEdit[i]["ReadOnlyMode"] = true;
                //    }
                //}
            });
        }
    };
    DefineWorkTypeComponent.prototype.setWorkTypeAddEditFieldDetails = function (jsonobject) {
        var contextObj = this;
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 5841) {
                    jsonobject[i]["IsEnabled"] = false;
                    jsonobject[i]["ReadOnlyMode"] = true;
                    jsonobject[i]["IsMandatory"] = false;
                }
                if (jsonobject[i]["ReportFieldId"] == 6576) {
                    jsonobject[i]["IsEnabled"] = false;
                    jsonobject[i]["ReadOnlyMode"] = true;
                    jsonobject[i]["IsMandatory"] = false;
                }
            }
            return jsonobject;
        }
    };
    DefineWorkTypeComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    DefineWorkTypeComponent.prototype.deleteWorkTypes = function () {
        var contextObj = this;
        this.schedulingService.postDeleteDefineWorkType(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Work Type deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Work Type cannot be deleted", 5);
            }
        });
    };
    DefineWorkTypeComponent.prototype.OnSuccessfulSubmit = function (event) {
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            }
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    DefineWorkTypeComponent.prototype.inlineDelete = function (event) {
        this.deleteWorkTypes();
    };
    DefineWorkTypeComponent.prototype.okDelete = function (event) {
        this.deleteWorkTypes();
        this.showSlide = !this.showSlide;
    };
    DefineWorkTypeComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DefineWorkTypeComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DefineWorkTypeComponent = __decorate([
        core_1.Component({
            selector: 'define-workType',
            templateUrl: './app/Views/Scheduling/General Settings/define-worktypeList.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, slide_component_1.SlideComponent, define_worktypeaddedit_1.DefineWorkTypeAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['moduleId', 'workFlowCategoryId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], DefineWorkTypeComponent);
    return DefineWorkTypeComponent;
}());
exports.DefineWorkTypeComponent = DefineWorkTypeComponent;
//# sourceMappingURL=define-worktypeList.js.map