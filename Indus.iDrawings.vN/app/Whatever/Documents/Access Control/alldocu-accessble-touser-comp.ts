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
    selector: 'document-AllDocumentsAccessibletoaUser',
    templateUrl: './app/Views/Documents/Access Control/alldocu-accessble-touser-comp.html',
    directives: [Notification, GridComponent, PagingComponent, DropDownListComponent],
    providers: [DocumentService, HTTP_PROVIDERS, NotificationService, AdministrationService]
})

export class AllDocumentsAccessibletoaUserComponent {

    fieldObject: IField[];
    ddlUsers: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true, allowEdit: true, selectioMode: 'single', selectedIds: [0] };
    totalItems: number = 0;
    itemsPerPage: number = 10;
    sectionEnable: number = -1;
    pageIndex: number = 0;

    constructor(private documentService: DocumentService, private notificationService: NotificationService, private administrationService: AdministrationService) {
        var contextobj = this;
        this.documentService.getAllDocumentsAccessibletoaUserFields().subscribe(function (result) {

            contextobj.ddlUsers = result["Data"].splice(0, 1)[0];
            var documentNumber = result["Data"].find(function (item) { return item.FieldId === 2369 })

            contextobj.administrationService.getCustomerSubscribedFeatures("60").subscribe(function (rt) {

                if (rt["Data"][0].IsSubscribed == false) {
                    documentNumber.IsEnabled = false;
                    documentNumber.IsVisible = false;
                }
                contextobj.fieldObject = result["Data"];
            });
            
        });
    }

    public onPageChanged(event: any) {
        
        this.pageIndex = event.pageEvent.page;
        this.onChangeddlUsers(this.sectionEnable);
    }

    onChangeddlUsers(event: any) {

        this.sectionEnable = Number(event);
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
  
        arrayList.push({
            ReportFieldId: 443,
            Value: event
        });

        if (Number(event) > 0) {
            this.documentService.getAllDocumentsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, JSON.stringify(arrayList)).subscribe(function (result) {
                contextObj.itemsPerPage = result["Data"].RowsPerPage;
                contextObj.totalItems = result["Data"].DataCount;

                if (contextObj.totalItems > 0)
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                else {
                    contextObj.notificationService.ShowToaster("No Documents added", 2);                  
                    contextObj.sectionEnable = -1;
                }
            });
        }
        else
            this.sectionEnable = -1;
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        //this.documentService.getAllDocumentsAccessibletoaUserData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.sectionEnable).subscribe(function (result) {
        //    contextObj.itemsPerPage = result["Data"].RowsPerPage;
        //    contextObj.totalItems = result["Data"].DataCount;

        //    if (contextObj.totalItems > 0)
        //        contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
        //    else {
        //        contextObj.notificationService.ShowToaster("No Documents exists", 2);
        //    }
        //});
        this.onChangeddlUsers(this.sectionEnable);
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}