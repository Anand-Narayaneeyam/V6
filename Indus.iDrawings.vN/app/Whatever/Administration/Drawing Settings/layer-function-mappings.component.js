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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var LayerFunctionMappingComponent = (function () {
    function LayerFunctionMappingComponent(administrationService, notificationService, confirmationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.totalItems = 30;
        this.itemsPerPage = 10;
        this.success = "";
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
        this.enableMenu = [];
        this.types = false;
        this.selIds = new Array();
        this.Position = "bottom-right";
        this.width = 300;
        this.change = false;
        this.showSlide = false;
    }
    LayerFunctionMappingComponent.prototype.ngOnInit = function () {
    };
    LayerFunctionMappingComponent.prototype.ngOnChanges = function (changes) {
        if (this.Expanded == true) {
            var contextObj = this;
            this.administrationService.getLayerMappingFunction().subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"] == "[]") {
                        resultData["Data"] = null;
                    }
                    contextObj.listSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    if (resultData["Data"].FieldBinderData == "[]") {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Layer Functions added", 5);
                    }
                    else {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                    }
                }
            });
            this.administrationService.getLayerMappingFunctionFields().subscribe(function (resultData1) {
                if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                    contextObj.fields = resultData1["Data"];
                    contextObj.fields = contextObj.fields.filter(function (el) {
                        if (el.ReportFieldId == 4762) {
                            if (el.LookupDetails.LookupValues == undefined || el.LookupDetails.LookupValues == null) {
                                contextObj.notificationService.ShowToaster("No Data Fields added", 5);
                            }
                        }
                        return true;
                    });
                }
            });
        }
    };
    LayerFunctionMappingComponent.prototype.onSorting = function (event) {
    };
    LayerFunctionMappingComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        if (event["dataKeyValue"] == "--Select--") {
            event["dataKeyValue"] = 0;
        }
        this.selId = this.fields[1].LookupDetails.LookupValues.find(function (item) { return item.Id === event["dataKeyValue"]; });
        if (this.selId != undefined) {
            var test = event.fieldObject;
            this.administrationService.postSubmitEditayerMapping(test, this.selId.Id).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Action Failure", 5);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Layer Function Mapping updated", 3);
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                            }
                            break;
                    }
                }
            });
        }
        else {
            var test = event.fieldObject;
            this.administrationService.postSubmitAdddrawinglayerMapping(test).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Action Failure", 5);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Layer Function Mapping added", 3);
                            contextObj.listSource[contextObj.listSource.length - 1].Id = resultData["Data"].ServerId;
                            contextObj.selId = resultData["Data"].ServerId;
                            contextObj.listSource[contextObj.listSource.length - 1] = eval(resultData["Data"].Data)[0];
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                            this.fields = this.fields.filter(function (el) {
                                if (el.ReportFieldId == 4761) {
                                    el.IsEnabled = false;
                                }
                                return true;
                            });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.listSource.pop();
                                contextObj.types = true;
                                contextObj.enableMenu = [1];
                                contextObj.notificationService.ShowToaster("Layer Function Mapping already exists", 5);
                            }
                            break;
                    }
                }
            });
        }
    };
    LayerFunctionMappingComponent.prototype.onSubMenuChange = function (event, id) {
        var editid = 0;
        if (event.value == 1) {
            this.menuAddClick();
        }
        else if (event.value == 3) {
            this.onDelete(this.selIds);
        }
    };
    LayerFunctionMappingComponent.prototype.menuAddClick = function () {
        this.selIds = [];
        this.listSource = this.getData.addCardForGrid(this.listSource, this.fields);
        this.fields = this.fields.filter(function (el) {
            el.IsEnabled = true;
            return true;
        });
        this.types = true;
        this.enableMenu = [];
    };
    LayerFunctionMappingComponent.prototype.onDelete = function (event) {
        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
        else {
            this.menuDeleteClick(this.selIds);
        }
    };
    LayerFunctionMappingComponent.prototype.okDelete = function ($event) {
        var contextObj = this;
        this.selId = contextObj.fields[1].LookupDetails.LookupValues.find(function (item) { return item.Id === contextObj.selIds[0]; });
        this.administrationService.postLayerMappingFunctionDelete(contextObj.selId.Id).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    for (var j = 0; j < contextObj.selIds.length; j++) {
                        var index = contextObj.listSource.indexOf(contextObj.listSource.filter(function (x) { return x["Drawing Layer"] == contextObj.selIds[j]; })[0]);
                        if (index > -1)
                            contextObj.listSource.splice(index, 1);
                    }
                    contextObj.notificationService.ShowToaster("Selected Layer Function Mapping deleted", 3);
                    contextObj.totalItems = contextObj.totalItems - 1;
                    if (contextObj.listSource.length == 0) {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                    }
                }
                else {
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                }
            }
        });
        this.showSlide = !this.showSlide;
    };
    LayerFunctionMappingComponent.prototype.menuDeleteClick = function (id) {
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    };
    LayerFunctionMappingComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        if (event.pageEvent.page == 2) {
            this.administrationService.getLayerMappingFunction().
                subscribe(function (itemsSource) {
                if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                    contextObj.listSource = itemsSource["paging"];
                }
            });
        }
        else {
            this.administrationService.getLayerMappingFunction().
                subscribe(function (itemsSource) {
                if (this.getData.checkForUnhandledErrors(itemsSource)) {
                    this.listSource = itemsSource["data"];
                }
            });
        }
    };
    ;
    LayerFunctionMappingComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    LayerFunctionMappingComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    LayerFunctionMappingComponent.prototype.onCardCancelClick = function () {
        this.types = true;
        this.enableMenu = [1];
        this.selIds = [];
        this.fields = this.fields.filter(function (el) {
            if (el.ReportFieldId == 4761) {
                el.IsEnabled = false;
            }
            return true;
        });
    };
    LayerFunctionMappingComponent = __decorate([
        core_1.Component({
            selector: 'layer-function-mappings',
            templateUrl: './app/Views/Administration/Drawing Settings/layer-function-mappings.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
            inputs: ['Expanded']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], LayerFunctionMappingComponent);
    return LayerFunctionMappingComponent;
}());
exports.LayerFunctionMappingComponent = LayerFunctionMappingComponent;
//# sourceMappingURL=layer-function-mappings.component.js.map