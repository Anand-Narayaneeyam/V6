import { Component, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { ObjectDataListComponent } from './objectData-list.component'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component'

@Component({
    selector: 'assetData',
    templateUrl: './app/Views/Objects/Data/objectData.component.html',
    directives: [SectionComponent, PageComponent, TabsComponent, TabComponent, ObjectDataListComponent, FloorSelectionComponent],
    providers: [RealPropertyService, NotificationService],
    encapsulation: ViewEncapsulation.None
})

export class AssetDataComponent {
    pageTitle: string = "Data";
    pagePath: string ;
    selectedTab: number = 0;
    floorSelected: boolean = false;
    selectedDrawingIds: string = ''
    cdr: any;
    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService, cdr: ChangeDetectorRef) {
        this.selectedDrawingIds = '';
        this.pagePath = "Assets / Data";
        this.cdr = cdr;
    }

    getSelectedTab(event: any) {
        this.selectedDrawingIds = '';
        this.selectedTab = event[0];
        this.floorSelected = false;
    }

    getSelectedIds(event: any) {

        this.selectedDrawingIds = '';
        for (var count = 0; count < event.SelectedIds.length; count++) {
            this.selectedDrawingIds = this.selectedDrawingIds + event.SelectedIds[count] + ',';
            }
        this.selectedDrawingIds = this.selectedDrawingIds.slice(0, -1);
        this.floorSelected = true;
    }
    pagepathchange(event: any) {
        this.pagePath = null;
        this.cdr.detectChanges();  
        this.pagePath = "Assets / Data ";
        this.cdr.detectChanges();  
    }
}