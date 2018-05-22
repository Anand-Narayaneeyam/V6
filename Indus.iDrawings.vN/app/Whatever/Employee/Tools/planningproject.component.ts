import {Component, ChangeDetectorRef, SimpleChange, Output, KeyValueDiffers, EventEmitter,ViewChild} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {IField} from '../../../Framework/Models//Interface/IField'
import {EmployeeService} from '../../../Models/Employee/employee.services';
import { GeneralFunctions} from '../../../Models/Common/General';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {SpacePlanningAddEditComponent} from './spaceplanning/spaceplanningaddedit';
import {SendForApprovalComponent} from '../../common/review/sendforapproval.component'

@Component({
    selector: 'planning-project',
    templateUrl: './app/Views/Employee/Tools/planningproject.component.html',
    directives: [SplitViewComponent, SubMenu, GridComponent, PagingComponent, searchBox, SlideComponent, SpacePlanningAddEditComponent, SendForApprovalComponent],
    providers: [NotificationService, EmployeeService],
    inputs: ['success','selId']
})

export class PlanningProjectComponent {

    splitviewPlanning: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    planningMenu: any[] =
    [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },

        //{
        //    "id": 4,
        //    "title": "Send For Approval",
        //    "image": "",
        //    "path": "",
        //    "submenu": null
        //},
        {
            "id": 5,
            "title": "Restore",
            "image": "RestoreSPP",
            "path": "RestoreSPP",
            "submenu": null
        },
        {
            "id": 6,
            "title": "Discard",
            "image": "Discard",
            "path": "Discard",
            "submenu": null
        },

        {
            "id": 8,
            "title": "Space Planning",
            "image": "Space Planning",
            "path": "Space Planning",
            "subMenu":[

            {
                "id": 3,
                "title": "Select Floors",
                "image": "Floor",
                "path": "Floor",
                "submenu": null
            },
            {
            "id": 7,
            "title": "Stack Plans",
            "image": "Stack Plans",
            "path": "Stack Plans",
            "submenu": null
            }]
        }
    ]
    @Output() Action = new EventEmitter();
    planningTotalItems = 4;
    enablePlanningMenu = [0, 1, 2, 3, 4, 5, 6,7,8];
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    position = "top-right";
    showSlide = false;
    showDiscardSlide = false;
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    itemsSource: any[];
    id: any;
    differ: any;
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, selectioMode: 'multiple', sortDir: 'ASC', sortCol: '' };
    fieldObject: IField[];
    cdr: any;
    pageTitle: string="";
    editable: number = 0;
    deletestring: string = "";
    approvalstatus: string = "";
    nooffloors: number;

    addEdit: string;
    selectedId: number;

    sendforapproval: boolean = false;
    refreshgrid;
    selId;
    arrHighlightRowIds = [];
    updatePlanningMenu(event: any) {
        switch (event.value) {
            case 0:
                this.Add();
                break;
            case 1: {
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.editable = 0;
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        if ((this.itemsSource[i].Id == this.inputItems.selectedIds[0]) && (this.itemsSource[i].Status == "Active")) {
                            this.Edit();
                            this.editable = 1;
                            break;
                        }
                    }
                    if (this.editable == 0)
                        this._notificationService.ShowToaster("Only active Space Planning Projects can be edited", 2)
                }
                break;
            }
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        this.deletestring = this.itemsSource[i].Status;
                        if (this.itemsSource[i].Id == this.inputItems.selectedIds[0]) {
                            if ((this.itemsSource[i].Status != "Executed") && (this.itemsSource[i].Status != "Deleted") && ((this.itemsSource[i].Status != "Discarded")) && ((this.itemsSource[i].Status != "Work Order Generated")))
                                this.showSlide = !this.showSlide;
                            break;
                        }
                    }
                    if (this.deletestring == "Executed")
                        this._notificationService.ShowToaster("Executed Projects cannot be deleted", 2)
                    else if (this.deletestring == "Deleted")
                        this._notificationService.ShowToaster("Space Planning Project already deleted", 2)
                    else if (this.deletestring == "Discarded")
                        this._notificationService.ShowToaster("Discarded Projects cannot be deleted", 2)
                    else if (this.deletestring == "Work Order Generated")
                        this._notificationService.ShowToaster("Work Order Generated Projects cannot be deleted", 2)
                }
                break;
            case 3: {
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.editable == 0
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        if ((this.itemsSource[i].Id == this.inputItems.selectedIds[0]) && (this.itemsSource[i].Status == "Active")) {
                            this.Floor();
                            this.editable = 1;
                            break;
                        }
                    }
                    if (this.editable == 0)
                        this._notificationService.ShowToaster("Space Planning Project is not active", 2)
                }
            } break;
            case 4:
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        this.approvalstatus = this.itemsSource[i].Status;
                        this.nooffloors = this.itemsSource[i].ProjectFloors;
                        if ((this.itemsSource[i].Id == this.inputItems.selectedIds[0]) && (this.itemsSource[i].Status == "Active")) {
                            if (this.nooffloors > 0)
                                this.sendForApproval();
                            break;
                        }
                    }

                    if (this.approvalstatus == "Executed")
                        this._notificationService.ShowToaster("Space Planning Project is already executed", 2)
                    else if ((this.approvalstatus == "Deleted") || (this.approvalstatus == "Discarded"))
                        this._notificationService.ShowToaster("Space Planning Project is not active", 2)
                    else if ((this.approvalstatus == "Approved") || (this.approvalstatus == "Move Project Created") || (this.approvalstatus == "Scenario Created"))
                        this._notificationService.ShowToaster("Space Planning Project is already approved", 2)
                    else if (this.nooffloors == 0)
                        this._notificationService.ShowToaster("No Floors added to this Space Planning Project", 2)
                    break;
                }
            case 5:
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        this.approvalstatus = this.itemsSource[i].Status;
                        if ((this.itemsSource[i].Id == this.inputItems.selectedIds[0])) {
                            if (this.itemsSource[i].Status == "Deleted")
                                this.Restore();
                            else {
                                if (this.approvalstatus == "Executed")
                                    this._notificationService.ShowToaster("Executed Projects cannot be restored", 2)
                                if (this.approvalstatus == "Discarded")
                                    this._notificationService.ShowToaster("Discarded Projects cannot be restored", 2)
                                else if (this.approvalstatus != "Deleted")
                                    this._notificationService.ShowToaster("Only deleted Space Planning Project can be restored", 2)
                            }
                        }
                    }
                }
                break;
            case 6:
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        this.approvalstatus = this.itemsSource[i].Status;
                        if (this.itemsSource[i].Id == this.inputItems.selectedIds[0]) {
                            if ((this.itemsSource[i].Status == "Deleted") || (this.itemsSource[i].Status == "Active"))
                                this.showDiscardSlide = !this.showDiscardSlide;//this.Discard();
                            break;
                        }


                    }
                    if (this.approvalstatus == "Executed")
                        this._notificationService.ShowToaster("Executed Projects cannot be discarded", 2)
                    else if (this.approvalstatus == "Approved")
                        this._notificationService.ShowToaster("Approved Projects cannot be discarded", 2)
                    else if (this.approvalstatus == "Discarded")
                        this._notificationService.ShowToaster("Space Planning Project already discarded", 2)
                    else if ((this.approvalstatus != "Deleted") && (this.approvalstatus != "Active"))
                        this._notificationService.ShowToaster("Only active/deleted Space Planning Project can be discarded", 2)
                }
                break;

            case 7: {
                if (this.inputItems.selectedIds.length > 1) {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    this.editable == 0
                    for (let i = 0; i < this.itemsSource.length; i++) {
                        if ((this.itemsSource[i].Id == this.inputItems.selectedIds[0])) {

                            this.StackPlans();
                            this.editable = 1;
                            break;
                        }
                    }
                    if (this.editable == 0)
                        this._notificationService.ShowToaster("Space Planning Project is not active", 2)
                }
            } break;

        }
    }
    constructor(cdr: ChangeDetectorRef, private employeeService: EmployeeService, private differs: KeyValueDiffers, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
        this.differ = differs.find({}).create(null);
        this.cdr = cdr;
    }
    ngAfterViewInit() {
        var contextObj = this;
        contextObj.arrHighlightRowIds = [];
        this.employeeService.getSpacePlanningListField().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        })
        this.employeeService.getSpacePlanningData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i].Status == "Completed")
                    contextObj.itemsSource[i].Status = "Discarded";
            }
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enablePlanningMenu = [0];
                contextObj._notificationService.ShowToaster("No Space Planning Projects exist", 2);
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.selId != undefined) {
                
                setTimeout(function () { contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.selId); });
            }
        }
        )
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["success"] && changes["success"]["currentValue"] && changes["success"]["currentValue"]["StatusId"] == 1)
            this.employeeService.getSpacePlanningData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i].Status == "Completed")
                        contextObj.itemsSource[i].Status = "Discarded";
                }
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj.enablePlanningMenu = [0];
                    contextObj._notificationService.ShowToaster("No Space Planning Projects exist", 2);
                }
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            })
     

    }
    pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.getSpacePlanningData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
        })
    }
    onSort(event: any) {
        var contextObj = this;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.employeeService.getSpacePlanningData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
        });
    }
    Add() {
        this.sendforapproval = false;
        this.splitviewPlanning.showSecondaryView = true;
        this.addEdit = "add";
        this.pageTitle = "New Space Planning Project"
        this.cdr.detectChanges();
    }
    Edit() {
        this.sendforapproval = false;
        this.splitviewPlanning.showSecondaryView = true;
        this.addEdit = "edit";
        this.pageTitle = "Edit Space Planning Project"
        this.selectedId = this.inputItems.selectedIds[0]
        this.cdr.detectChanges();
    }
    closeSlideDialog(event: any, target) {
        if(target== 1)
            this.showSlide = event.value;
        else
            this.showDiscardSlide = event.value;
    }
    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 893,
            Value: this.inputItems.selectedIds[0].toString()
        }, {
                ReportFieldId: 899,
                Value: "4"
            }
        )
        this.employeeService.deleteSpacePlanningProject(this.inputItems.selectedIds[0], fieldobj).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: resultData["Data"].Data }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enablePlanningMenu = [0];
                }
                contextObj._notificationService.ShowToaster("Space Planning Project deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    //case 3:
                    //    if (resultData["Data"].ServerId == -1) {
                    //        contextObj._notificationService.ShowToaster("Selected Plot Style Setting in use, cannot be deleted", 5);
                    //    }
                    //    break;
                }
            }
        }
        )
    }
    cancelClick(event: any, target: number) {
        switch (target) {
            case 1:
                this.showSlide = false;
                break;
            case 2:
                this.showDiscardSlide = false;
                break;
        }
       
    }
    submitSuccess(event: any) {
        this.refreshgrid = [];
        let retUpdatedSrc;
        if (event["success"] == "success") {
            if (this.addEdit == "add") {
                this.arrHighlightRowIds = [];
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enablePlanningMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                var context = this;
                var addedId = this.itemsSource[0][this.inputItems.dataKey];
                setTimeout(function () { context.arrHighlightRowIds = context.arrHighlightRowIds.concat(addedId); });
            } else {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
           // this.itemsSource = retUpdatedSrc["itemSrc"];
           // this.refreshgrid = this.refreshgrid.concat([true]);
            this.splitviewPlanning.showSecondaryView = false;
        }
    }
    Floor() {
        this.Action.emit({ action: "Floor", id: this.inputItems.selectedIds })
    }

    StackPlans() {
        var context = this;
        if (this.inputItems.rowData["ProjectFloors"] == 0) {
            this._notificationService.ShowToaster("No Floors added to this Space Planning Project", 2);
        } else {
            this.employeeService.chkWhetherEmpAssignedToOrgUnit(context.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] != 0) {
                    context._notificationService.ShowToaster(resultData["Data"] + " not assigned to any Employees, Stack Plan cannot be generated", 2);
                } else {
                    var prjStatusId = 0;
                    context.itemsSource.find(function (item) {
                        if (item.Id == context.inputItems.selectedIds[0]) {
                            prjStatusId = item["StatusId"];
                            return true;
                        } else
                            return false;
                    })
                    var allowedStatus = [1, 27, 29, 30, 31, 34,19];
                    if (allowedStatus.indexOf(prjStatusId) > -1) {
                        context.Action.emit({ action: "StackPlans", id: context.inputItems.selectedIds, prjtStatusId: prjStatusId })
                    } else {
                        context._notificationService.ShowToaster("Space Planning Project is not active", 2);
                    }
                }
            });

        }
    }

    sendForApproval() {
        this.splitviewPlanning.showSecondaryView = true;
        this.sendforapproval = true;
        this.selectedId = this.inputItems.selectedIds[0]
    }
    Restore() {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 893,
            Value: this.inputItems.selectedIds[0].toString()
        }, {
                ReportFieldId: 899,
                Value: "1"
            })
        this.employeeService.restoreSpacePlanningProject(this.inputItems.selectedIds[0], fieldobj).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: resultData["Data"].Data }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enablePlanningMenu = [1];
                }
                contextObj._notificationService.ShowToaster("Space Planning Project restored", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    //case 3:
                    //    if (resultData["Data"].ServerId == -1) {
                    //        contextObj._notificationService.ShowToaster("Selected Plot Style Setting in use, cannot be deleted", 5);
                    //    }
                    //    break;
                }
            }
        }
        )
    }
    Discard() {
        this.showDiscardSlide = !this.showDiscardSlide;
    }
    okDiscard(event: any) {
        var contextObj = this;
        this.showDiscardSlide = !this.showDiscardSlide
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 893,
            Value: this.inputItems.selectedIds[0].toString()
        }, {
                ReportFieldId: 899,
                Value: "11"
            })
        this.employeeService.discardSpacePlanningProject(this.inputItems.selectedIds[0], fieldobj).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] > 0) {
                var temp = JSON.parse(resultData["Data"].Data)
                temp[0].Status = "Discarded";
                resultData["Data"].Data = JSON.stringify(temp);
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: resultData["Data"].Data }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enablePlanningMenu = [1];
                }
                contextObj._notificationService.ShowToaster("Space Planning Project discarded", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Assigned and Planned Projects cannot be discarded", 5);
                        }
                        break;
                }
            }
        })

    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}