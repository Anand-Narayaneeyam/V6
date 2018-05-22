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
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ObjectsService} from '../../../models/objects/objects.service'


@Component({
    selector: 'equipment-quantity',
    templateUrl: 'app/Views/Scheduling/General Settings/equipmentquantities.component.html',
    providers: [NotificationService, GeneralFunctions, AdministrationService, ObjectsService, SchedulingService],
    inputs: [],
    directives: [GridComponent, PagingComponent, Notification, FieldComponent, SlideComponent, SubMenu, SplitViewComponent]

})

export class EquipmentQuantityComponent {

    splitviewequipmentquantity: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    splitViewTitle: string;
    equipmentquantityMenu;
    success: any;
    equipmentquantityMenuTotalItems: number = 0;
    enableaequipmentquantityMenu: any[];
    inputItems: IGrid = {
        dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Id]', sortDir: 'ASC', isautosizecolms: true, selectioMode: 'single'
    };
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
        }
        ,
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

    constructor(private notificationService: NotificationService, private objectservice: ObjectsService, private generFun: GeneralFunctions, private schedulingservice: SchedulingService, private administrationService: AdministrationService) {
        var contextObj = this;
        //this.equipmentquantityMenu = this.menumock;
        this.enableaequipmentquantityMenu = [1, 2, 3]
        var callBack = function (data) {
            contextObj.equipmentquantityMenu = data;
        };
        this.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 204, contextObj.administrationService, contextObj.menumock.length)

    }



    ngOnInit() {
        var context = this;
        this.schedulingservice.getEquipmentQuantityFields().subscribe(function (resultdata) {
            context.fieldObject = resultdata["Data"]
            var descwidth = context.fieldObject.find(function (item) { return item.ReportFieldId === 12375 })
            descwidth.Width = "0.5*";
        });
        this.dataLoad();
    }
    onSplitViewClose(event) {
        this.splitviewequipmentquantity.showSecondaryView = false;
    }
    updateequipmentquantityMenu(event) {
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
        this.splitViewTitle = "New Equipment Quantity";
        this.target = 1;
        var context = this;
        this.splitviewequipmentquantity.showSecondaryView = true;
        this.btnName = "Save";
        this.schedulingservice.loadAddEditEquipmentQuantity(this.inputItems.selectedIds, this.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"];
            context.fieldDetailsSpaceEdit.find(function (item) {
                switch (item.ReportFieldId) {
                    case 12375:
                        item.IsEnabled = true;
                        return true;
                }
            });
            var equipmenttype = context.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12377 })
            context.objectservice.getObjectClassSelectionLookups(1, '', 1, 1, 0).subscribe(function (resultData) {
                equipmenttype.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);   //equipmentType                     
            });
        });
    }
    edit() {
        this.splitViewTitle = "Edit Equipment Quantity";
        var count = 0;
        this.target = 2;
        var context = this;
        this.btnName = "Save Changes";

        /*
        Edit functionality in this page is currently blocked with a notification message, like delete functionality
        */
        //this.schedulingservice.CheckQuantityInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
        //    if (resultData == 1)
        //        context.notificationService.ShowToaster('Selected Equipment is in use, cannot be edited', 2)
        //    else {
        context.splitviewequipmentquantity.showSecondaryView = true;
        context.schedulingservice.loadAddEditEquipmentQuantity(context.inputItems.selectedIds, context.target).subscribe(function (result) {
            context.fieldDetailsSpaceEdit = result["Data"]
            context.fieldDetailsSpaceEdit.find(function (item) {
                switch (item.ReportFieldId) {
                    case 12378:
                        item.IsEnabled = false;
                        count++;
                        break;
                    case 12379:
                        item.IsEnabled = false;
                        count++;
                        break;
                    case 12377:
                        item.IsEnabled = false;
                        count++;
                        break;
                }
                if (count == 3)
                    return true;
                else
                    return false;
            })
            var equipmenttype = context.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12377 })
            context.objectservice.getObjectClassSelectionLookups(1, '', 1, 1, 0).subscribe(function (resultData) {
                equipmenttype.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);   //equipmentType                     
            });
            //});
            //}

        })

    }
    delete() {
        var context = this;

        /*as of now delete functionality is not implemented. the menu is lifted. Later delete functionality can be
         implemented with in use check and deletion would be blocked if it has active registrations
        If so the qn is whether all the entries with respect to the quanity would be deleted from class statistics page(edited entries)
        */
        this.schedulingservice.CheckQuantityInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData == 1)
                context.notificationService.ShowToaster('Selected Equipment is in use, cannot be deleted', 2)
            else
                context.showSlide = true;
        });
    }
    dataLoad() {
        var contextObj = this;
        this.schedulingservice.getEquipmentQuantityData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableaequipmentquantityMenu = [1, 2, 3];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster('No Equipment Quantities exist', 2)
                contextObj.enableaequipmentquantityMenu = [1];
            }
        })
    }
    onSort(event) {
        this.dataLoad();
    }
    public onPageChanged(event: any) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        contextObj.dataLoad();
    };
    onSubmitData(event) {

        var pageDetails = event["fieldobject"]
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);

        let retUpdatedSrc;
        var contextObj = this;
        this.selectedId = this.inputItems.selectedIds[0]
        this.schedulingservice.postSubmitQuantity(JSON.stringify(arr), this.selectedId, this.target, 1).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            var retData = { returnData: contextObj.success.Data };
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (contextObj.target == 1) {
                        contextObj.notificationService.ShowToaster('Equipment added for the selected Site', 3);
                        retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "add", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj.enableaequipmentquantityMenu = [1, 2, 3];
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    }
                    else {
                        contextObj.notificationService.ShowToaster('Equipment Quantity updated for the selected Site', 3);
                        //retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", retData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj.dataLoad();
                    }
                    contextObj.splitviewequipmentquantity.showSecondaryView = false;
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        if (contextObj.target == 1)
                            contextObj.notificationService.ShowToaster('Equipment of this Equipment Type already exists for the selected Site', 2);
                        else
                            contextObj.notificationService.ShowToaster('Selected Equipment is already in use, Quantity should not be less than the current value', 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster('Equipment types Already Exist', 5);
                    }
                    break;
            }
        });
    }


    fieldChange(event) {
        var contextObj = this;
        var fieldid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        if (fieldid > 0) {
            if (parentFieldId == 2491) {
                this.schedulingservice.loadBuildingSchedule(fieldid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 2492) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 2492) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                    }
                })
            }
            else if (parentFieldId == 2493) {
                this.schedulingservice.loaddescription(fieldid, parentFieldId).subscribe(function (resultData) {
                    console.log(resultData)
                    var desc = contextObj.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 12375 })
                    desc.FieldValue = resultData["Data"]["LookupValues"][0]["Value"]
                })
            }
        }
    }
    okDelete(event) {
        var contextObj = this;

        contextObj.schedulingservice.postDeleteQuantity(contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableaequipmentquantityMenu = [1];
                }

                contextObj.notificationService.ShowToaster('Equipment deleted for the selected Site', 3);
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