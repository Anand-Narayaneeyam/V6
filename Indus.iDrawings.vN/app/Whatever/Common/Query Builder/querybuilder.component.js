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
var common_service_1 = require('../../../Models/Common/common.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var textareacomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var General_1 = require('../../../Models/Common/General');
var QueryBuilderComponet = (function () {
    function QueryBuilderComponet(commonService, notificationService, delimiter) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.delimiter = delimiter;
        this.allfieldNameLookUp = [];
        this.allfldValueLookUp = [];
        this.selectedFldLookUp = [];
        this.queryConditionArray = [];
        //conditionLookUp = [{ Id: "Œ", Value: "AND" }, { Id: "Ž", Value: "OR" }];
        //operatorLookUp = [{ Id: "Ç", Value: "Equal to" }, { Id: "Ñ", Value: "Not equal to" },
        //                  { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" },
        //                  { Id: "ï", Value: "Is blank" }, { Id: "ñ", Value: "Is not Blank" },
        //                  { Id: "ÿ", Value: "Contains" }];
        this.conditionLookUp = [{ Id: 1, Value: "AND" }, { Id: 2, Value: "OR" }];
        this.operatorLookUp = [{ Id: 1, Value: "Equal to" }, { Id: 2, Value: "Not equal to" },
            { Id: 3, Value: "Greater than" }, { Id: 4, Value: "Less than" },
            { Id: 5, Value: "Is blank" }, { Id: 6, Value: "Is not Blank" },
            { Id: 7, Value: "Contains" }];
        this.showEasyLookup = false;
        this.btnAdd = "Add";
    }
    QueryBuilderComponet.prototype.ngOnInit = function () {
        var context = this;
        this.commonService.loadQueryBuilderFields().subscribe(function (result) {
            context.queryFieldObj = result["Data"];
            context.commonService.loadQueryFldNamesLookUp(context.QueryCategryId).subscribe(function (result) {
                context.fieldNameSrc = JSON.parse(result["FieldBinderData"]);
                var lookupObj = [];
                for (var j = 0; j < context.fieldNameSrc.length; j++) {
                    lookupObj.push({ Id: context.fieldNameSrc[j]["Id"], Value: context.fieldNameSrc[j]["FieldName"] });
                }
                var data = context.queryFieldObj;
                for (var i = 0; i < data.length; i++) {
                    data[i].IsHiddenLabel = true;
                    /*populating Field Name lookUp*/
                    if (data[i].FieldId == 1819) {
                        context.allfieldNameLookUp = lookupObj;
                        data[i].LookupDetails.LookupValues = lookupObj;
                    }
                    if (data[i].FieldId == 1686) {
                        data[i].LookupDetails.LookupValues = context.conditionLookUp;
                    }
                }
            });
        });
        this.getAllLookUpData();
    };
    QueryBuilderComponet.prototype.ddlChange = function (event) {
        var curFldObj = event.ChildFieldObject;
        switch (curFldObj.FieldId) {
            case 1819:
                if (curFldObj.FieldValue > 0) {
                    this.setOperatorLookUp(curFldObj.FieldValue);
                    this.getSelectedFieldLookUp(curFldObj.FieldValue);
                }
                break;
            case 1820:
                if (curFldObj.FieldValue != -1) {
                    this.queryFieldObj[4].IsEnabled = true; /* Value*/
                }
                break;
            case 1686:
                if (curFldObj.FieldValue != -1) {
                    this.queryFieldObj[2].IsEnabled = true; /*fieldName */
                }
                break;
        }
    };
    QueryBuilderComponet.prototype.setOperatorLookUp = function (currentValue) {
        var type;
        var removeOperar = [];
        this.fieldNameSrc.find(function (item) {
            if (item.Id == Number(currentValue)) {
                type = item.GenericDataTypeId;
                return true;
            }
            else
                return false;
        });
        switch (type) {
            case 1:
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                removeOperar = ["Contains"];
                break;
            case 6:
                removeOperar = ["Greater than", "Less than"];
                break;
        }
        this.queryFieldObj[3].LookupDetails.LookupValues = this.operatorLookUp.filter(function (item) {
            return (removeOperar.indexOf(item.Value) == -1);
        });
        this.queryFieldObj[3].IsEnabled = true; /*operator */
    };
    QueryBuilderComponet.prototype.getAllLookUpData = function () {
        this.allfldValueLookUp = [];
        var context = this;
        this.commonService.loadQueryFieldValuesLookUp(this.QueryCategryId).subscribe(function (result) {
            context.allfldValueLookUp = JSON.parse(result["FieldBinderData"]);
        });
    };
    QueryBuilderComponet.prototype.getSelectedFieldLookUp = function (ddlfieldId) {
        var context = this;
        if (this.allfldValueLookUp) {
            this.allfldValueLookUp.find(function (item) {
                if (item[0]["Column1"] == Number(ddlfieldId)) {
                    debugger;
                    var obj = Object.values(item[0]);
                    context.selectedFldLookUp = obj[2].split(context.delimiter.ColumnDelimeter);
                    return true;
                }
                else
                    return false;
            });
        }
    };
    QueryBuilderComponet.prototype.valueKeyUpEvent = function (event) {
        event.preventDefault();
        var elemtxtBox = document.getElementById("1821");
        elemtxtBox.autocomplete = "off";
        var txtValue = event.target.value;
        if (txtValue != "" && txtValue.length >= 3 && this.selectedFldLookUp.length > 0) {
            this.showEasyLookup = true;
        }
    };
    QueryBuilderComponet.prototype.selectlookupValue = function (itm) {
        this.queryFieldObj[4].FieldValue = itm;
    };
    QueryBuilderComponet.prototype.btnAddClick = function () {
        var context = this;
        var operator = "";
        var condns = {};
        var condOpertr = "";
        var ddlSelFldName = "";
        this.allfieldNameLookUp.find(function (item) {
            if (item.Id == context.queryFieldObj[2].FieldValue) {
                ddlSelFldName = "[" + item.Value + "]";
                return true;
            }
            else
                return false;
        });
        this.operatorLookUp.find(function (item) {
            if (item.Id == context.queryFieldObj[3].FieldValue) {
                operator = item.Value;
                return true;
            }
            else
                return false;
        });
        if (context.queryFieldObj[1].FieldValue != -1) {
            this.conditionLookUp.find(function (item) {
                if (item.Id == context.queryFieldObj[1].FieldValue) {
                    condOpertr = item.Value;
                    return true;
                }
                else
                    return false;
            });
        }
        if (this.queryConditionArray.length == 0) {
            condns = { "selFld": ddlSelFldName, "oprtr": operator, "selValue": this.queryFieldObj[4].FieldValue };
        }
        else {
            context.queryConditionArray.push(condOpertr);
            condns = { "selFld": ddlSelFldName, "oprtr": operator, "selValue": this.queryFieldObj[4].FieldValue };
        }
        context.queryConditionArray.push(condns);
        context.clearData();
    };
    QueryBuilderComponet.prototype.btnCancelClick = function () {
        this.clearData();
    };
    QueryBuilderComponet.prototype.clearData = function () {
        if (this.queryConditionArray.length > 0) {
            this.queryFieldObj[1].IsEnabled = true;
            this.queryFieldObj[2].IsEnabled = false;
            this.queryFieldObj[1].FieldValue = -1;
        }
        else {
            this.queryFieldObj[1].IsEnabled = false;
            this.queryFieldObj[2].IsEnabled = true;
        }
        this.queryFieldObj[2].FieldValue = -1;
        this.queryFieldObj[3].FieldValue = -1;
        this.queryFieldObj[4].FieldValue = null;
        this.queryFieldObj[3].IsEnabled = false;
        this.queryFieldObj[4].IsEnabled = false;
        this.showEasyLookup = false;
    };
    QueryBuilderComponet.prototype.quryCondClick = function (listId) {
        var SelQueryIndex = listId;
        var iseven = (Number(listId)) % 2 == 0 ? true : false;
        if (iseven) {
            var queryclass = document.getElementsByClassName("queryList");
            if (queryclass.length > 0 && queryclass[0] != undefined) {
                queryclass[0].className = "";
            }
            var currLiElemnt = document.getElementById(SelQueryIndex);
            currLiElemnt.className = "queryList";
            this.btnAdd = "Update";
        }
    };
    QueryBuilderComponet.prototype.btnSearchClick = function () {
    };
    QueryBuilderComponet = __decorate([
        core_1.Component({
            selector: 'querybuilder',
            templateUrl: 'app/Views/Common/Query Builder/querybuilder.component.html',
            directives: [stringtextbox_component_1.StringTextBoxComponent, textareacomponent_component_1.TextAreaComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [notify_service_1.NotificationService, common_service_1.CommonService, General_1.Delimeter],
            inputs: ['pageTarget', 'moduleId', 'QueryCategryId'],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService, General_1.Delimeter])
    ], QueryBuilderComponet);
    return QueryBuilderComponet;
}());
exports.QueryBuilderComponet = QueryBuilderComponet;
//# sourceMappingURL=querybuilder.component.js.map