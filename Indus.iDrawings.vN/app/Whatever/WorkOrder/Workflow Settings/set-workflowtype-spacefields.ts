import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import {WorkOrdereService} from '../../../models/workorder/workorder.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ButtonComponent}from '../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component'
import {ValidateService} from '../../../framework/models/validation/validation.service';

@Component({
    selector: 'set-worktype-spacefield',
    templateUrl: './app/Views/WorkOrder/Workflow Settings/set-workflowtype-spacefields.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, DropDownListComponent, ButtonComponent],
    providers: [WorkOrdereService, NotificationService, ValidateService]
})
export class SetWorktypeSpacefield {

    ddlWorkType: any;
    ddlWorktypeEntity: any;
    alignContent: string;
    fieldObject: IField[];
    inputItems: IGrid = { dataKey: "ReportFieldId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
    itemsSource//: any[];
    refreshgrid;
    workTypeId: number = 0;
    entityCategoryId: number = 0;
    btnSave: string;
    enableBtn = true;
    count = 0;
    selectedValue: IReportFieldIdValues[] = [];
    value = [];
    constructor(private workorderservice: WorkOrdereService, private notificationService: NotificationService, private validateService: ValidateService) {

    }

    ngOnInit() {
        var context = this;
        this.alignContent = "horizontal";
        this.workorderservice.GetFieldObjectForSetWorkTypeSpace(9).subscribe(function (result) {
            console.log('result', result)
            var removeArr = [5873, 6573];
            context.ddlWorkType = result["Data"].find(function (el) { return el.ReportFieldId === 5873; });
            context.ddlWorktypeEntity = result["Data"].find(function (el) { return el.ReportFieldId === 6573 })
            context.fieldObject = result["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            if (context.ddlWorkType.LookupDetails.LookupValues.length == 1) {
                var worktypeId = context.ddlWorkType.LookupDetails.LookupValues[0].Id;
                context.ddlWorkType.FieldValue = worktypeId.toString();
                context.workTypeId = worktypeId;
                context.workorderservice.GetWorkFlowEntityCategory(context.workTypeId, 9).subscribe(function (result) {
                    context.ddlWorktypeEntity.LookupDetails.LookupValues = result.Data.LookupValues
                })
            }
        })

        this.btnSave = "Save Changes";
    }

    onChangeWorkType(event) {
        var context = this;
        this.workTypeId = event;

        //to show validation the second  time its selected
        this.ddlWorktypeEntity.FieldValue = -1;
        this.itemsSource = [];
        var el = <HTMLElement>document.getElementById(context.ddlWorktypeEntity.FieldId.toString());
        this.validateService.initiateValidation(context.ddlWorktypeEntity, this, true, el);
        this.checkButton(context.ddlWorktypeEntity.FieldValue);
        //end of validation

        this.workorderservice.GetWorkFlowEntityCategory(event, 9).subscribe(function (result) {
            context.ddlWorktypeEntity.LookupDetails.LookupValues = result.Data.LookupValues
        })
    }

    DataLoad() {
        var contextObj = this;
        this.workorderservice.GetSpaceFieldList(this.workTypeId, this.entityCategoryId, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            console.log('space field data', result)
            contextObj.itemsSource = JSON.parse(result["Data"]["FieldBinderData"]);
            contextObj.count = 0;
            contextObj.selectedValue = [];
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select"] == true) {
                    contextObj.count++;
                    contextObj.selectedValue.push({
                        ReportFieldId: 6579,
                        Value: contextObj.itemsSource[i].ReportFieldId
                    });
                }
            }
            if (contextObj.count > 5) {
                this.notificationService.ShowToaster('Cannot check more than 5 Space fields', 2)
            }

        })
    }

    onChangeWorktypeEntity(event) {

        this.entityCategoryId = event;
        this.checkButton(event);
        if(event == -1)
            this.itemsSource = [];
        else
            this.DataLoad();
    }

    Update() {
        var context = this;
        console.log('update button clicked')
        if (!(this.selectedValue.findIndex(function (item) { return item.ReportFieldId === 6578 }) > -1)) {
            this.selectedValue.push(
                { ReportFieldId: 6577, Value: this.workTypeId },
                { ReportFieldId: 6578, Value: this.entityCategoryId });
        }
        this.workorderservice.UpdateSpaceField(JSON.stringify(this.selectedValue)).subscribe(function (result) {
            console.log('updated result', result)
            if (result["Data"]["StatusId"] == 1) {
                context.notificationService.ShowToaster("Work Type Space Fields updated", 3)
                // context.itemsSource = [];
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2)
            }
        });
        context.enableBtn = true;

    }
    checkButton(ddlValue) {
        if (ddlValue != -1)
            this.enableBtn = false;
        else
            this.enableBtn = true;
    }

    onCellEdit(event) {
        this.count = 0;
        this.selectedValue = [];
        this.value = [];
        var check = (<HTMLInputElement>document.getElementById("checkbox"));
        for (var j = 0; j < event["dataSource"].length; j++) {
            if (event["dataSource"][j]["Select"] == true) {
                this.count++;
                this.value.push(event["dataSource"][j]["ReportFieldId"])
            }
        }

        for (var i = 0; i < event["dataSource"].length; i++) {
            var isValid = true;
            if (this.count <= 5) {
                if (event["dataSource"][i]["Select"] == true) {
                    if ((event["dataSource"][i]["ReportFieldId"] == event["dataKeyValue"])) {
                        if (event["dataSource"][i]["ReportFieldId"] > 290 && event["dataSource"][i]["ReportFieldId"] < 299)
                            event["dataSource"][i]["Select"] = this.CheckOrgLevel(event["dataSource"][i]["ReportFieldId"], event["dataSource"][i]["Select"], event)
                        isValid = event["dataSource"][i]["Select"]
                    }

                }
                else if (event["dataSource"][i]["Select"] == false && (event["dataSource"][i]["ReportFieldId"] == event["dataKeyValue"])) {
                    isValid = this.CheckOrgLevel(event["dataSource"][i]["ReportFieldId"], event["dataSource"][i]["Select"], event);
                }
                if ((isValid == false) && (event["dataSource"][i]["ReportFieldId"] == event["dataKeyValue"])) {
                    this.splice(event["dataSource"][i]["ReportFieldId"])

                }
            }
            else if (this.count > 5) {
                var tobedel = event["dataSource"].find(function (el) { return el.ReportFieldId === event["dataKeyValue"] })
                tobedel.Select = false;
                this.splice(tobedel.ReportFieldId)

                break;
            }
        }
        console.log('count', this.count)
        if (this.count > 5)
            this.notificationService.ShowToaster('Maximum 5 fields can be selected as Space Fields', 2)
        else
            this.enableBtn = false;
        for (var i = 0; i < this.value.length; i++) {
            this.selectedValue.push({ ReportFieldId: 6579, Value: this.value[i] })
        }


    }

    onSort(event) {
        this.DataLoad();
    }
    CheckOrgLevel(ReportFieldId, Checked, event) {
        var l2 = event["dataSource"].find(function (el) { return el.ReportFieldId === 292 })
        var l3 = event["dataSource"].find(function (el) { return el.ReportFieldId === 294 })
        var l4 = event["dataSource"].find(function (el) { return el.ReportFieldId === 296 })
        var l5 = event["dataSource"].find(function (el) { return el.ReportFieldId === 298 })
        if (Checked == true) {

            switch (ReportFieldId) {
                case 294: {
                    if ((l2) && (l2.Select == false)) {
                        if (this.count <= 5)
                            this.notificationService.ShowToaster("Select " + l2.Name + " before selecting " + l3.Name + "", 2)
                        Checked = false;
                        return Checked;
                    }
                } break;
                case 296: {
                    if ((l3) && (l3.Select == false)) {
                        if (this.count <= 5)
                            this.notificationService.ShowToaster("Select " + l3.Name + " before selecting " + l4.Name + "", 2)
                        Checked = false;
                        return Checked;
                    }
                } break;
                case 298: {
                    if ((l4) && (l4.Select == false)) {
                        if (this.count <= 5)
                            this.notificationService.ShowToaster("Select " + l4.Name + " before selecting " + l5.Name + "", 2)
                        Checked = false;
                        return Checked;
                    }
                } break;
            }
            return true;
        }
        else {
            switch (ReportFieldId) {
                case 292: {
                    if ((l3) && (l3.Select == true)) {
                        l3.Select = false;
                        this.splice(l3.ReportFieldId)

                    }
                    if ((l4) && (l4.Select == true)) {
                        l4.Select = false;
                        this.splice(l4.ReportFieldId)

                    }
                    if ((l5) && (l5.Select == true)) {
                        l5.Select = false;
                        this.splice(l5.ReportFieldId)
                    }
                    return false;
                }
                case 294: {
                    if ((l4) && (l4.Select == true)) {
                        l4.Select = false;
                        this.splice(l4.ReportFieldId)

                    }
                    if ((l5) && (l5.Select == true)) {
                        l5.Select = false;
                        this.splice(l5.ReportFieldId)
                    }
                    return false;
                }
                case 296: {
                    if ((l5) && (l5.Select == true)) {
                        l5.Select = false;
                        this.splice(l5.ReportFieldId)
                    }
                    return false;
                }

            }
        }
    }
    splice(obj) {
        var index = this.value.indexOf(obj)
        if (index > -1)
            this.value.splice(index, 1)
    }
}

interface IReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}