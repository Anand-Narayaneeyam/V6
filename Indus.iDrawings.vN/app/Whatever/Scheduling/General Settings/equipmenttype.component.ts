import {Component, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {IField} from '../../../Framework/Models/Interface/Ifield'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {GeneralFunctions} from '../../../models/common/general'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {SchedulingService} from '../../../models/scheduling/scheduling.service'
import {ObjectsService} from '../../../models/objects/objects.service'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';


@Component({
    selector: 'equipment-type',
    templateUrl: 'app/Views/Scheduling/General Settings/equipmenttype.component.html',
    providers: [NotificationService, GeneralFunctions, AdministrationService, SchedulingService, ObjectsService],
    inputs: [],
    directives: [GridComponent, PagingComponent, Notification, FieldComponent, SubMenu, SplitViewComponent, SlideComponent]

})

export class EquipmentTypeComponent {

    splitviewequipmenttype: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    splitViewTitle: string;
    success: any;
    equipmenttypeMenu;
    equipmenttypeMenuTotalItems: number = 0;
    enableaequipmenttypeMenu: any[];
    inputItems: IGrid = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Equipment Type]', sortDir: 'ASC', selectioMode: 'single' };
    fieldObject: IField[];
    refreshgrid = [];
    arrHighlightRowIds = [];
    menumock = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 919
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 920
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 921
        }
    ];

    pageIndex: number = 0;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    itemsSource: any[];
    target: number = 0;
    selectedId: number

    fieldDetailsSpaceEdit: IField[];
    btnName: string;

    position: string = "top-right";
    showSlide = false;


    constructor(private notificationService: NotificationService, private objectsService: ObjectsService, private generFun: GeneralFunctions, private schedulingservice: SchedulingService, private administrationService: AdministrationService) {
        var contextObj = this;
        //this.equipmenttypeMenu = this.menumock;
        this.enableaequipmenttypeMenu = [1, 2, 3]
        var callBack = function (data) {
            contextObj.equipmenttypeMenu = data;
        };
        this.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 204, contextObj.administrationService, contextObj.menumock.length)

    }



    ngOnInit() {
        var context = this;
        this.schedulingservice.getEquipmentTypeFields().subscribe(function (resultdata) {
            context.fieldObject = resultdata["Data"]
        });
        this.dataLoad();
    }
    onSplitViewClose(event) {
        this.splitviewequipmenttype.showSecondaryView = false;
    }
    updateequipmenttypeMenu(event) {
        switch (event.value) {
            case 1:
                this.add();
                break;
            case 2: this.edit();
                break;
            case 3: this.delete();
                break;
        }
    }
    add() {
        this.splitViewTitle = "New Equipment Type";
        this.target = 1;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save";
        this.schedulingservice.loadAddEditEquipmentType(this.inputItems.selectedIds, this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"]
        });

    }
    edit() {
        this.splitViewTitle = " Edit Equipment Type";
        this.target = 2;
        var context = this;
        this.splitviewequipmenttype.showSecondaryView = true;
        this.btnName = "Save Changes";
        this.schedulingservice.loadAddEditEquipmentType(this.inputItems.selectedIds[0], this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"]
        });

    }
    delete() {
        var context = this;
        //if the equipment type has been reserved, currently delete functionality is being blocked
        this.schedulingservice.CheckTypeInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1)
                context.notificationService.ShowToaster('Selected Equipment Type is in use, cannot be deleted', 2)
            else
                context.showSlide = true;
        })


    }
    dataLoad() {
        var contextObj = this;
        this.schedulingservice.getEquipmentTypeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, 1).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster('No Equipment Types exist', 2)
                contextObj.enableaequipmenttypeMenu = [1];
            }
        })
        /* this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir,1).subscribe(function (resultData) {
             //contextObj.messages = resultData["Data"].ReturnMessages;
             //contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
             //contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"];
             contextObj.totalItems = resultData["Data"].DataCount;
             if (contextObj.totalItems > 0) {
                 contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                 contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                 contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
             }
             else {
                 contextObj.notificationService.ShowToaster('No data exists', 2)
                 contextObj.enableaequipmenttypeMenu = [1];
             }
         });*/
    }
    onSort(event) {
        this.dataLoad();
    }
    public onPageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    onSubmitData(event) {


        var pageDetails = event["fieldobject"]
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        arr.push({ ReportFieldId: 283, Value: "1" }, { ReportFieldId: 649, Value: "1" }, { ReportFieldId: 651, Value: "" }, { ReportFieldId: 4485, Value: "39" })


        let retUpdatedSrc;
        var contextObj = this;
        this.selectedId = this.inputItems.selectedIds[0]
        this.schedulingservice.postSubmitObjectClass(JSON.stringify(arr), this.selectedId, this.target, 1).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            var retData = { returnData: contextObj.success.Data };
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (contextObj.target == 1) {
                        contextObj.notificationService.ShowToaster('Equipment Type added', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "add", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj.enableaequipmenttypeMenu = [1, 2, 3];
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    }
                    else {
                        contextObj.notificationService.ShowToaster('Equipment Type updated', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    }
                    contextObj.splitviewequipmenttype.showSecondaryView = false;
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster('Equipment Type already exists', 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster('Equipment types Already Exist', 5);
                    }
                    break;
            }
        });



    }

    okDelete(event) {
        var contextObj = this;
        contextObj.schedulingservice.postDeleteObjectClass(contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableaequipmenttypeMenu = [1];
                }

                contextObj.notificationService.ShowToaster('Equipment Type deleted', 3);
            }
            else {
                //contextObj.notificationService.ShowToaster("Selected Object Class cannot be deleted", 5);
            }
        });
        this.showSlide = false;;
    }
    cancelClick(event, index) {
        if (index == 1)
            this.showSlide = event.value;
    }
    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}