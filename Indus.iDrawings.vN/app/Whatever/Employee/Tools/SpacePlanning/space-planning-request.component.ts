import { Component, OnInit } from '@angular/core';
import { IField } from  '../../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../../Framework/Whatever/Card/card.component';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import {EmployeeService} from '../../../../Models/Employee/employee.services';

@Component({
    selector: 'space-planning-request',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/space-planning-request.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, PageComponent],
    providers: [HTTP_PROVIDERS, NotificationService, EmployeeService]
})

export class SpacePlanningRequestComponent implements OnInit {

    public totalItems: number;
    public itemsPerPage: number;
    public fieldDetails: IField[];
    private fields: IField[];
    pagePath: string;
    sourceData: any[];
    menuData = [
        {
            "id": 1,
            "title": "Review",
            "image": "Review",
            "path": "Review",
            "submenu": null
        },
    ];
    types = false;
    enableMenu = [];
    selIds = new Array();

    constructor(private notificationService: NotificationService , private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
    
       this.pagePath = "Employee / Tools/ SpacePlanning";
        var contextObj = this;

        this.employeeService.getSpacePlanningRequestFields().subscribe(function (resultData) {
            console.log('SpacePlanningRequest listcol', resultData["Data"]);
            contextObj.fields = (resultData["Data"]);
        });

        this.employeeService.getSpacePlanningRequestData().subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                //  contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                console.log("data: ", resultData["Data"]);
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Space Planning Request Approved", 2);
            }
           
        });
        
    }

    public onSubMenuChange(event: any) {
        if (event.value == 1) // Review
        {

        }
    }

    onSorting(event: any) { 
        this.employeeService.getSpacePlanningRequestDataSort(event.sortDirection, event.selectedField).subscribe(resultData => this.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]));

    }
}