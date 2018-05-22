import {Component, Input, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';

@Component({
    selector: 'setworkflow-permissions',
    templateUrl: './app/Views/Common/Set Workflow/setworkflow-permissions.html',
    directives: [Notification, FieldComponent, GridComponent],
    providers: [WorkFlowService, HTTP_PROVIDERS, NotificationService],
    inputs: ['selectedId', 'isGeneral' ]
})

export class SetWorkflowPerissionsComponent {
    fieldDetailsWorkflowPermissions: IField[];
    selectedId: any;
    btnName: string;
    pageDetails: string;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "ReportFieldId", groupBy: ["Workflow Entity"], allowAdd: false, allowSort: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;   
    isGeneral: boolean = false; 

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService) {
    }

    ngAfterViewInit() {
        if (this.selectedId != undefined) {
            var contextObj = this;            
            this.workFlowService.getWorkflowPermissionFields().subscribe(function (resultData) {
                contextObj.fieldDetailsWorkflowPermissions = (resultData["Data"]);
                contextObj.fieldDetailsWorkflowPermissions[0].IsVisible = false;
                contextObj.fieldDetailsWorkflowPermissions[4].FieldLabel = "Has Permission"
            })
            this.workFlowService.getWorkFlowPermissionsList(this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    if (contextObj.isGeneral) {
                        var removeArr = [2];
                        contextObj.itemsSource = contextObj.itemsSource.filter(function (item) {
                            return removeArr.indexOf(item.Id) == -1;
                        })
                    }
                    //contextObj.fieldDetailsWorkflowPermissions[5].FieldLabel = "";
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            });
        }
        //this.btnName = "Save Changes";
        //if (this.selectedId != undefined) {
        //    debugger
        //    var contextObj = this;
        //    this.workFlowService.getWorkflowPermissions(contextObj.selectedId).subscribe(function (resultData) {
        //        contextObj.fieldDetailsWorkflowPermissions = resultData["Data"];
        //    });
        //}
    }

    updateWorkflowPermissions() {
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        //arr.push({ ReportFieldId: 5825, Value: contextObj.selectedId.toString() });
        for (let i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Has Permission"] == true || this.itemsSource[i]["Has Permission"] == 1)
            {
                arr.push({ PermissionId: contextObj.itemsSource[i]["Id"],
                EntityCategoryId: contextObj.itemsSource[i]["EntityCategoryId"] });               
            }           
        }
        //this.pageDetails = event["fieldobject"];             
        //arr = JSON.parse(this.pageDetails);
        //for (let i = 0; i < arr.length; i++) {
        //    if (arr[i].ReportFieldId == 5825) {
        //        arr[i].Value = this.selectedId;
        //    }
        //} 
        this.workFlowService.postSubmitWorkflowPermissions(JSON.stringify(arr), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Permissions updated", 3);
            }else{
                contextObj.notificationService.ShowToaster("Action Failure", 5);                
            }
        });   
    }
}

export interface ReportFieldArray {
    PermissionId: number;
    EntityCategoryId: number;
    //HasPermission: boolean;    
}