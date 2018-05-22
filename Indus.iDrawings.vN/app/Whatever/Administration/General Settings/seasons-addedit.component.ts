import { ViewEncapsulation, Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { GeneralFunctions } from '../../../Models/Common/General';

@Component({
    selector: 'seasons-addedit',
    templateUrl: './app/Views/Administration/General Settings/seasons-addedit.component.html',
    
    providers: [ObjectsService, NotificationService, AdministrationService, GeneralFunctions],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'pageTitle','btnName'],
    encapsulation: ViewEncapsulation.None
})

export class SeasonsAddEditComponent {

    @Output() submitSuccess = new EventEmitter();
    fieldDetailsAdd: IField[];
    pageTitle: string;
    btnName: string;
    action: string;
    selectedId: number;
    ddlDisableShowSelectDaysStart = [2879];
    ddlDisableShowSelectDaysEnd = [2882];    
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
  
    onSubmitData(event) {        
        event["fieldobject"] = JSON.parse(event["fieldobject"]);
        var rawDayStart = event["fieldobject"].find(function (item) { return item.ReportFieldId === 1739; });
        var rawDayEnd = event["fieldobject"].find(function (item) { return item.ReportFieldId === 2632; });        
        var rawMonthStart = event["fieldobject"].find(function (item) { return item.ReportFieldId === 5487; });
        rawMonthStart.Value = rawDayStart.Value + " " + this.monthFormat(rawMonthStart.Value) +" 1992";
        var rawMonthEnd = event["fieldobject"].find(function (item) { return item.ReportFieldId === 5488; });
        rawMonthEnd.Value = rawDayEnd.Value + " " + this.monthFormat(rawMonthEnd.Value) + " 1992";
        event["fieldobject"] = event["fieldobject"].filter(function (item) { return item.ReportFieldId != 5484; });
        event["fieldobject"] = event["fieldobject"].filter(function (item) { return item.ReportFieldId != 1739; });
        event["fieldobject"] = event["fieldobject"].filter(function (item) { return item.ReportFieldId != 2632; });
        var context = this;
        var frmDate = new Date(rawMonthStart.Value);
        var toDate = new Date(rawMonthEnd.Value);
        if (frmDate <= toDate)
        {
            var tempArray = [];
            tempArray.push({ ReportFieldId: 5486, Value: "1" });
            event["fieldobject"] = event["fieldobject"].concat(tempArray);     
            if (context.action == "add") {
                context.administrationService.postSeasonsInsert(JSON.stringify(event["fieldobject"])).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {

                        case 0:
                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            context.notificationService.ShowToaster("Season added", 3);
                            context.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                context.notificationService.ShowToaster("Season already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                context.notificationService.ShowToaster("Season already exists", 5);
                            }
                            else {
                                context.notificationService.ShowToaster("Unknown problem", 1);
                            }
                            break;
                    }
                });
            }
            else if (context.action == "edit") {
                context.administrationService.postSeasonUpdate(JSON.stringify(event["fieldobject"]), context.selectedId).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {

                        case 0:
                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            context.notificationService.ShowToaster("Season updated", 3);
                            context.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                context.notificationService.ShowToaster("Season already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                context.notificationService.ShowToaster("Season already exists", 5);
                            }
                            else {
                                context.notificationService.ShowToaster("Unknown problem", 1);
                            }
                            break;
                    }
                });

            }
        }
        else {
            context.notificationService.ShowToaster("End must be greater than or equal to Start", 2);
        }                   
    }

    dropDownChange(event) {

        var eventFieldId = event.ddlRelationShipEvent.ChildFieldObject.FieldId;
        var eventFieldValue = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
        if (eventFieldId == 2878) {
            this.clearDDlShowSelectStart();
            var daysForStart = this.getDaysForMonth(eventFieldValue);
            var startDayField = this.fieldDetailsAdd.find(function (item) {
                return item.FieldId === 2879;
            });
            startDayField.LookupDetails.LookupValues = [];
            this.generateLookUpValuesFor(startDayField, daysForStart);
        }
        else if (eventFieldId == 2880) {
            this.clearDDlShowSelectStartEnd();
            var daysForEnd = this.getDaysForMonth(eventFieldValue);
            var endDayField = this.fieldDetailsAdd.find(function (item) {
                return item.FieldId === 2882;
            });
            endDayField.LookupDetails.LookupValues = [];
            this.generateLookUpValuesFor(endDayField, daysForEnd);
        }
    }

    clearDDlShowSelectStart() {
        for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
            if (this.ddlDisableShowSelectDaysStart.indexOf(this.fieldDetailsAdd[i].FieldId) > -1) {
                this.fieldDetailsAdd[i].ShowSelect = false;
                this.fieldDetailsAdd[i].FieldValue = this.fieldDetailsAdd[i].LookupDetails.LookupValues[0].Id.toString();;
            }
        }
        return;
    }

    clearDDlShowSelectStartEnd() {
        for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
            if (this.ddlDisableShowSelectDaysEnd.indexOf(this.fieldDetailsAdd[i].FieldId) > -1) {
                this.fieldDetailsAdd[i].ShowSelect = false;
                this.fieldDetailsAdd[i].FieldValue = this.fieldDetailsAdd[i].LookupDetails.LookupValues[0].Id.toString();;
            }
        }
        return;
    }

    generateLookUpValuesFor(startDayField, daysFor) {
        for (var i = 1; i <= daysFor; i++) {
            startDayField.LookupDetails.LookupValues.push({ Id: i, Value: ""+i, IsChecked:null});
        }
        return;
    }

    getDaysForMonth(fValue) {
       var daysFor= Month.find(function (item) {
           return item.Id == fValue;            
        });
       return daysFor.NoDays;        
    }

     monthFormat(monthCode) {
        switch (monthCode) {
            case "1":
                return "Jan";
            case "2":
                return "Feb";
            case "3":
                return "Mar";
            case "4":
                return "Apr";
            case "5":
                return "May";
            case "6":
                return "Jun";
            case "7":
                return "Jul";
            case "8":
                return "Aug";
            case "9":
                return "Sep";
            case "10":
                return "Oct";
            case "11":
                return "Nov";
            case "12":
                return "Dec";                
        }
    }
}

var Month = [{ Id: 1, MCode: "Jan", NoDays: 31 },
{ Id: 2, MCode: "Feb", NoDays: 29 },
{ Id: 3, MCode: "Mar", NoDays: 31 },
{ Id: 4, MCode: "Apr", NoDays: 30 },
{ Id: 5, MCode: "May", NoDays: 31 },
{ Id: 6, MCode: "Jun", NoDays: 30 },
{ Id: 7, MCode: "Jul", NoDays: 31 },
{ Id: 8, MCode: "Aug", NoDays: 31 },
{ Id: 9, MCode: "Sep", NoDays: 30 },
{ Id: 10, MCode: "Oct", NoDays: 31 },
{ Id: 11, MCode: "Nov", NoDays: 30 },
{ Id: 12, MCode: "Dec", NoDays: 31 }];