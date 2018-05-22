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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var DirectAccesstoaDocumentbyManyUsersUserListComponent = (function () {
    function DirectAccesstoaDocumentbyManyUsersUserListComponent(administrationService, notificationService, getData, documentService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.documentService = documentService;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.userArrayList = [];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "DocumentId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    }
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var rptField = [448];
        var count = rptField.length;
        this.documentService.getDirectAccesstoaDocumentbyManyUsersUserListFields().subscribe(function (resultData) {
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
            contextObj.getAccesstoaDocumentbyManyUserstData();
        });
    };
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.getAccesstoaDocumentbyManyUserstData = function () {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 977,
            Value: this.DocumentId.toString()
        });
        this.documentService.getDirectAccesstoaDocumentbyManyUsersUserListData(JSON.stringify(arrayList), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    };
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.insertUsersList = function (event) {
        var contextObj = this;
        var CheckMessage = '';
        var arrayListCheck = new Array();
        var arrayListUpdate = new Array();
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Users exist", 2);
            return;
        }
        else {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    arrayListCheck.push({
                        ReportFieldId: 443,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                    arrayListUpdate.push({
                        ReportFieldId: 978,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            arrayListCheck.push({
                ReportFieldId: 2813,
                Value: contextObj.DocumentId.toString()
            });
            arrayListUpdate.push({
                ReportFieldId: 979,
                Value: contextObj.DocumentId.toString()
            });
            this.documentService.updatekDirectAccesstoaDocumentbyManyUsersUserList(JSON.stringify(arrayListUpdate)).subscribe(function (resultData) {
                if (resultData.Data.Message == "Success") {
                    contextObj.documentService.checkDirectAccesstoaDocumentbyManyUsersUserList(JSON.stringify(arrayListCheck)).subscribe(function (resultData) {
                        var tempArray = [];
                        if (resultData.Data.DataCount > 0) {
                            var usersList = JSON.parse(resultData.Data.FieldBinderData);
                            //if (resultData.Data.DataCount == 1) {
                            //    CheckMessage = "Access privilege to this document will exist for the user " + usersList[0].Name + " as the user is already linked with a Document Group(s).\n";
                            //    CheckMessage = CheckMessage + " Document Access updated"
                            //    contextObj.notificationService.ShowToaster(CheckMessage, 3);
                            //}
                            //else {
                            for (var i = 0; i < usersList.length; i++) {
                                tempArray.push({
                                    Name: usersList[i]["Name"]
                                });
                            }
                            contextObj.userArrayList = tempArray;
                            contextObj.showSlide = true;
                        }
                        else
                            contextObj.notificationService.ShowToaster("Document Access updated", 3);
                    });
                }
                else
                    contextObj.notificationService.ShowToaster("Document Access updated Failed", 3);
            });
        }
    };
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getAccesstoaDocumentbyManyUserstData();
    };
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getAccesstoaDocumentbyManyUserstData();
    };
    DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype.closeSlide = function (value) {
        if (this.showSlide)
            this.notificationService.ShowToaster("Document Access updated", 3);
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DirectAccesstoaDocumentbyManyUsersUserListComponent.prototype, "submitSuccess", void 0);
    DirectAccesstoaDocumentbyManyUsersUserListComponent = __decorate([
        core_1.Component({
            selector: 'directAccesstoa-documentby-manyUsers-userList',
            templateUrl: './app/Views/Documents/Access Control/directAccesstoa-documentbyManyUsers-userList.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, paging_component_1.PagingComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService],
            inputs: ['DocumentId', 'DocumetNumber', 'DocumentName']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, documents_service_1.DocumentService])
    ], DirectAccesstoaDocumentbyManyUsersUserListComponent);
    return DirectAccesstoaDocumentbyManyUsersUserListComponent;
}());
exports.DirectAccesstoaDocumentbyManyUsersUserListComponent = DirectAccesstoaDocumentbyManyUsersUserListComponent;
//# sourceMappingURL=directAccesstoa-documentbyManyUsers-userList.js.map