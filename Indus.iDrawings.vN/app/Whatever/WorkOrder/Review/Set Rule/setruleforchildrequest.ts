import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { CustomCheckBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { CustomRadioComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'


@Component({
    selector: 'setrule-childrequest',
    templateUrl: './app/Views/WorkOrder/Review/Set Rule/setruleforchildrequest.html',
    directives: [PageComponent, CustomCheckBoxComponent, CustomRadioComponent, ListBoxComponent,],
    providers: [NotificationService, WorkOrdereService],
    inputs: ['ParentEntityId', 'workRequestId', 'WorkflowEntityRelationshipId', 'StatusId', 'InitialData'],
    encapsulation: ViewEncapsulation.None
})

export class SetRuleForChildRequest implements OnInit {


    noRuleRadio: IField = undefined;
    actionPointRadio: IField = undefined;
    parentRadio: IField = undefined;
    actionPointListboxData: IField = undefined;
    discardcheckbox: IField = undefined;
    public fieldDetails: IField[];
    @Output() submitSuccess = new EventEmitter();

    isCheckboxChecked: boolean = false;
    IsActionPoint: boolean = false;

    ParentEntityId: number = 0;
    workRequestId: number = 0;
    WorkflowEntityRelationshipId: number = 0;
    StatusId: number = 16;

    savedData: any;
    savedWorkflowEntityRelationship: any;
    savedHasRejectedSettings: any;
    checkedActionPoints: any[] = [];
    InitialData: SetRuleData = undefined;

    constructor(private notificationService: NotificationService, private workOrderService: WorkOrdereService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.workOrderService.getSetRuleFields(contextObj.ParentEntityId, contextObj.workRequestId).subscribe(function (resultData) {

            if (resultData["Data"] != "[]") {
                contextObj.fieldDetails = resultData["Data"];
                contextObj.fieldDetails[0].FieldLabel = "";
                contextObj.fieldDetails[0].LookupDetails.LookupValues = [
                    {
                        "Id": 1,
                        "Value": "No Rule",
                    },
                    {
                        "Id": 2,
                        "Value": "Parent Request/Work Order cannot be completed before this request is completed",
                    },
                    {
                        "Id": 3,
                        "Value": "Complete this request before the parent request move from the selected Action Point ",
                    }
                ];

                contextObj.fieldDetails[0].FieldValue = "1";
                contextObj.noRuleRadio = contextObj.fieldDetails[0];
                contextObj.actionPointListboxData = contextObj.fieldDetails[3];
                contextObj.discardcheckbox = contextObj.fieldDetails[4];

                var dataTemp = contextObj.fieldDetails[3].LookupDetails.LookupValues;

                for (var count = 0; count < dataTemp.length; count++) {
                    if (dataTemp[count]["IsChecked"] == 1) {
                        contextObj.checkedActionPoints.push(dataTemp[count]["Id"].toString());
                    }
                }
                contextObj.actionPointListboxData.MultiFieldValues = contextObj.checkedActionPoints;
            }

            if (contextObj.workRequestId != 0) {
                contextObj.workOrderService.getUpdateRuleEditdata(contextObj.workRequestId).subscribe(function (resultData) {
                    contextObj.savedData = JSON.parse(resultData.Data.FieldBinderData)[0];
                    contextObj.savedWorkflowEntityRelationship = contextObj.savedData.WorkflowEntityRelationshipTypeId;
                    contextObj.savedHasRejectedSettings = contextObj.savedData.HasRejectedSettings;

                    if (contextObj.savedWorkflowEntityRelationship == "1") {
                        contextObj.fieldDetails[0].FieldValue = "1";
                        contextObj.IsActionPoint = false;
                    }
                    else if (contextObj.savedWorkflowEntityRelationship == "3") {
                        contextObj.fieldDetails[0].FieldValue = "3";
                        contextObj.IsActionPoint = true;
                    }
                    else if (contextObj.savedWorkflowEntityRelationship == "2") {
                        contextObj.fieldDetails[0].FieldValue = "2";
                        contextObj.IsActionPoint = false;
                    }

                    if (contextObj.savedHasRejectedSettings == true) {
                        contextObj.discardcheckbox.FieldValue = "true";
                    }
                    else {
                        contextObj.discardcheckbox.FieldValue = "false";
                    }

                    contextObj.workOrderService.getSelectedActionPointsRule(contextObj.ParentEntityId, contextObj.workRequestId).subscribe(function (resultData) {
                        if (resultData != undefined || resultData != null || resultData != "") {
                            contextObj.actionPointListboxData.MultiFieldValues = resultData;
                        }
                    });
                });
            }
            if (contextObj.InitialData != undefined) {
                contextObj.actionPointListboxData.MultiFieldValues = contextObj.InitialData.ActionPoint;
                contextObj.noRuleRadio.FieldValue = contextObj.InitialData.RadioButton.toString();
                contextObj.discardcheckbox.FieldValue = contextObj.InitialData.Checkbox.toString();
                if (contextObj.noRuleRadio.FieldValue == "3") {
                    contextObj.IsActionPoint = true;
                }
                else {
                    contextObj.IsActionPoint = false;
                    contextObj.actionPointListboxData.MultiFieldValues = null;
                }
            }
        });
    }


    onRadiobtnChange(event) {
        var contextObj = this;
        if (event.fieldobject.FieldValue == "3") {
            this.IsActionPoint = true;
        }
        else {
            this.IsActionPoint = false;
            this.actionPointListboxData.MultiFieldValues = null;
        }
    }

    discardchecked(event) {
        this.isCheckboxChecked = event.IsChecked;
    }

    onSubmitSet(event) {
        var contextObj = this;
        if (contextObj.WorkflowEntityRelationshipId == 0) {
            if (contextObj.noRuleRadio.FieldValue == "3" && contextObj.actionPointListboxData.MultiFieldValues.length == 0) {
                contextObj.notificationService.ShowToaster("Select at least one Parent Action Point", 2);
            }
            else {
                var arrayList = new Array<SetRuleData>();
                arrayList.push({
                    RadioButton: parseInt(contextObj.noRuleRadio.FieldValue),
                    ActionPoint: contextObj.actionPointListboxData.MultiFieldValues,
                    Checkbox: contextObj.isCheckboxChecked,
                });
                contextObj.submitSuccess.emit({ SetRuleData: arrayList });
                contextObj.notificationService.ShowToaster("Rule added", 2);
            }
        }
        else {
            var updateRuleArray = new Array<ReportFieldArray>();
            updateRuleArray.push(
                {
                    ReportFieldId: 7489,
                    Value: this.workRequestId.toString()
                },
                {
                    ReportFieldId: 7490,
                    Value: this.noRuleRadio.FieldValue.toString()
                },
                {
                    ReportFieldId: 7492,
                    Value: (this.isCheckboxChecked) ? "1" : "0"
                },
                {
                    ReportFieldId: 7493,
                    Value: this.StatusId.toString()
                },
                {
                    ReportFieldId: 5859,
                    Value: this.ParentEntityId.toString()
                },
                {
                    ReportFieldId: 7494,
                    Value: this.WorkflowEntityRelationshipId.toString()
                }

            )
            if (contextObj.noRuleRadio.FieldValue == "3") {
                for (var count = 0; count < contextObj.actionPointListboxData.MultiFieldValues.length; count++) {
                    updateRuleArray.push(
                        {
                            ReportFieldId: 7495,
                            Value: contextObj.actionPointListboxData.MultiFieldValues[count].toString()
                        }
                    )
                }
            }
            var entityInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: updateRuleArray }
            var submitOutput: ReviewSubmitOutput = { WFEntityInput: entityInput, ParentFormId: 226, WFEntityDocumentInput: null }


            this.workOrderService.updateEditRuleSubmit(JSON.stringify(submitOutput)).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Rule Updated", 2);
                    contextObj.submitSuccess.emit({ SetRuleData: undefined });
                }
            });
        }
    }
}

export interface SetRuleData {
    RadioButton: number;
    ActionPoint: any[];
    Checkbox: boolean;

}


export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

interface ReviewSubmitOutput {
    WFEntityInput: WorkFlowEntityInput;
    WFEntityDocumentInput: any;
    //WFEntityEquipmentInput: EquipmentInput;
    ParentFormId: number;
}

interface WorkFlowEntityInput {
    FormId: number;
    WFEntityId: number;
    WFReportFieldIdValues: any;
}