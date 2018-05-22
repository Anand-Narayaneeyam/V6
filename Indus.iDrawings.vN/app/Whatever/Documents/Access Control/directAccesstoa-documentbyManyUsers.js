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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var directAccesstoa_documentbyManyUsers_userList_1 = require('./directAccesstoa-documentbyManyUsers-userList');
var DirectAccesstoaDocumentbyManyUsersComp = (function () {
    function DirectAccesstoaDocumentbyManyUsersComp(notificationService, documentService, getData, generFun, administrationService) {
        this.notificationService = notificationService;
        this.documentService = documentService;
        this.getData = getData;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.documentGroupName = "";
        this.enableMenu = [];
        this.documetNumber = "";
        this.documentName = "";
        this.menuData = [
            {
                "id": 1,
                "title": "Users",
                "image": "Users",
                "path": "Users",
                "subMenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.showSlideMsg = false;
        this.slidewidth = 280;
    }
    DirectAccesstoaDocumentbyManyUsersComp.prototype.ngOnInit = function () {
        var contextObj = this;
        var rptField = [2816];
        var count = rptField.length;
        this.documentService.getDirectAccesstoaDocumentbyManyUsersFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.getDocumentGroupData(1);
        });
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.getDocumentGroupData = function (target) {
        var contextObj = this;
        this.documentService.getDirectAccesstoaDocumentbyManyUsersData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
                contextObj.enableMenu = [0];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 733, contextObj.administrationService, contextObj.menuData.length);
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getDocumentGroupData(0);
    };
    ;
    DirectAccesstoaDocumentbyManyUsersComp.prototype.onSort = function (objGrid) {
        this.getDocumentGroupData(0);
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.userClick();
                break;
        }
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.userClick = function () {
        var contextObj = this;
        this.documetNumber = this.inputItems.rowData["Document Number"];
        this.documentName = this.inputItems.rowData["File Name"];
        this.action = "user";
        this.pageTitle = "User List";
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    //slide events/////
    DirectAccesstoaDocumentbyManyUsersComp.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.cancelClickMsg = function (event) {
        this.showSlideMsg = !this.showSlideMsg;
    };
    DirectAccesstoaDocumentbyManyUsersComp.prototype.closeSlideDialogMsg = function (value) {
        this.showSlideMsg = value.value;
    };
    DirectAccesstoaDocumentbyManyUsersComp = __decorate([
        core_1.Component({
            selector: 'directAccesstoa-documentby-manyUsers',
            templateUrl: './app/Views/Documents/Access Control/directAccesstoa-documentbyManyUsers.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, directAccesstoa_documentbyManyUsers_userList_1.DirectAccesstoaDocumentbyManyUsersUserListComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService, General_1.GeneralFunctions, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], DirectAccesstoaDocumentbyManyUsersComp);
    return DirectAccesstoaDocumentbyManyUsersComp;
}());
exports.DirectAccesstoaDocumentbyManyUsersComp = DirectAccesstoaDocumentbyManyUsersComp;
//# sourceMappingURL=directAccesstoa-documentbyManyUsers.js.map