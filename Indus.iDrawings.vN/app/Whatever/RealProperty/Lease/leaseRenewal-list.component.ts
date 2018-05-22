import { Component, EventEmitter, OnChanges, SimpleChange, Output } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { IField } from  '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { RenewLeaseComponent } from './renew-lease';
import { AreaCostDetailsComponent } from './areacost-details';
import { AgreementClausesComponent } from '../generalsettings/agreement-clauses';
import { AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import { RentPaymentComponent } from './rent-paymentlist';
import { CancellataionClausesComponent } from './cancellation-clauses';
import { RentInformationComponent } from './rent-information';
import { leaseItemUpdateBuildingFloorComponent } from './leaseItemUpdate-Building-Floor.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';


@Component({
    selector: 'leaseRenewal-list',
    templateUrl: './app/Views/RealProperty/Lease/leaseRenewal-list.component.html',
    directives: [SubMenu, SplitViewComponent, LabelComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, RenewLeaseComponent, AreaCostDetailsComponent, AgreementClausesComponent, AttachmentsComponent, RentPaymentComponent, CancellataionClausesComponent, RentInformationComponent, leaseItemUpdateBuildingFloorComponent],
    providers: [RealPropertyService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['selectedId', 'leaseData'],
})

export class LeaseRenewalListComponent implements OnChanges {
    pageTitle: string;
    fieldObject: IField[];
    fieldDetailsRenew: IField[];
    fieldDetailsAreaCost: IField[];
    itemsSource: any[];
    parentLeaseDetails: any[];
    fieldLeaseIdentifier: IField[];
    inputItems: IGrid = { dataKey: "LeaseId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [] };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    selectedId: number;
    leaseData: any;
    leaseId: any;
    leaseIdentifier: any;
    tenant: any;
    leasePropertyType: any;
    leaseType: any;
    leaseCategory: any;
    leaseExecutionDate: any;
    leaseCommencementDate: any;
    rentCommencementDate: any;
    leaseExpiryDate: any;
    leaseRenewalCount: any;
    renewalCount: any;
    ddlPaymentInterval: IField;
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
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": 10046
        },
        {
            "id": 2,
            "title": "",
            "image": "DisplaySettings",
            "path": "DisplaySettings",
            "subMenu": [
                {
                    "id": 3,
                    "title": "Area and Cost Details",
                    "image": "Area and Cost Details",
                    "path": "Area and Cost Details",
                    "subMenu": null,
                    "privilegeId": 10038     
                },
                {
                    "id": 4,
                    "title": "Rent Information",
                    "image": "Rent Information",
                    "path": "Rent Information",
                    "subMenu": null,
                    "privilegeId": 10039  
                },
                {
                    "id": 5,
                    "title": "Rent Payment",
                    "image": "Rent Payment",
                    "path": "Rent Payment",
                    "subMenu": null,
                    "privilegeId": 10040        
                }
            ]
        },
        {
            "id": 8,
            "title": "Lease Items",
            "image": "Lease Items",
            "path": "Lease Items",
            "subMenu": [
                {
                    "id": 9,
                    "title": "Building",
                    "image": "Building",
                    "path": "Building",
                    "subMenu": null
                },
                {
                    "id": 10,
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
            "id": 6,
            "title": "Clauses",
            "image": "Clauses",
            "path": "Clauses",
            "subMenu": null
        },
        {
            "id": 7,
            "title": "Lease Documents",
            "image": "Lease Documents",
            "path": "Lease Documents",
            "submenu": null
        },

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    rentCommenceDate: any;
    showRentInfoButton: boolean = false;
    annualBaseRent: any; 
    fieldDetailsRentInfo: IField[];
    leaseStatus: any = "Active";
    showCostButton: boolean = false;
    refreshgrid;
    target: any;
    status1: any;
    Hidebutton: any;
    leaseId1: any[] = [];
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    IsModuleAdmin: boolean = false;

    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private administrationServices: AdministrationService, private generFun: GeneralFunctions ) { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);


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

        if (changes["leaseData"] && changes["leaseData"]["currentValue"]) {
            this.leaseId = changes["selectedId"]["currentValue"][0];
            this.leaseIdentifier = changes["leaseData"]["currentValue"]["Lease Identifier"];
            if (changes["leaseData"]["currentValue"]["Tenant"] == null) {
                this.tenant = changes["leaseData"]["currentValue"]["Landlord"];
            } else {
                this.tenant = changes["leaseData"]["currentValue"]["Tenant"];
            }
            this.leasePropertyType = changes["leaseData"]["currentValue"]["Lease Property Type"];
            this.leaseType = changes["leaseData"]["currentValue"]["Lease Type"];
            this.leaseCategory = changes["leaseData"]["currentValue"]["Lease Category"];
            this.leaseExecutionDate = changes["leaseData"]["currentValue"]["Execution Date"];
            this.leaseCommencementDate = changes["leaseData"]["currentValue"]["Commencement Date"];
            this.rentCommencementDate = changes["leaseData"]["currentValue"]["Rent Commencement Date"];
            this.leaseExpiryDate = changes["leaseData"]["currentValue"]["Expiry Date"];
            this.leaseRenewalCount = changes["leaseData"]["currentValue"]["Lease Renewal Count"];
        }
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
            contextObj.realPropertyService.getLeaseRenewalListColumns().subscribe(function (resultData) {
                contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
                if (changes["leaseData"]["currentValue"]) {
                    contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
                }
                var removeArr = [5770];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })
                contextObj.realPropertyService.getLeaseRenewalListData(contextObj.leaseId, contextObj.leaseRenewalCount, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    } else {
                        contextObj.notificationService.ShowToaster("No Renewal Leases exist", 2);
                        contextObj.enableMenu = [0];
                    }
                });
            })
        }
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.deleteClick();
                break;
            case 3:
                this.areaCostDetails();
                break;
            case 4:
                this.rentInformation();
                break;
            case 5:
                this.rentPayment();
                break;
            case 6:
                this.agreementClauses();
                break;
            case 7:
                this.leaseDocumentsClick();
                break;
            case 9:
                this.leaseItemBuildingClick();
                break;
            case 10:
                this.leaseItemFloorClick();
                break;
        }
    }
    
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
    };

    public onSort(objGrid: any) {
    }

    public addClick() {
        var contextObj = this;
        var newExpiry;
        if (contextObj.itemsSource.length > 0) {
            if (contextObj.itemsSource[contextObj.itemsSource.length - 1]["Status"] == "Draft") {
                newExpiry = contextObj.itemsSource[contextObj.itemsSource.length - 1]["Expiry Date"];
                contextObj.leaseExpiryDate = newExpiry;
            }
        }
                  

        this.action = "add";
        this.btnName = "Renew";
        this.pageTitle = "New Lease Renewal";
        var date = new Date(contextObj.leaseExpiryDate);
        date.setDate(date.getDate() + 1)
        var strDate = date.toDateString().split(" ");
        var strDates = strDate[1] + " " + strDate[2] + " " + strDate[3];

        var renewExpiry = new Date(contextObj.leaseExpiryDate);
        renewExpiry.setDate(renewExpiry.getDate() + 2)
        var strDate1 = renewExpiry.toDateString().split(" ");
        var renewExpiryDate = strDate1[1] + " " + strDate1[2] + " " + strDate1[3];

        this.realPropertyService.loadRenewLease(0).subscribe(function (resultData) {
            contextObj.fieldDetailsRenew = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsRenew.length; i++) {
                switch (contextObj.fieldDetailsRenew[i].FieldId) {
                    case 1662:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseIdentifier;
                        break;
                    case 1666:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.tenant;
                        break;
                    case 1668:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leasePropertyType;
                        break;
                    case 1670:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseType;
                        break;
                    case 1671:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseCategory;
                        break;
                    case 1672:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1673:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1674:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1675:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = renewExpiryDate;
                        break;
                }
            }
            contextObj.secondaryTarget = 1;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }  

    OnSuccessfulSubmit(event) {
        if (event["status"] == "success") {
            var contextObj = this;
            if (this.action == "add") {
                this.realPropertyService.getLeaseRenewalListData(contextObj.leaseId, contextObj.leaseRenewalCount, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });               
            }
        }      
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.inputItems.rowData["Status"] == "Expired") {
            this.notificationService.ShowToaster("Selected Lease has been expired, cannot be deleted", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }  

    deleteLeaseRenewal() {
        var contextObj = this;
        this.renewalCount = this.inputItems.rowData["RenewalCount"];
        this.realPropertyService.deleteLeaseRenewal(this.leaseId, this.renewalCount).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Renewal Leases exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Lease deleted", 3);
            } else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteLeaseRenewal();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public areaCostDetails() {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save";
        this.pageTitle = "Area and Cost Details";
        this.renewalCount = this.inputItems.rowData["RenewalCount"]; 
        //this.leaseType = this.inputItems.rowData["Lease Type"];
        //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        //if (this.inputItems.rowData["Status"] == "Draft") {
        this.showCostButton = true;
        //}
        //else {
        //    this.showCostButton = false;
        //}
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            contextObj.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showCostButton = true;
        }        
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItems.selectedIds.length < 1) {
        //    this.notificationService.ShowToaster("Select a Lease", 2);
            //} else {
            this.realPropertyService.loadareaCostDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultData) {
                contextObj.fieldDetailsAreaCost = contextObj.areaCostFieldDetails(resultData["Data"], contextObj.leaseType);
                contextObj.secondaryTarget = 2;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        //}
    }

    public areaCostFieldDetails(fieldObjectArray: any, leaseType: string) {
        var contextObj = this;
        fieldObjectArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5770:   //Lease Identifier 
                    item.FieldValue = contextObj.leaseIdentifier;
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 6185:  //Bargain Value
                case 6186:  //Market Value
                    if (leaseType == "Capital Lease") {
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
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5737:   //Documented Area
                case 5758:  //Lease Amount
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 6226:  //Economic Life
                    if (leaseType == "Capital Lease" && contextObj.leasePropertyType == "Whole Building") {
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

    public rentInformation() {
        var contextObj = this;
        this.btnName = "Save";
        this.pageTitle = "Rent Information";
        this.renewalCount = this.inputItems.rowData["RenewalCount"]; 
        //this.leaseIdentifier = this.leaseIdentifier;
        this.rentCommenceDate = this.inputItems.rowData["Rent Commencement Date"]; 
        //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        //if (this.inputItems.rowData["Status"] == "Draft") {
            this.showRentInfoButton = true;
        //}
        //else {
        //    this.showRentInfoButton = false;
        //}
            if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
                contextObj.showRentInfoButton = false;
            }
            if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
                contextObj.showRentInfoButton = true;
            }
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItems.selectedIds.length < 1) {
        //    this.notificationService.ShowToaster("Select a Lease", 2);
        //} else {
            contextObj.realPropertyService.loadareaCostDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultData) {
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
                    else if (PaymentInterval == "4") {
                        contextObj.annualBaseRent = leaseAmount;
                    }
                    contextObj.realPropertyService.rentInformationDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultDataRent) {
                        contextObj.fieldDetailsRentInfo = contextObj.RentInfoFieldDetails(resultDataRent["Data"]);
                        contextObj.secondaryTarget = 4;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Cost details not entered", 2);
                    return;
                }
            });
        //}
    }
    public RentInfoFieldDetails(fieldObjectArray: any) {
        var contextObj = this;
        fieldObjectArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5770:   //Lease Identifier 
                    item.FieldValue = contextObj.leaseIdentifier;
                    item.IsEnabled = false;
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5758:   //Annual Base Rent
                case 5763:   //Grand Total
                    item.FieldValue = contextObj.annualBaseRent;    //Annual Base Rent as Default
                    item.IsEnabled = false;
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5759:
                case 6187:
                case 5763:
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                case 5762:
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.ReadOnlyMode = true;
                    //}
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

        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }

        if (this.inputItems.rowData["Status"] == "Draft") {
            this.notificationService.ShowToaster("Selected Lease is in Draft, no Rent Payments exist", 2);
        } else {
            this.secondaryTarget = 5;
            this.renewalCount = this.inputItems.rowData["RenewalCount"]; 
            //this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }
    public agreementClauses() {
        var contextObj = this;
        this.pageTitle = "Agreement Clauses";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            this.secondaryTarget = 3;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public leaseDocumentsClick() {
        var contextObj = this;
        this.pageTitle = "Lease Documents";
        this.renewalCount = this.inputItems.rowData["RenewalCount"]; 
        this.leaseId = this.inputItems.rowData["LeaseId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else {
            this.secondaryTarget = 6;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    attachmentSuccess(event: any) {
        this.refreshgrid = [];
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["LeaseId"] === selId;
        })
        switch (event["status"]) {
            case "success":
                selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
                break;
            case "delete":
                selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
                break;
        }
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
    }
    public leaseItemBuildingClick() {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        //this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.leasePropertyType == "Part of Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Whole Building", 2);
        } else if (this.leasePropertyType == "Whole Building") {
            contextObj.target = 2;
            contextObj.leaseId1.push(contextObj.inputItems.rowData["LeaseId"]);
            contextObj.renewalCount = contextObj.inputItems.rowData["RenewalCount"]; 
            contextObj.secondaryTarget = 7;
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
        //this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        } else if (this.leasePropertyType == "Whole Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Part of Building", 2);
        } else if (this.leasePropertyType == "Part of Building") {
            contextObj.target = 3;
            contextObj.leaseId1.push(contextObj.inputItems.rowData["LeaseId"]);
            contextObj.renewalCount = contextObj.inputItems.rowData["RenewalCount"]; 
            contextObj.secondaryTarget = 7;
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
    successReturn(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
}