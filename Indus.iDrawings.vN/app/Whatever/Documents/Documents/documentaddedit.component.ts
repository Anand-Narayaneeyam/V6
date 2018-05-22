import {Component, Output, EventEmitter, OnInit, Input, AfterViewInit, ViewEncapsulation, SimpleChange} from '@angular/core';
import { DocumentService } from '../../../Models/Documents/documents.service'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { GeneralFunctions} from '../../../Models/Common/General';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import {SendForApprovalComponent} from '../../common/review/sendforapproval.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { CommonService } from '../../../models/common/common.service';

@Component({
    selector: 'documents-add-edit',
    templateUrl: 'app/Views/Documents/Documents/documentaddedit.component.html',
    providers: [DocumentService, NotificationService, GeneralFunctions, ValidateService, AdministrationService, CommonService],
    //providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions, DocumentService, CommonService]
    directives: [FieldComponent, Notification, SendForApprovalComponent, SplitViewComponent],
    inputs: ['rowData','selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
   
})

export class DocumentAddEditComponent {
    private DocumentAddEditFormId = 439;
    fieldDetailsAddEdit: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    action: string;
    btnName: string;
    selectedId: number;
    DocId: number;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isDocPublishSubscribed: boolean = false;
    rowData: any[]=[];
    success: any;
    @Output() submitSuccess = new EventEmitter();

    constructor(private documentService: DocumentService, private _validateService: ValidateService, private _notificationService: NotificationService, private getData: GeneralFunctions, private commonService: CommonService, private administrationService: AdministrationService) {

    }

    onSubmitData(event) {
        debugger
        var contextObj = this;
        switch (this.action) {
            case "add":               
                this.postSubmit(contextObj, event, 1);               
                break;
            case "edit":
                this.postSubmit(contextObj, event, 2);
                break;
            case "revise":
                this.postSubmit(contextObj, event, 3);
                break;
            case "replace":
                this.postSubmit(contextObj, event, 4);
                break;
        }
    }

    OnSuccessfullRequestSent(event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;
        contextObj._notificationService.ShowToaster("Document uploaded", 3);
        contextObj.submitSuccess.emit({ status: "success", returnData: event.returnData });
    }

    postSubmit(contextObj, event, target: number) {
        //var contextObj = this;      
        var temp = JSON.parse(event["fieldobject"]);
        //contextObj.rowData = [];
        //contextObj.rowData: any[];// = new Array("Mary", "Tom", "Jack", "Jill")  
               
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].ReportFieldId == 972) {

                if (temp[i]["Value"] == "70")
                    temp[i]["Value"] = 1;
                else
                    temp[i]["Value"] = 2;
            }
            if (temp[i].ReportFieldId == 973) {
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = null;
            }

            if (temp[i].ReportFieldId == 967) { //doc no               
                contextObj.rowData["Document Number"] = temp[i]["Value"];
                //contextObj.rowData.push({ "Document Number": temp[i]["Value"] });
            }         
            if (temp[i].ReportFieldId == 960) { //file name
                contextObj.rowData["File Name"] = temp[i]["Value"];                            
            }
        }

        //var docNum = temp.find(function (item) { return item.ReportFieldId === 967 });
        //var fileName = temp.find(function (item) { return item.ReportFieldId === 960 });
       
        event["fieldobject"] = JSON.stringify(temp);              
        contextObj.rowData["Latest Revision No"] = 0; 
 
        contextObj.documentService.postSubmitDocument(event["fieldobject"], event["filedata"], contextObj.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData;
            contextObj.DocId = resultData.ServerId;
      
            switch (resultData.StatusId) {
                case -1:
                    contextObj._notificationService.ShowToaster("Document Number already exists", 5);
                    break;
                case -2:
                    contextObj._notificationService.ShowToaster("Last Modified Date must be greater than or equal to Document Date", 5);
                    break;
                case -3:
                    contextObj._notificationService.ShowToaster("Selected Document and File Type are not matching", 5);
                    break;
                case -4:
                    contextObj._notificationService.ShowToaster("Select a valid File", 5);
                    break;
                case 1:
                    if (target == 1) {                        
                        contextObj.getCustomerSubscribedFeatures1(contextObj);
                        //if (contextObj.DocId > 0) {
                        //    contextObj._notificationService.ShowToaster("Document uploaded", 3);
                        //    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                        //}
                    }
                    else if (target == 2){
                        contextObj._notificationService.ShowToaster("Document updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 3) {
                        contextObj._notificationService.ShowToaster("Document revised", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 4) {
                        contextObj._notificationService.ShowToaster("Document replaced", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    ////contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
            }
        });
    }

    private getCustomerSubscribedFeatures1(contextObj) {   
        contextObj.administrationService.getCustomerSubscribedFeatures("233").subscribe(function (result) {       
            if (contextObj.getData.checkForUnhandledErrors(result)) {
            var customerFeatureobj = result["Data"];          
            contextObj.isDocPublishSubscribed = customerFeatureobj[0]["IsSubscribed"];           
            if (contextObj.isDocPublishSubscribed == true) {
                //contextObj.selectedId = contextObj.selectedId;             
                contextObj.action = "sendforapproval";
                contextObj.pageTitle = "Request for Publish";
                contextObj.splitviewInput.showSecondaryView = true;
                //this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;               
            }
            else {
                  contextObj._notificationService.ShowToaster("Document uploaded", 3);
                  contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
            }
        }
    });
  }
}
 