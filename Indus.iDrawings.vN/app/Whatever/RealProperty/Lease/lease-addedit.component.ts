import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { PopupAddComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/popupadd.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { FinancialClausesComponent } from './financial-clauses';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { CancellataionClausesComponent } from './cancellation-clauses';

@Component({
    selector: 'lease-addedit',
    templateUrl: 'app/Views/RealProperty/Lease/lease-addedit.component.html',
    providers: [RealPropertyService, NotificationService, ValidateService],
    directives: [FieldComponent, Notification, PopupAddComponent, SplitViewComponent, FinancialClausesComponent, CancellataionClausesComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'setFeatureLookupId', 'leaseTypeDdl', 'IsCostDataEntered', 'IsRentDataEntered', 'leaseStatus'],
})

export class LeaseAddEditComponent {
    success: any;
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    setFeatureLookupId: number;
    leaseExecutionDate: any;
    leaseCommencementDate: any;
    rentCommencementDate: any;
    leaseExpiryDate: any;
    leaseTypeId: any;
    leaseStatusId: any;
    ddlLeaseType: IField;
    ddlLeaseStatus: IField;
    financialClause: boolean = false;
    cancellationClause: boolean = false;
    leaseRenewalCount: any = 0;
    pageTitle: string;
    strPopUpValue: string = "Clauses";
    @Input() action: string;
    @Input() fieldDetailsAddEdit: IField[];
    @Output() submitSuccess = new EventEmitter();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    leaseTypeDdl: any[];
    TenantDetails: IField;
    financialClauseIds: any[] = [];
    IsCostDataEntered: boolean;
    IsRentDataEntered: boolean;
    leaseStatus: any;

    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService, private _validateService: ValidateService) { }

    ngOnInit() {
        this.selectedId;
        var event = [1, 2];
        var contextObj = this;
        this.ddlLeaseType = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 984;
        });
        this.ddlLeaseStatus = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 979;
        });
        this.TenantDetails = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 981;
        });

        if (this.setFeatureLookupId == 49 && this.TenantDetails.FieldValue != "") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "1");
        }
        else if (this.setFeatureLookupId == 49 && this.TenantDetails.FieldValue == "") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "2");
        }
        else if (this.setFeatureLookupId == 50) {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "2");
        }
        else if (this.setFeatureLookupId == 51) {
            this.updateFieldProperties(this.fieldDetailsAddEdit, "1");
        }
    }

    onSubmitData(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])), "add");
                break;
            case "edit":
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])), "edit");
                break;
        }
    }

    rbtnOnChange(event: any) {
        this.ddlLeaseType.LookupDetails.PopupComponent = null;
        this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
        if (event.rbtnObject.fieldobject.FieldLabel == "Purpose") {
            this.updateFieldProperties(this.fieldDetailsAddEdit, event.rbtnObject.fieldobject.FieldValue);
        }

        if (event.rbtnObject.fieldobject.ReportFieldId == 6143) {
            if (this.ddlLeaseType.FieldValue == "4" || this.ddlLeaseType.FieldValue == "5" || this.ddlLeaseType.FieldValue == "1") {

                this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
            }
        }
    }

    checkBoxChange(event: any) {
    }

    updateFieldProperties(fieldObjectArray: any, value: any) {
        var contextObj = this;
        var event = [1, 2];
        if (value == "1") {     //Lessor
            fieldObjectArray.find(function (item: IField) {
                if (item.ReportFieldId == 5775) {  //Tenant 
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item.FieldId, item);
                } else if (item.ReportFieldId == 5774) { //Landlord
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    item.FieldValue = "-1";
                    item.HasValidationError = false;
                } else if (item.ReportFieldId == 5778) { //Can Be Subleased
                    item.FieldValue = "false";
                    item.IsEnabled = false;
                    item.IsVisible = false; // temporary hidden 
                } else if (item.ReportFieldId == 5771) { //isToRentOut
                    item.FieldValue = "1";
                } else if (item.ReportFieldId == 6142) { //Lease Type 
                    item.LookupDetails.LookupValues = this.leaseTypeDdl.filter(function (item) { return event.indexOf(item.Id) == -1 });
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    else if (contextObj.action == "edit" && contextObj.leaseStatus != "Active") {
                        if (item.FieldValue == "4" || item.FieldValue == "5" || item.FieldValue == "1") {
                            contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {

                                var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                if (temp != "[]") {

                                    for (let i = 0; i < temp.length; i++) {
                                        contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                                    }
                                }


                            });
                            item.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };

                        }
                    }

                    contextObj.initiateValidation(item.FieldId, item);
                    contextObj.leaseTypeId = item.FieldValue;
                } else if (item.ReportFieldId == 5776) { //Lease Category 
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                } else if (item.ReportFieldId == 5696) {  //Lease Expiry Date
                    if (contextObj.action == "add") {
                        var Expirydate = new Date()
                        Expirydate.setDate(Expirydate.getDate() + 1)
                        var strDate = Expirydate.toDateString().split(" ");
                        item.FieldValue = strDate[1] + " " + strDate[2] + " " + strDate[3];
                    }
                }
            });
        } else if (value == "2") {               //Lessee
            fieldObjectArray.find(function (item: IField) {
                if (item.ReportFieldId == 5775) {  //Tenant
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    item.FieldValue = "-1";
                } else if (item.ReportFieldId == 5774) { //Landlord
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    contextObj.initiateValidation(item.FieldId, item);
                    item.IsLocallyValidated = false;
                } else if (item.ReportFieldId == 5778) { //Can Be Subleased
                    item.IsEnabled = true;
                    item.IsVisible = false; // temporary hidden 
                } else if (item.ReportFieldId == 5771) { //isToRentOut
                    item.FieldValue = "2";
                }
                else if (item.ReportFieldId == 6142) { //Lease Type 
                    item.LookupDetails.LookupValues = this.leaseTypeDdl.filter(function (item) { return event.indexOf(item.Id) != -1 });
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    else if (contextObj.action == "edit" && contextObj.leaseStatus != "Active") {
                        if (item.FieldValue == "4" || item.FieldValue == "5" || item.FieldValue == "1") {
                            contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {

                                var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                                if (temp != "[]") {

                                    for (let i = 0; i < temp.length; i++) {
                                        contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                                    }
                                }

                            });
                            item.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };

                        }
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                    contextObj.leaseTypeId = item.FieldValue;
                } else if (item.ReportFieldId == 5776) { //Lease Category 
                    if (contextObj.action == "add") {
                        item.FieldValue = "-1";
                    }
                    contextObj.initiateValidation(item.FieldId, item);
                } else if (item.ReportFieldId == 5696) {  //Lease Expiry Date
                    if (contextObj.action == "add") {
                        var Expirydate = new Date()
                        Expirydate.setDate(Expirydate.getDate() + 1)
                        var strDate = Expirydate.toDateString().split(" ");
                        item.FieldValue = strDate[1] + " " + strDate[2] + " " + strDate[3];
                    }
                }
            });
        }
        return JSON.parse(JSON.stringify(fieldObjectArray));
    }

    public initiateValidation(id: any, fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(id);
        if (el) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }
    updateFieldValuesForSubmit(fieldObjectArray: any) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {   //IsToRentOut
                if (item.Value == 1) {
                    item.Value = 0;
                } else {
                    item.Value = 1;
                }
            } else if (item.ReportFieldId == 5779) {   //Can be Renewed
                if (item.Value === "true") {
                    item.Value = 1;
                } else {
                    item.Value = 0;
                }
            } else if (item.ReportFieldId == 5778) {   //Can be SubLeased
                if (item.Value === "true") {
                    item.Value = 1;
                } else {
                    item.Value = 0;
                }
                item.IsVisible = false; // temporary hidden 
            } else if (item.ReportFieldId == 5697) {
                contextObj.leaseExecutionDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5695) {
                contextObj.leaseCommencementDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5698) {
                contextObj.rentCommencementDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5696) {
                contextObj.leaseExpiryDate = new Date(item.Value);
            } else if (item.ReportFieldId == 6142) { //Lease Type 
                contextObj.leaseTypeId = item.Value;
            }
        });
        return JSON.stringify(fieldObjectArray);
    }

    postSubmit(strsubmitField: string, target: string) {
        var contextObj = this;
        if (contextObj.action == "edit" && contextObj.leaseStatus == "Active") {

        }
        else {
            if (contextObj.leaseExecutionDate > contextObj.leaseCommencementDate) {
                contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than or equal to Lease Execution Date", 2);
                return;
            }
            if (contextObj.leaseCommencementDate > contextObj.rentCommencementDate) {
                contextObj.notificationService.ShowToaster("Rent Commencement Date should be greater than or equal to Lease Commencement Date", 2);
                return;
            }
            if (contextObj.rentCommencementDate >= contextObj.leaseExpiryDate) {
                contextObj.notificationService.ShowToaster("Lease Expiry Date should be greater than Rent Commencement Date", 2);
                return;
            }
            if (contextObj.leaseExpiryDate <= new Date()) {
                contextObj.notificationService.ShowToaster("Lease Expiry Date should be a future date", 2);
                return;
            }

            if (contextObj.leaseTypeId == "4" || contextObj.leaseTypeId == "5" || contextObj.leaseTypeId == "1") {
                if (this.financialClauseIds.length == 0) {
                    this.notificationService.ShowToaster("Select Clause(s) ", 2);
                    return;
                }
            }
        }
        contextObj.realpropertyservice.submitAddUpdateLease(strsubmitField, contextObj.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (resultData["Data"]["Data"] != "" && resultData["Data"]["Data"] != undefined) {
                var temp = JSON.parse(resultData["Data"]["Data"]);
            }
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == "add") {
                        var selectedFinClause = new Array<ReportFieldArray>();
                        selectedFinClause = contextObj.financialClauseIds;
                        selectedFinClause.push({ ReportFieldId: 6163, Value: resultData["Data"].ServerId });
                        selectedFinClause.push({ ReportFieldId: 6164, Value: temp[0]["Lease Renewal Count"] });
                        console.log(selectedFinClause);
                        contextObj.realpropertyservice.submitUpdateLeaseFinancialClauses(JSON.stringify(selectedFinClause)).subscribe(function (resultData) {
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Lease added", 3);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        });

                    }
                    else {
                        var selectedFinClause = new Array<ReportFieldArray>();
                        selectedFinClause = contextObj.financialClauseIds;
                        selectedFinClause.push({ ReportFieldId: 6163, Value: resultData["Data"].ServerId });
                        selectedFinClause.push({ ReportFieldId: 6164, Value: temp[0]["Lease Renewal Count"] });
                        console.log(selectedFinClause);
                        contextObj.realpropertyservice.submitUpdateLeaseFinancialClauses(JSON.stringify(selectedFinClause)).subscribe(function (resultData) {
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Lease details updated", 3);
                            }
                            else {
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        });

                    }
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Lease Identifier already exists", 5);
                    }
                    else if (
                        resultData["Data"].ServerId == -2)
                        contextObj.notificationService.ShowToaster('Area and Cost Details not entered',5)
                    break;
            }
        });
    }

    fieldChange(event: any) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        if (this.action == "add") {
            if (fieldLabel == "Lease Type") {
                this.leaseTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
                    this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else {
                    this.ddlLeaseType.LookupDetails.PopupComponent = null;
                }
            }
        } else {

            if (fieldLabel == "Status") {
                this.leaseStatusId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseStatusId == 15) {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else if (this.leaseStatusId == 1) {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
                    if (contextObj.IsCostDataEntered == false && contextObj.IsRentDataEntered == false) {
                        contextObj.notificationService.ShowToaster("Area and Cost details not entered", 3);
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "37";
                        }, 100);
                    }
                    else if (contextObj.IsCostDataEntered == true && contextObj.IsRentDataEntered == false) {
                        contextObj.notificationService.ShowToaster("Rent Information not entered", 3);
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "37";
                        }, 100);

                    }
                    else if (contextObj.IsCostDataEntered == true && contextObj.IsRentDataEntered == true) {
                        setTimeout(function () {
                            contextObj.ddlLeaseStatus.FieldValue = "1";
                        }, 100);
                    }
                } else {
                    this.ddlLeaseStatus.LookupDetails.PopupComponent = null;
                }
            }
            if (fieldLabel == "Lease Type") {
                this.leaseTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
                    contextObj.realpropertyservice.GetLeaseFinancialClauseId(contextObj.selectedId).subscribe(function (resultData) {

                        var temp = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (temp != "[]") {

                            for (let i = 0; i < temp.length; i++) {
                                contextObj.financialClauseIds.push({ ReportFieldId: 6165, Value: temp[i]["LeaseFinancialClauseId"] });
                            }
                        }

                    });


                    this.ddlLeaseType.LookupDetails.PopupComponent = { Name: "Clauses", showImage: false };
                }
                else {
                    this.ddlLeaseType.LookupDetails.PopupComponent = null;
                }
            }
        }
    }

    popupItemEmit(event) {
        this.splitviewInput.showSecondaryView == false;
        if (this.leaseTypeId == 4 || this.leaseTypeId == 5 || this.leaseTypeId == 1) {
            this.pageTitle = "Select Financial Clauses";
            this.financialClause = true;
            this.cancellationClause = false;
            this.leaseRenewalCount = 0;
        }
        if (this.leaseStatusId == 15) {
            this.pageTitle = "Cancellation Clauses";
            this.leaseStatus = "Active";
            this.cancellationClause = true;
            this.financialClause = false;

        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }


    onSubmitFinanceClause(event) {
        var selectedFinClause = new Array<ReportFieldArray>();
        var contextobj = event;
        for (let i = 0; i < contextobj.returnData.length; i++) {
            selectedFinClause.push({ ReportFieldId: 6165, Value: contextobj.returnData[i].Value });
        }
        this.financialClauseIds = selectedFinClause;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    onSplitViewClose(event) {
        if (this.financialClause == true) {
            if (this.financialClauseIds.length == 0) {
                this.notificationService.ShowToaster("No Clause(s) selected", 2);
            }
        }
    }

    onSubmitCancelClause(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}