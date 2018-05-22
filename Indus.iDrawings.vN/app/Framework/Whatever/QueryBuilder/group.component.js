var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var condition_component_1 = require('../../../Framework/Whatever/QueryBuilder/condition.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var searchquerycondition_component_1 = require('../../../Framework/Whatever/QueryBuilder/searchquerycondition.component');
var GroupComponent = (function () {
    function GroupComponent() {
        //@Input() datasource: IGroup;
        this.removeGpVisible = true;
        this.addGpVisible = true;
        this.ddl = 0;
        this.groupAddClicked = new core_1.EventEmitter();
    }
    GroupComponent.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        console.log("GroupComponent", contextObj.groupFields);
        this.genericfieldobjects[0].Width = "60";
    };
    GroupComponent.prototype.addCondition = function (datasrc) {
        console.log("addCondition", datasrc);
        var grpId = datasrc["GroupId"];
        var CondId = datasrc.Conditions.length == 0 ? grpId : 1000 + (datasrc.Conditions.length + 1);
        var newOperatorFieldObj = JSON.parse(JSON.stringify(this.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 100 + CondId + 9999;
        var newFldNameFieldObj = JSON.parse(JSON.stringify(this.genericfieldobjects[1]));
        newFldNameFieldObj.FieldId = 100 + CondId + 8888;
        var newConditionFieldObj = JSON.parse(JSON.stringify(this.genericfieldobjects[2]));
        newConditionFieldObj.Width = "100";
        newConditionFieldObj.FieldId = 100 + CondId + 7777;
        var newFldValueFieldObj = JSON.parse(JSON.stringify(this.genericfieldobjects[3]));
        newFldValueFieldObj.FieldId = 100 + CondId + 6666;
        var newCondition = {
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
    };
    GroupComponent.prototype.addGroup = function (datasrc) {
        debugger;
        console.log("addGroup", datasrc);
        var ParentgrpId = datasrc["GroupId"];
        var grpId = 1;
        if (ParentgrpId == 1) {
            if (datasrc.SubGroups.length == 0) {
                ParentgrpId++;
            }
            else {
                grpId = ParentgrpId + datasrc.SubGroups.length + 1;
            }
        }
        else {
            grpId = +(1 + 99 + ParentgrpId + datasrc.SubGroups.length + 1);
        }
        var newGrpOperatorFldObj = JSON.parse(JSON.stringify(this.genericfieldobjects[0]));
        newGrpOperatorFldObj.FieldId = 100 + grpId + 999;
        newGrpOperatorFldObj.Width = "60";
        var newGroup = {
            GroupId: 100 + grpId,
            Operator: 1,
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: newGrpOperatorFldObj,
            Jointer: +(datasrc["Operator"])
        };
        this.groupFields.SubGroups.push(newGroup);
        if (this.groupFields.GroupId != 1)
            this.removeGpVisible = false;
        this.groupAddClicked.emit({ gpid: grpId, returnData: this.totgroupFields != undefined ? this.totgroupFields : this.groupFields });
    };
    GroupComponent.prototype.removeGroup = function (datasrc) {
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
        var index = this.totgroupFields.SubGroups.findIndex(function (el) { return el['GroupId'] == datasrc.GroupId; });
        this.totgroupFields.SubGroups.splice(index, 1);
        // }
    };
    GroupComponent.prototype.ddlChange = function (event, groupFields) {
        debugger;
        this.groupFields.Operator = +(event.ChildFieldObject.FieldValue);
        for (var i = 0; i < this.groupFields.Conditions.length; i++) {
            this.groupFields.Conditions[i].OperatorFieldObj.FieldValue = event.ChildFieldObject.FieldValue;
        }
        for (var i = 0; i < this.groupFields.SubGroups.length; i++) {
            this.groupFields.SubGroups[i].Jointer = event.ChildFieldObject.FieldValue;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "groupFields", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "groupAddClicked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GroupComponent.prototype, "genericfieldobjects", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroupComponent.prototype, "totgroupFields", void 0);
    GroupComponent = __decorate([
        core_1.Component({
            selector: 'qbgroup',
            templateUrl: 'app/Framework/Views/QueryBuilder/group.component.html',
            directives: [condition_component_1.ConditionComponent, dropdownlistcomponent_component_1.DropDownListComponent, GroupComponent, searchquerycondition_component_1.SearchQueryConditionComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupComponent);
    return GroupComponent;
}());
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=group.component.js.map