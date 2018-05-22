import {Component, Input, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { DocumentService } from '../../../Models/Documents/documents.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
@Component({
    selector: 'optionalfields',
    templateUrl: './app/Views/Documents/General Settings/optionalFields.html',
    directives: [Notification, GridComponent, PagingComponent],
    providers: [DocumentService, HTTP_PROVIDERS, NotificationService]
})

export class OptionalFieldsComponent {
    optionalFieldsList: IField[];
    fieldObject: IField[];
    fieldSubscriptionCategoryId: number = 1;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    constructor(private documentService: DocumentService, private notificationService: NotificationService) {

    }

    ngOnInit() {
        var context = this;
        this.documentService.getOptionalFieldsListFields().subscribe(function (result) {
            context.fieldObject = (result["Data"]);
            if (context.fieldObject.length > 1) {
                context.documentService.getOptionalFieldsListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldSubscriptionCategoryId).subscribe(function (result) {
                    context.totalItems = result["Data"].DataCount;
                    context.itemsPerPage = result["Data"].RowsPerPage;
                    var objItemSource = JSON.parse(result["Data"].FieldBinderData);
                    objItemSource.find(function (item) {
                        if (item.Id == 974) {
                            item["Field Name"] = "Uploaded By";
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
                    context.itemsSource = objItemSource;//JSON.parse(result["Data"].FieldBinderData);
                });
            } else
                context.notificationService.ShowToaster("No Optional Fields Exist", 2);
        });
    }

    updateOptionalFieldSettings() {
        var contextObj = this;
        var fieldobj = new Array<FieldSubscriptionArray>();
        var contextObj = this;
     
        for (var item of this.itemsSource) {
            fieldobj.push({
                FieldSubscriptionCategoryId: this.fieldSubscriptionCategoryId,
                ReportFieldId: item['Id'],
                IsSubscribed: item['Required?']
            })
        }

        this.documentService.updateOptionalFields(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Optional Field Settings updated", 3);
            } else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });;
    }
}

export interface FieldSubscriptionArray {
    FieldSubscriptionCategoryId: number;
    ReportFieldId: number;
    IsSubscribed: boolean;
}