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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var stringtextbox_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component');
var fileuploadcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/fileuploadcomponent.component');
var search_component_1 = require('../../../framework/whatever/search/search.component');
var barcode_component_1 = require('../barcode/barcode.component');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var barcodeReader_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/barcodeReader');
var ReviewEquipmentListComponent = (function () {
    function ReviewEquipmentListComponent(objectsService, administrationServices, workOrderService, notificationService, generFun) {
        this.objectsService = objectsService;
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.types = true;
        this.IsBarcodeSubscribed = false;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.isTimeSpentSubscribed = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.alignContent = "horizontal";
        this.ddlWorkType = undefined;
        this.barCodeUploadField = undefined;
        this.barCodeTextField = undefined;
        this.equipmentCategoryId = "0";
        this.strFileExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
        this.enableSearch = false;
        this.IsAdvanceSearch = 0;
        this.IsKeyWordSearch = 0;
        this.advanceValue = "[]";
        this.filter = "";
        this.pageTitle = "Select Equipment";
        this.objectCategoryId = 1;
        this.siteId = 0;
        this.searchResultTotalItems = 0;
        this.searchResultitemsPerPage = 0;
        this.searchResultPageIndex = 0;
        this.searchResultInputItems = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: true, sortCol: '', sortDir: 'ASC' };
        this.enableMenu = [];
        this.cardButtonPrivilege = [false, false];
        //Form id : 226-- page id 722
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (226))
        this.menuData = [];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ReviewEquipmentListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        contextObj.setMenuData();
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 722, contextObj.administrationServices, contextObj.menuData.length);
        contextObj.loadFields();
        setTimeout(function () {
            contextObj.objectsService.getObjectDataKeywordField(contextObj.objectCategoryId).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                }
            });
        }, 2000);
        //form id :  226-- page id 722
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 732, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        //subscribed feature code for barcode was written here but now moved to the drop down change event
    };
    ReviewEquipmentListComponent.prototype.setMenuData = function () {
        if (this.entityCategoryId == 1) {
            this.menuData = [
                {
                    "id": 1,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "subMenu": null,
                    "privilegeId": null //3471
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "subMenu": null,
                    "privilegeId": null //3471
                }];
        }
        else {
            this.menuData = [];
        }
    };
    ReviewEquipmentListComponent.prototype.loadFields = function () {
        var contextObj = this;
        this.workOrderService.getReviewEquipmentListFields(contextObj.equipmentCategoryId).subscribe(function (result) {
            debugger;
            contextObj.ddlWorkType = result["Data"]["FieldBinderList"].filter(function (item) { return item.ReportFieldId == 4491; })[0];
            contextObj.ddlWorkType.FieldValue = contextObj.equipmentCategoryId == "0" ? "-1" : contextObj.equipmentCategoryId;
            contextObj.ddlWorkType.IsMandatory = false;
            contextObj.barCodeUploadField = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4302; })[0];
            contextObj.barCodeTextField = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4303; })[0];
            contextObj.fieldObject = (result["Data"]["FieldBinderList"]).filter(function (item) { return (item.ReportFieldId != 4491 && item.ReportFieldId != 4302 && item.ReportFieldId != 4303); });
            contextObj.barcodeFieldObject = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4302; })[0];
        });
    };
    ReviewEquipmentListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrderService.getReviewEquipmentListData(contextObj.equipmentCategoryId, contextObj.workRequestId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
                contextObj.itemSourceUpdate.emit({
                    itemSource: contextObj.itemsSource,
                    rowsPerPage: contextObj.itemsPerPage,
                    totalItems: contextObj.totalItems
                });
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = contextObj.equipmentCategoryId == "0" ? [] : [1];
            }
        });
    };
    ReviewEquipmentListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.onAddClick();
                break;
            case 2:
                this.onEquipmentDelete();
                break;
        }
    };
    ReviewEquipmentListComponent.prototype.onAddClick = function () {
        this.advanceValue = "";
        this.filter = "";
        this.IsAdvanceSearch = 0;
        this.getAdvancedSearchdata(0);
    };
    ReviewEquipmentListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ReviewEquipmentListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ReviewEquipmentListComponent.prototype.onSearchResultSort = function (objGrid) {
        this.getAdvancedSearchdata(1);
    };
    ReviewEquipmentListComponent.prototype.searchResultpageChanged = function (event) {
        this.searchResultPageIndex = event.pageEvent.page;
        if (this.IsKeyWordSearch == 0)
            this.getAdvancedSearchdata(1);
        else if (this.IsKeyWordSearch == 1 && this.IsAdvanceSearch == 0)
            this.getKeywordSearchdata();
    };
    ReviewEquipmentListComponent.prototype.onKeyWordSearch = function (event) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.getKeywordSearchdata();
    };
    ReviewEquipmentListComponent.prototype.getKeywordSearchdata = function () {
        var contextObj = this;
        var dataOption = "1";
        var SortColumn = contextObj.searchResultInputItems.sortCol;
        var totalitems = contextObj.searchResultTotalItems;
        if (contextObj.searchResultInputItems.sortCol == "[Asset No.]")
            SortColumn = "[ObjectNo]";
        else if (contextObj.searchResultInputItems.sortCol == "[Asset Class Name]")
            SortColumn = "[ObjectClassName]";
        if (contextObj.filter == "Assigned")
            dataOption = "2";
        else if (contextObj.filter == "Unassigned")
            dataOption = "3";
        contextObj.workOrderService.getObjectSpaceData(0, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataOption, 1, '', '', '', false, 0, true, 1, contextObj.searchResultPageIndex, SortColumn, contextObj.searchResultInputItems.sortDir, contextObj.filter, 0, contextObj.siteId, false).subscribe(function (resultData) {
            contextObj.searchResultTotalItems = JSON.parse(resultData["DataCount"]);
            if (contextObj.searchResultTotalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.searchResultItemSource = [];
            }
            else {
                var tempArray = JSON.parse(resultData["FieldBinderData"]);
                var linkedIds = contextObj.getLinkedEquipmentIds();
                if (tempArray.length > 1) {
                    contextObj.workOrderService.getEquipmentSearchListFields(1).subscribe(function (result) {
                        contextObj.searchResultFieldObject = contextObj.updateSearchFields(result["Data"]);
                        if (linkedIds.length > 0) {
                            contextObj.searchResultItemSource = tempArray.filter(function (item) { return linkedIds.indexOf(item["ObjectId"]) == -1; });
                            if (contextObj.searchResultItemSource.length == 0) {
                                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                                contextObj.searchResultItemSource = [];
                            }
                        }
                        else {
                            contextObj.searchResultItemSource = tempArray;
                        }
                    });
                }
                else {
                    if (!linkedIds.includes(tempArray[0]["ObjectId"]))
                        contextObj.setobjectId(tempArray[0]["ObjectId"]);
                    else {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        contextObj.searchResultItemSource = [];
                    }
                }
            }
        });
    };
    ReviewEquipmentListComponent.prototype.loadAdvanceSearch = function () {
        var contextObj = this;
        this.objectsService.getAdvnceSearchLookup(contextObj.objectCategoryId).subscribe(function (resultData) {
            debugger;
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                switch (contextObj.equipmentCategoryId) {
                    case 1:
                        contextObj.advancelookup[0].FieldLabel = "Asset No.";
                        contextObj.advancelookup[1].FieldLabel = "Asset Class Name";
                        break;
                    case 2:
                        contextObj.advancelookup[0].FieldLabel = "Equipment No.";
                        contextObj.advancelookup[1].FieldLabel = "Equipment Class Name";
                        break;
                }
            }
        });
    };
    ReviewEquipmentListComponent.prototype.onAdvanceSearch = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsAdvanceSearch = 1;
        this.IsKeyWordSearch = 0;
        contextObj.getAdvancedSearchdata(1);
    };
    ReviewEquipmentListComponent.prototype.getAdvancedSearchdata = function (target) {
        var contextObj = this;
        var dataOption = "1";
        var SortColumn = contextObj.searchResultInputItems.sortCol;
        var totalitems = contextObj.searchResultTotalItems;
        if (contextObj.searchResultInputItems.sortCol == "[Asset No.]")
            SortColumn = "[ObjectNo]";
        else if (contextObj.searchResultInputItems.sortCol == "[Asset Class Name]")
            SortColumn = "[ObjectClassName]";
        if (contextObj.advanceValue.indexOf("Assigned") > 0)
            dataOption = "2";
        else if (contextObj.advanceValue.indexOf("Unassigned") > 0)
            dataOption = "3";
        contextObj.workOrderService.getObjectSpaceData(0, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataOption, 1, '', '', '', false, 0, true, 1, contextObj.searchResultPageIndex, SortColumn, contextObj.searchResultInputItems.sortDir, contextObj.advanceValue, 0, contextObj.siteId, false).subscribe(function (resultData) {
            contextObj.searchResultTotalItems = JSON.parse(resultData["DataCount"]);
            if (target == 0)
                contextObj.searchResultitemsPerPage = resultData["RowsPerPage"];
            if (contextObj.searchResultTotalItems == 0) {
                if (target == 1) {
                    contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                }
                contextObj.searchResultItemSource = [];
            }
            else {
                var tempArray = JSON.parse(resultData["FieldBinderData"]);
                var linkedIds = contextObj.getLinkedEquipmentIds();
                if (tempArray.length > 1) {
                    contextObj.workOrderService.getEquipmentSearchListFields(contextObj.objectCategoryId).subscribe(function (result) {
                        contextObj.searchResultFieldObject = contextObj.updateSearchFields(result["Data"]);
                        if (linkedIds.length > 0) {
                            contextObj.searchResultItemSource = tempArray.filter(function (item) { return linkedIds.indexOf(item["ObjectId"]) == -1; });
                            if (contextObj.searchResultItemSource.length == 0) {
                                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                                contextObj.searchResultItemSource = [];
                            }
                            else if (contextObj.searchResultItemSource.length == 1) {
                                if (!linkedIds.includes(contextObj.searchResultItemSource[0]["ObjectId"]))
                                    contextObj.setobjectId(contextObj.searchResultItemSource[0]["ObjectId"]);
                                else {
                                    contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                                    contextObj.searchResultItemSource = [];
                                }
                            }
                        }
                        else {
                            contextObj.searchResultItemSource = tempArray;
                        }
                        if (target == 0) {
                            contextObj.secondaryTarget = 1;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        }
                    });
                }
                else {
                    if (!linkedIds.includes(tempArray[0]["ObjectId"]))
                        contextObj.setobjectId(tempArray[0]["ObjectId"]);
                    else {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        contextObj.searchResultItemSource = [];
                    }
                }
            }
        });
    };
    ReviewEquipmentListComponent.prototype.onSaveButtonClick = function (event) {
        var contextObj = this;
        var equipmentDatInput = [];
        for (var _i = 0, _a = contextObj.searchResultItemSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item["Select All"]) {
                var tempArray = [];
                tempArray.push({
                    ReportFieldId: 656,
                    Value: item["ObjectId"]
                }, {
                    ReportFieldId: 1481,
                    Value: contextObj.workRequestId
                });
                equipmentDatInput.push({ EquipmentId: 0, WFReportFieldIdValues: tempArray });
            }
        }
        if (equipmentDatInput.length == 0) {
            contextObj.notificationService.ShowToaster("Select an equipment", 2);
            return;
        }
        contextObj.onEquipmentSubmit(equipmentDatInput);
    };
    ReviewEquipmentListComponent.prototype.onChangeEquipmentCategory = function (event) {
        var contextObj = this;
        this.equipmentCategoryId = event == "-1" ? "0" : event;
        if (event == "-1") {
            this.itemsSource = [];
            this.enableMenu = [];
            return;
        }
        switch (event) {
            case "39":
            case "62":
            case "63":
            case "64":
                this.objectCategoryId = 1;
                break;
            case "40":
                this.objectCategoryId = 2;
                break;
            case "41":
                this.objectCategoryId = 3;
                break;
            case "27":
            case "33":
            case "34":
            case "42":
                this.objectCategoryId = 8;
                break;
            case "43":
                this.objectCategoryId = 9;
                break;
            case "44":
                this.objectCategoryId = 10;
                break;
            case "45":
                this.objectCategoryId = 11;
                break;
            case "46":
                this.objectCategoryId = 12;
                break;
        }
        console.log('object categoryid', this.objectCategoryId);
        var subscribedfeature;
        switch (this.objectCategoryId) {
            case 1:
                subscribedfeature = "105"; //Asset
                break;
            case 2:
                subscribedfeature = "107"; //furniture
                break;
            case 3:
                subscribedfeature = "109"; //telecom
                break;
            case 7:
                subscribedfeature = "111"; //datacentre
                break;
            case 8:
                subscribedfeature = "113"; //electrical
                break;
            case 9:
                subscribedfeature = "115"; //fire and safety
                break;
            case 10:
                subscribedfeature = "131"; //mechanical
                break;
            case 11:
                subscribedfeature = "141"; //plumbing
                break;
            case 12:
                subscribedfeature = "151"; //medical gas
                break;
        }
        contextObj.workOrderService.getCustomerSubscribedFeaturesBarcode(subscribedfeature).subscribe(function (rt) {
            debugger;
            if (rt.Data[0]["IsSubscribed"] == true) {
                contextObj.IsBarcodeSubscribed = true;
                console.log(contextObj.IsBarcodeSubscribed);
            }
            else {
                contextObj.IsBarcodeSubscribed = false;
            }
        });
        this.loadFields();
        this.dataLoad(1);
    };
    ReviewEquipmentListComponent.prototype.setobjectId = function (event) {
        if (event == 0) {
            contextObj.notificationService.ShowToaster("No Equipment exists", 2);
            return;
        }
        var contextObj = this;
        var selectedItem = contextObj.itemsSource.find(function (item) { return item.Id === event; });
        if (selectedItem) {
            contextObj.notificationService.ShowToaster("Equipment already added", 2);
            return;
        }
        var tempArray = [];
        tempArray.push({
            ReportFieldId: 656,
            Value: event
        }, {
            ReportFieldId: 1481,
            Value: contextObj.workRequestId
        });
        var equipmentDatInput = [{ EquipmentId: -1, WFReportFieldIdValues: tempArray }];
        contextObj.onEquipmentSubmit(equipmentDatInput);
    };
    ReviewEquipmentListComponent.prototype.onEquipmentSubmit = function (event) {
        var contextObj = this;
        var equipmentEntityData = { WFEntityEquipmentInput: { FormId: 297, WFEntityId: this.workRequestId, ListEquipmentReportFieldIdValues: event } };
        contextObj.workOrderService.submitReviewEquipmentData(JSON.stringify(equipmentEntityData), 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc = JSON.parse(resultData["Data"]["Data"]);
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    for (var _i = 0, retUpdatedSrc_1 = retUpdatedSrc; _i < retUpdatedSrc_1.length; _i++) {
                        var item = retUpdatedSrc_1[_i];
                        updatedData.push(item);
                    }
                    contextObj.itemsSource = [];
                    contextObj.itemsSource = updatedData;
                    contextObj.enableMenu = contextObj.itemsSource.length > 0 ? [1, 2] : [1];
                    contextObj.equipmentCategoryId = retUpdatedSrc[0]["EquipmentCategoryId"].toString();
                    contextObj.loadFields();
                    contextObj.dataLoad(0);
                    contextObj.notificationService.ShowToaster("Equipment added", 2);
                    if (contextObj.splitviewInput.showSecondaryView) {
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        contextObj.advanceValue = "";
                        contextObj.IsAdvanceSearch = contextObj.IsKeyWordSearch = 0;
                    }
                    break;
                default:
                    break;
            }
        });
    };
    ReviewEquipmentListComponent.prototype.onEquipmentDelete = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Equipment", 2);
            return;
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            return;
        }
        this.showSlide = !this.showSlide;
    };
    ReviewEquipmentListComponent.prototype.deleteEquipments = function () {
        var contextObj = this;
        var equipmentDataInput = [];
        for (var _i = 0, _a = contextObj.inputItems.selectedIds; _i < _a.length; _i++) {
            var id = _a[_i];
            var tempArray = [];
            tempArray.push({
                ReportFieldId: 656,
                Value: id
            }, {
                ReportFieldId: 1481,
                Value: contextObj.workRequestId
            });
            equipmentDataInput.push({ EquipmentId: id, WFReportFieldIdValues: tempArray });
        }
        var equipmentEntityData = { WFEntityEquipmentInput: { FormId: 297, WFEntityId: contextObj.workRequestId, ListEquipmentReportFieldIdValues: equipmentDataInput } };
        contextObj.workOrderService.submitReviewEquipmentData(JSON.stringify(equipmentEntityData), 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    updatedData = updatedData.filter(function (item) { return item.Id != contextObj.inputItems.selectedIds[0]; });
                    contextObj.itemsSource = [];
                    contextObj.itemsSource = updatedData;
                    contextObj.enableMenu = contextObj.itemsSource.length > 0 ? [1, 2] : [1];
                    contextObj.notificationService.ShowToaster("Selected Equipment deleted", 2);
                    break;
                default:
                    break;
            }
        });
    };
    ReviewEquipmentListComponent.prototype.getLinkedEquipmentIds = function () {
        var returnArray = [];
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            returnArray.push(item["Id"]);
        }
        return returnArray;
    };
    ReviewEquipmentListComponent.prototype.updateSearchFields = function (fieldObjectArray) {
        fieldObjectArray.find(function (item) {
            if (item.FieldId != 1813) {
                item.IsEnabled = false;
            }
        });
        return fieldObjectArray;
    };
    /*slide events*/
    ReviewEquipmentListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteEquipments();
    };
    ReviewEquipmentListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ReviewEquipmentListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ReviewEquipmentListComponent.prototype.barcodeData = function (event) {
        var contextObj = this;
        if (event.barcode != '' && event.barcode != null && event.barcode != 'Unable to Decode Barcode') {
            var dbobjectId = 50881;
            contextObj.workOrderService.getObjectIdforEquipment(dbobjectId, event.barcode).subscribe(function (resultData) {
                var objId = JSON.parse(resultData["Data"]);
                debugger;
                if (objId[0].ObjectId != 0 && objId[0].ObjectId != null && objId[0].ObjectId != '') {
                    contextObj.setobjectId(objId[0].ObjectId);
                }
                else {
                    contextObj.notificationService.ShowToaster("Barcode in the selected file is not linked to any equipment in iDrawings", 2);
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Unable to decode Barcode", 2);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewEquipmentListComponent.prototype, "itemSourceUpdate", void 0);
    ReviewEquipmentListComponent = __decorate([
        core_1.Component({
            selector: 'reviewEquipment-list',
            templateUrl: './app/Views/WorkOrder/Review/reviewEquipment-list.component.html',
            directives: [barcodeReader_1.BarcodeReaderComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent,
                dropdownlistcomponent_component_1.DropDownListComponent, listboxcomponent_component_1.ListBoxComponent, stringtextbox_component_1.StringTextBoxComponent, fileuploadcomponent_component_1.FileUploadComponent, search_component_1.searchBox, barcode_component_1.BarCodeComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, objects_service_1.ObjectsService],
            inputs: ['userDetails', 'workRequestId', 'itemsSource', 'inputItems', 'totalItems', 'itemsPerPage', 'fieldObject', 'entityCategoryId', 'siteId'],
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReviewEquipmentListComponent);
    return ReviewEquipmentListComponent;
}());
exports.ReviewEquipmentListComponent = ReviewEquipmentListComponent;
//# sourceMappingURL=reviewEquipment-list.component.js.map