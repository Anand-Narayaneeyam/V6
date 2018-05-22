/// <reference path="../../../models/employee/employee.services.ts" />
import {Component, Output, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import {EmployeeService} from '../../../Models/Employee/employee.services'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({

    selector: 'optionalfield',
    templateUrl: 'app/Views/Employee/General Settings/optionalFields.component.html',
    directives: [Notification, GridComponent, PagingComponent],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService]
})

export class OptionalFieldComponent
{
    optionalFieldsList: IField[];
    fieldObject: IField[];
    fieldSubscriptionCategoryId: number = 2;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;



    constructor(private employeeService: EmployeeService, private notificationService: NotificationService) {
    }

    ngOnInit() {
        var context = this;
        this.employeeService.getOptionalFieldsListFields().subscribe(function (result) {
            context.fieldObject = (result["Data"]);
            if (context.fieldObject.length > 1) {
                context.employeeService.getOptionalFieldsListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldSubscriptionCategoryId).subscribe(function (result) {
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
        debugger;
        for (var item of this.itemsSource) {
            fieldobj.push({
                FieldSubscriptionCategoryId: this.fieldSubscriptionCategoryId,
                ReportFieldId: item['Id'],
                IsSubscribed: item['Required?']
            })
        }

        this.employeeService.updateOptionalFields(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Optional Field Settings updated", 3);
            } else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });;
    }

    onCellEdit(event)
    {        
        var context = this;
        if (event["dataKeyValue"] == 7576) {
            context.itemsSource.find(function (item) {
                if (item.Id == 7577) {
                    item["IsSubscribed"] = event["isChecked"];
                    item["Required?"] = event["isChecked"];
                    return true;
                }
                else
                    return false;
            });
        } else if (event["dataKeyValue"] == 7577) {
            context.itemsSource.find(function (item) {
                if (item.Id == 7576) {
                    item["IsSubscribed"] = event["isChecked"];
                    item["Required?"] = event["isChecked"];
                    return true;
                }
                else
                    return false;
            });
        }
    }

}

export interface FieldSubscriptionArray {
    FieldSubscriptionCategoryId: number;
    ReportFieldId: number;
    IsSubscribed: boolean;
}
