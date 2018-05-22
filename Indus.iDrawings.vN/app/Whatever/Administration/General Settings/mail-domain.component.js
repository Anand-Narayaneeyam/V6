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
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var MailDomainComponent = (function () {
    function MailDomainComponent(administrationService, notificationService, generFunctions) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFunctions = generFunctions;
        this.showSlide = false;
        this.Position = "top-right";
        this.enableMenu = [];
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
        this.types = false;
        this.selIds = new Array();
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.cardFieldArray = new Array();
    }
    MailDomainComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getMailDomainData().subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.sourceData) {
                    for (var i = 0; i < contextObj.sourceData.length; i++) {
                        contextObj.cardFieldArray.push({
                            id: contextObj.sourceData[i].Id,
                            Value: contextObj.sourceData[i].MailDomainName
                        });
                    }
                }
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Mail Domain exists", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
            else {
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
        });
        this.administrationService.getMailDomainFields().subscribe(function (list) {
            contextObj.fields = (list["Data"]);
        });
    };
    MailDomainComponent.prototype.onCardSubmit = function (event) {
        var id = [event["dataKeyValue"]];
        var contextObj = this;
        var blnEmptyString = false;
        var strDomainName = "";
        var strFieldObject = JSON.parse(event['fieldObject']);
        for (var i = 0; i < strFieldObject.length; i++) {
            if (strFieldObject[i].ReportFieldId == 8693) {
                if (strFieldObject[i].Value == "" || strFieldObject[i].Value == null) {
                    blnEmptyString = true;
                }
                else {
                    blnEmptyString = false;
                    strDomainName = strFieldObject[i].Value;
                }
            }
        }
        if (blnEmptyString == true) {
            this.notificationService.ShowToaster("Enter a Mail Domain", 2);
        }
        else {
            if (strDomainName != "") {
                if (event["dataKeyValue"]) {
                    this.administrationService.postMailDomainInUse(this.selIds[0]).subscribe(function (resultData) {
                        if (resultData["Data"] == 0) {
                            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(strDomainName)) {
                                var test = event.fieldObject;
                                contextObj.administrationService.postMailDomainUpdate(test, event["dataKeyValue"]).subscribe(function (resultData) {
                                    contextObj.success = (resultData["Data"]);
                                    var retData = { returnData: contextObj.success.Data };
                                    if (resultData["Data"].StatusId == 1) {
                                        contextObj.notificationService.ShowToaster("Mail Domain updated", 3);
                                        var returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                                        contextObj.sourceData = returnDatasrc["itemSrc"];
                                        contextObj.totalItems = returnDatasrc["itemCount"];
                                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                                    }
                                    else if (resultData["Data"].StatusId == 2) {
                                        contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                                    }
                                    else if (resultData["Data"].StatusId == 3) {
                                        if (resultData["Data"].ServerId == -1) {
                                            contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                        }
                                        else if (resultData["Data"].ServerId == -2) {
                                            contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be edited", 2);
                                        }
                                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                                    }
                                });
                            }
                            else {
                                contextObj.notificationService.ShowToaster("Enter a valid Mail Domain", 2);
                            }
                        }
                        else if (resultData["Data"] == 1) {
                            var strOldValue = "";
                            for (var i = 0; i < contextObj.cardFieldArray.length; i++) {
                                if (Number(id) == contextObj.cardFieldArray[i].id) {
                                    strOldValue = contextObj.cardFieldArray[i].Value;
                                    var elem = document.getElementById("182");
                                    if (elem) {
                                        elem.value = strOldValue;
                                    }
                                }
                            }
                            contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be edited", 2);
                        }
                    });
                }
                else {
                    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(strDomainName)) {
                        var test = event.fieldObject;
                        contextObj.administrationService.postMailDomainInsert(test).subscribe(function (resultData) {
                            contextObj.success = (resultData["Data"]);
                            var retData = { returnData: contextObj.success.Data };
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Mail Domain added", 3);
                                contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                                contextObj.sourceData.pop();
                                var returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                                contextObj.sourceData = returnDatasrc["itemSrc"];
                                contextObj.totalItems = returnDatasrc["itemCount"];
                                if (contextObj.totalItems == 0) {
                                    contextObj.enableMenu = [0];
                                    contextObj.types = false;
                                }
                                else {
                                    contextObj.enableMenu = [0, 2];
                                    contextObj.types = true;
                                }
                            }
                            else if (resultData["Data"].StatusId == 3) {
                                contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                            }
                        });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Enter a valid Mail Domain", 2);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                    }
                }
            }
        }
    };
    MailDomainComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 2) {
            this.deleteClick(this.selIds);
        }
    };
    //onSorting(event: any) {
    //}
    //public pageChanged(event: any) {
    //};
    MailDomainComponent.prototype.addClick = function () {
        this.sourceData = this.generFunctions.addCardForGrid(this.sourceData, this.fields);
        this.types = true;
        this.enableMenu = [];
    };
    MailDomainComponent.prototype.deleteClick = function (id) {
        var contextObj = this;
        if (id[0] != null) {
            this.administrationService.postMailDomainInUse(this.selIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.showSlide = true;
                }
                else if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be deleted", 2);
                }
            });
        }
        else if (id.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else if (id.length == 0) {
            this.notificationService.ShowToaster("Select a Mail Domain", 2);
        }
    };
    MailDomainComponent.prototype.onDelete = function (e) {
        this.deleteClick(this.selIds);
    };
    MailDomainComponent.prototype.onCancel = function (e) {
        if (this.totalItems > 0) {
            this.enableMenu = [0, 2];
        }
        else {
            this.enableMenu = [0];
        }
    };
    MailDomainComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        this.administrationService.postMailDomainDelete(this.selIds[0]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (resultData["Data"].StatusId == 1) {
                for (var j = 0; j < contextObj.selIds.length; j++) {
                    var index = contextObj.sourceData.indexOf(contextObj.sourceData.filter(function (x) { return x["Id"] == contextObj.selIds[j]; })[0]);
                    if (index > -1)
                        contextObj.sourceData.splice(index, 1);
                }
                contextObj.notificationService.ShowToaster("Selected Mail Domain deleted", 3);
            }
        });
        this.showSlide = false;
    };
    MailDomainComponent.prototype.cancelClick = function (value) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    };
    MailDomainComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
    };
    MailDomainComponent = __decorate([
        core_1.Component({
            selector: 'mail-domain',
            templateUrl: './app/Views/Administration/General Settings/mail-domain.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], MailDomainComponent);
    return MailDomainComponent;
}());
exports.MailDomainComponent = MailDomainComponent;
//# sourceMappingURL=mail-domain.component.js.map