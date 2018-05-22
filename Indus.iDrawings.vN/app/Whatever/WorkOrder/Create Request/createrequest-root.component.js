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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../Models/Common/General');
var reviewServiceRequests_component_1 = require('../Review/reviewServiceRequests.component');
var reviewDocument_list_component_1 = require('../Review/reviewDocument-list.component');
var setruleforchildrequest_1 = require('../review/set rule/setruleforchildrequest');
var CreateServiceRequestComponent = (function () {
    function CreateServiceRequestComponent(notificationService, workOrdereService, generalFunctions) {
        this.notificationService = notificationService;
        this.workOrdereService = workOrdereService;
        this.generalFunctions = generalFunctions;
        this.pageTitle = "Review";
        this.pagePath = "Work Order / Create Request";
        this.selectedTab = 0;
        this.documentSource = [];
        this.linkArray = undefined;
        this.requestId = 0;
        this.workOrderId = 0;
        this.tabDeleteIndex = 0;
        this.objectId = 0;
        this.entityCategoryId = 1;
        this.createRequestEnabled = false;
        this.documentTabEnabled = false;
        this.ruleTabEnabled = false;
        this.workFlowEntityIds = "";
        this.fieldDetailsAdd1 = [];
        this.userDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "", UserPhoneNo: "" };
        this.serviceRequestInputItems = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.submitOutput = {
            WFEntityInput: null,
            WFEntityDocumentInput: null,
            //WFEntityEquipmentInput: null,
            ParentFormId: 0
        };
        this.isChildRequest = false;
        this.parentEntityId = 0;
        this.addOnTabName = "Documents";
        this.addOnTabEnabled = false;
        this.boolcheck = false;
        this.onChildRequestCreate = new core_1.EventEmitter();
    }
    CreateServiceRequestComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        contextObj.requestId = 0;
        contextObj.workOrderId = 0;
        contextObj.workFlowEntityIds = "";
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.userDetails.UserPhoneNo = resultData["Phone Number"];
            }
            contextObj.loadFields();
        });
    };
    CreateServiceRequestComponent.prototype.ngAfterViewInit = function () {
        this.updateRequesterFieldDetails(this.fieldDetailsAdd1);
    };
    /***********************************************************************************************************
    * Function:     loadFields
    * Description:  Loads the fields for create
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.loadFields = function () {
        var contextObj = this;
        this.workOrdereService.loadReviewServiceRequest(0, "add", 0, 0, 1, 0).subscribe(function (resultData) {
            contextObj.boolcheck = !contextObj.boolcheck;
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForAdd(resultData["Data"]["FieldBinderList"]);
            contextObj.updateLinkArray(null, 0);
            contextObj.createRequestEnabled = true;
        });
    };
    /***********************************************************************************************************
    * Function:     getSelectedTab
    * Description:  Fires when Tab is selected.
    * Comments:     Logic of tab closing while clicking each tab is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.getSelectedTab = function (event) {
        switch (event[0]) {
            case 0:
                if (event[1] && this.addOnTabEnabled) {
                    this.closeTab(1);
                    this.documentTabEnabled = false;
                    this.ruleTabEnabled = false;
                }
                break;
        }
        this.selectedTab = event[0];
    };
    /***********************************************************************************************************
    * Function:     closeTab
    * Description:  Deletes the tab with given index.
    * Comments:     Changes the boolean values for other tabs to false
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.closeTab = function (index) {
        var contextObj = this;
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    };
    /************************************************************************
     * Source Update Events
     *
     *************************************************************************/
    CreateServiceRequestComponent.prototype.onDocumentSourceUpdated = function (event) {
        this.documentSource = event;
    };
    /***********************************************************************************************************
    * Function:     onRequesterPermissionUpdate
    * Description:  Gets the permissions for requester while changing WorkType in Review Page.
    * Comments:     Refer function getRequesterPermissionDetails() in reviewServiceRequest.component.ts
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onRequesterPermissionUpdate = function (event) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13); });
        this.updateLinkArray(filteredForRequester, 0);
    };
    /***********************************************************************************************************
    * Function:     updateLinkArray
    * Description:  Pushes the items which have Permissions into linkArray. Items in linkArray are shown
    *               in the Review Page as Links
    * Comments:     Set Rule is Static Permission for Create Child Request. It is pushed manually
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.updateLinkArray = function (fieldDetailsArray, dataKeyId) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0)
            return;
        var temp = new Array();
        for (var _i = 0, fieldDetailsArray_1 = fieldDetailsArray; _i < fieldDetailsArray_1.length; _i++) {
            var item = fieldDetailsArray_1[_i];
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3) && item.EntityCategoryId == this.entityCategoryId) {
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        if (this.isChildRequest) {
            temp.push({
                Id: 99999,
                Name: "Set Rule",
                DataKeyId: dataKeyId
            });
        }
        this.linkArray = temp;
    };
    /***********************************************************************************************************
    * Function:     onLinkClick
    * Description:  Fires when Permission Link is Clicked
    * Comments:     Corresponding boolean variables are changed and new tab is shown
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onLinkClick = function (linkDetails) {
        var contextObj = this;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        contextObj.requestId = linkDetails.DataKeyId;
        switch (linkDetails.Id) {
            case 1: //Manage Drawing
            case 15:
                return;
            case 2: //Manage Equipment
            case 13:
                return;
            case 3: //Manage Documents
            case 14:
                contextObj.documentTabEnabled = true;
                contextObj.addOnTabName = "Documents";
                break;
            case 11:
                break;
            case 99999:
                contextObj.ruleTabEnabled = true;
                contextObj.addOnTabName = "Set Rule";
                break;
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 50);
    };
    /***********************************************************************************************************
    * Function:     onTabClose
    * Description:  Fires when Tab Close button clicked.
    * Comments:     Logic of tab closing while Close button is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onTabClose = function (event) {
        var contextObj = this;
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 0;
        }, 50);
    };
    /***********************************************************************************************************
    * Function:     onSubmitClick
    * Description:  Submit click of Create Service Request.
    * Comments:     Custom Model is used for submition. Refer interface - IReviewSubmitData for better
    *               understanding.
    *               Document input is also passed along with it, since document is inserted against
    *               a request. Documented added before a request creation is stored
    *               locally in contextObj.submitOutput.WFEntityDocumentInput
    *
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        if (this.objectId != 0) {
            var reptIdValues = JSON.parse(event.fieldObject);
            reptIdValues.push({ ReportFieldId: 656, Value: this.objectId });
            event.fieldObject = JSON.stringify(reptIdValues);
        }
        var entityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: contextObj.isChildRequest ? contextObj.updateSubmitDataForChildRequests(JSON.parse(event.fieldObject)) : JSON.parse(event.fieldObject) };
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        debugger;
        contextObj.workOrdereService.submitAddUpdateServiceRequest(jsonOut, 0, 1).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                contextObj.loadFields();
                if (contextObj.documentTabEnabled) {
                    contextObj.tabDeleteIndex = 1;
                    setTimeout(function () {
                        contextObj.documentTabEnabled = false;
                    }, 50);
                }
                contextObj.documentSource = [];
                var retUpdatedSrc = [];
                var requestNumber = "";
                var temp = (resultData["Data"]["Data"]).split("****")[0];
                try {
                    retUpdatedSrc = JSON.parse(temp);
                }
                catch (err) {
                    requestNumber = temp.replace("[", "");
                    requestNumber = requestNumber.replace("]", "");
                }
                if (retUpdatedSrc == undefined || retUpdatedSrc.length == 0) {
                    contextObj.notificationService.ShowToaster("New Request '" + requestNumber + "' created", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("New Request '" + retUpdatedSrc[0]["Request Number"] + "' created", 3);
                }
                contextObj.linkArray = undefined;
                contextObj.submitOutput = {
                    WFEntityInput: null,
                    WFEntityDocumentInput: null,
                    //WFEntityEquipmentInput: null,
                    ParentFormId: 0
                };
                if (!contextObj.isChildRequest) {
                    //contextObj.updateFieldDetailsForAdd(contextObj.fieldDetailsAdd1);
                    contextObj.loadFields();
                    contextObj.createRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.createRequestEnabled = true;
                    }, 300);
                }
                else {
                    contextObj.onChildRequestCreate.emit(retUpdatedSrc);
                }
            }
            else if (resultData["Data"]["StatusId"] == 3) {
                contextObj.notificationService.ShowToaster("No matching Space exists for the specified field values", 5);
            }
            else {
                //contextObj.updateFieldDetailsForAdd(contextObj.fieldDetailsAdd1);
                contextObj.loadFields();
                contextObj.linkArray = undefined;
                contextObj.submitOutput = {
                    WFEntityInput: null,
                    WFEntityDocumentInput: null,
                    //WFEntityEquipmentInput: null,
                    ParentFormId: 0
                };
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    /***********************************************************************************************************
    * Function:     onDocumentSubmitClick
    * Description:  Document Submit click of Create Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding. Value is stored locally.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onDocumentSubmitClick = function (event) {
        var contextObj = this;
        var documentInput = { FormId: 0, WFEntityId: 0, ListDocumentReportFieldIdValues: [] };
        var documentdata = { DocumentId: 0, FileDataInput: '', WFReportFieldIdValues: [] };
        documentdata.DocumentId = event.Id;
        documentdata.FileDataInput = event.fileData;
        documentdata.WFReportFieldIdValues = event.fieldObject;
        contextObj.documentSource = event.itemSource;
        contextObj.notificationService.ShowToaster("Selected Document uploaded", 3);
        if (contextObj.submitOutput.WFEntityDocumentInput == null) {
            documentInput.FormId = 240;
            documentInput.WFEntityId = 0;
            documentInput.ListDocumentReportFieldIdValues.push(documentdata);
            contextObj.submitOutput.WFEntityDocumentInput = documentInput;
        }
        else {
            contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.push(documentdata);
        }
    };
    /***********************************************************************************************************
    * Function:     onDocumentDelete
    * Description:  Document Delete click of Review Service Requests.
    * Comments:     Selected document is deleted from Local storage (submitOutput.WFEntityDocumentInput).
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onDocumentDelete = function (event) {
        var contextObj = this;
        if (contextObj.submitOutput.WFEntityDocumentInput != null) {
            var itemToDelete = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.find(function (item) {
                return item.DocumentId === event.itemToBeDeleted["AttachmentId"];
            });
            var index = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.indexOf(itemToDelete);
            if (index > -1) {
                contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.splice(index, 1);
                contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
            }
            if (contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.length == 0) {
                contextObj.documentSource = [];
            }
        }
    };
    /***********************************************************************************************************
    * Function:     onRuleUpdate
    * Description:  Sets Rule for final submit.
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.onRuleUpdate = function (event) {
        var contextObj = this;
        this.ruleData = event.SetRuleData;
        console.log(contextObj.ruleData);
        contextObj.closeTab(1);
        contextObj.selectedTab = 0;
    };
    /***********************************************************************************************************
    * Function:     updateSubmitDataForChildRequests
    * Description:  Updates the field details for child request submit
    *
    ************************************************************************************************************/
    CreateServiceRequestComponent.prototype.updateSubmitDataForChildRequests = function (submitData) {
        debugger;
        var parentEntityItem = submitData.find(function (item) { return item.ReportFieldId === 5859; });
        parentEntityItem.Value = this.parentEntityId;
        submitData.push({
            ReportFieldId: 7490,
            Value: this.ruleData ? this.ruleData[0].RadioButton : 1
        }, {
            ReportFieldId: 7492,
            Value: this.ruleData ? (this.ruleData[0].Checkbox ? 1 : 0) : 0
        }, {
            ReportFieldId: 7493,
            Value: 16
        }, {
            ReportFieldId: 7494,
            Value: 0
        });
        if (this.ruleData && this.ruleData[0].ActionPoint) {
            for (var _i = 0, _a = this.ruleData[0].ActionPoint; _i < _a.length; _i++) {
                var item = _a[_i];
                submitData.push({ ReportFieldId: 7495, Value: item });
            }
        }
        return submitData;
    };
    CreateServiceRequestComponent.prototype.updateFieldDetailsForAdd = function (fieldDetailsArray) {
        var contextObj = this;
        for (var _i = 0, fieldDetailsArray_2 = fieldDetailsArray; _i < fieldDetailsArray_2.length; _i++) {
            var item = fieldDetailsArray_2[_i];
            switch (item.ReportFieldId) {
                case 1492:
                    item.IsVisible = false;
                    break;
                case 1367:
                    item.IsVisible = false;
                    break;
                case 5834:
                    item.IsVisible = false;
                    break;
                case 7521:
                    item.IsVisible = false;
                    break;
                case 12254:
                    item.IsVisible = false;
                    item.FieldLabel = "Next Action Point User(s)";
                    break;
                case 5988:
                    item.IsVisible = false;
                    break;
                case 1478:
                    item.IsVisible = false;
                    break;
                case 5978:
                    item.IsVisible = false;
                    break;
                //case 5873:  //WorkType
                //    item.IsVisible = true;
                //    item.IsMandatory = true;
                //    item.FieldValue = "-1";
                //    if (item.LookupDetails == null || item.LookupDetails.LookupValues == null || item.LookupDetails.LookupValues.length == 0) contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                //    break;
                case 1471:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "";
                    break;
                case 1369:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserFirstName;
                    break;
                case 1370:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserMiddleName;
                    break;
                case 1371:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserLastName;
                    break;
                case 1486:
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    break;
                case 1374:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 1488:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = (item.LookupDetails.LookupValues && item.LookupDetails.LookupValues.length > 0) ? item.LookupDetails.LookupValues[0].Id.toString() : "-1";
                    break;
                case 1487:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    item.FieldValue = contextObj.getFormattedDate(date.toDateString());
                    break;
                case 489:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    break;
                case 487:
                    item.IsVisible = true;
                    item.FieldValue = "-1";
                    break;
                case 539:
                    item.IsVisible = true;
                    item.FieldValue = "-1";
                    break;
                case 1372:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "14";
                    break;
                //Fields specially for For WorkOrder. Enables only in Review of WorkOrder
                case 1440:
                    item.IsVisible = false;
                    break;
                case 6562:
                    item.IsVisible = false;
                    break;
                case 6202:
                    item.IsVisible = false;
                    break;
                case 6201:
                    item.IsVisible = false;
                    break;
                case 6203:
                    item.IsVisible = false;
                    break;
                case 7807:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        }
        ;
        return fieldDetailsArray;
    };
    CreateServiceRequestComponent.prototype.updateRequesterFieldDetails = function (fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 1369:
                    item.FieldValue = contextObj.userDetails.UserFirstName;
                    break;
                case 1370:
                    item.FieldValue = contextObj.userDetails.UserMiddleName;
                    break;
                case 1371:
                    item.FieldValue = contextObj.userDetails.UserLastName;
                    break;
                case 1374:
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 7807:
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        });
        return fieldDetailsArray;
    };
    CreateServiceRequestComponent.prototype.getFormattedDate = function (value) {
        var strDate = "";
        var date;
        if (value != undefined) {
            date = new Date(value);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        console.log(strDate.length);
        return strDate;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CreateServiceRequestComponent.prototype, "onChildRequestCreate", void 0);
    CreateServiceRequestComponent = __decorate([
        core_1.Component({
            selector: 'create-Request',
            templateUrl: './app/Views/WorkOrder/Create Request/createRequest-root.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reviewDocument_list_component_1.ReviewDocumentListComponent, setruleforchildrequest_1.SetRuleForChildRequest, core_1.forwardRef(function () { return reviewServiceRequests_component_1.ReviewServiceRequestComponent; })],
            inputs: ['isChildRequest', 'parentEntityId', 'objectId'],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions])
    ], CreateServiceRequestComponent);
    return CreateServiceRequestComponent;
}());
exports.CreateServiceRequestComponent = CreateServiceRequestComponent;
//# sourceMappingURL=createrequest-root.component.js.map