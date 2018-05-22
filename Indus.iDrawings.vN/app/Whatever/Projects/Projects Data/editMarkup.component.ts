import {Component, Output, EventEmitter, Input, OnInit, DoCheck} from '@angular/core';
import { ProjectsService } from '../../../Models/Projects/projects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'markup-edit',
    templateUrl: './app/Views/Projects/Projects Data/editMarkup.component.html',
    providers: [ProjectsService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'markuprowData', 'projectName', 'projectId', 'rowData','pagetarget'],
})

export class EditMarkUpComponent {
    selectedId: number;
    markuprowData: any;
    fieldDetailsAdd: IField[];
    projectName: string;
    projectId: number;
    rowData: any;//base drawning list rowdata
    pagetarget: number = 0;
    btnName: string;
    dataKey: string = "Id";
    success: any;
    @Output() submitSuccess = new EventEmitter();

    constructor(private projectService: ProjectsService, private notificationService: NotificationService) { }
    ngOnInit() {
        var context = this;
        this.btnName = "Save Changes";
        this.projectService.getBaseDrawingListFormId(579).subscribe(function (resultFields) {
            debugger
            for (var i = 0; i < resultFields["Data"].length; i++) {
                switch (resultFields["Data"][i].FieldId) {
                    case 2957: resultFields["Data"][i].FieldValue = context.projectName;
                        break;
                    case 2958:
                        resultFields["Data"][i].IsEnabled = false;
                        resultFields["Data"][i].FieldValue = context.rowData["Title"]
                        break;
                    case 2959:
                        resultFields["Data"][i].DataEntryControlId = 1;
                        resultFields["Data"][i].IsEnabled = false;
                        if (context.pagetarget == 0)
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Category"];
                        else
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Drawing Category"];
                        break;
                    case 2971:
                        if (context.pagetarget == 0)
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Latest Revision No"]
                        else
                            resultFields["Data"][i]["FieldValue"] = context.rowData["Revision No."]
                        break;
                    case 2972:
                        resultFields["Data"][i]["FieldValue"] = context.markuprowData["Description"];                
                        break;
                }
            }
            context.fieldDetailsAdd = resultFields["Data"]            
        })      
    }
    onSubmitData(event) {
        var contextObj = this;
        var fieldObj = new Array<ReportFieldArray>();
        fieldObj.push({ ReportFieldId: 1017, Value: this.rowData["Id"] }, { ReportFieldId: 1018, Value: JSON.parse(event["fieldobject"]).find(function (item) { return item.ReportFieldId === 1018 }).Value }, { ReportFieldId: 1021, Value: JSON.parse(event["fieldobject"]).find(function (item) { return item.ReportFieldId === 1021 }).Value })
        console.log(fieldObj);
        this.projectService.updateMarkUp(JSON.stringify(fieldObj), this.selectedId).subscribe(function (resultData) {
            console.log(resultData)
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj.notificationService.ShowToaster("Markup updated", 3);
                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success["Data"], isUpdate: false });

            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -1) {
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            }

        })
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}