//import { Component, OnInit, Input } from '@angular/core';
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {RenovationAddEditComponent} from './buildings-rennovations-addedit.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'buildings-rennovations',
    templateUrl: './app/Views/RealProperty/Buildings/buildings-rennovations.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, Sorting, SlideComponent, PagingComponent, SplitViewComponent, GridComponent, RenovationAddEditComponent],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['selectedId', 'BuildingName','BuildingConstructionDate']
})

//export class BuildingRennovationComponent implements OnInit {
export class BuildingRennovationComponent {
   
    selectedId: any;
    BuildingName: any;
    //Rennovationdate: any;
    Bid: number;
    returnData: any;
    types = true;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    sortCol: string = "";
    sortDir: string = "ASC";
    success = "";
    selIds = new Array();
    public errorMessage: string;
    buildingrennovationSource: any[];
    private fields: IField[];
    sortFields: IField[];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 94
        }
        ,{
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 94
        }
        ,{
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 94
        }
    ];
    gridcount = 0;
    enableMenu = [0, 1, 2];
    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    submitSuccess: any[] = [];
    BuildingConstructionDate: any;
    showSort: boolean = true;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    pageTitle: string = "";
    fieldDetailsAdd1: IField[] = [];
    refreshgrid;

    constructor(private realPropertyservice: RealPropertyService, private notificationService: NotificationService, private getData: GeneralFunctions, private administrationService: AdministrationService) { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {        
        var contextObj = this;
        this.realPropertyservice.getRennovationFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item: IField) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fields = resultData["Data"];        
            contextObj.getBuildingRennovationDetails();              
        });
        var callBack = function (data) {
            contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (resultdata) {
                if (resultdata["Data"] == false) {
                    contextObj.menuData = data;
                }
            });
        };
        this.getData.GetPrivilegesOfPage(this.menuData, callBack, 34, this.administrationService, this.menuData.length);  
    }

    public getBuildingRennovationDetails() {
      
        var contextObj = this;
        this.realPropertyservice.getRennovationData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {        
            contextObj.buildingrennovationSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Renovations exist", 2);
            }
            else {
                contextObj.enableMenu = [0, 1, 2];
            }
        });
    }

    public onSubMenuChange(event: any, Id: any) {
        if (event.value == 0) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 1) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 2) // Delete
        {
            this.onMenuDeleteClick();
        }
    }   

    public onMenuAddClick() {
        var contextObj = this;
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Renovation";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.realPropertyservice.getRenovationAddLoad().subscribe(function (resultData) {
            resultData["Data"].find(function (item: IField) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var buildingId = contextObj.selectedId[0].toString();
            contextObj.fieldDetailsAdd1[3].FieldValue = buildingId;
        });
    }
    public onMenuEditClick() {
        var contextObj = this;
        this.btnName = "Save Changes";
        this.action = "edit";
        this.pageTitle = "Edit Renovation";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.realPropertyservice.getRenovationAddLoad().subscribe(function (resultData) {
            resultData["Data"].find(function (item: IField) {
                if (item.ReportFieldId == 6697) {
                    item.MaxLength = 14;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[1].ReadOnlyMode = true;
            var date = contextObj.inputItems.rowData["Renovation Date"];
            var cost = contextObj.inputItems.rowData["Cost"];
            var buildingId = contextObj.selectedId[0].toString();
            contextObj.fieldDetailsAdd1[3].FieldValue = buildingId;
            contextObj.fieldDetailsAdd1[1].FieldValue = date;
            contextObj.fieldDetailsAdd1[2].FieldValue = cost;
        });
    }

    onCardSubmit(event: any) {
        var contextObj = this;
        var bcd = new Date(this.BuildingConstructionDate);

        if (event["dataKeyValue"]) {
            let fieldDetails = this.updateBuildingname(event.fieldObject);
            var field = new Array<ReportFieldArray>();
            field = JSON.parse(fieldDetails);
            field.push({
                ReportFieldId: 6695,
                Value: this.selectedId[0]
            });

            var date = new Date(field[0].Value);
            var year = date.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mon = monthNames[date.getMonth()];
            var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            field[0].Value = dd + " " + mon + " " + year;
            field.push({
                ReportFieldId: 271,
                Value: "30"
            });          
            fieldDetails = JSON.stringify(field);

            this.realPropertyservice.postEditRennovationDetails(fieldDetails,0).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success")
                {
                    contextObj.notificationService.ShowToaster("Renovation updated", 3);
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    contextObj.showSort = true;
                }
                else
                {
                    contextObj.notificationService.ShowToaster("Renovation already exists", 5);
                    //contextObj.getBuildingRennovationDetails();
                    contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
                }
                contextObj.changeEnableMenu();
            })
        } else {    
            let fieldDetails = this.updateBuildingname(event.fieldObject);  

            var field = new Array<ReportFieldArray>();
            field = JSON.parse(fieldDetails);
            field.push({
                ReportFieldId: 6695,
                Value: this.selectedId[0]
            });
            field.push({
                ReportFieldId: 271,
                Value: "30"
            });
            fieldDetails = JSON.stringify(field);
            var date = new Date(field[0].Value);
            if (bcd > date) {
                var year = bcd.getFullYear();
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var mon = monthNames[bcd.getMonth()];
                var dd = (bcd.getDate() < 10 ? '0' : '') + bcd.getDate();
                var bcd1 = dd + " " + mon + " " + year;
                contextObj.notificationService.ShowToaster("Renovation Date should be greater than Building Construction Date (" + bcd1 +")", 2);
                contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
            }
            else {
                this.realPropertyservice.postAddRennovationDetails(fieldDetails).subscribe(function (resultData) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Renovation added", 3);
                        contextObj.types = false;
                        contextObj.buildingrennovationSource[contextObj.buildingrennovationSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.fields = contextObj.fields.filter(function (el) {
                            if (el.ReportFieldId == 6696) {
                                el.IsEnabled = false;
                            }
                            return true
                        });
                        contextObj.getBuildingRennovationDetails();
                        contextObj.selIds = [];
                        contextObj.showSort = true;
                    }
                    else {
                        //contextObj.buildingrennovationSource.splice(contextObj.buildingrennovationSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Renovation already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "6696" });
                    }
                    contextObj.changeEnableMenu();
                });
            }
        }
    }
    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [0, 1, 2];
        if (contextObj.totalItems == 0) {
            contextObj.notificationService.ShowToaster("No Renovations exist", 2);
        }
    }
    //Delete----------------------------------------------------------------------
    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select a Renovation", 2);
        }
    }
    onDelete(e: Event) {
        var contextObj = this;        
        this.onMenuDeleteClick();
    }

  okDelete(event: Event) {
      var contextObj = this;   
     
        this.deleteBuildingRennovation();
        this.showSlide = !this.showSlide;
  }
//-------------------------
  public deleteBuildingRennovation()
  {
      var contextObj = this; 
      this.realPropertyservice.postDeleteRennovationDetails(contextObj.selectedId[0], contextObj.inputItems.rowData["Renovation Date"]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (contextObj.success == "Success")
            {
                contextObj.notificationService.ShowToaster("Selected Renovation deleted", 3);
                contextObj.getBuildingRennovationDetails();
            }
            else
            {
                contextObj.notificationService.ShowToaster("Selected Renovation in use, cannot be deleted", 5);
            }
        });

    }

    onCardCancelClick() {
        this.changeEnableMenu();
        this.fields = this.fields.filter(function (el) {
            if (el.ReportFieldId == 6696) {
                el.IsEnabled = false;
            }
            return true
        });
        this.showSort = true;
    }
    
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    updateBuildingname(fieldobject: any) {
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    }

    findData(fieldObjectArray) {
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6695) {                
                item.Value = contextObject.selectedId[0];               
            }
            if (item.ReportFieldId == 488) {
                //debugger;
                fieldObjectArray = fieldObjectArray.filter(function (item) {
                    return item.ReportFieldId !== 488;
                });
            }

        });
        return fieldObjectArray;
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getBuildingRennovationDetails();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getBuildingRennovationDetails();
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
                      
        } else if (this.action == "edit") {           
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.getBuildingRennovationDetails(); 
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}