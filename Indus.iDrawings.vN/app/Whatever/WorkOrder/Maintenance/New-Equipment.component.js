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
var NewEquipmentComponent = (function () {
    function NewEquipmentComponent(workOrderService, notificationService, el, validateService, getData) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.el = el;
        this.validateService = validateService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isFilterLocation = false;
        this.isDdlEquipmentTypeLoaded = false;
        this.equipmentIds = new Array();
        this.resourceWithFilterIds = new Array();
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "Id", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    NewEquipmentComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        console.log(this.equipmentId);
        this.workOrderService.getNewEquipmentColumnData().subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
            contextObj.ddlEquipmentType = resultData["Data"].find(function (el) { return el.ReportFieldId === 657; });
            var updatedData = new Array(); /*To notify the watcher about the change*/
            resultData["Data"].splice(2, 2);
            updatedData = updatedData.concat(resultData["Data"]);
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 28)
                    resultData.Data[i]["Width"] = 250;
            }
            contextObj.fieldObject = updatedData;
            if (contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"].length == 1) {
                var selIdcat = contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"][0].Id;
                contextObj.ddlEquipmentCategory["FieldValue"] = selIdcat.toString();
                contextObj.onChangeEquipmentCategory(selIdcat);
                if (document.getElementById("1357")) {
                    var el = document.getElementById("1357");
                    var fldObj = contextObj.ddlEquipmentCategory;
                    setTimeout(function () {
                        contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                    }, 100);
                }
            }
        });
    };
    NewEquipmentComponent.prototype.onChangeEquipmentCategory = function (event) {
        this.objectCategoryId = event;
        var contextObj = this;
        this.workOrderService.getEquipmentType(this.objectCategoryId, 1357).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"] != "") {
                if (contextObj.ddlEquipmentType["FieldId"] == 1358) {
                    contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                    if (contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"].length == 1) {
                        var selId = contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"][0].Id;
                        contextObj.ddlEquipmentType["FieldValue"] = selId.toString();
                        contextObj.onChangeEquipmentType(selId);
                        //
                        if (document.getElementById("1358")) {
                            var el = document.getElementById("1358");
                            var fldObj = contextObj.ddlEquipmentType;
                            setTimeout(function () {
                                contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                            }, 100);
                        }
                    }
                    else {
                        contextObj.ddlEquipmentType["FieldValue"] = "-1";
                    }
                }
            }
            else {
                if (contextObj.ddlEquipmentType["FieldId"] == 1358) {
                    contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] = null;
                    contextObj.ddlEquipmentType["FieldValue"] = "-1";
                    contextObj.equipmentTypeId = -1;
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    if (document.getElementById("1358")) {
                        var el = document.getElementById("1358");
                        var fldObj = contextObj.ddlEquipmentType;
                        setTimeout(function () {
                            contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        });
        this.isDdlEquipmentTypeLoaded = true;
        contextObj.inputItems.isHeaderCheckBx = false;
        this.itemsSource = [];
    };
    NewEquipmentComponent.prototype.onChangeEquipmentType = function (event) {
        this.equipmentTypeId = event;
        var contextObj = this;
        if (contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] == null) {
            this.equipmentTypeId = -1;
        }
        //if (this.equipmentTypeId > 0) {
        if (this.isDdlEquipmentTypeLoaded == true) {
            this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    contextObj.equipmentIds.push({
                        Id: contextObj.itemsSource[i].Id
                    });
                }
                if (contextObj.totalItems == 0 && contextObj.equipmentTypeId != -1) {
                    contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                    contextObj.inputItems.isHeaderCheckBx = false;
                }
                else {
                    contextObj.inputItems.isHeaderCheckBx = true;
                }
            });
        }
        //}
    };
    //public onSort(objGrid: any) {
    //    var contextObj = this;
    //    this.inputItems.sortCol = objGrid.sortCol;
    //    this.inputItems.sortDir = objGrid.sortDir;
    //    this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
    //        contextObj.totalItems = resultData["Data"].DataCount;
    //        if (contextObj.totalItems > 0) {
    //            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
    //            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
    //            for (let i = 0; i < contextObj.itemsSource.length; i++) {
    //                contextObj.equipmentIds.push({
    //                    Id: contextObj.itemsSource[i].Id
    //                });
    //            }
    //        }
    //        else {
    //            contextObj.notificationService.ShowToaster("No Equipment exists", 2);
    //            contextObj.itemsSource = null;
    //        }
    //    });
    //}
    NewEquipmentComponent.prototype.insertEquipmentList = function (event) {
        var contextObj = this;
        var selectedRowIds = "";
        var arrayList = new Array();
        if (contextObj.equipmentIds.length > 0) {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 5633,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 5632,
                    Value: contextObj.equipmentId.toString()
                });
                //var test = JSON.stringify(arrayList);
                this.workOrderService.postSubmitActionEquipment(JSON.stringify(arrayList) /*selectedRowIds*/, contextObj.equipmentId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Equipment added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                if (this.objectCategoryId >= 0 && this.equipmentTypeId >= 0 /*&& contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] != null*/) {
                    if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No Equipment exist", 2);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select an Equipment", 2);
                    }
                }
            }
        }
        else {
        }
    };
    NewEquipmentComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
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
                contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                contextObj.itemsSource = null;
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewEquipmentComponent.prototype, "submitSuccess", void 0);
    NewEquipmentComponent = __decorate([
        core_1.Component({
            selector: 'new-equipment',
            templateUrl: 'app/Views/WorkOrder/Maintenance/New-Equipment.component.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            inputs: ['target', 'equipmentId']
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, core_1.ElementRef, validation_service_1.ValidateService, General_1.GeneralFunctions])
    ], NewEquipmentComponent);
    return NewEquipmentComponent;
}());
exports.NewEquipmentComponent = NewEquipmentComponent;
//# sourceMappingURL=New-Equipment.component.js.map