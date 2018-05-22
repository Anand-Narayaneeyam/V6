import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import { DocumentService } from '../../../Models/Documents/documents.service';

@Component({
    selector: 'DocumentCategories-add-edit',
    templateUrl: './app/Views/Documents/General Settings/DocumentCategories-add-edit.html',
    providers: [DocumentService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class DocumentCategoriesAddEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    ngOnInit(): void {
    }
    constructor(private DocumentService: DocumentService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }
    onSubmitData(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }
    postSubmit(strsubmitField: string, target: number) {
        debugger
        var contextObj = this;
        contextObj.DocumentService.AddUpdateDocumentCategory(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            debugger
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:

                    if (contextObj.action == "add") {
                        contextObj._notificationService.ShowToaster("Document Category added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Document Category updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    contextObj._notificationService.ShowToaster("Document Category already exists", 5);
                    break;
            }
        });
    }
}
