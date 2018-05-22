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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var common_service_1 = require('../../../models/common/common.service');
var documentcheckoutreview_1 = require('./documentcheckoutreview');
var DocumentCheckoutComponent = (function () {
    function DocumentCheckoutComponent(documentService, notificationService, generFun, commonService, administrationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.commonService = commonService;
        this.administrationService = administrationService;
        this.pagePath = "Documents / Approval Requests / Document Check Out"; //"Documents / Checkout Requests for Approval";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.selectedTab = 0;
        this.isTabOpen = false;
        this.Permissions = [];
        this.inputItems = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.menuData = [
            {
                "id": 1,
                "title": "Review Request",
                "image": "Review",
                "path": "Review",
                "submenu": null,
                "privilegeId": null
            }];
        this.enableMenu = [];
        var contextObj = this;
        documentService.getDocumentCheckoutListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
        this.dataLoad();
    }
    DocumentCheckoutComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.documentService.getWorkFlowReviewRequestList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No Approval Requests exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    DocumentCheckoutComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 5859,
            Value: this.inputItems.rowData["WorkflowEntityId"]
        }, {
            ReportFieldId: 964,
            Value: this.inputItems.selectedIds[0]
        });
        var strLookupRptFields = [];
        strLookupRptFields.push({
            FieldId: 2952,
            ReportFieldId: 6553,
            Value: 7
        }, {
            FieldId: 2952,
            ReportFieldId: 5826,
            Value: 1
        });
        var workflowactionpointid, WorkTypeId;
        if (contextObj.inputItems && contextObj.inputItems.selectedIds && contextObj.inputItems.selectedIds.length == 1) {
            workflowactionpointid = contextObj.inputItems.rowData["WorkFlowActionPointId"];
            WorkTypeId = contextObj.inputItems.rowData["WorkTypeId"];
            if (workflowactionpointid) {
                strLookupRptFields.push({
                    FieldId: 2952,
                    ReportFieldId: 5827,
                    Value: workflowactionpointid
                });
            }
            if (WorkTypeId) {
                strLookupRptFields.push({
                    FieldId: 2952,
                    ReportFieldId: 5832,
                    Value: WorkTypeId
                });
            }
        }
        this.documentService.getDocumentCheckoutReviewFields(JSON.stringify(arrayList), JSON.stringify(strLookupRptFields)).subscribe(function (result) {
            contextObj.fieldDetailsCheckout = result["Data"];
            for (var i = 0; i < contextObj.fieldDetailsCheckout.length; i++) {
                if (contextObj.fieldDetailsCheckout[i].FieldId == 2952)
                    contextObj.fieldDetailsCheckout[i].IsMandatory = true;
                else
                    contextObj.fieldDetailsCheckout[i].IsMandatory = false;
                if (contextObj.fieldDetailsCheckout[i].FieldId != 1260 && contextObj.fieldDetailsCheckout[i].FieldId != 2309
                    && contextObj.fieldDetailsCheckout[i].FieldId != 2952
                    && contextObj.fieldDetailsCheckout[i].FieldId != 3108) {
                    contextObj.fieldDetailsCheckout[i].IsEnabled = false;
                    contextObj.fieldDetailsCheckout[i].DataEntryControlId = 1;
                }
                if (contextObj.fieldDetailsCheckout[i].FieldId == 2952) {
                    contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues = contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues.filter(function (el) {
                        return el.Value != "Timed Out";
                    });
                }
                if (contextObj.fieldDetailsCheckout[i].FieldId == 3108) {
                    var lookupvalue = [];
                    lookupvalue.push({ Id: WorkTypeId, IsDisabled: false, Value: contextObj.inputItems.rowData["Work Type"] });
                    contextObj.fieldDetailsCheckout[i].LookupDetails.LookupValues = lookupvalue;
                    contextObj.fieldDetailsCheckout[i].FieldValue = WorkTypeId.toString();
                }
            }
            contextObj.getEditPermitDetails();
        });
        this.localselection = 1;
        contextObj.isTabOpen = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    };
    DocumentCheckoutComponent.prototype.getEditPermitDetails = function () {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5825,
            Value: contextObj.inputItems.rowData["WorkFlowActionPointId"]
        });
        contextObj.documentService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {
            var fieldpermission = JSON.parse(permission["Data"]);
            if (fieldpermission && fieldpermission.length > 0) {
                var length = fieldpermission.length;
                for (var i = 0; i < length; i++) {
                    if (fieldpermission[i]["EntityCategoryId"] == 7 && fieldpermission[i]["Has Permission"] == 1)
                        contextObj.Permissions.push({ Id: fieldpermission[i]["Id"], Name: fieldpermission[i]["Name"] });
                }
            }
            contextObj.getEditableFields();
        });
    };
    DocumentCheckoutComponent.prototype.getEditableFields = function () {
        var check;
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5827,
            Value: contextObj.inputItems.rowData["WorkFlowActionPointId"]
        });
        contextObj.documentService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            var editableFields = JSON.parse(resultData["Data"]);
            var reportFields = [];
            for (var _i = 0, _a = contextObj.fieldDetailsCheckout; _i < _a.length; _i++) {
                var item = _a[_i];
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && (fieldItem.EntityCategoryId == 7)) {
                        check = true;
                        return true;
                    }
                    else {
                        check = false;
                        return false;
                    }
                    //return (fieldItem.ReportFieldId === item.ReportFieldId) && contextObj.entityCategoryId === fieldIte
                });
                if (check) {
                    item.IsVisible = editableObject.Visible;
                    item.ReadOnlyMode = !editableObject.Editable;
                    item.IsEnabled = editableObject.Editable;
                    if (item.IsVisible)
                        reportFields.push(item.ReportFieldId); /*Pushes the fields which are not editable to a temp array for removing*/
                }
            }
            for (var index = 0; index < contextObj.fieldDetailsCheckout.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsCheckout[index].ReportFieldId) == -1) && contextObj.fieldDetailsCheckout[index].ReportFieldId > 1000000) {
                    contextObj.fieldDetailsCheckout.splice(index, 1); /*Removes the additional data fields which are not editable*/
                    index -= 1;
                }
            }
        });
    };
    DocumentCheckoutComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    DocumentCheckoutComponent.prototype.onTabClose = function (event) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
        /*contextObj.dataLoad();*/
    };
    DocumentCheckoutComponent.prototype.reviewSubmitBack = function (event) {
        if (event["Status"] == "Success") {
            this.selectedTab = 0;
            this.isTabOpen = false;
            this.dataLoad();
        }
    };
    DocumentCheckoutComponent.prototype.onSort = function (event) {
        this.dataLoad();
    };
    DocumentCheckoutComponent = __decorate([
        core_1.Component({
            selector: 'documentcheckout',
            templateUrl: './app/Views/Documents/Approval Requests/documentcheckout.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, displaysettings_component_1.DisplaySettingsComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, documentcheckoutreview_1.DocumentCheckoutReviewComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, documents_service_1.DocumentService, common_service_1.CommonService]
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions, common_service_1.CommonService, administration_service_1.AdministrationService])
    ], DocumentCheckoutComponent);
    return DocumentCheckoutComponent;
}());
exports.DocumentCheckoutComponent = DocumentCheckoutComponent;
//# sourceMappingURL=documentcheckout.js.map