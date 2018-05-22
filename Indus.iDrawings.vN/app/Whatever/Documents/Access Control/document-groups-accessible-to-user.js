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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var DocumentGroupsAccessibletoaUserComponent = (function () {
    function DocumentGroupsAccessibletoaUserComponent(documentService, notificationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.inputItems = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: true, selectioMode: 'single', selectedIds: [0] };
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.sectionEnable = -1;
        this.pageIndex = 0;
        var contextobj = this;
        this.documentService.getDocumentGroupsAccessibletoaUserFields().subscribe(function (result) {
            contextobj.ddlUsers = result["Data"].splice(0, 1)[0];
            var documentGroup = result["Data"].find(function (item) { return item.FieldId === 2346; });
            documentGroup.IsEnabled = false;
            contextobj.fieldObject = result["Data"];
        });
    }
    DocumentGroupsAccessibletoaUserComponent.prototype.onPageChanged = function (event) {
    };
    DocumentGroupsAccessibletoaUserComponent.prototype.onChangeddlUsers = function (event) {
        this.sectionEnable = Number(event);
        var contextObj = this;
        if (Number(event) > 0) {
            this.documentService.getDocumentGroupsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, Number(event)).subscribe(function (result) {
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0)
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                else {
                    contextObj.notificationService.ShowToaster("No Document Group exists", 2);
                }
            });
        }
        else
            this.sectionEnable = -1;
    };
    DocumentGroupsAccessibletoaUserComponent.prototype.updateData = function () {
        var contextObj = this;
        this.inputItems.selectedIds = [];
        var arrayList = new Array();
        if (this.itemsSource == undefined || this.itemsSource == null)
            return;
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Select All"] == true) {
                this.inputItems.selectedIds.push(this.itemsSource[i]["Id"]);
                arrayList.push({
                    ReportFieldId: 2817,
                    Value: this.itemsSource[i]["Id"]
                });
            }
        }
        this.documentService.documentGroupsAccessibletoaUserUpdate(JSON.stringify(arrayList), this.sectionEnable).subscribe(function (result) {
            if (result["Data"]["Message"] == "Success")
                contextObj.notificationService.ShowToaster("User Access updated", 3);
            else
                contextObj.notificationService.ShowToaster("User Access updated failed", 3);
        });
    };
    DocumentGroupsAccessibletoaUserComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.documentService.getDocumentGroupsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.sectionEnable).subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0)
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            else {
                contextObj.notificationService.ShowToaster("No Document Group exists", 2);
            }
        });
    };
    DocumentGroupsAccessibletoaUserComponent = __decorate([
        core_1.Component({
            selector: 'document-DocumentGroupsAccessibletoaUser',
            templateUrl: './app/Views/Documents/Access Control/document-groups-accessible-to-user.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [documents_service_1.DocumentService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService])
    ], DocumentGroupsAccessibletoaUserComponent);
    return DocumentGroupsAccessibletoaUserComponent;
}());
exports.DocumentGroupsAccessibletoaUserComponent = DocumentGroupsAccessibletoaUserComponent;
//# sourceMappingURL=document-groups-accessible-to-user.js.map