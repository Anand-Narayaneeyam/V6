import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {AdministrationService} from '../../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../../utils/sortHelper'
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../../Framework/Whatever/Search/search.component';
import { ConfirmationComponent} from '../../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../../Framework/Models/Notification/confirm.service';


@Component({
    selector: 'site-list',
    templateUrl: 'app/Views/Asbuilts/Data/site-list.component.html',
    providers: [AdministrationService, SortHelper, NotificationService, ConfirmationService],
    inputs: ['action', 'dataKey'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, ConfirmationComponent]

})
export class SiteListComponent {
    //  @Output() selectedSiteIdsChange = new EventEmitter();
    @Output() updateSiteSelectedIds = new EventEmitter();
    @Output() targetTab = new EventEmitter();
    pageTitle: string = "Site List Component";
    public totalItems: number = 1000;
    public itemsPerPage: number = 200;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "FieldId", groupBy: [], grpWithCheckBx: false, selectedIds: [] };
    fieldObject: IField[];
    action: string;
    differ: any;
    dataKey: any;

    public keyWordLookup: any;
    constructor(private administrationService: AdministrationService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService) {
        this.differ = differs.find({}).create(null);
        this.keyWordLookup = this.administrationService.getSiteSearchKeyWordLookup();
    }

    ngOnInit() {
        this.dataKey = ["FieldId"];
        //this.administrationService.getSiteData().subscribe(resultData => this.itemsSource = resultData["data"]);
        this.administrationService.getSiteColumnData().subscribe(resultData => this.fieldObject = resultData["data"]);
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var scopesite = this.inputItems.selectedIds;
            this.updateSiteSelectedIds.emit({
                scopesite
            })
        }
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        if (changes["action"]["currentValue"] == "delete") {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");
        }
        if (changes["action"]["currentValue"] == "close")
            this.administrationService.submitSiteClose(this.inputItems.selectedIds);
        if (changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitSiteReopen(this.inputItems.selectedIds);
    }
    okDelete(event: any) {
        if (event.returnOk == true) {
            for (var i = 0; i < this.itemsSource.length; i++) {
                for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                    if (this.itemsSource[i]["FieldId"] == this.inputItems.selectedIds[j]) {
                        var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                        if (index > -1) {
                            this.itemsSource.splice(index, 1)
                            var sortedData = new Array();/*To notify the watcher about the change*/
                            sortedData = sortedData.concat(this.itemsSource);
                            this.itemsSource = sortedData;
                        }
                    }
                }
            }
            this.administrationService.submitSiteDelete(this.inputItems.selectedIds);
            this._notificationService.ShowToaster("Site deleted", 3);
        }
    }
    public onSort(objGrid: any) {
        var sortedData = new Array();/*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;

    }
    public pageChanged(event: any) {
        //this.administrationService.sitePaging(event.pageEvent.page)
    }
    RowUpdate(event: any) {

        this.administrationService.submitSiteEdit(event,1);
        this._notificationService.ShowToaster("Site updated",3);
    }
    RowDelete(event: any) {
        this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");
    }
    RowAdd(event: any) {
        this.administrationService.submitSiteAdd(event);
        this._notificationService.ShowToaster("Site added", 3);
    }
    onColValClick(colVal) {
        this.targetTab.emit("1");
        console.log("colName", colVal.colName)
        console.log("colVal", colVal.colVal);
    }
    SaveAs(event: any) {
        console.log('Entered Save As');
    }
    Delete(event: any) {
        console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        console.log('Enetered On Load Search');
    }
    Clear(event: any) {
        console.log('Entered Clear');
    }
    Submit(event: any) {
        console.log('Entered Search')
    }


}