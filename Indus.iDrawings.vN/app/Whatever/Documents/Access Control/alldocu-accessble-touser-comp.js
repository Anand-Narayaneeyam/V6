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
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var AllDocumentsAccessibletoaUserComponent = (function () {
    function AllDocumentsAccessibletoaUserComponent(documentService, notificationService, administrationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: true, selectioMode: 'single', selectedIds: [0] };
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.sectionEnable = -1;
        this.pageIndex = 0;
        var contextobj = this;
        this.documentService.getAllDocumentsAccessibletoaUserFields().subscribe(function (result) {
            contextobj.ddlUsers = result["Data"].splice(0, 1)[0];
            var documentNumber = result["Data"].find(function (item) { return item.FieldId === 2369; });
            contextobj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {
                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextobj.fieldObject = result["Data"];
            });
        });
    }
    AllDocumentsAccessibletoaUserComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.onChangeddlUsers(this.sectionEnable);
    };
    AllDocumentsAccessibletoaUserComponent.prototype.onChangeddlUsers = function (event) {
        this.sectionEnable = Number(event);
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 443,
            Value: event
        });
        if (Number(event) > 0) {
            this.documentService.getAllDocumentsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, JSON.stringify(arrayList)).subscribe(function (result) {
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0)
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                else {
                    contextObj.notificationService.ShowToaster("No Documents added", 2);
                    contextObj.sectionEnable = -1;
                }
            });
        }
        else
            this.sectionEnable = -1;
    };
    AllDocumentsAccessibletoaUserComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        //this.documentService.getAllDocumentsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.sectionEnable).subscribe(function (result) {
        //    contextObj.itemsPerPage = result["Data"].RowsPerPage;
        //    contextObj.totalItems = result["Data"].DataCount;
        //    if (contextObj.totalItems > 0)
        //        contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        //    else {
        //        contextObj.notificationService.ShowToaster("No Documents exists", 2);
        //    }
        //});
        this.onChangeddlUsers(this.sectionEnable);
    };
    AllDocumentsAccessibletoaUserComponent = __decorate([
        core_1.Component({
            selector: 'document-AllDocumentsAccessibletoaUser',
            templateUrl: './app/Views/Documents/Access Control/alldocu-accessble-touser-comp.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [documents_service_1.DocumentService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], AllDocumentsAccessibletoaUserComponent);
    return AllDocumentsAccessibletoaUserComponent;
}());
exports.AllDocumentsAccessibletoaUserComponent = AllDocumentsAccessibletoaUserComponent;
//# sourceMappingURL=alldocu-accessble-touser-comp.js.map