
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import { StringTextBoxComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component';
import { FileUploadComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/fileuploadcomponent.component';
import { searchBox } from '../../../framework/whatever/search/search.component';
import { BarCodeComponent } from '../barcode/barcode.component';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { BarcodeReaderComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/barcodeReader';


@Component({
    selector: 'reviewEquipment-list',
    templateUrl: './app/Views/WorkOrder/Review/reviewEquipment-list.component.html',
    directives: [BarcodeReaderComponent, SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent
        , DropDownListComponent, ListBoxComponent, StringTextBoxComponent, FileUploadComponent, searchBox, BarCodeComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ObjectsService],
    inputs: ['userDetails', 'workRequestId', 'itemsSource', 'inputItems', 'totalItems', 'itemsPerPage', 'fieldObject', 'entityCategoryId','siteId'],
})

export class ReviewEquipmentListComponent implements OnInit {

    @Output() itemSourceUpdate = new EventEmitter();

    fieldObject: IField[];
    itemsSource: any[];
    types: boolean = true;
    inputItems: IGrid;
    IsBarcodeSubscribed: boolean = false;
    totalItems: number;
    //gridHeight: number=75;
    itemsPerPage: number;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    isTimeSpentSubscribed: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    action: string;
    btnName: string;
    userDetails: any;
    workRequestId: number;
    alignContent = "horizontal";
    ddlWorkType: IField = undefined;
    barCodeUploadField: IField = undefined;
    barCodeTextField: IField = undefined;
    equipmentCategoryId: any = "0";
    strFileExtensions: string[] = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
    enableSearch: boolean = false;
    advancelookup: IField[];
    IsAdvanceSearch = 0;
    IsKeyWordSearch = 0;
    advanceValue = "[]";
    KeywordFieldObject: any;
    keyWordLookup: any;
    filter = "";
    pageTitle: string = "Select Equipment";
    entityCategoryId: number;
    objectCategoryId: number = 1;
    siteId: number = 0;

    searchResultItemSource: any[];
    searchResultFieldObject: IField[];
    searchResultTotalItems = 0;
    searchResultitemsPerPage = 0;
    searchResultPageIndex = 0;
    searchResultInputItems: IGrid = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: true, sortCol: '', sortDir: 'ASC' };

    enableMenu = [];
    cardButtonPrivilege = [false, false];

    //Form id : 226-- page id 722
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (226))
    menuData = [];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    barcodeFieldObject;

    constructor(private objectsService: ObjectsService, private administrationServices: AdministrationService, private workOrderService: WorkOrdereService,
        private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
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

    }

    public setMenuData() {
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
        } else {
            this.menuData = [];
        }
    }

    public loadFields() {
        var contextObj = this;
        this.workOrderService.getReviewEquipmentListFields(contextObj.equipmentCategoryId).subscribe(function (result) {
            debugger
            contextObj.ddlWorkType = result["Data"]["FieldBinderList"].filter(function (item) { return item.ReportFieldId == 4491; })[0];
            contextObj.ddlWorkType.FieldValue = contextObj.equipmentCategoryId == "0" ? "-1" : contextObj.equipmentCategoryId;
            contextObj.ddlWorkType.IsMandatory = false;
            contextObj.barCodeUploadField = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4302; })[0];
            contextObj.barCodeTextField = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4303; })[0];
            contextObj.fieldObject = (result["Data"]["FieldBinderList"]).filter(function (item) { return (item.ReportFieldId != 4491 && item.ReportFieldId != 4302 && item.ReportFieldId != 4303); });
            contextObj.barcodeFieldObject = (result["Data"]["FieldBinderList"]).filter(function (item) { return item.ReportFieldId == 4302; })[0];
        });
    }

    public dataLoad(target?: number) {
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
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.onAddClick();
                break;
            case 2:
                this.onEquipmentDelete();
                break;
        }
    }

    public onAddClick() {
        this.advanceValue = "";
        this.filter = "";
        this.IsAdvanceSearch = 0;
        this.getAdvancedSearchdata(0);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };

    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public onSearchResultSort(objGrid: any) {
        this.getAdvancedSearchdata(1);
    }

    public searchResultpageChanged(event: any) {
        this.searchResultPageIndex = event.pageEvent.page;
        if (this.IsKeyWordSearch == 0)
            this.getAdvancedSearchdata(1);
        else if (this.IsKeyWordSearch == 1 && this.IsAdvanceSearch == 0)
            this.getKeywordSearchdata();
    }

    public onKeyWordSearch(event: any) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.getKeywordSearchdata();
    }
    public getKeywordSearchdata() {
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

        contextObj.workOrderService.getObjectSpaceData(0, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataOption, 1, '', '', '', false, 0, true, 1, contextObj.searchResultPageIndex, SortColumn, contextObj.searchResultInputItems.sortDir, contextObj.filter, 0, contextObj.siteId,false).subscribe(function (resultData) {
            contextObj.searchResultTotalItems = JSON.parse(resultData["DataCount"]);
            if (contextObj.searchResultTotalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.searchResultItemSource = [];
            }
            else {
                var tempArray: any[] = JSON.parse(resultData["FieldBinderData"]);
                var linkedIds: any[] = contextObj.getLinkedEquipmentIds();
                if (tempArray.length > 1) {
                    contextObj.workOrderService.getEquipmentSearchListFields(1).subscribe(function (result) {
                        contextObj.searchResultFieldObject = contextObj.updateSearchFields(result["Data"]);
                        if (linkedIds.length > 0) {
                            contextObj.searchResultItemSource = tempArray.filter(function (item) { return linkedIds.indexOf(item["ObjectId"]) == -1 });
                            if (contextObj.searchResultItemSource.length == 0) {
                                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                                contextObj.searchResultItemSource = [];
                            }
                        } else {
                            contextObj.searchResultItemSource = tempArray;
                        }
                    });
                } else {
                    if (!linkedIds.includes(tempArray[0]["ObjectId"]))
                        contextObj.setobjectId(tempArray[0]["ObjectId"]);
                    else {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        contextObj.searchResultItemSource = [];
                    }
                }
            }
        });
    }

    public loadAdvanceSearch() {
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
    }

    onAdvanceSearch(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsAdvanceSearch = 1;
        this.IsKeyWordSearch = 0;
        contextObj.getAdvancedSearchdata(1);
    }

    public getAdvancedSearchdata(target: number) {

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

        contextObj.workOrderService.getObjectSpaceData(0, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataOption, 1, '', '', '', false, 0, true, 1, contextObj.searchResultPageIndex, SortColumn, contextObj.searchResultInputItems.sortDir, contextObj.advanceValue, 0, contextObj.siteId,false).subscribe(function (resultData) {

            contextObj.searchResultTotalItems = JSON.parse(resultData["DataCount"]);
            if (target == 0) contextObj.searchResultitemsPerPage = resultData["RowsPerPage"];

            if (contextObj.searchResultTotalItems == 0) {
                if (target == 1) {
                    contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                } else {
                    contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                }
                contextObj.searchResultItemSource = [];
            }
            else {
                var tempArray: any[] = JSON.parse(resultData["FieldBinderData"]);
                var linkedIds: any[] = contextObj.getLinkedEquipmentIds();
                if (tempArray.length > 1) {
                    contextObj.workOrderService.getEquipmentSearchListFields(contextObj.objectCategoryId).subscribe(function (result) {
                        contextObj.searchResultFieldObject = contextObj.updateSearchFields(result["Data"]);
                        if (linkedIds.length > 0) {
                            contextObj.searchResultItemSource = tempArray.filter(function (item) { return linkedIds.indexOf(item["ObjectId"]) == -1 });
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
                        } else {
                            contextObj.searchResultItemSource = tempArray;
                        }
                        if (target == 0) {
                            contextObj.secondaryTarget = 1;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        }
                    });
                } else {
                    if (!linkedIds.includes(tempArray[0]["ObjectId"]))
                        contextObj.setobjectId(tempArray[0]["ObjectId"]);
                    else {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        contextObj.searchResultItemSource = [];
                    }
                }
            }
        });

    }

    public onSaveButtonClick(event) {
        var contextObj = this;
        var equipmentDatInput: EquipmentDataInput[] = [];

        for (var item of contextObj.searchResultItemSource) {
            if (item["Select All"]) {
                var tempArray: ReportFieldIdValues[] = [];
                tempArray.push(
                    {
                        ReportFieldId: 656,
                        Value: item["ObjectId"]
                    },
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.workRequestId
                    }
                );
                equipmentDatInput.push({ EquipmentId: 0, WFReportFieldIdValues: tempArray });
            }
        }

        if (equipmentDatInput.length == 0) {
            contextObj.notificationService.ShowToaster("Select an equipment", 2);
            return;
        }

        contextObj.onEquipmentSubmit(equipmentDatInput);
    }

    public onChangeEquipmentCategory(event) {
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
        console.log('object categoryid', this.objectCategoryId)
        var subscribedfeature;
        switch (this.objectCategoryId) {

            case 1: subscribedfeature = "105";//Asset
                break;
            case 2: subscribedfeature = "107";//furniture
                break;
            case 3: subscribedfeature = "109";//telecom
                break;
            case 7: subscribedfeature = "111";//datacentre
                break;
            case 8: subscribedfeature = "113";//electrical
                break;
            case 9: subscribedfeature = "115";//fire and safety
                break;
            case 10: subscribedfeature = "131";//mechanical
                break;
            case 11: subscribedfeature = "141";//plumbing
                break;
            case 12: subscribedfeature = "151";//medical gas
                break;

        }
        contextObj.workOrderService.getCustomerSubscribedFeaturesBarcode(subscribedfeature).subscribe(function (rt) {
            debugger
            if (rt.Data[0]["IsSubscribed"] == true) {// && rt.Data[0]["Id"] == 105
                contextObj.IsBarcodeSubscribed = true;
                console.log(contextObj.IsBarcodeSubscribed);
                // contextObj.gridHeight = 140;
            }
            else {
                contextObj.IsBarcodeSubscribed = false;
            }
        });
        this.loadFields();
        this.dataLoad(1);
    }

    public setobjectId(event) {

        if (event == 0) {
            contextObj.notificationService.ShowToaster("No Equipment exists", 2);
            return;
        }
        var contextObj = this;
        var selectedItem = contextObj.itemsSource.find(function (item) { return item.Id === event })
        if (selectedItem) {
            contextObj.notificationService.ShowToaster("Equipment already added", 2);
            return;
        }
        var tempArray: ReportFieldIdValues[] = [];
        tempArray.push(
            {
                ReportFieldId: 656,
                Value: event
            },
            {
                ReportFieldId: 1481,
                Value: contextObj.workRequestId
            }
        );
        var equipmentDatInput: EquipmentDataInput[] = [{ EquipmentId: -1, WFReportFieldIdValues: tempArray }]
        contextObj.onEquipmentSubmit(equipmentDatInput);
    }

    public onEquipmentSubmit(event: EquipmentDataInput[]) {

        var contextObj = this;
        var equipmentEntityData: ReviewEquipmentInput = { WFEntityEquipmentInput: { FormId: 297, WFEntityId: this.workRequestId, ListEquipmentReportFieldIdValues: event } }
        contextObj.workOrderService.submitReviewEquipmentData(JSON.stringify(equipmentEntityData), 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc: any[] = JSON.parse(resultData["Data"]["Data"]);
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    for (var item of retUpdatedSrc) {
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
    }

    public onEquipmentDelete() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Equipment", 2);
            return;
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            return;
        }
        this.showSlide = !this.showSlide;
    }

    public deleteEquipments() {
        var contextObj = this;
        var equipmentDataInput: EquipmentDataInput[] = []
        for (var id of contextObj.inputItems.selectedIds) {
            var tempArray: ReportFieldIdValues[] = [];
            tempArray.push(
                {
                    ReportFieldId: 656,
                    Value: id
                },
                {
                    ReportFieldId: 1481,
                    Value: contextObj.workRequestId
                }
            );
            equipmentDataInput.push({ EquipmentId: id, WFReportFieldIdValues: tempArray });
        }
        var equipmentEntityData: ReviewEquipmentInput = { WFEntityEquipmentInput: { FormId: 297, WFEntityId: contextObj.workRequestId, ListEquipmentReportFieldIdValues: equipmentDataInput } }

        contextObj.workOrderService.submitReviewEquipmentData(JSON.stringify(equipmentEntityData), 2).subscribe(function (resultData) {

            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    updatedData = updatedData.filter(function (item) { return item.Id != contextObj.inputItems.selectedIds[0] });
                    contextObj.itemsSource = [];
                    contextObj.itemsSource = updatedData;
                    contextObj.enableMenu = contextObj.itemsSource.length > 0 ? [1, 2] : [1];
                    contextObj.notificationService.ShowToaster("Selected Equipment deleted", 2);
                    break;
                default:
                    break;

            }
        });
    }

    public getLinkedEquipmentIds() {
        var returnArray: any[] = [];
        for (var item of this.itemsSource) {
            returnArray.push(item["Id"]);
        }
        return returnArray;
    }

    public updateSearchFields(fieldObjectArray) {
        fieldObjectArray.find(function (item: IField) {
            if (item.FieldId != 1813) {
                item.IsEnabled = false;
            }
        });
        return fieldObjectArray;
    }

    /*slide events*/

    public okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteEquipments();
    }

    public cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    public closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    barcodeData(event) {
        var contextObj = this;
        if (event.barcode != '' && event.barcode != null && event.barcode != 'Unable to Decode Barcode') {
            var dbobjectId = 50881;


            contextObj.workOrderService.getObjectIdforEquipment(dbobjectId, event.barcode).subscribe(function (resultData) {
                var objId = JSON.parse(resultData["Data"]);
                debugger
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
    }

}

interface ReviewEquipmentInput {
    WFEntityEquipmentInput: EquipmentInput;
}

interface EquipmentInput {
    FormId: number;
    WFEntityId: number;
    ListEquipmentReportFieldIdValues: EquipmentDataInput[];
}

interface EquipmentDataInput {
    EquipmentId: number;
    WFReportFieldIdValues: any[];
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}
