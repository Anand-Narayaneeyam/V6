import {Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {CommonService} from '../../../Models/Common/common.service'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { TextAreaComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { Delimeter} from '../../../Models/Common/General';

@Component({
    selector: 'querybuilder',
    templateUrl: 'app/Views/Common/Query Builder/querybuilder.component.html',
    directives: [StringTextBoxComponent, TextAreaComponent, DropDownListComponent],
    providers: [NotificationService, CommonService, Delimeter],
    inputs: ['pageTarget', 'moduleId','QueryCategryId'],
})

export class QueryBuilderComponet {
    QueryCategryId: number;   
    queryFieldObj;
    allfieldNameLookUp=[];
    allfldValueLookUp=[];
    selectedFldLookUp=[];
    queryConditionArray = [];
    //conditionLookUp = [{ Id: "Œ", Value: "AND" }, { Id: "Ž", Value: "OR" }];
    //operatorLookUp = [{ Id: "Ç", Value: "Equal to" }, { Id: "Ñ", Value: "Not equal to" },
    //                  { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" },
    //                  { Id: "ï", Value: "Is blank" }, { Id: "ñ", Value: "Is not Blank" },
    //                  { Id: "ÿ", Value: "Contains" }];
    conditionLookUp = [{ Id: 1, Value: "AND" }, { Id: 2, Value: "OR" }];
    operatorLookUp = [{ Id: 1, Value: "Equal to" }, { Id: 2, Value: "Not equal to" },
        { Id: 3, Value: "Greater than" }, { Id: 4, Value: "Less than" },
        { Id: 5, Value: "Is blank" }, { Id: 6, Value: "Is not Blank" },
        { Id: 7, Value: "Contains" }];

    
                      
    //g_arrNumericDateOperands = Split("Equal to/=,Not equal to/<>,Greater than/>,Less than/<,Is blank/IS NULL,Is not Blank/IS NOT NULL", ",")
    //g_arrTextOperands = Split("Equal to/=,Not equal to/<>,Contains/LIKE,Is Blank/IS NULL,Is not Blank/IS NOT NULL", ",")
    private fieldNameSrc;
    private showEasyLookup: boolean = false;
    private selQueryIndex
    private btnAdd = "Add";
    constructor(private commonService: CommonService, private notificationService: NotificationService, private delimiter: Delimeter) {

    }

    ngOnInit() {
        
        var context = this;
        this.commonService.loadQueryBuilderFields().subscribe(function (result) {
            context.queryFieldObj = result["Data"];                           
            context.commonService.loadQueryFldNamesLookUp(context.QueryCategryId).subscribe(function (result) {
                context.fieldNameSrc = JSON.parse(result["FieldBinderData"]);
                var lookupObj = [];
                for (var j = 0; j < context.fieldNameSrc.length; j++) {
                    lookupObj.push({ Id: context.fieldNameSrc[j]["Id"], Value: context.fieldNameSrc[j]["FieldName"]});
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
    }

    ddlChange(event) {
        var curFldObj = event.ChildFieldObject;
        switch (curFldObj.FieldId) {
            case 1819:/*field name*/
                if (curFldObj.FieldValue > 0) {
                    this.setOperatorLookUp(curFldObj.FieldValue);       
                    this.getSelectedFieldLookUp(curFldObj.FieldValue);                              
                }

                break;
            case 1820:/*operator*/
                if (curFldObj.FieldValue !=-1) {
                    this.queryFieldObj[4].IsEnabled = true; /* Value*/
                }
                break;
            case 1686:/*condition*/
                if (curFldObj.FieldValue !=-1) {
                    this.queryFieldObj[2].IsEnabled = true;  /*fieldName */
                }
            break;

        }
    }

    private setOperatorLookUp(currentValue) {
        var type;
        var removeOperar = [];
        this.fieldNameSrc.find(function (item) {
            if (item.Id == Number(currentValue)) {
                type = item.GenericDataTypeId
                return true
            } else
                return false;
        });
        switch (type) {           
            case 1:/*boolean*/
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
        this.queryFieldObj[3].IsEnabled = true;/*operator */                                                    
       
    }
    private getAllLookUpData() {
        this.allfldValueLookUp = [];
        var context = this;
        this.commonService.loadQueryFieldValuesLookUp(this.QueryCategryId).subscribe(function (result) {
            context.allfldValueLookUp = JSON.parse(result["FieldBinderData"]);
        });
    }
    private getSelectedFieldLookUp(ddlfieldId: number) {
        var context = this;
        if (this.allfldValueLookUp) {                        
                this.allfldValueLookUp.find(function (item) {                  
                    if (item[0]["Column1"] == Number(ddlfieldId)) {
                        debugger
                        var obj = Object.values(item[0]);  
                        context.selectedFldLookUp = obj[2].split(context.delimiter.ColumnDelimeter); 
                        return true;
                    } else return false;
                });                               
            }
        
    }
    private valueKeyUpEvent(event) {
        event.preventDefault();       
        var elemtxtBox = <HTMLInputElement>document.getElementById("1821");
        elemtxtBox.autocomplete = "off";
        var txtValue = event.target.value;
        if (txtValue != "" && txtValue.length >= 3 && this.selectedFldLookUp.length > 0) {
            this.showEasyLookup = true;
        }

    }
    selectlookupValue(itm) {     
        this.queryFieldObj[4].FieldValue = itm;
    }

    btnAddClick() {
        var context = this;
        var operator = "";
        var condns = {};
        var condOpertr = "";
        var ddlSelFldName = "";
       
        this.allfieldNameLookUp.find(function (item) {
            if (item.Id == context.queryFieldObj[2].FieldValue) {
                ddlSelFldName = "[" + item.Value + "]";
                return true;
            } else
                return false;
        });
        
        this.operatorLookUp.find(function (item) {
            if (item.Id == context.queryFieldObj[3].FieldValue) {
                operator = item.Value;
                return true;
            } else return false;
        });

        if (context.queryFieldObj[1].FieldValue != -1) {
            this.conditionLookUp.find(function (item) {
                if (item.Id == context.queryFieldObj[1].FieldValue) {
                    condOpertr = item.Value;
                    return true;
                } else return false;
            });
        }
        
        if (this.queryConditionArray.length == 0) {           
            condns = { "selFld": ddlSelFldName ,"oprtr": operator ,"selValue": this.queryFieldObj[4].FieldValue };
        } else {
            context.queryConditionArray.push(condOpertr);           
            condns = { "selFld": ddlSelFldName, "oprtr": operator, "selValue": this.queryFieldObj[4].FieldValue };
        }
        context.queryConditionArray.push(condns);
        context.clearData();
    }

    btnCancelClick() {
        this.clearData();
    }

    clearData() {       
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
    }
    quryCondClick(listId) {
        var SelQueryIndex = listId;     
        var iseven = (Number(listId)) % 2 == 0 ? true : false;
        if (iseven) {           
            var queryclass = document.getElementsByClassName("queryList");
            if (queryclass.length > 0 && queryclass[0] != undefined) {
                queryclass[0].className = "";
            }
            var currLiElemnt = <HTMLLIElement>document.getElementById(SelQueryIndex);
            currLiElemnt.className = "queryList";
            this.btnAdd = "Update";
        }
    }

    btnSearchClick() {
       
    }
}
