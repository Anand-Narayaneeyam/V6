import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {QueryBuilderComponent} from '../../../framework/whatever/querybuilder/querybuildersearch.component';
@Component({
    selector: 'space-querybuilder',
    templateUrl: './app/Views/Space/Space Data/space-querybuilder.component.html',
    directives: [PageComponent, QueryBuilderComponent],
    providers: [HTTP_PROVIDERS]
})

export class SpaceQueryBuilderComponent implements OnInit {
  //import {QueryBuilderComponent} from '../../common/query builder/querybuilder.component';
pagePath: string;
    moduleId: number;
    QueryCategryId: string;
    ngOnInit(): void {
        this.pagePath = "Space / Query Builder";
        this.moduleId = 3;
        this.QueryCategryId = "2";
    }
}