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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var moduleaccess_component_1 = require('./moduleaccess.component');
var divisionaccess_component_1 = require('./divisionaccess.component');
var flooraccess_component_1 = require('./flooraccess.component');
var drawingaccess_component_1 = require('./drawingaccess.component');
var useraccess_component_1 = require('./useraccess.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var AccessTemplatesComponent = (function () {
    function AccessTemplatesComponent(administrationService, notificationService, confirmationService) {
        var _this = this;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.pagePath = " Administration / Access Templates";
        this.totalItems = 30;
        this.itemsPerPage = 10;
        this.selectedIds = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.isUserList = false;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add"
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete"
            },
            {
                "id": 3,
                "title": "Access",
                "image": "Access",
                "path": "Access",
            },
            {
                "id": 4,
                "title": "Users",
                "image": "Users",
                "path": "Users",
            }
        ];
        this.enableMenu = [1, 2, 3, 4];
        administrationService.getAccessTemplatesFields().subscribe(function (result) { return _this.fields = result["data"]; }, function (error) { return _this.errorMessage = error; });
        administrationService.getAccessTemplatesData().subscribe(function (result) { return _this.sourceData = result["data"]; }, function (error) { return _this.errorMessage = error; });
        administrationService.getAccessTemplatesData().subscribe(function (result) { return _this.totalItems = result["count"].TotalItems; }, function (error) { return _this.errorMessage = error; });
    }
    AccessTemplatesComponent.prototype.ngOnInit = function () {
        this.pagePath = "Administration/ Access Templates";
    };
    AccessTemplatesComponent.prototype.onSubMenuChange = function (event, id) {
        var editid = 0;
        if (event.value == 1) {
            this.addClick();
        }
        else if (event.value == 2) {
            this.onCardDelete(this.selectedIds);
        }
        else if (event.value == 3) {
            this.isUserList = false;
            this.splitviewInput.showSecondaryView = true;
            this.splitviewInput.secondaryArea = 70;
        }
        else if (event.value == 4) {
            this.isUserList = true;
            this.splitviewInput.showSecondaryView = true;
            this.splitviewInput.secondaryArea = 40;
            this.userRole = "";
        }
    };
    AccessTemplatesComponent.prototype.onPageChanged = function (event) {
        var _this = this;
        this.administrationService.getAccessTemplatesData().subscribe(function (result) { return _this.sourceData = result["data"]; }, function (error) { return _this.errorMessage = error; });
        console.log(event.pageEvent.page, "page");
    };
    AccessTemplatesComponent.prototype.addClick = function () {
        var newDataSource;
        newDataSource = {
            "Template Name": "",
            "Description": "",
            "User Role": "",
            "Site": ""
        };
        this.sourceData.push(newDataSource);
    };
    AccessTemplatesComponent.prototype.onSorting = function (event) {
    };
    AccessTemplatesComponent.prototype.onCardSubmit = function (event) {
        console.log("selectedids", this.selectedIds);
        if (event["dataKeyValue"]) {
            this.notificationService.ShowToaster("Access Template updated", 3);
        }
        else {
            this.notificationService.ShowToaster("Access Template added", 3);
        }
    };
    AccessTemplatesComponent.prototype.onCardDelete = function (id) {
        console.log("Id:", id);
        if (id.length > 0) {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Access Template?", "Yes");
        }
        else {
            this.notificationService.ShowToaster("Select an Access Template", 2);
        }
    };
    AccessTemplatesComponent.prototype.okDelete = function (event) {
        var _this = this;
        if (event.returnOk == true) {
            for (var j = 0; j < this.selectedIds.length; j++) {
                var index = this.sourceData.indexOf(this.sourceData.filter(function (x) { return x["Id"] == _this.selectedIds[j]; })[0]);
                if (index > -1)
                    this.sourceData.splice(index, 1);
            }
            this.administrationService.deleteAccessTemplate(this.selectedIds);
            this.notificationService.ShowToaster("Access Template deleted", 3);
        }
    };
    AccessTemplatesComponent.prototype.onDelete = function (e) {
        this.onCardDelete(this.selectedIds);
    };
    AccessTemplatesComponent = __decorate([
        core_1.Component({
            selector: 'access-templates',
            templateUrl: './app/Views/Administration/AccessTemplates/accesstemplates.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, field_component_1.FieldComponent, paging_component_1.PagingComponent,
                split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, moduleaccess_component_1.ModuleAccessComponent, divisionaccess_component_1.DivisionAccessComponent, flooraccess_component_1.FloorAccessComponent,
                drawingaccess_component_1.DrawingAccessComponent, useraccess_component_1.TemplateUserAccessComponent, confirm_component_1.ConfirmationComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], AccessTemplatesComponent);
    return AccessTemplatesComponent;
}());
exports.AccessTemplatesComponent = AccessTemplatesComponent;
//# sourceMappingURL=accesstemplates.component.js.map