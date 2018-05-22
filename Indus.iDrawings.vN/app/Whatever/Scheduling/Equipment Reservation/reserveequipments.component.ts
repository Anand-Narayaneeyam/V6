import {Component } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {ReserveEquipmentListComponent } from './reserveequipmentlist.component';

@Component({
    selector: 'reserveequipments',
    templateUrl: './app/Views/Scheduling/Equipment Reservation/reserveequipments.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, ReserveEquipmentListComponent],
    providers: [HTTP_PROVIDERS],

})

export class ReserveEquipmentsComponent {
    selectedTab: number = 0;
    pagePath: string = "Scheduling / Reserve Equipment";
    getSelectedTab(event: any) {
        this.selectedTab = event[0];
    }

}