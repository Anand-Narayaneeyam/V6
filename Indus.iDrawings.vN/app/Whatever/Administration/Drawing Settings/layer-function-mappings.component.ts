
import { Component, OnInit, SimpleChange } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'layer-function-mappings',
    templateUrl: './app/Views/Administration/Drawing Settings/layer-function-mappings.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, ConfirmationComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, ConfirmationService, GeneralFunctions],
    inputs: ['Expanded']

})

export class LayerFunctionMappingComponent implements OnInit {
    public totalItems: number = 30;
    public itemsPerPage: number = 10;
    test: any;
    Expanded: any;
    public fieldDetails: IField[];
    public errorMessage: string;
    listSource: any[];
    success = "";
    private fields: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
        }
    ];
    enableMenu = [];
    types = false;
    selIds = new Array();
    selId: any;
    Position = "bottom-right";
    width = 300;
    change = false;
    showSlide = false;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService,private getData: GeneralFunctions) { }

    ngOnInit(): void {     
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.Expanded == true) {
            var contextObj = this;
            this.administrationService.getLayerMappingFunction().subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"] == "[]") {
                        resultData["Data"] = null;
                    }
                    contextObj.listSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    if (resultData["Data"].FieldBinderData == "[]") {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Layer Functions added", 5);
                    }
                    else {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                    }
                }
            });
            this.administrationService.getLayerMappingFunctionFields().subscribe(function (resultData1) {
                if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                contextObj.fields = resultData1["Data"];
                    contextObj.fields = contextObj.fields.filter(function (el) {
                        if (el.ReportFieldId == 4762) {
                            if (el.LookupDetails.LookupValues == undefined || el.LookupDetails.LookupValues == null) {
                                contextObj.notificationService.ShowToaster("No Data Fields added", 5);
                            }
                        }
                        return true
                    });
                }
            });
        }
    }

    onSorting(event: any) {

    }

    onCardSubmit(event: any) {

        var contextObj = this;
        if (event["dataKeyValue"] == "--Select--")
        {
            event["dataKeyValue"] = 0;
        }
        this.selId = this.fields[1].LookupDetails.LookupValues.find(function (item) { return item.Id === event["dataKeyValue"] });
        if (this.selId != undefined) {
            let test = event.fieldObject;
            this.administrationService.postSubmitEditayerMapping(test, this.selId.Id).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Action Failure", 5);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Layer Function Mapping updated", 3);
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                            }
                            break;
                    }
                }
            });
        }
        else {
            let test = event.fieldObject;
            this.administrationService.postSubmitAdddrawinglayerMapping(test).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;

                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Action Failure", 5);
                            break;
                        case 1:

                            contextObj.notificationService.ShowToaster("Layer Function Mapping added", 3);
                            contextObj.listSource[contextObj.listSource.length - 1].Id = resultData["Data"].ServerId;
                            contextObj.selId = resultData["Data"].ServerId;
                            contextObj.listSource[contextObj.listSource.length - 1] = eval(resultData["Data"].Data)[0];
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                            this.fields = this.fields.filter(function (el) {
                                if (el.ReportFieldId == 4761) {
                                    el.IsEnabled = false;
                                }
                                return true
                            });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.listSource.pop();
                                contextObj.types = true;
                                contextObj.enableMenu = [1];
                                contextObj.notificationService.ShowToaster("Layer Function Mapping already exists", 5);
                            }
                            break;
                    }
                }
            });
        }
    }

    public onSubMenuChange(event: any, id: any) {
        let editid = 0;
        if (event.value == 1) 
        {
            this.menuAddClick();
        }
        else if (event.value == 3) 
        {
            this.onDelete(this.selIds)
        }
    }

    public menuAddClick() {
        this.selIds = [];
        this.listSource = this.getData.addCardForGrid(this.listSource, this.fields);
        this.fields = this.fields.filter(function (el) {
            el.IsEnabled = true;
            return true
        });
        this.types = true;
        this.enableMenu = [];
    }

    onDelete(event: any) {

        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        } else {
            this.menuDeleteClick(this.selIds);
        }       
    }

    okDelete($event) {
        var contextObj = this;
        this.selId = contextObj.fields[1].LookupDetails.LookupValues.find(function (item) { return item.Id === contextObj.selIds[0] });
        this.administrationService.postLayerMappingFunctionDelete(contextObj.selId.Id).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
            contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    for (var j = 0; j < contextObj.selIds.length; j++) {
                        var index = contextObj.listSource.indexOf(contextObj.listSource.filter(x => x["Drawing Layer"] == contextObj.selIds[j])[0]);
                        if (index > -1)
                            contextObj.listSource.splice(index, 1);
                    }
                    contextObj.notificationService.ShowToaster("Selected Layer Function Mapping deleted", 3);
                    contextObj.totalItems = contextObj.totalItems - 1;
                    if (contextObj.listSource.length == 0) {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                    }
                }
                else {
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                }
            }
        });
        this.showSlide = !this.showSlide;
    }

    public menuDeleteClick(id) {
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    }

    public pageChanged(event: any) {
        var contextObj = this;
        if (event.pageEvent.page == 2) {
            this.administrationService.getLayerMappingFunction().
            subscribe(function (itemsSource) {
                if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                    contextObj.listSource = itemsSource["paging"]
                }
            });
              
        }
        else {

            this.administrationService.getLayerMappingFunction().
            subscribe(function (itemsSource) {
                if (this.getData.checkForUnhandledErrors(itemsSource)) {
                    this.listSource = itemsSource["data"]
                }
            });
              

        }
    };
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    cancelClick(value: any) {
        this.showSlide = value.value;
    }

    onCardCancelClick() {
        this.types = true;
        this.enableMenu = [1];
        this.selIds = [];
        this.fields = this.fields.filter(function (el) {
            if (el.ReportFieldId == 4761) {
                el.IsEnabled = false;
            }
            return true
        });
    }
}
