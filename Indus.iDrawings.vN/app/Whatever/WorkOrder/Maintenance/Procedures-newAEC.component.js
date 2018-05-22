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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var NewProcedureAssociateEquipmentComponent = (function () {
    function NewProcedureAssociateEquipmentComponent(workOrderService, notificationService, getData, validateService) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.validateService = validateService;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isFilterLocation = false;
        this.isDdlEquipmentTypeLoaded = false;
        this.equipmentIds = new Array();
        this.resourceWithFilterIds = new Array();
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "[Equipment Class]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    NewProcedureAssociateEquipmentComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.workOrderService.getProcedureNewAssociateEquipmentColumnData().subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 28)
                    resultData.Data[i]["Width"] = 250;
            }
            var removeArr = [4491];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            if (contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"].length == 1) {
                var selId = contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"][0].Id;
                contextObj.ddlEquipmentCategory["FieldValue"] = selId.toString();
                contextObj.onChangeEquipmentCategory(selId);
                if (document.getElementById("1426")) {
                    var el = document.getElementById("1426");
                    var fldObj = contextObj.ddlEquipmentCategory;
                    setTimeout(function () {
                        contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                    }, 100);
                }
            }
        });
    };
    NewProcedureAssociateEquipmentComponent.prototype.onChangeEquipmentCategory = function (event) {
        this.objectCategoryId = event;
        var contextObj = this;
        this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/ 0, contextObj.equipmentId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                contextObj.equipmentIds.push({
                    Id: contextObj.itemsSource[i].Id
                });
            }
            if (contextObj.totalItems == 0) {
                contextObj.inputItems.isHeaderCheckBx = false;
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
            }
            else {
                contextObj.inputItems.isHeaderCheckBx = true;
            }
        });
    };
    NewProcedureAssociateEquipmentComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/ 0, contextObj.equipmentId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    contextObj.equipmentIds.push({
                        Id: contextObj.itemsSource[i].Id
                    });
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.itemsSource = null;
            }
        });
    };
    NewProcedureAssociateEquipmentComponent.prototype.insertEquipmentList = function (event) {
        var contextObj = this;
        //var selectedRowIds: string = "";
        var arrayList = new Array();
        //for (let i = 0, j = 0; i < contextObj.itemsSource.length, j < contextObj.equipmentIds.length; i++ , j++) {
        //    if (contextObj.itemsSource[i].Id == true) { // need to change Id to something else for checking JN
        //        if (i == 0) {
        //            selectedRowIds = contextObj.equipmentIds[i].Id.toString();
        //        }
        //        else {
        //            selectedRowIds = selectedRowIds + "," + contextObj.equipmentIds[i].Id.toString();
        //        }
        //    }
        //}
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            if (this.objectCategoryId > 0) {
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
            }
            else {
                contextObj.notificationService.ShowToaster("Select an Equipment Category", 2);
            }
            return;
        }
        else {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 5511,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            //if (selectedRowIds != "") {
            //var array = selectedRowIds.split(',');
            //for (let c = 0; c < array.length; c++) {
            //    if (array[c] != "") {
            //        arrayList.push({
            //            ReportFieldId: 5511,
            //            Value: array[c]
            //        });
            //    }
            //}
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 5510,
                    Value: contextObj.equipmentId.toString()
                });
                //var test = JSON.stringify(arrayList);
                this.workOrderService.postSubmitActionProcedureAssociateEquipment(JSON.stringify(arrayList) /*selectedRowIds*/, contextObj.equipmentId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Equipment Class added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                if (contextObj.totalItems > 0)
                    contextObj.notificationService.ShowToaster("Select an Equipment Class", 2);
                else {
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                }
            }
        }
    };
    NewProcedureAssociateEquipmentComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/ 0, contextObj.equipmentId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    contextObj.equipmentIds.push({
                        Id: contextObj.itemsSource[i].Id
                    });
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.itemsSource = null;
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewProcedureAssociateEquipmentComponent.prototype, "submitSuccess", void 0);
    NewProcedureAssociateEquipmentComponent = __decorate([
        core_1.Component({
            selector: 'new-procedure-associate-equipment',
            templateUrl: 'app/Views/WorkOrder/Maintenance/Procedures-newAEC.component.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            inputs: ['target', 'equipmentId']
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], NewProcedureAssociateEquipmentComponent);
    return NewProcedureAssociateEquipmentComponent;
}());
exports.NewProcedureAssociateEquipmentComponent = NewProcedureAssociateEquipmentComponent;
//# sourceMappingURL=Procedures-newAEC.component.js.map