import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
//importing addedit component
import { ContractorsAddEditComponent } from './contractors-addedit.component'
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'contractors-list',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/contractors-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent ,ContractorsAddEditComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class ContractorsListComponent implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Contractor Name]", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 3223
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 3224
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 3225
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    isSiteAdmin: boolean = false;
    refreshgrid;

    constructor(private workOrdereService: WorkOrdereService, private AdministrationService: AdministrationService,private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.workOrdereService.getContractorsField().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
        contextObj.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.workOrdereService.getContractorsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
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

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Contractor";
        this.workOrdereService.loadContractorsAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            if (contextObj.isSiteAdmin) {
                contextObj.fieldDetailsAdd1.find(function (el) {
                    if (el.FieldId == 1033) {
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
        this.pageTitle = "Edit Contractor";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contractor", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrdereService.loadContractorsAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    if (contextObj.isSiteAdmin) {
                        contextObj.fieldDetailsAdd1.find(function (el) {
                            if (el.FieldId == 1033) {
                                el.IsMandatory = true;
                                return true;
                            } else return false;
                        });
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }

    }

    public deleteClick() {
        var contextObj = this;
        debugger
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contractor", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.workOrdereService.checkContractorIsInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == -1)
                    contextObj.notificationService.ShowToaster("Selected Contractor in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
            //if (this.inputItems.selectedIds[0] != null)
            //    this.showSlide = !this.showSlide;
        }
    }

    public inlineAdd(event: any) {
        var contextObj = this;
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateContractors(event, contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Contractor added", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Contractor already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Invalid Email Domain", 5);
                    }
                    break;
            }
        });

    }

    public inlineEdit(event: any) {
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateContractors(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Contractor details updated", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Contractor already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Invalid Email Domain", 5);
                    }
                    break;
            }
        });
    }
    public inlineDelete(event: any) {
        this.deleteContacts();
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


    deleteContacts() {
        var contextObj = this;
        contextObj.workOrdereService.deleteContractors(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Contractor deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Contractor in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }



    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}