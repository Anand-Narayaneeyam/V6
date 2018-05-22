import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import {DocumentService} from '../../../Models/Documents/documents.service'
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'



@Component({
    selector: 'documentReviewHistory',
    templateUrl: 'app/Views/Documents/Approval Requests/reviewHistory.html',
    directives: [PageComponent, GridComponent],
    providers: [NotificationService, DocumentService],
    inputs: ['workflowEntityId'],
})

export class DocumentReviewHistory implements OnInit {



    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", allowSort: false };
    itemsSource: any[];
    fieldObject: IField[];
    workflowEntityId: number;

    constructor(private notificationService: NotificationService, private documentService: DocumentService) { }

    ngOnInit() {
        
        var contextObj = this;
        this.documentService.getReviewHistoryColumns().subscribe(function (result) {
            
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });

    }

    dataLoad() {
        var contextObj = this;
        contextObj.documentService.getReviewHistoryData(contextObj.workflowEntityId).subscribe(function (result) {
            
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        });
    }
    public onSort(objGrid: any) {
    }
}




