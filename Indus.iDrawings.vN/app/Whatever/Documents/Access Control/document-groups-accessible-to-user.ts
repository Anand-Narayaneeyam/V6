import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DocumentService} from '../../../Models/Documents/documents.service'

@Component({
    selector: 'document-DocumentGroupsAccessibletoaUser',
    templateUrl: './app/Views/Documents/Access Control/document-groups-accessible-to-user.html',
    directives: [Notification, GridComponent, PagingComponent, DropDownListComponent],
    providers: [DocumentService, HTTP_PROVIDERS, NotificationService]
})

export class DocumentGroupsAccessibletoaUserComponent {

    fieldObject: IField[];
    ddlUsers: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: true, selectioMode: 'single', selectedIds: [0] };
    totalItems: number = 0;
    itemsPerPage: number = 10;
    sectionEnable: number = -1;
    pageIndex: number = 0;

    constructor(private documentService: DocumentService, private notificationService: NotificationService) {
        var contextobj = this;
        this.documentService.getDocumentGroupsAccessibletoaUserFields().subscribe(function (result) {
            
            contextobj.ddlUsers = result["Data"].splice(0, 1)[0];
            var documentGroup = result["Data"].find(function (item) { return item.FieldId === 2346 })
            documentGroup.IsEnabled = false;
            contextobj.fieldObject = result["Data"];
        });
    }

    public onPageChanged(event: any) {

    }

    onChangeddlUsers(event: any) {
        
        this.sectionEnable = Number(event);
        var contextObj = this;
        if (Number(event) > 0) {
            this.documentService.getDocumentGroupsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, Number(event)).subscribe(function (result) {
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                contextObj.totalItems = result["Data"].DataCount;

                if (contextObj.totalItems > 0)
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                else {
                    contextObj.notificationService.ShowToaster("No Document Group exists", 2);
                }
            });
        }
        else
            this.sectionEnable = -1;
    }

    updateData() {
        var contextObj = this;
        this.inputItems.selectedIds = [];
        var arrayList = new Array<ReportFieldArray>();

        if (this.itemsSource == undefined || this.itemsSource == null)
            return;

        for (let i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i]["Select All"] == true) {
                this.inputItems.selectedIds.push(this.itemsSource[i]["Id"]);
                arrayList.push({
                    ReportFieldId: 2817,
                    Value: this.itemsSource[i]["Id"]
                });
            }
        }
        this.documentService.documentGroupsAccessibletoaUserUpdate(JSON.stringify(arrayList), this.sectionEnable).subscribe(function (result) {
            if (result["Data"]["Message"] == "Success") 
                contextObj.notificationService.ShowToaster("User Access updated", 3);
            else
                contextObj.notificationService.ShowToaster("User Access updated failed", 3);
        });
        
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.documentService.getDocumentGroupsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.sectionEnable).subscribe(function (result) {
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.totalItems = result["Data"].DataCount;

            if (contextObj.totalItems > 0)
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            else {
                contextObj.notificationService.ShowToaster("No Document Group exists", 2);
            }
        });
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}