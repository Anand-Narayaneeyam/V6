﻿import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionComponent} from './floor-selection.component'
import {SpaceDataGridComponent} from './spacedata-grid.component'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {IField} from '../../../Framework/Models/Interface/Ifield'
import {SpaceService} from '../../../Models/Space/space.service'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {OpenDrawing} from '../../common/opendrawing/opendrawing.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'

@Component({
    selector: 'spacedata',
    templateUrl: './app/Views/Space/Space Data/spacedata.component.html',
    directives: [TabsComponent, TabComponent, FloorSelectionComponent, SpaceDataGridComponent, PageComponent, DisplaySettingsComponent, OpenDrawing, SplitViewComponent],
    providers: [SpaceService, NotificationService]
})

export class SpaceComponent {
    pagePath = "Space / Data";
    moduleId: number = 3;//space
    selectedFloorIds: any[];
    fieldObject: IField[];
    selectedTab: number = 0;
    tabDeleteIndex: number = 0;
    isSpaceDataTab = false;
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
    spaceTabEnabled: boolean = false;
    selectedSpaceIds: any;
    drawingType: number = 1;
    dwgPageTarget: number;
    objiWhiz: any;
    selectedDrawingId: number;
    splitview: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    constructor(private _spaceService: SpaceService, private _notificationService: NotificationService) {

    }
    public getSelectedTab(event: any) {
        var contextObj = this
        switch (event[0]) {
            case 0:
                if (event[1] && this.spaceTabEnabled) {
                    this.closeTab(1);
                    this.spaceTabEnabled = false;
                }
                break;
        }
         contextObj.selectedTab = event[0];

    }

    public closeTab(index: number) {
        var contextObj = this
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    }

    public onTabClose(event) {
        this.selectedTab = 0;
        this.spaceTabEnabled = false;
    }

    getSelectedIds(event) {
        var contextObj = this;
        this.selectedFloorIds = event.SelectedIds;
        if (this.selectedFloorIds) {
            contextObj.pagePath = "Space / Data";
            contextObj.spaceTabEnabled = true;

            setTimeout(function () {
                contextObj.spaceTabEnabled = true;
            }, 100);
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 200);
            setTimeout(function () {
                //contextObj.documentTabEnabled = true;
                contextObj.isSpaceDataTab = true;
            }, 300);
        
        }
    }

    getDrawingObject(event) {
        debugger
        this.objiWhiz = event.dwgObject;
    }
    spShowInDrawingOnClick(event: any) {
            this.dwgPageTarget = 3;
            this.selectedDrawingId = event["drawingId"];
            this.openDrawing(event["selectedIds"]);
    }
    spShowZoomOnClick(event: any) {
            this.dwgPageTarget = 4;
            this.selectedDrawingId = event["drawingId"];
            this.openDrawing(event["selectedIds"]);
    }
    openDrawing(selectedIds) {
        // if (selectedFloorIds.length == 1) {
        var contextObj = this;
        contextObj.selectedSpaceIds = selectedIds;
            //        setTimeout(function () {
            //            contextObj.IsOpenDrawingComponentActive = true;
            //            contextObj.selectedSpaceIds = selectedIds;
            //}, 100);

            if (contextObj.IsOpenDrawingComponentActive) {
                this.IsOpenDrawingComponentActive = false;
            }
            setTimeout(function () {
                contextObj.IsOpenDrawingComponentActive = true;
            }, 50);
            contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
            //setTimeout(function () {
            //    contextObj.selectedTab = 2;
            //}, 100);
        //}
       // else 
          //  this._notificationService.ShowToaster("The selected records are of different floors", 2)
    }
    onSecondaryClose() {
        console.log("objiWhizobjiWhiz", this.objiWhiz);
        if (this.objiWhiz) {
            this.IsOpenDrawingComponentActive = false;
            this.objiWhiz.close(function (returnCode) {
            });
        }
    }
}


    //displaySettingSpaceData(event: any)
    //{
    //    if (event != "cancel") {
    //        //server call to update
    //        this._notificationService.ShowToaster("Field Order for Space Data updated", 3)

    //    }
    //    this.splitviewInput.showSecondaryView = false;
    //}