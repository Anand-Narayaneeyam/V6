import { Component, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel } from '@angular/common';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { IField } from '../../../Framework/Models/Interface/IField';
import { ICondition } from '../../../Framework/Models/Interface/ICondition';
import { IGroup } from '../../../Framework/Models/Interface/IGroup';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { CommonService } from '../../../Models/Common/common.service'
import { GroupComponent } from '../../../Framework/Whatever/QueryBuilder/group.component';
import { SearchQueryComponent } from '../../../Framework/Whatever/QueryBuilder/searchquery.component';
import { SpaceDataGridComponent } from '../../../whatever/space/space data/spacedata-grid.component';
import { EmployeeDataComponent } from '../../../whatever/employee/data/employeeData'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { OpenDrawing } from '../../../whatever/common/opendrawing/opendrawing.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { StringTextBoxComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { ObjectsService } from '../../../models/objects/objects.service'
import { ObjectDataListComponent } from '../../../whatever/Objects/Data/objectData-list.component'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { AdministrationService } from '../../../models/administration/administration.service'
@Component({
    selector: 'querySpaceType',
    templateUrl: 'app/Views/Employee/SpaceType/querySpaceType.Component.html',
    styleUrls: ['app/Framework/Views/QueryBuilder/Styles.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    directives: [ListBoxComponent, StringTextBoxComponent, FieldComponent, GroupComponent, SplitViewComponent, SlideComponent, SearchQueryComponent, SpaceDataGridComponent,OpenDrawing, PageComponent, SubMenu, EmployeeDataComponent, ObjectDataListComponent],
    inputs: ['moduleId', 'QueryCategryId'],
    providers: [CommonService, GeneralFunctions, NotificationService, ObjectsService, AdministrationService],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})
export class querySpaceTypeComponent implements OnChanges {
    @Input() moduleId: number;
    @Input() objectCategoryId: any;
    @Input() rowData: any;
    @Input() Target: number;;//manage other area(custom report - target=1)  
    @Input() customRptObj: customRptObj;//manage other area (action=edit) 
    @Input() QueryCategryId: string;
    @Output() onQueryBuilderSearch = new EventEmitter();
    @Output() submitSuccess = new EventEmitter();

    pagePath = "";
    attributetitle = "";
    // spaceTabEnabled: boolean = false;
    operatorlookup;
    objArray = new Array<ReportFieldArray>();

    public searchedQuery = '';
    public filteredList = [];
    public elementRef;
    public genericfieldobjects: IField[];
    public spaceTypeObj: IField;

    position = "top-right";
    showSlide: boolean = false;
    buildarray = "";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };

    splitviewInput1: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    selectedSpaceIds: any;
    isvalid = true;

    drawingType: number = 1;
    selectedDrwgIds: any[] = ["0"];
    selectedDrawingId: number;

    dwgPageTarget: number;
    objiWhiz: any;
    fieldDetailsAdd: IField[];
    isSaveClicked: boolean;
    enableMenu = [0, 1];
    isQResultEnabled: boolean = false;

    isSaveAsClicked = false;
    isObjectModule = false;
    querybuildercloseButtonVisible = 'hidden';
    IsOpenDrawingComponentActive: boolean = false;

    qResult;
    searchId: string = "0";
    fieldDetailsCheckBox: IField;

    dataoption: string = "1";
    isNextClicked = false;
    selectedClassIds: string = ''
    attributeId: number = 1;
    IsClassSpecific: number = 0;
    menuData = [

        {
            "id": 1,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "subMenu": null,
            "privilegeId": 298
        },

        {
            "id": 2,
            "title": "Save As",
            "image": "Save As",
            "path": "Save As",
            "subMenu": null,
            "privilegeId": 298

        }
    ];
    QueryBuilderObj: IGroup = {
        GroupId: 1,
        Operator: 1,/*1-AND,2-OR*/
        SubGroups: [],
        Conditions: [],
        OperatorFieldObj: null,
        Jointer: 1
    };

    operators = [
        { Id: 1, Value: 'AND', Sp: "ÿ" },
        { Id: 2, Value: 'OR', Sp: "OR" }
    ];
    conditionLookUp = [
        { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
        { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },// Sp: "Ѫє" },
        { Id: 3, Value: "Contains", Exp: 'LIKE', Sp: "Ñ" },
        { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
        { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },


    ];

    conditionLookUpInt = [
        { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
        { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },// Sp: "Ѫє" },      
        { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
        { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },
        { Id: 6, Value: "Less than", Exp: '<', Sp: "é" },
        { Id: 7, Value: "Greater than", Exp: '>', Sp: "ü" }


    ];

    constructor(private administrationService: AdministrationService, private generFun: GeneralFunctions, private objectsService: ObjectsService, private commonService: CommonService, myElement: ElementRef, private _notificationService: NotificationService) {
        var contextObj = this;
        contextObj.elementRef = myElement;
    }

    ngOnInit() {

        var contextObj = this;
        this.pagePath = "Employee / General Settings / Space Type";
        var reportfieldIdArray = new Array<ReportFieldArray>();
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: this.QueryCategryId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: "1",
        });

        if (contextObj.objectCategoryId) {
            contextObj.ReplaceWithLabel();
            contextObj.objectsService.getObjectClassSelectionFieldsList(contextObj.objectCategoryId).subscribe(function (result) {
                contextObj.fieldDetailsCheckBox = (result["Data"][0]);

                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, "", contextObj.dataoption, 1, 0).subscribe(function (resultData) {
                    contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                    contextObj.fieldDetailsCheckBox.IsHiddenLabel = true;
                    // contextObj.loadOperatorLookup(contextObj);
                });
            });
        } else {

            contextObj.loadOperatorLookup(contextObj);
        }
        var callBack = function (data) {
            if (contextObj.Target == 1)
                data = data.filter(function (el) { return el.id == 0 });
            contextObj.menuData = data;
        };
        contextObj.commonService.getListFields("583").subscribe(function (resultData) {
            contextObj.spaceTypeObj = resultData["Data"];
            if (contextObj.rowData)
            {
                contextObj.enableMenu = [1, 2];
                contextObj.spaceTypeObj[1].FieldValue = contextObj.rowData["Space Type"];
                contextObj.onchangeddlsearchNames();
            }           
        });

        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 217, contextObj.administrationService, contextObj.menuData.length);

    }


    onchangeddlsearchNames() {
        var contextObj = this;
        contextObj.commonService.GetSpaceTypeDataset(contextObj.rowData["Id"]).subscribe(function (resultData) {
            var result = resultData.FieldBinderData;
            contextObj.populateQBObject(result);

        });
    }


    findParentGrp(grpId, grpArray: IGroup[], parentofActiveGroup) {

        for (var i = 0; i < grpArray.length; i++) {
            if (grpArray[i].GroupId == grpId) {
                return parentofActiveGroup;
            }
        }
        for (var i = 0; i < grpArray.length; i++) {
            return this.findParentGrp(grpId, grpArray[i].SubGroups, grpArray[i]);
        }

    }
    findendGroup(grpId, grpArray: IGroup[]) {
        var ConditionId = -1;
        for (var i = 0; i < grpArray.length; i++) {
            for (var j = 0; j < grpArray[i].Conditions.length; j++) {
                if (grpArray[i].Conditions[j].ConditionFieldObj.FieldValue == ")") {
                    return ConditionId = grpArray[i].Conditions[j].ConditionId;
                }
            }
        }
        return ConditionId;

    }
    findoperatorInGroup(ConditionFieldObj, grpArray) {
        if (grpArray.length > 1) {
            return this.getLoopupValue(ConditionFieldObj, "Value", grpArray[1].Condition).Id;

        }
        else return "1";


    }

    populateQBObject(savedSearchData) {
        var contextObj = this;
        var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;

        var arrSavedSearchData = JSON.parse(savedSearchData);
        contextObj.QueryBuilderObj = {
            GroupId: 1,
            Operator: 1,/*1-AND,2-OR*/
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: newOperatorFieldObj, Jointer: 1
        };
        var activeGroupObj = contextObj.QueryBuilderObj;
        for (var i = 0; i < arrSavedSearchData.length; i++) {
            var savedConditionfromDB = arrSavedSearchData[i];
            /*
             Group check
             */
            var startGroup = savedConditionfromDB["StartGroup"];
            var startGroups = startGroup.split("(");
            if (i > 0 && startGroup.length > 0) {

                for (var gp = 0; gp < startGroups.length - 1; gp++) {
                    var countofSubGrps = activeGroupObj.SubGroups.length;
                    var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
                    newOperatorFieldObj.FieldId = activeGroupObj.GroupId + countofSubGrps + 1;

                    //Checking new group started and create gp object
                    var newGroup = {
                        GroupId: activeGroupObj.GroupId + countofSubGrps + 1,
                        Operator: 1,/*1-AND,2-OR*/
                        SubGroups: [],
                        Conditions: [],
                        OperatorFieldObj: newOperatorFieldObj,
                        Jointer: 1
                    };
                    activeGroupObj.SubGroups.push(newGroup);
                    activeGroupObj = activeGroupObj.SubGroups[countofSubGrps];

                }
            }
            else if (i == 0 && startGroup.length > 1) {
                for (var gp = 0; gp < startGroups.length - 2; gp++) {
                    var countofSubGrps = activeGroupObj.SubGroups.length;
                    var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
                    newOperatorFieldObj.FieldId = activeGroupObj.GroupId + countofSubGrps + 1;

                    //Checking new group started and create gp object
                    var newGroup = {
                        GroupId: activeGroupObj.GroupId + countofSubGrps + 1,
                        Operator: 1,/*1-AND,2-OR*/
                        SubGroups: [],
                        Conditions: [],
                        OperatorFieldObj: newOperatorFieldObj,
                        Jointer: 1
                    };
                    activeGroupObj.SubGroups.push(newGroup);
                    activeGroupObj = activeGroupObj.SubGroups[countofSubGrps];

                }
            }

            var CondId = activeGroupObj.Conditions.length == 0 ? activeGroupObj.GroupId : 1000 + (activeGroupObj.Conditions.length + 1); //1000 + (contextObj.QueryBuilderObj.Conditions.length + 1); //1000 + i;
            var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
            newOperatorFieldObj.FieldId = 100 + CondId + 9999;

            var newFldNameFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[1]));
            newFldNameFieldObj.FieldId = 100 + CondId + 8888;

            var newConditionFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[2]));
            newConditionFieldObj.FieldId = 100 + CondId + 7777;
            var newFldValueFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[3]));
            newFldValueFieldObj.FieldId = 100 + CondId + 6666;
            //Checking condition in group and create condition object
            var conditionObj: ICondition = {
                ConditionId: CondId,
                FieldId: CondId,
                Condition: 0,
                Value: "",
                OperatorFieldObj: newOperatorFieldObj,
                FldNameFieldObj: newFldNameFieldObj,
                ConditionFieldObj: newConditionFieldObj,
                FldValueFieldObj: newFldValueFieldObj
            };

            var FieldValues = savedConditionfromDB["FieldValue"].split("^");
            var fieldNameValue = FieldValues[0];

            var Field = contextObj.getLoopupValue(conditionObj.FldNameFieldObj, "Id", fieldNameValue);//equal to
            if (Field) {
                var FieldType = contextObj.getLoopupValue(conditionObj.FldNameFieldObj, "Id", fieldNameValue).Type;//equal to
                //Type switiching according type of field name
                switch (FieldType) {
                    case 6:
                        conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp;
                        break;
                    default:
                        conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                        break;

                }
            } else { conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp; }

            //Assign Operator Value(AND/OR )//main operator
            if (arrSavedSearchData.length > 0) {

                var operatorValue = contextObj.findoperatorInGroup(conditionObj.OperatorFieldObj, arrSavedSearchData);
                activeGroupObj.OperatorFieldObj.FieldValue = operatorValue;


            }
            //Set Field Values

            if (i > 0 && conditionObj.OperatorFieldObj && savedConditionfromDB["Condition"]) {
                conditionObj.OperatorFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.OperatorFieldObj, "Value", savedConditionfromDB["Condition"]).Id;//AND/OR
            }



            if (savedConditionfromDB["OperatorValue"] == "IS") {
                // conditionObj.ConditionFieldObj.FieldValue = "4";
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Exp", "IS NULL").Id;//equal to
                conditionObj.FldValueFieldObj.FieldValue = "";
            }
            else if (savedConditionfromDB["OperatorValue"] == "IS NOT") {
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Exp", "IS NOT NULL").Id;//equal to
                conditionObj.FldValueFieldObj.FieldValue = "";
                // conditionObj.ConditionFieldObj.FieldValue = "5";
            }
            else {
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Value", savedConditionfromDB["Operator"]).Id;//equal to
                var fValue = savedConditionfromDB["Value"];
                fValue = fValue.replace("%", "").replace("%", "");
                conditionObj.FldValueFieldObj.FieldValue = fValue.replace("'", "").replace("'", "");
            }


            conditionObj.FldNameFieldObj.FieldValue = fieldNameValue;


            activeGroupObj.Conditions.push(conditionObj);

            if (i > 0 && savedConditionfromDB["EndGroup"].length > 0) {
                console.log("contextObj.QueryBuilderObj", contextObj.QueryBuilderObj);
                var parentGroup = contextObj.findParentGrp(activeGroupObj.GroupId, contextObj.QueryBuilderObj.SubGroups, contextObj.QueryBuilderObj);
                console.log("parentGroup", parentGroup);
                activeGroupObj = parentGroup;
            }
        }
    }

    SaveClick() {
        debugger;
        var contextObj = this;
        contextObj.isvalid = true;

        contextObj.checkGroupConditionValue(contextObj.QueryBuilderObj.SubGroups);
        if (contextObj.isvalid == false) {
            return;
        }
        else if (contextObj.QueryBuilderObj.SubGroups.length == 0 && contextObj.QueryBuilderObj.Conditions.length == 0) {
            contextObj._notificationService.ShowToaster("No Query found", 2);
            return;
        }
        else {
            contextObj.buildarray = this.computedOutput();
            if (this.buildarray == "[]" || this.buildarray == "") {
                this._notificationService.ShowToaster("No Query found", 2);
                return;
            }
            else {
                debugger
                if (contextObj.rowData == undefined)
                    contextObj.onSubmitData(0);
                else
                    contextObj.onUpdateData();
            }
        }
    }

    Delete() {
        var contextObj = this;
        var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;

        contextObj.commonService.QueryBuilderSearchDelete(contextObj.searchId).subscribe(function (result) {
            var fieldDetailsAdd1 = result["Data"];
            if (result.ServerId >= 0) {
                contextObj._notificationService.ShowToaster("Selected search criteria deleted", 3);
                contextObj.QueryBuilderObj = {
                    GroupId: 1,
                    Operator: 1,/*1-AND,2-OR*/
                    SubGroups: [],
                    Conditions: [],
                    OperatorFieldObj: newOperatorFieldObj,
                    Jointer: 1
                };
                contextObj.enableMenu = [];
            }
            else if (result.ServerId == -1) {
                contextObj._notificationService.ShowToaster("Access denied", 5);
            }
            else if (result.ServerId == -2) {
                contextObj._notificationService.ShowToaster("Selected name has no search criteria", 5);
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }

        });

    }
    SaveAsClick() {
        debugger
        var contextObj = this;
        contextObj.isvalid = true;
        contextObj.checkGroupConditionValue(contextObj.QueryBuilderObj.SubGroups);
        if (contextObj.isvalid == false) {
            return;
        }
        else if (contextObj.QueryBuilderObj.SubGroups.length == 0 && contextObj.QueryBuilderObj.Conditions.length == 0) {
            contextObj._notificationService.ShowToaster("No Query found", 2);
            return;
        }
        else {
            contextObj.buildarray = this.computedOutput();
            if (this.buildarray == "[]" || this.buildarray == "") {
                this._notificationService.ShowToaster("No Query found", 2);
                return;
            }
            else
            {
                contextObj.onSubmitData(1);
            }
        }
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.isSaveAsClicked = false;

                break;
            case 1:
                if (contextObj.searchId != "0") {
                    contextObj.commonService.CheckDeletePermisionForArchivedSearch(contextObj.searchId).subscribe(function (result) {
                        if (result == 1) {
                            contextObj.isSaveAsClicked = false;
                            contextObj.SaveClick();
                        } else {
                            contextObj._notificationService.ShowToaster("You do not have the privilege to save the search criteria saved by another user", 2);
                        }
                    });
                } else {

                    contextObj.isSaveAsClicked = false;
                    contextObj.SaveClick();
                }

                break;
            case 2:
                contextObj.isSaveAsClicked = true;
                contextObj.SaveAsClick();
                break;
            case 3:
                if (contextObj.searchId != "0") {
                    contextObj.commonService.CheckDeletePermisionForArchivedSearch(contextObj.searchId).subscribe(function (result) {
                        if (result == 1) {
                            contextObj.showSlide = true;
                            contextObj.isSaveAsClicked = false;
                        } else {
                            contextObj._notificationService.ShowToaster("You do not have the privilege to delete the search criteria saved by another user", 2);
                        }
                    });
                }

                break;
        }
    }

    getDrawingObject(event) {

        this.objiWhiz = event.dwgObject;
    }


    htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    handleKeyboardEvents(e) {
        if (!e) e = window.event;
    }

    ngOnChanges(changes: SimpleChanges) {

    }
    onSecondaryClose() {
        console.log("objiWhizobjiWhiz", this.objiWhiz);
        if (this.objiWhiz) {
            this.IsOpenDrawingComponentActive = false;
            this.objiWhiz.close(function (returnCode) {
            });
        }
    }


    buildGroupConditionQuery(SubGroups, endingBracketsCount, isNextGroupHasSubGroup, parentOperator, startgp) {

        var bracketcount = endingBracketsCount;
        var contextObj = this
        if (!contextObj.QueryBuilderObj) return "";
        for (var i = 0; i < SubGroups.length; i++) {

            parentOperator = SubGroups[i].Jointer;
            //}

            if (SubGroups[i].SubGroups.length > 0)
                isNextGroupHasSubGroup = true;
            else
                isNextGroupHasSubGroup = false;
            var innerGroupCount = startgp;
            if (SubGroups[i].Conditions.length > 0) {
                innerGroupCount = startgp + 1;
                this.buildConditionQuery(SubGroups[i].Conditions, i + 1, SubGroups.length, bracketcount, isNextGroupHasSubGroup, parentOperator, innerGroupCount);
                startgp = 0;
                innerGroupCount = 0;

            } else {
                innerGroupCount = startgp + 1;
            }


            if (SubGroups[i].SubGroups.length > 0) {
                if ((i + 1) == SubGroups.length) {
                    bracketcount = bracketcount + 1;
                }
                else {
                    isNextGroupHasSubGroup = SubGroups[i].SubGroups.length > 0 ? true : false;
                }
                console.log("endingBracketsCount", bracketcount);
                parentOperator = SubGroups[i].Operator;
                contextObj.buildGroupConditionQuery(SubGroups[i].SubGroups, bracketcount, isNextGroupHasSubGroup, parentOperator, innerGroupCount);
            }
        }


    }
    buildConditionQuery(conditionObject, currentsubGroup, subGroupsLength, endingBracketsCount, isNextGroupHasSubGroup, parentOperator, innerGroupCount) {

        if (!this.QueryBuilderObj) return "";

        for (var j = 0; j < conditionObject.length; j++) {
            if (j == 0) {
                this.objArray.push(
                    { ReportFieldId: 4318, Value: (currentsubGroup > 0 && this.objArray.length > 0) ? this.getLoopupValue(conditionObject[j].OperatorFieldObj, "Id", parentOperator).Sp : "-1" }
                )//operator
            }
            else {
                this.objArray.push(
                    { ReportFieldId: 4318, Value: this.getLoopupValue(conditionObject[j].OperatorFieldObj, "Id", conditionObject[j].OperatorFieldObj.FieldValue).Sp }
                )//operator
            }
            this.objArray.push(
                { ReportFieldId: -2222, Value: 'µ' }//column
            )
            //-------------
            var startBrackets = "("
            for (var i = 0; i < innerGroupCount - 1; i++) {
                startBrackets = startBrackets + "(";
            }
            //---------------
            this.objArray.push(
                { ReportFieldId: 2140, Value: j == 0 ? startBrackets : "-1" } //start gp
            )
            // }

            this.objArray.push(
                { ReportFieldId: -2222, Value: 'µ' }//column
            )

            this.objArray.push(
                { ReportFieldId: 352, Value: conditionObject[j].FldNameFieldObj.FieldValue }//fieldname
            )

            this.objArray.push(
                { ReportFieldId: -2222, Value: 'µ' }
            )

            this.objArray.push(
                { ReportFieldId: 2141, Value: this.getLoopupValue(conditionObject[j].ConditionFieldObj, "Id", conditionObject[j].ConditionFieldObj.FieldValue).Sp }
            )
            this.objArray.push(
                { ReportFieldId: -2222, Value: 'µ' }
            )
            this.objArray.push(
                { ReportFieldId: 4319, Value: (conditionObject[j].FldValueFieldObj.FieldValue == null || conditionObject[j].FldValueFieldObj.FieldValue == "") ? -1 : conditionObject[j].FldValueFieldObj.FieldValue }
            )

            this.objArray.push(
                { ReportFieldId: -2222, Value: 'µ' }
            )

            var endBrackets = ")"

            for (var i = 0; i < endingBracketsCount; i++) {
                endBrackets = endBrackets + ")";
            }
           /* else*/ this.objArray.push({ ReportFieldId: 2142, Value: (conditionObject.length - 1 == j && subGroupsLength == currentsubGroup && isNextGroupHasSubGroup == false) ? endBrackets : ((conditionObject.length - 1) == j && isNextGroupHasSubGroup == false) ? ")" : "-1" })

            this.objArray.push(
                { ReportFieldId: -1111, Value: '§' }
            )


        }


    }

    computedOutput() {

        this.objArray = [];
        this.qResult = undefined;
        var lastCount = 0;
        if (this.QueryBuilderObj.SubGroups.length == 0) {
            this.buildConditionQuery(this.QueryBuilderObj.Conditions, 0, this.QueryBuilderObj.SubGroups.length, 0, false, this.QueryBuilderObj.Operator, 0);
        }
        else {
            var startgp = 1;
            if (this.QueryBuilderObj.Conditions.length > 0) {

                this.buildConditionQuery(this.QueryBuilderObj.Conditions, 0, this.QueryBuilderObj.SubGroups.length, 0, true, this.QueryBuilderObj.Operator, startgp);
                startgp = 0;
            }


            this.buildGroupConditionQuery(this.QueryBuilderObj.SubGroups, 1, false, this.QueryBuilderObj.Operator, startgp);
        }
        console.log("computedOutput", this.objArray);
        return this.objArray != null ? JSON.stringify(this.objArray) : "";
    }

    getLoopupValue(Object, FieldName, selectedValue) {
        var index = Object.LookupDetails.LookupValues.find(function (el) { return el[FieldName] == selectedValue });
        return index;
    }

    loadOperatorLookup(contextObj) {
        var fieldNames;
        contextObj.commonService.getListFields("516").subscribe(function (result) {
            var queryFieldObj = result["Data"];
            var reportfields = new Array<ReportFieldArray>();
            if (contextObj.isObjectModule == true) {
                reportfields.push({
                    ReportFieldId: 3063,
                    Value: contextObj.objectCategoryId,
                });
                if (contextObj.attributeId == 1) {
                    reportfields.push({
                        ReportFieldId: 645,
                        Value: contextObj.selectedClassIds,
                    });
                }

            }


            contextObj.commonService.loadQueryFldNamesLookUp(contextObj.QueryCategryId, reportfields).subscribe(function (result) {
                fieldNames = JSON.parse(result["FieldBinderData"]);
                var lookupObj = [];
                for (var j = 0; j < fieldNames.length; j++) {
                    lookupObj.push({ Id: fieldNames[j]["Id"], Value: fieldNames[j]["FieldName"], Type: fieldNames[j]["GenericDataTypeId"] });
                }
                var data = queryFieldObj;
                for (var i = 0; i < data.length; i++) {

                    /*populating Field Name lookUp*/
                    if (data[i].ReportFieldId == 4318) {

                        data[i].LookupDetails.LookupValues = contextObj.operators;
                        data[i].FieldValue = "1";
                    }
                    if (data[i].ReportFieldId == 352) {
                        data[i].LookupDetails.LookupValues = lookupObj;
                        data[i].FieldValue = lookupObj[0].Id;
                    }
                    if (data[i].ReportFieldId == 2141) {
                        data[i].LookupDetails.LookupValues = contextObj.conditionLookUp;
                        data[i].FieldValue = "1";
                    }
                }
                contextObj.genericfieldobjects = data;


                contextObj.QueryBuilderObj.OperatorFieldObj = contextObj.genericfieldobjects[0];
                contextObj.clearQueryFields();
            });
        });


    }

    checkGroupConditionValue(SubGroups) {
        for (var j = 0; j < this.QueryBuilderObj.Conditions.length; j++) {
            var fieldFldValue = this.QueryBuilderObj.Conditions[j].FldValueFieldObj;
            var FieldLabel1 = this.QueryBuilderObj.Conditions[j].FldValueFieldObj.FieldLabel;
            var fieldLabelData = this.QueryBuilderObj.Conditions[j].FldNameFieldObj.FieldValue;
            fieldLabelData = this.getLoopupValue(this.QueryBuilderObj.Conditions[j].FldNameFieldObj, "Id", this.QueryBuilderObj.Conditions[j].FldNameFieldObj.FieldValue).Value;

            var fieldCondition = this.QueryBuilderObj.Conditions[j].ConditionFieldObj;
            if ((fieldFldValue.HasValidationError) && (fieldCondition.FieldValue != "4" && fieldCondition.FieldValue != "5" && (fieldFldValue.FieldValue == "" || fieldFldValue.FieldValue == null))) {
                this._notificationService.ShowToaster("Enter " + FieldLabel1 + " for " + fieldLabelData, 2);
                this.isvalid = false;
                // return;
            }
            else if ((fieldFldValue.HasValidationError) && (fieldCondition.FieldValue != "4" && fieldCondition.FieldValue != "5")) {
                this._notificationService.ShowToaster("Special characters are not allowed in " + fieldLabelData, 2);
                this.isvalid = false;
                // return;
            }
        }
        for (var i = 0; i < SubGroups.length; i++) {
            for (var j = 0; j < SubGroups[i].Conditions.length; j++) {
                fieldFldValue = SubGroups[i].Conditions[j].FldValueFieldObj;
                var FieldLabel2 = SubGroups[i].Conditions[j].FldValueFieldObj.FieldLabel;
                var fieldLabelData1 = SubGroups[i].Conditions[j].FldNameFieldObj.FieldValue;
                fieldLabelData = this.getLoopupValue(SubGroups[i].Conditions[j].FldNameFieldObj, "Id", SubGroups[i].Conditions[j].FldNameFieldObj.FieldValue).Value;
                var fieldCondition1 = SubGroups[i].Conditions[j].ConditionFieldObj;
                if (fieldFldValue.HasValidationError && (fieldCondition1.FieldValue != "4" && fieldCondition1.FieldValue != "5" && (fieldFldValue.FieldValue == "" || fieldFldValue.FieldValue == null))) {
                    this._notificationService.ShowToaster("Enter " + FieldLabel2 + " for " + fieldLabelData, 2);
                    this.isvalid = false;
                    //return;
                }
                else if (fieldFldValue.HasValidationError && (fieldCondition1.FieldValue != "4" && fieldCondition1.FieldValue != "5")) {
                    this._notificationService.ShowToaster("Special characters are not allowed in " + fieldLabelData, 2);
                    this.isvalid = false;
                    //return;
                }

            }
            if (SubGroups[i].SubGroups.length > 0 && this.isvalid == true) {
                this.checkGroupConditionValue(SubGroups[i].SubGroups);
            }

        }

    }

    public onSplitViewClose(event, index) {

        if (index == 1) {
            this.splitviewInput.showSecondaryView = false;
        }
        else
            this.splitviewInput1.showSecondaryView = false;

    }
    public save() {
        var contextObj = this;
        // contextObj.buildarray = this.computedOutput();
        var reportfields = new Array<ReportFieldArray>();
        contextObj.commonService.SaveQueryBuilder(contextObj.searchId, contextObj.QueryCategryId, contextObj.buildarray).subscribe(function (result) {
            if (result["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (result["ServerId"] > 0) {
                contextObj._notificationService.ShowToaster("Search criteria saved", 3);
                contextObj.qResult = undefined;
                contextObj.objArray = [];
                // contextObj.loadSearchNames();
            }
            else {
            }
            contextObj.splitviewInput.showSecondaryView = false;
        });

    }

    onSubmitData(event) {
        debugger
        var contextObj = this;
        if (contextObj.spaceTypeObj[1].HasValidationError == true) {
            return;
        }
        contextObj.buildarray = this.computedOutput();
        var reportfields = new Array<ReportFieldArray>();
        reportfields.push({
            ReportFieldId: 941,
            Value: contextObj.spaceTypeObj[1].FieldValue,
        });

        contextObj.commonService.SubmitQuerySpaceType(reportfields).subscribe(function (result) {
            if (result.Data["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Space Type already exists", 5);
            }
            else if (result.Data["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);


            else {
                if (result.Data["ServerId"] > 0) {

                    var searchId = result.Data["ServerId"];
                    contextObj.commonService.SaveQueryBuilder(searchId, "-1", contextObj.buildarray).subscribe(function (result1) {
                        if (result1["Message"] != "Success")
                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else {
                            contextObj._notificationService.ShowToaster("Space Type saved", 3);
                            //contextObj.qResult = undefined;
                            //contextObj.objArray = [];
                            contextObj.clearQueryFields();

                        }
                        contextObj.submitSuccess.emit({ returnData: result["Data"]["Data"], SaveAs: event });
                    });
                }
            }

        });
    }

    onUpdateData() {
        var contextObj = this;
        if (contextObj.spaceTypeObj[1].HasValidationError == true) {
            return;
        }
        contextObj.buildarray = this.computedOutput();
        var reportfields = new Array<ReportFieldArray>();
        reportfields.push({
            ReportFieldId: 941,
            Value: contextObj.spaceTypeObj[1].FieldValue,
        });
        contextObj.commonService.UpdateQuerySpaceType(contextObj.rowData["Id"], reportfields).subscribe(function (result) {
            if (result.Data["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Space Type already exists", 5);
            }
            else if (result.Data["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);


            else {
                if (result.Data["ServerId"] > 0) {

                    var searchId = result.Data["ServerId"];
                    contextObj.commonService.SaveQueryBuilder(searchId, "-1", contextObj.buildarray).subscribe(function (result1) {
                        if (result1["Message"] != "Success")
                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else {
                            contextObj._notificationService.ShowToaster("Space Type Updated", 3);
                            //contextObj.qResult = undefined;
                            //contextObj.objArray = [];
                            contextObj.clearQueryFields();

                        }
                        contextObj.submitSuccess.emit({ returnData: result["Data"]["Data"],SaveAs : 0 });
                    });
                }
            }

        });
    }


    clearQueryFields() {
        var contextObj = this;
        var newOperatorFieldObj: IField = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;
        contextObj.QueryBuilderObj = {
            GroupId: 1,
            Operator: 1,/*1-AND,2-OR*/
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: newOperatorFieldObj, Jointer: 1
        };
        contextObj.qResult = undefined;
        contextObj.objArray = [];
    }
    Next(event: any) {
        var contextObj = this;
        //  Some of the saved queries cannot be loaded as it contains < Class Attributes> of other < Classes >

        contextObj.onClassSelected();


    }
    okDeleteClick(event: any) {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.Delete();


    }

    onClassSelected() {
        var contextObj = this;
        contextObj.selectedClassIds = "";
        if (contextObj.fieldDetailsCheckBox.MultiFieldValues == null || contextObj.fieldDetailsCheckBox.MultiFieldValues.length == 0) {
            contextObj._notificationService.ShowToaster("Select an Asset Class", 5);
            //  contextObj._notificationService.ShowToaster("Select Component Type(s)", 5);
        } else {
            var MultiFieldValues = contextObj.fieldDetailsCheckBox.MultiFieldValues;
            for (var count = 0; count < contextObj.fieldDetailsCheckBox.MultiFieldValues.length; count++) {
                contextObj.selectedClassIds = contextObj.selectedClassIds + contextObj.fieldDetailsCheckBox.MultiFieldValues[count] + ',';
            }

            contextObj.attributeId = contextObj.fieldDetailsCheckBox.MultiFieldValues.length > 1 ? 2 : 1;
            //if (contextObj.attributeId == 2) {
            //    contextObj._notificationService.ShowToaster("Some of the saved queries cannot be loaded as it contains " + contextObj.attributetitle + " of other " + contextObj.TabObjectTitle, 2);
            //}
            contextObj.selectedClassIds = contextObj.selectedClassIds.slice(0, -1);
            contextObj.isNextClicked = true;
            contextObj.querybuildercloseButtonVisible = 'visible'
            setTimeout(function () {

            }, 50);

        }
    }
    pagepathchange(event: any) {
        this.pagePath = null;
        this.pagePath = "Assets / Data ";
    }
    cancelClick(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    ReplaceWithLabel() {
        var contextObj = this;      
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface customRptObj {
    action: string;
    selectedRptId: number;
}

