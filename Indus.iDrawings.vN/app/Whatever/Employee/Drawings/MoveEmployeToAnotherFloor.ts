import {Component, ChangeDetectorRef, EventEmitter, Output, Input, KeyValueDiffers, ElementRef, OnInit, forwardRef} from '@angular/core';
import {NgControl} from '@angular/common';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component';
import {OpenDrawing} from '../../../whatever/common/opendrawing/opendrawing.component';
import {FloorDrawingListComponent} from '../../common/drawingdetails/floordrawing-list.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AdministrationService} from '../../../models/administration/administration.service'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';


@Component({
    selector: 'MoveEmploye-ToAnotherFloor',
    templateUrl: './app/Views/Employee/Drawings/MoveEmployeToAnotherFloor.html',
    directives: [TabsComponent, TabComponent, SubMenu, forwardRef(() => OpenDrawing), FloorDrawingListComponent, Notification, SplitViewComponent],
    providers: [NotificationService, AdministrationService]

})

export class EmployeMoveToAnotherFloorView {
    //@Input() BlinkOutSideDrawings: any;
    //@Input() objectCategoryId: any;
    //@Input() AssociationId: any;
    //@Input() PrimaryObjectId: any;
    @Input() UpdateDrawingGridMoveEmployee: any;
    @Input() moveEmpDataForAnotherFloor: any;
    @Input() previousDrawingId: any;
    @Input() moveEmpDetailsForAnotherFloor: any;
    @Input() moduleId: number;
    @Input() connectivityListInputs: any;
    ConnectivityList: any;
    selectedTab: number = 0;
    floorTabName: string = "Drawings";
    selectedFloorIds: number[];
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
    public totalItems: number = 0;
    drawingId: number;
    revisionNo: number;
    drawingCategoryId: number;
    drawingType: number = 1;
    objiWhiz: any; // for drawing object
    closeTbFuns: any = undefined;
    pageTarget: number = 6;
    dwgDetails = "[]";
    secondCanvasIdName: string = "iWhizCanvas_3";
    loadingIndicatorIdName: string = "loading-indicator_3";
    @Output() DrawingMoveEmployeesDetaills= new EventEmitter();
    //@Output() onDrawingClose = new EventEmitter();
    splitViewDataGrid: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
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

    ngOnInit() {
        debugger
        this.ConnectivityList = this.connectivityListInputs;
      //  this.BlinkOutSideDrawings = this.BlinkOutSideDrawings;
    }

    getSelectedTab(event: any) {
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
        if (event.value == 4) {
            this.viewDrawings();
        }
    }
    viewDrawings() {
        var contextObj = this;
        contextObj.splitViewDataGrid.secondaryArea = 79;
        if (contextObj.selectedFloorIds)
            if (contextObj.selectedFloorIds.length > 1) {
                contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);

            } else {
                this.menuData = null;
                //if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                //    this.IsOpenDrawingComponentActive = false;
                //    this.viewDrawing = false;
                //}
                setTimeout(function () {
                    contextObj.IsOpenDrawingComponentActive = true;
                    contextObj.floorTabName = "View Drawing";
                    contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                }, 50);
                setTimeout(function () {
                    contextObj.selectedTab = 0;
                }, 100);
            }
    }
    public updateCrossSession(SelectedId) {
        this.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
        });
    }
    outDrawingObject(event: any) {
        this.objiWhiz = event.dwgObject;
        //   this.outDrawingobject.emit(event);
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
        // this.onDrawingClose.emit({});
    }
    EmployeesDetailsSelectedForMove(empdata: any) {
        debugger
        this.DrawingMoveEmployeesDetaills.emit({
            EmployeesDetailsSelectedForMove: empdata
        })
    }
}