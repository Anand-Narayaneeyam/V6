
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component';
import {QueryBuilderComponent} from '../../../../framework/whatever/querybuilder/querybuildersearch.component';
import { ObjectsService } from '../../../../models/objects/objects.service'
import {IField} from  '../../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'

@Component({
    selector: 'assets-querybuilder',
    templateUrl: './app/Views/Objects/QueryBuilder/objects-querybuilder.component.html',
    directives: [PageComponent, QueryBuilderComponent, ListBoxComponent, PageComponent],
    providers: [HTTP_PROVIDERS, ObjectsService]
})

export class AssetsQueryBuilderComponent implements OnInit {
    //import {QueryBuilderComponent} from '../../common/query builder/querybuilder.component';
    pagePath: string;
    moduleId: number;
    QueryCategryId: string;
    objectCategoryId: number;
    fieldDetailsCheckBox: IField;
    dataoption: string = "1";
    constructor(private objectsService: ObjectsService) {
    }
    ngOnInit(): void {
        
        var contextObj = this;
        contextObj.pagePath = "Assets / Query Builder";
        contextObj.moduleId = 7;
        contextObj.QueryCategryId = "9";
        contextObj.objectCategoryId = 1;

        //contextObj.objectsService.getObjectClassSelectionFieldsList(contextObj.objectCategoryId).subscribe(function (result) {
        //    contextObj.fieldDetailsCheckBox = (result["Data"][0]);

        //    contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, "", contextObj.dataoption, 1, 0).subscribe(function (resultData) {
        //        contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
        //    });
        //});

    }
    Next(event: any) {

    }
}