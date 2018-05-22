import {Component, OnInit, Input, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import {EmployeeService} from '../../../Models/Employee/employee.services';
import { GeneralFunctions} from '../../../Models/Common/General';
import {EmployeeDrawingService} from '../../../models/employee/employeedrawing.services';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'


@Component({
    selector: 'relinkEmployeeList',
    templateUrl: 'app/Views/Employee/Drawings/relinkEmployeeList.html',
    providers: [EmployeeService, NotificationService, ConfirmationService, EmployeeDrawingService],
    inputs: ['InpItemsource','count'],
    directives: [GridComponent, SubMenu,PagingComponent, Notification, ConfirmationComponent, SlideComponent],


})

export class RelinkEmployeeListComponent {
    pageIndex: any = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC', showContextMenu: true };
    itemsSource: any[];
    fieldObject: IField[];
    public totalItems: number = 1000;
    public itemsPerPage: number = 200;
    refreshgrid;
    InpItemsource: any[];
    count: number;
    relinkEmployeeMenu;
    relinkEmployeeTotalItems: number = 1
    enablerelinkEmployeeMenu = [0];
    @Output() relinkSubmit = new EventEmitter();



    constructor(private employeeService: EmployeeService, private http: Http, private empDrawingService: EmployeeDrawingService, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions) {
        this.empDrawingService = new EmployeeDrawingService(this.http);      

    }

    ngOnInit() {
        this.relinkEmployeeMenu = [{
            "id": 1,
            "title": "Re Link",
            "image": "Revise",
            "path": "Revise",
            "submenu": null
           
        }]
        var contextObj = this;
        var fieldcopy;
        this.empDrawingService.getRelinkEmployeeField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                console.log('fields', contextObj.fieldObject);
            }
        });

        this.dataLoad();
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();

    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    }
    dataLoad() {
        var contextObj = this;
        if (contextObj.InpItemsource) {
            if (contextObj.count == 0)
                contextObj.enablerelinkEmployeeMenu = [];
            contextObj.itemsSource = contextObj.InpItemsource;
            contextObj.totalItems = contextObj.count;
        }
    }
    updaterelinkEmployeeMenu(event) {
        switch (event.value) {
            case 1: this.RelinkEmployee();
                break;
        }
    }
    RelinkEmployee() {
        var rowdata = [];
        if (this.inputItems.selectedIds.length == 1)
            rowdata.push(this.inputItems.rowData)
        else if (this.inputItems.selectedIds.length > 1)
            rowdata = this.inputItems.rowData;
        this.relinkSubmit.emit(rowdata);
    }
   
}