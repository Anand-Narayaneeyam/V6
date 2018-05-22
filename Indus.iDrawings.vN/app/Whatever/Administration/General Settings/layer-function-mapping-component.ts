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
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'

@Component({
    selector: 'layer-function-mapping',
    templateUrl: './app/Views/Administration/General Settings/layer-function-mapping-component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, FieldComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: [""]
})

export class LayerFunctionMappingsComponent {
    fieldObject: IField[];
    fieldObjAdd: IField[];
    itemSource: any[];
    inputItems: IGrid = { dataKey: "DrawingLayerId", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
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
    private enableMenu = [1, 2, 3];
    private selectedId = 0;
    private slideType: string = "";
    constructor(private notificationService: NotificationService, private genFun: GeneralFunctions, private administrationService: AdministrationService) {
    }

    ngOnInit(): void {

        var contextObj = this;
        this.administrationService.getLayerFunctionMappingColms().subscribe(function (resultData) {
            
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);

    }

    public dataLoad(target?: number, context?: any) {

        context.administrationService.getLayerFunctionMappingListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);;
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Layer Functions exist", 2);
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
                this.addEditClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteClick();
                break;
        }
    }
    private addEditClick(target) {
        var spaceFunVal = "";
        var contextObj = this;
        if (target == 2) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.pageTitle = "Edit Layer Function Mapping";
            this.btnName = "Save Changes";
        } else {
            this.pageTitle = "New Layer Function Mapping";
            this.btnName = "Save";
            this.selectedId = 0;
        }

        this.administrationService.loadLayerFunctionMappingAddEdit(this.selectedId, target).subscribe(function (resultData) {
            
            if (target == 2) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId == 2850)
                        item.IsEnabled = false;
                });
            }
            contextObj.fieldObjAdd = resultData["Data"];
            contextObj.showaddedit = true;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    private deleteClick() {
        this.slideTitle = "iDrawings V6";
        this.showaddedit = false;
        this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Layer Function Mapping?";
        this.showslide = true;
    }

    private onSubmitData(event, btnName) {
        var context = this;


        if (btnName == 'Save') {
            this.administrationService.AddLayerFunctionMapping(event["fieldobject"], 0).subscribe(function (resultData) {
                
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Layer Function Mapping added", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showslide = false;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                        }
                        break;
                }
            });
        }
        else if (btnName == 'Save Changes') {
            this.administrationService.UpdateLayerFunctionMapping(event["fieldobject"], this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Layer Function Mapping updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showslide = false;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                        }
                        break;
                }
            });
        }
    }

    private updateGrid(event, selId) {

        this.refreshgrid = [];
        if (selId == 0) {
            var retUpdatedSrc = this.genFun.updateDataSource(this.itemSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems > 0) {
                this.enableMenu = [1, 2, 3];
            }
        } else {
            this.genFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    private yesOnClick($event) {
        var contextObj = this;
        this.administrationService.deleteLayerFunctionMapping(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                let retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemSource.length < 1) {
                    contextObj.notificationService.ShowToaster("No Layer Functions exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.showslide = false; 
                contextObj.notificationService.ShowToaster("Selected Layer Function Mapping deleted", 3);
            }
        });
    }

    private closeSlide(event) {
        this.showslide = false;
    }

}