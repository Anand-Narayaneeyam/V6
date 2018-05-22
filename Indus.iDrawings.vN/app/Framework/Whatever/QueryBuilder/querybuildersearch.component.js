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
var split_view_component_1 = require('../../Whatever/Split-View/split-view.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var common_service_1 = require('../../../Models/Common/common.service');
var group_component_1 = require('../../../Framework/Whatever/QueryBuilder/group.component');
var searchquery_component_1 = require('../../../Framework/Whatever/QueryBuilder/searchquery.component');
var spacedata_grid_component_1 = require('../../../whatever/space/space data/spacedata-grid.component');
var employeeData_1 = require('../../../whatever/employee/data/employeeData');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var opendrawing_component_1 = require('../../../whatever/common/opendrawing/opendrawing.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var objects_service_1 = require('../../../models/objects/objects.service');
var objectData_list_component_1 = require('../../../whatever/Objects/Data/objectData-list.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var administration_service_1 = require('../../../models/administration/administration.service');
var documentlist_component_1 = require('../../../whatever/documents/documents/documentlist.component');
var QueryBuilderComponent = (function () {
    function QueryBuilderComponent(administrationService, generFun, objectsService, commonService, myElement, _notificationService) {
        this.administrationService = administrationService;
        this.generFun = generFun;
        this.objectsService = objectsService;
        this.commonService = commonService;
        this._notificationService = _notificationService;
        this.onQueryBuilderSearch = new core_1.EventEmitter();
        this.pagePath = "";
        this.TabObjectTitle = "";
        this.attributetitle = "";
        this.objArray = new Array();
        this.searchedQuery = '';
        this.filteredList = [];
        this.position = "top-right";
        this.showSlide = false;
        this.buildarray = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.splitviewInput1 = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.selectedTab = 0;
        this.isvalid = true;
        this.drawingType = 1;
        this.selectedDrwgIds = ["0"];
        this.enableMenu = [0, 1];
        this.isQResultTabEnabled = false;
        this.isQResultEnabled = false;
        this.isSaveAsClicked = false;
        this.isObjectModule = false;
        this.querybuildercloseButtonVisible = 'hidden';
        this.IsOpenDrawingComponentActive = false;
        this.tabDeleteIndex = 0;
        this.searchId = "0";
        this.dataoption = "1";
        this.isNextClicked = false;
        this.selectedClassIds = '';
        this.attributeId = 1;
        this.IsClassSpecific = 0;
        this.menuData = [
            {
                "id": 0,
                "title": "Generate",
                "image": "Generate",
                "path": "Generate",
                "subMenu": null,
                "privilegeId": 298
            },
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
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 298
            }
        ];
        this.QueryBuilderObj = {
            GroupId: 1,
            Operator: 1,
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: null,
            Jointer: 1
        };
        this.operators = [
            { Id: 1, Value: 'AND', Sp: "ÿ" },
            { Id: 2, Value: 'OR', Sp: "OR" }
        ];
        this.conditionLookUp = [
            { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
            { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },
            { Id: 3, Value: "Contains", Exp: 'LIKE', Sp: "Ñ" },
            { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
            { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },
        ];
        this.conditionLookUpInt = [
            { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
            { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },
            { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
            { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },
            { Id: 6, Value: "Less than", Exp: '<', Sp: "é" },
            { Id: 7, Value: "Greater than", Exp: '>', Sp: "ü" }
        ];
        var contextObj = this;
        contextObj.elementRef = myElement;
    }
    ;
    QueryBuilderComponent.prototype.setPagePath = function () {
        switch (this.moduleId) {
            case 3:
                this.pagePath = "Space / Query Builder";
                break;
            case 5:
                this.pagePath = "Employee / Query Builder";
                break;
            case 7:
                this.pagePath = "Asset / Query Builder";
                break;
            case 8:
                this.pagePath = "Furniture / Query Builder";
                break;
            case 6:
                this.pagePath = "Telecom / Query Builder";
                break;
            case 17:
                this.pagePath = "Elecrical / Query Builder";
                break;
            case 18:
                this.pagePath = "Fire and Safety / Query Builder";
                break;
        }
    };
    QueryBuilderComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.setPagePath();
        contextObj.checkObjectModule();
        var reportfieldIdArray = new Array();
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: this.QueryCategryId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: "1",
        });
        contextObj.loadSearchNames();
        console.log(contextObj.objectCategoryId);
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
        }
        else {
            contextObj.loadOperatorLookup(contextObj);
        }
        var callBack = function (data) {
            if (contextObj.Target == 1)
                data = data.filter(function (el) { return el.id == 0; });
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 217, contextObj.administrationService, contextObj.menuData.length);
    };
    QueryBuilderComponent.prototype.checkObjectModule = function () {
        var contextObj = this;
        switch (contextObj.QueryCategryId) {
            case "11": //telecom
            case "9": //assets
            case "10": //furniture
            case "20": //electrical
            case "21": //fire and safety
            case "39": //security assets
            case "23": //mechanical
            case "24": //plumbing
            case "25":
                contextObj.isObjectModule = true;
                contextObj.isNextClicked = false; //for object module only
                break;
            default:
                contextObj.isObjectModule = false;
                contextObj.isNextClicked = true;
                break;
        }
    };
    QueryBuilderComponent.prototype.loadSearchNames = function () {
        var contextObj = this;
        contextObj.commonService.getListFields("536").subscribe(function (resultData) {
            contextObj.searchNamesObj = resultData.Data;
            if (contextObj.searchNamesObj[0].ReportFieldId == 2137) {
                var reportfieldIdArray = new Array();
                reportfieldIdArray.push({
                    ReportFieldId: 2145,
                    Value: contextObj.QueryCategryId,
                });
                reportfieldIdArray.push({
                    ReportFieldId: 2146,
                    Value: "1",
                });
                if (contextObj.isObjectModule == true) {
                    var classId = "";
                    classId = contextObj.attributeId == 1 ? contextObj.selectedClassIds : "0";
                    reportfieldIdArray.push({
                        ReportFieldId: 647,
                        Value: classId,
                    });
                }
                contextObj.commonService.ddlSavedSearches(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
                    debugger;
                    if (resultData["FieldBinderData"] != "[]") {
                        contextObj.searchNamesObj[0].LookupDetails.LookupValues = JSON.parse(resultData["FieldBinderData"]);
                    }
                    else {
                        contextObj.searchNamesObj[0].LookupDetails.LookupValues = [];
                    }
                    contextObj.searchNamesObj[0].FieldValue = "-1";
                });
            }
        });
    };
    QueryBuilderComponent.prototype.findParentGrp = function (grpId, grpArray, parentofActiveGroup) {
        for (var i = 0; i < grpArray.length; i++) {
            if (grpArray[i].GroupId == grpId) {
                return parentofActiveGroup;
            }
        }
        for (var i = 0; i < grpArray.length; i++) {
            return this.findParentGrp(grpId, grpArray[i].SubGroups, grpArray[i]);
        }
    };
    QueryBuilderComponent.prototype.findendGroup = function (grpId, grpArray) {
        var ConditionId = -1;
        for (var i = 0; i < grpArray.length; i++) {
            for (var j = 0; j < grpArray[i].Conditions.length; j++) {
                if (grpArray[i].Conditions[j].ConditionFieldObj.FieldValue == ")") {
                    return ConditionId = grpArray[i].Conditions[j].ConditionId;
                }
            }
        }
        return ConditionId;
    };
    QueryBuilderComponent.prototype.findoperatorInGroup = function (ConditionFieldObj, grpArray) {
        if (grpArray.length > 1) {
            return this.getLoopupValue(ConditionFieldObj, "Value", grpArray[1].Condition).Id;
        }
        else
            return "1";
    };
    QueryBuilderComponent.prototype.populateQBObject = function (savedSearchData) {
        debugger;
        var contextObj = this;
        var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;
        var arrSavedSearchData = JSON.parse(savedSearchData);
        contextObj.QueryBuilderObj = {
            GroupId: 1,
            Operator: 1,
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
                    var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
                    newOperatorFieldObj.FieldId = activeGroupObj.GroupId + countofSubGrps + 1;
                    //Checking new group started and create gp object
                    var newGroup = {
                        GroupId: activeGroupObj.GroupId + countofSubGrps + 1,
                        Operator: 1,
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
                    var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
                    newOperatorFieldObj.FieldId = activeGroupObj.GroupId + countofSubGrps + 1;
                    //Checking new group started and create gp object
                    var newGroup = {
                        GroupId: activeGroupObj.GroupId + countofSubGrps + 1,
                        Operator: 1,
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
            var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
            newOperatorFieldObj.FieldId = 100 + CondId + 9999;
            var newFldNameFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[1]));
            newFldNameFieldObj.FieldId = 100 + CondId + 8888;
            var newConditionFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[2]));
            newConditionFieldObj.FieldId = 100 + CondId + 7777;
            var newFldValueFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[3]));
            newFldValueFieldObj.FieldId = 100 + CondId + 6666;
            //Checking condition in group and create condition object
            var conditionObj = {
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
            var Field = contextObj.getLoopupValue(conditionObj.FldNameFieldObj, "Id", fieldNameValue); //equal to
            if (Field) {
                var FieldType = contextObj.getLoopupValue(conditionObj.FldNameFieldObj, "Id", fieldNameValue).Type; //equal to
                //Type switiching according type of field name
                switch (FieldType) {
                    case 6:
                        conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp;
                        break;
                    default:
                        conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                        break;
                }
            }
            else {
                conditionObj.ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp;
            }
            //Assign Operator Value(AND/OR )//main operator
            if (arrSavedSearchData.length > 0) {
                var operatorValue = contextObj.findoperatorInGroup(conditionObj.OperatorFieldObj, arrSavedSearchData);
                activeGroupObj.OperatorFieldObj.FieldValue = operatorValue;
            }
            //Set Field Values
            if (i > 0 && conditionObj.OperatorFieldObj && savedConditionfromDB["Condition"]) {
                conditionObj.OperatorFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.OperatorFieldObj, "Value", savedConditionfromDB["Condition"]).Id; //AND/OR
            }
            if (savedConditionfromDB["OperatorValue"] == "IS") {
                // conditionObj.ConditionFieldObj.FieldValue = "4";
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Exp", "IS NULL").Id; //equal to
                conditionObj.FldValueFieldObj.FieldValue = "";
            }
            else if (savedConditionfromDB["OperatorValue"] == "IS NOT") {
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Exp", "IS NOT NULL").Id; //equal to
                conditionObj.FldValueFieldObj.FieldValue = "";
            }
            else {
                conditionObj.ConditionFieldObj.FieldValue = contextObj.getLoopupValue(conditionObj.ConditionFieldObj, "Value", savedConditionfromDB["Operator"]).Id; //equal to
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
    };
    QueryBuilderComponent.prototype.groupAddClicked = function (event) {
        this.QueryBuilderObj = event.returnData;
    };
    QueryBuilderComponent.prototype.onchangeddlsearchNames = function (event) {
        var contextObj = this;
        contextObj.searchId = event == "-1" ? "0" : event;
        if (contextObj.searchId != "0")
            contextObj.enableMenu = [0, 1, 2, 3];
        else
            contextObj.enableMenu = [0, 1];
        /*Ajax call for fetching data*/
        var reportfieldIdArray = new Array();
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: contextObj.QueryCategryId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: "1",
        });
        reportfieldIdArray.push({
            ReportFieldId: 2143,
            Value: contextObj.searchId,
        });
        contextObj.commonService.GetArchivedSearches(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            var result = resultData.FieldBinderData;
            contextObj.populateQBObject(result);
        });
    };
    QueryBuilderComponent.prototype.LoadQueryForCustomReport = function () {
        var contextObj = this;
        if (contextObj.customRptObj && contextObj.Target == 1 && contextObj.customRptObj[0].action == "Edit") {
            var reportfieldIdArray = new Array();
            reportfieldIdArray.push({
                ReportFieldId: 147,
                Value: contextObj.customRptObj[0].selectedRptId.toString(),
            });
            contextObj.commonService.getCustomReportCondition(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
                var result = resultData.FieldBinderData;
                contextObj.populateQBObject(result);
            });
        }
    };
    QueryBuilderComponent.prototype.SaveClick = function () {
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
                if (contextObj.searchId != "0") {
                    contextObj.save();
                }
                else {
                    contextObj.commonService.loadAddEdit(0, 525, "", 1).subscribe(function (resultData) {
                        contextObj.fieldDetailsAdd = resultData["Data"];
                        contextObj.isSaveClicked = true;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
            }
        }
    };
    QueryBuilderComponent.prototype.Delete = function () {
        var contextObj = this;
        var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;
        contextObj.commonService.QueryBuilderSearchDelete(contextObj.searchId).subscribe(function (result) {
            var fieldDetailsAdd1 = result["Data"];
            if (result.ServerId >= 0) {
                contextObj._notificationService.ShowToaster("Selected search criteria deleted", 3);
                contextObj.loadSearchNames();
                contextObj.QueryBuilderObj = {
                    GroupId: 1,
                    Operator: 1,
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
    };
    QueryBuilderComponent.prototype.SaveAsClick = function () {
        var contextObj = this;
        contextObj.isvalid = true;
        this.checkGroupConditionValue(this.QueryBuilderObj.SubGroups);
        if (this.isvalid == false) {
            return;
        }
        else if (this.QueryBuilderObj.SubGroups.length == 0 && this.QueryBuilderObj.Conditions.length == 0) {
            this._notificationService.ShowToaster("No Query found", 2);
            return;
        }
        else {
            if (this.buildarray == "[]" || this.buildarray == "") {
                this._notificationService.ShowToaster("No Query found", 2);
                return;
            }
            else {
                contextObj.commonService.loadAddEdit(0, 525, "", 1).subscribe(function (resultData) {
                    contextObj.fieldDetailsAdd = resultData["Data"];
                    contextObj.isSaveClicked = true;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    QueryBuilderComponent.prototype.onSubMenuChange = function (event) {
        debugger;
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.isSaveAsClicked = false;
                contextObj.Search();
                break;
            case 1:
                if (contextObj.searchId != "0") {
                    contextObj.commonService.CheckDeletePermisionForArchivedSearch(contextObj.searchId).subscribe(function (result) {
                        if (result == 1) {
                            contextObj.isSaveAsClicked = false;
                            contextObj.SaveClick();
                        }
                        else {
                            contextObj._notificationService.ShowToaster("You do not have the privilege to save the search criteria saved by another user", 2);
                        }
                    });
                }
                else {
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
                        }
                        else {
                            contextObj._notificationService.ShowToaster("You do not have the privilege to delete the search criteria saved by another user", 2);
                        }
                    });
                }
                break;
        }
    };
    QueryBuilderComponent.prototype.openDrawing = function (selectedIds) {
        var contextObj = this;
        contextObj.selectedSpaceIds = selectedIds;
        if (contextObj.IsOpenDrawingComponentActive) {
            this.IsOpenDrawingComponentActive = false;
        }
        setTimeout(function () {
            contextObj.IsOpenDrawingComponentActive = true;
        }, 50);
        contextObj.splitviewInput1.showSecondaryView = !contextObj.splitviewInput1.showSecondaryView;
    };
    QueryBuilderComponent.prototype.closeResultsTab = function () {
        if (this.qResult) {
            var toBedeletedIndex = 1;
            if (this.isObjectModule == true) {
                toBedeletedIndex = 2;
            }
            var contextObj = this;
            setTimeout(function () {
                contextObj.tabDeleteIndex = toBedeletedIndex;
            }, 50);
            setTimeout(function () {
                contextObj.tabDeleteIndex = 0;
                if (this.isObjectModule == true) {
                    contextObj.selectedTab = 1;
                }
            }, 50);
            contextObj.objArray = [];
            contextObj.qResult = undefined;
        }
    };
    QueryBuilderComponent.prototype.spShowInDrawingOnClick = function (event) {
        this.dwgPageTarget = 3;
        this.selectedDrawingId = event["drawingId"];
        this.openDrawing(event["selectedIds"]);
    };
    QueryBuilderComponent.prototype.spShowZoomOnClick = function (event) {
        this.dwgPageTarget = 4;
        this.selectedDrawingId = event["drawingId"];
        this.openDrawing(event["selectedIds"]);
    };
    QueryBuilderComponent.prototype.onTabClose = function (event) {
        this.selectedTab = 0;
        this.qResult = undefined;
        this.objArray = [];
        // this.spaceTabEnabled = false;
    };
    QueryBuilderComponent.prototype.getDrawingObject = function (event) {
        this.objiWhiz = event.dwgObject;
    };
    QueryBuilderComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        //this.objArray = [];
        //this.qResult = undefined;
        console.log("contextObj.selectedTab 1", contextObj.selectedTab);
        contextObj.selectedTab = event[0];
        if (contextObj.selectedTab == 1 && contextObj.isObjectModule == true) {
            if (event[1] == true) {
                contextObj.closeResultsTab();
            }
            else {
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 60);
            }
        }
        if (contextObj.selectedTab == 0 && contextObj.isObjectModule == true && event.length == 3) {
            if (event[1] == true) {
                contextObj.closeResultsTab();
            }
        }
        contextObj.setPagePath();
    };
    QueryBuilderComponent.prototype.htmlEntities = function (str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    QueryBuilderComponent.prototype.handleKeyboardEvents = function (e) {
        if (!e)
            e = window.event;
    };
    QueryBuilderComponent.prototype.ngOnChanges = function (changes) {
    };
    QueryBuilderComponent.prototype.onSecondaryClose = function () {
        console.log("objiWhizobjiWhiz", this.objiWhiz);
        if (this.objiWhiz) {
            this.IsOpenDrawingComponentActive = false;
            this.objiWhiz.close(function (returnCode) {
            });
        }
    };
    /**
     * µ(µ2055µ>''test''µ)§
       µ(µ2055µ>''test''µ§ANDµµ2055µ>''test1''µ)§'
    
        1.ColumnSperator+
        2.Start Gp+
        3.Column Sperator+
        4.FieldId+
        5.Column Sperator+
        6.Contion Operator+
        7.ColumnSperator+
        8.Field value+
        9.ColumnSperator+
        10.i==0 Start Gp+
        11.Row Seperator+
        12.operator
        +
        ColumnSperator+Start Gp+Column Sperator+FieldId+Column Sperator+Contion Operator+Field value+ColumnSperator+Row Seperator
     */
    QueryBuilderComponent.prototype.buildGroupConditionQuery = function (SubGroups, endingBracketsCount, isNextGroupHasSubGroup, parentOperator, startgp) {
        var bracketcount = endingBracketsCount;
        var contextObj = this;
        if (!contextObj.QueryBuilderObj)
            return "";
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
            }
            else {
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
    };
    QueryBuilderComponent.prototype.buildConditionQuery = function (conditionObject, currentsubGroup, subGroupsLength, endingBracketsCount, isNextGroupHasSubGroup, parentOperator, innerGroupCount) {
        if (!this.QueryBuilderObj)
            return "";
        for (var j = 0; j < conditionObject.length; j++) {
            if (j == 0) {
                this.objArray.push({ ReportFieldId: 4318, Value: (currentsubGroup > 0 && this.objArray.length > 0) ? this.getLoopupValue(conditionObject[j].OperatorFieldObj, "Id", parentOperator).Sp : "-1" }); //operator
            }
            else {
                this.objArray.push({ ReportFieldId: 4318, Value: this.getLoopupValue(conditionObject[j].OperatorFieldObj, "Id", conditionObject[j].OperatorFieldObj.FieldValue).Sp }); //operator
            }
            this.objArray.push({ ReportFieldId: -2222, Value: 'µ' } //column
            );
            //-------------
            var startBrackets = "(";
            for (var i = 0; i < innerGroupCount - 1; i++) {
                startBrackets = startBrackets + "(";
            }
            //---------------
            this.objArray.push({ ReportFieldId: 2140, Value: j == 0 ? startBrackets : "-1" } //start gp
            );
            // }
            this.objArray.push({ ReportFieldId: -2222, Value: 'µ' } //column
            );
            this.objArray.push({ ReportFieldId: 352, Value: conditionObject[j].FldNameFieldObj.FieldValue } //fieldname
            );
            this.objArray.push({ ReportFieldId: -2222, Value: 'µ' });
            this.objArray.push({ ReportFieldId: 2141, Value: this.getLoopupValue(conditionObject[j].ConditionFieldObj, "Id", conditionObject[j].ConditionFieldObj.FieldValue).Sp });
            this.objArray.push({ ReportFieldId: -2222, Value: 'µ' });
            this.objArray.push({ ReportFieldId: 4319, Value: (conditionObject[j].FldValueFieldObj.FieldValue == null || conditionObject[j].FldValueFieldObj.FieldValue == "") ? -1 : conditionObject[j].FldValueFieldObj.FieldValue });
            this.objArray.push({ ReportFieldId: -2222, Value: 'µ' });
            var endBrackets = ")";
            for (var i = 0; i < endingBracketsCount; i++) {
                endBrackets = endBrackets + ")";
            }
            /* else*/ this.objArray.push({ ReportFieldId: 2142, Value: (conditionObject.length - 1 == j && subGroupsLength == currentsubGroup && isNextGroupHasSubGroup == false) ? endBrackets : ((conditionObject.length - 1) == j && isNextGroupHasSubGroup == false) ? ")" : "-1" });
            this.objArray.push({ ReportFieldId: -1111, Value: '§' });
        }
    };
    QueryBuilderComponent.prototype.computedOutput = function () {
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
    };
    QueryBuilderComponent.prototype.getLoopupValue = function (Object, FieldName, selectedValue) {
        var index = Object.LookupDetails.LookupValues.find(function (el) { return el[FieldName] == selectedValue; });
        return index;
    };
    QueryBuilderComponent.prototype.loadOperatorLookup = function (contextObj) {
        var fieldNames;
        contextObj.commonService.getListFields("516").subscribe(function (result) {
            var queryFieldObj = result["Data"];
            var reportfields = new Array();
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
                contextObj.LoadQueryForCustomReport();
                contextObj.clearQueryFields();
            });
        });
    };
    QueryBuilderComponent.prototype.checkGroupConditionValue = function (SubGroups) {
        for (var j = 0; j < this.QueryBuilderObj.Conditions.length; j++) {
            var fieldFldValue = this.QueryBuilderObj.Conditions[j].FldValueFieldObj;
            var FieldLabel1 = this.QueryBuilderObj.Conditions[j].FldValueFieldObj.FieldLabel;
            var fieldLabelData = this.QueryBuilderObj.Conditions[j].FldNameFieldObj.FieldValue;
            fieldLabelData = this.getLoopupValue(this.QueryBuilderObj.Conditions[j].FldNameFieldObj, "Id", this.QueryBuilderObj.Conditions[j].FldNameFieldObj.FieldValue).Value;
            var fieldCondition = this.QueryBuilderObj.Conditions[j].ConditionFieldObj;
            if ((fieldFldValue.HasValidationError) && (fieldCondition.FieldValue != "4" && fieldCondition.FieldValue != "5" && (fieldFldValue.FieldValue == "" || fieldFldValue.FieldValue == null))) {
                this._notificationService.ShowToaster("Enter " + FieldLabel1 + " for " + fieldLabelData, 2);
                this.isvalid = false;
            }
            else if ((fieldFldValue.HasValidationError) && (fieldCondition.FieldValue != "4" && fieldCondition.FieldValue != "5")) {
                this._notificationService.ShowToaster("Special characters are not allowed in " + fieldLabelData, 2);
                this.isvalid = false;
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
                }
                else if (fieldFldValue.HasValidationError && (fieldCondition1.FieldValue != "4" && fieldCondition1.FieldValue != "5")) {
                    this._notificationService.ShowToaster("Special characters are not allowed in " + fieldLabelData, 2);
                    this.isvalid = false;
                }
            }
            if (SubGroups[i].SubGroups.length > 0 && this.isvalid == true) {
                this.checkGroupConditionValue(SubGroups[i].SubGroups);
            }
        }
    };
    QueryBuilderComponent.prototype.Search = function () {
        this.isvalid = true;
        this.closeResultsTab();
        this.checkGroupConditionValue(this.QueryBuilderObj.SubGroups);
        if (this.isvalid == false) {
            return;
        }
        else if (this.QueryBuilderObj.SubGroups.length == 0 && this.QueryBuilderObj.Conditions.length == 0) {
            this._notificationService.ShowToaster("No Query found", 2);
            return;
        }
        else {
            this.buildarray = this.computedOutput();
            if (this.buildarray == "[]" || this.buildarray == "") {
                this._notificationService.ShowToaster("No Query found", 2);
                return;
            }
            else {
                console.log("OnSearch", this.buildarray);
                var contextObj = this;
                if (contextObj.isObjectModule) {
                    this.commonService.QueryBuilderSearchResultsForObjects(516, this.buildarray, this.QueryCategryId, "", this.objectCategoryId, 0, contextObj.attributeId, this.selectedClassIds, 0, "", "").subscribe(function (result) {
                        var fieldNames = result["FieldBinderData"] != "" ? JSON.parse(result["FieldBinderData"]) : "";
                        if (fieldNames.length == 0 || fieldNames["Column1"] == -9999)
                            contextObj._notificationService.ShowToaster("No data exists for the search criteria", 2);
                        else
                            contextObj._notificationService.ShowToaster(result["DataCount"] + " data found", 2, null, 8000);
                        if (result["DataCount"] > 0) {
                            setTimeout(function () {
                                contextObj.selectedTab = 2;
                            }, 200);
                            contextObj.qResult = result;
                        }
                    });
                }
                else if (contextObj.Target == 1) {
                    contextObj.onQueryBuilderSearch.emit({ query: this.buildarray });
                }
                else {
                    this.commonService.QueryBuilderSeachResult(516, this.buildarray, this.QueryCategryId, 0, 0, "", "").subscribe(function (result) {
                        var fieldNames = result["FieldBinderData"] != "" ? JSON.parse(result["FieldBinderData"]) : "";
                        if (fieldNames.length == 0)
                            contextObj._notificationService.ShowToaster("No data exists for the search criteria", 2);
                        else
                            contextObj._notificationService.ShowToaster(result["DataCount"] + " data found", 2, null, 8000);
                        if (result["DataCount"] > 0) {
                            setTimeout(function () {
                                contextObj.selectedTab = 1;
                            }, 200);
                            contextObj.qResult = result;
                        }
                    });
                }
            }
        }
    };
    QueryBuilderComponent.prototype.onSplitViewClose = function (event, index) {
        if (index == 1) {
            this.splitviewInput.showSecondaryView = false;
        }
        else
            this.splitviewInput1.showSecondaryView = false;
    };
    QueryBuilderComponent.prototype.save = function () {
        var contextObj = this;
        // contextObj.buildarray = this.computedOutput();
        var reportfields = new Array();
        contextObj.commonService.SaveQueryBuilder(contextObj.searchId, contextObj.QueryCategryId, contextObj.buildarray).subscribe(function (result) {
            if (result["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (result["ServerId"] > 0) {
                contextObj._notificationService.ShowToaster("Search criteria saved", 3);
                contextObj.qResult = undefined;
                contextObj.objArray = [];
            }
            else {
            }
            contextObj.splitviewInput.showSecondaryView = false;
        });
    };
    QueryBuilderComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        contextObj.buildarray = this.computedOutput();
        var reportfields = new Array();
        reportfields.push({
            ReportFieldId: 2144,
            Value: JSON.parse(event["fieldobject"])[0].Value,
        });
        reportfields.push({
            ReportFieldId: 2145,
            Value: this.QueryCategryId,
        });
        reportfields.push({
            ReportFieldId: 2146,
            Value: "1",
        });
        reportfields.push({
            ReportFieldId: 2148,
            Value: "",
        });
        reportfields.push({
            ReportFieldId: 6438,
            Value: JSON.parse(event["fieldobject"])[1].Value == "true" ? "1" : "0"
        });
        contextObj.commonService.SaveQueryBuilderSearchName(reportfields).subscribe(function (result) {
            if (result["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Search Name already exists", 5);
            }
            else if (result["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else {
                if (result["ServerId"] > 0) {
                    var searchId = result["ServerId"];
                    contextObj.commonService.SaveQueryBuilder(searchId, contextObj.QueryCategryId, contextObj.buildarray).subscribe(function (result) {
                        if (result["StatusId"] == 0)
                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (result["ServerId"] > 0) {
                            contextObj._notificationService.ShowToaster("Search criteria saved", 3);
                            //contextObj.qResult = undefined;
                            //contextObj.objArray = [];
                            contextObj.clearQueryFields();
                            contextObj.loadSearchNames();
                        }
                        else {
                        }
                        contextObj.splitviewInput.showSecondaryView = false;
                    });
                }
            }
        });
        // SaveQueryBuilder
    };
    QueryBuilderComponent.prototype.clearQueryFields = function () {
        var contextObj = this;
        var newOperatorFieldObj = JSON.parse(JSON.stringify(contextObj.genericfieldobjects[0]));
        newOperatorFieldObj.FieldId = 1;
        contextObj.QueryBuilderObj = {
            GroupId: 1,
            Operator: 1,
            SubGroups: [],
            Conditions: [],
            OperatorFieldObj: newOperatorFieldObj, Jointer: 1
        };
        contextObj.qResult = undefined;
        contextObj.objArray = [];
    };
    QueryBuilderComponent.prototype.Next = function (event) {
        debugger;
        var contextObj = this;
        //  Some of the saved queries cannot be loaded as it contains < Class Attributes> of other < Classes >
        contextObj.onClassSelected();
    };
    QueryBuilderComponent.prototype.okDeleteClick = function (event) {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.Delete();
    };
    QueryBuilderComponent.prototype.onClassSelected = function () {
        var contextObj = this;
        contextObj.selectedClassIds = "";
        if (contextObj.fieldDetailsCheckBox.MultiFieldValues == null || contextObj.fieldDetailsCheckBox.MultiFieldValues.length == 0) {
            contextObj._notificationService.ShowToaster("Select an Asset Class", 5);
        }
        else {
            var MultiFieldValues = contextObj.fieldDetailsCheckBox.MultiFieldValues;
            for (var count = 0; count < contextObj.fieldDetailsCheckBox.MultiFieldValues.length; count++) {
                contextObj.selectedClassIds = contextObj.selectedClassIds + contextObj.fieldDetailsCheckBox.MultiFieldValues[count] + ',';
            }
            contextObj.attributeId = contextObj.fieldDetailsCheckBox.MultiFieldValues.length > 1 ? 2 : 1;
            if (contextObj.attributeId == 2) {
                contextObj._notificationService.ShowToaster("Some of the saved queries cannot be loaded as it contains " + contextObj.attributetitle + " of other " + contextObj.TabObjectTitle, 2);
            }
            contextObj.selectedClassIds = contextObj.selectedClassIds.slice(0, -1);
            contextObj.isNextClicked = true;
            contextObj.querybuildercloseButtonVisible = 'visible';
            setTimeout(function () {
                contextObj.loadSearchNames();
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = 1;
                contextObj.loadOperatorLookup(contextObj);
            }, 100);
        }
    };
    QueryBuilderComponent.prototype.pagepathchange = function (event) {
        this.pagePath = null;
        this.pagePath = "Assets / Data ";
    };
    QueryBuilderComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    QueryBuilderComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    QueryBuilderComponent.prototype.ReplaceWithLabel = function () {
        var contextObj = this;
        contextObj.commonService.ReplaceFieldLabel("Classes", contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.TabObjectTitle = result;
            switch (contextObj.objectCategoryId) {
                case 1:
                case 2:
                case 3:
                    contextObj.attributetitle = "Class Attributes";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 20:
                    contextObj.attributetitle = "Type Attributes";
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QueryBuilderComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], QueryBuilderComponent.prototype, "objectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], QueryBuilderComponent.prototype, "Target", void 0);
    __decorate([
        //manage other area(custom report - target=1)  
        core_1.Input(), 
        __metadata('design:type', Object)
    ], QueryBuilderComponent.prototype, "customRptObj", void 0);
    __decorate([
        //manage other area (action=edit) 
        core_1.Input(), 
        __metadata('design:type', String)
    ], QueryBuilderComponent.prototype, "QueryCategryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], QueryBuilderComponent.prototype, "onQueryBuilderSearch", void 0);
    QueryBuilderComponent = __decorate([
        core_1.Component({
            selector: 'querybuildersearch',
            templateUrl: 'app/Framework/Views/QueryBuilder/querybuildersearch.component.html',
            styleUrls: ['app/Framework/Views/QueryBuilder/Styles.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
            directives: [listboxcomponent_component_1.ListBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, fieldGeneration_component_1.FieldComponent, group_component_1.GroupComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, documentlist_component_1.DocumentListComponent, searchquery_component_1.SearchQueryComponent, spacedata_grid_component_1.SpaceDataGridComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, opendrawing_component_1.OpenDrawing, page_component_1.PageComponent, submenu_component_1.SubMenu, employeeData_1.EmployeeDataComponent, objectData_list_component_1.ObjectDataListComponent],
            inputs: ['moduleId', 'QueryCategryId'],
            providers: [common_service_1.CommonService, General_1.GeneralFunctions, notify_service_1.NotificationService, objects_service_1.ObjectsService, administration_service_1.AdministrationService],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, General_1.GeneralFunctions, objects_service_1.ObjectsService, common_service_1.CommonService, core_1.ElementRef, notify_service_1.NotificationService])
    ], QueryBuilderComponent);
    return QueryBuilderComponent;
}());
exports.QueryBuilderComponent = QueryBuilderComponent;
//# sourceMappingURL=querybuildersearch.component.js.map