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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var DocumentsDirectlyAccessibletoaUserMainListComponent = (function () {
    function DocumentsDirectlyAccessibletoaUserMainListComponent(administrationService, notificationService, getData, documentService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.documentService = documentService;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.submitSuccess = new core_1.EventEmitter();
        // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false };
        this.inputItems = { dataKey: "DocumentId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    }
    DocumentsDirectlyAccessibletoaUserMainListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserMainListFields().subscribe(function (resultData) {
            var documentNumber = resultData["Data"].find(function (item) { return item.FieldId === 2369; });
            contextObj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {
                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextObj.fieldObject = resultData["Data"];
                contextObj.getDocumentGroupMainListData();
            });
        });
    };
    DocumentsDirectlyAccessibletoaUserMainListComponent.prototype.getDocumentGroupMainListData = function () {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserMainListData(this.UserId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist to add", 2);
            }
        });
    };
    DocumentsDirectlyAccessibletoaUserMainListComponent.prototype.insertDocumentList = function (event) {
        var contextObj = this;
        var selectedRowIds = "";
        var arrayList = new Array();
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Documents exist to add", 2);
            return;
        }
        else {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 979,
                        Value: contextObj.itemsSource[i].DocumentId.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                this.documentService.updateDocumentsDirectlyAccessibletoaUserMainList(JSON.stringify(arrayList), this.UserId).subscribe(function (resultData) {
                    if (resultData.Data.Message == "Success") {
                        contextObj.notificationService.ShowToaster("Documents added to the User", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                    else
                        contextObj.notificationService.ShowToaster("Documents added to the User failed", 5);
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Document", 2);
            }
        }
    };
    DocumentsDirectlyAccessibletoaUserMainListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getDocumentGroupMainListData();
    };
    DocumentsDirectlyAccessibletoaUserMainListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getDocumentGroupMainListData();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentsDirectlyAccessibletoaUserMainListComponent.prototype, "submitSuccess", void 0);
    DocumentsDirectlyAccessibletoaUserMainListComponent = __decorate([
        core_1.Component({
            selector: 'documentsDirectly-accessibletoaUser-mainList',
            templateUrl: './app/Views/Documents/Access Control/documents-directly-accessibletoaUser-Mainlist.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService],
            inputs: ['UserId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService])
    ], DocumentsDirectlyAccessibletoaUserMainListComponent);
    return DocumentsDirectlyAccessibletoaUserMainListComponent;
}());
exports.DocumentsDirectlyAccessibletoaUserMainListComponent = DocumentsDirectlyAccessibletoaUserMainListComponent;
//# sourceMappingURL=documents-directly-accessibletoaUser-Mainlist.js.map