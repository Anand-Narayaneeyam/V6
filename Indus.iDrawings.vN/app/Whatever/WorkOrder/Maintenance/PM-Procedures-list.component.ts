import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { IField} from  '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {JobStepsListComponent} from './Procedures-JobSteps-List.component';
import {SafetyStepsListComponent} from './Procedures-SafetySteps-List.component';

@Component({
    selector: 'pmProcedures-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/PM-Procedures-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, LabelComponent, FieldComponent, Notification, SlideComponent, TabsComponent, TabComponent, JobStepsListComponent, SafetyStepsListComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['equipmentCategoryName', 'equipmentClassName', 'pmId', 'equipmentClassIdfor','pagetarget']
})

export class PMProceduresListComponent implements AfterViewInit {
    pageTitle: string;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "ProcedureId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    target: number = 0;
    enableMenu = [0];
    equipmentCategoryName: any;
    equipmentClassName: any;
    equipmentCategory: IField[];
    equipmentClass: IField[];
    fieldDetailsAddEdit: IField[];
    pmId: any;
    equipmentClassIdfor: any;
    procName: string;
    selectedId: any;
    pagetarget: number;

    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 6163
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 6164
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": 6165
        },
        {
            "id": 3,
            "title": "Job Steps",
            "image": "Job Steps",
            "path": "Job Steps",
            "subMenu": null,
            "privilegeId": 6166

        },
        {
            "id": 4,
            "title": "Safety Steps",
            "image": "Safety Steps",
            "path": "Safety Steps",
            "subMenu": null,
            "privilegeId": 6167
        }
    ];
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    @Output() pmScheduleRowUpdate = new EventEmitter();
    showDeleteConfirm = false; 
    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
                        if (this.pagetarget == 2)
                        {
                        this.menuData = [
                            {
                                "id": 0,
                                "title": "Add",
                                "image": "Add",
                                "path": "Add",
                                "subMenu": null,
                                "privilegeId": 6145
                            },
                            {
                                "id": 1,
                                "title": "Edit",
                                "image": "Edit",
                                "path": "Edit",
                                "subMenu": null,
                                "privilegeId": 6146
                            },
                            {
                                "id": 2,
                                "title": "Delete",
                                "image": "Delete",
                                "path": "Delete",
                                "subMenu": null,
                                "privilegeId": 6147
                            },
                            {
                                "id": 3,
                                "title": "Job Steps",
                                "image": "Job Steps",
                                "path": "Job Steps",
                                "subMenu": null,
                                "privilegeId": 6148

                            },
                            {
                                "id": 4,
                                "title": "Safety Steps",
                                "image": "Safety Steps",
                                "path": "Safety Steps",
                                "subMenu": null,
                                "privilegeId": 6149
                            }
                        ];
                        }

        var contextObj = this;
        var callBack = function (data) { 
            contextObj.menuData = data; 
        }; 
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2541, contextObj.administrationServices, contextObj.menuData.length);


        if (this.pagetarget == 1) {
            var contextObj = this;
            this.workOrderService.getPMProcedureListFields().subscribe(function (resultData) {
                contextObj.equipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
                contextObj.equipmentClass = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
                contextObj.equipmentCategory["FieldValue"] = contextObj.equipmentCategoryName;
                contextObj.equipmentClass["FieldValue"] = contextObj.equipmentClassName;
                contextObj.fieldObject = resultData["Data"];
            });
            this.LoadGrid();
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.workOrderService.getMasterPMProcedureListFields().subscribe(function (resultData) {
                contextObj.equipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
                contextObj.equipmentClass = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
                contextObj.equipmentCategory["FieldValue"] = contextObj.equipmentCategoryName;
                contextObj.equipmentClass["FieldValue"] = contextObj.equipmentClassName;
                contextObj.fieldObject = resultData["Data"];
            });
            this.LoadGridMaster();
        }
     
    }

    LoadGrid() {
        var contextObj = this;
        this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3, 4];
            }
            else {
                contextObj.notificationService.ShowToaster("No Procedures exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
            contextObj.toUpdatePMRowData(resultData);
        });      
    }

    public toUpdatePMRowData(data) {
        var contextObj = this;
        var jsonData = JSON.parse(data["Data"].FieldBinderData)
        var sequenceNumber = "";
        for (var i = 0; i < jsonData.length; i++) {
            sequenceNumber += jsonData[i]["Sequence"] + ',';
        }
        sequenceNumber = sequenceNumber.slice(0, -1);
        contextObj.pmScheduleRowUpdate.emit({
            pmId: contextObj.pmId,
            procedureCount: contextObj.totalItems,
            sequenceNumber: sequenceNumber
        });
    }

    LoadGridMaster() {
        var contextObj = this;
        this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3, 4];
            }
            else {
                contextObj.notificationService.ShowToaster("No Procedures exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });
    }



    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                contextObj.target = 2;
                this.jobStepsClick();
                break;
            case 4:
                contextObj.target = 3;
                this.safetyStepsClick();
                break;
        }
    }

    public pageChanged(event: any) {

        if (this.pagetarget == 1) {
            var contextObj = this;
            this.pageIndex = event.pageEvent.page;
            this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.pageIndex = event.pageEvent.page;
            this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }


    }

    public onSort(objGrid: any) {
        if (this.pagetarget == 1) {
            var contextObj = this;
            this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }

    }

    public addClick() {
        this.action = "add";
        this.pageTitle = "New Procedure";
        this.btnName = "Save";
        var contextObj = this;
                if (this.pagetarget == 1) {
                    this.workOrderService.getPMProcedureListDataAdd(contextObj.equipmentClassIdfor, 1, 0).subscribe(function (resultData) {
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else if (this.pagetarget == 2) {
                    this.workOrderService.getMasterPMProcedureListDataAdd(contextObj.equipmentClassIdfor, 1, 0).subscribe(function (resultData) {
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });

                }
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Procedure";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1)
        {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1)
        {
            if (this.inputItems.selectedIds[0] != null)
            {

                        if (this.pagetarget == 1) {
                            this.workOrderService.getPMProcedureListDataEdit(contextObj.equipmentClassIdfor, contextObj.pmId, 2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                                contextObj.fieldDetailsAddEdit = resultData["Data"];
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }
                        else if (this.pagetarget == 2) {
                            this.workOrderService.getMasterPMProcedureListDataEdit(contextObj.equipmentClassIdfor, contextObj.pmId, 2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                                contextObj.fieldDetailsAddEdit = resultData["Data"];
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }

            }
        }

        
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }

    }

    public deleteProcedure() {
        var contextObj = this;
        if (this.pagetarget == 1) {
            contextObj.workOrderService.CheckPMsProceduresInUse(contextObj.inputItems.rowData["PMId"]).subscribe(function (resultData) {

                if (resultData["Data"] == 0) {
                    contextObj.workOrderService.deletePMsProcedures(contextObj.inputItems.rowData["ProcedureId"], contextObj.inputItems.rowData["PMId"]).subscribe(function (resultData) {

                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (resultData["Data"].ServerId == 0) {
                                    contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                                    contextObj.LoadGrid();
                                }
                        }
                    });

                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Procedure in use, cannot be deleted", 5);
                }
            });
        }
        else if (this.pagetarget == 2) {
            contextObj.workOrderService.CheckMasterPMsProceduresInUse(contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {
             
                if (resultData["Data"] == 0) {
                    contextObj.workOrderService.deleteMasterPMsProcedures(contextObj.inputItems.rowData["ProcedureId"],contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {
                  

                        switch (resultData["Data"].StatusId)
                                {
                                    case 0:
                                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                        break;
                                    case 1:
                                            if (resultData["Data"].ServerId == 0) {
                                                contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                                                contextObj.LoadGridMaster();
                                            }
                                }
                    });

                }
                else {
                    contextObj.DeleteConfirm();
                }
            });
        }

    }

    public DeleteConfirm() {
        this.showDeleteConfirm = !this.showDeleteConfirm;
    }


    okDelete(event: Event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    okDeleteConfirm(event: Event) {
        this.DeleteConfirmProcedure();
        this.showDeleteConfirm = !this.showDeleteConfirm;
    }

    cancelDeleteConfirm(event: Event) {
        this.showDeleteConfirm = !this.showDeleteConfirm;
    }

    closeDeleteConfirm(value: any) {
        this.showDeleteConfirm = value.value;
    }

    public DeleteConfirmProcedure() {
        var contextObj = this;
        contextObj.workOrderService.deleteMasterPMsProcedures(contextObj.inputItems.rowData["ProcedureId"], contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {


            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                        contextObj.LoadGridMaster();
                    }
            }
        });
    }


    public jobStepsClick() {
        var contextObj = this;
        this.pageTitle = "Job Steps";
        this.procName = contextObj.inputItems.rowData["Procedure"];
        this.selectedId = contextObj.inputItems.rowData["ProcedureId"];
        this.workOrderService.getJobStepsData(0, '[Job Step]', 'ASC', this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["DataCount"] == 0) {
               contextObj.notificationService.ShowToaster("No Job Steps exist", 2);
            }
            else {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;         
                 }
        });

    }

    public safetyStepsClick() {
        var contextObj = this;
        this.pageTitle = "Safety Steps";
        this.procName = contextObj.inputItems.rowData["Procedure"];
        this.selectedId = contextObj.inputItems.rowData["ProcedureId"];
        this.workOrderService.getSafetyStepsData(0,'[Safety Step]', 'ASC', this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["DataCount"] == 0) {
                contextObj.notificationService.ShowToaster("No Safety Steps exist", 2);
            }
            else {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;   
            }
        });     
    }

    onSubmit(event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add");
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit");
                break;
        }
    }

    postSubmit(strsubmitField: string, target: string) {
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(strsubmitField);
            if (this.pagetarget == 1) {
                arr.push({ ReportFieldId: 5593, Value: contextObj.pmId.toString() });
                if (target == "add") {
                    contextObj.workOrderService.PMProcedureAddSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData)
                    {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (target == "add") {
                                    contextObj.notificationService.ShowToaster("Procedure added", 3);
                                    contextObj.LoadGrid();
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;                                                          
                                }
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                                }
                                else if (resultData["Data"].ServerId == -2) {
                                    contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                                }
                        }

                    });
                }
                else if (target == "edit")
                {
                    contextObj.workOrderService.PMProcedureAddSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (target == "edit") {
                                    contextObj.notificationService.ShowToaster("Procedure details updated", 3);
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    contextObj.LoadGrid();
                                }
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                                }
                                else if (resultData["Data"].ServerId == -2) {
                                    contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                                }
                        }

                    });

                }

            }
            else if (this.pagetarget == 2) {
                arr.push({ ReportFieldId: 5600, Value: contextObj.pmId.toString() });
                if (target == "add") {
                    contextObj.workOrderService.MasterPMProcedureAddSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (target == "add") {
                                    contextObj.notificationService.ShowToaster("Procedure added", 3);
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    contextObj.LoadGridMaster();
                                }
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                                }
                                else if (resultData["Data"].ServerId == -2) {
                                    contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                                }
                        }

                    });
                }
                else if (target == "edit") {
                    contextObj.workOrderService.MasterPMProcedureAddSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {

                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (target == "edit") {
                                    contextObj.notificationService.ShowToaster("Procedure details updated", 3);
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    contextObj.LoadGridMaster();
                                }
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                                }
                                else if (resultData["Data"].ServerId == -2) {
                                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                                }
                                else if (resultData["Data"].ServerId == -3) {
                                    contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                                }
                        }

                    });

                }
            }              
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}