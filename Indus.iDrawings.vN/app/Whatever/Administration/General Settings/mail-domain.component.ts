import { Component, OnInit } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'mail-domain',
    templateUrl: './app/Views/Administration/General Settings/mail-domain.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, SlideComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions]
})

export class MailDomainComponent implements OnInit {

    success: any;
    showSlide = false;
    Position = "top-right";
    public errorMessage: string;
    public fieldDetails: IField[];
    private fields: IField[];
    sourceData: any[];
    maildomaindataSource: any[];
    enableMenu = [];
    submitSuccess: any[] = [];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },      
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    types = false;
    selIds = new Array();
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    cardFieldArray = new Array<CardFields>();

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFunctions: GeneralFunctions) {
    }

    ngOnInit(): void {
        var contextObj = this;
        
        this.administrationService.getMailDomainData().subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.sourceData) {
                    for (var i = 0; i < contextObj.sourceData.length; i++) {
                        contextObj.cardFieldArray.push({
                            id : contextObj.sourceData[i].Id,
                            Value : contextObj.sourceData[i].MailDomainName
                        })
                    }
                }
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Mail Domain exists", 2);
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            } else {
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                else {
                    contextObj.enableMenu = [0, 2];
                }
            }
        });
        this.administrationService.getMailDomainFields().subscribe(function (list) {
            contextObj.fields = (list["Data"]);
        });
    }


    onCardSubmit(event: any) {
        var id = [event["dataKeyValue"]];
        var contextObj = this;
        var blnEmptyString: boolean = false;
        var strDomainName: string = "";
        var strFieldObject = JSON.parse(event['fieldObject']);
                for (let i = 0; i < strFieldObject.length; i++) {
            if (strFieldObject[i].ReportFieldId == 8693) {
                if (strFieldObject[i].Value == "" || strFieldObject[i].Value == null) {
                    blnEmptyString = true;
                }
                else {
                    blnEmptyString = false;
                    strDomainName = strFieldObject[i].Value;
                }
            }
        }
        if (blnEmptyString == true) {
            this.notificationService.ShowToaster("Enter a Mail Domain", 2);
        }
        else {
            if (strDomainName != "") {
                if (event["dataKeyValue"]) { /*Edit*/
                    this.administrationService.postMailDomainInUse(this.selIds[0]).subscribe(function (resultData) {
                        if (resultData["Data"] == 0) {
                            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(strDomainName)) {
                                let test = event.fieldObject;
                                contextObj.administrationService.postMailDomainUpdate(test, event["dataKeyValue"]).subscribe(function (resultData) {
                                    contextObj.success = (resultData["Data"]);
                                    var retData = { returnData: contextObj.success.Data };
                                    if (resultData["Data"].StatusId == 1) {
                                        contextObj.notificationService.ShowToaster("Mail Domain updated", 3);
                                        let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                                        contextObj.sourceData = returnDatasrc["itemSrc"];
                                        contextObj.totalItems = returnDatasrc["itemCount"];
                                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                                    }
                                    else if (resultData["Data"].StatusId == 2) {
                                        contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                                    }
                                    else if (resultData["Data"].StatusId == 3) {
                                        if (resultData["Data"].ServerId == -1) {
                                            contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                        }
                                        else if (resultData["Data"].ServerId == -2) {
                                            contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be edited", 2);
                                        }
                                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                                    }
                                });
                            }
                            else {
                                contextObj.notificationService.ShowToaster("Enter a valid Mail Domain", 2);
                            }
                        }
                        else if (resultData["Data"] == 1) {
                            var strOldValue = "";
                            for (var i = 0; i < contextObj.cardFieldArray.length; i++) {
                                if (Number(id) == contextObj.cardFieldArray[i].id) {
                                    strOldValue = contextObj.cardFieldArray[i].Value;
                                    var elem = <HTMLInputElement>document.getElementById("182");
                                    if (elem) {
                                        elem.value = strOldValue;
                                    }
                                }
                            }
                            contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be edited", 2);
                        }
                    });
                }
                else {/*Add*/
                    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(strDomainName)) {
                        let test = event.fieldObject;
                        contextObj.administrationService.postMailDomainInsert(test).subscribe(function (resultData) {
                            contextObj.success = (resultData["Data"]);
                            var retData = { returnData: contextObj.success.Data };
                            if (resultData["Data"].StatusId == 1) {
                                contextObj.notificationService.ShowToaster("Mail Domain added", 3);
                                contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                                contextObj.sourceData.pop();
                                let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                                contextObj.sourceData = returnDatasrc["itemSrc"];
                                contextObj.totalItems = returnDatasrc["itemCount"];
                                if (contextObj.totalItems == 0) {
                                    contextObj.enableMenu = [0];
                                    contextObj.types = false;
                                }
                                else {
                                    contextObj.enableMenu = [0, 2];
                                    contextObj.types = true;
                                }
                            }
                            else if (resultData["Data"].StatusId == 3) {
                                contextObj.notificationService.ShowToaster("Mail Domain already exists", 5);
                                contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                            }
                        });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Enter a valid Mail Domain", 2);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "182" });
                    }
                }
            }
        }
    }

    public onSubMenuChange(event: any) {
        if (event.value == 0) 
        {
            this.addClick();
        }
        else if (event.value == 2) 
        {

            this.deleteClick(this.selIds);
        }
    }

    //onSorting(event: any) {
    //}

    //public pageChanged(event: any) {
    //};

    public addClick() {
        this.sourceData = this.generFunctions.addCardForGrid(this.sourceData, this.fields);
        this.types = true;
        this.enableMenu = [];
    }

    public deleteClick(id) {
        var contextObj = this;
        if (id[0] != null) {
            this.administrationService.postMailDomainInUse(this.selIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.showSlide = true;
                }
                else if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Mail Domain in use, cannot be deleted", 2);
                }
            });
        }
        else if (id.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else if (id.length == 0) {
            this.notificationService.ShowToaster("Select a Mail Domain", 2);
        }
    }
   
    onDelete(e: Event) {
        this.deleteClick(this.selIds);
    }

    onCancel(e) {
        if (this.totalItems > 0) {
            this.enableMenu = [0, 2];
        }
        else {
            this.enableMenu = [0];
        }
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        this.administrationService.postMailDomainDelete(this.selIds[0]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (resultData["Data"].StatusId == 1) {
                for (var j = 0; j < contextObj.selIds.length; j++) {
                    var index = contextObj.sourceData.indexOf(contextObj.sourceData.filter(x => x["Id"] == contextObj.selIds[j])[0]);
                    if (index > -1)
                        contextObj.sourceData.splice(index, 1);
                }
                contextObj.notificationService.ShowToaster("Selected Mail Domain deleted", 3);
            }
        });
        this.showSlide = false;
    }

    cancelClick(value: any) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    }

    closeSlideDialog(value: any) {
        this.showSlide = false;
    }
}

export interface CardFields {
    id: number,
    Value: string
}