import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {AmenitiesAddEditComponent} from './amenities-add-edit.component';

@Component({
    selector: 'amenities',
    templateUrl: './app/Views/Scheduling/General Settings/amenities.component.html',
    directives: [FieldComponent, Notification, SubMenu, PagingComponent, SlideComponent, GridComponent, SplitViewComponent, AmenitiesAddEditComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions]

})

export class AmenityComponent implements OnInit {

    totalItems;
    returnData: any;
    types = false;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    fieldDetailsAdd1: IField[] = [];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Amenity', sortDir: 'ASC', selectioMode:"single" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    public errorMessage: string;
    amenitySource: any[];
    private fields: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add"
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit"
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete"
        }
    ];
    gridcount = 0;
    enableMenu = [];
    selIds = new Array();
    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    isApprovalProcessSubscribed: boolean = false;
    action: string;
    btnName: string;
    pageTitle: string;
    refreshgrid;

    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(){

        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getAmenitiesFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8647 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
            });
            contextObj.getAmenities();
        });

        
    }

    public changeEnableMenu(){
        var contextObj = this;
        contextObj.enableMenu = [1,2,3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Amenities added", 5);
        } 
    }

    public getAmenities() {
        var contextObj = this;
        this.schedulingService.getAmenitiesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.amenitySource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
                contextObj.changeEnableMenu();
        });
    }

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id : any) {
        if (event.value == 1) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 2) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Amenity";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getAmenityAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8647 });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        })
    }
    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Amenity";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.getAmenityEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8647 });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public onMenuDeleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Amenity", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Amenity in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    }

    okDelete(event: Event) {
        this.deleteAmenity();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public deleteAmenity() {
        var contextObj = this;
        this.schedulingService.postDeleteAmenityDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.amenitySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.amenitySource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Amenity deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Amenity in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });

    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getAmenities();
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getAmenities();
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.amenitySource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.amenitySource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.amenitySource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
}