import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'

@Component({
    selector: 'reviewHistory',
    templateUrl: './app/Views/WorkOrder/Review/Review History/reviewHistory.html',
    directives: [PageComponent, GridComponent],
    providers: [NotificationService, WorkOrdereService],
    inputs: ['workflowEntityId'],
    encapsulation: ViewEncapsulation.None
})

export class ReviewHistory implements OnInit {



    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", allowSort: false };
    itemsSource: any[];
    fieldObject: IField[];
    workflowEntityId: number;

    constructor(private notificationService: NotificationService, private workOrderService: WorkOrdereService) { }

    ngOnInit() {
        var contextObj = this;
        this.workOrderService.getReviewHistoryColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });

    }

    dataLoad() {
        var contextObj = this;
        contextObj.workOrderService.getReviewHistoryData(contextObj.workflowEntityId).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        });
    }
}




