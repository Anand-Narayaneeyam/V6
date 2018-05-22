import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { AgreementClauseAddEditComponent } from './agreementclause-addedit';
import { LeaseAgreementClausesComponent } from './lease-agreementclauses';
import { AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';


@Component({
    selector: 'agreement-clauses',
    templateUrl: 'app/Views/RealProperty/GeneralSettings/agreement-clauses.html',
    directives: [SplitViewComponent, FieldComponent, LabelComponent, SubMenu, GridComponent, PagingComponent, SlideComponent, AgreementClauseAddEditComponent, LeaseAgreementClausesComponent, AttachmentsComponent],
    providers: [RealPropertyService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['leaseId', 'leaseRenewalCount', 'leaseIdentifier', 'pageTarget']
})

export class AgreementClausesComponent implements OnInit{
    pageTitle: string;
    showSlide: boolean = false;
    position: any = "top-right";
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    fieldLeaseIdentifier: IField[];
    leaseId: any;
    leaseRenewalCount: any;
    leaseIdentifier: any;
    pageTarget: number;
    itemsSource: any[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: "ASC", sortCol: "" };
    enableMenu = [];
    menuData: any;
    refreshgrid;
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationServices: AdministrationService) {
    } 

    ngOnInit(): void {
        var contextObj = this;
        var tempData;
        if (this.pageTarget == 1) {         // Settings: Agreement Clauses

            this.menuData = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 10052
                },
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 10052
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "submenu": null,
                    "privilegeId": 10052
                }
            ];
            this.enableMenu = []; 
            this.realPropertyService.getAgreementClausesFields().subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
                var leaseIdentifier = contextObj.fieldObject.find(function (el) { return el.FieldId === 1662; });
                leaseIdentifier["IsVisible"] = false;
                var attachments = contextObj.fieldObject.find(function (el) { return el.FieldId === 1737; });
                attachments["IsVisible"] = false;
            });
            this.realPropertyService.getAgreementClausesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    tempData = JSON.parse(resultData["Data"].FieldBinderData);
                    for (let i = 0; i < tempData.length; i++) {
                        if (tempData[i]["Is Service Clause"])
                        {
                            tempData[i]["Is Service Clause"] = "True";
                        }
                        else  {
                            tempData[i]["Is Service Clause"] = "False";
                        }

                        if (tempData[i]["Payable"])
                        {
                            tempData[i]["Payable"] = "True";
                        }
                        
                        else  {
                            tempData[i]["Payable"] = "False";
                        }                          
                    } 
                    contextObj.itemsSource = tempData;                   
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [0, 1, 2];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                    contextObj.enableMenu = [0];
                }
            });   
        } else {                            // Lease: Clause: Agreement Clauses
            this.menuData = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 10052

                },
                //{
                //    "id": 3,
                //    "title": "Attachments",
                //    "image": "Attachments",
                //    "path": "Attachments",
                //    "submenu": null
                //}
            ];
            this.enableMenu = [];
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);

            this.realPropertyService.getAgreementClausesFields().subscribe(function (resultData) {
                contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
                contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
                var removeArr = [5770];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })
                var payable = contextObj.fieldObject.find(function (el) { return el.FieldId === 1736; });
                //payable["FieldLabel"] = "Paid By";
            });
            this.leaseAgreementClauseList();
        }       
    }

    public leaseAgreementClauseList() {
        var contextObj = this;
        var tempData;
        this.realPropertyService.getLeaseClausesByLeaseUrl(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {    
                tempData = JSON.parse(resultData["Data"].FieldBinderData);
                for (let i = 0; i < tempData.length; i++) {
                    if (tempData[i]["Is Service Clause"]) {
                        tempData[i]["Is Service Clause"] = "True";
                    }
                    else {
                        tempData[i]["Is Service Clause"] = "False";
                    }

                    if (tempData[i]["Payable"]) {
                        tempData[i]["Payable"] = "True";
                    }

                    else {
                        tempData[i]["Payable"] = "False";
                    }
                }
                contextObj.itemsSource = tempData;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });   
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:
                if (this.pageTarget == 1) {
                    this.target = 1;
                    this.addClick(1);
                } else if (this.pageTarget) {
                    this.target = 2;
                    this.addClick(2);
                }
                break;
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.target = 3;
                this.attachmentClick();
                break;
        }
    }

    public addClick(pageTarget) {
        this.action = "add";
        if (pageTarget == 1) {            
            this.btnName = "Save";
            this.pageTitle = "New Agreement Clause";
            var contextObj = this;
            this.realPropertyService.loadAgreementClausesAddEdit(0, 1).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        } else {
            this.pageTitle = "Select Agreement Clauses";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Agreement Clause";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        } else {
            this.realPropertyService.loadAgreementClausesAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1)
        {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1)
        {
           this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        }
        else
        {
            contextObj.realPropertyService.checkAgreementClausesInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
               if (resultData["Data"] == true)
                {
                   contextObj.deleteAgreementClauses();
                }
               else
                {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }

    public deleteAgreementClauses() {
        var contextObj = this;
        this.realPropertyService.postDeleteAgreementClauses(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                    contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
                }
                contextObj.notificationService.ShowToaster("Selected Agreement Clause deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Agreement Clause linked to a Lease, cannot be deleted", 5);
            }
        });
    }

    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        var contextObj = this;
        var tempData;
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                if (this.pageTarget == 1) {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    if (this.totalItems > 0) {
                        this.enableMenu = [0, 1, 2];
                    }
                    tempData = retUpdatedSrc["itemSrc"];
                   
                    for (let i = 0; i < this.totalItems; i++) {
                        if (tempData[i]["Id"] == this.inputItems.selectedIds[0])
                        {
                        if (tempData[i]["Is Service Clause"]) {
                            tempData[i]["Is Service Clause"] = "True";
                        }
                        else {
                            tempData[i]["Is Service Clause"] = "False";
                        }

                        if (tempData[i]["Payable"]) {
                            tempData[i]["Payable"] = "True";
                        }

                        else {
                            tempData[i]["Payable"] = "False";
                        }
                        } 
                  }
                    this.itemsSource = tempData;
                } else {
                    this.leaseAgreementClauseList();
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                tempData = retUpdatedSrc["itemSrc"];
                for (let i = 0; i < this.totalItems; i++) {
                    if (tempData[i]["Id"] == this.inputItems.selectedIds[0]) {
                        if (tempData[i]["Is Service Clause"]) {
                            tempData[i]["Is Service Clause"] = "True";
                        }
                        else {
                            tempData[i]["Is Service Clause"] = "False";
                        }

                        if (tempData[i]["Payable"]) {
                            tempData[i]["Payable"] = "True";
                        }

                        else {
                            tempData[i]["Payable"] = "False";
                        }
                    }
                }
                //this.itemsSource = tempData;
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }           
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public attachmentClick() {
        var contextObj = this;
        this.pageTitle = "Attachments";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Agreement Clause", 2);
        } else {
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    attachmentSuccess(event: any) {
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["Id"] === selId;
        })
        //switch (event["status"]) {
        //    case "success":
        //        selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
        //        break;
        //    case "delete":
        //        selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
        //        break;
        //}
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedData;
    }

    okDelete(event: Event) {
        this.deleteAgreementClauses();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}



