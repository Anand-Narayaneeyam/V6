import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DocumentService} from '../../../Models/Documents/documents.service'


@Component({
    selector: 'AdvanceSearchSaveAs',
    templateUrl: './app/Views/Documents/Documents/AdvanceSearchSaveAs.html',
    providers: [DocumentService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'dataKey', 'advanceValues'],
})

export class AdvanceSearchSaveAs implements OnInit {
    showSlide = false;
    @Input() dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Input() advanceValues: any[];
    @Output() submitSuccess = new EventEmitter();
    ngOnInit(): void {
    }
    constructor(private DocumentService: DocumentService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }
    onSubmitData(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
        }
    }
    postSubmit(strsubmitField: string, target: number) {
        debugger
        var contextObj = this;
        var temp = JSON.parse(strsubmitField);
        var TempName = temp.find(function (item) { return item.ReportFieldId === 2144 })
        var CheckboxShare = temp.find(function (item) { return item.ReportFieldId === 6438 })
        var Name = TempName.Value;
        var ishare = CheckboxShare.Value == "false" ? 0 : 1;
        
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        var reportfieldIds: reportfieldId[] = [];
        ReportfieldIdPush(2144, Name);
        ReportfieldIdPush(2145, 32);
        ReportfieldIdPush(2146, 1);
        ReportfieldIdPush(6438, ishare);


        var AdvanceSearchEntry = contextObj.advanceValues;

        for (var i = 0; i < AdvanceSearchEntry.length; i++) {
            var fieldValue = AdvanceSearchEntry[i].FieldValue;
            var ReportFieldIds = AdvanceSearchEntry[i].ReportFieldId;
            var GenericDataTypeId = AdvanceSearchEntry[i].GenericDataTypeId;
            if (fieldValue != null && fieldValue != undefined && fieldValue != "Ñµô¥¥ô" && fieldValue != "") {
                var Operator;
                var OperatorSymbols = fieldValue.split("µ")[0];
                if (OperatorSymbols == "Ñ") {
                    Operator = "LIKE"
                }
                else if (OperatorSymbols == "ü") {
                    Operator = ">"
                }
                else if (OperatorSymbols == "é") {
                    Operator = "<"
                }
                else if (OperatorSymbols == "æ") {
                    Operator = "BETWEEN"
                }
                else if (OperatorSymbols == "Ç") {
                    Operator = "="
                }
                else if (OperatorSymbols == "Ѫє") {
                    Operator = "NOT EQUAL TO"
                }
                if (Operator == "LIKE")
                    var fieldValueSplit = fieldValue.split("¥")[1];
                else if (Operator == "BETWEEN")
                    var fieldValueSplit: any = fieldValue.split("ô")[1] + ", " + fieldValue.split("ô")[3];
                else
                    var fieldValueSplit = fieldValue.split("ô")[1];


                ReportfieldId(2139, ReportFieldIds, 4318, Operator, 4319, fieldValueSplit, 2141, "AND", 2138,1);

            }

        }


        contextObj.DocumentService.AddSearches(JSON.stringify(reportfieldIdArray), JSON.stringify(reportfieldIds), this.selectedId, target).subscribe(function (resultData) {
            debugger
            if (reportfieldIds.length == 0) {
                contextObj._notificationService.ShowToaster("Enter a Search condition", 5);
            }
            else if (resultData.StatusId == 1) {
              //  contextObj.advancelookupSaveAs.FieldValue = "-1";
                contextObj._notificationService.ShowToaster("Search added", 3);
                contextObj.submitSuccess.emit(resultData);
            }
            else if (resultData.StatusId == -1) {
                contextObj._notificationService.ShowToaster("Search name already exists", 5);
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });

        function ReportfieldIdPush(Id, Value) {
            reportfieldIdArray.push({
                ReportFieldId: Id,
                Value: Value,
            });
        }

        function ReportfieldId(Id, IdValue, OperatorId, OperatorValue, FieldValueId, FieldValue, ConditionId, ConditionValue, ConditionIndexId, ConditionIndexValue)
        {
            reportfieldIds.push({
                ReportFieldId: Id,
                IdValue: IdValue,
                Operator: OperatorId,
                OperatorValue: OperatorValue,
                FieldValue: FieldValue,
                FieldValues: FieldValue,
                Condition: ConditionId,
                ConditioValue: ConditionValue,
                ConditionIndex: ConditionIndexId,
                ConditionIndexValue: ConditionIndexValue
            });
        }
    }
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}
interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any,
}

interface reportfieldId {
    ReportFieldId: number,
    IdValue: any,
    Operator: number,
    OperatorValue: any,
    FieldValue: number,
    FieldValues: any,
    Condition: number,
    ConditioValue: any,
    ConditionIndex: number,
    ConditionIndexValue: any,
}

