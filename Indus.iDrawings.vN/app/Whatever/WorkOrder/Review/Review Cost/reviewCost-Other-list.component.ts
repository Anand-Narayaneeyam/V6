import {Component, EventEmitter, AfterViewInit, Output} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { AdministrationService } from '../../../../Models/Administration/administration.service';

@Component({
    selector: 'reviewOtherCosts-list',
    templateUrl: './app/Views/WorkOrder/Review/Review Cost/reviewCost-Other-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['workrequestId', 'workFlowEntityIds', 'itemsSource', 'totalItems', 'inputItems', 'itemsPerPage', 'enableMenu'],
})

export class ReviewOtherCostComponent implements AfterViewInit {

    @Output() itemSourceUpdate = new EventEmitter();
    @Output() onSubmit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCostUpdate = new EventEmitter();

    fieldObject: IField[];
    workrequestId: number;
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid;
    totalItems: number;
    itemsPerPage: number;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    workFlowEntityIds: any[];
    cardButtonPrivilege = [false, false];
    enableMenu: number[];
    types: boolean = true;
    pageTitle: string = "New Cost";
    onFinalSubmitChange: boolean;
    //Form id : 252
     //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (252))
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": null

        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": null
        }//,
         //only for privilege check
        //{
        //    "id": 3,
        //    "title": "Edit",
        //    "image": null,
        //    "path": null,
        //    "isvisible": false,
        //    "privilegeId": 3500
        //},
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
         
        var contextObj = this;
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getReviewOtherCostsFields().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                contextObj.fieldObject = (result["Data"]);
                contextObj.dataLoad(1);
            }

        });


        //form id : 252***** PageId :732
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);

    }

    public dataLoad(target?: number) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getReviewOtherCostData(contextObj.getWorkFlowEntityReportFieldIdValues()).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.enableMenu = [1];
            }
            contextObj.itemSourceUpdate.emit({
                itemSource: contextObj.itemsSource,
                rowsPerPage: contextObj.itemsPerPage,
                totalItems: contextObj.totalItems,
                fieldObject: contextObj.fieldObject
            });
        });
    }

    public getWorkFlowEntityReportFieldIdValues() {
        var tempArray: ReportFieldIdValues[] = [];
        for (var item of this.workFlowEntityIds) {
            tempArray.push({
                ReportFieldId: 7486,
                Value: item
            })
        }
        return JSON.stringify(tempArray);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    }

    public onOtherCostSubmit(event) {
        var fieldObjectArray: ReportFieldIdValues[] = JSON.parse(event.fieldobject);
        if (this.isAlreadyExists(fieldObjectArray.find(function (item) { return item.ReportFieldId === 7487 }))) {
            this.notificationService.ShowToaster("Other Cost details already exists", 2);
            return;
        }
        fieldObjectArray.push({
            ReportFieldId: 7488,
            Value: 0
        });
        this.onSubmit.emit(fieldObjectArray); 
        var contextObj = this;
        setTimeout(function () {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }, 150);
    }

    public isAlreadyExists(addedCostItem: ReportFieldIdValues) {
        var otherCostItem: any = this.itemsSource.find(function (item) { return item["Cost Item"].toUpperCase() === addedCostItem.Value.toUpperCase() });
        return otherCostItem != undefined;
    }

    public onCellUpdate(event) {
        this.onCostUpdate.emit(event);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.workOrderService.loadReviewOtherCostsAdd().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetails(resultData["Data"]);
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public updateFieldDetails(fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            if (item.ReportFieldId == 5859) {
                item.FieldValue = contextObj.workFlowEntityIds[0];
            }
        });
        return fieldDetailsArray;
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    /*slide events*/
    public okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.onDelete.emit(this.inputItems.selectedIds);
    }

    public cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    public closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}
