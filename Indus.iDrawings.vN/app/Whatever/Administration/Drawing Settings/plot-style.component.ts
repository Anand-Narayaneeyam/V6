
import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component'
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PlotStyleAddComponent} from './plotstyleadd.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'plot-style',
    templateUrl: './app/Views/Administration/Drawing Settings/plot-style.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, CustomCheckBoxComponent, PlotStyleAddComponent, SlideComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, GeneralFunctions]
})

export class PlotStyleComponent {  
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    //inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Style Name]", sortDir: "ASC" }; 
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Style Name]' };       
    totalItems: number = 0;
    itemsPerPage: number = 0; 
    pageIndex: number = 0;  
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    pageTitle = '';
    enableMenu = [1,2,3];
    refreshgrid;
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
            "id":3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;   

   
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
      
        var contextObj = this;
        this.administrationService.getPlotStyleColumns().subscribe(function (result) {        
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                contextObj.fieldObject = (result["Data"]);
            }
        });
        this.dataLoad(1, contextObj);                   
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);       
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad(0, contextObj);    
    }
    public dataLoad(target?: number, context?:any) {
        context.administrationService.getPlotStyleData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
           
                context.totalItems = result["Data"].DataCount;
                if (context.totalItems > 0) {
                    context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    if (target == 1) {
                        context.itemsPerPage = result["Data"].RowsPerPage;
                    }
                } else {
                    context.notificationService.ShowToaster("No Plot Style Settings exist", 2);
                    context.enableMenu = [1];
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
   
    public addClick() {
        var contextObj = this;
        contextObj.action = "add";    
        contextObj.btnName = "Save";
        this.pageTitle = "New Plot Style";
        contextObj.administrationService.loadPlotStyleAddEdit(contextObj.inputItems.selectedIds[0], 1).subscribe(
            function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsAdd1 = resultData["Data"]
                }
            });        
       
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
    public editClick() {
       
        this.action = "edit";
        this.btnName = "Save Changes";  
        this.pageTitle = "Edit Plot Style";   
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            console.log("editid", this.inputItems.selectedIds[0])
            this.administrationService.loadPlotStyleAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {  
                
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    let retItem = result["Data"].find(function (item) {
                        return item.ReportFieldId === 8341; //chkbx
                    });
                    contextObj.fieldDetailsAdd1 = contextObj.findDataObj(retItem.FieldValue, result["Data"]);
                    //contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            });                      
        }

    }
    public deleteClick() {       
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {      
            this.showSlide = !this.showSlide;          
        }                
    }
    submitReturn(event) {
       
        let retUpdatedSrc;
        this.refreshgrid = [];  
        if (this.action == "add") { 
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);          
            this.totalItems = retUpdatedSrc["itemCount"];                  
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);                              
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        this.itemsSource = retUpdatedSrc["itemSrc"];
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    //slide events/////
 

    okDelete(event: Event) {
        this.deletePltStyle();
        this.showSlide = !this.showSlide;       
    }
   
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;       
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    //grid inline events
    public inlineAdd(event: any) {
        var contextObj = this;  
        var contextObj = this;
        contextObj.administrationService.InlineAddUpdatePlotStyle(event, contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Plot Style added", 3);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Style Name already exists", 5);
                        }
                        break;
                }
            }
        });
       
    }

    public inlineEdit(event: any) {
        var contextObj = this;
        contextObj.administrationService.InlineAddUpdatePlotStyle(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Plot Style details updated", 3);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Style Name already exists", 5);
                        }
                        break;
                }
            }
        });    
    }
    public inlineDelete(event: any) {      
        this.deletePltStyle();    
    }

    deletePltStyle() {
     
        var contextObj = this;
        contextObj.administrationService.deletePlotStyle(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
        
            if (resultData["Data"]["StatusId"] == 1) {
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    else { contextObj.enableMenu = [1,2,3];}
                    contextObj.notificationService.ShowToaster("Selected Plot Style Setting deleted", 3);
                } else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Plot Style Setting in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
         
        });
    }

    findDataObj(objlinChecked,data) {
        //lineweight = 4442

        data.find(function (item) {
            if (item.ReportFieldId == 4442) {
                if (objlinChecked == "True") {
                    item.IsEnabled = false;
                    item.FieldValue = "0";
                } else {
                    item.IsEnabled = true;
                }
            }
            return item.ReportFieldId === 4442
        });
        return data;
    }
}