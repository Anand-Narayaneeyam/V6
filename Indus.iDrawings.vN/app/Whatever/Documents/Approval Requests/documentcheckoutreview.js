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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var reviewHistory_1 = require('./reviewHistory');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var DocumentCheckoutReviewComponent = (function () {
    function DocumentCheckoutReviewComponent(documentService, notificationService) {
        this.documentService = documentService;
        this.notificationService = notificationService;
        this.reviewSubmit = new core_1.EventEmitter();
        this.btnName = "Save Changes";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.historyEnabled = false;
        this.intStatusId = "0";
        this.Permissions = [];
        var contextObj = this;
    }
    DocumentCheckoutReviewComponent.prototype.onLinkClick = function () {
        this.pageTitle = "Request History";
        this.historyEnabled = true;
        this.splitviewInput.showSecondaryView = true;
    };
    DocumentCheckoutReviewComponent.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        var temp = JSON.parse(event["fieldobject"]);
        var selectedId = contextObj.rowData['DocumentId'];
        var checkOutReqId = contextObj.rowData['EntityId'];
        var statusId;
        var action = temp.find(function (item) { return item.ReportFieldId === 5834; });
        var comments = temp.find(function (item) { return item.ReportFieldId === 5978; });
        var arrayList = new Array();
        arrayList.push({ ReportFieldId: 968, Value: contextObj.rowData["DocumentId"] }, { ReportFieldId: 5978, Value: comments.Value == null ? "" : comments.Value }, { ReportFieldId: 5859, Value: contextObj.rowData['WorkFlowEntityId'] }, { ReportFieldId: 5827, Value: contextObj.actionPtOcutComeData["WorkFlowActionPointId"] }, { ReportFieldId: 5834, Value: contextObj.actionPtOcutComeData["Id"] }, { ReportFieldId: 5988, Value: "" }, { ReportFieldId: 12258, Value: contextObj.actionPtOcutComeData["OutcomeTypeId"] }, { ReportFieldId: 1490, Value: contextObj.intStatusId }, { ReportFieldId: 5840, Value: contextObj.actionPtOcutComeData["NextWorkFlowActionPointId"] == null ? "0" : contextObj.actionPtOcutComeData["NextWorkFlowActionPointId"] }, { ReportFieldId: 7521, Value: "0" }, { ReportFieldId: 6561, Value: contextObj.rowData['EntityCategoryId'] }, { ReportFieldId: 5915, Value: contextObj.rowData['WorkFlowEntityId'] }, { ReportFieldId: 5873, Value: contextObj.rowData['WorkTypeId'] });
        if (contextObj.rowData['EntityCategoryId'] == 7) {
            arrayList.push({ ReportFieldId: 964, Value: contextObj.rowData["DocumentId"] }, { ReportFieldId: 972, Value: "1" }, { ReportFieldId: 5918, Value: contextObj.rowData['EntityId'] });
            this.documentService.postSubmitCheckoutReview(JSON.stringify(arrayList), selectedId, checkOutReqId).subscribe(function (resultData) {
                switch (resultData.StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Request details updated", 3);
                        contextObj.reviewSubmit.emit({ "Status": "Success" });
                        break;
                }
            });
        }
        else {
            arrayList.push({ ReportFieldId: 964, Value: contextObj.rowData["DocumentId"] }, { ReportFieldId: 972, Value: "1" }, { ReportFieldId: 5918, Value: contextObj.rowData['EntityId'] });
            this.documentService.postSubmitPublishReview(JSON.stringify(arrayList), selectedId).subscribe(function (resultData) {
                switch (resultData.StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Request details updated", 3);
                        contextObj.reviewSubmit.emit({ "Status": "Success" });
                        break;
                }
            });
        }
    };
    DocumentCheckoutReviewComponent.prototype.outcomeddlChange = function (arg) {
        var context = this;
        var rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        if (rptFieldId.ReportFieldId == 5834) {
            //context.intStatusId = "35";                  
            context.documentService.getDocWFActionOutComesOnChange(context.rowData, rptFieldId.FieldValue).subscribe(function (resultData) {
                context.actionPtOcutComeData = JSON.parse(resultData.FieldBinderData)[0];
                switch (context.actionPtOcutComeData["OutcomeTypeId"]) {
                    case 14:
                        context.intStatusId = "35";
                        break;
                    case 9:
                        context.intStatusId = "17";
                        break;
                    default:
                        context.intStatusId = "33";
                        break;
                }
            });
        }
    };
    DocumentCheckoutReviewComponent.prototype.onPermissionLinkClick = function (item) {
        switch (item.Id) {
            case 10:
                this.downloadDocument();
                break;
        }
    };
    DocumentCheckoutReviewComponent.prototype.downloadDocument = function () {
        var contextObj = this;
        var filename;
        var Reference;
        var multiFilename = [];
        var ReferenceIds = [];
        var multiDocumentDownload = [];
        var newFileName = "";
        filename = contextObj.rowData["File Name"];
        var RevisionNo = contextObj.rowData["Revisions"];
        var ReferenceId = contextObj.rowData["DocumentId"];
        ;
        this.documentService.DocumentDownloadFile(ReferenceId, filename, RevisionNo).subscribe(function (resultData) {
            if (resultData._body == "Data is Null")
                contextObj.notificationService.ShowToaster("File Not found in server", 2);
            else {
                var headers = resultData.headers;
                var contentType = headers.get("Content-Type");
                var linkElement = document.createElement('a');
                var linkElement1 = document.createElement('a');
                var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                var imgData1 = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                var imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                var strFileName = filename;
                try {
                    contextObj.documentService.getDocumentFormtFileName(ReferenceId, filename, RevisionNo).subscribe(function (resultData1) {
                        if (resultData1.Message != null)
                            newFileName = resultData1.Message;
                        else
                            newFileName = filename;
                        var blob = new Blob([data], { type: contentType });
                        /*var blob = new File([data], contextObj.strFileName, { type: contentType }); */
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            if (resultData1.Message != null) {
                                if (resultData1.StatusId == 100) {
                                    contextObj.notificationService.ShowToaster("Maximum number of charaters for file name exceeds. File name will be truncated.", 2);
                                }
                            }
                            window.navigator.msSaveOrOpenBlob(blob, newFileName);
                        }
                        else if (isSafari) {
                            /* if (window["saveAs"] != undefined) {
                                 window["saveAs"](blob, filename);
                             }
 
 
                             setTimeout(function () {
                                 window["saveAs"](new Blob([data], { type: "application/octet-stream" }), contextObj.strFileName);
                             }, 1);
 
                             var file = new File([data], 'filename', { type: "application/octet-stream" });
                             var url = window.URL.createObjectURL(file);
                             var link = document.createElement('a');
                             link.href = url;
                             link.click();*/
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            if (resultData1.Message != null) {
                                if (resultData1.StatusId == 100) {
                                    contextObj.notificationService.ShowToaster("Maximum number of charaters for file name exceeds. File name will be truncated.", 2);
                                }
                            }
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", newFileName);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        });
    };
    DocumentCheckoutReviewComponent.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentCheckoutReviewComponent.prototype, "reviewSubmit", void 0);
    DocumentCheckoutReviewComponent = __decorate([
        core_1.Component({
            selector: 'documentcheckoutreview',
            templateUrl: 'app/Views/Documents/Approval Requests/documentcheckoutreview.html',
            providers: [notify_service_1.NotificationService, documents_service_1.DocumentService],
            directives: [fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, reviewHistory_1.DocumentReviewHistory],
            inputs: ['rowData', 'fieldDetails', 'Permissions']
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService])
    ], DocumentCheckoutReviewComponent);
    return DocumentCheckoutReviewComponent;
}());
exports.DocumentCheckoutReviewComponent = DocumentCheckoutReviewComponent;
//# sourceMappingURL=documentcheckoutreview.js.map