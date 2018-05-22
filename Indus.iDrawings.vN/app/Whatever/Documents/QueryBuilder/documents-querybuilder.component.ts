﻿import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {QueryBuilderComponent} from '../../../framework/whatever/querybuilder/querybuildersearch.component';
@Component({
    selector: 'documents-querybuilder',
    templateUrl: './app/Views/Documents/QueryBuilder/documents-querybuilder.component.html',
    directives: [PageComponent, QueryBuilderComponent],
    providers: [HTTP_PROVIDERS]
})

export class DocumentsQueryBuilderComponent implements OnInit {
    //import {QueryBuilderComponent} from '../../common/query builder/querybuilder.component';
    pagePath: string;
    moduleId: number;
    QueryCategryId: string;
    ngOnInit(): void {
        this.pagePath = "Documents / Query Builder";
        this.moduleId = 4;
        this.QueryCategryId = "7";
    }
}