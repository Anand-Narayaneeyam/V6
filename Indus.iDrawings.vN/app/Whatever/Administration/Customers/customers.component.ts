import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
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
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { CustomerAddEditComponent } from './customer-addedit'
import { AssignDrawingCategoryComponent } from './assign-drawingcategories'
import { AllowedFileTypesComponent } from './allowed-file-types'
import { UserLicencingSetupComponent } from './user-licensing-setup'

@Component({
    selector: 'customer-list',
    templateUrl: './app/Views/Administration/Customers/customers.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, PageComponent, GridComponent, PagingComponent, FieldComponent, Notification,
        CustomerAddEditComponent, AssignDrawingCategoryComponent, AllowedFileTypesComponent,UserLicencingSetupComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class CustomerListComponent implements AfterViewInit {
    pagePath = "Administration / Customers";
    fieldObject: IField[];
    fieldDetails: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "CustomerId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    ddlOrgName;
    ddlLicenceAllotment: any;
    ddlDeviceType: any;
    ddlModule;
    rolewise;
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
            "title": "Setup",
            "image": "Settings",
            "path": "Settings",
            "subMenu": [
                {
                    "id": 4,
                    "title": "Drawing Categories",
                    "image": "Drawing Categories",
                    "path": "Drawing Categories",
                    "subMenu": null,
                    "privilegeId": null
                },
                {
                    "id": 5,
                    "title": "Allowed File Types",
                    "image": "Allowed File Types",
                    "path": "Allowed File Types",
                    "subMenu": null,
                    "privilegeId": null
                },
                {
                    "id": 6,
                    "title": "User Licensing Setup",
                    "image": "User Licensing Setup",
                    "path": "User Licensing Setup",
                    "subMenu": null,
                    "privilegeId": 996
                }
            ]
        },

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.administrationService.getCustomerListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    }

    public dataLoad() {
        var contextObj = this;
        contextObj.administrationService.getCustomerData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Customers exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    }

    public onSubMenuChange(event: any) {
        this.action = "";
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 4:
                this.action = "";
                this.assignDwgCategoryClick();
                break;
            case 5:
                this.fileTypesClick();
                break;
            case 6:
                this.action = "";
                this.licenseSetupClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    public onSort(objGrid: any) {
        this.dataLoad();
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Customer";
        this.administrationService.loadCustomerAddEditFields(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetails = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetails.length; i++) {
                if (contextObj.fieldDetails[i].ReportFieldId == 113) {
                    contextObj.fieldDetails[i].FieldLabel = "Organization Name";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 114) {
                    contextObj.fieldDetails[i].FieldLabel = "Folder Name";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 116) {
                    contextObj.fieldDetails[i].FieldLabel = "Account Expiry Date";
                    var d = new Date();
                    d.setFullYear(d.getFullYear() + 1);
                    contextObj.fieldDetails[i].FieldValue = d.toDateString();
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 119) {
                    contextObj.fieldDetails[i].FieldLabel = "Max. Sites";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 120) {
                    contextObj.fieldDetails[i].FieldLabel = "Max. Buildings per Site";
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Customer";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.administrationService.loadCustomerAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetails = result["Data"];
                    for (let i = 0; i < contextObj.fieldDetails.length; i++) {
                        if (contextObj.fieldDetails[i].ReportFieldId == 113) {
                            contextObj.fieldDetails[i].FieldLabel = "Organization Name";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 114) {
                            contextObj.fieldDetails[i].FieldLabel = "Folder Name";
                            contextObj.fieldDetails[i].IsEnabled = false;
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 116) {
                            contextObj.fieldDetails[i].FieldLabel = "Account Expiry Date";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 119) {
                            contextObj.fieldDetails[i].FieldLabel = "Max. Sites";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 120) {
                            contextObj.fieldDetails[i].FieldLabel = "Max. Buildings per Site";
                        }
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public assignDwgCategoryClick()
    {
        this.action = "assigndwgcategory";
        this.btnName = "Save Changes";
        this.pageTitle = "Assign Drawing Category";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.administrationService.getAssignDrawingCategoryFields().subscribe(function (result) {
                contextObj.fieldDetails = result["Data"];

                for (let i = 0; i < contextObj.fieldDetails.length; i++) {
                    if (contextObj.fieldDetails[i].ReportFieldId == 112) {
                        contextObj.ddlOrgName = contextObj.fieldDetails[i];
                        contextObj.ddlOrgName.FieldLabel = "Organization Name";
                        contextObj.ddlOrgName.FieldValue = contextObj.inputItems.selectedIds[0].toString();
                        contextObj.ddlOrgName.IsEnabled = false;
                        contextObj.ddlOrgName.IsMandatory = false;
                    }
                    if (contextObj.fieldDetails[i].ReportFieldId == 271) {
                        contextObj.ddlModule = contextObj.fieldDetails[i];
                    }
                }
                var removeArr = [112, 271];
                contextObj.fieldDetails = contextObj.fieldDetails.filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })
                if (contextObj.ddlModule.LookupDetails.LookupValues == "") {
                    contextObj.notificationService.ShowToaster("No Modules exist", 2);
                }
                else
                    contextObj.ddlModule.FieldValue = -1;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            })
        }
    }

    public fileTypesClick()
    {
        this.action = "allowedfiletypes";
        this.btnName = "Save Changes";
        this.pageTitle = "Allowed File Types";
        var contextObj = this;

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    }

    public licenseSetupClick()
    {
        this.action = "licensesetup";
        this.btnName = "Save Changes";
        this.pageTitle = "User Licensing Setup";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
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
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
}