import {Component, Input, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'division-admin-settings',
    templateUrl: './app/Views/Administration/Users/divisionadminsettings.component.html',
    directives: [Notification, GridComponent, PagingComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class DivisionAdminSettingsComponent implements AfterViewInit{
    fieldObject: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true};
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;  
    @Input() selectedIds: any[]; 
       
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
    }
    ngAfterViewInit() {
    var contextObj = this;
    this.administrationService.getDivisionAdminSettingsFields().subscribe(function (result) {
        contextObj.fieldObject = (result["Data"]);
        if (contextObj.fieldObject.length > 1)
            contextObj.dataLoad(1, contextObj);
        else
            contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);             
    });    
    }
    public onPageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    public onSort(objGrid: any) {
        this.dataLoad();
    }
    public dataLoad(target?: number, context?: any) {
        this.administrationService.getOrganizationNamesForMenu().subscribe(function (resultData) {

            if (resultData["Data"].FieldBinderData == "[]") {
                context.notificationService.ShowToaster("No Organizational Units exist", 2);
            }

            else {
                context.administrationService.getDivisionAdminSettings(context.selectedIds[0], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {

                    context.totalItems = result.DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result.RowsPerPage;
                        }
                    } else {
                        var orgName = context.fieldObject.find(function (el) { return el.FieldId == 341 })['FieldLabel'];
                        context.notificationService.ShowToaster(orgName + " access is not to the selected User", 2);
                    }
                });
            }
        });
    }


    //updateDivisionAdminSettings() {
    //    var contextObj = this;
    //    let listObj = new Array();     
    //    for (let i = 0; i < contextObj.itemsSource.length - 1; i++) {
    //        if (contextObj.itemsSource[i]["View"]==true) {
    //            let edit = contextObj.itemsSource[i]["Edit"] == 'TRUE' ? 1 : 0;
    //            listObj.push({
    //                ModuleId: contextObj.itemsSource[i]["Id"],
    //                IsEdit: edit
    //            })
    //        }
    //    }
    //    this.administrationService.updateDivisionAdminSettings(contextObj.selectedIds, JSON.stringify(listObj)).subscribe(function (resultData) {
    //        if (resultData["Data"].StatusId == 1) {
    //            contextObj.notificationService.ShowToaster("Access privilege for selected user updated", 3);
    //        } else
    //            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
    //    });       
    //}
    updateDivisionAdminSettings() {
        var contextObj = this;
        var updatedRptFldValues = '';
        for (var item of this.itemsSource) {
            if (item['Edit'] == true) {
                updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + item['Id'] + "\"},";
            }
        }
        updatedRptFldValues = updatedRptFldValues.substring(0, updatedRptFldValues.length - 1);
        this.administrationService.updateDivisionAdminSettings(updatedRptFldValues, this.selectedIds[0]).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Division Administrator Settings updated", 3);
            } else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });;

    }
    onCellEdit(event) {

    }
}