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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var WorkOrderFieldValuesComponent = (function () {
    function WorkOrderFieldValuesComponent(generFun, notificationService, confirmationService, workOrdereService, administrationService) {
        this.generFun = generFun;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.workOrdereService = workOrdereService;
        this.administrationService = administrationService;
        this.showSlide = false;
        this.position = "top-right";
        this.pageIndex = 0;
        this.sortdirection = "ASC";
        this.disableSort = false;
        this.sortfield = "Id";
        this.cardButtonPrivilege = [false, false];
        this.submitSuccess = [];
        this.fieldobjMax = new Array();
        //Form id : 234
        //Page id : 2439
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (234)) 
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                //recheck privilege id
                "privilegeId": 9501
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 9503
            },
            //for privilege
            {
                "id": 3,
                "title": "Edit",
                "image": null,
                "path": null,
                "submenu": null,
                "isvisible": false,
                "privilegeId": 9503
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0];
        this.selIds = new Array();
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.fieldobj = new Array();
    }
    WorkOrderFieldValuesComponent.prototype.ngOnInit = function () {
        this.selIds = [];
        var contextObj = this;
        this.addlDataField;
        this.fieldobj.push({
            ReportFieldId: 64,
            Value: this.addlDataField[0]
        });
        this.workOrdereService.getFieldValuesData(this.fieldobj).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
        this.workOrdereService.getFieldValuesFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            var fieldValue = contextObj.fields.find(function (item) { return item.ReportFieldId === 65; });
            switch (contextObj.fieldType["Field Type"]) {
                case "Date":
                    fieldValue.GenericDataTypeId = 2;
                    fieldValue.DataEntryControlId = 2;
                    fieldValue.Whitelist.Id = 7;
                    contextObj.workOrdereService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    //fieldValue.Whitelist.RegularExpression ="^[0-9a-zA-Z ]+$"
                    fieldValue.Format.Id = 1;
                    contextObj.workOrdereService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    //fieldValue.Format.FormatString = "dd MMM yyyy";
                    //fieldValue.Format.RegularExpression ="^(?:((31 (Jan|Mar|May|Jul|Aug|Oct|Dec))|((([0-2]\d)|30) (Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))|(([01]\d|2[0-8]) Feb))|(29 Feb(?= ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))) ((1[6-9]|[2-9]\d)\d{2})$"
                    break;
                case "Date Time":
                    fieldValue.GenericDataTypeId = 3;
                    fieldValue.DataEntryControlId = 8;
                    fieldValue.Whitelist.Id = 8;
                    contextObj.workOrdereService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    fieldValue.Format.Id = 2;
                    contextObj.workOrdereService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
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
                    contextObj.workOrdereService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
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
                    contextObj.workOrdereService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
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
        //fields => this.fields = fields["Data"],
        //error => this.errorMessage = <any>error, () => console.log('fields', this.fields));
        //form id : 234***** PageId :2439
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        var callBack = function (data) {
            if (data != undefined && data.length != 0)
                data.filter(function (el) {
                    if (el.title == "Edit") {
                        contextObj.cardButtonPrivilege[0] = true;
                    }
                    else if (el.title == "Delete") {
                        contextObj.cardButtonPrivilege[1] = true;
                    }
                });
            this.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2439, contextObj.administrationService, contextObj.menuData.length);
    };
    WorkOrderFieldValuesComponent.prototype.onCardSubmit = function (event) {
        this.disableSort = false;
        var contextObj = this;
        var id = [event["dataKeyValue"]];
        var temp = JSON.parse(event["fieldObject"]);
        temp.push(this.fieldobj[0]);
        event["fieldObject"] = JSON.stringify(temp);
        if (event["dataKeyValue"]) {
            this.workOrdereService.updateFieldValue(event["fieldObject"], this.selIds).subscribe(function (resultData) {
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
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1308" });
                    }
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj.notificationService.ShowToaster("Additional Data Field Value already exist", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1308" });
                    }
                }
            });
        }
        else {
            this.workOrdereService.insertFieldValue(event["fieldObject"]).subscribe(function (resultData) {
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
                        contextObj.enableMenu = [];
                        contextObj.selIds = [];
                        contextObj.notificationService.ShowToaster("Additional Data Field Value already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1308" });
                    }
                }
            });
        }
    };
    WorkOrderFieldValuesComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
            this.selIds = [];
        }
        else if (event.value == 2) {
            this.deleteClick(this.selIds);
        }
    };
    WorkOrderFieldValuesComponent.prototype.onSorting = function (event) {
        this.selIds = [];
        var contextObj = this;
        event["selectedField"] = "Field Value";
        console.log("sort action");
        this.sortdirection = event["sortDirection"];
        this.sortfield = event["selectedField"];
        this.workOrdereService.sortFieldValue(this.fieldobj, this.pageIndex, event["sortDirection"], "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
            //contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
        contextObj.enableMenu = [0];
    };
    WorkOrderFieldValuesComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrdereService.pagingFieldValue(this.fieldobj, this.pageIndex, this.sortdirection, this.sortfield).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
            //contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
        contextObj.enableMenu = [0];
    };
    ;
    WorkOrderFieldValuesComponent.prototype.addClick = function () {
        //this.enableMenu = [2];
        this.disableSort = true;
        this.enableMenu = [];
        this.sourceData = this.generFun.addCardForGrid(this.sourceData, this.fields);
    };
    WorkOrderFieldValuesComponent.prototype.deleteClick = function (id) {
        var contextObj = this;
        console.log("Id:", id);
        if (id.length > 0) {
            contextObj.workOrdereService.CheckAttributeLookupValueInUse(this.selIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.message = " Selected Additional Data Field Value is in use. Are you sure you want to delete?";
                else
                    contextObj.message = " Are you sure you want to delete the selected Data Field Value?";
            });
            this.showSlide = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Field Value", 2);
        }
    };
    WorkOrderFieldValuesComponent.prototype.okDelete = function (event) {
        this.showSlide = false;
        var contextObj = this;
        function findEntity(entity) {
            return entity.Id === contextObj.selIds[0];
        }
        this.workOrdereService.postDataFieldValueDelete(this.selIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.sourceData.splice(contextObj.sourceData.findIndex(findEntity), 1);
                var updatedList = new Array(); /*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.sourceData);
                contextObj.sourceData = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("Selected Additional Data Field Value deleted", 3);
                contextObj.selIds = [];
                contextObj.enableMenu = [0];
                contextObj.showSlide = false;
            }
            else if ((resultData["Data"]["StatusId"] == 0) && (resultData["Data"]["ServerId"] == -1))
                contextObj.notificationService.ShowToaster("Selected Additional data field is already in use", 2);
            else
                contextObj.notificationService.ShowToaster("Failed to delete the selected  Additional Data Field Value ", 5);
        });
    };
    WorkOrderFieldValuesComponent.prototype.onDelete = function (e) {
        this.deleteClick(this.selIds);
    };
    WorkOrderFieldValuesComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    WorkOrderFieldValuesComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    WorkOrderFieldValuesComponent.prototype.onCancel = function (e) {
        this.disableSort = false;
        this.selIds = [];
        this.enableMenu = [0];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WorkOrderFieldValuesComponent.prototype, "addlDataField", void 0);
    WorkOrderFieldValuesComponent = __decorate([
        core_1.Component({
            selector: 'work-order-field-values',
            templateUrl: './app/Views/Common/Additional Data Fields/field-values.component.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService],
            inputs: ['addlDataField', 'CategoryId', 'fieldType']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService])
    ], WorkOrderFieldValuesComponent);
    return WorkOrderFieldValuesComponent;
}());
exports.WorkOrderFieldValuesComponent = WorkOrderFieldValuesComponent;
//# sourceMappingURL=field-values.component.js.map