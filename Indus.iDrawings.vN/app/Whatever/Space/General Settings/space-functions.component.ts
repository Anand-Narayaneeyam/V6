
import {Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { SpaceService } from '../../../Models/Space/space.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'

@Component({
    selector: 'space-functions',
    templateUrl: './app/Views/Space/General Settings/space-functions.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, FieldComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, SpaceService],
    inputs: ["customSpacefnName"]
})

export class SpaceFunctionsComponent  {
    fieldObject: IField[];   
    fieldObjAdd: IField[];
    itemSource: any[];
    inputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };    
    refreshgrid: any;      
    pageTitle: string = "";
    btnName: string = "Save";
    showaddedit: boolean = false;
    showslide: boolean = false;
    slideTitle: string = "";
    ConfirmDeleteMsg: string = "";
    
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
    @Input() customSpacefnName;
    private enableMenu = [1,2,3];
    private selectedId = 0;
    private slideType: string = "";
    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private genFun: GeneralFunctions) {
    }

    ngOnInit(): void {

        var contextObj = this;
        this.spaceService.getSpaceFunctionColms().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObjAdd = JSON.parse(JSON.stringify(resultData["Data"]));
          
        });
        this.dataLoad(1, contextObj);
       
    }

    public dataLoad(target?: number, context?: any) {
        
        context.spaceService.getSpaecFunctionListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
             
                context.notificationService.ShowToaster("No " + context.customSpacefnName + "s exist", 2);
                context.enableMenu = [1];
            }
        });
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
    public onSubMenuChange(event: any) {
        this.pageTitle = "";
        this.showaddedit = false;
        
        switch (event.value) {
            case 1:
            case 2:
                this.showslide = true;
                this.slideType = "dialog";
                this.addEditSpaceFunClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteSpaceFunClick();
                break;              
        }
    }
    private addEditSpaceFunClick(target) {
        var spaceFunVal = "";
       
        if (target == 2) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.slideTitle = "Edit " + this.customSpacefnName;
            this.btnName = "Save Changes";
            spaceFunVal = this.inputItems.rowData[this.customSpacefnName];          
            
        } else {
            this.slideTitle = "New " + this.customSpacefnName;
            this.btnName = "Save";
            this.selectedId = 0;
            spaceFunVal = "";
        }
        this.fieldObjAdd.find(function (el) {
            if (el.FieldId == 2268) {
                el.FieldValue = spaceFunVal;
                return true;
            } else
                return false;
        });
        this.showaddedit = true;     
    }

    private deleteSpaceFunClick() {
        this.slideTitle = "iDrawings V6";
        var context = this;
        this.showaddedit = false;  
        var rptFldVal = [{ ReportFieldId: 173, Value: "158" }];
        this.spaceService.CheckIsEntityReferenceFound(rptFldVal, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"] == false)
                context.ConfirmDeleteMsg = "Are you sure you want to delete the selected " + context.customSpacefnName +"?";
            else
                context.ConfirmDeleteMsg = "Selected " + context.customSpacefnName + " is in use.Are you sure you want to delete the selected " + context.customSpacefnName +"?";
            context.showslide = true
        });
    }

    private onSubmitData(event) {
        var context = this;
        this.spaceService.addUpdateSpaceFunction(this.selectedId, event["fieldobject"]).subscribe(function (resultData) {           
            switch (resultData["Data"].StatusId) {

                case 1:
                    var msg = "";
                    if (context.selectedId == 0) {
                        msg =" added";
                    } else {
                        msg = " updated";
                    }
                    msg = context.customSpacefnName + msg;
                    context.notificationService.ShowToaster(msg, 3);
                    context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                    context.showslide = false;
                    context.showaddedit = false;              
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        context.notificationService.ShowToaster(context.customSpacefnName +" already exists", 5);
                    }
                    break;
            }          
        });
    }  
     
    private updateGrid(event, selId) {
        this.refreshgrid = [];      
        if (selId == 0) {
            var retUpdatedSrc = this.genFun.updateDataSource(this.itemSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems > 0) {
                this.enableMenu = [1,2,3];
            }
        } else {
            this.genFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }        

    }

    private yesOnClick($event) {
        var contextObj = this;
        this.spaceService.deleteSpaecFunction(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                let retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemSource.length < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.showslide = false;
                contextObj.notificationService.ShowToaster(contextObj.customSpacefnName + " deleted", 3);

            }
        });
    }

    private closeSlide(event) {
        this.showslide= false;
    }
    
}