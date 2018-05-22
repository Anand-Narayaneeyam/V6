import {Component, ChangeDetectorRef, EventEmitter, Output, Input, ViewEncapsulation, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { EmployeeService } from '../../../../models/employee/employee.services';

@Component({
    selector: 'move-history',
    templateUrl: './app/Views/Employee/Tools/Rollback Moves/movehistorylist.component.html',
    directives: [Notification, GridComponent,PagingComponent],
    providers: [NotificationService, EmployeeService],
    encapsulation: ViewEncapsulation.None
})
export class MoveHistory implements OnInit {
    @Input() fieldObject: any;
    @Input() employeeName: string;
    @Input() moveId: number;
    inputItems: IGrid = { dataKey: "MoveId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    itemsSource: any[];
    menuData = [];
    enableMenu = [1, 2];
    ngOnInit() {
        this.fieldObject = JSON.parse(JSON.stringify(this.fieldObject));
        let rptField = [871,868,7425];
        let count = rptField.length;
        this.fieldObject.find(function (item) {
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
        this.dataLoad();
    }
    constructor(private notificationService: NotificationService, private empServices: EmployeeService) {
        var contextObj = this;
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad();
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    dataLoad() {
        var contextObj = this;
        this.empServices.getEmployeeMovesForRollBackHistory(this.moveId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            }
        });
    }
}