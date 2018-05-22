import { Component } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'employees-users',
    templateUrl: './app/Views/Administration/User Groups/employees-users.component.html',
    directives: [Notification, GridComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class EmployeeUsersComponent {

    fieldObject: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        administrationService.getEmployeesUsersFields().subscribe(
            result => this.fieldObject = result["data"],
            error => this.errorMessage = error);

        administrationService.getEmployeesUsersData().subscribe(
            fieldDetails => this.itemsSource = fieldDetails["data"],
            error => this.errorMessage = error);
    }

    updateEmployeeUsers() {
        this.administrationService.updateEmployeesUsers(this.itemsSource);
        this.notificationService.ShowToaster("Employee(s) added to the selected User Group", 3);
    }
}