
import {Component, ChangeDetectorRef, EventEmitter, Output, Input, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component';
import {OpenDrawing} from '../../common/opendrawing/opendrawing.component';
import {FloorDrawingListComponent} from '../../common/drawingdetails/floordrawing-list.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AdministrationService} from '../../../models/administration/administration.service'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
@Component({
    selector: 'archived-drawings',
    templateUrl: './app/Views/CAI/Drawings/archivedrawings.component.html',
    directives: [TabsComponent, TabComponent, SubMenu, OpenDrawing, FloorDrawingListComponent, Notification, SplitViewComponent],
    providers: [NotificationService, AdministrationService]
})
export class ArchivedDrawings {
    @Input() archiveId: number;
    @Input() drawingCount: number;
    @Input() selectedrawingId: number;
    selectedTab: number = 0;
    moduleId: number = 12;
    pageTarget: any = 10;
    floorTabName: string = "Drawings";
    selectedFloorIds: number[];
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
    public totalItems: number = 0;
    drawingId: number;
    revisionNo: number;
    drawingCategoryId: number=1;
    drawingType: number = 1;
    objiWhiz: any; // for drawing object
    closeTbFuns: any = undefined;
    splitViewDataGrid: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    assignedEmpId: number[] = [];
    dwgDetails = "[]";
    menuData = [
        {
            "id": 4,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null
        }];
    enableMenu = [4];
    constructor(private notificationService: NotificationService, private administrationService: AdministrationService) {
    }
    getSelectedTab(event: any) {
    }
    ngOnInit() {
        if (this.drawingCount == 1) {
            this.drawingId = this.selectedrawingId;
            this.revisionNo = -1;
            this.viewDrawings();
        }
    }
    updateFloorDrawingSelectedID(event: any) {

        var contextObj = this;
        contextObj.selectedFloorIds = event["scopefloordrawing"];
        contextObj.totalItems = event.totalItems;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.revisionNo = event.rowData['Revision No.'];
    }
    public onSubMenuChange(event: any) {
        var contextObj = this;
        if (event.value == 4) {
            contextObj.splitViewDataGrid.secondaryArea = 79;
            if (contextObj.selectedFloorIds)
                if (contextObj.selectedFloorIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);

                } else {
                    this.viewDrawings();
                }
        }
    }
    viewDrawings() {
        var contextObj = this;
                this.menuData = null;
                setTimeout(function () {
                    contextObj.IsOpenDrawingComponentActive = true;
                    contextObj.floorTabName = "View Drawing";
                   // contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                }, 50);
                setTimeout(function () {
                    contextObj.selectedTab = 0;
                }, 100);
    }
    //public updateCrossSession(SelectedId) {
    //    this.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
    //    });
    //}
    outDrawingObject(event: any) {
        this.objiWhiz = event.dwgObject;
      
    }
    onTabBeforeClose($event) {
        var contextObj = this;
        this.closeTbFuns = $event;
        if (contextObj.objiWhiz) {
            contextObj.objiWhiz.close(function (returnCode) {
                contextObj.onTabClose();
            });
        }
    }
    onTabClose() {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
    }

}