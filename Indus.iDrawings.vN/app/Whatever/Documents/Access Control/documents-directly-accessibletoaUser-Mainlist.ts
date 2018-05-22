import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {DocumentService} from '../../../Models/Documents/documents.service';

@Component({

    selector: 'documentsDirectly-accessibletoaUser-mainList',
    templateUrl: './app/Views/Documents/Access Control/documents-directly-accessibletoaUser-Mainlist.html',
    directives: [GridComponent, SubMenu, PagingComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, DocumentService],
    inputs: ['UserId']
})

export class DocumentsDirectlyAccessibletoaUserMainListComponent implements AfterViewInit {
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    itemsSource: any[];
    UserCategoryId: any;
    UserGroupId: any;
    UserId: any;
    DocumentGroupId: any;
    documentIds: Array<string>;
    @Output() submitSuccess = new EventEmitter();
    // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false };
    inputItems: IGrid = { dataKey: "DocumentId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions, private documentService: DocumentService) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserMainListFields().subscribe(function (resultData) {

            var documentNumber = resultData["Data"].find(function (item) { return item.FieldId === 2369 })

            contextObj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {

                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextObj.fieldObject = resultData["Data"];
                contextObj.getDocumentGroupMainListData();
            })

        });
    }

    getDocumentGroupMainListData() {
        var contextObj = this;
        this.documentService.getDocumentsDirectlyAccessibletoaUserMainListData(this.UserId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist to add", 2);
            }
        });
    }

    insertDocumentList(event: any) {
        var contextObj = this;
        var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();

        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Documents exist to add", 2);
            return;
        }
        else {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {

                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 979,
                        Value: contextObj.itemsSource[i].DocumentId.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {

                this.documentService.updateDocumentsDirectlyAccessibletoaUserMainList(JSON.stringify(arrayList), this.UserId).subscribe(function (resultData) {
                    
                    if (resultData.Data.Message == "Success") {
                        contextObj.notificationService.ShowToaster("Documents added to the User", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                    else
                        contextObj.notificationService.ShowToaster("Documents added to the User failed", 5);
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Document", 2);
            }
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getDocumentGroupMainListData();
    }


    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getDocumentGroupMainListData();
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}