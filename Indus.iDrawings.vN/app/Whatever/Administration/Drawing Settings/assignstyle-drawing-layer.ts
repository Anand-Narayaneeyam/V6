import {Component,OnInit} from '@angular/core';
import {  HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IField, ILookupValues} from  '../../../Framework/Models/Interface/IField'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component'
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GeneralFunctions} from '../../../Models/common/general'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
@Component({
    selector: 'assignstyle-drawing-layer',
    templateUrl: './app/Views/Administration/Drawing Settings/assignstyle-drawing-layer.html',
    directives: [GridComponent, PagingComponent, FieldComponent, Notification, DropDownListComponent, Sorting, SubMenu],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, GeneralFunctions]
})

export class AssignstyleDrawingLayerComponent implements OnInit{

    btnEnabled: boolean = false;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    ddlSelectedStyleId:any;
    alignContent: string = "horizontal";
    errorMessage: string;
    ddlStyleName: IField;
    blnShowSort: boolean = true;
    fieldObject: IField[];
    itemsSource: any[];
    enableMenu = [];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
   // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true }; 
    menuData = [
        {
            "id": 1,
            "title": "Save Changes",
            "image": "Update",
            "path": "Update",
            "subMenu": null,
            "privilegeId": null
          
        }

    ];
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private genFun: GeneralFunctions) {
    }
    public onSubMenuChange(event: any) {

        switch (event.value) {
            case 1:
                this.update();
                break;
        }
    }
    ngOnInit() {
        var contextObj = this;
        this.administrationService.getAssignStyleColumns().subscribe(function (resultData) {
            if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                contextObj.ddlStyleName = resultData["Data"].find(function (el) { return el.ReportFieldId === 4433; });
                contextObj.fieldObject = resultData["Data"];
                for (let i = 0; i < resultData["Data"].length; i++) {
                    var updatedData = new Array();
                    contextObj.fieldObject = resultData["Data"].splice(2, 5);
                    break;
                }
                for (let j = 0; j < contextObj.fieldObject.length; j++) {
                    if (contextObj.fieldObject[j].ReportFieldId == 4405 || contextObj.fieldObject[j].ReportFieldId == 272) {
                        contextObj.fieldObject[j].IsEnabled = false;
                    }
                }
            }
        })
    }

    public pageChanged(event: any) {
        /*if (event.pageEvent.page == 2) {
            this.administrationService.getAssignStyleList().subscribe(
                result => this.itemsSource = result["paging"],
                error => this.errorMessage = error,
                () => console.log('itemsSource', this.itemsSource));
        }
        else
        {
            this.administrationService.getAssignStyleList().subscribe(
                result => this.itemsSource = result["data"],
                error => this.errorMessage = error,
                () => console.log('itemsSource', this.itemsSource));
        }*/
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        if (contextObj.ddlSelectedStyleId != "-1") {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 4411,
                Value: contextObj.ddlSelectedStyleId
            })
            this.administrationService.getAssignStyleData(JSON.stringify(fieldobj), contextObj.pageIndex, '[' + objGrid.selectedField + ']', contextObj.inputItems.sortDir).subscribe(function (resultData) {
                if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.blnShowSort = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.blnShowSort = false;
                    }
                }
            });
        }
        else {
            contextObj.itemsSource = null;
        }
    }    

    ddlStyleNameChange(event: any) {
        var contextObj = this;
        this.ddlSelectedStyleId = event;
        if (this.ddlSelectedStyleId == "-1") {
            contextObj.btnEnabled = false;
            contextObj.notificationService.ShowToaster("Select a Style Name", 2);
            contextObj.itemsSource = null;
            contextObj.enableMenu = [];
        }
        else {
            contextObj.btnEnabled = true;
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 4411,
                Value: event
            })
            this.administrationService.getAssignStyleData(JSON.stringify(fieldobj), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {

                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.blnShowSort = true;
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.enableMenu = [];
                    contextObj.notificationService.ShowToaster("No data exists", 3);
                    contextObj.blnShowSort = false;
                }
            })
        }

    }

    update() {
        debugger
     
        var contextObj = this;
        var plotStyleId = this.ddlSelectedStyleId;
        var reportFieldArray = new Array<ReportFieldArray>();
        if (plotStyleId != undefined || plotStyleId > -1) {
            
            for (let i = 0; i < this.itemsSource.length; i++) {
                if (this.itemsSource[i].IsAssigned == true) {
                    reportFieldArray.push({
                        ReportFieldId: 4402,
                        Value: this.itemsSource[i].Id
                    });

                }
            }
            reportFieldArray.push({
                ReportFieldId: 4411,
                Value: plotStyleId
            });
            this.administrationService.updateAssignStyleData(plotStyleId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Drawing Layer details already exists", 5);
                            }
                            break;
                    }
                }
            });
            var arrayList = new Array<ReportFieldArray>();
        }
        else {
            contextObj.btnEnabled = false;
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}