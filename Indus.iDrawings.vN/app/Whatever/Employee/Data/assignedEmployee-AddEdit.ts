import {Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import {EmployeeService} from '../../../Models/Employee/employee.services'
import {AdministrationService} from '../../../models/administration/administration.service'
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
@Component({
    selector: 'assignedemployee-addedit',
    templateUrl: 'app/Views/Employee/Data/assignedEmployee-AddEdit.html',
    providers: [EmployeeService, NotificationService, AdministrationService, GeneralFunctions, ValidateService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'addEdit', 'EmployeeData', 'showview']

})

export class AssignedEmployeeAddEditComponent {

    EmployeeData: any;
    fileName: string;
    biggestlevel: number = 0;
    public fieldDetailsSpaceEdit: IField[];
    btnName: string;
    selectedId: number;
    addEdit: string;
    @Output() submitSuccess = new EventEmitter();
    showview: any;
    success: any;
    isSiteAdmin: boolean = false;
    constructor(private _validateService: ValidateService, private employeeService: EmployeeService, private _notificationService: NotificationService, private administrationService: AdministrationService, private generFun: GeneralFunctions) {

    }
    ngOnInit() {
        //alert(this.showview);
        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes"
    }
    Update(event: any) {
        var contextObj = this;
        if (event["filedata"] != undefined)
            this.employeeService.submitAssignedEmployeeEdit(JSON.stringify(this.editFileDetails(event["fieldobject"], event["filedata"])), this.selectedId, event["filedata"]).subscribe(function (resultData) {

                contextObj.success = (resultData["Data"]);
                // if (contextObj.success["Data"] != "")
                if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid file", 2);
                } else if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });

                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }

            });
        else
            this.employeeService.submitAssignedEmployeeEdit(event["fieldobject"], this.selectedId, undefined).subscribe(function (resultData) {

                contextObj.success = (resultData["Data"]);
                // if (contextObj.success["Data"] != "")
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });

                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    else if (contextObj.success["ServerId"] == -2)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }

            });
    }
    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 189:
                        contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                        break;

                }
            }

        });
    }
    SubmitEvent(event) {
        if (this.addEdit == "add") {
            this.employeeService.submitAssignedEmployeeAdd(this.fieldDetailsSpaceEdit);
            this._notificationService.ShowToaster("Employee added", 3);
        }
        else if (this.addEdit == "edit") {
            var temp = JSON.parse(event["fieldobject"]);
            var org = temp.find(function (item) { return item.ReportFieldId === 875 })
            switch (this.biggestlevel) {
                case 0:
                    org.Value = "-1";
                case 1:
                    var l1 = temp.find(function (item) { return item.ReportFieldId === 290 })
                    org.Value = l1.Value;
                    break;
                case 2:
                    var l2 = temp.find(function (item) { return item.ReportFieldId === 292 })
                    org.Value = l2.Value;
                    break;
                case 3:
                    var l3 = temp.find(function (item) { return item.ReportFieldId === 294 })
                    org.Value = l3.Value;
                    break;
                case 4:
                    var l4 = temp.find(function (item) { return item.ReportFieldId === 296 })
                    org.Value = l4.Value;
                    break;
                case 5:
                    var l5 = temp.find(function (item) { return item.ReportFieldId === 298 })
                    org.Value = l5.Value;
                    break;
            }
            for (let i = 0; i < temp.length; i++) {
                if (temp[i]["ReportFieldId"] == 7876)
                    var dateofbirth = new Date(temp[i]["Value"]);
                if (temp[i]["ReportFieldId"] == 7877)
                    var dateofhire = new Date(temp[i]["Value"]);
                if (temp[i]["ReportFieldId"] == 7811)
                    var dateofrelieving = new Date(temp[i]["Value"])
            }
            var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
                return item.FieldId === 678
            });
            event["fieldobject"] = JSON.stringify(temp);
            if ((dateofbirth != null) && (dateofhire != null) && (dateofbirth >= dateofhire))
                this._notificationService.ShowToaster("Date of Hire must be greater than Date of Birth", 2);
            else if (relievinginfo) {
                if (relievinginfo.IsVisible == true) {
                    if ((dateofrelieving != null) && (dateofhire != null) && (dateofrelieving < dateofhire))
                        this._notificationService.ShowToaster("Date of Relieving  must be greater than Date of Hire", 2);
                    else
                        this.Update(event);
                } else
                    this.Update(event);
            }
            else {
                this.Update(event);
            }
        }
    }
    onSubmitData(event) {
        var contextObj = this;
        var emailObj = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.ReportFieldId === 4814
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            contextObj.SubmitEvent(event);

        }
        else {
            this.administrationService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {

                if (result["Data"]) {
                    contextObj.SubmitEvent(event);
                }
                else {
                    contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                }

            })
        }
    }
    editFileDetails(fieldobject: any, filedata: any) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 877) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save"
            this.employeeService.loadassignedEmployeeAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                }
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes"
            this.employeeService.loadassignedEmployeeAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {

                contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                var siteinfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                    return item.ReportFieldId === 7413
                })
                siteinfo.IsEnabled = true;
                siteinfo.ReadOnlyMode = true;
                for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 453) {
                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues.splice(1, 2)
                        if (contextObj.fieldDetailsSpaceEdit[i].FieldValue != "1") {
                            var relievinginfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                                return item.FieldId === 678
                            });
                            relievinginfo.IsMandatory = true;
                            relievinginfo.IsEnabled = true;
                            relievinginfo.IsVisible = true;
                        }
                        //break;                     
                    }
                    else if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 449) {
                        var newlookup = contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues.filter(function (item) {
                            return item.Id != contextObj.selectedId
                        })
                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.LookupValues = newlookup;
                    }
                    else if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 676) {
                        //if (contextObj.EmployeeData){
                        if (contextObj.EmployeeData["Assigned?"] == "Yes")
                            contextObj.fieldDetailsSpaceEdit[i].IsEnabled = false;
                        else {
                            if (contextObj.isSiteAdmin)
                                contextObj.fieldDetailsSpaceEdit[i].IsMandatory = true;
                            contextObj.fieldDetailsSpaceEdit[i].IsMandatory = true;
                        }
                        //}
                    }
                }

            })//resultData => this.fieldDetailsSpaceEdit = resultData["Data"])
        }
    }
    fieldChange(event: any) {
        var contextObj = this;
        var statusid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var statusFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.FieldId === 678
        });
        if ((statusid != "-1") && (statusFieldId == 453)) {
            console.log("relievinginfo", relievinginfo.FieldValue);
            relievinginfo.IsLocallyValidated = false;
            if (statusid != "1") {
                relievinginfo.IsMandatory = true;
                relievinginfo.IsEnabled = true;
                relievinginfo.IsVisible = true;
                relievinginfo.HasValidationError = true;
                if (relievinginfo.FieldValue && relievinginfo.FieldValue != "") {
                    console.log("hasval");
                    relievinginfo.HasValidationError = false;
                }
                if (<HTMLElement>document.getElementById("678")) {
                    var el = <HTMLElement>document.getElementById("678");
                    el.focus();
                    contextObj._validateService.initiateValidation(relievinginfo, contextObj, true, el);
                }

            }
            else {
                relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
                relievinginfo.HasValidationError = false;
            }

        }
        else if (statusFieldId == 395) {
            if (statusid > -1) {
                this.biggestlevel = 1;
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: statusid.toString() })
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l2 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 292 })
                    if (resultData["Data"]["LookupValues"] != "") {
                        l2.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    }
                    else {
                        l2.LookupDetails.LookupValues = null;
                    }
                    l2["FieldValue"] = "-1";

                    var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294 })
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";

                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";

                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";



                });
            }
            else {
                this.biggestlevel = 0;
                var l2 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 292 })
                if (l2) {
                    l2.LookupDetails.LookupValues = null;
                    l2["FieldValue"] = "-1";
                }

                var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294 })
                if (l3) {
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";
                }

                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }

                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 399) {
            if (statusid > -1) {
                this.biggestlevel = 2;
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: statusid.toString() })
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294 })
                    if (resultData["Data"]["LookupValues"] != "") {

                        l3.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    } else {

                        l3.LookupDetails.LookupValues = null;

                    }
                    l3["FieldValue"] = "-1";

                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";

                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";


                });
            }
            else {
                this.biggestlevel = 1
                var l3 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 294 })
                if (l3) {
                    l3.LookupDetails.LookupValues = null;
                    l3["FieldValue"] = "-1";
                }

                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }

                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 400) {
            if (statusid > -1) {
                this.biggestlevel = 3;
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: statusid.toString() })
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                    if (resultData["Data"]["LookupValues"] != "") {
                        l4.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    }
                    else {
                        l4.LookupDetails.LookupValues = null;
                    }

                    l4["FieldValue"] = "-1";

                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";


                });
            }
            else {
                this.biggestlevel = 2;
                var l4 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 296 })
                if (l4) {
                    l4.LookupDetails.LookupValues = null;
                    l4["FieldValue"] = "-1";
                }

                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 487) {
            if (statusid > -1) {
                this.biggestlevel = 4;
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: statusid.toString() })
                this.employeeService.loadOrganizationalUnit(statusid, statusFieldId, fieldObj).subscribe(function (resultData) {
                    var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                    if (resultData["Data"]["LookupValues"] != "") {

                        l5.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    } else {
                        l5.LookupDetails.LookupValues = null;
                    }
                    l5["FieldValue"] = "-1";


                });
            }
            else {
                this.biggestlevel = 3;
                var l5 = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 298 })
                if (l5) {
                    l5.LookupDetails.LookupValues = null;
                    l5["FieldValue"] = "-1";
                }
            }
        }
        else if (statusFieldId == 489) {
            if (statusid > -1)
                this.biggestlevel = 5;
            else
                this.biggestlevel = 4;
        }

        else {
            if (relievinginfo) {
                relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
            }
        }

    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}