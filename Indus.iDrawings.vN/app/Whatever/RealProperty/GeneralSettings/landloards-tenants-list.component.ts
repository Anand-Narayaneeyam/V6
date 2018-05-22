
//import {Component, AfterViewInit} from '@angular/core';
import {Component, Input, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component'
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';

//importing addedit component
import { LandlordsTenantsAddEditComponent } from './landloards-tenants-addedit.component'

@Component({    
    selector: 'landlord-list',
    templateUrl: './app/Views/RealProperty/GeneralSettings/landloards-tenants-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, CustomCheckBoxComponent, SlideComponent, LandlordsTenantsAddEditComponent],
    providers: [RealPropertyService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['categorytype'],
})


export class LandlordsComponent {
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    pageTitle: string = "";
    //for input category id from the section landloards or tenants
     categorytype : any = 0;  
    //passing category id as integer
    category: number = 0; 
    //To show proper message: we need category name : landloards or tenants
    categoryname: string = "Landlord ";
    types: boolean = true;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;


    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private generFun: GeneralFunctions)
    {
        
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.realPropertyService.getClientsColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            //console.log(result["Data"]);
        
            if (contextObj.categorytype == 1)//Landlords
            {
                //DB field is Landlord Name: Change the list header to landlord name
                contextObj.fieldObject[1].FieldLabel = "Landlord Name";         
                contextObj.category = 1;
                //For showing messages
                contextObj.categoryname = "Landlord";
                // console.log('contextObj.fieldObject["Name"] ' + contextObj.fieldObject["Name"]);
            }
            else {//Tenants
                contextObj.fieldObject[1].FieldLabel = "Tenant Name";
                contextObj.category = 2;
                contextObj.categoryname = "Tenant";
            }
            contextObj.dataLoad(1);
        });
       
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }
    //Adding extra parameters for loading
    public dataLoad(target?: number) {  
        // debugger;  
        var contextObj = this;
        contextObj.realPropertyService.getClientsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.categorytype).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0)
            {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1)
                {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2, 3];
            }
            else
            {
                contextObj.notificationService.ShowToaster("No " + contextObj.categoryname+ "s exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    }

    //While clicking add icon
    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        contextObj.pageTitle = contextObj.categorytype == 1 ? "New Landlord" : "New Tenant";
        this.realPropertyService.loadClientsAddEdit(0, 1,contextObj.categorytype).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];  
            contextObj.updateLabel();    
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

   //While clicking edit icon
    public editClick() {
        debugger;
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a " + contextObj.categoryname, 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            console.log("editid", this.inputItems.selectedIds[0])
            contextObj.pageTitle = contextObj.categorytype == 1 ? "Edit Landlord" : "Edit Tenant";
            this.realPropertyService.loadClientsAddEdit(this.inputItems.selectedIds[0], 2,contextObj.categorytype).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.updateLabel(); 
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }

    }
    updateLabel() {
        var contextObj = this;
        if (contextObj.categorytype == 1)//Landlords
        {
            //DB field is Landlord Name: Change the list header to landlord name
            contextObj.fieldDetailsAdd1[1].FieldLabel = "Landlord Name";
            contextObj.category = 1;
            //For showing messages
            contextObj.categoryname = "Landlord";
            // console.log('contextObj.fieldObject["Name"] ' + contextObj.fieldObject["Name"]);
        }
        else {//Tenants
            contextObj.fieldDetailsAdd1[1].FieldLabel = "Tenant Name";
            contextObj.category = 2;
            contextObj.categoryname = "Tenant";
        } 
    }

   //While clicking delete icon
    public deleteClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a " + contextObj.categoryname, 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            var contextObj = this;
            contextObj.realPropertyService.isClientInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname + " in use, cannot be deleted", 5);
                } else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        }

        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    //slide events/////


    okDelete(event: Event) {
        this.deleteClients();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    deleteClients() {
        var contextObj = this;
        contextObj.realPropertyService.deleteClients(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname +" deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.categoryname +" in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    updateclientcategory(fieldobject: any) {
        debugger;
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    }

    findData(fieldObjectArray) {
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6140) {
                item.Value = contextObject.categorytype;
            }

        });
        return fieldObjectArray;
    }

   
}