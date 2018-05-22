import { Component, Output, EventEmitter, Input, OnInit, ViewEncapsulation, SimpleChange, OnChanges} from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { ObjectDataListinDrawingComponent } from './objectData-listindrawing.component'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component'

@Component({
    selector: 'objectDataindrawing',
    templateUrl: './app/Views/Objects/Data/objectDataindrawing.component.html',
    directives: [SectionComponent,TabsComponent, TabComponent, ObjectDataListinDrawingComponent, FloorSelectionComponent],
    providers: [RealPropertyService, NotificationService],
    inputs: ["DrawingId", "moduleId", "SiteId","isBuildingDrawing"],
    encapsulation: ViewEncapsulation.None
})

export class ObjectDataComponentindrawing{   
    //pageTitle: string = "Data";
    //pagePath: string = " Assets / Drawings";
    selectedTab: number = 0;
    DrawingId: number;
    moduleId: number;
    objectCategoryId: number;
    @Output() showZoomOnClick = new EventEmitter();
    @Output() showInDrawingOnClick = new EventEmitter();
    @Output() ObjectPlaceOnClick = new EventEmitter();
    @Output() ObjectDelinkOnClick = new EventEmitter();
    @Output() UpdatedSuccess = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    @Output() Attachmentcounts = new EventEmitter();
    @Input() updateDataSource: any[];
    @Input() Targetforstyle: any;
    @Input() IsObjectPlaced: boolean;
    @Input() IsObjectMoved: boolean;
    @Input() ObjectDelinked: number[]=[];
    @Input() selectedRow: any;
    floorSelected: boolean = false;
    selectedDrawingIds: string = ''
    isBuildingDrawing: boolean;

    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService) {        
        this.selectedDrawingIds = '';
    }
    
    ngOnInit() {
        this.selectedDrawingIds = '21';
        switch (this.moduleId) {
            case 6:
                this.objectCategoryId = 3;
                break;
            case 7:
                this.objectCategoryId = 1;
                break;
            case 8:
                this.objectCategoryId = 2;
                break;
            case 17:
                this.objectCategoryId = 8;
                break;
            case 18:
                this.objectCategoryId = 9;
                break;
            case 24:
                this.objectCategoryId = 20;
                break;
            case 25:
                this.objectCategoryId = 10;
                break;
            case 26:
                this.objectCategoryId = 11;
                break;
            case 27:
                this.objectCategoryId = 12;
                break;
        }
    }
    getSelectedTab(event: any) {
        this.selectedDrawingIds = '';
        this.selectedTab = event[0];
        this.floorSelected = false;
    }

    getSelectedIds(event: any) {

        this.selectedDrawingIds = '';
        for (var count = 0; count < event.SelectedIds.length; count++) {
            this.selectedDrawingIds = this.selectedDrawingIds + event.SelectedIds[count] + ',';
        }
        this.selectedDrawingIds = this.selectedDrawingIds.slice(0, -1);
        this.floorSelected = true;
    }
    objectShowInDrawingOnClick(event: any) {        
        if (event["selectedIds"].length > 0)
            this.showInDrawingOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
        //else {
        //    this.assetsDrawingObj.showSelectedAssetInDrawing(event['SelectedId'][0], event.RowData.BomaHandle, function (retcode) {
        //    });
        //}

    }

    objectShowZoomOnClick(event: any) {    
    if (event["selectedIds"].length > 0)
        this.showZoomOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
    //else {
    //    this.assetsDrawingObj.showSelectedAssetInDrawing(event['SelectedId'][0], event.RowData.BomaHandle, function (retcode) {
    //    });
    //}

    }
    PlaceObjectOnClick(event: any) {   
    
       // if (event["selectedIds"].length == 1)
        this.ObjectPlaceOnClick.emit({ "selectedIds": event["selectedIds"], "rowData": event["rowData"] });
    }

    DelinkObjectOnClick(event: any) {        
        if (event["selectedIds"].length == 1)
            this.ObjectDelinkOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
    }

    UpdatedSuccessOnClick(event: any) {      
        if (event["updatedData"].length > 0)
            this.UpdatedSuccess.emit({ "updatedData": event["updatedData"] });
    }
    onSearchObjectInDrawing(data) {
        this.onSearchInDrawing.emit(data);
    }
    AttachmentcountOnClick(event: any) {       
        this.Attachmentcounts.emit(event);
    }
}