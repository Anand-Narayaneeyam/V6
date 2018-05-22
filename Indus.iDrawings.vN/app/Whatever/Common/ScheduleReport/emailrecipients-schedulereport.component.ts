import { ViewEncapsulation, Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { CommonService } from '../../../Models/Common/common.service';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { EmailRecipientService } from './email.service';


@Component({
    selector: 'emailrecipients-schedulereport',
    templateUrl: './app/Views/Common/ScheduleReport/emailrecipients-schedulereport.component.html',
    providers: [CommonService, NotificationService],
    directives: [FieldComponent, GridComponent, PagingComponent, StringTextBoxComponent, DropDownListComponent],
    inputs: ['selectedId', 'action', 'reportTitle',
        'fieldDetailsEdit', 'fieldTitle', 'fieldUserCategory', 'emailRecFieldDetails', 'emailRecCount','emailRecEditCount'],
    encapsulation: ViewEncapsulation.None
})

export class EmailRecipientsScheduleReport implements OnInit {

    btnName: string;
    @Input() emailRecFieldDetails: IField[];
    @Input() fieldTitle: IField[];
    @Input() fieldUserCategory: IField[];
    @Input() reportTitle: string;
   // @Input() clearEmailRec: boolean;
    @Output() emailRecUpdated = new EventEmitter();
    inputItems: IGrid = {
        dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true, selectioMode: "single", isHeaderCheckBx: true
    };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    itemsSource: any[];
    pageTitle: string;
    btnSave: string;
    selectedDDLId: number;
    fieldDetailsEdit: any;
    reportId: number = 0;
    emailRecCount: number;
    emailRecEditCount: number;
    updateHistory: boolean = false;
    ddlSelectedVal: boolean = false;
   // @Input() clearEmailUserIds: boolean;
    constructor(private commonService: CommonService, private _notificationService: NotificationService,
        private _emailRecService: EmailRecipientService) { }

    ngOnInit() {

        debugger

        this.btnSave = "Save Changes";
        if (this.fieldDetailsEdit) {       //For Edit Only
            this.reportId = this.fieldDetailsEdit.Id;

            this.clearEmailInvokedStatus();

            if (this.emailRecCount > 0) {
                debugger
                this._emailRecService.setStatus(false);
            }
            if (this.emailRecCount == 0) {
                debugger
                this.clearEmailRecUserIds();
                this._emailRecService.setStatus(true);
            }

        }

        else if(this.emailRecCount == 0 && this.emailRecEditCount == 0) {

            this.clearEmailRecUserIds();
            this._emailRecService.setStatus(true);
        }

    }

    dalaLoad(ddlFVal: number) {

        var contextObj = this;
        var ddlFvalue = ddlFVal
        var actIndex = this.getActualIndex(ddlFvalue);
        if (ddlFVal != -1) {
            contextObj.ddlSelectedVal = true;
            contextObj.commonService.loadEmailRecipientsList(ddlFVal, contextObj.reportId).subscribe(function (result) {
                debugger

                if (JSON.parse(result.FieldBinderData).length > 0) {
                    contextObj.itemsSource = JSON.parse(result.FieldBinderData);

                    if (EmailReciepient[actIndex].Invoked == false) {
                        contextObj.fillEmailRecEdit(ddlFvalue);
                    }

                    if (EmailReciepient[actIndex].Invoked==true) {
                        contextObj.filterForUpdate(ddlFvalue);
                    }

                    if (contextObj._emailRecService.getStatus() == false) {
                       // this.clearEmailRecUserIds();
                        contextObj.preSelectCheckedUsers(ddlFVal);
                    }
                } else {
                    contextObj._notificationService.ShowToaster("No Email Recipients exist", 2);
                    contextObj.itemsSource = [];
                }                
            });
        } else {
            contextObj.ddlSelectedVal = false;
            contextObj.itemsSource = [];
        }
    }

    filterForUpdate(ddlFvalue) {
        var actIndex = this.getActualIndex(ddlFvalue);
        if (EmailReciepient[actIndex].UserIds.length==0)
        {

            this.itemsSource.find(function (item) {
                
                return item['Select All'] = false;

            });
        }

        //for (var i = 0; i < EmailReciepient[actIndex].UserIds.length; i++) {
        //   this.itemsSource.find(function (item) {
        //        if (item.Id == EmailReciepient[actIndex].UserIds[i]) {
        //            return item['Select All'] = true;
        //        }
        //        else {
        //            return item['Select All'] = false;
        //        }
        //    });
        //}

        return;
    }


    fillEmailRecEdit(ddlFvalue) {
        var actIndex = this.getActualIndex(ddlFvalue);
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]['Select All'] == true || this.itemsSource[i]['Select All'] == 1) {
                if (!EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id))
                {
                    EmailReciepient[actIndex].UserIds.push(this.itemsSource[i].Id);
                }
            }
        }

        debugger

    }

    preSelectCheckedUsers(ddlVal: number) {
        switch (ddlVal) {
            case 2:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[0].UserIds.length; j++) {
                        if (EmailReciepient[0].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 4:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[1].UserIds.length; j++) {
                        if (EmailReciepient[1].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 5:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[2].UserIds.length; j++) {
                        if (EmailReciepient[2].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 6:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[3].UserIds.length; j++) {
                        if (EmailReciepient[3].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            case 7:
                for (var i = 0; i < this.itemsSource.length; i++) {
                    for (var j = 0; j < EmailReciepient[4].UserIds.length; j++) {
                        if (EmailReciepient[4].UserIds[j] == this.itemsSource[i].Id) {
                            this.itemsSource[i]["Select All"] = 1;
                        }
                    }
                }
                break;
            default:
                break;
        }
    }



    Update() {
        this.updateHistory = true;
        var actIndex = this.getActualIndex(this.selectedDDLId);
        //EmailReciepient[actIndex].UserIds = [];
        EmailReciepient[actIndex].Invoked = true;
        for (var i = 0; i < this.itemsSource.length; i++)
        {
            if (this.itemsSource[i]['Select All'] == true)
            {
                if (!EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id))
                {
                    EmailReciepient[actIndex].UserIds.push(this.itemsSource[i].Id);
                }

            }
            else
            {
                debugger
                if (EmailReciepient[actIndex].UserIds.includes(this.itemsSource[i].Id))
                {
                    var index = EmailReciepient[actIndex].UserIds.indexOf(this.itemsSource[i].Id);
                            if (index > -1)
                            {
                                EmailReciepient[actIndex].UserIds.splice(index, 1);
                            }                   
                }
            }
        }

        if (this.getEmailRecipientsCount() > 0) {

            this._notificationService.ShowToaster("Email Recipients updated", 3);
            this._emailRecService.setStatus(false); 
            this.emailRecUpdated.emit(EmailReciepient);

        } else {

            this._notificationService.ShowToaster("Select atleast one Email Recipient", 5);
        }
        debugger
    }

    getEmailRecipientsCount() {

        return EmailReciepient[0].UserIds.length +
            EmailReciepient[1].UserIds.length +
            EmailReciepient[2].UserIds.length +
            EmailReciepient[3].UserIds.length +
            EmailReciepient[4].UserIds.length;

    }



    ddlChange(event) {
        if (event.ChildFieldObject.FieldId == 2742) {
            var ddlFieldValue = event.ChildFieldObject.FieldValue;
            ddlFieldValue = parseInt(ddlFieldValue);

            if (ddlFieldValue == 2 || ddlFieldValue == 7 || ddlFieldValue == 6 || ddlFieldValue == 5 || ddlFieldValue == 4) {
                this.dalaLoad(ddlFieldValue);
                this.selectedDDLId = ddlFieldValue;
            }
            else {

                this.dalaLoad(-1);
            }
        }
    }


    getActualIndex(catId: number) {
        switch (catId) {
            case 2:
                return 0;
            case 4:
                return 1;
            case 5:
                return 2;
            case 6:
                return 3;
            case 7:
                return 4;
            default:
                break;

        }
    }



    public clearEmailRecUserIds() {

        debugger
        EmailReciepient[0].UserIds = [];
        EmailReciepient[1].UserIds = [];
        EmailReciepient[2].UserIds = [];
        EmailReciepient[3].UserIds = [];
        EmailReciepient[4].UserIds = [];

    }

    public clearEmailInvokedStatus() {

        debugger
        EmailReciepient[0].Invoked = false;
        EmailReciepient[1].Invoked = false;
        EmailReciepient[2].Invoked = false;
        EmailReciepient[3].Invoked = false;
        EmailReciepient[4].Invoked = false;
    }

}

var EmailReciepient = [
    {
        ReciepientType: 2,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 4,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 5,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 6,
        UserIds: [],
        Invoked: false
    },
    {
        ReciepientType: 7,
        UserIds: [],
        Invoked: false
    }
];







