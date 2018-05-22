import { Component, OnInit, SimpleChange} from '@angular/core';
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

@Component({
    selector: 'drawing-layers',
    templateUrl: './app/Views/Administration/Drawing Settings/drawing-layers.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, ConfirmationComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, ConfirmationService, GeneralFunctions],
    inputs: ['Expanded']

})

export class DrawingLayersComponent implements OnInit {
    public totalItems: number = 0;
    returnData: any;
    types = false;
    Expanded: any;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    public errorMessage: string;
    drawingLayersSource: any[];
    private fields: IField[];
    submitSuccess: any[]=[];
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
    gridcount = 0;
    enableMenu = [];
    selIds = new Array();
    Id = 1;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {    
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.Expanded == true) {
            var contextObj = this;
            this.administrationService.getDrawingLayersFields().subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fields = resultData["Data"];
                }
            });
            this.administrationService.getDrawingLayersData().subscribe(function (resultData1) {
                if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                    if (resultData1["Data"] == "[]") {
                        resultData1["Data"] = null;
                    }
                    contextObj.drawingLayersSource = JSON.parse(resultData1["Data"].FieldBinderData);
                    if (resultData1["Data"].FieldBinderData == "[]") {
                        contextObj.types = true;
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Drawing Layer added", 5);
                    }
                    else {
                        contextObj.enableMenu = [1, 3];
                    }
                }
            });
        }
    }

    public onSorting(objGrid: any) {
        var contextObj = this;
        this.administrationService.sortDrawingLayer(objGrid.sortDirection, objGrid.selectedField).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                this.drawingLayersSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            }
        });
    }


    onCardSubmit(event: any) {
        var contextObj = this;
        if (event["dataKeyValue"]) 
        {
            let test = event.fieldObject;
            this.administrationService.postSubmitEditdrawinglayer(test, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else if (resultData["Data"].ServerId == -3) {
                        contextObj.notificationService.ShowToaster("IDrawing Layer Names and  Drawing Layer Names should not be same", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Layer Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                }
            });
        }
        else {
            let test = event.fieldObject;
            this.administrationService.postSubmitAdddrawinglayer(test).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Drawing Layer added", 3);
                        contextObj.enableMenu = [1, 3];
                        contextObj.types = false;
                        contextObj.drawingLayersSource[contextObj.drawingLayersSource.length - 1] = eval(resultData["Data"].Data)[0];
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });

                    }
                    else if (resultData["Data"].ServerId == -3) {
                        contextObj.types = false;
                        contextObj.enableMenu = [1, 3];
                        contextObj.notificationService.ShowToaster("iDrawings Layer Name and Drawing Layer Name should not be same", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
                    }
                    else {

                        contextObj.types = false;
                        contextObj.enableMenu = [1, 3];
                        contextObj.notificationService.ShowToaster("Layer Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "157" });
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
            this.menuDeleteClick(event.value);
        }
    }
    public menuAddClick() {
        this.drawingLayersSource = this.getData.addCardForGrid(this.drawingLayersSource, this.fields);
        this.types = true;
        this.enableMenu = [3];
    }

    public menuDeleteClick(id) {
        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
        else if (this.selIds.length==1) 
        {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Drawing Layer?", "Yes");
        }
        else
        {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        if (event.returnOk == true) {        
            this.administrationService.postDrawingLayersDelete(this.selIds[0]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems - 1;
                        for (var j = 0; j < contextObj.selIds.length; j++) {
                            var index = contextObj.drawingLayersSource.indexOf(contextObj.drawingLayersSource.filter(x => x["Id"] == contextObj.selIds[j])[0]);
                            if (index > -1)
                                contextObj.drawingLayersSource.splice(index, 1);
                        }
                        contextObj.notificationService.ShowToaster("Selected Drawing Layer deleted", 3);
                        if (contextObj.drawingLayersSource.length == 0) {
                            contextObj.types = true;
                            contextObj.enableMenu = [1];
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Selected Drawing Layer in use ,cannot be deleted", 5);
                    }
                }          
            });
           
        }
    }
    public pageChanged(event: any) {
        var contextObj = this;
        if (event.pageEvent.page == 2) {
            contextObj.administrationService.getDrawingLayersData().
                subscribe(function (itemsSource) {
                    if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                        contextObj.drawingLayersSource = itemsSource["paging"]
                    }
                });

        }
        else {

            contextObj.administrationService.getDrawingLayersData().
            subscribe(function (itemsSource) {
                if (contextObj.getData.checkForUnhandledErrors(itemsSource)) {
                    contextObj.drawingLayersSource = itemsSource["data"]
                }
            });

        }
    };

    onCardCancelClick()
    {
        this.types = false;
        this.enableMenu = [1,3];
    }

    onDelete(e: Event) {
        if (this.selIds.length > 1) {
            this.notificationService.ShowToaster("This operation is performed for one card at a time", 2);
        } else {
            this.menuDeleteClick(this.selIds);
        }
    }

}

