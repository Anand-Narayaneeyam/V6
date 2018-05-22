import {Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { EmployeeService } from '../../../Models/Employee/employee.services';

@Component({
    selector: 'review-resource',
    templateUrl: 'app/Views/Employee/Move Review/reviewEmpMoveResourceList.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, EmployeeService]
    
})

export class ReviewEmpMoveResourceListComponent {
    fieldObject: IField[];
   
    itemSource: any[];
    inputItems: IGrid = { dataKey: "ResourceId", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    refreshgrid: any;
    pageTitle: string = "";
    showslide: boolean = false;
    @Input() selEmpId;
    @Input() moveReqId;
    @Output() resoureDeleteEmit = new EventEmitter();
    menuData = [
        {
            "id": 1,
            "title": "Remove",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
   
    constructor(private empService: EmployeeService ,private notificationService: NotificationService, private genFun: GeneralFunctions) {
    }

    ngOnInit(): void {

        var contextObj = this;
        this.empService.getReviewMOveResourceColumns().subscribe(function (resultData) {
            debugger
            contextObj.fieldObject = resultData["Data"];         
        });
        this.dataLoad(1, contextObj);

    }

    public dataLoad(target?: number, context?: any) {

        context.empService.getReviewMoveResourceListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.moveReqId, context.selEmpId).subscribe(function (resultData) {
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
    public onSubMenuChange(event: any) {
              
         this.showslide = true;                                      
    }

 
    private yesResourceOnClick($event) {
        var contextObj = this;
        this.empService.deleteEmpMoveResourceDetails(contextObj.selEmpId, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                let retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];                 
                contextObj.showslide = false;
                contextObj.notificationService.ShowToaster("Resource removed", 3);
                contextObj.resoureDeleteEmit.emit({ "ResourceCount": contextObj.totalItems});

            }
        });
    }

    private closeResourceOnClick(event) {
        this.showslide = false;
    }

}