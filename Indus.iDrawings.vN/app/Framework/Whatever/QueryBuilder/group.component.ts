import { Component, Input,  ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { ConditionComponent} from '../../../Framework/Whatever/QueryBuilder/condition.component';
import {IGroup} from '../../Models/Interface/IGroup';
import {IField} from '../../Models/Interface/IField';
import {ICondition} from '../../Models/Interface/ICondition';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { SearchQueryConditionComponent} from '../../../Framework/Whatever/QueryBuilder/searchquerycondition.component';

@Component({
    selector: 'qbgroup',
    templateUrl: 'app/Framework/Views/QueryBuilder/group.component.html',
    directives: [ConditionComponent, DropDownListComponent, GroupComponent, SearchQueryConditionComponent]
})
export class GroupComponent {
    updatedatasource: IGroup;
    @Input() groupFields: IGroup;
    //@Input() datasource: IGroup;

    removeGpVisible: boolean = true;
    addGpVisible: boolean = true;
    ddl = 0;
    @Output() groupAddClicked = new EventEmitter();
    @Input() genericfieldobjects: IField[];
    @Input() totgroupFields: IGroup;
    ngOnInit() {
        debugger
        var contextObj = this;
        console.log("GroupComponent", contextObj.groupFields);
        this.genericfieldobjects[0].Width = "60";
    }
    addCondition(datasrc) {

        console.log("addCondition", datasrc);
        var grpId = datasrc["GroupId"];
        var CondId = datasrc.Conditions.length == 0 ? grpId : 1000 + (datasrc.Conditions.length + 1);
        var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(this.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 100 + CondId + 9999;
        var newFldNameFieldObj: IField = JSON.parse(JSON.stringify(this.genericfieldobjects[1]));

        newFldNameFieldObj.FieldId = 100 + CondId + 8888;
        var newConditionFieldObj: IField = JSON.parse(JSON.stringify(this.genericfieldobjects[2]));
        newConditionFieldObj.Width = "100";
        newConditionFieldObj.FieldId = 100 + CondId + 7777;
        var newFldValueFieldObj: IField = JSON.parse(JSON.stringify(this.genericfieldobjects[3]));
        newFldValueFieldObj.FieldId = 100 + CondId + 6666;
        var newCondition: ICondition = {
            ConditionId: CondId,
            FieldId: CondId,
            Condition: 0,
            Value: "",
            OperatorFieldObj: newOperatorFieldObj,
            FldNameFieldObj: newFldNameFieldObj,
            ConditionFieldObj: newConditionFieldObj,
            FldValueFieldObj: newFldValueFieldObj
        };
        newCondition.OperatorFieldObj.FieldValue = this.groupFields.OperatorFieldObj.FieldValue;
        newCondition.FldValueFieldObj.MaxLength = 100;
        this.groupFields.Conditions.push(newCondition);
        //  this.datasource.Conditions.push(newCondition);  

    }

    addGroup(datasrc) {
        debugger
        console.log("addGroup", datasrc);
        var ParentgrpId = datasrc["GroupId"];
        var grpId = 1;
        if (ParentgrpId == 1) {
            if (datasrc.SubGroups.length == 0) {
                ParentgrpId++;
            }
            else {
                grpId = ParentgrpId + datasrc.SubGroups.length + 1
            }
        }
        else {
            grpId = +(1 + 99 + ParentgrpId + datasrc.SubGroups.length + 1);
        }

        var newGrpOperatorFldObj: IField = JSON.parse(JSON.stringify(this.genericfieldobjects[0]));
        newGrpOperatorFldObj.FieldId = 100 + grpId + 999;
        newGrpOperatorFldObj.Width = "60";

        var newGroup: IGroup = {
            GroupId: 100 + grpId,
            Operator: 1,/*1-AND,2-OR*/
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: newGrpOperatorFldObj,
            Jointer: +(datasrc["Operator"])
        };
        this.groupFields.SubGroups.push(newGroup);
        if (this.groupFields.GroupId != 1)
            this.removeGpVisible = false;
        this.groupAddClicked.emit({ gpid: grpId, returnData: this.totgroupFields != undefined ? this.totgroupFields: this.groupFields } );

    }
    removeGroup(datasrc) {

        this.groupFields.SubGroups = [];
        this.removeGpVisible = true;
        //if (datasrc.data)
        //{
        //if( this.totgroupFields && this.totgroupFields.SubGroups.length > 0  ) {
        //     if (datasrc.data.GroupId != 1) {
        //         var index = this.totgroupFields.SubGroups.findIndex(function (el) { return el['GroupId'] == datasrc.data.GroupId });
        //         this.totgroupFields.SubGroups.splice(index, 1);
        //     }
        // }
        // }
        //else {
        var index = this.totgroupFields.SubGroups.findIndex(function (el) { return el['GroupId'] == datasrc.GroupId });
        this.totgroupFields.SubGroups.splice(index, 1);
        // }
    }
    ddlChange(event, groupFields) {
        debugger
        this.groupFields.Operator = +(event.ChildFieldObject.FieldValue);

        for (var i = 0; i < this.groupFields.Conditions.length; i++) {
            this.groupFields.Conditions[i].OperatorFieldObj.FieldValue = event.ChildFieldObject.FieldValue;
        }
        for (var i = 0; i < this.groupFields.SubGroups.length; i++) {
            this.groupFields.SubGroups[i].Jointer = event.ChildFieldObject.FieldValue;
        }
    }

}