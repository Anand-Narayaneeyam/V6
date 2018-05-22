import { Component, ViewEncapsulation, OnInit    } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {DocumentService} from '../../../Models/Documents/documents.service';
import {DocumentsDirectlyAccessibletoaUserMainListComponent} from './documents-directly-accessibletoaUser-Mainlist'
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';


@Component({
    selector: 'documentsDirectly-accessibletoaUser',
    templateUrl: './app/Views/Documents/Access Control/documents-directly-accessibletoaUser.html',
    directives: [Notification, GridComponent, SubMenu, Sorting, PagingComponent, TabsComponent, TabComponent, SlideComponent, DocumentsDirectlyAccessibletoaUserMainListComponent, DropDownListComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, DocumentService],
    encapsulation: ViewEncapsulation.None
})

export class DocumentsDirectlyAccessibletoaUserComponent implements OnInit {

    fields: IField[];
    ddlUsers: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "DocumentId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC' };
    pageIndex: number = 0;
    documentgroupId: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    selectedTab: number = 0;
    firstTabFlag = false;
    newUserTab: boolean = false;
    deleteIndex: number = 0;
    types = true;
    sectionEnable: number = -1;
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    enableMenu = [0, 1];
    localselection: number;
    position: any = "top-right";
    showSlide: boolean = false;
    DocumentGroupName: string;
    tabTitle: string;
    selectTabTitle: string;
    deleteMsg: string;
    countTitle: string;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions, private documentService: DocumentService) { }

    ngOnInit(): void {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserFields().subscribe(function (resultData) {
            
            contextObj.ddlUsers = resultData["Data"].splice(0, 1)[0];
            var documentNumber = resultData["Data"].find(function (item) { return item.FieldId === 2369 })

            contextObj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {

                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextObj.fields = resultData["Data"];
                contextObj.tabTitle = "Documents Directly Accessible to a User";
                contextObj.selectTabTitle = "All Documents";
              //  contextObj.getDocumentsList();
            });

        });
    }
    
    onChangeddlUsers(event: any) {
        var contextObj = this;
        this.sectionEnable = Number(event);
        var arrayList = new Array<ReportFieldArray>();

        arrayList.push({
            ReportFieldId: 443,
            Value: event
        });

        if (Number(event) > 0) {
            this.firstTabFlag = true;
            contextObj.selectedTab = 0;
            this.documentService.getDocumentsDirectlyAccessibletoaUserData(JSON.stringify(arrayList), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                
                contextObj.totalItems = result["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.totalItems = contextObj.itemsSource.length;
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Documents added", 2);
                    contextObj.enableMenu = [0];
                }
                else {
                    contextObj.enableMenu = [0, 1];
                }
            });
        }
        else {
            contextObj.sectionEnable = -1;
            contextObj.firstTabFlag = false;
           // contextObj.deleteIndex = 0;
             //contextObj.selectedTab = 0;
            //contextObj.newUserTab = false;
        }
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.newUserTab = false;
        }
    }
    onTabClose(event: any) {
        this.newUserTab = false;
        this.selectedTab = event[0];
    }
    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newUserTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteDocuments(this.inputItems.selectedIds);
                break;
        }
    }
    public deleteDocuments(userIds) {
        if (userIds.length >= 1) {
            this.showSlide = !this.showSlide;
            this.deleteMsg = "Are you sure you want to remove the selected Document(s) from the User Access?";
        }
        else if (userIds.length < 1) {
            this.notificationService.ShowToaster("Select a Document", 2);
        }
        //else {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //}
    }
    okDelete(event: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();

        for (let c = 0; c < this.inputItems.selectedIds.length; c++) {
            
            fieldobj.push({
                ReportFieldId: 979,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;

        this.documentService.DeleteDocumentsDirectlyAccessibletoaUserMainList(JSON.stringify(fieldobj), this.sectionEnable).subscribe(function (resultData) {
            
            if (resultData["Data"]["Message"] == "Success") {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.notificationService.ShowToaster("Direct Access to the selected Document has been removed", 3);
                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.onChangeddlUsers(contextObj.sectionEnable);
                    //contextObj.notificationService.ShowToaster("Direct Access to the selected Document has been removed", 3);
                }
                else {
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0];
                        contextObj.notificationService.ShowToaster("No Documents added", 2);
                    }
                   // contextObj.notificationService.ShowToaster("Direct Access to the selected Document has been removed", 3);
                }

            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    //case 3:
                    //    if (resultData["Data"].ServerId == -1) {
                    //        contextObj.notificationService.ShowToaster("Selected User(s) in use, cannot be deleted", 5);
                    //    }
                    //    break;
                }
            }
        });
    }
    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }
    submitSuccess(event) {

        var contextObj = this;
        if (event["status"] == "success") {
            contextObj.onChangeddlUsers(this.sectionEnable);
            contextObj.selectedTab = 0;
            contextObj.deleteIndex = contextObj.deleteIndex + 1;
            contextObj.newUserTab = false;
        }
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.onChangeddlUsers(this.sectionEnable);
    }


    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.onChangeddlUsers(this.sectionEnable);
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
