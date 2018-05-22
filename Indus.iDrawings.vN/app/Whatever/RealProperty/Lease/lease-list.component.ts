import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { IField } from  '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { LeaseRenewalListComponent } from './leaseRenewal-list.component';
import { LeaseAddEditComponent } from './lease-addedit.component';
import { SubLeaseAddEditComponent } from './sublease-addedit.component';
import { AreaCostDetailsComponent } from './areacost-details';
import { AlertContactsComponent } from './alert-contacts';
import { RentPaymentComponent } from './rent-paymentlist';
import { AgreementClausesComponent } from '../generalsettings/agreement-clauses';
import { CancellataionClausesComponent } from './cancellation-clauses';
import { AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import { RentInformationComponent } from './rent-information';
import { leaseItemUpdateBuildingFloorComponent } from './leaseItemUpdate-Building-Floor.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ExportToExcel } from '../../../Framework/Models/Export/exporttoexcel.service';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'lease-list',
    templateUrl: './app/Views/RealProperty/Lease/lease-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PageComponent, PagingComponent, TabsComponent, TabComponent, FieldComponent, Notification, SlideComponent, LeaseAddEditComponent, SubLeaseAddEditComponent, LeaseRenewalListComponent, AreaCostDetailsComponent, AlertContactsComponent, RentPaymentComponent, AgreementClausesComponent, CancellataionClausesComponent, AttachmentsComponent, RentInformationComponent, leaseItemUpdateBuildingFloorComponent, Analytics],
    providers: [RealPropertyService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ExportToExcel],
})

export class LeaseListComponent implements OnInit {
    
    pageTitle: string = "Leases";
    pagePath: string = "Real Property / Leases";
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    fieldDetailsAreaCost: IField[];
    fieldDetailsRentInfo:IField[];
    itemsSource: any[];
    parentLeaseDetails: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", showContextMenu: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    leaseRenewalTab: boolean = false;
    selectedTab: number = 0;
    deleteIndex: number;
    localselection: number;
    canbeSubleased: any;
    canBeRenewed: any;
    leaseStatus: any;
    leaseType: string;
    ddlPaymentInterval: IField;
    leaseRenewalCount: any;
    leaseIdentifier: any;
    setFeatureLookupId: number = 0;
    enableMenu = [];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 10049
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 10050
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": 10047
        },
        {
            "id": 4,
            "title": "",
            "image": "DisplaySettings",
            "path": "DisplaySettings",
            "subMenu": [
                {
                    "id": 5,
                    "title": "Area and Cost Details",
                    "image": "Area and Cost Details",
                    "path": "Area and Cost Details",
                    "subMenu": null,
                    "privilegeId": 10038                    
                },
                //{
                //    "id": 6,
                //    "title": "Alert",
                //    "image": "Alert",
                //    "path": "Alert",
                //    "subMenu": null
                //},
                {
                    "id": 7,
                    "title": "Rent Information",
                    "image": "Rent Information",
                    "path": "Rent Information",
                    "subMenu": null,
                    "privilegeId": 10039  
                },
                {
                    "id": 8,
                    "title": "Rent Payment",
                    "image": "Rent Payment",
                    "path": "Rent Payment",
                    "subMenu": null,
                    "privilegeId": 10040        
                },
                //{
                //    "id": 9,
                //    "title": "Sublease",
                //    "image": "Sublease",
                //    "path": "Sublease",
                //    "subMenu": null
                //}
            ]
        },
        {
            "id": 10,
            "title": "Lease Items",
            "image": "Lease Items",
            "path": "Lease Items",
            "subMenu": [
                {
                    "id": 11,
                    "title": "Building",
                    "image": "Building",
                    "path": "Building",
                    "subMenu": null
                },
                {
                    "id": 12,
                    "title": "Floor",
                    "image": "Floor",
                    "path": "Floor",
                    "subMenu": null
                },
                //{
                //    "id": 13,
                //    "title": "Space",
                //    "image": "Space",
                //    "path": "Space",
                //    "subMenu": null
                //}
            ]
        },
        {
            "id": 14,
            "title": "Clauses",
            "image": "Clauses",
            "path": "Clauses",
            "subMenu": [
                {
                    "id": 15,
                    "title": "Agreement Clauses",
                    "image": "Agreement Clauses",
                    "path": "Agreement Clauses",
                    "subMenu": null, 
                    "privilegeId": 10043      
                },
                {
                    "id": 16,
                    "title": "Cancellation Clauses",
                    "image": "Cancellation Clauses",
                    "path": "Cancellation Clauses",
                    "subMenu": null, 
                    "privilegeId": 10044      
                }
            ]
        },
        {
            "id": 17,
            "title": "Lease Documents",
            "image": "Lease Documents",
            "path": "Lease Documents",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Lease Renewal",
            "image": "Lease Renewal",
            "path": "Lease Renewal",
            "subMenu": null,
            "privilegeId": 10045  
        },
         {
            "id": 18,
            "title": "Export",
            "image": "Export",
            "path": "Export",
            "submenu": null
        }
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    leaseTypeDdl;
    refreshgrid;
    showCostButton: boolean = false;
    annualBaseRent: any; 
    showRentInfoButton: boolean = false;
    rentCommenceDate: any;
    IsCostDataEntered: boolean = false;
    IsRentDataEntered: boolean = false;
    leasePropertyType: any;
    target: number;
    Hidebutton: boolean;
    status1: string;
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    IsModuleAdmin: boolean = false;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private administrationServices: AdministrationService, private realPropertyService: RealPropertyService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel) { }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
        
        this.realPropertyService.getLeaseListColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
        this.realPropertyService.customerSubscribedFeatures("174").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                if (customerSettingsData.Data[0]["FeatureLookupId"] == "49") {
                    contextObj.setFeatureLookupId = 49;
                } else if (customerSettingsData.Data[0]["FeatureLookupId"] == "50") {
                    contextObj.setFeatureLookupId = 50;
                } else if (customerSettingsData.Data[0]["FeatureLookupId"] == "51") {
                    contextObj.setFeatureLookupId = 51;
                }
            }
        });


        contextObj.realPropertyService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

            if (contextObj.sessionUserRoleId == 6) {
                contextObj.realPropertyService.getIsModuleAdmin(30).subscribe(function (resultData) {
                    if (resultData["Data"] == true) { /*1 or 0*/
                        contextObj.IsModuleAdmin = true;

                    }
                });
            }
              
        });   
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.realPropertyService.getLeaseListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18];
            }
            else {
                contextObj.notificationService.ShowToaster("No Leases exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.leaseRenewal();
                break;
            case 5:
                this.areaCostDetails();
                break;
            case 6:
                this.alert();
                break;
            case 7:
                this.rentInformation();
                break;
            case 8:
                this.rentPayment();
                break;
            case 9:
                if (this.canBeSubleased()) {
                    this.subLeaseClick();
                }
                break;
            case 11:
                this.leaseItemBuildingClick();
                break;
            case 12:
                this.leaseItemFloorClick();
                break;
            case 15:
                this.agreementClauses();
                break;
            case 16:
                this.cancellationClauses();
                break;
            case 17:
                this.leaseDocumentsClick();
                break;
            case 18:
                this.exportClick();
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
        this.pageTitle = "New Lease";
        this.realPropertyService.loadLeaseAddEdit(0, "add").subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = contextObj.updateFieldProperties(resultData["Data"], "add");             
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {
        var contextObj = this;        
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Lease"; 
        this.leaseStatus = this.inputItems.rowData["Status"];     
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];  

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {

            if (this.leaseStatus == "Expired") {
                this.notificationService.ShowToaster("Selected Lease has been expired, cannot be edited", 2);
            }
            else if (this.leaseStatus == "Deleted") {
                this.notificationService.ShowToaster("Selected Lease has been deleted, cannot be edited", 2)
            }
            else if (this.leaseStatus == "Terminated") {
                this.notificationService.ShowToaster("Selected Lease has been terminated, cannot be edited", 2)
            }

            else {
                contextObj.realPropertyService.IsCostRentEntered(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
           
                    switch (resultData["Data"]) {
                        case 0:
                            contextObj.IsCostDataEntered = true;
                            contextObj.IsRentDataEntered = true;
                            break;
                        case 1:
                            contextObj.IsCostDataEntered = false;
                            contextObj.IsRentDataEntered = false;
                            break;
                        case 4:
                            contextObj.IsCostDataEntered = true;
                            contextObj.IsRentDataEntered = false;
                            break;
                        default:
                            contextObj.IsCostDataEntered = false;
                            contextObj.IsRentDataEntered = false;
                            break;

                    }

                    contextObj.realPropertyService.loadLeaseAddEdit(contextObj.inputItems.selectedIds[0], "edit").subscribe(function (result) {
                        contextObj.fieldDetailsAddEdit = contextObj.updateFieldProperties(result["Data"], "edit");
                        contextObj.secondaryTarget = 0;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                });
            }
        }
    }

    updateStatusLookupValues(fieldArray: any, target: string, status: any) {
        if (target == "add") {  // for add status is only Draft
            var tempArray = fieldArray.LookupDetails.LookupValues;
            for (let index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                if (tempArray[index].Id == 1 || tempArray[index].Id == 4 || tempArray[index].Id == 15) {
                    fieldArray.LookupDetails.LookupValues.splice(index, 1);
                    index = -1;
                }
            }
        } else {
            if (status == "Draft") { // status Draft and Active
                var tempArray = fieldArray.LookupDetails.LookupValues;
                for (let index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                    if (tempArray[index].Id == 4 || tempArray[index].Id == 15) {
                        fieldArray.LookupDetails.LookupValues.splice(index, 1);
                        index = -1;
                    }
                }
            } else if (status == "Active") { // status Active, Deleted and Terminated
                var tempArray = fieldArray.LookupDetails.LookupValues;
                for (let index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                    if (tempArray[index].Id == 37) {
                        fieldArray.LookupDetails.LookupValues.splice(index, 1);
                        index = -1;
                    }
                }
            }
        }
    }

    updateFieldProperties(fieldObjectArray: any, target: string) {
        var contextObj = this;
        if (target == "add") {
            fieldObjectArray.find(function (item) {
                switch (item.ReportFieldId) {
                    case 5775:   //Tenant 
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                        } else if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        break;
                    case 5774:   //Landlord 
                        if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                        } else if (contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        break;
                    case 5778:   //Can Be Subleased 
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsEnabled = false;
                        } else if (contextObj.setFeatureLookupId == 50) {
                            item.IsEnabled = true;
                        }
                        item.IsVisible = false; // temporary hidden 
                        break;
                    case 5771:   //Purpose - isToRentOut 
                        if (contextObj.setFeatureLookupId == 49) {
                            item.FieldValue = 1;
                            item.IsEnabled = true;
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.LookupDetails.LookupValues.sort(function (a, b) {
                                return a.Id - b.Id;
                            });
                        } else if (contextObj.setFeatureLookupId == 50 || contextObj.setFeatureLookupId == 51) {
                            item.FieldValue = 0;
                            item.IsEnabled = false;
                            item.IsVisible = false;
                            item.IsMandatory = false;
                        }                       
                        break;
                    case 5772:   //Status 
                        contextObj.updateStatusLookupValues(item, "add", null);
                        item.FieldValue = "37";
                        break;
                    case 6143:   //Lease Property Type 
                        item.FieldValue = "1";
                        break;
                    case 6142:   //Lease Type
                        this.leaseTypeDdl = item.LookupDetails.LookupValues;
                        break;
                }
            });
        } else if (target == "edit") {             
            fieldObjectArray.find(function (item) {
                switch (item.ReportFieldId) {
                    case 5775:   //Tenant 
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = (contextObj.inputItems.rowData.Tenant != null);
                            item.IsMandatory = (contextObj.inputItems.rowData.Tenant != null);
                        } else if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5774:   //Landlord 
                        if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = (contextObj.inputItems.rowData.Landlord != null);
                            item.IsMandatory = (contextObj.inputItems.rowData.Landlord != null);
                        } else if (contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5778:   //Can be Subleased
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsEnabled = false;
                        } else if (contextObj.setFeatureLookupId == 50) {
                            
                            item.IsEnabled = (contextObj.inputItems.rowData.Landlord != null);
                            item.FieldValue = (item.FieldValue) == "No" ? false : true;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        item.IsVisible = false; // temporary hidden 
                        break;
                    case 5779:   //Can Be Renewed
                        item.FieldValue = (item.FieldValue) == "No" ? "false" : "true";
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5771:   //Purpose - isToRentOut 
                        if (contextObj.setFeatureLookupId == 49) {
                            item.FieldValue = (contextObj.inputItems.rowData.Tenant != null) ? 1 : 0;
                            item.IsEnabled = false;
                            item.IsVisible = true;
                            item.LookupDetails.LookupValues.sort(function (a, b) {
                                return a.Id - b.Id;
                            });
                        } else if (contextObj.setFeatureLookupId == 50 || contextObj.setFeatureLookupId == 51) {
                            item.FieldValue = 0;
                            item.IsEnabled = false;
                            item.IsVisible = false;
                            item.IsMandatory = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5772:   //Status 
                        contextObj.updateStatusLookupValues(item, "edit", contextObj.inputItems.rowData.Status);
                        break;
                    case 6142:   //Lease Type
                        this.leaseTypeDdl = item.LookupDetails.LookupValues;
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5776: //Lease Category 
                    case 5770:
                    case 6143:
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5696:
                    case 5698:
                    case 5695:
                    case 5697:   
                        if (contextObj.leaseStatus == "Active") {
                            item.ReadOnlyMode = true;
                        }
                        break;
                }
            });
        }       
        return fieldObjectArray;
    }

    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];  
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                }
            } else {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                var contextObj = this;
                this.inputItems.rowData = retUpdatedSrc.itemSrc.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0] });
                this.refreshgrid = this.refreshgrid.concat([true]);
            }         
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    } 
        
    public deleteClick() {
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if (this.leaseStatus == "Active") {
            this.notificationService.ShowToaster("Selected Lease is Active, cannot be deleted", 2);
        } else if (this.leaseStatus == "Deleted") {
            this.notificationService.ShowToaster("Selected Lease is already deleted", 2);
        } else if (this.leaseStatus == "Terminated") {
            this.notificationService.ShowToaster("Selected Lease has been Terminated, cannot be deleted", 2);
        } else if (this.leaseStatus == "Expired") {
            this.notificationService.ShowToaster("Selected Lease has been Expired, cannot be deleted", 2);
        } else if (this.leaseStatus == "Draft") {
            this.showSlide = !this.showSlide;
        }
    }

    deleteLease() {
        var contextObj = this;
        this.realPropertyService.deleteLease(this.inputItems.selectedIds[0], this.inputItems.rowData["Lease Renewal Count"]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Lease exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Lease deleted", 3);
            } else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }    
   
    public leaseRenewal() {
        var contextObj = this;
        this.canBeRenewed = this.inputItems.rowData["Can be Renewed"];
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }

        if (this.leaseStatus == "Active" && this.canBeRenewed == "Yes") {
            this.localselection = 1;
            this.leaseRenewalTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);          
        } else if (this.leaseStatus == "Active" && this.canBeRenewed == "No") {
            this.notificationService.ShowToaster("Selected Lease cannot be renewed", 2);
        } else {
            this.notificationService.ShowToaster("Selected Lease is not Active, cannot be renewed", 2);
        }
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    }

    onTabClose(event: any) {
        this.leaseRenewalTab = false;
        this.selectedTab = event[0];
    }

    public areaCostDetails() {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save";
        this.pageTitle = "Area and Cost Details";
        this.leaseType = this.inputItems.rowData["Lease Type"];
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        if (this.inputItems.rowData["Status"] == "Draft") {
            this.showCostButton = true;
        }
        else {
            this.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            this.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showCostButton = true;
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            this.realPropertyService.loadareaCostDetails(this.inputItems.selectedIds[0], this.leaseRenewalCount).subscribe(function (resultData) {
                contextObj.fieldDetailsAreaCost = contextObj.areaCostFieldDetails(resultData["Data"], contextObj.leaseType);
                contextObj.secondaryTarget = 1;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public areaCostFieldDetails(fieldObjectArray: any, leaseType: string) {
        var contextObj = this;
        contextObj.leasePropertyType = contextObj.inputItems.rowData["Lease Property Type"];
        fieldObjectArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5770:   //Lease Identifier 
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 6185:  //Bargain Value
                case 6186:  //Market Value
                    if (leaseType == "Capital Lease"){
                        item.IsEnabled = true;
                        item.IsVisible = true;
                        item.IsMandatory = true;
                        item.HasValidationError = true;
                        item.IsLocallyValidated = false;
                    } else {
                        item.IsEnabled = false;
                        item.IsVisible = false;
                        item.IsMandatory = false;
                        item.HasValidationError = false;
                    }
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5760:   //Payment Interval
                    contextObj.ddlPaymentInterval = fieldObjectArray.find(function (item) {
                        return item.FieldId === 1705;
                    });
                    var removeArr = [27, 28, 30];
                    var lookUpDetails = contextObj.ddlPaymentInterval["LookupDetails"]["LookupValues"].filter(function (item) {
                        return removeArr.indexOf(item["Id"]) == -1;
                    })
                    if (item.FieldValue == "3") {
                        item.FieldValue = "29";
                    }
                    else if (item.FieldValue == "4") {
                        item.FieldValue = "31";
                    }
                    contextObj.ddlPaymentInterval["LookupDetails"]["LookupValues"] = lookUpDetails;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5737:   //Documented Area
                case 5758:  //Lease Amount
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;    
                case 6226:  //Economic Life
                    if (leaseType == "Capital Lease" && contextObj.leasePropertyType == "Whole Building" ) {
                        item.IsVisible = true;
                    }
                    break;                                    
            }
        });
        return fieldObjectArray;
    }

    OnCostAreaSubmit(event: any) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public alert() {
        var contextObj = this;
        this.pageTitle = "Point of Contacts";
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if ((this.leaseStatus == "Active") || (this.leaseStatus == "Draft") ){
            this.secondaryTarget = 2;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;           
        }
        else
        {
            this.notificationService.ShowToaster("Alert can be set to Leases in Draft or Active status", 2);
           
        }
    }
    public rentInformation() {
        var contextObj = this;
        this.btnName = "Save";
        this.pageTitle = "Rent Information";
        this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
        this.rentCommenceDate = this.inputItems.rowData["Rent Commencement Date"];      
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        if (this.inputItems.rowData["Status"] == "Draft") {
            this.showRentInfoButton = true;
        }
        else {
            this.showRentInfoButton = false;
        }

        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            this.showRentInfoButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showRentInfoButton = true;
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            contextObj.realPropertyService.loadareaCostDetails(contextObj.inputItems.selectedIds[0], contextObj.leaseRenewalCount).subscribe(function (resultData) {
                var tempCostData = resultData["Data"];
                var leaseAmount;
                var PaymentInterval;
                tempCostData.find(function (item: IField) {
                    switch (item.ReportFieldId) {
                        case 5760:
                            PaymentInterval = item.FieldValue;
                            break;
                        case 5758:
                            leaseAmount = item.FieldValue;
                            break;
                    }

                });
                if (leaseAmount != null) {
                    if (PaymentInterval == "3") {
                        contextObj.annualBaseRent = (parseFloat(leaseAmount) * 12).toFixed(2);
                    }
                    else if (PaymentInterval == "4")
                    {
                        contextObj.annualBaseRent = leaseAmount;
                    }
                    contextObj.realPropertyService.rentInformationDetails(contextObj.inputItems.selectedIds[0], contextObj.leaseRenewalCount).subscribe(function (resultDataRent) {
                        contextObj.fieldDetailsRentInfo = contextObj.RentInfoFieldDetails(resultDataRent["Data"]);
                        contextObj.secondaryTarget = 3;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Cost details not entered", 2);
                    return;
                }
            });
          }
    }
    public RentInfoFieldDetails(fieldObjectArray: any) {
        var contextObj = this;
        fieldObjectArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5770:   //Lease Identifier 
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    item.IsEnabled = false;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5758:   //Annual Base Rent
                case 5763:   //Grand Total
                    item.FieldValue = contextObj.annualBaseRent;    //Annual Base Rent as Default
                    item.IsEnabled = false;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 6240:
                    if (item.FieldValue == null) {
                        item.FieldValue = "44";
                    }
                    if (item.FieldValue == "True") {
                        item.FieldValue = "45";
                    }
                    if (item.FieldValue == "False") {
                        item.FieldValue = "44";
                    }                 
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5759:
                case 6187:
                case 5763:                   
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                case 5762:
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.ReadOnlyMode = true;
                    }
                    break;
            }
        });
        return fieldObjectArray;
    }

    OnRentInfoSubmit(event: any) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }    

    public rentPayment() {
        var contextObj = this;
        this.leaseStatus = this.inputItems.rowData["Status"];

        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } 

        if (this.leaseStatus == "Draft") {
            this.notificationService.ShowToaster("Selected Lease is in Draft, no Rent Payments exist", 2);
        }
        else if (this.leaseStatus == "Terminated") {
            this.notificationService.ShowToaster("Selected Lease is in Terminated, no Rent Payments exist", 2);
        } 
        else if (this.leaseStatus == "Deleted") {
            this.notificationService.ShowToaster("Selected Lease is in Deleted, no Rent Payments exist", 2);
        } 
        else {
            this.secondaryTarget = 4;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public canBeSubleased() {
        this.canbeSubleased = this.inputItems.rowData["Can be Subleased"];
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Lease", 2);
            return false;
        } else if (this.canbeSubleased == "Yes" && (this.leaseStatus == "Active" || this.leaseStatus == "Draft")) {
            return true;
        } else {
            this.notificationService.ShowToaster("Selected Lease cannot be subleased", 2);
            return false;
        }
    }

    public subLeaseClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Add";
        this.pageTitle = "New Sublease";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            this.realPropertyService.loadSubLeaseAddEdit(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = contextObj.updateDetailsForSubleaseAddEdit(resultData["Data"], "add");
                contextObj.secondaryTarget = 5;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            })
        }
    }

    public updateDetailsForSubleaseAddEdit(fieldObjectArray: any, target: string) {
        var contextObj = this;
        fieldObjectArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5782:   //parentLeaseId 
                    item.FieldValue = contextObj.inputItems.rowData.Id;
                    break;
                case 500174:   //ParentLease 
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    item.ReadOnlyMode = true;
                    break;
                case 5774:   //Landlord
                    item.ReadOnlyMode = true;
                    item.FieldValue = contextObj.inputItems.rowData["LessorId"];

                    break;
                case 6142:   //Lease Type
                    item.FieldValue = contextObj.inputItems.rowData["LeaseTypeId"];
                    item.ReadOnlyMode = true;
                    break;
                case 5776:   //Lease Category
                    item.FieldValue = contextObj.inputItems.rowData["LeaseCategoryId"];
                    item.ReadOnlyMode = true;
                    break;
                case 5772:   //status 
                    contextObj.updateStatusLookupValues(item, "add", null);
                    if (target == "add") {
                        item.FieldValue = "37";
                    }
                    break;
                case 5771:   //IsToRentOut 
                    item.FieldValue = "1";
                    break;
            }
        });
        return fieldObjectArray;
    }    

    public agreementClauses() {
        var contextObj = this;
        this.pageTitle = "Agreement Clauses";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {            
            this.secondaryTarget = 6;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public cancellationClauses() {
        var contextObj = this;
        this.pageTitle = "Cancellation Clauses";
        this.leaseStatus = this.inputItems.rowData["Status"];   
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            this.secondaryTarget = 7;
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public leaseDocumentsClick() {
        var contextObj = this;
        this.pageTitle = "Lease Documents";
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        this.leaseStatus = this.inputItems.rowData["Status"]; 
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if ((this.leaseStatus == "Active") || (this.leaseStatus == "Draft")) {
            this.secondaryTarget = 8;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Document can be uploaded only for Leases in Active or Draft status", 2);
        }      
    }

    public exportClick() {

        var contextObj = this;

        //alert();
        var input = contextObj.realPropertyService.getExportData(180, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject,"[]", "Leases", "", "[]");

        contextObj.exportObject.ExportDataFromServer(input, 1, "Leases", function (retCode) {
            if (retCode == 0) {
                contextObj.notificationService.ShowToaster("Lease data exported", 3);
            }
            else contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });

    }

    attachmentSuccess(event: any) {
        this.refreshgrid = [];
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["Id"] === selId;
        })
        switch (event["status"]) {
            case "success":
                selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
                break;
            case "delete":
                selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
                break;
        }
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(contextObj.itemsSource);
        //contextObj.itemsSource = updatedData;
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteLease();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    onSubmitCancelClause(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public leaseItemBuildingClick() {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.leasePropertyType == "Part of Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Whole Building", 2);
        } else if (this.leasePropertyType == "Whole Building") {
            contextObj.target = 2;
            contextObj.leaseRenewalCount = contextObj.inputItems.rowData["Lease Renewal Count"];
            contextObj.secondaryTarget = 9;
            contextObj.splitviewInput.showSecondaryView = true;
            this.status1 = this.inputItems.rowData["Status"];
            if (this.status1 == "Draft")
                contextObj.Hidebutton = false;
            else
                contextObj.Hidebutton = true;

            if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
                contextObj.Hidebutton = true;
            }
            if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
                contextObj.Hidebutton = false;
            }
        }
    }

    public leaseItemFloorClick() {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.leasePropertyType == "Whole Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Part of Building", 2);
        } else if (this.leasePropertyType == "Part of Building") {
            contextObj.target = 3;
            contextObj.leaseRenewalCount = contextObj.inputItems.rowData["Lease Renewal Count"];
            contextObj.secondaryTarget = 9;
            contextObj.splitviewInput.showSecondaryView = true;
            this.status1 = this.inputItems.rowData["Status"];
            if (this.status1 == "Draft")
                contextObj.Hidebutton = false;
            else
                contextObj.Hidebutton = true;

            if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
                contextObj.Hidebutton = true;
            }
            if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
                contextObj.Hidebutton = false;
            }
        }
    }
    onSubmitAlert(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    successReturn(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    onContextMenuOnClick(event: any) {
        var tempID: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = 30;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = 0;
            this.analyticsInput.IsKeywordSearch = 0
            this.analyticsInput.KeywordFilterValue = "";
            this.analyticsInput.AdvanceFilterValue = "[]";
            this.analyticsInput.FormId = 180;
            this.analyticsInput.ParentFormId = 0;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}