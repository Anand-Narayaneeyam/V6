import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import { IField} from '../../../../Framework/Models//Interface/IField';
import { PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { OpenDrawing } from '../../../common/opendrawing/opendrawing.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { TabsComponent } from '../../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../../Framework/Whatever/Tab/tab.component'
import { EmployeeService} from '../../../../Models/Employee/employee.services';

@Component({
    selector: 'scenario-drawings',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/scenario-drawing.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, TabsComponent, TabComponent, OpenDrawing],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService]
})

export class ScenarioDrawingComponent implements OnInit{
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    //drawingId: number = 0;
    //revisionNo: number = -1;
    //pageTarget: number = 5;
    //drawingType: number = 1;
    //moduleId: number = 5;
    inputItems: IGrid = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, sortCol: "[DrawingId]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    fieldObject: any[];
    itemSource: any[];
    fieldDetScenarioDrawing: IField[];
    @Input() selctedRowData;
    selectedTab: number=0;
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
   // scenarioDetails: any;
    menuData = [
        {
            "id": 0,
            "title": "View Drawing",
            "image": "View",
            "path": "View",
            "submenu": null
        }
    ];
    enableMenu = [0];
    splitViewDataGrid: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };

    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService) {
    }
    getSelectedTab(event: any) {
        this.selectedTab = event[0];
    }
    ngOnInit() { 
        var contextObj = this;             
        this.employeeService.getScenarioDrawingListColumns().subscribe(function (resultData) {             
                contextObj.fieldDetScenarioDrawing = resultData["Data"];
        });       
       this.dataLoad(1, contextObj);         
    }
    public dataLoad(target?: number, context?: any) {
        context.employeeService.scenarioListDrawingsData(context.selctedRowData["Id"], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
         
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context._notificationService.ShowToaster("No Drawings exist", 2);
                context.enableMenu = [];
            }
        });

    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
    public onSubMenuChange(event: any) {     
        if (event.value == 0) /*View Drawing*/ 
        {
            this.openDrawing();
        }
    }
    //onDrawingListSelectionChange(event: any) {
        //this.drawingId = event.rowData.DrawingId;
        //this.scenarioDetails = event.rowData;
    //}

    public openDrawing() {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);

        } else {
            contextObj.inputItems.rowData.ScenarioId = contextObj.selctedRowData["Id"];
            contextObj.inputItems.rowData.ScenarioStatusId = contextObj.selctedRowData["StatusId"];
            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                this.IsOpenDrawingComponentActive = false;
                this.viewDrawing = false;
            }
            setTimeout(function () {
                contextObj.IsOpenDrawingComponentActive = true;
                contextObj.viewDrawing = true;
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 100);
        }
    }
}
