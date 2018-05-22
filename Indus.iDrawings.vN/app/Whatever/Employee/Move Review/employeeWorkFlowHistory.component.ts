
import {Component, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { EmployeeService } from '../../../Models/Employee/employee.services';

@Component({
    selector: 'empreviewhistory',
    templateUrl: 'app/Views/Employee/Move Review/employeeWorkFlowHistory.component.html',
    directives: [GridComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, EmployeeService]

})

export class EmpWorkFlowHistory {
    @Input() workflowCatId;
    fieldObject: IField[];
    itemSource: any[];
    inputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
   


    constructor(private empService: EmployeeService ) {
    }

    ngOnInit(): void {

        var contextObj = this;
        this.empService.getEmpWorkflowHistoryColumns().subscribe(function (resultData) {
         
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);

    }

    public dataLoad(target?: number, context?: any) {

        context.empService.getEmpWorkflowHistoryListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.workflowCatId).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {

                context.notificationService.ShowToaster("No Resources exist");

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
   
 
}