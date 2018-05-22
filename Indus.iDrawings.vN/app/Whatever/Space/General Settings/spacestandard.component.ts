
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { SpaceService } from '../../../Models/Space/space.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {SpaceStandardAddEditComponent} from './spacestandard-AddEdit.component'

@Component({
    selector: 'space-standard',
    templateUrl: 'app/Views/Space/General Settings/spacestandard.html',
    directives: [SlideComponent, ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, GridComponent, SplitViewComponent, SpaceStandardAddEditComponent],
    providers: [GeneralFunctions,HTTP_PROVIDERS, SpaceService, NotificationService]

})

export class SpaceStandardComponent implements OnInit {
    public totalItems: number = 30;
    public itemsPerPage: number = 10;

    public fieldDetails: IField[];
    public errorMessage: string;
    spacestandardsource: any[];
    private fields: IField[];
    types = false;
    submitSuccess: any[] = [];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "privilegeId": 364   
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 365
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 366   
        }
    ];
    addCard = false;
    Position = "top-right";
    width = 300;
    change = false;
    showSlide = false;
    gridcount = 20;
    enableMenu = [];
    selIds = new Array();
    message = "";
    entity = false;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    pageIndex: number = 0;
    action: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAdd1: IField[];
    refreshgrid;
    Id = 11;
    constructor(private spaceService: SpaceService, private administrationService: AdministrationService, private generFun: GeneralFunctions, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;
        this.types = true;
        this.enableMenu = [1,2,3];
        var callBack = function (data) {
            this.menuData = data;
        };
        this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 104, this.administrationService, this.menuData.length);
        this.spaceService.getSpaceStandardFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                for (var i = 0; i < resultData["Data"].length; i++) {
                        resultData.Data[i]["Width"] = 200;
                }
                contextObj.fields = resultData["Data"];
            }
          
        });
        this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData1) {
                contextObj.spacestandardsource = JSON.parse(resultData1["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData1["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData1["Data"]["RowsPerPage"]);
                if (contextObj.totalItems <= 0) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
                }
        });
    }

    onSorting(event: any) {
        console.log("sort action");
    }

    public onSubMenuChange(event: any, id: any) {
        if (event.value == 1) {
            this.menuAddClick();
        }
        else if (event.value == 2) {
            this.menuEditClick();
        }
        else if (event.value == 3) {
            this.menuDeleteClick();
        }
    }

    public menuAddClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Space Standard";
        this.spaceService.loadSpaceStandardAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public menuEditClick() {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Space Standard";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.spaceService.loadSpaceStandardAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public menuDeleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1){
            var contextObj = this;
            var fieldObj = new Array<ReportFieldArray>();
            fieldObj.push({ ReportFieldId: 173, Value: "160" })
            this.spaceService.CheckIsEntityReferenceFound(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    contextObj.entity = resultData["Data"];
                    if (resultData["Data"] == false) {
                        contextObj.message = "Are you sure you want to delete the selected Space Standard?";
                        contextObj.width = 300;
                        contextObj.showSlide = !this.showSlide;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted.", 5);
                    }
            }); 
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
       this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
           contextObj.spacestandardsource = JSON.parse(resultData["Data"].FieldBinderData);
           contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
           contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
           if (contextObj.totalItems <= 0) {
               contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
           }
       });
    };

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.spacestandardsource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems <= 0) {
                contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
            }
        });
    }

    okDelete(event: any) {
        var contextObj = this;
        if (contextObj.entity == false) {
            this.spaceService.postSpaceStandardDelete(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"]["StatusId"] == 1) {
                    let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.spacestandardsource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.spacestandardsource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.notificationService.ShowToaster("Selected Space Standard deleted", 3);
                } else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            });
        }
        else
        {
            contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted", 5);
        }
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    cancelClick(value: any) {
        this.showSlide = value.value;
    }
    
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.spacestandardsource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.spacestandardsource = retUpdatedSrc["itemSrc"];
            contextObj.enableMenu = [1, 2, 3];

        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.spacestandardsource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;        
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}