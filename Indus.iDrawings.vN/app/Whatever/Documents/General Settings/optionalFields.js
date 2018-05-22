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
var documents_service_1 = require('../../../Models/Documents/documents.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var OptionalFieldsComponent = (function () {
    function OptionalFieldsComponent(documentService, notificationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.fieldSubscriptionCategoryId = 1;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
    }
    OptionalFieldsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.documentService.getOptionalFieldsListFields().subscribe(function (result) {
            context.fieldObject = (result["Data"]);
            if (context.fieldObject.length > 1) {
                context.documentService.getOptionalFieldsListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldSubscriptionCategoryId).subscribe(function (result) {
                    context.totalItems = result["Data"].DataCount;
                    context.itemsPerPage = result["Data"].RowsPerPage;
                    var objItemSource = JSON.parse(result["Data"].FieldBinderData);
                    objItemSource.find(function (item) {
                        if (item.Id == 974) {
                            item["Field Name"] = "Uploaded By";
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    context.itemsSource = objItemSource; //JSON.parse(result["Data"].FieldBinderData);
                });
            }
            else
                context.notificationService.ShowToaster("No Optional Fields Exist", 2);
        });
    };
    OptionalFieldsComponent.prototype.updateOptionalFieldSettings = function () {
        var contextObj = this;
        var fieldobj = new Array();
        var contextObj = this;
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            fieldobj.push({
                FieldSubscriptionCategoryId: this.fieldSubscriptionCategoryId,
                ReportFieldId: item['Id'],
                IsSubscribed: item['Required?']
            });
        }
        this.documentService.updateOptionalFields(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Optional Field Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
        ;
    };
    OptionalFieldsComponent = __decorate([
        core_1.Component({
            selector: 'optionalfields',
            templateUrl: './app/Views/Documents/General Settings/optionalFields.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [documents_service_1.DocumentService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService])
    ], OptionalFieldsComponent);
    return OptionalFieldsComponent;
}());
exports.OptionalFieldsComponent = OptionalFieldsComponent;
//# sourceMappingURL=optionalFields.js.map