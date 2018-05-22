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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var documents_directly_accessibletoaUser_Mainlist_1 = require('./documents-directly-accessibletoaUser-Mainlist');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var DocumentsDirectlyAccessibletoaUserComponent = (function () {
    function DocumentsDirectlyAccessibletoaUserComponent(administrationService, notificationService, generFun, documentService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.documentService = documentService;
        this.inputItems = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC' };
        this.pageIndex = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.selectedTab = 0;
        this.firstTabFlag = false;
        this.newUserTab = false;
        this.deleteIndex = 0;
        this.types = true;
        this.sectionEnable = -1;
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1];
        this.position = "top-right";
        this.showSlide = false;
    }
    DocumentsDirectlyAccessibletoaUserComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserFields().subscribe(function (resultData) {
            contextObj.ddlUsers = resultData["Data"].splice(0, 1)[0];
            var documentNumber = resultData["Data"].find(function (item) { return item.FieldId === 2369; });
            contextObj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {
                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextObj.fields = resultData["Data"];
                contextObj.tabTitle = "Documents Directly Accessible to a User";
                contextObj.selectTabTitle = "All Documents";
                //  contextObj.getDocumentsList();
            });
        });
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.onChangeddlUsers = function (event) {
        var contextObj = this;
        this.sectionEnable = Number(event);
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 443,
            Value: event
        });
        if (Number(event) > 0) {
            this.firstTabFlag = true;
            contextObj.selectedTab = 0;
            this.documentService.getDocumentsDirectlyAccessibletoaUserData(JSON.stringify(arrayList), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.totalItems = contextObj.itemsSource.length;
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents added", 2);
                    contextObj.enableMenu = [0];
                }
                else {
                    contextObj.enableMenu = [0, 1];
                }
            });
        }
        else {
            contextObj.sectionEnable = -1;
            contextObj.firstTabFlag = false;
        }
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.newUserTab = false;
        }
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.onTabClose = function (event) {
        this.newUserTab = false;
        this.selectedTab = event[0];
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newUserTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteDocuments(this.inputItems.selectedIds);
                break;
        }
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.deleteDocuments = function (userIds) {
        if (userIds.length >= 1) {
            this.showSlide = !this.showSlide;
            this.deleteMsg = "Are you sure you want to remove the selected Document(s) from the User Access?";
        }
        else if (userIds.length < 1) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        //else {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //}
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        for (var c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 979,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        this.documentService.DeleteDocumentsDirectlyAccessibletoaUserMainList(JSON.stringify(fieldobj), this.sectionEnable).subscribe(function (resultData) {
            if (resultData["Data"]["Message"] == "Success") {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.notificationService.ShowToaster("Direct Access to the selected Document has been removed", 3);
                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.onChangeddlUsers(contextObj.sectionEnable);
                }
                else {
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0];
                        contextObj.notificationService.ShowToaster("No Documents added", 2);
                    }
                }
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            }
        });
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            contextObj.onChangeddlUsers(this.sectionEnable);
            contextObj.selectedTab = 0;
            contextObj.deleteIndex = contextObj.deleteIndex + 1;
            contextObj.newUserTab = false;
        }
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.onChangeddlUsers(this.sectionEnable);
    };
    DocumentsDirectlyAccessibletoaUserComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.onChangeddlUsers(this.sectionEnable);
    };
    DocumentsDirectlyAccessibletoaUserComponent = __decorate([
        core_1.Component({
            selector: 'documentsDirectly-accessibletoaUser',
            templateUrl: './app/Views/Documents/Access Control/documents-directly-accessibletoaUser.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, slide_component_1.SlideComponent, documents_directly_accessibletoaUser_Mainlist_1.DocumentsDirectlyAccessibletoaUserMainListComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService])
    ], DocumentsDirectlyAccessibletoaUserComponent);
    return DocumentsDirectlyAccessibletoaUserComponent;
}());
exports.DocumentsDirectlyAccessibletoaUserComponent = DocumentsDirectlyAccessibletoaUserComponent;
//# sourceMappingURL=documents-directly-accessibletoaUser.js.map