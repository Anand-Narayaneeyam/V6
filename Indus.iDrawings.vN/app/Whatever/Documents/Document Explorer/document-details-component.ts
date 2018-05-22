import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {DocumentService} from '../../../Models/Documents/documents.service'
//import {DocumentAddEditComponent} from '../../../Whatever/Documents/Documents/documentaddedit.component';
import {DocumentAddEditComponent} from '../Documents/documentaddedit.component';


@Component({
    selector: 'documentEplorer-details',
    templateUrl: 'app/Views/Documents/Document Explorer/document-details-component.html',
    directives: [FieldComponent, SubMenu, Notification, SplitViewComponent, DocumentAddEditComponent],
    providers: [NotificationService, DocumentService],
    inputs: ['fieldDetails']
})

export class DocumentExplorerDetails implements OnInit {

    
    fieldObject: IField[];
    dataKey: string = "Id";
    fieldDetails: any;
    fieldDetailsObj: IField[];
    fieldDetailsAddEdit: IField[];
    firstColumObj: IField[] = [];
    secondColumObj: IField[] = [];
    isFirstField: boolean = true;
    menuData = [
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": null
        },
        //{
        //    "id": 2,
        //    "title": "View",
        //    "image": "View",
        //    "path": "View",
        //    "submenu": null,
        //    "privilegeId": null
        //}
    ]

    enableMenu = [1];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    pageTitle: string;
    action: string;
    btnName: string;
    @Output() editSuccess = new EventEmitter();
    totalItems: number = 1;

    constructor(private notificationService: NotificationService, private documentService: DocumentService) { }

    ngOnInit() {
        
        var contextObj = this;
        var selectDocumentId = 0;
        if (this.fieldDetails && this.fieldDetails.length > 0) {
            selectDocumentId = this.fieldDetails[this.fieldDetails.length - 1]["DocumentId"];
            this.enableMenu = [];
            this.totalItems = 0;
        } else {
            selectDocumentId = this.fieldDetails.DocumentId;
            this.enableMenu = [1];
        }       
        this.documentService.loadDocumentExplorerDetails(selectDocumentId).subscribe(function (resultData) {

            for (let i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].DataEntryControlId == 7) {
                    if (resultData["Data"][i].LookupDetails.LookupValues != null || resultData["Data"][i].LookupDetails.LookupValues != undefined) {
                        for (let j = 0; j < resultData["Data"][i].LookupDetails.LookupValues.length; j++) {
                            resultData["Data"][i].MultiFieldValues.find(function (item) {
                                if (item == resultData["Data"][i].LookupDetails.LookupValues[j].Id) {
                                    if (resultData["Data"][i].FieldValue == null)
                                        resultData["Data"][i].FieldValue = resultData["Data"][i].LookupDetails.LookupValues[j].Value;
                                    else
                                        resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue + ', ' + resultData["Data"][i].LookupDetails.LookupValues[j].Value;
                                }
                            });

                        }
                    }
                }
            }

            //for (let i = 0; i < resultData["Data"].length; i++) {
            //    resultData["Data"][i].DataEntryControlId = 1;
            //    resultData["Data"][i].GenericDataTypeId = 6;
            //    resultData["Data"][i].WhitelistId = 3;
            //    resultData["Data"][i].IsEnabled = false; 
            //    resultData["Data"][i].IsMandatory = false;
            //    resultData["Data"][i].IsLocallyValidated = true;
            //    resultData["Data"][i].HasValidationError = false;
            //}          
            for (let i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].IsVisible == true) {
                    if (contextObj.isFirstField == true) {
                        contextObj.firstColumObj.push(resultData["Data"][i]);
                        contextObj.isFirstField = false;
                    }
                    else if (contextObj.isFirstField == false) {
                        contextObj.secondColumObj.push(resultData["Data"][i]);
                        contextObj.isFirstField = true;
                    }
                }
            }           
            contextObj.fieldDetailsObj = resultData["Data"];           
        });

       
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.pageTitle = "Edit Document";
                this.editClick();
                break;
            case 2:
                this.pageTitle = "View Document";
                break;
        }
    }

    editClick() {
        
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (contextObj.fieldDetails["Document Status"] == "Active") {
            this.documentService.loadDocumentAddEditFields(contextObj.fieldDetails.DocumentId, 2).subscribe(function (resultData) {

                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) { // Document Status 
                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                        contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                        if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                            contextObj.fieldDetailsAddEdit[i].FieldValue = "70"
                    }
                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414) { // File Format 
                        contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                    }
                    else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2415) { // File Name
                        contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                        contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    }
                    else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) { // Date of Upload
                        contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                    }

                }

                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Document is not in Active status, cannot be edited", 2);
        }
    }

    OnSuccessfulSubmit(event: any) {
        
        this.editSuccess.emit({ status: event });
        
    }

    onSubmitData(event) {
    }
    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }
}
