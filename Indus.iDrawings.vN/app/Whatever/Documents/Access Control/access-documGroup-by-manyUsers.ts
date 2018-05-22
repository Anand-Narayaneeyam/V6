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

    selector: 'access-documentGroup-by-manyUsers',
    templateUrl: './app/Views/Documents/Access Control/access-documGroup-by-manyUsers.html',
    directives: [GridComponent, SubMenu, PagingComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, DocumentService],
    inputs: ['DocumentGroupId']
})

export class AccesstoDocumentGroupbyManyUsersComponent implements AfterViewInit {
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
        let rptField = [448];
        let count = rptField.length;
        this.documentService.getAccesstoaDocumentGroupbyManyUsersFields().subscribe(function (resultData) {
            
            resultData["Data"].find(function (item) {
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
            contextObj.fieldObject = resultData["Data"];
            contextObj.getAccesstoaDocumentGroupbyManyUserstData();
        });
    }

    getAccesstoaDocumentGroupbyManyUserstData() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 2817,
            Value: this.DocumentGroupId.toString()
        });
        this.documentService.getAccesstoaDocumentGroupbyManyUsersData(JSON.stringify(arrayList), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    }

    insertUsersList(event: any) {
        var contextObj = this;
        var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();
        
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Users exist", 2);
            return;
        }
        else {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    
                  //  hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 2812,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
           // if (hasSelectedIds == true) {

                this.documentService.updateAccesstoaDocumentGroupbyManyUsers(JSON.stringify(arrayList), this.DocumentGroupId).subscribe(function (resultData) {
                    
                    if (resultData.Data.Message == "Success") {
                        contextObj.notificationService.ShowToaster("Document Group Access updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                    else
                        contextObj.notificationService.ShowToaster("Document Group Access update Failed", 5);
                });
            //}
            //else {
            //    contextObj.notificationService.ShowToaster("Select a User", 2);
            //}
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getAccesstoaDocumentGroupbyManyUserstData();
    }


    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getAccesstoaDocumentGroupbyManyUserstData();
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}