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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var search_component_1 = require('../../../framework/whatever/search/search.component');
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var TrackRequestListComponent = (function () {
    function TrackRequestListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.editClicked = new core_1.EventEmitter();
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.types = false;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.isTimeSpentSubscribed = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.target = 1;
        this.enableMenu = [];
        this.cardButtonPrivilege = [false, false];
        this.requester = "14";
        this.advanceValue = "[]";
        this.filter = "";
        this.isKeyWordSearch = 0;
        this.isAdvanceSearch = 0;
        this.disable = false;
        //Form id : 226-- page id 722
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (226))
        this.menuData = [
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 3479
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    TrackRequestListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (contextObj.isActive) {
            contextObj.menuData = [
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "subMenu": null,
                    "privilegeId": 3479
                }
            ];
        }
        else {
            contextObj.menuData = [];
        }
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 720, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getTrackRequestListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"]; //.filter(function (item) { return item.FieldId != 1261 });
            //contextObj.ddlWorkType = (result["Data"].filter(function (item) { return item.FieldId != 1261 }))[0];
            //if (contextObj.ddlWorkType.LookupDetails.LookupValues) {
            //    contextObj.ddlWorkType.FieldValue = contextObj.ddlWorkType.LookupDetails.LookupValues[0].Id.toString();
            //}
            if (!contextObj.isActive) {
                var fieldIdToBeRemoved = [1245, 1248]; /* Current Action Point and For Action By*/
                contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return fieldIdToBeRemoved.indexOf(item.FieldId) == -1; });
            }
            if (contextObj.itemsSource == null || contextObj.itemsSource.length == 0) {
                contextObj.dataLoad(1);
            }
            else {
                contextObj.enableMenu = [1];
            }
        });
        contextObj.workOrderService.getserviceRequestKeywordField(contextObj.getReportFieldIdValues()).subscribe(function (resultData) {
            contextObj.keywordFieldObject = resultData["FieldBinderList"];
        });
        //contextObj.workOrderService.checkSubscribedFeature('198').subscribe(function (result) {
        //    if (result["Data"] == null || result["Data"].length == 0) return;
        //    contextObj.isTimeSpentSubscribed = result["Data"][0]["IsSubscribed"];
        //});
        //form id :  226-- page id 722
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 732, contextObj.administrationServices, contextObj.menuData.length);
        var callBack = function (data) {
            if (data != undefined && data.length != 0)
                data.filter(function (el) {
                    if (el.title == "Edit") {
                        contextObj.cardButtonPrivilege[0] = true;
                    }
                    else if (el.title == "Delete") {
                        contextObj.cardButtonPrivilege[1] = true;
                    }
                });
            this.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
    };
    TrackRequestListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrderService.getTrackRequestListData(contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.disable = false;
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
                contextObj.itemSourceUpdate.emit({
                    itemSource: contextObj.itemsSource,
                    rowsPerPage: contextObj.itemsPerPage,
                    totalItems: contextObj.totalItems
                });
            }
            else {
                contextObj.disable = true;
                contextObj.notificationService.ShowToaster("No Requests exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    TrackRequestListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
        }
    };
    TrackRequestListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.checkAndLoadData();
    };
    ;
    TrackRequestListComponent.prototype.onSort = function (objGrid) {
        this.checkAndLoadData();
    };
    TrackRequestListComponent.prototype.checkAndLoadData = function () {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(0);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    };
    TrackRequestListComponent.prototype.onKeyWordSearch = function (event) {
        this.filter = event.value;
        this.isKeyWordSearch = 1;
        this.isAdvanceSearch = 0;
        this.pageIndex = 0;
        this.getKeywordSearchdata();
    };
    TrackRequestListComponent.prototype.getKeywordSearchdata = function () {
        if (this.filter == "") {
            this.dataLoad(0);
            return;
        }
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderKeyWordListData(2, contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1];
            }
        });
    };
    TrackRequestListComponent.prototype.loadadvanceSearch = function () {
        var contextObj = this;
        this.workOrderService.getServiceRequestAdvnceSearchLookup(contextObj.getReportFieldIdValues()).subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    };
    TrackRequestListComponent.prototype.onAdvanceSearch = function (event) {
        this.advanceValue = event.fieldobject;
        this.isAdvanceSearch = 1;
        this.isKeyWordSearch = 0;
        this.pageIndex = 0;
        this.getAdvancedSearchdata();
    };
    TrackRequestListComponent.prototype.getAdvancedSearchdata = function () {
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderAdvanceSearchListData(2, contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.advanceValue).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1];
            }
        });
    };
    TrackRequestListComponent.prototype.reviewClick = function () {
        this.action = "review";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
        }
        else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (contextObj.inputItems.rowData["StatusId"] != 25) {
            contextObj.notificationService.ShowToaster("Selected Request is already accepted", 2);
        }
        else {
            contextObj.workOrderService.loadReviewServiceRequest(contextObj.inputItems.rowData.WorkRequestId, "track", contextObj.inputItems.rowData["WorkTypeId"], 0, 1, contextObj.inputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
                contextObj.workOrderService.getRequesterDetails(contextObj.inputItems.rowData.WorkRequestId).subscribe(function (requesterData) {
                    debugger;
                    contextObj.updateRequesterDetails(JSON.parse(requesterData.Data)[0]);
                    contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForEdit(resultData["Data"]["FieldBinderList"]);
                    contextObj.updateDateTimeAdditionalDataFields(contextObj.fieldDetailsAdd1);
                    contextObj.editClicked.emit({
                        fieldobject: contextObj.fieldDetailsAdd1,
                        outComes: resultData["Data"]["FieldBinderData"] == null ? [] : JSON.parse(resultData["Data"]["FieldBinderData"]),
                        action: contextObj.action,
                        buttonName: contextObj.btnName,
                        input: contextObj.inputItems,
                    });
                });
            });
        }
    };
    TrackRequestListComponent.prototype.updateRequesterDetails = function (requesterData) {
        if (requesterData) {
            this.userDetails.UserFirstName = requesterData.FirstName;
            this.userDetails.UserLastName = requesterData.LastName;
            this.userDetails.UserMiddleName = requesterData.MiddleName ? requesterData.MiddleName : "";
            this.userDetails.UserEmail = requesterData.Email;
            this.requester = requesterData.Requester;
        }
    };
    TrackRequestListComponent.prototype.updateFieldDetailsForEdit = function (fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 1481:
                    item.FieldValue = contextObj.inputItems.rowData["WorkRequestId"];
                    break;
                case 5859:
                    item.FieldValue = contextObj.inputItems.rowData["WorkFlowEntityId"];
                    break;
                case 1492:
                    item.IsVisible = true;
                    break;
                case 1367:
                    item.IsVisible = true;
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
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.inputItems.rowData["Description"];
                    break;
                case 1478:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    var replaceString = "** ";
                    item.FieldValue = contextObj.inputItems.rowData["Previous Review Comments"].replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                case 5978:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    break;
                case 5873:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.inputItems.rowData["WorkTypeId"];
                    break;
                case 1471:
                    item.IsVisible = false;
                    item.IsMandatory = false;
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
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.FieldValue = contextObj.inputItems.rowData["Requested Date"];
                    item.ReadOnlyMode = true;
                    break;
                case 1374:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 1488:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = contextObj.inputItems.rowData["PriorityId"];
                    break;
                case 1487:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    item.FieldValue = date.toDateString();
                    break;
                case 489:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = contextObj.inputItems.rowData["SiteId"];
                    break;
                case 487:
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["BuildingId"];
                    break;
                case 9548:
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["FloorId"];
                    break;
                case 290:
                    item.FieldValue = contextObj.inputItems.rowData[item.FieldLabel];
                    break;
                case 1372:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.requester;
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
                case 6175:
                    item.IsVisible = false;
                    break;
                case 1454:
                    item.IsVisible = false;
                    break;
            }
        });
        return fieldDetailsArray;
    };
    TrackRequestListComponent.prototype.getReportFieldIdValues = function () {
        var contextObj = this;
        var returnArray = [];
        if (contextObj.target == 1) {
            returnArray.push({
                ReportFieldId: 5809,
                Value: contextObj.userDetails.UserId
            });
        }
        if (contextObj.isActive) {
            returnArray.push({
                ReportFieldId: 1490,
                Value: 11
            }, {
                ReportFieldId: 1490,
                Value: 17
            }, {
                ReportFieldId: 1490,
                Value: 18
            }, {
                ReportFieldId: 1490,
                Value: 19
            }, {
                ReportFieldId: 1490,
                Value: 22
            }, {
                ReportFieldId: 1490,
                Value: 25
            }, {
                ReportFieldId: 1490,
                Value: 28
            }, {
                ReportFieldId: 1490,
                Value: 38
            });
        }
        else {
            returnArray.push({
                ReportFieldId: 1490,
                Value: 3
            });
        }
        return JSON.stringify(returnArray);
    };
    TrackRequestListComponent.prototype.updateDateTimeAdditionalDataFields = function (fieldDetailsArray) {
        var tempArray = fieldDetailsArray.filter(function (item) {
            return item.ReportFieldId > 1000000 && item.DataEntryControlId == 8;
        });
        for (var _i = 0, tempArray_1 = tempArray; _i < tempArray_1.length; _i++) {
            var item = tempArray_1[_i];
            if (item.FieldValue != "" && item.FieldValue) {
                if (item.FieldValue.includes("AM")) {
                    var value = item.FieldValue.split("AM")[0];
                    item.FieldValue = value + " AM";
                }
                else if (item.FieldValue.includes("PM")) {
                    var value = item.FieldValue.split("PM")[0];
                    item.FieldValue = value + " PM";
                }
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TrackRequestListComponent.prototype, "editClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TrackRequestListComponent.prototype, "itemSourceUpdate", void 0);
    TrackRequestListComponent = __decorate([
        core_1.Component({
            selector: 'trackRequest-list',
            templateUrl: './app/Views/WorkOrder/Track Request/trackRequest-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, search_component_1.searchBox, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['itemsSource', 'totalItems', 'userDetails', 'inputItems', 'itemsPerPage', 'isActive', 'target'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], TrackRequestListComponent);
    return TrackRequestListComponent;
}());
exports.TrackRequestListComponent = TrackRequestListComponent;
//# sourceMappingURL=trackRequest-list.component.js.map