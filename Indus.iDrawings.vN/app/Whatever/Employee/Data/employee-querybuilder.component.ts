import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {QueryBuilderComponent} from '../../../framework/whatever/querybuilder/querybuildersearch.component';
@Component({
    selector: 'employee-querybuilder',
    templateUrl: './app/Views/Employee/Data/employee-querybuilder.component.html',
    directives: [PageComponent, QueryBuilderComponent],
    providers: [HTTP_PROVIDERS]
})

export class EmployeeQueryBuilderComponent implements OnInit {
   
    pagePath: string;
    moduleId: number;
    QueryCategryId: string;
    ngOnInit(): void {
        this.pagePath = "Employee / Query Builder";
        this.moduleId = 5;
        this.QueryCategryId = "5";
    }
}