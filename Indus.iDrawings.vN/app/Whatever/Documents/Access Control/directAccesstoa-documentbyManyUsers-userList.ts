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
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({

    selector: 'directAccesstoa-documentby-manyUsers-userList',
    templateUrl: './app/Views/Documents/Access Control/directAccesstoa-documentbyManyUsers-userList.html',
    directives: [GridComponent, SubMenu, PagingComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions, DocumentService],
    inputs: ['DocumentId', 'DocumetNumber', 'DocumentName']
})

export class DirectAccesstoaDocumentbyManyUsersUserListComponent implements AfterViewInit {
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    itemsSource: any[];
    UserCategoryId: any;
    UserGroupId: any;
    DocumentId: any;
    DocumentName: any;
    DocumetNumber: any;
    documentIds: Array<string>;
    userArrayList: userArray[] = [];
    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "DocumentId", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions, private documentService: DocumentService) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        let rptField = [448];
        let count = rptField.length;
        this.documentService.getDirectAccesstoaDocumentbyManyUsersUserListFields().subscribe(function (resultData) {
            
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
            contextObj.getAccesstoaDocumentbyManyUserstData();
        });
    }

    getAccesstoaDocumentbyManyUserstData() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 977,
            Value: this.DocumentId.toString()
        });
        this.documentService.getDirectAccesstoaDocumentbyManyUsersUserListData(JSON.stringify(arrayList), this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            
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
        var CheckMessage: string = '';

        var arrayListCheck = new Array<ReportFieldArray>();
        var arrayListUpdate = new Array<ReportFieldArray>();

        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            contextObj.notificationService.ShowToaster("No Users exist", 2);
            return;
        }
        else {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    
                    arrayListCheck.push({
                        ReportFieldId: 443,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                    arrayListUpdate.push({
                        ReportFieldId: 978,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            arrayListCheck.push({
                ReportFieldId: 2813,
                Value: contextObj.DocumentId.toString()
            });
            arrayListUpdate.push({
                ReportFieldId: 979,
                Value: contextObj.DocumentId.toString()
            });
            this.documentService.updatekDirectAccesstoaDocumentbyManyUsersUserList(JSON.stringify(arrayListUpdate)).subscribe(function (resultData) {
                
                if (resultData.Data.Message == "Success") {
                    contextObj.documentService.checkDirectAccesstoaDocumentbyManyUsersUserList(JSON.stringify(arrayListCheck)).subscribe(function (resultData) {
                        
                        var tempArray: userArray[] = [];
                        if (resultData.Data.DataCount > 0) {
                            var usersList = JSON.parse(resultData.Data.FieldBinderData);
                            //if (resultData.Data.DataCount == 1) {
                            //    CheckMessage = "Access privilege to this document will exist for the user " + usersList[0].Name + " as the user is already linked with a Document Group(s).\n";
                            //    CheckMessage = CheckMessage + " Document Access updated"
                            //    contextObj.notificationService.ShowToaster(CheckMessage, 3);

                            //}
                            //else {
                                for (let i = 0; i < usersList.length; i++) {
                                    tempArray.push({
                                        Name: usersList[i]["Name"]
                                    });
                                }
                                contextObj.userArrayList = tempArray;
                                contextObj.showSlide = true;
                            //}                          
                        }
                        else
                            contextObj.notificationService.ShowToaster("Document Access updated", 3);

                    });
                }
                else
                    contextObj.notificationService.ShowToaster("Document Access updated Failed", 3);
            });
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getAccesstoaDocumentbyManyUserstData();
    }


    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getAccesstoaDocumentbyManyUserstData();
    }
    closeSlide(value: any) {
        if (this.showSlide)
            this.notificationService.ShowToaster("Document Access updated", 3);
        this.showSlide = value.value;
        
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface userArray {
    Name: string;
}