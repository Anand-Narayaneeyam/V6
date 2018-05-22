import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';

//importing addedit component
import { TechniciansAddEditComponent } from './technicians-addedit.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'technicians-list',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/technicians-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, TechniciansAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, WorkOrdereService, AdministrationService],
})

export class TechniciansListComponent implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    message = "Are you sure you want to delete the selected Technician?";
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": 3213
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": 3214
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": 3215
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    isSiteAdmin: boolean = false;
    refreshgrid;

    constructor(private notificationService: NotificationService, private AdministrationService: AdministrationService ,private generFun: GeneralFunctions, private workOrdereService: WorkOrdereService) { }

    ngAfterViewInit() {
        var contextObj = this;       
        var contextObj = this;
        let rptField = [4148, 5386, 8338];
        let count = rptField.length;
        contextObj.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        this.workOrdereService.getTechniciansColumns().subscribe(function (result) {
            
            result["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.workOrdereService.getTechniciansData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 701, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
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
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Technician";

       


        this.workOrdereService.loadTechnicianAddEdit(0, 1).subscribe(function (resultData) {           
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            if (contextObj.isSiteAdmin) {
                contextObj.fieldDetailsAdd1.find(function (el) {
                    if (el.FieldId == 1068) {
                        el.IsMandatory = true;
                        return true;
                    } else return false;
                });
            }
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Technician";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Technician",2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workOrdereService.loadTechnicianAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (contextObj.isSiteAdmin) {
                    contextObj.fieldDetailsAdd1.find(function (el) {
                        if (el.FieldId == 1068) {
                            el.IsMandatory = true;
                            return true;
                        } else return false;
                    });
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Technician", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workOrdereService.checkTechniciansIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1){
                    contextObj.notificationService.ShowToaster("Selected Technician in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
            
        }
    }

    deleteTechnicians() {
        
        var contextObj = this;
        contextObj.workOrdereService.deleteTechnicians(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Technician deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:                       
                            contextObj.notificationService.ShowToaster("Selected Technicians in use, cannot be deleted", 5);                       
                        break;
                }
            }
        });
    }
   
    public inlineDelete(event: any) {
        this.deleteTechnicians();
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteTechnicians();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}