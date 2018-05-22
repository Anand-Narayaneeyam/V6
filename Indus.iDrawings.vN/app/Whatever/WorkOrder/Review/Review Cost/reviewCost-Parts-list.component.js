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
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var validation_service_1 = require('../../../../Framework/Models/Validation/validation.service');
var ReviewPartsComponent = (function () {
    function ReviewPartsComponent(administrationServices, workOrderService, notificationService, generFun, _validateService) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._validateService = _validateService;
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.onSubmit = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.onCostUpdate = new core_1.EventEmitter();
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.equipmentCategoryId = 0;
        this.cardButtonPrivilege = [false, false];
        this.types = true;
        this.pageTitle = "Select Parts";
        //Form id : 250-- page id 732
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (250))
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": null
            } //,
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ReviewPartsComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        // var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getReviewPartsFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            contextObj.dataLoad(1);
        });
    };
    ReviewPartsComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getReviewPartsData(contextObj.getWorkFlowEntityReportFieldIdValues()).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.enableMenu = [1];
            }
            contextObj.itemSourceUpdate.emit({
                itemSource: contextObj.itemsSource,
                rowsPerPage: contextObj.itemsPerPage,
                totalItems: contextObj.totalItems,
                fieldObject: contextObj.fieldObject
            });
        });
    };
    ReviewPartsComponent.prototype.getWorkFlowEntityReportFieldIdValues = function () {
        var tempArray = [];
        for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
            var item = _a[_i];
            tempArray.push({
                ReportFieldId: 7498,
                Value: item
            });
        }
        return JSON.stringify(tempArray);
    };
    ReviewPartsComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    };
    ReviewPartsComponent.prototype.onPartsSubmit = function (event) {
        debugger;
        console.log(event);
        var fieldObjectArray = JSON.parse(event.fieldobject);
        var index = fieldObjectArray.indexOf(fieldObjectArray.find(function (item) { return item.ReportFieldId === 1378; }));
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        var partsField = this.fieldDetailsAdd1.find(function (item) {
            return item.ReportFieldId === 1378;
        });
        if (partsField.MultiFieldValues != null) {
            for (var _i = 0, _a = partsField.MultiFieldValues; _i < _a.length; _i++) {
                var item = _a[_i];
                fieldObjectArray.push({
                    ReportFieldId: 1378,
                    Value: item
                });
            }
        }
        this.onSubmit.emit(fieldObjectArray);
        var contextObj = this;
        setTimeout(function () {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }, 150);
    };
    ReviewPartsComponent.prototype.onCellUpdate = function (event) {
        this.onCostUpdate.emit(event);
    };
    ReviewPartsComponent.prototype.addClick = function () {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        contextObj.equipmentCategoryId = 0;
        contextObj.workOrderService.loadReviewPartsAdd(contextObj.getLookupWorkFlowEntityReportFieldIdValues(0, "add")).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetails(resultData["Data"]);
            var partsField = contextObj.fieldDetailsAdd1.find(function (item) {
                return item.ReportFieldId === 1378;
            });
            if (partsField.LookupDetails.LookupValues == null || partsField.LookupDetails.LookupValues.length == 0) {
                contextObj.notificationService.ShowToaster("No Parts exist", 2);
                return;
            }
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ReviewPartsComponent.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        switch (event.FieldId) {
            case 1357:
                contextObj.equipmentCategoryId = event.FieldValue == "-1" ? "0" : event.FieldValue;
                contextObj.workOrderService.loadEquipmentClassforParts(event.FieldValue).subscribe(function (resultData) {
                    debugger;
                    console.log(resultData);
                    var equipmentClassField = contextObj.fieldDetailsAdd1.find(function (item) {
                        return item.FieldId === 1358;
                    });
                    equipmentClassField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    equipmentClassField.FieldValue = "-1";
                });
                /*Load Parts Lookup values with respect to Equipment Category*/
                contextObj.workOrderService.getValuesWithDbObjectDetails(50734, contextObj.getLookupWorkFlowEntityReportFieldIdValues(0, "dropDown")).subscribe(function (resultData) {
                    var partsField = contextObj.fieldDetailsAdd1.find(function (item) {
                        return item.FieldId === 1420;
                    });
                    partsField.MultiFieldValues = null;
                    partsField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    partsField.IsMandatory = partsField.IsEnabled = partsField.LookupDetails.LookupValues.length != 0;
                });
                break;
            case 1358:
                contextObj.workOrderService.getValuesWithDbObjectDetails(50734, contextObj.getLookupWorkFlowEntityReportFieldIdValues(event.FieldValue == "-1" ? "0" : event.FieldValue, "dropDown")).subscribe(function (resultData) {
                    var partsField = contextObj.fieldDetailsAdd1.find(function (item) {
                        return item.FieldId === 1420;
                    });
                    partsField.MultiFieldValues = null;
                    partsField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    partsField.IsMandatory = partsField.IsEnabled = partsField.LookupDetails.LookupValues.length != 0;
                });
                break;
        }
    };
    ReviewPartsComponent.prototype.getLookupWorkFlowEntityReportFieldIdValues = function (classId, target) {
        if (target == "add") {
            var tempArray = [];
            tempArray.push({ FieldId: 1420, ReportFieldId: 4484, Value: classId }, { FieldId: 1420, ReportFieldId: 4485, Value: this.equipmentCategoryId });
            for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
                var item = _a[_i];
                tempArray.push({
                    FieldId: 1420,
                    ReportFieldId: 7498,
                    Value: item
                });
            }
            return JSON.stringify(tempArray);
        }
        else if (target == "dropDown") {
            var tempArray1 = [];
            tempArray1.push({ ReportFieldId: 4484, Value: classId }, { ReportFieldId: 4485, Value: this.equipmentCategoryId });
            for (var _b = 0, _c = this.workFlowEntityIds; _b < _c.length; _b++) {
                var item = _c[_b];
                tempArray1.push({
                    ReportFieldId: 7498,
                    Value: item
                });
            }
            return JSON.stringify(tempArray1);
        }
    };
    ReviewPartsComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    ReviewPartsComponent.prototype.updateFieldDetails = function (fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5859:
                    item.FieldValue = contextObj.workFlowEntityIds[0];
                    break;
                case 4491:
                    item.IsMandatory = false;
                    break;
                case 657:
                    item.IsMandatory = false;
                    break;
                default:
                    break;
            }
        });
        return fieldDetailsArray;
    };
    /*slide events*/
    ReviewPartsComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.onDelete.emit(this.inputItems.selectedIds);
    };
    ReviewPartsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ReviewPartsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ReviewPartsComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPartsComponent.prototype, "itemSourceUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPartsComponent.prototype, "onSubmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPartsComponent.prototype, "onDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPartsComponent.prototype, "onCostUpdate", void 0);
    ReviewPartsComponent = __decorate([
        core_1.Component({
            selector: 'reviewParts-list',
            templateUrl: './app/Views/WorkOrder/Review/Review Cost/reviewCost-Parts-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, validation_service_1.ValidateService],
            inputs: ['workrequestId', 'workFlowEntityIds', 'itemsSource', 'totalItems', 'inputItems', 'itemsPerPage', 'enableMenu'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], ReviewPartsComponent);
    return ReviewPartsComponent;
}());
exports.ReviewPartsComponent = ReviewPartsComponent;
//# sourceMappingURL=reviewCost-Parts-list.component.js.map