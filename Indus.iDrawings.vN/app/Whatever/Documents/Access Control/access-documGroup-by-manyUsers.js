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
var AccesstoDocumentGroupbyManyUsersComponent = (function () {
    function AccesstoDocumentGroupbyManyUsersComponent(administrationService, notificationService, getData, documentService) {
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
    AccesstoDocumentGroupbyManyUsersComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var rptField = [448];
        var count = rptField.length;
        this.documentService.getAccesstoaDocumentGroupbyManyUsersFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
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
            contextObj.fieldObject = resultData["Data"];
            contextObj.getAccesstoaDocumentGroupbyManyUserstData();
        });
    };
    AccesstoDocumentGroupbyManyUsersComponent.prototype.getAccesstoaDocumentGroupbyManyUserstData = function () {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 2817,
            Value: this.DocumentGroupId.toString()
        });
        this.documentService.getAccesstoaDocumentGroupbyManyUsersData(JSON.stringify(arrayList), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    };
    AccesstoDocumentGroupbyManyUsersComponent.prototype.insertUsersList = function (event) {
        var contextObj = this;
        var selectedRowIds = "";
        var arrayList = new Array();
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Users exist", 2);
            return;
        }
        else {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    //  hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 2812,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            // if (hasSelectedIds == true) {
            this.documentService.updateAccesstoaDocumentGroupbyManyUsers(JSON.stringify(arrayList), this.DocumentGroupId).subscribe(function (resultData) {
                if (resultData.Data.Message == "Success") {
                    contextObj.notificationService.ShowToaster("Document Group Access updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                }
                else
                    contextObj.notificationService.ShowToaster("Document Group Access update Failed", 5);
            });
        }
    };
    AccesstoDocumentGroupbyManyUsersComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getAccesstoaDocumentGroupbyManyUserstData();
    };
    AccesstoDocumentGroupbyManyUsersComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getAccesstoaDocumentGroupbyManyUserstData();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccesstoDocumentGroupbyManyUsersComponent.prototype, "submitSuccess", void 0);
    AccesstoDocumentGroupbyManyUsersComponent = __decorate([
        core_1.Component({
            selector: 'access-documentGroup-by-manyUsers',
            templateUrl: './app/Views/Documents/Access Control/access-documGroup-by-manyUsers.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService],
            inputs: ['DocumentGroupId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService])
    ], AccesstoDocumentGroupbyManyUsersComponent);
    return AccesstoDocumentGroupbyManyUsersComponent;
}());
exports.AccesstoDocumentGroupbyManyUsersComponent = AccesstoDocumentGroupbyManyUsersComponent;
//# sourceMappingURL=access-documGroup-by-manyUsers.js.map