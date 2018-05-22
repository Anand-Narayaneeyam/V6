import { Component, OnInit, EventEmitter } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { IField } from '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { FieldOrderComponent } from '../../Common/additional data fields/fieldorder.component';
import { DND_PROVIDERS, DND_DIRECTIVES } from '../../../framework/externallibraries/dnd/ng2-dnd';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { querySpaceTypeComponent } from '../SpaceType/querySpaceType.Component';

@Component({
    selector: 'space-types',
    templateUrl: 'app/Views/Employee/General Settings/space-types.component.html',
    directives: [ListComponent, FieldComponent, Notification, SubMenu, PagingComponent, SlideComponent, FieldOrderComponent, DND_DIRECTIVES, SplitViewComponent, GridComponent, querySpaceTypeComponent],
    providers: [HTTP_PROVIDERS, EmployeeService, NotificationService, ConfirmationService, GeneralFunctions, DND_PROVIDERS]

})


export class spacetypesComponent implements OnInit {

    dragEnable: boolean = true;
    public totalItems: number = 0;
    returnData: any;
    types = true;
    pageIndex: number = 0;
    message;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: "Id", sortDir: "ASC", selectioMode: "single" };
    public errorMessage: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    pageTitle: string;
    moduleId: any;
    QueryCategryId: any;
    SpaceTypeSource: any[];
    submitSuccess: any[] = [];
    private fields: IField[];
    selectedspacetypeId: any;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add"
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit"
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete"
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    fieldOrderObj = new Array<FieldObjectArray>();
    menuEventValue: any;
    fieldDetailsAdd1: IField[];
    refreshgrid;

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private getData: GeneralFunctions, private generFun: GeneralFunctions) {
    }

    ngOnInit(): void {
        var contextObj = this;
        contextObj.moduleId = -1;
        contextObj.QueryCategryId = -1;
        this.employeeService.getpaceTypeFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            for (var i = 0; i < resultData["Data"].length; i++) {
                resultData.Data[i]["Width"] = 100;
            }
            contextObj.getSpaceType();
        });
    }

    public getSpaceType() {
        var contextObj = this;
        this.employeeService.getSpaceTypeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                } else {
                    contextObj.SpaceTypeSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    for (var i = 0; i < contextObj.SpaceTypeSource.length; i++) {
                        contextObj.fieldOrderObj.push({
                            Id: contextObj.SpaceTypeSource[i].Id,
                            Value: contextObj.SpaceTypeSource[i].Grade,
                            OldPositionNo: contextObj.SpaceTypeSource[i]["Space Type"],
                            NewPositionNo: null
                        })
                    }
                }
                contextObj.changeEnableMenu();
            }
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Space Types exist", 2);
        }
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuEventValue = 0;
        if (event.value == 1) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 2) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        this.action = "add";
        this.pageTitle = "New Space Type";
        this.menuEventValue = 1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
      
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.pageTitle = "Edit Space Type";
        this.menuEventValue = 2;
        this.inputItems.rowData = this.inputItems.rowData;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Space Type", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
                contextObj.message = "Are you sure you want to delete the selected Space Type?";
                contextObj.showSlide = !contextObj.showSlide;
        }
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add" || event["SaveAs"]==1) {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.SpaceTypeSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.SpaceTypeSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.SpaceTypeSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
        contextObj.menuEventValue = 0;
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getSpaceType();
    }

    okDelete(event: Event) {
        this.deleteSpaceType();
        this.showSlide = !this.showSlide;
    }

    deleteSpaceType() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.employeeService.postDeletepaceType(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["StatusId"] == 1) {
                    let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.SpaceTypeSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.SpaceTypeSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.getSpaceType();
                    contextObj.notificationService.ShowToaster("Selected Space Type deleted", 3);
                } else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Space Type in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            }
        });
        //}
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface FieldObjectArray {
    Id: number;
    Value: string;
    OldPositionNo: number;
    NewPositionNo: number;
}

export interface SubmitFieldOrderArray {
    ReportFieldId: number,
    ApplicationFieldId: number,
    ApplicationFormId: number,
    PositionNo: number
}
