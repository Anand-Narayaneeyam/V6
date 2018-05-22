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
import { GeneralFunctions} from '../../../Models/Common/General';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { CommonService } from '../../../Models/Common/common.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'default-display-layer',
    templateUrl: './app/Views/Common/DefaultDisplayLayer/default-display-layer-component.html',
    directives: [SubMenu, GridComponent, PagingComponent, SplitViewComponent, SlideComponent, FieldComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, CommonService, AdministrationService],
    inputs: ["ModuleId"]
})

export class DefaultDisplayLayerComponent {
    fieldObject: IField[];
    fieldObjAdd: IField[];
    refAddFieldObj: string;
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
    rptfieldIdValue = [];
    isAddFalg: boolean = false;
    isDeleteFalg: boolean = false;
    dynamicSlideTitle: string = "";

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
    @Input() ModuleId;
    private enableMenu = [1, 2, 3];
    private selectedId = 0;
    private slideType: string = "";
    constructor(private notificationService: NotificationService, private genFun: GeneralFunctions, private commonService: CommonService, private administrationService: AdministrationService) {
    }

    ngOnInit(): void {

        var contextObj = this;
        this.commonService.getDefaultDrawingLayerColms().subscribe(function (resultData) {

            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObjAdd = JSON.parse(JSON.stringify(resultData["Data"]));
            contextObj.refAddFieldObj = JSON.stringify(resultData["Data"]);

        });
        this.dataLoad(1, contextObj);

    }

    public dataLoad(target?: number, context?: any) {

        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 501,
            Value: context.ModuleId
        });

        context.commonService.getDefaultDrawingLayerListData(JSON.stringify(arrayList), context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {

            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {

                context.notificationService.ShowToaster("No Default Display Layer exist", 2);
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
                this.addEditSpaceFunClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteSpaceFunClick();
                break;
        }
    }
    private addEditSpaceFunClick(target) {
        var contextObj = this;

        if (target == 2) {

            if (this.inputItems.rowData['IsDefaultLayer'] == 1) {
                this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is an iDrawings Layer", 2);
                return;
            }
            else if (this.inputItems.rowData['IsEditable'] == 0) {
                this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is a System Default Layer", 2);
                return;
            }
            else {

                this.selectedId = this.inputItems.selectedIds[0];
                //  this.pageTitle = "Edit Default Display Layer";
                this.dynamicSlideTitle = "Edit Default Display Layer";
                this.btnName = "Save Changes";
                this.selectedId = this.inputItems.selectedIds[0];
                this.fieldObjAdd.find(function (item) {
                    if (item.FieldId == 2859)
                        item.FieldValue = contextObj.inputItems.rowData["Layer Name"];
                    return true;
                });
                this.showaddedit = true;
                //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
            }

        } else {
            // this.pageTitle = "New Default Display Layer";
            this.fieldObjAdd = JSON.parse(contextObj.refAddFieldObj);
            this.dynamicSlideTitle = "New Default Display Layer";
            this.btnName = "Save";
            this.selectedId = 0;
            this.fieldObjAdd.find(function (item) {
                if (item.FieldId == 2859)
                    item.FieldValue = "";
                return true;
            });
            this.showaddedit = true;
            // this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }

    }

    private deleteSpaceFunClick() {

        var contextObj = this;
        if (this.inputItems.rowData['IsDefaultLayer'] == 1) {
            this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be deleted, since it is an iDrawings Layer", 2);
            return;
        }
        else if (this.inputItems.rowData['IsEditable'] == 0) {
            this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is a System Default Layer", 2);
            return;
        }
        else {
            this.slideTitle = "iDrawings V6";
            this.showaddedit = false;
            this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Default Display Layer?";
            this.showslide = true;
            this.isDeleteFalg = true;
            this.isAddFalg = false;

            this.rptfieldIdValue = [];
            if (this.inputItems.rowData["UserId"] == null) {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: false
                });
            }
            else {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: true
                });
            }
            this.rptfieldIdValue.push({
                ReportFieldId: 501,
                Value: this.ModuleId
            });
            this.rptfieldIdValue.push({
                ReportFieldId: 502,
                Value: this.inputItems.rowData["Layer Name"]
            });
        }

    }

    private onSubmitData(event) {

        var context = this;

        this.rptfieldIdValue = [];
        this.rptfieldIdValue.push({
            ReportFieldId: 502,
            Value: JSON.parse(event["fieldobject"])[0].Value
        });
        this.rptfieldIdValue.push({
            ReportFieldId: 501,
            Value: this.ModuleId
        });

        if (this.btnName == 'Save') {

            this.slideType = "notification";
            this.slideTitle = "iDrawings V6";
            this.ConfirmDeleteMsg = "Do you want to save this as Default Settings?";
            this.isAddFalg = true;
            this.showslide = true;;
            this.isDeleteFalg = false;

        }
        else if (this.btnName == 'Save Changes') {
            if (this.inputItems.rowData["UserId"] == null) {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: false
                });
            }
            else {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: true
                });
            }

            this.commonService.UpdateDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), this.inputItems.selectedIds[0]).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Default Display Layer updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        //  context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                context.showslide = false;
                // context.showaddedit = false; 
                context.rptfieldIdValue = [];
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

    }

    private yesOnClick($event) {
        var contextObj = this;
        if (this.isAddFalg == true) {  // cutomer add

            this.rptfieldIdValue.push({
                ReportFieldId: 900221,
                Value: false
            });


            this.commonService.AddDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Default Display Layer added", 3);
                        contextObj.updateGrid({ "returnData": resultData["Data"].Data }, contextObj.selectedId); 
                        //  contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;                 
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                contextObj.showslide = false;
                contextObj.isAddFalg = false;
                contextObj.isDeleteFalg = false;
                contextObj.rptfieldIdValue = [];
            });
        }
        else if (this.isDeleteFalg == true) {

            this.commonService.deleteDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1) {
                    let retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.itemSource.length < 1) {
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Default Display Layer exist", 2);
                    }
                    contextObj.showslide = false;
                    contextObj.notificationService.ShowToaster("Default Display Layer deleted", 3);

                }
            });
        }
    }

    private closeSlide(event) {

        this.showslide = false;
        this.isAddFalg = false;
        this.isDeleteFalg = false;
        this.showaddedit = false;
        this.rptfieldIdValue = [];
    }

    private noOnClick($event) {
        var contextObj = this;

        if (this.isAddFalg == true) {   // user add

            this.rptfieldIdValue.push({
                ReportFieldId: 900221,
                Value: true
            });


            this.commonService.AddDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Default Display Layer added", 3);
                        contextObj.updateGrid({ "returnData": resultData["Data"].Data }, contextObj.selectedId);
                        //  contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                contextObj.showslide = false;
                contextObj.isAddFalg = false;
                contextObj.isDeleteFalg = false;
                contextObj.rptfieldIdValue = [];
            });
        }
        else
            this.showslide = false;
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}