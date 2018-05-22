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
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var General_1 = require('../../../Models/Common/General');
var DrawingLayersComponent = (function () {
    function DrawingLayersComponent(administrationService, notificationService, confirmationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = false;
        this.itemsPerPage = 30;
        this.success = "";
        this.submitSuccess = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
            }
        ];
        this.gridcount = 0;
        this.enableMenu = [];
        this.selIds = new Array();
        this.Id = 1;
    }
    DrawingLayersComponent.prototype.ngOnInit = function () {
    };
    DrawingLayersComponent.prototype.ngOnChanges = function (changes) {
        if (this.Expanded == true) {
            var contextObj = this;
            this.administrationService.getDrawingLayersFields().subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fields = resultData["Data"];
                }
            });
            this.administrationService.getDrawingLayersData().subscribe(function (resultData1) {
                if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                    if (resultData1["Data"] == "[]") {
                        resultData1["Data"] = null;
                    }
                    contextObj.drawingLayersSource = JSON.parse(resultData1["Data"].FieldBinderData);
                    if (resultData1["Data"].FieldBinderData == "[]") {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Drawing Layer added", 5);
                    }
                    else {
                        contextObj.enableMenu = [1, 3];
                    }
                }
            });
        }
    };
    DrawingLayersComponent.prototype.onSorting = function (objGrid) {
        var contextObj = this;
        this.administrationService.sortDrawingLayer(objGrid.sortDirection, objGrid.selectedField).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                this.drawingLayersSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            }
        });
    };
    DrawingLayersComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        if (event["dataKeyValue"]) {
            var test = event.fieldObject;
            this.administrationService.postSubmitEditdrawinglayer(test, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else if (resultData["Data"].ServerId == -3) {
                        contextObj.notificationService.ShowToaster("IDrawing Layer Names and  Drawing Layer Names should not be same", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Layer Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                }
            });
        }
        else {
            var test = event.fieldObject;
            this.administrationService.postSubmitAdddrawinglayer(test).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Drawing Layer added", 3);
                        contextObj.enableMenu = [1, 3];
                        contextObj.types = false;
                        contextObj.drawingLayersSource[contextObj.drawingLayersSource.length - 1] = eval(resultData["Data"].Data)[0];
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else if (resultData["Data"].ServerId == -3) {
                        contextObj.types = false;
                        contextObj.enableMenu = [1, 3];
                        contextObj.notificationService.ShowToaster("iDrawings Layer Name and Drawing Layer Name should not be same", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                    else {
                        contextObj.types = false;
                        contextObj.enableMenu = [1, 3];
                        contextObj.notificationService.ShowToaster("Layer Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                }
            });
        }
    };
    DrawingLayersComponent.prototype.onSubMenuChange = function (event, id) {
        var editid = 0;
        if (event.value == 1) {
            this.menuAddClick();
        }
        else if (event.value == 3) {
            this.menuDeleteClick(event.value);
        }
    };
    DrawingLayersComponent.prototype.menuAddClick = function () {
        this.drawingLayersSource = this.getData.addCardForGrid(this.drawingLayersSource, this.fields);
        this.types = true;
        this.enableMenu = [3];
    };
    DrawingLayersComponent.prototype.menuDeleteClick = function (id) {
        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
        else if (this.selIds.length == 1) {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Drawing Layer?", "Yes");
        }
        else {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
    };
    DrawingLayersComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        if (event.returnOk == true) {
            this.administrationService.postDrawingLayersDelete(this.selIds[0]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems - 1;
                        for (var j = 0; j < contextObj.selIds.length; j++) {
                            var index = contextObj.drawingLayersSource.indexOf(contextObj.drawingLayersSource.filter(function (x) { return x["Id"] == contextObj.selIds[j]; })[0]);
                            if (index > -1)
                                contextObj.drawingLayersSource.splice(index, 1);
                        }
                        contextObj.notificationService.ShowToaster("Selected Drawing Layer deleted", 3);
                        if (contextObj.drawingLayersSource.length == 0) {
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Selected Drawing Layer in use ,cannot be deleted", 5);
                    }
                }
            });
        }
    };
    DrawingLayersComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        if (event.pageEvent.page == 2) {
            contextObj.administrationService.getDrawingLayersData().
                subscribe(function (itemsSource) {
                if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                    contextObj.drawingLayersSource = itemsSource["paging"];
                }
            });
        }
        else {
            contextObj.administrationService.getDrawingLayersData().
                subscribe(function (itemsSource) {
                if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                    contextObj.drawingLayersSource = itemsSource["data"];
                }
            });
        }
    };
    ;
    DrawingLayersComponent.prototype.onCardCancelClick = function () {
        this.types = false;
        this.enableMenu = [1, 3];
    };
    DrawingLayersComponent.prototype.onDelete = function (e) {
        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
        else {
            this.menuDeleteClick(this.selIds);
        }
    };
    DrawingLayersComponent = __decorate([
        core_1.Component({
            selector: 'drawing-layers',
            templateUrl: './app/Views/Administration/Drawing Settings/drawing-layers.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, confirm_component_1.ConfirmationComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
            inputs: ['Expanded']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], DrawingLayersComponent);
    return DrawingLayersComponent;
}());
exports.DrawingLayersComponent = DrawingLayersComponent;
//# sourceMappingURL=drawing-layers.component.js.map