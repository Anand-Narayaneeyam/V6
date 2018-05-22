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

    selector: 'documentsfor-documentGroups-mainList',
    templateUrl: './app/Views/Documents/Access Control/document-group-documents-mainList.html',
    directives: [GridComponent, SubMenu, PagingComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, DocumentService],
    inputs: ['DocumentGroupId']
})

export class DocumentsforDocumentGroupsMainListComponent implements AfterViewInit {
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    itemsSource: any[];
    UserCategoryId: any;
    UserGroupId: any;
    DocumentGroupId: any;
    documentIds: Array<string>;
    @Output() submitSuccess = new EventEmitter();
    // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false };
    inputItems: IGrid = { dataKey: "DocumentId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions, private documentService: DocumentService) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.documentService.getDocumentforDocumentGroupsMainListFields().subscribe(function (resultData) {
            
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
        this.documentService.getDocumentforDocumentGroupsMainListData(this.DocumentGroupId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Documents exist", 2);
            }
        });
    }

    insertDocumentList(event: any) {
        var contextObj = this;
        var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();

        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Documents exist", 2);
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
                
                arrayList.push({
                    ReportFieldId: 2812 ,
                    Value: this.DocumentGroupId.toString()
                });
                this.documentService.updateDocumentforDocumentGroupsMainList(JSON.stringify(arrayList), 0).subscribe(function (resultData) {
                    
                    if (resultData.Message == "Success") {
                        contextObj.notificationService.ShowToaster("Documents added to the Document Group", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
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