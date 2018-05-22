import {Component, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, Input } from '@angular/core';
import {NgControl} from '@angular/common';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { GeneralFunctions} from '../../../Models/Common/General';
import {SpaceService} from '../../../Models/Space/space.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
@Component({
    selector: 'relink-space',
    templateUrl: './app/Views/Space/Tools/relink-space.component.html',
    directives: [SubMenu, GridComponent, SlideComponent],
    providers: [SpaceService, NotificationService]

})

export class RelinkSpace {
    @Input() itemsSource;
    @Input() drawingId: number;
    @Input() spaceDetails: any;
    @Input() isNetCustomer: number;
    @Input() handlesNotInDB: any;
    @Output() hatchSpace = new EventEmitter();
    @Output() onRelinkClick = new EventEmitter();
    @Output() relinkSubmitSuccess = new EventEmitter();
    @Output() afterAllOrphansUpdated = new EventEmitter();
    enableMenu ;
    menuData= [{
        "id": 1,
        "title": "Re-Link",
        "image": "Revise",
        "path": "Re-Link",
        "submenu": null,
    },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
        },];
    fieldObject: IField[];
    inputItems: IGrid = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC" };
    notificationMessageArray: unlockNotifications[] = [];
    oldArea: number;
    newArea: number;
    showRelinkSlide: boolean = false;
    showDeleteSpaceDataSlide: boolean = false;
    selectedIndex: number;
    selectedFirstIndex: number;
    selectedSpaceDataIndex: number;
    totalItems: number = 0;
    deletedOrphanHandles: string = '';
    selectedNewHandle: string = '';
    selectedOldHandle: string = '';
    selectedSpaceDataIndexForUpdate: number;
    constructor(private generFun: GeneralFunctions, private spaceService: SpaceService, private notificationService: NotificationService) {
        var contextObj = this;
        contextObj.spaceService.getSpaceGridField().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                //if (contextObj.pageTarget == 2 || contextObj.pageTarget == 3) {
                let rptField = [1772, 488, 523];
                let count = rptField.length;
                result["Data"].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) >= 0) {
                        item.IsVisible = false;
                        count--;
                        if (count == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
                //}
                contextObj.fieldObject = result["Data"]
            }
        });
    }
    ngOnInit(): void {
        this.totalItems = this.itemsSource.length;
        if (this.spaceDetails.length > 0)
            this.enableMenu = [1, 2];
        else
            this.enableMenu = [2];
    }
    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1: this.relinkOnClick();
                break;
            case 2: this.deleteSpaceData();
                break;
        }
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad();
    }
    public dataLoad() {
        //this.spaceService.checkOrphanSpaceDetails(this.drawingId).subscribe(function (result) {

        //});
    }
    relinkOnClick() {
        debugger
        var selLength = this.inputItems.selectedIds.length;
        var contextObj = this;
        if (selLength == 0) {
            this.notificationService.ShowToaster("Select a Space", 2);
        } else if (selLength > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.onRelinkClick.emit(false);
            var selectedData = this.inputItems.rowData;
            this.selectedIndex = this.itemsSource.findIndex(function (el) { return el.SpaceId == contextObj.inputItems.selectedIds[0] });
            this.getOldAreaAndNewArea(1);
        }
        //this.isNetCustomer
    }
    relinkYesOnclick() {
        var contextObj = this;
        this.spaceDetails[this.selectedSpaceDataIndexForUpdate].SpaceId = this.inputItems.selectedIds[0];
        this.spaceDetails[this.selectedSpaceDataIndexForUpdate].IsNew = false;
        var selectedSpaceData = JSON.stringify([this.spaceDetails[this.selectedSpaceDataIndexForUpdate]]);
        this.spaceService.relinkSpaceOrphanRecords(selectedSpaceData).subscribe(function (result) {
            contextObj.setReturnRelinkMessages();
            let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.spaceDetails.splice(contextObj.selectedSpaceDataIndexForUpdate, 1);
            if (contextObj.spaceDetails.length == 0)
                contextObj.enableMenu = [2];
            contextObj.showRelinkSlide = false;
            contextObj.relinkSubmitSuccess.emit({ returnData: result.Data, totlaItems: contextObj.totalItems });
            if (contextObj.totalItems == 0)
                contextObj.afterAllOrphansUpdated.emit({ "newSpaces": contextObj.spaceDetails, "notificationMsg": contextObj.notificationMessageArray });
        });
    }
    relinkNoOnclick() {
        this.showRelinkSlide = false;
        if (this.selectedSpaceDataIndex != this.selectedFirstIndex)
            this.getOldAreaAndNewArea(2);
        else
            this.onRelinkClick.emit(true);
    }
    closeSlideDialog() {
        this.showRelinkSlide = false;
        this.showDeleteSpaceDataSlide = false;
    }
    getOldAreaAndNewArea(target: number) {
        this.oldArea = this.itemsSource[this.selectedIndex]["Gross Area"];
        this.newArea = 0;
        var contextObj = this;

        if (this.isNetCustomer) {
            if (target == 1) {
                this.selectedSpaceDataIndex = this.spaceDetails.findIndex(function (el) { return el.CarpetArea == contextObj.oldArea })
                if (this.selectedSpaceDataIndex == -1)
                    this.selectedSpaceDataIndex = 0;
                this.selectedFirstIndex = this.selectedSpaceDataIndex;
            }
            this.newArea = this.spaceDetails[this.selectedSpaceDataIndex]['CarpetArea'];
            this.selectedNewHandle = this.spaceDetails[this.selectedSpaceDataIndex]["CarpetHandle"];
            this.selectedOldHandle = this.itemsSource[this.selectedIndex]["CarpetHandle"];

        } else {
            if (target == 1) {
                this.selectedSpaceDataIndex = this.spaceDetails.findIndex(function (el) { return el.BOMAArea == contextObj.oldArea });
                if (this.selectedSpaceDataIndex == -1)
                    this.selectedSpaceDataIndex = 0;
                this.selectedFirstIndex = this.selectedSpaceDataIndex;
            }
            this.newArea = this.spaceDetails[this.selectedSpaceDataIndex]['BOMAArea'];
            this.selectedNewHandle = this.spaceDetails[this.selectedSpaceDataIndex]["BomaHandle"];
            this.selectedOldHandle = this.itemsSource[this.selectedIndex]["BomaHandle"];

        }
        this.hatchSpace.emit(contextObj.spaceDetails[this.selectedSpaceDataIndex]);
        this.selectedSpaceDataIndexForUpdate = this.selectedSpaceDataIndex;
        this.selectedSpaceDataIndex++;
        if (this.selectedSpaceDataIndex == this.spaceDetails.length)
            this.selectedSpaceDataIndex = 0;
        this.showRelinkSlide = true;
    }
    deleteSpaceData() {
        var selLength = this.inputItems.selectedIds.length;
        if (selLength == 0) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else
            this.showDeleteSpaceDataSlide = true;
    }
    deleteSpaceDataYesOnclick() {
        var contextObj = this;
        this.spaceService.deleteSpaceOrphanRecords(this.inputItems.selectedIds).subscribe(function (result) {
            if (result.StatusId == 1) {
                contextObj.setReturnDeleteMessages();
                for (var selectedId of contextObj.inputItems.selectedIds) {
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', [selectedId], contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                }
                if (contextObj.totalItems == 0)
                    contextObj.afterAllOrphansUpdated.emit({ "newSpaces": contextObj.getNewSpaceDetails(), "notificationMsg": contextObj.notificationMessageArray });
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.showDeleteSpaceDataSlide = false;
        });
    }
    deleteSpaceDataNoOnclick() {
        this.showDeleteSpaceDataSlide = false;
    }
    getNewSpaceDetails() {
        var newSpaceDetails = [];
        for (var item of this.spaceDetails) {
            if (item.SpaceId == 0)
                newSpaceDetails.push(item);
        }
        return newSpaceDetails;
    }
    setReturnRelinkMessages() {
        var handles = this.selectedOldHandle + "-" + this.selectedNewHandle;
        this.notificationMessageArray.push({ NotificationMessage: ' Orphan record re-linked (' + handles + ' ) ' })
    }
    setReturnDeleteMessages() {
        var handle;
        for (var spaceId of this.inputItems.selectedIds) {
            if (this.isNetCustomer)
                handle = this.itemsSource.find(function (el) { return el.SpaceId == spaceId })['CarpetHandle'];
            else
                handle = this.itemsSource.find(function (el) { return el.SpaceId == spaceId })['BomaHandle'];
            this.notificationMessageArray.push({ NotificationMessage: "Orphan record(s) deleted (" + handle + ") " })
        }
    }
}
export interface unlockNotifications {
    //RowIndex: number;
    NotificationMessage?: string;
    Status?: string;
    root?: boolean;
}