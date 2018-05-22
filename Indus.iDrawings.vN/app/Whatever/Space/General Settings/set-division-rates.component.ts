import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { GeneralFunctions} from '../../../Models/Common/General';
import { IField} from '../../../framework/models/interface/ifield';
import { SpaceService } from '../../../models/space/space.service';

@Component({
    selector: 'set-division-rates',
    templateUrl: 'app/Views/Space/General Settings/set-division-rates.component.html',
    directives: [GridComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions]
})

export class SetDivisionRatesComponent implements OnInit {

    pagePath: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    refreshgrid;
    blnDdlHasLookup: boolean = false;
    itemsSource: any[] = null;
    fieldObject: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [0], allowAdd: false, allowEdit: true };
    @Input() FilteredIds: string;
    selRateCodeObj;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        this.spaceService.getDivisionRatesFields().subscribe(function (resultData) {
            console.log("resultData", resultData);
            contextObj.fieldObject = resultData["Data"];
            var orgL1Field = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 290 });
            if (contextObj.inputItems.groupBy.length == 0) {
                contextObj.inputItems.groupBy.push(orgL1Field.FieldLabel);
            }
        });
        this.spaceService.getDivisionRatesforCostCategoryRates(this.FilteredIds).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Cost Category Rate exists", 2);
            }
        })
    }

    onCellBeginEdit(event) {
      // debugger
        var contextObj = this;
        var rowIndex = event.rowData;
        var ddlField = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 743 });
        var rowData = contextObj.inputItems.rowData;
        ddlField.IsEnabled = false;
        ddlField.LookupDetails.LookupValues = [];
        contextObj.selRateCodeObj = [];
        ddlField.IsEnabled = true;
        var fieldArray = contextObj.inputItems.rowData;
        if (fieldArray != undefined) {
            var rptFielDArray = new Array<ReportFieldArray>();
            rptFielDArray.push({
                ReportFieldId: 742,
                Value: fieldArray.CostCategoryId
            });
            this.spaceService.getDdlDivisionRates(JSON.stringify(rptFielDArray)).subscribe(function (resultData) {
                if (resultData["Data"] != undefined) {
                    if (resultData["Data"].LookupValues != undefined) {
                        if (resultData["Data"].LookupValues.length > 0) {
                            for (var i = 0; i < resultData["Data"].LookupValues.length; i++) {
                                if (ddlField.LookupDetails.LookupValues.indexOf(resultData["Data"].LookupValues[i].Id) == -1) {
                                    ddlField.LookupDetails.LookupValues.push({
                                        Id: resultData["Data"].LookupValues[i].Id,
                                        Value: resultData["Data"].LookupValues[i].Value,
                                        IsDisabled: resultData["Data"].LookupValues[i].IsChecked
                                    });
                                    contextObj.blnDdlHasLookup = true;
                                }
                            }
                        }
                        else {
                            contextObj.blnDdlHasLookup = false;
                        }
                    }
                }
            });
        }
    }

    onCellEndEdit(event) {
       // debugger
        var context = this;
        if (this.selRateCodeObj) {
            if (context.blnDdlHasLookup == true) {
                this.itemsSource.find(function (el) {
                    if ((el.Id == context.inputItems.selectedIds[0]) && (el.CostCategoryId == context.inputItems.rowData["CostCategoryId"])) {
                        el["Rate Code (Rate)"] = context.selRateCodeObj.Value;
                        el["RateCodeId"] = context.selRateCodeObj.Id
                        return true

                    } else return false;
                });
            }
        }
    }

    ddlValChangeFrmGrid(event) {
        //debugger
        var context = this;
        if (context.blnDdlHasLookup == true) {
            if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue != "-1") {
                context.selRateCodeObj = event.ddlRelationShipEvent.ChildFieldObject.LookupDetails.LookupValues.find(function (el) {
                    return (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == el.Id.toString());
                });
            }
            else {
                context.selRateCodeObj = [];
            }
        }
    }

    updateDivisionRates(event) {
        var contextObj = this;
        var arrayList = new Array<SubmitDataObj>();
        var OrgUnitIds = new Array<number>();
        var CostCategoryRateIdArray: number[];
        var count = 0;
        for (var i = 0; i < contextObj.itemsSource.length; i++) {                     
            if (OrgUnitIds.indexOf(contextObj.itemsSource[i].Id) == -1)
                OrgUnitIds.push(contextObj.itemsSource[i].Id)                      
        }
        for (var j = 0; j < OrgUnitIds.length; j++) {
            var rateCodeArray = [];
            for (var i = 0; i < contextObj.itemsSource.length; i++) {

                if (contextObj.itemsSource[i].Id == OrgUnitIds[j] && contextObj.itemsSource[i].RateCodeId != null && contextObj.itemsSource[i].RateCodeId != undefined) {
                    rateCodeArray.push(contextObj.itemsSource[i].RateCodeId)
                }
            }
            arrayList.push({
                OrgUnitId: OrgUnitIds[j],
                CostCategoryRateId: rateCodeArray
            })
        }
        for (var i = 0; i < arrayList.length; i++) {
            if (arrayList[i].CostCategoryRateId == []) {
                arrayList.splice(i, 1);
            }
        }
        this.spaceService.updateDivisionRates(JSON.stringify(arrayList)).subscribe(function (resultData) {
            //debugger
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Cost Category Rates for Organizational Units updated", 3);
            }
            else {
            }
        })
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface ILookupValues {
    Id: number,
    Value: string,
    IsDisabled: boolean
}

export interface SubmitDataObj {
    OrgUnitId: number,
    CostCategoryRateId: number[]
}