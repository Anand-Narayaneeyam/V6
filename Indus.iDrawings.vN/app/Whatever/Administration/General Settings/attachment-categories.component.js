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
var AttachmentCategoryComponent = (function () {
    function AttachmentCategoryComponent(administrationService, notificationService, generFunctions) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFunctions = generFunctions;
        this.submitSuccess = [];
        this.showSlide = false;
        this.Position = "bottom-right";
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
        this.enableMenu = [];
        this.selIds = new Array();
    }
    AttachmentCategoryComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getAttachmentCategoryData().subscribe(function (list) {
            contextObj.totalItems = JSON.parse(list["Data"].FieldBinderData).length;
            if (JSON.parse(list["Data"].FieldBinderData).length > 0) {
                contextObj.sourceData = JSON.parse(list["Data"].FieldBinderData);
                contextObj.itemsPerPage = list["Data"].RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Attachment Category exists", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
            else {
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Attachment Categories exist", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
            contextObj.attachmentCategorySource = JSON.parse(list["Data"].FieldBinderData);
        });
        this.administrationService.getAttachmentCategoryFields().subscribe(function (list) {
            contextObj.fields = (list["Data"]);
        });
    };
    AttachmentCategoryComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var id = [event["dataKeyValue"]];
        if (event["dataKeyValue"]) {
            var test = event.fieldObject;
            this.administrationService.postAttachmentCategoryUpdate(test, event["dataKeyValue"]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Attachment Category updated", 3);
                    var returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else {
                    contextObj.notificationService.ShowToaster("Attachment Category already exists", 5);
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "162" });
                }
            });
        }
        else {
            var test = event.fieldObject;
            this.administrationService.postAttachmentCategoryInsert(test).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Attachment Category added", 3);
                    contextObj.sourceData.pop();
                    var returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (resultData["Data"].ServerId == -1) {
                    contextObj.notificationService.ShowToaster("Attachment Category already exists", 5);
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "162" });
                }
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.types = false;
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            });
        }
    };
    AttachmentCategoryComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 2) {
            this.deleteClick(this.selIds);
        }
    };
    AttachmentCategoryComponent.prototype.onSorting = function (event) {
    };
    AttachmentCategoryComponent.prototype.pageChanged = function (event) {
        /*if (event.pageEvent.page == 2) {
            this.administrationService.getAttachmentCategoryData()
                .subscribe(
                list => this.sourceData = list["paging"],
                error => this.errorMessage = <any>error);
        }
        else {
            this.administrationService.getAttachmentCategoryData()
                .subscribe(
                result => this.sourceData = result["data"],
                error => this.errorMessage = error,
                () => console.log('list', this.sourceData));
        }*/
    };
    ;
    AttachmentCategoryComponent.prototype.addClick = function () {
        this.sourceData = this.generFunctions.addCardForGrid(this.sourceData, this.fields);
        this.types = true;
        this.enableMenu = [];
    };
    AttachmentCategoryComponent.prototype.deleteClick = function (id) {
        var contextObj = this;
        if (id[0] != null) {
            this.administrationService.postAttachmentCategoryinUse(this.selIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Attachment Category in use, cannot be deleted", 2);
                }
                else if (resultData["Data"] == 0) {
                    contextObj.showSlide = true;
                }
            });
        }
        else if (id.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select an Attachment Category", 2);
        }
    };
    AttachmentCategoryComponent.prototype.onDelete = function (e) {
        this.deleteClick(this.selIds);
    };
    AttachmentCategoryComponent.prototype.onCancel = function (e) {
        if (this.totalItems > 0) {
            this.enableMenu = [0, 2];
        }
        else {
            this.enableMenu = [0];
        }
    };
    AttachmentCategoryComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        this.administrationService.postAttachmentCategoryDelete(this.selIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.totalItems = contextObj.totalItems - 1;
                for (var j = 0; j < contextObj.selIds.length; j++) {
                    var index = contextObj.sourceData.indexOf(contextObj.sourceData.filter(function (x) { return x["Id"] == contextObj.selIds[j]; })[0]);
                    if (index > -1)
                        contextObj.sourceData.splice(index, 1);
                }
            }
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.types = false;
            }
            else {
                contextObj.enableMenu = [0, 2];
                contextObj.types = true;
            }
        });
        contextObj.notificationService.ShowToaster("Selected  Attachment Category deleted", 3);
        this.showSlide = false;
    };
    AttachmentCategoryComponent.prototype.cancelClick = function (value) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    };
    AttachmentCategoryComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
    };
    AttachmentCategoryComponent = __decorate([
        core_1.Component({
            selector: 'attachment-categories',
            templateUrl: './app/Views/Administration/General Settings/attachment-categories.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AttachmentCategoryComponent);
    return AttachmentCategoryComponent;
}());
exports.AttachmentCategoryComponent = AttachmentCategoryComponent;
//# sourceMappingURL=attachment-categories.component.js.map