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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var FieldValuesComponent = (function () {
    function FieldValuesComponent(generFun, administrationService, notificationService, confirmationService) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.showSlide = false;
        this.position = "top-right";
        this.pageIndex = 0;
        this.sortdirection = "ASC";
        this.sortfield = "Id";
        this.disableSort = false;
        this.submitSuccess = [];
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
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
        this.gridcount = 8;
        this.enableMenu = [0];
        this.selIds = new Array();
        this.totalItems = 30;
        this.itemsPerPage = 10;
        this.fieldobj = new Array();
    }
    FieldValuesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.selIds = [];
        this.enableMenu = [0];
        this.addlDataField;
        this.fieldobj.push({
            ReportFieldId: 20,
            Value: this.addlDataField[0]
        });
        this.administrationService.getFieldValuesData(this.fieldobj).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
        this.administrationService.getFieldValuesFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            var fieldValue = contextObj.fields.find(function (item) { return item.ReportFieldId === 21; });
            switch (contextObj.fieldType["Field Type"]) {
                case "Date":
                    fieldValue.GenericDataTypeId = 2;
                    fieldValue.DataEntryControlId = 2;
                    fieldValue.Whitelist.Id = 7;
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    fieldValue.Format.Id = 1;
                    contextObj.administrationService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Date Time":
                    fieldValue.GenericDataTypeId = 3;
                    fieldValue.DataEntryControlId = 8;
                    fieldValue.Whitelist.Id = 8;
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    fieldValue.Format.Id = 2;
                    contextObj.administrationService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Integer":
                    fieldValue.GenericDataTypeId = 5;
                    fieldValue.DataEntryControlId = 1;
                    fieldValue.Whitelist.Id = 10;
                    fieldValue.MaxLength = 9;
                    fieldValue.Format.Id = 7;
                    fieldValue.Format.FormatString = "Integer";
                    fieldValue.Format.RegularExpression = "^[+-]?[0-9,]+$";
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Numeric":
                    fieldValue.GenericDataTypeId = 4;
                    fieldValue.DataEntryControlId = 1;
                    fieldValue.Whitelist.Id = 9;
                    fieldValue.MaxLength = 14;
                    fieldValue.Format.Id = 6;
                    fieldValue.Format.FormatString = "Numeric";
                    fieldValue.Format.RegularExpression = "^[+-]?((\\d+(\\.\\d*)?)|(\\.\\d+))$";
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Single Line Text":
                    fieldValue.MaxLength = contextObj.fieldType["Max Characters Allowed"];
                    break;
                case "Multi Line Text":
                    fieldValue.MaxLength = contextObj.fieldType["Max Characters Allowed"];
                    break;
            }
        });
    };
    FieldValuesComponent.prototype.onCardSubmit = function (event) {
        this.disableSort = false;
        var contextObj = this;
        var id = [event["dataKeyValue"]];
        var temp = JSON.parse(event["fieldObject"]);
        temp.push(this.fieldobj[0]);
        event["fieldObject"] = JSON.stringify(temp);
        if (event["dataKeyValue"]) {
            this.administrationService.updateFieldValue(event["fieldObject"], this.selIds[0]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Additional Data Field Value updated", 3);
                    var returnDatasrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.selIds = [];
                    contextObj.enableMenu = [0];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj.notificationService.ShowToaster("Failed to update Additional Data Field Value", 5);
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        if (contextObj.totalItems > 0)
                            contextObj.notificationService.ShowToaster("Additional Data Field Value already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "435" });
                    }
                }
            });
        }
        else {
            this.administrationService.insertFieldValue(event["fieldObject"]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Additional Data Field Value added", 3);
                    contextObj.selIds = [];
                    contextObj.sourceData.pop();
                    var returnDatasrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    if (contextObj.totalItems > 0)
                        contextObj.enableMenu = [0];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj.notificationService.ShowToaster("Failed to add Additional Data Field Value", 5);
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        if (contextObj.totalItems > 0) {
                            contextObj.enableMenu = [];
                            contextObj.selIds = [];
                        }
                        else {
                            contextObj.enableMenu = [];
                            contextObj.selIds = [];
                        }
                        contextObj.notificationService.ShowToaster("Additional Data Field Value already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "435" });
                    }
                }
            });
        }
    };
    FieldValuesComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.enableMenu = [];
            this.selIds = [];
            this.addClick();
        }
        else if (event.value == 2) {
            this.deleteClick(this.selIds);
        }
    };
    FieldValuesComponent.prototype.onSorting = function (event) {
        this.selIds = [];
        this.enableMenu = [0];
        var contextObj = this;
        this.sortdirection = event["sortDirection"];
        this.sortfield = event["selectedField"];
        this.administrationService.sortFieldValue(this.fieldobj, this.pageIndex, event["sortDirection"], "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
        });
        contextObj.enableMenu = [0];
    };
    FieldValuesComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.administrationService.pagingFieldValue(this.fieldobj, this.pageIndex, this.sortdirection, "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
        });
        contextObj.enableMenu = [0];
    };
    ;
    FieldValuesComponent.prototype.addClick = function () {
        this.disableSort = true;
        this.sourceData = this.generFun.addCardForGrid(this.sourceData, this.fields);
    };
    FieldValuesComponent.prototype.deleteClick = function (id) {
        if (id.length > 0) {
            var contextObj = this;
            var fieldobj1 = new Array();
            fieldobj1.push({
                ReportFieldId: 16,
                Value: contextObj.CategoryId
            });
            if (id.length > 0) {
                contextObj.administrationService.CheckAdditionalDataFieldLookUpValueInUse(this.selIds[0]).subscribe(function (returnCheck) {
                    if (returnCheck["Data"] == 1)
                        contextObj.message = " Selected Additional Data Field Value is in use. Are you sure you want to delete?";
                    else
                        contextObj.message = " Are you sure you want to delete the selected Data Field Value?";
                });
                this.showSlide = true;
            }
        }
        else {
            this.notificationService.ShowToaster("Select a Field Value", 2);
        }
    };
    FieldValuesComponent.prototype.okDelete = function (event) {
        this.showSlide = false;
        var contextObj = this;
        var count = 0;
        for (var i = 0; i < this.fieldobj.length; i++) {
            if (this.fieldobj[i].ReportFieldId == 24)
                count++;
        }
        if (count == 0)
            if (this.CategoryId[0])
                this.fieldobj.push({
                    ReportFieldId: 24,
                    Value: this.CategoryId[0]
                });
            else
                this.fieldobj.push({
                    ReportFieldId: 24,
                    Value: this.CategoryId
                });
        else {
            var item = this.fieldobj.find(function (item) {
                return item.ReportFieldId === 24;
            });
            if (this.CategoryId[0])
                item.Value = this.CategoryId[0];
            else
                item.Value = this.CategoryId;
        }
        function findEntity(entity) {
            return entity.Id === contextObj.selIds[0];
        }
        this.administrationService.postDataFieldValueDelete(this.selIds, this.fieldobj).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.sourceData.splice(contextObj.sourceData.findIndex(findEntity), 1);
                var updatedList = new Array(); /*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.sourceData);
                contextObj.sourceData = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("Selected Additional Data Field Value deleted", 3);
                contextObj.showSlide = false;
                contextObj.selIds = [];
            }
            else if ((resultData["Data"]["StatusId"] == 0) && (resultData["Data"]["ServerId"] == -1))
                contextObj.notificationService.ShowToaster("Selected Additional data field is already in use", 5);
            else
                contextObj.notificationService.ShowToaster("Failed to delete the selected  Additional Data Field Value ", 5);
        });
    };
    FieldValuesComponent.prototype.onDelete = function (e) {
        this.deleteClick(this.selIds);
    };
    FieldValuesComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    FieldValuesComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    FieldValuesComponent.prototype.onCancel = function (e) {
        this.disableSort = false;
        if (this.sourceData.length > 0)
            this.enableMenu = [0];
        else
            this.enableMenu = [0];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldValuesComponent.prototype, "addlDataField", void 0);
    FieldValuesComponent = __decorate([
        core_1.Component({
            selector: 'field-values',
            templateUrl: './app/Views/Common/Additional Data Fields/field-values.component.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService],
            inputs: ['addlDataField', 'CategoryId', 'fieldType']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], FieldValuesComponent);
    return FieldValuesComponent;
}());
exports.FieldValuesComponent = FieldValuesComponent;
//# sourceMappingURL=field-values.component.js.map