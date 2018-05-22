import {Component, Input, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {WorkOrdereService} from '../../../models/workorder/workorder.service'

@Component({
    selector: 'setworkflow-editablefields',
    templateUrl: './app/Views/Common/Set Workflow/setworkflow-editablefields.html',
    directives: [Notification, GridComponent],
    providers: [WorkFlowService, HTTP_PROVIDERS, NotificationService, WorkOrdereService],
    inputs: ['selectedId', 'worktype']
})

export class SetWorkflowEditableFieldsComponent {
    selectedId: any;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "ReportFieldId", groupBy: ["Workflow Entity"], allowAdd: false, allowSort: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    pageDetails: string;
    worktype: any;
    spacefields = [];
    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private workorderservice: WorkOrdereService) {
    }
    ngOnInit() {
        var context = this;
        this.workorderservice.GetSpaceFieldList(this.worktype, 3, '', '').subscribe(function (result) {
            console.log('space field data', result)
            for (var i = 0; i < JSON.parse(result["Data"]["FieldBinderData"]).length; i++) {
                if (JSON.parse(result["Data"]["FieldBinderData"])[i]["Select"] == true) {
                    context.spacefields.push(JSON.parse(result["Data"]["FieldBinderData"])[i]["ReportFieldId"])
                }
            }
        })
    }

    ngAfterViewInit() {
        if (this.selectedId != undefined) {
            var contextObj = this;
            this.workFlowService.getWorkFlowEditableFields().subscribe(function (resultData) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId == 1306) {
                        item.IsVisible = false;
                    }
                })
                contextObj.fieldObject = (resultData["Data"]);
            })
            this.workFlowService.getWorkFlowEditableFieldsList(this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            });
        }
    }

    updateWorkflowEditableFields() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < this.itemsSource.length; i++) {
            arrayList.push({
                Id: this.itemsSource[i]["ReportFieldId"],
                EntityCategoryId: this.itemsSource[i]["EntityCategoryId"],
                IsEdit: this.itemsSource[i]["Editable"],
                IsVisible: this.itemsSource[i]["Visible"]
            });
        }
        this.workFlowService.postSubmitWorkflowEditableFields(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Editable Fields updated", 3);
            } else {
                contextObj.notificationService.ShowToaster("Action Failure", 5);
            }
        });
    }

    checkBxClick(event) {
        var context = this;
        var check = true;
        var curSelectId = event.dataKeyValue;
        var selectedEntity = this.inputItems.rowData["EntityCategoryId"];
        if (event.colfieldObj["FieldId"] == 1272) {
            this.itemsSource.find(function (item) {
                if (item["ReportFieldId"] == curSelectId && item["EntityCategoryId"] == selectedEntity) {
                    if (selectedEntity == 1 || selectedEntity == 7 || selectedEntity == 19) {
                        if (item["Editable"] == true) {
                            item["Visible"] = item["Editable"];
                        } else if (item["Editable"] == false) {
                            item["Visible"] = true;
                        }
                        return true;
                    }
                    else {
                        if (context.spacefields.indexOf(event.dataKeyValue) > -1) {
                            context.notificationService.ShowToaster('Space Fields cannot be edited', 5);
                            // item["Editable"] = false;
                            check = false;
                        }
                        if (!check)
                            item["Editable"] = false;
                        return true;
                    }
                } else return false;
            })
        } else if (event.colfieldObj["FieldId"] == 1273) {
            this.itemsSource.find(function (item) {
                if (item["ReportFieldId"] == curSelectId && item["EntityCategoryId"] == selectedEntity && item["Editable"] == true && item["Visible"] == false) {
                    item["Visible"] = true;
                    return true;
                } else return false;
            })
        }
    }
}

export interface ReportFieldArray {
    Id: number;
    EntityCategoryId: number;
    IsEdit: boolean;
    IsVisible: boolean;
}

