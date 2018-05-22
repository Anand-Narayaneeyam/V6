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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var document_group_addedit_component_1 = require('./document-group-addedit-component');
var document_group_documents_1 = require('./document-group-documents');
var access_documGroup_by_manyUsers_1 = require('./access-documGroup-by-manyUsers');
var DocumentGroup = (function () {
    function DocumentGroup(notificationService, documentService, getData, generFun, administrationService) {
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
        this.message = "Are you sure you want to delete the selected Document Group?";
        this.messageMsg = 'Selected Document Group is in use. Are you sure you want to delete the selected Document Group?';
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 1223
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 1224
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 1225
            },
            {
                "id": 4,
                "title": "Documents",
                "image": "Documents",
                "path": "Documents",
                "subMenu": null,
                "privilegeId": 1231
            },
            {
                "id": 5,
                "title": "Access to Many Users",
                "image": "AccesstoManyUsers",
                "path": "AccesstoManyUsers",
                "subMenu": null,
                "privilegeId": 1231
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.showSlideMsg = false;
        this.slidewidth = 280;
    }
    DocumentGroup.prototype.ngOnInit = function () {
        var contextObj = this;
        var rptField = [2816];
        var count = rptField.length;
        this.documentService.getDocumentGroupFields().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObject = (result["Data"]);
            contextObj.getDocumentGroupData(1);
        });
    };
    DocumentGroup.prototype.getDocumentGroupData = function (target) {
        var contextObj = this;
        this.documentService.getDocumentGroupData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Document Groups exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 733, contextObj.administrationService, contextObj.menuData.length);
    };
    DocumentGroup.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getDocumentGroupData(0);
    };
    ;
    DocumentGroup.prototype.onSort = function (objGrid) {
        this.getDocumentGroupData(0);
    };
    DocumentGroup.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.documentClick();
                break;
            case 5:
                this.menuUsersClick();
                break;
        }
    };
    DocumentGroup.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Document Group";
        this.documentService.loadtDocumentGroupAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    DocumentGroup.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Document Group";
        var contextObj = this;
        this.splitviewInput.secondaryArea = 70;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Group", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.documentService.loadtDocumentGroupAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.secondaryArea = 70;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    DocumentGroup.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Group to delete", 2);
        }
        else {
            this.documentService.checkDocumentGroupIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData == 1) {
                    contextObj.showSlideMsg = !contextObj.showSlideMsg;
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    DocumentGroup.prototype.documentClick = function () {
        var contextObj = this;
        this.action = "documents";
        this.pageTitle = "Documents for Document Group";
        this.documentGroupName = this.inputItems.rowData["Document Group"];
        this.splitviewInput.secondaryArea = 79;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    DocumentGroup.prototype.menuUsersClick = function () {
        var contextObj = this;
        this.action = "manyUsers";
        this.pageTitle = "Access to a Document Group by Many Users";
        this.splitviewInput.secondaryArea = 75;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    DocumentGroup.prototype.deleteDocumentGroup = function () {
        var contextObj = this;
        contextObj.documentService.postDocumentGroupDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Document Groups exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Document Group deleted", 3);
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
    DocumentGroup.prototype.inlineDelete = function (event) {
        this.deleteClick();
    };
    DocumentGroup.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    //slide events/////
    DocumentGroup.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteDocumentGroup();
    };
    DocumentGroup.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DocumentGroup.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DocumentGroup.prototype.okDeleteMsg = function (event) {
        this.showSlideMsg = !this.showSlideMsg;
        this.deleteDocumentGroup();
    };
    DocumentGroup.prototype.cancelClickMsg = function (event) {
        this.showSlideMsg = !this.showSlideMsg;
    };
    DocumentGroup.prototype.closeSlideDialogMsg = function (value) {
        this.showSlideMsg = value.value;
    };
    DocumentGroup = __decorate([
        core_1.Component({
            selector: 'document-groups',
            templateUrl: './app/Views/Documents/Access Control/document-group-component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, document_group_addedit_component_1.DocumentGroupAddEditComponent, document_group_documents_1.DocumentsforDocumentGroupsComponent, access_documGroup_by_manyUsers_1.AccesstoDocumentGroupbyManyUsersComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService, General_1.GeneralFunctions, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], DocumentGroup);
    return DocumentGroup;
}());
exports.DocumentGroup = DocumentGroup;
//# sourceMappingURL=document-group-component.js.map